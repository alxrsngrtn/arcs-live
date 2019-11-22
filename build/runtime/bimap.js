/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export class BiMap {
    constructor(iterable) {
        this.left2right = new Map();
        this.right2left = new Map();
        if (iterable) {
            for (const [left, right] of iterable) {
                this.set(left, right);
            }
        }
    }
    get size() { return this.left2right.size; }
    set(left, right) {
        if (this.hasL(left)) {
            this.right2left.delete(this.getL(left));
        }
        if (this.hasR(right)) {
            this.left2right.delete(this.getR(right));
        }
        this.left2right.set(left, right);
        this.right2left.set(right, left);
        return this;
    }
    hasL(left) {
        return this.left2right.has(left);
    }
    hasR(right) {
        return this.right2left.has(right);
    }
    getL(left) {
        return this.left2right.get(left);
    }
    getR(right) {
        return this.right2left.get(right);
    }
    deleteL(left) {
        this.right2left.delete(this.getL(left));
        return this.left2right.delete(left);
    }
    deleteR(right) {
        this.left2right.delete(this.getR(right));
        return this.right2left.delete(right);
    }
    clear() {
        this.left2right.clear();
        this.right2left.clear();
    }
    entries() {
        return this.left2right.entries();
    }
    lefts() {
        return this.left2right.keys();
    }
    rights() {
        return this.right2left.keys();
    }
    forEach(callback) {
        this.left2right.forEach((value, key) => callback(key, value, this));
    }
}
//# sourceMappingURL=bimap.js.map