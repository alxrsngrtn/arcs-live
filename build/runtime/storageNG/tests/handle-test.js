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
import { CRDTCollection } from '../../crdt/crdt-collection';
import { CRDTSingleton } from '../../crdt/crdt-singleton';
import { CollectionHandle, SingletonHandle } from '../handle';
import { StorageProxy } from '../storage-proxy';
import { MockStore } from './storage-proxy-test';
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
        handle.add('A');
        assert.sameMembers(await handle.toList(), ['A']);
        handle.add('B');
        assert.sameMembers(await handle.toList(), ['A', 'B']);
        handle.remove('A');
        assert.sameMembers(await handle.toList(), ['B']);
    });
    it('can clear', () => {
        const handle = getCollectionHandle();
        handle.add('A');
        handle.add('B');
        handle.clear();
        assert.isEmpty(handle.toList());
    });
    it('can add multiple entities', async () => {
        const handle = getCollectionHandle();
        await handle.addMultiple(['A', 'B']);
        assert.sameMembers(await handle.toList(), ['A', 'B']);
    });
});
describe('SingletonHandle', () => {
    it('can set and clear elements', async () => {
        const handle = getSingletonHandle();
        assert.equal(await handle.get(), null);
        handle.set('A');
        assert.equal(await handle.get(), 'A');
        handle.set('B');
        assert.equal(await handle.get(), 'B');
        handle.clear();
        assert.equal(await handle.get(), null);
    });
});
//# sourceMappingURL=handle-test.js.map