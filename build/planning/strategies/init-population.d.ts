import { Descendant } from '../../runtime/recipe/walker.js';
import { Strategy } from '../strategizer.js';
import { Arc } from '../../runtime/arc.js';
import { RecipeIndex } from '../recipe-index.js';
export declare class InitPopulation extends Strategy {
    _contextual: boolean;
    _recipeIndex: RecipeIndex;
    _loadedParticles: Set<string>;
    constructor(arc: Arc, { contextual, recipeIndex }: {
        contextual?: boolean;
        recipeIndex: any;
    });
    generate({ generation }: {
        generation: number;
    }): Promise<Descendant[]>;
    private _contextualResults;
    private _allResults;
}
