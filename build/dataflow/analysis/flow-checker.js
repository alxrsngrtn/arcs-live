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
/**
 * Object used to perform dataflow analysis on recipes. The constructor accepts
 * a FlowConfig object containing the set of assertions to be checked, then the
 * flowcheck method checks a recipe against that set, returning true if all the
 * assertions are true for the recipe and false if any one is false. In order
 * to provide a human-readable reason why the check failed, the return value is
 * FlowAssertResult rather than a simple boolean.
 */
export class FlowChecker {
    constructor(flowconfig) {
        this.config = flowconfig;
    }
    flowcheck(target) {
        const graph = new FlowGraph(target);
        let assertion;
        for (assertion of this.config.assertions) {
            const res = assertion.check(graph);
            if (res.result === false) {
                console.log(res.reason);
                return res;
            }
        }
        return { result: true };
    }
}
//# sourceMappingURL=flow-checker.js.map