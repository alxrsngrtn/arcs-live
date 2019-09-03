/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
/**
 * Returns the set delta between two lists based on direct object comparison.
 */
export function setDiff(from, to) {
    const result = { add: [], remove: [] };
    const items = new Set([...from, ...to]);
    const fromSet = new Set(from);
    const toSet = new Set(to);
    for (const item of items) {
        if (fromSet.has(item)) {
            if (toSet.has(item)) {
                continue;
            }
            result.remove.push(item);
            continue;
        }
        assert(toSet.has(item));
        result.add.push(item);
    }
    return result;
}
/**
 * Returns the set delta between two lists based on custom object comparison.
 * `keyFn` takes type T and returns the value by which items should be compared.
 */
export function setDiffCustom(from, to, keyFn) {
    const result = { add: [], remove: [] };
    const items = new Map();
    const fromSet = new Map();
    const toSet = new Map();
    for (const item of from) {
        const key = keyFn(item);
        items.set(key, item);
        fromSet.set(key, item);
    }
    for (const item of to) {
        const key = keyFn(item);
        items.set(key, item);
        toSet.set(key, item);
    }
    for (const [key, item] of items) {
        if (fromSet.has(key)) {
            if (toSet.has(key)) {
                continue;
            }
            result.remove.push(item);
            continue;
        }
        assert(toSet.has(key));
        result.add.push(item);
    }
    return result;
}
/**
 * A hack to ignore a floating promise and bypass the linter. Promises should very rarely be left floating, and when such behaviour is intended,
 * it should be clearly marked as such. See https://tsetse.info/must-use-promises.html for details.
 *
 * TODO: Remove all usages of this function and then delete it.
 */
export function floatingPromiseToAudit(promise) { }
/**
 * Noop function that can be used to supress the tsetse must-use-promises rule.
 *
 * Example Usage:
 *   async function x() {
 *     await doA();
 *     noAwait(doB());
 *   }
 */
export function noAwait(result) { }
//# sourceMappingURL=util.js.map