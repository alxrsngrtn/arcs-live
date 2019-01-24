// Copyright (c) 2018 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
import { StrategizerWalker, Strategy } from '../../planning/strategizer.js';
import { ResolveWalker } from '../recipe/recipe-resolver.js';
export class ResolveRecipe extends Strategy {
    async generate(inputParams) {
        return StrategizerWalker.over(this.getResults(inputParams), new ResolveWalker(ResolveWalker.Permuted, this.arc), this);
    }
}
//# sourceMappingURL=resolve-recipe.js.map