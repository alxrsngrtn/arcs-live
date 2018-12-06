/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { SlotDomConsumer } from './slot-dom-consumer.js';
import { SuggestDomConsumer } from './suggest-dom-consumer.js';
import { MockSlotDomConsumer } from './testing/mock-slot-dom-consumer.js';
import { MockSuggestDomConsumer } from './testing/mock-suggest-dom-consumer.js';
import { DescriptionDomFormatter } from './description-dom-formatter.js';
export class Modality {
    constructor(name, slotConsumerClass, suggestionConsumerClass, descriptionFormatter) {
        this.name = name;
        this.slotConsumerClass = slotConsumerClass;
        this.suggestionConsumerClass = suggestionConsumerClass;
        this.descriptionFormatter = descriptionFormatter;
    }
    static forName(name) {
        assert(Modality._modalities[name], `Unsupported modality ${name}`);
        return Modality._modalities[name];
    }
}
Modality._modalities = {
    'dom': new Modality('dom', SlotDomConsumer, SuggestDomConsumer, DescriptionDomFormatter),
    'dom-touch': new Modality('dom-touch', SlotDomConsumer, SuggestDomConsumer, DescriptionDomFormatter),
    'vr': new Modality('vr', SlotDomConsumer, SuggestDomConsumer, DescriptionDomFormatter),
    'mock': new Modality('mock', MockSlotDomConsumer, MockSuggestDomConsumer)
};
//# sourceMappingURL=modality.js.map