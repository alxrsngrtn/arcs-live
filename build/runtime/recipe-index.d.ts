/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from './arc.js';
import { Recipe } from './recipe/recipe.js';
import { Slot } from './recipe/slot.js';
import { Handle } from './recipe/handle.js';
import { ProvidedSlotSpec, SlotSpec } from './particle-spec.js';
import { Particle } from './recipe/particle.js';
import { HandleConnection } from './recipe/handle-connection.js';
declare type ConsumeSlotConnectionMatch = {
    recipeParticle: Particle;
    slotSpec: SlotSpec;
    matchingHandles: {
        handle: Handle;
        matchingConn: HandleConnection;
    }[];
};
export declare class RecipeIndex {
    ready: any;
    private _recipes;
    private _isReady;
    constructor(arc: Arc, { reportGenerations }?: {
        reportGenerations?: boolean;
    });
    static create(arc: Arc, options?: {}): RecipeIndex;
    readonly recipes: Recipe[];
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
    findConsumeSlotConnectionMatch(particle: Particle, providedSlotSpec: ProvidedSlotSpec): ConsumeSlotConnectionMatch[];
    findProvidedSlot(particle: Particle, slotSpec: SlotSpec): Slot[];
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
    readonly coalescableFates: string[];
    findCoalescableHandles(recipe: Recipe, otherRecipe: Recipe, usedHandles?: Set<Handle>): Map<Handle, Handle>;
}
export {};
