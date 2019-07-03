/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Node } from './graph-internals.js';
import { ClaimType } from '../../runtime/particle-claim.js';
import { assert } from '../../platform/assert-web.js';
export class ParticleNode extends Node {
    constructor(particle) {
        super();
        this.inEdgesByName = new Map();
        this.outEdgesByName = new Map();
        this.name = particle.name;
        this.claims = particle.spec.trustClaims;
        this.checks = particle.spec.trustChecks;
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
        if (outEdge.claim && outEdge.claim.type === ClaimType.DerivesFrom) {
            const result = [];
            for (const parentHandle of outEdge.claim.parentHandles) {
                const inEdge = this.inEdgesByName.get(parentHandle.name);
                assert(!!inEdge, `Claim derives from unknown handle: ${parentHandle}.`);
                result.push(inEdge);
            }
            return result;
        }
        return this.inEdges;
    }
}
export class ParticleInput {
    constructor(particleNode, otherEnd, connection) {
        this.start = otherEnd;
        this.end = particleNode;
        this.connectionName = connection.name;
        this.label = `${particleNode.name}.${this.connectionName}`;
        this.check = connection.spec.check;
        this.connectionSpec = connection.spec;
    }
}
export class ParticleOutput {
    constructor(particleNode, otherEnd, connection) {
        this.start = particleNode;
        this.end = otherEnd;
        this.connectionName = connection.name;
        this.connectionSpec = connection.spec;
        this.label = `${particleNode.name}.${this.connectionName}`;
        const claim = particleNode.claims.get(this.connectionName);
        this.claim = claim ? claim.expression : null;
    }
}
/** Creates a new node for every given particle. */
export function createParticleNodes(particles) {
    const nodes = new Map();
    particles.forEach(particle => {
        nodes.set(particle, new ParticleNode(particle));
    });
    return nodes;
}
//# sourceMappingURL=particle-node.js.map