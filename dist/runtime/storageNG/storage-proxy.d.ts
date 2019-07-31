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
import { CRDTModel, CRDTOperation, CRDTTypeRecord, VersionMap } from '../crdt/crdt.js';
import { Particle } from '../particle.js';
import { Handle } from './handle.js';
import { ActiveStore, ProxyMessage } from './store.js';
/**
 * TODO: describe this class.
 */
export declare class StorageProxy<T extends CRDTTypeRecord> {
    private handles;
    private crdt;
    private id;
    private store;
    private listenerAttached;
    private keepSynced;
    private synchronized;
    private readonly scheduler;
    constructor(crdt: CRDTModel<T>, store: ActiveStore<T>, scheduler: StorageProxyScheduler<T>);
    reportExceptionInHost(exception: PropagatedException): void;
    registerHandle(handle: Handle<T>): VersionMap;
    applyOp(op: CRDTOperation): Promise<boolean>;
    getParticleView(): Promise<T['consumerType']>;
    getData(): Promise<T['data']>;
    onMessage(message: ProxyMessage<T>): Promise<boolean>;
    private notifyUpdate;
    private notifySync;
    private notifyDesync;
    private synchronizeModel;
}
declare enum HandleMessageType {
    Sync = 0,
    Desync = 1,
    Update = 2
}
declare type Event = {
    type: HandleMessageType.Sync;
} | {
    type: HandleMessageType.Desync;
} | {
    type: HandleMessageType.Update;
    ops: CRDTOperation[];
};
export declare class StorageProxyScheduler<T extends CRDTTypeRecord> {
    private _scheduled;
    private _queues;
    private _idleResolver;
    private _idle;
    constructor();
    enqueue(particle: Particle, handle: Handle<T>, args: Event): void;
    readonly busy: boolean;
    _updateIdle(): void;
    readonly idle: Promise<void>;
    _schedule(): void;
    _dispatch(): void;
}
export {};
