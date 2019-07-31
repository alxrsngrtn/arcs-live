/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { IdGenerator } from '../../id.js';
import { ActiveStore, StorageMode } from '../store.js';
import { Exists, Driver } from '../drivers/driver-factory.js';
import { CRDTSingleton } from '../../crdt/crdt-singleton.js';
import { StorageKey } from '../storage-key.js';
import { Handle } from '../handle.js';
/**
 * These classes are intended to provide **extremely** simple fake objects to use
 * when testing StorageNG classes. Methods on these classes should either:
 *  - throw an exception
 *  - implement an obvious default
 *  - store the input
 *
 * Ideally, the methods shouldn't actually do anything, (i.e. should always throw)
 * and should be overridden explicitly in testing.
 */
export class MockDriver extends Driver {
    async read(key) { throw new Error('unimplemented'); }
    async write(key, value) { throw new Error('unimplemented'); }
    registerReceiver(receiver) {
        this.receiver = receiver;
    }
    async send(model) {
        return true;
    }
}
export class MockStore extends ActiveStore {
    constructor() {
        super(new MockStorageKey(), Exists.ShouldCreate, null, StorageMode.Direct, CRDTSingleton);
        this.lastCapturedMessage = null;
        this.lastCapturedException = null;
    }
    on(callback) {
        return 1;
    }
    off(callback) {
        throw new Error('unimplemented');
    }
    async onProxyMessage(message) {
        this.lastCapturedMessage = message;
        return Promise.resolve(true);
    }
    reportExceptionInHost(exception) {
        this.lastCapturedException = exception;
    }
}
export class MockStorageKey extends StorageKey {
    constructor() {
        super('testing');
    }
    toString() {
        return `${this.protocol}://`;
    }
    childWithComponent(component) {
        throw new Error('Method not implemented.');
    }
}
export class MockHandle extends Handle {
    constructor(storageProxy) {
        super('handle', storageProxy, IdGenerator.newSession(), {}, true, true);
        this.onSyncCalled = false;
        this.lastUpdate = null;
    }
    onSync() {
        this.onSyncCalled = true;
    }
    onUpdate(ops) {
        this.lastUpdate = ops;
    }
}
export class MockStorageDriverProvider {
    willSupport(storageKey) {
        return true;
    }
    async driver(storageKey, exists) {
        return new MockDriver(storageKey, exists);
    }
}
//# sourceMappingURL=test-storage.js.map