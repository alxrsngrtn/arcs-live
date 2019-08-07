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
import { Arc } from '../../arc.js';
import { ArcId } from '../../id.js';
declare type VolatileEntry<Data> = {
    data: Data;
    version: number;
    drivers: VolatileDriver<Data>[];
};
export declare class VolatileStorageKey extends StorageKey {
    readonly arcId: ArcId;
    readonly unique: string;
    constructor(arcId: ArcId, unique: string);
    toString(): string;
    childWithComponent(component: string): VolatileStorageKey;
}
export declare class VolatileMemory {
    entries: Map<string, VolatileEntry<unknown>>;
}
export declare class VolatileDriver<Data> extends Driver<Data> {
    private memory;
    private pendingVersion;
    private pendingModel;
    private receiver;
    private data;
    constructor(storageKey: StorageKey, exists: Exists, memory: VolatileMemory);
    registerReceiver(receiver: ReceiveMethod<Data>): void;
    send(model: Data, version: number): Promise<boolean>;
    write(key: StorageKey, value: Data): Promise<void>;
    read(key: StorageKey): Promise<Data>;
}
/**
 * Provides Volatile storage drivers. Volatile storage is local to an individual
 * running Arc. It lives for as long as that Arc instance, and then gets
 * deleted when the Arc is stopped.
 */
export declare class VolatileStorageDriverProvider implements StorageDriverProvider {
    private readonly arc;
    constructor(arc: Arc);
    willSupport(storageKey: StorageKey): boolean;
    driver<Data>(storageKey: StorageKey, exists: Exists): Promise<VolatileDriver<Data>>;
    static register(arc: Arc): void;
}
export {};
