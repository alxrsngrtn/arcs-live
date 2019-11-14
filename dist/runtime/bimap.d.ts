/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare class BiMap<L, R> {
    private left2right;
    private right2left;
    constructor(iterable?: any);
    get size(): number;
    set(left: L, right: R): BiMap<L, R>;
    hasL(left: L): boolean;
    hasR(right: R): boolean;
    getL(left: L): R;
    getR(right: R): L;
    deleteL(left: L): boolean;
    deleteR(right: R): boolean;
    clear(): void;
    entries(): IterableIterator<[L, R]>;
    lefts(): IterableIterator<L>;
    rights(): IterableIterator<R>;
    forEach(callback: (left: L, right: R, map: BiMap<L, R>) => void): void;
}
