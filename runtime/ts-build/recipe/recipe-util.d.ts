import { Recipe } from './recipe.js';
import { Particle } from './particle.js';
import { Handle } from './handle.js';
import { HandleConnection } from './handle-connection.js';
declare class Shape {
    recipe: Recipe;
    particles: {
        [index: string]: Particle;
    };
    handles: Map<string, Handle>;
    reverse: Map<Handle | Particle | HandleConnection, string>;
    constructor(recipe: Recipe, particles: {
        [index: string]: Particle;
    }, handles: Map<string, Handle>, hcs: {
        [index: string]: HandleConnection;
    });
}
declare type DirectionCounts = {
    in: number;
    out: number;
    inout: number;
    unknown: number;
};
export declare class RecipeUtil {
    static makeShape(particles: any, handles: any, map: any, recipe?: Recipe): Shape;
    static recipeToShape(recipe: any): Shape;
    static find(recipe: Recipe, shape: Shape): {
        match: {};
        score: number;
    }[];
    static directionCounts(handle: any): DirectionCounts;
    static matchesRecipe(recipe: any, otherRecipe: any): boolean;
}
export {};
