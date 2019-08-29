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
import { ArcInspector } from './arc-inspector.js';
import { Handle } from './handle.js';
import { ParticleSpec } from './particle-spec.js';
import { Particle } from './particle.js';
import * as recipeHandle from './recipe/handle.js';
import * as recipeParticle from './recipe/particle.js';
import { StorageProxy } from './storage-proxy.js';
import { Content } from './slot-consumer.js';
import { SerializedModelEntry } from './storage/crdt-collection-model.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
import { Type } from './type.js';
import { PropagatedException } from './arc-exceptions.js';
import { Consumer, Runnable } from './hot.js';
import { MessagePort } from './message-channel.js';
declare class ThingMapper {
    _prefix: string;
    _nextIdentifier: number;
    _idMap: Map<string, {}>;
    _reverseIdMap: Map<{}, string>;
    constructor(prefix: string);
    _newIdentifier(): string;
    createMappingForThing(thing: any, requestedId?: any): any;
    recreateMappingForThing(things: any): any[];
    maybeCreateMappingForThing(thing: any): any;
    establishThingMapping(id: any, thing: any): Promise<void>;
    hasMappingForThing(thing: any): boolean;
    identifierForThing(thing: any): string;
    thingForIdentifier(id: any): {};
}
export declare class APIPort {
    private readonly _port;
    _mapper: ThingMapper;
    protected inspector: ArcInspector | null;
    protected attachStack: boolean;
    messageCount: number;
    constructor(messagePort: MessagePort, prefix: string);
    _testingHook(): void;
    close(): void;
    _processMessage(e: any): Promise<void>;
    send(name: string, args: {}): Promise<void>;
    supportsJavaParticle(): boolean;
}
export declare abstract class PECOuterPort extends APIPort {
    constructor(messagePort: MessagePort, arc: Arc);
    Stop(): void;
    DefineHandle(store: StorageProviderBase, type: Type, name: string): void;
    InstantiateParticle(particle: recipeParticle.Particle, id: string, spec: ParticleSpec, stores: Map<string, StorageProviderBase>): void;
    ReloadParticles(particles: recipeParticle.Particle[], ids: string[]): void;
    UIEvent(particle: recipeParticle.Particle, slotName: string, event: {}): void;
    SimpleCallback(callback: number, data: {}): void;
    AwaitIdle(version: number): void;
    StartRender(particle: recipeParticle.Particle, slotName: string, providedSlots: Map<string, string>, contentTypes: string[]): void;
    StopRender(particle: recipeParticle.Particle, slotName: string): void;
    abstract onRender(particle: recipeParticle.Particle, slotName: string, content: Content): any;
    abstract onInitializeProxy(handle: StorageProviderBase, callback: number): any;
    abstract onSynchronizeProxy(handle: StorageProviderBase, callback: number): any;
    abstract onHandleGet(handle: StorageProviderBase, callback: number): any;
    abstract onHandleToList(handle: StorageProviderBase, callback: number): any;
    abstract onHandleSet(handle: StorageProviderBase, data: {}, particleId: string, barrier: string): any;
    abstract onHandleClear(handle: StorageProviderBase, particleId: string, barrier: string): any;
    abstract onHandleStore(handle: StorageProviderBase, callback: number, data: {
        value: {};
        keys: string[];
    }, particleId: string): any;
    abstract onHandleRemove(handle: StorageProviderBase, callback: number, data: {}, particleId: string): any;
    abstract onHandleRemoveMultiple(handle: StorageProviderBase, callback: number, data: {}, particleId: string): any;
    abstract onHandleStream(handle: StorageProviderBase, callback: number, pageSize: number, forward: boolean): any;
    abstract onStreamCursorNext(handle: StorageProviderBase, callback: number, cursorId: number): any;
    abstract onStreamCursorClose(handle: StorageProviderBase, cursorId: number): any;
    abstract onIdle(version: number, relevance: Map<recipeParticle.Particle, number[]>): any;
    abstract onGetBackingStore(callback: number, storageKey: string, type: Type): any;
    GetBackingStoreCallback(store: StorageProviderBase, callback: number, type: Type, name: string, id: string, storageKey: string): void;
    abstract onConstructInnerArc(callback: number, particle: recipeParticle.Particle): any;
    ConstructArcCallback(callback: number, arc: {}): void;
    abstract onArcCreateHandle(callback: number, arc: {}, type: Type, name: string): any;
    CreateHandleCallback(handle: StorageProviderBase, callback: number, type: Type, name: string, id: string): void;
    abstract onArcMapHandle(callback: number, arc: Arc, handle: recipeHandle.Handle): any;
    MapHandleCallback(newHandle: {}, callback: number, id: string): void;
    abstract onArcCreateSlot(callback: number, arc: Arc, transformationParticle: recipeParticle.Particle, transformationSlotName: string, handleId: string): any;
    CreateSlotCallback(slot: {}, callback: number, hostedSlotId: string): void;
    InnerArcRender(transformationParticle: recipeParticle.Particle, transformationSlotName: string, hostedSlotId: string, content: Content): void;
    abstract onArcLoadRecipe(arc: Arc, recipe: string, callback: number): any;
    abstract onReportExceptionInHost(exception: PropagatedException): any;
    abstract onServiceRequest(particle: recipeParticle.Particle, request: {}, callback: number): any;
    DevToolsConnected(): void;
}
export interface CursorNextValue {
    value: {}[];
    done: boolean;
}
export declare abstract class PECInnerPort extends APIPort {
    constructor(messagePort: MessagePort);
    abstract onStop(): any;
    abstract onDefineHandle(identifier: string, type: Type, name: string): any;
    abstract onInstantiateParticle(id: string, spec: ParticleSpec, proxies: Map<string, StorageProxy>): any;
    abstract onReloadParticles(ids: string[]): any;
    abstract onUIEvent(particle: Particle, slotName: string, event: {}): any;
    abstract onSimpleCallback(callback: Consumer<{}>, data: {}): any;
    abstract onAwaitIdle(version: number): any;
    abstract onStartRender(particle: Particle, slotName: string, providedSlots: Map<string, string>, contentTypes: string[]): any;
    abstract onStopRender(particle: Particle, slotName: string): any;
    Render(particle: Particle, slotName: string, content: Content): void;
    Output(particle: Particle, content: {}): void;
    InitializeProxy(handle: StorageProxy, callback: Consumer<{
        version: number;
    }>): void;
    SynchronizeProxy(handle: StorageProxy, callback: Consumer<{
        version: number;
        model: SerializedModelEntry[];
    }>): void;
    HandleGet(handle: StorageProxy, callback: Consumer<{
        id: string;
    }>): void;
    HandleToList(handle: StorageProxy, callback: Consumer<{
        id: string;
    }[]>): void;
    HandleSet(handle: StorageProxy, data: {}, particleId: string, barrier: string): void;
    HandleClear(handle: StorageProxy, particleId: string, barrier: string): void;
    HandleStore(handle: StorageProxy, callback: Runnable, data: {}, particleId: string): void;
    HandleRemove(handle: StorageProxy, callback: Runnable, data: {}, particleId: string): void;
    HandleRemoveMultiple(handle: StorageProxy, callback: Runnable, data: {}, particleId: string): void;
    HandleStream(handle: StorageProxy, callback: Consumer<number>, pageSize: number, forward: boolean): void;
    StreamCursorNext(handle: StorageProxy, callback: Consumer<CursorNextValue>, cursorId: string): void;
    StreamCursorClose(handle: StorageProxy, cursorId: string): void;
    Idle(version: number, relevance: Map<Particle, number[]>): void;
    GetBackingStore(callback: (proxy: StorageProxy, key: string) => void, storageKey: string, type: Type): void;
    abstract onGetBackingStoreCallback(callback: (proxy: StorageProxy, key: string) => void, type: Type, name: string, id: string, storageKey: string): any;
    ConstructInnerArc(callback: Consumer<string>, particle: Particle): void;
    abstract onConstructArcCallback(callback: Consumer<string>, arc: string): any;
    ArcCreateHandle(callback: Consumer<StorageProxy>, arc: {}, type: Type, name: string): void;
    abstract onCreateHandleCallback(callback: Consumer<StorageProxy>, type: Type, name: string, id: string): any;
    ArcMapHandle(callback: Consumer<string>, arc: {}, handle: Handle): void;
    abstract onMapHandleCallback(callback: Consumer<string>, id: string): any;
    ServiceRequest(particle: Particle, content: {}, callback: Function): void;
    ArcCreateSlot(callback: Consumer<string>, arc: {}, transformationParticle: Particle, transformationSlotName: string, handleId: string): void;
    abstract onCreateSlotCallback(callback: Consumer<string>, hostedSlotId: string): any;
    abstract onInnerArcRender(transformationParticle: Particle, transformationSlotName: string, hostedSlotID: string, content: Content): any;
    ArcLoadRecipe(arc: {}, recipe: string, callback: Consumer<{
        error?: string;
    }>): void;
    ReportExceptionInHost(exception: PropagatedException): void;
    onDevToolsConnected(): void;
}
export {};
