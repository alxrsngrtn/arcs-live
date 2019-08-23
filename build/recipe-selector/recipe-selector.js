/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { RecipeResolver } from '../runtime/recipe/recipe-resolver.js';
// One entry in the lookup table, i.e. one trigger and the recipe it invokes.
export class Match {
    constructor(trigger, recipe) {
        this.trigger = trigger;
        this.recipe = recipe;
    }
    // The definition of a matching trigger is embodied in this function.
    // This first implementation matches if every key-value pair in the trigger
    // is present in the request. The request may contain other pairs, and the
    // order of the matching pairs need not be the same as the order in the trigger. 
    matches(request) {
        if (this.trigger.length > request.length)
            return false;
        for (const pair of this.trigger) {
            const found = request.findIndex(r => r[0] === pair[0] && r[1] === pair[1]);
            if (found === -1)
                return false;
        }
        return true;
    }
}
export class RecipeSelector {
    // Only recipes with “@trigger” annotations get included in the lookup table.
    // Other recipes are silently ignored. This relies on the triggers array
    // being always present but empty if there are no triggers.
    // The order of the Matches in the lookup table preserves the order of the
    // Recipes in the constructor argument, and within each recipe the order of
    // the triggers in the triggers field of the recipe.
    constructor(recipes) {
        this.recipes = recipes;
        this._table = [];
        recipes.forEach(recipe => {
            recipe.triggers.forEach(trigger => {
                if (this._table.find(match => match.matches(trigger))) {
                    throw new Error('Duplicate recipe trigger!');
                }
                this._table.push(new Match(trigger, recipe));
            });
        });
    }
    // For testing only
    get table() {
        return this._table;
    }
    // Returns a Recipe or null if no trigger matches the request
    // The table is consulted in order and the first successful match is returned.
    select(request) {
        const found = this._table.find(match => match.matches(request));
        if (found)
            return found.recipe;
        return null;
    }
}
export class SimplePlanner {
    constructor(recipes) {
        this.recipes = recipes;
        this._selector = new RecipeSelector(recipes);
    }
    async plan(arc, request) {
        const resolver = new RecipeResolver(arc);
        const recipe = this._selector.select(request);
        if (recipe) {
            return await resolver.resolve(recipe);
        }
        return null;
    }
}
//# sourceMappingURL=recipe-selector.js.map