/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Exists } from './drivers/driver-factory.js';
import { StorageMode, ActiveStore, ProxyMessageType } from './store-interface';
import { DirectStore } from './direct-store.js';
export { StorageMode, ActiveStore, ProxyMessageType };
// A representation of a store. Note that initially a constructed store will be
// inactive - it will not connect to a driver, will not accept connections from 
// StorageProxy objects, and no data will be read or written.
//
// Calling 'activate() will generate an interactive store and return it. 
export class Store {
    constructor(storageKey, exists, type, mode, modelConstructor) {
        this.storageKey = storageKey;
        this.exists = exists;
        this.type = type;
        this.mode = mode;
        this.modelConstructor = modelConstructor;
    }
    async activate() {
        if (Store.constructors.get(this.mode) == null) {
            throw new Error(`StorageMode ${this.mode} not yet implemented`);
        }
        const constructor = Store.constructors.get(this.mode);
        if (constructor == null) {
            throw new Error(`No constructor registered for mode ${this.mode}`);
        }
        const activeStore = await constructor.construct(this.storageKey, this.exists, this.type, this.mode, this.modelConstructor);
        this.exists = Exists.ShouldExist;
        return activeStore;
    }
}
Store.constructors = new Map([
    [StorageMode.Direct, DirectStore],
    [StorageMode.ReferenceMode, null]
]);
//# sourceMappingURL=store.js.map