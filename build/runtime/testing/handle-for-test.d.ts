/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { UnifiedStore } from '../storageNG/unified-store.js';
import { Arc } from '../arc.js';
import { SingletonHandle, CollectionHandle } from '../storageNG/handle.js';
import { Manifest } from '../manifest.js';
/**
 * Creates a singleton handle for a store for testing purposes. Returns an
 * appropriate OldHandle/HandleNG type depending on the storage migration flag.
 */
export declare function singletonHandleForTest(arcOrManifest: Arc | Manifest, store: UnifiedStore): Promise<SingletonHandle<any>>;
/**
 * Creates a collection handle for a store for testing purposes. Returns an
 * appropriate OldHandle/HandleNG type depending on the storage migration flag.
 */
export declare function collectionHandleForTest(arcOrManifest: Arc | Manifest, store: UnifiedStore): Promise<CollectionHandle<any>>;
