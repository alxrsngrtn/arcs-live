/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../../platform/chai-web.js';
import { Manifest } from '../../../runtime/manifest.js';
import { FlowGraph } from '../flow-graph.js';
import { Node } from '../graph-internals.js';
/** Constructs a FlowGraph from the recipe in the given manifest. */
export async function buildFlowGraph(manifestContent) {
    const manifest = await Manifest.parse(manifestContent);
    assert.lengthOf(manifest.recipes, 1);
    const recipe = manifest.recipes[0];
    assert(recipe.normalize(), 'Failed to normalize recipe.');
    assert(recipe.isResolved(), 'Recipe is not resolved.');
    return new FlowGraph(recipe, manifest);
}
export class TestNode extends Node {
    constructor(nodeId) {
        super();
        this.nodeId = nodeId;
        this.inEdges = [];
        this.outEdges = [];
    }
    addInEdge() {
        throw new Error('Unimplemented.');
    }
    addOutEdge() {
        throw new Error('Unimplemented.');
    }
    evaluateCheckCondition(condition, edge) {
        throw new Error('Unimplemented.');
    }
    inEdgesFromOutEdge(outEdge) {
        return this.inEdges;
    }
}
export class TestEdge {
    constructor(start, end, label) {
        this.start = start;
        this.end = end;
        this.label = label;
        this.connectionName = 'connectionName';
        this.edgeId = label;
        start.outEdges.push(this);
        end.inEdges.push(this);
    }
}
//# sourceMappingURL=flow-graph-testing.js.map