/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DescriptionDomFormatter } from './description-dom-formatter.js';
import { DescriptionFormatter } from './description-formatter.js';
import { HeadlessSlotDomConsumer } from './headless-slot-dom-consumer.js';
import { SlotConsumer } from './slot-consumer.js';
import { SlotDomConsumer } from './slot-dom-consumer.js';
export class ModalityHandler {
    constructor(slotConsumerClass, descriptionFormatter) {
        this.slotConsumerClass = slotConsumerClass;
        this.descriptionFormatter = descriptionFormatter;
    }
    static createHeadlessHandler() {
        return new ModalityHandler(HeadlessSlotDomConsumer);
    }
}
ModalityHandler.headlessHandler = new ModalityHandler(HeadlessSlotDomConsumer);
ModalityHandler.basicHandler = new ModalityHandler(SlotConsumer, DescriptionFormatter);
ModalityHandler.domHandler = new ModalityHandler(SlotDomConsumer, DescriptionDomFormatter);
//# sourceMappingURL=modality-handler.js.map