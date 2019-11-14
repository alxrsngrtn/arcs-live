/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DevtoolsChannel } from '../platform/devtools-channel-web.js';
import { DevtoolsChannelStub } from './testing/devtools-channel-stub.js';
export declare class DevtoolsConnection {
    static get isConnected(): boolean;
    static get onceConnected(): Promise<DevtoolsChannel>;
    static get(): any;
    static ensure(): void;
}
export declare class DevtoolsForTests {
    static get channel(): DevtoolsChannelStub;
    static ensureStub(): void;
    static reset(): void;
}
