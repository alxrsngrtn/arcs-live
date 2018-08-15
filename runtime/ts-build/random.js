/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class RNG {
}
/**
 * A basic random number generator using Math.random();
 */
class MathRandomRNG extends RNG {
    next() {
        return Math.random();
    }
}
/**
 * Provides a deterministic Random Number Generator for Tests
 */
class SeededRNG extends RNG {
    constructor() {
        super(...arguments);
        this.seed = 0;
    }
    next() {
        this.seed = Math.pow(this.seed + Math.E, Math.PI) % 1;
        return this.seed;
    }
}
export var Random;
(function (Random) {
    // Singleton Pattern
    let random = new MathRandomRNG();
    function next() {
        return random.next();
    }
    Random.next = next;
    // TODO: remove test code and allow for injectable implementations.
    function seedForTests() {
        random = new SeededRNG();
    }
    Random.seedForTests = seedForTests;
})(Random || (Random = {}));
//# sourceMappingURL=random.js.map