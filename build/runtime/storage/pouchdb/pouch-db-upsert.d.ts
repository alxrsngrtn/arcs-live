/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
export interface UpsertDoc {
    version: number;
}
export interface UpsertMutatorFn<T extends UpsertDoc> {
    (arg: T): Promise<T>;
}
/**
 * Provides a way to read-modify-write data for a given PouchDB key
 * based on the following rules:
 *
 * - A new entry based on defaultValue is stored if it doesn't exist.
 * - If the existing entry is available it is fetched.
 * - A copy of the existing document is passed to `mutatorFn`
 * - If the model is new or mutated by `mutatorFn`, write a new revision.
 *
 * @return the current value of data for `docId`
 * @param db The database where we send our get/put calls.
 * @param docId The value to get and set
 * @param mutatorFn A function that can optionally make changes to the existing entry.
 * @param defaultValue If the docId does not exist use this and also pass through mutatorFn.
 */
export declare function upsert<T extends UpsertDoc>(db: PouchDB.Database, docId: string, mutatorFn?: UpsertMutatorFn<T>, defaultValue?: PouchDB.Core.NewDocument<T>): Promise<T>;
