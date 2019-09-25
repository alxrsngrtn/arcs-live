/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { EntityClass } from './entity.js';
import { ParticleExecutionContext } from './particle-execution-context.js';
import { Type } from './type.js';
import { Dictionary } from './hot.js';
import { Referenceable } from './crdt/crdt-collection.js';
export declare class Schema {
    readonly names: string[];
    readonly fields: Dictionary<any>;
    description: Dictionary<string>;
    isAlias: boolean;
    constructor(names: string[], fields: Dictionary<any>, description?: any);
    toLiteral(): {
        names: string[];
        fields: {};
        description: Dictionary<string>;
    };
    static fromLiteral(data?: {
        fields: {};
        names: any[];
        description: {};
    }): Schema;
    readonly name: string;
    static typesEqual(fieldType1: any, fieldType2: any): boolean;
    static _typeString(type: any): string;
    static union(schema1: Schema, schema2: Schema): Schema | null;
    static intersect(schema1: Schema, schema2: Schema): Schema;
    equals(otherSchema: Schema): boolean;
    isMoreSpecificThan(otherSchema: Schema): boolean;
    readonly type: Type;
    entityClass(context?: ParticleExecutionContext | null): EntityClass;
    crdtConstructor<S extends Dictionary<Referenceable>, C extends Dictionary<Referenceable>>(): {
        new (): {
            model: import("./crdt/crdt-entity.js").EntityInternalModel<S, C>;
            merge(other: import("./crdt/crdt-entity.js").EntityData<S, C>): {
                modelChange: import("./crdt/crdt.js").CRDTChange<import("./crdt/crdt-entity.js").CRDTEntityTypeRecord<S, C>>;
                otherChange: import("./crdt/crdt.js").CRDTChange<import("./crdt/crdt-entity.js").CRDTEntityTypeRecord<S, C>>;
            };
            applyOperation(op: import("./crdt/crdt-entity.js").EntityOperation<S, C>): boolean;
            getData(): import("./crdt/crdt-entity.js").EntityData<S, C>;
            getParticleView(): {
                singletons: S;
                collections: { [P in keyof C]: Set<C[P]>; };
            };
        };
    };
    toInlineSchemaString(options?: {
        hideFields?: boolean;
    }): string;
    toManifestString(): string;
}
