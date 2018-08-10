/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StorageProviderFactory } from '../storage/storage-provider-factory.js';
import { Arc } from '../arc.js';
import { Manifest } from '../manifest.js';
import { Type } from '../type.js';
import { assert } from '../test/chai-web.js';
import { resetInMemoryStorageForTesting } from '../storage/in-memory-storage.js';
// Resolves when the two stores are synchronzied with each other:
// * same version
// * no pending changes
function synchronized(store1, store2, delay = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        while (store1._hasLocalChanges || store2._hasLocalChanges || store1.versionForTesting != store2.versionForTesting) {
            yield new Promise(resolve => {
                setTimeout(resolve, delay);
            });
        }
    });
}
describe('in-memory', function () {
    let lastStoreId = 0;
    function newStoreKey(name) {
        return `in-memory`;
    }
    before(() => {
        // TODO: perhaps we should do this after the test, and use a unique path for each run instead?
        resetInMemoryStorageForTesting();
    });
    describe('variable', () => {
        it('supports basic construct and mutate', () => __awaiter(this, void 0, void 0, function* () {
            let manifest = yield Manifest.parse(`
        schema Bar
          Text value
      `);
            let arc = new Arc({ id: 'test' });
            let storage = new StorageProviderFactory(arc.id);
            let BarType = Type.newEntity(manifest.schemas.Bar);
            let value = 'Hi there' + Math.random();
            let variable = yield storage.construct('test0', BarType, newStoreKey('variable'));
            yield variable.set({ id: 'test0:test', value });
            let result = yield variable.get();
            assert.equal(value, result.value);
        }));
        it('resolves concurrent set', () => __awaiter(this, void 0, void 0, function* () {
            let manifest = yield Manifest.parse(`
        schema Bar
          Text value
      `);
            let arc = new Arc({ id: 'test' });
            let storage = new StorageProviderFactory(arc.id);
            let BarType = Type.newEntity(manifest.schemas.Bar);
            let key = newStoreKey('variable');
            let var1 = yield storage.construct('test0', BarType, key);
            let var2 = yield storage.connect('test0', BarType, var1.storageKey);
            var1.set({ id: 'id1', value: 'value1' });
            var2.set({ id: 'id2', value: 'value2' });
            yield synchronized(var1, var2);
            assert.deepEqual(yield var1.get(), yield var2.get());
        }));
        it('supports pointer dereferences', () => __awaiter(this, void 0, void 0, function* () {
            let manifest = yield Manifest.parse(`
        schema Bar
          Text value
      `);
            let arc = new Arc({ id: 'test' });
            let storage = new StorageProviderFactory(arc.id);
            let BarType = Type.newEntity(manifest.schemas.Bar);
            let key1 = newStoreKey('variablePointer');
            let var1 = yield storage.construct('test0', Type.newReference(BarType), key1);
            yield var1.set({ id: 'id1', value: 'underlying' });
            let result = yield var1.get();
            assert.equal('underlying', result.value);
            let underlyingValue = yield storage._storageInstances['in-memory']._typeMap.get(BarType).get('id1');
            assert.equal('underlying', underlyingValue.value);
            // force variable to reconnect to underlying storage
            var1._backingStore = null;
            assert.equal('underlying', (yield var1.get()).value);
        }));
    });
    describe('collection', () => {
        it('supports basic construct and mutate', () => __awaiter(this, void 0, void 0, function* () {
            let manifest = yield Manifest.parse(`
        schema Bar
          Text value
      `);
            let arc = new Arc({ id: 'test' });
            let storage = new StorageProviderFactory(arc.id);
            let BarType = Type.newEntity(manifest.schemas.Bar);
            let value1 = 'Hi there' + Math.random();
            let value2 = 'Goodbye' + Math.random();
            let collection = yield storage.construct('test1', BarType.collectionOf(), newStoreKey('collection'));
            yield collection.store({ id: 'test0:test0', value: value1 }, ['key0']);
            yield collection.store({ id: 'test0:test1', value: value2 }, ['key1']);
            let result = yield collection.get('test0:test0');
            assert.equal(value1, result.value);
            result = yield collection.toList();
            assert.lengthOf(result, 2);
            assert(result[0].value = value1);
            assert(result[0].id = 'test0:test0');
            assert(result[1].value = value2);
            assert(result[1].id = 'test1:test1');
        }));
        it('resolves concurrent add of same id', () => __awaiter(this, void 0, void 0, function* () {
            let manifest = yield Manifest.parse(`
        schema Bar
          Text value
      `);
            let arc = new Arc({ id: 'test' });
            let storage = new StorageProviderFactory(arc.id);
            let BarType = Type.newEntity(manifest.schemas.Bar);
            let key = newStoreKey('collection');
            let collection1 = yield storage.construct('test1', BarType.collectionOf(), key);
            let collection2 = yield storage.connect('test1', BarType.collectionOf(), collection1.storageKey);
            collection1.store({ id: 'id1', value: 'value' }, ['key1']);
            yield collection2.store({ id: 'id1', value: 'value' }, ['key2']);
            yield synchronized(collection1, collection2);
            assert.deepEqual(yield collection1.toList(), yield collection2.toList());
        }));
        it('resolves concurrent add/remove of same id', () => __awaiter(this, void 0, void 0, function* () {
            let manifest = yield Manifest.parse(`
        schema Bar
          Text value
      `);
            let arc = new Arc({ id: 'test' });
            let storage = new StorageProviderFactory(arc.id);
            let BarType = Type.newEntity(manifest.schemas.Bar);
            let key = newStoreKey('collection');
            let collection1 = yield storage.construct('test1', BarType.collectionOf(), key);
            let collection2 = yield storage.connect('test1', BarType.collectionOf(), collection1.storageKey);
            collection1.store({ id: 'id1', value: 'value' }, ['key1']);
            collection2.store({ id: 'id1', value: 'value' }, ['key2']);
            collection1.remove('id1', ['key1']);
            collection2.remove('id1', ['key2']);
            yield synchronized(collection1, collection2);
            assert.isEmpty(yield collection1.toList());
            assert.isEmpty(yield collection2.toList());
        }));
        it('resolves concurrent add of different id', () => __awaiter(this, void 0, void 0, function* () {
            let manifest = yield Manifest.parse(`
        schema Bar
          Text value
      `);
            let arc = new Arc({ id: 'test' });
            let storage = new StorageProviderFactory(arc.id);
            let BarType = Type.newEntity(manifest.schemas.Bar);
            let key = newStoreKey('collection');
            let collection1 = yield storage.construct('test1', BarType.collectionOf(), key);
            let collection2 = yield storage.connect('test1', BarType.collectionOf(), collection1.storageKey);
            yield collection1.store({ id: 'id1', value: 'value1' }, ['key1']);
            yield collection2.store({ id: 'id2', value: 'value2' }, ['key2']);
            yield synchronized(collection1, collection2);
            assert.lengthOf(yield collection1.toList(), 2);
            assert.sameDeepMembers(yield collection1.toList(), yield collection2.toList());
        }));
        it('supports pointer dereferences', () => __awaiter(this, void 0, void 0, function* () {
            let manifest = yield Manifest.parse(`
        schema Bar
          Text value
      `);
            let arc = new Arc({ id: 'test' });
            let storage = new StorageProviderFactory(arc.id);
            let BarType = Type.newEntity(manifest.schemas.Bar);
            let key1 = newStoreKey('variablePointer');
            let collection1 = yield storage.construct('test0', Type.newReference(BarType).collectionOf(), key1);
            yield collection1.store({ id: 'id1', value: 'value1' }, ['key1']);
            yield collection1.store({ id: 'id2', value: 'value2' }, ['key2']);
            let result = yield collection1.get('id1');
            assert.equal('value1', result.value);
            result = yield collection1.get('id2');
            assert.equal('value2', result.value);
            result = yield collection1.toList();
            let underlyingValues = yield storage._storageInstances['in-memory']._typeMap.get(BarType);
            assert.sameDeepMembers(result, yield underlyingValues.toList());
            // force collection to reconnect to Entity storage
            collection1._backingStore = null;
            result = yield collection1.toList();
            assert.sameDeepMembers(result, yield underlyingValues.toList());
        }));
    });
});
