/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { PlatformLoaderBase } from './loader-platform.js';
import { ParticleSpec } from '../runtime/particle-spec.js';
export declare class PlatformLoader extends PlatformLoaderBase {
    flushCaches(): void;
    loadResource(url: string): Promise<string>;
    provisionObjectUrl(fileName: string): Promise<string>;
    loadParticleClass(spec: ParticleSpec): Promise<any>;
    requireParticle(unresolvedPath: string, blobUrl?: any): Promise<any>;
    loadWrappedParticle(url: string, path?: string): any;
    provisionLogger(fileName: string): Function;
}
