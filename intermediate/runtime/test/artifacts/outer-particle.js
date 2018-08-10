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
defineParticle(({ Particle }) => {
    return class P extends Particle {
        setHandles(handles) {
            return __awaiter(this, void 0, void 0, function* () {
                this.arc = yield this.constructInnerArc();
                this.outputHandle = handles.get('output');
                this.inHandle = yield this.arc.createHandle(handles.get('input').type, 'input');
                this.outHandle = yield this.arc.createHandle(this.outputHandle.type, 'output', this);
            });
        }
        onHandleSync(handle, model) {
            return __awaiter(this, void 0, void 0, function* () {
                if (handle.name === 'input' && model) {
                    this.inHandle.set(model);
                }
                if (handle.name === 'particle') {
                    yield this.arc.loadRecipe(Particle.buildManifest `
          ${model}

          recipe
            use ${this.inHandle} as handle1
            use ${this.outHandle} as handle2
            ${model.name}
              foo <- handle1
              bar -> handle2
        `);
                }
            });
        }
        onHandleUpdate(handle, update) {
            return __awaiter(this, void 0, void 0, function* () {
                if (handle.name === 'output') {
                    this.outputHandle.set(update.data);
                }
            });
        }
    };
});
