/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Entity } from './entity.js';
import { Storable } from './handle.js';
import { Particle } from './particle.js';
import { Handle } from './handle.js';
import { Content } from './slot-consumer.js';
import { Loader } from './loader.js';
import { PECInnerPort } from './api-channel.js';
export declare class EntityPackager {
    private encoder;
    private decoder;
    constructor(handle: Handle);
    encodeSingleton(entity: Entity): string;
    encodeCollection(entities: Entity[]): string;
    decodeSingleton(str: string): Storable;
}
declare type WasmAddress = number;
export declare class WasmContainer {
    loader: Loader;
    apiPort: PECInnerPort;
    memory: WebAssembly.Memory;
    heapU8: Uint8Array;
    heap32: Int32Array;
    wasm: WebAssembly.Instance;
    exports: any;
    particleMap: Map<number, WasmParticle>;
    constructor(loader: Loader, apiPort: PECInnerPort);
    initialize(buffer: ArrayBuffer): Promise<void>;
    private driverForModule;
    private getParticle;
    register(particle: WasmParticle, innerParticle: WasmAddress): void;
    resolve(urlPtr: WasmAddress): WasmAddress;
    store(str: string): WasmAddress;
    free(...ptrs: WasmAddress[]): void;
    read(idx: WasmAddress): string;
}
export declare class WasmParticle extends Particle {
    private id;
    private container;
    private exports;
    private innerParticle;
    private handleMap;
    private revHandleMap;
    private converters;
    constructor(id: string, container: WasmContainer);
    setHandles(handles: ReadonlyMap<string, Handle>): Promise<void>;
    onHandleSync(handle: Handle, model: any): Promise<void>;
    onHandleUpdate(handle: Handle, update: {
        data?: any;
        oldData?: any;
        added?: any;
        removed?: any;
        originator?: any;
    }): Promise<void>;
    onHandleDesync(handle: Handle): Promise<void>;
    singletonSet(wasmHandle: WasmAddress, entityPtr: WasmAddress): WasmAddress;
    singletonClear(wasmHandle: WasmAddress): void;
    collectionStore(wasmHandle: WasmAddress, entityPtr: WasmAddress): WasmAddress;
    collectionRemove(wasmHandle: WasmAddress, entityPtr: WasmAddress): void;
    collectionClear(wasmHandle: WasmAddress): void;
    dereference(wasmHandle: WasmAddress, refIdPtr: WasmAddress, continuationId: number): Promise<void>;
    private getHandle;
    private decodeEntity;
    private ensureIdentified;
    renderSlot(slotName: string, contentTypes: string[]): void;
    renderHostedSlot(slotName: string, hostedSlotId: string, content: Content): void;
    renderImpl(slotNamePtr: WasmAddress, templatePtr: WasmAddress, modelPtr: WasmAddress): void;
    serviceRequest(callPtr: WasmAddress, argsPtr: WasmAddress, tagPtr: WasmAddress): Promise<void>;
    fireEvent(slotName: string, event: any): void;
}
export {};
