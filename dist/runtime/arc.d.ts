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
import { Runnable } from './hot.js';
import { Manifest, StorageStub } from './manifest.js';
import { Modality } from './modality.js';
import { ParticleExecutionHost } from './particle-execution-host.js';
import { ParticleSpec } from './particle-spec.js';
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
export declare type ArcOptions = Readonly<{
    id: Id;
    context: Manifest;
    pecFactory?: PecFactory;
    slotComposer?: SlotComposer;
    loader: Loader;
    storageKey?: string;
    storageProviderFactory?: StorageProviderFactory;
    speculative?: boolean;
    innerArc?: boolean;
    stub?: boolean;
    inspectorFactory?: ArcInspectorFactory;
}>;
declare type DeserializeArcOptions = Readonly<{
    serialization: string;
    pecFactory?: PecFactory;
    slotComposer?: SlotComposer;
    loader: Loader;
    fileName: string;
    context: Manifest;
    inspectorFactory?: ArcInspectorFactory;
}>;
export declare class Arc {
    private readonly _context;
    private readonly pecFactory;
    readonly isSpeculative: boolean;
    readonly isInnerArc: boolean;
    readonly isStub: boolean;
    private _activeRecipe;
    private _recipeDeltas;
    readonly _loader: Loader;
    private readonly dataChangeCallbacks;
    private readonly storesById;
    private storageKeys;
    readonly storageKey?: string;
    storageProviderFactory: StorageProviderFactory;
    readonly storeTags: Map<StorageProviderBase, Set<string>>;
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
        stores: Map<string, StorageProviderBase>;
    }>;
    readonly pec: ParticleExecutionHost;
    constructor({ id, context, pecFactory, slotComposer, loader, storageKey, storageProviderFactory, speculative, innerArc, stub, inspectorFactory }: ArcOptions);
    readonly loader: Loader;
    readonly modality: Modality;
    dispose(): void;
    _waitForIdle(): Promise<void>;
    readonly idle: Promise<void>;
    findInnerArcs(particle: Particle): Arc[];
    readonly innerArcs: Arc[];
    readonly allDescendingArcs: Arc[];
    createInnerArc(transformationParticle: Particle): Arc;
    private _serializeHandle;
    private _serializeHandles;
    private _serializeParticles;
    private _serializeStorageKey;
    serialize(): Promise<string>;
    persistSerialization(serialization: string): Promise<void>;
    static deserialize({ serialization, pecFactory, slotComposer, loader, fileName, context, inspectorFactory }: DeserializeArcOptions): Promise<Arc>;
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
    _instantiateParticle(recipeParticle: Particle): Promise<void>;
    private _provisionSpecUrl;
    generateID(component?: string): Id;
    readonly _stores: (StorageProviderBase)[];
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
    private _doInstantiate;
    createStore(type: Type, name?: string, id?: string, tags?: string[], storageKey?: string): Promise<StorageProviderBase>;
    _registerStore(store: StorageProviderBase, tags?: string[]): void;
    _tagStore(store: StorageProviderBase, tags: Set<string>): void;
    _onDataChange(): void;
    onDataChange(callback: Runnable, registration: object): void;
    clearDataChange(registration: object): void;
    static _typeToKey(type: Type): string | InterfaceInfo | null;
    findStoresByType(type: Type, options?: {
        tags: string[];
    }): StorageProviderBase[];
    findStoreById(id: string): StorageProviderBase | StorageStub;
    findStoreTags(store: StorageProviderBase): Set<string>;
    getStoreDescription(store: StorageProviderBase): string;
    getVersionByStore({ includeArc, includeContext }: {
        includeArc?: boolean;
        includeContext?: boolean;
    }): {};
    keyForId(id: string): string;
    toContextString(): string;
    readonly apiChannelMappingId: string;
    readonly idGeneratorForTesting: IdGenerator;
}
export {};
