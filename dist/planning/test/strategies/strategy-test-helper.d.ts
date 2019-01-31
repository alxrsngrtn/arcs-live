import { Arc } from '../../../runtime/arc.js';
import { Manifest } from '../../../runtime/manifest.js';
export declare class StrategyTestHelper {
    static createTestArc(context: Manifest, options?: {
        arcId?: string;
        modalityName?: string;
    }): Arc;
    static createTestStrategyArgs(arc: Arc, args?: any): any;
    static run(arc: Arc, clazz: any, recipe: any): any;
    static onlyResult(arc: Arc, clazz: any, recipe: any): any;
    static theResults(arc: Arc, clazz: any, recipe: any): any;
    static noResult(arc: Arc, clazz: any, recipe: any): any;
}
