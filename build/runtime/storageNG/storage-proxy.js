/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTError } from '../crdt/crdt';
import { ProxyMessageType } from './store';
/**
 * TODO: describe this class. And add some tests.
 */
export class StorageProxy {
    constructor(crdt, port) {
        this.handles = [];
        this.crdt = crdt;
        // TODO: here we will need to do register the callback with the port, something like this:
        // port.InitializeProxy(this, x => this.onMessage(x));
    }
    registerHandle(h) {
        this.handles.push(h);
        return new Map(this.crdt.getData().version);
    }
    applyOp(op) {
        return this.crdt.applyOperation(op);
    }
    getParticleView() {
        return this.crdt.getParticleView();
    }
    onMessage(message) {
        // TODO: if InitializeProxy returns the id, we can assert that it is the same as the message id.
        switch (message.type) {
            case ProxyMessageType.ModelUpdate:
                this.crdt.merge(message.model);
                for (const handle of this.handles) {
                    if (handle.options.notifySync) {
                        handle.onSync();
                    }
                }
                break;
            case ProxyMessageType.Operations:
                for (const op of message.operations) {
                    this.crdt.applyOperation(op);
                }
                for (const handle of this.handles) {
                    if (handle.options.notifyUpdate) {
                        handle.onUpdate(message.operations);
                    }
                }
                break;
            // TODO: handle ProxyMessageType.SyncRequest by sending the local model.
            default:
                throw new CRDTError(`Invalid operation provided to onMessage, type: ${message.type}`);
        }
        return true;
    }
}
//# sourceMappingURL=storage-proxy.js.map