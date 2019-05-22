/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { StorageProviderBase } from '../storage/storage-provider-base.js';
import { Dictionary } from '../hot.js';
/**
 * Simple class to verify callbacks used in the Arcs storage APIs.
 *
 * Usage:
 * ```
 *   const varCallbacks = new CallbackTracker(var1, 6);
 *   .... // do work
 *   varCallbacks.verify();
 * ```
 */
export declare class CallbackTracker {
    expectedEvents: number;
    events: Dictionary<any>[];
    constructor(storageProvider: StorageProviderBase, expectedEvents?: number);
    changeEvent(c: Dictionary<any>): void;
    /**
     * Tests that the number of expected callbacks are executed.
     * If the DEBUG environment variable is set always display accumulated events
     */
    verify(): void;
}
