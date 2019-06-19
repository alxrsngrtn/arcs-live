/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/** The different types of trust checks that particles can make. */
export var CheckType;
(function (CheckType) {
    CheckType["HasTag"] = "has-tag";
    CheckType["IsFromHandle"] = "is-from-handle";
})(CheckType || (CheckType = {}));
export class Check {
    constructor(handle, conditions) {
        this.handle = handle;
        this.conditions = conditions;
    }
    toManifestString() {
        return `check ${this.handle.name} ${this.conditions.map(c => c.toManifestString()).join(' or ')}`;
    }
}
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
        return `is from handle ${this.parentHandle}`;
    }
}
export function createCheck(handle, astNode, handleConnectionMap) {
    const conditions = astNode.conditions.map(condition => {
        switch (condition.checkType) {
            case CheckType.HasTag:
                return CheckHasTag.fromASTNode(condition);
            case CheckType.IsFromHandle:
                return CheckIsFromHandle.fromASTNode(condition, handleConnectionMap);
            default:
                throw new Error('Unknown check type.');
        }
    });
    return new Check(handle, conditions);
}
//# sourceMappingURL=particle-check.js.map