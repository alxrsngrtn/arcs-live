import { assert } from '../../../platform/assert-web.js';
import { PouchDbStorageProvider } from './pouch-db-storage-provider.js';
// TODO(lindner): update to operate like the firebase version
export class PouchDbBigCollection extends PouchDbStorageProvider {
    constructor(type, storageEngine, name, id, key) {
        super(type, storageEngine, name, id, key);
    }
    backingType() {
        return this.type.primitiveType();
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
    cursorClose(cursorId) {
        throw new Error('NotImplemented');
    }
    cursorVersion(cursorId) {
        throw new Error('NotImplemented');
    }
    toLiteral() {
        throw new Error('NotImplemented');
    }
    cloneFrom() {
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