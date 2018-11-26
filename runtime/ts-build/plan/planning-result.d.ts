/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../arc';
import { Suggestion } from './suggestion';
export declare class PlanningResult {
    arc: Arc;
    _suggestions: Suggestion[];
    lastUpdated: Date;
    generations: {}[];
    contextual: boolean;
    constructor(arc: any, result?: {});
    suggestions: Suggestion[];
    static formatSerializableGenerations(generations: any): any;
    set({ suggestions, lastUpdated, generations, contextual }: {
        suggestions: any;
        lastUpdated?: Date;
        generations?: any[];
        contextual?: boolean;
    }): boolean;
    append({ suggestions, lastUpdated, generations }: {
        suggestions: any;
        lastUpdated?: Date;
        generations?: any[];
    }): boolean;
    olderThan(other: any): boolean;
    isEquivalent(suggestions: any): any;
    static isEquivalent(oldSuggestions: any, newSuggestions: any): any;
    deserialize({ suggestions, generations, lastUpdated }: {
        suggestions: any;
        generations: any;
        lastUpdated: any;
    }): Promise<boolean>;
    serialize(): {
        suggestions: {
            plan: any;
            hash: string;
            rank: number;
            searchGroups: string[][];
            descriptionByModality: {};
        }[];
        generations: string;
        lastUpdated: string;
        contextual: boolean;
    };
}
