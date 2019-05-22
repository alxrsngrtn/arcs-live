import { Schema } from './schema.js';
import { Type } from './type.js';
import { ParticleExecutionContext } from './particle-execution-context.js';
import { Storable } from './handle.js';
import { SerializedEntity } from './storage-proxy.js';
import { Id, IdGenerator } from './id.js';
import { Dictionary, Consumer } from './hot.js';
export declare type EntityRawData = {};
/**
 * Regular interface for Entities.
 */
export interface EntityInterface extends Storable {
    isIdentified(): boolean;
    identify(identifier: string): void;
    createIdentity(parentId: Id, idGenerator: IdGenerator): void;
    toLiteral(): EntityRawData;
    toJSON(): EntityRawData;
    dataClone(): EntityRawData;
    mutate(mutationFn: Consumer<MutableEntityData>): void;
    mutable: boolean;
    readonly id: string;
    readonly entityClass: EntityClass;
    [index: string]: any;
}
/**
 * Represents mutable entity data. Instances will have mutable properties defined on them for all of the fields defined in the schema for the
 * entity. This type permits indexing by all strings, because we do not know what those fields are at compile time (since they're dynamic).
 */
export declare type MutableEntityData = Dictionary<any>;
/**
 * A set of static methods used by Entity implementations.  These are
 * defined dynamically in Schema.  Required because Typescript does
 * not support abstract statics.
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
/**
 * The merged interfaces.  Replaces usages of typeof Entity.
 */
export declare type EntityClass = (new (data: any, userIDComponent?: string) => EntityInterface) & EntityStaticInterface;
export declare abstract class Entity implements EntityInterface {
    protected rawData: EntityRawData;
    private userIDComponent?;
    private schema;
    private context;
    private _mutable;
    protected constructor(data: EntityRawData, schema: Schema, context: ParticleExecutionContext, userIDComponent?: string);
    /** Returns true if this Entity instance can have its fields mutated. */
    /**
    * Prevents further mutation of this Entity instance. Note that calling this method only affects this particular Entity instance; the entity
    * it represents (in a data store somewhere) can still be mutated by others. Also note that this field offers no security at all against
    * malicious developers; they can reach in and modify the "private" backing field directly.
    */
    mutable: boolean;
    /**
     * Mutates the entity. Supply either the new data for the entity, which replaces the existing entity's data entirely, or a mutation function.
     * The supplied mutation function will be called with a mutable copy of the entity's data. The mutations performed by that function will be
     * reflected in the original entity instance (i.e. mutations applied in place).
     */
    mutate(mutation: ((data: MutableEntityData) => void) | {}): void;
    getUserID(): string;
    isIdentified(): boolean;
    readonly id: string;
    identify(identifier: string): void;
    createIdentity(parentId: Id, idGenerator: IdGenerator): void;
    toLiteral(): EntityRawData;
    toJSON(): EntityRawData;
    dataClone(): EntityRawData;
    serialize(): SerializedEntity;
    abstract entityClass: EntityClass;
    /** Dynamically constructs a new JS class for the entity type represented by the given schema. */
    static createEntityClass(schema: Schema, context: ParticleExecutionContext): EntityClass;
}
