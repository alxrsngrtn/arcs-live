import { Strategy } from '../strategizer/strategizer.js';
import { Arc } from '../arc.js';
import { Descendant } from '../strategizer/strategizer.js';
export declare class InitPopulation extends Strategy {
    _contextual: boolean;
    _loadedParticles: Set<string>;
    constructor(arc: Arc, { contextual }: {
        contextual?: boolean;
    });
    generate({ generation }: {
        generation: number;
    }): Promise<Descendant[]>;
    private _contextualResults;
    private _allResults;
}
