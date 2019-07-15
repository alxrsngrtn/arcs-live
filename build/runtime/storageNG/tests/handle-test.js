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
import { CRDTCollection } from '../../crdt/crdt-collection.js';
import { CRDTSingleton } from '../../crdt/crdt-singleton.js';
import { CollectionHandle, SingletonHandle } from '../handle.js';
import { StorageProxy } from '../storage-proxy.js';
import { MockStore } from '../testing/test-storage.js';
function getCollectionHandle() {
    // tslint:disable-next-line: no-any
    const fakeParticle = {};
    return new CollectionHandle('me', new StorageProxy(new CRDTCollection(), new MockStore()), fakeParticle);
}
function getSingletonHandle() {
    // tslint:disable-next-line: no-any
    const fakeParticle = {};
    return new SingletonHandle('me', new StorageProxy(new CRDTSingleton(), new MockStore()), fakeParticle);
}
describe('CollectionHandle', () => {
    it('can add and remove elements', async () => {
        const handle = getCollectionHandle();
        assert.isEmpty(handle.toList());
        await handle.add({ id: 'A' });
        assert.sameDeepMembers(await handle.toList(), [{ id: 'A' }]);
        await handle.add({ id: 'B' });
        assert.sameDeepMembers(await handle.toList(), [{ id: 'A' }, { id: 'B' }]);
        await handle.remove({ id: 'A' });
        assert.sameDeepMembers(await handle.toList(), [{ id: 'B' }]);
    });
    it('can clear', async () => {
        const handle = getCollectionHandle();
        await handle.add({ id: 'A' });
        await handle.add({ id: 'B' });
        await handle.clear();
        assert.isEmpty(handle.toList());
    });
    it('can add multiple entities', async () => {
        const handle = getCollectionHandle();
        await handle.addMultiple([{ id: 'A' }, { id: 'B' }]);
        assert.sameDeepMembers(await handle.toList(), [{ id: 'A' }, { id: 'B' }]);
    });
});
describe('SingletonHandle', () => {
    it('can set and clear elements', async () => {
        const handle = getSingletonHandle();
        assert.strictEqual(await handle.get(), null);
        await handle.set({ id: 'A' });
        assert.deepEqual(await handle.get(), { id: 'A' });
        await handle.set({ id: 'B' });
        assert.deepEqual(await handle.get(), { id: 'B' });
        await handle.clear();
        assert.strictEqual(await handle.get(), null);
    });
});
//# sourceMappingURL=handle-test.js.map