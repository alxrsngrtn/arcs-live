/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Node } from './graph-internals.js';
import { ParticleOutput, ParticleInput } from './particle-node.js';
import { assert } from '../../platform/assert-web.js';
export class HandleNode extends Node {
    constructor(handle) {
        super();
        this.inEdges = [];
        this.outEdges = [];
        this.connectionSpecs = new Set();
        this.storeId = handle.id;
    }
    /** Returns a list of all pairs of particles that are connected through this handle, in string form. */
    get connectionsAsStrings() {
        const connections = [];
        this.inEdges.forEach(inEdge => {
            this.outEdges.forEach(outEdge => {
                connections.push(`${inEdge.label} -> ${outEdge.label}`);
            });
        });
        return connections;
    }
    addInEdge(edge) {
        this.inEdges.push(edge);
        this.connectionSpecs.add(edge.connectionSpec);
    }
    addOutEdge(edge) {
        this.outEdges.push(edge);
        this.connectionSpecs.add(edge.connectionSpec);
    }
    inEdgesFromOutEdge(outEdge) {
        assert(this.outEdges.includes(outEdge), 'Handle does not have the given out-edge.');
        return this.inEdges;
    }
    validateIsFromHandleCheck(condition) {
        // Check if this handle node has the desired HandleConnectionSpec. If so, it is the right handle.
        return this.connectionSpecs.has(condition.parentHandle);
    }
}
/** Creates a new node for every given handle. */
export function createHandleNodes(handles) {
    const nodes = new Map();
    handles.forEach(handle => {
        nodes.set(handle, new HandleNode(handle));
    });
    return nodes;
}
/** Adds a connection between the given particle and handle nodes. */
export function addHandleConnection(particleNode, handleNode, connection) {
    switch (connection.direction) {
        case 'in': {
            const edge = new ParticleInput(particleNode, handleNode, connection);
            particleNode.addInEdge(edge);
            handleNode.addOutEdge(edge);
            return edge;
        }
        case 'out': {
            const edge = new ParticleOutput(particleNode, handleNode, connection);
            particleNode.addOutEdge(edge);
            handleNode.addInEdge(edge);
            return edge;
        }
        case 'inout': // TODO: Handle inout directions.
        case 'host':
        default:
            throw new Error(`Unsupported connection type: ${connection.direction}`);
    }
}
//# sourceMappingURL=handle-node.js.map