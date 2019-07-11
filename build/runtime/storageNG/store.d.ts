/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTModel, CRDTTypeRecord } from '../crdt/crdt.js';
import { Type } from '../type.js';
import { Exists } from './drivers/driver-factory.js';
import { StorageKey } from './storage-key.js';
import { StoreInterface, StorageMode, ActiveStore, ProxyMessageType, ProxyMessage, ProxyCallback } from './store-interface';
export { StorageMode, ActiveStore, ProxyMessageType, ProxyMessage, ProxyCallback };
declare type StoreConstructor = {
    construct<T extends CRDTTypeRecord>(storageKey: StorageKey, exists: Exists, type: Type, mode: StorageMode, modelConstructor: new () => CRDTModel<T>): Promise<ActiveStore<T>>;
};
export declare class Store<T extends CRDTTypeRecord> implements StoreInterface<T> {
    readonly storageKey: StorageKey;
    exists: Exists;
    readonly type: Type;
    readonly mode: StorageMode;
    modelConstructor: new () => CRDTModel<T>;
    static readonly constructors: Map<StorageMode, StoreConstructor>;
    constructor(storageKey: StorageKey, exists: Exists, type: Type, mode: StorageMode, modelConstructor: new () => CRDTModel<T>);
    activate(): Promise<ActiveStore<T>>;
}
