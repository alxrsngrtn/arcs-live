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
/**
 * A path that walks backwards through the graph, i.e. it walks along the
 * directed edges in the reverse direction. The path is described by the
 * nodes in the path. Class is immutable.
 */
export class BackwardsPath {
    constructor(
    /** Nodes in the path. */
    nodes, 
    /** Edges in the path. */
    edges) {
        this.nodes = nodes;
        this.edges = edges;
    }
    /** Constructs a new path from the given edge. */
    static fromEdge(edge) {
        return new BackwardsPath([edge.end, edge.start], [edge]);
    }
    /** Returns a copy of the current path, with an edge added to the end of it. */
    withNewEdge(edge) {
        // Flip the edge around.
        const startNode = edge.end;
        const endNode = edge.start;
        assert(startNode === this.endNode, 'Edge must connect to end of path.');
        if (this.nodes.includes(endNode)) {
            throw new Error('Graph must not include cycles.');
        }
        return new BackwardsPath([...this.nodes, endNode], [...this.edges, edge]);
    }
    get startNode() {
        return this.nodes[0];
    }
    get endNode() {
        return this.nodes[this.nodes.length - 1];
    }
    get endEdge() {
        return this.edges[this.edges.length - 1];
    }
    edgesInForwardDirection() {
        return this.edges.slice().reverse();
    }
    toString() {
        const edgesInPath = this.edgesInForwardDirection();
        return edgesInPath.map(e => e.label).join(' -> ');
    }
}
/**
 * Iterates through every path in the graph that lead into the given edge. Each
 * path returned is a BackwardsPath, beginning at the given edge, and ending at
 * the end of a path in the graph (i.e. a node with no input edges). "derives
 * from" claims are used to prune paths, but the claims themselves are not
 * removed from the path edges.
 */
export function* allInputPaths(startEdge) {
    const startPath = BackwardsPath.fromEdge(startEdge);
    // Stack of partial paths that need to be expanded (via DFS). Other paths will be added here to be expanded as we explore the graph.
    const pathStack = [startPath];
    while (pathStack.length) {
        const path = pathStack.pop();
        const inEdges = path.endNode.inEdgesFromOutEdge(path.endEdge);
        if (inEdges.length === 0) {
            // Path is finished, yield it.
            yield path;
        }
        else {
            // Path is not finished, continue extending it via all in-edges.
            for (const nextEdge of inEdges) {
                pathStack.push(path.withNewEdge(nextEdge));
            }
        }
    }
}
//# sourceMappingURL=graph-traversal.js.map