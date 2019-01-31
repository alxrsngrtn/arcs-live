import { Strategy } from '../strategizer.js';
import { Arc } from '../../runtime/arc.js';
export declare class CoalesceRecipes extends Strategy {
    private recipeIndex;
    constructor(arc: Arc, { recipeIndex }: {
        recipeIndex: any;
    });
    getResults(inputParams: any): any;
    generate(inputParams: any): any;
}
