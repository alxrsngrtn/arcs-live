/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { FirebaseStorageKey, FirebaseStorageDriverProvider, FirebaseDriver } from '../drivers/firebase.js';
import { StorageKey } from '../storage-key.js';
import { Exists } from '../drivers/driver-factory.js';
export declare class MockFirebaseStorageDriverProvider extends FirebaseStorageDriverProvider {
    driver<Data>(storageKey: StorageKey, exists: Exists): Promise<FirebaseDriver<Data>>;
    static newDriverForTesting<Data>(storageKey: StorageKey, exists: Exists): Promise<FirebaseDriver<Data>>;
    static register(): void;
    static getValueForTesting(storageKey: MockFirebaseStorageKey): any;
}
export declare class MockFirebaseStorageKey extends FirebaseStorageKey {
    constructor(location: any);
}
