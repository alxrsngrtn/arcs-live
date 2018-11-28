/** @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { StorageProxy } from './storage-proxy.js';
import { Particle } from './particle.js';
export interface HandleOptions {
    keepSynced: boolean;
    notifySync: boolean;
    notifyUpdate: boolean;
    notifyDesync: boolean;
}
/** @class Handle
 * Base class for Collections and Variables.
 */
export declare abstract class Handle {
    _proxy: StorageProxy;
    name: string;
    canRead: boolean;
    canWrite: boolean;
    _particleId: string | null;
    options: HandleOptions;
    entityClass: string | null;
    abstract _notify(kind: string, particle: Particle, details: {}): any;
    constructor(proxy: StorageProxy, name: string, particleId: any, canRead: boolean, canWrite: boolean);
    raiseSystemException(exception: any, method: any): void;
    configure(options: any): void;
    _serialize(entity: any): {
        id: any;
        rawData: any;
    };
    readonly type: import("./type.js").Type;
    readonly _id: string;
    store(entity: any): Promise<void>;
    toManifestString(): string;
}
export declare function handleFor(proxy: StorageProxy, name?: string, particleId?: number, canRead?: boolean, canWrite?: boolean): any;
