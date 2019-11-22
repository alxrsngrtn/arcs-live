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
import { TypeChecker } from '../../runtime/recipe/type-checker.js';
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
    get type() {
        return this.connectionSpec.type;
    }
}
export class ParticleOutput {
    constructor(edgeId, particleNode, otherEnd, connection) {
        this.edgeId = edgeId;
        this.start = particleNode;
        this.end = otherEnd;
        this.connectionName = connection.name;
        this.connectionSpec = connection.spec;
        this.label = `${particleNode.name}.${this.connectionName}`;
        this.modifier = FlowModifier.fromClaims(this, connection.spec.claims);
        this.derivesFrom = [];
    }
    get type() {
        return this.connectionSpec.type;
    }
    computeDerivedFromEdges() {
        assert(this.derivesFrom.length === 0, '"Derived from" edges have already been computed.');
        if (this.connectionSpec.claims) {
            for (const claim of this.connectionSpec.claims) {
                if (claim.type === ClaimType.DerivesFrom) {
                    const derivedFromEdge = this.start.inEdgesByName.get(claim.parentHandle.name);
                    assert(derivedFromEdge, `Handle '${claim.parentHandle.name}' is not an in-edge.`);
                    this.derivesFrom.push(derivedFromEdge);
                }
            }
        }
        if (this.derivesFrom.length === 0 && this.type.tag === 'Reference') {
            this.getEdgesCompatibleWithReference().forEach(e => this.derivesFrom.push(e));
        }
    }
    /**
     * Returns the list of edges from which the given edge could have derived. The
     * given edge must be a particle output of a Reference type. The logic behind
     * which input/output edges could be the source of an output reference is
     * described at go/arcs-dataflow-references.
     */
    getEdgesCompatibleWithReference() {
        if (this.type.tag !== 'Reference') {
            assert(false, 'Must be a Reference.');
        }
        const particleNode = this.start;
        const outRef = this.type;
        const result = [];
        // The output reference could have come from any compatible input type, or a
        // compatible input reference.
        for (const inEdge of particleNode.inEdges) {
            if (isTypeCompatibleWithReference(inEdge.type, outRef, /* canBeReference= */ true)) {
                result.push(inEdge);
            }
        }
        // The output reference could come from any compatible output type, but *not*
        // from an output reference type.
        for (const outEdge of particleNode.outEdges) {
            if (outEdge === this) {
                continue;
            }
            if (outEdge instanceof ParticleOutput && isTypeCompatibleWithReference(outEdge.type, outRef, /* canBeReference= */ false)) {
                result.push(outEdge);
            }
        }
        return result;
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
/**
 * Checks if the given type is a possible source of the given output reference.
 *
 * @param canBeReference controls whether a reference type is allowed to be the
 *     source of the output reference
 */
function isTypeCompatibleWithReference(type, target, canBeReference) {
    switch (type.tag) {
        case 'Entity':
            if (TypeChecker.compareTypes({ type, direction: 'in' }, { type: target.getContainedType(), direction: 'out' })) {
                return true;
            }
            if (canBeReference) {
                // Entities can contain references. One of them might be the origin.
                for (const field of Object.values(type.getEntitySchema().fields)) {
                    if (isSchemaFieldCompatibleWithReference(field, target)) {
                        return true;
                    }
                }
            }
            return false;
        case 'Reference':
            return canBeReference
                ? isTypeCompatibleWithReference(type.getContainedType(), target, canBeReference)
                : false;
        case 'Collection':
        case 'BigCollection':
            return isTypeCompatibleWithReference(type.getContainedType(), target, canBeReference);
        default:
            return false;
    }
}
/**
 * Checks if the given schema field is a possible source of the given output
 * reference. Equivalent to isTypeCompatibleWithReference, except handles schema
 * fields, which have no proper types, instead of actual Type objects.
 *
 * canBeReference is implicitly true when calling this method, because a schema
 * can only contain the target type via a reference (schemas can't contain whole
 * sub-entities).
 */
// tslint:disable-next-line: no-any
function isSchemaFieldCompatibleWithReference(field, target) {
    switch (field.kind) {
        case 'schema-reference': {
            const referencedType = field.schema.model;
            if (isTypeCompatibleWithReference(referencedType, target, /* canBeReference= */ true)) {
                return true;
            }
            return false;
        }
        case 'schema-collection':
            return isSchemaFieldCompatibleWithReference(field.schema, target);
        case 'schema-primitive':
            return false;
        default:
            throw new Error(`Unsupported field: ${field}`);
    }
}
//# sourceMappingURL=particle-node.js.map