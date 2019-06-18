/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { HandleConnectionSpec } from './particle-spec';
import { ParticleClaimIsTag, ParticleClaimDerivesFrom, ParticleClaimStatement } from './manifest-ast-nodes';
/** The different types of trust claims that particles can make. */
export declare enum ClaimType {
    IsTag = "is-tag",
    DerivesFrom = "derives-from"
}
export declare type Claim = ClaimIsTag | ClaimDerivesFrom;
export declare class ClaimIsTag {
    readonly handle: HandleConnectionSpec;
    readonly tag: string;
    readonly type: ClaimType.IsTag;
    constructor(handle: HandleConnectionSpec, tag: string);
    static fromASTNode(handle: HandleConnectionSpec, astNode: ParticleClaimIsTag): ClaimIsTag;
    toManifestString(): string;
}
export declare class ClaimDerivesFrom {
    readonly handle: HandleConnectionSpec;
    readonly parentHandles: readonly HandleConnectionSpec[];
    readonly type: ClaimType.DerivesFrom;
    constructor(handle: HandleConnectionSpec, parentHandles: readonly HandleConnectionSpec[]);
    static fromASTNode(handle: HandleConnectionSpec, astNode: ParticleClaimDerivesFrom, handleConnectionMap: Map<string, HandleConnectionSpec>): ClaimDerivesFrom;
    toManifestString(): string;
}
export declare function createClaim(handle: HandleConnectionSpec, astNode: ParticleClaimStatement, handleConnectionMap: Map<string, HandleConnectionSpec>): Claim;
