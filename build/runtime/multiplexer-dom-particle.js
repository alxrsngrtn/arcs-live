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
import { ParticleSpec } from './particle-spec.js';
import { TransformationDomParticle } from './transformation-dom-particle.js';
import { Entity } from './entity.js';
export class MultiplexerDomParticle extends TransformationDomParticle {
    constructor() {
        super(...arguments);
        this._itemSubIdByHostedSlotId = new Map();
        this._connByHostedConn = new Map();
    }
    async _mapParticleConnections(listHandleName, particleHandleName, hostedParticle, handles, arc) {
        const otherMappedHandles = [];
        const otherConnections = [];
        let index = 2;
        const skipConnectionNames = [listHandleName, particleHandleName];
        for (const [connectionName, otherHandle] of handles) {
            if (skipConnectionNames.includes(connectionName)) {
                continue;
            }
            // TODO(wkorman): For items with embedded recipes we may need a map
            // (perhaps id to index) to make sure we don't map a handle into the inner
            // arc multiple times unnecessarily.
            // TODO(lindner): type erasure to avoid mismatch of Store vs Handle in arc.mapHandle
            // tslint:disable-next-line: no-any
            const otherHandleStore = otherHandle.storage;
            otherMappedHandles.push(`use '${await arc.mapHandle(otherHandleStore)}' as v${index}`);
            const hostedOtherConnection = hostedParticle.handleConnections.find(conn => conn.isCompatibleType(otherHandle.type));
            if (hostedOtherConnection) {
                otherConnections.push(`${hostedOtherConnection.name} = v${index++}`);
                // TODO(wkorman): For items with embedded recipes where we may have a
                // different particle rendering each item, we need to track
                // |connByHostedConn| keyed on the particle type.
                this._connByHostedConn.set(hostedOtherConnection.name, connectionName);
            }
        }
        return [otherMappedHandles, otherConnections];
    }
    async setHandles(handles) {
        this.handleIds = {};
        const arc = await this.constructInnerArc();
        const listHandleName = 'list';
        const particleHandleName = 'hostedParticle';
        const particleHandle = handles.get(particleHandleName);
        let hostedParticle = null;
        let otherMappedHandles = [];
        let otherConnections = [];
        if (particleHandle) {
            // Typecast to any; the get() method doesn't exist on raw Handles.
            // tslint:disable-next-line: no-any
            hostedParticle = await particleHandle.get();
            if (hostedParticle) {
                [otherMappedHandles, otherConnections] =
                    await this._mapParticleConnections(listHandleName, particleHandleName, hostedParticle, handles, arc);
            }
        }
        this.setState({
            arc,
            type: handles.get(listHandleName).type,
            hostedParticle,
            otherMappedHandles,
            otherConnections
        });
        await super.setHandles(handles);
    }
    async update({ list }, { arc, type, hostedParticle, otherMappedHandles, otherConnections }, oldProps, oldState) {
        //console.warn(`[${this.spec.name}]::update`, list, arc);
        if (!list || !arc) {
            return;
        }
        if (oldProps.list === list && oldState.arc === arc) {
            return;
        }
        if (list.length > 0) {
            this.relevance = 0.1;
        }
        for (const [index, item] of this.getListEntries(list)) {
            let resolvedHostedParticle = hostedParticle;
            const id = Entity.id(item);
            if (this.handleIds[id]) {
                const itemHandle = await this.handleIds[id];
                // tslint:disable-next-line: no-any
                itemHandle.set(item);
                continue;
            }
            const itemHandlePromise = arc.createHandle(type.getContainedType(), `item${index}`);
            this.handleIds[id] = itemHandlePromise;
            const itemHandle = await itemHandlePromise;
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
                    await this._mapParticleConnections(listHandleName, particleHandleName, resolvedHostedParticle, this.handles, arc);
            }
            const hostedSlotName = [...resolvedHostedParticle.slotConnections.keys()][0];
            const slotName = [...this.spec.slotConnections.values()][0].name;
            const slotId = await arc.createSlot(this, slotName, itemHandle._id);
            if (!slotId) {
                continue;
            }
            this._itemSubIdByHostedSlotId.set(slotId, id);
            try {
                const recipe = this.constructInnerRecipe(resolvedHostedParticle, item, itemHandle, { name: hostedSlotName, id: slotId }, { connections: otherConnections, handles: otherMappedHandles });
                await arc.loadRecipe(recipe);
                // tslint:disable-next-line: no-any
                itemHandle.set(item);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    combineHostedModel(slotName, hostedSlotId, content) {
        const subId = this._itemSubIdByHostedSlotId.get(hostedSlotId);
        if (!subId) {
            return;
        }
        const items = this._state.renderModel ? this._state.renderModel.items : [];
        const listIndex = items.findIndex(item => item.subId === subId);
        const item = { ...content.model, subId };
        if (listIndex >= 0 && listIndex < items.length) {
            items[listIndex] = item;
        }
        else {
            items.push(item);
        }
        this.setState({ renderModel: { items } });
    }
    combineHostedTemplate(slotName, hostedSlotId, content) {
        const subId = this._itemSubIdByHostedSlotId.get(hostedSlotId);
        if (!subId) {
            return;
        }
        assert(content.templateName, `Template name is missing for slot '${slotName}' (hosted slot ID: '${hostedSlotId}')`);
        const templateName = { ...this._state.templateName, [subId]: `${content.templateName}` };
        this.setState({ templateName });
        if (content.template) {
            let template = content.template;
            // Append subid$={{subid}} attribute to all provided slots, to make it usable for the transformation particle.
            template = template.replace(new RegExp('slotid="[a-z]+"', 'gi'), '$& subid$="{{subId}}"');
            // Replace hosted particle connection in template with the corresponding particle connection names.
            // TODO: make this generic!
            this._connByHostedConn.forEach((conn, hostedConn) => {
                template = template.replace(new RegExp(`{{${hostedConn}.description}}`, 'g'), `{{${conn}.description}}`);
            });
            this.setState({ template: { ...this._state.template, [content.templateName]: template } });
            this.forceRenderTemplate();
        }
    }
    // Called with the list of items and by default returns the direct result of
    // `Array.entries()`. Subclasses can override this method to alter the item
    // order or otherwise permute the items as desired before their slots are
    // created and contents are rendered.
    // tslint:disable-next-line: no-any
    getListEntries(list) {
        return list.entries();
    }
}
//# sourceMappingURL=multiplexer-dom-particle.js.map