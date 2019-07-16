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
import { ClaimType } from '../../runtime/particle-claim.js';
/**
 * Represents the set of implicit and explicit claims that flow along a path in
 * the graph, i.e. tags, node IDs and edge IDs.
 */
export class Flow {
    constructor() {
        this.nodeIds = new Set();
        this.edgeIds = new Set();
        this.tags = new Set();
    }
    /** Modifies the current Flow (in place) by applying the given FlowModifier. */
    modify(modifier) {
        modifier.nodeIds.forEach(n => this.nodeIds.add(n));
        modifier.edgeIds.forEach(e => this.edgeIds.add(e));
        modifier.tagOperations.forEach((operation, tag) => {
            if (operation === 'add') {
                this.tags.add(tag);
            }
            else {
                this.tags.delete(tag);
            }
        });
    }
    /** Evaluates the given FlowCheck against the current Flow. */
    evaluateCheck(check) {
        if ('operator' in check) {
            if (check.operator === 'or') {
                // Only one child expression needs to pass.
                return check.children.some(childExpr => this.evaluateCheck(childExpr));
            }
            else {
                // 'and' operator. Every child expression needs to pass.
                return check.children.every(childExpr => this.evaluateCheck(childExpr));
            }
        }
        else {
            return this.checkCondition(check);
        }
    }
    /** Evaluates the given CheckCondition against the current Flow. */
    checkCondition(condition) {
        switch (condition.type) {
            case 'node':
                return this.nodeIds.has(condition.value);
            case 'edge':
                return this.edgeIds.has(condition.value);
            case 'tag':
                return this.tags.has(condition.value);
            default:
                throw new Error('Unknown condition type.');
        }
    }
}
export var TagOperation;
(function (TagOperation) {
    TagOperation["Add"] = "add";
    TagOperation["Remove"] = "remove";
})(TagOperation || (TagOperation = {}));
/** Represents a sequence of modifications that can be made to a flow. */
export class FlowModifier {
    constructor() {
        /** Node IDs to add. */
        this.nodeIds = new Set();
        /** Edge IDs to add. */
        this.edgeIds = new Set();
        /** Tags to add/remove. Maps from tag name to operation. */
        this.tagOperations = new Map();
    }
    static fromConditions(...conditions) {
        const modifier = new FlowModifier();
        for (const condition of conditions) {
            switch (condition.type) {
                case 'tag':
                    modifier.tagOperations.set(condition.value, TagOperation.Add);
                    break;
                case 'node':
                    modifier.nodeIds.add(condition.value);
                    break;
                case 'edge':
                    modifier.edgeIds.add(condition.value);
                    break;
                default:
                    throw new Error('Unknown FlowCondition type.');
            }
        }
        return modifier;
    }
    static fromClaims(edge, claims) {
        const modifier = new FlowModifier();
        if (claims) {
            for (const claim of claims) {
                if (claim.type === ClaimType.IsTag) {
                    modifier.tagOperations.set(claim.tag, claim.isNot ? TagOperation.Remove : TagOperation.Add);
                }
            }
        }
        modifier.edgeIds.add(edge.edgeId);
        modifier.nodeIds.add(edge.start.nodeId);
        return modifier;
    }
}
/** Represents a node in a FlowGraph. Can be a particle, handle, etc. */
export class Node {
    get inNodes() {
        return this.inEdges.map(e => e.start);
    }
    get outNodes() {
        return this.outEdges.map(e => e.end);
    }
}
//# sourceMappingURL=graph-internals.js.map