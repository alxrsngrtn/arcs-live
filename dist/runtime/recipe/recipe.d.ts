/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Modality } from '../modality.js';
import { HandleConnectionSpec } from '../particle-spec.js';
import { Type } from '../type.js';
import { ConnectionConstraint, EndPoint } from './connection-constraint.js';
import { DirectionArrow } from '../manifest-ast-nodes.js';
import { HandleConnection } from './handle-connection.js';
import { Handle } from './handle.js';
import { Particle } from './particle.js';
import { Search } from './search.js';
import { SlotConnection } from './slot-connection.js';
import { Slot } from './slot.js';
import { Cloneable } from './walker.js';
import { Dictionary } from '../hot.js';
import { Schema } from '../schema.js';
import { TypeVariableInfo } from '../type-variable-info.js';
export declare type RecipeComponent = Particle | Handle | HandleConnection | Slot | SlotConnection | EndPoint;
export declare type CloneMap = Map<RecipeComponent, RecipeComponent>;
export declare type VariableMap = Map<TypeVariableInfo | Schema, TypeVariableInfo | Schema>;
export declare type IsResolvedOptions = {
    showUnresolved?: boolean;
    details?: string[];
};
export declare type IsValidOptions = {
    errors?: Map<Recipe | RecipeComponent, string>;
};
export declare type ToStringOptions = {
    showUnresolved?: boolean;
    hideFields?: boolean;
    details?: string[];
};
export declare class Recipe implements Cloneable<Recipe> {
    private readonly _requires;
    private _particles;
    private _handles;
    private _slots;
    private _name;
    private _localName;
    private _cloneMap;
    annotation: string | undefined;
    triggers: [string, string][][];
    private readonly _connectionConstraints;
    private readonly _obligations;
    private _verbs;
    private _search;
    private _patterns;
    constructor(name?: string);
    newConnectionConstraint(from: EndPoint, to: EndPoint, direction: DirectionArrow): ConnectionConstraint;
    newObligation(from: EndPoint, to: EndPoint, direction: DirectionArrow): ConnectionConstraint;
    removeObligation(obligation: ConnectionConstraint): void;
    removeConstraint(constraint: ConnectionConstraint): void;
    clearConnectionConstraints(): void;
    newRequireSection(): RequireSection;
    newParticle(name: string): Particle;
    removeParticle(particle: Particle): void;
    newHandle(): Handle;
    removeHandle(handle: Handle): void;
    newSlot(name: string): Slot;
    addSlot(slot: Slot): void;
    removeSlot(slot: Slot): void;
    isResolved(options?: any): boolean;
    isCompatible(modality: Modality): boolean;
    readonly modality: Modality;
    allRequiredSlotsPresent(options?: any): boolean;
    private _findDuplicate;
    _isValid(options?: IsValidOptions): boolean;
    readonly requires: RequireSection[];
    name: string | undefined;
    localName: string;
    particles: Particle[];
    handles: Handle[];
    slots: Slot[];
    readonly connectionConstraints: ConnectionConstraint[];
    readonly obligations: ConnectionConstraint[];
    verbs: string[];
    search: Search | null;
    setSearchPhrase(phrase?: string): void;
    readonly slotConnections: SlotConnection[];
    readonly handleConnections: HandleConnection[];
    isEmpty(): boolean;
    findHandle(id: string): Handle;
    findSlot(id: string): Slot;
    patterns: string[];
    description: any;
    digest(): Promise<string>;
    normalize(options?: IsValidOptions): boolean;
    clone(map?: Map<RecipeComponent, RecipeComponent>): Recipe;
    mergeInto(recipe: Recipe): {
        handles: Handle[];
        particles: Particle[];
        slots: Slot[];
        cloneMap: Map<any, any>;
    };
    _copyInto(recipe: Recipe, cloneMap: CloneMap): void;
    updateToClone(dict: Dictionary<any>): Dictionary<any>;
    _makeLocalNameMap(): Map<any, any>;
    toString(options?: ToStringOptions): string;
    getFreeHandles(): Handle[];
    readonly allSpecifiedConnections: {
        particle: Particle;
        connSpec: HandleConnectionSpec;
    }[];
    getFreeConnections(type?: Type): {
        particle: Particle;
        connSpec: HandleConnectionSpec;
    }[];
    findHandleByID(id: string): Handle | undefined;
    getUnnamedUntypedConnections(): HandleConnection | undefined;
    getParticlesByImplFile(files: Set<string>): Particle[];
    findSlotByID(id: string): Slot | undefined;
}
export declare class RequireSection extends Recipe {
    readonly parent: Recipe;
    constructor(parent: Recipe, name?: string);
    findSlotByID(id: string): Slot | undefined;
    toString(options?: ToStringOptions, nameMap?: Map<RecipeComponent, string>): string;
}
