/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../../runtime/arc.js';
import { Consumer } from '../../runtime/hot.js';
import { SuggestionComposer } from '../suggestion-composer.js';
import { PlanningResult } from './planning-result.js';
import { Suggestion, SuggestionVisibilityOptions } from './suggestion.js';
import { SuggestFilter } from './suggest-filter.js';
import { PlannerInspector } from '../planner-inspector.js';
export declare type VisibilityOptions = {
    reasons?: Map<string, SuggestionVisibilityOptions>;
};
export declare class PlanConsumer {
    readonly arc: Arc;
    result: PlanningResult;
    suggestFilter: SuggestFilter;
    private suggestionsChangeCallbacks;
    private visibleSuggestionsChangeCallbacks;
    suggestionComposer: SuggestionComposer | null;
    currentSuggestions: Suggestion[];
    readonly inspector?: PlannerInspector;
    constructor(arc: Arc, result: PlanningResult, inspector?: PlannerInspector);
    registerSuggestionsChangedCallback(callback: Consumer<{
        suggestions: Suggestion[];
    }>): void;
    registerVisibleSuggestionsChangedCallback(callback: Consumer<Suggestion[]>): void;
    setSuggestFilter(showAll: boolean, search?: string): void;
    onSuggestionsChanged(): void;
    getCurrentSuggestions(options?: VisibilityOptions): Suggestion[];
    dispose(): void;
    private _onSuggestionsChanged;
    private _onMaybeSuggestionsChanged;
    private _initSuggestionComposer;
    private _maybeUpdateStrategyExplorer;
}
