/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTChange, CRDTModel, CRDTTypeRecord, VersionMap } from './crdt';
declare type RawCollection<T> = Set<T>;
declare type CollectionData<T> = {
    values: Map<T, VersionMap>;
    version: VersionMap;
};
export declare enum CollectionOpTypes {
    Add = 0,
    Remove = 1
}
export declare type CollectionOperation<T> = {
    type: CollectionOpTypes.Add;
    added: T;
    actor: string;
    clock: VersionMap;
} | {
    type: CollectionOpTypes.Remove;
    removed: T;
    actor: string;
    clock: VersionMap;
};
export interface CRDTCollectionTypeRecord<T> extends CRDTTypeRecord {
    data: CollectionData<T>;
    operation: CollectionOperation<T>;
    consumerType: RawCollection<T>;
}
declare type CollectionChange<T> = CRDTChange<CRDTCollectionTypeRecord<T>>;
declare type CollectionModel<T> = CRDTModel<CRDTCollectionTypeRecord<T>>;
export declare class CRDTCollection<T> implements CollectionModel<T> {
    private model;
    merge(other: CollectionModel<T>): {
        modelChange: CollectionChange<T>;
        otherChange: CollectionChange<T>;
    };
    applyOperation(op: CollectionOperation<T>): boolean;
    getData(): CollectionData<T>;
    getParticleView(): RawCollection<T>;
    private add;
    private remove;
    private mergeItems;
}
export {};
