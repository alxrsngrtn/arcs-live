/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Handle } from './handle.js';
import { CloneMap, IsResolvedOptions, IsValidOptions, Recipe, RecipeComponent, ToStringOptions } from './recipe.js';
import { SlotConnection } from './slot-connection.js';
import { Comparable } from './comparable.js';
export declare class Slot implements Comparable<Slot> {
    private readonly _recipe;
    private _id?;
    private _localName?;
    private _name;
    private _tags;
    private _sourceConnection;
    private _formFactor?;
    private _consumeConnections;
    constructor(recipe: Recipe, name: string);
    get recipe(): Recipe;
    get id(): string | undefined;
    set id(id: string);
    get localName(): string | undefined;
    set localName(localName: string | undefined);
    get name(): string;
    set name(name: string);
    get tags(): string[];
    set tags(tags: string[]);
    get formFactor(): string | undefined;
    set formFactor(formFactor: string | undefined);
    get sourceConnection(): SlotConnection | undefined;
    set sourceConnection(sourceConnection: SlotConnection | undefined);
    get consumeConnections(): SlotConnection[];
    get spec(): import("../particle-spec.js").ConsumeSlotConnectionSpec | {
        isSet: boolean;
        tags: any[];
    };
    get handles(): Handle[];
    _copyInto(recipe: Recipe, cloneMap: CloneMap): Slot;
    _startNormalize(): void;
    _finishNormalize(): void;
    _compareTo(other: Slot): number;
    findHandleByID(id: string): Handle;
    removeConsumeConnection(slotConnection: SlotConnection): void;
    remove(): void;
    isResolved(options?: IsResolvedOptions): boolean;
    _isValid(options: IsValidOptions): boolean;
    toString(options?: ToStringOptions, nameMap?: Map<RecipeComponent, string>): string;
}
