/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../../platform/assert-web.js';
import { PouchDbStorageProvider } from './pouch-db-storage-provider.js';
// TODO(lindner): update to operate like the firebase version
export class PouchDbBigCollection extends PouchDbStorageProvider {
    constructor(type, storageEngine, name, id, key, refMode) {
        super(type, storageEngine, name, id, key, refMode);
    }
    backingType() {
        return this.type.getContainedType();
    }
    async get(id) {
        throw new Error('NotImplemented');
    }
    async store(value, keys, originatorId) {
        assert(keys != null && keys.length > 0, 'keys required');
        throw new Error('NotImplemented');
    }
    async remove(id, keys, originatorId) {
        throw new Error('NotImplemented');
    }
    async stream(pageSize, forward = true) {
        throw new Error('NotImplemented');
    }
    async cursorNext(cursorId) {
        throw new Error('NotImplemented');
    }
    async cursorClose(cursorId) {
        throw new Error('NotImplemented');
    }
    cursorVersion(cursorId) {
        throw new Error('NotImplemented');
    }
    async toLiteral() {
        throw new Error('NotImplemented');
    }
    async cloneFrom() {
        throw new Error('NotImplemented');
    }
    clearItemsForTesting() {
        throw new Error('NotImplemented');
    }
    /**
     * Triggered when the storage key has been modified.  For now we
     * just refetch.  This is fast since the data is synced locally.
     */
    onRemoteStateSynced(doc) {
        throw new Error('NotImplemented');
    }
}
//# sourceMappingURL=pouch-db-big-collection.js.map