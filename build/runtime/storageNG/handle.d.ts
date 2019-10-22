/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTTypeRecord, VersionMap } from '../crdt/crdt.js';
import { CollectionOperation, CRDTCollectionTypeRecord } from '../crdt/crdt-collection.js';
import { CRDTSingletonTypeRecord, SingletonOperation } from '../crdt/crdt-singleton.js';
import { Particle } from '../particle.js';
import { Entity, EntityClass } from '../entity.js';
import { IdGenerator } from '../id.js';
import { Type } from '../type.js';
import { StorageProxy } from './storage-proxy.js';
import { SerializedEntity } from '../storage-proxy.js';
export interface HandleOptions {
    keepSynced: boolean;
    notifySync: boolean;
    notifyUpdate: boolean;
    notifyDesync: boolean;
}
/**
 * Base class for Handles.
 */
export declare abstract class Handle<StorageType extends CRDTTypeRecord> {
    storageProxy: StorageProxy<StorageType>;
    key: string;
    private readonly idGenerator;
    protected clock: VersionMap;
    options: HandleOptions;
    readonly canRead: boolean;
    readonly canWrite: boolean;
    particle: Particle;
    readonly name: string;
    readonly storage: StorageProxy<StorageType>;
    readonly type: Type;
    readonly _id: string;
    createIdentityFor(entity: Entity): void;
    constructor(key: string, storageProxy: StorageProxy<StorageType>, idGenerator: IdGenerator, particle: Particle, canRead: boolean, canWrite: boolean, name?: string);
    configure(options: {
        keepSynced?: boolean;
        notifySync?: boolean;
        notifyUpdate?: boolean;
        notifyDesync?: boolean;
    }): void;
    protected reportUserExceptionInHost(exception: Error, particle: Particle, method: string): void;
    abstract onUpdate(update: StorageType['operation'], oldData: StorageType['consumerType'], version: VersionMap): void;
    abstract onSync(): void;
    onDesync(): Promise<void>;
    disable(particle?: Particle): void;
}
/**
 * This handle class allows particles to manipulate collections and singletons of Entities
 * before the Entity Mutation API (and CRDT stack) is live. Once entity mutation is
 * available then this class will be deprecated and removed, and CollectionHandle / SingletonHandle
 * will become wrappers that reconstruct collections from a collection of references and
 * multiple entity stacks.
 */
export declare abstract class PreEntityMutationHandle<T extends CRDTTypeRecord> extends Handle<T> {
    entityClass: EntityClass;
    constructor(key: string, storageProxy: StorageProxy<T>, idGenerator: IdGenerator, particle: Particle, canRead: boolean, canWrite: boolean, name?: string);
    protected serialize(entity: Entity): SerializedEntity;
    protected ensureEntityHasId(entity: Entity): void;
    protected deserialize(value: SerializedEntity): Entity;
}
/**
 * A handle on a set of Entity data. Note that, as a set, a Collection can only
 * contain a single version of an Entity for each given ID. Further, no order is
 * implied by the set.
 */
export declare class CollectionHandle<T extends Entity> extends PreEntityMutationHandle<CRDTCollectionTypeRecord<SerializedEntity>> {
    get(id: string): Promise<T>;
    add(entity: T): Promise<boolean>;
    addMultiple(entities: T[]): Promise<boolean>;
    remove(entity: T): Promise<boolean>;
    clear(): Promise<boolean>;
    toList(): Promise<T[]>;
    private toCRDTList;
    onUpdate(op: CollectionOperation<SerializedEntity>, oldData: Set<SerializedEntity>, version: VersionMap): Promise<void>;
    onSync(): Promise<void>;
}
/**
 * A handle on a single entity.
 */
export declare class SingletonHandle<T extends Entity> extends PreEntityMutationHandle<CRDTSingletonTypeRecord<SerializedEntity>> {
    set(entity: T): Promise<boolean>;
    clear(): Promise<boolean>;
    get(): Promise<T>;
    onUpdate(op: SingletonOperation<SerializedEntity>, oldData: SerializedEntity, version: VersionMap): Promise<void>;
    onSync(): Promise<void>;
}
export declare function handleNGFor<T extends CRDTTypeRecord>(key: string, storageProxy: StorageProxy<T>, idGenerator: IdGenerator, particle: Particle, canRead: boolean, canWrite: boolean, name?: string): Handle<T>;
