import { ConnectionConstraint } from './connection-constraint.js';
import { Recipe } from './recipe';
import { RecipeWalker } from './recipe-walker.js';
import { Descendant, Continuation } from './walker.js';
export declare class ConstraintWalker extends RecipeWalker {
    onConstraint?(recipe: Recipe, constraint: ConnectionConstraint): Continuation<Recipe, [ConnectionConstraint]>;
    onResult(result: Descendant<Recipe>): void;
}
