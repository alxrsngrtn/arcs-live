/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Schema } from './schema.js';
import { Entity } from './entity.js';
import { Particle } from './particle.js';
import { Handle } from './handle.js';
import { Content } from './slot-consumer.js';
export declare class EntityPackager {
    readonly schema: Schema;
    private encoder;
    private decoder;
    constructor(schema: Schema);
    encodeSingleton(entity: Entity): string;
    encodeCollection(entities: Entity[]): string;
    decodeSingleton(str: string): Entity;
}
declare type WasmAddress = number;
export declare class WasmContainer {
    memory: WebAssembly.Memory;
    heapU8: Uint8Array;
    heap32: Int32Array;
    private wasm;
    exports: any;
    private particleMap;
    logInfo: [string, number] | null;
    initialize(buffer: ArrayBuffer): Promise<void>;
    private driverForModule;
    private getParticle;
    register(particle: WasmParticle, innerParticle: WasmAddress): void;
    store(str: string): WasmAddress;
    read(idx: WasmAddress): string;
    sysWritev(which: any, varargs: any): number;
}
export declare class WasmParticle extends Particle {
    private container;
    private exports;
    private innerParticle;
    private handleMap;
    private revHandleMap;
    private converters;
    constructor(container: WasmContainer);
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
    private getHandle;
    private decodeEntity;
    private ensureIdentified;
    renderSlot(slotName: string, contentTypes: string[]): void;
    renderHostedSlot(slotName: string, hostedSlotId: string, content: Content): void;
    renderImpl(slotNamePtr: WasmAddress, templatePtr: WasmAddress, modelPtr: WasmAddress): void;
    fireEvent(slotName: string, event: any): void;
}
export {};
