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
import { assert } from './chai-web.js';
import { Manifest } from '../manifest.js';
let loader = new Loader();
describe('loader', function () {
    it('can extract a path', function () {
        assert.equal(loader.path('a/foo'), 'a/');
    });
    it('can join paths', function () {
        assert.equal(loader.join('a/foo', 'b'), 'a/b');
    });
    it('can join an absolute path', function () {
        assert.equal(loader.join('a/foo', 'http://b'), 'http://b');
        assert.equal(loader.join('a/foo', 'https://b'), 'https://b');
    });
    it('can load a particle from a particle spec', () => __awaiter(this, void 0, void 0, function* () {
        let files = [];
        let testLoader = new class extends Loader {
            requireParticle(fileName) {
                return __awaiter(this, void 0, void 0, function* () {
                    files.push(fileName);
                    return {};
                });
            }
        };
        let options = {
            fileName: 'somewhere/something',
            loader: testLoader,
        };
        let manifest = yield Manifest.parse(`
        schema A
        schema B
        particle Foo in 'foo.js'
          in A a
          out B b`, options);
        let spec = manifest.findParticleByName('Foo');
        assert.equal(spec.implFile, 'somewhere/foo.js');
        let clazz = yield testLoader.loadParticleClass(spec);
        assert.equal(clazz.spec, spec);
        assert.deepEqual(files, ['somewhere/foo.js']);
    }));
});
