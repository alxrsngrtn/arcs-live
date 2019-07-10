/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Id } from './id.js';
import { InterfaceInfo, HandleConnection, Slot } from './interface-info.js';
import { Schema } from './schema.js';
import { SlotInfo } from './slot-info.js';
import { ArcInfo } from './synthetic-types.js';
import { TypeVariableInfo } from './type-variable-info.js';
import { Predicate, Literal } from './hot.js';
export interface TypeLiteral extends Literal {
    tag: string;
    data?: any;
}
export declare type Tag = 'Entity' | 'TypeVariable' | 'Collection' | 'BigCollection' | 'Relation' | 'Interface' | 'Slot' | 'Reference' | 'Arc' | 'Handle';
export declare abstract class Type {
    tag: Tag;
    protected constructor(tag: Tag);
    static fromLiteral(literal: TypeLiteral): Type;
    abstract toLiteral(): TypeLiteral;
    static unwrapPair(type1: Type, type2: Type): [Type, Type];
    /** Tests whether two types' constraints are compatible with each other. */
    static canMergeConstraints(type1: Type, type2: Type): boolean;
    static _canMergeCanReadSubset(type1: Type, type2: Type): boolean;
    static _canMergeCanWriteSuperset(type1: Type, type2: Type): boolean;
    isSlot(): this is SlotType;
    isCollectionType<T extends Type>(): this is CollectionType<T>;
    isBigCollectionType<T extends Type>(): this is BigCollectionType<T>;
    isResolved(): boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): Type;
    _applyExistenceTypeTest(test: Predicate<Type>): boolean;
    readonly hasVariable: boolean;
    readonly hasUnresolvedVariable: boolean;
    getContainedType(): Type | null;
    isTypeContainer(): boolean;
    collectionOf(): CollectionType<this>;
    bigCollectionOf(): BigCollectionType<this>;
    resolvedType(): Type;
    canEnsureResolved(): boolean;
    protected _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    readonly canWriteSuperset: Type;
    readonly canReadSubset: Type;
    isMoreSpecificThan(type: Type): boolean;
    protected _isMoreSpecificThan(type: Type): boolean;
    /**
     * Clone a type object.
     * When cloning multiple types, variables that were associated with the same name
     * before cloning should still be associated after cloning. To maintain this
     * property, create a Map() and pass it into all clone calls in the group.
     */
    clone(variableMap: Map<string, Type>): Type;
    protected _clone(variableMap: Map<string, Type>): Type;
    /**
     * Clone a type object, maintaining resolution information.
     * This function SHOULD NOT BE USED at the type level. In order for type variable
     * information to be maintained correctly, an entire context root needs to be
     * cloned.
     */
    _cloneWithResolutions(variableMap: any): Type;
    hasProperty(property: any): boolean;
    protected _hasProperty(property: any): boolean;
    toString(options?: any): string;
    getEntitySchema(): Schema | null;
    toPrettyString(): string | null;
}
export declare class EntityType extends Type {
    readonly entitySchema: Schema;
    constructor(schema: Schema);
    static make(names: string[], fields: {}, description?: any): EntityType;
    readonly isEntity: boolean;
    readonly canWriteSuperset: EntityType;
    readonly canReadSubset: EntityType;
    _isMoreSpecificThan(type: EntityType): boolean;
    toLiteral(): TypeLiteral;
    toString(options?: any): string;
    getEntitySchema(): Schema;
    _cloneWithResolutions(variableMap: any): EntityType;
    toPrettyString(): string;
}
export declare class TypeVariable extends Type {
    readonly variable: TypeVariableInfo;
    constructor(variable: TypeVariableInfo);
    static make(name: string, canWriteSuperset?: Type, canReadSubset?: Type): TypeVariable;
    readonly isVariable: boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): Type;
    resolvedType(): any;
    _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    readonly canWriteSuperset: Type;
    readonly canReadSubset: Type;
    _clone(variableMap: any): TypeVariable;
    _cloneWithResolutions(variableMap: Map<TypeVariableInfo | Schema, TypeVariableInfo | Schema>): TypeVariable;
    toLiteral(): TypeLiteral;
    toString(options?: any): string;
    getEntitySchema(): Schema;
    toPrettyString(): string;
}
export declare class CollectionType<T extends Type> extends Type {
    readonly collectionType: T;
    constructor(collectionType: T);
    readonly isCollection: boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): CollectionType<Type>;
    _applyExistenceTypeTest(test: Predicate<Type>): boolean;
    getContainedType(): T;
    isTypeContainer(): boolean;
    resolvedType(): CollectionType<Type>;
    _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    readonly canWriteSuperset: InterfaceType;
    readonly canReadSubset: InterfaceType;
    _clone(variableMap: Map<string, Type>): Type;
    _cloneWithResolutions(variableMap: Map<TypeVariableInfo | Schema, TypeVariableInfo | Schema>): CollectionType<Type>;
    toLiteral(): TypeLiteral;
    _hasProperty(property: any): boolean;
    toString(options?: any): string;
    getEntitySchema(): Schema;
    toPrettyString(): string;
}
export declare class BigCollectionType<T extends Type> extends Type {
    readonly bigCollectionType: T;
    constructor(bigCollectionType: T);
    readonly isBigCollection: boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): BigCollectionType<Type>;
    _applyExistenceTypeTest(test: any): boolean;
    getContainedType(): T;
    isTypeContainer(): boolean;
    resolvedType(): BigCollectionType<Type>;
    _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    readonly canWriteSuperset: InterfaceType;
    readonly canReadSubset: InterfaceType;
    _clone(variableMap: Map<string, Type>): Type;
    _cloneWithResolutions(variableMap: Map<TypeVariableInfo | Schema, TypeVariableInfo | Schema>): BigCollectionType<Type>;
    toLiteral(): TypeLiteral;
    _hasProperty(property: any): boolean;
    toString(options?: any): string;
    getEntitySchema(): Schema;
    toPrettyString(): string;
}
export declare class RelationType extends Type {
    private readonly relationEntities;
    constructor(relation: Type[]);
    readonly isRelation: boolean;
    toLiteral(): TypeLiteral;
    toPrettyString(): string;
}
export declare class InterfaceType extends Type {
    readonly interfaceInfo: InterfaceInfo;
    constructor(iface: InterfaceInfo);
    static make(name: string, handleConnections: HandleConnection[], slots: Slot[]): InterfaceType;
    readonly isInterface: boolean;
    mergeTypeVariablesByName(variableMap: Map<string, Type>): InterfaceType;
    _applyExistenceTypeTest(test: any): boolean;
    resolvedType(): InterfaceType;
    _canEnsureResolved(): boolean;
    maybeEnsureResolved(): boolean;
    readonly canWriteSuperset: InterfaceType;
    readonly canReadSubset: InterfaceType;
    _isMoreSpecificThan(type: InterfaceType): boolean;
    _clone(variableMap: Map<string, Type>): Type;
    _cloneWithResolutions(variableMap: any): InterfaceType;
    toLiteral(): TypeLiteral;
    toString(options?: any): string;
    toPrettyString(): string;
}
export declare class SlotType extends Type {
    private readonly slot;
    constructor(slot: SlotInfo);
    static make(formFactor: string, handle: string): SlotType;
    getSlot(): SlotInfo;
    readonly canWriteSuperset: SlotType;
    readonly canReadSubset: this;
    _isMoreSpecificThan(type: SlotType): boolean;
    toLiteral(): TypeLiteral;
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
    readonly canWriteSuperset: Type;
    readonly canReadSubset: Type;
    _clone(variableMap: Map<string, Type>): Type;
    _cloneWithResolutions(variableMap: Map<TypeVariableInfo | Schema, TypeVariableInfo | Schema>): ReferenceType;
    toLiteral(): TypeLiteral;
    toString(options?: any): string;
}
export declare class ArcType extends Type {
    constructor();
    readonly isArc: boolean;
    newInstance(arcId: Id, serialization: string): ArcInfo;
    toLiteral(): TypeLiteral;
}
export declare class HandleType extends Type {
    constructor();
    readonly isHandle: boolean;
    toLiteral(): TypeLiteral;
}
