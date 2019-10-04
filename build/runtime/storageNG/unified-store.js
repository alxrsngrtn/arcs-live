/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { compareStrings, compareNumbers } from '../recipe/comparable.js';
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
    cloneFrom(store) { }
    async modelForSynchronization() {
        return await this.toLiteral();
    }
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
        cmp = compareNumbers(this.version, other.version);
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
}
//# sourceMappingURL=unified-store.js.map