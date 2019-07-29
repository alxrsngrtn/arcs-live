/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../runtime/arc.js';
import { Suggestion } from './plan/suggestion.js';
import { Speculator } from './speculator.js';
import { Strategizer, StrategyDerived, GenerationRecord, Ruleset } from './strategizer.js';
import { Descendant } from '../runtime/recipe/walker.js';
import { Recipe } from '../runtime/recipe/recipe.js';
import { PlannerInspector, PlannerInspectorFactory, InspectablePlanner } from './planner-inspector.js';
export interface AnnotatedDescendant extends Descendant<Recipe> {
    active?: boolean;
    irrelevant?: boolean;
    description?: string;
}
export interface Generation {
    generated: AnnotatedDescendant[];
    record: GenerationRecord;
}
export interface PlannerInitOptions {
    strategies?: StrategyDerived[];
    ruleset?: Ruleset;
    strategyArgs?: {};
    speculator?: Speculator;
    inspectorFactory?: PlannerInspectorFactory;
    noSpecEx?: boolean;
}
export declare class Planner implements InspectablePlanner {
    arc: Arc;
    strategizer: Strategizer;
    speculator?: Speculator;
    inspector?: PlannerInspector;
    noSpecEx: boolean;
    init(arc: Arc, { strategies, ruleset, strategyArgs, speculator, inspectorFactory, noSpecEx }: PlannerInitOptions): void;
    plan(timeout?: number, generations?: Generation[]): Promise<Recipe[]>;
    _speculativeThreadCount(): number;
    _splitToGroups(items: Recipe[], groupCount: number): Recipe[][];
    suggest(timeout?: number, generations?: Generation[]): Promise<Suggestion[]>;
    static clearCache(): void;
    private retriveOrCreateSuggestion;
    _shouldSpeculate(plan: any): boolean;
    _updateGeneration(generations: Generation[], hash: string, handler: (_: AnnotatedDescendant) => void): void;
    static InitializationStrategies: StrategyDerived[];
    static ResolutionStrategies: StrategyDerived[];
    static AllStrategies: StrategyDerived[];
}
