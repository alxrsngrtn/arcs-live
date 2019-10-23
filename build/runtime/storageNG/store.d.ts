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
import { Exists } from './drivers/driver-factory.js';
import { StorageKey } from './storage-key.js';
import { StoreInterface, StorageMode, ActiveStore, ProxyMessageType, ProxyMessage, ProxyCallback, StorageCommunicationEndpoint, StorageCommunicationEndpointProvider, StoreConstructor } from './store-interface.js';
import { UnifiedStore, StoreInfo } from './unified-store.js';
export { ActiveStore, ProxyCallback, ProxyMessage, ProxyMessageType, StorageCommunicationEndpoint, StorageCommunicationEndpointProvider, StorageMode };
export declare class Store<T extends CRDTTypeRecord> extends UnifiedStore implements StoreInterface<T> {
    protected unifiedStoreType: 'Store';
    readonly storageKey: StorageKey;
    exists: Exists;
    readonly mode: StorageMode;
    readonly versionToken: string;
    modelConstructor: new () => CRDTModel<T>;
    private activeStore;
    static readonly constructors: Map<StorageMode, StoreConstructor>;
    constructor(opts: StoreInfo & {
        storageKey: StorageKey;
        exists: Exists;
    });
    activate(): Promise<ActiveStore<T>>;
    readonly referenceMode: boolean;
}
