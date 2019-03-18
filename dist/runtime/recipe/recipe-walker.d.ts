import { HandleConnectionSpec, ConsumeSlotConnectionSpec } from '../particle-spec.js';
import { ConnectionConstraint } from './connection-constraint.js';
import { HandleConnection } from './handle-connection.js';
import { Handle } from './handle.js';
import { Particle } from './particle.js';
import { Recipe } from './recipe.js';
import { SlotConnection } from './slot-connection.js';
import { Slot } from './slot.js';
import { Walker } from './walker.js';
export declare class RecipeWalker extends Walker {
    onHandle?(recipe: Recipe, handle: Handle): any;
    onPotentialHandleConnection?(recipe: Recipe, particle: Particle, connectionSpec: HandleConnectionSpec): any;
    onHandleConnection?(recipe: Recipe, handleConnection: HandleConnection): any;
    onParticle?(recipe: Recipe, particle: Particle): any;
    onRecipe?(recipe: Recipe, result: any): any;
    onPotentialSlotConnection?(recipe: Recipe, particle: Particle, slotSpec: ConsumeSlotConnectionSpec): any;
    onSlotConnection?(recipe: Recipe, slotConnection: SlotConnection): any;
    onSlot?(recipe: Recipe, slot: Slot): any;
    onObligation?(recipe: Recipe, obligation: ConnectionConstraint): any;
    onRequiredParticle?(recipe: Recipe, particle: Particle): any;
    onResult(result: any): void;
    createDescendant(recipe: any, score: any): void;
}
