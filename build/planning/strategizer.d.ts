import { Arc } from '../runtime/arc.js';
import { Recipe } from '../runtime/recipe/recipe.js';
import { RecipeWalker } from '../runtime/recipe/recipe-walker.js';
import { WalkerTactic } from '../runtime/recipe/walker.js';
import { Action, Descendant } from '../runtime/recipe/walker.js';
export interface GenerationRecord {
    generation: number;
    sizeOfLastGeneration: number;
    generatedDerivationsByStrategy: {
        [index: string]: number;
    };
    generatedDerivations?: number;
    nullDerivations?: number;
    invalidDerivations?: number;
    duplicateDerivations?: number;
    duplicateSameParentDerivations?: number;
    nullDerivationsByStrategy?: {
        [index: string]: number;
    };
    invalidDerivationsByStrategy?: {
        [index: string]: number;
    };
    duplicateDerivationsByStrategy?: {
        [index: string]: number;
    };
    duplicateSameParentDerivationsByStrategy?: {
        [index: string]: number;
    };
    survivingDerivations?: number;
}
export declare class Strategizer {
    _strategies: Strategy[];
    _evaluators: Strategy[];
    _generation: number;
    _internalPopulation: {
        fitness: number;
        individual: Descendant<Recipe>;
    }[];
    _population: Descendant<Recipe>[];
    _generated: Descendant<Recipe>[];
    _ruleset: Ruleset;
    _terminal: Descendant<Recipe>[];
    populationHash: Map<string, Descendant<Recipe>>;
    constructor(strategies: Strategy[], evaluators: Strategy[], ruleset: Ruleset);
    readonly generation: number;
    readonly population: Descendant<Recipe>[];
    readonly generated: Descendant<Recipe>[];
    /**
     * @return Individuals from the previous generation that were not descended from in the
     * current generation.
     */
    readonly terminal: Descendant<Recipe>[];
    generate(): Promise<GenerationRecord>;
    static _mergeEvaluations(evaluations: number[][], generated: Descendant<Recipe>[]): number[];
}
export declare class StrategizerWalker extends RecipeWalker {
    constructor(tactic: WalkerTactic);
    createDescendant(recipe: Recipe, score: number): void;
    static over(results: Descendant<Recipe>[], walker: StrategizerWalker, strategy: Strategy): Descendant<Recipe>[];
}
export declare abstract class Strategy extends Action<Recipe> {
    constructor(arc?: Arc, args?: any);
    activate(strategizer: Strategizer): Promise<{
        generate: number;
        evaluate: number;
    }>;
    evaluate(strategizer: Strategizer, individuals: Descendant<Recipe>[]): Promise<number[]>;
}
declare type StrategyClass = typeof Strategy;
export interface StrategyDerived extends StrategyClass {
}
export declare class RulesetBuilder {
    _orderingRules: Map<StrategyDerived, Set<StrategyDerived>>;
    constructor();
    /**
     * When invoked for strategies (A, B), ensures that B will never follow A in
     * the chain of derivations of all generated recipes.
     *
     * Following sequences are therefore valid: A, B, AB, AAABB, AC, DBC, CADCBCBD
     * Following sequences are therefore invalid: BA, ABA, BCA, DBCA
     *
     * Transitive closure of the ordering is computed.
     * I.e. For orderings (A, B) and (B, C), the ordering (A, C) is implied.
     *
     * Method can be called with multiple strategies at once.
     * E.g. (A, B, C) implies (A, B), (B, C) and transitively (A, C).
     *
     * Method can be called with arrays of strategies, which represent groups.
     * The ordering in the group is not enforced, but the ordering between them is.
     * E.g. ([A, B], [C, D], E) is a shorthand for:
     * (A, C), (A, D), (B, C), (B, D), (C, E), (D, E).
     */
    order(...strategiesOrGroups: (StrategyDerived | StrategyDerived[])[]): this;
    build(): Ruleset;
    _transitiveClosureFor(strategy: StrategyDerived, beingExpanded: Set<StrategyDerived>, alreadyExpanded: Set<StrategyDerived>): Set<StrategyDerived>;
}
export declare class Ruleset {
    _orderingRules: Map<StrategyDerived, Set<StrategyDerived>>;
    constructor(orderingRules: Map<StrategyDerived, Set<StrategyDerived>>);
    isAllowed(strategy: Strategy, recipe: Descendant<Recipe>): boolean;
    static Builder: typeof RulesetBuilder;
}
export {};
