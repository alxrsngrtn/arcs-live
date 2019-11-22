/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DevtoolsConnection } from './devtools-connection.js';
export const devtoolsPlannerInspectorFactory = {
    create(planner) {
        return new DevtoolsPlannerInspector(planner);
    }
};
class DevtoolsPlannerInspector {
    constructor(planner) {
        this.arcDevtoolsChannel = null;
        void DevtoolsConnection.onceConnected.then(devtoolsChannel => {
            this.arcDevtoolsChannel = devtoolsChannel.forArc(planner.arc);
            if (planner.forceReplan) {
                this.arcDevtoolsChannel.listen('force-replan', () => void planner.forceReplan());
            }
        });
    }
    strategizingRecord(generations, options = {}) {
        if (!this.arcDevtoolsChannel)
            return;
        this.arcDevtoolsChannel.send({
            messageType: 'generations',
            messageBody: { results: generations, options }
        });
    }
    updatePlanningResults(result, metadata) {
        if (!this.arcDevtoolsChannel)
            return;
        this.arcDevtoolsChannel.send({
            messageType: 'suggestions-changed',
            messageBody: {
                suggestions: this.formatSuggestions(result.suggestions),
                lastUpdated: result.lastUpdated.getTime(),
                metadata
            }
        });
    }
    updateVisibleSuggestions(visibleSuggestions, options) {
        if (!this.arcDevtoolsChannel)
            return;
        this.arcDevtoolsChannel.send({
            messageType: 'visible-suggestions-changed',
            messageBody: {
                visibleSuggestionHashes: visibleSuggestions.map(s => s.hash),
                visibilityReasons: options ? [...options.reasons.entries()].map(e => ({ hash: e[0], ...e[1] })) : undefined
            }
        });
    }
    updatePlanningAttempt(suggestions, metadata) {
        if (!this.arcDevtoolsChannel)
            return;
        this.arcDevtoolsChannel.send({
            messageType: 'planning-attempt',
            messageBody: {
                suggestions: suggestions ? this.formatSuggestions(suggestions) : null,
                metadata
            }
        });
    }
    formatSuggestions(suggestions) {
        return suggestions.map(s => {
            const suggestionCopy = { ...s };
            suggestionCopy['particles'] = s.plan.particles.map(p => ({ name: p.name }));
            delete suggestionCopy.plan;
            return suggestionCopy;
        });
    }
}
//# sourceMappingURL=devtools-planner-inspector.js.map