/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/assert-web.js';
import { PlanConsumer } from './plan-consumer.js';
import { PlanProducer } from './plan-producer.js';
import { ReplanQueue } from './replan-queue.js';
import { Schema } from '../schema.js';
import { Type } from '../type.js';
export class Planificator {
    constructor(arc, userid, store, searchStore, onlyConsumer, debug) {
        this.search = null;
        // In <0.6 shell, this is needed to backward compatibility, in order to (1)
        // (1) trigger replanning with a local producer and (2) notify shell of the
        // last activated plan, to allow serialization.
        // TODO(mmandlis): Is this really needed in the >0.6 shell?
        this.arcCallback = this._onPlanInstantiated.bind(this);
        this.arc = arc;
        this.userid = userid;
        this.searchStore = searchStore;
        if (!onlyConsumer) {
            this.producer = new PlanProducer(arc, store, searchStore, { debug });
            this.replanQueue = new ReplanQueue(this.producer);
            this.dataChangeCallback = () => this.replanQueue.addChange();
            this._listenToArcStores();
        }
        this.consumer = new PlanConsumer(arc, store);
        this.lastActivatedPlan = null;
        this.arc.registerInstantiatePlanCallback(this.arcCallback);
    }
    static async create(arc, { userid, storageKeyBase, onlyConsumer, debug = false }) {
        debug = debug || (storageKeyBase && storageKeyBase.startsWith('volatile'));
        const store = await Planificator._initSuggestStore(arc, { userid, storageKeyBase });
        const searchStore = await Planificator._initSearchStore(arc, { userid, storageKeyBase: null });
        const planificator = new Planificator(arc, userid, store, searchStore, onlyConsumer, debug);
        // TODO(mmandlis): Switch to always use `contextual: true` once new arc doesn't need
        // to produce a plan in order to instantiate it.
        planificator.requestPlanning({ contextual: planificator.isArcPopulated() });
        return planificator;
    }
    async requestPlanning(options = {}) {
        if (!this.consumerOnly) {
            await this.producer.produceSuggestions(options);
        }
    }
    get consumerOnly() { return !Boolean(this.producer); }
    async loadSuggestions() {
        return this.consumer.loadSuggestions();
    }
    async setSearch(search) {
        search = search ? search.toLowerCase().trim() : null;
        search = (search !== '') ? search : null;
        if (this.search !== search) {
            this.search = search;
            await this._storeSearch();
            const showAll = this.search === '*';
            const filter = showAll ? null : this.search;
            this.consumer.setSuggestFilter(showAll, filter);
        }
    }
    get arcKey() {
        return this.arc.storageKey.substring(this.arc.storageKey.lastIndexOf('/') + 1);
    }
    registerSuggestionsChangedCallback(callback) {
        this.consumer.registerSuggestionsChangedCallback(callback);
    }
    registerVisibleSuggestionsChangedCallback(callback) {
        this.consumer.registerVisibleSuggestionsChangedCallback(callback);
    }
    dispose() {
        this.arc.unregisterInstantiatePlanCallback(this.arcCallback);
        if (!this.consumerOnly) {
            this._unlistenToArcStores();
            this.producer.dispose();
        }
        this.consumer.store.dispose();
        this.consumer.dispose();
    }
    getLastActivatedPlan() {
        return { plan: this.lastActivatedPlan };
    }
    _onPlanInstantiated(plan) {
        this.lastActivatedPlan = plan;
        this.requestPlanning();
    }
    _listenToArcStores() {
        this.arc.onDataChange(this.dataChangeCallback, this);
        this.arc.context.allStores.forEach(store => {
            if (store.on) { // #2141: some are StorageStubs.
                store.on('change', this.dataChangeCallback, this);
            }
        });
    }
    _unlistenToArcStores() {
        this.arc.clearDataChange(this);
        this.arc.context.allStores.forEach(store => {
            if (store.off) { // #2141: some are StorageStubs.
                store.off('change', this.dataChangeCallback);
            }
        });
    }
    static async _initSuggestStore(arc, { userid, storageKeyBase }) {
        assert(userid, 'Missing user id.');
        const location = arc.storageProviderFactory.parseStringAsKey(arc.storageKey).location;
        // Construct a new key based on the storageKeyBase
        // Use '/dummylocation' suffix because Volatile keys require it.
        const storageKey = storageKeyBase
            ? arc.storageProviderFactory.parseStringAsKey(storageKeyBase + '/dummylocation')
            : arc.storageProviderFactory.parseStringAsKey(arc.storageKey);
        // Backward compatibility for shell older than 0_6_0.
        storageKey.location = location.includes('/arcs/')
            ? location.replace(/\/arcs\/([a-zA-Z0-9_\-]+)$/, `/users/${userid}/suggestions/$1`)
            : location.replace(/\/([a-zA-Z0-9_\-]+)$/, `/suggestions/${userid}/$1`);
        const schema = new Schema({ names: ['Suggestions'], fields: { current: 'Object' } });
        const type = Type.newEntity(schema);
        return Planificator._initStore(arc, 'suggestions-id', type, storageKey);
    }
    static async _initSearchStore(arc, { userid, storageKeyBase }) {
        assert(userid, 'Missing user id.');
        const location = arc.storageProviderFactory.parseStringAsKey(arc.storageKey).location;
        // Construct a new key based on the storageKeyBase
        const storageKey = storageKeyBase
            ? arc.storageProviderFactory.parseStringAsKey(storageKeyBase + '/dummylocation')
            : arc.storageProviderFactory.parseStringAsKey(arc.storageKey);
        storageKey.location = location.includes('/arcs/')
            ? location.replace(/\/arcs\/([a-zA-Z0-9_\-]+)$/, `/users/${userid}/search`)
            : location.replace(/\/([a-zA-Z0-9_\-]+)$/, `/suggestions/${userid}/search`);
        const schema = new Schema({ names: ['Search'], fields: { current: 'Object' } });
        const type = Type.newEntity(schema);
        return Planificator._initStore(arc, 'search-id', type, storageKey);
    }
    static async _initStore(arc, id, type, storageKey) {
        const store = await arc.storageProviderFactory.connectOrConstruct(id, type, storageKey.toString());
        assert(store, `Failed initializing '${storageKey.toString()}' store.`);
        store.referenceMode = false;
        return store;
    }
    async _storeSearch() {
        const values = await this.searchStore['get']() || [];
        const newValues = [];
        for (const { arc, search } of values) {
            if (arc !== this.arcKey) {
                newValues.push({ arc, search });
            }
        }
        if (this.search) {
            newValues.push({ search: this.search, arc: this.arcKey });
        }
        return this.searchStore['set'](newValues);
    }
    isArcPopulated() {
        if (this.arc.recipes.length === 0)
            return false;
        if (this.arc.recipes.length === 1) {
            const [recipe] = this.arc.recipes;
            if (recipe.particles.length === 0 ||
                (recipe.particles.length === 1 && recipe.particles[0].name === 'Launcher')) {
                // TODO: Check for Launcher is hacky, find a better way.
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=planificator.js.map