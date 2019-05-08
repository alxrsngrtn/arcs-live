import { Handle } from './handle.js';
import { Recipe } from './recipe.js';
import { SlotConnection } from './slot-connection.js';
export declare class Slot {
    private readonly _recipe;
    private _id?;
    private _localName?;
    private _name;
    private _tags;
    private _sourceConnection;
    private _formFactor?;
    private _consumeConnections;
    constructor(recipe: Recipe, name: string);
    readonly recipe: Recipe;
    id: string | undefined;
    localName: string | undefined;
    name: string;
    tags: string[];
    formFactor: string | undefined;
    sourceConnection: SlotConnection | undefined;
    readonly consumeConnections: SlotConnection[];
    readonly spec: import("../particle-spec.js").ConsumeSlotConnectionSpec | {
        isSet: boolean;
        tags: any[];
    };
    readonly handles: Handle[];
    _copyInto(recipe: Recipe, cloneMap: any): any;
    _startNormalize(): void;
    _finishNormalize(): void;
    _compareTo(other: Slot): number;
    findHandleByID(id: any): Handle;
    removeConsumeConnection(slotConnection: any): void;
    remove(): void;
    isResolved(options?: any): boolean;
    _isValid(options: any): boolean;
    toString(nameMap: any, options: any): string;
}
