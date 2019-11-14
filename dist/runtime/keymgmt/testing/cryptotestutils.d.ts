/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DeviceKey, Key, WrappedKey } from '../keys.js';
import { KeyStorage } from '../manager.js';
export interface TestableKey {
    encrypt(buffer: ArrayBuffer, iv: Uint8Array): PromiseLike<ArrayBuffer>;
    decrypt(buffer: ArrayBuffer, iv: Uint8Array): PromiseLike<ArrayBuffer>;
}
/**
 * Implementation of KeyStorage using a Map, used for testing only.
 */
export declare class WebCryptoMemoryKeyStorage implements KeyStorage {
    storageMap: Map<string, Key>;
    constructor();
    find(keyFingerPrint: string): PromiseLike<Key | null>;
    write(keyFingerprint: string, key: DeviceKey | WrappedKey): Promise<string>;
    static getInstance(): WebCryptoMemoryKeyStorage;
}
