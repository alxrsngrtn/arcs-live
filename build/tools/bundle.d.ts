/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare type BundleEntry = {
    filePath: string;
    bundlePath: string;
    entryPoint: boolean;
};
/**
 * @param entryPoints array of paths to Arc manifests to bundle, e.g. ['./feature/awesome.recipes']
 * @param bundleName path to the output bundle, e.g. './awesome.zip'
 * @param verbose whether to print bundled files to stdout
 */
export declare function bundle(entryPoints: string[], bundleName: string, verbose: boolean): Promise<unknown>;
export declare function bundleListing(...entryPoints: string[]): Promise<BundleEntry[]>;
