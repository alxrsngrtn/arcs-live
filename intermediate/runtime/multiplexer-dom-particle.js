/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
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
import { assert } from '../platform/assert-web.js';
import { ParticleSpec } from './particle-spec.js';
import { TransformationDomParticle } from './transformation-dom-particle.js';
export class MultiplexerDomParticle extends TransformationDomParticle {
    constructor() {
        super();
        this._itemSubIdByHostedSlotId = new Map();
        this._connByHostedConn = new Map();
    }
    _mapParticleConnections(listHandleName, particleHandleName, hostedParticle, handles, arc) {
        return __awaiter(this, void 0, void 0, function* () {
            let otherMappedHandles = [];
            let otherConnections = [];
            let index = 2;
            const skipConnectionNames = [listHandleName, particleHandleName];
            for (let [connectionName, otherHandle] of handles) {
                if (skipConnectionNames.includes(connectionName)) {
                    continue;
                }
                // TODO(wkorman): For items with embedded recipes we may need a map
                // (perhaps id to index) to make sure we don't map a handle into the inner
                // arc multiple times unnecessarily.
                otherMappedHandles.push(`map '${yield arc.mapHandle(otherHandle._proxy)}' as v${index}`);
                let hostedOtherConnection = hostedParticle.connections.find(conn => conn.isCompatibleType(otherHandle.type));
                if (hostedOtherConnection) {
                    otherConnections.push(`${hostedOtherConnection.name} <- v${index++}`);
                    // TODO(wkorman): For items with embedded recipes where we may have a
                    // different particle rendering each item, we need to track
                    // |connByHostedConn| keyed on the particle type.
                    this._connByHostedConn.set(hostedOtherConnection.name, connectionName);
                }
            }
            return [otherMappedHandles, otherConnections];
        });
    }
    setHandles(handles) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            this.handleIds = {};
            let arc = yield this.constructInnerArc();
            const listHandleName = 'list';
            const particleHandleName = 'hostedParticle';
            let particleHandle = handles.get(particleHandleName);
            let hostedParticle = null;
            let otherMappedHandles = [];
            let otherConnections = [];
            if (particleHandle) {
                hostedParticle = yield particleHandle.get();
                if (hostedParticle) {
                    [otherMappedHandles, otherConnections] =
                        yield this._mapParticleConnections(listHandleName, particleHandleName, hostedParticle, handles, arc);
                }
            }
            this.setState({
                arc,
                type: handles.get(listHandleName).type,
                hostedParticle,
                otherMappedHandles,
                otherConnections
            });
            _super("setHandles").call(this, handles);
        });
    }
    willReceiveProps({ list }, { arc, type, hostedParticle, otherMappedHandles, otherConnections }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (list.length > 0) {
                this.relevance = 0.1;
            }
            for (let [index, item] of this.getListEntries(list)) {
                let resolvedHostedParticle = hostedParticle;
                if (this.handleIds[item.id]) {
                    let itemHandle = yield this.handleIds[item.id];
                    itemHandle.set(item);
                    continue;
                }
                let itemHandlePromise = arc.createHandle(type.primitiveType(), 'item' + index);
                this.handleIds[item.id] = itemHandlePromise;
                let itemHandle = yield itemHandlePromise;
                if (!resolvedHostedParticle) {
                    // If we're muxing on behalf of an item with an embedded recipe, the
                    // hosted particle should be retrievable from the item itself. Else we
                    // just skip this item.
                    if (!item.renderParticleSpec) {
                        continue;
                    }
                    resolvedHostedParticle =
                        ParticleSpec.fromLiteral(JSON.parse(item.renderParticleSpec));
                    // Re-map compatible handles and compute the connections specific
                    // to this item's render particle.
                    const listHandleName = 'list';
                    const particleHandleName = 'renderParticle';
                    [otherMappedHandles, otherConnections] =
                        yield this._mapParticleConnections(listHandleName, particleHandleName, resolvedHostedParticle, this.handles, arc);
                }
                let hostedSlotName = [...resolvedHostedParticle.slots.keys()][0];
                let slotName = [...this.spec.slots.values()][0].name;
                let slotId = yield arc.createSlot(this, slotName, resolvedHostedParticle.name, hostedSlotName, itemHandle._id);
                if (!slotId) {
                    continue;
                }
                this._itemSubIdByHostedSlotId.set(slotId, item.id);
                try {
                    const recipe = this.constructInnerRecipe(resolvedHostedParticle, item, itemHandle, { name: hostedSlotName, id: slotId }, { connections: otherConnections, handles: otherMappedHandles });
                    yield arc.loadRecipe(recipe, this);
                    itemHandle.set(item);
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
    combineHostedModel(slotName, hostedSlotId, content) {
        let subId = this._itemSubIdByHostedSlotId.get(hostedSlotId);
        if (!subId) {
            return;
        }
        let items = this._state.renderModel ? this._state.renderModel.items : [];
        let listIndex = items.findIndex(item => item.subId == subId);
        let item = Object.assign({}, content.model, { subId });
        if (listIndex >= 0 && listIndex < items.length) {
            items[listIndex] = item;
        }
        else {
            items.push(item);
        }
        this._setState({ renderModel: { items } });
    }
    combineHostedTemplate(slotName, hostedSlotId, content) {
        let subId = this._itemSubIdByHostedSlotId.get(hostedSlotId);
        if (!subId) {
            return;
        }
        assert(content.templateName, `Template name is missing for slot '${slotName}' (hosted slot ID: '${hostedSlotId}')`);
        this._setState({ templateName: Object.assign(this._state.templateName || {}, { [subId]: `${content.templateName}` }) });
        if (content.template) {
            let template = content.template;
            // Append subid={{subid}} attribute to all provided slots, to make it usable for the transformation particle.
            template = template.replace(new RegExp('slotid="[a-z]+"', 'gi'), '$& subid="{{subId}}"');
            // Replace hosted particle connection in template with the corresponding particle connection names.
            // TODO: make this generic!
            this._connByHostedConn.forEach((conn, hostedConn) => {
                template = template.replace(new RegExp(`{{${hostedConn}.description}}`, 'g'), `{{${conn}.description}}`);
            });
            this._setState({ template: Object.assign(this._state.template || {}, { [content.templateName]: template }) });
            this.forceRenderTemplate();
        }
    }
    // Abstract methods below.
    // Called to produce a full interpolated recipe for loading into an inner
    // arc for each item. Subclasses should override this method as by default
    // it does nothing and so no recipe will be returned and content will not
    // be loaded successfully into the inner arc.
    constructInnerRecipe(hostedParticle, item, itemHandle, slot, other) { }
    // Called with the list of items and by default returns the direct result of
    // `Array.entries()`. Subclasses can override this method to alter the item
    // order or otherwise permute the items as desired before their slots are
    // created and contents are rendered.
    getListEntries(list) {
        return list.entries();
    }
}
