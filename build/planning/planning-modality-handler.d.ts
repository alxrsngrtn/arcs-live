import { DescriptionFormatter } from '../runtime/description-formatter.js';
import { ModalityHandler } from '../runtime/modality-handler.js';
import { SlotConsumer } from '../runtime/slot-consumer.js';
import { SuggestDomConsumer } from './suggest-dom-consumer.js';
export declare class PlanningModalityHandler extends ModalityHandler {
    readonly suggestionConsumerClass: typeof SuggestDomConsumer;
    constructor(slotConsumerClass: typeof SlotConsumer, suggestionConsumerClass: typeof SuggestDomConsumer, descriptionFormatter?: typeof DescriptionFormatter);
    static createHeadlessHandler(): PlanningModalityHandler;
    static readonly domHandler: PlanningModalityHandler;
}
