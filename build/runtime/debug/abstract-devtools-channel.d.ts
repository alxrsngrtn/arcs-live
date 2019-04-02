/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../arc.js';
export declare type DevtoolsListener = (msg: DevtoolsMessage) => void;
export declare type DevtoolsMessage = {
    arcId?: string;
    requestId?: string;
    messageType: string;
    messageBody: any;
    meta?: {
        arcId: string;
    };
};
export declare class AbstractDevtoolsChannel {
    debouncedMessages: DevtoolsMessage[];
    messageListeners: Map<string, DevtoolsListener[]>;
    timer: any;
    constructor();
    send(message: DevtoolsMessage): void;
    listen(arcOrId: Arc | string, messageType: string, listener: DevtoolsListener): void;
    forArc(arc: Arc): ArcDevtoolsChannel | AbstractDevtoolsChannel;
    _handleMessage(msg: DevtoolsMessage): void;
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
    static instantiateListener(listenerClass: ArcDebugListenerDerived, arc: Arc, channel: ArcDevtoolsChannel): ArcDebugListener;
}
export declare abstract class ArcDebugListener {
    constructor(_arc: Arc, _channel: ArcDevtoolsChannel);
}
declare type ArcDebugListenerClass = typeof ArcDebugListener;
export interface ArcDebugListenerDerived extends ArcDebugListenerClass {
}
export {};
