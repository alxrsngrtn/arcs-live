// Copyright (c) 2018 Google Inc. All rights reserved.
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
import { ResolveRecipe } from '../strategies/resolve-recipe.js';
// Provides basic recipe resolution for recipes against a particular arc.
export class RecipeResolver {
    constructor(arc) {
        this._resolver = new ResolveRecipe(arc);
    }
    // Attempts to run basic resolution on the given recipe. Returns a new
    // instance of the recipe normalized and resolved if possible. Returns null if
    // normalization or attempting to resolve slot connection fails.
    resolve(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            recipe = recipe.clone();
            let options = { errors: new Map() };
            if (!recipe.normalize(options)) {
                console.warn(`could not normalize a recipe: ${[...options.errors.values()].join('\n')}.\n${recipe.toString()}`);
                return null;
            }
            const result = yield this._resolver.generate({ generated: [{ result: recipe, score: 1 }], terminal: [] });
            return (result.length == 0) ? null : result[0].result;
        });
    }
}
