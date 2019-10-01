/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare abstract class StorageKey {
    readonly protocol: string;
    constructor(protocol: string);
    abstract toString(): string;
    abstract childWithComponent(component: string): StorageKey;
    childKeyForArcInfo(): StorageKey;
    childKeyForHandle(id: string): StorageKey;
}
