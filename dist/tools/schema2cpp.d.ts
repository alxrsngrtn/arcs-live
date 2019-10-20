/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Aliases, Schema2Base } from './schema2base.js';
import { Schema } from '../runtime/schema.js';
export declare class Schema2Cpp extends Schema2Base {
    outputName(baseName: string): string;
    fileHeader(outName: string): string;
    fileFooter(): string;
    entityClass(name: string, schema: Schema): string;
    addAliases(aliases: Aliases): string;
}
