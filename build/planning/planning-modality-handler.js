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
import { MockSlotDomConsumer } from '../runtime/testing/mock-slot-dom-consumer.js';
import { MockSuggestDomConsumer } from './testing/mock-suggest-dom-consumer.js';
import { ModalityHandler } from '../runtime/modality-handler.js';
import { DescriptionDomFormatter } from '../runtime/description-dom-formatter.js';
export class PlanningModalityHandler extends ModalityHandler {
    constructor(slotConsumerClass, suggestionConsumerClass, descriptionFormatter) {
        super(slotConsumerClass, descriptionFormatter);
        this.suggestionConsumerClass = suggestionConsumerClass;
    }
    static createHeadlessHandler() {
        return new PlanningModalityHandler(MockSlotDomConsumer, MockSuggestDomConsumer);
    }
}
PlanningModalityHandler.domHandler = new PlanningModalityHandler(SlotDomConsumer, SuggestDomConsumer, DescriptionDomFormatter);
//# sourceMappingURL=planning-modality-handler.js.map