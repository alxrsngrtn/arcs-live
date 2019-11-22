/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { HandleConnectionSpec, ConsumeSlotConnectionSpec } from '../particle-spec.js';
import { ConnectionConstraint } from './connection-constraint.js';
import { HandleConnection } from './handle-connection.js';
import { Handle } from './handle.js';
import { Particle } from './particle.js';
import { Recipe } from './recipe.js';
import { SlotConnection } from './slot-connection.js';
import { Slot } from './slot.js';
import { Walker, Descendant, Continuation } from './walker.js';
export declare class RecipeWalker extends Walker<Recipe> {
    onRecipe?(recipe: Recipe): Continuation<Recipe, []>;
    onHandle?(recipe: Recipe, handle: Handle): Continuation<Recipe, [Handle]>;
    onPotentialHandleConnection?(recipe: Recipe, particle: Particle, connectionSpec: HandleConnectionSpec): Continuation<Recipe, [Particle, HandleConnectionSpec]>;
    onHandleConnection?(recipe: Recipe, handleConnection: HandleConnection): Continuation<Recipe, [HandleConnection]>;
    onParticle?(recipe: Recipe, particle: Particle): Continuation<Recipe, [Particle]>;
    onPotentialSlotConnection?(recipe: Recipe, particle: Particle, slotSpec: ConsumeSlotConnectionSpec): Continuation<Recipe, [Particle, ConsumeSlotConnectionSpec]>;
    onSlotConnection?(recipe: Recipe, slotConnection: SlotConnection): Continuation<Recipe, [SlotConnection]>;
    onSlot?(recipe: Recipe, slot: Slot): Continuation<Recipe, [Slot]>;
    onObligation?(recipe: Recipe, obligation: ConnectionConstraint): Continuation<Recipe, [ConnectionConstraint]>;
    onRequiredParticle?(recipe: Recipe, particle: Particle): Continuation<Recipe, [Particle]>;
    onResult(result: Descendant<Recipe>): void;
    createDescendant(recipe: Recipe, score: number): void;
}
