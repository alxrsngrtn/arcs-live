/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DescriptionFormatter } from './description-formatter.js';
import { SlotConsumer } from './slot-consumer.js';
export declare class ModalityHandler {
    readonly slotConsumerClass: typeof SlotConsumer;
    readonly descriptionFormatter?: typeof DescriptionFormatter;
    constructor(slotConsumerClass: typeof SlotConsumer, descriptionFormatter?: typeof DescriptionFormatter);
    static createHeadlessHandler(): ModalityHandler;
    static readonly headlessHandler: ModalityHandler;
    static readonly domHandler: ModalityHandler;
}
