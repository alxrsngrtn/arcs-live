/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { AbstractDevtoolsChannel } from '../abstract-devtools-channel.js';
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export class DevtoolsChannelStub extends AbstractDevtoolsChannel {
    constructor() {
        super();
        this._messages = [];
    }
    get messages() {
        return this._messages;
    }
    send(message) {
        this.ensureNoCycle(message);
        this._messages.push(message);
    }
    async receive(message) {
        await this._handleMessage(message);
    }
    clear() {
        this._messages.length = 0;
    }
}
//# sourceMappingURL=devtools-channel-stub.js.map