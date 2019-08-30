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
    CollectionOpTypes[CollectionOpTypes["FastForward"] = 2] = "FastForward";
})(CollectionOpTypes || (CollectionOpTypes = {}));
export class CRDTCollection {
    constructor() {
        this.model = { values: {}, version: {} };
    }
    merge(other) {
        const newClock = mergeVersions(this.model.version, other.version);
        const merged = {};
        // Fast-forward op to send to other model. Elements added and removed will
        // be filled in below.
        const fastForwardOp = {
            type: CollectionOpTypes.FastForward,
            added: [],
            removed: [],
            oldClock: other.version,
            newClock,
        };
        for (const otherEntry of Object.values(other.values)) {
            const value = otherEntry.value;
            const id = value.id;
            const thisEntry = this.model.values[id];
            if (thisEntry) {
                if (sameVersions(thisEntry.version, otherEntry.version)) {
                    // Both models have the same value at the same version. Add it to the
                    // merge.
                    merged[id] = thisEntry;
                }
                else {
                    // Models have different versions for the same value. Merge the
                    // versions, and update other.
                    const mergedVersion = mergeVersions(thisEntry.version, otherEntry.version);
                    merged[id] = { value, version: mergedVersion };
                    fastForwardOp.added.push([value, mergedVersion]);
                }
            }
            else if (dominates(this.model.version, otherEntry.version)) {
                // Value was deleted by this model.
                fastForwardOp.removed.push(value);
            }
            else {
                // Value was added by other model.
                merged[id] = otherEntry;
            }
        }
        for (const [id, thisEntry] of Object.entries(this.model.values)) {
            if (!other.values[id] && !dominates(other.version, thisEntry.version)) {
                // Value was added by this model.
                merged[id] = thisEntry;
                fastForwardOp.added.push([thisEntry.value, thisEntry.version]);
            }
        }
        const operations = simplifyFastForwardOp(fastForwardOp) || [fastForwardOp];
        this.model.values = merged;
        this.model.version = newClock;
        const modelChange = {
            changeType: ChangeType.Model,
            modelPostChange: this.model
        };
        const otherChange = {
            changeType: ChangeType.Operations,
            operations,
        };
        return { modelChange, otherChange };
    }
    applyOperation(op) {
        switch (op.type) {
            case CollectionOpTypes.Add:
                return this.add(op.added, op.actor, op.clock);
            case CollectionOpTypes.Remove:
                return this.remove(op.removed, op.actor, op.clock);
            case CollectionOpTypes.FastForward:
                return this.fastForward(op);
            default:
                throw new CRDTError(`Op ${op} not supported`);
        }
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
    fastForward(op) {
        const currentClock = this.model.version;
        if (!dominates(currentClock, op.oldClock)) {
            // Can't apply fast-forward op. Current model's clock is behind oldClock.
            return false;
        }
        if (dominates(currentClock, op.newClock)) {
            // Current model already knows about everything in this fast-forward op.
            // Nothing to do, but not an error.
            return true;
        }
        for (const [value, version] of op.added) {
            const existingValue = this.model.values[value.id];
            if (existingValue) {
                existingValue.version = mergeVersions(existingValue.version, version);
            }
            else if (!dominates(currentClock, version)) {
                this.model.values[value.id] = { value, version };
            }
        }
        for (const value of op.removed) {
            const existingValue = this.model.values[value.id];
            if (existingValue && dominates(op.newClock, existingValue.version)) {
                delete this.model.values[value.id];
            }
        }
        this.model.version = mergeVersions(currentClock, op.newClock);
        return true;
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
function sameVersions(version1, version2) {
    if (Object.keys(version1).length !== Object.keys(version2).length) {
        return false;
    }
    for (const [k, v] of Object.entries(version1)) {
        if (v !== version2[k]) {
            return false;
        }
    }
    return true;
}
/** Returns true if map1 dominates map2. */
function dominates(map1, map2) {
    for (const [k, v] of Object.entries(map2)) {
        if ((map1[k] || 0) < v) {
            return false;
        }
    }
    return true;
}
/**
 * Converts a simple fast-forward operation into a sequence of regular ops.
 * Currently only supports converting add ops made by a single actor. Returns
 * null if it could not simplify the fast-forward operation.
 */
export function simplifyFastForwardOp(fastForwardOp) {
    if (fastForwardOp.removed.length > 0) {
        // Remove ops can't be replayed in order.
        return null;
    }
    if (fastForwardOp.added.length === 0) {
        // Just a version bump, no add ops to replay.
        return null;
    }
    const actor = getSingleActorIncrement(fastForwardOp.oldClock, fastForwardOp.newClock);
    if (actor === null) {
        return null;
    }
    // Sort the add ops in increasing order by the actor's version.
    const addOps = [...fastForwardOp.added].sort(([elem1, v1], [elem2, v2]) => (v1[actor] || 0) - (v2[actor] || 0));
    const expectedClock = { ...fastForwardOp.oldClock };
    for (const [elem, version] of addOps) {
        expectedClock[actor]++;
        if (!sameVersions(expectedClock, version)) {
            // The add op didn't match the expected increment-by-one pattern. Can't
            // replay it properly.
            return null;
        }
    }
    // If we reach here then all added versions are incremented by one.
    // Check the final clock.
    if (!sameVersions(expectedClock, fastForwardOp.newClock)) {
        return null;
    }
    return addOps.map(([elem, version]) => ({
        type: CollectionOpTypes.Add,
        added: elem,
        actor,
        clock: version,
    }));
}
/**
 * Given two version maps, returns the actor who incremented their version. If
 * there's more than one such actor, returns null.
 */
function getSingleActorIncrement(oldVersion, newVersion) {
    if (Object.keys(oldVersion).length !== Object.keys(newVersion).length) {
        return null;
    }
    let actor = null;
    for (const [k, v1] of Object.entries(oldVersion)) {
        const v2 = newVersion[k] || 0;
        if (v1 < v2) {
            if (actor === null) {
                actor = k;
                continue;
            }
            else {
                // Version changed for more than one actor.
                return null;
            }
        }
        else if (v1 !== v2) {
            // Some other sort of non-incremental version change happened.
            return null;
        }
    }
    return actor;
}
//# sourceMappingURL=crdt-collection.js.map