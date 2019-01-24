import { Descendant } from '../recipe/walker.js';
import { Strategy } from '../../planning/strategizer.js';
export declare class InitSearch extends Strategy {
    _search: any;
    constructor(arc: any, { search }: {
        search: any;
    });
    generate({ generation }: {
        generation: any;
    }): Promise<Descendant[]>;
}
