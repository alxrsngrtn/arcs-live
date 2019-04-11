/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export class CRDTError extends Error {
}
// A CRDT Change represents a delta between model states. Where possible,
// this delta should be expressed as a sequence of operations; in which case
// changeType will be ChangeType.Operations.
// Sometimes it isn't possible to express a delta as operations. In this case,
// changeType will be ChangeType.Model, and a full post-merge model will be supplied.
// A CRDT Change is parameterized by the operations that can be represented, and the data representation
// of the model.
export var ChangeType;
(function (ChangeType) {
    ChangeType[ChangeType["Operations"] = 0] = "Operations";
    ChangeType[ChangeType["Model"] = 1] = "Model";
})(ChangeType || (ChangeType = {}));
//# sourceMappingURL=crdt.js.map