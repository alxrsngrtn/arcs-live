// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
import { InMemoryStorage } from './in-memory-storage.js';
import { FirebaseStorage } from './firebase-storage.js';
export class StorageProviderFactory {
    constructor(arcId) {
        this.arcId = arcId;
        this._storageInstances = { 'in-memory': new InMemoryStorage(arcId), 'firebase': new FirebaseStorage(arcId) };
    }
    _storageForKey(key) {
        const protocol = key.split(':')[0];
        return this._storageInstances[protocol];
    }
    async share(id, type, key) {
        return this._storageForKey(key).share(id, type, key);
    }
    async construct(id, type, keyFragment) {
        // TODO(shans): don't use reference mode once adapters are implemented
        return await this._storageForKey(keyFragment).construct(id, type, keyFragment);
    }
    async connect(id, type, key) {
        // TODO(shans): don't use reference mode once adapters are implemented
        return await this._storageForKey(key).connect(id, type, key);
    }
    parseStringAsKey(s) {
        return this._storageForKey(s).parseStringAsKey(s);
    }
    newKey(id, associatedKeyFragment) {
    }
    // For testing
    shutdown() {
        Object.values(this._storageInstances).map(s => s.shutdown());
    }
}
//# sourceMappingURL=storage-provider-factory.js.map