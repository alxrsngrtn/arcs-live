/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/** Arcs runtime flags. */
declare class FlagDefaults {
    static useNewStorageStack: boolean;
    static usePreSlandlesSyntax: boolean;
}
export declare class Flags extends FlagDefaults {
    /** Resets flags. To be called in test teardown methods. */
    static reset(): void;
    static withPreSlandlesSyntax<T>(f: () => Promise<T>): () => Promise<T>;
    static withPostSlandlesSyntax<T>(f: () => Promise<T>): () => Promise<T>;
    static withFlags<T>(args: Partial<typeof FlagDefaults>, f: () => Promise<T>): () => Promise<T>;
}
export {};
