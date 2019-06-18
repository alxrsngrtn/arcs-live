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
import { ParticleTrustClaim, ParticleTrustClaimIsTag } from '../../runtime/manifest-ast-nodes';
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
/** Represents a check condition on an edge. */
export declare class Check {
    /** A list of acceptable tags. The check will fail if a different claim is found that doesn't match any tag in this list. */
    readonly acceptedTags: readonly string[];
    constructor(
    /** A list of acceptable tags. The check will fail if a different claim is found that doesn't match any tag in this list. */
    acceptedTags: readonly string[]);
    /** Returns true if the given claim satisfies the check condition. */
    checkAgainstClaim(claim: ParticleTrustClaimIsTag): boolean;
    toString(): string;
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
    readonly claim?: ParticleTrustClaim;
    readonly check?: Check;
}
declare class ParticleNode extends Node {
    readonly inEdgesByName: Map<string, ParticleInput>;
    readonly outEdgesByName: Map<string, ParticleOutput>;
    readonly name: string;
    readonly claims: Map<string, ParticleTrustClaim>;
    readonly checks: Map<string, Check>;
    constructor(particle: Particle);
    addInEdge(edge: ParticleInput): void;
    addOutEdge(edge: ParticleOutput): void;
    readonly inEdges: readonly Edge[];
    readonly outEdges: readonly Edge[];
    evaluateCheck(check: Check, edgeToCheck: ParticleOutput, path: BackwardsPath): CheckResult;
}
declare class ParticleInput implements Edge {
    readonly start: Node;
    readonly end: ParticleNode;
    readonly label: string;
    readonly handleName: string;
    readonly check?: Check;
    constructor(particleNode: ParticleNode, otherEnd: Node, inputName: string);
}
declare class ParticleOutput implements Edge {
    readonly start: ParticleNode;
    readonly end: Node;
    readonly label: string;
    readonly handleName: string;
    readonly claim?: ParticleTrustClaim;
    constructor(particleNode: ParticleNode, otherEnd: Node, outputName: string);
}
declare class HandleNode extends Node {
    readonly inEdges: ParticleOutput[];
    readonly outEdges: ParticleInput[];
    constructor(handle: Handle);
    /** Returns a list of all pairs of particles that are connected through this handle, in string form. */
    readonly connectionsAsStrings: string[];
    addInEdge(edge: ParticleOutput): void;
    addOutEdge(edge: ParticleInput): void;
    evaluateCheck(check: Check, edgeToCheck: ParticleInput, path: BackwardsPath): CheckResult;
}
export {};
