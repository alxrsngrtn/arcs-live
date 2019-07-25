/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Recipe } from '../../runtime/recipe/recipe.js';
import { Strategy } from '../strategizer.js';
import { GenerateParams, Descendant } from '../../runtime/recipe/walker.js';
export declare class FindRequiredParticle extends Strategy {
    generate(inputParams: GenerateParams<Recipe>): Promise<Descendant<Recipe>[]>;
}
