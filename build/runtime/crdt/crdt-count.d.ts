/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { VersionMap, CRDTChange, CRDTModel, CRDTTypeRecord } from './crdt.js';
import { Dictionary } from '../hot.js';
declare type RawCount = number;
export declare type CountData = {
    values: Dictionary<number>;
    version: VersionMap;
};
declare type VersionInfo = {
    from: number;
    to: number;
};
export declare enum CountOpTypes {
    Increment = 0,
    MultiIncrement = 1
}
export declare type CountOperation = {
    type: CountOpTypes.MultiIncrement;
    value: number;
    actor: string;
    version: VersionInfo;
} | {
    type: CountOpTypes.Increment;
    actor: string;
    version: VersionInfo;
};
export interface CRDTCountTypeRecord extends CRDTTypeRecord {
    data: CountData;
    operation: CountOperation;
    consumerType: RawCount;
}
declare type CountModel = CRDTModel<CRDTCountTypeRecord>;
declare type CountChange = CRDTChange<CRDTCountTypeRecord>;
export declare class CRDTCount implements CountModel {
    private model;
    merge(other: CountData): {
        modelChange: CountChange;
        otherChange: CountChange;
    };
    applyOperation(op: CountOperation): boolean;
    private cloneMap;
    getData(): {
        values: Dictionary<number>;
        version: Dictionary<number>;
    };
    getParticleView(): number;
}
export {};
