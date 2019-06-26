/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export declare enum ExpectedResponse {
    Void = 0,
    Defer = 1,
    Constant = 2
}
export declare enum SequenceOutput {
    Replace = 0,
    Register = 1
}
export interface InputResponseObject {
    response?: any;
    responseCheck?: (value: any) => void;
    type: ExpectedResponse;
}
export interface OutputResponseObject {
    response?: any;
    default?: any;
    onOutput?: (value: any) => void;
    type: ExpectedResponse;
}
export interface SequenceChange {
    variable?: any;
    input?: any[];
    inputFn?: () => any[];
    output?: {
        [index: string]: any;
    };
    id?: string;
}
/**
 * Sequence testing utility. Takes a set of events with asynchronous effect across one or more inputs,
 * generates the full set of possible orderings, and tests each one.
 *
 * NOTE: Do not use this utility in unit tests! Sequence tests are not unit tests
 * and can not replace unit testing.
 *
 * NOTE: If sequence testing turns up a failure case, you MUST REPRODUCE that failure case with
 * a unit test as part of the patch that fixes the issue. This guards against regressions more
 * cleanly than relying on the sequence tests directly.
 *
 * Recommended location: in a file called ${thing}-sequence-test.ts, alongside the
 * unit tests that are in ${thing}-test.ts.
 *
 * Basic Usage:
 * (1) construct a SequenceTest object
 * (2) specify how to construct the object under test with setTestConstructor()
 * (3) specify some inputs (places where data can be poked into the object under test) with registerInput()
 * (4) specify some outputs (places where data gets pushed out of the object under test) with registerOutput()
 * (5) provide a set of events for each input with setChanges()
 * (6) provide some end invariants with setEndInvariant()
 * (7) run sequenceTest.test()
 *
 * Note that any per-ordering state needs to be mediated by the SequenceTest object, as if you try and
 * keep state directly in your sequence test then it won't reset between orderings. You can:
 * (a) register a per-ordering variable with sequenceTest.registerVariable()
 * (b) set its value with sequenceTest.setVariable()
 * (C) query the current value with sequenceTest.getVariable()
 *
 * See storageNG/tests/store-sequence-test.ts for some fairly comprehensive examples of sequence testing
 * in practise.
 */
export declare class SequenceTest<T> {
    private prepareFunction;
    private currentID;
    private changes;
    private inputs;
    private variables;
    private sensors;
    private outputs;
    private interleavingLog;
    private currentTestObject;
    /**
     * Set a function that constructs a fresh instance of the object under test for each ordering.
     */
    setTestConstructor(prepareFunction: (() => T) | (() => Promise<T>)): void;
    /**
     * Register an input for the object under test. An input is a function that will be provided
     * with a series of data updates.
     *
     * @param name the function name to invoke in order to provide input
     * @param asyncCount the maximum number of internal awaits within the function (including
     *                   child functions)
     * @param response either {type: Void} (the function should not return a value),
     *                 or {type: Constant, response: v} (the function should return v)
     *                 or {type: Defer, checkResponse: (v) => void} (the return value of
     *                         the function will be passed to checkResponse)
     */
    registerInput(name: string, asyncCount: number, response: InputResponseObject): string;
    /**
     * Register an output for the object under test. An output is a function that will be
     * invoked as the object is fed changes. The parameters provided to the output can be
     * inspected as part of the test.
     *
     * @param name the function name to replace or register with. Note that dotted syntax can
     *             be used to register outputs on sub-objects.
     * @param response either {type: Void} (the function won't return a value),
     *                 or {type: Constant, response: v} (the function will return v),
     *                 or {type: Defer, default: v} (the function will return v initially).
     *                 The response object can also contain an onOutput: (v) => void which
     *                 can be used to check the value provided to the output function.
     * @param behavior either Register (the function of name `name` will be invoked in order
     *                                  to register an output function)
     *                 or Replace (the function of name `name` will be replaced with an output
     *                             function)
     *                 (i.e. use Replace if you want to override a function on the object under
     *                 test with one that captures the value it's invoked with and returns
     *                 something under test framework control. Use Register if the object under
     *                 test has some capability for registering a callback and you want to do
     *                 that.)
     * @param variable if behavior is Register and a valid variable id is provided here, then
     *                 the result of invoking the registration function will be stored in that
     *                 variable.
     *
     * Example: if a 'onOutput' function on the object under test is invoked by the object, and
     * you want to replace it with something that always returns void:
     * sequenceTest.registerOutput('onOutput', {type: Void}, SequenceOutput.Replace);
     *
     * If a 'registerOutputHandler function exists on the object under test, which is used to
     * register callbacks on the object, and you want to register a callback:
     * sequenceTest.registerOutput('registerOutputHandler', {type: Void}, SequenceOutput.Register, outputID);
     * Note that functions that register callbacks often return some kind of identifier that can
     * be used to refer to the callback later. In this example, that value will be stored in the
     * variable 'outputID'.
     *
     * If the object under test has a property 'foo' with an output function 'bar' that you want
     * to replace:
     * sequenceTest.registerOutput('foo.bar', {type: Void}, SequenceOutput.Replace);
     */
    registerOutput(name: string, response: OutputResponseObject, behavior: SequenceOutput, variable?: string | null): string;
    /**
     * Register a sensor for the object under test. Sensors are values that will change as the object
     * is tested, and can be accessed as part of invariant specification.
     *
     * @param name the name of the field to read.
     */
    registerSensor(name: string): string;
    /**
     * Register a variable. Variable values are reset before each ordering is tested.
     *
     * @param initialValue either the initial value of the variable, or a function that generates
     *                     that value.
     * @param initializerIsFunction True if the initial value is a function.
     */
    registerVariable(initialValue: any, initializerIsFunction?: boolean): string;
    /**
     * Retrieve the current value of a variable. Use inside closures (e.g. in an onOutput or
     * checkResponse closure) to provide access to data that varies depending on ordering.
     */
    getVariable(id: string): any;
    /**
     * Set the current value of a variable.
     */
    setVariable(id: string, value: any): void;
    /**
     * Retrieve the current return value for an output.
     */
    getOutput(id: string): any;
    /**
     * Set a sequence of changes for an input.
     *
     * @param id The input to register changes on.
     * @param changes A list of changes. Each change may have:
     *  - input: the input value to provide for this event.
     *  - inputFn: a function that generates an input value to provide for this event.
     *  - output: a dictionary of id: value that updates the current return values from
     *            output functions
     *  - variable: a dictionary of id: value that updates the current value of variables
     */
    setChanges(id: string, changes: SequenceChange[]): void;
    /**
     * set an end invariant for a given sensor.
     *
     * @param id The sensor to set an end invariant on
     * @param test a function that takes the final sensor value and asserts properties
     */
    setEndInvariant(id: string, test: (t: any) => void): void;
    testObject(): T;
    private resetVariables;
    private resetResults;
    private awaitResults;
    private objAndName;
    private setupOutputs;
    private interleavings_raw;
    private choosePoint;
    private computeInterleavingDelays;
    private interleavings;
    /**
     * Run the test!
     */
    test(): Promise<void>;
}
