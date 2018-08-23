// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert } from '../../../platform/assert-web.js';
import { Tracing } from '../../../tracelib/trace.js';
import { StorageProviderBase } from './storage-provider-base.js';
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
        assert(this.protocol === 'in-memory');
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
export class InMemoryStorage {
    constructor(arcId) {
        assert(arcId !== undefined, 'Arcs with storage must have ids');
        this.arcId = arcId;
        this._memoryMap = {};
        this._typeMap = new Map();
        this.localIDBase = 0;
        // TODO(shans): re-add this assert once we have a runtime object to put it on.
        // assert(__storageCache[this._arc.id] == undefined, `${this._arc.id} already exists in local storage cache`);
        __storageCache[this.arcId.toString()] = this;
    }
    construct(id, type, keyFragment) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    connect(id, type, keyString) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = new InMemoryKey(keyString);
            if (key.arcId !== this.arcId.toString()) {
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
            const key = new InMemoryKey(keyString);
            assert(key.arcId === this.arcId.toString());
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
            const storage = yield this.construct(type.toString(), type.collectionOf(), 'in-memory');
            this._typeMap.set(type, storage);
            return storage;
        });
    }
    parseStringAsKey(s) {
        return new InMemoryKey(s);
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
        if (type.isBigCollection) {
            return new InMemoryBigCollection(type, storageEngine, name, id, key);
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
        assert(this.version !== null);
    }
    clone() {
        const handle = new InMemoryCollection(this.type, this._storageEngine, this.name, this.id, null);
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
            version: this.version,
            model: this._model.toLiteral(),
        };
    }
    fromLiteral({ version, model }) {
        this.version = version;
        this._model = new CrdtCollectionModel(model);
    }
    toList() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type.primitiveType().isReference) {
                const items = this.toLiteral().model;
                const referredType = this.type.primitiveType().referenceReferredType;
                const refSet = new Set();
                items.forEach(item => refSet.add(item.value.storageKey));
                assert(refSet.size === 1);
                const ref = refSet.values().next().value;
                if (this._backingStore == null) {
                    this._backingStore = (yield this._storageEngine.share(referredType.toString(), referredType, ref));
                }
                const retrieveItem = (item) => __awaiter(this, void 0, void 0, function* () {
                    const ref = item.value;
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
                const ref = this._model.getValue(id);
                if (ref == null) {
                    return null;
                }
                const referredType = this.type.primitiveType().referenceReferredType;
                if (this._backingStore == null) {
                    this._backingStore = (yield this._storageEngine.share(referredType.toString(), referredType.collectionOf(), ref.storageKey));
                }
                const result = yield this._backingStore.get(ref.id);
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
            const trace = Tracing.start({ cat: 'handle', name: 'InMemoryCollection::store', args: { name: this.name } });
            if (this.type.primitiveType().isReference) {
                const referredType = this.type.primitiveType().referenceReferredType;
                if (this._backingStore == null) {
                    this._backingStore =
                        yield this._storageEngine.baseStorageFor(referredType);
                }
                this._backingStore.store(value, [this.storageKey]);
                value = { id: value.id, storageKey: this._backingStore.storageKey };
            }
            const effective = this._model.add(value.id, value, keys);
            this.version++;
            yield trace.wait(this._fire('change', { add: [{ value, keys, effective }], version: this.version, originatorId }));
            trace.end({ args: { value } });
        });
    }
    remove(id, keys = [], originatorId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const trace = Tracing.start({ cat: 'handle', name: 'InMemoryCollection::remove', args: { name: this.name } });
            if (keys.length === 0) {
                keys = this._model.getKeys(id);
            }
            const value = this._model.getValue(id);
            if (value !== null) {
                const effective = this._model.remove(id, keys);
                this.version++;
                yield trace.wait(this._fire('change', { remove: [{ value, keys, effective }], version: this.version, originatorId }));
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
        const variable = new InMemoryVariable(this.type, this._storageEngine, this.name, this.id, null);
        variable.cloneFrom(this);
        return variable;
    }
    cloneFrom(handle) {
        return __awaiter(this, void 0, void 0, function* () {
            const literal = yield handle.toLiteral();
            yield this.fromLiteral(literal);
        });
    }
    // Returns {version, model: [{id, value}]}
    toLiteral() {
        return __awaiter(this, void 0, void 0, function* () {
            const value = this._stored;
            let model = [];
            if (value != null) {
                model = [{
                        id: value.id,
                        value,
                    }];
            }
            return {
                version: this.version,
                model,
            };
        });
    }
    fromLiteral({ version, model }) {
        const value = model.length === 0 ? null : model[0].value;
        assert(value !== undefined);
        this._stored = value;
        this.version = version;
    }
    traceInfo() {
        return { stored: this._stored !== null };
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.type.isReference) {
                const value = this._stored;
                const referredType = this.type.referenceReferredType;
                // TODO: string version of ReferredTyped as ID?
                if (this._backingStore == null) {
                    this._backingStore = (yield this._storageEngine.share(referredType.toString(), referredType.collectionOf(), value.storageKey));
                }
                const result = yield this._backingStore.get(value.id);
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
                if (this._stored && this._stored.id === value.id && barrier == null) {
                    return;
                }
                const referredType = this.type.referenceReferredType;
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
                if (JSON.stringify(this._stored) === JSON.stringify(value) &&
                    barrier == null) {
                    return;
                }
                this._stored = value;
            }
            this.version++;
            yield this._fire('change', { data: this._stored, version: this.version, originatorId, barrier });
        });
    }
    clear(originatorId = null, barrier = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.set(null, originatorId, barrier);
        });
    }
}
// In-memory version of the BigCollection API; primarily for testing.
class InMemoryBigCollection extends InMemoryStorageProvider {
    constructor(type, storageEngine, name, id, key) {
        super(type, name, id, key);
        this.version = 0;
        this.items = new Map();
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.items.get(id);
            return (data !== undefined) ? data.value : null;
        });
    }
    store(value, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            assert(keys != null && keys.length > 0, 'keys required');
            this.version++;
            if (!this.items.has(value.id)) {
                this.items.set(value.id, { index: null, value: null, keys: {} });
            }
            const data = this.items.get(value.id);
            data.index = this.version;
            data.value = value;
            keys.forEach(k => data.keys[k] = this.version);
            return data;
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.version++;
            this.items.delete(id);
        });
    }
    stream(pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            assert(!isNaN(pageSize) && pageSize > 0);
            let copy = [...this.items.values()];
            copy.sort((a, b) => a.index - b.index);
            return {
                version: this.version,
                next() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (copy.length === 0) {
                            return { done: true };
                        }
                        return { value: copy.splice(0, pageSize).map(v => v.value), done: false };
                    });
                },
                close() {
                    return __awaiter(this, void 0, void 0, function* () {
                        copy = [];
                    });
                }
            };
        });
    }
}
//# sourceMappingURL=in-memory-storage.js.map