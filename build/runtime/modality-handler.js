import { DescriptionDomFormatter } from './description-dom-formatter.js';
import { SlotDomConsumer } from './slot-dom-consumer.js';
import { MockSlotDomConsumer } from './testing/mock-slot-dom-consumer.js';
export class ModalityHandler {
    constructor(slotConsumerClass, descriptionFormatter) {
        this.slotConsumerClass = slotConsumerClass;
        this.descriptionFormatter = descriptionFormatter;
    }
    static createHeadlessHandler() {
        return new ModalityHandler(MockSlotDomConsumer);
    }
}
ModalityHandler.domHandler = new ModalityHandler(SlotDomConsumer, DescriptionDomFormatter);
//# sourceMappingURL=modality-handler.js.map