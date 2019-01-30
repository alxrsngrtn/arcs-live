import { SlotDomConsumer } from './slot-dom-consumer.js';
import { DescriptionFormatter } from './description-formatter.js';
export declare class ModalityHandler {
    readonly slotConsumerClass: typeof SlotDomConsumer;
    readonly descriptionFormatter?: typeof DescriptionFormatter;
    constructor(slotConsumerClass: typeof SlotDomConsumer, descriptionFormatter?: typeof DescriptionFormatter);
    static createHeadlessHandler(): ModalityHandler;
    static readonly domHandler: ModalityHandler;
}
