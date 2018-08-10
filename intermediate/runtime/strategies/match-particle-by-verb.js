// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Strategy } from '../../strategizer/strategizer.js';
import { Recipe } from '../recipe/recipe.js';
import { Walker } from '../recipe/walker.js';
export class MatchParticleByVerb extends Strategy {
    constructor(arc) {
        super();
        this._arc = arc;
    }
    generate(inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let arc = this._arc;
            return Recipe.over(this.getResults(inputParams), new class extends Walker {
                onParticle(recipe, particle) {
                    if (particle.name) {
                        // Particle already has explicit name.
                        return;
                    }
                    let particleSpecs = arc.context.findParticlesByVerb(particle.primaryVerb)
                        .filter(spec => !arc.pec.slotComposer || spec.matchAffordance(arc.pec.slotComposer.affordance));
                    return particleSpecs.map(spec => {
                        return (recipe, particle) => {
                            let score = 1;
                            particle.name = spec.name;
                            particle.spec = spec;
                            return score;
                        };
                    });
                }
            }(Walker.Permuted), this);
        });
    }
}
