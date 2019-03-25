/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DevtoolsChannel } from '../../platform/devtools-channel-web.js';
import { Arc } from '../arc.js';
declare type StackFrame = {
    method: string;
    location?: string;
    target?: string;
    targetClass?: string;
};
export declare class OuterPortAttachment {
    private arcDevtoolsChannel;
    constructor(arc: Arc, devtoolsChannel: DevtoolsChannel);
    handlePecMessage(name: string, pecMsgBody: {}, pecMsgCount: number, stackString: string): void;
    _extractStackFrames(stackString: string): StackFrame[];
}
export {};
