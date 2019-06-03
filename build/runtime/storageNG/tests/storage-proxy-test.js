/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../../platform/chai-web.js';
import { CRDTSingleton, SingletonOpTypes } from '../../crdt/crdt-singleton.js';
import { Exists } from '../drivers/driver-factory.js';
import { Handle } from '../handle.js';
import { StorageKey } from '../storage-key.js';
import { StorageProxy } from '../storage-proxy.js';
import { ActiveStore, StorageMode, ProxyMessageType } from '../store.js';
export class MockStore extends ActiveStore {
    constructor() {
        super(new MockStorageKey(), Exists.ShouldCreate, null, StorageMode.Direct, CRDTSingleton);
        this.lastCapturedMessage = null;
    }
    on(callback) {
        return 1;
    }
    off(callback) {
        throw new Error('unimplemented');
    }
    async onProxyMessage(message) {
        this.lastCapturedMessage = message;
        return Promise.resolve(true);
    }
}
class MockStorageKey extends StorageKey {
    constructor() {
        super('testing');
    }
    toString() {
        return `${this.protocol}://`;
    }
}
class MockHandle extends Handle {
    constructor() {
        super(...arguments);
        this.onSyncCalled = false;
        this.lastUpdate = null;
    }
    onSync() {
        this.onSyncCalled = true;
    }
    onUpdate(ops) {
        this.lastUpdate = ops;
    }
}
describe('StorageProxy', async () => {
    it('will apply and propagate operation', async () => {
        const mockStore = new MockStore();
        const storageProxy = new StorageProxy(new CRDTSingleton(), mockStore);
        // Register a handle to verify updates are sent back.
        const handle = new MockHandle('handle', storageProxy, {});
        storageProxy.registerHandle(handle);
        const op = {
            type: SingletonOpTypes.Set,
            value: '1',
            actor: 'A',
            clock: new Map([['A', 1]]),
        };
        const result = await storageProxy.applyOp(op);
        assert.isTrue(result);
        assert.deepEqual(mockStore.lastCapturedMessage, {
            type: ProxyMessageType.Operations,
            operations: [op],
            id: 1
        });
        assert.deepEqual(handle.lastUpdate, [op]);
    });
    it('will sync before returning the particle view', async () => {
        const mockStore = new MockStore();
        const storageProxy = new StorageProxy(new CRDTSingleton(), mockStore);
        // Register a handle to verify updates are sent back.
        const handle = new MockHandle('handle', storageProxy, {});
        storageProxy.registerHandle(handle);
        // When requested a sync, store will send back a model.
        mockStore.onProxyMessage = async (message) => {
            mockStore.lastCapturedMessage = message;
            const crdtData = { values: new Map([['1', new Map([['A', 1]])]]), version: new Map([['A', 1]]) };
            storageProxy.onMessage({ type: ProxyMessageType.ModelUpdate, model: crdtData, id: 1 });
            return true;
        };
        const result = await storageProxy.getParticleView();
        assert.equal(result, '1');
        assert.deepEqual(mockStore.lastCapturedMessage, { type: ProxyMessageType.SyncRequest, id: 1 });
        assert.isTrue(handle.onSyncCalled);
    });
    // TODO: Test onMessage
});
//# sourceMappingURL=storage-proxy-test.js.map