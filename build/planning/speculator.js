/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { Relevance } from '../runtime/relevance.js';
export class Speculator {
    constructor() {
        this.speculativeArcs = [];
    }
    async speculate(arc, plan, hash) {
        assert(plan.isResolved(), `Cannot speculate on an unresolved plan: ${plan.toString({ showUnresolved: true })}`);
        const speculativeArc = await arc.cloneForSpeculativeExecution();
        this.speculativeArcs.push(speculativeArc);
        const relevance = Relevance.create(arc, plan);
        await speculativeArc.instantiate(plan);
        await this.awaitCompletion(relevance, speculativeArc);
        if (!relevance.isRelevant(plan)) {
            return null;
        }
        return { speculativeArc, relevance };
    }
    async awaitCompletion(relevance, speculativeArc) {
        const messageCount = speculativeArc.pec.messageCount;
        relevance.apply(await speculativeArc.pec.idle);
        // We expect two messages here, one requesting the idle status, and one answering it.
        if (speculativeArc.pec.messageCount !== messageCount + 2) {
            return this.awaitCompletion(relevance, speculativeArc);
        }
        else {
            speculativeArc.dispose();
            this.speculativeArcs.splice(this.speculativeArcs.indexOf(speculativeArc, 1));
            return relevance;
        }
    }
    dispose() {
        for (const arc of this.speculativeArcs) {
            arc.dispose();
        }
    }
}
//# sourceMappingURL=speculator.js.map