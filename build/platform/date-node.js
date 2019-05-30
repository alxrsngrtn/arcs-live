/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export function now() {
    const time = process.hrtime();
    return time[0] * 1000 + time[1] / 1000000;
}
//# sourceMappingURL=date-node.js.map