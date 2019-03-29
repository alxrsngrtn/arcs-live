import { Arc } from '../../runtime/arc.js';
import { Recipe } from '../../runtime/recipe/recipe.js';
import { Descendant } from '../../runtime/recipe/walker.js';
import { RecipeIndex } from '../recipe-index.js';
import { Strategy } from '../strategizer.js';
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
    }): Promise<Descendant<Recipe>[]>;
    private _contextualResults;
    private _allResults;
}
