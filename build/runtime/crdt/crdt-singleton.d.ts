/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTChange, CRDTModel, CRDTTypeRecord, VersionMap } from './crdt.js';
import { Referenceable } from './crdt-collection.js';
import { Dictionary } from '../hot.js';
declare type RawSingleton<T> = T;
declare type SingletonData<T extends Referenceable> = {
    values: Dictionary<{
        value: T;
        version: VersionMap;
    }>;
    version: VersionMap;
};
export declare enum SingletonOpTypes {
    Set = 0,
    Clear = 1
}
export declare type SingletonOperationClear = {
    type: SingletonOpTypes.Clear;
    actor: string;
    clock: VersionMap;
};
export declare type SingletonOperationSet<T> = {
    type: SingletonOpTypes.Set;
    value: T;
    actor: string;
    clock: VersionMap;
};
export declare type SingletonOperation<T> = SingletonOperationClear | SingletonOperationSet<T>;
export interface CRDTSingletonTypeRecord<T extends Referenceable> extends CRDTTypeRecord {
    data: SingletonData<T>;
    operation: SingletonOperation<T>;
    consumerType: RawSingleton<T>;
}
export declare type SingletonChange<T extends Referenceable> = CRDTChange<CRDTSingletonTypeRecord<T>>;
declare type SingletonModel<T extends Referenceable> = CRDTModel<CRDTSingletonTypeRecord<T>>;
export declare class CRDTSingleton<T extends Referenceable> implements SingletonModel<T> {
    private collection;
    merge(other: SingletonData<T>): {
        modelChange: SingletonChange<T>;
        otherChange: SingletonChange<T>;
    };
    applyOperation(op: SingletonOperation<T>): boolean;
    getData(): SingletonData<T>;
    getParticleView(): RawSingleton<T> | null;
    private clear;
}
export {};
