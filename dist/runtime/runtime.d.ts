/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Manifest } from './manifest.js';
import { Arc } from './arc.js';
import { UnifiedStore } from './storageNG/unified-store.js';
import { RuntimeCacheService } from './runtime-cache.js';
import { ArcId } from './id.js';
import { PecFactory } from './particle-execution-context.js';
import { SlotComposer } from './slot-composer.js';
import { Loader } from './loader.js';
import { StorageProviderFactory } from './storage/storage-provider-factory.js';
import { ArcInspectorFactory } from './arc-inspector.js';
import { VolatileMemory } from './storageNG/drivers/volatile.js';
import { StorageKey } from './storageNG/storage-key.js';
export declare type RuntimeArcOptions = Readonly<{
    pecFactories?: PecFactory[];
    storageProviderFactory?: StorageProviderFactory;
    speculative?: boolean;
    innerArc?: boolean;
    stub?: boolean;
    listenerClasses?: ArcInspectorFactory[];
    inspectorFactory?: ArcInspectorFactory;
}>;
export declare class Runtime {
    private cacheService;
    private loader;
    private composerClass;
    readonly context: Manifest;
    private readonly ramDiskMemory;
    readonly arcById: Map<string, Arc>;
    static getRuntime(): Runtime;
    static clearRuntimeForTesting(): void;
    static newForNodeTesting(context?: Manifest): Runtime;
    constructor(loader?: Loader, composerClass?: new () => SlotComposer, context?: Manifest);
    getCacheService(): RuntimeCacheService;
    getRamDiskMemory(): VolatileMemory;
    destroy(): void;
    newArc(name: string, storageKeyPrefix: string | ((arcId: ArcId) => StorageKey), options?: RuntimeArcOptions): Arc;
    /**
     * Given an arc name, return either:
     * (1) the already running arc
     * (2) a deserialized arc (TODO: needs implementation)
     * (3) a newly created arc
     */
    runArc(name: string, storageKeyPrefix: string, options?: RuntimeArcOptions): Arc;
    stop(name: string): void;
    findArcByParticleId(particleId: string): Arc;
    registerStore(store: UnifiedStore, tags: string[]): void;
    unregisterStore(storeId: string, tags: string[]): void;
    /**
     * Given an arc, returns it's description as a string.
     */
    static getArcDescription(arc: Arc): Promise<string>;
    /**
     * Parse a textual manifest and return a Manifest object. See the Manifest
     * class for the options accepted.
     */
    static parseManifest(content: string, options?: any): Promise<Manifest>;
    /**
     * Load and parse a manifest from a resource (not striclty a file) and return
     * a Manifest object. The loader determines the semantics of the fileName. See
     * the Manifest class for details.
     */
    static loadManifest(fileName: any, loader: any, options: any): Promise<Manifest>;
}
