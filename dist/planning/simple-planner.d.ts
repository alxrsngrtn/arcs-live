/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../runtime/arc.js';
import { Recipe } from '../runtime/recipe/recipe.js';
export declare class Match {
    readonly trigger: [string, string][];
    readonly recipe: Recipe;
    constructor(trigger: [string, string][], recipe: Recipe);
    matches(request: [string, string][]): boolean;
}
/**
 * A very simple planner that looks up recipes based on triggers in the
 * manifest file matching requests.
 */
export declare class SimplePlanner {
    readonly recipes: Recipe[];
    private _recipesByTrigger;
    get recipesByTrigger(): Match[];
    constructor(recipes: Recipe[]);
    plan(arc: Arc, request: [string, string][]): Promise<Recipe>;
}
