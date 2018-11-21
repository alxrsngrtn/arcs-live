import { Comparable } from './util.js';
import { ParticleSpec } from '../particle-spec.js';
import { Recipe } from './recipe.js';
import { Handle } from './handle.js';
import { Direction } from './handle-connection.js';
export declare class ParticleEndPoint {
    particle: ParticleSpec;
    connection: string;
    constructor(particle: ParticleSpec, connection: string);
    _clone(cloneMap?: any): ParticleEndPoint;
    _compareTo(other: any): any;
    toString(nameMap?: any): string;
}
export declare class InstanceEndPoint {
    recipe: Recipe;
    instance: Comparable;
    connection: string;
    constructor(instance: any, connection: string);
    _clone(cloneMap: any): InstanceEndPoint;
    _compareTo(other: any): any;
    toString(nameMap: any): string;
}
export declare class HandleEndPoint {
    readonly handle: Handle;
    constructor(handle: Handle);
    _clone(cloneMap?: any): HandleEndPoint;
    _compareTo(other: any): any;
    toString(nameMap?: any): string;
}
export declare class TagEndPoint {
    readonly tags: string[];
    constructor(tags: string[]);
    _clone(cloneMap?: any): TagEndPoint;
    _compareTo(other: any): any;
    toString(nameMap?: any): string;
}
declare type EndPoint = ParticleEndPoint | InstanceEndPoint | HandleEndPoint | TagEndPoint;
export declare class ConnectionConstraint {
    from: EndPoint;
    to: EndPoint;
    direction: Direction;
    type: 'constraint' | 'obligation';
    constructor(fromConnection: EndPoint, toConnection: EndPoint, direction: Direction, type: 'constraint' | 'obligation');
    _copyInto(recipe: any, cloneMap: any): any;
    _compareTo(other: any): any;
    toString(nameMap?: any, options?: any): string;
}
export {};
