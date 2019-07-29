/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { FlowGraph } from './flow-graph.js';
import { Edge, FlowSet, FlowModifierSet, Flow } from './graph-internals.js';
import { Recipe } from '../../runtime/recipe/recipe.js';
import { Manifest } from '../../runtime/manifest.js';
/** Runs the dataflow analyser on the given recipe. */
export declare function analyseDataflow(recipe: Recipe, manifest: Manifest): [FlowGraph, ValidationResult];
/** Failure result reported when a check statement is not satisfied. */
declare class CheckFailure {
    readonly check: string;
    readonly flow: Flow;
    constructor(check: string, flow: Flow);
    getFailureMessage(graph: FlowGraph): string;
}
/**
 * Failure result reported when there is no data ingress into an edge with a
 * check statement.
 */
declare class IngressFailure {
    readonly check: string;
    constructor(check: string);
    getFailureMessage(graph: FlowGraph): string;
}
/** Result from validating an entire graph. */
export declare class ValidationResult {
    readonly checkFailures: CheckFailure[];
    readonly ingressFailures: IngressFailure[];
    addCheckFailure(check: string, flow: Flow): void;
    addIngressFailure(check: string): void;
    addAllFailures(other: ValidationResult): void;
    readonly isValid: boolean;
    getFailureMessages(graph: FlowGraph): string[];
}
/** Returns true if all checks in the graph pass. */
export declare function validateGraph(graph: FlowGraph): ValidationResult;
/**
 * A flow expression for an edge. When fully resolved, it contains a set of
 * resolved flows into the edge. When unresolved, it contains references to each
 * parent edge, and a set of modifiers which should be applied to the flow from
 * that edge.
 */
export declare class EdgeExpression {
    /** The edge we're talking about. */
    readonly edge: Edge;
    /** Fully resolved flows coming into this edge. */
    readonly resolvedFlows: FlowSet;
    /**
     * Edges upon which this edge depends. Not yet resolved. Maps from a parent
     * edge to the set of modifiers which should be applied to it.
     */
    readonly unresolvedFlows: Map<Edge, FlowModifierSet>;
    constructor(edge: Edge);
    readonly isResolved: boolean;
    readonly parents: Edge[];
    /**
     * Replaces an unresolved parent with the parent's own expression. Any
     * resolved flows into the parent get copied and modified to become resolved
     * into the child. Unresolved flows into the parent become unresolved flows
     * into the child (with the child's modifiers added too).
     */
    expandParent(parentExpr: EdgeExpression): void;
    /** Add a new unresolved flow, consisting of the given edge and a modifier for it. */
    private inheritFromEdge;
    removeSelfReference(): void;
    toString(): string;
}
export declare class Solver {
    readonly edges: readonly Edge[];
    /** Maps from an edge to a "expression" for it. */
    readonly edgeExpressions: Map<Edge, EdgeExpression>;
    /**
     * Maps from an edge to the set of edge expressions which depends something
     * upon it.
     */
    readonly dependentExpressions: Map<Edge, Set<EdgeExpression>>;
    private _isResolved;
    constructor(edges: readonly Edge[]);
    /** Returns true if every edge in the graph has been fully resolved to a FlowSet. */
    readonly isResolved: boolean;
    /**
     * Runs through every check on an edge in the graph, and validates it against
     * the resolved flows into that edge.
     */
    validateAllChecks(): ValidationResult;
    validateCheckOnEdge(edge: Edge): ValidationResult;
    /**
     * Fully resolves the graph. All edges will have a fully resolved edge
     * expression at the end of this function.
     */
    resolve(): void;
    /**
     * Constructs a new EdgeExpression for the given edge, and tries to expand as
     * many of its unresolved parents as is possible. The edge expression might
     * still not be fully resolved at the end of this function.
     */
    processEdge(edge: Edge): EdgeExpression;
    /**
     * Takes an edge expression with an unresolved parent edge, and tries to
     * expand out that parent edge using the parent edge's own expression.
     */
    private tryExpandParent;
}
export {};
