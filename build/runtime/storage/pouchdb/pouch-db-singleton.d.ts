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
import { Type } from '../../type.js';
import { SingletonStorageProvider } from '../storage-provider-base.js';
import { SerializedModelEntry, ModelValue } from '../crdt-collection-model.js';
import { PouchDbStorageProvider } from './pouch-db-storage-provider.js';
import { PouchDbStorage } from './pouch-db-storage.js';
import { UpsertDoc } from './pouch-db-upsert.js';
/**
 * A representation of a Singleton in Pouch storage.
 */
interface SingletonStorage extends UpsertDoc {
    value: ModelValue;
    /** ReferenceMode state for this data */
    referenceMode: boolean;
    /** Monotonically increasing version number */
    version: number;
}
/**
 * The PouchDB-based implementation of a Singleton.
 */
export declare class PouchDbSingleton extends PouchDbStorageProvider implements SingletonStorageProvider {
    private localKeyId;
    /**
     * Create a new PouchDbSingleton.
     *
     * @param type the underlying type for this singleton.
     * @param storageEngine a reference back to the PouchDbStorage, used for baseStorageKey calls.
     * @param name appears unused.
     * @param id see base class.
     * @param key the storage key for this collection.
     */
    constructor(type: Type, storageEngine: PouchDbStorage, name: string, id: string, key: string, refMode: boolean);
    /** @inheritDoc */
    backingType(): Type;
    clone(): Promise<PouchDbSingleton>;
    cloneFrom(handle: any): Promise<void>;
    /**
     * Returns the model data in a format suitable for transport over
     * the API channel (i.e. between execution host and context).
     */
    modelForSynchronization(): Promise<{
        version: number;
        model: {};
    }>;
    /**
     * Returns the state of this singleton based as an object of the form
     * {version, model: [{id, value}]}
     */
    toLiteral(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    /**
     * Updates the internal state of this singleton with the supplied data.
     */
    fromLiteral({ version, model }: {
        version: any;
        model: any;
    }): Promise<void>;
    /**
     * @return a promise containing the singleton value or null if it does not exist.
     */
    get(): Promise<ModelValue>;
    /**
     * Set the value for this singleton.
     * @param value the value we want to set.  If null remove the singleton from storage
     * @param originatorId TBD
     * @param barrier TBD
     */
    set(value: any, originatorId?: string, barrier?: string | null): Promise<void>;
    /**
     * Clear a singleton from storage.
     * @param originatorId TBD
     * @param barrier TBD
     */
    clear(originatorId?: string, barrier?: string): Promise<void>;
    /**
     * Triggered when the storage key has been modified or deleted.
     */
    onRemoteStateSynced(doc: PouchDB.Core.ExistingDocument<SingletonStorage>): void;
    /**
     * Get/Modify/Set the data stored for this singleton.
     */
    private upsert;
}
export {};
