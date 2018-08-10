/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ArcStoresFetcher {
    constructor(arc, devtoolsChannel) {
        this._arc = arc;
        devtoolsChannel.listen(arc, 'fetch-stores', () => __awaiter(this, void 0, void 0, function* () {
            return devtoolsChannel.send({
                messageType: 'fetch-stores-result',
                messageBody: yield this._listStores()
            });
        }));
    }
    _listStores() {
        return __awaiter(this, void 0, void 0, function* () {
            const find = manifest => {
                let tags = [...manifest._storeTags];
                if (manifest.imports) {
                    manifest.imports.forEach(imp => tags = tags.concat(find(imp)));
                }
                return tags;
            };
            return {
                arcStores: yield this._digestStores(this._arc._storeTags),
                contextStores: yield this._digestStores(find(this._arc.context))
            };
        });
    }
    _digestStores(stores) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            for (let [store, tags] of stores) {
                let value = `(don't know how to dereference)`;
                if (store.toList) {
                    value = yield store.toList();
                }
                else if (store.get) {
                    value = yield store.get();
                }
                result.push({
                    name: store.name,
                    tags: tags ? [...tags] : [],
                    id: store.id,
                    storage: store.storageKey,
                    type: store.type,
                    description: store.description,
                    value
                });
            }
            return result;
        });
    }
}
