/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare const ARCS_KEY_PREFIX = "arcs-key-";
/**
 * Used to tag which compute VM hosts the kubernetes pods holding NodeJS VMs,
 * and where disks will be attached.
 */
export declare const ARCS_NODE_LABEL = "arcs-node";
export declare const DISK_MOUNT_PATH = "/personalcloud";
export declare const VM_URL_PREFIX = "VM_URL_PREFIX";
/**
 * Constructs label to be used in Kubernetes deployments.
 * @param fingerprint
 */
export declare function arcsKeyFor(fingerprint: string): string;
/**
 * Helper to wait a certain number of times for a GCP operation to finish.
 * @param func an async function that performs a GCP operation and returns a Promise<T>
 * @param waitCond an async function that takes a T and returns true or false if the operation is completed.
 * @param retries how many times to execute waitCond before giving up.
 * @param maxTimeout maximum amount of timeouts allowed.
 * @return the result from executing func
 */
export declare function waitForGcp<T>(func: () => PromiseLike<[T]>, waitCond: (result: T) => PromiseLike<boolean>, retries?: number, maxTimeout?: number): Promise<T>;
export declare function rejectAfter<T>(duration: number): Promise<T>;
export declare const ON_DISK_DB = "TARGET_DISK";
