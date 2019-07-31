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
import { Entity, EntityClass } from '../entity.js';
import { IdGenerator } from '../id.js';
import { Type } from '../type.js';
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
    private readonly idGenerator;
    protected clock: VersionMap;
    options: HandleOptions;
    readonly canRead: boolean;
    readonly canWrite: boolean;
    particle: Particle;
    entityClass: EntityClass | null;
    readonly name: string;
    readonly storage: StorageProxy<T>;
    readonly type: Type;
    readonly _id: string;
    createIdentityFor(entity: Entity): void;
    constructor(key: string, storageProxy: StorageProxy<T>, idGenerator: IdGenerator, particle: Particle, canRead: boolean, canWrite: boolean, name?: string);
    configure(options: {
        keepSynced?: boolean;
        notifySync?: boolean;
        notifyUpdate?: boolean;
        notifyDesync?: boolean;
    }): void;
    protected reportUserExceptionInHost(exception: Error, particle: Particle, method: string): void;
    abstract onUpdate(updates: T['operation'][]): void;
    abstract onSync(): void;
    onDesync(): Promise<void>;
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
