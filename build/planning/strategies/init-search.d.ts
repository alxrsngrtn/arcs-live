/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Recipe } from '../../runtime/recipe/recipe.js';
import { Descendant } from '../../runtime/recipe/walker.js';
import { Strategy } from '../strategizer.js';
export declare class InitSearch extends Strategy {
    _search: any;
    constructor(arc: any, { search }: {
        search: any;
    });
    generate({ generation }: {
        generation: any;
    }): Promise<Descendant<Recipe>[]>;
}
