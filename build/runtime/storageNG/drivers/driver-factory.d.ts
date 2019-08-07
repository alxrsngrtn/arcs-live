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
export declare enum Exists {
    ShouldExist = 0,
    ShouldCreate = 1,
    MayExist = 2
}
export declare type ReceiveMethod<T> = (model: T, version: number) => void;
export interface StorageDriverProvider {
    willSupport(storageKey: StorageKey): boolean;
    driver<Data>(storageKey: StorageKey, exists: Exists): Promise<Driver<Data>>;
}
export declare abstract class Driver<Data> {
    storageKey: StorageKey;
    exists: Exists;
    constructor(storageKey: StorageKey, exists: Exists);
    abstract registerReceiver(receiver: ReceiveMethod<Data>): void;
    abstract send(model: Data, version: number): Promise<boolean>;
    abstract write(key: StorageKey, value: any): Promise<void>;
    abstract read(key: StorageKey): Promise<any>;
}
export declare class DriverFactory {
    static clearRegistrationsForTesting(): void;
    static providers: Set<StorageDriverProvider>;
    static driverInstance<Data>(storageKey: StorageKey, exists: Exists): Promise<Driver<Data>>;
    static register(storageDriverProvider: StorageDriverProvider): void;
    static unregister(storageDriverProvider: StorageDriverProvider): void;
    static willSupport(storageKey: StorageKey): boolean;
}
