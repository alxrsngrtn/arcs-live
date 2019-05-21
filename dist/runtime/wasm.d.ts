/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { protobufjs } from '../platform/protobufjs-web.js';
import { Schema } from './schema.js';
import { EntityInterface } from './entity.js';
import { Particle } from './particle.js';
import { Handle } from './handle.js';
export declare function toProtoJSON(schema: Schema): {
    nested: {
        [x: string]: {
            fields: {};
        };
    };
};
export declare class EntityProtoConverter {
    readonly schema: Schema;
    readonly message: protobufjs.Type;
    constructor(schema: Schema);
    encode(entity: EntityInterface): Uint8Array;
    decode(buffer: Uint8Array): EntityInterface;
}
export declare class WasmParticle extends Particle {
    private memory;
    private heap;
    private wasm;
    private exports;
    private innerParticle;
    private handleMap;
    private revHandleMap;
    private slotProxies;
    private converters;
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
    renderSlot(slotName: string, contentTypes: string[]): void;
    renderHostedSlot(slotName: string, hostedSlotId: string, content: string): void;
    fireEvent(slotName: string, event: any): void;
    private storeBuffer;
    private storeString;
    private readString;
}
