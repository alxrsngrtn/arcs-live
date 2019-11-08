import { VolatileStorageKey } from './drivers/volatile.js';
import { FirebaseStorageKey } from './drivers/firebase.js';
import { RamDiskStorageKey } from './drivers/ramdisk.js';
import { ReferenceModeStorageKey } from './reference-mode-storage-key.js';
/**
 * Parses storage key string representations back into real StorageKey
 * instances.
 *
 * Singleton class with static methods. If you modify the default set of storage
 * keys in a test, remember to call StorageKeyParser.reset() in the tear-down
 * method.
 */
export class StorageKeyParser {
    static getDefaultParsers() {
        return new Map([
            ['volatile', VolatileStorageKey.fromString],
            ['firebase', FirebaseStorageKey.fromString],
            ['ramdisk', RamDiskStorageKey.fromString],
            ['reference-mode', ReferenceModeStorageKey.fromString]
        ]);
    }
    static parse(key) {
        const match = key.match(/^((?:\w|-)+):\/\/(.*)$/);
        if (!match) {
            throw new Error('Failed to parse storage key: ' + key);
        }
        const protocol = match[1];
        const parser = StorageKeyParser.parsers.get(protocol);
        if (!parser) {
            throw new Error(`Unknown storage key protocol ${protocol} in key ${key}.`);
        }
        return parser(key, StorageKeyParser.parse);
    }
    static reset() {
        this.parsers = this.getDefaultParsers();
    }
    static addParser(protocol, parser) {
        if (this.parsers.has(protocol)) {
            throw new Error(`Parser for storage key protocol ${protocol} already exists.`);
        }
        this.parsers.set(protocol, parser);
    }
}
StorageKeyParser.parsers = StorageKeyParser.getDefaultParsers();
//# sourceMappingURL=storage-key-parser.js.map