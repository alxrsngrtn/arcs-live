import { Arc } from '../runtime/arc.js';
import { SuggestDomConsumer } from './suggest-dom-consumer.js';
import { Suggestion } from './plan/suggestion.js';
export declare class HeadlessSuggestDomConsumer extends SuggestDomConsumer {
    _eventHandler: any;
    _setContentPromise: any;
    _content: any;
    contentAvailable: any;
    _contentAvailableResolve: any;
    constructor(arc: Arc, containerKind: any, suggestion: Suggestion, eventHandler: any);
    get suggestion(): Suggestion;
    get templatePrefix(): string;
    onContainerUpdate(container: any, originalContainer: any): void;
    static render(arc: Arc, container: any, suggestion: Suggestion): SuggestDomConsumer;
    setContent(content: any, handler: any): void;
    createNewContainer(container: any, subId: any): any;
    isSameContainer(container: any, contextContainer: any): boolean;
    getInnerContainer(slotId: any): any;
    createTemplateElement(template: any): any;
    static findRootContainers(container: any): any;
    static clear(container: any): void;
    _onUpdate(rendering: any): void;
    _stampTemplate(template: any): void;
    _initMutationObserver(): MutationObserver;
    _observe(): void;
}
