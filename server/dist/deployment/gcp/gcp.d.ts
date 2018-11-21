/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Cloud } from "../cloud";
import { ContainerManager } from "../containers";
import { DiskManager } from "../disks";
/**
 * Implementation of Cloud interface for GCP.
 */
export declare class GCPCloud implements Cloud {
    containers(): ContainerManager;
    disks(): DiskManager;
}
