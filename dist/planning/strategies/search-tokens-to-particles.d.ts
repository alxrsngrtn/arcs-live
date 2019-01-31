import { Strategy } from '../strategizer.js';
import { Arc } from '../../runtime/arc.js';
export declare class SearchTokensToParticles extends Strategy {
    private readonly _walker;
    constructor(arc: Arc, options: any);
    readonly walker: any;
    getResults(inputParams: any): any[];
    private _addThing;
    private _addThingByToken;
    generate(inputParams: any): any;
}
