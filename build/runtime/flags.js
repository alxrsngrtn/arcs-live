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
class FlagDefaults {
}
FlagDefaults.useNewStorageStack = false;
// Enables the parsing of both pre and post slandles (unified) syntaxes.
// Preslandles syntax is to be deprecated.
FlagDefaults.parseBothSyntaxes = true;
// Use pre slandles syntax for parsing and toString by default.
// If parseBothSyntaxes is off, this will set which syntax is enabled.
FlagDefaults.defaultToPreSlandlesSyntax = false;
export class Flags extends FlagDefaults {
    /** Resets flags. To be called in test teardown methods. */
    static reset() {
        Object.assign(Flags, FlagDefaults);
    }
    // tslint:disable-next-line: no-any
    static withPreSlandlesSyntax(f) {
        return Flags.withFlags({ parseBothSyntaxes: false, defaultToPreSlandlesSyntax: true }, f);
    }
    // tslint:disable-next-line: no-any
    static withPostSlandlesSyntax(f) {
        return Flags.withFlags({ parseBothSyntaxes: false, defaultToPreSlandlesSyntax: false }, f);
    }
    // tslint:disable-next-line: no-any
    static withNewStorageStack(f) {
        return Flags.withFlags({ useNewStorageStack: true }, f);
    }
    // For testing with a different set of flags to the default.
    // tslint:disable-next-line: no-any
    static withFlags(flagsSettings, f) {
        return async (...args) => {
            Object.assign(Flags, flagsSettings);
            let res;
            try {
                res = await f(...args);
            }
            finally {
                Flags.reset();
            }
            return res;
        };
    }
}
/** Initialize flags to their default value */
Flags.reset();
//# sourceMappingURL=flags.js.map