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
import { Node } from '../graph-internals.js';
import { BackwardsPath } from '../graph-traversal.js';
class TestNode extends Node {
    constructor() {
        super(...arguments);
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
        throw new Error('Unimplemented.');
    }
}
class TestEdge {
    constructor(start, end, label) {
        this.start = start;
        this.end = end;
        this.label = label;
        this.connectionName = 'connectionName';
    }
}
describe('BackwardsPath', () => {
    // Construct directed graph: A -> B -> C.
    const nodeA = new TestNode();
    const nodeB = new TestNode();
    const nodeC = new TestNode();
    const edgeAToB = new TestEdge(nodeA, nodeB, 'A -> B');
    const edgeBToC = new TestEdge(nodeB, nodeC, 'B -> C');
    const edgeCToA = new TestEdge(nodeC, nodeA, 'C -> A');
    it('starts with a single edge', () => {
        const path = BackwardsPath.fromEdge(edgeAToB);
        assert.sameOrderedMembers(path.nodes, [nodeB, nodeA]);
        assert.equal(path.startNode, nodeB);
        assert.equal(path.endNode, nodeA);
        assert.equal(path.endEdge, edgeAToB);
    });
    it('can add another edge to the end of the path', () => {
        let path = BackwardsPath.fromEdge(edgeBToC);
        path = path.withNewEdge(edgeAToB);
        assert.sameOrderedMembers(path.nodes, [nodeC, nodeB, nodeA]);
        assert.equal(path.startNode, nodeC);
        assert.equal(path.endNode, nodeA);
        assert.equal(path.endEdge, edgeAToB);
    });
    it('forbids cycles', () => {
        let path = BackwardsPath.fromEdge(edgeBToC);
        path = path.withNewEdge(edgeAToB);
        assert.throws(() => path.withNewEdge(edgeCToA), 'Graph must not include cycles');
    });
    it('only allows adding to the end of the path', () => {
        const path = BackwardsPath.fromEdge(edgeBToC);
        assert.throws(() => path.withNewEdge(edgeCToA), 'Edge must connect to end of path');
    });
});
// TODO: Add tests for the allInputPaths function.
//# sourceMappingURL=graph-traversal-test.js.map