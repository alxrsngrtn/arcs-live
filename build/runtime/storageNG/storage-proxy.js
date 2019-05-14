/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * TODO: describe this class. And add some tests.
 */
export class StorageProxy {
    constructor(crdt) {
        this.handles = [];
        this.crdt = crdt;
    }
    registerHandle(h) {
        this.handles.push(h);
        return new Map(this.crdt.getData().version);
    }
    applyOp(op) {
        return this.crdt.applyOperation(op);
    }
    getParticleView() {
        return this.crdt.getParticleView();
    }
}
//# sourceMappingURL=storage-proxy.js.map