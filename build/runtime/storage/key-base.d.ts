/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare abstract class KeyBase {
    protocol: string;
    location: string;
    abstract base(): string;
    abstract get arcId(): string;
    abstract childKeyForHandle(id: any): KeyBase;
    abstract childKeyForArcInfo(): KeyBase;
    abstract childKeyForSuggestions(userId: any, arcId: any): KeyBase;
    abstract childKeyForSearch(userId: any): KeyBase;
    abstract toString(): string;
}
