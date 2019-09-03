/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Returns the set delta between two lists based on direct object comparison.
 */
export declare function setDiff<T>(from: T[], to: T[]): {
    add: T[];
    remove: T[];
};
/**
 * Returns the set delta between two lists based on custom object comparison.
 * `keyFn` takes type T and returns the value by which items should be compared.
 */
export declare function setDiffCustom<T, U>(from: T[], to: T[], keyFn: (T: any) => U): {
    add: T[];
    remove: T[];
};
/**
 * A hack to ignore a floating promise and bypass the linter. Promises should very rarely be left floating, and when such behaviour is intended,
 * it should be clearly marked as such. See https://tsetse.info/must-use-promises.html for details.
 *
 * TODO: Remove all usages of this function and then delete it.
 */
export declare function floatingPromiseToAudit<T>(promise: Promise<T>): void;
/**
 * Noop function that can be used to supress the tsetse must-use-promises rule.
 *
 * Example Usage:
 *   async function x() {
 *     await doA();
 *     noAwait(doB());
 *   }
 */
export declare function noAwait(result: {
    then: Function;
}): void;
