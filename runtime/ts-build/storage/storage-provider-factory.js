// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { InMemoryStorage } from './in-memory-storage';
import { FirebaseStorage } from './firebase-storage';
export class StorageProviderFactory {
    constructor(arcId) {
        this._arcId = arcId;
        this._storageInstances = { 'in-memory': new InMemoryStorage(arcId), 'firebase': new FirebaseStorage(arcId) };
    }
    _storageForKey(key) {
        let protocol = key.split(':')[0];
        return this._storageInstances[protocol];
    }
    share(id, type, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._storageForKey(key).share(id, type, key);
        });
    }
    construct(id, type, keyFragment) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._storageForKey(keyFragment).construct(id, type, keyFragment);
        });
    }
    connect(id, type, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._storageForKey(key).connect(id, type, key);
        });
    }
    parseStringAsKey(string) {
        return this._storageForKey(string).parseStringAsKey(string);
    }
    newKey(id, associatedKeyFragment) {
    }
    // For testing
    shutdown() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(Object.keys(this._storageInstances).map(k => this._storageInstances[k].shutdown()));
        });
    }
}
