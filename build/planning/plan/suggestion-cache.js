/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export class SuggestionCache {
    constructor(planningResult) {
        this.suggestionByHash = {};
        if (planningResult) {
            for (const suggestion of planningResult.suggestions) {
                this.suggestionByHash[suggestion.hash] = suggestion;
            }
        }
    }
    getSuggestion(hash, plan, arc) {
        const suggestion = this.suggestionByHash[hash];
        if (suggestion) {
            const arcVersionByStoreId = arc.getVersionByStore({ includeArc: true, includeContext: true });
            if (plan.handles.every(handle => arcVersionByStoreId[handle.id] === suggestion.versionByStore[handle.id])) {
                return suggestion;
            }
        }
        return undefined;
    }
    setSuggestion(hash, suggestion) {
        this.suggestionByHash[hash] = suggestion;
    }
}
//# sourceMappingURL=suggestion-cache.js.map