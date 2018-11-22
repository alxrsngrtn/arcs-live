import { Strategy } from '../strategizer/strategizer.js';
import { Arc } from '../arc.js';
export declare class SearchTokensToParticles extends Strategy {
    private readonly _walker;
    constructor(arc: Arc, options: any);
    readonly walker: any;
    getResults(inputParams: any): any[];
    private _addThing;
    private _addThingByToken;
    generate(inputParams: any): Promise<import("../strategizer/strategizer.js").Descendant[]>;
}
