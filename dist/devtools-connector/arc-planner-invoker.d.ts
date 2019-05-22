/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../runtime/arc.js';
import { Predicate } from '../runtime/hot.js';
import { ArcDevtoolsChannel } from './abstract-devtools-channel.js';
import { Manifest } from '../runtime/manifest.js';
import { Recipe } from '../runtime/recipe/recipe.js';
import { Descendant } from '../runtime/recipe/walker.js';
import { Strategy, StrategyDerived } from '../planning/strategizer.js';
export declare class ArcPlannerInvoker {
    private arc;
    private recipeIndex;
    constructor(arc: Arc, arcDevtoolsChannel: ArcDevtoolsChannel);
    private invokePlanner;
    multiStrategyRun(recipe: Recipe, method: string): Promise<{
        results: {
            recipe: string;
            derivation: string[];
            errors: {
                error: any;
            }[];
        }[];
    }>;
    singleStrategyRun(recipe: Recipe, strategyName: string): Promise<{
        results: {
            recipe: string;
            derivation: string[];
            errors: {
                error: any;
            }[];
        }[];
    } | {
        error: {
            message: string;
        };
    }>;
    instantiate(strategyClass: StrategyDerived): Strategy;
    processStrategyOutput(inputs: Descendant<Recipe>[]): {
        results: {
            recipe: string;
            derivation: string[];
            errors: {
                error: any;
            }[];
        }[];
    };
    extractDerivation(result: Descendant<Recipe>): string[];
    processManifestError(error: any): {
        suggestion: any;
        error: {
            location: any;
            message: any;
        };
    };
    findManifestNames(manifest: Manifest, predicate: Predicate<Manifest>): string[];
    findManifestNamesRecursive(manifest: Manifest, predicate: Predicate<Manifest>, fileNames: Map<string, number>): number;
}
