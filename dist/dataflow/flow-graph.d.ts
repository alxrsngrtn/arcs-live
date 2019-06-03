/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Recipe } from '../runtime/recipe/recipe';
import { Particle } from '../runtime/recipe/particle';
import { Handle } from '../runtime/recipe/handle';
/**
 * Data structure for representing the connectivity graph of a recipe. Used to perform static analysis on a resolved recipe.
 */
export declare class FlowGraph {
    readonly particles: ParticleNode[];
    readonly handles: HandleNode[];
    readonly nodes: Node[];
    readonly edges: Edge[];
    /** Maps from particle name to node. */
    readonly particleMap: Map<string, ParticleNode>;
    constructor(recipe: Recipe);
    /** Returns a list of all pairwise particle connections, in string form: 'P1.foo -> P2.bar'. */
    readonly connectionsAsStrings: string[];
    /** Returns true if all checks in the graph pass. */
    validateGraph(): boolean;
    /** Validates a single check (on the given edge). Returns true if the check passes. */
    private validateSingleEdge;
}
export declare enum CheckResult {
    Success = 0,
    Failure = 1,
    KeepGoing = 2
}
/**
 * A path that walks backwards through the graph, i.e. it walks along the directed edges in the reverse direction. The path is described by the
 * nodes in the path. Class is immutable.
 */
export declare class BackwardsPath {
    readonly nodes: readonly Node[];
    private constructor();
    static fromEdge(edge: Edge): BackwardsPath;
    newPathWithEdge(edge: Edge): BackwardsPath;
    readonly startNode: Node;
    readonly endNode: Node;
}
export declare abstract class Node {
    abstract readonly inEdges: Edge[];
    abstract readonly outEdges: Edge[];
    readonly inNodes: Node[];
    readonly outNodes: Node[];
}
export interface Edge {
    readonly start: Node;
    readonly end: Node;
    readonly label: string;
    readonly claim?: string;
    readonly check?: string;
    /** Returns true if this edge has a claim that satisfies the given check condition. */
    isCheckSatisfied(check: string): CheckResult;
}
declare class ParticleNode extends Node {
    readonly inEdges: ParticleInput[];
    readonly outEdges: ParticleOutput[];
    readonly name: string;
    readonly claims: Map<string, string>;
    readonly checks: Map<string, string>;
    constructor(particle: Particle);
}
declare class ParticleInput implements Edge {
    readonly start: Node;
    readonly end: ParticleNode;
    readonly label: string;
    readonly check?: string;
    constructor(particleNode: ParticleNode, otherEnd: Node, inputName: string);
    isCheckSatisfied(check: string): CheckResult;
}
declare class ParticleOutput implements Edge {
    readonly start: ParticleNode;
    readonly end: Node;
    readonly label: string;
    readonly claim?: string;
    constructor(particleNode: ParticleNode, otherEnd: Node, outputName: string);
    isCheckSatisfied(check: string): CheckResult;
}
declare class HandleNode extends Node {
    readonly inEdges: ParticleOutput[];
    readonly outEdges: ParticleInput[];
    constructor(handle: Handle);
    /** Returns a list of all pairs of particles that are connected through this handle, in string form. */
    readonly connectionsAsStrings: string[];
}
export {};
