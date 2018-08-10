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
import { Loader } from '../loader.js';
import { StubLoader } from '../testing/stub-loader.js';
import { Planner } from '../planner.js';
import { assert } from './chai-web.js';
import { Manifest } from '../manifest.js';
import { MessageChannel } from '../message-channel.js';
import { ParticleExecutionContext } from '../particle-execution-context.js';
import { StrategyTestHelper } from './strategies/strategy-test-helper.js';
let loader = new Loader();
function planFromManifest(manifest, { arcFactory, testSteps } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof manifest == 'string') {
            let fileName = './test.manifest';
            manifest = yield Manifest.parse(manifest, { loader, fileName });
        }
        arcFactory = arcFactory || ((manifest) => StrategyTestHelper.createTestArc('test', manifest, 'dom'));
        testSteps = testSteps || ((planner) => planner.plan(Infinity, []));
        let arc = yield arcFactory(manifest);
        let planner = new Planner();
        planner.init(arc);
        return yield testSteps(planner);
    });
}
const assertRecipeResolved = recipe => {
    assert(recipe.normalize());
    assert.isTrue(recipe.isResolved());
};
const loadTestArcAndRunSpeculation = (manifest, manifestLoadedCallback) => __awaiter(this, void 0, void 0, function* () {
    const registry = {};
    const loader = new class extends StubLoader {
        constructor() {
            super({ manifest });
        }
        requireParticle(fileName) {
            return __awaiter(this, void 0, void 0, function* () {
                let clazz = class {
                    constructor() {
                        this.relevances = [1];
                    }
                    setHandles(handles) {
                        return __awaiter(this, void 0, void 0, function* () {
                            let thingHandle = handles.get('thing');
                            thingHandle.set(new thingHandle.entityClass({ name: 'MYTHING' }));
                        });
                    }
                };
                return clazz;
            });
        }
    };
    const loadedManifest = yield Manifest.load('manifest', loader, { registry });
    manifestLoadedCallback(loadedManifest);
    const pecFactory = function (id) {
        const channel = new MessageChannel();
        new ParticleExecutionContext(channel.port1, `${id}:inner`, loader);
        return channel.port2;
    };
    const arc = new Arc({ id: 'test-plan-arc', context: loadedManifest, pecFactory, loader });
    const planner = new Planner();
    planner.init(arc);
    const plans = yield planner.suggest();
    return { plans, arc };
});
describe('Planner', function () {
    it('can map remote handles structurally', () => __awaiter(this, void 0, void 0, function* () {
        let results = yield planFromManifest(`
      store AStore of * {Text text, Text moreText} in './artifacts/Things/empty.json'
      particle P1 in './some-particle.js'
        in * {Text text} text
      recipe
        map as handle
        P1
          text <- handle
    `);
        assert.lengthOf(results, 1);
    }));
    it('can copy remote handles structurally', () => __awaiter(this, void 0, void 0, function* () {
        let results = yield planFromManifest(`
      store AStore of * {Text text, Text moreText} in './artifacts/Things/empty.json'
      particle P1 in './some-particle.js'
        in * {Text text} text
      recipe
        copy as handle
        P1
          text <- handle
    `);
        assert.lengthOf(results, 1);
    }));
    it('can resolve multiple consumed slots', () => __awaiter(this, void 0, void 0, function* () {
        let results = yield planFromManifest(`
      particle P1 in './some-particle.js'
        consume one
        consume two
      recipe
        slot 'slot-id0' as s0
        P1
          consume one as s0
    `);
        assert.lengthOf(results, 1);
    }));
    it('can speculate in parallel', () => __awaiter(this, void 0, void 0, function* () {
        const manifest = `
          schema Thing
            Text name

          particle A in 'A.js'
            out Thing thing
            consume root
            description \`Make \${thing}\`

          recipe
            create as handle1
            slot 'root-slot' as slot0
            A
              thing -> handle1
              consume root as slot0

          recipe
            create as handle2
            slot 'root-slot2' as slot1
            A
              thing -> handle2
              consume root as slot1
          `;
        const { plans } = yield loadTestArcAndRunSpeculation(manifest, manifest => {
            assertRecipeResolved(manifest.recipes[0]);
            assertRecipeResolved(manifest.recipes[1]);
        });
        assert.equal(plans.length, 2);
        // Make sure the recipes were processed as separate plan groups.
        // TODO(wkorman): When we move to a thread pool we'll revise this to check
        // the thread index instead.
        assert.equal(plans[0].groupIndex, 0);
        assert.equal(plans[1].groupIndex, 1);
    }));
});
describe('AssignOrCopyRemoteHandles', function () {
    let particlesSpec = `
  schema Foo

  particle A in 'A.js'
    in [Foo] list
    consume root

  particle B in 'A.js'
    inout [Foo] list
    consume root
  `;
    let testManifest = (recipeManifest, expectedResults) => __awaiter(this, void 0, void 0, function* () {
        let manifest = (yield Manifest.parse(`
      ${particlesSpec}

      ${recipeManifest}
    `));
        let schema = manifest.findSchemaByName('Foo');
        manifest.createStore(schema.type.collectionOf(), 'Test1', 'test-1', ['tag1']);
        manifest.createStore(schema.type.collectionOf(), 'Test2', 'test-2', ['tag2']);
        manifest.createStore(schema.type.collectionOf(), 'Test2', 'test-3', []);
        let arc = StrategyTestHelper.createTestArc('test-plan-arc', manifest, 'dom');
        let planner = new Planner();
        planner.init(arc);
        let plans = yield planner.plan(1000);
        assert.lengthOf(plans, expectedResults, recipeManifest);
        return plans;
    });
    it('maps tagged remote handle', () => __awaiter(this, void 0, void 0, function* () {
        // map one
        yield testManifest(`
      recipe
        map #tag1 as list
        A as particle0
          list <- list
    `, 1);
        yield testManifest(`
      recipe
        map #tag2 as list
        A as particle0
          list <- list
    `, 1);
        yield testManifest(`
      recipe
        map #tag3 as list
        A as particle0
          list <- list
    `, 0);
    }));
    it('maps untagged remote handle', () => __awaiter(this, void 0, void 0, function* () {
        yield testManifest(`
      recipe
        map as list
        A as particle0
          list <- list
    `, 3);
    }));
    it('copies tagged remote handle', () => __awaiter(this, void 0, void 0, function* () {
        // copy one
        yield testManifest(`
      recipe
        copy #tag1 as list
        A as particle0
          list <- list
    `, 1);
        yield testManifest(`
      recipe
        copy #tag2 as list
        A as particle0
          list <- list
    `, 1);
        yield testManifest(`
      recipe
        copy #tag3 as list
        A as particle0
          list <- list
    `, 0);
    }));
    it('copies untagged remote handle', () => __awaiter(this, void 0, void 0, function* () {
        yield testManifest(`
      recipe
        copy as list
        A as particle0
          list <- list
    `, 3);
    }));
    it('finds remote untagged handles with unknown fate', () => __awaiter(this, void 0, void 0, function* () {
        let plansA = yield testManifest(`
      recipe
        ? as list
        A as particle0
          list <- list
    `, 3);
        assert.isTrue(plansA.every(plan => plan.handles.length == 1 && plan.handles.every(handle => handle.fate == 'map')));
        let plansB = yield testManifest(`
      recipe
        ? as list
        B as particle0
          list = list
    `, 3);
        assert.isTrue(plansB.every(plan => plan.handles.length == 1 && plan.handles.every(handle => handle.fate == 'copy')));
    }));
    it('finds remote tagged handles with unknown fate', () => __awaiter(this, void 0, void 0, function* () {
        let plansA = yield testManifest(`
      recipe
        ? #tag1 as list
        A as particle0
          list <- list
    `, 1);
        assert.lengthOf(plansA[0].handles, 1);
        assert.equal('map', plansA[0].handles[0].fate);
        let plansB = yield testManifest(`
      recipe
        ? #tag2 as list
        B as particle0
          list = list
    `, 1);
        assert.lengthOf(plansB[0].handles, 1);
        assert.equal('copy', plansB[0].handles[0].fate);
    }));
    it('finds multiple remote handles', () => __awaiter(this, void 0, void 0, function* () {
        // both at once
        yield testManifest(`
      recipe
        map #tag1 as list
        copy #tag2 as list2
        A as particle0
          list <- list
        B as particle1
          list = list2
    `, 1);
        yield testManifest(`
      recipe
        map #tag1 as list
        copy #tag3 as list2
        A as particle0
          list <- list
        B as particle1
          list = list2
    `, 0);
        // both, but only one has a tag
        yield testManifest(`
      recipe
        map #tag1 as list
        copy as list2
        A as particle0
          list <- list
        B as particle1
          list = list2
    `, 2);
        yield testManifest(`
      recipe
        map as list
        copy #tag2 as list2
        A as particle0
          list <- list
        B as particle1
          list = list2
    `, 2);
        // no tags leads to all possible permutations of 3 matching handles
        yield testManifest(`
      recipe
        map as list
        copy as list2
        A as particle0
          list <- list
        B as particle1
          list = list2
    `, 6);
    }));
});
describe('Type variable resolution', function () {
    let loadAndPlan = (manifestStr) => __awaiter(this, void 0, void 0, function* () {
        let loader = {
            join: (() => { return ''; }),
            loadResource: (() => { return '[]'; })
        };
        let manifest = (yield Manifest.parse(manifestStr, { loader }));
        let arc = StrategyTestHelper.createTestArc('test-plan-arc', manifest, 'dom');
        let planner = new Planner();
        planner.init(arc);
        return planner.plan(Infinity);
    });
    let verifyResolvedPlan = (manifestStr) => __awaiter(this, void 0, void 0, function* () {
        let plans = yield loadAndPlan(manifestStr);
        assert.lengthOf(plans, 1);
        let recipe = plans[0];
        recipe.normalize();
        assert.isTrue(recipe.isResolved());
    });
    let verifyUnresolvedPlan = (manifestStr) => __awaiter(this, void 0, void 0, function* () {
        let plans = yield loadAndPlan(manifestStr);
        assert.isEmpty(plans);
    });
    it('unresolved type variables', () => __awaiter(this, void 0, void 0, function* () {
        // [~a] doesn't resolve to Thing.
        yield verifyUnresolvedPlan(`
      schema Thing
      particle P
        in ~a thing
      recipe
        map #mythings as mythings
        P
          thing <- mythings
      store MyThings of [Thing] #mythings in 'things.json'`);
        // ~a doesn't resolve to [Thing]
        yield verifyUnresolvedPlan(`
      schema Thing
      particle P
        in [~a] things
      recipe
        map #mything as mything
        P
          things <- mything
      store MyThing of Thing #mything in 'thing.json'`);
        // Different handles using the same type variable don't resolve to different type storages.
        yield verifyUnresolvedPlan(`
      schema Thing1
      schema Thing2
      particle P
        in [~a] manyThings
        out ~a oneThing
      recipe
        map #manything as manythings
        copy #onething as onething
        P
          manyThings <- manythings
          oneThing -> onething
      store ManyThings of [Thing1] #manythings in 'things.json'
      store OneThing of Thing2 #onething in 'thing.json'`);
    }));
    it('simple particles type variable resolution', () => __awaiter(this, void 0, void 0, function* () {
        yield verifyResolvedPlan(`
      schema Thing1
      particle P1
        in [Thing1] things
      particle P2
        in [~a] things
      recipe
        map #mythings as mythings
        P1
          things <- mythings
        P2
          things <- mythings
      store MyThings of [Thing1] #mythings in 'things.json'`);
        yield verifyResolvedPlan(`
      schema Thing1
      schema Thing2
      particle P2
        in [~a] things
      recipe
        map #mythings1 as mythings1
        map #mythings2 as mythings2
        P2
          things <- mythings1
        P2
          things <- mythings2
      store MyThings1 of [Thing1] #mythings1 in 'things1.json'
      store MyThings2 of [Thing2] #mythings2 in 'things2.json'`);
        yield verifyResolvedPlan(`
      schema Thing1
      schema Thing2
      particle P2
        in [~a] things
        in [Thing2] things2
      recipe
        map #mythings1 as mythings1
        map #mythings2 as mythings2
        P2
          things <- mythings1
          things2 <- mythings2
      store MyThings1 of [Thing1] #mythings1 in 'things1.json'
      store MyThings2 of [Thing2] #mythings2 in 'things2.json'`);
        yield verifyResolvedPlan(`
      schema Thing
      particle P1
        in [~a] things1
      particle P2
        in [~b] things2
      recipe
        map #mythings as mythings
        P1
          things1 <- mythings
        P2
          things2 <- mythings
      store MyThings of [Thing] #mythings in 'things.json'`);
    }));
    it('transformation particles type variable resolution', () => __awaiter(this, void 0, void 0, function* () {
        let particleSpecs = `
shape HostedShape
  in ~a *
particle P1
  in Thing1 input
particle Muxer in 'Muxer.js'
  host HostedShape hostedParticle
  in [~a] list
`;
        // One transformation particle
        yield verifyResolvedPlan(`
${particleSpecs}
recipe
  map #mythings as mythings
  Muxer
    hostedParticle = P1
    list <- mythings
schema Thing1
store MyThings of [Thing1] #mythings in 'things.json'`);
        // Two transformation particles hosting the same particle with same type storage.
        yield verifyResolvedPlan(`
${particleSpecs}
recipe
  map #mythings1 as mythings1
  map #mythings2 as mythings2
  Muxer
    hostedParticle = P1
    list <- mythings1
  Muxer
    hostedParticle = P1
    list <- mythings2
schema Thing1
store MyThings1 of [Thing1] #mythings1 in 'things.json'
store MyThings2 of [Thing1] #mythings2 in 'things.json'`);
        // Transformations carry types through their interface, so P1 can't resolve with
        // Thing2
        yield verifyUnresolvedPlan(`
${particleSpecs}
recipe
  map #mythings as mythings
  Muxer
    hostedParticle = P1
    list <- mythings
schema Thing1
schema Thing2
store MyThings of [Thing2] #mythings in 'things.json'`);
        // Two transformation particle hosting the same particle with different type storage.
        // NOTE: This doesn't work yet because we don't have a way of representing a concrete
        // type with type variable'd handles.
        /*
        await verifyResolvedPlan(`
    ${particleSpecs}
    particle P2
      P2(in [~a] inthings)
    recipe
      map #mythings1 as mythings1
      map #mythings2 as mythings2
      Muxer
        hostedParticle = P1
        list <- mythings1
      Muxer
        hostedParticle = P1
        list <- mythings2
    schema Thing1
    store MyThings1 of [Thing1] #mythings1 in 'things.json'
    schema Thing2
    store MyThings2 of [Thing2] #mythings2 in 'things.json'`);
      */
    }));
});
describe('Description', () => __awaiter(this, void 0, void 0, function* () {
    it('description generated from speculative execution arc', () => __awaiter(this, void 0, void 0, function* () {
        const manifest = `
    schema Thing
      Text name

    particle A in 'A.js'
      out Thing thing
      consume root
      description \`Make \${thing}\`

    recipe
      create as handle1
      slot 'root-slot' as slot0
      A
        thing -> handle1
        consume root as slot0
    `;
        const { plans, arc } = yield loadTestArcAndRunSpeculation(manifest, manifest => {
            assertRecipeResolved(manifest.recipes[0]);
        });
        assert.lengthOf(plans, 1);
        assert.equal('Make MYTHING.', yield plans[0].description.getRecipeSuggestion());
        assert.equal(0, arc._storesById.size);
    }));
}));
describe('Automatic resolution', function () {
    let loadAndPlan = (manifestStr, arcCreatedCallback) => __awaiter(this, void 0, void 0, function* () {
        return planFromManifest(manifestStr, {
            arcFactory: (manifest) => __awaiter(this, void 0, void 0, function* () {
                let arc = StrategyTestHelper.createTestArc('test', manifest, 'dom');
                if (arcCreatedCallback)
                    yield arcCreatedCallback(arc, manifest);
                return arc;
            })
        });
    });
    let verifyResolvedPlans = (manifestStr, arcCreatedCallback) => __awaiter(this, void 0, void 0, function* () {
        let plans = yield loadAndPlan(manifestStr, arcCreatedCallback);
        for (let plan of plans) {
            plan.normalize();
            assert.isTrue(plan.isResolved());
        }
        return plans;
    });
    let verifyResolvedPlan = (manifestStr, arcCreatedCallback) => __awaiter(this, void 0, void 0, function* () {
        let plans = yield verifyResolvedPlans(manifestStr, arcCreatedCallback);
        assert.lengthOf(plans, 1);
        return plans[0];
    });
    let verifyUnresolvedPlan = (manifestStr, arcCreatedCallback) => __awaiter(this, void 0, void 0, function* () {
        let plans = yield loadAndPlan(manifestStr, arcCreatedCallback);
        assert.isEmpty(plans);
    });
    it('introduces create handles for particle communication', () => __awaiter(this, void 0, void 0, function* () {
        // A new handle can be introduced to facilitate A -> B communication.
        let recipe = yield verifyResolvedPlan(`
      schema Thing
      particle A
        out Thing thing
      particle B
        in Thing thing

      recipe
        A
        B`);
        assert.lengthOf(recipe.handles, 1);
        assert.equal('create', recipe.handles[0].fate);
        // A new handle cannot be introduced if both particles only read.
        yield verifyUnresolvedPlan(`
      schema Thing
      particle A
        in Thing thing
      particle B
        in Thing thing

      recipe
        A
        B`);
    }));
    it('coalesces recipes to resolve connections', () => __awaiter(this, void 0, void 0, function* () {
        let result = yield verifyResolvedPlan(`
      schema Thing
        Text id
      schema Product extends Thing
        Text name
      schema Other
        Number count
      schema Location
        Number lat
        Number lng

      particle A
        out Product product
      particle B
        in Thing thing
        out Other other
      particle C
        in * {Number count} something
        in Location location
      particle D
        inout Location location

      recipe
        ? as product
        A
          product -> product
      recipe
        ? as other
        B
          other -> other
      recipe
        C
      recipe
        ? as location
        D
          location = location
`);
        assert.equal(`recipe
  create as handle0 // ~
  create as handle1 // ~
  create as handle2 // Location {Number lat, Number lng}
  A as particle0
    product -> handle0
  B as particle1
    other -> handle1
    thing <- handle0
  C as particle2
    location <- handle2
    something <- handle1
  D as particle3
    location = handle2`, result.toString({ hideFields: false }));
    }));
    it('uses existing handle from the arc', () => __awaiter(this, void 0, void 0, function* () {
        // An existing handle from the arc can be used as input to a recipe
        let recipe = yield verifyResolvedPlan(`
      schema Thing
      particle A
        in Thing thing

      recipe
        A
      `, (arc, manifest) => __awaiter(this, void 0, void 0, function* () {
            let Thing = manifest.findSchemaByName('Thing').entityClass();
            yield arc.createStore(Thing.type, undefined, 'test:1');
        }));
        assert.lengthOf(recipe.handles, 1);
        let [handle] = recipe.handles;
        assert.equal('use', handle.fate);
        assert.equal('test:1', handle.id);
    }));
    it('composes recipe rendering a list of items from a recipe', () => __awaiter(this, void 0, void 0, function* () {
        let arc = null;
        let recipes = yield verifyResolvedPlans(`
      import 'artifacts/Common/List.recipes'
      schema Thing

      particle ThingProducer
        out [Thing] things

      particle ThingRenderer
        in Thing thing
        consume item

      recipe ProducingRecipe
        create #items as things
        ThingProducer`, arcRef => arc = arcRef);
        assert.lengthOf(recipes, 2);
        const composedRecipes = recipes.filter(r => r.name !== 'ProducingRecipe');
        assert.lengthOf(composedRecipes, 1);
        assert.equal(composedRecipes[0].toString(), `recipe
  create #items as handle0 // [Thing {}]
  create #selected as handle1 // Thing {}
  copy '${arc.id}:particle-literal:ThingRenderer' as handle2 // HostedParticleShape
  slot 'r0' #root as slot1
  ItemMultiplexer as particle0
    hostedParticle = handle2
    list <- handle0
    consume item as slot0
  SelectableList as particle1
    items = handle0
    selected = handle1
    consume root as slot1
      provide action as slot2
      provide annotation as slot3
      provide item as slot0
      provide postamble as slot4
      provide preamble as slot5
  ThingProducer as particle2
    things -> handle0`);
    }));
    it('composes recipe rendering a list of items from the current arc', () => __awaiter(this, void 0, void 0, function* () {
        let arc = null;
        let recipes = yield verifyResolvedPlans(`
        import 'artifacts/Common/List.recipes'
        schema Thing

        particle ThingRenderer
          in Thing thing
          consume item`, (arcRef, manifest) => __awaiter(this, void 0, void 0, function* () {
            arc = arcRef;
            let Thing = manifest.findSchemaByName('Thing').entityClass();
            yield arc.createStore(Thing.type.collectionOf(), undefined, 'test-store', ['items']);
        }));
        assert.lengthOf(recipes, 1);
        assert.equal(recipes[0].toString(), `recipe SelectableUseListRecipe
  use 'test-store' #items as handle0 // [Thing {}]
  create #selected as handle1 // Thing {}
  copy '${arc.id}:particle-literal:ThingRenderer' as handle2 // HostedParticleShape
  slot 'r0' #root as slot1
  ItemMultiplexer as particle0
    hostedParticle = handle2
    list <- handle0
    consume item as slot0
  SelectableList as particle1
    items = handle0
    selected = handle1
    consume root as slot1
      provide action as slot2
      provide annotation as slot3
      provide item as slot0
      provide postamble as slot4
      provide preamble as slot5`);
    }));
    let verifyRestaurantsPlanSearch = (searchStr) => __awaiter(this, void 0, void 0, function* () {
        let recipes = yield verifyResolvedPlans(`
      import 'artifacts/Restaurants/Restaurants.recipes'
      import 'artifacts/People/Person.schema'

      store User of Person 'User' in './artifacts/Things/empty.json'

      recipe
        search \`${searchStr}\`
    `, () => { });
        recipes = recipes.filter(recipe => recipe.search);
        assert.lengthOf(recipes, 1);
        return recipes[0];
    });
    it('searches and coalesces nearby restaurants by recipe name', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = yield verifyRestaurantsPlanSearch('nearby restaurants');
        assert.deepEqual(recipe.particles.map(p => p.name).sort(), ['FindRestaurants', 'ExtractLocation', 'RestaurantList', 'RestaurantMasterDetail', 'RestaurantDetail'].sort());
        assert.lengthOf(recipe.handles, 4);
    }));
    it('searches and coalesces make reservation by recipe name', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = yield verifyRestaurantsPlanSearch('make reservation');
        assert.deepEqual(recipe.particles.map(p => p.name).sort(), ['FindRestaurants', 'ExtractLocation', 'PartySize', 'ReservationAnnotation', 'ReservationForm', 'RestaurantList', 'RestaurantMasterDetail', 'RestaurantDetail'].sort());
        // Verify handles.
        assert.lengthOf(recipe.handles, 6);
        // Only descriptions and person handle have one handle connection.
        assert.isTrue(recipe.handles.every(h => h.connections.length > 1 || ['descriptions', 'person'].includes(h.connections[0].name)));
        // Only person handle has fate other than `create`
        assert.isTrue(recipe.handles.every(h => h.fate == 'create' || 'person' == h.connections[0].name));
        // Naive verification that a specific connection name only binds to the same handle.
        recipe.handles.forEach(handle => handle.connections.every(conn => {
            assert.isTrue(recipe.handles.every(otherHandle => handle == otherHandle || !otherHandle.connections.some(otherConn => otherConn.name == conn.name)), `Connection name ${conn.name} is bound to multiple handles.`);
        }));
    }));
    it('searches and coalesces "nearby restaurants make reservation"', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = yield verifyRestaurantsPlanSearch('nearby restaurants make reservation');
        assert.deepEqual(recipe.particles.map(p => p.name).sort(), ['FindRestaurants', 'ExtractLocation', 'PartySize', 'ReservationAnnotation', 'ReservationForm', 'RestaurantList', 'RestaurantMasterDetail', 'RestaurantDetail'].sort());
        // Verify handles.
        assert.lengthOf(recipe.handles, 6);
        // Only descriptions and person handle have one handle connection.
        assert.isTrue(recipe.handles.every(h => h.connections.length > 1 || ['descriptions', 'person'].includes(h.connections[0].name)));
        // Only person handle has fate other than `create`
        assert.isTrue(recipe.handles.every(h => h.fate == 'create' || 'person' == h.connections[0].name));
        // Naive verification that a specific connection name only binds to the same handle.
        recipe.handles.forEach(handle => handle.connections.every(conn => {
            assert.isTrue(recipe.handles.every(otherHandle => handle == otherHandle || !otherHandle.connections.some(otherConn => otherConn.name == conn.name)), `Connection name ${conn.name} is bound to multiple handles.`);
        }));
    }));
    it('searches and coalesces "nearby restaurants calendar"', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = yield verifyRestaurantsPlanSearch('nearby restaurants calendar');
        assert.deepEqual(recipe.particles.map(p => p.name).sort(), ['Calendar', 'FindRestaurants', 'ExtractLocation', 'PartySize', 'ReservationAnnotation', 'ReservationForm', 'RestaurantList', 'RestaurantMasterDetail', 'RestaurantDetail'].sort());
        // Verify handles.
        assert.lengthOf(recipe.handles, 7);
        // Only descriptions and person handle have one handle connection.
        assert.isTrue(recipe.handles.every(h => h.connections.length > 1 || ['descriptions', 'person'].includes(h.connections[0].name)));
        // Only person handle has fate other than `create`
        assert.isTrue(recipe.handles.every(h => h.fate == 'create' || 'person' == h.connections[0].name));
        // Naive verification that a specific connection name only binds to the same handle.
        recipe.handles.forEach(handle => handle.connections.every(conn => {
            assert.isTrue(conn.name == 'descriptions' ||
                recipe.handles.every(otherHandle => handle == otherHandle || !otherHandle.connections.some(otherConn => otherConn.name == conn.name)), `Connection name ${conn.name} is bound to multiple handles.`);
        }));
    }));
    // TODO: FindRestaurants particle, found by search term never tries 'create' handle as part of strategizing.
    it.skip('searches and coalesces restaurants recipes by particle name', () => __awaiter(this, void 0, void 0, function* () {
        let recipes = yield verifyResolvedPlans(`
      import 'artifacts/Restaurants/Restaurants.recipes'
      import 'artifacts/People/Person.schema'

      store User of Person 'User' in './artifacts/Things/empty.json'

      recipe
        search \`find restaurants\`
    `, () => { });
        assert.lengthOf(recipes, 1);
        assert.deepEqual(recipes[0].particles.map(p => p.name).sort(), ['FindRestaurants', 'ExtractLocation', 'RestaurantList', 'RestaurantMasterDetail', 'RestaurantDetail'].sort());
    }));
});
