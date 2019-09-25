/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTTypeRecord, CRDTModel } from '../crdt/crdt.js';
import { StorageMode, ProxyMessage } from './store.js';
import { StorageKey } from './storage-key.js';
import { Exists } from './drivers/driver-factory.js';
import { Type } from '../type.js';
export declare type MultiplexedProxyCallback<T extends CRDTTypeRecord> = (message: ProxyMessage<T>, muxId: string) => Promise<boolean>;
/**
 * A store that allows multiple CRDT models to be stored as sub-keys of a single storageKey location.
 */
export declare class BackingStore<T extends CRDTTypeRecord> {
    storageKey: StorageKey;
    private exists;
    private type;
    private mode;
    private stores;
    private callbacks;
    private nextCallbackId;
    private constructor();
    on(callback: MultiplexedProxyCallback<T>): number;
    off(callback: number): void;
    getLocalModel(muxId: string): CRDTModel<T>;
    private setupStore;
    onProxyMessage(message: ProxyMessage<T>, muxId: string): Promise<boolean>;
    static construct<T extends CRDTTypeRecord>(storageKey: StorageKey, exists: Exists, type: Type, mode: StorageMode): Promise<BackingStore<T>>;
    idle(): Promise<void>;
    processStoreCallback(muxId: string, message: ProxyMessage<T>): Promise<boolean>;
}
