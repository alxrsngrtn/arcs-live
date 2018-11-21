export interface Type {
    isEntity: boolean;
    isVariable: boolean;
    isCollection: boolean;
    isBigCollection: boolean;
    isRelation: boolean;
    isInterface: boolean;
    isSlot: boolean;
    isReference: boolean;
    isArcInfo: boolean;
    isHandleInfo: boolean;
    entitySchema: Schema;
    variable: TypeVariable;
    collectionType: Type;
    bigCollectionType: Type;
    relationEntities: [Type];
    interfaceShape: Shape;
    slot: SlotInfo;
    referenceReferredType: Type;
}
export declare class Type {
    tag: 'Entity' | 'Variable' | 'Collection' | 'BigCollection' | 'Relation' | 'Interface' | 'Slot' | 'Reference' | 'ArcInfo' | 'HandleInfo';
    data: Schema | TypeVariable | Type | [Type] | Shape | SlotInfo;
    constructor(tag: any, data: any);
    static newEntity(entity: Schema): Type;
    static newVariable(variable: TypeVariable): Type;
    static newCollection(collection: Type): Type;
    static newBigCollection(bigCollection: Type): Type;
    static newRelation(relation: [Type]): Type;
    static newInterface(iface: Shape): Type;
    static newSlot(slot: SlotInfo): Type;
    static newReference(reference: Type): Type;
    static newArcInfo(): Type;
    static newHandleInfo(): Type;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): any;
    static unwrapPair(type1: any, type2: any): any;
    equals(type: any): boolean;
    _applyExistenceTypeTest(test: any): any;
    readonly hasVariable: any;
    readonly hasUnresolvedVariable: any;
    readonly hasVariableReference: any;
    primitiveType(): Type;
    getContainedType(): Type;
    isTypeContainer(): boolean;
    collectionOf(): Type;
    bigCollectionOf(): Type;
    resolvedType(): any;
    isResolved(): boolean;
    canEnsureResolved(): any;
    maybeEnsureResolved(): any;
    readonly canWriteSuperset: any;
    readonly canReadSubset: any;
    isMoreSpecificThan(type: any): boolean;
    static _canMergeCanReadSubset(type1: any, type2: any): boolean;
    static _canMergeCanWriteSuperset(type1: any, type2: any): boolean;
    /** Tests whether two types' constraints are compatible with each other. */
    static canMergeConstraints(type1: any, type2: any): boolean;
    /**
     * Clone a type object.
     * When cloning multiple types, variables that were associated with the same name
     * before cloning should still be associated after cloning. To maintain this
     * property, create a Map() and pass it into all clone calls in the group.
     */
    clone(variableMap: any): any;
    /**
     * Clone a type object, maintaining resolution information.
     * This function SHOULD NOT BE USED at the type level. In order for type variable
     * information to be maintained correctly, an entire context root needs to be
     * cloned.
     */
    _cloneWithResolutions(variableMap: any): any;
    toLiteral(): any;
    static _deliteralizer(tag: any): any;
    static fromLiteral(literal: any): any;
    hasProperty(property: any): any;
    toString(options?: any): any;
    getEntitySchema(): any;
    toPrettyString(): any;
}
import { Shape } from './shape.js';
import { Schema } from './schema.js';
import { TypeVariable } from './type-variable.js';
import { SlotInfo } from './slot-info.js';
