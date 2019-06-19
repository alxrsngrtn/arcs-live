/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { Entity } from './entity.js';
import { Particle } from './particle.js';
import { Singleton } from './handle.js';
// Encodes/decodes the wire format for transferring entities over the wasm boundary.
// Note that entities must have an id before serializing for use in a wasm particle.
//
//  <singleton> = <id-length>:<id>|<name>:<value>|<name>:<value>| ... |
//  <value> depends on the field type:
//    Text       <name>:T<length>:<text>
//    URL        <name>:U<length>:<text>
//    Number     <name>:N<number>:
//    Boolean    <name>:B<zero-or-one>
//
//  <collection> = <num-entities>:<length>:<encoded><length>:<encoded> ...
//
// Examples:
//   Singleton:   4:id05|txt:T3:abc|lnk:U10:http://def|num:N37:|flg:B1|
//   Collection:  3:29:4:id12|txt:T4:qwer|num:N9.2:|18:6:id2670|num:N-7:|15:5:id501|flg:B0|
export class EntityPackager {
    constructor(schema) {
        this.encoder = new StringEncoder();
        this.decoder = new StringDecoder();
        assert(schema.names.length > 0, 'At least one schema name is required for entity packaging');
        this.schema = schema;
    }
    encodeSingleton(entity) {
        return this.encoder.encodeSingleton(this.schema, entity);
    }
    encodeCollection(entities) {
        return this.encoder.encodeCollection(this.schema, entities);
    }
    decodeSingleton(str) {
        const { id, data } = this.decoder.decodeSingleton(str);
        const entity = new (this.schema.entityClass())(data);
        Entity.identify(entity, id);
        return entity;
    }
}
class StringEncoder {
    encodeSingleton(schema, entity) {
        const id = Entity.id(entity);
        let encoded = id.length + ':' + id + '|';
        for (const [name, value] of Object.entries(entity)) {
            encoded += this.encodeField(schema.fields[name], name, value);
        }
        return encoded;
    }
    encodeCollection(schema, entities) {
        let encoded = entities.length + ':';
        for (const entity of entities) {
            const str = this.encodeSingleton(schema, entity);
            encoded += str.length + ':' + str;
        }
        return encoded;
    }
    encodeField(field, name, value) {
        switch (field.kind) {
            case 'schema-primitive':
                return name + ':' + field.type.substr(0, 1) + this.encodeValue(field.type, value) + '|';
            case 'schema-collection':
            case 'schema-union':
            case 'schema-tuple':
            case 'schema-reference':
                throw new Error(`'${field.kind}' not yet supported for entity packaging`);
            default:
                throw new Error(`Unknown field kind '${field.kind}' in schema`);
        }
    }
    encodeValue(type, value) {
        switch (type) {
            case 'Text':
            case 'URL':
                return value.length + ':' + value;
            case 'Number':
                return value + ':';
            case 'Boolean':
                return (value ? '1' : '0');
            case 'Bytes':
            case 'Object':
                throw new Error(`'${type}' not yet supported for entity packaging`);
            default:
                throw new Error(`Unknown primitive value type '${type}' in schema`);
        }
    }
}
class StringDecoder {
    decodeSingleton(str) {
        this.str = str;
        const len = Number(this.upTo(':'));
        const id = this.chomp(len);
        this.validate('|');
        const data = {};
        while (this.str.length > 0) {
            const name = this.upTo(':');
            const typeChar = this.chomp(1);
            data[name] = this.decodeValue(typeChar);
            this.validate('|');
        }
        return { id, data };
    }
    upTo(char) {
        const i = this.str.indexOf(char);
        if (i < 0) {
            throw new Error(`Packaged entity decoding fail: expected '${char}' separator in '${this.str}'`);
        }
        const token = this.str.slice(0, i);
        this.str = this.str.slice(i + 1);
        return token;
    }
    chomp(len) {
        if (len > this.str.length) {
            throw new Error(`Packaged entity decoding fail: expected '${len}' chars to remain in '${this.str}'`);
        }
        const token = this.str.slice(0, len);
        this.str = this.str.slice(len);
        return token;
    }
    validate(token) {
        if (this.chomp(token.length) !== token) {
            throw new Error(`Packaged entity decoding fail: expected '${token}' at start of '${this.str}'`);
        }
    }
    decodeValue(typeChar) {
        switch (typeChar) {
            case 'T':
            case 'U': {
                const len = Number(this.upTo(':'));
                return this.chomp(len);
            }
            case 'N':
                return Number(this.upTo(':'));
            case 'B':
                return Boolean(this.chomp(1) === '1');
            default:
                throw new Error(`Packaged entity decoding fail: unknown or unsupported primitive value type '${typeChar}'`);
        }
    }
}
class EmscriptenWasmDriver {
    constructor(customSection) {
        // Wasm modules built by emscripten require some external memory configuration by the caller,
        // which is usually built into the glue code generated alongside the module. We're not using
        // the glue code, but if we set the EMIT_EMSCRIPTEN_METADATA flag when building, emscripten
        // will provide a custom section in the module itself with the required values.
        const METADATA_SIZE = 10;
        const METADATA_MAJOR = 0;
        const METADATA_MINOR = 1;
        const ABI_MAJOR = 0;
        const ABI_MINOR = 3;
        // The logic for reading metadata values here was copied from the emscripten source.
        const buffer = new Uint8Array(customSection);
        const metadata = [];
        let offset = 0;
        while (offset < buffer.byteLength) {
            let result = 0;
            let shift = 0;
            while (1) {
                const byte = buffer[offset++];
                result |= (byte & 0x7f) << shift;
                if (!(byte & 0x80)) {
                    break;
                }
                shift += 7;
            }
            metadata.push(result);
        }
        // The specifics of the section are not published anywhere official (yet). The values here
        // correspond to emscripten version 1.38.34:
        //   https://github.com/emscripten-core/emscripten/blob/1.38.34/tools/shared.py#L3065
        if (metadata.length !== METADATA_SIZE) {
            throw new Error(`emscripten metadata section should have ${METADATA_SIZE} values; ` +
                `got ${metadata.length}`);
        }
        if (metadata[0] !== METADATA_MAJOR || metadata[1] !== METADATA_MINOR) {
            throw new Error(`emscripten metadata version should be ${METADATA_MAJOR}.${METADATA_MINOR}; ` +
                `got ${metadata[0]}.${metadata[1]}`);
        }
        if (metadata[2] !== ABI_MAJOR || metadata[3] !== ABI_MINOR) {
            throw new Error(`emscripten ABI version should be ${ABI_MAJOR}.${ABI_MINOR}; ` +
                `got ${metadata[2]}.${metadata[3]}`);
        }
        // metadata[9] is 'tempdoublePtr'; appears to be related to pthreads and is not used here.
        this.cfg = {
            memSize: metadata[4],
            tableSize: metadata[5],
            globalBase: metadata[6],
            dynamicBase: metadata[7],
            dynamictopPtr: metadata[8],
        };
    }
    configureEnvironment(module, particle, env) {
        particle.memory = new WebAssembly.Memory({ initial: this.cfg.memSize, maximum: this.cfg.memSize });
        particle.heapU8 = new Uint8Array(particle.memory.buffer);
        particle.heap32 = new Int32Array(particle.memory.buffer);
        // We need to poke the address of the heap base into the memory buffer prior to instantiating.
        particle.heap32[this.cfg.dynamictopPtr >> 2] = this.cfg.dynamicBase;
        Object.assign(env, {
            // Memory setup
            memory: particle.memory,
            __memory_base: this.cfg.globalBase,
            table: new WebAssembly.Table({ initial: this.cfg.tableSize, maximum: this.cfg.tableSize, element: 'anyfunc' }),
            __table_base: 0,
            DYNAMICTOP_PTR: this.cfg.dynamictopPtr,
            // Heap management
            _emscripten_get_heap_size: () => particle.heapU8.length,
            _emscripten_resize_heap: size => false,
            _emscripten_memcpy_big: (dst, src, num) => particle.heapU8.set(particle.heapU8.subarray(src, src + num), dst),
            // Error handling
            _systemError: msg => { throw new Error(particle.read(msg)); },
            abortOnCannotGrowMemory: size => { throw new Error(`abortOnCannotGrowMemory(${size})`); },
            // Logging
            _setLogInfo: (file, line) => particle.logInfo = [particle.read(file), line],
            ___syscall146: (which, varargs) => particle.sysWritev(which, varargs),
        });
    }
    initializeInstance(particle, instance) {
        // Emscripten doesn't need main() invoked
    }
}
class KotlinWasmDriver {
    configureEnvironment(module, particle, env) {
        Object.assign(env, {
            // These two are used by launcher.cpp
            Konan_js_arg_size: (index) => 1,
            Konan_js_fetch_arg: (index, ptr) => 'dummyArg',
            // These two are imported, but never used
            Konan_js_allocateArena: (array) => { },
            Konan_js_freeArena: (arenaIndex) => { },
            // These two are used by logging functions
            write: (ptr) => console.log(particle.read(ptr)),
            flush: () => { },
            // Apparently used by Kotlin Memory management
            Konan_notify_memory_grow: () => particle.heapU8 = new Uint8Array(particle.exports.memory.buffer),
            // Kotlin's own glue for abort and exit
            Konan_abort: (pointer) => { throw new Error('Konan_abort(' + particle.read(pointer) + ')'); },
            Konan_exit: (status) => { },
            // Needed by some code that tries to get the current time in it's runtime
            Konan_date_now: (pointer) => {
                const now = Date.now();
                const high = Math.floor(now / 0xffffffff);
                const low = Math.floor(now % 0xffffffff);
                particle.heap32[pointer] = low;
                particle.heap32[pointer + 1] = high;
            },
        });
    }
    // Kotlin manages its own heap construction, as well as tables.
    initializeInstance(particle, instance) {
        particle.memory = particle.exports.memory;
        particle.heapU8 = new Uint8Array(particle.memory.buffer);
        particle.heap32 = new Int32Array(particle.memory.buffer);
        // Kotlin main() must be invoked before everything else.
        instance.exports.Konan_js_main(1, 0);
    }
}
export class WasmParticle extends Particle {
    constructor() {
        super(...arguments);
        this.handleMap = new Map();
        this.revHandleMap = new Map();
        this.converters = new Map();
        this.logInfo = null;
    }
    driverForModule(module) {
        const customSections = WebAssembly.Module.customSections(module, 'emscripten_metadata');
        if (customSections.length === 1) {
            return new EmscriptenWasmDriver(customSections[0]);
        }
        return new KotlinWasmDriver();
    }
    async initialize(buffer) {
        assert(this.spec.name.length > 0);
        // TODO: vet the imports/exports on 'module'
        const module = await WebAssembly.compile(buffer);
        const driver = this.driverForModule(module);
        // Shared ENV between Emscripten and Kotlin
        const env = {
            abort: () => { throw new Error('Abort!'); },
            // Inner particle API
            _singletonSet: async (handle, encoded) => this.singletonSet(handle, encoded),
            _singletonClear: async (handle) => this.singletonClear(handle),
            _collectionStore: async (handle, encoded) => this.collectionStore(handle, encoded),
            _collectionRemove: async (handle, encoded) => this.collectionRemove(handle, encoded),
            _collectionClear: async (handle) => this.collectionClear(handle),
            _render: (slotName, content) => this.renderImpl(slotName, content),
        };
        driver.configureEnvironment(module, this, env);
        const global = { 'NaN': NaN, 'Infinity': Infinity };
        this.wasm = await WebAssembly.instantiate(module, { env, global });
        this.exports = this.wasm.exports;
        driver.initializeInstance(this, this.wasm);
        this.innerParticle = this.exports[`_new${this.spec.name}`]();
    }
    // TODO: for now we set up Handle objects with onDefineHandle and map them into the
    // wasm container through this call, which creates corresponding Handle objects in there.
    // That means entity transfer goes from the StorageProxy, deserializes at the outer Handle
    // which then notifies this class (calling onHandle*), and we then serialize into the wasm
    // transfer format. Obviously this can be improved.
    async setHandles(handles) {
        for (const [name, handle] of handles) {
            const p = this.store(name);
            const wasmHandle = this.exports._connectHandle(this.innerParticle, p, handle.canRead);
            this.exports._free(p);
            if (wasmHandle === 0) {
                throw new Error(`Wasm particle failed to connect handle '${name}'`);
            }
            this.handleMap.set(handle, wasmHandle);
            this.revHandleMap.set(wasmHandle, handle);
            this.converters.set(handle, new EntityPackager(handle.entityClass.schema));
        }
    }
    async onHandleSync(handle, model) {
        const wasmHandle = this.handleMap.get(handle);
        if (!model) {
            this.exports._syncHandle(this.innerParticle, wasmHandle, 0);
            return;
        }
        const converter = this.converters.get(handle);
        if (!converter) {
            throw new Error('cannot find handle ' + handle.name);
        }
        let encoded;
        if (handle instanceof Singleton) {
            encoded = converter.encodeSingleton(model);
        }
        else {
            encoded = converter.encodeCollection(model);
        }
        const p = this.store(encoded);
        this.exports._syncHandle(this.innerParticle, wasmHandle, p);
        this.exports._free(p);
    }
    // tslint:disable-next-line: no-any
    async onHandleUpdate(handle, update) {
        if (update.originator) {
            return;
        }
        const wasmHandle = this.handleMap.get(handle);
        const converter = this.converters.get(handle);
        if (!converter) {
            throw new Error('cannot find handle ' + handle.name);
        }
        let p1 = 0;
        let p2 = 0;
        if (handle instanceof Singleton) {
            if (update.data) {
                p1 = this.store(converter.encodeSingleton(update.data));
            }
        }
        else {
            p1 = this.store(converter.encodeCollection(update.added || []));
            p2 = this.store(converter.encodeCollection(update.removed || []));
        }
        this.exports._updateHandle(this.innerParticle, wasmHandle, p1, p2);
        if (p1)
            this.exports._free(p1);
        if (p2)
            this.exports._free(p2);
    }
    // Ignored for wasm particles.
    async onHandleDesync(handle) { }
    // Store API.
    async singletonSet(wasmHandle, encoded) {
        const singleton = this.getHandle(wasmHandle);
        await singleton.set(this.decodeEntity(singleton, encoded));
    }
    async singletonClear(wasmHandle) {
        const singleton = this.getHandle(wasmHandle);
        await singleton.clear();
    }
    async collectionStore(wasmHandle, encoded) {
        const collection = this.getHandle(wasmHandle);
        await collection.store(this.decodeEntity(collection, encoded));
    }
    async collectionRemove(wasmHandle, encoded) {
        const collection = this.getHandle(wasmHandle);
        await collection.remove(this.decodeEntity(collection, encoded));
    }
    async collectionClear(wasmHandle) {
        const collection = this.getHandle(wasmHandle);
        await collection.clear();
    }
    getHandle(wasmHandle) {
        const handle = this.revHandleMap.get(wasmHandle);
        if (!handle) {
            throw new Error(`wasm particle '${this.spec.name}' attempted to write to unconnected handle`);
        }
        return handle;
    }
    decodeEntity(handle, encoded) {
        const converter = this.converters.get(handle);
        return converter.decodeSingleton(this.read(encoded));
    }
    // Called by the shell to initiate rendering; the particle will call env._render in response.
    // TODO: handle contentTypes
    renderSlot(slotName, contentTypes) {
        const p = this.store(slotName);
        this.exports._requestRender(this.innerParticle, p);
        this.exports._free(p);
    }
    // TODO
    renderHostedSlot(slotName, hostedSlotId, content) { }
    // Actually renders the slot. May be invoked due to an external request via renderSlot(),
    // or directly from the wasm particle itself (e.g. in response to a data update).
    renderImpl(slotName, content) {
        const slot = this.slotProxiesByName.get(this.read(slotName));
        if (slot) {
            ['template', 'model'].forEach(ct => slot.requestedContentTypes.add(ct));
            slot.render({ template: this.read(content), model: {}, templateName: 'default' });
        }
    }
    fireEvent(slotName, event) {
        const sp = this.store(slotName);
        const hp = this.store(event.handler);
        this.exports._fireEvent(this.innerParticle, sp, hp);
        this.exports._free(sp);
        this.exports._free(hp);
    }
    // Allocates memory in the wasm container.
    store(str) {
        const p = this.exports._malloc(str.length + 1);
        for (let i = 0; i < str.length; i++) {
            this.heapU8[p + i] = str.charCodeAt(i);
        }
        this.heapU8[p + str.length] = 0;
        return p;
    }
    // Currently only supports ASCII. TODO: unicode
    read(idx) {
        let str = '';
        while (idx < this.heapU8.length && this.heapU8[idx] !== 0) {
            str += String.fromCharCode(this.heapU8[idx++]);
        }
        return str;
    }
    // printf support cribbed from emscripten glue js - currently only supports ASCII
    sysWritev(which, varargs) {
        const get = () => {
            varargs += 4;
            return this.heap32[(((varargs) - (4)) >> 2)];
        };
        const output = (get() === 1) ? console.log : console.error;
        const iov = get();
        const iovcnt = get();
        // TODO: does this need to be persistent across calls? (i.e. due to write buffering)
        let str = this.logInfo ? `[${this.spec.name}|${this.logInfo[0]}:${this.logInfo[1]}] ` : '';
        let ret = 0;
        for (let i = 0; i < iovcnt; i++) {
            const ptr = this.heap32[(((iov) + (i * 8)) >> 2)];
            const len = this.heap32[(((iov) + (i * 8 + 4)) >> 2)];
            for (let j = 0; j < len; j++) {
                const curr = this.heapU8[ptr + j];
                if (curr === 0 || curr === 10) { // NUL or \n
                    output(str);
                    str = '';
                }
                else {
                    str += String.fromCharCode(curr);
                }
            }
            ret += len;
        }
        this.logInfo = null;
        return ret;
    }
}
//# sourceMappingURL=wasm.js.map