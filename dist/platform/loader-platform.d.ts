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
interface UrlMap {
    [macro: string]: string | {
        root: string;
        path?: string;
        buildDir: string;
        buildOutputRegex: RegExp;
    };
}
export declare class PlatformLoaderBase extends Loader {
    readonly _urlMap: UrlMap;
    constructor(urlMap: UrlMap);
    loadResource(name: string): Promise<string>;
    resolve(path: string): string;
    mapParticleUrl(path: string): any;
    unwrapParticle(particleWrapper: any, log?: any): any;
}
export {};
