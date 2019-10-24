/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTSingletonTypeRecord, CRDTSingleton } from '../crdt/crdt-singleton.js';
import { CRDTCollectionTypeRecord, Referenceable, CRDTCollection } from '../crdt/crdt-collection.js';
import { ActiveStore, ProxyCallback, ProxyMessage, StoreConstructorOptions } from './store-interface.js';
import { BackingStore } from './backing-store.js';
import { CRDTEntityTypeRecord } from '../crdt/crdt-entity.js';
import { DirectStore } from './direct-store.js';
import { StorageKey } from './storage-key.js';
import { CRDTData, VersionMap } from '../crdt/crdt.js';
import { Dictionary } from '../hot.js';
import { PropagatedException } from '../arc-exceptions.js';
export declare type Reference = {
    id: string;
    storageKey: StorageKey;
    version: VersionMap;
};
export declare class ReferenceCollection extends CRDTCollection<Reference> {
}
export declare class ReferenceSingleton extends CRDTSingleton<Reference> {
}
export declare type ReferenceModeOperation<T extends Referenceable> = CRDTSingletonTypeRecord<T>['operation'] | CRDTCollectionTypeRecord<T>['operation'];
export declare class ReferenceModeStorageKey extends StorageKey {
    backingKey: StorageKey;
    storageKey: StorageKey;
    constructor(backingKey: StorageKey, storageKey: StorageKey);
    embedKey(key: StorageKey): string;
    toString(): string;
    childWithComponent(component: string): StorageKey;
}
/**
 * ReferenceModeStores adapt between a collection (CRDTCollection or CRDTSingleton) of entities from the perspective of their public API,
 * and a collection of references + a backing store of entity CRDTs from an internal storage perspective.
 *
 * ReferenceModeStores maintain a queue of incoming updates (the receiveQueue) and process them one at a time. When possible, the results
 * of this processing are immediately sent upwards (to connected StorageProxies) and downwards (to storage). However, there are a few
 * caveats:
 * - incoming operations and models from StorageProxies may require several writes to storage - one for each modified entity, and one
 *   to the container store. These are processed serially, so that a container doesn't get updated if backing store modifications fail.
 * - updates from the container store need to be blocked on ensuring the required data is also available in the backing store.
 *   The holdQueue ensures that these blocks are tracked and processed appropriately.
 * - updates should always be sent in order, so a blocked send should block subsequent sends too. The pendingSends queue ensures that all
 *   outgoing updates are sent in the correct order.
 *
 */
export declare class ReferenceModeStore<Entity extends Referenceable, S extends Dictionary<Referenceable>, C extends Dictionary<Referenceable>, ReferenceContainer extends CRDTSingletonTypeRecord<Reference> | CRDTCollectionTypeRecord<Reference>, Container extends CRDTSingletonTypeRecord<Entity> | CRDTCollectionTypeRecord<Entity>> extends ActiveStore<Container> {
    backingStore: BackingStore<CRDTEntityTypeRecord<S, C>>;
    containerStore: DirectStore<ReferenceContainer>;
    private callbacks;
    private nextCallbackID;
    private crdtKey;
    private versions;
    private receiveQueue;
    private pendingSends;
    private holdQueue;
    private blockCounter;
    static construct<Entity extends Referenceable, S extends Dictionary<Referenceable>, C extends Dictionary<Referenceable>, ReferenceContainer extends CRDTSingletonTypeRecord<Reference> | CRDTCollectionTypeRecord<Reference>, Container extends CRDTSingletonTypeRecord<Entity> | CRDTCollectionTypeRecord<Entity>>(options: StoreConstructorOptions<Container> & {
        storageKey: ReferenceModeStorageKey;
    }): Promise<ReferenceModeStore<Entity, S, C, ReferenceContainer, Container>>;
    reportExceptionInHost(exception: PropagatedException): void;
    readonly versionToken: string;
    on(callback: ProxyCallback<Container>): number;
    off(callback: number): void;
    private registerStoreCallbacks;
    getLocalData(): Promise<CRDTData>;
    /**
     * Messages are enqueued onto an object-wide queue and processed in order.
     * Internally, each handler (handleContainerStore, handleBackingStore, handleProxyMessage)
     * should not return until the response relevant to the message has been received.
     *
     * When handling proxy messages, this implies 2 rounds of update - first the backing
     * store needs to be updated, and once that has completed then the container store needs
     * to be updated.
     */
    onContainerStore(message: ProxyMessage<ReferenceContainer>): Promise<boolean>;
    onBackingStore(message: ProxyMessage<CRDTEntityTypeRecord<S, C>>, muxId: string): Promise<boolean>;
    onProxyMessage(message: ProxyMessage<Container>): Promise<boolean>;
    /**
     * enqueue an incoming update onto the object-wide queue and return a promise that will be resolved
     * when the update is processed.
     */
    private enqueue;
    private processQueue;
    /**
     * Handle an update from the container store.
     *
     * Operations and Models either enqueue an immediate send (if all referenced entities
     * are available in the backing store) or enqueue a blocked send (if some referenced
     * entities are not yet present or are at the incorrect version).
     *
     * Sync requests are propagated upwards to the storage proxy.
     */
    private handleContainerStore;
    /**
     * Handle an update from the backing store.
     *
     * Model and Operation updates are routed directly to the holdQueue, where they may unblock
     * pending sends but will not have any other action.
     *
     * Syncs should never occur as operation/model updates to the backing store are generated
     * by this ReferenceModeStore object and hence should never be out-of-order.
     */
    private handleBackingStore;
    /**
     * Handle an update from an upstream StorageProxy.
     *
     * Model and Operation updates apply first to the backing store, then to the container store.
     * Backing store updates should never fail as updates are locally generated.
     * For Operations:
     * - If the container store update succeeds, then the update is mirrored to non-sending StorageProxies.
     * - If the container store update fails, then a `false` return value ensures that the upstream proxy
     *   will request a sync.
     * Model updates should not fail.
     *
     * Sync requests are handled by directly constructing and sending a model
     */
    private handleProxyMessage;
    /**
     * Enqueues a sending function on the send queue. If the send queue is empty then
     * the function is immediately invoked.
     */
    private enqueueSend;
    /**
     * Enqueues a send function on the send queue, deferring execution until the
     * provided id list is available in the backing store.
     */
    private enqueueBlockingSend;
    /**
     * Process any sends in the pending send queue, including sends blocked on the
     * provided block. This should only be called by the holdQueue.
     */
    private processPendingSends;
    /**
     * Convert the provided entity to a CRDT Model of the entity. This requires synthesizing
     * a version map for the CRDT model, which is also provided as an output.
     */
    private entityToModel;
    /**
     * Convert the provided CRDT model into an entity.
     */
    private entityFromModel;
    private cloneMap;
    /**
     * Returns a function that can construct a CRDTModel of a Container of Entities based off the
     * provided Container of References. Any referenced IDs that are not yet available in the backing
     * store are returned in the pendingIds list. The returned function should not be invoked until
     * all references in pendingIds have valid backing in the backing store.
     */
    private constructPendingIdsAndModel;
    /**
     * Add appropriate ids and send the provided message on all registered StorageProxy callbacks.
     */
    private send;
    /**
     * Add appropriate ids and send the provided message on all registered StorageProxy callbacks,
     * except for the callback identified by the provided callback ID.
     */
    private sendExcept;
    /**
     * Write the provided entity to the backing store.
     */
    private updateBackingStore;
    private newBackingInstance;
    /**
     * Apply the an add, remove, set or clear method to the provided operation
     * based on the operation type.
     */
    private processOp;
    /**
     * Return the element referenced by the provided operation, or null if the operation is a clear operation.
     */
    private operationElement;
    /**
     * Update the provided operation's element using the provided producer.
     */
    private updateOp;
}
