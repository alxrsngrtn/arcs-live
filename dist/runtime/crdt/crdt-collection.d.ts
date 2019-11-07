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
import { Dictionary } from '../hot.js';
declare type RawCollection<T> = Set<T>;
export interface Referenceable {
    id: string;
}
export declare type CollectionData<T extends Referenceable> = {
    values: Dictionary<{
        value: T;
        version: VersionMap;
    }>;
    version: VersionMap;
};
export declare enum CollectionOpTypes {
    Add = 0,
    Remove = 1,
    FastForward = 2
}
export declare type CollectionFastForwardOp<T> = {
    type: CollectionOpTypes.FastForward;
    added: [T, VersionMap][];
    removed: T[];
    oldClock: VersionMap;
    newClock: VersionMap;
};
export declare type CollectionOperationAdd<T> = {
    type: CollectionOpTypes.Add;
    added: T;
    actor: string;
    clock: VersionMap;
};
export declare type CollectionOperationRemove<T> = {
    type: CollectionOpTypes.Remove;
    removed: T;
    actor: string;
    clock: VersionMap;
};
export declare type CollectionOperation<T> = CollectionOperationAdd<T> | CollectionOperationRemove<T> | CollectionFastForwardOp<T>;
export interface CRDTCollectionTypeRecord<T extends Referenceable> extends CRDTTypeRecord {
    data: CollectionData<T>;
    operation: CollectionOperation<T>;
    consumerType: RawCollection<T>;
}
declare type CollectionChange<T extends Referenceable> = CRDTChange<CRDTCollectionTypeRecord<T>>;
declare type CollectionModel<T extends Referenceable> = CRDTModel<CRDTCollectionTypeRecord<T>>;
export declare class CRDTCollection<T extends Referenceable> implements CollectionModel<T> {
    private model;
    merge(other: CollectionData<T>): {
        modelChange: CollectionChange<T>;
        otherChange: CollectionChange<T>;
    };
    applyOperation(op: CollectionOperation<T>): boolean;
    getData(): CollectionData<T>;
    getParticleView(): RawCollection<T>;
    private add;
    private remove;
    private fastForward;
    private checkValue;
}
/**
 * Converts a simple fast-forward operation into a sequence of regular ops.
 * Currently only supports converting add ops made by a single actor. Returns
 * null if it could not simplify the fast-forward operation.
 */
export declare function simplifyFastForwardOp<T>(fastForwardOp: CollectionFastForwardOp<T>): CollectionOperation<T>[];
export {};
