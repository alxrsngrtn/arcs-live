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
 * A Set implementation that performs deep equality of its elements instead of
 * strict equality. Every element needs to have a unique string representation,
 * which will be used as a simple way to compute deep equality.
 */
export class DeepSet {
    constructor(...elements) {
        /** All elements stored in the set. */
        this.elementSet = new Set();
        /** The unique string representation of every element in the set. */
        this.stringSet = new Set();
        elements.forEach(e => this.add(e));
    }
    add(element) {
        const repr = element.toUniqueString();
        if (this.stringSet.has(repr)) {
            return;
        }
        this.stringSet.add(repr);
        this.elementSet.add(element);
    }
    addAll(other) {
        other.elementSet.forEach(e => this.add(e));
    }
    map(transform) {
        const result = new DeepSet();
        for (const elem of this) {
            result.add(transform(elem));
        }
        return result;
    }
    [Symbol.iterator]() {
        return this.elementSet[Symbol.iterator]();
    }
    asSet() {
        return this.elementSet;
    }
    toArray() {
        return [...this.elementSet];
    }
    get size() {
        return this.elementSet.size;
    }
    get isEmpty() {
        return this.size === 0;
    }
    /** Unique string representation of this DeepSet. */
    toUniqueString() {
        const strings = [...this.stringSet];
        strings.sort();
        return '{' + strings.join(', ') + '}';
    }
}
//# sourceMappingURL=deep-set.js.map