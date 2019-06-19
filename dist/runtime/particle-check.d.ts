/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ParticleCheckStatement, ParticleCheckHasTag, ParticleCheckIsFromHandle } from './manifest-ast-nodes';
import { HandleConnectionSpec } from './particle-spec';
/** The different types of trust checks that particles can make. */
export declare enum CheckType {
    HasTag = "has-tag",
    IsFromHandle = "is-from-handle"
}
export declare class Check {
    readonly handle: HandleConnectionSpec;
    readonly conditions: readonly CheckCondition[];
    constructor(handle: HandleConnectionSpec, conditions: readonly CheckCondition[]);
    toManifestString(): string;
}
export declare type CheckCondition = CheckHasTag | CheckIsFromHandle;
export declare class CheckHasTag {
    readonly tag: string;
    readonly type: CheckType.HasTag;
    constructor(tag: string);
    static fromASTNode(astNode: ParticleCheckHasTag): CheckHasTag;
    toManifestString(): string;
}
export declare class CheckIsFromHandle {
    readonly parentHandle: HandleConnectionSpec;
    readonly type: CheckType.IsFromHandle;
    constructor(parentHandle: HandleConnectionSpec);
    static fromASTNode(astNode: ParticleCheckIsFromHandle, handleConnectionMap: Map<string, HandleConnectionSpec>): CheckIsFromHandle;
    toManifestString(): string;
}
export declare function createCheck(handle: HandleConnectionSpec, astNode: ParticleCheckStatement, handleConnectionMap: Map<string, HandleConnectionSpec>): Check;
