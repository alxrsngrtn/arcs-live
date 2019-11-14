/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DevtoolsMessage, AbstractDevtoolsChannel } from '../abstract-devtools-channel.js';
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare class DevtoolsChannelStub extends AbstractDevtoolsChannel {
    private _messages;
    constructor();
    get messages(): DevtoolsMessage[];
    send(message: DevtoolsMessage): void;
    receive(message: DevtoolsMessage): Promise<void>;
    clear(): void;
}
