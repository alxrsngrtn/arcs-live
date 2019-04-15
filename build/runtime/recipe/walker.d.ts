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
interface Cloneable {
    clone(map: Map<object, object>): this;
}
export interface Descendant<T extends Cloneable> {
    result: T;
    score: number;
    derivation: {
        parent: Descendant<T>;
        strategy: Action<T>;
    }[];
    hash: Promise<string> | string;
    valid: boolean;
    errors?: any;
    normalized?: any;
}
/**
 * An Action generates the list of Descendants by walking the object with a
 * Walker.
 */
export declare abstract class Action<T extends Cloneable> {
    private readonly _arc?;
    private _args?;
    constructor(arc?: Arc, args?: any);
    readonly arc: Arc | undefined;
    getResults(inputParams: {
        generated: Descendant<T>[];
    }): Descendant<T>[];
    generate(inputParams: any): Promise<Descendant<T>[]>;
}
export declare type Continuation<T extends Cloneable, Ctx extends object[]> = SingleContinuation<T, Ctx> | SingleContinuation<T, Ctx>[];
declare type SingleContinuation<T extends Cloneable, Ctx extends object[]> = (obj: T, ...ctx: Ctx) => number;
export declare abstract class Walker<T extends Cloneable> {
    static Permuted: WalkerTactic;
    static Independent: WalkerTactic;
    descendants: Descendant<T>[];
    currentAction: Action<T>;
    currentResult: Descendant<T>;
    tactic: WalkerTactic;
    private updateList;
    constructor(tactic: WalkerTactic);
    onAction(action: Action<T>): void;
    onResult(result: Descendant<T>): void;
    onResultDone(): void;
    onActionDone(): void;
    static walk<T extends Cloneable>(results: Descendant<T>[], walker: Walker<T>, action: Action<T>): Descendant<T>[];
    visit<Ctx extends object[]>(visitor: (obj: T, ...ctx: Ctx) => Continuation<T, Ctx>, ...context: Ctx): void;
    private runUpdateList;
    abstract createDescendant(result: T, score: number): void;
    createWalkerDescendant(item: T, score: number, hash: Promise<string> | string, valid: boolean): void;
    isEmptyResult<Ctx extends object[]>(result: Continuation<T, Ctx>): boolean;
}
export {};
