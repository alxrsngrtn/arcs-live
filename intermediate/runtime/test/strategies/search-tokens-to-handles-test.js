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
import { SearchTokensToHandles } from '../../strategies/search-tokens-to-handles.js';
import { assert } from '../chai-web.js';
import { Loader } from '../../loader.js';
let loader = new Loader();
describe('SearchTokensToHandles', function () {
    it('finds local handle by tags', () => __awaiter(this, void 0, void 0, function* () {
        let manifest = (yield Manifest.parse(`
      schema Thing
      particle ShowThing &show in 'A.js'
        in Thing inThing

      recipe
        search \`show mything\`
        ? as h0
        ShowThing
          inThing <- h0
      store Things of Thing #mything in ThingsJson
      resource ThingsJson
        start
        [{}]
    `));
        let arc = StrategyTestHelper.createTestArc('test-plan-arc', manifest, 'dom');
        arc._registerStore(arc._context.stores[0], ['mything']);
        let recipe = manifest.recipes[0];
        assert(recipe.normalize());
        assert(!recipe.isResolved());
        recipe.search.resolveToken('show');
        let strategy = new SearchTokensToHandles(arc);
        let results = yield strategy.generate({ generated: [{ result: recipe, score: 1 }], terminal: [] });
        assert.lengthOf(results, 1);
        let result = results[0].result;
        assert.isTrue(result.isResolved());
        assert.equal('use', result.handles[0].fate);
    }));
    it('finds remote handle by tags', () => __awaiter(this, void 0, void 0, function* () {
        let storeManifest = (yield Manifest.parse(`
import 'runtime/test/artifacts/test-particles.manifest'
store Things of Foo #mything in ThingsJson
store Things of [Foo] #manythings in ThingsJson
  resource ThingsJson
    start
    [{}]
    `, { loader, fileName: '' }));
        let manifest = (yield Manifest.parse(`
import 'runtime/test/artifacts/test-particles.manifest'
particle ChooseFoo &choose in 'A.js'
  in [Foo] inFoos
  out Foo outFoo

recipe
  search \`choose mything from manythings \`
  ? as h0
  ? as h1
  ChooseFoo
    inFoos <- h0
    outFoo -> h1
    `, { loader, fileName: '' }));
        let arc = StrategyTestHelper.createTestArc('test-plan-arc', manifest, 'dom');
        arc._context.imports.push(storeManifest);
        let recipe = manifest.recipes[0];
        assert(recipe.normalize());
        assert(!recipe.isResolved());
        recipe.search.resolveToken('choose');
        let strategy = new SearchTokensToHandles(arc);
        let results = yield strategy.generate({ generated: [{ result: recipe, score: 1 }], terminal: [] });
        assert.lengthOf(results, 1);
        let result = results[0].result;
        assert.isTrue(result.isResolved());
        assert.lengthOf(result.handles, 2);
        assert.equal('map', result.handles[0].fate);
        assert.equal('copy', result.handles[1].fate);
    }));
});
