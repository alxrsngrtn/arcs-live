import { ParticleSpec } from '../particle-spec.js';
import { Direction } from './handle-connection.js';
import { Handle } from './handle.js';
import { Comparable } from './comparable.js';
import { Recipe, RecipeComponent, CloneMap, ToStringOptions } from './recipe.js';
import { Particle } from './particle.js';
export declare abstract class EndPoint implements Comparable<EndPoint> {
    abstract _compareTo(other: EndPoint): number;
    abstract _clone(cloneMap?: CloneMap): any;
    abstract toString(nameMap?: Map<RecipeComponent, string>): any;
}
export declare class ParticleEndPoint extends EndPoint {
    particle: ParticleSpec;
    connection: string;
    constructor(particle: ParticleSpec, connection: string);
    _clone(cloneMap?: CloneMap): ParticleEndPoint;
    _compareTo(other: ParticleEndPoint): number;
    toString(nameMap?: Map<RecipeComponent, string>): string;
}
export declare class InstanceEndPoint extends EndPoint {
    instance: Particle;
    connection: string;
    constructor(instance: Particle, connection: string);
    _clone(cloneMap: CloneMap): InstanceEndPoint;
    _compareTo(other: InstanceEndPoint): number;
    toString(nameMap: Map<RecipeComponent, string>): string;
}
export declare class HandleEndPoint extends EndPoint {
    readonly handle: Handle;
    constructor(handle: Handle);
    _clone(cloneMap?: CloneMap): HandleEndPoint;
    _compareTo(other: HandleEndPoint): number;
    toString(nameMap?: Map<RecipeComponent, string>): string;
}
export declare class TagEndPoint extends EndPoint {
    readonly tags: string[];
    constructor(tags: string[]);
    _clone(cloneMap?: CloneMap): TagEndPoint;
    _compareTo(other: TagEndPoint): number;
    toString(nameMap?: Map<RecipeComponent, string>): string;
}
export declare class ConnectionConstraint implements Comparable<ConnectionConstraint> {
    from: EndPoint;
    to: EndPoint;
    direction: Direction;
    type: 'constraint' | 'obligation';
    constructor(fromConnection: EndPoint, toConnection: EndPoint, direction: Direction, type: 'constraint' | 'obligation');
    _copyInto(recipe: Recipe, cloneMap: CloneMap): ConnectionConstraint;
    _compareTo(other: ConnectionConstraint): number;
    toString(nameMap?: Map<RecipeComponent, string>, options?: ToStringOptions): string;
}
