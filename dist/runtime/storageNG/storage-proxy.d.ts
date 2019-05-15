/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { PECInnerPort } from '../api-channel';
import { CRDTModel, CRDTOperation, CRDTTypeRecord, VersionMap } from '../crdt/crdt';
import { Handle } from './handle';
import { ProxyMessage } from './store';
/**
 * TODO: describe this class. And add some tests.
 */
export declare class StorageProxy<T extends CRDTTypeRecord> {
    private handles;
    private crdt;
    constructor(crdt: CRDTModel<T>, port: PECInnerPort);
    registerHandle(h: Handle<T>): VersionMap;
    applyOp(op: CRDTOperation): boolean;
    getParticleView(): T['consumerType'];
    onMessage(message: ProxyMessage<T>): boolean;
}
