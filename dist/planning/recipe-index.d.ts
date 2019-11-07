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
import { ProvideSlotConnectionSpec, ConsumeSlotConnectionSpec } from '../runtime/particle-spec.js';
import { HandleConnection } from '../runtime/recipe/handle-connection.js';
import { Handle } from '../runtime/recipe/handle.js';
import { Particle } from '../runtime/recipe/particle.js';
import { Recipe } from '../runtime/recipe/recipe.js';
import { Slot } from '../runtime/recipe/slot.js';
declare type MatchingHandle = {
    handle?: Handle;
    matchingConn: HandleConnection;
};
declare type ConsumeSlotConnectionMatch = {
    recipeParticle: Particle;
    slotSpec: ConsumeSlotConnectionSpec;
    matchingHandles: MatchingHandle[];
};
export declare class RecipeIndex {
    ready: any;
    private _recipes;
    private _isReady;
    constructor(arc: Arc);
    static create(arc: Arc): RecipeIndex;
    get recipes(): Recipe[];
    ensureReady(): void;
    /**
     * Given provided handle and requested fates, finds handles with
     * matching type and requested fate.
     */
    findHandleMatch(handle: Handle, requestedFates?: string[]): Handle[];
    doesHandleMatch(handle: Handle, otherHandle: Handle): boolean;
    /**
     * Given a particle and a slot spec for a slot that particle could provide, find consume slot connections that
     * could be connected to the potential slot.
     */
    findConsumeSlotConnectionMatch(particle: Particle, providedSlotSpec: ProvideSlotConnectionSpec): ConsumeSlotConnectionMatch[];
    findProvidedSlot(particle: Particle, slotSpec: ConsumeSlotConnectionSpec): Slot[];
    private _getMatchingHandles;
    /**
     * Helper function that determines whether handle connections in a provided slot
     * and a potential consuming slot connection could be match, considering their fates and directions.
     *
     * - `slotHandleConn` is a handle connection restricting the provided slot.
     * - `matchingHandleConn` - a handle connection of a particle, whose slot connection is explored
     *    as a potential match to a slot above.
     */
    private _fatesAndDirectionsMatch;
    get coalescableFates(): string[];
    findCoalescableHandles(recipe: Recipe, otherRecipe: Recipe, usedHandles?: Set<Handle>): Map<Handle, Handle>;
}
export {};
