import { Arc } from '../../runtime/arc.js';
import { Strategy } from '../strategizer.js';
export declare class CoalesceRecipes extends Strategy {
    private recipeIndex;
    constructor(arc: Arc, { recipeIndex }: {
        recipeIndex: any;
    });
    getResults(inputParams: any): any;
    generate(inputParams: any): any;
}
