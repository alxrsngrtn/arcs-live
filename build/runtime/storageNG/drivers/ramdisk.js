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
import { Runtime } from '../../runtime.js';
import { DriverFactory } from './driver-factory.js';
import { VolatileDriver } from './volatile.js';
export class RamDiskStorageKey extends StorageKey {
    constructor(unique) {
        super('ramdisk');
        this.unique = unique;
    }
    toString() {
        return `${this.protocol}://${this.unique}`;
    }
    childWithComponent(component) {
        return new RamDiskStorageKey(`${this.unique}/${component}`);
    }
    static fromString(key) {
        const match = key.match(/^ramdisk:\/\/(.*)$/);
        if (!match) {
            throw new Error(`Not a valid RamDiskStorageKey: ${key}.`);
        }
        const unique = match[1];
        return new RamDiskStorageKey(unique);
    }
}
/**
 * Provides RamDisk storage drivers. RamDisk storage is shared amongst all Arcs,
 * and will persist for as long as the Arcs Runtime does.
 *
 * This works in the exact same way as Volatile storage, but the memory is not
 * tied to a specific running Arc.
 */
export class RamDiskStorageDriverProvider {
    willSupport(storageKey) {
        return storageKey.protocol === 'ramdisk';
    }
    async driver(storageKey, exists) {
        if (!this.willSupport(storageKey)) {
            throw new Error(`This provider does not support storageKey ${storageKey.toString()}`);
        }
        // Use a VolatileDriver backed by the Runtime's RamDisk memory instance.
        const memory = Runtime.getRuntime().getRamDiskMemory();
        return new VolatileDriver(storageKey, exists, memory);
    }
    static register() {
        DriverFactory.register(new RamDiskStorageDriverProvider());
    }
}
// Note that this will automatically register for any production code
// that uses ramdisk drivers; but it won't automatically register in
// testing; for safety, call RamDiskStorageDriverProvider.register()
// from your test code somewhere.
RamDiskStorageDriverProvider.register();
//# sourceMappingURL=ramdisk.js.map