/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export class SlotInfo {
    constructor(formFactor, handle) {
        this.formFactor = formFactor;
        this.handle = handle;
    }
    toLiteral() {
        return this;
    }
    static fromLiteral({ formFactor, handle }) {
        return new SlotInfo(formFactor, handle);
    }
}
//# sourceMappingURL=slot-info.js.map