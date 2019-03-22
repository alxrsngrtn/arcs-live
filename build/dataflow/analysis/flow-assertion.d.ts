/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { FlowGraph } from './flow-graph.js';
export declare class FlowAssertResult {
    result: boolean;
    reason?: string;
}
/**
 * Object that captures an assertion to be checked on a recipe as part of data
 * flow analysis. Assertions are specified using the syntax defined in
 * https://docs.google.com/document/d/1sQPYE4GEZKrIgMwvcs6Od3C-kBc8bhALY-xwz8bwimU/edit#
 *
 */
export declare class FlowAssertion {
    source: string;
    name: string;
    constructor(s: string);
    check(graph: FlowGraph): FlowAssertResult;
}
