/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../../platform/chai-web.js';
import { checkDefined } from '../../../runtime/testing/preconditions.js';
import { ParticleOutput, ParticleInput } from '../particle-node.js';
import { buildFlowGraph } from '../testing/flow-graph-testing.js';
import { FlowModifier } from '../graph-internals.js';
describe('FlowGraph', () => {
    it('works with empty recipe', async () => {
        const graph = await buildFlowGraph(`
      recipe R
    `);
        assert.isEmpty(graph.particleMap);
        assert.isEmpty(graph.handles);
    });
    it('works with single particle', async () => {
        const graph = await buildFlowGraph(`
      particle P
      recipe R
        P
    `);
        assert.isEmpty(graph.handles);
        assert.hasAllKeys(graph.particleMap, ['P']);
        const node = checkDefined(graph.particleMap.get('P'));
        assert.isEmpty(node.inEdges);
        assert.isEmpty(node.outEdges);
    });
    it('works with two particles', async () => {
        const graph = await buildFlowGraph(`
      particle P1
        out Foo {} foo
      particle P2
        in Foo {} bar
      recipe R
        P1
          foo -> h
        P2
          bar <- h
    `);
        assert.lengthOf(graph.particles, 2);
        assert.lengthOf(graph.handles, 1);
        assert.hasAllKeys(graph.particleMap, ['P1', 'P2']);
        const P1 = checkDefined(graph.particleMap.get('P1'));
        const P2 = checkDefined(graph.particleMap.get('P2'));
        assert.isEmpty(P1.inEdges);
        assert.isEmpty(P2.outEdges);
        assert.strictEqual(P1.outNodes[0], P2.inNodes[0], 'handle node is different');
        assert.sameMembers(graph.connectionsAsStrings, ['P1.foo -> P2.bar']);
    });
    it('works with inout handle connections', async () => {
        const graph = await buildFlowGraph(`
      particle P
        inout Foo {} foo
        check foo is t1
        claim foo is t2
      recipe R
        P
          foo <-> h
    `);
        assert.lengthOf(graph.particles, 1);
        const particleNode = graph.particles[0];
        assert.lengthOf(graph.handles, 1);
        const handleNode = graph.handles[0];
        assert.lengthOf(graph.edges, 2);
        const [inEdge, outEdge] = graph.edges;
        assert.strictEqual(particleNode.nodeId, 'P0');
        assert.strictEqual(handleNode.nodeId, 'H0');
        assert.strictEqual(inEdge.edgeId, 'E0');
        assert.strictEqual(outEdge.edgeId, 'E1');
        assert.strictEqual(inEdge.start, handleNode);
        assert.strictEqual(inEdge.end, particleNode);
        assert.strictEqual(outEdge.start, particleNode);
        assert.strictEqual(outEdge.end, handleNode);
        assert.deepEqual(inEdge.modifier, FlowModifier.parse('+node:H0', '+edge:E0'));
        assert.deepNestedInclude(inEdge.check, { type: 'tag', value: 't1', negated: false });
        assert.deepEqual(outEdge.modifier, FlowModifier.parse('+node:P0', '+edge:E1', '+tag:t2'));
        assert.isUndefined(outEdge.check);
    });
    it('works with handles with multiple inputs', async () => {
        const graph = await buildFlowGraph(`
      particle P1
        out Foo {} foo
      particle P2
        out Foo {} bar
      particle P3
        in Foo {} baz
      recipe R
        P1
          foo -> h
        P2
          bar -> h
        P3
          baz <- h
    `);
        assert.hasAllKeys(graph.particleMap, ['P1', 'P2', 'P3']);
        assert.sameMembers(graph.connectionsAsStrings, ['P1.foo -> P3.baz', 'P2.bar -> P3.baz']);
    });
    it('works with handles with multiple outputs', async () => {
        const graph = await buildFlowGraph(`
      particle P1
        out Foo {} foo
      particle P2
        in Foo {} bar
      particle P3
        in Foo {} baz
      recipe R
        P1
          foo -> h
        P2
          bar <- h
        P3
          baz <- h
    `);
        assert.hasAllKeys(graph.particleMap, ['P1', 'P2', 'P3']);
        assert.sameMembers(graph.connectionsAsStrings, ['P1.foo -> P2.bar', 'P1.foo -> P3.baz']);
    });
    it('works with datastores with tag claims', async () => {
        const graph = await buildFlowGraph(`
      schema MyEntity
        Text text
      resource MyResource
        start
        [{"text": "asdf"}]
      store MyStore of MyEntity in MyResource
        claim is trusted
      particle P
        in MyEntity input
      recipe R
        use MyStore as s
        P
          input <- s
    `);
        assert.lengthOf(graph.edges, 1);
        const modifier = graph.edges[0].modifier;
        assert.strictEqual(modifier.tagOperations.size, 1);
        assert.strictEqual(modifier.tagOperations.get('trusted'), 'add');
    });
    it('copies particle claims to particle out-edges as a flow modifier', async () => {
        const graph = await buildFlowGraph(`
      particle P
        out Foo {} foo
        claim foo is trusted
      recipe R
        P
          foo -> h
    `);
        assert.lengthOf(graph.edges, 1);
        assert.isNotNull(graph.edges[0].modifier);
        assert.deepEqual(graph.edges[0].modifier, FlowModifier.parse('+node:P0', '+edge:E0', '+tag:trusted'));
    });
    it('copies particle checks to particle nodes and in-edges', async () => {
        const graph = await buildFlowGraph(`
      particle P
        in Foo {} foo
        check foo is trusted
      recipe R
        P
          foo <- h
    `);
        assert.lengthOf(graph.edges, 1);
        const check = graph.edges[0].check;
        assert.deepNestedInclude(check, { type: 'tag', value: 'trusted' });
    });
    it('supports making checks on slots', async () => {
        const graph = await buildFlowGraph(`
      particle P1
        consume root
          provide slotToProvide
        check slotToProvide data is trusted
      particle P2
        consume slotToConsume
      recipe R
        slot 'rootslotid-root' as root
        P1
          consume root as root
            provide slotToProvide as slot0
        P2
          consume slotToConsume as slot0
    `);
        assert.lengthOf(graph.slots, 2);
        const slot1 = checkDefined(graph.slots[0]);
        assert.isEmpty(slot1.outEdges);
        assert.lengthOf(slot1.inEdges, 1);
        assert.strictEqual(slot1.inEdges[0].connectionName, 'root');
        assert.strictEqual(slot1.inEdges[0].start.name, 'P1');
        assert.isUndefined(slot1.inEdges[0].check);
        assert.isUndefined(slot1.check);
        assert.strictEqual(slot1.inEdges[0].edgeId, 'E0');
        assert.strictEqual(slot1.inEdges[0].start.nodeId, 'P0');
        assert.deepEqual(slot1.inEdges[0].modifier, FlowModifier.parse('+edge:E0', '+node:P0'));
        const slot2 = checkDefined(graph.slots[1]);
        assert.isEmpty(slot2.outEdges);
        assert.lengthOf(slot2.inEdges, 1);
        assert.strictEqual(slot2.inEdges[0].connectionName, 'slotToConsume');
        assert.strictEqual(slot2.inEdges[0].start.name, 'P2');
        const check = slot2.inEdges[0].check;
        assert.deepNestedInclude(check, { type: 'tag', value: 'trusted' });
        assert.strictEqual(slot2.inEdges[0].edgeId, 'E1');
        assert.strictEqual(slot2.inEdges[0].start.nodeId, 'P1');
        assert.deepEqual(slot2.inEdges[0].modifier, FlowModifier.parse('+edge:E1', '+node:P1'));
    });
    it('resolves data store names and IDs', async () => {
        const graph = await buildFlowGraph(`
      schema MyEntity
        Text text
      resource MyResource
        start
        [{"text": "asdf"}]
      store MyStore of MyEntity 'my-store-id' in MyResource
      particle P
        in MyEntity input
      recipe R
        use MyStore as s
        P
          input <- s
    `);
        assert.lengthOf(graph.handles, 1);
        const storeId = graph.handles[0].storeId;
        assert.strictEqual(graph.resolveStoreRefToID({ type: 'id', store: 'my-store-id' }), 'my-store-id');
        assert.strictEqual(graph.resolveStoreRefToID({ type: 'name', store: 'MyStore' }), storeId);
        assert.throws(() => graph.resolveStoreRefToID({ type: 'name', store: 'UnknownName' }), 'Store with name UnknownName not found.');
        assert.throws(() => graph.resolveStoreRefToID({ type: 'id', store: 'unknown-id' }), `Store with id 'unknown-id' not found.`);
    });
    it('all node and edge IDs are unique', async () => {
        const graph = await buildFlowGraph(`
      particle P1
        consume root
          provide slotToProvide
        check slotToProvide data is trusted
        in Foo {} input
      particle P2
        consume slotToConsume
        out Foo {} output
      recipe R
        slot 'rootslotid-root' as root
        P1
          consume root as root
            provide slotToProvide as slot0
          input <- h
        P2
          consume slotToConsume as slot0
          output -> h
    `);
        const allNodeIds = graph.nodes.map(n => n.nodeId);
        const allEdgeIds = graph.edges.map(e => e.edgeId);
        assert.lengthOf(allNodeIds, 5); // 2 particles, 2 slots, 1 handle.
        assert.lengthOf(allEdgeIds, 4); // 2 handle connections, 2 slot connections.
        // Check all values are unique.
        assert.strictEqual(new Set(allNodeIds).size, 5);
        assert.strictEqual(new Set(allEdgeIds).size, 4);
        assert.sameMembers(allNodeIds, ['P0', 'P1', 'S0', 'S1', 'H0']);
        assert.sameMembers(allEdgeIds, ['E0', 'E1', 'E2', 'E3']);
    });
    it('handles with the use, map or copy fates are marked as ingress', async () => {
        const runForHandleWithFate = async (fate) => {
            const graph = await buildFlowGraph(`
        schema MyEntity
          Text text
        resource MyResource
          start
          [{"text": "asdf"}]
        store MyStore of MyEntity 'my-store-id' in MyResource
        particle P
          in MyEntity foo
        recipe R
          ${fate} as foo
          P
            foo <- foo
      `);
            assert.lengthOf(graph.particles, 1);
            assert.isFalse(graph.particles[0].ingress);
            assert.lengthOf(graph.handles, 1);
            return graph.handles[0];
        };
        assert.isFalse((await runForHandleWithFate('create')).ingress);
        assert.isTrue((await runForHandleWithFate('use MyStore')).ingress);
        assert.isTrue((await runForHandleWithFate('map MyStore')).ingress);
        assert.isTrue((await runForHandleWithFate('copy MyStore')).ingress);
    });
    it('supports circular "derives from" statements', async () => {
        // Regression test for a race condition bug where the order in which edges
        // were created was important ('claim foo1 derives from foo2' required that
        // and edge for foo2 had already been created).
        const graph = await buildFlowGraph(`
      particle P
        inout Foo {} foo1
        inout Foo {} foo2
        claim foo1 derives from foo2
        claim foo2 derives from foo1
      recipe R
        P
          foo1 <-> h1
          foo2 <-> h2
    `);
        assert.lengthOf(graph.edges, 4);
        const foo1Out = graph.edges.find(e => e instanceof ParticleOutput && e.label === 'P.foo1');
        const foo2Out = graph.edges.find(e => e instanceof ParticleOutput && e.label === 'P.foo2');
        const foo1In = graph.edges.find(e => e instanceof ParticleInput && e.label === 'P.foo1');
        const foo2In = graph.edges.find(e => e instanceof ParticleInput && e.label === 'P.foo2');
        assert.lengthOf(foo1Out.derivesFrom, 1);
        assert.strictEqual(foo1Out.derivesFrom[0], foo2In);
        assert.lengthOf(foo2Out.derivesFrom, 1);
        assert.strictEqual(foo2Out.derivesFrom[0], foo1In);
    });
});
//# sourceMappingURL=flow-graph-test.js.map