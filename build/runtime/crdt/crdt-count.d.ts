/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { VersionMap, CRDTChange, CRDTModel } from "./crdt.js";
declare type RawCount = number;
declare type CountData = {
    values: Map<string, number>;
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
declare type CountChange = CRDTChange<CountOperation, CountData>;
declare type CountModel = CRDTModel<CountOperation, CountData, RawCount>;
export declare class CRDTCount implements CountModel {
    private model;
    merge(other: CountModel): {
        modelChange: CountChange;
        otherChange: CountChange;
    };
    applyOperation(op: CountOperation): boolean;
    getData(): CountData;
    getParticleView(): RawCount;
}
export {};
