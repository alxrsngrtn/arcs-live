import { Type } from './type.js';
export declare class TypeVariable {
    name: string;
    _canWriteSuperset: Type | null;
    _canReadSubset: Type | null;
    _resolution: Type | null;
    constructor(name: string, canWriteSuperset: Type | null, canReadSubset: Type | null);
    /**
     * Merge both the read subset (upper bound) and write superset (lower bound) constraints
     * of two variables together. Use this when two separate type variables need to resolve
     * to the same value.
     */
    maybeMergeConstraints(variable: TypeVariable): boolean;
    /**
     * Merge a type variable's read subset (upper bound) constraints into this variable.
     * This is used to accumulate read constraints when resolving a handle's type.
     */
    maybeMergeCanReadSubset(constraint: any): boolean;
    /**
     * merge a type variable's write superset (lower bound) constraints into this variable.
     * This is used to accumulate write constraints when resolving a handle's type.
     */
    maybeMergeCanWriteSuperset(constraint: any): boolean;
    isSatisfiedBy(type: any): any;
    resolution: Type;
    canWriteSuperset: any;
    canReadSubset: any;
    readonly hasConstraint: boolean;
    canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    toLiteral(): {
        name: string;
        canWriteSuperset: any;
        canReadSubset: any;
    };
    toLiteralIgnoringResolutions(): {
        name: string;
        canWriteSuperset: any;
        canReadSubset: any;
    };
    static fromLiteral(data: any): TypeVariable;
    isResolved(): boolean;
}
