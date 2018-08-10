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
import { assert } from './chai-web.js';
import { Arc } from '../arc.js';
import { Loader } from '../loader.js';
import { Manifest } from '../manifest.js';
import { handleFor } from '../handle.js';
import { Speculator } from '../speculator.js';
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        let registry = {};
        let loader = new Loader();
        let manifest = yield Manifest.load('./runtime/test/artifacts/test.manifest', loader, registry);
        assert(manifest);
        let arc = new Arc({ id: 'test' });
        let recipe = manifest.recipes[0];
        assert(recipe.normalize());
        assert(recipe.isResolved());
        return { arc, recipe };
    });
}
describe('manifest integration', () => {
    it('can produce a recipe that can be instantiated in an arc', () => __awaiter(this, void 0, void 0, function* () {
        let { arc, recipe } = yield setup();
        yield arc.instantiate(recipe);
        yield arc.idle;
        let type = recipe.handles[0].type;
        let [store] = arc.findStoresByType(type);
        assert(store);
        let handle = handleFor(store);
        // TODO: This should not be necessary.
        type.maybeEnsureResolved();
        handle.entityClass = type.resolvedType().entitySchema.entityClass();
        let result = yield handle.get();
        assert.equal(result.value, 'Hello, world!');
    }));
    it('can produce a recipe that can be speculated', () => __awaiter(this, void 0, void 0, function* () {
        let { arc, recipe } = yield setup();
        let relevance = yield new Speculator().speculate(arc, recipe);
        assert.equal(relevance.calcRelevanceScore(), 1);
    }));
});
