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
import { Arc } from '../arc.js';
import { StubLoader } from '../testing/stub-loader.js';
import { Manifest } from '../manifest.js';
import { RecipeResolver } from '../recipe/recipe-resolver.js';
import { assert } from './chai-web.js';
describe('RecipeResolver', function () {
    const buildRecipe = (content) => __awaiter(this, void 0, void 0, function* () {
        let registry = {};
        let loader = new StubLoader(content);
        let manifest = yield Manifest.load('manifest', loader, { registry });
        return manifest.recipes[0];
    });
    const createArc = () => {
        return new Arc({
            id: 'test',
            slotComposer: {
                affordance: 'dom',
                getAvailableContexts: (() => {
                    return [{
                            name: 'root',
                            id: 'r0',
                            tags: ['#root'],
                            handles: [],
                            handleConnections: [],
                            spec: { isSet: false }
                        }];
                })
            }
        });
    };
    it('resolves a recipe', () => __awaiter(this, void 0, void 0, function* () {
        const arc = createArc();
        const resolver = new RecipeResolver(arc);
        const recipe = yield buildRecipe({
            manifest: `
      particle P in 'A.js'
        consume root
        affordance dom

      recipe
        P
        `
        });
        // Initially the recipe should not be normalized (after which it's srozen).
        assert.isFalse(Object.isFrozen(recipe));
        const result = yield resolver.resolve(recipe);
        // The original recipe should remain untouched and the new instance
        // should have been normalized.
        assert.isFalse(Object.isFrozen(recipe));
        assert.isTrue(Object.isFrozen(result));
        assert.isTrue(result.isResolved());
    }));
    it('returns an unresolvable recipe as unresolved', () => __awaiter(this, void 0, void 0, function* () {
        const arc = createArc();
        const resolver = new RecipeResolver(arc);
        // The recipe below is unresolvable as it's missing an
        // output handle connection.
        const recipe = yield buildRecipe({
            manifest: `
      particle P in 'A.js'
        out * {Text value} text
        consume root
        affordance dom

      recipe
        P
        `
        });
        const result = yield resolver.resolve(recipe);
        assert.isFalse(result.isResolved());
    }));
    it('returns null for an invalid recipe', () => __awaiter(this, void 0, void 0, function* () {
        const arc = createArc();
        const resolver = new RecipeResolver(arc);
        // The recipe below is invalid as it's  missing consume and affordance.
        const recipe = yield buildRecipe({
            manifest: `
      particle P in 'A.js'

      recipe
        P
        `
        });
        assert.isNull(yield resolver.resolve(recipe));
    }));
});
