/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/assert-web.js';
import { DevtoolsConnection } from '../../devtools-connector/devtools-connection.js';
import { PlanningExplorerAdapter } from '../debug/planning-explorer-adapter.js';
import { StrategyExplorerAdapter } from '../debug/strategy-explorer-adapter.js';
import { SuggestionComposer } from '../suggestion-composer.js';
import { PlanningResult } from './planning-result.js';
import { SuggestFilter } from './suggest-filter.js';
export class PlanConsumer {
    constructor(arc, result) {
        this.suggestFilter = new SuggestFilter(false);
        // Callback is triggered when planning results have changed.
        this.suggestionsChangeCallbacks = [];
        // Callback is triggered when suggestions visible to the user have changed.
        this.visibleSuggestionsChangeCallbacks = [];
        this.suggestionComposer = null;
        this.currentSuggestions = [];
        this.devtoolsChannel = null;
        assert(arc, 'arc cannot be null');
        assert(result, 'result cannot be null');
        this.arc = arc;
        this.result = result;
        this.suggestionsChangeCallbacks = [];
        this.visibleSuggestionsChangeCallbacks = [];
        this._initSuggestionComposer();
        this.result.registerChangeCallback(() => this.onSuggestionsChanged());
        if (DevtoolsConnection.isConnected) {
            this.devtoolsChannel = DevtoolsConnection.get().forArc(this.arc);
        }
        this._maybeUpdateStrategyExplorer();
    }
    registerSuggestionsChangedCallback(callback) { this.suggestionsChangeCallbacks.push(callback); }
    registerVisibleSuggestionsChangedCallback(callback) { this.visibleSuggestionsChangeCallbacks.push(callback); }
    setSuggestFilter(showAll, search) {
        assert(!showAll || !search);
        if (this.suggestFilter.isEquivalent(showAll, search)) {
            return;
        }
        this.suggestFilter = new SuggestFilter(showAll, search);
        this._onMaybeSuggestionsChanged();
    }
    onSuggestionsChanged() {
        this._onSuggestionsChanged();
        this._onMaybeSuggestionsChanged();
        this._maybeUpdateStrategyExplorer();
    }
    getCurrentSuggestions(options) {
        return this.result.suggestions.filter(suggestion => {
            const suggestOption = options && options.reasons ? { reasons: [] } : undefined;
            const isVisible = suggestion.isVisible(this.arc, this.suggestFilter, suggestOption);
            if (!isVisible && suggestOption) {
                options.reasons.set(suggestion.hash, suggestOption);
            }
            return isVisible;
        });
    }
    dispose() {
        this.suggestionsChangeCallbacks = [];
        this.visibleSuggestionsChangeCallbacks = [];
        if (this.suggestionComposer) {
            this.suggestionComposer.clear();
        }
    }
    _onSuggestionsChanged() {
        this.suggestionsChangeCallbacks.forEach(callback => callback({ suggestions: this.result.suggestions }));
        PlanningExplorerAdapter.updatePlanningResults(this.result, {}, this.devtoolsChannel);
    }
    _onMaybeSuggestionsChanged() {
        const options = this.devtoolsChannel ? { reasons: new Map() } : undefined;
        const suggestions = this.getCurrentSuggestions(options);
        if (!PlanningResult.isEquivalent(this.currentSuggestions, suggestions)) {
            this.visibleSuggestionsChangeCallbacks.forEach(callback => callback(suggestions));
            this.currentSuggestions = suggestions;
            PlanningExplorerAdapter.updateVisibleSuggestions(this.currentSuggestions, options, this.devtoolsChannel);
        }
    }
    _initSuggestionComposer() {
        const composer = this.arc.pec.slotComposer;
        if (composer && composer.findContextById('rootslotid-suggestions')) {
            this.suggestionComposer = new SuggestionComposer(this.arc, composer);
            this.registerVisibleSuggestionsChangedCallback((suggestions) => this.suggestionComposer.setSuggestions(suggestions));
        }
    }
    _maybeUpdateStrategyExplorer() {
        if (this.result.generations.length) {
            StrategyExplorerAdapter.processGenerations(this.result.generations, this.devtoolsChannel, { label: 'Plan Consumer', keep: true });
        }
    }
}
//# sourceMappingURL=plan-consumer.js.map