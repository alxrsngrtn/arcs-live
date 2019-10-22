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
export function arrowToDirection(arrow) {
    // TODO(jopra): Remove after syntax unification.
    // Use switch for totality checking.
    switch (arrow) {
        case '->':
            return 'out';
        case '<-':
            return 'in';
        case '<->':
            return 'inout';
        case '`consume':
            return '`consume';
        case '`provide':
            return '`provide';
        case '=':
            return 'any';
        default:
            // Catch nulls and unsafe values from javascript.
            throw new Error(`Bad arrow ${arrow}`);
    }
}
export function directionToArrow(dir) {
    // TODO(jopra): Remove after syntax unification.
    switch (dir) {
        case 'in':
            return '<-';
        case 'out':
            return '->';
        case 'inout':
            return '<->';
        case 'host':
            return '=';
        case '`consume':
            return '`consume';
        case '`provide':
            return '`provide';
        case 'any':
            return '=';
        default:
            throw new Error(`Unexpected direction ${dir}`);
    }
}
//# sourceMappingURL=manifest-ast-nodes.js.map