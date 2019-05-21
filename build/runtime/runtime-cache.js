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