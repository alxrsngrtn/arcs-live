/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Schema } from './schema.js';
import { EntityInterface } from './entity.js';
import protobufjs from 'protobufjs';
export declare class EntityProtoConverter {
    readonly schema: Schema;
    readonly message: protobufjs.Type;
    constructor(schema: Schema);
    encode(entity: EntityInterface): Uint8Array;
    decode(buffer: Uint8Array): EntityInterface;
}
