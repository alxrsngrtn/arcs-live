/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ParticleCheckStatement, ParticleCheckHasTag, ParticleCheckIsFromHandle } from './manifest-ast-nodes.js';
import { HandleConnectionSpec, ProvideSlotConnectionSpec } from './particle-spec.js';
/** The different types of trust checks that particles can make. */
export declare enum CheckType {
    HasTag = "has-tag",
    IsFromHandle = "is-from-handle"
}
export declare type CheckTarget = HandleConnectionSpec | ProvideSlotConnectionSpec;
export declare class Check {
    readonly target: CheckTarget;
    readonly expression: CheckExpression;
    constructor(target: CheckTarget, expression: CheckExpression);
    toManifestString(): string;
}
/** A boolean expression inside a trust check. */
export declare class CheckBooleanExpression {
    readonly type: 'or' | 'and';
    readonly children: readonly CheckExpression[];
    constructor(type: 'or' | 'and', children: readonly CheckExpression[]);
    /**
     * @inheritdoc
     * @param requireParens Indicates whether to enclose the expression inside parentheses. All nested boolean expressions must have parentheses,
     *     but a top-level expression doesn't need to.
     */
    toManifestString(requireParens?: boolean): any;
}
/** An expression inside a trust check. Can be either a boolean expression or a single check condition. */
export declare type CheckExpression = CheckBooleanExpression | CheckCondition;
/** A single check condition inside a trust check. */
export declare type CheckCondition = CheckHasTag | CheckIsFromHandle;
/** A check condition of the form 'check x is <tag>'. */
export declare class CheckHasTag {
    readonly tag: string;
    readonly type: CheckType.HasTag;
    constructor(tag: string);
    static fromASTNode(astNode: ParticleCheckHasTag): CheckHasTag;
    toManifestString(): string;
}
/** A check condition of the form 'check x is from handle <handle>'. */
export declare class CheckIsFromHandle {
    readonly parentHandle: HandleConnectionSpec;
    readonly type: CheckType.IsFromHandle;
    constructor(parentHandle: HandleConnectionSpec);
    static fromASTNode(astNode: ParticleCheckIsFromHandle, handleConnectionMap: Map<string, HandleConnectionSpec>): CheckIsFromHandle;
    toManifestString(): string;
}
/** Converts the given AST node into a Check object. */
export declare function createCheck(checkTarget: CheckTarget, astNode: ParticleCheckStatement, handleConnectionMap: Map<string, HandleConnectionSpec>): Check;
