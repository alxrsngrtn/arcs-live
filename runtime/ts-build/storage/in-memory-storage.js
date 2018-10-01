// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
import { assert } from '../../../platform/assert-web.js';
import { Tracing } from '../../../tracelib/trace.js';
import { StorageBase, StorageProviderBase } from './storage-provider-base.js';
import { KeyBase } from './key-base.js';
import { CrdtCollectionModel } from './crdt-collection-model.js';
export function resetInMemoryStorageForTesting() {
    for (const key of Object.keys(__storageCache)) {
        __storageCache[key]._memoryMap = {};
    }
}
class InMemoryKey extends KeyBase {
    constructor(key) {
        super();
        let parts = key.split('://');
        this.protocol = parts[0];
        assert(this.protocol === 'in-memory', `can't construct in-memory key for protocol ${this.protocol} (input key ${key})`);
        parts = parts[1] ? parts.slice(1).join('://').split('^^') : [];
        this.arcId = parts[0];
        this.location = parts[1];
        assert(this.toString() === key);
    }
    childKeyForHandle(id) {
        return new InMemoryKey('in-memory://');
    }
    toString() {
        if (this.location !== undefined && this.arcId !== undefined) {
            return `${this.protocol}://${this.arcId}^^${this.location}`;
        }
        if (this.arcId !== undefined) {
            return `${this.protocol}://${this.arcId}`;
        }
        return `${this.protocol}`;
    }
}
// tslint:disable-next-line: variable-name
const __storageCache = {};
export class InMemoryStorage extends StorageBase {
    constructor(arcId) {
        super(arcId);
        this._memoryMap = {};
        this._typeMap = {};
        this.localIDBase = 0;
        this.typePromiseMap = {};
        // TODO(shans): re-add this assert once we have a runtime object to put it on.
        // assert(__storageCache[this._arc.id] == undefined, `${this._arc.id} already exists in local storage cache`);
        __storageCache[this.arcId.toString()] = this;
    }
    async construct(id, type, keyFragment) {
        const provider = await this._construct(id, type, keyFragment);
        if (type.isReference || type.isBigCollection) {
            return provider;
        }
        if (type.isTypeContainer() && type.getContainedType().isReference) {
            return provider;
        }
        provider.enableReferenceMode();
        return provider;
    }
    async _construct(id, type, keyFragment) {
        const key = new InMemoryKey(keyFragment);
        if (key.arcId == undefined) {
            key.arcId = this.arcId.toString();
        }
        if (key.location == undefined) {
            key.location = 'in-memory-' + this.localIDBase++;
        }
        // TODO(shanestephens): should pass in factory, not 'this' here.
        const provider = InMemoryStorageProvider.newProvider(type, this, undefined, id, key.toString());
        if (this._memoryMap[key.toString()] !== undefined) {
            return null;
        }
        this._memoryMap[key.toString()] = provider;
        return provider;
    }
    async connect(id, type, key) {
        const imKey = new InMemoryKey(key);
        if (imKey.arcId !== this.arcId.toString()) {
            if (__storageCache[imKey.arcId] == undefined) {
                return null;
            }
            return __storageCache[imKey.arcId].connect(id, type, key);
        }
        if (this._memoryMap[key] == undefined) {
            return null;
        }
        // TODO assert types match?
        return this._memoryMap[key];
    }
    baseStorageKey(type) {
        const key = new InMemoryKey('in-memory');
        key.arcId = this.arcId.toString();
        key.location = 'in-memory-' + type.toString();
        return key.toString();
    }
    async baseStorageFor(type, key) {
        if (this._typeMap[key]) {
            return this._typeMap[key];
        }
        if (this.typePromiseMap[key]) {
            return this.typePromiseMap[key];
        }
        const storagePromise = this._construct(type.toString(), type.collectionOf(), key);
        this.typePromiseMap[key] = storagePromise;
        const storage = await storagePromise;
        assert(storage, `could not construct baseStorage for key ${key}`);
        this._typeMap[key] = storage;
        return storage;
    }
    parseStringAsKey(s) {
        return new InMemoryKey(s);
    }
}
class InMemoryStorageProvider extends StorageProviderBase {
    constructor() {
        super(...arguments);
        this.backingStore = null;
        this.pendingBackingStore = null;
    }
    static newProvider(type, storageEngine, name, id, key) {
        if (type.isCollection) {
            return new InMemoryCollection(type, storageEngine, name, id, key);
        }
        if (type.isBigCollection) {
            return new InMemoryBigCollection(type, storageEngine, name, id, key);
        }
        return new InMemoryVariable(type, storageEngine, name, id, key);
    }
    // A consequence of awaiting this function is that this.backingStore
    // is guaranteed to exist once the await completes. This is because
    // if backingStore doesn't yet exist, the assignment in the then()
    // is guaranteed to execute before anything awaiting this function.
    async ensureBackingStore() {
        if (this.backingStore) {
            return this.backingStore;
        }
        if (!this.pendingBackingStore) {
            const key = this.storageEngine.baseStorageKey(this.backingType());
            this.pendingBackingStore = this.storageEngine.baseStorageFor(this.backingType(), key);
            this.pendingBackingStore.then(backingStore => this.backingStore = backingStore);
        }
        return this.pendingBackingStore;
    }
}
class InMemoryCollection extends InMemoryStorageProvider {
    constructor(type, storageEngine, name, id, key) {
        super(type, name, id, key);
        this._model = new CrdtCollectionModel();
        this.storageEngine = storageEngine;
        assert(this.version !== null);
    }
    backingType() {
        return this.type.primitiveType();
    }
    clone() {
        const handle = new InMemoryCollection(this.type, this.storageEngine, this.name, this.id, null);
        handle.cloneFrom(this);
        return handle;
    }
    async cloneFrom(handle) {
        this.referenceMode = handle.referenceMode;
        const literal = await handle.toLiteral();
        if (this.referenceMode && literal.model.length > 0) {
            await Promise.all([this.ensureBackingStore(), handle.ensureBackingStore()]);
            literal.model = literal.model.map(({ id, value }) => ({ id, value: { id: value.id, storageKey: this.backingStore.storageKey } }));
            const underlying = await handle.backingStore.getMultiple(literal.model.map(({ id }) => id));
            await this.backingStore.storeMultiple(underlying, [this.storageKey]);
        }
        this.fromLiteral(literal);
    }
    async modelForSynchronization() {
        const model = await this._toList();
        return { version: this.version, model };
    }
    // Returns {version, model: [{id, value, keys: []}]}
    toLiteral() {
        return { version: this.version, model: this._model.toLiteral() };
    }
    fromLiteral({ version, model }) {
        this.version = version;
        this._model = new CrdtCollectionModel(model);
    }
    async _toList() {
        if (this.referenceMode) {
            const items = this.toLiteral().model;
            if (items.length === 0) {
                return [];
            }
            const refSet = new Set();
            items.forEach(item => refSet.add(item.value.storageKey));
            assert(refSet.size === 1, `multiple storageKeys in reference set of collection not yet supported.`);
            const ref = refSet.values().next().value;
            await this.ensureBackingStore();
            const ids = items.map(item => item.value.id);
            const results = await this.backingStore.getMultiple(ids);
            const output = [];
            for (let i = 0; i < results.length; i++) {
                output.push({ id: ids[i], value: results[i], keys: items[i].keys });
            }
            return output;
        }
        return this.toLiteral().model;
    }
    async toList() {
        return (await this._toList()).map(item => item.value);
    }
    async getMultiple(ids) {
        assert(!this.referenceMode, "getMultiple not implemented for referenceMode stores");
        return ids.map(id => this._model.getValue(id));
    }
    async storeMultiple(values, keys, originatorId = null) {
        assert(!this.referenceMode, "storeMultiple not implemented for referenceMode stores");
        values.map(value => this._model.add(value.id, value, keys));
        this.version++;
    }
    async get(id) {
        if (this.referenceMode) {
            const ref = this._model.getValue(id);
            if (ref == null) {
                return null;
            }
            await this.ensureBackingStore();
            const result = await this.backingStore.get(ref.id);
            return result;
        }
        return this._model.getValue(id);
    }
    traceInfo() {
        return { items: this._model.size };
    }
    async store(value, keys, originatorId = null) {
        assert(keys != null && keys.length > 0, 'keys required');
        const trace = Tracing.start({ cat: 'handle', name: 'InMemoryCollection::store', args: { name: this.name } });
        const changeEvent = { value, keys, effective: undefined };
        if (this.referenceMode) {
            const referredType = this.type.primitiveType();
            const storageKey = this.backingStore ? this.backingStore.storageKey : this.storageEngine.baseStorageKey(referredType);
            // It's important to store locally first, as the upstream consumers
            // are set up to assume all writes are processed (at least locally) synchronously.
            changeEvent.effective = this._model.add(value.id, { id: value.id, storageKey }, keys);
            await this.ensureBackingStore();
            await this.backingStore.store(value, keys);
        }
        else {
            changeEvent.effective = this._model.add(value.id, value, keys);
        }
        this.version++;
        await trace.wait(this._fire('change', { add: [changeEvent], version: this.version, originatorId }));
        trace.end({ args: { value } });
    }
    async remove(id, keys = [], originatorId = null) {
        const trace = Tracing.start({ cat: 'handle', name: 'InMemoryCollection::remove', args: { name: this.name } });
        if (keys.length === 0) {
            keys = this._model.getKeys(id);
        }
        const value = this._model.getValue(id);
        if (value !== null) {
            const effective = this._model.remove(id, keys);
            this.version++;
            await trace.wait(this._fire('change', { remove: [{ value, keys, effective }], version: this.version, originatorId }));
        }
        trace.end({ args: { entity: value } });
    }
    clearItemsForTesting() {
        this._model = new CrdtCollectionModel();
    }
}
class InMemoryVariable extends InMemoryStorageProvider {
    constructor(type, storageEngine, name, id, key) {
        super(type, name, id, key);
        this.localKeyId = 0;
        this.storageEngine = storageEngine;
        this._stored = null;
        this.backingStore = null;
    }
    backingType() {
        return this.type;
    }
    clone() {
        const variable = new InMemoryVariable(this.type, this.storageEngine, this.name, this.id, null);
        variable.cloneFrom(this);
        return variable;
    }
    async cloneFrom(handle) {
        this.referenceMode = handle.referenceMode;
        // TODO(shans): if the handle has local modifications then cloning can fail because
        // underlying backingStore data isn't yet available to be read. However, checking the
        // localModified flag and calling persistChanges is really not the correct way to
        // mitigate this problem - instead, the model provided by await handle.toLiteral() should
        // remove local modifications that haven't been persisted.
        if (handle.referenceMode && handle.localModified) {
            await handle._persistChanges();
        }
        const literal = await handle.toLiteral();
        if (this.referenceMode && literal.model.length > 0) {
            await Promise.all([this.ensureBackingStore(), handle.ensureBackingStore()]);
            literal.model = literal.model.map(({ id, value }) => ({ id, value: { id: value.id, storageKey: this.backingStore.storageKey } }));
            const underlying = await handle.backingStore.getMultiple(literal.model.map(({ id }) => id));
            await this.backingStore.storeMultiple(underlying, [this.storageKey]);
        }
        await this.fromLiteral(literal);
    }
    async modelForSynchronization() {
        if (this.referenceMode && this._stored !== null) {
            const value = this._stored;
            await this.ensureBackingStore();
            const result = await this.backingStore.get(value.id);
            return {
                version: this.version,
                model: [{ id: value.id, value: result }]
            };
        }
        return super.modelForSynchronization();
    }
    // Returns {version, model: [{id, value}]}
    async toLiteral() {
        const value = this._stored;
        const model = (value != null) ? [{ id: value.id, value }] : [];
        return { version: this.version, model };
    }
    fromLiteral({ version, model }) {
        const value = model.length === 0 ? null : model[0].value;
        if (this.referenceMode && value && value.rawData) {
            assert(false, `shouldn't have rawData ${JSON.stringify(value.rawData)} here`);
        }
        assert(value !== undefined);
        this._stored = value;
        this.version = version;
    }
    traceInfo() {
        return { stored: this._stored !== null };
    }
    async get() {
        if (this.referenceMode && this._stored) {
            const value = this._stored;
            await this.ensureBackingStore();
            const result = await this.backingStore.get(value.id);
            return result;
        }
        return this._stored;
    }
    async set(value, originatorId = null, barrier = null) {
        assert(value !== undefined);
        if (this.referenceMode && value) {
            // Even if this value is identical to the previously written one,
            // we can't suppress an event here because we don't actually have
            // the previous value for comparison (that's down in the backing store).
            // TODO(shans): should we fetch and compare in the case of the ids matching?
            const referredType = this.type;
            const storageKey = this.backingStore ? this.backingStore.storageKey : this.storageEngine.baseStorageKey(referredType);
            // It's important to store locally first, as the upstream consumers
            // are set up to assume all writes are processed (at least locally) synchronously.
            this._stored = { id: value.id, storageKey };
            await this.ensureBackingStore();
            // TODO(shans): mutating the storageKey here to provide unique keys is
            // a hack that can be removed once entity mutation is distinct from collection
            // updates. Once entity mutation exists, it shouldn't ever be possible to write
            // different values with the same id. 
            await this.backingStore.store(value, [this.storageKey + this.localKeyId++]);
        }
        else {
            // If there's a barrier set, then the originating storage-proxy is expecting
            // a result so we cannot suppress the event here.
            if (JSON.stringify(this._stored) === JSON.stringify(value) &&
                barrier == null) {
                return;
            }
            this._stored = value;
        }
        this.version++;
        if (this.referenceMode) {
            await this._fire('change', { data: value, version: this.version, originatorId, barrier });
        }
        else {
            await this._fire('change', { data: this._stored, version: this.version, originatorId, barrier });
        }
    }
    async clear(originatorId = null, barrier = null) {
        await this.set(null, originatorId, barrier);
    }
}
// In-memory version of the BigCollection API; primarily for testing.
class InMemoryCursor {
    constructor(version, data, pageSize) {
        this.version = version;
        this.pageSize = pageSize;
        const copy = [...data];
        copy.sort((a, b) => a.index - b.index);
        this.data = copy.map(v => v.value);
    }
    async next() {
        if (this.data.length === 0) {
            return { done: true };
        }
        return { value: this.data.splice(0, this.pageSize), done: false };
    }
    close() {
        this.data = [];
    }
}
class InMemoryBigCollection extends InMemoryStorageProvider {
    constructor(type, storageEngine, name, id, key) {
        super(type, name, id, key);
        this.items = new Map();
        this.cursors = new Map();
        this.cursorIndex = 0;
    }
    enableReferenceMode() {
        assert(false, 'referenceMode is not supported for BigCollection');
    }
    backingType() {
        return this.type.primitiveType();
    }
    async get(id) {
        const data = this.items.get(id);
        return (data !== undefined) ? data.value : null;
    }
    async store(value, keys, originatorId) {
        assert(keys != null && keys.length > 0, 'keys required');
        this.version++;
        if (!this.items.has(value.id)) {
            this.items.set(value.id, { index: null, value: null, keys: {} });
        }
        const data = this.items.get(value.id);
        data.index = this.version;
        data.value = value;
        keys.forEach(k => data.keys[k] = this.version);
    }
    async remove(id, keys, originatorId) {
        this.version++;
        this.items.delete(id);
    }
    async stream(pageSize) {
        assert(!isNaN(pageSize) && pageSize > 0);
        this.cursorIndex++;
        const cursor = new InMemoryCursor(this.version, this.items.values(), pageSize);
        this.cursors.set(this.cursorIndex, cursor);
        return this.cursorIndex;
    }
    async cursorNext(cursorId) {
        const cursor = this.cursors.get(cursorId);
        if (!cursor) {
            return { done: true };
        }
        const data = await cursor.next();
        if (data.done) {
            this.cursors.delete(cursorId);
        }
        return data;
    }
    cursorClose(cursorId) {
        const cursor = this.cursors.get(cursorId);
        if (cursor) {
            this.cursors.delete(cursorId);
            cursor.close();
        }
    }
    cursorVersion(cursorId) {
        const cursor = this.cursors.get(cursorId);
        return cursor ? cursor.version : null;
    }
    async cloneFrom(handle) {
        // TODO
    }
    // Returns {version, model: [{id, index, value, keys: []}]}
    toLiteral() {
        const model = [];
        for (const [id, { index, value, keys }] of this.items.entries()) {
            model.push({ id, index, value, keys: Object.keys(keys) });
        }
        return { version: this.version, model };
    }
    fromLiteral({ version, model }) {
        this.version = version;
        this.items.clear();
        for (const { id, index, value, keys } of model) {
            const adjustedKeys = {};
            for (const k of keys) {
                adjustedKeys[k] = index;
            }
            this.items.set(id, { index, value, keys: adjustedKeys });
        }
    }
    clearItemsForTesting() {
        this.items.clear();
    }
}
//# sourceMappingURL=in-memory-storage.js.map