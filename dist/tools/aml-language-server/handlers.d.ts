/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Dictionary } from '../../runtime/hot.js';
import { AmlServiceContext } from './util.js';
export declare type Handler = ((params: any, context: AmlServiceContext) => any);
export declare const handlers: Dictionary<Handler>;
