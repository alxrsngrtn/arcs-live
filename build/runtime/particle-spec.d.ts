/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Modality } from './modality.js';
import { Direction } from './recipe/handle-connection.js';
import { Schema } from './schema.js';
import { TypeVariableInfo } from './type-variable-info.js';
import { InterfaceType, Type, TypeLiteral } from './type.js';
declare type SerializedHandleConnectionSpec = {
    direction: Direction;
    name: string;
    type: Type | TypeLiteral;
    isOptional: boolean;
    tags?: string[];
    dependentConnections: SerializedHandleConnectionSpec[];
};
export declare class HandleConnectionSpec {
    rawData: SerializedHandleConnectionSpec;
    direction: Direction;
    name: string;
    type: Type;
    isOptional: boolean;
    tags: string[];
    dependentConnections: HandleConnectionSpec[];
    pattern: string;
    parentConnection: HandleConnectionSpec | null;
    constructor(rawData: SerializedHandleConnectionSpec, typeVarMap: Map<string, Type>);
    instantiateDependentConnections(particle: any, typeVarMap: Map<string, Type>): void;
    readonly isInput: boolean;
    readonly isOutput: boolean;
    isCompatibleType(type: Type): any;
}
declare type SerializedConsumeSlotConnectionSpec = {
    name: string;
    isRequired: boolean;
    isSet: boolean;
    tags: string[];
    formFactor: string;
    provideSlotConnections: SerializedProvideSlotConnectionSpec[];
};
export declare class ConsumeSlotConnectionSpec {
    name: string;
    isRequired: boolean;
    isSet: boolean;
    tags: string[];
    formFactor: string;
    provideSlotConnections: ProvideSlotConnectionSpec[];
    constructor(slotModel: SerializedConsumeSlotConnectionSpec);
    getProvidedSlotSpec(name: any): ProvideSlotConnectionSpec;
}
declare type SerializedProvideSlotConnectionSpec = {
    name: string;
    isRequired?: boolean;
    isSet?: boolean;
    tags?: string[];
    formFactor?: string;
    handles?: string[];
};
export declare class ProvideSlotConnectionSpec {
    name: string;
    isRequired: boolean;
    isSet: boolean;
    tags: string[];
    formFactor: string;
    handles: string[];
    constructor(slotModel: SerializedProvideSlotConnectionSpec);
}
export declare type SerializedParticleSpec = {
    name: string;
    id?: string;
    verbs: string[];
    args: SerializedHandleConnectionSpec[];
    description: {
        pattern?: string;
    };
    implFile: string;
    implBlobUrl: string | null;
    modality: string[];
    slotConnections: SerializedConsumeSlotConnectionSpec[];
};
export declare class ParticleSpec {
    private readonly model;
    name: string;
    verbs: string[];
    handleConnections: HandleConnectionSpec[];
    handleConnectionMap: Map<string, HandleConnectionSpec>;
    inputs: HandleConnectionSpec[];
    outputs: HandleConnectionSpec[];
    pattern: string;
    implFile: string;
    implBlobUrl: string | null;
    modality: Modality;
    slotConnections: Map<string, ConsumeSlotConnectionSpec>;
    constructor(model: SerializedParticleSpec);
    createConnection(arg: SerializedHandleConnectionSpec, typeVarMap: Map<string, Type>): HandleConnectionSpec;
    isInput(param: string): boolean;
    isOutput(param: string): boolean;
    getConnectionByName(name: string): HandleConnectionSpec;
    getSlotSpec(slotName: string): ConsumeSlotConnectionSpec;
    readonly primaryVerb: string;
    isCompatible(modality: Modality): boolean;
    setImplBlobUrl(url: string): void;
    toLiteral(): SerializedParticleSpec;
    static fromLiteral(literal: SerializedParticleSpec): ParticleSpec;
    clone(): ParticleSpec;
    cloneWithResolutions(variableMap: Map<TypeVariableInfo | Schema, TypeVariableInfo | Schema>): ParticleSpec;
    equals(other: any): boolean;
    validateDescription(description: any): void;
    toInterface(): InterfaceType;
    toString(): string;
    toManifestString(): string;
}
export {};
