/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ProvideSlotConnectionSpec } from './particle-spec.js';
import { Handle } from './recipe/handle.js';
import { SlotConsumer, Content } from './slot-consumer.js';
/**
 * Represents a single slot in the rendering system.
 */
export declare abstract class SlotContext {
    readonly id: string;
    readonly sourceSlotConsumer: SlotConsumer;
    readonly slotConsumers: SlotConsumer[];
    constructor(id: string, sourceSlotConsumer?: SlotConsumer);
    addSlotConsumer(slotConsumer: SlotConsumer): void;
    clearSlotConsumers(): void;
    abstract onRenderSlot(consumer: SlotConsumer, content: Content, handler: any): any;
    abstract get containerAvailable(): boolean;
}
/**
 * Represents a slot created by a transformation particle in the inner arc.
 *
 * Render calls for that slot are routed to the transformation particle,
 * which receives them as innerArcRender calls.
 *
 * TODO:
 * Today startRender/stopRender calls for particles rendering into this slot are governed by the
 * availability of the container on the transformation particle. This should be optional and only
 * used if the purpose of the innerArc is rendering to the outer arc. It should be possible for
 * the particle which doesn't consume a slot to create an inner arc with hosted slots, which
 * today is not feasible.
 */
export declare class HostedSlotContext extends SlotContext {
    readonly storeId: string;
    private _containerAvailable;
    constructor(id: string, transformationSlotConsumer: SlotConsumer, storeId: string);
    onRenderSlot(consumer: SlotConsumer, content: Content, handler: any): void;
    addSlotConsumer(consumer: SlotConsumer): void;
    get containerAvailable(): boolean;
    set containerAvailable(containerAvailable: boolean);
}
/**
 * Represents a slot provided by a particle through a provide connection or one of the root slots
 * provided by the shell. Holds container (eg div element) and its additional info.
 * Must be initialized either with a container (for root slots provided by the shell) or
 * tuple of sourceSlotConsumer and spec (ProvidedSlotSpec) of the slot.
 */
export declare class ProvidedSlotContext extends SlotContext {
    readonly name: string;
    readonly tags: string[];
    private _container;
    spec: ProvideSlotConnectionSpec;
    handles: Handle[];
    constructor(id: string, name: string, tags: string[], container: HTMLElement, spec: ProvideSlotConnectionSpec, sourceSlotConsumer?: SlotConsumer);
    onRenderSlot(consumer: SlotConsumer, content: Content, handler: any): void;
    get container(): HTMLElement;
    get containerAvailable(): boolean;
    static createContextForContainer(id: any, name: any, container: any, tags: any): ProvidedSlotContext;
    isSameContainer(container: any): boolean;
    set container(container: HTMLElement);
    addSlotConsumer(slotConsumer: any): void;
}
