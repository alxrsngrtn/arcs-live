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
class MessagePort {
    constructor(channel, id, other) {
        this._channel = channel;
        this._id = id;
        this._other = other;
        this._onmessage = undefined;
    }
    postMessage(message) {
        this._channel._post(this._other, message);
    }
    set onmessage(f) {
        this._onmessage = f;
    }
    close() {
        this.postMessage = function () { };
    }
}
class MessageEvent {
    constructor(message) {
        this.data = message;
    }
}
export class MessageChannel {
    constructor() {
        this.port1 = new MessagePort(this, 0, 1);
        this.port2 = new MessagePort(this, 1, 0);
        this._ports = [this.port1, this.port2];
    }
    _post(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            message = JSON.parse(JSON.stringify(message));
            if (this._ports[id]._onmessage) {
                try {
                    // Yield so that we deliver the message asynchronously.
                    yield 0;
                    yield this._ports[id]._onmessage(new MessageEvent(message));
                }
                catch (e) {
                    console.error('Exception in particle code\n', e);
                }
            }
        });
    }
}
