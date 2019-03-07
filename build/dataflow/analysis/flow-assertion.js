/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export class FlowAssertResult {
}
/**
 * Object that captures an assertion to be checked on a recipe as part of data
 * flow analysis. Assertions are specified in a configuration using the
 * following syntax:
 *
 * <name> : <quantifier> : <object> : <predicate> : <target?>
 */
export class FlowAssertion {
    // Validates that the input conforms to the syntax above.
    // Returns the string split into the above components, or undefined if the
    // string is invalid.
    // TODO: check against allowed values
    static validate(s) {
        const ret = s.split(":");
        if ((ret.length !== 4) && (ret.length !== 5)) {
            console.log('Invalid assertion string <' + s + '>');
            console.log("Assertion string must have 4 or 5 components separated by colons");
            return undefined;
        }
        return ret;
    }
    // Returns a new FlowAssertion object, or undefined if the input string is not
    // a valid assertion.
    static instantiate(s) {
        const parts = FlowAssertion.validate(s);
        if (parts === undefined)
            return undefined;
        return new FlowAssertion(s, parts);
    }
    constructor(s, parts) {
        this.source = s;
        this.name = parts[0].trim();
        // TODO: Parse the rest
    }
    check(graph) {
        // TODO: implement
        return { result: false,
            reason: 'Assertion ' + this.name + ' failed. reason: ' + "dunno why; just 'cause" };
    }
}
//# sourceMappingURL=flow-assertion.js.map