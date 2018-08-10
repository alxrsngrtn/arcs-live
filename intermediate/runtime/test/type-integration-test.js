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
import { Loader } from '../loader.js';
import { Manifest } from '../manifest.js';
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        let registry = {};
        let loader = new Loader();
        let manifest = yield Manifest.load('./runtime/test/artifacts/type-match.manifest', loader, registry);
        assert(manifest);
        return manifest;
    });
}
describe('type integration', () => {
    it('a subtype matches to a supertype that wants to be read', () => __awaiter(this, void 0, void 0, function* () {
        let manifest = yield setup();
        let recipe = manifest.recipes[0];
        assert(recipe.normalize());
        assert(recipe.isResolved());
        assert.equal(recipe.handles.length, 1);
        assert.equal(recipe.handles[0].type.primitiveType().canReadSubset.entitySchema.name, 'Lego');
        assert.equal(recipe.handles[0].type.primitiveType().canWriteSuperset.entitySchema.name, 'Product');
    }));
    it('a subtype matches to a supertype that wants to be read when a handle exists', () => __awaiter(this, void 0, void 0, function* () {
        let manifest = yield setup();
        let recipe = manifest.recipes[1];
        recipe.handles[0].mapToStorage({ id: 'test1', type: manifest.findSchemaByName('Product').entityClass().type.collectionOf() });
        assert(recipe.normalize());
        assert(recipe.isResolved());
        assert.lengthOf(recipe.handles, 1);
        assert.equal(recipe.handles[0].type.primitiveType().entitySchema.name, 'Product');
    }));
    it('a subtype matches to a supertype that wants to be read when a handle exists', () => __awaiter(this, void 0, void 0, function* () {
        let manifest = yield setup();
        let recipe = manifest.recipes[1];
        recipe.handles[0].mapToStorage({ id: 'test1', type: manifest.findSchemaByName('Lego').entityClass().type.collectionOf() });
        assert(recipe.normalize());
        assert(recipe.isResolved());
        assert.lengthOf(recipe.handles, 1);
        assert.equal(recipe.handles[0].type.primitiveType().entitySchema.name, 'Lego');
    }));
});
