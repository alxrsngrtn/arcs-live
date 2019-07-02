/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../arc.js';
/**
 * Walkers traverse an object, calling methods based on the
 * features encountered on that object. For example, a RecipeWalker
 * takes a list of recipes and calls methods when:
 *  - a new recipe is encountered
 *  - a handle is found inside a recipe
 *  - a particle is found inside a recipe
 *  - etc..
 *
 * Each of these methods can return a list of updates:
 *   [(recipe, encountered_thing) => new_recipe]
 *
 * The walker then does something with the updates depending on the
 * tactic selected.
 *
 * If the tactic is "Permuted", then an output will be generated
 * for every combination of 1 element drawn from each update list.
 * For example, if 3 methods return [a,b], [c,d,e], and [f] respectively
 * then "Permuted" will cause 6 outputs to be generated: [acf, adf, aef, bcf, bdf, bef]
 *
 * If the tactic is "Independent", an output will be generated for each
 * update, regardless of the list the update is in. For example,
 * if 3 methods return [a,b], [c,d,e], and [f] respectively,
 * then "Independent" will cause 6 outputs to be generated: [a,b,c,d,e,f]
 */
export declare enum WalkerTactic {
    Permuted = "permuted",
    Independent = "independent"
}
export interface Cloneable<T> {
    clone(map?: Map<object, object>): T;
}
export interface Descendant<T extends Cloneable<T>> {
    result: T;
    score: number;
    derivation?: {
        parent?: Descendant<T>;
        strategy: Action<T>;
    }[];
    hash?: Promise<string> | string;
    valid?: boolean;
    errors?: string[];
    normalized?: boolean;
}
export interface GenerateParams<T extends Cloneable<T>> {
    generated: Descendant<T>[];
    population: Descendant<T>[];
    terminal: Descendant<T>[];
    generation: number;
}
/**
 * An Action generates the list of Descendants by walking the object with a
 * Walker.
 */
export declare abstract class Action<T extends Cloneable<T>> {
    private readonly _arc?;
    private readonly _args?;
    constructor(arc?: Arc, args?: any);
    readonly arc: Arc | undefined;
    getResults({ generated }: GenerateParams<T>): Descendant<T>[];
    generateFrom(generated: Descendant<T>[]): Promise<Descendant<T>[]>;
    abstract generate(inputParams: GenerateParams<T>): Promise<Descendant<T>[]>;
}
export declare type Continuation<T extends Cloneable<T>, Ctx extends object[]> = SingleContinuation<T, Ctx> | SingleContinuation<T, Ctx>[];
declare type SingleContinuation<T extends Cloneable<T>, Ctx extends object[]> = (obj: T, ...ctx: Ctx) => number;
export declare abstract class Walker<T extends Cloneable<T>> {
    static Permuted: WalkerTactic;
    static Independent: WalkerTactic;
    descendants: Descendant<T>[];
    currentAction?: Action<T>;
    currentResult?: Descendant<T>;
    tactic: WalkerTactic;
    private updateList?;
    constructor(tactic: WalkerTactic);
    onAction(action: Action<T>): void;
    onResult(result: Descendant<T>): void;
    onResultDone(): void;
    onActionDone(): void;
    static walk<T extends Cloneable<T>>(results: Descendant<T>[], walker: Walker<T>, action: Action<T>): Descendant<T>[];
    visit<Ctx extends object[]>(visitor: (obj: T, ...ctx: Ctx) => Continuation<T, Ctx>, ...context: Ctx): void;
    private runUpdateList;
    abstract createDescendant(result: T, score: number): void;
    createWalkerDescendant(item: T, score: number, hash: Promise<string> | string, valid: boolean): void;
    isEmptyResult<Ctx extends object[]>(result: Continuation<T, Ctx>): boolean;
}
export {};
