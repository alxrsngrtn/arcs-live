/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Message, StreamMessageReader as VSCodeStreamMessageReader, StreamMessageWriter as VSCodeStreamMessageWriter } from 'vscode-jsonrpc';
import { Logger, AmlServiceOptions, AmlServiceContext } from './util.js';
export declare class AmlService {
    reader: VSCodeStreamMessageReader;
    writer: VSCodeStreamMessageWriter;
    context: AmlServiceContext;
    initialized: boolean;
    streaming: boolean;
    constructor(reader: VSCodeStreamMessageReader, writer: VSCodeStreamMessageWriter, options: AmlServiceOptions, logger: Logger);
    update(message: Message): Promise<Message | undefined>;
}
