/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Manifest } from '../manifest.js';
import { assert } from './chai-web.js';
import { Arc } from '../arc.js';
import { MessageChannel } from '../message-channel.js';
import { ParticleExecutionContext } from '../particle-execution-context.js';
import { Loader } from '../loader.js';
import { MockSlotComposer } from '../testing/mock-slot-composer.js';
import { SlotDomConsumer } from '../slot-dom-consumer.js';
import { HostedSlotConsumer } from '../hosted-slot-consumer.js';
describe('particle-shape-loading-with-slots', function () {
    function initializeManifestAndArc(contextContainer) {
        return __awaiter(this, void 0, void 0, function* () {
            let loader = new Loader();
            let pecFactory = function (id) {
                let channel = new MessageChannel();
                new ParticleExecutionContext(channel.port1, `${id}:inner`, loader);
                return channel.port2;
            };
            let slotComposer = new MockSlotComposer({ rootContainer: { 'set-slotid-0': contextContainer || {} } });
            let manifest = yield Manifest.parse(`
      import './runtime/test/artifacts/transformations/test-slots-particles.manifest'

      recipe
        create as handle0
        slot 'rootslotid-set-slotid-0' as slot0
        MultiplexSlotsParticle
          particle = SingleSlotParticle
          foos <- handle0
          consume annotationsSet as slot0
      `, { loader, fileName: './test.manifest' });
            let recipe = manifest.recipes[0];
            let arc = new Arc({ id: 'test', pecFactory, slotComposer, context: manifest });
            assert(recipe.normalize(), 'can\'t normalize recipe');
            assert(recipe.isResolved(), 'recipe isn\'t resolved');
            return { manifest, recipe, slotComposer, arc };
        });
    }
    function instantiateRecipeAndStore(arc, recipe, manifest) {
        return __awaiter(this, void 0, void 0, function* () {
            yield arc.instantiate(recipe);
            let inStore = arc.findStoresByType(manifest.findTypeByName('Foo').collectionOf())[0];
            yield inStore.store({ id: 'subid-1', rawData: { value: 'foo1' } }, ['key1']);
            yield inStore.store({ id: 'subid-2', rawData: { value: 'foo2' } }, ['key2']);
            return inStore;
        });
    }
    let expectedTemplateName = 'MultiplexSlotsParticle::annotationsSet::SingleSlotParticle::annotation::default';
    function verifyFooItems(slotConsumer, expectedValues) {
        let renderings = slotConsumer.renderings.filter(([subId, { model }]) => Boolean(model));
        assert.equal(renderings.length, Object.keys(expectedValues).length);
        for (let [subId, { model, templateName }] of renderings) {
            assert.equal(expectedValues[subId], model.value);
            assert.equal(expectedTemplateName, templateName);
            assert.isTrue(!!SlotDomConsumer.hasTemplate(expectedTemplateName));
        }
    }
    it('multiplex recipe with slots - immediate', () => __awaiter(this, void 0, void 0, function* () {
        let { manifest, recipe, slotComposer, arc } = yield initializeManifestAndArc({
            'subid-1': 'dummy-container1', 'subid-2': 'dummy-container2', 'subid-3': 'dummy-container3'
        });
        slotComposer
            .newExpectations()
            .expectRenderSlot('SingleSlotParticle', 'annotation', { contentTypes: ['template', 'model'], times: 2 })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['template', 'model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'], times: 2, isOptional: true });
        let inStore = yield instantiateRecipeAndStore(arc, recipe, manifest);
        yield slotComposer.arc.pec.idle;
        yield slotComposer.expectationsCompleted();
        // Verify slot template and models.
        assert.lengthOf(slotComposer.consumers, 3);
        assert.isTrue(slotComposer.consumers[0] instanceof SlotDomConsumer);
        assert.isTrue(slotComposer.consumers[1] instanceof HostedSlotConsumer);
        assert.isTrue(slotComposer.consumers[2] instanceof HostedSlotConsumer);
        let slot = slotComposer.consumers[0];
        verifyFooItems(slot, { 'subid-1': 'foo1', 'subid-2': 'foo2' });
        // Add one more element.
        yield inStore.store({ id: 'subid-3', rawData: { value: 'foo3' } }, ['key3']);
        slotComposer
            .newExpectations()
            .expectRenderSlot('SingleSlotParticle', 'annotation', { contentTypes: ['model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'], times: 2, isOptional: true });
        yield slotComposer.arc.pec.idle;
        yield slotComposer.expectationsCompleted();
        verifyFooItems(slot, { 'subid-1': 'foo1', 'subid-2': 'foo2', 'subid-3': 'foo3' });
    }));
    it('multiplex recipe with slots - init context later', () => __awaiter(this, void 0, void 0, function* () {
        // This test is different from the one above because it initializes the transformation particle context
        // after the hosted particles are also instantiated.
        // This verifies a different start-render call in slot-composer.
        let { manifest, recipe, slotComposer, arc } = yield initializeManifestAndArc();
        slotComposer._contexts[0]._container = null;
        let inStore = yield instantiateRecipeAndStore(arc, recipe, manifest);
        // Wait for the hosted slots to be initialized in slot-composer.
        yield new Promise((resolve, reject) => {
            let myInterval = setInterval(function () {
                if (slotComposer.consumers.length == 3) { // last 2 are hosted slots
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
        slotComposer._contexts[0].container = { 'subid-1': 'dummy-container1', 'subid-2': 'dummy-container2', 'subid-3': 'dummy-container3' };
        slotComposer.consumers[0].onContainerUpdate({});
        yield slotComposer.arc.pec.idle;
        yield slotComposer.expectationsCompleted();
        // Verify slot template and models.
        assert.lengthOf(slotComposer.consumers, 3);
        let slot = slotComposer.consumers[0];
        verifyFooItems(slot, { 'subid-1': 'foo1', 'subid-2': 'foo2' });
        // Add one more element.
        inStore.store({ id: 'subid-3', rawData: { value: 'foo3' } }, ['key3']);
        slotComposer
            .newExpectations()
            .expectRenderSlot('SingleSlotParticle', 'annotation', { contentTypes: ['model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'] })
            .expectRenderSlot('MultiplexSlotsParticle', 'annotationsSet', { contentTypes: ['model'], times: 2, isOptional: true });
        yield slotComposer.arc.pec.idle;
        yield slotComposer.expectationsCompleted();
        // Verify slot template and models.
        verifyFooItems(slot, { 'subid-1': 'foo1', 'subid-2': 'foo2', 'subid-3': 'foo3' });
    }));
});
