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
import { CRDTConsumerType, CRDTModel, CRDTOperation, CRDTTypeRecord, VersionMap } from '../crdt/crdt.js';
import { Particle } from '../particle.js';
import { ParticleExecutionContext } from '../particle-execution-context.js';
import { Type } from '../type.js';
import { Handle } from './handle.js';
import { ActiveStore, ProxyMessage } from './store.js';
/**
 * TODO: describe this class.
 */
export declare class StorageProxy<T extends CRDTTypeRecord> {
    private handles;
    private crdt;
    private id;
    apiChannelId: string;
    private store;
    readonly type: Type;
    pec: ParticleExecutionContext;
    private listenerAttached;
    private keepSynced;
    private synchronized;
    private readonly scheduler;
    constructor(apiChannelId: string, crdt: CRDTModel<T>, store: ActiveStore<T>, type: Type, pec: ParticleExecutionContext);
    idle(): Promise<void>;
    reportExceptionInHost(exception: PropagatedException): void;
    registerHandle(handle: Handle<T>): VersionMap;
    deregisterHandle(handleIn: Handle<T>): void;
    protected versionCopy(): VersionMap;
    applyOp(op: CRDTOperation): Promise<boolean>;
    getParticleView(): Promise<[T['consumerType'], VersionMap]>;
    getData(): Promise<T['data']>;
    onMessage(message: ProxyMessage<T>): Promise<boolean>;
    protected notifyUpdate(operation: CRDTOperation, oldData: CRDTConsumerType): void;
    protected notifySync(): void;
    protected notifyDesync(): void;
    protected synchronizeModel(): Promise<boolean>;
}
export declare class NoOpStorageProxy<T extends CRDTTypeRecord> extends StorageProxy<T> {
    constructor();
    idle(): Promise<void>;
    reportExceptionInHost(exception: PropagatedException): void;
    registerHandle(handle: Handle<T>): VersionMap;
    deregisterHandle(handle: Handle<T>): void;
    protected versionCopy(): VersionMap;
    applyOp(op: CRDTOperation): Promise<boolean>;
    getParticleView(): Promise<[T['consumerType'], VersionMap]>;
    getData(): Promise<T['data']>;
    onMessage(message: ProxyMessage<T>): Promise<boolean>;
    protected notifyUpdate(operation: CRDTOperation, oldData: CRDTConsumerType): void;
    protected notifySync(): void;
    protected notifyDesync(): void;
    protected synchronizeModel(): Promise<boolean>;
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
    op: CRDTOperation;
    oldData: CRDTConsumerType;
    version: VersionMap;
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
    _dispatchUpdate(handle: Handle<T>, update: Event): Promise<void>;
}
export {};
