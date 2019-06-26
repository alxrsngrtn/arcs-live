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
import { CRDTError } from '../crdt/crdt.js';
import { ProxyMessageType } from './store.js';
/**
 * TODO: describe this class.
 */
export class StorageProxy {
    constructor(crdt, store) {
        this.handles = [];
        this.crdt = crdt;
        this.registerWithStore(store);
    }
    registerWithStore(store) {
        this.id = store.on(x => this.onMessage(x));
        this.store = store;
    }
    registerHandle(h) {
        this.handles.push(h);
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
            id: this.id
        };
        await this.store.onProxyMessage(message);
        this.notifyUpdate([op]);
        return true;
    }
    async getParticleView() {
        await this.synchronizeModel();
        return this.crdt.getParticleView();
    }
    async onMessage(message) {
        assert(message.id === this.id);
        switch (message.type) {
            case ProxyMessageType.ModelUpdate:
                this.crdt.merge(message.model);
                this.notifySync();
                break;
            case ProxyMessageType.Operations:
                for (const op of message.operations) {
                    if (!this.crdt.applyOperation(op)) {
                        // If we cannot cleanly apply ops, sync the whole model.
                        await this.synchronizeModel();
                        // TODO do we need to notify that we are desynced? and return?
                    }
                }
                this.notifyUpdate(message.operations);
                break;
            case ProxyMessageType.SyncRequest:
                await this.store.onProxyMessage({ type: ProxyMessageType.ModelUpdate, model: this.crdt.getData(), id: this.id });
                break;
            default:
                throw new CRDTError(`Invalid operation provided to onMessage, message: ${message}`);
        }
        return true;
    }
    // TODO: use a Scheduler to deliver this in batches by particle.
    notifyUpdate(operations) {
        for (const handle of this.handles) {
            if (handle.options.notifyUpdate) {
                handle.onUpdate(operations);
            }
            else if (handle.options.keepSynced) {
                // keepSynced but not notifyUpdate, notify of the new model.
                handle.onSync();
            }
        }
    }
    notifySync() {
        for (const handle of this.handles) {
            if (handle.options.notifySync) {
                handle.onSync();
            }
        }
    }
    async synchronizeModel() {
        return this.store.onProxyMessage({ type: ProxyMessageType.SyncRequest, id: this.id });
    }
}
//# sourceMappingURL=storage-proxy.js.map