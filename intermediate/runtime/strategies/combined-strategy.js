// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert } from '../../platform/assert-web.js';
import { Strategy } from '../../strategizer/strategizer.js';
import { Recipe } from '../recipe/recipe.js';
export class CombinedStrategy extends Strategy {
    constructor(strategies) {
        super();
        assert(strategies.length > 1, 'Strategies must contain at least 2 elements.');
        this._strategies = strategies;
        this._strategies.forEach(strategy => assert(strategy.walker));
        assert(this._strategies[0].getResults);
    }
    _getLeaves(results) {
        // Only use leaf recipes.
        let recipeByParent = new Map();
        let resultsList = [...results.values()];
        resultsList.forEach(r => {
            r.derivation.forEach(d => {
                if (d.parent) {
                    recipeByParent.set(d.parent, r);
                }
            });
        });
        return resultsList.filter(r => !recipeByParent.has(r));
    }
    generate(inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = this._strategies[0].getResults(inputParams);
            let totalResults = new Map();
            for (let strategy of this._strategies) {
                results = Recipe.over(results, strategy.walker, strategy);
                results = yield Promise.all(results.map((result) => __awaiter(this, void 0, void 0, function* () {
                    if (result.hash) {
                        result.hash = yield result.hash;
                    }
                    if (!totalResults.has(result.hash)) {
                        // TODO: deduping of results is already done in strategizer.
                        // It should dedup the intermeditate derivations as well.
                        totalResults.set(result.hash, result);
                    }
                    return result;
                })));
                results = this._getLeaves(totalResults);
            }
            return results;
        });
    }
}
