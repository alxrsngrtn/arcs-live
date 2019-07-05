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
        if (allOps) {
            const modelOps = [];
            const otherOps = [];
            for (const singleton of Object.keys(singletonChanges)) {
                for (const operation of singletonChanges[singleton].modelChange.operations) {
                    let op;
                    if (operation.type === SingletonOpTypes.Set) {
                        op = { type: EntityOpTypes.Set, value: operation.value, actor: operation.actor, clock: operation.clock, field: singleton };
                    }
                    else {
                        op = { type: EntityOpTypes.Clear, actor: operation.actor, clock: operation.clock, field: singleton };
                    }
                    modelOps.push(op);
                }
                for (const operation of singletonChanges[singleton].otherChange.operations) {
                    let op;
                    if (operation.type === SingletonOpTypes.Set) {
                        op = { type: EntityOpTypes.Set, value: operation.value, actor: operation.actor, clock: operation.clock, field: singleton };
                    }
                    else {
                        op = { type: EntityOpTypes.Clear, actor: operation.actor, clock: operation.clock, field: singleton };
                    }
                    otherOps.push(op);
                }
            }
            for (const collection of Object.keys(collectionChanges)) {
                for (const operation of collectionChanges[collection].modelChange.operations) {
                    let op;
                    if (operation.type === CollectionOpTypes.Add) {
                        op = { type: EntityOpTypes.Add, value: operation.added, actor: operation.actor, clock: operation.clock, field: collection };
                    }
                    else {
                        op = { type: EntityOpTypes.Remove, value: operation.removed, actor: operation.actor, clock: operation.clock, field: collection };
                    }
                    modelOps.push(op);
                }
                for (const operation of collectionChanges[collection].otherChange.operations) {
                    let op;
                    if (operation.type === CollectionOpTypes.Add) {
                        op = { type: EntityOpTypes.Add, value: operation.added, actor: operation.actor, clock: operation.clock, field: collection };
                    }
                    else {
                        op = { type: EntityOpTypes.Remove, value: operation.removed, actor: operation.actor, clock: operation.clock, field: collection };
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
        switch (op.type) {
            case EntityOpTypes.Set:
                return this.model.singletons[op.field].applyOperation({ type: SingletonOpTypes.Set, actor: op.actor, value: op.value, clock: op.clock });
            case EntityOpTypes.Clear:
                return this.model.singletons[op.field].applyOperation({ type: SingletonOpTypes.Clear, actor: op.actor, clock: op.clock });
            case EntityOpTypes.Add:
                return this.model.collections[op.field].applyOperation({ type: CollectionOpTypes.Add, actor: op.actor, clock: op.clock, added: op.value });
            case EntityOpTypes.Remove:
                return this.model.collections[op.field].applyOperation({ type: CollectionOpTypes.Remove, actor: op.actor, clock: op.clock, removed: op.value });
            default:
                throw new Error(`Unexpected op ${op} for Entity CRDT`);
        }
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