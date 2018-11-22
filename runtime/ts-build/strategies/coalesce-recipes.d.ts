import { Strategy } from '../strategizer/strategizer.js';
export declare class CoalesceRecipes extends Strategy {
    getResults(inputParams: any): any;
    generate(inputParams: any): Promise<import("../strategizer/strategizer.js").Descendant[]>;
}
