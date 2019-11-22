/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class CacheKey {
    constructor(id) {
        this.identifier = id;
    }
}
export class RuntimeCacheService {
    constructor() {
        this.map = new Map();
        this.nextID = 0;
    }
    getOrCreateCache(name) {
        if (!this.map.has(name)) {
            this.map.set(name, new Map());
        }
        return this.map.get(name);
    }
}
//# sourceMappingURL=runtime-cache.js.map