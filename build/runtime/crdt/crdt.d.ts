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
export interface CRDTModel<Ops, Data, ConsumerType> {
    merge(other: CRDTModel<Ops, Data, ConsumerType>): {
        modelChange: CRDTChange<Ops, Data>;
        otherChange: CRDTChange<Ops, Data>;
    };
    applyOperation(op: Ops): boolean;
    getData(): Data;
    getParticleView(): ConsumerType;
}
export declare enum ChangeType {
    Operations = 0,
    Model = 1
}
export declare type CRDTChange<Ops, Data> = {
    changeType: ChangeType.Operations;
    operations: Ops[];
} | {
    changeType: ChangeType.Model;
    modelPostChange: Data;
};
