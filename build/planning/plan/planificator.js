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
import { StorageProviderBase } from "../../runtime/storage/storage-provider-base.js";
import { EntityType } from '../../runtime/type.js';
import { PlanningExplorerAdapter } from '../debug/planning-explorer-adapter.js';
import { PlanConsumer } from './plan-consumer.js';
import { PlanProducer, Trigger } from './plan-producer.js';
import { PlanningResult } from './planning-result.js';
import { ReplanQueue } from './replan-queue.js';
export class Planificator {
    constructor(arc, userid, result, searchStore, onlyConsumer = false, debug = false) {
        this.search = null;
        this.arc = arc;
        this.userid = userid;
        this.searchStore = searchStore;
        assert(result, 'Result cannot be null.');
        this.result = result;
        if (!onlyConsumer) {
            this.producer = new PlanProducer(this.arc, this.result, searchStore, { debug });
            this.replanQueue = new ReplanQueue(this.producer);
            this.dataChangeCallback = () => this.replanQueue.addChange();
            this._listenToArcStores();
        }
        this.consumer = new PlanConsumer(this.arc, this.result);
        PlanningExplorerAdapter.subscribeToForceReplan(this);
    }
    static async create(arc, { userid, storageKeyBase, onlyConsumer, debug = false }) {
        assert(arc, 'Arc cannot be null.');
        assert(userid, 'User id cannot be null.');
        debug = debug || (storageKeyBase && storageKeyBase.startsWith('volatile'));
        const store = await Planificator._initSuggestStore(arc, userid, storageKeyBase);
        const searchStore = await Planificator._initSearchStore(arc, userid);
        const result = new PlanningResult({ context: arc.context, loader: arc.loader }, store);
        await result.load();
        const planificator = new Planificator(arc, userid, result, searchStore, onlyConsumer, debug);
        await planificator._storeSearch(); // Reset search value for the current arc.
        planificator.requestPlanning({ contextual: true, metadata: { trigger: Trigger.Init } });
        return planificator;
    }
    async requestPlanning(options = {}) {
        if (!this.consumerOnly) {
            await this.producer.produceSuggestions(options);
        }
    }
    get consumerOnly() { return !this.producer; }
    async loadSuggestions() {
        return this.result.load();
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
    registerSuggestionsChangedCallback(callback) {
        this.consumer.registerSuggestionsChangedCallback(callback);
    }
    registerVisibleSuggestionsChangedCallback(callback) {
        this.consumer.registerVisibleSuggestionsChangedCallback(callback);
    }
    dispose() {
        if (!this.consumerOnly) {
            this._unlistenToArcStores();
            this.producer.dispose();
        }
        this.consumer.dispose();
        this.result.dispose();
    }
    async deleteAll() {
        await this.producer.result.clear();
        this.setSearch(null);
    }
    _listenToArcStores() {
        this.arc.onDataChange(this.dataChangeCallback, this);
        this.arc.context.allStores.forEach(store => {
            if (store instanceof StorageProviderBase) {
                store.on('change', this.dataChangeCallback, this);
            }
        });
    }
    _unlistenToArcStores() {
        this.arc.clearDataChange(this);
        this.arc.context.allStores.forEach(store => {
            if (store instanceof StorageProviderBase) {
                store.off('change', this.dataChangeCallback);
            }
        });
    }
    static constructSuggestionKey(arc, userid, storageKeyBase) {
        const arcStorageKey = arc.storageProviderFactory.parseStringAsKey(arc.storageKey);
        const keybase = arc.storageProviderFactory.parseStringAsKey(storageKeyBase || arcStorageKey.base());
        return keybase.childKeyForSuggestions(userid, arcStorageKey.arcId);
    }
    static constructSearchKey(arc, userid) {
        const arcStorageKey = arc.storageProviderFactory.parseStringAsKey(arc.storageKey);
        const keybase = arc.storageProviderFactory.parseStringAsKey(arcStorageKey.base());
        return keybase.childKeyForSearch(userid);
    }
    static async _initSuggestStore(arc, userid, storageKeyBase) {
        const storageKey = Planificator.constructSuggestionKey(arc, userid, storageKeyBase);
        return Planificator._initStore(arc, 'suggestions-id', EntityType.make(['Suggestions'], { current: 'Object' }), storageKey);
    }
    static async _initSearchStore(arc, userid) {
        const storageKey = Planificator.constructSearchKey(arc, userid);
        return Planificator._initStore(arc, 'search-id', EntityType.make(['Search'], { current: 'Object' }), storageKey);
    }
    static async _initStore(arc, id, type, storageKey) {
        const store = await arc.storageProviderFactory.connectOrConstruct(id, type, storageKey.toString());
        assert(store, `Failed initializing '${storageKey.toString()}' store.`);
        store.referenceMode = false;
        return store;
    }
    async _storeSearch() {
        const values = await this.searchStore.get() || [];
        const arcKey = this.arc.id.idTreeAsString();
        const newValues = [];
        for (const { arc, search } of values) {
            if (arc === arcKey) {
                if (search === this.search) {
                    return; // Unchanged search value for the current arc.
                }
            }
            else {
                newValues.push({ arc, search });
            }
        }
        if (this.search) {
            newValues.push({ search: this.search, arc: arcKey });
        }
        return this.searchStore.set(newValues);
    }
}
//# sourceMappingURL=planificator.js.map