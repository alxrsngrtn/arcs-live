/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare class Search {
    _phrase: string;
    _unresolvedTokens: string[];
    _resolvedTokens: string[];
    constructor(phrase: string, unresolvedTokens?: string[]);
    _append(phrase: string, unresolvedTokens: any, resolvedTokens: any): void;
    readonly phrase: string;
    readonly unresolvedTokens: string[];
    readonly resolvedTokens: string[];
    resolveToken(token: any): void;
    isValid(): boolean;
    isResolved(): boolean;
    _normalize(): void;
    _copyInto(recipe: any): any;
    toString(options: any): string;
}
