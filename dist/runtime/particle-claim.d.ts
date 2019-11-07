/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { HandleConnectionSpec } from './particle-spec.js';
import { ParticleClaimIsTag, ParticleClaimDerivesFrom, ParticleClaimStatement } from './manifest-ast-nodes.js';
/** The different types of trust claims that particles can make. */
export declare enum ClaimType {
    IsTag = "is-tag",
    DerivesFrom = "derives-from"
}
/** A list of claims made by a particle on a specific handle. */
export declare class ParticleClaim {
    readonly handle: HandleConnectionSpec;
    readonly claims: Claim[];
    constructor(handle: HandleConnectionSpec, claims: Claim[]);
    toManifestString(): string;
}
/** A specific claim, either a single tag or a single handle derivation. */
export declare type Claim = ClaimIsTag | ClaimDerivesFrom;
export declare class ClaimIsTag {
    readonly isNot: boolean;
    readonly tag: string;
    readonly type: ClaimType.IsTag;
    constructor(isNot: boolean, tag: string);
    static fromASTNode(astNode: ParticleClaimIsTag): ClaimIsTag;
    toManifestString(): string;
}
export declare class ClaimDerivesFrom {
    readonly parentHandle: HandleConnectionSpec;
    readonly type: ClaimType.DerivesFrom;
    constructor(parentHandle: HandleConnectionSpec);
    static fromASTNode(astNode: ParticleClaimDerivesFrom, handleConnectionMap: Map<string, HandleConnectionSpec>): ClaimDerivesFrom;
    toManifestString(): string;
}
export declare function createParticleClaim(handle: HandleConnectionSpec, astNode: ParticleClaimStatement, handleConnectionMap: Map<string, HandleConnectionSpec>): ParticleClaim;
