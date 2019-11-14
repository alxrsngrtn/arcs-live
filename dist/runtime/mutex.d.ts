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
 * Running a Releaser releases the acquired mutex.
 */
export interface Releaser {
    (): void;
}
/**
 * A simmple Mutex to gate access to critical async code
 * sections that should not execute concurrently.
 *
 * Sample usage:
 *
 * ```
 *   class SampleClass {
 *     private readonly mutex = new Mutex();
 *
 *     async instantiate() {
 *       const release = await mutex.acquire();
 *       try {
 *         // Protected section with async execution.
 *       } finally {
 *         release();
 *       }
 *     }
 *   }
 */
export declare class Mutex {
    private next;
    private depth;
    /**
     * @return true if the mutex is already acquired.
     */
    get locked(): boolean;
    /**
     * Call acquire and await it to lock the critical section for the Mutex.
     *
     * @return A Releaser which resolves to a function which releases the Mutex.
     */
    acquire(): Promise<Releaser>;
}
