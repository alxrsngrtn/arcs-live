// Copyright (c) 2018 Google Inc. All rights reserved.
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
// Represents a Blob of binary data. Intended for use in storing things such as
// media data.
export class Bytes {
    constructor(blob) {
        this._blob = blob;
    }
    // Returns a Promise with the Blob.
    content() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => resolve(this._blob));
        });
    }
    // Returns a Promise with the Blob for the specified range of data.
    range(offset, length) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO(wkorman): Slice out the right portion.
            throw 'NotImplemented';
        });
    }
    // Returns a Promise with the String for a URL that can fetch the contents
    // of the stored Blob.
    url() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO(wkorman): Consider returning as a data url ex.
            // 'data:image/png;base64,...' for now.'
            throw 'NotImplemented';
        });
    }
    toString() {
        return `Bytes{blob=${this._blob}}`;
    }
}
