/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Hot Reload Server is opening a WebSocket connection for Arcs Explorer to support hot code reload feature.
 * This connection allows the two to exchange information about the files that need to be watched and if there
 * are any changes to those files. This class receive information about the files that needs to be watched
 * from Arcs Explorer and watches them. Given any changes happen to any of those files it notifies Arcs Explorer
 * such that any particles corresponding to those files can be reloaded.
 */
export declare class HotReloadServer {
    private server;
    private port;
    private watchers;
    private filesToWatch;
    private connected;
    constructor(port: number);
    start(): void;
}
