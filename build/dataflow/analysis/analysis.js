/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/assert-web.js';
import { FlowModifier, FlowSet, FlowModifierSet } from './graph-internals.js';
/** Result from validating an entire graph. */
export class ValidationResult {
    constructor() {
        this.failures = new Set();
    }
    get isValid() {
        return this.failures.size === 0;
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
        else {
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
        assert(!parentExpr.unresolvedFlows.has(this.edge), `Cycles aren't supported (yet).`);
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
    toString() {
        const result = [`EdgeExpression(${this.edge.label}) {`];
        for (const flow of this.resolvedFlows) {
            result.push('  ' + flow.toUniqueString());
        }
        for (const [edge, modifierSets] of this.unresolvedFlows) {
            for (const modifiers of modifierSets) {
                result.push(`  EdgeExpression(${edge.label}) + ${modifiers.toUniqueString()}`);
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
                result.failures.forEach(f => finalResult.failures.add(f));
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
        for (const flow of flows) {
            if (!flow.evaluateCheck(check)) {
                // TODO: Figure out how to report the path that caused the failure.
                finalResult.failures.add(`'${check.originalCheck.toManifestString()}' failed`);
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