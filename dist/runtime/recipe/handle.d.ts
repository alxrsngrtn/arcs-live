/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ParticleSpec } from '../particle-spec.js';
import { Type } from '../type.js';
import { HandleConnection } from './handle-connection.js';
import { Recipe, CloneMap, RecipeComponent, IsResolvedOptions, IsValidOptions, ToStringOptions, VariableMap } from './recipe.js';
import { Comparable } from './comparable.js';
import { Fate } from '../manifest-ast-nodes.js';
export declare class Handle implements Comparable<Handle> {
    private readonly _recipe;
    private _id;
    private _localName;
    private _tags;
    _type: Type | undefined;
    private _fate;
    private _originalFate;
    private _originalId;
    private _connections;
    private _mappedType;
    private _storageKey;
    private _pattern;
    private _immediateValue;
    constructor(recipe: Recipe);
    _copyInto(recipe: Recipe, cloneMap: CloneMap, variableMap: VariableMap): Handle;
    mergeInto(handle: Handle): void;
    _mergedFate(fates: Fate[]): "use" | "create";
    _startNormalize(): void;
    _finishNormalize(): void;
    _compareTo(other: Handle): number;
    fate: Fate;
    readonly originalFate: Fate;
    readonly originalId: string | null;
    readonly recipe: Recipe;
    tags: string[];
    readonly type: Type;
    id: string | null;
    mapToStorage(storage: {
        id: string;
        type: Type;
        originalId?: string;
        storageKey?: string;
    }): void;
    localName: string;
    readonly connections: HandleConnection[];
    storageKey: string;
    pattern: string;
    mappedType: Type;
    immediateValue: ParticleSpec;
    static effectiveType(handleType: Type, connections: {
        type: Type | null | undefined;
        direction: string | undefined | null;
    }[]): Type | import("../type.js").TypeVariable | import("../type.js").CollectionType<import("../type.js").TypeVariable> | import("../type.js").BigCollectionType<import("../type.js").TypeVariable>;
    static resolveEffectiveType(handleType: Type, connections: HandleConnection[]): Type | import("../type.js").TypeVariable | import("../type.js").CollectionType<import("../type.js").TypeVariable> | import("../type.js").BigCollectionType<import("../type.js").TypeVariable>;
    _isValid(options: IsValidOptions): boolean;
    isResolved(options?: IsResolvedOptions): boolean;
    toString(options?: ToStringOptions, nameMap?: Map<RecipeComponent, string>): string;
    findConnectionByDirection(dir: string): HandleConnection | undefined;
}
