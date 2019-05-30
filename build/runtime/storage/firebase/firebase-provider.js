/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { StorageProviderFactory } from '../storage-provider-factory.js';
import { FirebaseStorage } from './firebase-storage.js';
StorageProviderFactory.register('firebase', { storage: FirebaseStorage, isPersistent: true });
//# sourceMappingURL=firebase-provider.js.map