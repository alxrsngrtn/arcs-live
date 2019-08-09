/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ModalityHandler } from '../modality-handler.js';
import { SlotComposer } from '../slot-composer.js';
/**
 * A helper class for NodeJS tests that mimics SlotComposer without relying on DOM APIs.
 */
export class FakeSlotComposer extends SlotComposer {
    constructor(options = {}) {
        if (options.modalityHandler === undefined) {
            options.modalityHandler = ModalityHandler.createHeadlessHandler();
        }
        super({
            rootContainer: { 'root': 'root-context' },
            ...options
        });
    }
    renderSlot(particle, slotName, content) {
        super.renderSlot(particle, slotName, content);
        // In production updateProvidedContexts() is done in DOM Mutation Observer.
        // We don't have it in tests, so we do it here.
        const slotConsumer = this.getSlotConsumer(particle, slotName);
        if (slotConsumer)
            slotConsumer.updateProvidedContexts();
    }
    // Accessors for testing.
    get contexts() {
        return this._contexts;
    }
}
/**
 * A helper SlotComposer that records renderSlot calls.
 *
 *   I'm watching you, Wazowski. Always watching...
 */
export class RozSlotComposer extends FakeSlotComposer {
    constructor() {
        super(...arguments);
        // To make test assertions more concise, renderSlot calls are recorded as tuples of
        // (particle-name, slot-name, render-content) rather than objects with similarly named keys.
        // tslint:disable-next-line: no-any
        this.received = [];
    }
    renderSlot(particle, slotName, content) {
        // super.renderSlot may modify 'content', so record a copy of it before calling that.
        const copy = JSON.parse(JSON.stringify(content));
        if (copy.templateName) {
            // Currently templateName can only ever be 'default'; no need to keep checking that in tests.
            // If this ever changes, blow up here so we catch the change early.
            if (copy.templateName !== 'default') {
                throw new Error(`renderSlot called with templateName set to '${copy.templateName}' ` +
                    `instead of 'default'; some unit tests will probably need updating`);
            }
            delete copy.templateName;
        }
        this.received.push([particle.name, slotName, copy]);
        super.renderSlot(particle, slotName, content);
    }
}
//# sourceMappingURL=fake-slot-composer.js.map