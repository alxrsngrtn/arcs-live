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
import { Loader } from './loader.js';
import { ManifestMeta } from './manifest-meta.js';
import * as AstNode from './manifest-ast-nodes.js';
import { ParticleSpec } from './particle-spec.js';
import { Recipe } from './recipe/recipe.js';
import { Schema } from './schema.js';
import { StorageProviderFactory } from './storage/storage-provider-factory.js';
import { EntityType, InterfaceType, Type } from './type.js';
import { Dictionary } from './hot.js';
import { ClaimIsTag } from './particle-claim.js';
import { UnifiedStore } from './storageNG/unified-store.js';
import { StorageKey } from './storageNG/storage-key.js';
export declare enum ErrorSeverity {
    Error = "error",
    Warning = "warning"
}
export declare class ManifestError extends Error {
    location: AstNode.SourceLocation;
    key: string;
    severity: ErrorSeverity;
    constructor(location: AstNode.SourceLocation, message: string);
}
export declare class ManifestWarning extends ManifestError {
    constructor(location: AstNode.SourceLocation, message: string);
}
declare type ManifestFinder<a> = (manifest: Manifest) => a;
declare type ManifestFinderGenerator<a> = ((manifest: Manifest) => IterableIterator<a>) | ((manifest: Manifest) => a[]);
interface ManifestParseOptions {
    fileName?: string;
    loader?: Loader;
    registry?: Dictionary<Promise<Manifest>>;
    context?: Manifest;
    throwImportErrors?: boolean;
}
interface ManifestLoadOptions {
    registry?: Dictionary<Promise<Manifest>>;
}
export declare class Manifest {
    private _recipes;
    private _imports;
    private _particles;
    private _schemas;
    private _stores;
    private _interfaces;
    storeTags: Map<UnifiedStore, string[]>;
    private _fileName;
    private readonly _id;
    private readonly _idGenerator;
    private _storageProviderFactory;
    private _meta;
    private _resources;
    private storeManifestUrls;
    readonly errors: ManifestError[];
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
    readonly allSchemas: Schema[];
    readonly fileName: string;
    readonly stores: UnifiedStore[];
    readonly allStores: UnifiedStore[];
    readonly interfaces: InterfaceInfo[];
    readonly meta: ManifestMeta;
    readonly resources: {};
    applyMeta(section: {
        name: string;
    } & {
        key: string;
        value: string;
    }[]): void;
    _addStore(store: UnifiedStore, tags: string[]): UnifiedStore;
    newStore(opts: {
        type: Type;
        name: string;
        id: string;
        storageKey: string | StorageKey;
        tags: string[];
        claims?: ClaimIsTag[];
        originalId?: string;
        description?: string;
        version?: number;
        source?: string;
        referenceMode?: boolean;
        model?: {}[];
    }): UnifiedStore;
    _find<a>(manifestFinder: ManifestFinder<a>): a;
    _findAll<a>(manifestFinder: ManifestFinderGenerator<a>): IterableIterator<a>;
    findSchemaByName(name: string): Schema;
    findTypeByName(name: string): EntityType | InterfaceType | undefined;
    findParticleByName(name: string): ParticleSpec;
    findParticlesByVerb(verb: string): ParticleSpec[];
    findStoreByName(name: string): UnifiedStore;
    findStoreById(id: string): UnifiedStore;
    findStoreTags(store: UnifiedStore): Set<string>;
    findManifestUrlForHandleId(id: string): string;
    findStoresByType(type: Type, options?: {
        tags: string[];
        subtype: boolean;
    }): UnifiedStore[];
    findInterfaceByName(name: string): InterfaceInfo;
    findRecipesByVerb(verb: string): Recipe[];
    generateID(subcomponent?: string): Id;
    static load(fileName: string, loader: Loader, options?: ManifestLoadOptions): Promise<Manifest>;
    static getErrors(manifest: Manifest): ManifestError[];
    static parse(content: string, options?: ManifestParseOptions): Promise<Manifest>;
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
    /**
     * Creates a new storage key for data local to the manifest itself (e.g.
     * from embedded JSON data, or an external JSON file).
     */
    private createLocalDataStorageKey;
    private static _processStore;
    private _newRecipe;
    toString(options?: {
        recursive?: boolean;
        showUnresolved?: boolean;
        hideFields?: boolean;
    }): string;
    readonly idGeneratorForTesting: IdGenerator;
}
export {};
