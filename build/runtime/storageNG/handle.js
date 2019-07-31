/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/assert-web.js';
import { UserException } from '../arc-exceptions.js';
import { CollectionOpTypes } from '../crdt/crdt-collection';
import { SingletonOpTypes } from '../crdt/crdt-singleton';
import { Entity } from '../entity.js';
import { Id } from '../id.js';
import { EntityType } from '../type.js';
/**
 * Base class for Handles.
 */
export class Handle {
    constructor(key, storageProxy, idGenerator, particle, canRead, canWrite, name) {
        this.key = key;
        this.name = name;
        this.storageProxy = storageProxy;
        this.idGenerator = idGenerator;
        this.particle = particle;
        this.options = {
            keepSynced: true,
            notifySync: true,
            notifyUpdate: true,
            notifyDesync: false,
        };
        this.canRead = canRead;
        this.canWrite = canWrite;
        const type = this.storageProxy.type.getContainedType() || this.storageProxy.type;
        if (type instanceof EntityType) {
            this.entityClass = type.entitySchema.entityClass(this.storageProxy.pec);
        }
        this.clock = this.storageProxy.registerHandle(this);
    }
    //TODO: this is used by multiplexer-dom-particle.ts, it probably won't work with this kind of store.
    get storage() {
        return this.storageProxy;
    }
    get type() {
        return this.storageProxy.type;
    }
    // TODO: after NG migration, this can be renamed to something like "apiChannelId()".
    get _id() {
        return this.storageProxy.apiChannelId;
    }
    createIdentityFor(entity) {
        Entity.createIdentity(entity, Id.fromString(this._id), this.idGenerator);
    }
    // `options` may contain any of:
    // - keepSynced (bool): load full data on startup, maintain data in proxy and resync as required
    // - notifySync (bool): if keepSynced is true, call onHandleSync when the full data is received
    // - notifyUpdate (bool): call onHandleUpdate for every change event received
    // - notifyDesync (bool): if keepSynced is true, call onHandleDesync when desync is detected
    configure(options) {
        assert(this.canRead, 'configure can only be called on readable Handles');
        this.options = { ...this.options, ...options };
    }
    reportUserExceptionInHost(exception, particle, method) {
        this.storageProxy.reportExceptionInHost(new UserException(exception, method, this.key, particle.spec.name));
    }
    async onDesync() {
        await this.particle.callOnHandleDesync(this, e => this.reportUserExceptionInHost(e, this.particle, 'onHandleUpdate'));
    }
}
/**
 * A handle on a set of Entity data. Note that, as a set, a Collection can only
 * contain a single version of an Entity for each given ID. Further, no order is
 * implied by the set.
 */
export class CollectionHandle extends Handle {
    async get(id) {
        const data = await this.storageProxy.getData();
        return data.values[id].value;
    }
    async add(entity) {
        this.clock[this.key] = (this.clock[this.key] || 0) + 1;
        const op = {
            type: CollectionOpTypes.Add,
            added: entity,
            actor: this.key,
            clock: this.clock,
        };
        return this.storageProxy.applyOp(op);
    }
    async addMultiple(entities) {
        return Promise.all(entities.map(e => this.add(e))).then(array => array.every(Boolean));
    }
    async remove(entity) {
        const op = {
            type: CollectionOpTypes.Remove,
            removed: entity,
            actor: this.key,
            clock: this.clock,
        };
        return this.storageProxy.applyOp(op);
    }
    async clear() {
        const values = await this.toList();
        for (const value of values) {
            const removeOp = {
                type: CollectionOpTypes.Remove,
                removed: value,
                actor: this.key,
                clock: this.clock,
            };
            if (!this.storageProxy.applyOp(removeOp)) {
                return false;
            }
        }
        return true;
    }
    async toList() {
        return this.storageProxy.getParticleView().then(set => [...set]);
    }
    onUpdate(ops) {
        for (const op of ops) {
            // Pass the change up to the particle.
            // tslint:disable-next-line: no-any
            const update = {};
            if (op.type === CollectionOpTypes.Add) {
                update.added = op.added;
            }
            if (op.type === CollectionOpTypes.Remove) {
                update.removed = op.removed;
            }
            update.originator = (this.key === op.actor);
            // TODO: call onHandleUpdate on the particle, eg:
            // this.particle.onHandleUpdate(this /*handle*/, update);
        }
    }
    onSync() {
        // TODO: call onHandleSync on the particle, eg:
        // particle.onHandleSync(this /*handle*/, this.toList() /*model*/);
    }
}
/**
 * A handle on a single entity.
 */
export class SingletonHandle extends Handle {
    async set(entity) {
        this.clock[this.key] = (this.clock[this.key] || 0) + 1;
        const op = {
            type: SingletonOpTypes.Set,
            value: entity,
            actor: this.key,
            clock: this.clock,
        };
        return this.storageProxy.applyOp(op);
    }
    async clear() {
        const op = {
            type: SingletonOpTypes.Clear,
            actor: this.key,
            clock: this.clock,
        };
        return this.storageProxy.applyOp(op);
    }
    async get() {
        return this.storageProxy.getParticleView();
    }
    onUpdate(ops) {
        for (const op of ops) {
            // Pass the change up to the particle.
            // tslint:disable-next-line: no-any
            const update = {};
            if (op.type === SingletonOpTypes.Set) {
                // TODO: do we also need to set oldData?
                update.data = op.value;
            }
            if (op.type === SingletonOpTypes.Clear) {
                // TODO: what update should we return here?
            }
            update.originator = (this.key === op.actor);
            // TODO: call onHandleUpdate on the particle, eg:
            // this.particle.onHandleUpdate(this /*handle*/, update);
        }
    }
    onSync() {
        // TODO: call onHandleSync on the particle, eg:
        // particle.onHandleSync(this /*handle*/, this.get() /*model*/);
    }
}
//# sourceMappingURL=handle.js.map