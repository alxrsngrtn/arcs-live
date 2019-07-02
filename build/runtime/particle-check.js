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
import { assert } from '../platform/assert-web.js';
/** The different types of trust checks that particles can make. */
export var CheckType;
(function (CheckType) {
    CheckType["HasTag"] = "has-tag";
    CheckType["IsFromHandle"] = "is-from-handle";
})(CheckType || (CheckType = {}));
export class Check {
    constructor(target, expression) {
        this.target = target;
        this.expression = expression;
    }
    toManifestString() {
        let targetString;
        if (this.target instanceof HandleConnectionSpec) {
            targetString = this.target.name;
        }
        else {
            targetString = `${this.target.name} data`;
        }
        return `check ${targetString} ${this.expression.toManifestString()}`;
    }
}
/** A boolean expression inside a trust check. */
export class CheckBooleanExpression {
    constructor(type, children) {
        this.type = type;
        this.children = children;
    }
    /**
     * @inheritdoc
     * @param requireParens Indicates whether to enclose the expression inside parentheses. All nested boolean expressions must have parentheses,
     *     but a top-level expression doesn't need to.
     */
    toManifestString(requireParens = false) {
        const str = this.children.map(child => child.toManifestString(/* requireParens= */ true)).join(` ${this.type} `);
        return requireParens ? `(${str})` : str;
    }
}
/** A check condition of the form 'check x is <tag>'. */
export class CheckHasTag {
    constructor(tag) {
        this.tag = tag;
        this.type = CheckType.HasTag;
    }
    static fromASTNode(astNode) {
        return new CheckHasTag(astNode.tag);
    }
    toManifestString() {
        return `is ${this.tag}`;
    }
}
/** A check condition of the form 'check x is from handle <handle>'. */
export class CheckIsFromHandle {
    constructor(parentHandle) {
        this.parentHandle = parentHandle;
        this.type = CheckType.IsFromHandle;
    }
    static fromASTNode(astNode, handleConnectionMap) {
        const parentHandle = handleConnectionMap.get(astNode.parentHandle);
        if (!parentHandle) {
            throw new Error(`Unknown "check is from handle" handle name: ${parentHandle}.`);
        }
        return new CheckIsFromHandle(parentHandle);
    }
    toManifestString() {
        return `is from handle ${this.parentHandle.name}`;
    }
}
/** Converts the given AST node into a CheckCondition object. */
function createCheckCondition(astNode, handleConnectionMap) {
    switch (astNode.checkType) {
        case CheckType.HasTag:
            return CheckHasTag.fromASTNode(astNode);
        case CheckType.IsFromHandle:
            return CheckIsFromHandle.fromASTNode(astNode, handleConnectionMap);
        default:
            throw new Error('Unknown check type.');
    }
}
/** Converts the given AST node into a CheckExpression object. */
function createCheckExpression(astNode, handleConnectionMap) {
    if (astNode.kind === 'particle-trust-check-boolean-expression') {
        assert(astNode.children.length >= 2, 'Boolean check expressions must have at least two children.');
        return new CheckBooleanExpression(astNode.operator, astNode.children.map(child => createCheckExpression(child, handleConnectionMap)));
    }
    else {
        return createCheckCondition(astNode, handleConnectionMap);
    }
}
/** Converts the given AST node into a Check object. */
export function createCheck(checkTarget, astNode, handleConnectionMap) {
    const expression = createCheckExpression(astNode.expression, handleConnectionMap);
    return new Check(checkTarget, expression);
}
//# sourceMappingURL=particle-check.js.map