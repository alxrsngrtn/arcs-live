/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from '../runtime/arc.js';
import { ArcDevtoolsChannel } from './abstract-devtools-channel.js';
/**
 * Listens to particle reload events for all particles instantiated in an arc and reloads the particles
 * when their source files change
 */
export declare class HotCodeReloader {
    private arc;
    constructor(arc: Arc, arcDevtoolsChannel: ArcDevtoolsChannel);
    _reload(filepath: string): void;
}
