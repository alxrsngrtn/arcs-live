/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import { Type } from '../../type.js';
import { Runnable } from '../../hot.js';
import { StorageProviderBase } from '../storage-provider-base.js';
import { PouchDbCollection } from './pouch-db-collection.js';
import { PouchDbKey } from './pouch-db-key.js';
import { PouchDbStorage } from './pouch-db-storage.js';
/**
 * Base class for PouchDb related Storage classes
 * (PouchDbVariable/PouchDbCollection)
 */
export declare abstract class PouchDbStorageProvider extends StorageProviderBase {
    /** The Storage Engine instance we were initialized with */
    protected storageEngine: PouchDbStorage;
    backingStore: PouchDbCollection | null;
    private pendingBackingStore?;
    /** The PouchDbKey for this Collection */
    protected readonly pouchDbKey: PouchDbKey;
    protected readonly initialized: Promise<void>;
    protected resolveInitialized: Runnable;
    protected constructor(type: Type, storageEngine: PouchDbStorage, name: string, id: string, key: string, refMode: boolean);
    ensureBackingStore(): Promise<PouchDbCollection>;
    /**
     * The underlying type for the data.
     */
    abstract backingType(): Type;
    /**
     * The active database for this provider.
     */
    protected readonly db: PouchDB.Database;
    /**
     * Called when the remote pouchdb server updates locally.
     */
    abstract onRemoteStateSynced(doc: PouchDB.Core.ExistingDocument<{}>): void;
    /**
     * Increments the local version to be one more than the maximum of
     * the local and remove versions.
     */
    bumpVersion(otherVersion?: number): void;
}
