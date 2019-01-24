import { RecipeWalker } from './recipe-walker.js';
import { Recipe } from './recipe';
import { ConnectionConstraint } from './connection-constraint.js';
export declare class ConstraintWalker extends RecipeWalker {
    onConstraint?(recipe: Recipe, constraint: ConnectionConstraint): any;
    onResult(result: any): void;
}
