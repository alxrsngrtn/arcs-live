// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
import { WalkerBase, WalkerTactic } from './walker-base.js';
export class Walker extends WalkerBase {
    onResult(result) {
        super.onResult(result);
        const recipe = result.result;
        const updateList = [];
        // update phase - walk through recipe and call onRecipe,
        // onHandle, etc.
        if (this.onRecipe) {
            result = this.onRecipe(recipe, result);
            if (!this.isEmptyResult(result)) {
                updateList.push({ continuation: result });
            }
        }
        for (const particle of recipe.particles) {
            if (this.onParticle) {
                const context = [particle];
                const result = this.onParticle(recipe, ...context);
                if (!this.isEmptyResult(result)) {
                    updateList.push({ continuation: result, context });
                }
            }
        }
        for (const handleConnection of recipe.handleConnections) {
            if (this.onHandleConnection) {
                const context = [handleConnection];
                const result = this.onHandleConnection(recipe, ...context);
                if (!this.isEmptyResult(result)) {
                    updateList.push({ continuation: result, context });
                }
            }
        }
        for (const handle of recipe.handles) {
            if (this.onHandle) {
                const context = [handle];
                const result = this.onHandle(recipe, ...context);
                if (!this.isEmptyResult(result)) {
                    updateList.push({ continuation: result, context });
                }
            }
        }
        if (this.onPotentialSlotConnection) {
            for (const particle of recipe.particles) {
                for (const [name, slotSpec] of particle.getSlotSpecs()) {
                    if (particle.getSlotConnectionByName(name))
                        continue;
                    const context = [particle, slotSpec];
                    const result = this.onPotentialSlotConnection(recipe, ...context);
                    if (!this.isEmptyResult(result)) {
                        updateList.push({ continuation: result, context });
                    }
                }
            }
        }
        if (this.onSlotConnection) {
            for (const slotConnection of recipe.slotConnections) {
                const context = [slotConnection];
                const result = this.onSlotConnection(recipe, ...context);
                if (!this.isEmptyResult(result)) {
                    updateList.push({ continuation: result, context });
                }
            }
        }
        for (const slot of recipe.slots) {
            if (this.onSlot) {
                const context = [slot];
                const result = this.onSlot(recipe, ...context);
                if (!this.isEmptyResult(result)) {
                    updateList.push({ continuation: result, context });
                }
            }
        }
        for (const obligation of recipe.obligations) {
            if (this.onObligation) {
                const context = [obligation];
                const result = this.onObligation(recipe, ...context);
                if (!this.isEmptyResult(result)) {
                    updateList.push({ continuation: result, context });
                }
            }
        }
        this._runUpdateList(recipe, updateList);
    }
}
Walker.Permuted = WalkerTactic.Permuted;
Walker.Independent = WalkerTactic.Independent;
//# sourceMappingURL=walker.js.map