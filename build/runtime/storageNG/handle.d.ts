/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTTypeRecord, VersionMap } from '../crdt/crdt';
import { CRDTCollectionTypeRecord } from '../crdt/crdt-collection';
import { StorageProxy } from './storage-proxy';
/**
 * Base class for Handles.
 */
export declare abstract class Handle<T extends CRDTTypeRecord> {
    storageProxy: StorageProxy<T>;
    key: string;
    clock: VersionMap;
    constructor(key: string, storageProxy: StorageProxy<T>);
}
/**
 * A handle on a set of Entity data. Note that, as a set, a Collection can only
 * contain a single version of an Entity for each given ID. Further, no order is
 * implied by the set.
 */
export declare class CollectionHandle<T> extends Handle<CRDTCollectionTypeRecord<T>> {
    add(entity: T): boolean;
    addMultiple(entities: T[]): boolean;
    remove(entity: T): boolean;
    clear(): boolean;
    toList(): T[];
}
