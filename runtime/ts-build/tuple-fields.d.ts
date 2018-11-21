/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Type } from './type.js';
export declare class TupleFields {
    fieldList: Type[];
    constructor(fieldList: Type[]);
    static fromLiteral(literal: []): any;
    toLiteral(): any[];
    clone(): TupleFields;
    equals(other: TupleFields): boolean;
}
