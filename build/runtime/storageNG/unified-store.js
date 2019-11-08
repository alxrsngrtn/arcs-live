/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { compareStrings } from '../recipe/comparable.js';
import { assert } from '../../platform/assert-web.js';
/**
 * This is a temporary interface used to unify old-style stores (storage/StorageProviderBase) and new-style stores (storageNG/Store).
 * We should be able to remove this once we've switched across to the NG stack.
 *
 * Note that for old-style stores, StorageStubs are used *sometimes* to represent storage which isn't activated. For new-style stores,
 * Store itself represents an inactive store, and needs to be activated using activate(). This will present some integration
 * challenges :)
 *
 * Note also that old-style stores use strings for Storage Keys, while NG storage uses storageNG/StorageKey subclasses. This provides
 * a simple test for determining whether a store is old or new.
 *
 * Common functionality between old- and new-style stores goes in this class.
 * Once the old-style stores are deleted, this class can be merged into the new
 * Store class.
 */
export class UnifiedStore {
    constructor(storeInfo) {
        this.storeInfo = storeInfo;
    }
    // Series of StoreInfo getters to make migration easier.
    get id() { return this.storeInfo.id; }
    get name() { return this.storeInfo.name; }
    get type() { return this.storeInfo.type; }
    get originalId() { return this.storeInfo.originalId; }
    get source() { return this.storeInfo.source; }
    get description() { return this.storeInfo.description; }
    get claims() { return this.storeInfo.claims; }
    /**
     * Hack to cast this UnifiedStore to the old-style class StorageStub.
     * TODO: Fix all usages of this method to handle new-style stores, and then
     * delete.
     */
    castToStorageStub() {
        // Can't use instanceof; causes circular dependencies.
        assert(this.unifiedStoreType === 'StorageStub', 'Not a StorageStub!');
        return this;
    }
    // TODO: Delete this method when the old-style storage is deleted.
    reportExceptionInHost(exception) {
        // This class lives in the host, so it's safe to just rethrow the exception.
        throw exception;
    }
    _compareTo(other) {
        let cmp;
        cmp = compareStrings(this.name, other.name);
        if (cmp !== 0)
            return cmp;
        cmp = compareStrings(this.versionToken, other.versionToken);
        if (cmp !== 0)
            return cmp;
        cmp = compareStrings(this.source, other.source);
        if (cmp !== 0)
            return cmp;
        cmp = compareStrings(this.id, other.id);
        if (cmp !== 0)
            return cmp;
        return 0;
    }
    // TODO: Make these tags live inside StoreInfo.
    toManifestString(opts) {
        opts = opts || {};
        const info = { ...this.storeInfo, ...opts.overrides };
        const results = [];
        const handleStr = [];
        handleStr.push(`store`);
        if (info.name) {
            handleStr.push(`${info.name}`);
        }
        handleStr.push(`of ${info.type.toString()}`);
        if (info.id) {
            handleStr.push(`'${info.id}'`);
        }
        if (info.originalId) {
            handleStr.push(`!!${info.originalId}`);
        }
        if (this.versionToken != null) {
            handleStr.push(`@${this.versionToken}`);
        }
        if (opts.handleTags && opts.handleTags.length) {
            handleStr.push(`${opts.handleTags.map(tag => `#${tag}`).join(' ')}`);
        }
        if (info.source) {
            if (info.origin === 'file') {
                handleStr.push(`in '${info.source}'`);
            }
            else {
                handleStr.push(`in ${info.source}`);
                if (info.includeKey) {
                    handleStr.push(`at '${info.includeKey}'`);
                }
            }
        }
        else if (this.storageKey) {
            handleStr.push(`at '${this.storageKey}'`);
        }
        // TODO(shans): there's a 'this.source' in StorageProviderBase which is sometimes
        // serialized here too - could it ever be part of StorageStub?
        results.push(handleStr.join(' '));
        if (info.claims && info.claims.length > 0) {
            results.push(`  claim is ${info.claims.map(claim => claim.tag).join(' and is ')}`);
        }
        if (info.description) {
            results.push(`  description \`${info.description}\``);
        }
        return results.join('\n');
    }
}
//# sourceMappingURL=unified-store.js.map