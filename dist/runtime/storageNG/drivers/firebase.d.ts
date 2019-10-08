/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Driver, ReceiveMethod, StorageDriverProvider, Exists } from './driver-factory.js';
import { StorageKey } from '../storage-key.js';
import { firebase } from '../../../platform/firebase-web.js';
import { Runtime } from '../../runtime.js';
export declare class FirebaseStorageKey extends StorageKey {
    readonly databaseURL: string;
    readonly projectId: string;
    readonly apiKey: string;
    readonly location: string;
    readonly domain: string;
    constructor(projectId: string, domain: string, apiKey: string, location: string);
    toString(): string;
    childWithComponent(component: string): FirebaseStorageKey;
    static fromString(key: string): FirebaseStorageKey;
}
export declare class FirebaseAppCache {
    protected appCache: Map<string, firebase.app.App>;
    constructor(runtime: Runtime);
    getApp(key: FirebaseStorageKey): firebase.app.App;
    stopAllApps(): Promise<void>;
    static stop(): Promise<void>;
}
export declare class FirebaseDriver<Data> extends Driver<Data> {
    private receiver;
    appCache: FirebaseAppCache;
    storageKey: FirebaseStorageKey;
    private reference;
    private seenVersion;
    private seenTag;
    private nextTag;
    private pendingModel;
    private pendingVersion;
    init(): Promise<void>;
    registerReceiver(receiver: ReceiveMethod<Data>): void;
    send(model: Data, version: number): Promise<any>;
    remoteStateChanged(dataSnapshot: firebase.database.DataSnapshot): void;
    write(key: StorageKey, value: Data): Promise<void>;
    read(key: StorageKey): Promise<void>;
}
export declare class FirebaseStorageDriverProvider implements StorageDriverProvider {
    willSupport(storageKey: StorageKey): boolean;
    driver<Data>(storageKey: StorageKey, exists: Exists): Promise<FirebaseDriver<Data>>;
    static register(): void;
}
