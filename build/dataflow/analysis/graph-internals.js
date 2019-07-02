/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/** Represents a node in a FlowGraph. Can be a particle, handle, etc. */
export class Node {
    get inNodes() {
        return this.inEdges.map(e => e.start);
    }
    get outNodes() {
        return this.outEdges.map(e => e.end);
    }
}
//# sourceMappingURL=graph-internals.js.map