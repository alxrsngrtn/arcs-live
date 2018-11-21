/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Disk, DiskManager } from "../disks";
export declare const DEFAULT_GCP_DISK_SIZE = "10";
/**
 * Allows the provisioning of encrypted disk storage in a
 * cloud provider.
 */
export declare class GCPDiskManager implements DiskManager {
    create(fingerprint: string, wrappedKey: string, rewrappedKey: string): Promise<Disk>;
    delete(disk: Disk): Promise<void>;
    find(fingerprint: string): Promise<Disk | null>;
}
