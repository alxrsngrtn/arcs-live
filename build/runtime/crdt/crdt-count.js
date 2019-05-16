/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTError, ChangeType } from './crdt.js';
export var CountOpTypes;
(function (CountOpTypes) {
    CountOpTypes[CountOpTypes["Increment"] = 0] = "Increment";
    CountOpTypes[CountOpTypes["MultiIncrement"] = 1] = "MultiIncrement";
})(CountOpTypes || (CountOpTypes = {}));
export class CRDTCount {
    constructor() {
        this.model = { values: new Map(), version: new Map() };
    }
    merge(other) {
        const otherChanges = [];
        const thisChanges = [];
        for (const key of other.values.keys()) {
            const thisValue = this.model.values.get(key) || 0;
            const otherValue = other.values.get(key) || 0;
            const thisVersion = this.model.version.get(key) || 0;
            const otherVersion = other.version.get(key) || 0;
            if (thisValue > otherValue) {
                if (otherVersion >= thisVersion) {
                    throw new CRDTError('Divergent versions encountered when merging CRDTCount models');
                }
                otherChanges.push({ type: CountOpTypes.MultiIncrement, value: thisValue - otherValue, actor: key,
                    version: { from: otherVersion, to: thisVersion } });
            }
            else if (otherValue > thisValue) {
                if (thisVersion >= otherVersion) {
                    throw new CRDTError('Divergent versions encountered when merging CRDTCount models');
                }
                thisChanges.push({ type: CountOpTypes.MultiIncrement, value: otherValue - thisValue, actor: key,
                    version: { from: thisVersion, to: otherVersion } });
                this.model.values.set(key, otherValue);
                this.model.version.set(key, otherVersion);
            }
        }
        for (const key of this.model.values.keys()) {
            if (other.values.has(key)) {
                continue;
            }
            if (other.version.has(key)) {
                throw new CRDTError(`CRDTCount model has version but no value for key ${key}`);
            }
            otherChanges.push({ type: CountOpTypes.MultiIncrement, value: this.model.values.get(key), actor: key,
                version: { from: 0, to: this.model.version.get(key) } });
        }
        return { modelChange: { changeType: ChangeType.Operations, operations: thisChanges }, otherChange: { changeType: ChangeType.Operations, operations: otherChanges } };
    }
    applyOperation(op) {
        let value;
        if (op.version.from !== (this.model.version.get(op.actor) || 0)) {
            return false;
        }
        if (op.version.to <= op.version.from) {
            return false;
        }
        if (op.type === CountOpTypes.MultiIncrement) {
            if (op.value < 0) {
                return false;
            }
            value = (this.model.values.get(op.actor) || 0) + op.value;
        }
        else {
            value = (this.model.values.get(op.actor) || 0) + 1;
        }
        this.model.values.set(op.actor, value);
        this.model.version.set(op.actor, op.version.to);
        return true;
    }
    getData() {
        return this.model;
    }
    getParticleView() {
        return [...this.model.values.values()].reduce((prev, current) => prev + current, 0);
    }
}
//# sourceMappingURL=crdt-count.js.map