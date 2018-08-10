/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
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
import { Manifest } from '../../manifest.js';
import { ConvertConstraintsToConnections } from '../../strategies/convert-constraints-to-connections.js';
import { assert } from '../chai-web.js';
describe('ConvertConstraintsToConnections', () => __awaiter(this, void 0, void 0, function* () {
    it('fills out an empty constraint', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = (yield Manifest.parse(`
      particle A
        inout S {} b
      particle C
        inout S {} d

      recipe
        A.b -> C.d`)).recipes[0];
        let inputParams = { generated: [{ result: recipe, score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let { result, score } = results[0];
        assert.deepEqual(result.toString(), `recipe
  create as handle0 // S {}
  A as particle0
    b = handle0
  C as particle1
    d = handle0`);
    }));
    it('does not cause an input only handle to be created', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = (yield Manifest.parse(`
      schema S
      particle A
        in S b
      particle C
        in S d

      recipe
        A.b -> C.d`)).recipes[0];
        let inputParams = { generated: [{ result: recipe, score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.isEmpty(results);
    }));
    it('can resolve input only handle connection with a mapped handle', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = (yield Manifest.parse(`
      schema S
      particle A
        in S b
      particle C
        in S d

      recipe
        map as handle0
        A.b = C.d`)).recipes[0];
        let inputParams = { generated: [{ result: recipe, score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
    }));
    it('can create handle for input and output handle', () => __awaiter(this, void 0, void 0, function* () {
        let createRecipe = (constraint1, constraint2) => __awaiter(this, void 0, void 0, function* () {
            return (yield Manifest.parse(`
      schema S
      particle A
        in S b
      particle C
        in S d
      particle E
        out S f

      recipe
        ${constraint1}
        ${constraint2}`)).recipes[0];
        });
        let verify = (constraint1, constraint2) => __awaiter(this, void 0, void 0, function* () {
            let recipe = yield createRecipe(constraint1, constraint2);
            let inputParams = { generated: [{ result: recipe, score: 1 }] };
            let cctc = new ConvertConstraintsToConnections({ pec: {} });
            let results = yield cctc.generate(inputParams);
            assert.lengthOf(results, 1, `Failed to resolve ${constraint1} & ${constraint2}`);
        });
        // Test for all possible combination of connection constraints with 3 particles.
        let constraints = [['A.b = C.d', 'C.d = A.b'], ['A.b -> E.f', 'E.f <- A.b'], ['C.d -> E.f', 'E.f <- C.d']];
        for (let i = 0; i < constraints.length; ++i) {
            for (let j = 0; j < constraints.length; ++j) {
                if (i == j)
                    continue;
                for (let ii = 0; ii <= 1; ++ii) {
                    for (let jj = 0; jj <= 1; ++jj) {
                        yield verify(constraints[i][ii], constraints[j][jj]);
                    }
                }
            }
        }
    }));
    it('fills out a constraint, reusing a single particle', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = (yield Manifest.parse(`
      schema S
      particle A
        inout S b
      particle C
        inout S d

      recipe
        A.b -> C.d
        C`)).recipes[0];
        let inputParams = { generated: [{ result: recipe, score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let { result, score } = results[0];
        assert.deepEqual(result.toString(), `recipe
  create as handle0 // S {}
  A as particle0
    b = handle0
  C as particle1
    d = handle0`);
    }));
    it('fills out a constraint, reusing a single particle (2)', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = (yield Manifest.parse(`
      schema S
      particle A
        inout S b
      particle C
        inout S d

      recipe
        A.b -> C.d
        A`)).recipes[0];
        let inputParams = { generated: [{ result: recipe, score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let { result, score } = results[0];
        assert.deepEqual(result.toString(), `recipe
  create as handle0 // S {}
  A as particle0
    b = handle0
  C as particle1
    d = handle0`);
    }));
    it('fills out a constraint, reusing two particles', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = (yield Manifest.parse(`
      schema S
      particle A
        inout S b
      particle C
        inout S d

      recipe
        A.b -> C.d
        C
        A`)).recipes[0];
        let inputParams = { generated: [{ result: recipe, score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let { result, score } = results[0];
        assert.deepEqual(result.toString(), `recipe
  create as handle0 // S {}
  A as particle0
    b = handle0
  C as particle1
    d = handle0`);
    }));
    it('fills out a constraint, reusing two particles and a handle', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = (yield Manifest.parse(`
      schema S
      particle A
        inout S b
      particle C
        inout S d

      recipe
        A.b -> C.d
        use as handle1
        C
          d = handle1
        A`)).recipes[0];
        let inputParams = { generated: [{ result: recipe, score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let { result, score } = results[0];
        assert.deepEqual(result.toString(), `recipe
  use as handle0 // S {}
  A as particle0
    b = handle0
  C as particle1
    d = handle0`);
    }));
    it('fills out a constraint, reusing two particles and a handle (2)', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = (yield Manifest.parse(`
      schema S
      particle A
        inout S b
      particle C
        inout S d

      recipe
        A.b -> C.d
        use as handle1
        C
        A
          b = handle1`)).recipes[0];
        let inputParams = { generated: [{ result: recipe, score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let { result, score } = results[0];
        assert.deepEqual(result.toString(), `recipe
  use as handle0 // S {}
  A as particle0
    b = handle0
  C as particle1
    d = handle0`);
    }));
    it('removes an already fulfilled constraint', () => __awaiter(this, void 0, void 0, function* () {
        let recipe = (yield Manifest.parse(`
      schema S
      particle A
        inout S b
      particle C
        inout S d

      recipe
        A.b -> C.d
        use as handle1
        C
          d = handle1
        A
          b = handle1`)).recipes[0];
        let inputParams = { generated: [{ result: recipe, score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let { result, score } = results[0];
        assert.deepEqual(result.toString(), `recipe
  use as handle0 // S {}
  A as particle0
    b = handle0
  C as particle1
    d = handle0`);
    }));
    it('verifies affordance', () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
      schema S
      particle A in 'A.js'
        out S b
        affordance voice
        consume root
      particle C in 'C.js'
        in S d
        affordance voice
        consume root
      particle E in 'E.js'
        in S f
        consume root

      recipe
        A.b -> C.d
      recipe
        A.b -> E.f
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }, { result: recipes[1], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: { slotComposer: { affordance: 'voice' } } });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        assert.deepEqual(results[0].result.particles.map(p => p.name), ['A', 'C']);
    }));
    it('connects to handles', () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
      particle A
        out S {} o
      particle B
        in S {} i
      recipe
        ? as h
        A.o -> h
        h -> B.i
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        assert.deepEqual(results[0].result.toString(), `recipe
  ? as handle0 // S {}
  A as particle0
    o -> handle0
  B as particle1
    i <- handle0`);
    }));
    it('connects existing particles to handles', () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
      particle A
        out S {} o
      particle B
        in S {} i
      recipe
        ? as h
        A.o -> h
        h -> B.i
        A
        B
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        assert.deepEqual(results[0].result.toString(), `recipe
  ? as handle0 // S {}
  A as particle0
    o -> handle0
  B as particle1
    i <- handle0`);
    }));
    it(`doesn't attempt to duplicate existing handles to particles`, () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
      particle A
        out S {} o
      particle B
        in S {} i
      recipe
        ? as h
        A.o -> h
        h -> B.i
        A
          o -> h
        B
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        assert.deepEqual(results[0].result.toString(), `recipe
  ? as handle0 // S {}
  A as particle0
    o -> handle0
  B as particle1
    i <- handle0`);
    }));
    it(`duplicates particles to get handle connections right`, () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
      particle A
        out S {} o
      particle B
        in S {} i
      recipe
        ? as h
        ? as i
        A.o -> h
        h -> B.i
        A
          o -> i
        B
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        assert.deepEqual(results[0].result.toString(), `recipe
  ? as handle0 // ~
  ? as handle1 // S {}
  A as particle0
    o -> handle0
  A as particle1
    o -> handle1
  B as particle2
    i <- handle1`);
    }));
    it('connects to tags', () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
    particle A
      out S {} o
    particle B
      out S {} i
    recipe
      ? #hashtag
      A.o -> #hashtag
      #trashbag <- B.i
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        assert.deepEqual(results[0].result.toString(), `recipe
  ? #hashtag as handle0 // ~
  create #trashbag as handle1 // ~
  A as particle0
    o -> handle0
  B as particle1
    i -> handle1`);
    }));
    it('connects existing particles to tags', () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
    particle A
      out S {} o
    particle B
      out S {} i
    recipe
      ? #hashtag
      A.o -> #hashtag
      #trashbag <- B.i
      A
      B
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        assert.deepEqual(results[0].result.toString(), `recipe
  ? #hashtag as handle0 // ~
  create #trashbag as handle1 // ~
  A as particle0
    o -> handle0
  B as particle1
    i -> handle1`);
    }));
    it(`doesn't attempt to duplicate existing connections to tags`, () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
    particle A
      out S {} o
    particle B
      out S {} i
    recipe
      ? #hashtag as handle0
      A.o -> #hashtag
      #trashbag <- B.i
      A
        o -> handle0
      B
        i -> handle0
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        assert.deepEqual(results[0].result.toString(), `recipe
  ? #hashtag as handle0 // ~
  A as particle0
    o -> handle0
  B as particle1
    i -> handle0`);
    }));
    it(`connects particles together when there's only one possible connection`, () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
    particle A
      out S {} o
    particle B
      in S {} i
    recipe
      A -> B
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let recipe = results[0].result;
        assert.deepEqual(recipe.particles.map(p => p.name), ['A', 'B']);
        assert.lengthOf(recipe.obligations, 1);
        assert.equal(recipe.obligations[0].from.instance, recipe.particles[0]);
        assert.equal(recipe.obligations[0].to.instance, recipe.particles[1]);
    }));
    it(`connects particles together when there's extra things that can't connect`, () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
    particle A
      out S {} o
      in S {} i
    particle B
      in S {} i
      in T {} i2
    recipe
      A -> B
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let recipe = results[0].result;
        assert.deepEqual(recipe.particles.map(p => p.name), ['A', 'B']);
        assert.lengthOf(recipe.obligations, 1);
        assert.equal(recipe.obligations[0].from.instance, recipe.particles[0]);
        assert.equal(recipe.obligations[0].to.instance, recipe.particles[1]);
    }));
    it(`connects particles together with multiple connections`, () => __awaiter(this, void 0, void 0, function* () {
        let recipes = (yield Manifest.parse(`
    particle A
      out S {} o
      in T {} i
    particle B
      in S {} i
      out T {} o
    recipe
      A = B
    `)).recipes;
        let inputParams = { generated: [{ result: recipes[0], score: 1 }] };
        let cctc = new ConvertConstraintsToConnections({ pec: {} });
        let results = yield cctc.generate(inputParams);
        assert.lengthOf(results, 1);
        let recipe = results[0].result;
        assert.deepEqual(recipe.particles.map(p => p.name), ['A', 'B']);
        assert.lengthOf(recipe.obligations, 1);
        assert.equal(recipe.obligations[0].from.instance, recipe.particles[0]);
        assert.equal(recipe.obligations[0].to.instance, recipe.particles[1]);
    }));
}));
