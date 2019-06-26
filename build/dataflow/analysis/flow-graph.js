import { assert } from '../../platform/assert-web';
import { ClaimType } from '../../runtime/particle-claim';
import { CheckType } from '../../runtime/particle-check';
/**
 * Data structure for representing the connectivity graph of a recipe. Used to perform static analysis on a resolved recipe.
 */
export class FlowGraph {
    constructor(recipe) {
        this.edges = [];
        if (!recipe.isResolved()) {
            throw new Error('Recipe must be resolved.');
        }
        // Create the nodes of the graph.
        const particleNodes = createParticleNodes(recipe.particles);
        const handleNodes = createHandleNodes(recipe.handles);
        // Add edges to the nodes.
        recipe.handleConnections.forEach(connection => {
            const particleNode = particleNodes.get(connection.particle);
            const handleNode = handleNodes.get(connection.handle);
            const edge = addHandleConnection(particleNode, handleNode, connection);
            this.edges.push(edge);
        });
        this.particles = [...particleNodes.values()];
        this.handles = [...handleNodes.values()];
        this.nodes = [...this.particles, ...this.handles];
        this.particleMap = new Map(this.particles.map(n => [n.name, n]));
    }
    /** Returns a list of all pairwise particle connections, in string form: 'P1.foo -> P2.bar'. */
    get connectionsAsStrings() {
        const connections = [];
        for (const handleNode of this.handles) {
            handleNode.connectionsAsStrings.forEach(c => connections.push(c));
        }
        return connections;
    }
    /** Returns true if all checks in the graph pass. */
    validateGraph() {
        const finalResult = new ValidationResult();
        for (const edge of this.edges) {
            if (edge.check) {
                const result = this.validateSingleEdge(edge);
                result.failures.forEach(f => finalResult.failures.push(f));
            }
        }
        return finalResult;
    }
    /** Validates a single check (on the given edge). Returns true if the check passes. */
    validateSingleEdge(edgeToCheck) {
        assert(!!edgeToCheck.check, 'Edge does not have any check conditions.');
        const check = edgeToCheck.check;
        const finalResult = new ValidationResult();
        // Check every input path into the given edge.
        // NOTE: This is very inefficient. We check every single check condition against every single edge in every single input path.
        for (const path of allInputPaths(edgeToCheck)) {
            if (!evaluateCheckForPath(check, path)) {
                const edgesInPath = path.edges.slice().reverse();
                const pathString = edgesInPath.map(e => e.label).join(' -> ');
                finalResult.failures.push(`'${check.toManifestString()}' failed for path: ${pathString}`);
            }
        }
        return finalResult;
    }
}
/**
 * Iterates through every path in the graph that lead into the given edge. Each path returned is a BackwardsPath, beginning at the given edge,
 * and ending at the end of a path in the graph (i.e. a node with no input edges).
 */
function* allInputPaths(startEdge) {
    const startPath = BackwardsPath.fromEdge(startEdge);
    // Stack of partial paths that need to be expanded (via DFS). Other paths will be added here to be expanded as we explore the graph.
    const pathStack = [startPath];
    while (pathStack.length) {
        const path = pathStack.pop();
        const inEdges = path.endNode.inEdgesFromOutEdge(path.endEdge);
        if (inEdges.length === 0) {
            // Path is finished, yield it.
            yield path;
        }
        else {
            // Path is not finished, continue extending it via all in-edges.
            for (const nextEdge of inEdges) {
                pathStack.push(path.withNewEdge(nextEdge));
            }
        }
    }
}
/** Returns true if the given check passes for the given path. */
function evaluateCheckForPath(check, path) {
    // Check every condition against the whole path.
    // NOTE: This is very inefficient. We check every condition against every edge in the path.
    for (const condition of check.conditions) {
        for (const edge of path.edges) {
            const node = edge.start;
            if (node.evaluateCheckCondition(condition, edge)) {
                // Only one condition needs to pass, anywhere in the path, so we can return true straight away.
                return true;
            }
        }
    }
    return false;
}
/** Result from validating an entire graph. */
export class ValidationResult {
    constructor() {
        this.failures = [];
    }
    get isValid() {
        return this.failures.length === 0;
    }
}
/**
 * A path that walks backwards through the graph, i.e. it walks along the directed edges in the reverse direction. The path is described by the
 * nodes in the path. Class is immutable.
 */
export class BackwardsPath {
    constructor(
    /** Nodes in the path. */
    nodes, 
    /** Edges in the path. */
    edges) {
        this.nodes = nodes;
        this.edges = edges;
    }
    /** Constructs a new path from the given edge. */
    static fromEdge(edge) {
        return new BackwardsPath([edge.end, edge.start], [edge]);
    }
    /** Returns a copy of the current path, with an edge added to the end of it. */
    withNewEdge(edge) {
        // Flip the edge around.
        const startNode = edge.end;
        const endNode = edge.start;
        assert(startNode === this.endNode, 'Edge must connect to end of path.');
        if (this.nodes.includes(endNode)) {
            throw new Error('Graph must not include cycles.');
        }
        return new BackwardsPath([...this.nodes, endNode], [...this.edges, edge]);
    }
    get startNode() {
        return this.nodes[0];
    }
    get endNode() {
        return this.nodes[this.nodes.length - 1];
    }
    get endEdge() {
        return this.edges[this.edges.length - 1];
    }
}
/** Creates a new node for every given particle. */
function createParticleNodes(particles) {
    const nodes = new Map();
    particles.forEach(particle => {
        nodes.set(particle, new ParticleNode(particle));
    });
    return nodes;
}
/** Creates a new node for every given handle. */
function createHandleNodes(handles) {
    const nodes = new Map();
    handles.forEach(handle => {
        nodes.set(handle, new HandleNode(handle));
    });
    return nodes;
}
/** Adds a connection between the given particle and handle nodes. */
function addHandleConnection(particleNode, handleNode, connection) {
    switch (connection.direction) {
        case 'in': {
            const edge = new ParticleInput(particleNode, handleNode, connection);
            particleNode.addInEdge(edge);
            handleNode.addOutEdge(edge);
            return edge;
        }
        case 'out': {
            const edge = new ParticleOutput(particleNode, handleNode, connection);
            particleNode.addOutEdge(edge);
            handleNode.addInEdge(edge);
            return edge;
        }
        case 'inout': // TODO: Handle inout directions.
        case 'host':
        default:
            throw new Error(`Unsupported connection type: ${connection.direction}`);
    }
}
/** Returns true if the given claim satisfies the check condition. Only works with 'tag' claims. */
function checkAgainstTagClaim(check, claim) {
    for (const condition of check.conditions) {
        if (condition.type === CheckType.HasTag) {
            if (condition.tag === claim.tag) {
                return true;
            }
        }
    }
    return false;
}
export class Node {
    get inNodes() {
        return this.inEdges.map(e => e.start);
    }
    get outNodes() {
        return this.outEdges.map(e => e.end);
    }
}
class ParticleNode extends Node {
    constructor(particle) {
        super();
        this.inEdgesByName = new Map();
        this.outEdgesByName = new Map();
        this.name = particle.name;
        this.claims = particle.spec.trustClaims;
        this.checks = particle.spec.trustChecks;
    }
    addInEdge(edge) {
        this.inEdgesByName.set(edge.handleName, edge);
    }
    addOutEdge(edge) {
        this.outEdgesByName.set(edge.handleName, edge);
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
    evaluateCheckCondition(condition, edgeToCheck) {
        assert(this.outEdges.includes(edgeToCheck), 'Particles can only check their own out-edges.');
        // Particles can only evaluate tag check conditions.
        if (condition.type !== CheckType.HasTag) {
            return false;
        }
        const claim = edgeToCheck.claim;
        // Return true if the particle claims the right tag on this edge.
        return claim && claim.type === ClaimType.IsTag && claim.tag === condition.tag;
    }
}
class ParticleInput {
    constructor(particleNode, otherEnd, connection) {
        this.start = otherEnd;
        this.end = particleNode;
        this.handleName = connection.name;
        this.label = `${particleNode.name}.${this.handleName}`;
        this.check = particleNode.checks.get(this.handleName);
        this.connectionSpec = connection.spec;
    }
}
class ParticleOutput {
    constructor(particleNode, otherEnd, connection) {
        this.start = particleNode;
        this.end = otherEnd;
        this.handleName = connection.name;
        this.label = `${particleNode.name}.${this.handleName}`;
        this.claim = particleNode.claims.get(this.handleName);
        this.connectionSpec = connection.spec;
    }
}
class HandleNode extends Node {
    constructor(handle) {
        super();
        this.inEdges = [];
        this.outEdges = [];
        this.outConnectionSpecs = new Set();
    }
    /** Returns a list of all pairs of particles that are connected through this handle, in string form. */
    get connectionsAsStrings() {
        const connections = [];
        this.inEdges.forEach(inEdge => {
            this.outEdges.forEach(outEdge => {
                connections.push(`${inEdge.label} -> ${outEdge.label}`);
            });
        });
        return connections;
    }
    addInEdge(edge) {
        this.inEdges.push(edge);
    }
    addOutEdge(edge) {
        this.outEdges.push(edge);
        this.outConnectionSpecs.add(edge.connectionSpec);
    }
    inEdgesFromOutEdge(outEdge) {
        return this.inEdges;
    }
    evaluateCheckCondition(condition, edgeToCheck) {
        assert(this.outEdges.includes(edgeToCheck), 'Handles can only check their own out-edges.');
        // Handles can only validate checks against themselves.
        if (condition.type !== CheckType.IsFromHandle) {
            return false;
        }
        // Check if this handle node has the same connection as the check condition. If so, it must be the same handle, so we should succeed.
        return this.outConnectionSpecs.has(condition.parentHandle);
    }
}
//# sourceMappingURL=flow-graph.js.map