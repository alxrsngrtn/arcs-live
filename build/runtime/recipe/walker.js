// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
import { assert } from '../../platform/assert-web.js';
/**
 * Walkers traverse an object, calling methods based on the
 * features encountered on that object. For example, a RecipeWalker
 * takes a list of recipes and calls methods when:
 *  - a new recipe is encountered
 *  - a handle is found inside a recipe
 *  - a particle is found inside a recipe
 *  - etc..
 *
 * Each of these methods can return a list of updates:
 *   [(recipe, encountered_thing) => new_recipe]
 *
 * The walker then does something with the updates depending on the
 * tactic selected.
 *
 * If the tactic is "Permuted", then an output will be generated
 * for every combination of 1 element drawn from each update list.
 * For example, if 3 methods return [a,b], [c,d,e], and [f] respectively
 * then "Permuted" will cause 6 outputs to be generated: [acf, adf, aef, bcf, bdf, bef]
 *
 * If the tactic is "Independent", an output will be generated for each
 * update, regardless of the list the update is in. For example,
 * if 3 methods return [a,b], [c,d,e], and [f] respectively,
 * then "Independent" will cause 6 outputs to be generated: [a,b,c,d,e,f]
 */
export var WalkerTactic;
(function (WalkerTactic) {
    WalkerTactic["Permuted"] = "permuted";
    WalkerTactic["Independent"] = "independent";
})(WalkerTactic || (WalkerTactic = {}));
/**
 * An Action generates the list of Descendants by walking the object with a
 * Walker.
 */
export class Action {
    constructor(arc, args) {
        this._arc = arc;
        this._args = args;
    }
    get arc() {
        return this._arc;
    }
    getResults(inputParams) {
        return inputParams.generated;
    }
    async generate(inputParams) {
        return [];
    }
}
export class Walker {
    constructor(tactic) {
        this.descendants = [];
        assert(tactic);
        this.tactic = tactic;
    }
    onAction(action) {
        this.currentAction = action;
    }
    onResult(result) {
        this.currentResult = result;
        this.updateList = [];
    }
    onResultDone() {
        this.runUpdateList(this.currentResult.result, this.updateList);
        this.currentResult = undefined;
        this.updateList = undefined;
    }
    onActionDone() {
        this.currentAction = undefined;
    }
    static walk(results, walker, action) {
        walker.onAction(action);
        results.forEach(result => {
            walker.onResult(result);
            walker.onResultDone();
        });
        walker.onActionDone();
        return walker.descendants;
    }
    visit(visitor, ...context) {
        const continuation = visitor(this.currentResult.result, ...context);
        if (!this.isEmptyResult(continuation)) {
            this.updateList.push({
                continuation: continuation,
                context
            });
        }
    }
    runUpdateList(start, updateList) {
        const updated = [];
        if (updateList.length) {
            switch (this.tactic) {
                case WalkerTactic.Permuted: {
                    let permutations = [[]];
                    updateList.forEach(({ continuation, context }) => {
                        const newResults = [];
                        if (typeof continuation === 'function') {
                            continuation = [continuation];
                        }
                        continuation.forEach(f => {
                            permutations.forEach(p => {
                                const newP = p.slice();
                                newP.push({ continuation: f, context });
                                newResults.push(newP);
                            });
                        });
                        permutations = newResults;
                    });
                    for (let permutation of permutations) {
                        const cloneMap = new Map();
                        const newResult = start.clone(cloneMap);
                        let score = 0;
                        permutation = permutation.filter(p => p.continuation !== null);
                        if (permutation.length === 0) {
                            continue;
                        }
                        permutation.forEach(({ continuation, context }) => {
                            score = continuation(newResult, ...context.map(c => cloneMap.get(c) || c));
                        });
                        updated.push({ result: newResult, score });
                    }
                    break;
                }
                case WalkerTactic.Independent:
                    updateList.forEach(({ continuation, context }) => {
                        if (typeof continuation === 'function') {
                            continuation = [continuation];
                        }
                        let score = 0;
                        continuation.forEach(f => {
                            if (f == null) {
                                f = () => 0;
                            }
                            const cloneMap = new Map();
                            const newResult = start.clone(cloneMap);
                            score = f(newResult, ...context.map(c => cloneMap.get(c) || c));
                            updated.push({ result: newResult, score });
                        });
                    });
                    break;
                default:
                    throw new Error(`${this.tactic} not supported`);
            }
        }
        // commit phase - output results.
        for (const newResult of updated) {
            this.createDescendant(newResult.result, newResult.score);
        }
    }
    createWalkerDescendant(item, score, hash, valid) {
        assert(this.currentResult, 'no current result');
        assert(this.currentAction, 'no current action');
        if (this.currentResult.score) {
            score += this.currentResult.score;
        }
        this.descendants.push({
            result: item,
            score,
            derivation: [{ parent: this.currentResult, strategy: this.currentAction }],
            hash,
            valid,
        });
    }
    isEmptyResult(result) {
        if (!result) {
            return true;
        }
        if (result.constructor === Array && result.length <= 0) {
            return true;
        }
        assert(typeof result === 'function' || result.length);
        return false;
    }
}
// tslint:disable-next-line: variable-name
Walker.Permuted = WalkerTactic.Permuted;
// tslint:disable-next-line: variable-name
Walker.Independent = WalkerTactic.Independent;
//# sourceMappingURL=walker.js.map