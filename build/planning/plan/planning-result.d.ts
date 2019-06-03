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
import { SingletonStorageProvider } from '../../runtime/storage/storage-provider-base.js';
import { EnvOptions, Suggestion } from './suggestion.js';
export declare type PlanningResultOptions = {
    suggestions: Suggestion[];
    lastUpdated?: Date;
    generations?: {
        population: {}[];
        record: {};
    }[];
    contextual?: boolean;
};
export declare class PlanningResult {
    suggestions: Suggestion[];
    lastUpdated: Date;
    generations: {
        population: {}[];
        record: {};
    }[];
    contextual: boolean;
    store: SingletonStorageProvider;
    private storeCallback;
    private changeCallbacks;
    private envOptions;
    constructor(envOptions: EnvOptions, store?: SingletonStorageProvider);
    registerChangeCallback(callback: any): void;
    onChanged(): void;
    load(): Promise<boolean>;
    flush(): Promise<void>;
    clear(): Promise<void>;
    dispose(): void;
    static formatSerializableGenerations(generations: any): any;
    private _set;
    merge({ suggestions, lastUpdated, generations, contextual }: PlanningResultOptions, arc: Arc): boolean;
    private _isUpToDate;
    isEquivalent(suggestions: any): any;
    static isEquivalent(oldSuggestions: any, newSuggestions: any): any;
    fromLiteral({ suggestions, generations, lastUpdated, contextual }: {
        suggestions: any;
        generations?: any;
        lastUpdated?: Date;
        contextual?: boolean;
    }): Promise<boolean>;
    toLiteral(): {
        suggestions: {
            plan: string;
            hash: string;
            rank: number;
            versionByStore: string;
            searchGroups: string[][];
            descriptionByModality: {};
        }[];
        generations: string;
        lastUpdated: string;
        contextual: boolean;
    };
}
