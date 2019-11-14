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
import { CloneMap, IsValidOptions, Recipe, RecipeComponent, ToStringOptions } from './recipe.js';
import { Slot } from './slot.js';
import { Comparable } from './comparable.js';
import { Dictionary } from '../hot.js';
import { ConsumeSlotConnectionSpec } from '../particle-spec.js';
export declare class SlotConnection implements Comparable<SlotConnection> {
    private readonly _recipe;
    private readonly _particle;
    private readonly _name;
    private _targetSlot?;
    private _providedSlots;
    private _tags;
    constructor(name: string, particle: Particle);
    remove(): void;
    get recipe(): Recipe;
    get particle(): Particle;
    get name(): string;
    getQualifiedName(): string;
    get targetSlot(): Slot | undefined;
    set targetSlot(targetSlot: Slot | undefined);
    get providedSlots(): Dictionary<Slot>;
    get tags(): string[];
    set tags(tags: string[]);
    getSlotSpec(): ConsumeSlotConnectionSpec | undefined;
    connectToSlot(targetSlot: Slot): void;
    disconnectFromSlot(): void;
    _clone(particle: Particle, cloneMap: CloneMap): SlotConnection;
    _normalize(): void;
    _compareTo(other: SlotConnection): number;
    _isValid(options: IsValidOptions): boolean;
    isResolved(options?: any): boolean;
    isConnectedToInternalSlot(): boolean;
    isConnectedToRemoteSlot(): boolean;
    isConnected(): boolean;
    toString(nameMap: Map<RecipeComponent, string>, options: ToStringOptions): string;
}
