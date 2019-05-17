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
import { protobufjs } from '../platform/protobufjs-web.js';
import { Particle } from './particle.js';
import { Variable } from './handle.js';
function jsonBaseType(type) {
    const kind = (type.kind === 'schema-primitive') ? type.type : type.kind;
    switch (kind) {
        case 'Text':
            return 'string';
        case 'URL':
            return 'Url';
        case 'Number':
            return 'double';
        case 'Boolean':
            return 'bool';
        case 'Bytes':
        case 'Object':
        case 'schema-union':
        case 'schema-tuple':
        case 'schema-reference':
            throw new Error(`'${kind}' not yet supported for schema to proto-json conversion`);
        case 'schema-collection':
            throw new Error(`Nested collections not yet supported for schema to proto-json conversion`);
        default:
            throw new Error(`Unknown type '${kind}' in schema`);
    }
}
// Returns a JSON representation that protobufjs can use to de/serialize entity data as protobufs.
export function toProtoJSON(schema) {
    let id = 0;
    let hasUrl = false;
    const fields = {};
    for (const [name, type] of Object.entries(schema.fields).sort()) {
        id++;
        let field;
        if (type.kind === 'schema-collection') {
            field = { rule: 'repeated', type: jsonBaseType(type.schema), id };
        }
        else {
            field = { type: jsonBaseType(type), id };
        }
        hasUrl = hasUrl || (field.type === 'Url');
        fields[name] = field;
    }
    const json = {
        nested: {
            [schema.name]: { fields }
        }
    };
    if (hasUrl) {
        json.nested.Url = { fields: { href: { type: 'string', id: 1 } } };
    }
    return json;
}
export class EntityProtoConverter {
    constructor(schema) {
        assert(schema.names.length > 0, 'At least one schema name is required for proto conversion');
        const protoRoot = protobufjs.Root.fromJSON(toProtoJSON(schema));
        this.schema = schema;
        this.message = protoRoot.lookupType(schema.name);
    }
    encode(entity) {
        const proto = this.message.create();
        const scalar = (field, value) => (field.type === 'URL') ? { href: value } : value;
        for (const [name, value] of Object.entries(entity.toLiteral())) {
            const field = this.schema.fields[name];
            if (field.kind === 'schema-collection') {
                // tslint:disable-next-line: no-any
                proto[name] = [...value].map(v => scalar(field.schema, v));
            }
            else {
                proto[name] = scalar(field, value);
            }
        }
        return this.message.encode(proto).finish();
    }
    decode(buffer) {
        const proto = this.message.decode(buffer);
        const scalar = (field, value) => (field.type === 'URL') ? value.href : value;
        const data = {};
        for (const [name, value] of Object.entries(proto.toJSON())) {
            const field = this.schema.fields[name];
            if (field.kind === 'schema-collection') {
                data[name] = value.map(v => scalar(field.schema, v));
            }
            else {
                data[name] = scalar(field, value);
            }
        }
        return new (this.schema.entityClass())(data);
    }
}
async function setVariable(handle, num) {
    const entity = new handle.entityClass({ num });
    await handle.set(entity);
}
function errFunc(label) {
    return err => { throw new Error(label + ': ' + err); };
}
export class WasmParticle extends Particle {
    constructor() {
        super(...arguments);
        this.handleMap = new Map();
        this.revHandleMap = new Map();
        this.converters = new Map();
    }
    async initialize(buffer) {
        this.memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
        this.heap = new Uint8Array(this.memory.buffer);
        // SO MANY MAGIC NUMBERS
        const env = {
            // Memory setup
            memory: this.memory,
            __memory_base: 1024,
            table: new WebAssembly.Table({ initial: 35, maximum: 35, element: 'anyfunc' }),
            __table_base: 0,
            DYNAMICTOP_PTR: 4096,
            // Heap management
            _emscripten_get_heap_size: () => this.heap.length,
            _emscripten_resize_heap: size => false,
            _emscripten_memcpy_big: (dst, src, cnt) => { this.heap.set(this.heap.subarray(src, src + cnt), dst); },
            // Error handling
            abort: errFunc('abort'),
            _abort: errFunc('_abort'),
            ___assert_fail: errFunc('assert'),
            ___setErrNo: errFunc('setErrNo'),
            abortOnCannotGrowMemory: errFunc('abortOnCannotGrowMemory'),
            // Handle API
            _handleSet: async (wasmHandle, num) => setVariable(this.revHandleMap.get(wasmHandle), num),
            // Logging functions
            _console: i => console.log(`<${this.spec.name}> ${this.readString(i)}`),
            _consoleN: (i, n) => console.log(`<${this.spec.name}> ${this.readString(i)} ${n}`),
        };
        this.wasm = await WebAssembly.instantiate(buffer, { env });
        this.exports = this.wasm.instance.exports;
        this.innerParticle = this.exports._newParticle();
        console.log('---------------------------------------------------');
    }
    async setHandles(handles) {
        for (const [name, handle] of handles) {
            // Currently only Variables with a 'Number num' field are supported.
            assert(handle instanceof Variable);
            assert(handle.entityClass.schema.fields.num.type === 'Number');
            // Ownership of 'name' is passed to the inner particle.
            const p = this.storeString(name);
            const wasmHandle = this.exports._newHandle(this.innerParticle, p);
            this.handleMap.set(handle, wasmHandle);
            this.revHandleMap.set(wasmHandle, handle);
        }
        this.exports._initParticle(this.innerParticle);
    }
    async onHandleSync(handle, model) {
        if (!model)
            return;
        let converter = this.converters.get(model.schema);
        if (!converter) {
            converter = new EntityProtoConverter(model.schema);
            this.converters.set(model.schema, converter);
        }
        const buf = converter.encode(model);
        // Encode and send the protobuf... but for now just stuff 'num' in as the first byte to be extracted wasm-side.
        buf[0] = model.num & 0xff;
        const p = this.storeBuffer(buf);
        this.exports._syncHandle(this.innerParticle, this.handleMap.get(handle), p, buf.length);
        this.exports._free(p);
    }
    // tslint:disable-next-line: no-any
    async onHandleUpdate(handle, update) { }
    async onHandleDesync(handle) { }
    renderSlot(slotName, contentTypes) { }
    renderHostedSlot(slotName, hostedSlotId, content) { }
    fireEvent(slotName, event) { }
    // Allocates memory in the wasm container.
    storeBuffer(buf) {
        const p = this.exports._malloc(buf.length);
        for (let i = 0; i < buf.length; i++) {
            this.heap[p + i] = buf[i];
        }
        return p;
    }
    // Allocates memory in the wasm container.
    storeString(str) {
        const p = this.exports._malloc(str.length + 1);
        for (let i = 0; i < str.length; i++) {
            this.heap[p + i] = str.charCodeAt(i);
        }
        this.heap[p + str.length] = 0;
        return p;
    }
    readString(idx) {
        let str = '';
        while (idx < this.heap.length && this.heap[idx] !== 0) {
            str += String.fromCharCode(this.heap[idx++]);
        }
        return str;
    }
}
//# sourceMappingURL=wasm.js.map