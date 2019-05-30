/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { BigCollectionType, CollectionType, Type, TypeVariable } from '../type.js';
export interface TypeListInfo {
    type: Type;
    direction?: string;
    connection?: {
        direction: string;
    };
}
export declare class TypeChecker {
    static processTypeList(baseType: Type, list: TypeListInfo[]): Type | TypeVariable | CollectionType<TypeVariable> | BigCollectionType<TypeVariable>;
    static _tryMergeTypeVariable(base: Type, onto: Type): Type;
    static _tryMergeConstraints(handleType: Type, { type, direction }: TypeListInfo): boolean;
    static _writeConstraintsApply(handleType: Type, connectionType: Type): boolean;
    static _readConstraintsApply(handleType: Type, connectionType: Type): boolean;
    static compareTypes(left: TypeListInfo, right: TypeListInfo): boolean;
}
