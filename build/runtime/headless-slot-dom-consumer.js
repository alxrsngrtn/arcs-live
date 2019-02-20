/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { SlotDomConsumer } from './slot-dom-consumer.js';
export class HeadlessSlotDomConsumer extends SlotDomConsumer {
    constructor(arc, consumeConn) {
        super(arc, consumeConn);
        this._content = {};
        this.contentAvailable = new Promise(resolve => this._contentAvailableResolve = resolve);
    }
    setContent(content, handler) {
        super.setContent(content, handler);
        // Mimics the behaviour of DomSlotConsumer::setContent, where template is only set at first,
        // and model is overriden every time.
        if (content) {
            this._content.templateName = content.templateName;
            if (content.template) {
                this._content.template = content.template;
            }
            this._content.model = content.model;
            this._contentAvailableResolve();
        }
        else {
            this._content = {};
        }
    }
    createNewContainer(container, subId) {
        return container;
    }
    isSameContainer(container, contextContainer) {
        return container === contextContainer;
    }
    getInnerContainer(slotId) {
        const model = this.renderings.map(([subId, { model }]) => model)[0];
        const providedContext = this.findProvidedContext(ctx => ctx.id === slotId);
        if (!providedContext) {
            console.warn(`Cannot find provided spec for ${slotId} in ${this.consumeConn.getQualifiedName()}`);
            return;
        }
        if (providedContext.spec.isSet && model && model.items && model.items.models) {
            const innerContainers = {};
            for (const itemModel of model.items.models) {
                assert(itemModel.id);
                innerContainers[itemModel.id] = itemModel.id;
            }
            return innerContainers;
        }
        return slotId;
    }
    createTemplateElement(template) {
        return template;
    }
    static findRootContainers(container) {
        return container;
    }
    static clear(container) { }
    _onUpdate(rendering) { }
    _stampTemplate(template) { }
    _initMutationObserver() { return null; }
    _observe() { }
}
//# sourceMappingURL=headless-slot-dom-consumer.js.map