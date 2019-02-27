/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Suggestion } from '../plan/suggestion.js';
import { RecipeIndex } from '../recipe-index.js';
import { Manifest } from '../../runtime/manifest.js';
import { TestHelperOptions, TestHelper } from '../../runtime/testing/test-helper.js';
declare type TestHelperPlanOptions = TestHelperOptions & {
    expectedNumPlans?: number;
    expectedSuggestions?: any;
    includeInnerArcs?: boolean;
    verify?: any;
};
/**
 * Helper class to recipe instantiation and replanning.
 * Usage example:
 *   let helper = await TestHelper.createAndPlan({manifestFilename: 'my.manifest'});
 *   await helper.acceptSuggestion({particles: ['MyParticle1', 'MyParticle2']});
 *   await helper.verifyData('MyParticle1', 'myHandle1', async (handle) => { ... });
 */
export declare class PlanningTestHelper extends TestHelper {
    suggestions: any;
    recipeIndex: RecipeIndex;
    static create(options?: TestHelperPlanOptions): Promise<PlanningTestHelper>;
    /**
     * Creates a Test Helper instances and triggers planning .
     */
    static createAndPlan(options: TestHelperPlanOptions): Promise<PlanningTestHelper>;
    static parseManifest(manifestString: string, loader: any): Promise<Manifest>;
    /**
     * Generates suggestions for the arc.
     * |options| contains possible verifications to be performed on the generated plans:
     *   - expectedNumPlans: (optional) number of expected number of generated suggestions to verify.
     *   - expectedSuggestions: (optional) list of expected description texts representing the generated suggestion.
     *   - verify: a handler method to be called to verify the resulting suggestions.
     */
    makePlans(options?: TestHelperPlanOptions): Promise<PlanningTestHelper>;
    /**
     * Accepts a suggestion. |options| may provide the exact list of particles representing the
     * suggestion to accept. Otherwise, fallback to a single generated suggestion, if appropriate.
     */
    acceptSuggestion(options?: {
        hostedParticles?: string[];
        particles?: string[];
        descriptionText?: string;
    }): Promise<void>;
    findSuggestionByParticleNames(particlesNames: string[]): any;
    instantiateSuggestion(suggestion: Suggestion): Promise<void>;
    /**
     * Getter for a single available suggestion plan (fails, if there is more than one).
     */
    readonly plan: any;
}
export {};
