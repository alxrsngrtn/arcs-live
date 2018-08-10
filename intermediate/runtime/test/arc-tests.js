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
import { Arc } from '../arc.js';
import { assert } from './chai-web.js';
import { SlotComposer } from '../slot-composer.js';
import * as util from '../testing/test-util.js';
import { handleFor } from '../handle.js';
import { Manifest } from '../manifest.js';
import { Loader } from '../loader.js';
import { TestHelper } from '../testing/test-helper.js';
import { StubLoader } from '../testing/stub-loader.js';
let loader = new Loader();
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, loader, id: 'test' });
        let manifest = yield Manifest.parse(`
    import 'runtime/test/artifacts/test-particles.manifest'
    recipe TestRecipe
      use as handle0
      use as handle1
      TestParticle
        foo <- handle0
        bar -> handle1
  `, { loader, fileName: process.cwd() + '/input.manifest' });
        return {
            arc,
            recipe: manifest.recipes[0],
            Foo: manifest.findSchemaByName('Foo').entityClass(),
            Bar: manifest.findSchemaByName('Bar').entityClass(),
        };
    });
}
function createSlotComposer() { return new SlotComposer({ rootContainer: { 'root': 'test' }, affordance: 'mock' }); }
describe('Arc', function () {
    it('idle can safely be called multiple times', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        const arc = new Arc({ slotComposer, loader, id: 'test' });
        const f = () => __awaiter(this, void 0, void 0, function* () { yield arc.idle; });
        yield Promise.all([f(), f()]);
    }));
    it('applies existing stores to a particle', () => __awaiter(this, void 0, void 0, function* () {
        let { arc, recipe, Foo, Bar } = yield setup();
        let fooStore = yield arc.createStore(Foo.type, undefined, 'test:1');
        let barStore = yield arc.createStore(Bar.type, undefined, 'test:2');
        yield handleFor(fooStore).set(new Foo({ value: 'a Foo' }));
        recipe.handles[0].mapToStorage(fooStore);
        recipe.handles[1].mapToStorage(barStore);
        assert(recipe.normalize());
        yield arc.instantiate(recipe);
        yield util.assertSingletonWillChangeTo(arc, barStore, 'value', 'a Foo1');
    }));
    it('applies new stores to a particle', () => __awaiter(this, void 0, void 0, function* () {
        let { arc, recipe, Foo, Bar } = yield setup();
        let fooStore = yield arc.createStore(Foo.type, undefined, 'test:1');
        let barStore = yield arc.createStore(Bar.type, undefined, 'test:2');
        recipe.handles[0].mapToStorage(fooStore);
        recipe.handles[1].mapToStorage(barStore);
        recipe.normalize();
        yield arc.instantiate(recipe);
        handleFor(fooStore).set(new Foo({ value: 'a Foo' }));
        yield util.assertSingletonWillChangeTo(arc, barStore, 'value', 'a Foo1');
    }));
    it('deserializing a serialized empty arc produces an empty arc', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = createSlotComposer();
        let arc = new Arc({ slotComposer, loader, id: 'test' });
        let serialization = yield arc.serialize();
        let newArc = yield Arc.deserialize({ serialization, loader, slotComposer });
        assert.equal(newArc._storesById.size, 0);
        assert.equal(newArc.activeRecipe.toString(), arc.activeRecipe.toString());
        assert.equal(newArc.id.toStringWithoutSessionForTesting(), 'test');
    }));
    it('deserializing a simple serialized arc produces that arc', () => __awaiter(this, void 0, void 0, function* () {
        let { arc, recipe, Foo, Bar } = yield setup();
        let fooStore = yield arc.createStore(Foo.type, undefined, 'test:1');
        handleFor(fooStore).set(new Foo({ value: 'a Foo' }));
        let barStore = yield arc.createStore(Bar.type, undefined, 'test:2', ['tag1', 'tag2']);
        recipe.handles[0].mapToStorage(fooStore);
        recipe.handles[1].mapToStorage(barStore);
        recipe.normalize();
        yield arc.instantiate(recipe);
        yield util.assertSingletonWillChangeTo(arc, barStore, 'value', 'a Foo1');
        assert.equal(fooStore._version, 1);
        assert.equal(barStore._version, 1);
        let serialization = yield arc.serialize();
        arc.stop();
        let slotComposer = createSlotComposer();
        let newArc = yield Arc.deserialize({ serialization, loader, slotComposer });
        fooStore = newArc.findStoreById(fooStore.id);
        barStore = newArc.findStoreById(barStore.id);
        assert.equal(fooStore._version, 1);
        assert.equal(barStore._version, 1);
        assert.lengthOf(newArc.findStoresByType(Bar.type, { tags: ['tag1'] }), 1);
    }));
    it('deserializing a serialized arc with a Transformation produces that arc', () => __awaiter(this, void 0, void 0, function* () {
        let manifest = yield Manifest.parse(`
      import 'artifacts/Common/Multiplexer.manifest'
      import 'runtime/test/artifacts/test-particles.manifest'

      recipe
        slot 'rootslotid-slotid' as slot0
        use as handle0
        Multiplexer
          hostedParticle = ConsumerParticle
          consume annotation as slot0
          list <- handle0

    `, { loader, fileName: './manifest.manifest' });
        let recipe = manifest.recipes[0];
        let slotComposer = new SlotComposer({ affordance: 'mock', rootContainer: { 'slotid': 'dummy-container' } });
        let slotComposer_createHostedSlot = slotComposer.createHostedSlot;
        let slotsCreated = 0;
        slotComposer.createHostedSlot = (a, b, c, d) => {
            slotsCreated++;
            return slotComposer_createHostedSlot.apply(slotComposer, [a, b, c, d]);
        };
        let arc = new Arc({ id: 'test', context: manifest, slotComposer });
        let barType = manifest.findTypeByName('Bar');
        let store = yield arc.createStore(barType.collectionOf(), undefined, 'test:1');
        recipe.handles[0].mapToStorage(store);
        assert(recipe.normalize());
        assert(recipe.isResolved());
        yield arc.instantiate(recipe);
        yield arc.idle;
        let serialization = yield arc.serialize();
        arc.stop();
        let newArc = yield Arc.deserialize({ serialization, loader, slotComposer, fileName: './manifest.manifest' });
        yield newArc.idle;
        store = newArc._storesById.get(store.id);
        yield store.store({ id: 'a', rawData: { value: 'one' } }, ['somekey']);
        yield newArc.idle;
        assert.equal(slotsCreated, 1);
    }));
    it('copies store tags', () => __awaiter(this, void 0, void 0, function* () {
        let helper = yield TestHelper.createAndPlan({
            manifestString: `
      schema Thing
        Text name
      particle P in 'p.js'
        inout Thing thing
      recipe
        copy 'mything' as thingHandle
        P
          thing = thingHandle
      resource ThingResource
        start
        [
          {"name": "mything"}
        ]
      store ThingStore of Thing 'mything' #best in ThingResource
      `,
            loader: new StubLoader({
                'p.js': `defineParticle(({Particle}) => class P extends Particle {
          async setHandles(handles) {
          }
        });`
            }),
            expectedNumPlans: 1
        });
        assert.isEmpty(helper.arc._storesById);
        assert.isEmpty(helper.arc._storeTags);
        yield helper.acceptSuggestion({ particles: ['P'] });
        assert.equal(1, helper.arc._storesById.size);
        assert.equal(1, helper.arc._storeTags.size);
        assert.deepEqual(['best'], [...helper.arc._storeTags.get([...helper.arc._storesById.values()][0])]);
    }));
});
