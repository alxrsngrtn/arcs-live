/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert } from '../../platform/assert-web.js';
import { SlotDomConsumer } from '../slot-dom-consumer.js';
export class MockSlotDomConsumer extends SlotDomConsumer {
    constructor(consumeConn) {
        super(consumeConn);
        this._content = {};
    }
    setContent(content, handler) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("setContent").call(this, content, handler);
            // Mimics the behaviour of DomSlotConsumer::setContent, where template is only set at first,
            // and model is overriden every time.
            if (content) {
                this._content.templateName = content.templateName;
                if (content.template) {
                    this._content.template = content.template;
                }
                this._content.model = content.model;
            }
            else {
                this._content = {};
            }
        });
    }
    createNewContainer(container, subId) {
        return container;
    }
    isSameContainer(container, contextContainer) {
        return container == contextContainer;
    }
    getInnerContainer(innerSlotName) {
        let model = this.renderings.map(([subId, { model }]) => model)[0];
        if (this.consumeConn.slotSpec.getProvidedSlotSpec(innerSlotName).isSet &&
            model && model.items && model.items.models) {
            let innerContainers = {};
            for (let itemModel of model.items.models) {
                assert(itemModel.id);
                innerContainers[itemModel.id] = itemModel.id;
            }
            return innerContainers;
        }
        return innerSlotName;
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
    _initMutationObserver() { }
    _observe() { }
}
