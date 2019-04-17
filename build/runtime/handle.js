/** @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { SystemException, UserException } from './arc-exceptions.js';
import { ParticleSpec } from './particle-spec.js';
import { Reference } from './reference.js';
import { BigCollectionType, CollectionType, EntityType, InterfaceType, ReferenceType } from './type.js';
import { Entity } from './entity.js';
import { Id } from './id.js';
// TODO: This won't be needed once runtime is transferred between contexts.
function cloneData(data) {
    return data;
    //return JSON.parse(JSON.stringify(data));
}
function restore(entry, entityClass) {
    assert(entityClass, 'Handles need entity classes for deserialization');
    const { id, rawData } = entry;
    const entity = new entityClass(cloneData(rawData));
    if (entry.id) {
        entity.identify(entry.id);
    }
    // TODO some relation magic, somewhere, at some point.
    return entity;
}
/**
 * Base class for Collections and Variables.
 */
export class Handle {
    // TODO type particleId, marked as string, but called with number
    constructor(storage, idGenerator, name, particleId, canRead, canWrite) {
        assert(!(storage instanceof Handle));
        this.storage = storage;
        this.idGenerator = idGenerator;
        this.name = name || this.storage.name;
        this.canRead = canRead;
        this.canWrite = canWrite;
        this._particleId = particleId;
        this.options = {
            keepSynced: true,
            notifySync: true,
            notifyUpdate: true,
            notifyDesync: false,
        };
    }
    reportUserExceptionInHost(exception, particle, method) {
        this.storage.reportExceptionInHost(new UserException(exception, method, this._particleId, particle.spec.name));
    }
    reportSystemExceptionInHost(exception, method) {
        this.storage.reportExceptionInHost(new SystemException(exception, method, this._particleId));
    }
    // `options` may contain any of:
    // - keepSynced (bool): load full data on startup, maintain data in proxy and resync as required
    // - notifySync (bool): if keepSynced is true, call onHandleSync when the full data is received
    // - notifyUpdate (bool): call onHandleUpdate for every change event received
    // - notifyDesync (bool): if keepSynced is true, call onHandleDesync when desync is detected
    configure(options) {
        assert(this.canRead, 'configure can only be called on readable Handles');
        try {
            const keys = Object.keys(this.options);
            const badKeys = Object.keys(options).filter(o => !keys.includes(o));
            if (badKeys.length > 0) {
                throw new Error(`Invalid option in Handle.configure(): ${badKeys}`);
            }
            Object.assign(this.options, options);
        }
        catch (e) {
            this.reportSystemExceptionInHost(e, 'Handle::configure');
            throw e;
        }
    }
    _serialize(entity) {
        assert(entity, 'can\'t serialize a null entity');
        if (entity instanceof Entity) {
            if (!entity.isIdentified()) {
                entity.createIdentity(Id.fromString(this._id), this.idGenerator);
            }
        }
        return entity.serialize();
    }
    get type() {
        return this.storage.type;
    }
    get _id() {
        return this.storage.id;
    }
    toManifestString() {
        return `'${this._id}'`;
    }
}
/**
 * A handle on a set of Entity data. Note that, as a set, a Collection can only
 * contain a single version of an Entity for each given ID. Further, no order is
 * implied by the set. A particle's manifest dictates the types of handles that
 * need to be connected to that particle, and the current recipe identifies
 * which handles are connected.
 */
export class Collection extends Handle {
    _notify(kind, particle, details) {
        assert(this.canRead, '_notify should not be called for non-readable handles');
        switch (kind) {
            case 'sync':
                try {
                    particle.onHandleSync(this, this._restore(details));
                }
                catch (e) {
                    this.reportUserExceptionInHost(e, particle, 'onHandleSync');
                }
                return;
            case 'update': {
                // tslint:disable-next-line: no-any
                const update = {};
                if ('add' in details) {
                    update.added = this._restore(details.add);
                }
                if ('remove' in details) {
                    update.removed = this._restore(details.remove);
                }
                update.originator = details.originatorId === this._particleId;
                particle.onHandleUpdate(this, update);
                return;
            }
            case 'desync':
                particle.onHandleDesync(this);
                return;
            default:
                throw new Error('unsupported');
        }
    }
    /**
     * Returns the Entity specified by id contained by the handle, or null if this id is not
     * contained by the handle.
     * @throws {Error} if this handle is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    async get(id) {
        if (!this.canRead) {
            throw new Error('Handle not readable');
        }
        return this._restore([await this.storage.get(id)])[0];
    }
    /**
     * @returns a list of the Entities contained by the handle.
     * @throws {Error} if this handle is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    async toList() {
        if (!this.canRead) {
            throw new Error('Handle not readable');
        }
        return this._restore(await this.storage.toList());
    }
    _restore(list) {
        return (list !== null) ? list.map(a => restore(a, this.entityClass)) : null;
    }
    /**
     * Stores a new entity into the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async store(entity) {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        const serialization = this._serialize(entity);
        const keys = [this.storage.generateID() + 'key'];
        return this.storage.store(serialization, keys, this._particleId);
    }
    /**
     * Removes all known entities from the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async clear() {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        if (this.storage.clear) {
            return this.storage.clear(this._particleId);
        }
        else {
            throw new Error('clear not implemented by storage');
        }
    }
    /**
     * Removes an entity from the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async remove(entity) {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        const serialization = this._serialize(entity);
        // Remove the keys that exist at storage/proxy.
        const keys = [];
        this.storage.remove(serialization.id, keys, this._particleId);
    }
}
/**
 * A handle on a single entity. A particle's manifest dictates
 * the types of handles that need to be connected to that particle, and
 * the current recipe identifies which handles are connected.
 */
export class Variable extends Handle {
    // Called by StorageProxy.
    async _notify(kind, particle, details) {
        assert(this.canRead, '_notify should not be called for non-readable handles');
        switch (kind) {
            case 'sync':
                try {
                    await particle.onHandleSync(this, this._restore(details));
                }
                catch (e) {
                    this.reportUserExceptionInHost(e, particle, 'onHandleSync');
                }
                return;
            case 'update': {
                try {
                    const data = this._restore(details.data);
                    const oldData = this._restore(details.oldData);
                    await particle.onHandleUpdate(this, { data, oldData });
                }
                catch (e) {
                    this.reportUserExceptionInHost(e, particle, 'onHandleUpdate');
                }
                return;
            }
            case 'desync':
                try {
                    await particle.onHandleDesync(this);
                }
                catch (e) {
                    this.reportUserExceptionInHost(e, particle, 'onHandleDesync');
                }
                return;
            default:
                throw new Error('unsupported');
        }
    }
    /**
     * @returns the Entity contained by the Variable, or undefined if the Variable
     * is cleared.
     * @throws {Error} if this variable is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    async get() {
        if (!this.canRead) {
            throw new Error('Handle not readable');
        }
        const model = await this.storage.get();
        return this._restore(model);
    }
    _restore(model) {
        if (model == null) {
            return null;
        }
        if (this.type instanceof EntityType) {
            return restore(model, this.entityClass);
        }
        if (this.type instanceof InterfaceType) {
            return ParticleSpec.fromLiteral(model);
        }
        if (this.type instanceof ReferenceType) {
            return new Reference(model, this.type, this.storage.pec);
        }
        throw new Error(`Don't know how to deliver handle data of type ${this.type}`);
    }
    /**
     * Stores a new entity into the Variable, replacing any existing entity.
     * @throws {Error} if this variable is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async set(entity) {
        try {
            if (!this.canWrite) {
                throw new Error('Handle not writeable');
            }
            const serialization = this._serialize(entity);
            return this.storage.set(serialization, this._particleId);
        }
        catch (e) {
            this.reportSystemExceptionInHost(e, 'Handle::set');
            throw e;
        }
    }
    /**
     * Clears any entity currently in the Variable.
     * @throws {Error} if this variable is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async clear() {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        return this.storage.clear(this._particleId);
    }
}
/**
 * Provides paginated read access to a BigCollection. Conforms to the javascript iterator protocol
 * but is not marked as iterable because next() is async, which is currently not supported by
 * implicit iteration in Javascript.
 */
class Cursor {
    constructor(parent, cursorId) {
        this._parent = parent;
        this._cursorId = cursorId;
    }
    /**
     * Returns {value: [items], done: false} while there are items still available, or {done: true}
     * when the cursor has completed reading the collection.
     */
    async next() {
        const data = await this._parent.storage.cursorNext(this._cursorId);
        if (!data.done) {
            data.value = data.value.map(a => restore(a, this._parent.entityClass));
        }
        return data;
    }
    /**
     * Terminates the streamed read. This must be called if a cursor is no longer needed but has not
     * yet completed streaming (i.e. next() hasn't returned {done: true}).
     */
    close() {
        this._parent.storage.cursorClose(this._cursorId);
    }
}
/**
 * A handle on a large set of Entity data. Similar to Collection, except the complete set of
 * entities is not available directly; use stream() to read the full set. Particles wanting to
 * operate on BigCollections should do so in the setHandles() call, since BigCollections do not
 * trigger onHandleSync() or onHandleUpdate().
 */
export class BigCollection extends Handle {
    configure(options) {
        throw new Error('BigCollections do not support sync/update configuration');
    }
    async _notify(kind, particle, details) {
        assert(this.canRead, '_notify should not be called for non-readable handles');
        assert(kind === 'sync', 'BigCollection._notify only supports sync events');
        await particle.onHandleSync(this, []);
    }
    /**
     * Stores a new entity into the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async store(entity) {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        const serialization = this._serialize(entity);
        const keys = [this.storage.generateID() + 'key'];
        return this.storage.store(serialization, keys, this._particleId);
    }
    /**
     * Removes an entity from the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async remove(entity) {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        const serialization = this._serialize(entity);
        this.storage.remove(serialization.id, [], this._particleId);
    }
    /**
     * @returns a Cursor instance that iterates over the full set of entities, reading `pageSize`
     * entities at a time. The cursor views a snapshot of the collection, locked to the version
     * at which the cursor is created.
     *
     * By default items are returned in order of original insertion into the collection (with the
     * caveat that items removed during a streamed read may be returned at the end). Set `forward`
     * to false to return items in reverse insertion order.
     *
     * @throws {Error} if this variable is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    async stream({ pageSize, forward = true }) {
        if (!this.canRead) {
            throw new Error('Handle not readable');
        }
        if (isNaN(pageSize) || pageSize < 1) {
            throw new Error('Streamed reads require a positive pageSize');
        }
        const cursorId = await this.storage.stream(pageSize, forward);
        return new Cursor(this, cursorId);
    }
}
export function handleFor(storage, idGenerator, name = null, particleId = '', canRead = true, canWrite = true) {
    let handle;
    if (storage.type instanceof CollectionType) {
        handle = new Collection(storage, idGenerator, name, particleId, canRead, canWrite);
    }
    else if (storage.type instanceof BigCollectionType) {
        handle = new BigCollection(storage, idGenerator, name, particleId, canRead, canWrite);
    }
    else {
        handle = new Variable(storage, idGenerator, name, particleId, canRead, canWrite);
    }
    const type = storage.type.getContainedType() || storage.type;
    if (type instanceof EntityType) {
        handle.entityClass = type.entitySchema.entityClass(storage.pec);
    }
    return handle;
}
//# sourceMappingURL=handle.js.map