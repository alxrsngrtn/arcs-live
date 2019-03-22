/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { FlowAssertion } from './flow-assertion.js';
/**
 * A FlowConfig is a configuration of a dataflow analysis run. Currently this
 * consists only of a set of assertions, although later it might include
 * configuration options.
 */
export declare class FlowConfig {
    assertions: FlowAssertion[];
    constructor(input: string);
}
