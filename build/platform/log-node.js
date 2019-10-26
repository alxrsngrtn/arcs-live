/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// TODO(wkorman): Consider outputting preamble in the specified color via ANSI escape codes.
export const logFactory = (preamble, color, log = 'log') => {
    return console[log].bind(console, `(${preamble})`);
};
//# sourceMappingURL=log-node.js.map