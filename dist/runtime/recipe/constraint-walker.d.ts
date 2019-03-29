import { ConnectionConstraint } from './connection-constraint.js';
import { Recipe } from './recipe';
import { RecipeWalker } from './recipe-walker.js';
import { Descendant } from './walker.js';
export declare class ConstraintWalker extends RecipeWalker {
    onConstraint?(recipe: Recipe, constraint: ConnectionConstraint): any;
    onResult(result: Descendant<Recipe>): void;
}
