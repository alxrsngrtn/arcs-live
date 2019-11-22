/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { FirebaseStorageKey, FirebaseStorageDriverProvider, FirebaseDriver, FirebaseAppCache } from '../drivers/firebase.js';
import { DriverFactory } from '../drivers/driver-factory.js';
import { Runtime } from '../../runtime.js';
import { assert } from '../../../platform/chai-web.js';
/**
 * These classes are intended to mimic firebase behaviour, including asynchrony.
 *
 * It's OK for methods in these classes to throw an Error if they're not implemented
 * yet; it isn't OK for methods to have different behaviour to the firebase API apart
 * from this.
 *
 * It's OK to add **simple** getXXXForTesting methods, to allow tests to "peek" at
 * stored values. It isn't OK to store complex chains of expectations ala gmock.
 */
class MockFirebaseDataSnapshot {
    constructor(reference) {
        this.ref = reference;
    }
    child(path) {
        throw new Error('Method not implemented.');
    }
    exists() {
        return this.ref.value.value !== null;
    }
    exportVal() {
        throw new Error('Method not implemented.');
    }
    forEach(action) {
        throw new Error('Method not implemented.');
    }
    getPriority() {
        throw new Error('Method not implemented.');
    }
    hasChild(path) {
        throw new Error('Method not implemented.');
    }
    hasChildren() {
        throw new Error('Method not implemented.');
    }
    numChildren() {
        throw new Error('Method not implemented.');
    }
    val() {
        return this.ref.value.value;
    }
    toJSON() {
        throw new Error('Method not implemented.');
    }
}
function clone(value) {
    if (value == null) {
        return null;
    }
    return JSON.parse(JSON.stringify(value));
}
class MockFirebaseReference {
    constructor(database, path, value) {
        this.callbacks = [];
        this.key = path;
        this.backingValue = value;
        this.value = { value: clone(this.backingValue.value) };
        this.database = database;
    }
    child(path) {
        throw new Error('Method not implemented.');
    }
    onDisconnect() {
        throw new Error('Method not implemented.');
    }
    push(value, onComplete) {
        throw new Error('Method not implemented.');
    }
    async remove(onComplete) {
        throw new Error('Method not implemented.');
    }
    async set(value, onComplete) {
        throw new Error('Method not implemented.');
    }
    async setPriority(priority, onComplete) {
        throw new Error('Method not implemented.');
    }
    async setWithPriority(newVal, newPriority, onComplete) {
        throw new Error('Method not implemented.');
    }
    async transaction(transactionUpdate, onComplete, applyLocally) {
        const result = transactionUpdate(this.value.value);
        if (result == undefined) {
            if (onComplete) {
                onComplete(null, false, await this.once('value'));
            }
            return { committed: false };
        }
        const snapshot = new MockFirebaseDataSnapshot(this);
        this.callbacks.forEach(callback => callback(snapshot));
        await 0;
        const backingResult = transactionUpdate(this.backingValue.value);
        if (backingResult == undefined) {
            if (onComplete) {
                onComplete(null, false, await this.once('value'));
            }
            const snapshot = await this.once('value');
            this.callbacks.forEach(callback => callback(snapshot));
            return { committed: false };
        }
        this.backingValue.value = backingResult;
        if (1) {
            // TODO: should only invoke callback here if backingResult is different
            // to result.
            const snapshot = await this.once('value');
            this.callbacks.forEach(callback => callback(snapshot));
        }
        await this.database.propagateUpdate(this.key, this);
        this.value.value = clone(backingResult);
        await 0;
        if (onComplete) {
            onComplete(null, true, snapshot);
        }
        await 0;
        return { committed: true };
    }
    async remoteStateChanged() {
        this.value.value = this.backingValue.value;
        const snapshot = await this.once('value');
        this.callbacks.forEach(callback => callback(snapshot));
    }
    async update(values, onComplete) {
        throw new Error('Method not implemented.');
    }
    endAt(value, key) {
        throw new Error('Method not implemented.');
    }
    equalTo(value, key) {
        throw new Error('Method not implemented.');
    }
    isEqual(other) {
        throw new Error('Method not implemented.');
    }
    limitToFirst(limit) {
        throw new Error('Method not implemented.');
    }
    limitToLast(limit) {
        throw new Error('Method not implemented.');
    }
    off(eventType, callback, context) {
        throw new Error('Method not implemented.');
    }
    on(eventType, callback, cancelCallbackOrContext, context) {
        this.callbacks.push(callback);
        return callback;
    }
    async once(eventType, successCallback, failureCallbackOrContext, context) {
        await 0;
        this.value.value = clone(this.backingValue.value);
        return new MockFirebaseDataSnapshot(this);
    }
    orderByChild(path) {
        throw new Error('Method not implemented.');
    }
    orderByKey() {
        throw new Error('Method not implemented.');
    }
    orderByPriority() {
        throw new Error('Method not implemented.');
    }
    orderByValue() {
        throw new Error('Method not implemented.');
    }
    startAt(value, key) {
        throw new Error('Method not implemented.');
    }
    toJSON() {
        throw new Error('Method not implemented.');
    }
    toString() {
        throw new Error('Method not implemented.');
    }
}
class MockFirebaseDatabase {
    constructor(app) {
        this.values = {};
        this.refs = {};
        this.app = app;
    }
    async propagateUpdate(path, fromReference) {
        for (const reference of this.refs[path]) {
            if (reference === fromReference) {
                continue;
            }
            await reference.remoteStateChanged();
        }
    }
    getValueForTesting(path) {
        return this.values[path].value;
    }
    goOffline() {
        throw new Error('Method not implemented.');
    }
    goOnline() {
        throw new Error('Method not implemented.');
    }
    ref(path) {
        if (path == undefined) {
            path = '';
        }
        if (this.values[path] == undefined) {
            this.values[path] = { value: null };
            this.refs[path] = [];
        }
        // CONFIRMED: ref() calls with the same path return
        // unique Reference objects when using the real firebase API.
        const reference = new MockFirebaseReference(this, path, this.values[path]);
        this.refs[path].push(reference);
        return reference;
    }
    refFromURL(url) {
        throw new Error('Method not implemented.');
    }
}
class MockFirebaseApp {
    constructor(key) {
        this.databases = {};
        this.options = key;
    }
    auth() {
        throw new Error('Method not implemented.');
    }
    database(url) {
        if (url == undefined) {
            url = '';
        }
        // CONFIRMED: database requests with the same url provide the
        // same object when using the real firebase API.
        if (!this.databases[url]) {
            this.databases[url] = new MockFirebaseDatabase(this);
        }
        return this.databases[url];
    }
    getValueForTesting(url, path) {
        return this.databases[url].getValueForTesting(path);
    }
    async delete() {
        throw new Error('Method not implemented.');
    }
    installations() {
        throw new Error('Method not implemented.');
    }
    messaging() {
        throw new Error('Method not implemented.');
    }
    storage(url) {
        throw new Error('Method not implemented.');
    }
    firestore() {
        throw new Error('Method not implemented.');
    }
    functions(region) {
        throw new Error('Method not implemented.');
    }
    performance() {
        throw new Error('Method not implemented.');
    }
}
class MockFirebaseAppCache extends FirebaseAppCache {
    getApp(key) {
        assert.strictEqual(key.domain, 'test.domain');
        const keyAsString = key.toString();
        if (!this.appCache.has(keyAsString)) {
            this.appCache.set(keyAsString, new MockFirebaseApp(key));
        }
        return this.appCache.get(keyAsString);
    }
}
export class MockFirebaseStorageDriverProvider extends FirebaseStorageDriverProvider {
    async driver(storageKey, exists) {
        if (!this.willSupport(storageKey)) {
            throw new Error(`This provider does not support storageKey ${storageKey.toString()}`);
        }
        return MockFirebaseStorageDriverProvider.newDriverForTesting(storageKey, exists);
    }
    static async newDriverForTesting(storageKey, exists) {
        const driver = new FirebaseDriver(storageKey, exists);
        driver.appCache = new MockFirebaseAppCache(Runtime.getRuntime());
        await driver.init();
        return driver;
    }
    static register() {
        DriverFactory.register(new MockFirebaseStorageDriverProvider());
    }
    static getValueForTesting(storageKey) {
        const appCache = new MockFirebaseAppCache(Runtime.getRuntime());
        const app = appCache.getApp(storageKey);
        return app.getValueForTesting('', storageKey.location);
    }
}
export class MockFirebaseStorageKey extends FirebaseStorageKey {
    constructor(location) {
        super('test-project', 'test.domain', 'testKey', location);
    }
}
//# sourceMappingURL=mock-firebase.js.map