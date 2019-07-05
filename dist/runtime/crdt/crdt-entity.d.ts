/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTChange, CRDTModel, CRDTTypeRecord, VersionMap } from './crdt.js';
import { Referenceable, CRDTCollectionTypeRecord, CRDTCollection } from './crdt-collection.js';
import { CRDTSingletonTypeRecord, CRDTSingleton } from './crdt-singleton.js';
import { Dictionary } from '../hot.js';
declare type Identified = Dictionary<Referenceable>;
declare type RawEntity<S extends Identified, C extends Identified> = {
    singletons: S;
    collections: {
        [P in keyof C]: Set<C[P]>;
    };
};
declare type SingletonEntityData<S extends Identified> = {
    [P in keyof S]: CRDTSingletonTypeRecord<S[P]>['data'];
};
declare type CollectionEntityData<S extends Identified> = {
    [P in keyof S]: CRDTCollectionTypeRecord<S[P]>['data'];
};
declare type SingletonEntityModel<S extends Identified> = {
    [P in keyof S]: CRDTSingleton<S[P]>;
};
declare type CollectionEntityModel<S extends Identified> = {
    [P in keyof S]: CRDTCollection<S[P]>;
};
export declare type EntityData<S extends Identified, C extends Identified> = {
    singletons: SingletonEntityData<S>;
    collections: CollectionEntityData<C>;
    version: VersionMap;
};
export declare type EntityInternalModel<S extends Identified, C extends Identified> = {
    singletons: SingletonEntityModel<S>;
    collections: CollectionEntityModel<C>;
    version: VersionMap;
};
export declare enum EntityOpTypes {
    Set = 0,
    Clear = 1,
    Add = 2,
    Remove = 3
}
declare type SetOp<Singleton, Field extends keyof Singleton> = {
    type: EntityOpTypes.Set;
    field: Field;
    value: Singleton[Field];
    actor: string;
    clock: VersionMap;
};
declare type AddOp<Collection, Field extends keyof Collection> = {
    type: EntityOpTypes.Add;
    field: Field;
    value: Collection[Field];
    actor: string;
    clock: VersionMap;
};
declare type RemoveOp<Collection, Field extends keyof Collection> = {
    type: EntityOpTypes.Remove;
    field: Field;
    value: Collection[Field];
    actor: string;
    clock: VersionMap;
};
export declare type EntityOperation<S, C> = SetOp<S, keyof S> | {
    type: EntityOpTypes.Clear;
    field: keyof S;
    actor: string;
    clock: VersionMap;
} | AddOp<C, keyof C> | RemoveOp<C, keyof C>;
export interface CRDTEntityTypeRecord<S extends Identified, C extends Identified> extends CRDTTypeRecord {
    data: EntityData<S, C>;
    operation: EntityOperation<S, C>;
    consumerType: RawEntity<S, C>;
}
declare type EntityModel<S extends Identified, C extends Identified> = CRDTModel<CRDTEntityTypeRecord<S, C>>;
declare type EntityChange<S extends Identified, C extends Identified> = CRDTChange<CRDTEntityTypeRecord<S, C>>;
export declare class CRDTEntity<S extends Identified, C extends Identified> implements EntityModel<S, C> {
    private model;
    constructor(singletons: SingletonEntityModel<S>, collections: CollectionEntityModel<C>);
    merge(other: EntityData<S, C>): {
        modelChange: EntityChange<S, C>;
        otherChange: EntityChange<S, C>;
    };
    applyOperation(op: EntityOperation<S, C>): boolean;
    getData(): EntityData<S, C>;
    getParticleView(): RawEntity<S, C>;
}
export {};
