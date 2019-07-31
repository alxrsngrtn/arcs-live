/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { PropagatedException } from '../arc-exceptions.js';
import { CRDTModel, CRDTTypeRecord } from '../crdt/crdt.js';
import { Type } from '../type.js';
import { Exists, Driver } from './drivers/driver-factory.js';
import { StorageKey } from './storage-key.js';
import { ActiveStore, ProxyCallback, StorageMode, ProxyMessage } from './store-interface.js';
export declare enum DirectStoreState {
    Idle = "Idle",
    AwaitingResponse = "AwaitingResponse",
    AwaitingResponseDirty = "AwaitingResponseDirty",
    AwaitingDriverModel = "AwaitingDriverModel"
}
export declare class DirectStore<T extends CRDTTypeRecord> extends ActiveStore<T> {
    localModel: CRDTModel<T>;
    callbacks: Map<number, ProxyCallback<T>>;
    driver: Driver<T['data']>;
    private nextCallbackID;
    private version;
    private pendingException;
    private pendingResolves;
    private pendingRejects;
    private pendingDriverModels;
    private state;
    private constructor();
    idle(): Promise<void>;
    private setState;
    private notifyIdle;
    static construct<T extends CRDTTypeRecord>(storageKey: StorageKey, exists: Exists, type: Type, mode: StorageMode, modelConstructor: new () => CRDTModel<T>): Promise<DirectStore<T>>;
    onReceive(model: T['data'], version: number): Promise<void>;
    private deliverCallbacks;
    private processModelChange;
    private updateStateAndAct;
    private applyPendingDriverModels;
    private noDriverSideChanges;
    onProxyMessage(message: ProxyMessage<T>): Promise<boolean>;
    on(callback: ProxyCallback<T>): number;
    off(callback: number): void;
    reportExceptionInHost(exception: PropagatedException): void;
}
