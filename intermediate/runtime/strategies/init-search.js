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
import { Strategy } from '../../strategizer/strategizer.js';
import { Recipe } from '../recipe/recipe.js';
import { assert } from '../../platform/assert-web.js';
export class InitSearch extends Strategy {
    constructor(arc, { search }) {
        super();
        this._search = search;
    }
    generate({ generation }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._search == null || generation != 0) {
                return [];
            }
            let recipe = new Recipe();
            recipe.setSearchPhrase(this._search);
            assert(recipe.normalize());
            assert(!recipe.isResolved());
            return [{
                    result: recipe,
                    score: 0,
                    derivation: [{ strategy: this, parent: undefined }],
                    hash: recipe.digest(),
                }];
        });
    }
}
