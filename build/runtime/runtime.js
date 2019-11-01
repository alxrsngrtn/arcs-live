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
import { SlotComposer } from './slot-composer.js';
import { FakeSlotComposer } from './testing/fake-slot-composer.js';
import { VolatileMemory } from './storageNG/drivers/volatile.js';
import { Loader } from '../platform/loader.js';
import { pecIndustry } from '../platform/pec-industry.js';
let runtime = null;
// To start with, this class will simply hide the runtime classes that are
// currently imported by ArcsLib.js. Once that refactoring is done, we can
// think about what the api should actually look like.
export class Runtime {
    constructor(loader, composerClass, context, pecFactory) {
        this.arcById = new Map();
        this.cacheService = new RuntimeCacheService();
        this.loader = loader;
        this.pecFactory = pecFactory;
        this.composerClass = composerClass;
        this.context = context || new Manifest({ id: 'manifest:default' });
        this.ramDiskMemory = new VolatileMemory();
        runtime = this;
        // user information. One persona per runtime for now.
    }
    static getRuntime() {
        if (!runtime) {
            runtime = new Runtime();
        }
        return runtime;
    }
    static clearRuntimeForTesting() {
        if (runtime) {
            runtime.destroy();
            runtime = null;
        }
    }
    static newForNodeTesting(context) {
        return new Runtime(new Loader(), FakeSlotComposer, context);
    }
    /**
     * `Runtime.getRuntime()` returns the most recently constructed Runtime object (or creates one),
     * so calling `init` establishes a default environment (capturing the return value is optional).
     * Systems can use `Runtime.getRuntime()` to access this environment instead of plumbing `runtime`
     * arguments through numerous functions.
     * Some static methods on this class automatically use the default environment.
     */
    static init(root, urls) {
        const map = { ...Runtime.mapFromRootPath(root), ...urls };
        const loader = new Loader(map);
        const pecFactory = pecIndustry(loader);
        return new Runtime(loader, SlotComposer, null, pecFactory);
    }
    static mapFromRootPath(root) {
        // TODO(sjmiles): this is a commonly-used map, but it's not generic enough to live here.
        // Shells that use this default should be provide it to `init` themselves.
        return {
            // important: path to `worker.js`
            'https://$build/': `${root}/shells/lib/build/`,
            // these are optional (?)
            'https://$arcs/': `${root}/`,
            'https://$particles/': {
                root,
                path: '/particles/',
                buildDir: '/bazel-bin',
                buildOutputRegex: /\.wasm$/.source
            }
        };
    }
    getCacheService() {
        return this.cacheService;
    }
    getRamDiskMemory() {
        return this.ramDiskMemory;
    }
    destroy() {
    }
    // TODO(shans): Clean up once old storage is removed.
    // Note that this incorrectly assumes every storage key can be of the form `prefix` + `arcId`.
    // Should ids be provided to the Arc constructor, or should they be constructed by the Arc?
    // How best to provide default storage to an arc given whatever we decide?
    newArc(name, storageKeyPrefix, options) {
        const { loader, context } = this;
        const id = IdGenerator.newSession().newArcId(name);
        const slotComposer = this.composerClass ? new this.composerClass() : null;
        const storageKey = (typeof storageKeyPrefix === 'string')
            ? `${storageKeyPrefix}${id.toString()}` : storageKeyPrefix(id);
        return new Arc({ id, storageKey, loader, slotComposer, context, ...options });
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
    findArcByParticleId(particleId) {
        return [...this.arcById.values()].find(arc => !!arc.activeRecipe.findParticle(particleId));
    }
    // TODO: This is a temporary method to allow sharing stores with other Arcs.
    registerStore(store, tags) {
        if (!this.context.findStoreById(store.id) && tags.includes('shared')) {
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
     * Load and parse a manifest from a resource (not strictly a file) and return
     * a Manifest object. The loader determines the semantics of the fileName. See
     * the Manifest class for details.
     */
    static async loadManifest(fileName, loader, options) {
        return Manifest.load(fileName, loader, options);
    }
    // stuff the strategizer needs
    // stuff from shells/lib/utils
    // TODO(sjmiles): there is redundancy vs `parse/loadManifest` above, but this is
    // temporary until we polish the Utils integration.
    async parse(content, options) {
        const { loader } = this;
        // TODO(sjmiles): this method of generating a manifest id is ad-hoc,
        // maybe should be using one of the id generators, or even better
        // we could eliminate it if the Manifest object takes care of this.
        const id = `in-memory-${Math.floor((Math.random() + 1) * 1e6)}.manifest`;
        // TODO(sjmiles): this is a virtual manifest, the fileName is invented
        const localOptions = { id, fileName: `./${id}`, loader };
        return Manifest.parse(content, { ...localOptions, ...options });
    }
    static async parse(content, options) {
        return this.getRuntime().parse(content, options);
    }
}
//# sourceMappingURL=runtime.js.map