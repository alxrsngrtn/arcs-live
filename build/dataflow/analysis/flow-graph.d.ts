/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Recipe } from '../../runtime/recipe/recipe.js';
import { ParticleNode } from './particle-node.js';
import { HandleNode } from './handle-node.js';
import { SlotNode } from './slot-node.js';
import { Node, Edge, FlowCheck } from './graph-internals.js';
import { Manifest } from '../../runtime/manifest.js';
import { StoreReference, CheckIsFromHandle, CheckIsFromStore, CheckExpression, Check } from '../../runtime/particle-check.js';
/**
 * Data structure for representing the connectivity graph of a recipe. Used to perform static analysis on a resolved recipe.
 */
export declare class FlowGraph {
    readonly particles: ParticleNode[];
    readonly handles: HandleNode[];
    readonly slots: SlotNode[];
    readonly nodes: Node[];
    /** Maps from edge ID to Edge. */
    readonly edgeMap: Map<string, Edge>;
    /** Maps from particle name to node. */
    readonly particleMap: Map<string, ParticleNode>;
    /** Maps from HandleConnectionSpec to HandleNode. */
    private readonly handleSpecMap;
    private readonly manifest;
    constructor(recipe: Recipe, manifest: Manifest);
    readonly edges: readonly Edge[];
    /** Returns a list of all pairwise particle connections, in string form: 'P1.foo -> P2.bar'. */
    readonly connectionsAsStrings: string[];
    /** Converts a list of edge IDs into a path string using the edge labels. */
    edgeIdsToPath(edgeIds: readonly string[]): string;
    /** Converts an "is from handle" check into the node ID that we need to search for. */
    handleCheckToNodeId(check: CheckIsFromHandle): string;
    /** Converts an "is from store" check into the node ID that we need to search for. */
    storeCheckToNodeId(check: CheckIsFromStore): string;
    /** Converts a StoreReference into a store ID. */
    resolveStoreRefToID(storeRef: StoreReference): string;
    /** Converts a particle Check object into a FlowCheck object (the internal representation used by FlowGraph). */
    createFlowCheck(originalCheck: Check, expression?: CheckExpression): FlowCheck;
    /** Converts a particle CheckCondition into a FlowCondition object (the internal representation used by FlowGraph). */
    private createFlowCondition;
}
