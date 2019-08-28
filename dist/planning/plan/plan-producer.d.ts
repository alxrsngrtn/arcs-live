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
import { Consumer } from '../../runtime/hot.js';
import { SingletonStorageProvider } from '../../runtime/storage/storage-provider-base.js';
import { Planner, Generation } from '../planner.js';
import { RecipeIndex } from '../recipe-index.js';
import { Speculator } from '../speculator.js';
import { StrategyDerived } from '../strategizer.js';
import { PlanningResult } from './planning-result.js';
import { Suggestion } from './suggestion.js';
import { PlannerInspector } from '../planner-inspector.js';
export declare enum Trigger {
    Init = "init",
    Search = "search",
    PlanInstantiated = "plan-instantiated",
    DataChanged = "data-changed",
    Forced = "forced"
}
declare type SuggestionOptions = {
    cancelOngoingPlanning?: boolean;
    metadata?: {
        trigger: Trigger;
        search?: string;
    };
    search?: string;
    strategies?: StrategyDerived[];
    contextual?: boolean;
};
export declare class PlanProducer {
    arc: Arc;
    result: PlanningResult;
    planner: Planner | null;
    recipeIndex: RecipeIndex;
    speculator: Speculator;
    needReplan: boolean;
    replanOptions: SuggestionOptions;
    _isPlanning: boolean;
    stateChangedCallbacks: ((isPlanning: boolean) => void)[];
    search: string;
    searchStore?: SingletonStorageProvider;
    searchStoreCallback: Consumer<{}>;
    debug: boolean;
    noSpecEx: boolean;
    inspector?: PlannerInspector;
    constructor(arc: Arc, result: PlanningResult, searchStore?: SingletonStorageProvider, inspector?: PlannerInspector, { debug, noSpecEx }?: {
        debug?: boolean;
        noSpecEx?: boolean;
    });
    isPlanning: boolean;
    registerStateChangedCallback(callback: any): void;
    onSearchChanged(): Promise<void>;
    dispose(): void;
    produceSuggestions(options?: SuggestionOptions): Promise<void>;
    runPlanner(options: any, generations: Generation[]): Promise<Suggestion[]>;
    protected _cancelPlanning(): void;
}
export {};
