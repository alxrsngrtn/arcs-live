/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { InterfaceInfo } from './interface-info.js';
import { Schema } from './schema.js';
import { SlotInfo } from './slot-info.js';
import { ArcInfo } from './synthetic-types.js';
import { TypeVariableInfo } from './type-variable-info.js';
import { CRDTCount } from './crdt/crdt-count.js';
import { CRDTCollection } from './crdt/crdt-collection.js';
import { CRDTSingleton } from './crdt/crdt-singleton.js';
import { CollectionHandle, SingletonHandle } from './storageNG/handle.js';
export class Type {
    constructor(tag) {
        this.tag = tag;
    }
    static fromLiteral(literal) {
        switch (literal.tag) {
            case 'Entity':
                return new EntityType(Schema.fromLiteral(literal.data));
            case 'TypeVariable':
                return new TypeVariable(TypeVariableInfo.fromLiteral(literal.data));
            case 'Collection':
                return new CollectionType(Type.fromLiteral(literal.data));
            case 'BigCollection':
                return new BigCollectionType(Type.fromLiteral(literal.data));
            case 'Relation':
                return new RelationType(literal.data.map(t => Type.fromLiteral(t)));
            case 'Interface':
                return new InterfaceType(InterfaceInfo.fromLiteral(literal.data));
            case 'Slot':
                return new SlotType(SlotInfo.fromLiteral(literal.data));
            case 'Reference':
                return new ReferenceType(Type.fromLiteral(literal.data));
            case 'Arc':
                return new ArcType();
            case 'Handle':
                return new HandleType();
            case 'Singleton':
                return new SingletonType(Type.fromLiteral(literal.data));
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
            if (type1.canReadSubset instanceof EntityType && type2.canReadSubset instanceof EntityType) {
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
            if (type1.canWriteSuperset instanceof EntityType && type2.canWriteSuperset instanceof EntityType) {
                return Schema.union(type1.canWriteSuperset.entitySchema, type2.canWriteSuperset.entitySchema) !== null;
            }
        }
        return true;
    }
    isSlot() {
        return this instanceof SlotType;
    }
    slandleType() {
        if (this.isSlot()) {
            return this;
        }
        if (this.isCollectionType() && this.collectionType.isSlot()) {
            return this.collectionType;
        }
        return undefined;
    }
    // If you want to type-check fully, this is an improvement over just using
    // this instanceof CollectionType,
    // because instanceof doesn't propagate generic restrictions.
    isCollectionType() {
        return this instanceof CollectionType;
    }
    // If you want to type-check fully, this is an improvement over just using
    // this instaneceof BigCollectionType,
    // because instanceof doesn't propagate generic restrictions.
    isBigCollectionType() {
        return this instanceof BigCollectionType;
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
        return this._applyExistenceTypeTest(type => type instanceof TypeVariable);
    }
    get hasUnresolvedVariable() {
        return this._applyExistenceTypeTest(type => type instanceof TypeVariable && !type.variable.isResolved());
    }
    getContainedType() {
        return null;
    }
    isTypeContainer() {
        return false;
    }
    get isReference() {
        return false;
    }
    get isSingleton() {
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
    crdtInstanceConstructor() {
        return null;
    }
    handleConstructor() {
        return null;
    }
}
export class CountType extends Type {
    constructor() {
        super('Count');
    }
    toLiteral() {
        return { tag: 'Count' };
    }
    crdtInstanceConstructor() {
        return CRDTCount;
    }
}
export class SingletonType extends Type {
    constructor(type) {
        super('Singleton');
        this.innerType = type;
    }
    toLiteral() {
        return { tag: 'Singleton', data: this.innerType.toLiteral() };
    }
    getContainedType() {
        return this.innerType;
    }
    crdtInstanceConstructor() {
        return CRDTSingleton;
    }
    handleConstructor() {
        return SingletonHandle;
    }
    get isSingleton() {
        return true;
    }
    toString(options = undefined) {
        return `![${this.innerType.toString(options)}]`;
    }
}
export class EntityType extends Type {
    constructor(schema) {
        super('Entity');
        this.entitySchema = schema;
    }
    static make(names, fields, description) {
        return new EntityType(new Schema(names, fields, description));
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
    _cloneWithResolutions(variableMap) {
        if (variableMap.has(this.entitySchema)) {
            return variableMap.get(this.entitySchema);
        }
        const clonedEntityType = new EntityType(this.entitySchema);
        variableMap.set(this.entitySchema, clonedEntityType);
        return clonedEntityType;
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
    crdtInstanceConstructor() {
        return this.entitySchema.crdtConstructor();
    }
    handleConstructor() {
        // Currently using SingletonHandle as the implementation for Entity handles.
        // TODO: Make an EntityHandle class that uses the proper Entity CRDT.
        throw new Error(`Entity handle not yet implemented - you probably want to use a SingletonType`);
    }
}
export class TypeVariable extends Type {
    constructor(variable) {
        super('TypeVariable');
        this.variable = variable;
    }
    static make(name, canWriteSuperset, canReadSubset) {
        return new TypeVariable(new TypeVariableInfo(name, canWriteSuperset, canReadSubset));
    }
    get isVariable() {
        return true;
    }
    mergeTypeVariablesByName(variableMap) {
        const name = this.variable.name;
        let variable = variableMap.get(name);
        if (!variable) {
            variable = this;
            variableMap.set(name, this);
        }
        else if (variable instanceof TypeVariable) {
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
            return new TypeVariable(variableMap.get(name));
        }
        else {
            const newTypeVariable = TypeVariableInfo.fromLiteral(this.variable.toLiteral());
            variableMap.set(name, newTypeVariable);
            return new TypeVariable(newTypeVariable);
        }
    }
    _cloneWithResolutions(variableMap) {
        if (variableMap.has(this.variable)) {
            return new TypeVariable(variableMap.get(this.variable));
        }
        else {
            const newTypeVariable = TypeVariableInfo.fromLiteral(this.variable.toLiteralIgnoringResolutions());
            if (this.variable.resolution) {
                newTypeVariable._resolution = this.variable._resolution._cloneWithResolutions(variableMap);
            }
            if (this.variable._canReadSubset) {
                newTypeVariable.canReadSubset = this.variable.canReadSubset._cloneWithResolutions(variableMap);
            }
            if (this.variable._canWriteSuperset) {
                newTypeVariable.canWriteSuperset = this.variable.canWriteSuperset._cloneWithResolutions(variableMap);
            }
            variableMap.set(this.variable, newTypeVariable);
            return new TypeVariable(newTypeVariable);
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
        const collectionType = this.collectionType;
        const result = collectionType.mergeTypeVariablesByName(variableMap);
        return (result === collectionType) ? this : result.collectionOf();
    }
    _applyExistenceTypeTest(test) {
        return this.collectionType._applyExistenceTypeTest(test);
    }
    getContainedType() {
        return this.collectionType;
    }
    isTypeContainer() {
        return true;
    }
    resolvedType() {
        const collectionType = this.collectionType;
        const resolvedCollectionType = collectionType.resolvedType();
        return (collectionType !== resolvedCollectionType) ? resolvedCollectionType.collectionOf() : this;
    }
    _canEnsureResolved() {
        return this.collectionType.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.collectionType.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        return InterfaceType.make(this.tag, [], []);
    }
    get canReadSubset() {
        return InterfaceType.make(this.tag, [], []);
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
    crdtInstanceConstructor() {
        return CRDTCollection;
    }
    handleConstructor() {
        return CollectionHandle;
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
        const collectionType = this.bigCollectionType;
        const result = collectionType.mergeTypeVariablesByName(variableMap);
        return (result === collectionType) ? this : result.bigCollectionOf();
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
        const collectionType = this.bigCollectionType;
        const resolvedCollectionType = collectionType.resolvedType();
        return (collectionType !== resolvedCollectionType) ? resolvedCollectionType.bigCollectionOf() : this;
    }
    _canEnsureResolved() {
        return this.bigCollectionType.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.bigCollectionType.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        return InterfaceType.make(this.tag, [], []);
    }
    get canReadSubset() {
        return InterfaceType.make(this.tag, [], []);
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
        this.interfaceInfo = iface;
    }
    static make(name, handleConnections, slots) {
        return new InterfaceType(new InterfaceInfo(name, handleConnections, slots));
    }
    get isInterface() {
        return true;
    }
    mergeTypeVariablesByName(variableMap) {
        const interfaceInfo = this.interfaceInfo.clone(new Map());
        interfaceInfo.mergeTypeVariablesByName(variableMap);
        // TODO: only build a new type when a variable is modified
        return new InterfaceType(interfaceInfo);
    }
    _applyExistenceTypeTest(test) {
        return this.interfaceInfo._applyExistenceTypeTest(test);
    }
    resolvedType() {
        return new InterfaceType(this.interfaceInfo.resolvedType());
    }
    _canEnsureResolved() {
        return this.interfaceInfo.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.interfaceInfo.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        return new InterfaceType(this.interfaceInfo.canWriteSuperset);
    }
    get canReadSubset() {
        return new InterfaceType(this.interfaceInfo.canReadSubset);
    }
    _isMoreSpecificThan(type) {
        return this.interfaceInfo.isMoreSpecificThan(type.interfaceInfo);
    }
    _clone(variableMap) {
        const data = this.interfaceInfo.clone(variableMap).toLiteral();
        return Type.fromLiteral({ tag: this.tag, data });
    }
    _cloneWithResolutions(variableMap) {
        return new InterfaceType(this.interfaceInfo._cloneWithResolutions(variableMap));
    }
    toLiteral() {
        return { tag: this.tag, data: this.interfaceInfo.toLiteral() };
    }
    toString(options = undefined) {
        return this.interfaceInfo.name;
    }
    toPrettyString() {
        return this.interfaceInfo.toPrettyString();
    }
}
export class SlotType extends Type {
    constructor(slot) {
        super('Slot');
        this.slot = slot;
    }
    static make(formFactor, handle) {
        return new SlotType(new SlotInfo(formFactor, handle));
    }
    getSlot() {
        return this.slot;
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
        const referredType = this.referredType;
        const resolvedReferredType = referredType.resolvedType();
        return (referredType !== resolvedReferredType) ? new ReferenceType(resolvedReferredType) : this;
    }
    _canEnsureResolved() {
        return this.referredType.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.referredType.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        // TODO(cypher1): Possibly cannot write to references.
        return this.referredType.canWriteSuperset;
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
    getEntitySchema() {
        return this.referredType.getEntitySchema();
    }
}
export class ArcType extends Type {
    constructor() {
        super('Arc');
    }
    get isArc() {
        return true;
    }
    newInstance(arcId, serialization) {
        return new ArcInfo(arcId, serialization);
    }
    toLiteral() {
        return { tag: this.tag };
    }
}
export class HandleType extends Type {
    constructor() {
        super('Handle');
    }
    get isHandle() {
        return true;
    }
    toLiteral() {
        return { tag: this.tag };
    }
}
//# sourceMappingURL=type.js.map