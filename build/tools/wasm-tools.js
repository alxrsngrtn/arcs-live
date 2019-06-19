import proto_target from 'protobufjs/cli/targets/proto.js';
import protobufjs from 'protobufjs';
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
function toProtoJSON(schema) {
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
class EntityProtoConverter {
    constructor(schema) {
        const protoRoot = protobufjs.Root.fromJSON(toProtoJSON(schema));
        this.schema = schema;
        this.message = protoRoot.lookupType(schema.name);
    }
    encode(entity) {
        const proto = this.message.create();
        const scalar = (field, value) => (field.type === 'URL') ? { href: value } : value;
        for (const [name, value] of Object.entries(entity)) {
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
/**
 * Convert a Schema to .proto format that can be used to compile protobuf wrappers
 * @param schema a Schema to convert to a proto
 * @returns a string proto2 representation of a .proto file in the 'arcs' package
 */
export async function toProtoFile(schema) {
    const json = toProtoJSON(schema);
    const protoPromise = new Promise((resolve, reject) => {
        try {
            // For now, default all packages to 'arcs'
            const jsonInArcsPackage = ({ nested: { 'arcs': json } });
            proto_target(protobufjs.Root.fromJSON(jsonInArcsPackage), { syntax: 'proto2' }, (err, out) => { err != null ? reject(err) : resolve(out); });
        }
        catch (e) {
            reject(e);
        }
    });
    return protoPromise;
}
//# sourceMappingURL=wasm-tools.js.map