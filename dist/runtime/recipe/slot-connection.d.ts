import { Particle } from './particle.js';
import { Recipe } from './recipe.js';
import { Slot } from './slot.js';
export declare class SlotConnection {
    private readonly _recipe;
    private readonly _particle;
    private readonly _name;
    private _targetSlot?;
    private _providedSlots;
    private _tags;
    constructor(name: string, particle: Particle);
    remove(): void;
    readonly recipe: Recipe;
    readonly particle: Particle;
    readonly name: string;
    getQualifiedName(): string;
    targetSlot: Slot;
    readonly providedSlots: {
        [index: string]: Slot;
    };
    tags: string[];
    getSlotSpec(): import("../particle-spec.js").ConsumeSlotConnectionSpec;
    connectToSlot(targetSlot: Slot): void;
    disconnectFromSlot(): void;
    _clone(particle: Particle, cloneMap: any): SlotConnection;
    _normalize(): void;
    _compareTo(other: SlotConnection): number;
    _isValid(options: any): boolean;
    isResolved(options?: any): boolean;
    isConnectedToInternalSlot(): boolean;
    isConnectedToRemoteSlot(): boolean;
    isConnected(): boolean;
    toString(nameMap: any, options: any): string;
}
