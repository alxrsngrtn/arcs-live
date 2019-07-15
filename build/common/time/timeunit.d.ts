/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare class TimeUnit {
    /** a value to return for toString() */
    private readonly name;
    /** The seconds portion of the duration */
    readonly durationSec: number;
    /** The nanoseconds portion of the duration */
    readonly durationNS: number;
    /**
     * If the timeunit is approximate.  Note that leap seconds are
     * not used, so this pertains to dates only..
     */
    readonly estimated: boolean;
    private constructor();
    /**  Unit that represents the concept of a nanosecond. */
    static readonly NANOS: TimeUnit;
    /** Unit that represents the concept of a microsecond. */
    static readonly MICROS: TimeUnit;
    /** Unit that represents the concept of a millisecond. */
    static readonly MILLIS: TimeUnit;
    /** Unit that represents the concept of a second. */
    static readonly SECONDS: TimeUnit;
    /** Unit that represents the concept of a minute. */
    static readonly MINUTES: TimeUnit;
    /** Unit that represents the concept of an hour. */
    static readonly HOURS: TimeUnit;
    /** Unit that represents the concept of a week. */
    static readonly DAYS: TimeUnit;
    /** Unit that represents the concept of a week. */
    static readonly WEEKS: TimeUnit;
    /** Unit that represents the concept of a month, 30 days, approximate. */
    static readonly MONTHS: TimeUnit;
    /** Unit that represents the concept of a year, 365 days, approximate */
    static readonly YEARS: TimeUnit;
    /** An uppercase string matching the name of the constant. ex MILLIS */
    toString(): string;
}
