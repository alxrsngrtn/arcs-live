/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert } from './chai-web.js';
import { SuggestionComposer } from '../suggestion-composer.js';
import { SlotComposer } from '../slot-composer.js';
import { TestHelper } from '../testing/test-helper.js';
class TestSuggestionComposer extends SuggestionComposer {
    constructor() {
        super({ affordance: 'mock', findContainerByName: () => '<div></div>' });
        this.suggestions = [];
        this.updatesCount = 0;
        this.updateResolve = null;
    }
    _updateSuggestions(suggestions) {
        return __awaiter(this, void 0, void 0, function* () {
            ++this.updatesCount;
            return new Promise((resolve, reject) => this.updateResolve = resolve).then(() => this.suggestions = suggestions);
        });
    }
    updateDone() {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateResolve();
            return this._updateComplete;
        });
    }
}
describe('suggestion composer', function () {
    it('sets suggestions', () => __awaiter(this, void 0, void 0, function* () {
        let suggestionComposer = new TestSuggestionComposer();
        assert.isEmpty(suggestionComposer.suggestions);
        // Sets suggestions
        yield suggestionComposer.setSuggestions([1, 2, 3]);
        assert.equal(1, suggestionComposer.updatesCount);
        assert.isEmpty(suggestionComposer.suggestions);
        yield suggestionComposer.updateDone();
        assert.equal(1, suggestionComposer.updatesCount);
        assert.lengthOf(suggestionComposer.suggestions, 3);
        // Sets suggestions several times, only the latest update goes through.
        yield suggestionComposer.setSuggestions([4]);
        yield suggestionComposer.setSuggestions([5, 6]);
        yield suggestionComposer.updateDone();
        assert.equal(2, suggestionComposer.updatesCount);
        assert.lengthOf(suggestionComposer.suggestions, 2);
        yield suggestionComposer.setSuggestions([7]);
        yield suggestionComposer.setSuggestions([8]);
        yield suggestionComposer.setSuggestions([9, 10, 11]);
        yield suggestionComposer.setSuggestions([]);
        yield suggestionComposer.updateDone();
        yield suggestionComposer.updateDone();
        assert.equal(4, suggestionComposer.updatesCount);
        assert.isEmpty(suggestionComposer.suggestions);
    }));
    it('singleton suggestion slots', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = new SlotComposer({ affordance: 'mock', rootContainer: { 'root': 'dummy-container' } });
        let helper = yield TestHelper.createAndPlan({
            manifestFilename: './runtime/test/artifacts/suggestions/Cake.recipes',
            slotComposer
        });
        let suggestionComposer = new SuggestionComposer(slotComposer);
        yield suggestionComposer._updateSuggestions(helper.plans);
        assert.lengthOf(helper.plans, 1);
        assert.isEmpty(suggestionComposer._suggestConsumers);
        // Accept suggestion and replan: a suggestion consumer is created, but its content is empty.
        yield helper.acceptSuggestion({ particles: ['MakeCake'] });
        yield helper.makePlans();
        assert.lengthOf(helper.plans, 1);
        yield suggestionComposer._updateSuggestions(helper.plans);
        assert.lengthOf(suggestionComposer._suggestConsumers, 1);
        let suggestConsumer = suggestionComposer._suggestConsumers[0];
        assert.isEmpty(suggestConsumer._content);
        // set the container of the suggestion context, resulting in the suggestion being rendered.
        let suggestContext = slotComposer._contexts.find(context => context._slotConsumers.find(consumer => consumer == suggestConsumer));
        assert.isNull(suggestContext.container);
        suggestContext.container = 'dummy-container';
        yield suggestConsumer._setContentPromise;
        assert.isTrue(suggestConsumer._content.template.includes('Light candles on Tiramisu cake'));
        yield helper.acceptSuggestion({ particles: ['LightCandles'] });
        yield helper.makePlans();
        assert.isEmpty(helper.plans);
        yield suggestionComposer._updateSuggestions(helper.plans);
        assert.isEmpty(suggestionComposer._suggestConsumers);
    }));
    it('suggestion set-slots', () => __awaiter(this, void 0, void 0, function* () {
        let slotComposer = new SlotComposer({ affordance: 'mock', rootContainer: { 'root': 'dummy-container' } });
        let helper = yield TestHelper.createAndPlan({
            manifestFilename: './runtime/test/artifacts/suggestions/Cakes.recipes',
            slotComposer
        });
        let suggestionComposer = new SuggestionComposer(slotComposer);
        yield suggestionComposer._updateSuggestions(helper.plans);
        assert.lengthOf(helper.plans, 1);
        assert.isEmpty(suggestionComposer._suggestConsumers);
        yield helper.acceptSuggestion({ particles: ['List', 'CakeMuxer'] });
        yield helper.makePlans();
        assert.lengthOf(helper.plans, 1);
        let suggestContext = suggestionComposer._slotComposer._contexts.find(h => h.id == helper.plans[0].plan.slots[0].id);
        suggestContext.sourceSlotConsumer.getInnerContainer = (name) => 'dummy-container';
        yield suggestionComposer._updateSuggestions(helper.plans);
        assert.lengthOf(suggestionComposer._suggestConsumers, 1);
        let suggestConsumer = suggestionComposer._suggestConsumers[0];
        yield suggestConsumer._setContentPromise;
        assert.isTrue(suggestConsumer._content.template.includes('Light candles on Tiramisu cake'));
        yield helper.acceptSuggestion({ particles: ['LightCandles'] });
        yield helper.makePlans();
        assert.isEmpty(helper.plans);
        yield suggestionComposer._updateSuggestions(helper.plans);
        assert.isEmpty(suggestionComposer._suggestConsumers);
    }));
});
