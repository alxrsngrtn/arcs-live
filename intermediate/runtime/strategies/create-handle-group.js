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
import { Handle } from '../recipe/handle.js';
export class CreateHandleGroup extends Strategy {
    generate(inputParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return Recipe.over(this.getResults(inputParams), new class extends Walker {
                onRecipe(recipe) {
                    // Resolve constraints before assuming connections are free.
                    if (recipe.connectionConstraints.length > 0)
                        return;
                    const freeConnections = recipe.handleConnections.filter(hc => !hc.handle && !hc.isOptional);
                    let maximalGroup = null;
                    for (let writer of freeConnections.filter(hc => hc.isOutput)) {
                        let compatibleConnections = [writer];
                        let effectiveType = Handle.effectiveType(null, compatibleConnections);
                        let typeCandidate = null;
                        let involvedParticles = new Set([writer.particle]);
                        let foundSomeReader = false;
                        for (let reader of freeConnections.filter(hc => hc.isInput)) {
                            if (!involvedParticles.has(reader.particle) &&
                                (typeCandidate = Handle.effectiveType(effectiveType, [reader])) !== null) {
                                compatibleConnections.push(reader);
                                involvedParticles.add(reader.particle);
                                effectiveType = typeCandidate;
                                foundSomeReader = true;
                            }
                        }
                        // Only make a 'create' group for a writer->reader case.
                        if (!foundSomeReader)
                            continue;
                        for (let otherWriter of freeConnections.filter(hc => hc.isOutput)) {
                            if (!involvedParticles.has(otherWriter.particle) &&
                                (typeCandidate = Handle.effectiveType(effectiveType, [otherWriter])) !== null) {
                                compatibleConnections.push(otherWriter);
                                involvedParticles.add(otherWriter.particle);
                                effectiveType = typeCandidate;
                            }
                        }
                        if (!maximalGroup || compatibleConnections.length > maximalGroup.length) {
                            maximalGroup = compatibleConnections;
                        }
                    }
                    if (maximalGroup)
                        return recipe => {
                            let newHandle = recipe.newHandle();
                            newHandle.fate = 'create';
                            for (let conn of maximalGroup) {
                                let cloneConn = recipe.updateToClone({ conn }).conn;
                                cloneConn.connectToHandle(newHandle);
                            }
                        };
                }
            }(Walker.Independent), this);
        });
    }
}
