/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { UnifiedStore } from './storageNG/unified-store.js';
import { StorageKey } from './storageNG/storage-key.js';
import { Recipe } from './recipe/recipe.js';
import { StorageProviderFactory } from './storage/storage-provider-factory.js';
import { Manifest } from './manifest.js';
import { Id } from './id.js';
import { VolatileMemory } from './storageNG/drivers/volatile.js';
/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export interface ArcInterface {
    activeRecipe: Recipe;
    storageProviderFactory: StorageProviderFactory;
    id: Id;
    storeTags: Map<UnifiedStore, Set<string>>;
    context: Manifest;
    _stores: UnifiedStore[];
    storageKey?: string | StorageKey;
    volatileMemory: VolatileMemory;
}
export declare class ArcSerializer {
    private arc;
    private handles;
    private resources;
    private interfaces;
    private dataResources;
    private memoryResourceNames;
    constructor(arc: ArcInterface);
    serialize(): Promise<string>;
    private serializeVolatileMemory;
    private _serializeStore;
    private serializeHandles;
    private serializeParticles;
    private serializeStorageKey;
}
