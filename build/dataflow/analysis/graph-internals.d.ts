/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @fileoverview
 * FlowGraph internals
 *
 * This file contains the data structures that are meant to be internal to the
 * FlowGraph class. They have been moved into a separate file to break circular
 * dependencies between FlowGraph, Node/Edge, and the concrete implementations
 * of Node/Edge like ParticleNode, etc.
 */
import { Claim } from '../../runtime/particle-claim.js';
import { Check } from '../../runtime/particle-check.js';
import { DeepSet } from './deep-set.js';
import { OrderedSet } from './ordered-set.js';
/**
 * Represents the set of implicit and explicit claims that flow along a path in
 * the graph, i.e. tags, node IDs and edge IDs.
 */
export declare class Flow {
    readonly nodeIds: Set<string>;
    readonly edgeIds: OrderedSet<string>;
    readonly tags: Set<string>;
    constructor(nodeIds?: Set<string>, edgeIds?: OrderedSet<string>, tags?: Set<string>);
    /** Modifies the current Flow (in place) by applying the given FlowModifier. */
    modify(modifier: FlowModifier): void;
    copy(): Flow;
    copyAndModify(modifier: FlowModifier): Flow;
    /** Evaluates the given FlowCheck against the current Flow. */
    evaluateCheck(check: FlowCheck): boolean;
    /** Evaluates the given CheckCondition against the current Flow. */
    private checkCondition;
    toUniqueString(): string;
}
/** A set of unique flows. */
export declare class FlowSet extends DeepSet<Flow> {
    /**
     * Copies the current FlowSet, and applies the given modifier to every flow in
     * the copy.
     */
    copyAndModify(modifier: FlowModifier): DeepSet<Flow>;
}
export declare enum TagOperation {
    Add = "add",
    Remove = "remove"
}
/** Represents a sequence of modifications that can be made to a flow. */
export declare class FlowModifier {
    /** Node IDs to add. */
    readonly nodeIds: Set<string>;
    /** Edge IDs to add. */
    readonly edgeIds: OrderedSet<string>;
    /** Tags to add/remove. Maps from tag name to operation. */
    readonly tagOperations: Map<string, TagOperation>;
    constructor(
    /** Node IDs to add. */
    nodeIds?: Set<string>, 
    /** Edge IDs to add. */
    edgeIds?: OrderedSet<string>, 
    /** Tags to add/remove. Maps from tag name to operation. */
    tagOperations?: Map<string, TagOperation>);
    /**
     * Creates a new FlowModifier from the given list of strings. Each string must
     * start with either a plus or minus symbol (indicating whether the condition
     * is added or removed), then give one of 'tag', 'node', or 'edge', followed
     * by the tag/node/edge ID respectively. (Tags can be added or removed. Nodes
     * and edges can only be added.) e.g. '+node:P2', '+edge:E1', '-tag:trusted'.
     */
    static parse(...conditions: string[]): FlowModifier;
    static fromClaims(edge: Edge, claims: Claim[]): FlowModifier;
    copy(): FlowModifier;
    /** Copies the current FlowModifier, and then applies the given modifications to the copy. */
    copyAndModify(modifier: FlowModifier): FlowModifier;
    toFlow(): Flow;
    toUniqueString(): string;
}
/** A set of FlowModifiers. */
export declare class FlowModifierSet extends DeepSet<FlowModifier> {
    /** Copies the current FlowModifierSet, and extends each modifier in the copy with the given extra modifier. */
    copyAndModify(extraModifier: FlowModifier): DeepSet<FlowModifier>;
}
/** An equivalent of a particle CheckCondition, used internally by FlowGraph. */
export declare type FlowCondition = {
    type: 'node' | 'edge' | 'tag';
    value: string;
    /**
     * Indicates whether the condition is negated, i.e. check that this tag is
     * *not* present.
     */
    negated: boolean;
};
/** An equivalent of a particle Check statement, used internally by FlowGraph. Either a FlowCondition, or a boolean expression. */
export declare type FlowCheck = (FlowCondition | {
    operator: 'or' | 'and';
    children: readonly FlowCheck[];
})
/** Optional Check object from which this FlowCheck was constructed. */
 & {
    originalCheck?: Check;
};
/** Represents a node in a FlowGraph. Can be a particle, handle, etc. */
export declare abstract class Node {
    /** A unique ID for this node. No other node in this graph can have this ID. */
    abstract readonly nodeId: string;
    /**
     * Boolean indicating whether this node has direct ingress or not (e.g. from a
     * external datastore).
     */
    ingress: boolean;
    abstract readonly inEdges: readonly Edge[];
    abstract readonly outEdges: readonly Edge[];
    abstract addInEdge(edge: Edge): void;
    abstract addOutEdge(edge: Edge): void;
    get inNodes(): Node[];
    get outNodes(): Node[];
    abstract inEdgesFromOutEdge(outEdge: Edge): readonly Edge[];
}
/**
 * Represents an edge in a FlowGraph, i.e. a connection between particles,
 * handles, etc.
 */
export interface Edge {
    /** A unique ID for this edge. No other edge in this graph can have this ID. */
    readonly edgeId: string;
    readonly start: Node;
    readonly end: Node;
    /** The name of the handle/slot this edge represents, e.g. "output1". */
    readonly connectionName: string;
    /**
     * The qualified name of the handle/slot this edge represents,
     * e.g. "MyParticle.output1".
     */
    readonly label: string;
    readonly modifier: FlowModifier;
    check?: FlowCheck;
}
