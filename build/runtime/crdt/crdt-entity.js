/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ChangeType } from './crdt.js';
import { CollectionOpTypes } from './crdt-collection.js';
import { SingletonOpTypes } from './crdt-singleton.js';
export var EntityOpTypes;
(function (EntityOpTypes) {
    EntityOpTypes[EntityOpTypes["Set"] = 0] = "Set";
    EntityOpTypes[EntityOpTypes["Clear"] = 1] = "Clear";
    EntityOpTypes[EntityOpTypes["Add"] = 2] = "Add";
    EntityOpTypes[EntityOpTypes["Remove"] = 3] = "Remove";
})(EntityOpTypes || (EntityOpTypes = {}));
export class CRDTEntity {
    constructor(singletons, collections) {
        this.model = { singletons, collections, version: {} };
    }
    merge(other) {
        const singletonChanges = {};
        const collectionChanges = {};
        let allOps = true;
        for (const singleton of Object.keys(this.model.singletons)) {
            singletonChanges[singleton] = this.model.singletons[singleton].merge(other.singletons[singleton]);
            if (singletonChanges[singleton].modelChange.changeType === ChangeType.Model ||
                singletonChanges[singleton].otherChange.changeType === ChangeType.Model) {
                allOps = false;
            }
        }
        for (const collection of Object.keys(this.model.collections)) {
            collectionChanges[collection] = this.model.collections[collection].merge(other.collections[collection]);
            if (collectionChanges[collection].modelChange.changeType === ChangeType.Model ||
                collectionChanges[collection].otherChange.changeType === ChangeType.Model) {
                allOps = false;
            }
        }
        for (const versionKey of Object.keys(other.version)) {
            this.model.version[versionKey] = Math.max(this.model.version[versionKey] || 0, other.version[versionKey]);
        }
        if (allOps) {
            const modelOps = [];
            const otherOps = [];
            for (const singleton of Object.keys(singletonChanges)) {
                for (const operation of singletonChanges[singleton].modelChange.operations) {
                    let op;
                    if (operation.type === SingletonOpTypes.Set) {
                        op = { ...operation, type: EntityOpTypes.Set, field: singleton };
                    }
                    else {
                        op = { ...operation, type: EntityOpTypes.Clear, field: singleton };
                    }
                    modelOps.push(op);
                }
                for (const operation of singletonChanges[singleton].otherChange.operations) {
                    let op;
                    if (operation.type === SingletonOpTypes.Set) {
                        op = { ...operation, type: EntityOpTypes.Set, field: singleton };
                    }
                    else {
                        op = { ...operation, type: EntityOpTypes.Clear, field: singleton };
                    }
                    otherOps.push(op);
                }
            }
            for (const collection of Object.keys(collectionChanges)) {
                for (const operation of collectionChanges[collection].modelChange.operations) {
                    let op;
                    if (operation.type === CollectionOpTypes.Add) {
                        op = { ...operation, type: EntityOpTypes.Add, field: collection };
                    }
                    else {
                        op = { ...operation, type: EntityOpTypes.Remove, field: collection };
                    }
                    modelOps.push(op);
                }
                for (const operation of collectionChanges[collection].otherChange.operations) {
                    let op;
                    if (operation.type === CollectionOpTypes.Add) {
                        op = { ...operation, type: EntityOpTypes.Add, field: collection };
                    }
                    else {
                        op = { ...operation, type: EntityOpTypes.Remove, field: collection };
                    }
                    otherOps.push(op);
                }
            }
            return { modelChange: { changeType: ChangeType.Operations, operations: modelOps },
                otherChange: { changeType: ChangeType.Operations, operations: otherOps } };
        }
        else {
            // need to map this.model to get the data out.
            const change = { changeType: ChangeType.Model, modelPostChange: this.getData() };
            return { modelChange: change, otherChange: change };
        }
    }
    applyOperation(op) {
        if (op.type === EntityOpTypes.Set || op.type === EntityOpTypes.Clear) {
            if (!this.model.singletons[op.field]) {
                if (this.model.collections[op.field]) {
                    throw new Error(`Can't apply ${op.type === EntityOpTypes.Set ? 'Set' : 'Clear'} operation to collection field ${op.field}`);
                }
                throw new Error(`Invalid field: ${op.field} does not exist`);
            }
        }
        else {
            if (!this.model.collections[op.field]) {
                if (this.model.singletons[op.field]) {
                    throw new Error(`Can't apply ${op.type === EntityOpTypes.Add ? 'Add' : 'Remove'} operation to singleton field ${op.field}`);
                }
                throw new Error(`Invalid field: ${op.field} does not exist`);
            }
        }
        const apply = () => {
            switch (op.type) {
                case EntityOpTypes.Set:
                    return this.model.singletons[op.field].applyOperation({ ...op, type: SingletonOpTypes.Set });
                case EntityOpTypes.Clear:
                    return this.model.singletons[op.field].applyOperation({ ...op, type: SingletonOpTypes.Clear });
                case EntityOpTypes.Add:
                    return this.model.collections[op.field].applyOperation({ ...op, type: CollectionOpTypes.Add });
                case EntityOpTypes.Remove:
                    return this.model.collections[op.field].applyOperation({ ...op, type: CollectionOpTypes.Remove });
                default:
                    throw new Error(`Unexpected op ${op} for Entity CRDT`);
            }
        };
        if (apply()) {
            for (const versionKey of Object.keys(op.clock)) {
                this.model.version[versionKey] = Math.max(this.model.version[versionKey] || 0, op.clock[versionKey]);
            }
            return true;
        }
        return false;
    }
    getData() {
        const singletons = {};
        const collections = {};
        Object.keys(this.model.singletons).forEach(singleton => {
            singletons[singleton] = this.model.singletons[singleton].getData();
        });
        Object.keys(this.model.collections).forEach(collection => {
            collections[collection] = this.model.collections[collection].getData();
        });
        return { singletons, collections, version: this.model.version };
    }
    getParticleView() {
        const result = { singletons: {}, collections: {} };
        for (const key of Object.keys(this.model.singletons)) {
            result.singletons[key] = this.model.singletons[key].getParticleView();
        }
        for (const key of Object.keys(this.model.collections)) {
            result.collections[key] = this.model.collections[key].getParticleView();
        }
        return result;
    }
}
//# sourceMappingURL=crdt-entity.js.map