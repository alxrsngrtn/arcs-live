/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../arc.js';
import { Planner } from '../planner.js';
export declare class ArcPlannerInvoker {
    arc: Arc;
    planner: Planner;
    constructor(arc: Arc, arcDevtoolsChannel: any);
    invokePlanner(msg: any): Promise<{
        error: any;
        results?: undefined;
    } | {
        results: import("../../planning/strategizer.js").Descendant[];
        error?: undefined;
    }>;
}
