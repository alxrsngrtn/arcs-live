/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
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
    static slotsMatchConstraint(particle: Particle, slotSpecs: ReadonlyMap<string, ConsumeSlotConnectionSpec>, name: any, constraints: any): boolean;
}
