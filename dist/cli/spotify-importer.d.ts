#!/usr/bin/env -S node --experimental-modules --no-deprecation --loader=./tools/custom-loader.mjs -r source-map-support/register.js
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import '../runtime/storage/firebase/firebase-provider.js';
import '../runtime/storage/pouchdb-provider.js';
