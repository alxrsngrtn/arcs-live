/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { StorageProviderBase } from '../../runtime/storage/storage-provider-base.js';
import { Strategy } from '../strategizer.js';
import { StorageStub } from '../../runtime/manifest.js';
export declare class AssignHandles extends Strategy {
    generate(inputParams: any): any;
    getMappableStores(fate: any, type: any, tags: string[], counts: any): Map<StorageProviderBase | StorageStub, string>;
}
