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
 * flow analysis. Assertions are specified in a configuration using the
 * following syntax:
 *
 * <name> : <quantifier> : <object> : <predicate> : <target?>
 */
export declare class FlowAssertion {
    source: string;
    name: string;
    private static validate;
    static instantiate(s: string): FlowAssertion;
    private constructor();
    check(graph: FlowGraph): FlowAssertResult;
}
