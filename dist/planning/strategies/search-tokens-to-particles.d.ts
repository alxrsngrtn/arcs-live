/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../../runtime/arc.js';
import { Strategy } from '../strategizer.js';
export declare class SearchTokensToParticles extends Strategy {
    private readonly _walker;
    constructor(arc: Arc, options: any);
    readonly walker: any;
    getResults(inputParams: any): any[];
    private _addThing;
    private _addThingByToken;
    generate(inputParams: any): any;
}
