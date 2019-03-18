import { HandleConnectionSpec, ConsumeSlotConnectionSpec } from '../../runtime/particle-spec.js';
import { Particle } from '../../runtime/recipe/particle.js';
import { Recipe } from '../../runtime/recipe/recipe.js';
import { Strategy } from '../strategizer.js';
export declare class MatchRecipeByVerb extends Strategy {
    generate(inputParams: any): any;
    static satisfiesHandleConstraints(recipe: any, handleConstraints: any): boolean;
    static satisfiesUnnamedHandleConnection(recipe: Recipe, handleData: any): boolean;
    static satisfiesHandleConnection(recipe: any, handleName: any, handleData: any): boolean;
    static connectionSpecMatchesConstraint(connSpec: HandleConnectionSpec, handleData: any): boolean;
    static connectionMatchesConstraint(connection: any, handleData: any): boolean;
    static satisfiesSlotConstraints(recipe: any, slotConstraints: any): boolean;
    static satisfiesSlotConnection(recipe: any, slotName: any, constraints: any): boolean;
    static slotsMatchConstraint(particle: Particle, slotSpecs: Map<string, ConsumeSlotConnectionSpec>, name: any, constraints: any): boolean;
}
