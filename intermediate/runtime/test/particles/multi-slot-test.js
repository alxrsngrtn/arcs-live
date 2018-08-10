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
describe('multi-slot test', function () {
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TestHelper.createAndPlan({
                manifestFilename: './runtime/test/particles/artifacts/multi-slot-test.manifest',
                expectedNumPlans: 4,
                expectedSuggestions: ['Show question.', 'Show answer.', 'Show question and answer.', 'Show question and hints.']
            });
        });
    }
    let verifyHandler = (expectedSlotNames, particleName, slotName, content) => {
        assert.isTrue(expectedSlotNames.includes(slotName), `Unexpected slot ${slotName}`);
        assert.isTrue(content.template.includes(`{{${slotName}}}`));
        let exclude = slotName == 'question' ? 'answer' : 'question';
        assert.isFalse(content.template.includes(`{{${exclude}}}`));
        assert(content.model[slotName]);
        assert(!content.model[exclude]);
    };
    it('can render question slot', () => __awaiter(this, void 0, void 0, function* () {
        let helper = yield init();
        helper.slotComposer
            .newExpectations()
            .expectRenderSlot('AskAndAnswer', 'question', { contentTypes: ['template', 'model'] });
        yield helper.acceptSuggestion({ descriptionText: 'Show question.' });
        helper.verifySlots(1, verifyHandler.bind(null, ['question']));
    }));
    it('can render question and answer slots', () => __awaiter(this, void 0, void 0, function* () {
        let helper = yield init();
        helper.slotComposer
            .newExpectations()
            .expectRenderSlot('AskAndAnswer', 'question', { contentTypes: ['template', 'model'] })
            .expectRenderSlot('AskAndAnswer', 'answer', { contentTypes: ['template', 'model'] });
        yield helper.acceptSuggestion({ descriptionText: 'Show question and answer.' });
        helper.verifySlots(2, verifyHandler.bind(null, ['question', 'answer']));
    }));
    it('can render multi set slot', () => __awaiter(this, void 0, void 0, function* () {
        let helper = yield init();
        helper.slotComposer
            .newExpectations()
            .expectRenderSlot('ShowHints', 'root', { verify: (content) => content.template.length > 0 && !content.model })
            .expectRenderSlot('ShowHints', 'root', { isOptional: true, verify: (content) => Object.keys(content).length == 0 })
            .expectRenderSlot('AskAndAnswer', 'question', { contentTypes: ['template', 'model'] })
            .expectRenderSlot('AskAndAnswer', 'hints', { contentTypes: ['template', 'model'], verify: (content) => {
                assert.deepEqual(['defaultA', 'defaultB', 'defaultC', 'defaultD', 'defaultE'], Object.keys(content.template));
                return true;
            } });
        yield helper.acceptSuggestion({ descriptionText: 'Show question and hints.' });
    }));
});
