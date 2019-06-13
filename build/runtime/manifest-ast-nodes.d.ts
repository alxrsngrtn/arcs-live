/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Complete set of tokens used by `manifest-parser.peg`. To use this you
 * need to follow some simple guidelines:
 *
 * - Most interfaces should extend `BaseNode`
 * - When returning data add `as Token.NewTypeName` to validate your return types.
 *
 * You may need to check the generated output in runtime/ts/manifest-parser.ts to validate.
 */
export interface SourcePosition {
    offset: number;
    line: number;
    column: number;
}
export interface SourceLocation {
    filename?: string;
    start: SourcePosition;
    end: SourcePosition;
}
/**
 * A base token interface for the `kind` and `location` entries. This creates
 * a TypeScript Discriminated Union for most tokens.
 */
export declare class BaseNode {
    kind: string;
    location: SourceLocation;
}
export interface BigCollectionType extends BaseNode {
    kind: 'big-collection-type';
    type: ParticleArgumentType;
}
export interface CollectionType extends BaseNode {
    kind: 'collection-type';
    type: ParticleArgumentType;
}
export declare function isCollectionType(node: BaseNode): node is CollectionType;
export interface ReferenceType extends BaseNode {
    kind: 'reference-type';
    type: ParticleArgumentType;
}
export interface TypeVariable extends BaseNode {
    kind: 'variable-type';
    name: string;
    constraint: ParticleArgument;
}
export declare function isTypeVariable(node: BaseNode): node is TypeVariable;
export interface SlotType extends BaseNode {
    kind: 'slot-type';
    fields: SlotField[];
    model: {
        formFactor: string;
        handle: string;
    };
}
export declare function isSlotType(node: BaseNode): node is SlotType;
export declare function slandleType(arg: ParticleArgument): SlotType | undefined;
export interface Description extends BaseNode {
    kind: 'description';
    name: 'pattern';
    description: Description[];
}
export interface HandleRef extends BaseNode {
    kind: 'handle-ref';
    id?: string;
    name?: string;
    tags: TagList;
}
export interface Import extends BaseNode {
    kind: 'import';
    path: string;
}
export interface ManifestStorage extends BaseNode {
    kind: 'store';
    name: string;
    type: string;
    id: string | null;
    originalId: string | null;
    version: number;
    tags: TagList;
    source: string;
    origin: string;
    description: string | null;
}
export interface ManifestStorageSource {
    origin: string;
    source: string;
}
export interface ManifestStorageFileSource extends ManifestStorageSource {
    origin: 'file';
}
export interface ManifestStorageResourceSource extends ManifestStorageSource {
    origin: 'resource';
}
export interface ManifestStorageStorageSource extends ManifestStorageSource {
    origin: 'storage';
}
export interface Meta extends BaseNode {
    kind: 'meta';
    items: (MetaName | MetaStorageKey)[];
}
export interface MetaName extends BaseNode {
    kind: 'name';
    key: string;
    value: string;
}
export interface MetaStorageKey extends BaseNode {
    key: 'storageKey';
    value: string;
    kind: 'storageKey';
}
export declare type MetaItem = MetaStorageKey | MetaName;
export interface Particle extends BaseNode {
    kind: 'particle';
    name: string;
    implFile?: string;
    verbs?: VerbList;
    args?: ParticleArgument[];
    modality?: string[];
    slots?: ParticleSlot[];
    description?: Description;
    hasParticleArgument?: boolean;
    trustChecks?: ParticleTrustCheck[];
    trustClaims?: ParticleTrustClaim[];
    ref?: ParticleRef | '*';
    connections?: RecipeParticleConnection[];
    slotConnections?: RecipeParticleSlotConnection[];
}
export interface ParticleTrustClaim extends BaseNode {
    kind: 'particle-trust-claim';
    handle: string;
    trustTag: string;
}
export interface ParticleTrustCheck extends BaseNode {
    kind: 'particle-trust-check';
    handle: string;
    trustTags: string[];
}
export interface ParticleModality extends BaseNode {
    kind: 'particle-modality';
    modality: string;
}
export interface ParticleArgument extends BaseNode {
    kind: 'particle-argument';
    direction: Direction;
    type: ParticleArgumentType;
    isOptional: boolean;
    dependentConnections: ParticleHandle[];
    name: string;
    tags: TagList;
}
export declare type ParticleHandle = ParticleArgument;
export declare type ParticleItem = ParticleModality | ParticleSlot | Description | ParticleHandle;
export interface ParticleHandleDescription extends BaseNode {
    kind: 'handle-description';
    name: string;
    pattern: string;
}
export interface ParticleInterface extends BaseNode {
    kind: 'interface';
    verb: string;
    args: ParticleArgument[];
}
export interface ParticleSlot extends BaseNode {
    kind: 'particle-slot';
    name: string;
    tags: TagList;
    isRequired: boolean;
    isSet: boolean;
    formFactor: SlotFormFactor;
    provideSlotConnections: ParticleProvidedSlot[];
}
export interface ParticleProvidedSlot extends BaseNode {
    kind: 'provided-slot';
    name: string;
    tags: TagList;
    isRequired: boolean;
    isSet: boolean;
    formFactor: SlotFormFactor;
    handles: ParticleProvidedSlotHandle[];
}
export interface ParticleProvidedSlotHandle extends BaseNode {
    kind: 'particle-provided-slot-handle';
    handle: string;
}
export interface ParticleRef extends BaseNode {
    kind: 'particle-ref';
    name: string;
    verbs: VerbList;
    tags: TagList;
}
export interface RecipeNode extends BaseNode {
    kind: 'recipe';
    name: string;
    verbs: VerbList;
    items: RecipeItem[];
    annotation: Annotation;
}
export interface RecipeParticle extends BaseNode {
    kind: 'particle';
    name: string;
    ref: ParticleRef;
    connections: RecipeParticleConnection[];
    slotConnections: RecipeParticleSlotConnection[];
}
export interface RequireHandleSection extends BaseNode {
    kind: 'requireHandle';
    name: string;
    ref: HandleRef;
    fate: Fate;
}
export interface RecipeRequire extends BaseNode {
    kind: 'require';
    items: RecipeItem[];
}
export declare type RecipeItem = RecipeParticle | RecipeHandle | RequireHandleSection | RecipeRequire | RecipeSlot | RecipeSearch | RecipeConnection | Description;
export interface RecipeParticleConnection extends BaseNode {
    kind: 'handle-connection';
    param: string;
    dir: string;
    target: ParticleConnectionTargetComponents;
}
export declare type RecipeParticleItem = RecipeParticleSlotConnection | RecipeParticleConnection;
export interface ParticleConnectionTargetComponents extends BaseNode {
    kind: 'handle-connection-components';
    name: string | null;
    particle: string | null;
    tags: TagList;
}
export declare type RecipeHandleFate = string;
export interface RecipeHandle extends BaseNode {
    kind: 'handle';
    name: string | null;
    ref: HandleRef;
    fate: Fate;
}
export interface RecipeParticleSlotConnection extends BaseNode {
    kind: 'slot-connection';
    param: string;
    tags: TagList;
    name: string;
    dependentSlotConnections: RecipeParticleSlotConnection[];
    direction: SlotDirection;
}
export interface RecipeSlotConnectionRef extends BaseNode {
    kind: 'slot-connection-ref';
    param: string;
    tags: TagList;
}
export interface RecipeConnection extends BaseNode {
    kind: 'connection';
    direction: Direction;
    from: ConnectionTarget;
    to: ConnectionTarget;
}
export interface RecipeSearch extends BaseNode {
    kind: 'search';
    phrase: string;
    tokens: string[];
}
export interface RecipeSlot extends BaseNode {
    kind: 'slot';
    ref: HandleRef;
    name: string | null;
}
export interface ConnectionTarget extends BaseNode {
    kind: 'connection-target';
    targetType: 'verb' | 'tag' | 'localName' | 'particle';
    name?: string;
    particle?: string;
    verbs?: VerbList;
    param: string;
    tags?: TagList;
}
export interface VerbConnectionTarget extends BaseNode {
    targetType: 'verb';
}
export interface TagConnectionTarget extends BaseNode {
    targetType: 'tag';
}
export interface NameConnectionTarget extends BaseNode {
    name: string;
    targetType: 'localName';
}
export interface ParticleConnectionTarget extends BaseNode {
    particle: string;
    targetType: 'particle';
}
export interface ConnectionTargetHandleComponents extends BaseNode {
    param: string;
    tags: TagList;
}
export interface Resource extends BaseNode {
    kind: 'resource';
    name: string;
    data: string;
}
export interface Schema extends BaseNode {
    kind: 'schema';
    items: SchemaItem[];
    alias?: string;
}
export interface SchemaSection extends BaseNode {
    kind: 'schema-section';
    sectionType: string;
    fields: SchemaField[];
}
export interface SchemaField extends BaseNode {
    kind: 'schema-field';
    type: SchemaType;
    name: string;
}
export declare type SchemaType = SchemaReferenceType | SchemaCollectionType | SchemaPrimitiveType | SchemaUnionType | SchemaTupleType;
export interface SchemaPrimitiveType extends BaseNode {
    kind: 'schema-primitive';
    type: 'Text' | 'URL' | 'Number' | 'Boolean' | 'Bytes' | 'Object';
}
export interface SchemaCollectionType extends BaseNode {
    kind: 'schema-collection';
    schema: SchemaType;
}
export interface SchemaReferenceType extends BaseNode {
    kind: 'schema-reference';
    schema: SchemaType;
}
export interface SchemaUnionType extends BaseNode {
    kind: 'schema-union';
    types: string[];
}
export interface SchemaTupleType extends BaseNode {
    kind: 'schema-tuple';
    types: string[];
}
export interface SchemaInline extends BaseNode {
    kind: 'schema-inline';
    names: string[];
    fields: SchemaInlineField[];
}
export interface SchemaInlineField extends BaseNode {
    kind: 'schema-inline-field';
    name: string;
    type: SchemaType;
}
export interface SchemaSpec extends BaseNode {
    names: string[];
    parents: string[];
}
export declare type SchemaItem = SchemaField | Description;
export interface SchemaAlias extends BaseNode {
    kind: 'schema';
    items: SchemaItem[];
    alias: string;
}
export interface Interface extends BaseNode {
    kind: 'interface';
    name: string;
    slots: InterfaceSlot[];
    interface?: InterfaceInterface[];
    args?: InterfaceArgument[];
}
export declare type InterfaceItem = Interface | InterfaceArgument | InterfaceSlot;
export interface InterfaceArgument extends BaseNode {
    kind: 'interface-argument';
    direction: Direction;
    type: string;
    name: string;
}
export interface InterfaceInterface extends BaseNode {
    kind: 'interface';
    verb: string;
    args: InterfaceArgument[];
}
export interface InterfaceSlot extends BaseNode {
    kind: 'interface-slot';
    name: string | null;
    isRequired: boolean;
    direction: Direction;
    isSet: boolean;
}
export interface SlotField extends BaseNode {
    kind: 'slot-field';
    name: string;
    value: string;
}
export interface SlotFormFactor extends BaseNode {
    kind: 'form-factor';
    formFactor: string;
}
export declare type ParticleSlotItem = SlotFormFactor | ParticleProvidedSlot;
export interface TypeName extends BaseNode {
    kind: 'type-name';
    name: string;
}
export interface NameAndTagList {
    name: string;
    tags: TagList;
}
export declare type Annotation = string;
export declare type Indent = number;
export declare type LocalName = string;
export declare type Manifest = ManifestItem[];
export declare type ManifestStorageItem = string;
export declare type ManifestStorageDescription = string;
export declare type Modality = string;
export declare type ParticleArgumentDirection = string;
export declare type ReservedWord = string;
export declare type ResourceStart = string;
export declare type ResourceBody = string;
export declare type ResourceLine = string;
export declare type SameIndent = boolean;
export declare type SameOrMoreIndent = string;
export declare type SchemaExtends = string[];
export declare type SpaceTagList = Tag[];
export declare type Tag = string;
export declare type TagList = Tag[];
export declare type TopLevelAlias = string;
export declare type Verb = string;
export declare type VerbList = Verb[];
export declare type Version = number;
export declare type backquotedString = string;
export declare type fieldName = string;
export declare type id = string;
export declare type upperIdent = string;
export declare type lowerIdent = string;
export declare type whiteSpace = string;
export declare type eolWhiteSpace = string;
export declare type eol = string;
export declare type Direction = 'in' | 'out' | 'inout' | 'host';
export declare type SlotDirection = 'provide' | 'consume';
export declare type Fate = 'use' | 'create' | 'map' | 'copy' | '?' | '`slot';
export declare type ParticleArgumentType = TypeVariable | CollectionType | BigCollectionType | ReferenceType | SlotType | SchemaInline | TypeName;
export declare type All = Import | Meta | MetaName | MetaStorageKey | Particle | ParticleArgument | ParticleInterface | RecipeHandle | Resource | Interface | InterfaceArgument | InterfaceInterface | InterfaceSlot;
export declare type ManifestItem = RecipeNode | Particle | Import | Schema | ManifestStorage | Interface | Meta | Resource;
