import { Arc } from '../runtime/arc.js';
import { Suggestion } from './plan/suggestion.js';
import { Speculator } from './speculator.js';
import { Strategizer, StrategyDerived } from './strategizer.js';
export declare class Planner {
    private _arc;
    strategizer: Strategizer;
    blockDevtools: boolean;
    init(arc: Arc, { strategies, ruleset, strategyArgs, blockDevtools }?: {
        strategies?: StrategyDerived[];
        ruleset?: import("./strategizer.js").Ruleset;
        strategyArgs?: {};
        blockDevtools?: boolean;
    }): void;
    plan(timeout?: number, generations?: any[]): Promise<any[]>;
    _speculativeThreadCount(): number;
    _splitToGroups(items: any, groupCount: number): any[];
    suggest(timeout?: number, generations?: {}[], speculator?: Speculator): Promise<Suggestion[]>;
    _updateGeneration(generations: any, hash: string, handler: any): void;
    static InitializationStrategies: StrategyDerived[];
    static ResolutionStrategies: StrategyDerived[];
    static AllStrategies: StrategyDerived[];
}
