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
FlagDefaults.usePreSlandlesSyntax = true;
export class Flags extends FlagDefaults {
    /** Resets flags. To be called in test teardown methods. */
    static reset() {
        Object.assign(Flags, FlagDefaults);
    }
    static withPreSlandlesSyntax(f) {
        return Flags.withFlags({ usePreSlandlesSyntax: true }, f);
    }
    static withPostSlandlesSyntax(f) {
        return Flags.withFlags({ usePreSlandlesSyntax: false }, f);
    }
    static withNewStorageStack(f) {
        return Flags.withFlags({ useNewStorageStack: true }, f);
    }
    // For testing with a different set of flags to the default.
    static withFlags(args, f) {
        return async () => {
            Object.assign(Flags, args);
            let res;
            try {
                res = await f();
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