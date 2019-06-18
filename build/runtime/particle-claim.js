/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/** The different types of trust claims that particles can make. */
export var ClaimType;
(function (ClaimType) {
    ClaimType["IsTag"] = "is-tag";
    ClaimType["DerivesFrom"] = "derives-from";
})(ClaimType || (ClaimType = {}));
export class ClaimIsTag {
    constructor(handle, tag) {
        this.handle = handle;
        this.tag = tag;
        this.type = ClaimType.IsTag;
    }
    static fromASTNode(handle, astNode) {
        return new ClaimIsTag(handle, astNode.tag);
    }
    toManifestString() {
        return `claim ${this.handle.name} is ${this.tag}`;
    }
}
export class ClaimDerivesFrom {
    constructor(handle, parentHandles) {
        this.handle = handle;
        this.parentHandles = parentHandles;
        this.type = ClaimType.DerivesFrom;
    }
    static fromASTNode(handle, astNode, handleConnectionMap) {
        // Convert handle names into HandleConnectionSpec objects.
        const parentHandles = astNode.parentHandles.map(parentHandleName => {
            const parentHandle = handleConnectionMap.get(parentHandleName);
            if (!parentHandle) {
                throw new Error(`Unknown "derives from" handle name: ${parentHandle}.`);
            }
            return parentHandle;
        });
        return new ClaimDerivesFrom(handle, parentHandles);
    }
    toManifestString() {
        return `claim ${this.handle.name} derives from ${this.parentHandles.map(h => h.name).join(' and ')}`;
    }
}
export function createClaim(handle, astNode, handleConnectionMap) {
    switch (astNode.claimType) {
        case ClaimType.IsTag:
            return ClaimIsTag.fromASTNode(handle, astNode);
        case ClaimType.DerivesFrom:
            return ClaimDerivesFrom.fromASTNode(handle, astNode, handleConnectionMap);
        default:
            throw new Error('Unknown claim type.');
    }
}
//# sourceMappingURL=particle-claim.js.map