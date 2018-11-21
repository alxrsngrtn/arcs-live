import { SlotComposer } from './slot-composer.js';
import { Suggestion } from './plan/suggestion';
export declare class SuggestionComposer {
    private _affordance;
    private _container;
    private readonly _slotComposer;
    private _suggestions;
    private _suggestionsQueue;
    private _updateComplete;
    private _suggestConsumers;
    constructor(slotComposer: SlotComposer);
    setSuggestions(suggestions: Suggestion[]): Promise<void>;
    clear(): void;
    private _updateSuggestions;
    private _addInlineSuggestion;
}
