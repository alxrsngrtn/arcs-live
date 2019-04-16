// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
import { assert } from '../platform/assert-web.js';
import { Symbols } from './symbols.js';
import { ReferenceType, EntityType } from './type.js';
import { Reference } from './reference.js';
import { TypeChecker } from './recipe/type-checker.js';
export class Entity {
    // Currently we need a ParticleExecutionContext to be injected here in order to construct entity References (done in the sanitizeEntry
    // function below).
    // TODO(shans): Remove this dependency on ParticleExecutionContext, so that you can construct entities without one.
    constructor(data, schema, context, userIDComponent) {
        this._mutable = true;
        assert(!userIDComponent || userIDComponent.indexOf(':') === -1, 'user IDs must not contain the \':\' character');
        setEntityId(this, undefined);
        this.userIDComponent = userIDComponent;
        this.schema = schema;
        this.context = context;
        assert(data, `can't construct entity with null data`);
        this.rawData = createRawDataProxy(data, schema, context);
    }
    /** Returns true if this Entity instance can have its fields mutated. */
    get mutable() {
        // TODO: Only the Arc that "owns" this Entity should be allowed to mutate it.
        return this._mutable;
    }
    /**
     * Prevents further mutation of this Entity instance. Note that calling this method only affects this particular Entity instance; the entity
     * it represents (in a data store somewhere) can still be mutated by others. Also note that this field offers no security at all against
     * malicious developers; they can reach in and modify the "private" backing field directly.
     */
    set mutable(mutable) {
        if (!this.mutable && mutable) {
            throw new Error('You cannot make an immutable entity mutable again.');
        }
        this._mutable = mutable;
    }
    /**
     * Mutates the entity. Supply either the new data for the entity, which replaces the existing entity's data entirely, or a mutation function.
     * The supplied mutation function will be called with a mutable copy of the entity's data. The mutations performed by that function will be
     * reflected in the original entity instance (i.e. mutations applied in place).
     */
    mutate(mutation) {
        if (!this.mutable) {
            throw new Error('Entity is immutable.');
        }
        let newData;
        // Using typeof instead of instanceof here, because apparently sometimes lambdas aren't an instance of Function... :-/
        if (typeof mutation === 'function') {
            newData = this.dataClone();
            mutation(newData);
        }
        else {
            newData = mutation;
        }
        this.rawData = createRawDataProxy(newData, this.schema, this.context);
        // TODO: Send mutations to data store.
    }
    getUserID() {
        return this.userIDComponent;
    }
    isIdentified() {
        return getEntityId(this) !== undefined;
    }
    // TODO: entity should not be exposing its IDs.
    get id() {
        assert(!!this.isIdentified());
        return getEntityId(this);
    }
    identify(identifier) {
        assert(!this.isIdentified());
        setEntityId(this, identifier);
        const components = identifier.split(':');
        if (components[components.length - 2] === 'uid') {
            this.userIDComponent = components[components.length - 1];
        }
    }
    createIdentity(components) {
        assert(!this.isIdentified());
        let id;
        if (this.userIDComponent) {
            id = `${components.base}:uid:${this.userIDComponent}`;
        }
        else {
            id = `${components.base}:${components.component()}`;
        }
        setEntityId(this, id);
    }
    toLiteral() {
        return this.rawData;
    }
    toJSON() {
        return this.rawData;
    }
    dataClone() {
        const clone = {};
        const fieldTypes = this.schema.fields;
        for (const name of Object.keys(fieldTypes)) {
            if (this.rawData[name] !== undefined) {
                if (fieldTypes[name] && fieldTypes[name].kind === 'schema-reference') {
                    if (this.rawData[name]) {
                        clone[name] = this.rawData[name].dataClone();
                    }
                }
                else if (fieldTypes[name] && fieldTypes[name].kind === 'schema-collection') {
                    if (this.rawData[name]) {
                        clone[name] = [...this.rawData[name]].map(a => a.dataClone());
                    }
                }
                else {
                    clone[name] = this.rawData[name];
                }
            }
        }
        return clone;
    }
    serialize() {
        const id = getEntityId(this);
        const rawData = this.dataClone();
        return { id, rawData };
    }
    /** Dynamically constructs a new JS class for the entity type represented by the given schema. */
    static createEntityClass(schema, context) {
        // Create a new class which extends the Entity base class, and implement all of the required static methods/properties.
        const clazz = class extends Entity {
            constructor(data, userIDComponent) {
                super(data, schema, context, userIDComponent);
            }
            get entityClass() {
                return clazz;
            }
            static get type() {
                // TODO: should the entity's key just be its type?
                // Should it just be called type in that case?
                return new EntityType(schema);
            }
            static get key() {
                return { tag: 'entity', schema };
            }
            static get schema() {
                return schema;
            }
        };
        // Override the name property to use the name of the entity given in the schema.
        Object.defineProperty(clazz, 'name', { value: schema.name });
        // Add convenience properties for all of the entity's fields. These just proxy everything to the rawData proxy, but offer a nice API for
        // getting/setting fields.
        // TODO: add query / getter functions for user properties
        for (const name of Object.keys(schema.fields)) {
            Object.defineProperty(clazz.prototype, name, {
                get() {
                    return this.rawData[name];
                },
                set(v) {
                    this.rawData[name] = v;
                }
            });
        }
        return clazz;
    }
}
function convertToJsType(fieldType, schemaName) {
    switch (fieldType) {
        case 'Text':
            return 'string';
        case 'URL':
            return 'string';
        case 'Number':
            return 'number';
        case 'Boolean':
            return 'boolean';
        case 'Object':
            return 'object';
        default:
            throw new Error(`Unknown field type ${fieldType} in schema ${schemaName}`);
    }
}
// tslint:disable-next-line: no-any
function validateFieldAndTypes({ op, name, value, schema, fieldType }) {
    fieldType = fieldType || schema.fields[name];
    if (fieldType === undefined) {
        throw new Error(`Can't ${op} field ${name}; not in schema ${schema.name}`);
    }
    if (value === undefined || value === null) {
        return;
    }
    if (typeof (fieldType) !== 'object') {
        // Primitive fields.
        if (typeof (value) !== convertToJsType(fieldType, schema.name)) {
            throw new TypeError(`Type mismatch ${op}ting field ${name} (type ${fieldType}); ` +
                `value '${value}' is type ${typeof (value)}`);
        }
        return;
    }
    switch (fieldType.kind) {
        case 'schema-union':
            // Value must be a primitive that matches one of the union types.
            for (const innerType of fieldType.types) {
                if (typeof (value) === convertToJsType(innerType, schema.name)) {
                    return;
                }
            }
            throw new TypeError(`Type mismatch ${op}ting field ${name} (union [${fieldType.types}]); ` +
                `value '${value}' is type ${typeof (value)}`);
        case 'schema-tuple':
            // Value must be an array whose contents match each of the tuple types.
            if (!Array.isArray(value)) {
                throw new TypeError(`Cannot ${op} tuple ${name} with non-array value '${value}'`);
            }
            if (value.length !== fieldType.types.length) {
                throw new TypeError(`Length mismatch ${op}ting tuple ${name} ` +
                    `[${fieldType.types}] with value '${value}'`);
            }
            fieldType.types.map((innerType, i) => {
                if (value[i] !== undefined && value[i] !== null &&
                    typeof (value[i]) !== convertToJsType(innerType, schema.name)) {
                    throw new TypeError(`Type mismatch ${op}ting field ${name} (tuple [${fieldType.types}]); ` +
                        `value '${value}' has type ${typeof (value[i])} at index ${i}`);
                }
            });
            break;
        case 'schema-reference':
            if (!(value instanceof Reference)) {
                throw new TypeError(`Cannot ${op} reference ${name} with non-reference '${value}'`);
            }
            if (!TypeChecker.compareTypes({ type: value.type }, { type: new ReferenceType(fieldType.schema.model) })) {
                throw new TypeError(`Cannot ${op} reference ${name} with value '${value}' of mismatched type`);
            }
            break;
        case 'schema-collection':
            // WTF?! value instanceof Set is returning false sometimes here because the Set in
            // this environment (a native code constructor) isn't equal to the Set that the value
            // has been constructed with (another native code constructor)...
            if (value.constructor.name !== 'Set') {
                throw new TypeError(`Cannot ${op} collection ${name} with non-Set '${value}'`);
            }
            for (const element of value) {
                validateFieldAndTypes({ op, name, value: element, schema, fieldType: fieldType.schema });
            }
            break;
        default:
            throw new Error(`Unknown kind ${fieldType.kind} in schema ${schema.name}`);
    }
}
function sanitizeData(data, schema, context) {
    const sanitizedData = {};
    for (const [name, value] of Object.entries(data)) {
        const sanitizedValue = sanitizeEntry(schema.fields[name], value, name, context);
        validateFieldAndTypes({ op: 'set', name, value: sanitizedValue, schema });
        sanitizedData[name] = sanitizedValue;
    }
    return sanitizedData;
}
function sanitizeEntry(type, value, name, context) {
    if (!type) {
        // If there isn't a field type for this, the proxy will pick up
        // that fact and report a meaningful error.
        return value;
    }
    if (type.kind === 'schema-reference' && value) {
        if (value instanceof Reference) {
            // Setting value as Reference (Particle side). This will enforce that the type provided for
            // the handle matches the type of the reference.
            return value;
        }
        else if (value.id && value.storageKey) {
            // Setting value from raw data (Channel side).
            // TODO(shans): This can't enforce type safety here as there isn't any type data available.
            // Maybe this is OK because there's type checking on the other side of the channel?
            return new Reference(value, new ReferenceType(type.schema.model), context);
        }
        else {
            throw new TypeError(`Cannot set reference ${name} with non-reference '${value}'`);
        }
    }
    else if (type.kind === 'schema-collection' && value) {
        // WTF?! value instanceof Set is returning false sometimes here because the Set in
        // this environment (a native code constructor) isn't equal to the Set that the value
        // has been constructed with (another native code constructor)...
        if (value.constructor.name === 'Set') {
            return value;
        }
        else if (value.length && value instanceof Object) {
            return new Set(value.map(v => sanitizeEntry(type.schema, v, name, context)));
        }
        else {
            throw new TypeError(`Cannot set collection ${name} with non-collection '${value}'`);
        }
    }
    else {
        return value;
    }
}
/** Constructs a Proxy object to use for entities' rawData objects. This proxy will perform type-checking when getting/setting fields. */
function createRawDataProxy(data, schema, context) {
    const classJunk = ['toJSON', 'prototype', 'toString', 'inspect'];
    // TODO: figure out how to do this only on wire-created entities.
    const sanitizedData = sanitizeData(data, schema, context);
    return new Proxy(sanitizedData, {
        get: (target, name) => {
            if (classJunk.includes(name) || name.constructor === Symbol) {
                return undefined;
            }
            const value = target[name];
            validateFieldAndTypes({ op: 'get', name, value, schema });
            return value;
        },
        set: (target, name, value) => {
            throw new Error(`Tried to modify entity field '${name}'. Use the mutate method instead.`);
        }
    });
}
/**
 * Returns the ID of the given entity. This is a function private to this file instead of a method on the Entity class, so that developers can't
 * get access to it.
 */
function getEntityId(entity) {
    // Typescript doesn't let us use symbols as indexes, so cast to any first.
    // tslint:disable-next-line: no-any
    return entity[Symbols.identifier];
}
/**
 * Sets the ID of the given entity. This is a function private to this file instead of a method on the Entity class, so that developers can't
 * get access to it.
 */
function setEntityId(entity, id) {
    // Typescript doesn't let us use symbols as indexes, so cast to any first.
    // tslint:disable-next-line: no-any
    entity[Symbols.identifier] = id;
}
//# sourceMappingURL=entity.js.map