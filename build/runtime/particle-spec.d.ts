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
import { Direction, ParticleClaimStatement, ParticleCheckStatement } from './manifest-ast-nodes.js';
import { Schema } from './schema.js';
import { TypeVariableInfo } from './type-variable-info.js';
import { InterfaceType, SlotType, Type, TypeLiteral } from './type.js';
import { Literal } from './hot.js';
import { Check } from './particle-check.js';
import { Claim } from './particle-claim.js';
declare type SerializedHandleConnectionSpec = {
    direction: Direction;
    name: string;
    type: Type | TypeLiteral;
    isOptional: boolean;
    tags?: string[];
    dependentConnections: SerializedHandleConnectionSpec[];
    check?: string;
};
export declare class HandleConnectionSpec {
    rawData: SerializedHandleConnectionSpec;
    direction: Direction;
    name: string;
    type: Type;
    isOptional: boolean;
    tags: string[];
    dependentConnections: HandleConnectionSpec[];
    pattern?: string;
    parentConnection: HandleConnectionSpec | null;
    claim?: Claim;
    check?: Check;
    constructor(rawData: SerializedHandleConnectionSpec, typeVarMap: Map<string, Type>);
    instantiateDependentConnections(particle: any, typeVarMap: Map<string, Type>): void;
    readonly isInput: boolean;
    readonly isOutput: boolean;
    isCompatibleType(type: Type): boolean;
}
declare type SerializedSlotConnectionSpec = {
    name: string;
    isRequired?: boolean;
    isSet?: boolean;
    tags?: string[];
    formFactor?: string;
    handles?: string[];
    provideSlotConnections?: SerializedSlotConnectionSpec[];
    check?: Check;
};
export declare class ConsumeSlotConnectionSpec {
    name: string;
    isRequired: boolean;
    isSet: boolean;
    tags: string[];
    formFactor: string;
    handles: string[];
    provideSlotConnections: ProvideSlotConnectionSpec[];
    constructor(slotModel: SerializedSlotConnectionSpec);
    readonly isOptional: boolean;
    readonly direction: string;
    readonly type: SlotType;
    readonly dependentConnections: ProvideSlotConnectionSpec[];
}
export declare class ProvideSlotConnectionSpec extends ConsumeSlotConnectionSpec {
    check?: Check;
    constructor(slotModel: SerializedSlotConnectionSpec);
}
export interface SerializedParticleSpec extends Literal {
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
    slotConnections: SerializedSlotConnectionSpec[];
    trustClaims?: ParticleClaimStatement[];
    trustChecks?: ParticleCheckStatement[];
}
export declare class ParticleSpec {
    private readonly model;
    name: string;
    verbs: string[];
    handleConnectionMap: Map<string, HandleConnectionSpec>;
    pattern: string;
    implFile: string;
    implBlobUrl: string | null;
    modality: Modality;
    slotConnections: Map<string, ConsumeSlotConnectionSpec>;
    trustClaims: Map<string, Claim>;
    trustChecks: Check[];
    constructor(model: SerializedParticleSpec);
    createConnection(arg: SerializedHandleConnectionSpec, typeVarMap: Map<string, Type>): HandleConnectionSpec;
    readonly handleConnections: HandleConnectionSpec[];
    readonly connections: HandleConnectionSpec[];
    readonly inputs: HandleConnectionSpec[];
    readonly outputs: HandleConnectionSpec[];
    isInput(param: string): boolean;
    isOutput(param: string): boolean;
    getConnectionByName(name: string): HandleConnectionSpec | undefined;
    getSlotSpec(slotName: string): ConsumeSlotConnectionSpec | undefined;
    readonly slotConnectionNames: string[];
    readonly primaryVerb: string | undefined;
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
    private validateTrustClaims;
    private validateTrustChecks;
    private getProvidedSlotsByName;
}
export {};
