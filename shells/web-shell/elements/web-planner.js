/*
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {Xen} from '../../lib/xen.js';
import {Planificator} from '../../env/arcs.js';

const log = Xen.logFactory('WebPlanner', '#104a91');
//const error = Xen.logFactory('WebPlanner', '#104a91', 'error');

// proposed:
// metaplans -> map of plans, generations
// metaplan -> map of plans, generations, plan
// suggestions -> filtered array of (simple-)plans
// suggestion -> (simple-)plan

class WebPlanner extends Xen.Debug(Xen.Async, log) {
  static get observedAttributes() {
    return ['env', 'config', 'userid', 'arc', 'suggestion', 'search'];
  }
  getInitialState() {
    return {
      pendingPlans: [],
      invalid: 0
    };
  }
  update({config, userid, arc, search}, state) {
    const {planificator} = state;
    if (planificator && planificator.arc !== arc && planificator._arc !== arc) {
      planificator.dispose();
      state.planificator = null;
      state.search = null;
      log('planificator is disconnected and is disposing');
    }
    if (config && arc && !state.planificator) {
      this.awaitState('planificator', () => this._createPlanificator(config, arc, userid));
    }
    if (state.planificator && search !== state.search) {
      state.search = search;
      state.planificator.setSearch(state.search);
    }
  }
  async _createPlanificator(config, arc, userid) {
    const options = {
      userid,
      storageKeyBase: config.plannerStorage,
      onlyConsumer: config.plannerOnlyConsumer,
      debug: config.plannerDebug
    };
    const planificator = await Planificator.create(arc, options);
    planificator.registerSuggestionsChangedCallback(current => this._plansChanged(current, planificator.getLastActivatedPlan()));
    planificator.registerVisibleSuggestionsChangedCallback(suggestions => this._suggestionsChanged(suggestions));
    planificator.loadSuggestions && await planificator.loadSuggestions();
    window.planificator = planificator; // for debugging only
    return planificator;
  }
  _plansChanged(metaplans, metaplan) {
    log('plansChanged', metaplans, metaplan);
  }
  _suggestionsChanged(suggestions) {
    log('suggestionsChanged', suggestions);
  }
}

customElements.define('web-planner', WebPlanner);
