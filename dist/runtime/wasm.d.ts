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
import { EntityInterface } from './entity.js';
import { Particle } from './particle.js';
import { Handle } from './handle.js';
export declare class EntityPackager {
    readonly schema: Schema;
    private encoder;
    private decoder;
    constructor(schema: Schema);
    encodeSingleton(entity: EntityInterface): string;
    encodeCollection(entities: EntityInterface[]): string;
    decodeSingleton(str: string): EntityInterface;
}
declare type WasmAddress = number;
export declare class WasmParticle extends Particle {
    private memory;
    private heapU8;
    private heap32;
    private wasm;
    private exports;
    private innerParticle;
    private handleMap;
    private revHandleMap;
    private converters;
    private logInfo;
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
    singletonSet(wasmHandle: WasmAddress, encoded: WasmAddress): Promise<void>;
    singletonClear(wasmHandle: WasmAddress): Promise<void>;
    collectionStore(wasmHandle: WasmAddress, encoded: WasmAddress): Promise<void>;
    collectionRemove(wasmHandle: WasmAddress, encoded: WasmAddress): Promise<void>;
    collectionClear(wasmHandle: WasmAddress): Promise<void>;
    private decodeEntity;
    renderSlot(slotName: string, contentTypes: string[]): void;
    renderHostedSlot(slotName: string, hostedSlotId: string, content: string): void;
    renderImpl(slotName: WasmAddress, content: WasmAddress): void;
    fireEvent(slotName: string, event: any): void;
    private store;
    private read;
    private sysWritev;
}
export {};
