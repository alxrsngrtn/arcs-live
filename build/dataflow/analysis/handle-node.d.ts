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
import { ParticleOutput, ParticleInput, ParticleNode } from './particle-node.js';
import { HandleConnection } from '../../runtime/recipe/handle-connection.js';
import { Handle } from '../../runtime/recipe/handle.js';
export declare class HandleNode extends Node {
    readonly nodeId: string;
    readonly inEdges: ParticleOutput[];
    readonly outEdges: ParticleInput[];
    readonly storeId: string;
    constructor(nodeId: string, handle: Handle);
    /** Returns a list of all pairs of particles that are connected through this handle, in string form. */
    readonly connectionsAsStrings: string[];
    addInEdge(edge: ParticleOutput): void;
    addOutEdge(edge: ParticleInput): void;
    inEdgesFromOutEdge(outEdge: ParticleInput): readonly ParticleOutput[];
}
/** Creates a new node for every given handle. */
export declare function createHandleNodes(handles: Handle[]): Map<Handle, HandleNode>;
/** Adds a connection between the given particle and handle nodes. */
export declare function addHandleConnection(direction: 'in' | 'out', particleNode: ParticleNode, handleNode: HandleNode, connection: HandleConnection, edgeId: string): Edge;
