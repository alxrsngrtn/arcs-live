/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Node, FlowModifier } from './graph-internals.js';
import { ClaimType } from '../../runtime/particle-claim.js';
import { assert } from '../../platform/assert-web.js';
export class ParticleNode extends Node {
    constructor(nodeId, particle) {
        super();
        this.inEdgesByName = new Map();
        this.outEdgesByName = new Map();
        this.nodeId = nodeId;
        this.name = particle.name;
    }
    addInEdge(edge) {
        this.inEdgesByName.set(edge.connectionName, edge);
    }
    addOutEdge(edge) {
        this.outEdgesByName.set(edge.connectionName, edge);
    }
    get inEdges() {
        return [...this.inEdgesByName.values()];
    }
    get outEdges() {
        return [...this.outEdgesByName.values()];
    }
    /**
     * Iterates through all of the relevant in-edges leading into this particle, that flow out into the given out-edge. The out-edge may have a
     * 'derives from' claim that restricts which edges flow into it.
     */
    inEdgesFromOutEdge(outEdge) {
        assert(this.outEdges.includes(outEdge), 'Particle does not have the given out-edge.');
        if (outEdge.derivesFrom && outEdge.derivesFrom.length) {
            return outEdge.derivesFrom;
        }
        return this.inEdges;
    }
}
export class ParticleInput {
    constructor(edgeId, particleNode, otherEnd, connection) {
        this.edgeId = edgeId;
        this.start = otherEnd;
        this.end = particleNode;
        this.connectionName = connection.name;
        this.label = `${particleNode.name}.${this.connectionName}`;
        this.connectionSpec = connection.spec;
        this.modifier = FlowModifier.fromClaims(this, connection.handle.claims);
    }
}
export class ParticleOutput {
    constructor(edgeId, particleNode, otherEnd, connection) {
        this.edgeId = edgeId;
        this.start = particleNode;
        this.end = otherEnd;
        this.connectionName = connection.name;
        this.label = `${particleNode.name}.${this.connectionName}`;
        this.modifier = FlowModifier.fromClaims(this, connection.spec.claims);
        if (connection.spec.claims) {
            this.derivesFrom = [];
            for (const claim of connection.spec.claims) {
                if (claim.type === ClaimType.DerivesFrom) {
                    this.derivesFrom.push(particleNode.inEdgesByName[claim.parentHandle.name]);
                }
            }
        }
    }
}
/** Creates a new node for every given particle. */
export function createParticleNodes(particles) {
    const nodes = new Map();
    particles.forEach((particle, index) => {
        const nodeId = 'P' + index;
        nodes.set(particle, new ParticleNode(nodeId, particle));
    });
    return nodes;
}
//# sourceMappingURL=particle-node.js.map