/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { LoaderBase } from './loader-base.js';
export declare class Loader extends LoaderBase {
    clone(): Loader;
    flushCaches(): void;
    loadFile(path: string): Promise<string>;
    loadBinaryFile(path: string): Promise<ArrayBuffer>;
    provisionObjectUrl(fileName: string): Promise<string>;
    requireParticle(unresolvedPath: string, blobUrl: string): Promise<any>;
    private loadWrappedParticle;
}
