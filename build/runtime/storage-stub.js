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
    constructor(type, id, name, storageKey, storageProviderFactory, originalId, 
    /** Trust tags claimed by this data store. */
    claims, description, version, source, referenceMode = false, model) {
        super();
        this.type = type;
        this.id = id;
        this.name = name;
        this.storageKey = storageKey;
        this.storageProviderFactory = storageProviderFactory;
        this.originalId = originalId;
        this.claims = claims;
        this.description = description;
        this.version = version;
        this.source = source;
        this.referenceMode = referenceMode;
        this.model = model;
        this.unifiedStoreType = 'StorageStub';
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
        store.originalId = this.originalId;
        store.name = this.name;
        store.source = this.source;
        store.description = this.description;
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
    toString(handleTags) {
        const results = [];
        const handleStr = [];
        handleStr.push(`store`);
        if (this.name) {
            handleStr.push(`${this.name}`);
        }
        handleStr.push(`of ${this.type.toString()}`);
        if (this.id) {
            handleStr.push(`'${this.id}'`);
        }
        if (this.originalId) {
            handleStr.push(`!!${this.originalId}`);
        }
        if (this.version !== undefined) {
            handleStr.push(`@${this.version}`);
        }
        if (handleTags && handleTags.length) {
            handleStr.push(`${handleTags.join(' ')}`);
        }
        if (this.source) {
            handleStr.push(`in '${this.source}'`);
        }
        else if (this.storageKey) {
            handleStr.push(`at '${this.storageKey}'`);
        }
        // TODO(shans): there's a 'this.source' in StorageProviderBase which is sometimes
        // serialized here too - could it ever be part of StorageStub?
        results.push(handleStr.join(' '));
        if (this.claims.length > 0) {
            results.push(`  claim is ${this.claims.map(claim => claim.tag).join(' and is ')}`);
        }
        if (this.description) {
            results.push(`  description \`${this.description}\``);
        }
        return results.join('\n');
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