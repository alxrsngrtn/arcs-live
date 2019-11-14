/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { StorageKey } from './storage-key.js';
export declare class ReferenceModeStorageKey extends StorageKey {
    backingKey: StorageKey;
    storageKey: StorageKey;
    constructor(backingKey: StorageKey, storageKey: StorageKey);
    embedKey(key: StorageKey): string;
    static unembedKey(key: string): string;
    toString(): string;
    childWithComponent(component: string): StorageKey;
    static fromString(key: string, parse: (key: string) => StorageKey): ReferenceModeStorageKey;
}
