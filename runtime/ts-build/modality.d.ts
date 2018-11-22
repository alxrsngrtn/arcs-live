import { SlotDomConsumer } from './slot-dom-consumer.js';
import { SuggestDomConsumer } from '../suggest-dom-consumer.js';
import { DescriptionDomFormatter } from './description-dom-formatter.js';
export declare class Modality {
    readonly name: string;
    readonly slotConsumerClass: typeof SlotDomConsumer;
    readonly suggestionConsumerClass: typeof SuggestDomConsumer;
    readonly descriptionFormatter?: typeof DescriptionDomFormatter;
    static _modalities: {
        'dom': Modality;
        'dom-touch': Modality;
        'vr': Modality;
        'mock': Modality;
    };
    private constructor();
    static forName(name: string): any;
}
