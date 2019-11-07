/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../runtime/arc.js';
import { AsyncConsumer } from '../runtime/hot.js';
export declare type DevtoolsListener = AsyncConsumer<DevtoolsMessage>;
export declare type DevtoolsMessage = {
    arcId?: string;
    requestId?: string;
    messageType: string;
    messageBody?: any;
    meta?: {
        arcId: string;
    };
};
export declare class AbstractDevtoolsChannel {
    private debouncedMessages;
    private messageListeners;
    private timer;
    constructor();
    send(message: DevtoolsMessage): void;
    listen(arcOrId: Arc | string, messageType: string, listener: DevtoolsListener): void;
    forArc(arc: Arc): ArcDevtoolsChannel | AbstractDevtoolsChannel;
    _handleMessage(msg: DevtoolsMessage): Promise<void>;
    _empty(): void;
    _flush(_messages: DevtoolsMessage[]): void;
    ensureNoCycle(object: any, objectPath?: {}[]): void;
}
export declare class ArcDevtoolsChannel {
    private channel;
    private readonly arcId;
    constructor(arc: Arc, channel: AbstractDevtoolsChannel);
    send(message: DevtoolsMessage): void;
    listen(messageType: string, callback: DevtoolsListener): void;
}
