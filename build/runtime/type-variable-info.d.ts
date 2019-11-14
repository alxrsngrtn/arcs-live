/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Type, TypeLiteral } from './type.js';
interface TypeVariableInfoLiteral {
    name: string;
    canWriteSuperset?: TypeLiteral;
    canReadSubset?: TypeLiteral;
}
export declare class TypeVariableInfo {
    name: string;
    _canWriteSuperset?: Type | null;
    _canReadSubset?: Type | null;
    _resolution?: Type | null;
    constructor(name: string, canWriteSuperset?: Type, canReadSubset?: Type);
    /**
     * Merge both the read subset (upper bound) and write superset (lower bound) constraints
     * of two variables together. Use this when two separate type variables need to resolve
     * to the same value.
     */
    maybeMergeConstraints(variable: TypeVariableInfo): boolean;
    /**
     * Merge a type variable's read subset (upper bound) constraints into this variable.
     * This is used to accumulate read constraints when resolving a handle's type.
     */
    maybeMergeCanReadSubset(constraint: Type): boolean;
    /**
     * merge a type variable's write superset (lower bound) constraints into this variable.
     * This is used to accumulate write constraints when resolving a handle's type.
     */
    maybeMergeCanWriteSuperset(constraint: Type): boolean;
    isSatisfiedBy(type: Type): boolean;
    get resolution(): Type | null;
    isValidResolutionCandidate(value: Type): {
        result: boolean;
        detail?: string;
    };
    set resolution(value: Type);
    get canWriteSuperset(): Type | null;
    set canWriteSuperset(value: Type | null);
    get canReadSubset(): Type | null;
    set canReadSubset(value: Type | null);
    get hasConstraint(): boolean;
    canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    toLiteral(): TypeVariableInfoLiteral;
    toLiteralIgnoringResolutions(): TypeVariableInfoLiteral;
    static fromLiteral(data: TypeVariableInfoLiteral): TypeVariableInfo;
    isResolved(): boolean;
}
export {};
