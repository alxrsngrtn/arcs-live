/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { SlotComposer, SlotComposerOptions } from '../slot-composer.js';
import { SlotContext } from '../slot-context.js';
import { Particle } from '../recipe/particle.js';
import { Content } from '../slot-consumer.js';
import { Arc } from '../arc.js';
/**
 * A helper class for NodeJS tests that mimics SlotComposer without relying on DOM APIs.
 */
export declare class FakeSlotComposer extends SlotComposer {
    constructor(options?: SlotComposerOptions);
    renderSlot(particle: Particle, slotName: string, content: Content): void;
    get contexts(): SlotContext[];
}
/**
 * A helper SlotComposer that records renderSlot calls.
 *
 *   I'm watching you, Wazowski. Always watching...
 */
export declare class RozSlotComposer extends FakeSlotComposer {
    received: [string, string, any][];
    renderSlot(particle: Particle, slotName: string, content: Content): void;
    /** Listener for experimental `output` implementation */
    delegateOutput(arc: Arc, particle: Particle, content: any): void;
}
