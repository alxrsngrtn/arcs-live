/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Handle } from './handle.js';
import { Consumer } from './hot.js';
import { InnerArcHandle } from './particle-execution-context.js';
import { HandleConnectionSpec, ParticleSpec } from './particle-spec.js';
import { Relevance } from './relevance.js';
import { SlotProxy } from './slot-proxy.js';
import { Content } from './slot-consumer.js';
import { Entity, EntityRawData, MutableEntityData } from './entity.js';
export interface Capabilities {
    constructInnerArc?: (particle: Particle) => Promise<InnerArcHandle>;
    serviceRequest?: (particle: Particle, args: any, callback: any) => void;
}
/**
 * A basic particle. For particles that provide UI, you may like to
 * instead use DOMParticle.
 */
export declare class Particle {
    static spec: ParticleSpec;
    spec: ParticleSpec;
    readonly extraData: boolean;
    readonly relevances: (Relevance | number)[];
    handles: ReadonlyMap<string, Handle>;
    private _idle;
    private _idleResolver;
    private _busy;
    protected slotProxiesByName: Map<string, SlotProxy>;
    private capabilities;
    constructor();
    /**
     * This sets the capabilities for this particle.  This can only
     * be called once.
     */
    setCapabilities(capabilities: Capabilities): void;
    private invokeSafely;
    callSetHandles(handles: ReadonlyMap<string, Handle>, onException: Consumer<Error>): Promise<void>;
    /**
     * This method is invoked with a handle for each store this particle
     * is registered to interact with, once those handles are ready for
     * interaction. Override the method to register for events from
     * the handles.
     *
     * @param handles a map from handle names to store handles.
     */
    protected setHandles(handles: ReadonlyMap<string, Handle>): Promise<void>;
    callOnHandleSync(handle: Handle, model: any, onException: Consumer<Error>): Promise<void>;
    /**
     * Called for handles that are configured with both keepSynced and notifySync, when they are
     * updated with the full model of their data. This will occur once after setHandles() and any time
     * thereafter if the handle is resynchronized.
     *
     * @param handle The Handle instance that was updated.
     * @param model For Singleton-backed Handles, the Entity data or null if the Singleton is not set.
     *        For Collection-backed Handles, the Array of Entities, which may be empty.
     */
    protected onHandleSync(handle: Handle, model: any): Promise<void>;
    callOnHandleUpdate(handle: Handle, update: {
        data?: any;
        oldData?: any;
        added?: any;
        removed?: any;
        originator?: any;
    }, onException: Consumer<Error>): Promise<void>;
    /**
     * Called for handles that are configued with notifyUpdate, when change events are received from
     * the backing store. For handles also configured with keepSynced these events will be correctly
     * ordered, with some potential skips if a desync occurs. For handles not configured with
     * keepSynced, all change events will be passed through as they are received.
     *
     * @param handle The Handle instance that was updated.
     * @param update An object containing one of the following fields:
     *  - data: The full Entity for a Singleton-backed Handle.
     *  - oldData: The previous value of a Singleton before it was updated.
     *  - added: An Array of Entities added to a Collection-backed Handle.
     *  - removed: An Array of Entities removed from a Collection-backed Handle.
     */
    protected onHandleUpdate(handle: Handle, update: {
        data?: any;
        oldData?: any;
        added?: any;
        removed?: any;
        originator?: any;
    }): Promise<void>;
    callOnHandleDesync(handle: Handle, onException: Consumer<Error>): Promise<void>;
    /**
     * Called for handles that are configured with both keepSynced and notifyDesync, when they are
     * detected as being out-of-date against the backing store. For Singletons, the event that triggers
     * this will also resync the data and thus this call may usually be ignored. For Collections, the
     * underlying proxy will automatically request a full copy of the stored data to resynchronize.
     * onHandleSync will be invoked when that is received.
     *
     * @param handle The Handle instance that was desynchronized.
     */
    protected onHandleDesync(handle: Handle): Promise<void>;
    constructInnerArc(): Promise<InnerArcHandle>;
    readonly busy: boolean;
    readonly idle: Promise<void>;
    relevance: Relevance | number;
    startBusy(): void;
    doneBusy(): void;
    inputs(): HandleConnectionSpec[];
    outputs(): HandleConnectionSpec[];
    hasSlotProxy(name: string): boolean;
    addSlotProxy(slotlet: SlotProxy): void;
    removeSlotProxy(name: string): void;
    /**
     * Request (outerPEC) service invocations.
     */
    service(request: any): Promise<{}>;
    /**
     * Returns the slot with provided name.
     */
    getSlot(name: string): SlotProxy;
    getSlotNames(): string[];
    static buildManifest(strings: string[], ...bits: any[]): string;
    setParticleDescription(pattern: any): Promise<boolean>;
    setDescriptionPattern(connectionName: string, pattern: any): Promise<boolean>;
    idFor(entity: Entity): string;
    dataClone(entity: Entity): EntityRawData;
    mutate(entity: Entity, mutation: Consumer<MutableEntityData> | {}): void;
    renderSlot(slotName: string, contentTypes: string[]): void;
    renderHostedSlot(slotName: string, hostedSlotId: string, content: Content): void;
    fireEvent(slotName: string, event: {}): void;
}
