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
import { Particle } from './particle.js';
import { CloneMap, IsValidOptions, Recipe, RecipeComponent, ToStringOptions, VariableMap } from './recipe.js';
import { Comparable } from './comparable.js';
import { Direction } from '../manifest-ast-nodes.js';
export declare class HandleConnection implements Comparable<HandleConnection> {
    private readonly _recipe;
    _name: string;
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
    readonly recipe: Recipe;
    readonly name: string;
    getQualifiedName(): string;
    tags: string[];
    type: Type | undefined | null;
    direction: Direction;
    readonly isInput: boolean;
    readonly isOutput: boolean;
    readonly handle: Handle | undefined;
    readonly particle: Particle;
    readonly spec: HandleConnectionSpec;
    readonly isOptional: boolean;
    _isValid(options: IsValidOptions): boolean;
    isResolved(options?: any): boolean;
    private _resetHandleType;
    connectToHandle(handle: Handle): void;
    disconnectHandle(): void;
    toString(nameMap: Map<RecipeComponent, string>, options: ToStringOptions): string;
    findSpecsForUnnamedHandles(): HandleConnectionSpec[];
}
