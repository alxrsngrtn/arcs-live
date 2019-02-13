import { ConnectionSpec } from '../particle-spec.js';
import { Type } from '../type.js';
import { Handle } from './handle.js';
import { Particle } from './particle.js';
import { Recipe } from './recipe.js';
export declare type Direction = 'in' | 'out' | 'inout' | 'host';
export declare class HandleConnection {
    _recipe: Recipe;
    _name: string;
    _tags: string[];
    _type: Type | undefined;
    _rawType: Type | undefined;
    _direction: Direction | undefined;
    _particle: Particle;
    _handle: Handle | undefined;
    constructor(name: any, particle: any);
    _clone(particle: any, cloneMap: any): any;
    _normalize(): void;
    _compareTo(other: any): number;
    readonly recipe: Recipe;
    readonly name: string;
    getQualifiedName(): string;
    tags: string[];
    type: Type;
    readonly rawType: Type;
    direction: Direction;
    readonly isInput: boolean;
    readonly isOutput: boolean;
    readonly handle: Handle;
    readonly particle: Particle;
    readonly spec: ConnectionSpec;
    readonly isOptional: boolean;
    _isValid(options: any): boolean;
    isResolved(options?: any): boolean;
    _resetHandleType(): void;
    connectToHandle(handle: any): void;
    disconnectHandle(): void;
    toString(nameMap: any, options: any): string;
    findSpecsForUnnamedHandles(): ConnectionSpec[];
}
