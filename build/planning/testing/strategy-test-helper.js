/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/chai-web.js';
import { Arc } from '../../runtime/arc.js';
import { Loader } from '../../runtime/loader.js';
import { FakeSlotComposer } from '../../runtime/testing/fake-slot-composer.js';
import { RecipeIndex } from '../recipe-index.js';
import { ArcId } from '../../runtime/id.js';
export class StrategyTestHelper {
    static createTestArc(context, options = {}) {
        return new Arc({
            id: options.arcId || ArcId.newForTest('test-arc'),
            loader: options.loader || new Loader(),
            context,
            slotComposer: new FakeSlotComposer(options)
        });
    }
    static createTestStrategyArgs(arc, args) {
        return { recipeIndex: RecipeIndex.create(arc), ...args };
    }
    static run(arc, clazz, recipe) {
        return new clazz(arc).generate({ generated: [{ result: recipe, score: 1 }], terminal: [] });
    }
    static onlyResult(arc, clazz, recipe) {
        return StrategyTestHelper.run(arc, clazz, recipe).then(result => { assert.lengthOf(result, 1); return result[0].result; });
    }
    static theResults(arc, clazz, recipe) {
        return StrategyTestHelper.run(arc, clazz, recipe).then(results => results.map(result => result.result)); // chicken chicken
    }
    static noResult(arc, clazz, recipe) {
        return StrategyTestHelper.run(arc, clazz, recipe).then(result => { assert.isEmpty(result); });
    }
}
//# sourceMappingURL=strategy-test-helper.js.map