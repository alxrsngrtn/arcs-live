/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../../platform/assert-web.js';
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
    static async create(arc, { userid, protocol, onlyConsumer, debug = false }) {
        debug = debug || (protocol === 'volatile');
        const store = await Planificator._initSuggestStore(arc, { userid, protocol, arcKey: null });
        const searchStore = await Planificator._initSearchStore(arc, { userid });
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
            await this._storeSearch(this.arcKey, this.search);
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
    static async _initSuggestStore(arc, { userid, protocol, arcKey }) {
        assert(userid, 'Missing user id.');
        const storage = arc.storageProviderFactory._storageForKey(arc.storageKey);
        const storageKey = storage.parseStringAsKey(arc.storageKey);
        if (protocol) {
            storageKey.protocol = protocol;
        }
        if (storageKey.location.includes('/arcs/')) {
            // Backward compatibility for shell older than 0_6_0.
            storageKey.location = storageKey['location']
                .replace(/\/arcs\/([a-zA-Z0-9_\-]+)$/, `/users/${userid}/suggestions/${arcKey || '$1'}`);
        }
        else {
            storageKey.location = storageKey.location.replace(/\/([a-zA-Z0-9_\-]+)$/, `/suggestions/$1`);
        }
        const schema = new Schema({ names: ['Suggestions'], fields: { current: 'Object' } });
        const type = Type.newEntity(schema);
        return Planificator._initStore(arc, 'suggestions-id', type, storageKey);
    }
    static async _initSearchStore(arc, { userid }) {
        const storage = arc.storageProviderFactory._storageForKey(arc.storageKey);
        const storageKey = storage.parseStringAsKey(arc.storageKey);
        if (storageKey['location'].includes('/arcs/')) {
            // Backward compatibility for shell older than 0_6_0.
            storageKey.location = storageKey.location
                .replace(/\/arcs\/([a-zA-Z0-9_\-]+)$/, `/users/${userid}/search`);
        }
        else {
            storageKey.location = storageKey.location.replace(/\/([a-zA-Z0-9_\-]+)$/, `/suggestions/${userid}/search`);
        }
        const schema = new Schema({ names: ['Search'], fields: { current: 'Object' } });
        const type = Type.newEntity(schema);
        return Planificator._initStore(arc, 'search-id', type, storageKey);
    }
    static async _initStore(arc, id, type, storageKey) {
        // TODO: unify initialization of suggestions storage.
        const storageKeyStr = storageKey.toString();
        const storage = arc.storageProviderFactory._storageForKey(storageKeyStr);
        let store = null;
        switch (storageKey.protocol) {
            case 'firebase':
                return storage['_join'](id, type, storageKeyStr, /* shoudExist= */ 'unknown', /* referenceMode= */ false);
            case 'volatile':
            case 'pouchdb':
                try {
                    store = await storage.construct(id, type, storageKeyStr);
                }
                catch (e) {
                    store = await storage.connect(id, type, storageKeyStr);
                }
                assert(store, `Failed initializing '${storageKey.protocol}' store.`);
                store.referenceMode = false;
                return store;
            default:
                throw new Error(`Unsupported protocol '${storageKey.protocol}'`);
        }
    }
    async _storeSearch(arcKey, search) {
        const values = await this.searchStore['get']() || [];
        const newValues = [];
        for (const { arc, search } of values) {
            if (arc !== arcKey) {
                newValues.push({ arc, search });
            }
        }
        newValues.push({ search: this.search, arc: this.arcKey });
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