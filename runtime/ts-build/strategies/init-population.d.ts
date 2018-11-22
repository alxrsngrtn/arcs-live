import { Strategy } from '../strategizer/strategizer.js';
import { Arc } from '../arc.js';
export declare class InitPopulation extends Strategy {
    _contextual: boolean;
    _loadedParticles: any;
    constructor(arc: Arc, { contextual }: {
        contextual?: boolean;
    });
    generate({ generation }: {
        generation: any;
    }): Promise<any>;
    private _contextualResults;
    private _allResults;
}
