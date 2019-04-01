import { Modality } from '../modality.js';
import { HandleConnectionSpec } from '../particle-spec.js';
import { Type } from '../type.js';
import { ConnectionConstraint } from './connection-constraint.js';
import { HandleConnection } from './handle-connection.js';
import { Handle } from './handle.js';
import { Particle } from './particle.js';
import { Search } from './search.js';
import { SlotConnection } from './slot-connection.js';
import { Slot } from './slot.js';
export declare type RecipeComponent = Particle | Handle | HandleConnection | Slot | SlotConnection;
export declare type CloneMap = Map<RecipeComponent, RecipeComponent>;
export declare type IsValidOptions = {
    errors: Map<RecipeComponent, string>;
};
export declare type ToStringOptions = {
    showUnresolved?: boolean;
    hideFields?: boolean;
};
export declare class Recipe {
    private _requires;
    private _particles;
    private _handles;
    private _slots;
    private _name;
    private _localName;
    private _cloneMap;
    annotation: string | undefined;
    private _connectionConstraints;
    private _obligations;
    private _verbs;
    private _search;
    private _patterns;
    constructor(name?: any);
    newConnectionConstraint(from: any, to: any, direction: any): ConnectionConstraint;
    newObligation(from: any, to: any, direction: any): ConnectionConstraint;
    removeObligation(obligation: any): void;
    removeConstraint(constraint: any): void;
    clearConnectionConstraints(): void;
    newRequireSection(): RequireSection;
    newParticle(name: any): Particle;
    removeParticle(particle: Particle): void;
    newHandle(): Handle;
    removeHandle(handle: any): void;
    newSlot(name: any): Slot;
    addSlot(slot: Slot): void;
    removeSlot(slot: any): void;
    isResolved(): boolean;
    isCompatible(modality: Modality): boolean;
    readonly modality: Modality;
    allRequiredSlotsPresent(): boolean;
    _findDuplicate(items: any, options: any): any;
    _isValid(options?: any): boolean;
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
    findHandle(id: any): Handle;
    findSlot(id: any): Slot;
    patterns: string[];
    description: any;
    digest(): Promise<string>;
    normalize(options?: any): boolean;
    clone(cloneMap?: any): Recipe;
    mergeInto(recipe: Recipe): {
        handles: Handle[];
        particles: Particle[];
        slots: Slot[];
        cloneMap: Map<any, any>;
    };
    _copyInto(recipe: any, cloneMap: any): void;
    updateToClone(dict: any): {
        [index: string]: any;
    };
    _makeLocalNameMap(): Map<any, any>;
    toString(options?: any): string;
    getFreeHandles(): Handle[];
    readonly allSpecifiedConnections: {
        particle: Particle;
        connSpec: HandleConnectionSpec;
    }[];
    getFreeConnections(type?: Type): {
        particle: Particle;
        connSpec: HandleConnectionSpec;
    }[];
    findHandleByID(id: any): Handle;
    getUnnamedUntypedConnections(): HandleConnection;
    getParticlesByImplFile(files: Set<string>): Particle[];
    findSlotByID(id: any): Slot;
}
export declare class RequireSection extends Recipe {
    parent: Recipe;
    constructor(parent?: any, name?: any);
    toString(nameMap?: any, options?: any): string;
}
