/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ParticleSpec, ConsumeSlotConnectionSpec } from '../particle-spec.js';
import { Type } from '../type.js';
import { HandleConnection } from './handle-connection.js';
import { CloneMap, IsValidOptions, Recipe, RecipeComponent, VariableMap, ToStringOptions } from './recipe.js';
import { SlotConnection } from './slot-connection.js';
import { Slot } from './slot.js';
import { Comparable } from './comparable.js';
import { Id } from '../id.js';
import { Dictionary } from '../hot.js';
export declare class Particle implements Comparable<Particle> {
    private readonly _recipe;
    private _id?;
    private _name;
    private _localName?;
    spec?: ParticleSpec;
    private _verbs;
    private _tags;
    private _connections;
    _unnamedConnections: HandleConnection[];
    _consumedSlotConnections: Dictionary<SlotConnection>;
    constructor(recipe: Recipe, name: string);
    _copyInto(recipe: Recipe, cloneMap: CloneMap, variableMap: VariableMap): Particle;
    _cloneConnectionRawTypes(variableMap: VariableMap): void;
    _startNormalize(): void;
    _finishNormalize(): void;
    _compareTo(other: Particle): number;
    /**
     * Param particle matches this particle if the names are the same and the slot and handle requirements this particle
     * is a subset of the slot and handle requirements of the param particle.
     * @param particle
     */
    matches(particle: Particle): boolean;
    _isValid(options: IsValidOptions): boolean;
    isResolved(options?: any): boolean;
    readonly recipe: Recipe;
    localName: string;
    id: Id;
    name: string;
    readonly connections: Dictionary<HandleConnection>;
    readonly unnamedConnections: HandleConnection[];
    readonly consumedSlotConnections: Dictionary<SlotConnection>;
    readonly primaryVerb: string;
    verbs: string[];
    tags: string[];
    addUnnamedConnection(): HandleConnection;
    addConnectionName(name: string): HandleConnection;
    allConnections(): HandleConnection[];
    ensureConnectionName(name: string): HandleConnection;
    getConnectionByName(name: string): HandleConnection;
    nameConnection(connection: HandleConnection, name: string): void;
    getUnboundConnections(type?: Type): import("../particle-spec.js").HandleConnectionSpec[];
    addSlotConnection(name: string): SlotConnection;
    addSlotConnectionAsCopy(name: string): SlotConnection;
    removeSlotConnection(slotConnection: SlotConnection): void;
    remove(): void;
    getSlotConnectionBySpec(spec: ConsumeSlotConnectionSpec): SlotConnection;
    getSlotConnections(): (SlotConnection | HandleConnection)[];
    getSlotSpecByName(name: string): ConsumeSlotConnectionSpec | undefined;
    getSlotConnectionByName(name: string): SlotConnection;
    getProvidedSlotByName(consumeName: string, name: string): Slot;
    getSlotSpecs(): Map<string, ConsumeSlotConnectionSpec>;
    isJavaParticle(): boolean;
    toString(options?: ToStringOptions, nameMap?: Map<RecipeComponent, string>): string;
}
