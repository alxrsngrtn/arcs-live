/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Recipe } from '../../runtime/recipe/recipe';
import { Particle } from '../../runtime/recipe/particle';
import { Handle } from '../../runtime/recipe/handle';
import { HandleConnection } from '../../runtime/recipe/handle-connection';
import { Claim } from '../../runtime/particle-claim';
import { Check } from '../../runtime/particle-check';
import { HandleConnectionSpec } from '../../runtime/particle-spec';
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
export declare class ValidationResult {
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
    path: BackwardsPath;
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
    abstract readonly inEdges: readonly Edge[];
    abstract readonly outEdges: readonly Edge[];
    abstract addInEdge(edge: Edge): void;
    abstract addOutEdge(edge: Edge): void;
    abstract evaluateCheck(check: Check, edgeToCheck: Edge, path: BackwardsPath): CheckResult;
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
    readonly claim?: Claim;
    readonly check?: Check;
}
declare class ParticleNode extends Node {
    readonly inEdgesByName: Map<string, ParticleInput>;
    readonly outEdgesByName: Map<string, ParticleOutput>;
    readonly name: string;
    readonly claims: Map<string, Claim>;
    readonly checks: Map<string, Check>;
    constructor(particle: Particle);
    addInEdge(edge: ParticleInput): void;
    addOutEdge(edge: ParticleOutput): void;
    readonly inEdges: readonly Edge[];
    readonly outEdges: readonly Edge[];
    evaluateCheck(check: Check, edgeToCheck: ParticleOutput, path: BackwardsPath): CheckResult;
    keepGoingWithInEdges(check: Check, path: BackwardsPath): CheckResult;
}
declare class ParticleInput implements Edge {
    readonly start: Node;
    readonly end: ParticleNode;
    readonly label: string;
    readonly handleName: string;
    readonly connectionSpec: HandleConnectionSpec;
    readonly check?: Check;
    constructor(particleNode: ParticleNode, otherEnd: Node, connection: HandleConnection);
}
declare class ParticleOutput implements Edge {
    readonly start: ParticleNode;
    readonly end: Node;
    readonly label: string;
    readonly handleName: string;
    readonly connectionSpec: HandleConnectionSpec;
    readonly claim?: Claim;
    constructor(particleNode: ParticleNode, otherEnd: Node, connection: HandleConnection);
}
declare class HandleNode extends Node {
    readonly inEdges: ParticleOutput[];
    readonly outEdges: ParticleInput[];
    readonly outConnectionSpecs: Set<HandleConnectionSpec>;
    constructor(handle: Handle);
    /** Returns a list of all pairs of particles that are connected through this handle, in string form. */
    readonly connectionsAsStrings: string[];
    addInEdge(edge: ParticleOutput): void;
    addOutEdge(edge: ParticleInput): void;
    evaluateCheck(check: Check, edgeToCheck: ParticleInput, path: BackwardsPath): CheckResult;
}
export {};
