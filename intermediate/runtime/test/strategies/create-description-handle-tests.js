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
import { CreateDescriptionHandle } from '../../strategies/create-description-handle.js';
import { assert } from '../chai-web.js';
describe('CreateDescriptionHandle', function () {
    it('descriptions handle created', () => __awaiter(this, void 0, void 0, function* () {
        let manifest = (yield Manifest.parse(`
      schema Description
      particle DoSomething in 'AA.js'
        out [Description] descriptions

      recipe
        DoSomething as particle0
    `));
        let recipe = manifest.recipes[0];
        let inputParams = { generated: [{ result: manifest.recipes[0], score: 1 }], terminal: [] };
        let strategy = new CreateDescriptionHandle();
        let results = (yield strategy.generate(inputParams));
        assert.lengthOf(results, 1);
        let plan = results[0].result;
        assert.lengthOf(plan.handles, 1);
        assert.equal('create', plan.handles[0].fate);
        assert.isTrue(plan.isResolved());
    }));
});
