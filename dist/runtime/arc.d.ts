/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ArcInspector, ArcInspectorFactory } from './arc-inspector.js';
import { Id, IdGenerator } from './id.js';
import { Loader } from './loader.js';
import { Runnable, Consumer } from './hot.js';
import { Manifest } from './manifest.js';
import { MessagePort } from './message-channel.js';
import { Modality } from './modality.js';
import { ParticleExecutionHost } from './particle-execution-host.js';
import { ParticleSpec } from './particle-spec.js';
import { StorageStub } from './storage-stub.js';
import { Handle } from './recipe/handle.js';
import { Particle } from './recipe/particle.js';
import { Recipe } from './recipe/recipe.js';
import { Slot } from './recipe/slot.js';
import { SlotComposer } from './slot-composer.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
import { StorageProviderFactory } from './storage/storage-provider-factory.js';
import { Type } from './type.js';
import { PecFactory } from './particle-execution-context.js';
import { InterfaceInfo } from './interface-info.js';
import { VolatileMemory } from './storageNG/drivers/volatile.js';
import { StorageKey } from './storageNG/storage-key.js';
export declare type ArcOptions = Readonly<{
    id: Id;
    context: Manifest;
    pecFactories?: PecFactory[];
    slotComposer?: SlotComposer;
    loader: Loader;
    storageKey?: string | StorageKey;
    storageProviderFactory?: StorageProviderFactory;
    speculative?: boolean;
    innerArc?: boolean;
    stub?: boolean;
    inspectorFactory?: ArcInspectorFactory;
    ports?: MessagePort[];
}>;
declare type DeserializeArcOptions = Readonly<{
    serialization: string;
    pecFactories?: PecFactory[];
    slotComposer?: SlotComposer;
    loader: Loader;
    fileName: string;
    context: Manifest;
    inspectorFactory?: ArcInspectorFactory;
}>;
/**
 * This is a temporary interface used to unify old-style stores (storage/StorageProviderBase) and new-style stores (storageNG/Store).
 * We should be able to remove this once we've switched across to the NG stack.
 *
 * Note that for old-style stores, StorageStubs are used *sometimes* to represent storage which isn't activated. For new-style stores,
 * Store itself represents an inactive store, and needs to be activated using activate(). This will present some integration
 * challenges :)
 *
 * Note also that old-style stores use strings for Storage Keys, while NG storage uses storageNG/StorageKey subclasses. This provides
 * a simple test for determining whether a store is old or new.
 */
export interface UnifiedStore {
    id: string;
    name: string;
    source: string;
    type: Type;
    storageKey: string | StorageKey;
    version?: number;
    referenceMode: boolean;
    _compareTo(other: UnifiedStore): number;
    toString(tags: string[]): string;
    toLiteral: () => Promise<any>;
    cloneFrom(store: UnifiedStore): void;
    modelForSynchronization(): {};
    on(type: string, fn: Consumer<{}>, target: {}): void;
    description: string;
}
export declare class Arc {
    private readonly _context;
    private readonly pecFactories;
    readonly isSpeculative: boolean;
    readonly isInnerArc: boolean;
    readonly isStub: boolean;
    private _activeRecipe;
    private _recipeDeltas;
    readonly _loader: Loader;
    private readonly dataChangeCallbacks;
    private readonly storesById;
    private storageKeys;
    readonly storageKey?: string | StorageKey;
    storageProviderFactory: StorageProviderFactory;
    readonly storeTags: Map<UnifiedStore, Set<string>>;
    private readonly storeDescriptions;
    private waitForIdlePromise;
    private readonly inspectorFactory?;
    readonly inspector?: ArcInspector;
    private readonly innerArcsByParticle;
    private readonly instantiateMutex;
    readonly id: Id;
    private readonly idGenerator;
    loadedParticleInfo: Map<string, {
        spec: ParticleSpec;
        stores: Map<string, UnifiedStore>;
    }>;
    readonly pec: ParticleExecutionHost;
    readonly volatileMemory: VolatileMemory;
    private readonly volatileStorageDriverProvider;
    constructor({ id, context, pecFactories, slotComposer, loader, storageKey, storageProviderFactory, speculative, innerArc, stub, inspectorFactory }: ArcOptions);
    readonly loader: Loader;
    readonly modality: Modality;
    dispose(): void;
    _waitForIdle(): Promise<void>;
    readonly idle: Promise<void>;
    findInnerArcs(particle: Particle): Arc[];
    readonly innerArcs: Arc[];
    readonly allDescendingArcs: Arc[];
    createInnerArc(transformationParticle: Particle): Arc;
    private _serializeStore;
    private _serializeHandles;
    private _serializeParticles;
    private _serializeStorageKey;
    serialize(): Promise<string>;
    persistSerialization(serialization: string): Promise<void>;
    static deserialize({ serialization, pecFactories, slotComposer, loader, fileName, context, inspectorFactory }: DeserializeArcOptions): Promise<Arc>;
    readonly context: Manifest;
    readonly activeRecipe: Recipe;
    readonly allRecipes: Recipe[];
    readonly recipes: Recipe[];
    readonly recipeDeltas: {
        handles: Handle[];
        particles: Particle[];
        slots: Slot[];
        patterns: string[];
    }[];
    loadedParticleSpecs(): ParticleSpec[];
    reinstantiateParticle(recipeParticle: Particle): Promise<void>;
    _instantiateParticle(recipeParticle: Particle): Promise<void>;
    _getParticleInstantiationInfo(recipeParticle: Particle): Promise<{
        spec: ParticleSpec;
        stores: Map<string, UnifiedStore>;
    }>;
    private _provisionSpecUrl;
    generateID(component?: string): Id;
    readonly _stores: UnifiedStore[];
    cloneForSpeculativeExecution(): Promise<Arc>;
    /**
     * Instantiates the given recipe in the Arc.
     *
     * Executes the following steps:
     *
     * - Merges the recipe into the Active Recipe
     * - Populates missing slots.
     * - Processes the Handles and creates stores for them.
     * - Instantiates the new Particles
     * - Passes these particles for initialization in the PEC
     *
     * Waits for completion of an existing Instantiate before returning.
     */
    instantiate(recipe: Recipe): Promise<void>;
    mergeIntoActiveRecipe(recipe: Recipe): Promise<{
        handles: Handle[];
        particles: Particle[];
        slots: Slot[];
    }>;
    private _doInstantiate;
    createStore(type: Type, name?: string, id?: string, tags?: string[], storageKey?: string | StorageKey): Promise<UnifiedStore>;
    _registerStore(store: UnifiedStore, tags?: string[]): void;
    _tagStore(store: UnifiedStore, tags: Set<string>): void;
    _onDataChange(): void;
    onDataChange(callback: Runnable, registration: object): void;
    clearDataChange(registration: object): void;
    static _typeToKey(type: Type): string | InterfaceInfo | null;
    findStoresByType(type: Type, options?: {
        tags: string[];
    }): UnifiedStore[];
    findStoreById(id: string): UnifiedStore | StorageStub;
    findStoreTags(store: UnifiedStore | StorageStub): Set<string>;
    getStoreDescription(store: StorageProviderBase): string;
    getVersionByStore({ includeArc, includeContext }: {
        includeArc?: boolean;
        includeContext?: boolean;
    }): {};
    keyForId(id: string): string | StorageKey;
    toContextString(): string;
    readonly apiChannelMappingId: string;
    readonly idGeneratorForTesting: IdGenerator;
}
export {};
