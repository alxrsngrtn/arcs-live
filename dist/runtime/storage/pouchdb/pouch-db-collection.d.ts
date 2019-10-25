/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/// <reference types="pouchdb-core" />
import { Type, TypeLiteral } from '../../type.js';
import { SerializedModelEntry, ModelValue } from '../crdt-collection-model.js';
import { CollectionStorageProvider } from '../storage-provider-base.js';
import { UpsertDoc } from './pouch-db-upsert.js';
import { PouchDbStorage } from './pouch-db-storage.js';
import { PouchDbStorageProvider } from './pouch-db-storage-provider.js';
/**
 * A representation of a Collection in Pouch storage.
 */
interface CollectionStorage extends UpsertDoc {
    model: SerializedModelEntry[];
    version: number;
    referenceMode: boolean | null;
    type: TypeLiteral;
}
/**
 * The PouchDB-based implementation of a Collection.
 */
export declare class PouchDbCollection extends PouchDbStorageProvider implements CollectionStorageProvider {
    private upsertMutex;
    /**
     * Create a new PouchDbCollection.
     *
     * @param type the underlying type for this collection.
     * @param storageEngine a reference back to the PouchDbStorage, used for baseStorageKey calls.
     * @param name appears unused.
     * @param id see base class.
     * @param key the storage key for this collection.
     */
    constructor(type: Type, storageEngine: PouchDbStorage, name: string, id: string, key: string, refMode: boolean);
    /** @inheritDoc */
    backingType(): Type;
    cloneFrom(handle: any): Promise<void>;
    /** @inheritDoc */
    modelForSynchronization(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    /** @inheritDoc */
    serializeContents(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    private _toList;
    toList(): Promise<ModelValue[]>;
    /**
     * Returns an array of values for each of the specified ids.
     *
     * @param ids items to fetch from the underlying CRDT model.
     * @return an array of values from the underlying CRDT
     */
    getMultiple(ids: string[]): Promise<ModelValue[]>;
    /**
     * Store multiple values with the given keys in the Collection.
     * TODO(lindner): document originatorId, which is unused.
     */
    storeMultiple(values: any, keys: any, originatorId?: any): Promise<void>;
    /**
     * Get a specific Id value previously set using store().
     *
     * @remarks Note that the id referred to here is not the same as
     * used in the constructor.
     */
    get(id: string): any;
    /**
     * Store the specific value to the collection.  Value must include an id entry.
     *
     * @param value A data object with an id entry that is used as a key.
     * @param keys The CRDT keys used to store this object
     * @param originatorId TBD passed to event listeners
     */
    store(value: any, keys: string[], originatorId?: string): Promise<void>;
    removeMultiple(items: any, originatorId?: string): Promise<void>;
    /**
     * Remove ids from a collection for specific keys.
     * @param id the id to remove.
     * @param keys the CRDT specific keys to remove.
     * @param originatorId TBD passed to event listeners.
     */
    remove(id: string, keys?: string[], originatorId?: string): Promise<void>;
    /**
     * Triggered when the storage key has been modified.
     */
    onRemoteStateSynced(doc: PouchDB.Core.ExistingDocument<CollectionStorage>): void;
    /**
     * Gets the latest CrdtCollectionModel from storage.
     */
    private getModel;
    /**
     * Get/Modify/Set the data stored for this collection.
     */
    private upsert;
    /**
     * Remove this item from the database for testing purposes.
     */
    clearItemsForTesting(): Promise<void>;
}
export {};
