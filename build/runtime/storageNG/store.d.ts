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
import { StoreInterface, StorageMode, ActiveStore, ProxyMessageType, ProxyMessage, ProxyCallback, StorageCommunicationEndpoint, StorageCommunicationEndpointProvider, StoreConstructor } from './store-interface.js';
import { UnifiedStore } from './unified-store.js';
export { ActiveStore, ProxyCallback, ProxyMessage, ProxyMessageType, StorageCommunicationEndpoint, StorageCommunicationEndpointProvider, StorageMode };
export declare class Store<T extends CRDTTypeRecord> extends UnifiedStore implements StoreInterface<T> {
    protected unifiedStoreType: 'Store';
    toString(tags: string[]): string;
    source: string;
    description: string;
    readonly storageKey: StorageKey;
    exists: Exists;
    readonly type: Type;
    readonly mode: StorageMode;
    readonly id: string;
    readonly name: string;
    readonly version: number;
    modelConstructor: new () => CRDTModel<T>;
    private activeStore;
    static readonly constructors: Map<StorageMode, StoreConstructor>;
    constructor(storageKey: StorageKey, exists: Exists, type: Type, id: string, name?: string);
    activate(): Promise<ActiveStore<T>>;
    readonly referenceMode: boolean;
}
