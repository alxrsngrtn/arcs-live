/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
export async function dynamicScript(src) {
    // @ts-ignore TS1323 dynamic import
    return await import(src);
}
//# sourceMappingURL=dynamic-script-node.js.map