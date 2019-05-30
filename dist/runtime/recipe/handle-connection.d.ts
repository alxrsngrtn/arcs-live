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
import { Recipe } from './recipe.js';
import { Direction } from '../manifest-ast-nodes.js';
export declare class HandleConnection {
    private readonly _recipe;
    private readonly _name;
    private _tags;
    private resolvedType;
    private _direction;
    private _particle;
    _handle: Handle | undefined;
    constructor(name: string, particle: Particle);
    _clone(particle: Particle, cloneMap: any): any;
    cloneTypeWithResolutions(variableMap: any): void;
    _normalize(): void;
    _compareTo(other: HandleConnection): number;
    readonly recipe: Recipe;
    readonly name: string;
    getQualifiedName(): string;
    tags: string[];
    type: Type;
    direction: Direction | undefined;
    readonly isInput: boolean;
    readonly isOutput: boolean;
    readonly handle: Handle | undefined;
    readonly particle: Particle;
    readonly spec: HandleConnectionSpec;
    readonly isOptional: boolean;
    _isValid(options: any): boolean;
    isResolved(options?: any): boolean;
    private _resetHandleType;
    connectToHandle(handle: Handle): void;
    disconnectHandle(): void;
    toString(nameMap: any, options: any): string;
    findSpecsForUnnamedHandles(): HandleConnectionSpec[];
}
