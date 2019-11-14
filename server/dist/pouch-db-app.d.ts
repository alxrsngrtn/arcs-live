/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { AppBase } from './app-base';
/**
 * An app server that additionally configures a pouchdb.
 * It also starts a remote planning thread (for now).
 *
 * Environment variables recognized:
 * - `TARGET_DISK` used to store an on-disk pouch database.
 * - `ARCS_USER_ID` used to specify the user that owns this instance.
 * - `STORAGE_KEY_BASE` default is `pouchdb://localhost:8080/user`
 */
declare class PouchDbApp extends AppBase {
    private static readonly storageKeyBase;
    private static readonly userId;
    startBackgroundProcessing(): void;
    protected addRoutes(): void;
    /**
     * Adds support for a local PouchDB database service.  More information about setup is available at
     * https://github.com/pouchdb/pouchdb-server
     */
    private addPouchRoutes;
}
export declare const app: PouchDbApp;
export {};
