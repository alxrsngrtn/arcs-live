/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { BigCollectionStorageProvider } from '../storage-provider-base.js';
import { SerializedModelEntry } from '../crdt-collection-model.js';
import { PouchDbStorageProvider } from './pouch-db-storage-provider.js';
export declare class PouchDbBigCollection extends PouchDbStorageProvider implements BigCollectionStorageProvider {
    constructor(type: any, storageEngine: any, name: any, id: any, key: any, refMode?: boolean);
    backingType(): import("../../type.js").Type;
    get(id: string): Promise<void>;
    store(value: any, keys: string[], originatorId?: string): Promise<void>;
    remove(id: string, keys: string[], originatorId?: string): Promise<void>;
    stream(pageSize: number, forward?: boolean): Promise<number>;
    cursorNext(cursorId: number): Promise<void>;
    cursorClose(cursorId: number): Promise<void>;
    cursorVersion(cursorId: number): void;
    serializeContents(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    cloneFrom(): Promise<void>;
    clearItemsForTesting(): void;
    /**
     * Triggered when the storage key has been modified.  For now we
     * just refetch.  This is fast since the data is synced locally.
     */
    onRemoteStateSynced(doc: any): void;
}
