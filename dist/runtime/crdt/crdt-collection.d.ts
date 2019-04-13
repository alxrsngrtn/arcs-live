/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { VersionMap, CRDTTypeRecord } from "./crdt.js";
declare type RawCollection<T> = Set<T>;
declare type CollectionValue<T> = {
    value: T;
    clock: VersionMap;
};
declare type CollectionData<T> = {
    values: Set<{
        value: T;
        clock: VersionMap;
    }>;
    version: VersionMap;
};
declare enum CollectionOpTypes {
    Add = 0,
    Remove = 1
}
declare type CollectionOperation<T> = {
    type: CollectionOpTypes.Add;
    added: CollectionValue<T>;
} | {
    type: CollectionOpTypes.Remove;
    removed: T;
};
export interface CRDTCollectionTypeRecord<T> extends CRDTTypeRecord {
    data: CollectionData<T>;
    operation: CollectionOperation<T>;
    consumerType: RawCollection<T>;
}
export {};
