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
    constructor(storageKey, exists, type, mode, modelConstructor) {
        this.storageKey = storageKey;
        this.exists = exists;
        this.type = type;
        this.mode = mode;
        this.modelConstructor = modelConstructor;
        this.stores = {};
        this.callbacks = new Map();
        this.nextCallbackId = 1;
    }
    on(callback) {
        this.callbacks.set(this.nextCallbackId, callback);
        return this.nextCallbackId++;
    }
    off(callback) {
        this.callbacks.delete(callback);
    }
    async processStoreCallback(muxId, message) {
        return Promise.all([...this.callbacks.values()].map(callback => callback(message, muxId))).then(a => a.reduce((a, b) => a && b));
    }
    async onProxyMessage(message, muxId) {
        if (this.stores[muxId] == null) {
            const store = await DirectStore.construct(this.storageKey.childWithComponent(muxId), this.exists, this.type, this.mode, this.modelConstructor);
            const id = store.on(msg => this.processStoreCallback(muxId, msg));
            this.stores[muxId] = { store, id };
        }
        const { store, id } = this.stores[muxId];
        message.id = id;
        return store.onProxyMessage(message);
    }
    static async construct(storageKey, exists, type, mode, modelConstructor) {
        return new BackingStore(storageKey, exists, type, mode, modelConstructor);
    }
    async idle() {
        await Promise.all(Object.values(this.stores).map(({ store }) => store.idle()));
    }
}
//# sourceMappingURL=backing-store.js.map