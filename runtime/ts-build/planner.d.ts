import { Arc } from './arc.js';
import { Speculator } from './speculator.js';
import { Suggestion } from './plan/suggestion';
export declare class Planner {
    constructor();
    private _arc;
    private _relevances;
    private strategizer;
    init(arc: Arc, { strategies, ruleset, strategyArgs }?: {
        strategies?: any[];
        ruleset?: any;
        strategyArgs?: {};
    }): void;
    plan(timeout: number, generations: any): Promise<any[]>;
    _speculativeThreadCount(): number;
    _splitToGroups(items: any, groupCount: number): any[];
    suggest(timeout: number, generations: [], speculator?: Speculator): Promise<Suggestion[]>;
    _updateGeneration(generations: any, hash: string, handler: any): void;
    dispose(): void;
    static InitializationStrategies: any[];
    static ResolutionStrategies: any[];
    static AllStrategies: any[];
}
