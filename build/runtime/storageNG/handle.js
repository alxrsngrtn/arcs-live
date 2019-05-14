/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CollectionOpTypes } from '../crdt/crdt-collection';
/**
 * Base class for Handles.
 */
export class Handle {
    constructor(key, storageProxy) {
        this.key = key;
        this.storageProxy = storageProxy;
        this.clock = this.storageProxy.registerHandle(this);
    }
}
/**
 * A handle on a set of Entity data. Note that, as a set, a Collection can only
 * contain a single version of an Entity for each given ID. Further, no order is
 * implied by the set.
 */
export class CollectionHandle extends Handle {
    add(entity) {
        this.clock.set(this.key, (this.clock.get(this.key) || 0) + 1);
        const op = {
            type: CollectionOpTypes.Add,
            added: entity,
            actor: this.key,
            clock: this.clock,
        };
        return this.storageProxy.applyOp(op);
    }
    addMultiple(entities) {
        for (const e of entities) {
            if (!this.add(e)) {
                return false;
            }
        }
        return true;
    }
    remove(entity) {
        const op = {
            type: CollectionOpTypes.Remove,
            removed: entity,
            actor: this.key,
            clock: this.clock,
        };
        return this.storageProxy.applyOp(op);
    }
    clear() {
        for (const value of this.toList()) {
            const removeOp = {
                type: CollectionOpTypes.Remove,
                removed: value,
                actor: this.key,
                clock: this.clock,
            };
            if (!this.storageProxy.applyOp(removeOp)) {
                return false;
            }
        }
        return true;
    }
    toList() {
        return [...this.storageProxy.getParticleView()];
    }
}
//# sourceMappingURL=handle.js.map