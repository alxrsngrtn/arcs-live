/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { HandleConnectionSpec, ConsumeSlotConnectionSpec } from '../../runtime/particle-spec.js';
import { Handle } from '../../runtime/recipe/handle.js';
import { Slot } from '../../runtime/recipe/slot.js';
import { Particle } from '../../runtime/recipe/particle.js';
import { Recipe } from '../../runtime/recipe/recipe.js';
import { Strategy } from '../strategizer.js';
import { GenerateParams, Descendant } from '../../runtime/recipe/walker.js';
import { Direction } from '../../runtime/manifest-ast-nodes.js';
import { Dictionary } from '../../runtime/hot.js';
declare type HandleConstraint = {
    handle: Handle;
    direction: Direction;
};
declare type SlotConstraint = {
    targetSlot: Slot;
    providedSlots: Dictionary<Slot>;
};
export declare class MatchRecipeByVerb extends Strategy {
    generate(inputParams: GenerateParams<Recipe>): Promise<Descendant<Recipe>[]>;
    static satisfiesHandleConstraints(recipe: Recipe, handleConstraints: {
        named: Dictionary<HandleConstraint>;
        unnamed: HandleConstraint[];
    }): boolean;
    static satisfiesUnnamedHandleConnection(recipe: Recipe, handleConstraint: HandleConstraint): boolean;
    static satisfiesHandleConnection(recipe: Recipe, handleName: string, handleConstraint: HandleConstraint): boolean;
    static connectionSpecMatchesConstraint(connSpec: HandleConnectionSpec, handleConstraint: HandleConstraint): boolean;
    static connectionMatchesConstraint(connection: {
        direction: Direction;
    }, handleConstraint: HandleConstraint): boolean;
    static satisfiesSlotConstraints(recipe: Recipe, slotConstraints: Dictionary<SlotConstraint>): boolean;
    static satisfiesSlotConnection(recipe: Recipe, slotName: string, constraints: SlotConstraint): boolean;
    static slotsMatchConstraint(particle: Particle, slotSpecs: ReadonlyMap<string, ConsumeSlotConnectionSpec>, name: string, constraints: any): boolean;
}
export {};
