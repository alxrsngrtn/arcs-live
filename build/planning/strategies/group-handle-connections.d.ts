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
import { StrategizerWalker, Strategy } from '../strategizer.js';
export declare class GroupHandleConnections extends Strategy {
    _walker: StrategizerWalker;
    constructor(arc?: Arc, args?: any);
    readonly walker: StrategizerWalker;
    generate(inputParams: any): any;
}
