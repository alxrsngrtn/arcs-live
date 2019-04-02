/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Id } from './id.js';
import { InterfaceInfo } from './interface-info.js';
import { ManifestMeta } from './manifest-meta.js';
import { ParticleSpec } from './particle-spec.js';
import { Recipe } from './recipe/recipe.js';
import { Schema } from './schema.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
import { StorageProviderFactory } from './storage/storage-provider-factory.js';
import { EntityType, InterfaceType, Type } from './type.js';
export declare class StorageStub {
    type: Type;
    id: string;
    name: string;
    storageKey: string;
    storageProviderFactory: StorageProviderFactory;
    referenceMode: boolean;
    originalId: string;
    constructor(type: Type, id: string, name: string, storageKey: string, storageProviderFactory: StorageProviderFactory, originalId: string);
    readonly version: any;
    readonly description: string;
    inflate(): Promise<StorageProviderBase>;
    toLiteral(): any;
    toString(handleTags: string[]): string;
    _compareTo(other: StorageProviderBase): number;
}
declare type ManifestFinder<a> = (manifest: Manifest) => a;
declare type ManifestFinderGenerator<a> = ((manifest: Manifest) => IterableIterator<a>) | ((manifest: Manifest) => a[]);
export declare class Manifest {
    private _recipes;
    private _imports;
    private _particles;
    private _schemas;
    private _stores;
    private _interfaces;
    storeTags: Map<StorageProviderBase | StorageStub, string[]>;
    private _fileName;
    private readonly _id;
    private _storageProviderFactory;
    private _meta;
    private _resources;
    private storeManifestUrls;
    private warnings;
    constructor({ id }: {
        id: any;
    });
    readonly id: Id;
    readonly storageProviderFactory: StorageProviderFactory;
    readonly recipes: Recipe[];
    readonly allRecipes: Recipe[];
    readonly activeRecipe: Recipe;
    readonly particles: ParticleSpec[];
    readonly allParticles: ParticleSpec[];
    readonly imports: Manifest[];
    readonly schemas: {
        [index: string]: Schema;
    };
    readonly fileName: string;
    readonly stores: (StorageStub | StorageProviderBase)[];
    readonly allStores: (StorageStub | StorageProviderBase)[];
    readonly interfaces: InterfaceInfo[];
    readonly meta: ManifestMeta;
    readonly resources: {};
    applyMeta(section: {
        name: string;
    } & {
        key: string;
        value: string;
    }[]): void;
    createStore(type: Type, name: string, id: string, tags: string[], storageKey?: string): Promise<StorageStub | StorageProviderBase>;
    _addStore(store: StorageProviderBase | StorageStub, tags: string[]): StorageStub | StorageProviderBase;
    newStorageStub(type: Type, name: string, id: string, storageKey: string, tags: string[], originalId: string): StorageStub | StorageProviderBase;
    _find<a>(manifestFinder: ManifestFinder<a>): a;
    _findAll<a>(manifestFinder: ManifestFinderGenerator<a>): IterableIterator<a>;
    findSchemaByName(name: string): Schema;
    findTypeByName(name: string): EntityType | InterfaceType | undefined;
    findParticleByName(name: string): ParticleSpec;
    findParticlesByVerb(verb: string): ParticleSpec[];
    findStoreByName(name: string): StorageStub | StorageProviderBase;
    findStoreById(id: string): StorageStub | StorageProviderBase;
    findStoreTags(store: StorageProviderBase | StorageStub): string[];
    findManifestUrlForHandleId(id: string): string;
    findStoresByType(type: Type, options?: {
        tags: string[];
        subtype: boolean;
    }): (StorageProviderBase | StorageStub)[];
    findInterfaceByName(name: string): InterfaceInfo;
    findRecipesByVerb(verb: string): Recipe[];
    generateID(): string;
    static load(fileName: string, loader: {
        loadResource: any;
    }, options?: any): Promise<Manifest>;
    static parse(content: string, options?: any): Promise<Manifest>;
    static _augmentAstWithTypes(manifest: any, items: any): void;
    static _processSchema(manifest: any, schemaItem: any): void;
    static _processResource(manifest: any, schemaItem: any): void;
    static _processParticle(manifest: any, particleItem: any, loader: any): void;
    static _processInterface(manifest: any, interfaceItem: any): void;
    static _processRecipe(manifest: any, recipeItem: any, loader: any): void;
    static _buildRecipe(manifest: Manifest, recipe: Recipe, recipeItem: any): void;
    resolveTypeName(name: any): {
        schema: Schema;
        iface?: undefined;
    } | {
        iface: InterfaceInfo;
        schema?: undefined;
    };
    static _processStore(manifest: any, item: any, loader: any): Promise<void>;
    static _createStore(manifest: any, type: any, name: any, id: any, tags: any, item: any, originalId: any): Promise<any>;
    _newRecipe(name: any): Recipe;
    toString(options?: any): string;
}
export {};
