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
/**
 * This file exists to break a circular dependency between Store and the ActiveStore implementations.
 * Source code outside of the storageNG directory should not import this file directly; instead use
 * store.ts, which re-exports all the useful symbols.
 */
export var StorageMode;
(function (StorageMode) {
    StorageMode[StorageMode["Direct"] = 0] = "Direct";
    StorageMode[StorageMode["Backing"] = 1] = "Backing";
    StorageMode[StorageMode["ReferenceMode"] = 2] = "ReferenceMode";
})(StorageMode || (StorageMode = {}));
export var ProxyMessageType;
(function (ProxyMessageType) {
    ProxyMessageType[ProxyMessageType["SyncRequest"] = 0] = "SyncRequest";
    ProxyMessageType[ProxyMessageType["ModelUpdate"] = 1] = "ModelUpdate";
    ProxyMessageType[ProxyMessageType["Operations"] = 2] = "Operations";
})(ProxyMessageType || (ProxyMessageType = {}));
// A representation of an active store. Subclasses of this class provide specific
// behaviour as controlled by the provided StorageMode.
export class ActiveStore {
    // TODO: Lots of these params can be pulled from baseStore.
    constructor(options) {
        this.storageKey = options.storageKey;
        this.exists = options.exists;
        this.type = options.type;
        this.mode = options.mode;
        this.baseStore = options.baseStore;
    }
    async idle() {
        return Promise.resolve();
    }
    // tslint:disable-next-line no-any
    async toLiteral() {
        throw new Error('Method not implemented.');
    }
    async cloneFrom(store) {
        assert(store instanceof ActiveStore);
        const activeStore = store;
        assert(this.mode === activeStore.mode);
        await this.onProxyMessage({
            type: ProxyMessageType.ModelUpdate,
            model: await activeStore.getLocalData()
        });
    }
    async modelForSynchronization() {
        return this.toLiteral();
    }
    getStorageEndpoint() {
        const store = this;
        let id;
        return {
            async onProxyMessage(message) {
                message.id = id;
                return store.onProxyMessage(message);
            },
            setCallback(callback) {
                id = store.on(callback);
            },
            reportExceptionInHost(exception) {
                store.reportExceptionInHost(exception);
            }
        };
    }
}
//# sourceMappingURL=store-interface.js.map