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
import { StrategyTestHelper } from './strategy-test-helper.js';
import { AddMissingHandles } from '../../strategies/add-missing-handles.js';
import { assert } from '../chai-web.js';
function runStrategy(manifestStr) {
    return __awaiter(this, void 0, void 0, function* () {
        let manifest = yield Manifest.parse(manifestStr);
        let recipes = manifest.recipes;
        recipes.forEach(recipe => recipe.normalize());
        let arc = StrategyTestHelper.createTestArc('test-plan-arc', manifest, 'dom');
        let inputParams = { generated: recipes.map(recipe => ({ result: recipe, score: 1 })) };
        let strategy = new AddMissingHandles(arc);
        return (yield strategy.generate(inputParams)).map(r => r.result);
    });
}
describe('AddMissingHandles', function () {
    it(`doesn't add handles if there are constraints`, () => __awaiter(this, void 0, void 0, function* () {
        assert.isEmpty(yield runStrategy(`
      schema Thing
      particle P1
        out Thing thing

      particle P2
        in Thing thing

      recipe
        P1.thing -> P2.thing
        P1
        P2
    `));
    }));
    it(`doesn't add handles if there are free handles`, () => __awaiter(this, void 0, void 0, function* () {
        assert.isEmpty(yield runStrategy(`
      schema Thing
      particle P1
        in Thing thing

      recipe
        create as free
        P1
    `));
    }));
    it(`adds handles to free connections`, () => __awaiter(this, void 0, void 0, function* () {
        let results = yield runStrategy(`
      schema Thing
      particle P1
        in Thing thing
        out Thing otherThing
      particle P2
        inout Thing yetAnother

      recipe
        P1
        P2
    `);
        assert.lengthOf(results, 1);
        let recipe = results[0];
        assert.lengthOf(recipe.handles, 3);
        assert.isTrue(recipe.handles.every(h => h.fate === '?'));
    }));
    it(`doesn't add handles to host connections`, () => __awaiter(this, void 0, void 0, function* () {
        let results = yield runStrategy(`
      schema Thing
      shape HostedShape
        in ~a *
      particle P1
        in Thing thing
        host HostedShape hosted
      recipe
        P1
    `);
        assert.lengthOf(results, 1);
        let recipe = results[0];
        assert.lengthOf(recipe.handles, 1);
        assert.isUndefined(recipe.particles[0].connections['hosted'].handle);
    }));
});
