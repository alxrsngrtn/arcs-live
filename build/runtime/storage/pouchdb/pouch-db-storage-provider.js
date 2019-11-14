/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { StorageProviderBase } from '../storage-provider-base.js';
import { PouchDbKey } from './pouch-db-key.js';
/**
 * Base class for PouchDb related Storage classes
 * (PouchDbSingleton/PouchDbCollection)
 */
export class PouchDbStorageProvider extends StorageProviderBase {
    constructor(type, storageEngine, name, id, key, refMode) {
        super(type, name, id, key);
        // Manages backing store
        this.backingStore = null;
        this.storageEngine = storageEngine;
        this.pouchDbKey = new PouchDbKey(key);
        this.referenceMode = refMode;
        this.initialized = new Promise(resolve => this.resolveInitialized = resolve);
    }
    // A consequence of awaiting this function is that this.backingStore
    // is guaranteed to exist once the await completes. This is because
    // if backingStore doesn't yet exist, the assignment in the then()
    // is guaranteed to execute before anything awaiting this function.
    async ensureBackingStore() {
        if (this.backingStore) {
            return this.backingStore;
        }
        if (!this.pendingBackingStore) {
            const key = this.storageEngine.baseStorageKey(this.backingType(), this.storageKey);
            this.pendingBackingStore = this.storageEngine.baseStorageFor(this.type, key);
            await this.pendingBackingStore.then(backingStore => (this.backingStore = backingStore));
        }
        return this.pendingBackingStore;
    }
    /**
     * The active database for this provider.
     */
    get db() {
        return this.storageEngine.dbForKey(this.pouchDbKey);
    }
    /**
     * Increments the local version to be one more than the maximum of
     * the local and remove versions.
     */
    bumpVersion(otherVersion = 0) {
        this._version = Math.max(this._version, otherVersion) + 1;
    }
}
//# sourceMappingURL=pouch-db-storage-provider.js.map