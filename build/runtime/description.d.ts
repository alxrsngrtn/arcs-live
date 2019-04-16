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
import { Relevance } from './relevance.js';
import { Handle } from './recipe/handle.js';
export declare class Description {
    private readonly particleDescriptions;
    private readonly storeDescById;
    private readonly arcRecipeName;
    private readonly arcRecipes;
    private constructor();
    /**
     * Create a new Description object for the given Arc with an
     * optional Relevance object.
     */
    static create(arc: Arc, relevance?: Relevance): Promise<Description>;
    getArcDescription(formatterClass?: typeof DescriptionFormatter): string | undefined;
    getRecipeSuggestion(formatterClass?: typeof DescriptionFormatter): any;
    getHandleDescription(recipeHandle: Handle): string;
    private static initDescriptionHandles;
    private static _createParticleDescription;
    private static _getPatternByNameFromDescriptionHandle;
    private static _prepareStoreValue;
    /** A fallback description if none other can be found */
    static defaultDescription: string;
}
