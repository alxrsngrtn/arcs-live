/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Schema2Base, ClassGenerator } from './schema2base.js';
import { SchemaNode } from './schema2graph.js';
export declare class Schema2Kotlin extends Schema2Base {
    outputName(baseName: string): string;
    fileHeader(outName: string): string;
    getClassGenerator(node: SchemaNode): ClassGenerator;
}
