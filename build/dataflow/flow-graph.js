import { assert } from '../platform/assert-web';
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
        for (const edge of this.edges) {
            if (edge.check) {
                const success = this.validateSingleEdge(edge);
                if (!success) {
                    return false;
                }
            }
        }
        return true;
    }
    /** Validates a single check (on the given edge). Returns true if the check passes. */
    validateSingleEdge(edgeToCheck) {
        assert(!!edgeToCheck.check, 'Edge does not have any check conditions.');
        const check = edgeToCheck.check;
        const startPath = BackwardsPath.newPathWithOpenEdge(edgeToCheck);
        // Stack of paths that need to be checked (via DFS). Other paths will be added here to be checked as we explore the graph.
        const pathStack = [startPath];
        while (pathStack.length) {
            const path = pathStack.pop();
            // See if the end of the path satisfies the check condition.
            const result = path.end.evaluateCheck(check, path);
            switch (result.type) {
                case CheckResultType.Success:
                    // Check was met. Continue checking other paths.
                    continue;
                case CheckResultType.Failure:
                    // Check failed. Stop.
                    return false;
                case CheckResultType.KeepGoing:
                    // Check has not failed yet for this path yet. Add more paths to the stack and keep going.
                    assert(result.checkNext.length > 0, 'Result was KeepGoing, but gave nothing else to check.');
                    result.checkNext.forEach(p => pathStack.push(p));
                    continue;
                default:
                    throw new Error(`Unknown check result: ${result}`);
            }
        }
        return true;
    }
}
export var CheckResultType;
(function (CheckResultType) {
    CheckResultType[CheckResultType["Success"] = 0] = "Success";
    CheckResultType[CheckResultType["Failure"] = 1] = "Failure";
    CheckResultType[CheckResultType["KeepGoing"] = 2] = "KeepGoing";
})(CheckResultType || (CheckResultType = {}));
/**
 * A path that walks backwards through the graph, i.e. it walks along the directed edges in the reverse direction. The path is described by the
 * nodes in the path. Class is immutable.
 *
 * The path can have an open or closed edge at the end. An open edge points to the final node in the path, but does not actually include it.
 */
export class BackwardsPath {
    constructor(
    /** Nodes in the path. */
    nodes, 
    /**
     * Optional open edge at the end of the path. If the path is closed, this will be null, and the end of the path is given by the last node
     * in the nodes list.
     */
    openEdge = null) {
        this.nodes = nodes;
        this.openEdge = openEdge;
    }
    /** Constructs a new path from the given edge with an open end. */
    static newPathWithOpenEdge(edge) {
        // Flip the edge around.
        const startNode = edge.end;
        return new BackwardsPath([startNode], edge);
    }
    /** Constructs a new path from the given edge with a closed end. */
    static newPathWithClosedEdge(edge) {
        return BackwardsPath.newPathWithOpenEdge(edge).withClosedEnd();
    }
    /** Returns a copy of the current path, with an open edge added to the end of it. Fails if the path already has an open edge. */
    withNewOpenEdge(edge) {
        // Flip the edge around.
        const startNode = edge.end;
        const endNode = edge.start;
        assert(!this.openEdge, 'Path already ends with an open edge.');
        assert(startNode === this.end, 'Edge must connect to end of path.');
        if (this.nodes.includes(endNode)) {
            throw new Error('Graph must not include cycles.');
        }
        return new BackwardsPath(this.nodes, edge);
    }
    /** Returns a copy of the current path, converting an open edge to a closed one. Fails if the path does not have an open edge. */
    withClosedEnd() {
        assert(!!this.openEdge, 'Path is already closed.');
        // Flip edge around.
        const endNode = this.openEdge.start;
        return new BackwardsPath([...this.nodes, endNode]);
    }
    withNewClosedEdge(edge) {
        return this.withNewOpenEdge(edge).withClosedEnd();
    }
    get startNode() {
        return this.nodes[0];
    }
    get end() {
        return this.openEdge || this.nodes[this.nodes.length - 1];
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
            const edge = new ParticleInput(particleNode, handleNode, connection.name);
            particleNode.inEdges.push(edge);
            handleNode.outEdges.push(edge);
            return edge;
        }
        case 'out': {
            const edge = new ParticleOutput(particleNode, handleNode, connection.name);
            particleNode.outEdges.push(edge);
            handleNode.inEdges.push(edge);
            return edge;
        }
        case 'inout': // TODO: Handle inout directions.
        case 'host':
        default:
            throw new Error(`Unsupported connection type: ${connection.direction}`);
    }
}
export class Node {
    evaluateCheck(check, path) {
        if (this.inEdges.length === 0) {
            // Nodes without inputs are untagged, and so cannot satisfy checks.
            return { type: CheckResultType.Failure };
        }
        // Nodes can't have claims themselves (yet). Keep going, and check the in-edges next.
        const checkNext = this.inEdges.map(e => path.withNewOpenEdge(e));
        return { type: CheckResultType.KeepGoing, checkNext };
    }
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
        this.inEdges = [];
        this.outEdges = [];
        this.name = particle.name;
        this.claims = particle.spec.trustClaims;
        this.checks = particle.spec.trustChecks;
    }
}
class ParticleInput {
    constructor(particleNode, otherEnd, inputName) {
        this.start = otherEnd;
        this.end = particleNode;
        this.label = `${particleNode.name}.${inputName}`;
        this.check = particleNode.checks.get(inputName);
    }
    evaluateCheck(check, path) {
        // In-edges don't have claims. Keep checking.
        return { type: CheckResultType.KeepGoing, checkNext: [path.withClosedEnd()] };
    }
}
class ParticleOutput {
    constructor(particleNode, otherEnd, outputName) {
        this.start = particleNode;
        this.end = otherEnd;
        this.label = `${particleNode.name}.${outputName}`;
        this.claim = particleNode.claims.get(outputName);
    }
    evaluateCheck(check, path) {
        if (!this.claim) {
            // This out-edge has no claims. Keep checking.
            return { type: CheckResultType.KeepGoing, checkNext: [path.withClosedEnd()] };
        }
        if (this.claim === check) {
            return { type: CheckResultType.Success };
        }
        // The claim on this edge "clobbers" any claims that might have been made upstream. We won't check though, and will fail the check
        // completely.
        return { type: CheckResultType.Failure };
    }
}
class HandleNode extends Node {
    constructor(handle) {
        super();
        this.inEdges = [];
        this.outEdges = [];
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
}
//# sourceMappingURL=flow-graph.js.map