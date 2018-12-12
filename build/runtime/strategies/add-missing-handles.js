// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
import { Strategy } from '../../planning/strategizer.js';
import { Recipe } from '../recipe/recipe.js';
import { Walker } from '../recipe/walker.js';
export class AddMissingHandles extends Strategy {
    // TODO: move generation to use an async generator.
    async generate(inputParams) {
        return Recipe.over(this.getResults(inputParams), new class extends Walker {
            onRecipe(recipe) {
                // Don't add use handles while there are outstanding constraints
                if (recipe.connectionConstraints.length > 0) {
                    return undefined;
                }
                // Don't add use handles to a recipe with free handles
                if (recipe.getFreeHandles().length > 0) {
                    return undefined;
                }
                // TODO: "description" handles are always created, and in the future they need to be "optional" (blocked by optional handles
                // not being properly supported in arc instantiation). For now just hardcode skiping them.
                const disconnectedConnections = recipe.getDisconnectedConnections();
                if (disconnectedConnections.length === 0) {
                    return undefined;
                }
                return recipe => {
                    disconnectedConnections.forEach(hc => {
                        const clonedHC = recipe.updateToClone({ hc }).hc;
                        const handle = recipe.newHandle();
                        handle.fate = '?';
                        clonedHC.connectToHandle(handle);
                    });
                    return 0;
                };
            }
        }(Walker.Permuted), this);
    }
}
//# sourceMappingURL=add-missing-handles.js.map