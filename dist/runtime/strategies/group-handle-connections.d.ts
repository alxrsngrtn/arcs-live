import { StrategizerWalker, Strategy } from '../../planning/strategizer.js';
import { Arc } from '../arc.js';
export declare class GroupHandleConnections extends Strategy {
    _walker: StrategizerWalker;
    constructor(arc?: Arc, args?: any);
    readonly walker: StrategizerWalker;
    generate(inputParams: any): any;
}
