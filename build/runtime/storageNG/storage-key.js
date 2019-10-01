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
    childKeyForArcInfo() {
        return this.childWithComponent('arc-info');
    }
    childKeyForHandle(id) {
        return this.childWithComponent(`handle/${id}`);
    }
}
//# sourceMappingURL=storage-key.js.map