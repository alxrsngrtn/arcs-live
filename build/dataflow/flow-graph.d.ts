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
    validateGraph(): ValidationResult;
    /** Validates a single check (on the given edge). Returns true if the check passes. */
    private validateSingleEdge;
}
/** Result from validating an entire graph. */
declare class ValidationResult {
    failures: string[];
    readonly isValid: boolean;
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
    reason: string;
} | {
    type: CheckResultType.KeepGoing;
    checkNext: BackwardsPath[];
};
/**
 * A path that walks backwards through the graph, i.e. it walks along the directed edges in the reverse direction. The path is described by the
 * nodes in the path. Class is immutable.
 */
export declare class BackwardsPath {
    /** Nodes in the path. */
    readonly nodes: readonly Node[];
    /** Edges in the path. */
    readonly edges: readonly Edge[];
    private constructor();
    /** Constructs a new path from the given edge. */
    static fromEdge(edge: Edge): BackwardsPath;
    /** Returns a copy of the current path, with an edge added to the end of it. */
    withNewEdge(edge: Edge): BackwardsPath;
    readonly startNode: Node;
    readonly endNode: Node;
    readonly endEdge: Edge;
}
export declare abstract class Node {
    abstract readonly inEdges: Edge[];
    abstract readonly outEdges: Edge[];
    abstract evaluateCheck(check: string, edgeToCheck: Edge, path: BackwardsPath): CheckResult;
    readonly inNodes: Node[];
    readonly outNodes: Node[];
}
export interface Edge {
    readonly start: Node;
    readonly end: Node;
    /** The name of the handle this edge represents, e.g. "output1". */
    readonly handleName: string;
    /** The qualified name of the handle this edge represents, e.g. "MyParticle.output1". */
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
    evaluateCheck(check: string, edgeToCheck: ParticleOutput, path: BackwardsPath): CheckResult;
}
declare class ParticleInput implements Edge {
    readonly start: Node;
    readonly end: ParticleNode;
    readonly label: string;
    readonly handleName: string;
    readonly check?: string;
    constructor(particleNode: ParticleNode, otherEnd: Node, inputName: string);
}
declare class ParticleOutput implements Edge {
    readonly start: ParticleNode;
    readonly end: Node;
    readonly label: string;
    readonly handleName: string;
    readonly claim?: string;
    constructor(particleNode: ParticleNode, otherEnd: Node, outputName: string);
}
declare class HandleNode extends Node {
    readonly inEdges: ParticleOutput[];
    readonly outEdges: ParticleInput[];
    constructor(handle: Handle);
    /** Returns a list of all pairs of particles that are connected through this handle, in string form. */
    readonly connectionsAsStrings: string[];
    evaluateCheck(check: string, edgeToCheck: ParticleInput, path: BackwardsPath): CheckResult;
}
export {};
