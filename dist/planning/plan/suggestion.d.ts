/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../../runtime/arc.js';
import { DescriptionFormatter } from '../../runtime/description-formatter.js';
import { Description } from '../../runtime/description.js';
import { Dictionary } from '../../runtime/hot.js';
import { Loader } from '../../platform/loader.js';
import { Manifest } from '../../runtime/manifest.js';
import { Modality } from '../../runtime/modality.js';
import { Recipe } from '../../runtime/recipe/recipe.js';
import { Search } from '../../runtime/recipe/search.js';
import { Relevance } from '../../runtime/relevance.js';
import { SuggestFilter } from './suggest-filter.js';
export declare type DescriptionProperties = {
    text?: string;
    template?: string;
    model?: Dictionary<string | number>;
};
/**
 * options for the fromLiteral() method.
 */
export declare type FromLiteralOptions = {
    plan: string;
    hash: string;
    rank: number;
    versionByStore?: string;
    searchGroups?: string[][];
    descriptionByModality?: Dictionary<DescriptionProperties>;
};
export declare type EnvOptions = {
    context: Manifest;
    loader: Loader;
};
export declare type SuggestionVisibilityOptions = {
    reasons?: string[];
};
export declare class Suggestion {
    plan: Recipe;
    planString: string;
    descriptionByModality: {};
    versionByStore: {};
    readonly hash: string;
    readonly rank: number;
    groupIndex: number;
    searchGroups: string[][];
    static create(plan: Recipe, hash: string, relevance?: Relevance): Suggestion;
    constructor(plan: Recipe, hash: string, rank: number, versionByStore: {});
    get descriptionText(): string;
    getDescription(modality: string): DescriptionProperties;
    setDescription(description: Description, modality: Modality, descriptionFormatter?: typeof DescriptionFormatter): void;
    isEquivalent(other: Suggestion): boolean;
    isEqual(other: Suggestion): boolean;
    _isSameSearch(other: Suggestion): boolean;
    _isSameDescription(other: Suggestion): boolean;
    _isSameVersions(other: Suggestion): boolean;
    static compare(s1: Suggestion, s2: Suggestion): number;
    hasSearch(search: string): boolean;
    hasSearchGroup(tokens: string[]): boolean;
    setSearch(search: Search): void;
    mergeSearch(suggestion: Suggestion): boolean;
    _addSearch(searchGroup: string[]): boolean;
    toLiteral(): {
        plan: string;
        hash: string;
        rank: number;
        versionByStore: string;
        searchGroups: string[][];
        descriptionByModality: {};
    };
    static fromLiteral({ plan, hash, rank, versionByStore, searchGroups, descriptionByModality }: FromLiteralOptions, { context, loader }: EnvOptions): Promise<Suggestion>;
    instantiate(arc: Arc): Promise<void>;
    getResolvedPlan(arc: Arc): Promise<Recipe>;
    isUpToDate(arc: Arc, plan: Recipe): boolean;
    isVisible(arc: Arc, filter: SuggestFilter, options?: SuggestionVisibilityOptions): boolean;
}
