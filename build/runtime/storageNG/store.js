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
import { StorageMode, ActiveStore, ProxyMessageType } from './store-interface.js';
import { DirectStore } from './direct-store.js';
import { ReferenceModeStore, ReferenceModeStorageKey } from './reference-mode-store.js';
import { UnifiedStore } from './unified-store.js';
export { StorageMode, ActiveStore, ProxyMessageType };
// A representation of a store. Note that initially a constructed store will be
// inactive - it will not connect to a driver, will not accept connections from
// StorageProxy objects, and no data will be read or written.
//
// Calling 'activate()' will generate an interactive store and return it.
export class Store extends UnifiedStore {
    constructor(storageKey, exists, type, id, name = '') {
        super();
        this.version = 0; // TODO(shans): Needs to become the version vector, and is also probably only available on activated storage?
        this.storageKey = storageKey;
        this.exists = exists;
        this.type = type;
        this.mode = storageKey instanceof ReferenceModeStorageKey ? StorageMode.ReferenceMode : StorageMode.Direct;
        this.id = id;
        this.name = name;
    }
    toString(tags) {
        throw new Error('Method not implemented.');
    }
    // tslint:disable-next-line no-any
    async toLiteral() {
        throw new Error('Method not implemented.');
    }
    cloneFrom(store) {
        throw new Error('Method not implemented.');
    }
    modelForSynchronization() {
        throw new Error('Method not implemented.');
    }
    on(type, fn, target) {
        throw new Error('Method not implemented.');
    }
    async activate() {
        if (Store.constructors.get(this.mode) == null) {
            throw new Error(`StorageMode ${this.mode} not yet implemented`);
        }
        const constructor = Store.constructors.get(this.mode);
        if (constructor == null) {
            throw new Error(`No constructor registered for mode ${this.mode}`);
        }
        const activeStore = await constructor.construct(this.storageKey, this.exists, this.type, this.mode);
        this.exists = Exists.ShouldExist;
        return activeStore;
    }
    // TODO(shans): DELETEME once we've switched to this storage stack
    get referenceMode() {
        return this.mode === StorageMode.ReferenceMode;
    }
}
Store.constructors = new Map([
    [StorageMode.Direct, DirectStore],
    [StorageMode.ReferenceMode, ReferenceModeStore]
]);
//# sourceMappingURL=store.js.map