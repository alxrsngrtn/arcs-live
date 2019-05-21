export declare class RuntimeCacheService {
    private map;
    private nextID;
    getOrCreateCache<K, V>(name: any): Map<K, V>;
}
