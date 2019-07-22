/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTTypeRecord, VersionMap } from '../crdt/crdt';
import { CollectionOperation, CRDTCollectionTypeRecord, Referenceable } from '../crdt/crdt-collection';
import { CRDTSingletonTypeRecord, SingletonOperation } from '../crdt/crdt-singleton';
import { Particle } from '../particle';
import { StorageProxy } from './storage-proxy';
export interface HandleOptions {
    keepSynced: boolean;
    notifySync: boolean;
    notifyUpdate: boolean;
    notifyDesync: boolean;
}
/**
 * Base class for Handles.
 */
export declare abstract class Handle<T extends CRDTTypeRecord> {
    storageProxy: StorageProxy<T>;
    key: string;
    clock: VersionMap;
    options: HandleOptions;
    readonly canRead: boolean;
    readonly canWrite: boolean;
    particle: Particle;
    constructor(key: string, storageProxy: StorageProxy<T>, particle: Particle, canRead: boolean, canWrite: boolean);
    configure(options: HandleOptions): void;
    abstract onUpdate(updates: T['operation'][]): void;
    abstract onSync(): void;
    onDesync(): void;
}
/**
 * A handle on a set of Entity data. Note that, as a set, a Collection can only
 * contain a single version of an Entity for each given ID. Further, no order is
 * implied by the set.
 */
export declare class CollectionHandle<T extends Referenceable> extends Handle<CRDTCollectionTypeRecord<T>> {
    get(id: string): Promise<T>;
    add(entity: T): Promise<boolean>;
    addMultiple(entities: T[]): Promise<boolean>;
    remove(entity: T): Promise<boolean>;
    clear(): Promise<boolean>;
    toList(): Promise<T[]>;
    onUpdate(ops: CollectionOperation<T>[]): void;
    onSync(): void;
}
/**
 * A handle on a single entity.
 */
export declare class SingletonHandle<T extends Referenceable> extends Handle<CRDTSingletonTypeRecord<T>> {
    set(entity: T): Promise<boolean>;
    clear(): Promise<boolean>;
    get(): Promise<T>;
    onUpdate(ops: SingletonOperation<T>[]): void;
    onSync(): void;
}
