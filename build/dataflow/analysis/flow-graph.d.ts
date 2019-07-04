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
import { Node, Edge } from './graph-internals.js';
import { Manifest } from '../../runtime/manifest.js';
import { StoreReference } from '../../runtime/particle-check.js';
/**
 * Data structure for representing the connectivity graph of a recipe. Used to perform static analysis on a resolved recipe.
 */
export declare class FlowGraph {
    readonly particles: ParticleNode[];
    readonly handles: HandleNode[];
    readonly slots: SlotNode[];
    readonly nodes: Node[];
    readonly edges: Edge[];
    /** Maps from particle name to node. */
    readonly particleMap: Map<string, ParticleNode>;
    private readonly manifest;
    constructor(recipe: Recipe, manifest: Manifest);
    /** Returns a list of all pairwise particle connections, in string form: 'P1.foo -> P2.bar'. */
    readonly connectionsAsStrings: string[];
    resolveStoreRefToID(storeRef: StoreReference): string;
}
