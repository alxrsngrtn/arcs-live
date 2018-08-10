/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Loader } from './loader.js';
export class BrowserLoader extends Loader {
    constructor(base) {
        super();
        // TODO: Update all callers to pass a valid base URL to avoid the use of
        //       location here. `new URL(base)` should be valid.
        this._base = new URL(base || '', self.location).href;
    }
    _resolve(path) {
        return new URL(path, this._base).href;
    }
    loadResource(name) {
        return this._loadURL(this._resolve(name));
    }
    requireParticle(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            fileName = this._resolve(fileName);
            let result = [];
            self.defineParticle = function (particleWrapper) {
                result.push(particleWrapper);
            };
            importScripts(fileName);
            delete self.defineParticle;
            return this.unwrapParticle(result[0]);
        });
    }
}
