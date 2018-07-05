/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
'use strict';

import {Manifest} from '../../manifest.js';
import {StrategyTestHelper} from './strategy-test-helper.js';
import {CoalesceRecipes} from '../../strategies/coalesce-recipes.js';
import {assert} from '../chai-web.js';

async function tryCoalesceRecipes(manifestStr) {
  let manifest = await Manifest.parse(manifestStr);
  let recipes = manifest.recipes;
  recipes.forEach(recipe => {
    recipe.normalize();
    assert.isFalse(recipe.isResolved());
  });
  let arc = StrategyTestHelper.createTestArc('test-plan-arc', manifest, 'dom');
  let inputParams = {generated: [], terminal: recipes.map(recipe => ({result: recipe, score: 1}))};
  let strategy = new CoalesceRecipes(arc);
  return await strategy.generate(inputParams);
}
async function doNotCoalesceRecipes(manifestStr) {
  let results = await tryCoalesceRecipes(manifestStr);
  assert.isEmpty(results);
}
async function doCoalesceRecipes(manifestStr) {
  let results = await tryCoalesceRecipes(manifestStr);
  assert.lengthOf(results, 1);
  return results[0].result;
}

describe('CoalesceRecipes', function() {
  it('coalesces required slots', async () => {
    let recipe = await doCoalesceRecipes(`
      particle P1
        consume root
          must provide foo

      particle P2
        consume foo

      recipe
        slot 'id0' as slot0
        P1
          consume root as slot0
      recipe
        P2
    `);

    assert.isTrue(recipe.isResolved());
    assert.lengthOf(recipe.particles, 2);
    assert.lengthOf(recipe.slots, 2);
  });

  it('coalesces required slots with handles', async () => {
    let recipe = await doCoalesceRecipes(`
      schema Thing
      schema OtherThing
      particle P1
        in Thing thing
        consume root
          must provide foo
            handle thing

      particle P2
        in Thing thing
        out OtherThing other
        consume foo

      particle P3
        out Thing thing

      recipe
        slot 'id0' as slot0
        copy 'mything' as thingHandle
        P1
          thing = thingHandle
          consume root as slot0

      recipe
        use as thingHandle
        create as otherHandle
        P2
          thing = thingHandle
          other = otherHandle
        P3
          thing = thingHandle
      
      resource MyThing
          start
          []
      store Store0 of Thing 'mything' in MyThing
    `);

    assert.isTrue(recipe.isResolved());
    assert.lengthOf(recipe.particles, 3);
    assert.lengthOf(recipe.slots, 2);
  });

  it('does not coalesce required slots if handle constraint is not met', async () => {
    await doNotCoalesceRecipes(`
      schema Thing
      particle P1
        inout Thing thing
        consume root
          must provide foo
            handle thing
      particle P2
        consume foo
      recipe
        slot 'id0' as slot0
        create as thingHandle
        P1
          thing = thingHandle
          consume root as slot0
      recipe
        P2
    `);
  });

  it('evaluates fates of handles of required slot in coalesced recipes', async () => {
    let parseManifest = async (options) => {
      return `
        schema Thing

        particle P1
          in Thing thing
          consume root
            must provide foo
              handle thing

        particle P2
          in Thing thing
          ${options.outThingB ? 'out Thing outThing' : ''}
          consume foo

        recipe A
          slot 'id0' as slot0
          ${options.fateA} as thingHandle
          P1
            thing = thingHandle
            consume root as slot0

        recipe B
          ${options.fateB ? `${options.fateB} as thingHandle` : ``}
          P2
            ${options.fateB ? 'thing = thingHandle' : ''}
            ${options.outThingB ? 'outThing = thingHandle' : ''}
      `;
    };

    await doCoalesceRecipes(await parseManifest({fateA: 'map'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'map', fateB: 'map'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'map', fateB: 'use'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'map', fateB: '?'}));
    await doNotCoalesceRecipes(await parseManifest({fateA: 'map', fateB: 'use', outThingB: true}));
    await doNotCoalesceRecipes(await parseManifest({fateA: 'map', fateB: 'copy'}));

    await doCoalesceRecipes(await parseManifest({fateA: 'copy'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'copy', fateB: 'map'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'copy', fateB: 'copy'}));
    await doNotCoalesceRecipes(await parseManifest({fateA: 'copy', fateB: 'create'}));

    await doCoalesceRecipes(await parseManifest({fateA: 'use', fateB: 'use'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'use', fateB: 'use', outThingB: true}));
    await doCoalesceRecipes(await parseManifest({fateA: 'use', fateB: '?'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'use', fateB: '?', outThingB: true}));
    await doNotCoalesceRecipes(await parseManifest({fateA: 'use', fateB: 'create'}));
    await doNotCoalesceRecipes(await parseManifest({fateA: 'use', fateB: 'map'}));
    await doNotCoalesceRecipes(await parseManifest({fateA: 'use', fateB: 'copy'}));

    await doCoalesceRecipes(await parseManifest({fateA: 'create'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'create', fateB: '?'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'create', fateB: 'use'}));
    await doCoalesceRecipes(await parseManifest({fateA: 'create', fateB: 'use', outThingB: true}));
    await doNotCoalesceRecipes(await parseManifest({fateA: 'create', fateB: 'create'}));
    await doNotCoalesceRecipes(await parseManifest({fateA: 'create', fateB: 'map'}));
    await doNotCoalesceRecipes(await parseManifest({fateA: 'create', fateB: 'copy'}));
  });
});
