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
export declare enum CheckResultType {
    Success = 0,
    Failure = 1,
    KeepGoing = 2
}
export declare type CheckResult = {
    type: CheckResultType.Success;
} | {
    type: CheckResultType.Failure;
} | {
    type: CheckResultType.KeepGoing;
    checkNext: BackwardsPath[];
};
/**
 * A path that walks backwards through the graph, i.e. it walks along the directed edges in the reverse direction. The path is described by the
 * nodes in the path. Class is immutable.
 *
 * The path can have an open or closed edge at the end. An open edge points to the final node in the path, but does not actually include it.
 */
export declare class BackwardsPath {
    /** Nodes in the path. */
    readonly nodes: readonly Node[];
    /**
     * Optional open edge at the end of the path. If the path is closed, this will be null, and the end of the path is given by the last node
     * in the nodes list.
     */
    readonly openEdge: Edge | null;
    private constructor();
    /** Constructs a new path from the given edge with an open end. */
    static newPathWithOpenEdge(edge: Edge): BackwardsPath;
    /** Constructs a new path from the given edge with a closed end. */
    static newPathWithClosedEdge(edge: Edge): BackwardsPath;
    /** Returns a copy of the current path, with an open edge added to the end of it. Fails if the path already has an open edge. */
    withNewOpenEdge(edge: Edge): BackwardsPath;
    /** Returns a copy of the current path, converting an open edge to a closed one. Fails if the path does not have an open edge. */
    withClosedEnd(): BackwardsPath;
    withNewClosedEdge(edge: Edge): BackwardsPath;
    readonly startNode: Node;
    readonly end: Node | Edge;
}
interface CheckEvaluator {
    /** Evaluates the given check condition. */
    evaluateCheck(check: string, path: BackwardsPath): CheckResult;
}
export declare abstract class Node implements CheckEvaluator {
    abstract readonly inEdges: Edge[];
    abstract readonly outEdges: Edge[];
    evaluateCheck(check: string, path: BackwardsPath): CheckResult;
    readonly inNodes: Node[];
    readonly outNodes: Node[];
}
export interface Edge extends CheckEvaluator {
    readonly start: Node;
    readonly end: Node;
    readonly label: string;
    readonly claim?: string;
    readonly check?: string;
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
    evaluateCheck(check: string, path: BackwardsPath): CheckResult;
}
declare class ParticleOutput implements Edge {
    readonly start: ParticleNode;
    readonly end: Node;
    readonly label: string;
    readonly claim?: string;
    constructor(particleNode: ParticleNode, otherEnd: Node, outputName: string);
    evaluateCheck(check: string, path: BackwardsPath): CheckResult;
}
declare class HandleNode extends Node {
    readonly inEdges: ParticleOutput[];
    readonly outEdges: ParticleInput[];
    constructor(handle: Handle);
    /** Returns a list of all pairs of particles that are connected through this handle, in string form. */
    readonly connectionsAsStrings: string[];
}
export {};
