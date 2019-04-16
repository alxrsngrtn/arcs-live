/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { ProvidedSlotContext } from './slot-context.js';
export class SlotConsumer {
    constructor(arc, consumeConn, containerKind) {
        this.directlyProvidedSlotContexts = [];
        this.hostedSlotContexts = [];
        // Contains `container` and other modality specific rendering information
        // (eg for `dom`: model, template for dom renderer) by sub id. Key is `undefined` for singleton slot.
        this._renderingBySubId = new Map();
        this.innerContainerBySlotId = {};
        this.arc = arc;
        this.consumeConn = consumeConn;
        this.containerKind = containerKind;
    }
    getRendering(subId) { return this._renderingBySubId.get(subId); }
    get renderings() { return [...this._renderingBySubId.entries()]; }
    addRenderingBySubId(subId, rendering) {
        this._renderingBySubId.set(subId, rendering);
    }
    addHostedSlotContexts(context) {
        context.containerAvailable = Boolean(this.slotContext.containerAvailable);
        this.hostedSlotContexts.push(context);
    }
    get allProvidedSlotContexts() {
        return [...this.generateProvidedContexts()];
    }
    findProvidedContext(predicate) {
        return this.generateProvidedContexts(predicate).next().value;
    }
    *generateProvidedContexts(predicate = (_) => true) {
        for (const context of this.directlyProvidedSlotContexts) {
            if (predicate(context))
                yield context;
        }
        for (const hostedContext of this.hostedSlotContexts) {
            for (const hostedConsumer of hostedContext.slotConsumers) {
                yield* hostedConsumer.generateProvidedContexts(predicate);
            }
        }
    }
    onContainerUpdate(newContainer, originalContainer) {
        assert(this.slotContext instanceof ProvidedSlotContext, 'Container can only be updated in non-hosted context');
        const context = this.slotContext;
        if (Boolean(newContainer) !== Boolean(originalContainer)) {
            if (newContainer) {
                this.startRender();
            }
            else {
                this.stopRender();
            }
        }
        this.hostedSlotContexts.forEach(ctx => ctx.containerAvailable = Boolean(newContainer));
        if (newContainer !== originalContainer) {
            const contextContainerBySubId = new Map();
            if (context && context.spec.isSet) {
                Object.keys(context.container || {}).forEach(subId => contextContainerBySubId.set(subId, context.container[subId]));
            }
            else {
                contextContainerBySubId.set(undefined, context.container);
            }
            for (const [subId, container] of contextContainerBySubId) {
                if (!this._renderingBySubId.has(subId)) {
                    this._renderingBySubId.set(subId, {});
                }
                const rendering = this.getRendering(subId);
                if (!rendering.container || !this.isSameContainer(rendering.container, container)) {
                    if (rendering.container) {
                        // The rendering already had a container, but it's changed. The original container needs to be cleared.
                        this.clearContainer(rendering);
                    }
                    rendering.container = this.createNewContainer(container, subId);
                }
            }
            for (const [subId, rendering] of this.renderings) {
                if (!contextContainerBySubId.has(subId)) {
                    this.deleteContainer(rendering.container);
                    this._renderingBySubId.delete(subId);
                }
            }
        }
    }
    createProvidedContexts() {
        return this.consumeConn.getSlotSpec().provideSlotConnections.map(spec => new ProvidedSlotContext(this.consumeConn.providedSlots[spec.name].id, spec.name, /* tags=*/ [], /* container= */ null, spec, this));
    }
    updateProvidedContexts() {
        this.allProvidedSlotContexts.forEach(providedContext => {
            providedContext.container = providedContext.sourceSlotConsumer.getInnerContainer(providedContext.id);
        });
    }
    startRender() {
        if (this.consumeConn && this.startRenderCallback) {
            const providedSlots = new Map(this.allProvidedSlotContexts.map(context => [context.name, context.id]));
            this.startRenderCallback({
                particle: this.consumeConn.particle,
                slotName: this.consumeConn.name,
                providedSlots,
                contentTypes: this.constructRenderRequest()
            });
        }
    }
    stopRender() {
        if (this.consumeConn && this.stopRenderCallback) {
            this.stopRenderCallback({ particle: this.consumeConn.particle, slotName: this.consumeConn.name });
        }
    }
    setContent(content, handler) {
        if (content && Object.keys(content).length > 0 && this.description) {
            content.descriptions = this._populateHandleDescriptions();
        }
        this.eventHandler = handler;
        for (const [subId, rendering] of this.renderings) {
            this.setContainerContent(rendering, this.formatContent(content, subId), subId);
        }
    }
    _populateHandleDescriptions() {
        if (!this.consumeConn)
            return null; // TODO: remove null ability
        const descriptions = new Map();
        Object.values(this.consumeConn.particle.connections).map(handleConn => {
            if (handleConn.handle) {
                descriptions[`${handleConn.name}.description`] =
                    this.description.getHandleDescription(handleConn.handle).toString();
            }
        });
        return descriptions;
    }
    getInnerContainer(slotId) {
        return this.innerContainerBySlotId[slotId];
    }
    _initInnerSlotContainer(slotId, subId, container) {
        if (subId) {
            if (!this.innerContainerBySlotId[slotId]) {
                this.innerContainerBySlotId[slotId] = {};
            }
            assert(!this.innerContainerBySlotId[slotId][subId], `Multiple ${slotId}:${subId} inner slots cannot be provided`);
            this.innerContainerBySlotId[slotId][subId] = container;
        }
        else {
            this.innerContainerBySlotId[slotId] = container;
        }
    }
    _clearInnerSlotContainers(subIds) {
        subIds.forEach(subId => {
            if (subId) {
                Object.values(this.innerContainerBySlotId).forEach(inner => delete inner[subId]);
            }
            else {
                this.innerContainerBySlotId = {};
            }
        });
    }
    isSameContainer(container, contextContainer) {
        return (!container && !contextContainer) || (container === contextContainer);
    }
    // abstract
    constructRenderRequest() { return []; }
    dispose() { }
    createNewContainer(contextContainer, subId) { return null; }
    deleteContainer(container) { }
    clearContainer(rendering) { }
    setContainerContent(rendering, content, subId) { }
    formatContent(content, subId) { return null; }
    formatHostedContent(content) { return null; }
    static clear(container) { }
    static findRootContainers(topContainer) { return {}; }
}
//# sourceMappingURL=slot-consumer.js.map