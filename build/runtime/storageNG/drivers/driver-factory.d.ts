/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare enum Exists {
    ShouldExist = 0,
    ShouldCreate = 1,
    MayExist = 2
}
export declare type ReceiveMethod<T> = (model: T) => void;
export interface StorageDriverProvider {
    willSupport(storageKey: string): boolean;
    driver<Data>(storageKey: string, exists: Exists): Driver<Data>;
}
export declare abstract class Driver<Data> {
    storageKey: string;
    exists: Exists;
    constructor(storageKey: string, exists: Exists);
    abstract registerReceiver(receiver: ReceiveMethod<Data>): void;
    abstract send(model: Data): Promise<boolean>;
    abstract write(key: string, value: any): Promise<void>;
    abstract read(key: string): Promise<any>;
}
export declare class DriverFactory {
    static providers: StorageDriverProvider[];
    static driverInstance<Data>(storageKey: string, exists: Exists): Driver<Data>;
    static register(storageDriverProvider: StorageDriverProvider): void;
    static willSupport(storageKey: string): boolean;
    static clearProvidersForTesting(): void;
}
