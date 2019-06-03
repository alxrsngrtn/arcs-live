/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTTypeRecord } from '../../crdt/crdt.js';
import { ActiveStore, ProxyCallback, ProxyMessage } from '../store.js';
export declare class MockStore<T extends CRDTTypeRecord> extends ActiveStore<T> {
    lastCapturedMessage: ProxyMessage<T>;
    constructor();
    on(callback: ProxyCallback<T>): number;
    off(callback: number): void;
    onProxyMessage(message: ProxyMessage<T>): Promise<boolean>;
}
