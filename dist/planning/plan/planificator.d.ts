/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../../runtime/arc.js';
import { Runnable } from '../../runtime/hot.js';
import { KeyBase } from '../../runtime/storage/key-base.js';
import { SingletonStorageProvider } from '../../runtime/storage/storage-provider-base.js';
import { PlanConsumer } from './plan-consumer.js';
import { PlanProducer } from './plan-producer.js';
import { PlanningResult } from './planning-result.js';
import { ReplanQueue } from './replan-queue.js';
import { PlannerInspector, PlannerInspectorFactory } from '../planner-inspector.js';
export declare type PlanificatorOptions = {
    storageKeyBase?: string;
    debug?: boolean;
    onlyConsumer?: boolean;
    inspectorFactory?: PlannerInspectorFactory;
};
export declare class Planificator {
    static create(arc: Arc, { storageKeyBase, onlyConsumer, debug, inspectorFactory }: PlanificatorOptions): Promise<Planificator>;
    readonly arc: Arc;
    result: PlanningResult;
    consumer: PlanConsumer;
    producer?: PlanProducer;
    replanQueue?: ReplanQueue;
    dataChangeCallback: Runnable;
    search: string | null;
    searchStore: SingletonStorageProvider;
    inspector: PlannerInspector | undefined;
    constructor(arc: Arc, result: PlanningResult, searchStore: SingletonStorageProvider, onlyConsumer?: boolean, debug?: boolean, inspectorFactory?: PlannerInspectorFactory);
    forceReplan(): Promise<void>;
    requestPlanning(options?: {}): Promise<void>;
    readonly consumerOnly: boolean;
    loadSuggestions(): Promise<boolean>;
    setSearch(search: string | null): Promise<void>;
    registerSuggestionsChangedCallback(callback: any): void;
    registerVisibleSuggestionsChangedCallback(callback: any): void;
    dispose(): void;
    deleteAll(): Promise<void>;
    private _listenToArcStores;
    private _unlistenToArcStores;
    static constructSuggestionKey(arc: Arc, storageKeyBase?: string): KeyBase;
    static constructSearchKey(arc: Arc): KeyBase;
    private static _initSuggestStore;
    private static _initSearchStore;
    private static _initStore;
    _storeSearch(): Promise<void>;
}
