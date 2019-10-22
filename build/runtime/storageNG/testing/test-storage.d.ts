/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { PropagatedException } from '../../arc-exceptions.js';
import { CRDTConsumerType, CRDTOperation, CRDTTypeRecord, VersionMap } from '../../crdt/crdt.js';
import { Consumer } from '../../hot.js';
import { Driver, Exists, ReceiveMethod, StorageDriverProvider } from '../drivers/driver-factory.js';
import { Handle } from '../handle.js';
import { StorageKey } from '../storage-key.js';
import { StorageProxy } from '../storage-proxy.js';
import { ActiveStore, ProxyCallback, ProxyMessage } from '../store.js';
/**
 * These classes are intended to provide **extremely** simple fake objects to use
 * when testing StorageNG classes. Methods on these classes should either:
 *  - throw an exception
 *  - implement an obvious default
 *  - store the input
 *
 * Ideally, the methods shouldn't actually do anything, (i.e. should always throw)
 * and should be overridden explicitly in testing.
 */
export declare class MockDriver<Data> extends Driver<Data> {
    receiver: ReceiveMethod<Data>;
    read(key: StorageKey): Promise<void>;
    write(key: StorageKey, value: {}): Promise<void>;
    registerReceiver(receiver: ReceiveMethod<Data>): void;
    getToken(): any;
    send(model: Data): Promise<boolean>;
}
export declare class MockStore<T extends CRDTTypeRecord> extends ActiveStore<T> {
    lastCapturedMessage: ProxyMessage<T>;
    lastCapturedException: PropagatedException;
    constructor();
    on(callback: ProxyCallback<T>): number;
    off(callback: number): void;
    onProxyMessage(message: ProxyMessage<T>): Promise<boolean>;
    reportExceptionInHost(exception: PropagatedException): void;
}
export declare class MockStorageKey extends StorageKey {
    constructor();
    toString(): string;
    childWithComponent(component: string): StorageKey;
}
export declare class MockHierarchicalStorageKey extends StorageKey {
    value: string;
    constructor(segment?: string);
    toString(): string;
    childWithComponent(component: string): MockHierarchicalStorageKey;
}
export declare class MockHandle<T extends CRDTTypeRecord> extends Handle<T> {
    onSyncCalled: boolean;
    lastUpdate: any;
    constructor(storageProxy: StorageProxy<T>);
    onSync(): void;
    onUpdate(op: CRDTOperation, oldData: CRDTConsumerType, version: VersionMap): void;
}
export declare class MockStorageDriverProvider implements StorageDriverProvider {
    willSupport(storageKey: StorageKey): boolean;
    driver<Data>(storageKey: StorageKey, exists: Exists): Promise<MockDriver<Data>>;
}
export declare class MockParticle {
    lastUpdate: any;
    onSyncCalled: boolean;
    onDesyncCalled: boolean;
    callOnHandleUpdate(handle: Handle<CRDTTypeRecord>, update: any, onException: Consumer<Error>): Promise<void>;
    callOnHandleSync(handle: Handle<CRDTTypeRecord>, model: any, onException: Consumer<Error>): Promise<void>;
    callOnHandleDesync(handle: Handle<CRDTTypeRecord>, onException: Consumer<Error>): Promise<void>;
}
