/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ParticleSpec } from '../particle-spec.js';
import { HandleConnection } from './handle-connection.js';
import { Handle } from './handle.js';
import { Particle } from './particle.js';
import { Recipe, RecipeComponent } from './recipe.js';
import { Id } from '../id.js';
import { Dictionary } from '../hot.js';
declare class Shape {
    recipe: Recipe;
    particles: Dictionary<Particle>;
    handles: Map<string, Handle>;
    reverse: Map<RecipeComponent, string>;
    constructor(recipe: Recipe, particles: Dictionary<Particle>, handles: Map<string, Handle>, hcs: Dictionary<HandleConnection>);
}
declare type DirectionCounts = {
    in: number;
    out: number;
    inout: number;
    unknown: number;
};
export declare type HandleRepr = {
    localName?: string;
    handle: string;
    tags?: string[];
    direction?: string;
};
export declare class RecipeUtil {
    static makeShape(particles: string[], handles: string[], map: Dictionary<Dictionary<HandleRepr>>, recipe?: Recipe): Shape;
    static recipeToShape(recipe: Recipe): Shape;
    static find(recipe: Recipe, shape: Shape): {
        match: {};
        score: number;
    }[];
    static constructImmediateValueHandle(connection: HandleConnection, particleSpec: ParticleSpec, id: Id): Handle;
    static directionCounts(handle: Handle): DirectionCounts;
    static matchesRecipe(recipe: Recipe, otherRecipe: Recipe): boolean;
}
export {};
