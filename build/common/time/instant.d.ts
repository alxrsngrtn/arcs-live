/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { TimeUnit } from './timeunit.js';
/**
 * An Instant represents a specific instance of universal time with a
 * defined precision.  It is loosely based on the same class in the
 * TC39 temporal specification, with added resolution/precision data.
 *
 * @see https://github.com/tc39/proposal-temporal/blob/master/spec/instant.html
 *
 * TODO implement comparable?
 * TODO implement other utility methods.
 * TODO make sure Instant works with time arithmetic.
 */
export declare class Instant {
    private readonly secs;
    private readonly nanos;
    private readonly resolutionValue;
    private constructor();
    /**
     * Returns the rounded number of milliseconds from the Epoch for this Instant..
     */
    readonly epochMilliseconds: number;
    /**
     * Returns the rounded number of seconds from the Epoch for this Instant.
     */
    readonly epochSeconds: number;
    /**
     * Provides the resolution of this Instant based on the inputs
     */
    readonly resolution: TimeUnit;
    /**
     * Returns a truncated Instant based on the current value and the
     * specified TimeUnit.
     *
     * Throws if the specified TimeUnit is finer than the current TimeUnit;
     */
    truncateTo(timeunit: TimeUnit): Instant;
    /**
     * Creates a new Instant from the given milliseconds.  The returned
     * value uses TimeUnit.MILLIS as the resolution.
     */
    static fromEpochMilliseconds(epochMillis: number): Instant;
    /**
     * Creates a new Instant from the given seconds.  The returned
     * value uses TimeUnit.SECONDS as the resolution.
     */
    static fromEpochSeconds(epochSeconds: number): Instant;
    private static inputLenParseData;
    private static toStringTruncation;
    /**
     * Parses a UTC date string in ISO 8601 format and generates an
     * Instant.  The TimeUnit resolution is derived from the amount of
     * information presented.  For example if `2018-01-18` is used then
     * `TimeUnit.DAYS` is the resolution.
     */
    static fromString(instantToParse: string): Instant;
    toString(): string;
}
