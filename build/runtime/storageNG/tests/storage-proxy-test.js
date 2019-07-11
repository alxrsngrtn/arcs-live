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
import { StorageProxy } from '../storage-proxy.js';
import { ProxyMessageType } from '../store.js';
import { MockStore, MockHandle } from '../testing/test-storage.js';
describe('StorageProxy', async () => {
    it('will apply and propagate operation', async () => {
        const mockStore = new MockStore();
        const storageProxy = new StorageProxy(new CRDTSingleton(), mockStore);
        // Register a handle to verify updates are sent back.
        const handle = new MockHandle('handle', storageProxy, {});
        storageProxy.registerHandle(handle);
        const op = {
            type: SingletonOpTypes.Set,
            value: { id: '1' },
            actor: 'A',
            clock: { A: 1 }
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
            const crdtData = { values: { '1': { value: { id: '1' }, version: { A: 1 } } }, version: { A: 1 } };
            await storageProxy.onMessage({ type: ProxyMessageType.ModelUpdate, model: crdtData, id: 1 });
            return true;
        };
        const result = await storageProxy.getParticleView();
        assert.deepEqual(result, { id: '1' });
        assert.deepEqual(mockStore.lastCapturedMessage, { type: ProxyMessageType.SyncRequest, id: 1 });
        assert.isTrue(handle.onSyncCalled);
    });
    // TODO: Test onMessage
});
//# sourceMappingURL=storage-proxy-test.js.map