/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare class AbstractDevtoolsChannel {
    debouncedMessages: any[];
    debouncing: boolean;
    messageListeners: Map<any, any>;
    constructor();
    send(message: any): void;
    listen(arcOrId: any, messageType: any, callback: any): void;
    _handleMessage(msg: any): void;
    _flush(messages: any): void;
}
