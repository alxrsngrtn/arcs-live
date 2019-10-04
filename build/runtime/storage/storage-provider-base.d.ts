/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Id } from '../id.js';
import { Type } from '../type.js';
import { SerializedModelEntry } from './crdt-collection-model.js';
import { KeyBase } from './key-base.js';
import { Store, BigCollectionStore, CollectionStore, SingletonStore } from '../store.js';
import { PropagatedException } from '../arc-exceptions.js';
import { Dictionary, Consumer } from '../hot.js';
import { ClaimIsTag } from '../particle-claim.js';
import { UnifiedStore, UnifiedActiveStore } from '../storageNG/unified-store.js';
import { ProxyCallback } from '../storageNG/store.js';
declare type Callback = Consumer<Dictionary<any>>;
/**
 * Methods that must be implemented by a Singleton Storage Provider
 * that are not already defined in SingletonStore.
 */
export interface SingletonStorageProvider extends StorageProviderBase, SingletonStore {
    set(value: {}, originatorId?: string, barrier?: string): Promise<void>;
    clear(originatorId?: string, barrier?: string): Promise<void>;
}
/**
 * Methods that must be implemented by a Collection Storage Provider,
 * that are not already defined in CollectionStore.
 */
export interface CollectionStorageProvider extends StorageProviderBase, CollectionStore {
    getMultiple(ids: string[]): Promise<any[]>;
    store(value: any, keys: string[], originatorId?: string): Promise<void>;
    storeMultiple(values: {}, keys: string[], originatorId?: string): Promise<void>;
    removeMultiple(items: any[], originatorId?: string): Promise<void>;
}
/**
 * Methods that must be implemented by a BigCollection Storage Provider,
 * that are not already defined in BigCollectionStore.
 */
export interface BigCollectionStorageProvider extends StorageProviderBase, BigCollectionStore {
    cursorVersion(cursorId: number): any;
    cloneFrom(store: UnifiedActiveStore): any;
    clearItemsForTesting(): void;
}
export declare abstract class StorageBase {
    protected readonly arcId: Id;
    protected _debug: boolean;
    protected constructor(arcId: Id);
    abstract construct(id: string, type: Type, keyFragment: string): Promise<StorageProviderBase>;
    abstract connect(id: string, type: Type, key: string): Promise<StorageProviderBase>;
    abstract baseStorageKey(type: Type, key: string): string;
    abstract baseStorageFor(type: Type, key: string): Promise<StorageProviderBase>;
    abstract parseStringAsKey(s: string): KeyBase;
    /**
     * Turn on debugginf for this storage provider.  Providers should
     * subclass this and react to changes in the debug value.
     */
    debug: boolean;
    /**
     * Provides graceful shutdown for tests.
     */
    shutdown(): Promise<void>;
}
declare type DeltaItems = {
    value: any;
    keys?: string[];
    effective?: boolean;
}[];
export declare class ChangeEvent {
    readonly add: DeltaItems;
    readonly remove: DeltaItems;
    readonly data: any;
    readonly version: number;
    readonly originatorId: string;
    readonly barrier: string;
    constructor(args: {
        add?: DeltaItems;
        remove?: DeltaItems;
        data?: any;
        version?: number;
        originatorId?: string;
        barrier?: string;
    });
}
/**
 * Docs TBD
 */
export declare abstract class StorageProviderBase extends UnifiedStore implements Store, UnifiedActiveStore {
    protected unifiedStoreType: 'StorageProviderBase';
    private readonly legacyListeners;
    private nextCallbackId;
    private readonly listeners;
    private readonly _type;
    protected readonly _storageKey: string;
    referenceMode: boolean;
    version: number | null;
    readonly id: string;
    originalId: string | null;
    name: string;
    source: string | null;
    description: string;
    /** Trust tags claimed by this data store. */
    claims: ClaimIsTag[];
    protected constructor(type: Type, name: string, id: string, key: string);
    enableReferenceMode(): void;
    readonly baseStore: StorageProviderBase;
    readonly storageKey: string;
    readonly type: Type;
    reportExceptionInHost(exception: PropagatedException): void;
    on(callback: ProxyCallback<null>): number;
    off(callbackId: number): void;
    legacyOn(callback: Callback): void;
    legacyOff(callback: Callback): void;
    activate(): Promise<UnifiedActiveStore>;
    /**
     * Propagate updates to change listeners.
     */
    protected _fire(details: ChangeEvent): Promise<void>;
    toString(handleTags?: string[]): string;
    readonly apiChannelMappingId: string;
    dispose(): void;
    /**
     * @returns an object notation of this storage provider.
     */
    abstract toLiteral(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    abstract cloneFrom(store: UnifiedActiveStore): Promise<void>;
    abstract ensureBackingStore(): any;
    abstract backingStore: any;
    /**
     * Called by Particle Execution Host to synchronize it's proxy.
     */
    modelForSynchronization(): Promise<{
        version: number;
        model: {};
    }>;
}
export {};
