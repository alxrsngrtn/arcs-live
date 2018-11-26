import { SlotComposer } from './slot-composer.js';
import { Suggestion } from './plan/suggestion';
export declare class SuggestionComposer {
    private _modality;
    private _container;
    private readonly _slotComposer;
    private _suggestions;
    private _suggestConsumers;
    constructor(slotComposer: SlotComposer);
    clear(): void;
    setSuggestions(suggestions: Suggestion[]): void;
    private _addInlineSuggestion;
}
