/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { HandleConnectionSpec } from '../particle-spec.js';
import { Type } from '../type.js';
import { Handle } from './handle.js';
import { SlotConnection } from './slot-connection.js';
import { Particle } from './particle.js';
import { CloneMap, IsValidOptions, Recipe, RecipeComponent, ToStringOptions, VariableMap } from './recipe.js';
import { Comparable } from './comparable.js';
import { Direction } from '../manifest-ast-nodes.js';
export declare class HandleConnection implements Comparable<HandleConnection> {
    private readonly _recipe;
    private _name;
    private _tags;
    private resolvedType?;
    private _direction;
    private _particle;
    _handle?: Handle;
    constructor(name: string, particle: Particle);
    _clone(particle: Particle, cloneMap: CloneMap): HandleConnection;
    cloneTypeWithResolutions(variableMap: VariableMap): void;
    _normalize(): void;
    _compareTo(other: HandleConnection): number;
    get recipe(): Recipe;
    get name(): string;
    getQualifiedName(): string;
    get tags(): string[];
    get type(): Type | undefined | null;
    get direction(): Direction;
    get isInput(): boolean;
    get isOutput(): boolean;
    get handle(): Handle | undefined;
    get particle(): Particle;
    set tags(tags: string[]);
    set type(type: Type | undefined | null);
    set direction(direction: Direction);
    get spec(): HandleConnectionSpec;
    toSlotConnection(): SlotConnection;
    get isOptional(): boolean;
    _isValid(options: IsValidOptions): boolean;
    isResolved(options?: any): boolean;
    private _resetHandleType;
    connectToHandle(handle: Handle): void;
    disconnectHandle(): void;
    toString(nameMap: Map<RecipeComponent, string>, options: ToStringOptions): string;
    findSpecsForUnnamedHandles(): HandleConnectionSpec[];
}
