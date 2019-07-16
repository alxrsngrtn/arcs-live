/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { FlowGraph } from '../flow-graph.js';
import { CheckCondition } from '../../../runtime/particle-check.js';
import { Edge, Node } from '../graph-internals.js';
/** Constructs a FlowGraph from the recipe in the given manifest. */
export declare function buildFlowGraph(manifestContent: string): Promise<FlowGraph>;
export declare class TestNode extends Node {
    readonly nodeId: string;
    readonly inEdges: TestEdge[];
    readonly outEdges: TestEdge[];
    constructor(nodeId: string);
    addInEdge(): void;
    addOutEdge(): void;
    evaluateCheckCondition(condition: CheckCondition, edge: Edge): boolean;
    inEdgesFromOutEdge(outEdge: Edge): readonly Edge[];
}
export declare class TestEdge implements Edge {
    readonly start: TestNode;
    readonly end: TestNode;
    readonly label: string;
    readonly edgeId: string;
    readonly connectionName = "connectionName";
    constructor(start: TestNode, end: TestNode, label: string);
}
