/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Template } from '../../modalities/dom/components/xen/xen-template.js';
import { Arc } from './arc.js';
import { SlotConnection } from './recipe/slot-connection.js';
import { SlotConsumer, Content, Rendering } from './slot-consumer.js';
export interface DomRendering extends Rendering {
    liveDom?: Template;
}
export declare class SlotDomConsumer extends SlotConsumer {
    private readonly _observer;
    constructor(arc: Arc, consumeConn?: SlotConnection, containerKind?: string);
    constructRenderRequest(): string[];
    static hasTemplate(templatePrefix: any): any;
    isSameContainer(container: any, contextContainer: any): boolean;
    createNewContainer(contextContainer: any, subId: any): ShadowRoot;
    deleteContainer(container: any): void;
    formatContent(content: Content, subId: string): Content | undefined;
    _modelForSingletonSlot(model: any, subId: any): any;
    _modelForSetSlotConsumedAsSetSlot(model: any, subId: any): any;
    _modelForSetSlotConsumedAsSingletonSlot(model: any, subId: any): any;
    setContainerContent(rendering: DomRendering, content: Content, subId: any): void;
    clearContainer(rendering: DomRendering): void;
    dispose(): void;
    static clear(container: any): void;
    static clearCache(): void;
    static findRootContainers(topContainer: any): {};
    createTemplateElement(template: any): HTMLTemplateElement & {
        innerHTML: any;
    };
    readonly templatePrefix: string;
    _setTemplate(rendering: DomRendering, templatePrefix: any, templateName: any, template: any): void;
    _onUpdate(rendering: DomRendering): void;
    _observe(container: any): void;
    _stampTemplate(rendering: DomRendering, template: any): void;
    _eventMapper(eventHandler: any, node: any, eventName: any, handlerName: any): void;
    _updateModel(rendering: DomRendering): void;
    initInnerContainers(container: any): void;
    getNodeValue(node: any, name: any): any;
    isDirectInnerSlot(container: any, innerContainer: any): boolean;
    _initMutationObserver(): MutationObserver | null;
    formatHostedContent(content: Content): {};
}
