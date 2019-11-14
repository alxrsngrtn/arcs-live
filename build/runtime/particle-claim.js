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
/** A list of claims made by a particle on a specific handle. */
export class ParticleClaim {
    constructor(handle, claims) {
        this.handle = handle;
        this.claims = claims;
    }
    toManifestString() {
        const manifestStrings = this.claims.map(claim => claim.toManifestString());
        return `claim ${this.handle.name} ${manifestStrings.join(' and ')}`;
    }
}
export class ClaimIsTag {
    constructor(isNot, tag) {
        this.isNot = isNot;
        this.tag = tag;
        this.type = ClaimType.IsTag;
    }
    static fromASTNode(astNode) {
        return new ClaimIsTag(astNode.isNot, astNode.tag);
    }
    toManifestString() {
        return `is ${this.isNot ? 'not ' : ''}${this.tag}`;
    }
}
export class ClaimDerivesFrom {
    constructor(parentHandle) {
        this.parentHandle = parentHandle;
        this.type = ClaimType.DerivesFrom;
    }
    static fromASTNode(astNode, handleConnectionMap) {
        // Convert handle names into HandleConnectionSpec objects.
        const parentHandle = handleConnectionMap.get(astNode.parentHandle);
        if (!parentHandle) {
            throw new Error(`Unknown "derives from" handle name: ${parentHandle}.`);
        }
        return new ClaimDerivesFrom(parentHandle);
    }
    toManifestString() {
        return `derives from ${this.parentHandle.name}`;
    }
}
export function createParticleClaim(handle, astNode, handleConnectionMap) {
    const claims = astNode.expression.map(claimNode => {
        switch (claimNode.claimType) {
            case ClaimType.IsTag:
                return ClaimIsTag.fromASTNode(claimNode);
            case ClaimType.DerivesFrom:
                return ClaimDerivesFrom.fromASTNode(claimNode, handleConnectionMap);
            default:
                throw new Error('Unknown claim type.');
        }
    });
    return new ParticleClaim(handle, claims);
}
//# sourceMappingURL=particle-claim.js.map