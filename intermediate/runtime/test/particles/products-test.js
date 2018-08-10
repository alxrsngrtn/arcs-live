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
import { assert } from '../chai-web.js';
import { TestHelper } from '../../testing/test-helper.js';
describe('products test', function () {
    let manifestFilename = './runtime/test/particles/artifacts/products-test.recipes';
    let verifyFilteredBook = (handle) => __awaiter(this, void 0, void 0, function* () {
        let list = yield handle.toList();
        assert.lengthOf(list, 1);
        assert.equal('Harry Potter', list[0].rawData.name);
    });
    it('filters', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let helper = yield TestHelper.createAndPlan({ manifestFilename });
            yield helper.acceptSuggestion({ particles: ['ProductFilter'] });
            yield helper.verifyData('ProductFilter', 'results', verifyFilteredBook);
        });
    });
    it('filters and displays', function () {
        return __awaiter(this, void 0, void 0, function* () {
            let helper = yield TestHelper.createAndPlan({ manifestFilename });
            helper.slotComposer
                .newExpectations()
                .expectRenderSlot('List', 'root', { contentTypes: ['template'] })
                .expectRenderSlot('List', 'root', { contentTypes: ['model'], verify: (content) => {
                    let verified = content.model && content.model.hasItems
                        && content.model.items['$template'].length > 0
                        && 1 == content.model.items.models.length;
                    if (verified) {
                        assert.equal('Harry Potter', helper.arc._stores[0]._model.getValue(content.model.items.models[0].id).rawData.name);
                    }
                    return verified;
                } })
                .expectRenderSlot('ShowProduct', 'item', { contentTypes: ['template', 'model'] })
                .expectRenderSlot('ItemMultiplexer', 'item', { hostedParticle: 'ShowProduct', verify: (content) => {
                    return content.model
                        && 1 == content.model.items.length
                        && 'Harry Potter' === content.model.items[0].name;
                } });
            yield helper.acceptSuggestion({ particles: ['ItemMultiplexer', 'List', 'ProductFilter'] });
            yield helper.verifyData('ProductFilter', 'results', verifyFilteredBook);
        });
    });
});
