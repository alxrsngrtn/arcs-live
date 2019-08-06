/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Node, Edge, FlowModifier, FlowCheck } from './graph-internals.js';
import { Particle } from '../../runtime/recipe/particle.js';
import { HandleConnectionSpec } from '../../runtime/particle-spec.js';
import { HandleConnection } from '../../runtime/recipe/handle-connection.js';
import { Type } from '../../runtime/type.js';
export declare class ParticleNode extends Node {
    readonly inEdgesByName: Map<string, ParticleInput>;
    readonly outEdgesByName: Map<string, Edge>;
    readonly nodeId: string;
    readonly name: string;
    constructor(nodeId: string, particle: Particle);
    addInEdge(edge: ParticleInput): void;
    addOutEdge(edge: Edge): void;
    readonly inEdges: readonly ParticleInput[];
    readonly outEdges: readonly Edge[];
    /**
     * Iterates through all of the relevant in-edges leading into this particle, that flow out into the given out-edge. The out-edge may have a
     * 'derives from' claim that restricts which edges flow into it.
     */
    inEdgesFromOutEdge(outEdge: ParticleOutput): readonly Edge[];
}
export declare class ParticleInput implements Edge {
    readonly edgeId: string;
    readonly start: Node;
    readonly end: ParticleNode;
    readonly label: string;
    readonly connectionName: string;
    readonly connectionSpec: HandleConnectionSpec;
    readonly modifier: FlowModifier;
    check?: FlowCheck;
    constructor(edgeId: string, particleNode: ParticleNode, otherEnd: Node, connection: HandleConnection);
    readonly type: Type;
}
export declare class ParticleOutput implements Edge {
    readonly edgeId: string;
    readonly start: ParticleNode;
    readonly end: Node;
    readonly label: string;
    readonly connectionName: string;
    readonly connectionSpec: HandleConnectionSpec;
    readonly modifier: FlowModifier;
    readonly derivesFrom: Edge[];
    constructor(edgeId: string, particleNode: ParticleNode, otherEnd: Node, connection: HandleConnection);
    readonly type: Type;
    computeDerivedFromEdges(): void;
    /**
     * Returns the list of edges from which the given edge could have derived. The
     * given edge must be a particle output of a Reference type. The logic behind
     * which input/output edges could be the source of an output reference is
     * described at go/arcs-dataflow-references.
     */
    private getEdgesCompatibleWithReference;
}
/** Creates a new node for every given particle. */
export declare function createParticleNodes(particles: Particle[]): Map<Particle, ParticleNode>;
