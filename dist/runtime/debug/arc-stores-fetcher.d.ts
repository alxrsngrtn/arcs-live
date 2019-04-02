/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../arc.js';
import { ArcDebugListener, ArcDevtoolsChannel } from './abstract-devtools-channel.js';
import { StorageStub } from '../manifest.js';
import { StorageProviderBase } from '../storage/storage-provider-base.js';
import { Type } from '../type.js';
declare type Result = {
    name: string;
    tags: string[];
    id: string;
    storage: string;
    type: Type;
    description: string;
    value: any;
};
export declare class ArcStoresFetcher extends ArcDebugListener {
    private arc;
    constructor(arc: Arc, arcDevtoolsChannel: ArcDevtoolsChannel);
    _listStores(): Promise<{
        arcStores: Result[];
        contextStores: Result[];
    }>;
    _digestStores(stores: [StorageProviderBase | StorageStub, string[] | Set<string>][]): Promise<Result[]>;
}
export {};
