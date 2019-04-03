import { Schema } from './schema.js';
import { Type } from './type.js';
import { ParticleExecutionContext } from './particle-execution-context.js';
declare type EntityIdComponents = {
    base: string;
    component: () => number;
};
export declare type EntityRawData = {};
/**
 * Regular interface for Entities.
 */
export interface EntityInterface {
    isIdentified(): boolean;
    id: string;
    identify(identifier: string): void;
    createIdentity(components: EntityIdComponents): void;
    toLiteral(): EntityRawData;
    toJSON(): EntityRawData;
    dataClone(): EntityRawData;
    [index: string]: any;
}
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
    private userIDComponent?;
    private schema;
    protected rawData: EntityRawData;
    protected constructor(data: EntityRawData, schema: Schema, context: ParticleExecutionContext, userIDComponent?: string);
    getUserID(): string;
    isIdentified(): boolean;
    readonly id: any;
    identify(identifier: string): void;
    createIdentity(components: EntityIdComponents): void;
    toLiteral(): EntityRawData;
    toJSON(): EntityRawData;
    dataClone(): EntityRawData;
    /** Dynamically constructs a new JS class for the entity type represented by the given schema. */
    static createEntityClass(schema: Schema, context: ParticleExecutionContext): EntityClass;
}
export {};
