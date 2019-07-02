/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Node, Edge } from './graph-internals.js';
/**
 * A path that walks backwards through the graph, i.e. it walks along the
 * directed edges in the reverse direction. The path is described by the
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
    edgesInForwardDirection(): Edge[];
    toString(): string;
}
/**
 * Iterates through every path in the graph that lead into the given edge. Each
 * path returned is a BackwardsPath, beginning at the given edge, and ending at
 * the end of a path in the graph (i.e. a node with no input edges). "derives
 * from" claims are used to prune paths, but the claims themselves are not
 * removed from the path edges.
 */
export declare function allInputPaths(startEdge: Edge): Iterable<BackwardsPath>;
