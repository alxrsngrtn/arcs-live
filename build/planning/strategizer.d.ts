import { Arc } from '../runtime/arc.js';
import { Action, Descendant } from '../runtime/recipe/walker.js';
import { RecipeWalker } from '../runtime/recipe/recipe-walker.js';
export declare class Strategizer {
    _strategies: Strategy[];
    _evaluators: Strategy[];
    _generation: number;
    _internalPopulation: {
        fitness: number;
        individual: any;
    }[];
    _population: any[];
    _generated: any[];
    _ruleset: Ruleset;
    _terminal: any[];
    populationHash: any;
    constructor(strategies: Strategy[], evaluators: Strategy[], ruleset: Ruleset);
    readonly generation: number;
    readonly population: any[];
    readonly generated: any[];
    /**
     * @return Individuals from the previous generation that were not descended from in the
     * current generation.
     */
    readonly terminal: any[];
    generate(): Promise<{
        generation: number;
        sizeOfLastGeneration: number;
        generatedDerivationsByStrategy: any;
        generatedDerivations?: number;
        nullDerivations?: number;
        invalidDerivations?: number;
        duplicateDerivations?: number;
        duplicateSameParentDerivations?: number;
        nullDerivationsByStrategy?: any;
        invalidDerivationsByStrategy?: any;
        duplicateDerivationsByStrategy?: any;
        duplicateSameParentDerivationsByStrategy?: any;
        survivingDerivations?: any;
    }>;
    static _mergeEvaluations(evaluations: any, generated: any): any[];
}
export declare class StrategizerWalker extends RecipeWalker {
    constructor(tactic: any);
    createDescendant(recipe: any, score: any): void;
    static over(results: any, walker: StrategizerWalker, strategy: Strategy): Descendant[];
}
export declare abstract class Strategy extends Action {
    constructor(arc?: Arc, args?: any);
    activate(strategizer: any): Promise<{
        generate: number;
        evaluate: number;
    }>;
    evaluate(strategizer: any, individuals: any): Promise<any>;
}
declare type StrategyClass = typeof Strategy;
export interface StrategyDerived extends StrategyClass {
}
export declare class RulesetBuilder {
    _orderingRules: any;
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
    order(...strategiesOrGroups: any[]): this;
    build(): Ruleset;
    _transitiveClosureFor(strategy: any, beingExpanded: any, alreadyExpanded: any): any;
}
export declare class Ruleset {
    _orderingRules: any;
    constructor(orderingRules: any);
    isAllowed(strategy: Strategy, recipe: any): boolean;
    static Builder: typeof RulesetBuilder;
}
export {};
