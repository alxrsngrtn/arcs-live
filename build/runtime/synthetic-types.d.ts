/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Id } from './id.js';
import { Type } from './type.js';
import { ModelValue } from './storage/crdt-collection-model.js';
export declare class ArcInfo {
    readonly id: string;
    readonly serialization: string;
    constructor(arcId: Id, serialization: string);
    static extractSerialization(data: any): string;
}
export declare class ArcHandle implements ModelValue {
    readonly id: string;
    readonly storageKey: string;
    readonly type: Type;
    readonly tags: string[];
    constructor(id: string, storageKey: string, type: Type, tags: string[]);
}
