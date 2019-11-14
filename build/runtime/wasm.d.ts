import { Schema } from './schema.js';
import { Loader } from '../platform/loader.js';
import { Reference } from './reference.js';
import { Type, EntityType } from './type.js';
import { Storable } from './handle.js';
import { Particle } from './particle.js';
import { Handle } from './handle.js';
import { Content } from './slot-consumer.js';
import { Dictionary } from './hot.js';
import { PECInnerPort } from './api-channel.js';
import { ParticleExecutionContext } from './particle-execution-context.js';
import { BiMap } from './bimap.js';
declare type EntityTypeMap = BiMap<number, EntityType>;
export declare abstract class StringEncoder {
    protected readonly schema: Schema;
    protected typeMap: EntityTypeMap;
    protected constructor(schema: Schema, typeMap: EntityTypeMap);
    static create(type: Type, typeMap: EntityTypeMap): StringEncoder;
    abstract encodeSingleton(entity: Storable): string;
    encodeCollection(entities: Storable[]): string;
    static encodeDictionary(dict: Dictionary<string>): string;
    protected encodeField(field: any, name: string, value: string | number | boolean | Reference): string;
    protected encodeReference(ref: Reference): string;
    protected encodeValue(type: string, value: string | number | boolean): string;
    protected static encodeStr(str: string): string;
}
export declare abstract class StringDecoder {
    protected readonly schema: Schema;
    protected typeMap: EntityTypeMap;
    protected pec: ParticleExecutionContext;
    protected str: string;
    protected constructor(schema: Schema, typeMap: EntityTypeMap, pec: ParticleExecutionContext);
    static create(type: Type, typeMap: EntityTypeMap, pec: ParticleExecutionContext): StringDecoder;
    abstract decodeSingleton(str: string): Storable;
    static decodeDictionary(str: string): Dictionary<string>;
    static decodeArray(str: string): string[];
    protected upTo(char: string): string;
    protected chomp(len: number): string;
    protected validate(token: string): void;
    protected decodeValue(typeChar: string): string | number | boolean | Reference | Dictionary<string> | string[];
    protected decodeReference(): Reference;
}
declare type WasmAddress = number;
export declare class WasmContainer {
    pec: ParticleExecutionContext;
    loader: Loader;
    apiPort: PECInnerPort;
    memory: WebAssembly.Memory;
    heapU8: Uint8Array;
    heap32: Int32Array;
    wasm: WebAssembly.Instance;
    exports: any;
    particleMap: Map<number, WasmParticle>;
    constructor(pec: ParticleExecutionContext, loader: Loader, apiPort: PECInnerPort);
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
    private encoders;
    private decoders;
    private typeMap;
    constructor(id: string, container: WasmContainer);
    renderOutput(): void;
    setHandles(handles: ReadonlyMap<string, Handle>): Promise<void>;
    onHandleSync(handle: Handle, model: any): Promise<void>;
    onHandleUpdate(handle: Handle, update: {
        data?: any;
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
    dereference(idPtr: WasmAddress, keyPtr: WasmAddress, typeIndex: number, continuationId: number): Promise<void>;
    private getEncoder;
    private getDecoder;
    private getHandle;
    private ensureIdentified;
    output(content: any): void;
    onRenderOutput(templatePtr: WasmAddress, modelPtr: WasmAddress): void;
    /**
     * @deprecated for contexts using UiBroker (e.g Kotlin)
     */
    renderSlot(slotName: string, contentTypes: string[]): void;
    /**
     * @deprecated for systems using UiBroker (e.g Kotlin)
     */
    renderHostedSlot(slotName: string, hostedSlotId: string, content: Content): void;
    /**
     * @deprecated for systems using UiBroker (e.g Kotlin)
     */
    renderImpl(slotNamePtr: WasmAddress, templatePtr: WasmAddress, modelPtr: WasmAddress): void;
    serviceRequest(callPtr: WasmAddress, argsPtr: WasmAddress, tagPtr: WasmAddress): Promise<void>;
    fireEvent(slotName: string, event: any): void;
}
export {};
