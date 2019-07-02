/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/// <reference types="core-js" />
import { ParticleSpec, HandleConnectionSpec } from '../particle-spec.js';
import { HandleConnection } from './handle-connection.js';
import { Direction, DirectionArrow } from '../manifest-ast-nodes.js';
import { Handle } from './handle.js';
import { Particle } from './particle.js';
import { Recipe, RecipeComponent } from './recipe.js';
import { Id } from '../id.js';
import { Dictionary } from '../hot.js';
export declare function directionToArrow(direction: Direction): DirectionArrow;
export declare function arrowToDirection(arrow: DirectionArrow): Direction;
export declare function reverseArrow(arrow: DirectionArrow): DirectionArrow;
export declare function connectionMatchesHandleDirection(connectionDirection: Direction, handleDirection: Direction): boolean;
export declare function acceptedDirections(direction: Direction): Direction[];
declare class Shape {
    recipe: Recipe;
    particles: Dictionary<Particle>;
    handles: Map<string, Handle>;
    reverse: Map<RecipeComponent, string>;
    constructor(recipe: Recipe, particles: Dictionary<Particle>, handles: Map<string, Handle>, hcs: Dictionary<HandleConnection>);
}
declare type DirectionCounts = {
    [K in Direction]: number;
};
export declare type HandleRepr = {
    localName?: string;
    handle: string;
    tags?: string[];
    direction?: DirectionArrow;
};
declare type RecipeUtilComponent = RecipeComponent | HandleConnectionSpec;
declare type Match = {
    forward: Map<RecipeComponent, RecipeUtilComponent>;
    reverse: Map<RecipeUtilComponent, RecipeComponent>;
    score: number;
};
export declare class RecipeUtil {
    static makeShape(particles: string[], handles: string[], map: Dictionary<Dictionary<HandleRepr>>, recipe?: Recipe): Shape;
    static recipeToShape(recipe: Recipe): Shape;
    static _buildNewHCMatches(recipe: Recipe, shapeHC: HandleConnection, match: Match, outputList: Match[]): void;
    static _buildNewParticleMatches(recipe: Recipe, shapeParticle: Particle, match: Match, newMatches: Match[]): void;
    static _assignHandlesToEmptyPosition(shape: Shape, match: Match, emptyHandles: Handle[], nullHandles: Handle[]): Match[];
    static find(recipe: Recipe, shape: Shape): {
        match: Dict<RecipeUtilComponent>;
        score: number;
    }[];
    static constructImmediateValueHandle(connection: HandleConnection, particleSpec: ParticleSpec, id: Id): Handle;
    static directionCounts(handle: Handle): DirectionCounts;
    static matchesRecipe(recipe: Recipe, otherRecipe: Recipe): boolean;
}
export {};
