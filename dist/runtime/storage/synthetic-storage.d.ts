/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ModelValue, SerializedModelEntry } from './crdt-collection-model.js';
import { Id } from '../id.js';
import { Type } from '../type.js';
import { KeyBase } from './key-base.js';
import { CollectionStorageProvider, StorageBase, StorageProviderBase, SingletonStorageProvider } from './storage-provider-base.js';
import { StorageProviderFactory } from './storage-provider-factory.js';
declare enum Scope {
    arc = 1
}
declare enum Category {
    handles = 1
}
declare class SyntheticKey extends KeyBase {
    readonly scope: Scope;
    readonly category: Category;
    readonly targetKey: string;
    readonly targetType: Type;
    readonly syntheticType: Type;
    constructor(key: string, storageFactory: StorageProviderFactory);
    readonly protocol: string;
    base(): string;
    readonly arcId: string;
    childKeyForHandle(id: any): SyntheticKey;
    childKeyForArcInfo(): SyntheticKey;
    childKeyForSuggestions(userId: any, arcId: any): KeyBase;
    childKeyForSearch(userId: any): KeyBase;
    toString(): string;
}
export declare class SyntheticStorage extends StorageBase {
    private readonly storageFactory;
    constructor(arcId: Id, storageFactory: StorageProviderFactory);
    construct(id: string, type: Type, keyFragment: string): Promise<SyntheticCollection>;
    connect(id: string, type: Type, key: string): Promise<SyntheticCollection>;
    baseStorageFor(type: Type, key: string): Promise<StorageProviderBase>;
    baseStorageKey(type: Type, key: string): string;
    parseStringAsKey(s: string): SyntheticKey;
}
declare class SyntheticCollection extends StorageProviderBase implements CollectionStorageProvider {
    private readonly targetStore;
    private readonly storageFactory;
    private readonly initialized;
    private model;
    backingStore: any;
    constructor(type: Type, id: string, key: string, targetStore: SingletonStorageProvider, storageFactory: StorageProviderFactory);
    private process;
    toList(): Promise<ModelValue[]>;
    toLiteral(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    cloneFrom(): Promise<void>;
    ensureBackingStore(): Promise<void>;
    getMultiple(ids: string[]): Promise<any[]>;
    storeMultiple(values: any, keys: any, originatorId: any): Promise<void>;
    removeMultiple(items: any, originatorId: string): Promise<void>;
    get(id: string): Promise<{}>;
    remove(id: string, keys: string[], originatorId: string): never;
    store(value: any, keys: string[], originatorId?: string): never;
}
export {};
