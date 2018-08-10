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
export class InitPopulation extends Strategy {
    constructor(arc, { contextual = false }) {
        super();
        this._arc = arc;
        this._contextual = contextual;
        this._loadedParticles = new Set(this._arc.loadedParticles().map(spec => spec.implFile));
    }
    generate({ generation }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (generation != 0) {
                return [];
            }
            yield this._arc.recipeIndex.ready;
            const results = this._contextual
                ? this._contextualResults()
                : this._allResults();
            return results.map(({ recipe, score = 1 }) => ({
                result: recipe,
                score,
                derivation: [{ strategy: this, parent: undefined }],
                hash: recipe.digest(),
                valid: Object.isFrozen(recipe)
            }));
        });
    }
    _contextualResults() {
        let results = [];
        for (let slot of this._arc.activeRecipe.slots.filter(s => s.sourceConnection)) {
            results.push(...this._arc.recipeIndex.findConsumeSlotConnectionMatch(slot).map(({ slotConn }) => ({ recipe: slotConn.recipe })));
        }
        let innerArcHandles = [];
        for (let recipe of this._arc._recipes) {
            for (let innerArc of [...recipe.innerArcs.values()]) {
                innerArcHandles = innerArcHandles.concat(innerArc.activeRecipe.handles);
            }
        }
        for (let handle of this._arc.activeRecipe.handles.concat(innerArcHandles)) {
            results.push(...this._arc.recipeIndex.findHandleMatch(handle, ['use', '?']).map(otherHandle => ({ recipe: otherHandle.recipe })));
        }
        return results;
    }
    _allResults() {
        return this._arc.recipeIndex.recipes.map(recipe => ({
            recipe,
            score: 1 - recipe.particles.filter(particle => particle.spec && this._loadedParticles.has(particle.spec.implFile)).length
        }));
    }
}
