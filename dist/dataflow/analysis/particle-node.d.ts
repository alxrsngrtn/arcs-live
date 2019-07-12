/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Node, Edge } from './graph-internals.js';
import { Claim, ParticleClaim } from '../../runtime/particle-claim.js';
import { Check } from '../../runtime/particle-check.js';
import { Particle } from '../../runtime/recipe/particle.js';
import { HandleConnectionSpec } from '../../runtime/particle-spec.js';
import { HandleConnection } from '../../runtime/recipe/handle-connection.js';
export declare class ParticleNode extends Node {
    readonly inEdgesByName: Map<string, ParticleInput>;
    readonly outEdgesByName: Map<string, Edge>;
    readonly nodeId: string;
    readonly name: string;
    readonly claims: ParticleClaim[];
    readonly checks: Check[];
    constructor(nodeId: string, particle: Particle);
    addInEdge(edge: ParticleInput): void;
    addOutEdge(edge: Edge): void;
    readonly inEdges: readonly ParticleInput[];
    readonly outEdges: readonly Edge[];
    /**
     * Iterates through all of the relevant in-edges leading into this particle, that flow out into the given out-edge. The out-edge may have a
     * 'derives from' claim that restricts which edges flow into it.
     */
    inEdgesFromOutEdge(outEdge: Edge): readonly ParticleInput[];
}
export declare class ParticleInput implements Edge {
    readonly edgeId: string;
    readonly start: Node;
    readonly end: ParticleNode;
    readonly label: string;
    readonly connectionName: string;
    readonly connectionSpec: HandleConnectionSpec;
    readonly check?: Check;
    readonly claims?: Claim[];
    constructor(edgeId: string, particleNode: ParticleNode, otherEnd: Node, connection: HandleConnection);
}
export declare class ParticleOutput implements Edge {
    readonly edgeId: string;
    readonly start: ParticleNode;
    readonly end: Node;
    readonly label: string;
    readonly connectionName: string;
    readonly connectionSpec: HandleConnectionSpec;
    readonly claims?: Claim[];
    constructor(edgeId: string, particleNode: ParticleNode, otherEnd: Node, connection: HandleConnection);
}
/** Creates a new node for every given particle. */
export declare function createParticleNodes(particles: Particle[]): Map<Particle, ParticleNode>;
