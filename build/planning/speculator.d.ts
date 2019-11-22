/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../runtime/arc.js';
import { Recipe } from '../runtime/recipe/recipe.js';
import { Relevance } from '../runtime/relevance.js';
export declare class Speculator {
    private speculativeArcs;
    speculate(arc: Arc, plan: Recipe, hash: string): Promise<{
        speculativeArc: Arc;
        relevance: Relevance;
    } | null>;
    private awaitCompletion;
    dispose(): void;
}
