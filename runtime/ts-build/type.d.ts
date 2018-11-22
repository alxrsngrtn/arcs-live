import { Schema } from './schema.js';
import { TypeVariable } from './type-variable.js';
import { Shape } from './shape.js';
import { SlotInfo } from './slot-info.js';
export declare class Type {
    tag: 'Entity' | 'Variable' | 'Collection' | 'BigCollection' | 'Relation' | 'Interface' | 'Slot' | 'Reference' | 'ArcInfo' | 'HandleInfo';
    data: Schema | TypeVariable | Type | [Type] | Shape | SlotInfo;
    protected constructor(tag: any, data: any);
    static newEntity(entity: Schema): EntityType;
    static newVariable(variable: TypeVariable): VariableType;
    static newCollection(collection: Type): CollectionType;
    static newBigCollection(bigCollection: Type): BigCollectionType;
    static newRelation(relation: [Type]): RelationType;
    static newInterface(iface: Shape): InterfaceType;
    static newSlot(slot: SlotInfo): SlotType;
    static newReference(reference: Type): ReferenceType;
    static newArcInfo(): ArcInfoType;
    static newHandleInfo(): HandleInfoType;
    static fromLiteral(literal: any): Type;
    static unwrapPair(type1: Type, type2: Type): any;
    /** Tests whether two types' constraints are compatible with each other. */
    static canMergeConstraints(type1: any, type2: any): boolean;
    static _canMergeCanReadSubset(type1: any, type2: any): boolean;
    static _canMergeCanWriteSuperset(type1: any, type2: any): boolean;
    equals(type: any): any;
    isResolved(): boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): Type;
    _applyExistenceTypeTest(test: any): any;
    readonly hasVariable: any;
    readonly hasUnresolvedVariable: any;
    primitiveType(): any;
    getContainedType(): any;
    isTypeContainer(): boolean;
    collectionOf(): CollectionType;
    bigCollectionOf(): BigCollectionType;
    resolvedType(): Type;
    canEnsureResolved(): boolean;
    protected _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    readonly canWriteSuperset: Type;
    readonly canReadSubset: Type;
    isMoreSpecificThan(type: any): void;
    protected _isMoreSpecificThan(type: any): void;
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
    _cloneWithResolutions(variableMap: any): Type;
    toLiteral(): any;
    hasProperty(property: any): any;
    protected _hasProperty(property: any): boolean;
    toString(options?: any): string;
    getEntitySchema(): any;
    toPrettyString(): any;
}
export declare class EntityType extends Type {
    readonly entitySchema: Schema;
    constructor(schema: Schema);
    readonly isEntity: boolean;
    readonly canWriteSuperset: this;
    readonly canReadSubset: this;
    _isMoreSpecificThan(type: any): boolean;
    toLiteral(): {
        tag: "Entity" | "Variable" | "Collection" | "BigCollection" | "Relation" | "Interface" | "Slot" | "Reference" | "ArcInfo" | "HandleInfo";
        data: {
            names: string[];
            fields: {};
            description: {
                [index: string]: string;
            };
        };
    };
    toString(options?: any): string;
    getEntitySchema(): Schema;
    toPrettyString(): string;
}
export declare class VariableType extends Type {
    readonly variable: TypeVariable;
    constructor(variable: TypeVariable);
    readonly isVariable: boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): Type;
    resolvedType(): any;
    _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    readonly canWriteSuperset: any;
    readonly canReadSubset: any;
    _cloneWithResolutions(variableMap: any): VariableType;
    toLiteral(): any;
    toString(options?: any): string;
    getEntitySchema(): any;
    toPrettyString(): any;
}
export declare class CollectionType extends Type {
    readonly collectionType: Type;
    constructor(collectionType: Type);
    readonly isCollection: boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): CollectionType;
    _applyExistenceTypeTest(test: any): any;
    primitiveType(): Type;
    getContainedType(): Type;
    isTypeContainer(): boolean;
    resolvedType(): CollectionType;
    _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    _cloneWithResolutions(variableMap: any): CollectionType;
    toLiteral(): {
        tag: "Entity" | "Variable" | "Collection" | "BigCollection" | "Relation" | "Interface" | "Slot" | "Reference" | "ArcInfo" | "HandleInfo";
        data: any;
    };
    _hasProperty(property: any): any;
    toString(options?: any): string;
    getEntitySchema(): any;
    toPrettyString(): any;
}
export declare class BigCollectionType extends Type {
    readonly bigCollectionType: Type;
    constructor(bigCollectionType: Type);
    readonly isBigCollection: boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): BigCollectionType;
    _applyExistenceTypeTest(test: any): any;
    getContainedType(): Type;
    isTypeContainer(): boolean;
    resolvedType(): BigCollectionType;
    _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    _cloneWithResolutions(variableMap: any): BigCollectionType;
    toLiteral(): {
        tag: "Entity" | "Variable" | "Collection" | "BigCollection" | "Relation" | "Interface" | "Slot" | "Reference" | "ArcInfo" | "HandleInfo";
        data: any;
    };
    _hasProperty(property: any): any;
    toString(options?: any): string;
    getEntitySchema(): any;
    toPrettyString(): any;
}
export declare class RelationType extends Type {
    readonly relationEntities: [Type];
    constructor(relation: [Type]);
    readonly isRelation: boolean;
    toPrettyString(): string;
}
export declare class InterfaceType extends Type {
    readonly interfaceShape: Shape;
    constructor(iface: Shape);
    readonly isInterface: boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): InterfaceType;
    _applyExistenceTypeTest(test: any): boolean;
    resolvedType(): InterfaceType;
    _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    readonly canWriteSuperset: InterfaceType;
    readonly canReadSubset: InterfaceType;
    _isMoreSpecificThan(type: any): boolean;
    _cloneWithResolutions(variableMap: any): InterfaceType;
    toLiteral(): {
        tag: "Entity" | "Variable" | "Collection" | "BigCollection" | "Relation" | "Interface" | "Slot" | "Reference" | "ArcInfo" | "HandleInfo";
        data: {
            name: string;
            handles: {
                type: any;
                name: any;
                direction: any;
            }[];
            slots: {
                name: any;
                direction: any;
                isRequired: any;
                isSet: any;
            }[];
        };
    };
    toString(options?: any): string;
    toPrettyString(): string;
}
export declare class SlotType extends Type {
    readonly slot: SlotInfo;
    constructor(slot: SlotInfo);
    readonly isSlot: boolean;
    readonly canWriteSuperset: this;
    readonly canReadSubset: this;
    _isMoreSpecificThan(type: any): boolean;
    toString(options?: any): string;
    toPrettyString(): string;
}
export declare class ReferenceType extends Type {
    readonly referredType: Type;
    constructor(reference: Type);
    readonly isReference: boolean;
    getContainedType(): Type;
    isTypeContainer(): boolean;
    resolvedType(): ReferenceType;
    _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    readonly canReadSubset: Type;
    _cloneWithResolutions(variableMap: any): ReferenceType;
    toLiteral(): {
        tag: "Entity" | "Variable" | "Collection" | "BigCollection" | "Relation" | "Interface" | "Slot" | "Reference" | "ArcInfo" | "HandleInfo";
        data: any;
    };
    toString(options?: any): string;
}
export declare class ArcInfoType extends Type {
    constructor();
    readonly isArcInfo: boolean;
}
export declare class HandleInfoType extends Type {
    constructor();
    readonly isHandleInfo: boolean;
}
