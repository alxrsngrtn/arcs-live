/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Particle } from './particle.js';
import { Recipe } from './recipe.js';
import { Slot } from './slot.js';
import { Dictionary } from '../hot.js';
export declare class SlotConnection {
    private readonly _recipe;
    private readonly _particle;
    private readonly _name;
    private _targetSlot?;
    private _providedSlots;
    private _tags;
    constructor(name: string, particle: Particle);
    remove(): void;
    readonly recipe: Recipe;
    readonly particle: Particle;
    readonly name: string;
    getQualifiedName(): string;
    targetSlot: Slot;
    readonly providedSlots: Dictionary<Slot>;
    tags: string[];
    getSlotSpec(): import("../particle-spec.js").ConsumeSlotConnectionSpec;
    connectToSlot(targetSlot: Slot): void;
    disconnectFromSlot(): void;
    _clone(particle: Particle, cloneMap: any): SlotConnection;
    _normalize(): void;
    _compareTo(other: SlotConnection): number;
    _isValid(options: any): boolean;
    isResolved(options?: any): boolean;
    isConnectedToInternalSlot(): boolean;
    isConnectedToRemoteSlot(): boolean;
    isConnected(): boolean;
    toString(nameMap: any, options: any): string;
}
