/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A wrapper around a set of Bytes that roughly mimics the browser
 * Blob type as used in the File API.  This is a separate
 * implementation that works across Node and the Browser.
 *
 * here's a way to construct a Blob from a Bytes object:
 *
 * ```
 *   const blob = new Blob([bytes.content()]);
 * ```
 */
export declare class Bytes {
    private readonly blob;
    /**
     * Constructs a Bytes object from a base64 string.
     */
    constructor(base64bytes: string);
    /**
     * Returns a Promise with the Blob.
     */
    content(): Promise<Uint8Array>;
    /**
     * Returns a Promise with the bytes for the specified range of data.
     */
    range(offset: number, length: number): Promise<Uint8Array>;
    /**
     * Returns a Promise with the String for a URL that can fetch the contents
     * of the stored Blob.
     */
    url(): Promise<string>;
    toString(): string;
}
