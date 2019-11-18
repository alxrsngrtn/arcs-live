export declare function assertThrowsAsync(fn: Function, msg?: string): any;
export declare function assertThrowsAsync(fn: Function, errType: Function | RegExp, msg?: string): any;
export declare function assertThrowsAsync(fn: Function, errType: RegExp, regExp: RegExp): any;
/**
 * Capture or disable console logging.
 *
 * To capture expected console output and verify that specific phrases were logged:
 *
 *   const cc = ConCap.capture(() => testAnErrorCase('parse failure'));
 *   assert.equals(cc.result, 'this holds whatever testAnErrorCase returned');
 *   assert.match(cc.log[0], /Error parsing/);
 *
 * To simply discard all console logging:
 *
 *   const testObject = ConCap.silence(() => new NoisyTestObject(...));
 *
 * Both sync and async functions can be wrapped; in the latter case you just need to
 * await the capture/silence call.
 */
export declare class ConCap {
    result: any;
    log: any[][];
    warn: any[][];
    error: any[][];
    dir: any[][];
    private save;
    private restore;
    private constructor();
    /**
     * Captures the arguments for any calls to console.log and its friends while fn is being executed.
     * If fn is synchronous, returns a ConCap with `result` holding fn's return value.
     * If fn is asynchronous, returns a Promise with a ConCap whose `result` holds the awaited fn return.
     * In both cases, the log/warn/etc fields hold whatever `fn` wrote to the corresponding console function.
     */
    static capture(fn: () => any): any;
    /** Discards all calls to console.log and its friends. Returns the result of fn. */
    static silence<T>(fn: () => T): T;
    /** Returns a function that will invoke `fn` and capture anything logged to the console. */
    static wrapCaptured<T, Args extends any[]>(fn: (...args: Args) => any): (...args: Args) => any;
    /** Returns a function that will invoke `fn` without logging anything to the console. */
    static wrapSilent<T, Args extends any[]>(fn: (...args: Args) => any): (...args: Args) => any;
}
