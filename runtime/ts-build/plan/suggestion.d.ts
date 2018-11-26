/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../arc.js';
import { Description } from '../description.js';
import { Recipe } from '../recipe/recipe.js';
import { Relevance } from '../relevance.js';
import { Search } from '../recipe/search.js';
export declare class Suggestion {
    arc: Arc;
    plan: Recipe;
    descriptionByModality: {};
    relevance: Relevance;
    readonly hash: string;
    readonly rank: number;
    groupIndex: number;
    searchGroups: string[][];
    constructor(plan: Recipe, hash: string, rank: number, arc: Arc);
    readonly descriptionText: string;
    getDescription(modality: string): string | {};
    setDescription(description: Description): Promise<void>;
    isEquivalent(other: Suggestion): boolean;
    static compare(s1: Suggestion, s2: Suggestion): number;
    hasSearch(search: string): boolean;
    setSearch(search: Search): void;
    mergeSearch(suggestion: Suggestion): boolean;
    _addSearch(searchGroup: string[]): boolean;
    serialize(): {
        plan: any;
        hash: string;
        rank: number;
        searchGroups: string[][];
        descriptionByModality: {};
    };
    static deserialize({ plan, hash, rank, searchGroups, descriptionByModality }: {
        plan: any;
        hash: any;
        rank: any;
        searchGroups: any;
        descriptionByModality: any;
    }, arc: any, recipeResolver: any): Promise<Suggestion>;
    instantiate(): Promise<void>;
    _planToString(plan: any): any;
    static _planFromString(planString: any, arc: any, recipeResolver: any): Promise<Recipe>;
}
