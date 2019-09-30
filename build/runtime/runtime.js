/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { Description } from './description.js';
import { Manifest } from './manifest.js';
import { Arc } from './arc.js';
import { RuntimeCacheService } from './runtime-cache.js';
import { IdGenerator } from './id.js';
import { Loader } from './loader.js';
import { FakeSlotComposer } from './testing/fake-slot-composer.js';
import { VolatileMemory } from './storageNG/drivers/volatile.js';
// To start with, this class will simply hide the runtime classes that are
// currently imported by ArcsLib.js. Once that refactoring is done, we can
// think about what the api should actually look like.
export class Runtime {
    constructor(loader, composerClass, context) {
        this.arcById = new Map();
        this.cacheService = new RuntimeCacheService();
        this.loader = loader;
        this.composerClass = composerClass;
        this.context = context || new Manifest({ id: 'manifest:default' });
        this.ramDiskMemory = new VolatileMemory();
        runtime = this;
        // user information. One persona per runtime for now.
    }
    static getRuntime() {
        if (runtime == null) {
            runtime = new Runtime();
        }
        return runtime;
    }
    static clearRuntimeForTesting() {
        if (runtime !== null) {
            runtime.destroy();
            runtime = null;
        }
    }
    static newForNodeTesting(context) {
        return new Runtime(new Loader(), FakeSlotComposer, context);
    }
    getCacheService() {
        return this.cacheService;
    }
    getRamDiskMemory() {
        return this.ramDiskMemory;
    }
    destroy() {
    }
    newArc(name, storageKeyPrefix, options) {
        const id = IdGenerator.newSession().newArcId(name);
        const storageKey = storageKeyPrefix + id.toString();
        const slotComposer = this.composerClass ? new this.composerClass() : null;
        return new Arc({ id, storageKey, loader: this.loader, slotComposer, context: this.context, ...options });
    }
    // Stuff the shell needs
    /**
     * Given an arc name, return either:
     * (1) the already running arc
     * (2) a deserialized arc (TODO: needs implementation)
     * (3) a newly created arc
     */
    runArc(name, storageKeyPrefix, options) {
        if (!this.arcById.has(name)) {
            // TODO: Support deserializing serialized arcs.
            this.arcById.set(name, this.newArc(name, storageKeyPrefix, options));
        }
        return this.arcById.get(name);
    }
    stop(name) {
        assert(this.arcById.has(name), `Cannot stop nonexistent arc ${name}`);
        this.arcById.get(name).dispose();
        this.arcById.delete(name);
    }
    // Temporary method to allow sharing stores with other Arcs (until Context
    // is properly implemented)
    registerStore(store, tags) {
        // #shared tag indicates that a store should be made available to all arcs.
        if (!this.context.findStoreById(store.id) && tags.includes('shared')) {
            // tslint:disable-next-line: no-any
            this.context['_addStore'](store, tags);
        }
    }
    // Temporary method to allow sharing stores with other Arcs.
    unregisterStore(storeId, tags) {
        // #shared tag indicates that a store was made available to all arcs.
        if (!tags.includes('shared')) {
            return;
        }
        const index = this.context.stores.findIndex(store => store.id === storeId);
        if (index >= 0) {
            const store = this.context.stores[index];
            this.context.storeTags.delete(store);
            this.context.stores.splice(index, 1);
        }
    }
    /**
     * Given an arc, returns it's description as a string.
     */
    static async getArcDescription(arc) {
        // Verify that it's one of my arcs, and make this non-static, once I have
        // Runtime objects in the calling code.
        return (await Description.create(arc)).getArcDescription();
    }
    /**
     * Parse a textual manifest and return a Manifest object. See the Manifest
     * class for the options accepted.
     */
    static async parseManifest(content, options) {
        return Manifest.parse(content, options);
    }
    /**
     * Load and parse a manifest from a resource (not striclty a file) and return
     * a Manifest object. The loader determines the semantics of the fileName. See
     * the Manifest class for details.
     */
    static async loadManifest(fileName, loader, options) {
        return Manifest.load(fileName, loader, options);
    }
}
let runtime = null;
//# sourceMappingURL=runtime.js.map