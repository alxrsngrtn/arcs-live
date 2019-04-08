import { Recipe } from '../../runtime/recipe/recipe.js';
import { Strategy } from '../strategizer.js';
import { Descendant } from '../../runtime/recipe/walker.js';
export declare class ConvertConstraintsToConnections extends Strategy {
    generate(inputParams: {
        generated: Descendant<Recipe>[];
    }): Promise<Descendant<Recipe>[]>;
}
