/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ParticleSpec } from './particle-spec.js';
import { Particle } from './particle.js';
import { Reference } from './reference.js';
import { SerializedEntity } from './storage-proxy.js';
import { EntityClass, Entity } from './entity.js';
import { Store, SingletonStore, CollectionStore, BigCollectionStore } from './store.js';
import { IdGenerator } from './id.js';
import { SYMBOL_INTERNALS } from './symbols.js';
/**
 * An interface representing anything storable in a Handle. Concretely, this is the {@link Entity}
 * and {@link ClientReference} classes.
 */
export interface Storable {
    [SYMBOL_INTERNALS]: {
        serialize: () => SerializedEntity;
    };
}
export interface HandleOptions {
    keepSynced: boolean;
    notifySync: boolean;
    notifyUpdate: boolean;
    notifyDesync: boolean;
}
/**
 * Base class for Collections and Singletons.
 */
export declare abstract class Handle {
    readonly storage: Store;
    private readonly idGenerator;
    readonly name: string;
    readonly canRead: boolean;
    readonly canWrite: boolean;
    readonly _particleId: string | null;
    readonly options: HandleOptions;
    entityClass: EntityClass | null;
    abstract _notify(kind: string, particle: Particle, details: {}): any;
    constructor(storage: Store, idGenerator: IdGenerator, name: string, particleId: string | null, canRead: boolean, canWrite: boolean);
    protected reportUserExceptionInHost(exception: Error, particle: Particle, method: string): void;
    protected reportSystemExceptionInHost(exception: Error, method: string): void;
    configure(options: any): void;
    _serialize(entity: Storable): SerializedEntity;
    createIdentityFor(entity: Entity): void;
    readonly type: import("./type.js").Type;
    readonly _id: string;
    toManifestString(): string;
    protected generateKey(): string;
}
/**
 * A handle on a set of Entity data. Note that, as a set, a Collection can only
 * contain a single version of an Entity for each given ID. Further, no order is
 * implied by the set. A particle's manifest dictates the types of handles that
 * need to be connected to that particle, and the current recipe identifies
 * which handles are connected.
 */
export declare class Collection extends Handle {
    readonly storage: CollectionStore;
    _notify(kind: string, particle: Particle, details: any): Promise<void>;
    /**
     * Returns the Entity specified by id contained by the handle, or null if this id is not
     * contained by the handle.
     * @throws {Error} if this handle is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    get(id: string): Promise<any>;
    /**
     * @returns a list of the Entities contained by the handle.
     * @throws {Error} if this handle is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    toList(): Promise<any>;
    _restore(list: any): any;
    /**
     * Stores a new entity into the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    store(entity: Storable): Promise<void>;
    /**
     * Removes all known entities from the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    clear(): Promise<void>;
    /**
     * Removes an entity from the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    remove(entity: Storable): Promise<void>;
}
/**
 * A handle on a single entity. A particle's manifest dictates
 * the types of handles that need to be connected to that particle, and
 * the current recipe identifies which handles are connected.
 */
export declare class Singleton extends Handle {
    readonly storage: SingletonStore;
    _notify(kind: string, particle: Particle, details: any): Promise<void>;
    /**
     * @returns the Entity contained by the Singleton, or undefined if the Singleton is cleared.
     * @throws {Error} if this Singleton is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    get(): Promise<ParticleSpec | Entity | Reference>;
    _restore(model: any): ParticleSpec | Entity | Reference;
    /**
     * Stores a new entity into the Singleton, replacing any existing entity.
     * @throws {Error} if this Singleton is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    set(entity: Storable): Promise<void>;
    /**
     * Clears any entity currently in the Singleton.
     * @throws {Error} if this Singleton is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    clear(): Promise<void>;
}
/**
 * Provides paginated read access to a BigCollection. Conforms to the javascript iterator protocol
 * but is not marked as iterable because next() is async, which is currently not supported by
 * implicit iteration in Javascript.
 */
declare class Cursor {
    private readonly _parent;
    private readonly _cursorId;
    constructor(parent: BigCollection, cursorId: number);
    /**
     * Returns {value: [items], done: false} while there are items still available, or {done: true}
     * when the cursor has completed reading the collection.
     */
    next(): Promise<any>;
    /**
     * Terminates the streamed read. This must be called if a cursor is no longer needed but has not
     * yet completed streaming (i.e. next() hasn't returned {done: true}).
     */
    close(): void;
}
/**
 * A handle on a large set of Entity data. Similar to Collection, except the complete set of
 * entities is not available directly; use stream() to read the full set. Particles wanting to
 * operate on BigCollections should do so in the setHandles() call, since BigCollections do not
 * trigger onHandleSync() or onHandleUpdate().
 */
export declare class BigCollection extends Handle {
    readonly storage: BigCollectionStore;
    configure(options: any): void;
    _notify(kind: string, particle: Particle, details: any): Promise<void>;
    /**
     * Stores a new entity into the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    store(entity: Storable): Promise<void>;
    /**
     * Removes an entity from the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    remove(entity: Entity): Promise<void>;
    /**
     * @returns a Cursor instance that iterates over the full set of entities, reading `pageSize`
     * entities at a time. The cursor views a snapshot of the collection, locked to the version
     * at which the cursor is created.
     *
     * By default items are returned in order of original insertion into the collection (with the
     * caveat that items removed during a streamed read may be returned at the end). Set `forward`
     * to false to return items in reverse insertion order.
     *
     * @throws {Error} if this Singleton is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    stream({ pageSize, forward }: {
        pageSize: any;
        forward?: boolean;
    }): Promise<Cursor>;
}
export declare function handleFor(storage: Store, idGenerator: IdGenerator, name?: string, particleId?: string, canRead?: boolean, canWrite?: boolean): Handle;
export {};
