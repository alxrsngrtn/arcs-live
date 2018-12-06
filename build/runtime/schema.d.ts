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
import { Entity } from './entity.js';
import { ParticleExecutionContext } from './particle-execution-context.js';
export declare class Schema {
    private readonly _model;
    description: {
        [index: string]: string;
    };
    isAlias: boolean;
    constructor(model: any);
    toLiteral(): {
        names: string[];
        fields: {};
        description: {
            [index: string]: string;
        };
    };
    static fromLiteral(data?: {
        fields: {};
        names: any[];
        description: {};
    }): Schema;
    readonly fields: {
        [index: string]: any;
    };
    readonly names: string[];
    readonly name: string;
    static typesEqual(fieldType1: any, fieldType2: any): boolean;
    static _typeString(type: any): string;
    static union(schema1: Schema, schema2: Schema): Schema;
    static intersect(schema1: Schema, schema2: Schema): Schema;
    equals(otherSchema: Schema): boolean;
    isMoreSpecificThan(otherSchema: Schema): boolean;
    readonly type: Type;
    entityClass(context?: ParticleExecutionContext): typeof Entity;
    toInlineSchemaString(options: any): string;
    toManifestString(): string;
}
