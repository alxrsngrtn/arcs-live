import { Planificator } from '../plan/planificator.js';
import { Suggestion } from '../plan/suggestion';
export declare class PlanningExplorerAdapter {
    static updatePlanningResults(result: any, devtoolsChannel: any): void;
    static updateVisibleSuggestions(visibleSuggestions: any, devtoolsChannel: any): void;
    static updatePlanningAttempt({ suggestions }: {
        suggestions?: Suggestion[];
    }, devtoolsChannel: any): void;
    private static _formatSuggestions;
    static subscribeToForceReplan(planificator: Planificator): void;
}
