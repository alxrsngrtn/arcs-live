import { Strategy } from '../../planning/strategizer.js';
import { Arc } from '../arc';
export declare class ConvertConstraintsToConnections extends Strategy {
    modality: string;
    constructor(arc: Arc, args?: any);
    generate(inputParams: any): any;
}
