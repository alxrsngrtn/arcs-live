/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../../runtime/arc.js';
import { Loader } from '../../platform/loader.js';
import { Manifest } from '../../runtime/manifest.js';
import { Id } from '../../runtime/id.js';
export declare class StrategyTestHelper {
    static createTestArc(context: Manifest, options?: {
        arcId?: Id;
        modalityName?: string;
        loader?: Loader;
    }): Arc;
    static createTestStrategyArgs(arc: Arc, args?: any): any;
    static run(arc: Arc, clazz: any, recipe: any): any;
    static onlyResult(arc: Arc, clazz: any, recipe: any): any;
    static theResults(arc: Arc, clazz: any, recipe: any): any;
    static noResult(arc: Arc, clazz: any, recipe: any): any;
}
