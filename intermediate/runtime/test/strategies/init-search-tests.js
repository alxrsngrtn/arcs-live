/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { InitSearch } from '../../strategies/init-search.js';
import { assert } from '../chai-web.js';
describe('InitSearch', () => __awaiter(this, void 0, void 0, function* () {
    it('initializes the search recipe', () => __awaiter(this, void 0, void 0, function* () {
        let initSearch = new InitSearch(null, { search: 'search' });
        let inputParams = { generated: [], generation: 0 };
        let results = yield initSearch.generate(inputParams);
        assert.lengthOf(results, 1);
        assert.equal(results[0].score, 0);
    }));
}));
