/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/chai-web.js';
/**
 * Simple class to verify callbacks used in the Arcs storage APIs.
 *
 * Usage:
 * ```
 *   const varCallbacks = new CallbackTracker(var1, 6);
 *   .... // do work
 *   varCallbacks.verify();
 * ```
 */
// TODO(lindner): make this more generic when we have a mocking toolkit available
export class CallbackTracker {
    constructor(expectedEvents) {
        this.expectedEvents = expectedEvents;
        // tslint:disable-next-line: no-any
        this.events = [];
    }
    static async create(store, expectedEvents = 0) {
        const tracker = new CallbackTracker(expectedEvents);
        const activeStore = await store.activate();
        activeStore.on(async (val) => tracker.changeEvent(val));
        return tracker;
    }
    // called for each change event
    // tslint:disable-next-line: no-any
    changeEvent(c) {
        this.events.push(c);
        return true;
    }
    /**
     * Tests that the number of expected callbacks are executed.
     * If the DEBUG environment variable is set always display accumulated events
     */
    verify() {
        if (process.env['DEBUG'] === 'true' || this.events.length !== this.expectedEvents) {
            console.log('Callback events:', JSON.stringify(this.events, null, ' '));
        }
        assert.lengthOf(this.events, this.expectedEvents, 'Mismatched number of callbacks');
    }
}
//# sourceMappingURL=callback-tracker.js.map