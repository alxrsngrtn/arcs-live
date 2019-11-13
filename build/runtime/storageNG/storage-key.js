/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export class StorageKey {
    constructor(protocol) {
        this.protocol = protocol;
    }
    subKeyWithComponent(component) {
        return this.childWithComponent(component);
    }
    childKeyForBackingElement(id) {
        return this.childWithComponent(id);
    }
    childKeyForArcInfo() {
        return this.subKeyWithComponent('arc-info');
    }
    childKeyForHandle(id) {
        return this.subKeyWithComponent(`handle/${id}`);
    }
}
//# sourceMappingURL=storage-key.js.map