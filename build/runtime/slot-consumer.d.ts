/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from './arc.js';
import { Description } from './description.js';
import { SlotConnection } from './recipe/slot-connection.js';
import { HostedSlotContext, ProvidedSlotContext, SlotContext } from './slot-context.js';
import { StartRenderOptions, StopRenderOptions } from './particle-execution-host.js';
export interface Content {
    templateName?: string | Map<string, string>;
    model?: {
        models: any;
        hash: string;
    };
    descriptions?: Map<string, Description>;
    template?: string | Map<string, string>;
}
export interface Rendering {
    container?: any;
    model?: any;
    templateName?: string;
}
export declare class SlotConsumer {
    readonly consumeConn?: SlotConnection;
    slotContext: SlotContext;
    readonly directlyProvidedSlotContexts: ProvidedSlotContext[];
    readonly hostedSlotContexts: HostedSlotContext[];
    startRenderCallback: (options: StartRenderOptions) => void;
    stopRenderCallback: (options: StopRenderOptions) => void;
    eventHandler: ({}: {}) => void;
    readonly containerKind?: string;
    private _renderingBySubId;
    private innerContainerBySlotId;
    readonly arc: Arc;
    private _description;
    constructor(arc: Arc, consumeConn?: SlotConnection, containerKind?: string);
    readonly description: Description;
    resetDescription(): Promise<void>;
    getRendering(subId?: any): Rendering;
    readonly renderings: [string, Rendering][];
    addRenderingBySubId(subId: string | undefined, rendering: Rendering): void;
    addHostedSlotContexts(context: HostedSlotContext): void;
    readonly allProvidedSlotContexts: ProvidedSlotContext[];
    findProvidedContext(predicate: (_: ProvidedSlotContext) => boolean): ProvidedSlotContext;
    private generateProvidedContexts;
    onContainerUpdate(newContainer: any, originalContainer: any): void;
    createProvidedContexts(): ProvidedSlotContext[];
    updateProvidedContexts(): void;
    startRender(): void;
    stopRender(): void;
    setContent(content: Content, handler: any): void;
    populateHandleDescriptions(): Map<string, Description>;
    getInnerContainer(slotId: any): any;
    _initInnerSlotContainer(slotId: any, subId: any, container: any): void;
    _clearInnerSlotContainers(subIds: any): void;
    isSameContainer(container: any, contextContainer: any): boolean;
    constructRenderRequest(): string[];
    dispose(): void;
    createNewContainer(contextContainer: any, subId: any): {};
    deleteContainer(container: any): void;
    clearContainer(rendering: any): void;
    setContainerContent(rendering: any, content: Content, subId: any): void;
    formatContent(content: Content, subId: any): Content;
    formatHostedContent(content: Content): {};
    static clear(container: any): void;
    static findRootContainers(topContainer: any): {};
}
