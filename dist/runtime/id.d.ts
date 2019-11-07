/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Generates new IDs which are rooted in the current session. Only one IdGenerator should be instantiated for each running Arc, and all of the
 * IDs created should be created using that same IdGenerator instance.
 */
export declare class IdGenerator {
    private readonly _currentSessionId;
    private _nextComponentId;
    /** Use the newSession factory method instead. */
    private constructor();
    /** Generates a new random session ID to use when creating new IDs. */
    static newSession(): IdGenerator;
    /**
     * Intended only for testing the IdGenerator class itself. Lets you specify the session ID manually. Prefer using the real
     * IdGenerator.newSession() method when testing other classes.
     */
    static createWithSessionIdForTesting(sessionId: string): IdGenerator;
    newArcId(name: string): ArcId;
    /**
     * Creates a new ID, as a child of the given parentId. The given subcomponent will be appended to the component hierarchy of the given ID, but
     * the generator's random session ID will be used as the ID's root.
     */
    newChildId(parentId: Id, subcomponent?: string): Id;
    get currentSessionIdForTesting(): string;
}
/**
 * An immutable object consisting of two components: a root, and an idTree. The root is the session ID from the particular session in which the
 * ID was constructed (see the IdGenerator class). The idTree is a list of subcomponents, forming a hierarchy of IDs (child IDs are created by
 * appending subcomponents to their parent ID's idTree).
 */
export declare class Id {
    /** The Session ID of the session during which the ID got created. See IdGenerator class. */
    readonly root: string;
    /** The components of the idTree. */
    readonly idTree: string[];
    /** Protected constructor. Use IdGenerator to create new IDs instead. */
    protected constructor(root: string, idTree?: string[]);
    /** Creates a new ID. Use IdGenerator to create new IDs instead. */
    static _newIdInternal(root: string, idTree?: string[]): Id;
    /** Parses a string representation of an ID (see toString). */
    static fromString(str: string): Id;
    /** Returns the full ID string. */
    toString(): string;
    /** Returns the idTree as as string (without the root). */
    idTreeAsString(): string;
    equal(id: Id): boolean;
}
export declare class ArcId extends Id {
    /** Creates a new Arc ID. Use IdGenerator to create new IDs instead. */
    static _newArcIdInternal(root: string, name: string): ArcId;
    /** Creates a new Arc ID with the given name. For convenience in unit testing only; otherwise use IdGenerator to create new IDs instead. */
    static newForTest(id: string): ArcId;
}
