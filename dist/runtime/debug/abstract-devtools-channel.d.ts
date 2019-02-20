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
export declare class AbstractDevtoolsChannel {
    debouncedMessages: any[];
    messageListeners: Map<any, any>;
    timer: any;
    constructor();
    send(message: any): void;
    listen(arcOrId: any, messageType: any, callback: any): void;
    forArc(arc: any): ArcDevtoolsChannel;
    _handleMessage(msg: any): void;
    _empty(): void;
    _flush(messages: any): void;
    ensureNoCycle(object: any, objectPath?: any[]): void;
}
export declare class ArcDevtoolsChannel {
    private channel;
    private readonly arcId;
    constructor(arc: Arc, channel: AbstractDevtoolsChannel);
    send(message: any): void;
    listen(messageType: any, callback: any): void;
    static instantiateListener(listenerClass: ArcDebugListenerDerived, arc: Arc, channel: ArcDevtoolsChannel): ArcDebugListener;
}
export declare abstract class ArcDebugListener {
    constructor(arc: Arc, channel: ArcDevtoolsChannel);
}
declare type ArcDebugListenerClass = typeof ArcDebugListener;
export interface ArcDebugListenerDerived extends ArcDebugListenerClass {
}
export {};
