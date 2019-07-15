/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export class TimeUnit {
    constructor(
    /** a value to return for toString() */
    name, 
    /** The seconds portion of the duration */
    durationSec, 
    /** The nanoseconds portion of the duration */
    durationNS, 
    /**
     * If the timeunit is approximate.  Note that leap seconds are
     * not used, so this pertains to dates only..
     */
    estimated = false) {
        this.name = name;
        this.durationSec = durationSec;
        this.durationNS = durationNS;
        this.estimated = estimated;
    }
    /** An uppercase string matching the name of the constant. ex MILLIS */
    toString() {
        return this.name;
    }
}
/**  Unit that represents the concept of a nanosecond. */
TimeUnit.NANOS = new TimeUnit('NANOS', 0, 1);
/** Unit that represents the concept of a microsecond. */
TimeUnit.MICROS = new TimeUnit('MICROS', 0, 1000);
/** Unit that represents the concept of a millisecond. */
TimeUnit.MILLIS = new TimeUnit('MILLIS', 0, 1000000);
/** Unit that represents the concept of a second. */
TimeUnit.SECONDS = new TimeUnit('SECONDS', 1, 0);
/** Unit that represents the concept of a minute. */
TimeUnit.MINUTES = new TimeUnit('MINUTES', 60, 0);
/** Unit that represents the concept of an hour. */
TimeUnit.HOURS = new TimeUnit('HOURS', 3600, 0);
/** Unit that represents the concept of a week. */
TimeUnit.DAYS = new TimeUnit('DAYS', 86400, 0);
/** Unit that represents the concept of a week. */
TimeUnit.WEEKS = new TimeUnit('WEEKS', 604800, 0);
/** Unit that represents the concept of a month, 30 days, approximate. */
TimeUnit.MONTHS = new TimeUnit('MONTHS', 2592000, 0, true);
/** Unit that represents the concept of a year, 365 days, approximate */
TimeUnit.YEARS = new TimeUnit('YEARS', 31536000, 0, true);
//# sourceMappingURL=timeunit.js.map