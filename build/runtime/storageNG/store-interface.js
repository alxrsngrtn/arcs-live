/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
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
    constructor(storageKey, exists, type, mode, modelConstructor) {
        this.storageKey = storageKey;
        this.exists = exists;
        this.type = type;
        this.mode = mode;
        this.modelConstructor = modelConstructor;
    }
    async idle() {
        return Promise.resolve();
    }
}
//# sourceMappingURL=store-interface.js.map