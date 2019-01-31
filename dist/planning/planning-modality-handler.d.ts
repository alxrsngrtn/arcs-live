/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { SlotDomConsumer } from '../runtime/slot-dom-consumer.js';
import { SuggestDomConsumer } from './suggest-dom-consumer.js';
import { ModalityHandler } from '../runtime/modality-handler.js';
import { DescriptionFormatter } from '../runtime/description-formatter.js';
export declare class PlanningModalityHandler extends ModalityHandler {
    readonly suggestionConsumerClass: typeof SuggestDomConsumer;
    constructor(slotConsumerClass: typeof SlotDomConsumer, suggestionConsumerClass: typeof SuggestDomConsumer, descriptionFormatter?: typeof DescriptionFormatter);
    static createHeadlessHandler(): PlanningModalityHandler;
    static readonly domHandler: PlanningModalityHandler;
}
