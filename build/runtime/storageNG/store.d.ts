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
import { StoreInterface, StorageMode, ActiveStore, ProxyMessageType, ProxyMessage, ProxyCallback, StorageCommunicationEndpoint, StorageCommunicationEndpointProvider } from './store-interface.js';
import { UnifiedStore } from './unified-store.js';
import { Consumer } from '../hot.js';
export { ActiveStore, ProxyCallback, ProxyMessage, ProxyMessageType, StorageCommunicationEndpoint, StorageCommunicationEndpointProvider, StorageMode };
declare type StoreConstructor = {
    construct<T extends CRDTTypeRecord>(storageKey: StorageKey, exists: Exists, type: Type, mode: StorageMode): Promise<ActiveStore<T>>;
};
export declare class Store<T extends CRDTTypeRecord> extends UnifiedStore implements StoreInterface<T> {
    protected unifiedStoreType: 'Store';
    toString(tags: string[]): string;
    toLiteral(): Promise<any>;
    cloneFrom(store: UnifiedStore): void;
    on(fn: Consumer<{}>): void;
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
    static readonly constructors: Map<StorageMode, StoreConstructor>;
    constructor(storageKey: StorageKey, exists: Exists, type: Type, id: string, name?: string);
    activate(): Promise<ActiveStore<T>>;
    readonly referenceMode: boolean;
}
