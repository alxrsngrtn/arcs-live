import { Arc } from '../../runtime/arc.js';
import { StrategizerWalker, Strategy } from '../strategizer.js';
export declare class GroupHandleConnections extends Strategy {
    _walker: StrategizerWalker;
    constructor(arc?: Arc, args?: any);
    readonly walker: StrategizerWalker;
    generate(inputParams: any): any;
}
