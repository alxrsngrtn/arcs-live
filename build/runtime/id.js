/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Random } from './random.js';
/**
 * Generates new IDs which are rooted in the current session. Only one IdGenerator should be instantiated for each running Arc, and all of the
 * IDs created should be created using that same IdGenerator instance.
 */
export class IdGenerator {
    /** Use the newSession factory method instead. */
    constructor(currentSessionId) {
        this._nextComponentId = 0;
        this._currentSessionId = currentSessionId;
    }
    /** Generates a new random session ID to use when creating new IDs. */
    static newSession() {
        const sessionId = Math.floor(Random.next() * Math.pow(2, 50)) + '';
        return new IdGenerator(sessionId);
    }
    /**
     * Intended only for testing the IdGenerator class itself. Lets you specify the session ID manually. Prefer using the real
     * IdGenerator.newSession() method when testing other classes.
     */
    static createWithSessionIdForTesting(sessionId) {
        return new IdGenerator(sessionId);
    }
    /**
     * Creates a new ID, as a child of the given parentId. The given subcomponent will be appended to the component hierarchy of the given ID, but
     * the generator's random session ID will be used as the ID's root.
     */
    createChildId(parentId, subcomponent = '') {
        // Append (and increment) a counter to the subcomponent, to ensure that it is unique.
        subcomponent += this._nextComponentId++;
        return new Id(this._currentSessionId, [...parentId.idTree, subcomponent]);
    }
    get currentSessionIdForTesting() {
        return this._currentSessionId;
    }
}
/**
 * An immutable object consisting of two components: a root, and an idTree. The root is the session ID from the particular session in which the
 * ID was constructed (see the IdGenerator class). The idTree is a list of subcomponents, forming a hierarchy of IDs (child IDs are created by
 * appending subcomponents to their parent ID's idTree).
 */
export class Id {
    constructor(root, idTree = []) {
        /** The components of the idTree. */
        this.idTree = [];
        this.root = root;
        this.idTree = idTree;
    }
    static fromString(str) {
        const bits = str.split(':');
        if (bits[0].startsWith('!')) {
            const root = bits[0].slice(1);
            const idTree = bits.slice(1).filter(component => component.length > 0);
            return new Id(root, idTree);
        }
        else {
            return new Id('', bits);
        }
    }
    /** Returns the full ID string. */
    toString() {
        return `!${this.root}:${this.idTree.join(':')}`;
    }
    /** Returns the idTree as as string (without the root). */
    idTreeAsString() {
        return this.idTree.join(':');
    }
    equal(id) {
        if (id.root !== this.root || id.idTree.length !== this.idTree.length) {
            return false;
        }
        for (let i = 0; i < id.idTree.length; i++) {
            if (id.idTree[i] !== this.idTree[i]) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=id.js.map