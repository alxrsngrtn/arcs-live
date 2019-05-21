/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { PlanningResult } from './planning-result.js';
import { Suggestion } from './suggestion.js';
import { Arc } from '../../runtime/arc.js';
import { Recipe } from '../../runtime/recipe/recipe.js';
export declare class SuggestionCache {
    readonly suggestionByHash: {
        [hash: string]: Suggestion;
    };
    constructor(planningResult?: PlanningResult);
    getSuggestion(hash: string, plan: Recipe, arc: Arc): Suggestion | undefined;
    setSuggestion(hash: string, suggestion: Suggestion): void;
}
