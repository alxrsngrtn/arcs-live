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
import { Loader } from '../loader.js';
import { assert } from '../test/chai-web.js';
import { Manifest } from '../manifest.js';
let loader = new Loader();
describe('loader', function () {
    it('correctly loads Thing as a dependency', () => __awaiter(this, void 0, void 0, function* () {
        let schemaString = yield loader.loadResource('http://schema.org/Product');
        let manifest = yield Manifest.parse(schemaString, { loader, fileName: 'http://schema.org/Product' });
        assert.equal(manifest.schemas.Product.fields.description, 'Text');
    })).timeout(10000);
    it('can read a schema.org schema that aliases another type', () => __awaiter(this, void 0, void 0, function* () {
        let schemaString = yield loader.loadResource('http://schema.org/Restaurant');
        let manifest = yield Manifest.parse(schemaString, { loader, fileName: 'http://schema.org/Restaurant' });
        assert.equal(manifest.schemas.Restaurant.fields.servesCuisine, 'Text');
    })).timeout(10000);
    it('can read a schema.org schema with multiple inheritance', () => __awaiter(this, void 0, void 0, function* () {
        let schemaString = yield loader.loadResource('http://schema.org/LocalBusiness');
        let manifest = yield Manifest.parse(schemaString, { loader, fileName: 'http://schema.org/LocalBusiness' });
        assert.equal(manifest.schemas.LocalBusiness.fields.duns, 'Text');
        assert.equal(manifest.schemas.LocalBusiness.fields.branchCode, 'Text');
    })).timeout(10000);
});
