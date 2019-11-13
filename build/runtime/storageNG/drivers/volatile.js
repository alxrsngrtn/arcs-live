/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Driver, Exists, DriverFactory } from './driver-factory.js';
import { StorageKey } from '../storage-key.js';
import { ArcId } from '../../id.js';
import { assert } from '../../../platform/assert-web.js';
export class VolatileStorageKey extends StorageKey {
    constructor(arcId, unique, path = '') {
        super('volatile');
        this.arcId = arcId;
        this.unique = unique;
        this.path = path;
    }
    toString() {
        return `${this.protocol}://${this.arcId}/${this.unique}@${this.path}`;
    }
    childWithComponent(component) {
        return new VolatileStorageKey(this.arcId, this.unique, `${this.path}/${component}`);
    }
    // Note that subKeys lose path information.
    subKeyWithComponent(component) {
        return new VolatileStorageKey(this.arcId, `${this.unique}/${component}`);
    }
    static fromString(key) {
        const match = key.match(/^volatile:\/\/([^/]+)\/([^@]*)@(.*)$/);
        if (!match) {
            throw new Error(`Not a valid VolatileStorageKey: ${key}.`);
        }
        const [_, arcId, unique, path] = match;
        return new VolatileStorageKey(ArcId.fromString(arcId), unique, path);
    }
}
export class VolatileMemory {
    constructor() {
        this.entries = new Map();
        // Tokens can't just be an incrementing number as VolatileMemory is the basis for RamDiskMemory too;
        // if we were to use numbers here then a RamDisk could be reaped, restarted, and end up with the
        // same token as a previous iteration.
        // When we want to support RamDisk fast-forwarding (e.g. by keeping a rotating window of recent
        // operations) then we'll need tokens to be a combination of a per-instance random value and a
        // per-operation updating number. For now, just a random value that is updated with each write
        // is sufficient.
        this.token = Math.random() + '';
    }
    deserialize(data, unique) {
        assert(!this.entries.has(unique));
        const entry = { root: null, locations: {} };
        entry.root = { data: data.root, version: 0, drivers: [] };
        for (const [key, value] of Object.entries(data.locations)) {
            entry.locations[key] = { data: value, version: 0, drivers: [] };
        }
        this.entries.set(unique, entry);
    }
}
let id = 0;
export class VolatileDriver extends Driver {
    constructor(storageKey, exists, memory) {
        super(storageKey, exists);
        this.pendingVersion = 0;
        this.pendingModel = null;
        this.id = id++;
        this.memory = memory;
        this.path = null;
        if (storageKey instanceof VolatileStorageKey && storageKey.path !== '') {
            this.path = storageKey.path;
        }
        switch (exists) {
            case Exists.ShouldCreate:
                if (this.memory.entries.has(storageKey.unique)) {
                    throw new Error(`requested creation of memory location ${storageKey} can't proceed as location already exists`);
                }
                this.data = { root: null, locations: {} };
                this.memory.entries.set(storageKey.unique, this.data);
                break;
            case Exists.ShouldExist:
                if (!this.memory.entries.has(storageKey.unique)) {
                    throw new Error(`requested connection to memory location ${storageKey} can't proceed as location doesn't exist`);
                }
            /* falls through */
            case Exists.MayExist:
                {
                    const data = this.memory.entries.get(storageKey.unique);
                    if (data) {
                        this.data = data;
                        this.pendingModel = this.localData();
                        this.pendingVersion = this.localVersion();
                    }
                    else {
                        this.data = { locations: {}, root: null };
                        this.memory.entries.set(storageKey.unique, this.data);
                        this.memory.token = Math.random() + '';
                    }
                    break;
                }
            default:
                throw new Error(`unknown Exists code ${exists}`);
        }
        this.pushLocalDriver(this);
    }
    getOrCreateEntry() {
        if (this.path) {
            if (!this.data.locations[this.path]) {
                this.data.locations[this.path] = { data: null, version: 0, drivers: [] };
            }
            return this.data.locations[this.path];
        }
        if (!this.data.root) {
            this.data.root = { data: null, version: 0, drivers: [] };
        }
        return this.data.root;
    }
    localData() {
        return this.getOrCreateEntry().data;
    }
    localVersion() {
        return this.getOrCreateEntry().version;
    }
    setLocalData(data) {
        this.getOrCreateEntry().data = data;
    }
    incrementLocalVersion() {
        this.getOrCreateEntry().version += 1;
    }
    pushLocalDriver(driver) {
        this.getOrCreateEntry().drivers.push(driver);
    }
    registerReceiver(receiver, token) {
        this.receiver = receiver;
        if (this.pendingModel && token !== this.memory.token) {
            receiver(this.pendingModel, this.pendingVersion);
        }
        this.pendingModel = null;
    }
    getToken() { return this.memory.token; }
    async send(model, version) {
        // This needs to contain an "empty" await, otherwise there's
        // a synchronous send / onReceive loop that can be established
        // between multiple Stores/Drivers writing to the same location.
        await 0;
        if (this.localVersion() !== version - 1) {
            return false;
        }
        this.setLocalData(model);
        this.incrementLocalVersion();
        this.getOrCreateEntry().drivers.forEach(driver => {
            if (driver === this) {
                return;
            }
            if (driver.receiver) {
                driver.receiver(model, this.localVersion());
            }
        });
        return true;
    }
    async write(key, value) {
        throw new Error('Method not implemented.');
    }
    async read(key) {
        throw new Error('Method not implemented.');
    }
}
/**
 * Provides Volatile storage drivers. Volatile storage is local to an individual
 * running Arc. It lives for as long as that Arc instance, and then gets
 * deleted when the Arc is stopped.
 */
export class VolatileStorageDriverProvider {
    constructor(arc) {
        this.arc = arc;
    }
    willSupport(storageKey) {
        return storageKey.protocol === 'volatile' && storageKey.arcId.equal(this.arc.id);
    }
    async driver(storageKey, exists) {
        if (!this.willSupport(storageKey)) {
            throw new Error(`This provider does not support storageKey ${storageKey.toString()}`);
        }
        return new VolatileDriver(storageKey, exists, this.arc.volatileMemory);
    }
    static register(arc) {
        DriverFactory.register(new VolatileStorageDriverProvider(arc));
    }
}
//# sourceMappingURL=volatile.js.map