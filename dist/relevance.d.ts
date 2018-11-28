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
import { Particle } from './particle.js';
export declare class Relevance {
    arcState: Map<string, string> | undefined;
    newArc: Arc;
    private readonly relevanceMap;
    constructor(arcState?: Map<string, string>);
    apply(relevance: any): void;
    calcRelevanceScore(): number;
    isRelevant(plan: any): boolean;
    static scaleRelevance(relevance: any): number;
    static particleRelevance(relevanceList: any): number;
    calcParticleRelevance(particle: Particle): number;
}
