/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/assert-web.js';
export class SuggestFilter {
    constructor(showAll, search) {
        this.showAll = showAll;
        this.search = search;
        assert(!(showAll && search), `Cannot set search string for 'show-all' filter`);
    }
    isEquivalent(showAll, search) {
        return (this.showAll === showAll) && (this.search === search);
    }
}
//# sourceMappingURL=suggest-filter.js.map