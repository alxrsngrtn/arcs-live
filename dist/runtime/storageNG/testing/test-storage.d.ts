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
import { CRDTTypeRecord, CRDTOperation } from '../../crdt/crdt.js';
import { ActiveStore, ProxyMessage, ProxyCallback } from '../store.js';
import { Exists, StorageDriverProvider, Driver, ReceiveMethod } from '../drivers/driver-factory.js';
import { StorageKey } from '../storage-key.js';
import { Handle } from '../handle.js';
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
export declare class MockHandle<T extends CRDTTypeRecord> extends Handle<T> {
    onSyncCalled: boolean;
    lastUpdate: CRDTOperation[];
    onSync(): void;
    onUpdate(ops: CRDTOperation[]): void;
}
export declare class MockStorageDriverProvider implements StorageDriverProvider {
    willSupport(storageKey: StorageKey): boolean;
    driver<Data>(storageKey: StorageKey, exists: Exists): Promise<MockDriver<Data>>;
}
