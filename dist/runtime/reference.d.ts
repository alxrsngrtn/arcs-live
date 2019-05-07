/** @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Storable } from './handle.js';
import { ParticleExecutionContext } from './particle-execution-context.js';
import { ReferenceType } from './type.js';
import { Entity } from './entity.js';
import { SerializedEntity } from './storage-proxy.js';
export declare class Reference implements Storable {
    entity: Entity | null;
    type: ReferenceType;
    protected readonly id: string;
    private storageKey;
    private readonly context;
    private storageProxy;
    protected handle: any;
    constructor(data: {
        id: string;
        storageKey: string | null;
    }, type: ReferenceType, context: ParticleExecutionContext);
    protected ensureStorageProxy(): Promise<void>;
    dereference(): Promise<Entity | null>;
    dataClone(): {
        storageKey: string;
        id: string;
    };
    serialize(): SerializedEntity;
}
/** A subclass of Reference that clients can create. */
export declare abstract class ClientReference extends Reference {
    private mode;
    stored: Promise<undefined>;
    /** Use the newClientReference factory method instead. */
    protected constructor(entity: Entity, context: ParticleExecutionContext);
    private storeReference;
    dereference(): Promise<Entity | null>;
    isIdentified(): boolean;
    static newClientReference(context: ParticleExecutionContext): typeof ClientReference;
}
