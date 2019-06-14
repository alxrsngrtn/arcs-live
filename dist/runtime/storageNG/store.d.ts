/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTModel, CRDTTypeRecord } from '../crdt/crdt.js';
import { Type } from '../type.js';
import { Exists, Driver } from './drivers/driver-factory.js';
import { StorageKey } from './storage-key.js';
export declare enum StorageMode {
    Direct = 0,
    Backing = 1,
    ReferenceMode = 2
}
export declare enum ProxyMessageType {
    SyncRequest = 0,
    ModelUpdate = 1,
    Operations = 2
}
export declare type ProxyMessage<T extends CRDTTypeRecord> = {
    type: ProxyMessageType.SyncRequest;
    id: number;
} | {
    type: ProxyMessageType.ModelUpdate;
    model: T['data'];
    id: number;
} | {
    type: ProxyMessageType.Operations;
    operations: T['operation'][];
    id: number;
};
export declare type ProxyCallback<T extends CRDTTypeRecord> = (message: ProxyMessage<T>) => Promise<boolean>;
export declare class Store<T extends CRDTTypeRecord> {
    readonly storageKey: StorageKey;
    exists: Exists;
    readonly type: Type;
    readonly mode: StorageMode;
    readonly constructors: Map<StorageMode, typeof DirectStore>;
    modelConstructor: new () => CRDTModel<T>;
    constructor(storageKey: StorageKey, exists: Exists, type: Type, mode: StorageMode, modelConstructor: new () => CRDTModel<T>);
    activate(): Promise<ActiveStore<T>>;
}
export declare abstract class ActiveStore<T extends CRDTTypeRecord> extends Store<T> {
    abstract on(callback: ProxyCallback<T>): number;
    abstract off(callback: number): void;
    abstract onProxyMessage(message: ProxyMessage<T>): Promise<boolean>;
}
export declare class DirectStore<T extends CRDTTypeRecord> extends ActiveStore<T> {
    localModel: CRDTModel<T>;
    callbacks: Map<number, ProxyCallback<T>>;
    driver: Driver<T['data']>;
    inSync: boolean;
    private nextCallbackID;
    private version;
    private constructor();
    static construct<T extends CRDTTypeRecord>(storageKey: StorageKey, exists: Exists, type: Type, mode: StorageMode, modelConstructor: new () => CRDTModel<T>): Promise<DirectStore<T>>;
    onReceive(model: T['data'], version: number): Promise<void>;
    private processModelChange;
    private noDriverSideChanges;
    onProxyMessage(message: ProxyMessage<T>): Promise<boolean>;
    on(callback: ProxyCallback<T>): number;
    off(callback: number): void;
}
