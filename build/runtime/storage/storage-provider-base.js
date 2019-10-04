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
        super();
        this.legacyListeners = new Set();
        this.nextCallbackId = 0;
        this.listeners = new Map();
        this.referenceMode = false;
        assert(id, 'id must be provided when constructing StorageProviders');
        assert(!type.hasUnresolvedVariable, 'Storage types must be concrete');
        this._type = type;
        this.name = name;
        this.version = 0;
        this.id = id;
        this.source = null;
        this._storageKey = key;
    }
    enableReferenceMode() {
        this.referenceMode = true;
    }
    get storageKey() {
        return this._storageKey;
    }
    get type() {
        return this._type;
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
    toString(handleTags) {
        const results = [];
        const handleStr = [];
        handleStr.push(`store`);
        if (this.name) {
            handleStr.push(`${this.name}`);
        }
        handleStr.push(`of ${this.type.toString()}`);
        if (this.id) {
            handleStr.push(`'${this.id}'`);
        }
        if (handleTags && handleTags.length) {
            handleStr.push(`${handleTags.join(' ')}`);
        }
        if (this.source) {
            handleStr.push(`in '${this.source}'`);
        }
        results.push(handleStr.join(' '));
        if (this.claims && this.claims.length > 0) {
            results.push(`  claim is ${this.claims.map(claim => claim.tag).join(' and is ')}`);
        }
        if (this.description) {
            results.push(`  description \`${this.description}\``);
        }
        return results.join('\n');
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