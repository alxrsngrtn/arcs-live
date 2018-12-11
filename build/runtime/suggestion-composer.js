/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Modality } from './modality.js';
import { Suggestion } from './plan/suggestion.js';
export class SuggestionComposer {
    constructor(slotComposer) {
        this._suggestions = [];
        this._suggestConsumers = [];
        this._modality = Modality.forName(slotComposer.modality);
        this._container = slotComposer.findContainerByName('suggestions');
        this._slotComposer = slotComposer;
    }
    clear() {
        if (this._container) {
            this._modality.slotConsumerClass.clear(this._container);
        }
        this._suggestConsumers.forEach(consumer => consumer.dispose());
        this._suggestConsumers = [];
    }
    setSuggestions(suggestions) {
        this.clear();
        const sortedSuggestions = suggestions.sort(Suggestion.compare);
        for (const suggestion of sortedSuggestions) {
            // TODO(mmandlis): use modality-appropriate description.
            const suggestionContent = { template: suggestion.descriptionText };
            if (!suggestionContent) {
                throw new Error('No suggestion content available');
            }
            if (this._container) {
                this._modality.suggestionConsumerClass.render(this._container, suggestion, suggestionContent);
            }
            this._addInlineSuggestion(suggestion, suggestionContent);
        }
    }
    _addInlineSuggestion(suggestion, suggestionContent) {
        const remoteSlots = suggestion.plan.slots.filter(s => !!s.id);
        if (remoteSlots.length !== 1) {
            return;
        }
        const remoteSlot = remoteSlots[0];
        const context = this._slotComposer.findContextById(remoteSlot.id);
        if (!context) {
            throw new Error('Missing context for ' + remoteSlot.id);
        }
        if (context.spec.isSet) {
            // TODO: Inline suggestion in a set slot is not supported yet. Implement!
            return;
        }
        // Don't put suggestions in context that either (1) is a root context, (2) doesn't have
        // an actual container or (3) is not restricted to specific handles.
        if (!context.sourceSlotConsumer) {
            return;
        }
        if (context.spec.handles.length === 0) {
            return;
        }
        const handleIds = context.spec.handles.map(handleName => context.sourceSlotConsumer.consumeConn.particle.connections[handleName].handle.id);
        if (!handleIds.find(handleId => suggestion.plan.handles.find(handle => handle.id === handleId))) {
            // the suggestion doesn't use any of the handles that the context is restricted to.
            return;
        }
        const suggestConsumer = new this._modality.suggestionConsumerClass(this._slotComposer.containerKind, suggestion, suggestionContent, (eventlet) => {
            const suggestion = this._suggestions.find(s => s.hash === eventlet.data.key);
            suggestConsumer.dispose();
            if (suggestion) {
                const index = this._suggestConsumers.findIndex(consumer => consumer === suggestConsumer);
                if (index < 0) {
                    throw new Error('cannot find suggest slot context');
                }
                this._suggestConsumers.splice(index, 1);
                this._slotComposer.arc.instantiate(suggestion.plan);
            }
        });
        context.addSlotConsumer(suggestConsumer);
        this._suggestConsumers.push(suggestConsumer);
    }
}
//# sourceMappingURL=suggestion-composer.js.map