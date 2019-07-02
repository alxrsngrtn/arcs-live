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
import { Check } from '../../runtime/particle-check.js';
import { Slot } from '../../runtime/interface-info.js';
import { ParticleNode } from './particle-node.js';
import { SlotConnection } from '../../runtime/recipe/slot-connection.js';
export declare class SlotNode extends Node {
    readonly inEdges: SlotInput[];
    readonly outEdges: readonly Edge[];
    check?: Check;
    constructor(slot: Slot);
    addInEdge(edge: SlotInput): void;
    addOutEdge(edge: Edge): void;
    inEdgesFromOutEdge(outEdge: Edge): never;
}
declare class SlotInput implements Edge {
    readonly start: ParticleNode;
    readonly end: SlotNode;
    readonly label: string;
    readonly connectionName: string;
    constructor(particleNode: ParticleNode, slotNode: SlotNode, connection: SlotConnection);
    readonly check: Check | undefined;
}
export declare function createSlotNodes(slots: Slot[]): Map<Slot, SlotNode>;
/** Adds a connection between the given particle and slot nodes, where the particle "consumes" the slot. */
export declare function addSlotConnection(particleNode: ParticleNode, slotNode: SlotNode, connection: SlotConnection): Edge;
export {};
