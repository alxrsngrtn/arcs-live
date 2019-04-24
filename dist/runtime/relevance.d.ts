/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from './arc.js';
import { Particle } from './recipe/particle.js';
import { Recipe } from './recipe/recipe.js';
export declare class Relevance {
    readonly versionByStore: {};
    readonly relevanceMap: Map<Particle, number[]>;
    private constructor();
    static create(arc: Arc, recipe: Recipe): Relevance;
    apply(relevance: ReadonlyMap<Particle, number[]>): void;
    calcRelevanceScore(): number;
    isRelevant(plan: Recipe): boolean;
    static scaleRelevance(relevance: number): number;
    static particleRelevance(relevanceList: number[]): number;
    calcParticleRelevance(particle: Particle): number;
}
