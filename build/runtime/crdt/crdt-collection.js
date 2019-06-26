/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ChangeType, CRDTError } from './crdt.js';
export var CollectionOpTypes;
(function (CollectionOpTypes) {
    CollectionOpTypes[CollectionOpTypes["Add"] = 0] = "Add";
    CollectionOpTypes[CollectionOpTypes["Remove"] = 1] = "Remove";
})(CollectionOpTypes || (CollectionOpTypes = {}));
export class CRDTCollection {
    constructor() {
        this.model = { values: {}, version: {} };
    }
    merge(other) {
        const newValues = this.mergeItems(this.model, other);
        const newVersion = mergeVersions(this.model.version, other.version);
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
        return new Set(Object.values(this.model.values).map(entry => entry.value));
    }
    add(value, key, version) {
        // Only accept an add if it is immediately consecutive to the clock for that actor.
        const expectedClockValue = (this.model.version[key] || 0) + 1;
        if (!(expectedClockValue === version[key] || 0)) {
            return false;
        }
        this.model.version[key] = version[key];
        const previousVersion = this.model.values[value.id] ? this.model.values[value.id].version : {};
        this.model.values[value.id] = { value, version: mergeVersions(version, previousVersion) };
        return true;
    }
    remove(value, key, version) {
        if (!this.model.values[value.id]) {
            return false;
        }
        const clockValue = (version[key] || 0);
        // Removes do not increment the clock.
        const expectedClockValue = (this.model.version[key] || 0);
        if (!(expectedClockValue === clockValue)) {
            return false;
        }
        // Cannot remove an element unless version is higher for all other actors as
        // well.
        if (!dominates(version, this.model.values[value.id].version)) {
            return false;
        }
        this.model.version[key] = clockValue;
        delete this.model.values[value.id];
        return true;
    }
    mergeItems(data1, data2) {
        const merged = {};
        for (const { value, version: version2 } of Object.values(data2.values)) {
            if (this.model.values[value.id]) {
                merged[value.id] = { value, version: mergeVersions(this.model.values[value.id].version, version2) };
            }
            else if (!dominates(data1.version, version2)) {
                merged[value.id] = { value, version: version2 };
            }
        }
        for (const { value, version: version1 } of Object.values(data1.values)) {
            if (!data2.values[value.id] && !dominates(data2.version, version1)) {
                merged[value.id] = { value, version: version1 };
            }
        }
        return merged;
    }
}
function mergeVersions(version1, version2) {
    const merged = {};
    for (const [k, v] of Object.entries(version1)) {
        merged[k] = v;
    }
    for (const [k, v] of Object.entries(version2)) {
        merged[k] = Math.max(v, version1[k] || 0);
    }
    return merged;
}
function dominates(map1, map2) {
    for (const [k, v] of Object.entries(map2)) {
        if ((map1[k] || 0) < v) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=crdt-collection.js.map