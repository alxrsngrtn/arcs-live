/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Driver, ReceiveMethod, StorageDriverProvider, Exists } from './driver-factory.js';
import { StorageKey } from '../storage-key.js';
declare type VolatileEntry<Data> = {
    data: Data;
    version: number;
    drivers: VolatileDriver<Data>[];
};
export declare class VolatileStorageKey extends StorageKey {
    readonly unique: string;
    constructor(unique: string);
}
export declare class VolatileMemory {
    entries: Map<StorageKey, VolatileEntry<unknown>>;
}
export declare class VolatileDriver<Data> extends Driver<Data> {
    private memory;
    private pendingVersion;
    private pendingModel;
    private receiver;
    private data;
    constructor(storageKey: StorageKey, exists: Exists);
    registerReceiver(receiver: ReceiveMethod<Data>): void;
    send(model: Data, version: number): Promise<boolean>;
    write(key: StorageKey, value: Data): Promise<void>;
    read(key: StorageKey): Promise<Data>;
}
export declare class VolatileStorageDriverProvider implements StorageDriverProvider {
    willSupport(storageKey: StorageKey): boolean;
    driver<Data>(storageKey: StorageKey, exists: Exists): Driver<Data>;
    static register(): void;
}
export {};
