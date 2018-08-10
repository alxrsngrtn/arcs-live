// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert } from '../../platform/assert-web.js';
import { Tracing } from '../../tracelib/trace.js';
import { StorageProviderBase } from './storage-provider-base.js';
import { KeyBase } from './key-base.js';
import { CrdtCollectionModel } from './crdt-collection-model.js';
export function resetInMemoryStorageForTesting() {
    for (let key in __storageCache) {
        __storageCache[key]._memoryMap = {};
    }
}
class InMemoryKey extends KeyBase {
    constructor(key) {
        super();
        let parts = key.split('://');
        this.protocol = parts[0];
        assert(this.protocol == 'in-memory');
        parts = parts[1] ? parts.slice(1).join('://').split('^^') : [];
        this.arcId = parts[0];
        this.location = parts[1];
        assert(this.toString() == key);
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
let __storageCache = {};
export class InMemoryStorage {
    constructor(arcId) {
        assert(arcId !== undefined, 'Arcs with storage must have ids');
        this._arcId = arcId;
        this._memoryMap = {};
        this._typeMap = new Map();
        this.localIDBase = 0;
        // TODO(shans): re-add this assert once we have a runtime object to put it on.
        // assert(__storageCache[this._arc.id] == undefined, `${this._arc.id} already exists in local storage cache`);
        __storageCache[this._arcId] = this;
    }
    construct(id, type, keyFragment) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = new InMemoryKey(keyFragment);
            if (key.arcId == undefined) {
                key.arcId = this._arcId;
            }
            if (key.location == undefined) {
                key.location = 'in-memory-' + this.localIDBase++;
            }
            // TODO(shanestephens): should pass in factory, not 'this' here.
            let provider = InMemoryStorageProvider.newProvider(type, this, undefined, id, key.toString());
            if (this._memoryMap[key.toString()] !== undefined) {
                return null;
            }
            this._memoryMap[key.toString()] = provider;
            return provider;
        });
    }
    connect(id, type, keyString) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = new InMemoryKey(keyString);
            if (key.arcId !== this._arcId.toString()) {
                if (__storageCache[key.arcId] == undefined) {
                    return null;
                }
                return __storageCache[key.arcId].connect(id, type, keyString);
            }
            if (this._memoryMap[keyString] == undefined) {
                return null;
            }
            // TODO assert types match?
            return this._memoryMap[keyString];
        });
    }
    share(id, type, keyString) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = new InMemoryKey(keyString);
            assert(key.arcId == this._arcId.toString());
            if (this._memoryMap[keyString] == undefined) {
                return this.construct(id, type, keyString);
            }
            return this._memoryMap[keyString];
        });
    }
    baseStorageFor(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._typeMap.has(type)) {
                return this._typeMap.get(type);
            }
            let storage = yield this.construct(type.toString(), type.collectionOf(), 'in-memory');
            this._typeMap.set(type, storage);
            return storage;
        });
    }
    parseStringAsKey(string) {
        return new InMemoryKey(string);
    }
    shutdown() {
        // No-op
    }
}
class InMemoryStorageProvider extends StorageProviderBase {
    static newProvider(type, storageEngine, name, id, key) {
        if (type.isCollection) {
            return new InMemoryCollection(type, storageEngine, name, id, key);
        }
        return new InMemoryVariable(type, storageEngine, name, id, key);
    }
}
class InMemoryCollection extends InMemoryStorageProvider {
    constructor(type, storageEngine, name, id, key) {
        super(type, name, id, key);
        this._model = new CrdtCollectionModel();
        this._storageEngine = storageEngine;
        this._backingStore = null;
        assert(this._version !== null);
    }
    clone() {
        let handle = new InMemoryCollection(this._type, this._storageEngine, this.name, this.id, null);
        handle.cloneFrom(this);
        return handle;
    }
    cloneFrom(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            this.fromLiteral(yield handle.toLiteral());
        });
    }
    // Returns {version, model: [{id, value, keys: []}]}
    toLiteral() {
        return {
            version: this._version,
            model: this._model.toLiteral(),
        };
    }
    fromLiteral({ version, model }) {
        this._version = version;
        this._model = new CrdtCollectionModel(model);
    }
    toList() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type.primitiveType().isReference) {
                let items = this.toLiteral().model;
                let referredType = this.type.primitiveType().referenceReferredType;
                let refSet = new Set();
                items.forEach(item => refSet.add(item.value.storageKey));
                assert(refSet.size == 1);
                let ref = refSet.values().next().value;
                if (this._backingStore == null) {
                    this._backingStore = (yield this._storageEngine.share(referredType.toString(), referredType, ref));
                }
                let retrieveItem = (item) => __awaiter(this, void 0, void 0, function* () {
                    let ref = item.value;
                    return this._backingStore.get(ref.id);
                });
                return yield Promise.all(items.map(retrieveItem));
            }
            return this.toLiteral().model.map(item => item.value);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type.primitiveType().isReference) {
                let ref = this._model.getValue(id);
                if (ref == null) {
                    return null;
                }
                let referredType = this.type.primitiveType().referenceReferredType;
                if (this._backingStore == null) {
                    this._backingStore = (yield this._storageEngine.share(referredType.toString(), referredType.collectionOf(), ref.storageKey));
                }
                let result = yield this._backingStore.get(ref.id);
                return result;
            }
            return this._model.getValue(id);
        });
    }
    traceInfo() {
        return { items: this._model.size };
    }
    store(value, keys, originatorId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            assert(keys != null && keys.length > 0, 'keys required');
            let trace = Tracing.start({ cat: 'handle', name: 'InMemoryCollection::store', args: { name: this.name } });
            if (this.type.primitiveType().isReference) {
                let referredType = this.type.primitiveType().referenceReferredType;
                if (this._backingStore == null) {
                    this._backingStore =
                        yield this._storageEngine.baseStorageFor(referredType);
                }
                this._backingStore.store(value, [this.storageKey]);
                value = { id: value.id, storageKey: this._backingStore.storageKey };
            }
            let effective = this._model.add(value.id, value, keys);
            this._version++;
            yield trace.wait(this._fire('change', { add: [{ value, keys, effective }], version: this._version, originatorId }));
            trace.end({ args: { value } });
        });
    }
    remove(id, keys = [], originatorId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let trace = Tracing.start({ cat: 'handle', name: 'InMemoryCollection::remove', args: { name: this.name } });
            if (keys.length == 0) {
                keys = this._model.getKeys(id);
            }
            let value = this._model.getValue(id);
            if (value !== null) {
                let effective = this._model.remove(id, keys);
                this._version++;
                yield trace.wait(this._fire('change', { remove: [{ value, keys, effective }], version: this._version, originatorId }));
            }
            trace.end({ args: { entity: value } });
        });
    }
    clearItemsForTesting() {
        this._model = new CrdtCollectionModel();
    }
}
class InMemoryVariable extends InMemoryStorageProvider {
    constructor(type, storageEngine, name, id, key) {
        super(type, name, id, key);
        this._storageEngine = storageEngine;
        this._stored = null;
        this._backingStore = null;
    }
    clone() {
        let variable = new InMemoryVariable(this._type, this._storageEngine, this.name, this.id, null);
        variable.cloneFrom(this);
        return variable;
    }
    cloneFrom(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            let literal = yield handle.toLiteral();
            yield this.fromLiteral(literal);
        });
    }
    // Returns {version, model: [{id, value}]}
    toLiteral() {
        return __awaiter(this, void 0, void 0, function* () {
            let value = this._stored;
            let model = [];
            if (value != null) {
                model = [{
                        id: value.id,
                        value,
                    }];
            }
            return {
                version: this._version,
                model,
            };
        });
    }
    fromLiteral({ version, model }) {
        let value = model.length == 0 ? null : model[0].value;
        assert(value !== undefined);
        this._stored = value;
        this._version = version;
    }
    traceInfo() {
        return { stored: this._stored !== null };
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type.isReference) {
                let value = this._stored;
                let referredType = this.type.referenceReferredType;
                // TODO: string version of ReferredTyped as ID?
                if (this._backingStore == null) {
                    this._backingStore = (yield this._storageEngine.share(referredType.toString(), referredType.collectionOf(), value.storageKey));
                }
                let result = yield this._backingStore.get(value.id);
                return result;
            }
            return this._stored;
        });
    }
    set(value, originatorId = null, barrier = null) {
        return __awaiter(this, void 0, void 0, function* () {
            assert(value !== undefined);
            if (this.type.isReference) {
                // If there's a barrier set, then the originating storage-proxy is expecting
                // a result so we cannot suppress the event here.
                // TODO(shans): Make sure this is tested.
                if (this._stored && this._stored.id == value.id && barrier == null) {
                    return;
                }
                let referredType = this.type.referenceReferredType;
                if (this._backingStore == null) {
                    this._backingStore =
                        yield this._storageEngine.baseStorageFor(referredType);
                }
                this._backingStore.store(value, [this.storageKey]);
                this._stored = { id: value.id, storageKey: this._backingStore.storageKey };
            }
            else {
                // If there's a barrier set, then the originating storage-proxy is expecting
                // a result so we cannot suppress the event here.
                if (JSON.stringify(this._stored) == JSON.stringify(value) &&
                    barrier == null) {
                    return;
                }
                this._stored = value;
            }
            this._version++;
            yield this._fire('change', { data: this._stored, version: this._version, originatorId, barrier });
        });
    }
    clear(originatorId = null, barrier = null) {
        return __awaiter(this, void 0, void 0, function* () {
            this.set(null, originatorId, barrier);
        });
    }
}
