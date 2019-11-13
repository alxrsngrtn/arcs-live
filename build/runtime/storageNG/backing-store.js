/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DirectStore } from './direct-store.js';
/**
 * A store that allows multiple CRDT models to be stored as sub-keys of a single storageKey location.
 */
export class BackingStore {
    constructor(options) {
        this.stores = {};
        this.callbacks = new Map();
        this.nextCallbackId = 1;
        this.storageKey = options.storageKey;
        this.options = options;
    }
    on(callback) {
        this.callbacks.set(this.nextCallbackId, callback);
        return this.nextCallbackId++;
    }
    off(callback) {
        this.callbacks.delete(callback);
    }
    getLocalModel(muxId) {
        const store = this.stores[muxId];
        if (store == null) {
            this.stores[muxId] = { type: 'pending', promise: this.setupStore(muxId) };
            return null;
        }
        if (store.type === 'pending') {
            return null;
        }
        else {
            return store.store.localModel;
        }
    }
    async setupStore(muxId) {
        const store = await DirectStore.construct({ ...this.options, storageKey: this.storageKey.childKeyForBackingElement(muxId) });
        const record = { store, id: 0, type: 'record' };
        this.stores[muxId] = record;
        // Calling store.on may trigger an event; this will be delivered (via processStoreCallback) upstream and may in
        // turn trigger a request for the localModel. It's important that there's a recorded store in place for the local
        // model to be retrieved from, even though we don't have the correct id until store.on returns.
        record.id = store.on(msg => this.processStoreCallback(muxId, msg));
        return record;
    }
    async onProxyMessage(message, muxId) {
        let storeRecord = this.stores[muxId];
        if (storeRecord == null) {
            storeRecord = await this.setupStore(muxId);
        }
        if (storeRecord.type === 'pending') {
            storeRecord = await storeRecord.promise;
        }
        const { store, id } = storeRecord;
        message.id = id;
        return store.onProxyMessage(message);
    }
    static async construct(options) {
        return new BackingStore(options);
    }
    async idle() {
        const stores = [];
        for (const store of Object.values(this.stores)) {
            if (store.type === 'record') {
                stores.push(store.store);
            }
        }
        await Promise.all(stores.map(store => store.idle()));
    }
    async processStoreCallback(muxId, message) {
        return Promise.all([...this.callbacks.values()].map(callback => callback(message, muxId))).then(a => a.reduce((a, b) => a && b));
    }
}
//# sourceMappingURL=backing-store.js.map