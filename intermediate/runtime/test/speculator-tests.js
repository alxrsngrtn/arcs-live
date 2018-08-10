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
import { Speculator } from '../speculator.js';
import { Arc } from '../arc.js';
import { assert } from './chai-web.js';
import { Loader } from '../loader.js';
import { Manifest } from '../manifest.js';
describe('speculator', function () {
    it('can speculatively produce a relevance', () => __awaiter(this, void 0, void 0, function* () {
        let loader = new Loader();
        let arc = new Arc({ id: 'test' });
        let manifest = yield Manifest.load('./runtime/test/artifacts/test.manifest', loader);
        let recipe = manifest.recipes[0];
        assert(recipe.normalize());
        let speculator = new Speculator();
        let relevance = yield speculator.speculate(arc, recipe);
        assert.equal(relevance.calcRelevanceScore(), 1);
    }));
});
