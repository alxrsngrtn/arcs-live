/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { KeyBase } from '../key-base.js';
/**
 * Keys for PouchDb entities.  A pouchdb key looks like a url. of the following form:
 *
 *    pouchdb://{dblocation}/{dbname}/{location}
 *
 * The scheme is pouchdb, followed by the database location which can be:
 *
 * - memory (stores in local memory)
 * - local (persistant stored in IDB (browser) or LevelDB (node)
 * - a hostname (stores on the remote host)
 *
 * A slash separated database name and key location then follow.
 * The default for dblocation is 'memory' and the default dbname is 'user'.
 *
 * Some sample keys
 *
 * - pouchdb://memory/user/nice/long-storage-key
 * - pouchdb://localhost:8080/user/storagekey123
 * - pouchdb://local/user/storagekey123
 */
export declare class PouchDbKey extends KeyBase {
    readonly dbLocation: string;
    readonly dbName: string;
    constructor(key: string);
    base(): string;
    get arcId(): string;
    /**
     * Creates a new child PouchDbKey relative to the current key, based on the value of id.
     */
    childKeyForHandle(id: string): PouchDbKey;
    childKeyForArcInfo(): PouchDbKey;
    childKeyForSuggestions(userId: string, arcId: string): KeyBase;
    childKeyForSearch(userId: string): KeyBase;
    private buildChildKey;
    toString(): string;
    dbCacheKey(): string;
}
