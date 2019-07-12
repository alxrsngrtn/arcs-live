/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../runtime/arc.js';
import { SlotDomConsumer } from '../runtime/slot-dom-consumer.js';
import { Content } from '../runtime/slot-consumer.js';
import { Suggestion } from './plan/suggestion.js';
export declare class SuggestDomConsumer extends SlotDomConsumer {
    _suggestion: Suggestion;
    _suggestionContent: any;
    _eventHandler: any;
    constructor(arc: Arc, containerKind: string, suggestion: Suggestion, eventHandler: any);
    readonly suggestion: Suggestion;
    readonly templatePrefix: string;
    formatContent(content: Content): Content | undefined;
    onContainerUpdate(container: any, originalContainer: any): void;
    static _extractContent(suggestion: Suggestion): import("./plan/suggestion.js").DescriptionProperties;
    static render(arc: Arc, container: any, suggestion: Suggestion): SlotDomConsumer;
}
