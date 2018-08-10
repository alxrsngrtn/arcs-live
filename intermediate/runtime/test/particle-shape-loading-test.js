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
import * as util from '../testing/test-util.js';
import { Arc } from '../arc.js';
import { MessageChannel } from '../message-channel.js';
import { ParticleExecutionContext } from '../particle-execution-context.js';
import { Loader } from '../loader.js';
import { StubLoader } from '../testing/stub-loader.js';
import { Recipe } from '../recipe/recipe.js';
import { Type } from '../type.js';
import { Shape } from '../shape.js';
import { ParticleSpec } from '../particle-spec.js';
describe('particle-shape-loading', function () {
    it('loads shapes into particles', () => __awaiter(this, void 0, void 0, function* () {
        let loader = new StubLoader({
            'outer-particle.js': `
          'use strict';

          defineParticle(({Particle}) => {
            return class P extends Particle {
              async setHandles(handles) {
                this.arc = await this.constructInnerArc();
                this.outputHandle = handles.get('output');
                this.inHandle = await this.arc.createHandle(handles.get('input').type, 'input');
                this.outHandle = await this.arc.createHandle(this.outputHandle.type, 'output', this);
              }
              async onHandleSync(handle, model) {
                if (handle.name === 'input') {
                  this.inHandle.set(model);
                }
                if (handle.name === 'particle') {
                  await this.arc.loadRecipe(Particle.buildManifest\`
                    \${model}

                    recipe
                      use \${this.inHandle} as handle1
                      use \${this.outHandle} as handle2
                      \${model.name}
                        foo <- handle1
                        bar -> handle2
                  \`);
                }
              }
              async onHandleUpdate(handle, update) {
                if (handle.name === 'output') {
                  this.outputHandle.set(update.data);
                }
              }
            };
          });`
        });
        let pecFactory = function (id) {
            let channel = new MessageChannel();
            new ParticleExecutionContext(channel.port1, `${id}:inner`, loader);
            return channel.port2;
        };
        let arc = new Arc({ id: 'test', pecFactory });
        let manifest = yield Manifest.load('./runtime/test/artifacts/test-particles.manifest', loader);
        let fooType = Type.newEntity(manifest.schemas.Foo);
        let barType = Type.newEntity(manifest.schemas.Bar);
        let shape = new Shape('Test', [{ type: fooType }, { type: barType }], []);
        let shapeType = Type.newInterface(shape);
        let outerParticleSpec = new ParticleSpec({
            name: 'outerParticle',
            implFile: 'outer-particle.js',
            args: [
                { direction: 'host', type: shapeType, name: 'particle', dependentConnections: [] },
                { direction: 'in', type: fooType, name: 'input', dependentConnections: [] },
                { direction: 'out', type: barType, name: 'output', dependentConnections: [] }
            ],
        });
        let shapeStore = yield arc.createStore(shapeType);
        shapeStore.set(manifest.particles[0].toLiteral());
        let outStore = yield arc.createStore(barType);
        let inStore = yield arc.createStore(fooType);
        let Foo = manifest.schemas.Foo.entityClass();
        inStore.set({ id: 'id', rawData: { value: 'a foo' } });
        let recipe = new Recipe();
        let particle = recipe.newParticle('outerParticle');
        particle.spec = outerParticleSpec;
        let recipeShapeHandle = recipe.newHandle();
        particle.connections['particle'].connectToHandle(recipeShapeHandle);
        recipeShapeHandle.fate = 'use';
        recipeShapeHandle.mapToStorage(shapeStore);
        let recipeOutHandle = recipe.newHandle();
        particle.connections['output'].connectToHandle(recipeOutHandle);
        recipeOutHandle.fate = 'use';
        recipeOutHandle.mapToStorage(outStore);
        let recipeInHandle = recipe.newHandle();
        particle.connections['input'].connectToHandle(recipeInHandle);
        recipeInHandle.fate = 'use';
        recipeInHandle.mapToStorage(inStore);
        assert(recipe.normalize(), 'can\'t normalize recipe');
        assert(recipe.isResolved(), 'recipe isn\'t resolved');
        yield arc.instantiate(recipe);
        yield util.assertSingletonWillChangeTo(arc, outStore, 'value', 'a foo1');
    }));
    it('loads shapes into particles declaratively', () => __awaiter(this, void 0, void 0, function* () {
        let loader = new Loader();
        let pecFactory = function (id) {
            let channel = new MessageChannel();
            new ParticleExecutionContext(channel.port1, `${id}:inner`, loader);
            return channel.port2;
        };
        let manifest = yield Manifest.parse(`
      import './runtime/test/artifacts/test-particles.manifest'

      recipe
        create as h0
        create as h1
        OuterParticle
          particle <- TestParticle
          output -> h0
          input <- h1
      `, { loader, fileName: './test.manifest' });
        let arc = new Arc({ id: 'test', pecFactory, context: manifest });
        let fooType = manifest.findTypeByName('Foo');
        let barType = manifest.findTypeByName('Bar');
        let shapeType = manifest.findTypeByName('TestShape');
        let recipe = manifest.recipes[0];
        assert(recipe.normalize(), 'can\'t normalize recipe');
        assert(recipe.isResolved(), 'recipe isn\'t resolved');
        yield arc.instantiate(recipe);
        arc.findStoresByType(fooType)[0].set({ id: 'id', rawData: { value: 'a foo' } });
        yield util.assertSingletonWillChangeTo(arc, arc.findStoresByType(barType)[0], 'value', 'a foo1');
    }));
});
