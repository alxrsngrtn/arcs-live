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
    static addModality(name, slotConsumerClass, suggestionConsumerClass, descriptionFormatter) {
        assert(!Modality._modalities[name], `Modality '${name}' already exists`);
        Modality._modalities[name] = new Modality(name, slotConsumerClass, suggestionConsumerClass, descriptionFormatter);
        Modality._modalities[`mock-${name}`] =
            new Modality(`mock-${name}`, MockSlotDomConsumer, MockSuggestDomConsumer);
    }
    static init() {
        Object.keys(Modality._modalities).forEach(key => delete Modality._modalities[key]);
        Modality.addModality('dom', SlotDomConsumer, SuggestDomConsumer, DescriptionDomFormatter);
        Modality.addModality('dom-touch', SlotDomConsumer, SuggestDomConsumer, DescriptionDomFormatter);
        Modality.addModality('vr', SlotDomConsumer, SuggestDomConsumer, DescriptionDomFormatter);
    }
    static forName(name) {
        assert(Modality._modalities[name], `Unsupported modality ${name}`);
        return Modality._modalities[name];
    }
}
Modality._modalities = {};
Modality.init();
//# sourceMappingURL=modality.js.map