/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Id, IdGenerator } from './id.js';
import { InterfaceInfo } from './interface-info.js';
import { ManifestMeta } from './manifest-meta.js';
import * as AstNode from './manifest-ast-nodes.js';
import { ParticleSpec } from './particle-spec.js';
import { Recipe } from './recipe/recipe.js';
import { Schema } from './schema.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
import { StorageProviderFactory } from './storage/storage-provider-factory.js';
import { EntityType, InterfaceType, Type } from './type.js';
import { Dictionary } from './hot.js';
export declare class ManifestError extends Error {
    location: AstNode.SourceLocation;
    key: string;
    constructor(location: AstNode.SourceLocation, message: string);
}
export declare class StorageStub {
    type: Type;
    id: string;
    name: string;
    storageKey: string;
    storageProviderFactory: StorageProviderFactory;
    referenceMode: boolean;
    originalId: string;
    constructor(type: Type, id: string, name: string, storageKey: string, storageProviderFactory: StorageProviderFactory, originalId: string);
    readonly version: number;
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
    private readonly _idGenerator;
    private _storageProviderFactory;
    private _meta;
    private _resources;
    private storeManifestUrls;
    private errors;
    constructor({ id }: {
        id: Id | string;
    });
    readonly id: Id;
    readonly storageProviderFactory: StorageProviderFactory;
    readonly recipes: Recipe[];
    readonly allRecipes: Recipe[];
    readonly activeRecipe: Recipe;
    readonly particles: ParticleSpec[];
    readonly allParticles: ParticleSpec[];
    readonly imports: Manifest[];
    readonly schemas: Dictionary<Schema>;
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
    generateID(): Id;
    static load(fileName: string, loader: {
        loadResource: any;
        path?: any;
        join?: any;
    }, options?: any): Promise<Manifest>;
    static getErrors(manifest: Manifest): ManifestError[];
    static parse(content: string, options?: any): Promise<Manifest>;
    private static _augmentAstWithTypes;
    private static _processSchema;
    private static _processResource;
    private static _processParticle;
    private static _processInterface;
    private static _processRecipe;
    private static _buildRecipe;
    resolveTypeName(name: string): {
        schema?: Schema;
        iface?: InterfaceInfo;
    } | null;
    private static _processStore;
    private static _createStore;
    private _newRecipe;
    toString(options?: {
        recursive?: boolean;
        showUnresolved?: boolean;
        hideFields?: boolean;
    }): string;
    readonly idGeneratorForTesting: IdGenerator;
}
export {};
