/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/assert-web.js';
import { SlotContext } from './slot-context.js';
export class SlotConsumer {
    constructor(consumeConn, containerKind) {
        this.providedSlotContexts = [];
        // Contains `container` and other modality specific rendering information
        // (eg for `dom`: model, template for dom renderer) by sub id. Key is `undefined` for singleton slot.
        this._renderingBySubId = new Map();
        this.innerContainerBySlotId = {};
        this._consumeConn = consumeConn;
        this.containerKind = containerKind;
    }
    get consumeConn() { return this._consumeConn; }
    getRendering(subId) { return this._renderingBySubId.get(subId); }
    get renderings() { return [...this._renderingBySubId.entries()]; }
    addRenderingBySubId(subId, rendering) {
        this._renderingBySubId.set(subId, rendering);
    }
    onContainerUpdate(newContainer, originalContainer) {
        if (Boolean(newContainer) !== Boolean(originalContainer)) {
            if (newContainer) {
                this.startRender();
            }
            else {
                this.stopRender();
            }
        }
        if (newContainer !== originalContainer) {
            const contextContainerBySubId = new Map();
            if (this.slotContext && this.slotContext.spec.isSet) {
                Object.keys(this.slotContext.container || {}).forEach(subId => contextContainerBySubId.set(subId, this.slotContext.container[subId]));
            }
            else {
                contextContainerBySubId.set(undefined, this.slotContext.container);
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
        return this.consumeConn.slotSpec.providedSlots.map(spec => new SlotContext(this.consumeConn.providedSlots[spec.name].id, spec.name, /* tags=*/ [], /* container= */ null, spec, this));
    }
    updateProvidedContexts() {
        this.providedSlotContexts.forEach(providedContext => {
            providedContext.container = this.getInnerContainer(providedContext.id);
        });
    }
    startRender() {
        if (this.consumeConn && this.startRenderCallback) {
            this.startRenderCallback({
                particle: this.consumeConn.particle,
                slotName: this.consumeConn.name,
                providedSlots: new Map(this.providedSlotContexts.map(context => [context.name, context.id])),
                contentTypes: this.constructRenderRequest()
            });
        }
    }
    stopRender() {
        if (this.consumeConn && this.stopRenderCallback) {
            this.stopRenderCallback({ particle: this.consumeConn.particle, slotName: this.consumeConn.name });
        }
    }
    async setContent(content, handler, arc) {
        if (content && Object.keys(content).length > 0) {
            if (arc) {
                content.descriptions = await this.populateHandleDescriptions(arc);
            }
        }
        this.eventHandler = handler;
        for (const [subId, rendering] of this.renderings) {
            this.setContainerContent(rendering, this.formatContent(content, subId), subId);
        }
    }
    async populateHandleDescriptions(arc) {
        const descriptions = {};
        await Promise.all(Object.values(this.consumeConn.particle.connections).map(async (handleConn) => {
            // TODO(mmandlis): convert back to .handle and .name after all recipe files converted to typescript.
            if (handleConn['handle']) {
                descriptions[`${handleConn['name']}.description`] = (await arc.description.getHandleDescription(handleConn['handle'])).toString();
            }
        }));
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
    isSameContainer(container, contextContainer) { return container === contextContainer; }
    get hostedConsumers() {
        return this.providedSlotContexts
            .filter(context => context.constructor.name === 'HostedSlotContext')
            .map(context => context.sourceSlotConsumer)
            .filter(consumer => consumer !== this);
    }
    // abstract
    constructRenderRequest(hostedSlotConsumer = null) { return []; }
    dispose() { }
    createNewContainer(contextContainer, subId) { return null; }
    deleteContainer(container) { }
    clearContainer(rendering) { }
    setContainerContent(rendering, content, subId) { }
    formatContent(content, subId) { return null; }
    formatHostedContent(hostedSlot, content) { return null; }
    static clear(container) { }
}
//# sourceMappingURL=slot-consumer.js.map