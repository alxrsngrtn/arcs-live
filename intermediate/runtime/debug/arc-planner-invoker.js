/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Planner } from '../planner.js';
import { Manifest } from '../manifest.js';
export class ArcPlannerInvoker {
    constructor(arc, devtoolsChannel) {
        this.arc = arc;
        this.planner = new Planner();
        this.planner.init(arc);
        devtoolsChannel.listen(arc, 'fetch-strategies', () => devtoolsChannel.send({
            messageType: 'fetch-strategies-result',
            messageBody: this.planner.strategizer._strategies.map(a => a.constructor.name)
        }));
        devtoolsChannel.listen(arc, 'invoke-planner', (msg) => __awaiter(this, void 0, void 0, function* () {
            return devtoolsChannel.send({
                messageType: 'invoke-planner-result',
                messageBody: yield this.invokePlanner(msg.messageBody)
            });
        }));
    }
    invokePlanner(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let strategy = this.planner.strategizer._strategies.find(s => s.constructor.name === msg.strategy);
            if (!strategy)
                return { error: 'could not find strategy' };
            let manifest;
            try {
                manifest = yield Manifest.parse(msg.recipe, { loader: this.arc._loader, fileName: 'manifest.manifest' });
            }
            catch (error) {
                return { error: error.message };
            }
            let recipe = manifest.recipes[0];
            recipe.normalize();
            let results = yield strategy.generate({
                generation: 0,
                generated: [{ result: recipe, score: 1 }],
                population: [{ result: recipe, score: 1 }],
                terminal: []
            });
            for (let result of results) {
                result.hash = yield result.hash;
                result.derivation = undefined;
                let recipe = result.result;
                result.result = recipe.toString({ showUnresolved: true });
                if (!Object.isFrozen(recipe)) {
                    let errors = new Map();
                    recipe.normalize({ errors });
                    result.errors = [...errors.keys()].map(thing => ({ id: thing.id, error: errors.get(thing) }));
                    result.normalized = recipe.toString();
                }
            }
            return { results };
        });
    }
}
