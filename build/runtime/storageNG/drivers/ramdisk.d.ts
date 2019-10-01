/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { StorageKey } from '../storage-key.js';
import { StorageDriverProvider, Exists } from './driver-factory.js';
import { VolatileDriver } from './volatile.js';
export declare class RamDiskStorageKey extends StorageKey {
    readonly unique: string;
    constructor(unique: string);
    toString(): string;
    childWithComponent(component: string): RamDiskStorageKey;
}
/**
 * Provides RamDisk storage drivers. RamDisk storage is shared amongst all Arcs,
 * and will persist for as long as the Arcs Runtime does.
 *
 * This works in the exact same way as Volatile storage, but the memory is not
 * tied to a specific running Arc.
 */
export declare class RamDiskStorageDriverProvider implements StorageDriverProvider {
    willSupport(storageKey: StorageKey): boolean;
    driver<Data>(storageKey: StorageKey, exists: Exists): Promise<VolatileDriver<Data>>;
    static register(): void;
}
