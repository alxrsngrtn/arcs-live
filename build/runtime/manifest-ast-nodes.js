/**
 * A base token interface for the `kind` and `location` entries. This creates
 * a TypeScript Discriminated Union for most tokens.
 */
export class BaseNode {
}
export function isCollectionType(node) {
    return node.kind === 'collection-type';
}
export function isTypeVariable(node) {
    return node.kind === 'variable-type';
}
export function isSlotType(node) {
    return node.kind === 'slot-type';
}
export function slandleType(arg) {
    if (isSlotType(arg.type)) {
        return arg.type;
    }
    if (isCollectionType(arg.type) && isSlotType(arg.type.type)) {
        return arg.type.type;
    }
    return undefined;
}
//# sourceMappingURL=manifest-ast-nodes.js.map