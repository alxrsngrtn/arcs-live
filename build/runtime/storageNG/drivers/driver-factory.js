/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export var Exists;
(function (Exists) {
    Exists[Exists["ShouldExist"] = 0] = "ShouldExist";
    Exists[Exists["ShouldCreate"] = 1] = "ShouldCreate";
    Exists[Exists["MayExist"] = 2] = "MayExist";
})(Exists || (Exists = {}));
export class Driver {
    constructor(storageKey, exists) {
        this.storageKey = storageKey;
        this.exists = exists;
    }
}
export class DriverFactory {
    static driverInstance(storageKey, exists) {
        for (const provider of this.providers) {
            if (provider.willSupport(storageKey)) {
                return provider.driver(storageKey, exists);
            }
        }
        return null;
    }
    static register(storageDriverProvider) {
        this.providers.push(storageDriverProvider);
    }
    static willSupport(storageKey) {
        for (const provider of this.providers) {
            if (provider.willSupport(storageKey)) {
                return true;
            }
        }
        return false;
    }
    static clearProvidersForTesting() {
        this.providers = [];
    }
}
DriverFactory.providers = [];
//# sourceMappingURL=driver-factory.js.map