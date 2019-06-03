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
// Interface that drivers must support.
// 
// Note the threading of a version number here; each model provided
// by the driver to the Store (using the receiver) is paired with a version,
// as is each model sent from the Store to the driver (using Driver.send()).
// 
// This threading is used to track whether driver state has changed while
// the Store is processing a particular model. send() should always fail
// if the version isn't exactly 1 greater than the current internal version.
export class Driver {
    constructor(storageKey, exists) {
        this.storageKey = storageKey;
        this.exists = exists;
    }
}
export class DriverFactory {
    static clearRegistrationsForTesting() {
        this.providers = [];
    }
    static async driverInstance(storageKey, exists) {
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
}
DriverFactory.providers = [];
//# sourceMappingURL=driver-factory.js.map