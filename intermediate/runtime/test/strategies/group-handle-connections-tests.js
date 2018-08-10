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
import { GroupHandleConnections } from '../../strategies/group-handle-connections.js';
import { assert } from '../chai-web.js';
describe('GroupHandleConnections', function () {
    let schemaAndParticlesStr = `
    schema Thing
    schema OtherThing
    particle A
      in Thing ithingA1
    particle B
      in Thing ithingB1
      in Thing ithingB2
      in [OtherThing] iotherthingB1
    particle C
      in Thing ithingC1
      out Thing othingC2
      inout [OtherThing] iootherthingC1
    particle D
      in Thing ithingD1
      in Thing ithingD2
      out Thing othingD3
    particle E
      out Thing othingE1
      `;
    it('group in and out handle connections', () => __awaiter(this, void 0, void 0, function* () {
        // TODO: add another Type handle connections to the recipe!
        let manifest = (yield Manifest.parse(`
      ${schemaAndParticlesStr}
      recipe
        A
        B
        C
        D
    `));
        let inputParams = { generated: [{ result: manifest.recipes[0], score: 1 }] };
        let ghc = new GroupHandleConnections();
        let results = yield ghc.generate(inputParams);
        assert.lengthOf(results, 1);
        let recipe = results[0].result;
        assert.lengthOf(recipe.handles, 4);
        // Verify all connections are bound to handles.
        assert.isUndefined(recipe.handleConnections.find(hc => !hc.handle));
        // Verify all handles have non-empty connections list.
        assert.isUndefined(recipe.handles.find(v => v.connections.length == 0));
    }));
    it('does nothing if no grouping is possible', () => __awaiter(this, void 0, void 0, function* () {
        // TODO: add another Type handle connections to the recipe!
        let manifest = (yield Manifest.parse(`
      ${schemaAndParticlesStr}
      recipe
        create as thing
        E
          othingE1 -> thing
        A
          ithingA1 <- thing
        B
    `));
        let inputParams = { generated: [{ result: manifest.recipes[0], score: 1 }] };
        let ghc = new GroupHandleConnections();
        let results = yield ghc.generate(inputParams);
        assert.isEmpty(results);
    }));
});
