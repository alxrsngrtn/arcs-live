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
export declare class EntityPackager {
    readonly schema: Schema;
    private encoder;
    private decoder;
    constructor(schema: Schema);
    encodeSingleton(entity: Entity): string;
    encodeCollection(entities: Entity[]): string;
    decodeSingleton(str: string): Entity;
}
/**
 * Per-language platform environment and startup specializations for Emscripten and Kotlin.
 */
interface WasmDriver {
    /**
     * Adds required import functions into env for a given language runtime. Also initalizes
     * any fields needed on wasmParticle, such as memory, tables, etc.
     */
    configureEnvironment(module: WebAssembly.Module, wasmParticle: WasmParticle, env: {}): any;
    /**
     * Initializes the instantiated WebAssembly, runs any startup lifecycle, and if this
     * runtime manages its own memory initialization, initializes the heap pointers on
     * WasmParticle.
     */
    initializeInstance(wasmParticle: WasmParticle, instance: WebAssembly.Instance): any;
}
declare type WasmAddress = number;
export declare class WasmParticle extends Particle {
    memory: WebAssembly.Memory;
    heapU8: Uint8Array;
    heap32: Int32Array;
    private wasm;
    exports: any;
    private innerParticle;
    private handleMap;
    private revHandleMap;
    private converters;
    logInfo: [string, number] | null;
    driverForModule(module: WebAssembly.Module): WasmDriver;
    initialize(buffer: ArrayBuffer): Promise<void>;
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
    singletonSet(wasmHandle: WasmAddress, encoded: WasmAddress): WasmAddress;
    singletonClear(wasmHandle: WasmAddress): void;
    collectionStore(wasmHandle: WasmAddress, encoded: WasmAddress): WasmAddress;
    collectionRemove(wasmHandle: WasmAddress, encoded: WasmAddress): void;
    collectionClear(wasmHandle: WasmAddress): void;
    private getHandle;
    private decodeEntity;
    private ensureIdentified;
    renderSlot(slotName: string, contentTypes: string[]): void;
    renderHostedSlot(slotName: string, hostedSlotId: string, content: string): void;
    renderImpl(slotName: WasmAddress, content: WasmAddress): void;
    fireEvent(slotName: string, event: any): void;
    private store;
    read(idx: WasmAddress): string;
    sysWritev(which: any, varargs: any): number;
}
export {};
