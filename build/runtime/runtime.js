/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
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
    constructor(loader, composerClass, context) {
        this.cacheService = new RuntimeCacheService();
        this.loader = loader;
        this.composerClass = composerClass;
        this.context = context || new Manifest({ id: 'manifest:default' });
        this.ramDiskMemory = new VolatileMemory();
        runtime = this;
        // user information. One persona per runtime for now.
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
        return new Arc({ id, storageKey, loader: this.loader, slotComposer: new this.composerClass(), context: this.context, ...options });
    }
    // Stuff the shell needs
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