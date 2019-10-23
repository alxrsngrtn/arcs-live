/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/assert-web.js';
import { UnifiedStore } from '../storageNG/unified-store.js';
export class StorageBase {
    constructor(arcId) {
        this.arcId = arcId;
        this._debug = false;
        assert(arcId !== undefined, 'Arcs with storage must have ids');
    }
    /**
     * Turn on debugginf for this storage provider.  Providers should
     * subclass this and react to changes in the debug value.
     */
    set debug(d) {
        this._debug = d;
    }
    /**
     * Provides graceful shutdown for tests.
     */
    async shutdown() { }
}
export class ChangeEvent {
    constructor(args) {
        Object.assign(this, args);
    }
}
/**
 * Docs TBD
 */
export class StorageProviderBase extends UnifiedStore {
    constructor(type, name, id, key) {
        super({ type, name, id });
        this.unifiedStoreType = 'StorageProviderBase';
        this.legacyListeners = new Set();
        this.nextCallbackId = 0;
        this.listeners = new Map();
        this.referenceMode = false;
        assert(id, 'id must be provided when constructing StorageProviders');
        assert(!type.hasUnresolvedVariable, 'Storage types must be concrete');
        this._version = 0;
        this._storageKey = key;
    }
    get versionToken() {
        return this._version == null ? null : this._version + '';
    }
    enableReferenceMode() {
        this.referenceMode = true;
    }
    // Required to implement interface UnifiedActiveStore. Each
    // StorageProviderBase instance is both a UnifiedStore and a
    // UnifiedActiveStore.
    get baseStore() {
        return this;
    }
    get storageKey() {
        return this._storageKey;
    }
    reportExceptionInHost(exception) {
        // This class lives in the host, so it's safe to just rethrow the exception here.
        throw exception;
    }
    on(callback) {
        const id = this.nextCallbackId++;
        this.listeners.set(id, callback);
        return id;
    }
    off(callbackId) {
        this.listeners.delete(callbackId);
    }
    // Equivalent to `on`, but for the old storage stack. Callers should be
    // migrated to the new API (unless they're going to be deleted).
    legacyOn(callback) {
        this.legacyListeners.add(callback);
    }
    // Equivalent to `off`, but for the old storage stack. Callers should be
    // migrated to the new API (unless they're going to be deleted).
    legacyOff(callback) {
        this.legacyListeners.delete(callback);
    }
    async activate() {
        // All StorageProviderBase instances are already active.
        return this;
    }
    // TODO: rename to _fireAsync so it's clear that callers are not re-entrant.
    /**
     * Propagate updates to change listeners.
     */
    async _fire(details) {
        const callbacks = [...this.listeners.values()];
        const legacyCallbacks = [...this.legacyListeners];
        // Yield so that event firing is not re-entrant with mutation.
        await 0;
        for (const callback of legacyCallbacks) {
            callback(details);
        }
        for (const callback of callbacks) {
            // HACK: This callback expects a ProxyMessage, which we don't actually
            // have here. Just pass null, what could go wrong!
            await callback(null);
        }
    }
    get apiChannelMappingId() {
        return this.id;
    }
    // TODO: make abstract?
    dispose() { }
    /**
     * Called by Particle Execution Host to synchronize it's proxy.
     */
    async modelForSynchronization() {
        return this.toLiteral();
    }
}
//# sourceMappingURL=storage-provider-base.js.map