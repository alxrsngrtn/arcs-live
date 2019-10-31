/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { mapStackTrace } from '../../platform/sourcemapped-stacktrace-web.js';
import { SystemException } from '../arc-exceptions.js';
import { CRDTError } from '../crdt/crdt.js';
import { EntityType } from '../type.js';
import { ProxyMessageType } from './store.js';
/**
 * Mediates between one or more Handles and the backing store. The store can be outside the PEC or
 * directly connected to the StorageProxy.
 */
export class StorageProxy {
    constructor(apiChannelId, storeProvider, type) {
        this.handles = [];
        this.listenerAttached = false;
        this.keepSynced = false;
        this.synchronized = false;
        this.modelHasSynced = () => undefined;
        this.apiChannelId = apiChannelId;
        this.store = storeProvider.getStorageEndpoint(this);
        this.crdt = new (type.crdtInstanceConstructor())();
        this.type = type;
        this.scheduler = new StorageProxyScheduler();
    }
    // TODO: remove this after migration.
    get pec() {
        throw new Error('StorageProxyNG does not have a pec.');
    }
    async idle() {
        return this.scheduler.idle;
    }
    reportExceptionInHost(exception) {
        // TODO: Encapsulate source-mapping of the stack trace once there are more users of the port.RaiseSystemException() call.
        if (mapStackTrace) {
            mapStackTrace(exception.cause.stack, mappedStack => {
                exception.cause.stack = mappedStack;
                this.store.reportExceptionInHost(exception);
            });
        }
        else {
            this.store.reportExceptionInHost(exception);
        }
    }
    registerHandle(handle) {
        this.handles.push(handle);
        // Attach an event listener to the backing store when the first readable handle is registered.
        if (!this.listenerAttached) {
            this.store.setCallback(x => this.onMessage(x));
            this.listenerAttached = true;
        }
        // Change to synchronized mode as soon as we get any handle configured with keepSynced and send
        // a request to get the full model (once).
        // TODO: drop back to non-sync mode if all handles re-configure to !keepSynced.
        if (handle.options.keepSynced) {
            if (!this.keepSynced) {
                this.requestSynchronization().catch(e => {
                    this.reportExceptionInHost(new SystemException(e, handle.key, 'StorageProxy::registerHandle'));
                });
                this.keepSynced = true;
            }
            // If a handle configured for sync notifications registers after we've received the full
            // model, notify it immediately.
            if (handle.options.notifySync && this.synchronized) {
                handle.onSync();
            }
        }
        return this.versionCopy();
    }
    deregisterHandle(handleIn) {
        this.handles = this.handles.filter(handle => handle !== handleIn);
    }
    versionCopy() {
        const version = {};
        for (const [k, v] of Object.entries(this.crdt.getData().version)) {
            version[k] = v;
        }
        return version;
    }
    async applyOp(op) {
        if (!this.crdt.applyOperation(op)) {
            return false;
        }
        const message = {
            type: ProxyMessageType.Operations,
            operations: [op],
        };
        await this.store.onProxyMessage(message);
        this.notifyUpdate(op);
        return true;
    }
    async getParticleView() {
        if (this.synchronized) {
            return [this.crdt.getParticleView(), this.versionCopy()];
        }
        else {
            const promise = new Promise((resolve) => {
                this.modelHasSynced = () => {
                    this.modelHasSynced = () => undefined;
                    resolve([this.crdt.getParticleView(), this.versionCopy()]);
                };
            });
            // Request a new model, it will come back asynchronously with a ModelUpdate message.
            await this.requestSynchronization();
            return promise;
        }
    }
    async onMessage(message) {
        switch (message.type) {
            case ProxyMessageType.ModelUpdate:
                this.crdt.merge(message.model);
                this.synchronized = true;
                this.modelHasSynced();
                this.notifySync();
                break;
            case ProxyMessageType.Operations: {
                // Bail if we're not in synchronized mode.
                if (!this.keepSynced) {
                    return false;
                }
                for (const op of message.operations) {
                    if (!this.crdt.applyOperation(op)) {
                        // If we cannot cleanly apply ops, sync the whole model.
                        this.synchronized = false;
                        await this.notifyDesync();
                        return this.requestSynchronization();
                    }
                    this.notifyUpdate(op);
                }
                // If we have consumed all operations, we've caught up.
                this.synchronized = true;
                break;
            }
            case ProxyMessageType.SyncRequest:
                await this.store.onProxyMessage({ type: ProxyMessageType.ModelUpdate, model: this.crdt.getData() });
                break;
            default:
                throw new CRDTError(`Invalid operation provided to onMessage, message: ${message}`);
        }
        return true;
    }
    notifyUpdate(operation) {
        const version = this.versionCopy();
        for (const handle of this.handles) {
            if (handle.options.notifyUpdate) {
                this.scheduler.enqueue(handle.particle, handle, { type: HandleMessageType.Update, op: operation, version });
            }
            else if (handle.options.keepSynced) {
                // keepSynced but not notifyUpdate, notify of the new model.
                this.scheduler.enqueue(handle.particle, handle, { type: HandleMessageType.Sync });
            }
        }
    }
    notifySync() {
        for (const handle of this.handles) {
            if (handle.options.notifySync) {
                this.scheduler.enqueue(handle.particle, handle, { type: HandleMessageType.Sync });
            }
        }
    }
    notifyDesync() {
        for (const handle of this.handles) {
            if (handle.options.notifyDesync) {
                this.scheduler.enqueue(handle.particle, handle, { type: HandleMessageType.Desync });
            }
        }
    }
    async requestSynchronization() {
        return this.store.onProxyMessage({ type: ProxyMessageType.SyncRequest });
    }
}
export class NoOpStorageProxy extends StorageProxy {
    constructor() {
        super(null, { getStorageEndpoint() { } }, EntityType.make([], {}));
    }
    async idle() {
        return new Promise(resolve => { });
    }
    reportExceptionInHost(exception) { }
    registerHandle(handle) {
        return {};
    }
    deregisterHandle(handle) { }
    versionCopy() {
        return null;
    }
    async applyOp(op) {
        return new Promise(resolve => { });
    }
    async getParticleView() {
        return new Promise(resolve => { });
    }
    async getData() {
        return new Promise(resolve => { });
    }
    async onMessage(message) {
        return new Promise(resolve => { });
    }
    notifyUpdate(operation) { }
    notifySync() { }
    notifyDesync() { }
    async requestSynchronization() {
        return new Promise(resolve => { });
    }
}
var HandleMessageType;
(function (HandleMessageType) {
    HandleMessageType[HandleMessageType["Sync"] = 0] = "Sync";
    HandleMessageType[HandleMessageType["Desync"] = 1] = "Desync";
    HandleMessageType[HandleMessageType["Update"] = 2] = "Update";
})(HandleMessageType || (HandleMessageType = {}));
export class StorageProxyScheduler {
    constructor() {
        this._scheduled = false;
        this._queues = new Map();
        this._idleResolver = null;
        this._idle = null;
        this._scheduled = false;
        // Particle -> {Handle -> [Queue of events]}
        this._queues = new Map();
    }
    enqueue(particle, handle, args) {
        if (!this._queues.has(particle)) {
            this._queues.set(particle, new Map());
        }
        const byHandle = this._queues.get(particle);
        if (!byHandle.has(handle)) {
            byHandle.set(handle, []);
        }
        const queue = byHandle.get(handle);
        queue.push(args);
        this._schedule();
    }
    get busy() {
        return this._queues.size > 0;
    }
    _updateIdle() {
        if (this._idleResolver && !this.busy) {
            this._idleResolver();
            this._idle = null;
            this._idleResolver = null;
        }
    }
    get idle() {
        if (!this.busy) {
            return Promise.resolve();
        }
        if (!this._idle) {
            this._idle = new Promise(resolve => this._idleResolver = resolve);
        }
        return this._idle;
    }
    _schedule() {
        if (this._scheduled) {
            return;
        }
        this._scheduled = true;
        setTimeout(() => {
            this._scheduled = false;
            this._dispatch();
        }, 0);
    }
    _dispatch() {
        // TODO: should we process just one particle per task?
        while (this._queues.size > 0) {
            const particle = [...this._queues.keys()][0];
            const byHandle = this._queues.get(particle);
            this._queues.delete(particle);
            for (const [handle, queue] of byHandle.entries()) {
                for (const update of queue) {
                    this._dispatchUpdate(handle, update).catch(e => handle.storageProxy.reportExceptionInHost(new SystemException(e, 'StorageProxyScheduler::_dispatch', handle.key)));
                }
            }
        }
        this._updateIdle();
    }
    async _dispatchUpdate(handle, update) {
        switch (update.type) {
            case HandleMessageType.Sync:
                handle.onSync();
                break;
            case HandleMessageType.Desync:
                await handle.onDesync();
                break;
            case HandleMessageType.Update:
                handle.onUpdate(update.op, update.version);
                break;
            default:
                console.error('Ignoring unknown update', update);
        }
    }
}
//# sourceMappingURL=storage-proxy.js.map