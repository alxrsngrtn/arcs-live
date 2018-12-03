// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
import { Schema } from './schema.js';
import { TypeVariable } from './type-variable.js';
import { Shape } from './shape.js';
import { SlotInfo } from './slot-info.js';
import { TypeChecker } from './recipe/type-checker.js';
import { ArcInfo } from './synthetic-types.js';
export class Type {
    constructor(tag) {
        this.tag = tag;
    }
    // TODO: remove these; callers can directly construct the classes now
    static newEntity(entity) {
        return new EntityType(entity);
    }
    static newVariable(variable) {
        return new VariableType(variable);
    }
    static newCollection(collection) {
        return new CollectionType(collection);
    }
    static newBigCollection(bigCollection) {
        return new BigCollectionType(bigCollection);
    }
    static newRelation(relation) {
        return new RelationType(relation);
    }
    static newInterface(iface) {
        return new InterfaceType(iface);
    }
    static newSlot(slot) {
        return new SlotType(slot);
    }
    static newReference(reference) {
        return new ReferenceType(reference);
    }
    static newArcInfo() {
        return new ArcInfoType();
    }
    static newHandleInfo() {
        return new HandleInfoType();
    }
    static fromLiteral(literal) {
        switch (literal.tag) {
            case 'Entity':
                return new EntityType(Schema.fromLiteral(literal.data));
            case 'Variable':
                return new VariableType(TypeVariable.fromLiteral(literal.data));
            case 'Collection':
                return new CollectionType(Type.fromLiteral(literal.data));
            case 'BigCollection':
                return new BigCollectionType(Type.fromLiteral(literal.data));
            case 'Relation':
                return new RelationType(literal.data.map(t => Type.fromLiteral(t)));
            case 'Interface':
                return new InterfaceType(Shape.fromLiteral(literal.data));
            case 'Slot':
                return new SlotType(SlotInfo.fromLiteral(literal.data));
            case 'Reference':
                return new ReferenceType(Type.fromLiteral(literal.data));
            case 'ArcInfo':
                return new ArcInfoType();
            case 'HandleInfo':
                return new HandleInfoType();
            default:
                throw new Error(`fromLiteral: unknown type ${literal}`);
        }
    }
    static unwrapPair(type1, type2) {
        if (type1.tag === type2.tag) {
            const contained1 = type1.getContainedType();
            if (contained1 !== null) {
                return Type.unwrapPair(contained1, type2.getContainedType());
            }
        }
        return [type1, type2];
    }
    /** Tests whether two types' constraints are compatible with each other. */
    static canMergeConstraints(type1, type2) {
        return Type._canMergeCanReadSubset(type1, type2) && Type._canMergeCanWriteSuperset(type1, type2);
    }
    static _canMergeCanReadSubset(type1, type2) {
        if (type1.canReadSubset && type2.canReadSubset) {
            if (type1.canReadSubset.tag !== type2.canReadSubset.tag) {
                return false;
            }
            if (type1.canReadSubset instanceof EntityType) {
                return Schema.intersect(type1.canReadSubset.entitySchema, type2.canReadSubset.entitySchema) !== null;
            }
            throw new Error(`_canMergeCanReadSubset not implemented for types tagged with ${type1.canReadSubset.tag}`);
        }
        return true;
    }
    static _canMergeCanWriteSuperset(type1, type2) {
        if (type1.canWriteSuperset && type2.canWriteSuperset) {
            if (type1.canWriteSuperset.tag !== type2.canWriteSuperset.tag) {
                return false;
            }
            if (type1.canWriteSuperset instanceof EntityType) {
                return Schema.union(type1.canWriteSuperset.entitySchema, type2.canWriteSuperset.entitySchema) !== null;
            }
        }
        return true;
    }
    // TODO: update call sites to use the type checker instead (since they will
    // have additional information about direction etc.)
    equals(type) {
        return TypeChecker.compareTypes({ type: this }, { type });
    }
    isResolved() {
        // TODO: one of these should not exist.
        return !this.hasUnresolvedVariable;
    }
    mergeTypeVariablesByName(variableMap) {
        return this;
    }
    _applyExistenceTypeTest(test) {
        return test(this);
    }
    get hasVariable() {
        return this._applyExistenceTypeTest(type => type instanceof VariableType);
    }
    get hasUnresolvedVariable() {
        return this._applyExistenceTypeTest(type => type instanceof VariableType && !type.variable.isResolved());
    }
    primitiveType() {
        return null;
    }
    getContainedType() {
        return null;
    }
    isTypeContainer() {
        return false;
    }
    collectionOf() {
        return new CollectionType(this);
    }
    bigCollectionOf() {
        return new BigCollectionType(this);
    }
    resolvedType() {
        return this;
    }
    canEnsureResolved() {
        return this.isResolved() || this._canEnsureResolved();
    }
    _canEnsureResolved() {
        return true;
    }
    maybeEnsureResolved() {
        return true;
    }
    get canWriteSuperset() {
        throw new Error(`canWriteSuperset not implemented for ${this}`);
    }
    get canReadSubset() {
        throw new Error(`canReadSubset not implemented for ${this}`);
    }
    isMoreSpecificThan(type) {
        return this.tag === type.tag && this._isMoreSpecificThan(type);
    }
    _isMoreSpecificThan(type) {
        throw new Error(`isMoreSpecificThan not implemented for ${this}`);
    }
    /**
     * Clone a type object.
     * When cloning multiple types, variables that were associated with the same name
     * before cloning should still be associated after cloning. To maintain this
     * property, create a Map() and pass it into all clone calls in the group.
     */
    clone(variableMap) {
        return this.resolvedType()._clone(variableMap);
    }
    _clone(variableMap) {
        return Type.fromLiteral(this.toLiteral());
    }
    /**
     * Clone a type object, maintaining resolution information.
     * This function SHOULD NOT BE USED at the type level. In order for type variable
     * information to be maintained correctly, an entire context root needs to be
     * cloned.
     */
    _cloneWithResolutions(variableMap) {
        return Type.fromLiteral(this.toLiteral());
    }
    // TODO: is this the same as _applyExistenceTypeTest
    hasProperty(property) {
        return property(this) || this._hasProperty(property);
    }
    _hasProperty(property) {
        return false;
    }
    toString(options = undefined) {
        return this.tag;
    }
    getEntitySchema() {
        return null;
    }
    toPrettyString() {
        return null;
    }
}
export class EntityType extends Type {
    constructor(schema) {
        super('Entity');
        this.entitySchema = schema;
    }
    // These type identifier methods are being left in place for non-runtime code.
    get isEntity() {
        return true;
    }
    get canWriteSuperset() {
        return this;
    }
    get canReadSubset() {
        return this;
    }
    _isMoreSpecificThan(type) {
        return this.entitySchema.isMoreSpecificThan(type.entitySchema);
    }
    toLiteral() {
        return { tag: this.tag, data: this.entitySchema.toLiteral() };
    }
    toString(options = undefined) {
        return this.entitySchema.toInlineSchemaString(options);
    }
    getEntitySchema() {
        return this.entitySchema;
    }
    toPrettyString() {
        if (this.entitySchema.description.pattern) {
            return this.entitySchema.description.pattern;
        }
        // Spit MyTypeFOO to My Type FOO
        if (this.entitySchema.name) {
            return this.entitySchema.name.replace(/([^A-Z])([A-Z])/g, '$1 $2')
                .replace(/([A-Z][^A-Z])/g, ' $1')
                .replace(/[\s]+/g, ' ')
                .trim();
        }
        return JSON.stringify(this.entitySchema.toLiteral());
    }
}
// Yes, these names need fixing.
export class VariableType extends Type {
    constructor(variable) {
        super('Variable');
        this.variable = variable;
    }
    get isVariable() {
        return true;
    }
    // TODO: should variableMap be Map<string, TypeVariable>?
    mergeTypeVariablesByName(variableMap) {
        const name = this.variable.name;
        let variable = variableMap.get(name);
        if (!variable) {
            variable = this;
            variableMap.set(name, this);
        }
        else if (variable instanceof VariableType) {
            if (variable.variable.hasConstraint || this.variable.hasConstraint) {
                const mergedConstraint = variable.variable.maybeMergeConstraints(this.variable);
                if (!mergedConstraint) {
                    throw new Error('could not merge type variables');
                }
            }
        }
        return variable;
    }
    resolvedType() {
        return this.variable.resolution || this;
    }
    _canEnsureResolved() {
        return this.variable.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.variable.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        return this.variable.canWriteSuperset;
    }
    get canReadSubset() {
        return this.variable.canReadSubset;
    }
    _clone(variableMap) {
        const name = this.variable.name;
        if (variableMap.has(name)) {
            return new VariableType(variableMap.get(name));
        }
        else {
            const newTypeVariable = TypeVariable.fromLiteral(this.variable.toLiteral());
            variableMap.set(name, newTypeVariable);
            return new VariableType(newTypeVariable);
        }
    }
    _cloneWithResolutions(variableMap) {
        const name = this.variable.name;
        if (variableMap.has(name)) {
            return new VariableType(variableMap.get(name));
        }
        else {
            const newTypeVariable = TypeVariable.fromLiteral(this.variable.toLiteralIgnoringResolutions());
            if (this.variable.resolution) {
                newTypeVariable.resolution = this.variable.resolution._cloneWithResolutions(variableMap);
            }
            if (this.variable._canReadSubset) {
                newTypeVariable.canReadSubset = this.variable.canReadSubset._cloneWithResolutions(variableMap);
            }
            if (this.variable._canWriteSuperset) {
                newTypeVariable.canWriteSuperset = this.variable.canWriteSuperset._cloneWithResolutions(variableMap);
            }
            variableMap.set(name, newTypeVariable);
            return new VariableType(newTypeVariable);
        }
    }
    toLiteral() {
        return this.variable.resolution ? this.variable.resolution.toLiteral()
            : { tag: this.tag, data: this.variable.toLiteral() };
    }
    toString(options = undefined) {
        return `~${this.variable.name}`;
    }
    getEntitySchema() {
        return this.variable.isResolved() ? this.resolvedType().getEntitySchema() : null;
    }
    toPrettyString() {
        return this.variable.isResolved() ? this.resolvedType().toPrettyString() : `[~${this.variable.name}]`;
    }
}
export class CollectionType extends Type {
    constructor(collectionType) {
        super('Collection');
        this.collectionType = collectionType;
    }
    get isCollection() {
        return true;
    }
    mergeTypeVariablesByName(variableMap) {
        const primitiveType = this.collectionType;
        const result = primitiveType.mergeTypeVariablesByName(variableMap);
        return (result === primitiveType) ? this : result.collectionOf();
    }
    _applyExistenceTypeTest(test) {
        return this.collectionType._applyExistenceTypeTest(test);
    }
    // TODO: remove this in favor of a renamed collectionType
    primitiveType() {
        return this.collectionType;
    }
    getContainedType() {
        return this.collectionType;
    }
    isTypeContainer() {
        return true;
    }
    resolvedType() {
        const primitiveType = this.collectionType;
        const resolvedPrimitiveType = primitiveType.resolvedType();
        return (primitiveType !== resolvedPrimitiveType) ? resolvedPrimitiveType.collectionOf() : this;
    }
    _canEnsureResolved() {
        return this.collectionType.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.collectionType.maybeEnsureResolved();
    }
    _clone(variableMap) {
        const data = this.collectionType.clone(variableMap).toLiteral();
        return Type.fromLiteral({ tag: this.tag, data });
    }
    _cloneWithResolutions(variableMap) {
        return new CollectionType(this.collectionType._cloneWithResolutions(variableMap));
    }
    toLiteral() {
        return { tag: this.tag, data: this.collectionType.toLiteral() };
    }
    _hasProperty(property) {
        return this.collectionType.hasProperty(property);
    }
    toString(options = undefined) {
        return `[${this.collectionType.toString(options)}]`;
    }
    getEntitySchema() {
        return this.collectionType.getEntitySchema();
    }
    toPrettyString() {
        const entitySchema = this.getEntitySchema();
        if (entitySchema && entitySchema.description.plural) {
            return entitySchema.description.plural;
        }
        return `${this.collectionType.toPrettyString()} List`;
    }
}
export class BigCollectionType extends Type {
    constructor(bigCollectionType) {
        super('BigCollection');
        this.bigCollectionType = bigCollectionType;
    }
    get isBigCollection() {
        return true;
    }
    mergeTypeVariablesByName(variableMap) {
        const primitiveType = this.bigCollectionType;
        const result = primitiveType.mergeTypeVariablesByName(variableMap);
        return (result === primitiveType) ? this : result.bigCollectionOf();
    }
    _applyExistenceTypeTest(test) {
        return this.bigCollectionType._applyExistenceTypeTest(test);
    }
    getContainedType() {
        return this.bigCollectionType;
    }
    isTypeContainer() {
        return true;
    }
    resolvedType() {
        const primitiveType = this.bigCollectionType;
        const resolvedPrimitiveType = primitiveType.resolvedType();
        return (primitiveType !== resolvedPrimitiveType) ? resolvedPrimitiveType.bigCollectionOf() : this;
    }
    _canEnsureResolved() {
        return this.bigCollectionType.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.bigCollectionType.maybeEnsureResolved();
    }
    _clone(variableMap) {
        const data = this.bigCollectionType.clone(variableMap).toLiteral();
        return Type.fromLiteral({ tag: this.tag, data });
    }
    _cloneWithResolutions(variableMap) {
        return new BigCollectionType(this.bigCollectionType._cloneWithResolutions(variableMap));
    }
    toLiteral() {
        return { tag: this.tag, data: this.bigCollectionType.toLiteral() };
    }
    _hasProperty(property) {
        return this.bigCollectionType.hasProperty(property);
    }
    toString(options = undefined) {
        return `BigCollection<${this.bigCollectionType.toString(options)}>`;
    }
    getEntitySchema() {
        return this.bigCollectionType.getEntitySchema();
    }
    toPrettyString() {
        const entitySchema = this.getEntitySchema();
        if (entitySchema && entitySchema.description.plural) {
            return entitySchema.description.plural;
        }
        return `Collection of ${this.bigCollectionType.toPrettyString()}`;
    }
}
export class RelationType extends Type {
    constructor(relation) {
        super('Relation');
        this.relationEntities = relation;
    }
    get isRelation() {
        return true;
    }
    toLiteral() {
        return { tag: this.tag, data: this.relationEntities.map(t => t.toLiteral()) };
    }
    toPrettyString() {
        return JSON.stringify(this.relationEntities);
    }
}
export class InterfaceType extends Type {
    constructor(iface) {
        super('Interface');
        this.interfaceShape = iface;
    }
    get isInterface() {
        return true;
    }
    mergeTypeVariablesByName(variableMap) {
        const shape = this.interfaceShape.clone(new Map());
        shape.mergeTypeVariablesByName(variableMap);
        // TODO: only build a new type when a variable is modified
        return new InterfaceType(shape);
    }
    _applyExistenceTypeTest(test) {
        return this.interfaceShape._applyExistenceTypeTest(test);
    }
    resolvedType() {
        return new InterfaceType(this.interfaceShape.resolvedType());
    }
    _canEnsureResolved() {
        return this.interfaceShape.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.interfaceShape.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        return new InterfaceType(this.interfaceShape.canWriteSuperset);
    }
    get canReadSubset() {
        return new InterfaceType(this.interfaceShape.canReadSubset);
    }
    _isMoreSpecificThan(type) {
        return this.interfaceShape.isMoreSpecificThan(type.interfaceShape);
    }
    _clone(variableMap) {
        const data = this.interfaceShape.clone(variableMap).toLiteral();
        return Type.fromLiteral({ tag: this.tag, data });
    }
    _cloneWithResolutions(variableMap) {
        return new InterfaceType(this.interfaceShape._cloneWithResolutions(variableMap));
    }
    toLiteral() {
        return { tag: this.tag, data: this.interfaceShape.toLiteral() };
    }
    toString(options = undefined) {
        return this.interfaceShape.name;
    }
    toPrettyString() {
        return this.interfaceShape.toPrettyString();
    }
}
export class SlotType extends Type {
    constructor(slot) {
        super('Slot');
        this.slot = slot;
    }
    get isSlot() {
        return true;
    }
    get canWriteSuperset() {
        return this;
    }
    get canReadSubset() {
        return this;
    }
    _isMoreSpecificThan(type) {
        // TODO: formFactor checking, etc.
        return true;
    }
    toLiteral() {
        return { tag: this.tag, data: this.slot.toLiteral() };
    }
    toString(options = undefined) {
        const fields = [];
        for (const key of Object.keys(this.slot)) {
            if (this.slot[key] !== undefined) {
                fields.push(`${key}:${this.slot[key]}`);
            }
        }
        let fieldsString = '';
        if (fields.length !== 0) {
            fieldsString = ` {${fields.join(', ')}}`;
        }
        return `Slot${fieldsString}`;
    }
    toPrettyString() {
        const fields = [];
        for (const key of Object.keys(this.slot)) {
            if (this.slot[key] !== undefined) {
                fields.push(`${key}:${this.slot[key]}`);
            }
        }
        let fieldsString = '';
        if (fields.length !== 0) {
            fieldsString = ` {${fields.join(', ')}}`;
        }
        return `Slot${fieldsString}`;
    }
}
export class ReferenceType extends Type {
    constructor(reference) {
        super('Reference');
        this.referredType = reference;
    }
    get isReference() {
        return true;
    }
    getContainedType() {
        return this.referredType;
    }
    isTypeContainer() {
        return true;
    }
    resolvedType() {
        const primitiveType = this.referredType;
        const resolvedPrimitiveType = primitiveType.resolvedType();
        return (primitiveType !== resolvedPrimitiveType) ? new ReferenceType(resolvedPrimitiveType) : this;
    }
    _canEnsureResolved() {
        return this.referredType.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.referredType.maybeEnsureResolved();
    }
    get canReadSubset() {
        return this.referredType.canReadSubset;
    }
    _clone(variableMap) {
        const data = this.referredType.clone(variableMap).toLiteral();
        return Type.fromLiteral({ tag: this.tag, data });
    }
    _cloneWithResolutions(variableMap) {
        return new ReferenceType(this.referredType._cloneWithResolutions(variableMap));
    }
    toLiteral() {
        return { tag: this.tag, data: this.referredType.toLiteral() };
    }
    toString(options = undefined) {
        return 'Reference<' + this.referredType.toString() + '>';
    }
}
export class ArcInfoType extends Type {
    constructor() {
        super('ArcInfo');
    }
    get isArcInfo() {
        return true;
    }
    newInstance(arcId, serialization) {
        return new ArcInfo(arcId, serialization);
    }
    toLiteral() {
        return { tag: this.tag };
    }
}
export class HandleInfoType extends Type {
    constructor() {
        super('HandleInfo');
    }
    get isHandleInfo() {
        return true;
    }
    toLiteral() {
        return { tag: this.tag };
    }
}
//# sourceMappingURL=type.js.map