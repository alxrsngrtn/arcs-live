/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/// <reference types="node" />
import { Server } from 'http';
export declare const green: (text: string) => string;
export declare const red: (text: string) => string;
export declare const bold: (text: string) => string;
/**
 * Explorer Proxy is opening 2 WebSocket connections: one for the Arcs Runtime
 * and one for Arcs Explorer. It allows exchanging messages between the two, but
 * also produces connection status notifications for Arcs Explorer (waiting,
 * connected, disconnected) - so that this status can be reflected in the UI.
 */
export declare class ExplorerProxy {
    private device;
    private explorer;
    private onceDeviceAppearsResolve;
    private onceDeviceAppears;
    constructor();
    listen(server: Server, explorePort: number): void;
    get deviceConnected(): boolean;
    get explorerConnected(): boolean;
}
