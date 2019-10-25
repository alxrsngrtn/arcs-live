/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Schema } from '../runtime/schema.js';
import { ParticleSpec } from '../runtime/particle-spec.js';
import { Dictionary } from '../runtime/hot.js';
export declare class SchemaNode {
    schema: Schema;
    name: string;
    aliases: string[];
    descendants: Set<SchemaNode>;
    parents: SchemaNode[];
    children: SchemaNode[];
    sharesParent: boolean;
    extras: string[];
    refs: Dictionary<{
        name: string;
        node: SchemaNode;
    }>;
    constructor(schema: Schema, name: string);
}
export declare class SchemaGraph {
    readonly particleSpec: ParticleSpec;
    nodes: SchemaNode[];
    startNodes: SchemaNode[];
    internalClassIndex: number;
    constructor(particleSpec: ParticleSpec);
    private createNodes;
    private process;
    private typeName;
    private upperFirst;
    walk(): IterableIterator<SchemaNode>;
}
