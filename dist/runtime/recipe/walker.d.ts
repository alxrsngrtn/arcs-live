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
export interface Descendant {
    result: any;
    score: number;
    derivation: any;
    hash: any;
    valid: boolean;
    errors?: any;
    normalized?: any;
}
/**
 * An Action generates the list of Descendants by walking the object with a
 * Walker.
 */
export declare abstract class Action {
    private readonly _arc?;
    private _args?;
    constructor(arc?: Arc, args?: any);
    readonly arc: Arc | undefined;
    getResults(inputParams: any): any;
    generate(inputParams: any): Promise<Descendant[]>;
}
export declare abstract class Walker {
    static Permuted: WalkerTactic;
    static Independent: WalkerTactic;
    descendants: Descendant[];
    currentAction: any;
    currentResult: any;
    tactic: WalkerTactic;
    constructor(tactic: any);
    onAction(action: Action): void;
    onResult(result: any): void;
    onResultDone(): void;
    onActionDone(): void;
    static walk(results: any, walker: Walker, action: Action): Descendant[];
    _runUpdateList(start: any, updateList: any): void;
    abstract createDescendant(result: any, score: any): void;
    createWalkerDescendant(item: any, score: any, hash: any, valid: any): void;
    isEmptyResult(result: any): boolean;
}
