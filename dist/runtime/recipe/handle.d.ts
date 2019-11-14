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
import { Type, TypeVariable } from '../type.js';
import { Slot } from './slot.js';
import { HandleConnection } from './handle-connection.js';
import { Recipe, CloneMap, RecipeComponent, IsResolvedOptions, IsValidOptions, ToStringOptions, VariableMap } from './recipe.js';
import { Comparable } from './comparable.js';
import { Fate, Direction } from '../manifest-ast-nodes.js';
import { ClaimIsTag, Claim } from '../particle-claim.js';
import { StorageKey } from '../storageNG/storage-key.js';
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
    claims: Claim[] | undefined;
    constructor(recipe: Recipe);
    toSlot(): Slot;
    _copyInto(recipe: Recipe, cloneMap: CloneMap, variableMap: VariableMap): Handle;
    mergeInto(handle: Handle): void;
    _mergedFate(fates: Fate[]): "use" | "create";
    _startNormalize(): void;
    _finishNormalize(): void;
    _compareTo(other: Handle): number;
    get fate(): Fate;
    set fate(fate: Fate);
    get originalFate(): Fate;
    get originalId(): string | null;
    get recipe(): Recipe;
    get tags(): string[];
    set tags(tags: string[]);
    get type(): Type;
    get id(): string | null;
    set id(id: string | null);
    mapToStorage(storage: {
        id: string;
        type: Type;
        originalId?: string;
        storageKey?: string | StorageKey;
        claims?: ClaimIsTag[];
    }): void;
    get localName(): string;
    set localName(name: string);
    get connections(): HandleConnection[];
    get storageKey(): string | StorageKey;
    set storageKey(key: string | StorageKey);
    get pattern(): string;
    set pattern(pattern: string);
    get mappedType(): Type;
    set mappedType(mappedType: Type);
    get immediateValue(): ParticleSpec;
    set immediateValue(value: ParticleSpec);
    static effectiveType(handleType: Type, connections: {
        type?: Type;
        direction?: Direction;
    }[]): Type | TypeVariable | import("../type.js").CollectionType<TypeVariable> | import("../type.js").BigCollectionType<TypeVariable>;
    static resolveEffectiveType(handleType: Type, connections: HandleConnection[]): Type;
    _isValid(options: IsValidOptions): boolean;
    isResolved(options?: IsResolvedOptions): boolean;
    toString(options?: ToStringOptions, nameMap?: Map<RecipeComponent, string>): string;
    findConnectionByDirection(dir: string): HandleConnection | undefined;
}
