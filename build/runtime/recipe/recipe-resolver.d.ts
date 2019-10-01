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
import { Action, GenerateParams } from './walker.js';
import { ConsumeSlotConnectionSpec } from '../particle-spec.js';
import { Handle } from './handle.js';
import { Particle } from './particle.js';
import { RecipeWalker } from './recipe-walker.js';
import { Recipe, IsValidOptions } from './recipe.js';
import { ConnectionConstraint } from './connection-constraint.js';
import { SlotConnection } from './slot-connection.js';
import { Continuation } from './walker.js';
export declare class ResolveWalker extends RecipeWalker {
    private options;
    private readonly arc;
    constructor(tactic: any, arc: any, options?: any);
    onHandle(recipe: Recipe, handle: Handle): Continuation<Recipe, Handle[]>;
    onSlotConnection(_recipe: Recipe, slotConnection: SlotConnection): Continuation<Recipe, SlotConnection[]>;
    onPotentialSlotConnection(_recipe: Recipe, particle: Particle, slotSpec: ConsumeSlotConnectionSpec): any[] | ((_recipe: Recipe, particle: Particle, slotSpec: ConsumeSlotConnectionSpec) => number);
    onObligation(recipe: Recipe, obligation: ConnectionConstraint): any[] | ((recipe: any, obligation: any) => number);
}
export declare class ResolveRecipeAction extends Action<Recipe> {
    private options;
    withOptions(options: IsValidOptions): void;
    generate(inputParams: GenerateParams<Recipe>): any;
}
export declare class RecipeResolver {
    private resolver;
    constructor(arc: Arc);
    resolve(recipe: Recipe, options?: IsValidOptions): Promise<Recipe>;
}
