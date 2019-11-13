import { SingletonHandle, CollectionHandle } from '../storageNG/handle.js';
import { ActiveStore } from '../storageNG/store.js';
import { Flags } from '../flags.js';
import { StorageProxy } from '../storageNG/storage-proxy.js';
import { handleFor, Singleton, Collection } from '../handle.js';
import { VolatileStorageKey } from '../../runtime/storageNG/drivers/volatile.js';
/**
 * Creates a singleton handle for a store for testing purposes. Returns an
 * appropriate OldHandle/HandleNG type depending on the storage migration flag.
 */
// TODO: Can we correctly type the result here?
// tslint:disable-next-line: no-any
export async function singletonHandleForTest(arcOrManifest, store) {
    if (Flags.useNewStorageStack) {
        return new SingletonHandle(arcOrManifest.generateID('test-handle').toString(), await createStorageProxyForTest(arcOrManifest, store), arcOrManifest.idGeneratorForTesting, 
        /* particle= */ null, // TODO: We don't have a particle here.
        /* canRead= */ true, 
        /* canWrite= */ true, 
        /* name?= */ null);
    }
    else {
        const handle = handleFor(store, arcOrManifest.idGeneratorForTesting);
        if (handle instanceof Singleton) {
            // tslint:disable-next-line: no-any
            return handle;
        }
        else {
            throw new Error('Expected Singleton.');
        }
    }
}
/**
 * Creates a collection handle for a store for testing purposes. Returns an
 * appropriate OldHandle/HandleNG type depending on the storage migration flag.
 */
// TODO: Can we correctly type the result here?
// tslint:disable-next-line: no-any
export async function collectionHandleForTest(arcOrManifest, store) {
    if (Flags.useNewStorageStack) {
        return new CollectionHandle(arcOrManifest.generateID('test-handle').toString(), await createStorageProxyForTest(arcOrManifest, store), arcOrManifest.idGeneratorForTesting, 
        /* particle= */ null, // TODO: We don't have a particle here.
        /* canRead= */ true, 
        /* canWrite= */ true, 
        /* name?= */ null);
    }
    else {
        const handle = handleFor(store, arcOrManifest.idGeneratorForTesting);
        if (handle instanceof Collection) {
            return collectionHandleWrapper(handle);
        }
        else {
            throw new Error('Expected Collection.');
        }
    }
}
/**
 * Creates a storage key prefix for a store for testing purposes. Returns an
 * appropriate string or NG storage key type depending on the storage migration flag.
 */
export function storageKeyPrefixForTest() {
    if (Flags.useNewStorageStack) {
        return arcId => new VolatileStorageKey(arcId, '');
    }
    return 'volatile://';
}
async function createStorageProxyForTest(arcOrManifest, store) {
    const activeStore = await store.activate();
    if (!(activeStore instanceof ActiveStore)) {
        throw new Error('Expected an ActiveStore.');
    }
    return new StorageProxy(arcOrManifest.generateID('test-proxy').toString(), activeStore, store.type);
}
/**
 * Hacky function which converts an old-style singleton handle into the new
 * style. Most of the properties/methods are the same, but not all. Some of the
 * methods expect slightly different arguments, so we will cast between the
 * expected types recklessly.
 *
 * Can be deleted after we've migrated to the new storage stack.
 */
function collectionHandleWrapper(oldHandle) {
    const handle = oldHandle;
    handle.add = async (entity) => {
        await oldHandle.store(entity);
        return true;
    };
    handle.addMultiple = async (entities) => {
        return Promise.all(entities.map(e => handle.add(e))).then(array => array.every(Boolean));
    };
    return handle;
}
//# sourceMappingURL=handle-for-test.js.map