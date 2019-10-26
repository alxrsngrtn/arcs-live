/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Allows developer to reference + use resource without passing them between the `Services` bus.
 * @see src/service.ts
 */
export class ReferenceManager {
    /**
     * Cache the value for later use.
     *
     * @param val A value, object, etc. to be cached for later use.
     * @return Reference a `number` associated with the cached resource.
     */
    static ref(val) {
        return this.references.push(val) - 1;
    }
    /**
     * Get a stored value, given an identifier to it.
     *
     * @param r An identifier or reference for a value
     * @return the cached value associated with the input reference.
     */
    static deref(r) {
        return this.references[r];
    }
    /**
     * Delete the cached resource associated with the reference `r`.
     *
     * @param r An identifier or reference to the value to be cleaned up.
     */
    static dispose(r) {
        const obj = this.references[r];
        if (obj['dispose']) {
            obj.dispose();
        }
        delete this.references[r];
    }
}
/** Collection of a mixture of types, associated with an identifier (references) */
// initialized with a sentinel value so we have 1-based indexing
// tslint:disable-next-line:no-any
ReferenceManager.references = [null];
//# sourceMappingURL=reference-manager.js.map