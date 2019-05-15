/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { CRDTChange, CRDTModel, CRDTTypeRecord, VersionMap } from './crdt';
declare type RawSingleton<T> = T;
declare type SingletonData<T> = {
    values: Map<T, VersionMap>;
    version: VersionMap;
};
export declare enum SingletonOpTypes {
    Set = 0,
    Clear = 1
}
export declare type SingletonOperation<T> = {
    type: SingletonOpTypes.Clear;
    actor: string;
    clock: VersionMap;
} | {
    type: SingletonOpTypes.Set;
    value: T;
    actor: string;
    clock: VersionMap;
};
interface CRDTSingletonTypeRecord<T> extends CRDTTypeRecord {
    data: SingletonData<T>;
    operation: SingletonOperation<T>;
    consumerType: RawSingleton<T>;
}
declare type SingletonChange<T> = CRDTChange<CRDTSingletonTypeRecord<T>>;
declare type SingletonModel<T> = CRDTModel<CRDTSingletonTypeRecord<T>>;
export declare class CRDTSingleton<T> implements SingletonModel<T> {
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
