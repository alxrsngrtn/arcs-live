import { toProtoJSON } from '../runtime/wasm.js';
import proto_target from 'protobufjs/cli/targets/proto.js';
import protobufjs from 'protobufjs';
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