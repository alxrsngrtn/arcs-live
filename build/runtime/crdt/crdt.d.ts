/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare type VersionMap = Map<string, number>;
export declare class CRDTError extends Error {
}
export interface CRDTOperation {
}
export interface CRDTData {
    version: VersionMap;
}
export interface CRDTConsumerType {
}
export interface CRDTTypeRecord {
    data: CRDTData;
    operation: CRDTOperation;
    consumerType: CRDTConsumerType;
}
export interface CRDTModel<T extends CRDTTypeRecord> {
    merge(other: T['data']): {
        modelChange: CRDTChange<T>;
        otherChange: CRDTChange<T>;
    };
    applyOperation(op: T['operation']): boolean;
    getData(): T['data'];
    getParticleView(): T['consumerType'];
}
export declare enum ChangeType {
    Operations = 0,
    Model = 1
}
export declare type CRDTChange<T extends CRDTTypeRecord> = {
    changeType: ChangeType.Operations;
    operations: T['operation'][];
} | {
    changeType: ChangeType.Model;
    modelPostChange: T['data'];
};
