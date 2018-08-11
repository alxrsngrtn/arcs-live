/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Arc } from '../arc.js';
import { assert } from './chai-web.js';
import { SlotComposer } from '../slot-composer.js';
import { handleFor } from '../handle.js';
import { Shape } from '../shape.js';
import { Type } from '../type.js';
import { Manifest } from '../manifest.js';
import { Loader } from '../loader.js';
import { Schema } from '../schema.js';
import { StorageProviderFactory } from '../storage/storage-provider-factory.js';
let loader = new Loader();
const createSlotComposer = () => new SlotComposer({ rootContainer: 'test', affordance: 'mock' });
const Bar = new Schema({ names: ['Bar'], fields: { id: 'Number', value: 'Text' } }).entityClass();
describe('Handle', function () {
    it('clear singleton store', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, id: 'test' });
        let barStore = yield arc.createStore(Bar.type);
        barStore.set(new Bar({ value: 'a Bar' }));
        barStore.clear();
        assert.isNull(yield barStore.get());
    }));
    it('ignores duplicate stores of the same entity value (variable)', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, id: 'test' });
        let store = yield arc.createStore(Bar.type);
        let version = 0;
        store.on('change', () => version++, {});
        assert.equal(version, 0);
        let bar1 = { id: 'an id', value: 'a Bar' };
        yield store.set(bar1);
        assert.equal(version, 1);
        yield store.set(bar1);
        assert.equal(version, 1);
        yield store.set({ value: 'a Bar' });
        assert.equal(version, 2);
    }));
    it('ignores duplicate stores of the same entity value (collection)', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, id: 'test' });
        let barStore = yield arc.createStore(Bar.type.collectionOf());
        let version = 0;
        barStore.on('change', ({ add: [{ effective }] }) => { if (effective)
            version++; }, {});
        assert.equal(barStore.version, 0);
        let bar1 = { id: 'an id', value: 'a Bar' };
        yield barStore.store(bar1, ['key1']);
        assert.equal(version, 1);
        yield barStore.store(bar1, ['key2']);
        assert.equal(version, 1);
        yield barStore.store({ value: 'a Bar' }, ['key3']);
        assert.equal(version, 2);
        yield barStore.store(bar1, ['key4']);
        assert.equal(version, 2);
    }));
    it('dedupes common user-provided ids', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, id: 'test' });
        let manifest = yield Manifest.load('./runtime/test/artifacts/test-particles.manifest', loader);
        let Foo = manifest.schemas.Foo.entityClass();
        let fooHandle = handleFor(yield arc.createStore(Foo.type.collectionOf()));
        fooHandle.entityClass = Foo;
        yield fooHandle.store(new Foo({ value: 'a Foo' }, 'first'));
        yield fooHandle.store(new Foo({ value: 'another Foo' }, 'second'));
        yield fooHandle.store(new Foo({ value: 'a Foo, again' }, 'first'));
        assert.lengthOf((yield fooHandle.toList()), 2);
    }));
    it('allows updates with same user-provided ids but different value (collection)', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, id: 'test' });
        let manifest = yield Manifest.load('./runtime/test/artifacts/test-particles.manifest', loader);
        let Foo = manifest.schemas.Foo.entityClass();
        let fooHandle = handleFor(yield arc.createStore(Foo.type.collectionOf()));
        fooHandle.entityClass = Foo;
        yield fooHandle.store(new Foo({ value: '1' }, 'id1'));
        yield fooHandle.store(new Foo({ value: '2' }, 'id1'));
        let stored = (yield fooHandle.toList())[0];
        assert.equal(stored.value, '2');
    }));
    it('allows updates with same user-provided ids but different value (variable)', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, id: 'test' });
        let manifest = yield Manifest.load('./runtime/test/artifacts/test-particles.manifest', loader);
        let Foo = manifest.schemas.Foo.entityClass();
        let fooHandle = handleFor(yield arc.createStore(Foo.type));
        fooHandle.entityClass = Foo;
        yield fooHandle.set(new Foo({ value: '1' }, 'id1'));
        yield fooHandle.set(new Foo({ value: '2' }, 'id1'));
        let stored = yield fooHandle.get();
        assert.equal(stored.value, '2');
    }));
    it('remove entry from store', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, id: 'test' });
        let barStore = yield arc.createStore(Bar.type.collectionOf());
        let bar = new Bar({ id: 0, value: 'a Bar' });
        barStore.store(bar, ['key1']);
        barStore.remove(bar.id);
        assert.isEmpty((yield barStore.toList()));
    }));
    it('can store a particle in a shape store', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, id: 'test' });
        let manifest = yield Manifest.load('./runtime/test/artifacts/test-particles.manifest', loader);
        let shape = new Shape('Test', [{ type: Type.newEntity(manifest.schemas.Foo) },
            { type: Type.newEntity(manifest.schemas.Bar) }], []);
        assert(shape.particleMatches(manifest.particles[0]));
        let shapeStore = yield arc.createStore(Type.newInterface(shape));
        shapeStore.set(manifest.particles[0]);
        assert.equal(yield shapeStore.get(), manifest.particles[0]);
    }));
    it('createHandle only allows valid tags & types in stores', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, id: 'test' });
        let manifest = yield Manifest.load('./runtime/test/artifacts/test-particles.manifest', loader);
        let assert_throws_async = (f, message) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield f();
                assert.throws(() => undefined, message);
            }
            catch (e) {
                assert.throws(() => { throw e; }, message);
            }
        });
        yield assert_throws_async(() => __awaiter(this, void 0, void 0, function* () { return yield arc.createStore('not a type'); }), /isn't a Type/);
        yield arc.createStore(Bar.type, 'name', 'id1', '#sufficient');
        yield arc.createStore(Bar.type, 'name', 'id2', ['#valid']);
        yield arc.createStore(Bar.type, 'name', 'id3', ['#valid', '#good']);
        ['#sufficient', '#valid', '#good'].forEach(tag => assert([...arc._storeTags.values()].find(tags => tags.has(tag)), `tags ${arc._tags} should have included ${tag}`));
    }));
    it('uses default storage keys', () => __awaiter(this, void 0, void 0, function* () {
        let manifest = yield Manifest.parse(`
    schema Bar
      Text value
    `);
        let arc = new Arc({ id: 'test', storageKey: 'firebase://xxx.firebaseio.com/yyy/' });
        let resolver;
        let promise = new Promise((resolve, reject) => { resolver = resolve; });
        arc._storageProviderFactory = new class extends StorageProviderFactory {
            construct(id, type, keyFragment) {
                resolver(keyFragment);
                return {
                    type,
                    on() { },
                };
            }
        }(arc.id);
        yield arc.createStore(manifest.schemas.Bar.type, 'foo', 'test1');
        let result = yield promise;
        assert.equal(result, 'firebase://xxx.firebaseio.com/yyy/handles/test1');
    }));
});
