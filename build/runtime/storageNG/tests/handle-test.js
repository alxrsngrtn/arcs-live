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
import { CollectionOpTypes, CRDTCollection } from '../../crdt/crdt-collection.js';
import { CRDTSingleton, SingletonOpTypes } from '../../crdt/crdt-singleton.js';
import { IdGenerator } from '../../id.js';
import { EntityType } from '../../type.js';
import { CollectionHandle, SingletonHandle } from '../handle.js';
import { StorageProxy } from '../storage-proxy.js';
import { MockParticle, MockStore } from '../testing/test-storage.js';
function getCollectionHandle(particle) {
    const fakeParticle = (particle || new MockParticle());
    return new CollectionHandle('me', new StorageProxy('id', new CRDTCollection(), new MockStore(), EntityType.make([], {}), null), IdGenerator.newSession(), fakeParticle, true, true);
}
function getSingletonHandle(particle) {
    const fakeParticle = (particle || new MockParticle());
    return new SingletonHandle('me', new StorageProxy('id', new CRDTSingleton(), new MockStore(), EntityType.make([], {}), null), IdGenerator.newSession(), fakeParticle, true, true);
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
    it('can get an element by ID', async () => {
        const handle = getCollectionHandle();
        const entity = { id: 'A', property: 'something' };
        await handle.add(entity);
        assert.deepEqual(await handle.get('A'), entity);
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
    it('notifies particle on sync event', async () => {
        const particle = new MockParticle();
        const handle = getCollectionHandle(particle);
        await handle.onSync();
        assert.isTrue(particle.onSyncCalled);
    });
    it('notifies particle on desync event', async () => {
        const particle = new MockParticle();
        const handle = getCollectionHandle(particle);
        await handle.onDesync();
        assert.isTrue(particle.onDesyncCalled);
    });
    it('notifies particle of updates', async () => {
        const particle = new MockParticle();
        const handle = getCollectionHandle(particle);
        const op = {
            type: CollectionOpTypes.Remove,
            removed: { id: 'id' },
            actor: 'actor',
            clock: { 'actor': 1 }
        };
        await handle.onUpdate(op, new Set());
        assert.deepEqual(particle.lastUpdate, { removed: { id: 'id' }, originator: false });
    });
    it('can override default options', () => {
        const handle = getCollectionHandle();
        assert.deepEqual(handle.options, {
            keepSynced: true,
            notifySync: true,
            notifyUpdate: true,
            notifyDesync: false,
        });
        handle.configure({ notifyDesync: true, notifySync: false });
        assert.deepEqual(handle.options, {
            keepSynced: true,
            notifySync: false,
            notifyUpdate: true,
            notifyDesync: true,
        });
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
    it('notifies particle on sync event', async () => {
        const particle = new MockParticle();
        const handle = getSingletonHandle(particle);
        await handle.onSync();
        assert.isTrue(particle.onSyncCalled);
    });
    it('notifies particle on desync event', async () => {
        const particle = new MockParticle();
        const handle = getSingletonHandle(particle);
        await handle.onDesync();
        assert.isTrue(particle.onDesyncCalled);
    });
    it('notifies particle of updates', async () => {
        const particle = new MockParticle();
        const handle = getSingletonHandle(particle);
        const op = {
            type: SingletonOpTypes.Set,
            value: { id: 'id' },
            actor: 'actor',
            clock: { 'actor': 1 }
        };
        await handle.onUpdate(op, { id: 'old' });
        assert.deepEqual(particle.lastUpdate, { data: { id: 'id' }, oldData: { id: 'old' }, originator: false });
    });
});
//# sourceMappingURL=handle-test.js.map