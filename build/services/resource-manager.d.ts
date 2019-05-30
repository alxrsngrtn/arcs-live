/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare type Reference = number;
/**
 * Allows developer to reference + use resource without passing them between the `Services` bus.
 * @see src/service.ts
 */
export declare class ResourceManager {
    /** Collection of a mixture of types, associated with an identifier (references) */
    static references: any[];
    /**
     * Cache the value for later use.
     *
     * @param val A value, object, etc. to be cached for later use.
     * @return Reference a `number` associated with the cached resource.
     */
    static ref(val: unknown): Reference;
    /**
     * Get a stored value, given an identifier to it.
     *
     * @param r An identifier or reference for a value
     * @return the cached value associated with the input reference.
     */
    static deref(r: Reference): unknown;
    /**
     * Delete the cached resource associated with the reference `r`.
     *
     * @param r An identifier or reference to the value to be cleaned up.
     */
    static dispose(r: Reference): void;
}
