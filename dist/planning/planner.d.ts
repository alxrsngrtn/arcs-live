import { Arc } from '../runtime/arc.js';
import { Suggestion } from './plan/suggestion.js';
import { Speculator } from './speculator.js';
import { Strategizer, StrategyDerived, GenerationRecord } from './strategizer.js';
import { Descendant } from '../runtime/recipe/walker.js';
import { Recipe } from '../runtime/recipe/recipe.js';
interface AnnotatedDescendant extends Descendant<Recipe> {
    active?: boolean;
    irrelevant?: boolean;
    description?: string;
}
interface Generation {
    generated: AnnotatedDescendant[];
    record: GenerationRecord;
}
export declare class Planner {
    private _arc;
    strategizer: Strategizer;
    speculator: Speculator;
    blockDevtools: boolean;
    init(arc: Arc, { strategies, ruleset, strategyArgs, speculator, blockDevtools }?: {
        strategies?: StrategyDerived[];
        ruleset?: import("./strategizer.js").Ruleset;
        strategyArgs?: {};
        speculator?: any;
        blockDevtools?: boolean;
    }): void;
    plan(timeout?: number, generations?: Generation[]): Promise<Recipe[]>;
    _speculativeThreadCount(): number;
    _splitToGroups(items: Recipe[], groupCount: number): Recipe[][];
    suggest(timeout?: number, generations?: Generation[]): Promise<Suggestion[]>;
    static clearCache(): void;
    private retriveOrCreateSuggestion;
    _updateGeneration(generations: Generation[], hash: string, handler: (_: AnnotatedDescendant) => void): void;
    static InitializationStrategies: StrategyDerived[];
    static ResolutionStrategies: StrategyDerived[];
    static AllStrategies: StrategyDerived[];
}
export {};
