/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../arc.js';
import { PlanningResult } from './planning-result.js';
import { StorageProviderBase } from '../storage/storage-provider-base.js';
import { Suggestion } from './suggestion.js';
import { SuggestionComposer } from '../suggestion-composer.js';
declare type Callback = ({}: {}) => void;
export declare class PlanConsumer {
    arc: Arc;
    result: PlanningResult;
    store: StorageProviderBase;
    suggestFilter: {};
    suggestionsChangeCallbacks: Callback[];
    visibleSuggestionsChangeCallbacks: Callback[];
    storeCallback: Callback;
    suggestionComposer: SuggestionComposer | null;
    constructor(arc: Arc, store: StorageProviderBase);
    registerSuggestionsChangedCallback(callback: any): void;
    registerVisibleSuggestionsChangedCallback(callback: any): void;
    setSuggestFilter(showAll: any, search: any): void;
    loadSuggestions(): Promise<void>;
    getCurrentSuggestions(): Suggestion[];
    dispose(): void;
    _onSuggestionsChanged(): void;
    _onMaybeSuggestionsChanged(previousSuggestions: any): void;
    _initSuggestionComposer(): void;
}
export {};
