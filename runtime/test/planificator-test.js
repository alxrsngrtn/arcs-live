/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {assert} from './chai-web.js';
import Arc from '../arc.js';
import Planificator from '../planificator.js';
import Recipe from '../recipe/recipe.js';

class TestPlanificator extends Planificator {
  constructor(arc) {
    super(arc);
    this.plannerNextResults = [];
    this.plannerPromise = null;
    this.schedulePromises = [];

    // Counts for number of times planning was requested and performed.
    this.scheduleCount = 0;
    this.planCount = 0;
  }

  async _schedulePlanning(timeout) {
    ++this.scheduleCount;
    this.schedulePromises.push(super._schedulePlanning(timeout));
  }

  async allPlanningDone() {
    return Promise.all(this.schedulePromises).then(() => this.schedulePromises = []);
  }

  async _doNextPlans(timeout) {
    ++this.planCount;
    return new Promise((resolve, reject) => {
      let plans = this.plannerNextResults.shift();
      if (plans) {
        resolve({plans, generations: []});
      } else {
        assert(!this.plannerPromise);
        this.plannerPromise = resolve;
      }
    }).then((next) => this._next = next);
  }

  plannerReturnFakeResults(planInfos) {
    let plans = [];
    planInfos.forEach(info => {
      if (!info.hash) {
        info = {hash: info};
      }
      let plan = new Recipe(`recipe${info.hash}`);
      if (!info.options || !info.options.invisible) {
        plan.newSlot('slot0').id = 'id0';
      }
      plan.normalize();
      plans.push({plan, hash: info.hash});
    });
    this.plannerReturnResults(plans);
    return plans;
  }

  plannerReturnResults(plans) {
    if (this.plannerPromise) {
      this.plannerPromise({plans, generations: []});
      this.plannerPromise = null;
    } else {
      this.plannerNextResults.push(plans);
    }
  }
}

function createPlanificator() {
  let arc = new Arc({id: 'demo-test'});
  return new TestPlanificator(arc);
}

function newPlan(name, options) {
  let plan = new Recipe(name);
  options = options || {};
  if (options.hasSlot) {
    let slot = plan.newSlot(options.hasRootSlot ? 'root' : 'slot0');
    slot.id = 'id0';
  }
  return {plan, hash: options.hash || plan.name, descriptionText: options.descriptionText};
}

describe('Planificator', function() {
  it('creates a planificator', () => {
    let planificator = createPlanificator();
    assert.lengthOf(planificator._arc._instantiatePlanCallbacks, 1);
    assert.lengthOf(planificator._arc._scheduler._idleCallbacks, 1);

    assert.isFalse(planificator.isPlanning);
    assert.equal(0, Object.keys(planificator.getLastActivatedPlan()));
    let {plans} = planificator.getCurrentPlans();
    assert.lengthOf(plans, 0);

    planificator.dispose();
    assert.lengthOf(planificator._arc._instantiatePlanCallbacks, 0);
    assert.lengthOf(planificator._arc._scheduler._idleCallbacks, 0);
    assert.lengthOf(planificator._stateChangedCallbacks, 0);
    assert.lengthOf(planificator._plansChangedCallbacks, 0);
    assert.lengthOf(planificator._suggestChangedCallbacks, 0);
  });

  it('makes replanning requests', async () => {
    let planificator = createPlanificator();
    for (let i = 0; i < 10; ++i) {
      planificator.requestPlanning();
      assert.isTrue(planificator.isPlanning);
    }

    planificator.plannerReturnFakeResults([1, 2, 3]);
    planificator.plannerReturnFakeResults([3, 4, 5, 6]);

    await planificator.allPlanningDone();

    assert.isFalse(planificator.isPlanning);
    let {plans} = planificator.getCurrentPlans();
    assert.lengthOf(plans, 4);
    assert.equal(10, planificator.scheduleCount);
    assert.equal(2, planificator.planCount);
  });

  it('replans triggered by scheduler', async () => {
    let planificator = createPlanificator();
    assert.isFalse(planificator.isPlanning);

    // Trigger replanning
    planificator._arc._scheduler._triggerIdleCallback();

    assert.isTrue(planificator.isPlanning);
    assert.lengthOf(planificator.getCurrentPlans().plans, 0);

    planificator.plannerReturnFakeResults([1, 2, 3]);
    await planificator.allPlanningDone();
    assert.isFalse(planificator.isPlanning);
    assert.lengthOf(planificator.getCurrentPlans().plans, 3);

    // Trigger replanning again.
    planificator._arc._scheduler._triggerIdleCallback();

    assert.isTrue(planificator.isPlanning);
    // Current plans are still available.
    assert.lengthOf(planificator.getCurrentPlans().plans, 3);
    planificator.suggestFilter = {showAll: true};
    assert.lengthOf(planificator.getCurrentSuggestions(), 3);
    assert.lengthOf(Object.keys(planificator._past), 0);
  });

  it('replans triggered by plan instantiation', async () => {
    let planificator = createPlanificator();
    planificator.requestPlanning();
    let plan = planificator.plannerReturnFakeResults(['test'])[0].plan;
    await planificator.allPlanningDone();
    assert.lengthOf(planificator.getCurrentSuggestions(), 1);
    assert.equal(plan, planificator.getCurrentSuggestions()[0].plan);

    planificator._arc.instantiate(plan);

    // Planning is triggered and previous suggestions are no long available.
    assert.isTrue(planificator.isPlanning);
    assert.lengthOf(planificator.getCurrentSuggestions(), 0);
    assert.equal(plan, planificator.getLastActivatedPlan().plan);
    assert.lengthOf(planificator.getLastActivatedPlan().plans, 1);
  });

  it('triggers plan and state changed callbacks', async () => {
    let planificator = createPlanificator();
    let stateChanged = 0;
    let planChanged = 0;
    let suggestChanged = 0;
    planificator.registerStateChangedCallback(() => { ++stateChanged; });
    planificator.registerPlansChangedCallback(() => { ++planChanged; });
    planificator.registerSuggestChangedCallback(() => { ++suggestChanged; });

    // Request replanning - state changes, plans do not.
    planificator.requestPlanning();
    assert.equal(1, stateChanged);
    assert.equal(0, planChanged);
    assert.equal(0, suggestChanged);

    // Planning is done and plans are set, both - state and plans change.
    let plan = planificator.plannerReturnFakeResults([1])[0].plan;
    await planificator.allPlanningDone();
    assert.equal(2, stateChanged);
    assert.equal(1, planChanged);
    assert.equal(1, suggestChanged);

    // Plan is being instantiated, both - state and plans change.
    await planificator._arc.instantiate(plan);
    assert.equal(3, stateChanged);
    assert.equal(2, planChanged);
    assert.equal(2, suggestChanged);

    // Planning is done and plans are set, both - state and plans change.
    planificator.plannerReturnFakeResults([2]);
    await planificator.allPlanningDone();
    assert.equal(4, stateChanged);
    assert.equal(3, planChanged);
    assert.equal(3, suggestChanged);

    // Request replanning - state changes, plans do not.
    planificator.requestPlanning();
    assert.equal(5, stateChanged);
    assert.equal(3, planChanged);
    assert.equal(3, suggestChanged);

    // Same plan is returned - state chagnes, plans do not.
    planificator.plannerReturnFakeResults([2]);
    await planificator.allPlanningDone();
    assert.equal(6, stateChanged);
    assert.equal(3, planChanged);
    assert.equal(3, suggestChanged);

    // Additional plan returned, but it doesn't have any slots, so not included in suggestions -
    // state and plans change, but suggestions do not.
    planificator.requestPlanning();
    planificator.plannerReturnFakeResults([2, {hash: 3, options: {invisible: true}}]);
    await planificator.allPlanningDone();
    assert.equal(8, stateChanged);
    assert.equal(4, planChanged);
    assert.equal(3, suggestChanged);
  });
  it('retrieves and filters suggestions', async () => {
    let planificator = createPlanificator();
    planificator.requestPlanning();

    let plans = [];
    let addPlan = (name, options) => {
      plans.push(newPlan(name, options));
    };
    addPlan('1', {hasSlot: false, descriptionText: 'invisible plan'});
    addPlan('2', {hasSlot: true, descriptionText: '-2- -23- -24- -25- -234- -235- -245- -2345-'});
    addPlan('3', {hasSlot: true, descriptionText: '-3- -23- -34- -35- -234- -235- -345- -2345-'});
    addPlan('4', {hasSlot: true, hasRootSlot: true, descriptionText: '-4- -24- -34- -45- -234- -245- -345- -2345-'});
    addPlan('5', {hasSlot: true, hasRootSlot: true, descriptionText: '-5- -25- -35- -45- -235- -245- -345- -2345-'});

    planificator.plannerReturnResults(plans);
    await planificator.allPlanningDone();

    assert.lengthOf(planificator.getCurrentPlans().plans, plans.length);
    assert.deepEqual(['2', '3'], planificator.getCurrentSuggestions().map(p => p.hash));

    // Search for already visible plan.
    planificator.setSearch('-3-');
    assert.deepEqual(['3'], planificator.getCurrentSuggestions().map(p => p.hash));

    // Search for otherwise nonvisible plan.
    planificator.setSearch('-4-');
    assert.deepEqual(['4'], planificator.getCurrentSuggestions().map(p => p.hash));

    // Search for a mix of visible and nonvisible plans
    planificator.setSearch('-245-');
    assert.deepEqual(['2', '4', '5'], planificator.getCurrentSuggestions().map(p => p.hash));

    // Search for all plans
    planificator.setSearch('-2345-');
    assert.deepEqual(['2', '3', '4', '5'], planificator.getCurrentSuggestions().map(p => p.hash));
    planificator.setSearch('*');
    assert.deepEqual(['2', '3', '4', '5'], planificator.getCurrentSuggestions().map(p => p.hash));

   // Search for plans that aren't available.
   planificator.setSearch('nosuchplan');
   assert.lengthOf(planificator.getCurrentSuggestions(), 0);
  });
  it('sets or appends current', function() {
    let planificator = createPlanificator();
    let planChanged = 0;
    planificator.registerPlansChangedCallback(() => { ++planChanged; });

    planificator._setCurrent({plans: [], generations: []});
    assert.lengthOf(planificator._current.plans, 0);
    assert.equal(0, planChanged);

    // Sets current plans
    planificator._setCurrent({plans: [newPlan('1'), newPlan('2')], generations: []});
    assert.deepEqual(['1', '2'], planificator._current.plans.map(p => p.hash));
    assert.equal(1, planChanged);

    // Overrides current plans
    planificator._setCurrent({plans: [newPlan('3'), newPlan('4')], generations: []});
    assert.deepEqual(['3', '4'], planificator._current.plans.map(p => p.hash));
    assert.equal(2, planChanged);

    // Appends to current plans.
    planificator._setCurrent({plans: [newPlan('3'), newPlan('5')], generations: []}, true);
    assert.deepEqual(['3', '4', '5'], planificator._current.plans.map(p => p.hash));
    assert.equal(3, planChanged);

    // Appends already existing plans.
    planificator._setCurrent({plans: [newPlan('4'), newPlan('5')], generations: []}, true);
    assert.deepEqual(['3', '4', '5'], planificator._current.plans.map(p => p.hash));
    assert.equal(3, planChanged);
    
    // Appends empty to current plans.
    planificator._setCurrent({plans: [], generations: []}, true);
    assert.deepEqual(['3', '4', '5'], planificator._current.plans.map(p => p.hash));
    assert.equal(3, planChanged);

    // Override with empty plans.
    planificator._setCurrent({plans: [], generations: []});
    assert.lengthOf(planificator._current.plans, 0);
    assert.equal(4, planChanged);
  });
});
