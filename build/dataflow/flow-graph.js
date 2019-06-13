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
        const finalResult = new ValidationResult();
        const check = edgeToCheck.check;
        const startPath = BackwardsPath.fromEdge(edgeToCheck);
        // Stack of paths that need to be checked (via DFS). Other paths will be added here to be checked as we explore the graph.
        const pathStack = [startPath];
        while (pathStack.length) {
            const path = pathStack.pop();
            const node = path.endNode;
            // See if the end of the path satisfies the check condition.
            const result = node.evaluateCheck(check, path.endEdge, path);
            switch (result.type) {
                case CheckResultType.Success:
                    // Check was met. Continue checking other paths.
                    continue;
                case CheckResultType.Failure:
                    // Check failed. Add failure and continue checking other paths.
                    finalResult.failures.push(result.reason);
                    continue;
                case CheckResultType.KeepGoing:
                    // Check has not failed yet for this path yet. Add more paths to the stack and keep going.
                    assert(result.checkNext.length > 0, 'Result was KeepGoing, but gave nothing else to check.');
                    result.checkNext.forEach(p => pathStack.push(p));
                    continue;
                default:
                    assert(false, `Unknown check result: ${result}`);
            }
        }
        return finalResult;
    }
}
/** Result from validating an entire graph. */
class ValidationResult {
    constructor() {
        this.failures = [];
    }
    get isValid() {
        return this.failures.length === 0;
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
    evaluateCheck(check, edgeToCheck, path) {
        assert(this.outEdges.includes(edgeToCheck), 'Particles can only check their own out-edges.');
        // First check if this particle makes an explicit claim on this out-edge.
        const claim = this.claims.get(edgeToCheck.handleName);
        if (claim) {
            if (claim === check) {
                return { type: CheckResultType.Success };
            }
            else {
                return { type: CheckResultType.Failure, reason: `Check '${check}' failed: found claim '${claim}' on '${edgeToCheck.label}' instead.` };
            }
        }
        // Next check the node's in-edges.
        if (this.inEdges.length) {
            const checkNext = this.inEdges.map(e => path.withNewEdge(e));
            return { type: CheckResultType.KeepGoing, checkNext };
        }
        else {
            return { type: CheckResultType.Failure, reason: `Check '${check}' failed: found untagged node.` };
        }
    }
}
class ParticleInput {
    constructor(particleNode, otherEnd, inputName) {
        this.start = otherEnd;
        this.end = particleNode;
        this.label = `${particleNode.name}.${inputName}`;
        this.handleName = inputName;
        this.check = particleNode.checks.get(inputName);
    }
}
class ParticleOutput {
    constructor(particleNode, otherEnd, outputName) {
        this.start = particleNode;
        this.end = otherEnd;
        this.label = `${particleNode.name}.${outputName}`;
        this.handleName = outputName;
        this.claim = particleNode.claims.get(outputName);
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
    evaluateCheck(check, edgeToCheck, path) {
        assert(this.outEdges.includes(edgeToCheck), 'Handles can only check their own out-edges.');
        // Handles can't make claims of their own (yet). Check whether this handle is untagged.
        if (this.inEdges.length) {
            const checkNext = this.inEdges.map(e => path.withNewEdge(e));
            return { type: CheckResultType.KeepGoing, checkNext };
        }
        else {
            return { type: CheckResultType.Failure, reason: `Check '${check}' failed: found untagged node.` };
        }
    }
}
//# sourceMappingURL=flow-graph.js.map