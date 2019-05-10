/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ChangeType, CRDTError } from './crdt';
export var CollectionOpTypes;
(function (CollectionOpTypes) {
    CollectionOpTypes[CollectionOpTypes["Add"] = 0] = "Add";
    CollectionOpTypes[CollectionOpTypes["Remove"] = 1] = "Remove";
})(CollectionOpTypes || (CollectionOpTypes = {}));
export class CRDTCollection {
    constructor() {
        this.model = { values: new Map(), version: new Map() };
    }
    merge(other) {
        const newValues = this.mergeItems(this.model, other.getData());
        const newVersion = mergeVersions(this.model.version, other.getData().version);
        this.model.values = newValues;
        this.model.version = newVersion;
        // For now this is always returning a model change.
        const change = {
            changeType: ChangeType.Model,
            modelPostChange: this.model
        };
        return { modelChange: change, otherChange: change };
    }
    applyOperation(op) {
        if (op.type === CollectionOpTypes.Add) {
            return this.add(op.added, op.actor, op.clock);
        }
        if (op.type === CollectionOpTypes.Remove) {
            return this.remove(op.removed, op.actor, op.clock);
        }
        throw new CRDTError(`Op ${op} not supported`);
    }
    getData() {
        return this.model;
    }
    getParticleView() {
        return new Set([...this.model.values.keys()]);
    }
    add(value, key, version) {
        // Only accept an add if it is immediately consecutive to the clock for that actor.
        const expectedClockValue = (this.model.version.get(key) || 0) + 1;
        if (!(expectedClockValue === version.get(key) || 0)) {
            return false;
        }
        this.model.version.set(key, version.get(key));
        this.model.values.set(value, mergeVersions(version, this.model.values.get(value) || new Map()));
        return true;
    }
    remove(value, key, version) {
        if (!this.model.values.has(value)) {
            return false;
        }
        const clockValue = (version.get(key) || 0);
        // Removes do not increment the clock.
        const expectedClockValue = (this.model.version.get(key) || 0);
        if (!(expectedClockValue === clockValue)) {
            return false;
        }
        // Cannot remove an element unless version is higher for all other actors as
        // well.
        if (!dominates(version, this.model.values.get(value))) {
            return false;
        }
        this.model.version.set(key, clockValue);
        this.model.values.delete(value);
        return true;
    }
    mergeItems(data1, data2) {
        const merged = new Map();
        for (const [value, version2] of data2.values) {
            const version1 = data1.values.get(value);
            if (version1) {
                merged.set(value, mergeVersions(version1, version2));
            }
            else if (!dominates(data1.version, version2)) {
                merged.set(value, version2);
            }
        }
        for (const [value, version1] of data1.values) {
            if (!data2.values.get(value) && !dominates(data2.version, version1)) {
                merged.set(value, version1);
            }
        }
        return merged;
    }
}
function mergeVersions(version1, version2) {
    const merged = new Map(version1);
    for (const [k, v] of version2) {
        merged.set(k, Math.max(v, version1.get(k) || 0));
    }
    return merged;
}
function dominates(map1, map2) {
    for (const [k, v] of map2) {
        if ((map1.get(k) || 0) < v) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=crdt-collection.js.map