/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTModel, CRDTOperation, CRDTTypeRecord, VersionMap } from '../crdt/crdt.js';
import { Handle } from './handle.js';
import { ActiveStore, ProxyMessage } from './store.js';
/**
 * TODO: describe this class.
 */
export declare class StorageProxy<T extends CRDTTypeRecord> {
    private handles;
    private crdt;
    private id;
    private store;
    constructor(crdt: CRDTModel<T>, store: ActiveStore<T>);
    registerWithStore(store: ActiveStore<T>): void;
    registerHandle(h: Handle<T>): VersionMap;
    applyOp(op: CRDTOperation): Promise<boolean>;
    getParticleView(): Promise<T['consumerType']>;
    onMessage(message: ProxyMessage<T>): Promise<boolean>;
    private notifyUpdate;
    private notifySync;
    private synchronizeModel;
}
