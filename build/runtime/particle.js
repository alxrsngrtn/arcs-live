/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { BigCollection } from './handle.js';
import { Collection } from './handle.js';
import { Entity } from './entity.js';
/**
 * A basic particle. For particles that provide UI, you may like to
 * instead use DOMParticle.
 */
export class Particle {
    constructor() {
        this.relevances = [];
        this._idle = Promise.resolve();
        this._busy = 0;
        this.slotProxiesByName = new Map();
        // Typescript only sees this.constructor as a Function type.
        // TODO(shans): move spec off the constructor
        this.spec = this.constructor['spec'];
        if (this.spec.inputs.length === 0) {
            this.extraData = true;
        }
    }
    /**
     * Called after handles are synced, override to provide initial processing.
     */
    ready() {
    }
    /**
     * This sets the capabilities for this particle.  This can only
     * be called once.
     */
    setCapabilities(capabilities) {
        if (this.capabilities) {
            // Capabilities already set, throw an error.
            throw new Error('capabilities should only be set once');
        }
        this.capabilities = capabilities || {};
    }
    // tslint:disable-next-line: no-any
    async invokeSafely(fun, err) {
        try {
            this.startBusy();
            return await fun(this);
        }
        catch (e) {
            err(e);
        }
        finally {
            this.doneBusy();
        }
    }
    async callSetHandles(handles, onException) {
        this.handles = handles;
        await this.invokeSafely(async (p) => p.setHandles(handles), onException);
        this._handlesToSync = this._countInputHandles(handles);
        if (!this._handlesToSync) {
            // onHandleSync is called IFF there are input handles, otherwise we are ready now
            this.ready();
        }
    }
    /**
     * This method is invoked with a handle for each store this particle
     * is registered to interact with, once those handles are ready for
     * interaction. Override the method to register for events from
     * the handles.
     *
     * @param handles a map from handle names to store handles.
     */
    async setHandles(handles) {
    }
    _countInputHandles(handles) {
        let count = 0;
        for (const [name, handle] of handles) {
            if (handle.canRead) {
                count++;
            }
        }
        return count;
    }
    async callOnHandleSync(handle, model, onException) {
        await this.invokeSafely(async (p) => p.onHandleSync(handle, model), onException);
        // once we've synced each readable handle, we are ready to start
        if (--this._handlesToSync === 0) {
            this.ready();
        }
    }
    /**
     * Called for handles that are configured with both keepSynced and notifySync, when they are
     * updated with the full model of their data. This will occur once after setHandles() and any time
     * thereafter if the handle is resynchronized.
     *
     * @param handle The Handle instance that was updated.
     * @param model For Singleton-backed Handles, the Entity data or null if the Singleton is not set.
     *        For Collection-backed Handles, the Array of Entities, which may be empty.
     */
    async onHandleSync(handle, model) {
    }
    // tslint:disable-next-line: no-any
    async callOnHandleUpdate(handle, update, onException) {
        await this.invokeSafely(async (p) => p.onHandleUpdate(handle, update), onException);
    }
    /**
     * Called for handles that are configued with notifyUpdate, when change events are received from
     * the backing store. For handles also configured with keepSynced these events will be correctly
     * ordered, with some potential skips if a desync occurs. For handles not configured with
     * keepSynced, all change events will be passed through as they are received.
     *
     * @param handle The Handle instance that was updated.
     * @param update An object containing one of the following fields:
     *  - data: The full Entity for a Singleton-backed Handle.
     *  - added: An Array of Entities added to a Collection-backed Handle.
     *  - removed: An Array of Entities removed from a Collection-backed Handle.
     *  - originator: whether the update originated from this particle.
     */
    // tslint:disable-next-line: no-any
    async onHandleUpdate(handle, update) {
    }
    async callOnHandleDesync(handle, onException) {
        await this.invokeSafely(async (p) => p.onHandleDesync(handle), onException);
    }
    /**
     * Called for handles that are configured with both keepSynced and notifyDesync, when they are
     * detected as being out-of-date against the backing store. For Singletons, the event that triggers
     * this will also resync the data and thus this call may usually be ignored. For Collections, the
     * underlying proxy will automatically request a full copy of the stored data to resynchronize.
     * onHandleSync will be invoked when that is received.
     *
     * @param handle The Handle instance that was desynchronized.
     */
    async onHandleDesync(handle) {
    }
    async constructInnerArc() {
        if (!this.capabilities.constructInnerArc) {
            throw new Error('This particle is not allowed to construct inner arcs');
        }
        return this.capabilities.constructInnerArc(this);
    }
    get busy() {
        return this._busy > 0;
    }
    get idle() {
        return this._idle;
    }
    set relevance(r) {
        this.relevances.push(r);
    }
    startBusy() {
        if (this._busy === 0) {
            this._idle = new Promise(resolve => this._idleResolver = () => resolve());
        }
        this._busy++;
    }
    doneBusy() {
        this._busy--;
        if (this._busy === 0) {
            this._idleResolver();
        }
    }
    inputs() {
        return this.spec.inputs;
    }
    outputs() {
        return this.spec.outputs;
    }
    hasSlotProxy(name) {
        return this.slotProxiesByName.has(name);
    }
    addSlotProxy(slotlet) {
        this.slotProxiesByName.set(slotlet.slotName, slotlet);
    }
    removeSlotProxy(name) {
        this.slotProxiesByName.delete(name);
    }
    /**
     * Request (outerPEC) service invocations.
     */
    // TODO(sjmiles): experimental services impl
    async service(request) {
        if (!this.capabilities.serviceRequest) {
            console.warn(`${this.spec.name} has no service support.`);
            return null;
        }
        return new Promise(resolve => {
            this.capabilities.serviceRequest(this, request, response => resolve(response));
        });
    }
    /**
     * Returns the slot with provided name.
     */
    getSlot(name) {
        return this.slotProxiesByName.get(name);
    }
    getSlotNames() {
        return [...this.slotProxiesByName.keys()];
    }
    static buildManifest(strings, ...bits) {
        const output = [];
        for (let i = 0; i < bits.length; i++) {
            const str = strings[i];
            const indent = / *$/.exec(str)[0];
            let bitStr;
            if (typeof bits[i] === 'string') {
                bitStr = bits[i];
            }
            else {
                bitStr = bits[i].toManifestString();
            }
            bitStr = bitStr.replace(/(\n)/g, '$1' + indent);
            output.push(str);
            output.push(bitStr);
        }
        if (strings.length > bits.length) {
            output.push(strings[strings.length - 1]);
        }
        return output.join('');
    }
    async setParticleDescription(pattern) {
        return this.setDescriptionPattern('pattern', pattern);
    }
    async setDescriptionPattern(connectionName, pattern) {
        const descriptions = this.handles.get('descriptions');
        if (descriptions) {
            if (descriptions instanceof Collection || descriptions instanceof BigCollection) {
                const entityClass = descriptions.entityClass;
                await descriptions.store(new entityClass({ key: connectionName, value: pattern }, this.spec.name + '-' + connectionName));
            }
            return true;
        }
        throw new Error('A particle needs a description handle to set a decription pattern');
    }
    // Entity functions.
    idFor(entity) {
        return Entity.id(entity);
    }
    dataClone(entity) {
        return Entity.dataClone(entity);
    }
    mutate(entity, mutation) {
        Entity.mutate(entity, mutation);
    }
    // TODO(sjmiles): alternate render path for UiBroker
    output(content) {
        const { output } = this.capabilities;
        if (output) {
            output(this, content);
        }
    }
    // abstract
    renderSlot(slotName, contentTypes) { }
    renderHostedSlot(slotName, hostedSlotId, content) { }
    fireEvent(slotName, event) { }
}
//# sourceMappingURL=particle.js.map