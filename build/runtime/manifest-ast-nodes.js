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
 * A base token interface for the `kind` and `location` entries. This creates
 * a TypeScript Discriminated Union for most tokens.
 */
export class BaseNode {
}
export function isCollectionType(node) {
    return node.kind === 'collection-type';
}
export function isTypeVariable(node) {
    return node.kind === 'variable-type';
}
export function isSlotType(node) {
    return node.kind === 'slot-type';
}
export function slandleType(arg) {
    if (isSlotType(arg.type)) {
        return arg.type;
    }
    if (isCollectionType(arg.type) && isSlotType(arg.type.type)) {
        return arg.type.type;
    }
    return undefined;
}
/** The different types of trust claims that particles can make. */
export var ParticleTrustClaimType;
(function (ParticleTrustClaimType) {
    ParticleTrustClaimType[ParticleTrustClaimType["IsTag"] = 0] = "IsTag";
    ParticleTrustClaimType[ParticleTrustClaimType["DerivesFrom"] = 1] = "DerivesFrom";
})(ParticleTrustClaimType || (ParticleTrustClaimType = {}));
//# sourceMappingURL=manifest-ast-nodes.js.map