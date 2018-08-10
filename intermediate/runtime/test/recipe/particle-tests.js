/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
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
import { Manifest } from '../../manifest.js';
import { assert } from '../chai-web.js';
describe('Recipe Particle', function () {
    it('cloning maints type variable mapping', () => __awaiter(this, void 0, void 0, function* () {
        let manifest = yield Manifest.parse(`
      shape HostedShape
        in ~a *

      particle Multiplexer
        host HostedShape hostedParticle
        in [~a] list

      recipe
        create as items
        Multiplexer
          list = items
    `);
        let recipe = manifest.recipes[0];
        {
            const [recipeParticle] = recipe.particles;
            const hostedParticleConn = recipeParticle.connections['hostedParticle'];
            const listConn = recipeParticle.connections['list'];
            const shapeVariable = hostedParticleConn.type.interfaceShape.handles[0].type;
            const listUnpackedVariable = listConn.type.collectionType;
            assert.strictEqual(shapeVariable.variable, listUnpackedVariable.variable);
        }
        recipe = recipe.clone();
        {
            const recipeParticle = recipe.particles[0];
            const hostedParticleConn = recipeParticle.connections['hostedParticle'];
            const listConn = recipeParticle.connections['list'];
            const shapeVariable = hostedParticleConn.type.interfaceShape.handles[0].type;
            const listUnpackedVariable = listConn.type.collectionType;
            assert.strictEqual(shapeVariable.variable, listUnpackedVariable.variable);
        }
    }));
});
