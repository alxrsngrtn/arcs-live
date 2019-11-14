/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { StorageKey } from './storage-key.js';
export class ReferenceModeStorageKey extends StorageKey {
    constructor(backingKey, storageKey) {
        super('reference-mode');
        this.backingKey = backingKey;
        this.storageKey = storageKey;
    }
    embedKey(key) {
        return key.toString().replace(/\{/g, '{{').replace(/\}/g, '}}');
    }
    static unembedKey(key) {
        return key.replace(/\}\}/g, '}').replace(/\{\{/g, '}');
    }
    toString() {
        return `${this.protocol}://{${this.embedKey(this.backingKey)}}{${this.embedKey(this.storageKey)}}`;
    }
    childWithComponent(component) {
        return new ReferenceModeStorageKey(this.backingKey, this.storageKey.childWithComponent(component));
    }
    static fromString(key, parse) {
        const match = key.match(/^reference-mode:\/\/{((?:\}\}|[^}])+)}{((?:\}\}|[^}])+)}$/);
        if (!match) {
            throw new Error(`Not a valid ReferenceModeStorageKey: ${key}.`);
        }
        const [_, backingKey, storageKey] = match;
        return new ReferenceModeStorageKey(parse(ReferenceModeStorageKey.unembedKey(backingKey)), parse(ReferenceModeStorageKey.unembedKey(storageKey)));
    }
}
//# sourceMappingURL=reference-mode-storage-key.js.map