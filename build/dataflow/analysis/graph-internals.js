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
import { DeepSet } from './deep-set.js';
/**
 * Represents the set of implicit and explicit claims that flow along a path in
 * the graph, i.e. tags, node IDs and edge IDs.
 */
export class Flow {
    constructor(nodeIds = new Set(), edgeIds = new Set(), tags = new Set()) {
        this.nodeIds = nodeIds;
        this.edgeIds = edgeIds;
        this.tags = tags;
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
    copy() {
        return new Flow(new Set(this.nodeIds), new Set(this.edgeIds), new Set(this.tags));
    }
    copyAndModify(modifier) {
        const copy = this.copy();
        copy.modify(modifier);
        return copy;
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
        let result;
        switch (condition.type) {
            case 'node':
                result = this.nodeIds.has(condition.value);
                break;
            case 'edge':
                result = this.edgeIds.has(condition.value);
                break;
            case 'tag':
                result = this.tags.has(condition.value);
                break;
            default:
                throw new Error('Unknown condition type.');
        }
        // Flip the result if the check condition was negated.
        return condition.negated ? !result : result;
    }
    toUniqueString() {
        const elements = [];
        for (const nodeId of this.nodeIds) {
            elements.push('node:' + nodeId);
        }
        for (const edgeId of this.edgeIds) {
            elements.push('edge:' + edgeId);
        }
        for (const tag of this.tags) {
            elements.push('tag:' + tag);
        }
        elements.sort();
        return '{' + elements.join(', ') + '}';
    }
}
/** A set of unique flows. */
export class FlowSet extends DeepSet {
    /** Copies the current FlowSet, and applies the given modifier to every flow in the copy. */
    copyAndModify(modifier) {
        return this.map(flow => flow.copyAndModify(modifier));
    }
}
export var TagOperation;
(function (TagOperation) {
    TagOperation["Add"] = "add";
    TagOperation["Remove"] = "remove";
})(TagOperation || (TagOperation = {}));
/** Represents a sequence of modifications that can be made to a flow. */
export class FlowModifier {
    constructor(
    /** Node IDs to add. */
    nodeIds = new Set(), 
    /** Edge IDs to add. */
    edgeIds = new Set(), 
    /** Tags to add/remove. Maps from tag name to operation. */
    tagOperations = new Map()) {
        this.nodeIds = nodeIds;
        this.edgeIds = edgeIds;
        this.tagOperations = tagOperations;
    }
    /**
     * Creates a new FlowModifier from the given list of strings. Each string must
     * start with either a plus or minus symbol (indicating whether the condition
     * is added or removed), then give one of 'tag', 'node', or 'edge', followed
     * by the tag/node/edge ID respectively. (Tags can be added or removed. Nodes
     * and edges can only be added.) e.g. '+node:P2', '+edge:E1', '-tag:trusted'.
     */
    static parse(...conditions) {
        const modifier = new FlowModifier();
        for (const condition of conditions) {
            const firstChar = condition[0];
            if (!'+-'.includes(firstChar)) {
                throw new Error(`'${condition}' must start with either + or -`);
            }
            const operator = firstChar === '+' ? TagOperation.Add : TagOperation.Remove;
            const [type, value] = condition.slice(1).split(':', 2);
            if (operator === TagOperation.Remove && type !== 'tag') {
                throw new Error(`The - operator can only be used with tags. Got '${condition}'.`);
            }
            switch (type) {
                case 'tag':
                    modifier.tagOperations.set(value, operator);
                    break;
                case 'node':
                    modifier.nodeIds.add(value);
                    break;
                case 'edge':
                    modifier.edgeIds.add(value);
                    break;
                default:
                    throw new Error(`Unknown type: '${condition}'`);
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
    copy() {
        return new FlowModifier(new Set(this.nodeIds), new Set(this.edgeIds), new Map(this.tagOperations));
    }
    /** Copies the current FlowModifier, and then applies the given modifications to the copy. */
    copyAndModify(modifier) {
        const copy = this.copy();
        modifier.nodeIds.forEach(n => copy.nodeIds.add(n));
        modifier.edgeIds.forEach(n => copy.edgeIds.add(n));
        modifier.tagOperations.forEach((op, tag) => copy.tagOperations.set(tag, op));
        return copy;
    }
    toFlow() {
        const flow = new Flow();
        flow.modify(this);
        return flow;
    }
    toUniqueString() {
        const elements = [];
        for (const nodeId of this.nodeIds) {
            elements.push('+node:' + nodeId);
        }
        for (const edgeId of this.edgeIds) {
            elements.push('+edge:' + edgeId);
        }
        for (const [tag, op] of this.tagOperations) {
            const sign = op === TagOperation.Add ? '+' : '-';
            elements.push(sign + 'tag:' + tag);
        }
        elements.sort();
        return '{' + elements.join(', ') + '}';
    }
}
/** A set of FlowModifiers. */
export class FlowModifierSet extends DeepSet {
    /** Copies the current FlowModifierSet, and extends each modifier in the copy with the given extra modifier. */
    copyAndModify(extraModifier) {
        return this.map(modifier => modifier.copyAndModify(extraModifier));
    }
}
/** Represents a node in a FlowGraph. Can be a particle, handle, etc. */
export class Node {
    constructor() {
        /**
         * Boolean indicating whether this node has direct ingress or not (e.g. from a
         * external datastore).
         */
        this.ingress = false;
    }
    get inNodes() {
        return this.inEdges.map(e => e.start);
    }
    get outNodes() {
        return this.outEdges.map(e => e.end);
    }
}
//# sourceMappingURL=graph-internals.js.map