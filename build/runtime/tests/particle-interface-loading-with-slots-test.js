/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/chai-web.js';
import { Arc } from '../arc.js';
import { ArcId } from '../id.js';
import { HeadlessSlotDomConsumer } from '../headless-slot-dom-consumer.js';
import { Loader } from '../loader.js';
import { Manifest } from '../manifest.js';
import { HostedSlotContext, ProvidedSlotContext } from '../slot-context.js';
import { MockSlotComposer } from '../testing/mock-slot-composer.js';
import { collectionHandleForTest } from '../testing/handle-for-test.js';
import { Entity } from '../entity.js';
describe('particle interface loading with slots', () => {
    async function initializeManifestAndArc(contextContainer) {
        const loader = new Loader();
        const slotComposer = new MockSlotComposer({ rootContainer: { 'set-slotid-0': contextContainer || {} } });
        const slotContext = slotComposer.getAvailableContexts()[0];
        slotContext.spec.isSet = true; // MultiplexSlotsParticle expects a Set Slot root.
        const manifest = await Manifest.parse(`
      import './src/runtime/tests/artifacts/transformations/test-slots-particles.manifest'

      recipe
        create as handle0
        slot 'rootslotid-set-slotid-0' as slot0
        MultiplexSlotsParticle
          particle0 = SingleSlotParticle
          foos <- handle0
          consume annotationsSet as slot0
      `, { loader, fileName: '' });
        const recipe = manifest.recipes[0];
        const arc = new Arc({ id: ArcId.newForTest('test'), slotComposer, context: manifest, loader });
        assert(recipe.normalize(), `can't normalize recipe`);
        assert(recipe.isResolved(), `recipe isn't resolved`);
        return { manifest, recipe, slotComposer, arc };
    }
    // tslint:disable-next-line: no-any
    async function instantiateRecipeAndStore(arc, recipe, manifest) {
        await arc.instantiate(recipe);
        const inStore = arc.findStoresByType(manifest.findTypeByName('Foo').collectionOf())[0];
        const inHandle = await collectionHandleForTest(arc, inStore);
        await inHandle.add(Entity.identify(new inHandle.entityClass({ value: 'foo1' }), 'subid-1'));
        await inHandle.add(Entity.identify(new inHandle.entityClass({ value: 'foo2' }), 'subid-2'));
        return inHandle;
    }
    const expectedTemplateName = 'MultiplexSlotsParticle::annotationsSet::SingleSlotParticle::annotation::default';
    function verifyFooItems(slotConsumer, expectedValues) {
        const renderings = slotConsumer.renderings.filter(([subId, { model }]) => Boolean(model));
        assert.strictEqual(renderings.length, Object.keys(expectedValues).length);
        for (const [subId, { model, templateName }] of renderings) {
            assert.strictEqual(expectedValues[subId], model.value);
            assert.strictEqual(expectedTemplateName, templateName);
            assert.isTrue(!!HeadlessSlotDomConsumer.hasTemplate(expectedTemplateName));
        }
    }
    it('multiplex recipe with slots - immediate', async () => {
        const { manifest, recipe, slotComposer, arc } = await initializeManifestAndArc({
            'subid-1': 'dummy-container1', 'subid-2': 'dummy-container2', 'subid-3': 'dummy-container3'
        });
        slotComposer
            .newExpectations()
            .expectRenderSlot('SingleSlotParticle', 'annotation', { contentTypes: ['template', 'model'], times: 2 })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['template', 'model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'], times: 2, isOptional: true });
        const inStore = await instantiateRecipeAndStore(arc, recipe, manifest);
        await arc.pec.idle;
        await slotComposer.expectationsCompleted();
        // Verify slot template and models.
        assert.lengthOf(slotComposer.consumers, 3);
        assert.isTrue(slotComposer.consumers[0].slotContext instanceof ProvidedSlotContext);
        assert.isTrue(slotComposer.consumers[1].slotContext instanceof HostedSlotContext);
        assert.isTrue(slotComposer.consumers[2].slotContext instanceof HostedSlotContext);
        const slot = slotComposer.consumers[0];
        verifyFooItems(slot, { 'subid-1': 'foo1', 'subid-2': 'foo2' });
        // Add one more element.
        await inStore.add(Entity.identify(new inStore.entityClass({ value: 'foo3' }), 'subid-3'));
        slotComposer
            .newExpectations()
            .expectRenderSlot('SingleSlotParticle', 'annotation', { contentTypes: ['model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'], times: 2, isOptional: true });
        await arc.pec.idle;
        await slotComposer.expectationsCompleted();
        verifyFooItems(slot, { 'subid-1': 'foo1', 'subid-2': 'foo2', 'subid-3': 'foo3' });
    });
    it('multiplex recipe with slots - init context later', async () => {
        // This test is different from the one above because it initializes the transformation particle context
        // after the hosted particles are also instantiated.
        // This verifies a different start-render call in slot-composer.
        const { manifest, recipe, slotComposer, arc } = await initializeManifestAndArc();
        slotComposer.getAvailableContexts()[0].container = null;
        const inStore = await instantiateRecipeAndStore(arc, recipe, manifest);
        // Wait for the hosted slots to be initialized in slot-composer.
        await new Promise((resolve, reject) => {
            const myInterval = setInterval(() => {
                if (slotComposer.consumers.length === 3) { // last 2 are hosted slots
                    resolve();
                    clearInterval(myInterval);
                }
            }, 10);
        });
        slotComposer
            .newExpectations()
            .expectRenderSlot('SingleSlotParticle', 'annotation', { contentTypes: ['template', 'model'], times: 2 })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['template', 'model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'], times: 2, isOptional: true });
        // tslint:disable-next-line: no-any
        slotComposer.getAvailableContexts()[0].container = { 'subid-1': 'dummy-container1', 'subid-2': 'dummy-container2', 'subid-3': 'dummy-container3' };
        slotComposer.consumers[0].onContainerUpdate({}, undefined);
        await arc.pec.idle;
        await slotComposer.expectationsCompleted();
        // Verify slot template and models.
        assert.lengthOf(slotComposer.consumers, 3);
        const slot = slotComposer.consumers[0];
        verifyFooItems(slot, { 'subid-1': 'foo1', 'subid-2': 'foo2' });
        // Add one more element.
        await inStore.add(Entity.identify(new inStore.entityClass({ value: 'foo3' }), 'subid-3'));
        slotComposer
            .newExpectations()
            .expectRenderSlot('SingleSlotParticle', 'annotation', { contentTypes: ['model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'], times: 2, isOptional: true });
        await arc.pec.idle;
        await slotComposer.expectationsCompleted();
        // Verify slot template and models.
        verifyFooItems(slot, { 'subid-1': 'foo1', 'subid-2': 'foo2', 'subid-3': 'foo3' });
    });
});
//# sourceMappingURL=particle-interface-loading-with-slots-test.js.map