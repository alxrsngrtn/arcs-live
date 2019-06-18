/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ParticleCheckStatement } from './manifest-ast-nodes';
import { HandleConnectionSpec } from './particle-spec';
export declare class Check {
    readonly handle: HandleConnectionSpec;
    readonly acceptedTags: readonly string[];
    constructor(handle: HandleConnectionSpec, acceptedTags: readonly string[]);
    static fromASTNode(handle: HandleConnectionSpec, astNode: ParticleCheckStatement): Check;
    toManifestString(): string;
    toShortString(): string;
}
