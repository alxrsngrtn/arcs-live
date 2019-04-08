/// <reference types="pouchdb-core" />
import { Type, TypeLiteral } from '../../type.js';
import { SerializedModelEntry, ModelValue } from '../crdt-collection-model.js';
import { CollectionStorageProvider } from '../storage-provider-base.js';
import { PouchDbStorage } from './pouch-db-storage';
import { PouchDbStorageProvider } from './pouch-db-storage-provider.js';
/**
 * Contains the data that is stored within Pouch
 */
interface CollectionStorage {
    model: SerializedModelEntry[];
    version: number;
    referenceMode: boolean | null;
    type: TypeLiteral;
}
export declare class PouchDbCollection extends PouchDbStorageProvider implements CollectionStorageProvider {
    private readonly initialized;
    /** The local synced model */
    private _model;
    /**
     * Create a new PouchDbCollection.
     *
     * @param type the underlying type for this collection.
     * @param storageEngine a reference back to the PouchDbStorage, used for baseStorageKey calls.
     * @param name appears unused.
     * @param id see base class.
     * @param key the storage key for this collection.
     */
    constructor(type: Type, storageEngine: PouchDbStorage, name: string, id: string, key: string);
    /** @inheritDoc */
    backingType(): Type;
    clone(): PouchDbCollection;
    cloneFrom(handle: any): Promise<void>;
    /** @inheritDoc */
    modelForSynchronization(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    /** @inheritDoc */
    toLiteral(): Promise<{
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
    store(value: any, keys: string[], originatorId?: any): Promise<void>;
    removeMultiple(items: any, originatorId?: any): Promise<void>;
    /**
     * Remove ids from a collection for specific keys.
     * @param id the id to remove.
     * @param keys the CRDT specific keys to remove.
     * @param originatorId TBD passed to event listeners.
     */
    remove(id: string, keys?: string[], originatorId?: string): Promise<void>;
    /**
     * Triggered when the storage key has been modified.  For now we
     * just refetch and trigger listeners.  This is fast since the data
     * is synced locally.
     */
    onRemoteStateSynced(doc: PouchDB.Core.ExistingDocument<CollectionStorage>): void;
    /**
     * Updates the local model cache from PouchDB and returns the CRDT
     * model for use.
     */
    private getModel;
    /**
     * Provides a way to apply changes to the model in a way that will result in the
     * crdt being written to the underlying PouchDB.
     *
     * - A new entry is stored if it doesn't exist.
     * - If the existing entry is available it is fetched and the
     *   internal state is updated.
     * - A copy of the CRDT model is passed to the modelMutator, which may change it.
     * - If the model is mutated by `modelMutator`, write a new revision and update the local
     *   cached copy.
     *
     * @param modelMutator allows for modifying a copy of the underlying crdt model.
     */
    private getModelAndUpdate;
    /**
     * Remove this item from the database for testing purposes.
     */
    clearItemsForTesting(): Promise<void>;
}
export {};
