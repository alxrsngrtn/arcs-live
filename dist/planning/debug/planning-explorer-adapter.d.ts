import { Planificator } from '../plan/planificator.js';
import { PlanningResult } from '../plan/planning-result.js';
import { Suggestion } from '../plan/suggestion.js';
import { VisibilityOptions } from '../plan/plan-consumer.js';
import { ArcDevtoolsChannel } from '../../devtools-connector/abstract-devtools-channel.js';
export declare class PlanningExplorerAdapter {
    static updatePlanningResults(result: PlanningResult, metadata: any, devtoolsChannel: ArcDevtoolsChannel): void;
    static updateVisibleSuggestions(visibleSuggestions: Suggestion[], options: VisibilityOptions, devtoolsChannel: ArcDevtoolsChannel): void;
    static updatePlanningAttempt(suggestions: Suggestion[], metadata: {}, devtoolsChannel: ArcDevtoolsChannel): void;
    private static _formatSuggestions;
    static subscribeToForceReplan(planificator: Planificator): void;
}
