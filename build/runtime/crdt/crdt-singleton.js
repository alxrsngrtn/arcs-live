/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ChangeType, isEmptyChange, createEmptyChange } from './crdt.js';
import { CollectionOpTypes, CRDTCollection } from './crdt-collection.js';
export var SingletonOpTypes;
(function (SingletonOpTypes) {
    SingletonOpTypes[SingletonOpTypes["Set"] = 0] = "Set";
    SingletonOpTypes[SingletonOpTypes["Clear"] = 1] = "Clear";
})(SingletonOpTypes || (SingletonOpTypes = {}));
export class CRDTSingleton {
    constructor() {
        this.collection = new CRDTCollection();
    }
    merge(other) {
        const { modelChange, otherChange } = this.collection.merge(other);
        // We cannot pass through the collection ops, so always return the updated model.
        let newModelChange = {
            changeType: ChangeType.Model,
            modelPostChange: this.collection.getData()
        };
        let newOtherChange = newModelChange;
        if (isEmptyChange(modelChange)) {
            newModelChange = createEmptyChange();
        }
        if (isEmptyChange(otherChange)) {
            newOtherChange = createEmptyChange();
        }
        return { modelChange: newModelChange, otherChange: newOtherChange };
    }
    applyOperation(op) {
        if (op.type === SingletonOpTypes.Clear) {
            return this.clear(op.actor, op.clock);
        }
        if (op.type === SingletonOpTypes.Set) {
            // Remove does not require an increment, but the caller of this method will have incremented
            // its version, so we hack a version with t-1 for this actor.
            const removeClock = {};
            for (const [k, v] of Object.entries(op.clock)) {
                removeClock[k] = v;
            }
            removeClock[op.actor] = op.clock[op.actor] - 1;
            if (!this.clear(op.actor, removeClock)) {
                return false;
            }
            const addOp = {
                type: CollectionOpTypes.Add,
                added: op.value,
                actor: op.actor,
                clock: op.clock,
            };
            if (!this.collection.applyOperation(addOp)) {
                return false;
            }
        }
        return true;
    }
    getData() {
        return this.collection.getData();
    }
    getParticleView() {
        // Return any value.
        return [...this.collection.getParticleView()].sort()[0] || null;
    }
    clear(actor, clock) {
        // Clear all existing values if our clock allows it.
        for (const value of Object.values(this.collection.getData().values)) {
            const removeOp = {
                type: CollectionOpTypes.Remove,
                removed: value.value,
                actor,
                clock,
            };
            // If any value fails to remove, we haven't cleared the value and we fail the whole op.
            //if (!this.collection.applyOperation(removeOp)) {
            //   return false;
            // }
            this.collection.applyOperation(removeOp);
        }
        return true;
    }
}
//# sourceMappingURL=crdt-singleton.js.map