import { Action } from '../recipe/walker.js';
import { RecipeWalker } from '../recipe/recipe-walker.js';
import { Recipe } from '../recipe/recipe.js';
import { Handle } from '../recipe/handle';
import { SlotConnection } from '../recipe/slot-connection.js';
import { Particle } from '../recipe/particle.js';
import { SlotSpec } from '../particle-spec.js';
export declare class ResolveWalker extends RecipeWalker {
    private arc;
    constructor(tactic: any, arc: any);
    onHandle(recipe: Recipe, handle: Handle): (recipe: any, handle: any) => void;
    onSlotConnection(recipe: Recipe, slotConnection: SlotConnection): (recipe: any, slotConnection: any) => number;
    onPotentialSlotConnection(recipe: Recipe, particle: Particle, slotSpec: SlotSpec): (recipe: any, particle: any, slotSpec: any) => number;
    onObligation(recipe: Recipe, obligation: any): (recipe: any, obligation: any) => number;
}
export declare class ResolveRecipeAction extends Action {
    generate(inputParams: any): any;
}
export declare class RecipeResolver {
    private resolver;
    constructor(arc: any);
    resolve(recipe: any): Promise<any>;
}
