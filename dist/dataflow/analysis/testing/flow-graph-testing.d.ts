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
/** Constructs a FlowGraph from the recipe in the given manifest. */
export declare function buildFlowGraph(manifestContent: string): Promise<FlowGraph>;
