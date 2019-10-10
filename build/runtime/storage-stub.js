/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { compareStrings } from './recipe/comparable.js';
import { UnifiedStore } from './storageNG/unified-store.js';
// TODO(shans): Make sure that after refactor Storage objects have a lifecycle and can be directly used
// deflated rather than requiring this stub.
export class StorageStub extends UnifiedStore {
    constructor(type, id, name, storageKey, storageProviderFactory, originalId, claims, description, version, source, referenceMode = false, model) {
        super({ type, id, name, originalId, claims, description, source });
        this.storageKey = storageKey;
        this.storageProviderFactory = storageProviderFactory;
        this.version = version;
        this.referenceMode = referenceMode;
        this.model = model;
        this.unifiedStoreType = 'StorageStub';
    }
    // No-op implementations for `on` and `off`.
    // TODO: These methods should not live on UnifiedStore; they only work on
    // active stores (e.g. StorageProviderBase). Move them to a new
    // UnifiedActiveStore interface.
    on(callback) {
        return -1;
    }
    off(callback) { }
    async activate() {
        return this.inflate();
    }
    async inflate(storageProviderFactory) {
        const factory = storageProviderFactory || this.storageProviderFactory;
        const store = this.isBackedByManifest()
            ? await factory.construct(this.id, this.type, this.storageKey)
            : await factory.connect(this.id, this.type, this.storageKey);
        assert(store != null, 'inflating missing storageKey ' + this.storageKey);
        if (this.isBackedByManifest()) {
            // Constructed store: set the reference mode according to the stub.
            store.referenceMode = this.referenceMode;
        }
        else {
            // Connected store: sync the stub's reference mode with the store.
            this.referenceMode = store.referenceMode;
        }
        store.storeInfo = { ...this.storeInfo };
        if (this.isBackedByManifest()) {
            await store.fromLiteral({ version: this.version, model: this.model });
        }
        return store;
    }
    toLiteral() {
        return undefined; // Fake to match StorageProviderBase;
    }
    isBackedByManifest() {
        return (this.version !== undefined && !!this.model);
    }
    _compareTo(other) {
        let cmp;
        cmp = compareStrings(this.name, other.name);
        if (cmp !== 0)
            return cmp;
        cmp = compareStrings(this.id, other.id);
        if (cmp !== 0)
            return cmp;
        return 0;
    }
}
//# sourceMappingURL=storage-stub.js.map