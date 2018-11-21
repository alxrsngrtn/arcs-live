import { SlotDomConsumer } from './slot-dom-consumer.js';
import { SuggestDomConsumer } from '../suggest-dom-consumer.js';
import { DescriptionDomFormatter } from './description-dom-formatter.js';
export declare class Affordance {
    readonly name: string;
    readonly slotConsumerClass: typeof SlotDomConsumer;
    readonly suggestionConsumerClass: typeof SuggestDomConsumer;
    readonly descriptionFormatter?: typeof DescriptionDomFormatter;
    static _affordances: {
        'dom': Affordance;
        'dom-touch': Affordance;
        'vr': Affordance;
        'mock': Affordance;
    };
    private constructor();
    static forName(name: string): any;
}
