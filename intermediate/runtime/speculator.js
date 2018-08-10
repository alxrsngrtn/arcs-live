/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Relevance } from './relevance.js';
export class Speculator {
    constructor() {
        this._relevanceByHash = new Map();
    }
    speculate(arc, plan, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._relevanceByHash.has(hash)) {
                let arcStoreVersionById = arc.getStoresState();
                let relevance = this._relevanceByHash.get(hash);
                let relevanceStoreVersionById = relevance.arcState;
                if (plan.handles.every(handle => arcStoreVersionById.get(handle.id) == relevanceStoreVersionById.get(handle.id))) {
                    return relevance;
                }
            }
            let newArc = yield arc.cloneForSpeculativeExecution();
            let relevance = new Relevance(arc.getStoresState());
            let relevanceByHash = this._relevanceByHash;
            function awaitCompletion() {
                return __awaiter(this, void 0, void 0, function* () {
                    let messageCount = newArc.pec.messageCount;
                    relevance.apply(yield newArc.pec.idle);
                    // We expect two messages here, one requesting the idle status, and one answering it.
                    if (newArc.pec.messageCount !== messageCount + 2) {
                        return awaitCompletion();
                    }
                    else {
                        relevance.newArc = newArc;
                        relevanceByHash.set(hash, relevance);
                        return relevance;
                    }
                });
            }
            return newArc.instantiate(plan).then(a => awaitCompletion());
        });
    }
}
