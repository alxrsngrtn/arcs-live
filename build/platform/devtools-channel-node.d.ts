/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { AbstractDevtoolsChannel } from '../devtools-connector/abstract-devtools-channel.js';
import WebSocket from 'ws';
export declare class DevtoolsChannel extends AbstractDevtoolsChannel {
    server: WebSocket.Server;
    socket: WebSocket;
    constructor();
    _flush(messages: any): void;
}
