// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Strategy } from '../../strategizer/strategizer.js';
import { Recipe } from '../recipe/recipe.js';
import { Walker } from '../recipe/walker.js';
export class AddMissingHandles extends Strategy {
    // TODO: move generation to use an async generator.
    generate(inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return Recipe.over(this.getResults(inputParams), new class extends Walker {
                onRecipe(recipe) {
                    // Don't add use handles while there are outstanding constraints
                    if (recipe.connectionConstraints.length > 0)
                        return;
                    // Don't add use handles to a recipe with free handles
                    let freeHandles = recipe.handles.filter(handle => handle.connections.length == 0);
                    if (freeHandles.length > 0)
                        return;
                    // TODO: "description" handles are always created, and in the future they need to be "optional" (blocked by optional handles
                    // not being properly supported in arc instantiation). For now just hardcode skiping them.
                    let disconnectedConnections = recipe.handleConnections.filter(hc => hc.handle == null && !hc.isOptional && hc.name != 'descriptions' && hc.direction !== 'host');
                    if (disconnectedConnections.length == 0) {
                        return;
                    }
                    return recipe => {
                        disconnectedConnections.forEach(hc => {
                            let clonedHC = recipe.updateToClone({ hc }).hc;
                            let handle = recipe.newHandle();
                            handle.fate = '?';
                            clonedHC.connectToHandle(handle);
                        });
                        return 0;
                    };
                }
            }(Walker.Permuted), this);
        });
    }
}
