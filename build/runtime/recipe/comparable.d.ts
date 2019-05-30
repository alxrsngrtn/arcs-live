/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Dictionary } from '../hot.js';
export declare function compareNulls<T>(o1: T | null, o2: T | null): 0 | 1 | -1;
export declare function compareStrings(s1: string | null, s2: string | null): number;
export declare function compareNumbers(n1: number, n2: number): number;
export declare function compareBools(b1: boolean | null, b2: boolean | null): number;
export declare function compareArrays<a>(a1: a[], a2: a[], compare: (first: a, second: a) => number): number;
export declare function compareObjects<a>(o1: Dictionary<a> | null, o2: Dictionary<a> | null, compare: (first: a, second: a) => number): number;
export interface Comparable<T> {
    _compareTo<T>(other: Comparable<T>): number;
}
export declare function compareComparables<T>(o1: Comparable<T> | null, o2: Comparable<T> | null): number;
