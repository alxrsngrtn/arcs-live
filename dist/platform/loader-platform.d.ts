/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Loader } from '../runtime/loader.js';
export declare class PlatformLoaderBase extends Loader {
    _urlMap: any;
    constructor(urlMap: any);
    loadResource(name: string): Promise<string>;
    _resolve(path: string): any;
    mapParticleUrl(path: string): any;
    unwrapParticle(particleWrapper: any, log?: any): any;
}
