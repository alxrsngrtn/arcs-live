/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Schema } from './schema.js';
import { Type } from './type.js';
import { ParticleExecutionContext } from './particle-execution-context.js';
import { Storable } from './handle.js';
import { SerializedEntity } from './storage-proxy.js';
import { Id, IdGenerator } from './id.js';
import { Dictionary, Consumer } from './hot.js';
import { SYMBOL_INTERNALS } from './symbols.js';
export declare type EntityRawData = {};
/**
 * Represents mutable entity data. Instances will have mutable properties defined on them for all
 * of the fields defined in the schema for the entity. This type permits indexing by all strings,
 * because we do not know what those fields are at compile time (since they're dynamic).
 */
export declare type MutableEntityData = Dictionary<any>;
/**
 * A set of static methods used by Entity implementations. These are defined dynamically in Schema.
 * Required because Typescript does not support abstract statics.
 *
 * @see https://github.com/Microsoft/TypeScript/issues/14600
 * @see https://stackoverflow.com/a/13955591
 */
export interface EntityStaticInterface {
    readonly type: Type;
    readonly key: {
        tag: string;
        schema: Schema;
    };
    readonly schema: Schema;
}
export declare type EntityClass = (new (data: any, userIDComponent?: string) => Entity) & EntityStaticInterface;
declare class EntityInternals {
    private readonly entity;
    private readonly entityClass;
    private readonly schema;
    private readonly context;
    private id?;
    private userIDComponent?;
    private mutable;
    constructor(entity: Entity, entityClass: EntityClass, schema: Schema, context: ParticleExecutionContext, userIDComponent?: string);
    getId(): string;
    getEntityClass(): EntityClass;
    isIdentified(): boolean;
    identify(identifier: string): void;
    createIdentity(parentId: Id, idGenerator: IdGenerator): void;
    isMutable(): boolean;
    /**
     * Prevents further mutation of this Entity instance. Note that calling this method only affects
     * this particular Entity instance; the entity it represents (in a data store somewhere) can
     * still be mutated by others. Also note that this doesn't necessarily offer any security against
     * malicious developers.
     */
    makeImmutable(): void;
    /**
     * Mutates the entity. Supply either the new data for the entity, which replaces the existing
     * entity's data entirely, or a mutation function. The supplied mutation function will be called
     * with a mutable copy of the entity's data. The mutations performed by that function will be
     * reflected in the original entity instance (i.e. mutations applied in place).
     */
    mutate(mutation: Consumer<MutableEntityData> | {}): void;
    toLiteral(): EntityRawData;
    dataClone(): EntityRawData;
    serialize(): SerializedEntity;
    logForTests(): void;
}
export declare abstract class Entity implements Storable {
    [index: string]: any;
    [SYMBOL_INTERNALS]: EntityInternals;
    toString(): string;
    readonly id: void;
    readonly rawData: void;
    readonly dataClone: void;
    static createEntityClass(schema: Schema, context: ParticleExecutionContext): EntityClass;
    static id(entity: Entity): string;
    static entityClass(entity: Entity): EntityClass;
    static isIdentified(entity: Entity): boolean;
    static identify(entity: Entity, identifier: string): void;
    static createIdentity(entity: Entity, parentId: Id, idGenerator: IdGenerator): void;
    static isMutable(entity: Entity): boolean;
    static makeImmutable(entity: Entity): void;
    static mutate(entity: Entity, mutation: Consumer<MutableEntityData> | {}): void;
    static toLiteral(entity: Entity): EntityRawData;
    static dataClone(entity: Entity): EntityRawData;
    static serialize(entity: Entity): SerializedEntity;
    static logForTests(entity: Entity): void;
}
export {};
