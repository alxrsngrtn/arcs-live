/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An ordered set of elements. Backed by an Array and a Set. Lookups are backed
 * by the Set so they are quick, and order is maintained by the Array. Elements
 * can be added to the OrderedSet multiple times.
 */
export declare class OrderedSet<T> {
    private readonly set;
    private readonly array;
    constructor();
    add(element: T): void;
    addAll(other: OrderedSet<T>): void;
    has(element: T): boolean;
    copy(): OrderedSet<T>;
    get length(): number;
    asSet(): ReadonlySet<T>;
    asArray(): readonly T[];
}
