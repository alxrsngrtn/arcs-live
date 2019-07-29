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
import { assert } from '../../platform/assert-web.js';
import { FlowModifier, FlowSet, FlowModifierSet } from './graph-internals.js';
/** Runs the dataflow analyser on the given recipe. */
export function analyseDataflow(recipe, manifest) {
    const graph = new FlowGraph(recipe, manifest);
    return [graph, validateGraph(graph)];
}
/** Failure result reported when a check statement is not satisfied. */
class CheckFailure {
    constructor(check, flow) {
        this.check = check;
        this.flow = flow;
    }
    getFailureMessage(graph) {
        return `'${this.check}' failed for path: ${graph.edgeIdsToPath(this.flow.edgeIds.asArray())}`;
    }
}
/**
 * Failure result reported when there is no data ingress into an edge with a
 * check statement.
 */
class IngressFailure {
    constructor(check) {
        this.check = check;
    }
    getFailureMessage(graph) {
        return `'${this.check}' failed: no data ingress.`;
    }
}
/** Result from validating an entire graph. */
export class ValidationResult {
    constructor() {
        this.checkFailures = [];
        this.ingressFailures = [];
    }
    addCheckFailure(check, flow) {
        this.checkFailures.push(new CheckFailure(check, flow));
    }
    addIngressFailure(check) {
        this.ingressFailures.push(new IngressFailure(check));
    }
    addAllFailures(other) {
        other.checkFailures.forEach(f => this.addCheckFailure(f.check, f.flow));
        other.ingressFailures.forEach(f => this.addIngressFailure(f.check));
    }
    get isValid() {
        return this.checkFailures.length === 0 && this.ingressFailures.length === 0;
    }
    getFailureMessages(graph) {
        return [
            ...this.ingressFailures.map(f => f.getFailureMessage(graph)),
            ...this.checkFailures.map(f => f.getFailureMessage(graph)),
        ];
    }
}
/** Returns true if all checks in the graph pass. */
export function validateGraph(graph) {
    const solver = new Solver(graph.edges);
    solver.resolve();
    return solver.validateAllChecks();
}
/**
 * A flow expression for an edge. When fully resolved, it contains a set of
 * resolved flows into the edge. When unresolved, it contains references to each
 * parent edge, and a set of modifiers which should be applied to the flow from
 * that edge.
 */
export class EdgeExpression {
    constructor(edge) {
        /** Fully resolved flows coming into this edge. */
        this.resolvedFlows = new FlowSet();
        /**
         * Edges upon which this edge depends. Not yet resolved. Maps from a parent
         * edge to the set of modifiers which should be applied to it.
         */
        this.unresolvedFlows = new Map();
        this.edge = edge;
        const modifier = edge.modifier || new FlowModifier();
        const parentEdges = edge.start.inEdgesFromOutEdge(edge);
        if (parentEdges.length > 0) {
            // Indicate that this edge inherits from its parents (and apply 
            // modifiers).
            parentEdges.forEach(e => this.inheritFromEdge(e, modifier));
        }
        if (edge.start.ingress) {
            this.resolvedFlows.add(modifier.toFlow());
        }
    }
    get isResolved() {
        return this.unresolvedFlows.size === 0;
    }
    get parents() {
        return [...this.unresolvedFlows.keys()];
    }
    /**
     * Replaces an unresolved parent with the parent's own expression. Any
     * resolved flows into the parent get copied and modified to become resolved
     * into the child. Unresolved flows into the parent become unresolved flows
     * into the child (with the child's modifiers added too).
     */
    expandParent(parentExpr) {
        assert(this.unresolvedFlows.has(parentExpr.edge), `Can't substitute parent edge, it's not an unresolved parent.`);
        // Remove unresolved parent, and replace with unresolved grandparents.
        const modifierSet = this.unresolvedFlows.get(parentExpr.edge);
        this.unresolvedFlows.delete(parentExpr.edge);
        for (const modifier of modifierSet) {
            // Copy flows from parent (and apply modifiers).
            const newFlows = parentExpr.resolvedFlows.copyAndModify(modifier);
            this.resolvedFlows.addAll(newFlows);
            // Copy any unresolved grandparents (and apply modifiers).
            for (const [edge, parentModifierSet] of parentExpr.unresolvedFlows) {
                for (const parentModifier of parentModifierSet) {
                    // Combine modifiers, applying parent's modifiers first.
                    const combinedModifier = parentModifier.copyAndModify(modifier);
                    this.inheritFromEdge(edge, combinedModifier);
                }
            }
        }
        this.removeSelfReference();
    }
    /** Add a new unresolved flow, consisting of the given edge and a modifier for it. */
    inheritFromEdge(edge, modifier) {
        if (this.unresolvedFlows.has(edge)) {
            this.unresolvedFlows.get(edge).add(modifier);
        }
        else {
            this.unresolvedFlows.set(edge, new FlowModifierSet(modifier));
        }
    }
    removeSelfReference() {
        const selfModifierSet = this.unresolvedFlows.get(this.edge);
        if (!selfModifierSet) {
            return;
        }
        // Delete the self-reference.
        this.unresolvedFlows.delete(this.edge);
        // Apply each self-modifier to a copy of each parent modifier.
        for (const parentModifierSet of this.unresolvedFlows.values()) {
            const newModifiers = new FlowModifierSet();
            for (const selfModifier of selfModifierSet) {
                newModifiers.addAll(parentModifierSet.copyAndModify(selfModifier));
            }
            parentModifierSet.addAll(newModifiers);
        }
        // Make a copy of all existing resolved flows, with each set of flow
        // modifiers applied to them.
        const newFlows = new FlowSet();
        for (const selfModifier of selfModifierSet) {
            newFlows.addAll(this.resolvedFlows.copyAndModify(selfModifier));
        }
        this.resolvedFlows.addAll(newFlows);
    }
    toString() {
        const result = [`EdgeExpression(${this.edge.edgeId}) {`];
        for (const flow of this.resolvedFlows) {
            result.push('  ' + flow.toUniqueString());
        }
        for (const [edge, modifierSets] of this.unresolvedFlows) {
            for (const modifiers of modifierSets) {
                result.push(`  EdgeExpression(${edge.edgeId}) + ${modifiers.toUniqueString()}`);
            }
        }
        result.push('}');
        return result.join('\n');
    }
}
export class Solver {
    constructor(edges) {
        /** Maps from an edge to a "expression" for it. */
        this.edgeExpressions = new Map();
        this._isResolved = false;
        this.edges = edges;
        // Fill dependentEdges map with empty sets.
        this.dependentExpressions = new Map();
        for (const edge of edges) {
            this.dependentExpressions.set(edge, new Set());
        }
    }
    /** Returns true if every edge in the graph has been fully resolved to a FlowSet. */
    get isResolved() {
        return this._isResolved;
    }
    /**
     * Runs through every check on an edge in the graph, and validates it against
     * the resolved flows into that edge.
     */
    validateAllChecks() {
        assert(this._isResolved, 'Graph must be resolved before checks can be validated.');
        const finalResult = new ValidationResult();
        for (const edge of this.edges) {
            if (edge.check) {
                const result = this.validateCheckOnEdge(edge);
                finalResult.addAllFailures(result);
            }
        }
        return finalResult;
    }
    validateCheckOnEdge(edge) {
        assert(this._isResolved, 'Graph must be resolved before checks can be validated.');
        assert(edge.check, 'Edge does not have any check conditions.');
        const check = edge.check;
        const finalResult = new ValidationResult();
        const edgeExpression = this.edgeExpressions.get(edge);
        const flows = edgeExpression.resolvedFlows;
        if (flows.size === 0) {
            // There is no ingress into this edge, so there's nothing to check.
            finalResult.addIngressFailure(check.originalCheck.toManifestString());
            return finalResult;
        }
        for (const flow of flows) {
            if (!flow.evaluateCheck(check)) {
                finalResult.addCheckFailure(check.originalCheck.toManifestString(), flow);
            }
        }
        return finalResult;
    }
    /**
     * Fully resolves the graph. All edges will have a fully resolved edge
     * expression at the end of this function.
     */
    resolve() {
        if (this._isResolved) {
            return;
        }
        for (const edge of this.edges) {
            this.processEdge(edge);
        }
        // Verify that all edges are fully resolved.
        const numEdges = this.edges.length;
        assert(this.edgeExpressions.size === numEdges);
        assert(this.dependentExpressions.size === numEdges);
        for (const edgeExpression of this.edgeExpressions.values()) {
            assert(edgeExpression.isResolved, `Unresolved edge expression: ${edgeExpression.toString()}`);
        }
        this._isResolved = true;
    }
    /**
     * Constructs a new EdgeExpression for the given edge, and tries to expand as
     * many of its unresolved parents as is possible. The edge expression might
     * still not be fully resolved at the end of this function.
     */
    processEdge(edge) {
        let edgeExpression = this.edgeExpressions.get(edge);
        if (edgeExpression) {
            // Edge has already been processed.
            return edgeExpression;
        }
        edgeExpression = new EdgeExpression(edge);
        this.edgeExpressions.set(edge, edgeExpression);
        // Try to expand all of the parents we already know about.
        for (const parent of edgeExpression.parents) {
            // Indicate that edge depends on parent.
            this.dependentExpressions.get(parent).add(edgeExpression);
            this.tryExpandParent(edgeExpression, parent);
        }
        // Now go through and expand this edge in the edges which depend on it.
        for (const dependentExpression of this.dependentExpressions.get(edge)) {
            this.tryExpandParent(dependentExpression, edge);
        }
        return edgeExpression;
    }
    /**
     * Takes an edge expression with an unresolved parent edge, and tries to
     * expand out that parent edge using the parent edge's own expression.
     */
    tryExpandParent(expression, parentEdge) {
        if (!expression.unresolvedFlows.has(parentEdge)) {
            return;
        }
        const parentExpression = this.edgeExpressions.get(parentEdge);
        if (parentExpression) {
            this.dependentExpressions.get(parentEdge).delete(expression);
            expression.expandParent(parentExpression);
            // Note down new dependencies from the grandparents to this edge.
            parentExpression.parents.forEach(grandparent => this.dependentExpressions.get(grandparent).add(expression));
        }
    }
}
//# sourceMappingURL=analysis.js.map