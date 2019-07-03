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
export class Claim {
    constructor(handle, expression) {
        this.handle = handle;
        this.expression = expression;
    }
    toManifestString() {
        return `claim ${this.handle.name} ${this.expression.toManifestString()}`;
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
    constructor(parentHandles) {
        this.parentHandles = parentHandles;
        this.type = ClaimType.DerivesFrom;
    }
    static fromASTNode(astNode, handleConnectionMap) {
        // Convert handle names into HandleConnectionSpec objects.
        const parentHandles = astNode.parentHandles.map(parentHandleName => {
            const parentHandle = handleConnectionMap.get(parentHandleName);
            if (!parentHandle) {
                throw new Error(`Unknown "derives from" handle name: ${parentHandle}.`);
            }
            return parentHandle;
        });
        return new ClaimDerivesFrom(parentHandles);
    }
    toManifestString() {
        return `derives from ${this.parentHandles.map(h => h.name).join(' and ')}`;
    }
}
export function createClaim(handle, astNode, handleConnectionMap) {
    let expression;
    switch (astNode.expression.claimType) {
        case ClaimType.IsTag:
            expression = ClaimIsTag.fromASTNode(astNode.expression);
            break;
        case ClaimType.DerivesFrom:
            expression = ClaimDerivesFrom.fromASTNode(astNode.expression, handleConnectionMap);
            break;
        default:
            throw new Error('Unknown claim type.');
    }
    return new Claim(handle, expression);
}
//# sourceMappingURL=particle-claim.js.map