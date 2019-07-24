/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Node, FlowModifier } from './graph-internals.js';
export class SlotNode extends Node {
    constructor(nodeId, slot) {
        super();
        // For now, slots can only have in-edges (from the particles that consume them).
        // TODO: These should be inout edges, because slots can bubble up user events back to these same particles.
        this.inEdges = [];
        this.outEdges = [];
        this.nodeId = nodeId;
    }
    addInEdge(edge) {
        this.inEdges.push(edge);
    }
    addOutEdge(edge) {
        throw new Error(`Slots can't have out-edges (yet).`);
    }
    inEdgesFromOutEdge(outEdge) {
        throw new Error(`Slots can't have out-edges (yet).`);
    }
}
class SlotInput {
    constructor(edgeId, particleNode, slotNode, connection) {
        this.edgeId = edgeId;
        this.start = particleNode;
        this.end = slotNode;
        this.connectionName = connection.name;
        this.label = `${particleNode.name}.${this.connectionName}`;
        this.modifier = FlowModifier.fromClaims(this, []);
    }
    get check() {
        return this.end.check;
    }
}
export function createSlotNodes(slots) {
    const nodes = new Map();
    slots.forEach((slot, index) => {
        const nodeId = 'S' + index;
        nodes.set(slot, new SlotNode(nodeId, slot));
    });
    return nodes;
}
/** Adds a connection between the given particle and slot nodes, where the particle "consumes" the slot. */
export function addSlotConnection(particleNode, slotNode, connection, edgeId) {
    const edge = new SlotInput(edgeId, particleNode, slotNode, connection);
    particleNode.addOutEdge(edge);
    slotNode.addInEdge(edge);
    return edge;
}
//# sourceMappingURL=slot-node.js.map