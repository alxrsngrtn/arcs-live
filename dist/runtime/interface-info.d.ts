/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Predicate } from '../runtime/hot.js';
import { Type, TypeVariable, TypeLiteral } from './type.js';
import { ParticleSpec } from './particle-spec.js';
interface Handle {
    type?: Type;
    name?: string | TypeVariable;
    direction?: string;
}
interface HandleLiteral {
    type?: TypeLiteral;
    name?: string | TypeLiteral;
    direction?: string;
}
interface Slot {
    name?: string | TypeVariable;
    direction?: string;
    isRequired?: boolean;
    isSet?: boolean;
}
interface SlotLiteral {
    name?: string | TypeLiteral;
    direction?: string;
    isRequired?: boolean;
    isSet?: boolean;
}
interface TypeVarReference {
    object: Handle | Slot;
    field: string;
}
export interface InterfaceInfoLiteral {
    name: string;
    handles: HandleLiteral[];
    slots: SlotLiteral[];
}
declare type MatchResult = {
    var: TypeVariable;
    value: Type;
    direction: string;
};
export declare class InterfaceInfo {
    name: string;
    handles: Handle[];
    slots: Slot[];
    readonly typeVars: TypeVarReference[];
    constructor(name: string, handles: Handle[], slots: Slot[]);
    toPrettyString(): string;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): void;
    readonly canReadSubset: InterfaceInfo;
    readonly canWriteSuperset: InterfaceInfo;
    isMoreSpecificThan(other: InterfaceInfo): boolean;
    _applyExistenceTypeTest(test: Predicate<TypeVarReference>): boolean;
    _handlesToManifestString(): string;
    _slotsToManifestString(): string;
    toString(): string;
    static fromLiteral(data: InterfaceInfoLiteral): InterfaceInfo;
    toLiteral(): InterfaceInfoLiteral;
    clone(variableMap: Map<string, Type>): InterfaceInfo;
    cloneWithResolutions(variableMap: Map<string, Type>): InterfaceInfo;
    _cloneWithResolutions(variableMap: Map<string, Type>): InterfaceInfo;
    canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    tryMergeTypeVariablesWith(other: InterfaceInfo): InterfaceInfo;
    resolvedType(): InterfaceInfo;
    equals(other: InterfaceInfo): boolean;
    _equalHandle(handle: Handle, otherHandle: Handle): boolean;
    _equalSlot(slot: Slot, otherSlot: Slot): boolean;
    _equalItems<T>(otherItems: T[], items: T[], compareItem: (a: T, b: T) => boolean): boolean;
    _cloneAndUpdate(update: (t: Type) => Type): InterfaceInfo;
    static _updateTypeVar(typeVar: TypeVarReference, update: (t: Type) => Type): void;
    static isTypeVar(reference: TypeVariable | Type | string | boolean): boolean;
    static mustMatch(reference: TypeVariable | Type | string | boolean): boolean;
    static handlesMatch(interfaceHandle: Handle, particleHandle: Handle): boolean | MatchResult[];
    static slotsMatch(interfaceSlot: Slot, particleSlot: Slot): boolean;
    particleMatches(particleSpec: ParticleSpec): boolean;
    restrictType(particleSpec: ParticleSpec): boolean;
    _restrictThis(particleSpec: ParticleSpec): boolean;
}
export {};
