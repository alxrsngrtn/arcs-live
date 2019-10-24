/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Comparable } from '../recipe/comparable.js';
import { Type } from '../type.js';
import { StorageKey } from './storage-key.js';
import { StorageStub } from '../storage-stub.js';
import { Store as OldStore } from '../store.js';
import { PropagatedException } from '../arc-exceptions.js';
import { ProxyCallback } from './store.js';
import { ClaimIsTag } from '../particle-claim.js';
/**
 * This is a temporary interface used to unify old-style stores (storage/StorageProviderBase) and new-style stores (storageNG/Store).
 * We should be able to remove this once we've switched across to the NG stack.
 *
 * Note that for old-style stores, StorageStubs are used *sometimes* to represent storage which isn't activated. For new-style stores,
 * Store itself represents an inactive store, and needs to be activated using activate(). This will present some integration
 * challenges :)
 *
 * Note also that old-style stores use strings for Storage Keys, while NG storage uses storageNG/StorageKey subclasses. This provides
 * a simple test for determining whether a store is old or new.
 *
 * Common functionality between old- and new-style stores goes in this class.
 * Once the old-style stores are deleted, this class can be merged into the new
 * Store class.
 */
export declare abstract class UnifiedStore implements Comparable<UnifiedStore>, OldStore {
    protected abstract unifiedStoreType: 'Store' | 'StorageStub' | 'StorageProviderBase';
    abstract storageKey: string | StorageKey;
    abstract versionToken: string;
    abstract referenceMode: boolean;
    storeInfo: StoreInfo;
    constructor(storeInfo: StoreInfo);
    readonly id: string;
    readonly name: string;
    readonly type: Type;
    readonly originalId: string;
    readonly source: string;
    readonly description: string;
    readonly claims: ClaimIsTag[];
    abstract activate(): Promise<UnifiedActiveStore>;
    /**
     * Hack to cast this UnifiedStore to the old-style class StorageStub.
     * TODO: Fix all usages of this method to handle new-style stores, and then
     * delete.
     */
    castToStorageStub(): StorageStub;
    reportExceptionInHost(exception: PropagatedException): void;
    _compareTo(other: UnifiedStore): number;
    toManifestString(opts?: {
        handleTags?: string[];
        overrides?: Partial<StoreInfo>;
    }): string;
}
export interface UnifiedActiveStore {
    /** The UnifiedStore instance from which this store was activated. */
    readonly baseStore: UnifiedStore;
    toLiteral(): Promise<any>;
    cloneFrom(store: UnifiedActiveStore): Promise<void>;
    modelForSynchronization(): Promise<{}>;
    on(callback: ProxyCallback<null>): number;
    off(callback: number): void;
}
/** Assorted properties about a store. */
export declare type StoreInfo = {
    readonly id: string;
    name?: string;
    readonly type: Type;
    readonly originalId?: string;
    readonly source?: string;
    readonly origin?: 'file' | 'resource' | 'storage';
    readonly description?: string;
    /** Trust tags claimed by this data store. */
    readonly claims?: ClaimIsTag[];
    readonly versionToken?: string;
};
