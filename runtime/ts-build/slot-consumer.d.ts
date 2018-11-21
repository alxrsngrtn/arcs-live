/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { SlotContext } from './slot-context.js';
import { SlotConnection } from './recipe/slot-connection.js';
import { HostedSlotConsumer } from './hosted-slot-consumer.js';
export declare class SlotConsumer {
    _consumeConn: SlotConnection;
    slotContext: SlotContext;
    providedSlotContexts: SlotContext[];
    startRenderCallback: ({}: {}) => void;
    stopRenderCallback: ({}: {}) => void;
    eventHandler: ({}: {}) => void;
    readonly containerKind: string;
    private _renderingBySubId;
    private innerContainerBySlotId;
    constructor(consumeConn: any, containerKind: any);
    readonly consumeConn: SlotConnection;
    getRendering(subId: any): {
        container?: {};
    };
    readonly renderings: [string, {
        container?: {};
    }][];
    onContainerUpdate(newContainer: any, originalContainer: any): void;
    createProvidedContexts(): SlotContext[];
    updateProvidedContexts(): void;
    startRender(): void;
    stopRender(): void;
    setContent(content: any, handler: any, arc: any): Promise<void>;
    populateHandleDescriptions(arc: any): Promise<{}>;
    getInnerContainer(slotId: any): any;
    _initInnerSlotContainer(slotId: any, subId: any, container: any): void;
    _clearInnerSlotContainers(subIds: any): void;
    isSameContainer(container: any, contextContainer: any): boolean;
    readonly hostedConsumers: HostedSlotConsumer[];
    constructRenderRequest(hostedSlotConsumer?: any): string[];
    dispose(): void;
    createNewContainer(contextContainer: any, subId: any): {};
    deleteContainer(container: any): void;
    clearContainer(rendering: any): void;
    setContainerContent(rendering: any, content: any, subId: any): void;
    formatContent(content: any, subId: any): object;
    formatHostedContent(hostedSlot: any, content: any): {};
    static clear(container: any): void;
}
