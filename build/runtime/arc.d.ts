/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { PECInnerPort } from './api-channel.js';
import { ArcDebugListenerDerived } from './debug/abstract-devtools-channel.js';
import { Id } from './id.js';
import { Loader } from './loader.js';
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
declare type ArcOptions = {
    id: string;
    context: Manifest;
    pecFactory?: (id: string) => PECInnerPort;
    slotComposer?: SlotComposer;
    loader: Loader;
    storageKey?: string;
    storageProviderFactory?: StorageProviderFactory;
    speculative?: boolean;
    innerArc?: boolean;
    stub?: boolean;
    listenerClasses?: ArcDebugListenerDerived[];
};
declare type DeserializeArcOptions = {
    serialization: string;
    pecFactory?: (id: string) => PECInnerPort;
    slotComposer?: SlotComposer;
    loader: Loader;
    fileName: string;
    context: Manifest;
    listenerClasses?: ArcDebugListenerDerived[];
};
export declare type PlanCallback = (recipe: Recipe) => void;
declare type SerializeContext = {
    handles: string;
    resources: string;
    interfaces: string;
    dataResources: Map<string, string>;
};
export declare class Arc {
    private readonly _context;
    private readonly pecFactory;
    readonly isSpeculative: boolean;
    readonly isInnerArc: boolean;
    readonly isStub: boolean;
    private _activeRecipe;
    private _recipeDeltas;
    readonly _loader: Loader;
    private dataChangeCallbacks;
    private storesById;
    private storageKeys;
    readonly storageKey: string;
    storageProviderFactory: StorageProviderFactory;
    storeTags: Map<StorageProviderBase, Set<string>>;
    private storeDescriptions;
    private instantiatePlanCallbacks;
    private waitForIdlePromise;
    private debugHandler;
    private innerArcsByParticle;
    private readonly listenerClasses;
    readonly id: Id;
    particleHandleMaps: Map<string, {
        spec: ParticleSpec;
        handles: Map<string, StorageProviderBase>;
    }>;
    pec: ParticleExecutionHost;
    constructor({ id, context, pecFactory, slotComposer, loader, storageKey, storageProviderFactory, speculative, innerArc, stub, listenerClasses }: ArcOptions);
    readonly loader: Loader;
    readonly modality: Modality;
    registerInstantiatePlanCallback(callback: PlanCallback): void;
    unregisterInstantiatePlanCallback(callback: PlanCallback): boolean;
    dispose(): void;
    _waitForIdle(): Promise<void>;
    readonly idle: Promise<void>;
    findInnerArcs(particle: Particle): Arc[];
    readonly innerArcs: Arc[];
    readonly allDescendingArcs: Arc[];
    createInnerArc(transformationParticle: Particle): Arc;
    _serializeHandle(handle: StorageProviderBase, context: SerializeContext, id: string): Promise<void>;
    _serializeHandles(): Promise<string>;
    _serializeParticles(): string;
    _serializeStorageKey(): string;
    serialize(): Promise<string>;
    persistSerialization(serialization: string): Promise<void>;
    static deserialize({ serialization, pecFactory, slotComposer, loader, fileName, context, listenerClasses }: DeserializeArcOptions): Promise<Arc>;
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
    loadedParticles(): ParticleSpec[];
    _instantiateParticle(recipeParticle: Particle): void;
    generateID(component?: string): string;
    readonly _stores: (StorageProviderBase)[];
    cloneForSpeculativeExecution(): Promise<Arc>;
    instantiate(recipe: Recipe): Promise<void>;
    _connectParticleToHandle(particle: any, name: any, targetHandle: any): void;
    createStore(type: Type, name?: any, id?: string, tags?: any, storageKey?: string): Promise<StorageProviderBase>;
    _registerStore(store: StorageProviderBase, tags?: any): void;
    _tagStore(store: StorageProviderBase, tags: any): void;
    _onDataChange(): void;
    onDataChange(callback: any, registration: any): void;
    clearDataChange(registration: any): void;
    static _typeToKey(type: Type): any;
    findStoresByType(type: Type, options?: any): StorageProviderBase[];
    findStoreById(id: any): StorageProviderBase | StorageStub;
    findStoreTags(store: StorageProviderBase): string[] | Set<string>;
    getStoreDescription(store: StorageProviderBase): string;
    getVersionByStore({ includeArc, includeContext }: {
        includeArc?: boolean;
        includeContext?: boolean;
    }): {};
    keyForId(id: string): string;
    toContextString(options: any): string;
    readonly apiChannelMappingId: string;
}
export {};
