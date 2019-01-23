import { SlotConnection } from './slot-connection.js';
import { HandleConnection } from './handle-connection.js';
import { Recipe } from './recipe.js';
import { ParticleSpec, SlotSpec } from '../particle-spec.js';
import { Slot } from './slot.js';
export declare class Particle {
    private readonly _recipe;
    private _id;
    private _name;
    private _localName;
    private _spec;
    private _verbs;
    private _connections;
    _unnamedConnections: HandleConnection[];
    _consumedSlotConnections: {
        [index: string]: SlotConnection;
    };
    constructor(recipe: Recipe, name: string);
    _copyInto(recipe: Recipe, cloneMap: any): Particle;
    _cloneConnectionRawTypes(): void;
    _startNormalize(): void;
    _finishNormalize(): void;
    _compareTo(other: any): any;
    _isValid(options: any): boolean;
    isResolved(options?: any): boolean;
    readonly recipe: Recipe;
    localName: string;
    id: string;
    name: string;
    spec: ParticleSpec;
    readonly connections: {
        [index: string]: HandleConnection;
    };
    readonly unnamedConnections: HandleConnection[];
    readonly consumedSlotConnections: {
        [index: string]: SlotConnection;
    };
    readonly primaryVerb: string;
    verbs: any;
    addUnnamedConnection(): HandleConnection;
    addConnectionName(name: any): HandleConnection;
    allConnections(): HandleConnection[];
    ensureConnectionName(name: any): HandleConnection;
    getConnectionByName(name: any): HandleConnection;
    nameConnection(connection: any, name: any): void;
    addSlotConnection(name: string): SlotConnection;
    addSlotConnectionAsCopy(name: string): SlotConnection;
    removeSlotConnection(slotConnection: any): void;
    remove(): void;
    getSlotConnectionBySpec(spec: SlotSpec): SlotConnection;
    getSlotSpecByName(name: string): SlotSpec;
    getSlotConnectionByName(name: string): SlotConnection;
    getProvidedSlotByName(consumeName: string, name: string): Slot;
    getSlotSpecs(): Map<string, SlotSpec>;
    toString(nameMap: any, options: any): string;
}
