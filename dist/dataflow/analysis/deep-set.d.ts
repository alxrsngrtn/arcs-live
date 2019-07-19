/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
interface UniqueStringable {
    /**
     * Returns a unique string representation of this object, with the property
     * that A deep equals B iff A.toUniqueString() == B.toUniqueString().
     */
    toUniqueString(): string;
}
/**
 * A Set implementation that performs deep equality of its elements instead of
 * strict equality. Every element needs to have a unique string representation,
 * which will be used as a simple way to compute deep equality.
 */
export declare class DeepSet<T extends UniqueStringable> implements Iterable<T> {
    /** All elements stored in the set. */
    private readonly elementSet;
    /** The unique string representation of every element in the set. */
    private readonly stringSet;
    constructor(...elements: T[]);
    add(element: T): void;
    addAll(other: DeepSet<T>): void;
    map(transform: (value: T) => T): DeepSet<T>;
    [Symbol.iterator](): IterableIterator<T>;
    asSet(): ReadonlySet<T>;
    toArray(): T[];
    readonly size: number;
    readonly isEmpty: boolean;
    /**
     * Returns true if this DeepSet is equal to the other DeepSet (deep equals,
     * computed via toUniqueString() for each DeepSet).
     */
    equals(other: DeepSet<T>): boolean;
    /** Unique string representation of this DeepSet. */
    toUniqueString(): string;
}
export {};
