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
import { DescriptionFormatter } from './description-formatter.js';
import { Particle } from './recipe/particle.js';
import { Relevance } from './relevance.js';
export declare class Description {
    relevance: Relevance | null;
    readonly arc: Arc;
    _particle: Particle | undefined;
    constructor(arc: any);
    getArcDescription(formatterClass?: typeof DescriptionFormatter): Promise<string>;
    getRecipeSuggestion(formatterClass?: typeof DescriptionFormatter): Promise<any>;
    getHandleDescription(recipeHandle: any): Promise<any>;
    static defaultDescription: string;
}
