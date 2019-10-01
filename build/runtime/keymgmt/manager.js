/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { WebCryptoMemoryKeyStorage } from './testing/cryptotestutils.js';
import { WebCryptoKeyGenerator, WebCryptoKeyIndexedDBStorage, } from './webcrypto.js';
export class KeyManager {
    static getGenerator() {
        return WebCryptoKeyGenerator.getInstance();
        // return AndroidWebViewKeyGenerator.getInstance()
    }
    static getStorage() {
        // TODO: move this hackery to the platform/ directory for node vs worker vs web?
        const globalScope = typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : global);
        return globalScope['indexedDB'] != null ? WebCryptoKeyIndexedDBStorage.getInstance() : WebCryptoMemoryKeyStorage.getInstance();
        // return AndroidWebViewKeyStorage.getInstance()
    }
}
//# sourceMappingURL=manager.js.map