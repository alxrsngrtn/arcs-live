/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import {assert} from '../chai-web.js';
import {Recipe} from '../../ts-build/recipe/recipe.js';
import {TestHelper} from '../../testing/test-helper.js';
import {PlanProducer} from '../../ts-build/plan/plan-producer.js';
import {Planificator} from '../../ts-build/plan/planificator.js';
import {Suggestion} from '../../ts-build/plan/suggestion.js';

class TestPlanProducer extends PlanProducer {
  constructor(arc, store) {
    super(arc, store);
    this.produceCalledCount = 0;
    this.plannerRunOptions = [];
    this.cancelCount = 0;
    this.producePromises = [];
    this.plannerNextResults = [];
    this.plannerPromise = null;
  }

  async producePlans(options) {
    ++this.produceCalledCount;
    this.producePromises.push(super.producePlans(options));
  }

  _cancelPlanning() {
    ++this.cancelCount;
    this.plannerPromise(null);
    this.plannerPromise = null;
    super._cancelPlanning();
  }

  async allPlanningDone() {
    return Promise.all(this.producePromises).then(() => this.producePromises = []);
  }

  async runPlanner(options) {
    this.plannerRunOptions.push(options);
    return new Promise((resolve, reject) => {
      const plans = this.plannerNextResults.shift();
      if (plans) {
        resolve(plans);
      } else {
        assert(!this.plannerPromise);
        this.plannerPromise = resolve;
      }
    }).then(plans => plans);
  }

  get plannerRunCount() { return this.plannerRunOptions.length; }

  plannerReturnFakeResults(planInfos) {
    const plans = [];
    planInfos.forEach(info => {
      if (!info.hash) {
        info = {hash: info};
      }
      const plan = new Recipe(`recipe${info.hash}`);
      if (!info.options || !info.options.invisible) {
        plan.newSlot('slot0').id = 'id0';
      }
      plan.normalize();
      const suggestion = new Suggestion(plan, info.hash, info.rank || 0, this.arc);
      plans.push(suggestion);
    });
    this.plannerReturnResults(plans);
    return plans;
  }

  plannerReturnResults(plans) {
    if (this.plannerPromise) {
      this.plannerPromise(plans);
      this.plannerPromise = null;
    } else {
      this.plannerNextResults.push(plans);
    }
  }
}

describe('plan producer', function() {
  async function createProducer(manifestFilename) {
    const helper = await TestHelper.createAndPlan({
      manifestFilename: './runtime/test/artifacts/Products/Products.recipes'
    });
    helper.arc.storageKey = 'firebase://xxx.firebaseio.com/yyy/serialization/zzz';
    const store = await Planificator._initSuggestStore(helper.arc, {userid: 'TestUser', protocol: 'volatile'});
    assert.isNotNull(store);
    const producer = new TestPlanProducer(helper.arc, store);
    return {helper, producer};
  }
  it('produces plans', async () => {
    const {helper, producer} = await createProducer('./runtime/test/artifacts/Products/Products.recipes');
    assert.lengthOf(producer.result.plans, 0);

    await producer.producePlans();
    assert.lengthOf(producer.result.plans, 0);

    producer.plannerReturnFakeResults(helper.plans);
    await producer.allPlanningDone();
    assert.lengthOf(producer.result.plans, 1);
    assert.equal(producer.produceCalledCount, 1);
    assert.equal(producer.plannerRunCount, 1);
    assert.equal(producer.cancelCount, 0);
  });
  
  it('throttles requests to produce plans', async () => {
    const {helper, producer} = await createProducer('./runtime/test/artifacts/Products/Products.recipes');
    assert.lengthOf(producer.result.plans, 0);

    for (let i = 0; i < 10; ++i) {
      producer.producePlans({test: i});
    }

    producer.plannerReturnFakeResults(helper.plans);
    producer.plannerReturnFakeResults(helper.plans);
    await producer.allPlanningDone();
    assert.equal(producer.produceCalledCount, 10);
    assert.equal(producer.plannerRunCount, 2);
    assert.equal(producer.cancelCount, 0);
    assert.equal(0, producer.plannerRunOptions[0].test);
    assert.equal(9, producer.plannerRunOptions[1].test);
  });

  it('cancels planning', async () => {
    const {helper, producer} = await createProducer('./runtime/test/artifacts/Products/Products.recipes');
    assert.lengthOf(producer.result.plans, 0);

    producer.producePlans();
    producer.producePlans({cancelOngoingPlanning: true});

    producer.plannerReturnFakeResults(helper.plans);
    await producer.allPlanningDone();
    assert.equal(producer.produceCalledCount, 2);
    assert.equal(producer.plannerRunCount, 2);
    assert.equal(producer.cancelCount, 1);
  });
});

describe('plan producer - search', function() {
  const arcKey = '123';
  class TestSearchPlanProducer extends PlanProducer {
    constructor(searchStore) {
      super({}, {}, searchStore);
      this.producePlansCalled = 0;
    }
    get arcKey() { return arcKey; }

    producePlans(options) {
      this.producePlansCalled++;
      this.options = options;
    }
    setNextSearch(search) {
      this.searchStore.values = [{arc: arcKey, search}];
      return this.onSearchChanged();
    }
  }

  function init() {
    const searchStore = {on: () => {}};
    searchStore.get = () => searchStore.values;
    const producer = new TestSearchPlanProducer(searchStore);
    assert.isUndefined(producer.search);
    assert.equal(producer.producePlansCalled, 0);
    return producer;
  }

  it('searches all', async () => {
    const producer = init();

    // Search for non-contextual results.
    await producer.setNextSearch('*');
    assert.equal('*', producer.search);
    assert.equal(producer.producePlansCalled, 1);
    assert.isFalse(producer.options.contextual);
    assert.isFalse(Boolean(producer.options.append));

    // Unchanged search term.
    await producer.setNextSearch('*');
    assert.equal('*', producer.search);
    assert.equal(producer.producePlansCalled, 1);

    // Requires contextual results only, no need to replan.
    await producer.setNextSearch('');
    assert.equal('', producer.search);
    assert.equal(producer.producePlansCalled, 1);
  });

  it('searches for term given contextual results', async () => {
    const producer = init();

    // Search for a given string
    const search = 'foo';
    await producer.setNextSearch(search);
    assert.equal(search, producer.search);
    assert.equal(producer.producePlansCalled, 1);
    assert.equal(search, producer.options.search);
    assert.isFalse(producer.options.contextual);
    assert.isFalse(Boolean(producer.options.append));
  });

  it('searches for term given non-contextual results', async () => {
    const producer = init();
    producer.result.contextual = false;

    // Search for a given string
    const search = 'foo';
    await producer.setNextSearch(search);
    assert.equal(search, producer.search);
    assert.equal(producer.producePlansCalled, 1);
    assert.equal(search, producer.options.search);
    assert.isTrue(producer.options.append);
    assert.isTrue(producer.options.strategies.map(s => s.name).includes('InitSearch'));
  });
});
