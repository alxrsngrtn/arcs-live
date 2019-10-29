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
export function preSlandlesDirectionToDirection(direction, isOptional = false) {
    // TODO(jopra): Remove after syntax unification.
    // Use switch for totality checking.
    const opt = isOptional ? '?' : '';
    switch (direction) {
        case 'in':
            return `reads${opt}`;
        case 'out':
            return `writes${opt}`;
        case 'inout':
            return `reads${opt} writes${opt}`;
        case '`consume':
            return `\`consumes${opt}`;
        case '`provide':
            return `\`provides${opt}`;
        case 'host':
            return `hosts${opt}`;
        case 'any':
            return `any${opt}`;
        default:
            // Catch nulls and unsafe values from javascript.
            throw new Error(`Bad pre slandles direction ${direction}`);
    }
}
export function directionToPreSlandlesDirection(direction) {
    // TODO(jopra): Remove after syntax unification.
    // Use switch for totality checking.
    switch (direction) {
        case 'reads':
            return 'in';
        case 'writes':
            return 'out';
        case 'reads writes':
            return 'inout';
        case '`consumes':
            return '`consume';
        case '`provides':
            return '`provide';
        case 'hosts':
            return 'host';
        case 'any':
            return 'any';
        default:
            // Catch nulls and unsafe values from javascript.
            throw new Error(`Bad direction ${direction}`);
    }
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