/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../arc.js';
import { ConsumeSlotConnectionSpec } from '../particle-spec.js';
import { Handle } from '../recipe/handle';
import { Particle } from '../recipe/particle.js';
import { RecipeWalker } from '../recipe/recipe-walker.js';
import { Recipe } from '../recipe/recipe.js';
import { SlotConnection } from '../recipe/slot-connection.js';
import { Action } from '../recipe/walker.js';
export declare class ResolveWalker extends RecipeWalker {
    private readonly arc;
    constructor(tactic: any, arc: any);
    onHandle(recipe: Recipe, handle: Handle): (recipe: any, handle: any) => number;
    onSlotConnection(recipe: Recipe, slotConnection: SlotConnection): (recipe: any, slotConnection: any) => number;
    onPotentialSlotConnection(recipe: Recipe, particle: Particle, slotSpec: ConsumeSlotConnectionSpec): (recipe: any, particle: any, slotSpec: any) => number;
    onObligation(recipe: Recipe, obligation: any): (recipe: any, obligation: any) => number;
}
export declare class ResolveRecipeAction extends Action<Recipe> {
    generate(inputParams: any): any;
}
export declare class RecipeResolver {
    private resolver;
    constructor(arc: Arc);
    resolve(recipe: any): Promise<any>;
}
