/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Id } from '../id.js';
import { Type } from '../type.js';
import { CrdtCollectionModel, ModelValue, SerializedModelEntry } from './crdt-collection-model.js';
import { KeyBase } from './key-base.js';
import { BigCollectionStorageProvider, CollectionStorageProvider, StorageBase, StorageProviderBase, SingletonStorageProvider } from './storage-provider-base.js';
import { Dictionary } from '../hot.js';
export declare function resetVolatileStorageForTesting(): void;
declare class VolatileKey extends KeyBase {
    _arcId: string;
    constructor(key: string);
    base(): string;
    arcId: string;
    childKeyForHandle(id: any): VolatileKey;
    childKeyForArcInfo(): VolatileKey;
    childKeyForSuggestions(userId: any, arcId: any): KeyBase;
    childKeyForSearch(userId: any): KeyBase;
    toString(): string;
}
export declare class VolatileStorage extends StorageBase {
    _memoryMap: Dictionary<VolatileStorageProvider>;
    _typeMap: Dictionary<VolatileCollection>;
    private readonly typePromiseMap;
    localIDBase: number;
    constructor(arcId: Id);
    construct(id: string, type: Type, keyFragment: string): Promise<VolatileStorageProvider>;
    _construct(id: any, type: any, keyFragment: any): Promise<VolatileCollection | VolatileBigCollection | VolatileSingleton>;
    connect(id: string, type: Type, key: string): Promise<VolatileStorageProvider>;
    baseStorageKey(type: Type): string;
    baseStorageFor(type: Type, key: string): Promise<VolatileCollection>;
    parseStringAsKey(s: string): VolatileKey;
}
declare abstract class VolatileStorageProvider extends StorageProviderBase {
    backingStore: VolatileCollection | null;
    protected storageEngine: VolatileStorage;
    private pendingBackingStore;
    static newProvider(type: any, storageEngine: any, name: any, id: any, key: any): VolatileCollection | VolatileBigCollection | VolatileSingleton;
    ensureBackingStore(): Promise<VolatileCollection>;
    abstract backingType(): Type;
}
declare class VolatileCollection extends VolatileStorageProvider implements CollectionStorageProvider {
    _model: CrdtCollectionModel;
    constructor(type: any, storageEngine: any, name: any, id: any, key: any);
    backingType(): Type;
    clone(): Promise<VolatileCollection>;
    cloneFrom(handle: any): Promise<void>;
    modelForSynchronization(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    toLiteral(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    private fromLiteral;
    _toList(): Promise<SerializedModelEntry[]>;
    toList(): Promise<ModelValue[]>;
    getMultiple(ids: string[]): Promise<ModelValue[]>;
    storeMultiple(values: any, keys: string[], originatorId?: string): Promise<void>;
    get(id: string): any;
    traceInfo(): {
        items: number;
    };
    store(value: any, keys: any, originatorId?: string): Promise<void>;
    removeMultiple(items: any, originatorId?: string): Promise<void>;
    remove(id: any, keys?: string[], originatorId?: any): Promise<void>;
    clearItemsForTesting(): void;
}
declare class VolatileSingleton extends VolatileStorageProvider implements SingletonStorageProvider {
    _stored: {
        id: string;
        storageKey?: string;
    } | null;
    private localKeyId;
    constructor(type: any, storageEngine: any, name: any, id: any, key: any);
    backingType(): Type;
    clone(): Promise<VolatileSingleton>;
    cloneFrom(handle: any): Promise<void>;
    modelForSynchronization(): Promise<{
        version: number;
        model: {};
    }>;
    toLiteral(): Promise<{
        version: number;
        model: SerializedModelEntry[];
    }>;
    private fromLiteral;
    traceInfo(): {
        stored: boolean;
    };
    get(): Promise<any>;
    set(value: {
        id: string;
    }, originatorId?: string, barrier?: string): Promise<void>;
    clear(originatorId?: string, barrier?: string): Promise<void>;
}
declare class VolatileBigCollection extends VolatileStorageProvider implements BigCollectionStorageProvider {
    private items;
    private cursors;
    private cursorIndex;
    constructor(type: any, storageEngine: any, name: any, id: any, key: any);
    enableReferenceMode(): void;
    backingType(): Type;
    get(id: string): Promise<{}>;
    store(value: any, keys: string[], originatorId?: string): Promise<void>;
    remove(id: string, keys?: string[], originatorId?: string): Promise<void>;
    stream(pageSize: number, forward?: boolean): Promise<number>;
    cursorNext(cursorId: number): Promise<{
        value: any;
        done: boolean;
    } | {
        done: boolean;
    }>;
    cursorClose(cursorId: number): Promise<void>;
    cursorVersion(cursorId: number): number;
    cloneFrom(handle: any): Promise<void>;
    toLiteral(): Promise<{
        version: number;
        model: any[];
    }>;
    private fromLiteral;
    clearItemsForTesting(): void;
}
export {};
