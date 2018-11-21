/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
interface Handle {
    type: Type;
    name: string;
    direction: string;
}
interface Slot {
    name: string;
    direction: string;
    isRequired: boolean;
    isSet: boolean;
}
export declare class Shape {
    name: string;
    handles: Handle[];
    slots: Slot[];
    private readonly typeVars;
    constructor(name: string, handles: Handle[], slots: Slot[]);
    toPrettyString(): string;
    mergeTypeVariablesByName(variableMap: any): void;
    readonly canReadSubset: Shape;
    readonly canWriteSuperset: Shape;
    isMoreSpecificThan(other: any): boolean;
    _applyExistenceTypeTest(test: any): boolean;
    _handlesToManifestString(): string;
    _slotsToManifestString(): string;
    toString(): string;
    static fromLiteral(data: any): Shape;
    toLiteral(): {
        name: string;
        handles: {
            type: any;
            name: any;
            direction: any;
        }[];
        slots: {
            name: any;
            direction: any;
            isRequired: any;
            isSet: any;
        }[];
    };
    clone(variableMap: any): Shape;
    cloneWithResolutions(variableMap: any): any;
    _cloneWithResolutions(variableMap: any): any;
    canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    tryMergeTypeVariablesWith(other: any): Shape;
    resolvedType(): Shape;
    equals(other: any): boolean;
    _equalHandle(handle: any, otherHandle: any): any;
    _equalSlot(slot: any, otherSlot: any): boolean;
    _equalItems(otherItems: any, items: any, compareItem: any): boolean;
    _cloneAndUpdate(update: any): Shape;
    static _updateTypeVar(typeVar: any, update: any): void;
    static isTypeVar(reference: any): any;
    static mustMatch(reference: any): boolean;
    static handlesMatch(shapeHandle: any, particleHandle: any): any;
    static slotsMatch(shapeSlot: any, particleSlot: any): boolean;
    particleMatches(particleSpec: any): boolean;
    restrictType(particleSpec: any): false | this;
    _restrictThis(particleSpec: any): false | this;
}
import { Type } from './type.js';
export {};
