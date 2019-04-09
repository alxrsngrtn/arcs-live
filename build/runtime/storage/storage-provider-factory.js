// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
import { VolatileStorage } from './volatile-storage.js';
import { SyntheticStorage } from './synthetic-storage.js';
// TODO(sjmiles): StorageProviderFactory.register can be used
// to install additional providers, as long as it's invoked
// before any StorageProviderFactory objects are constructed.
const providers = {
    volatile: { storage: VolatileStorage, isPersistent: false },
    synthetic: { storage: SyntheticStorage, isPersistent: false }
};
export class StorageProviderFactory {
    constructor(arcId) {
        this.arcId = arcId;
        this._storageInstances = {};
        Object.keys(providers).forEach(name => {
            const { storage, isPersistent } = providers[name];
            this._storageInstances[name] = { storage: new storage(arcId, this), isPersistent };
        });
    }
    static register(name, instance) {
        providers[name] = instance;
    }
    getInstance(key) {
        const instance = this._storageInstances[key.split(':')[0]];
        if (!instance) {
            throw new Error(`unknown storage protocol: ${key}`);
        }
        return instance;
    }
    _storageForKey(key) {
        if (!key) {
            throw new Error('key is required');
        }
        return this.getInstance(key).storage;
    }
    isPersistent(key) {
        return key && this.getInstance(key).isPersistent;
    }
    async construct(id, type, keyFragment) {
        // TODO(shans): don't use reference mode once adapters are implemented
        return await this._storageForKey(keyFragment).construct(id, type, keyFragment);
    }
    async connect(id, type, key) {
        // TODO(shans): don't use reference mode once adapters are implemented
        return await this._storageForKey(key).connect(id, type, key);
    }
    async connectOrConstruct(id, type, key) {
        const storage = this._storageForKey(key);
        let result = await storage.connect(id, type, key);
        if (result == null) {
            result = await storage.construct(id, type, key);
        }
        return result;
    }
    async baseStorageFor(type, keyString) {
        return await this._storageForKey(keyString).baseStorageFor(type, keyString);
    }
    baseStorageKey(type, keyString) {
        return this._storageForKey(keyString).baseStorageKey(type, keyString);
    }
    parseStringAsKey(s) {
        return this._storageForKey(s).parseStringAsKey(s);
    }
    newKey(id, associatedKeyFragment) {
    }
    // For testing
    async shutdown() {
        for (const s of Object.values(this._storageInstances)) {
            await s.storage.shutdown();
        }
    }
}
//# sourceMappingURL=storage-provider-factory.js.map