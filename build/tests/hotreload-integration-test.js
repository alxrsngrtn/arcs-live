/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/chai-web.js';
import { StubLoader } from '../runtime/testing/stub-loader';
import { Manifest } from '../runtime/manifest';
import { Arc } from '../runtime/arc.js';
import { ArcId } from '../runtime/id.js';
import { Loader } from '../runtime/loader.js';
import { FakeSlotComposer } from '../runtime/testing/fake-slot-composer.js';
import { FakePecFactory } from '../runtime/fake-pec-factory.js';
class StubWasmLoader extends Loader {
    constructor() {
        super(...arguments);
        this.reloaded = false;
    }
    async loadWasmBinary(spec) {
        const file = this.reloaded ? 'wasm-particle-new.wasm' : 'wasm-particle-old.wasm';
        return super.loadWasmBinary({ implFile: `bazel-bin/src/tests/source/${file}` });
    }
    clone() {
        return this;
    }
}
describe('Hot Code Reload for JS Particle', async () => {
    it('updates model and template', async () => {
        const context = await Manifest.parse(`
      particle A in 'A.js'
        consume root

      recipe
        slot 'rootslotid-root' as slot0
        A
          consume root as slot0`);
        const loader = new StubLoader({
            'A.js': `defineParticle(({DomParticle}) => {
        return class extends DomParticle {
          get template() { return 'Hello <span>{{name}}</span>, old age: <span>{{age}}</span>'; }

          render() {
            return {name: 'Jack', age: '10'};
          }
        };
      });`
        });
        const id = ArcId.newForTest('HotReload');
        const pecFactories = [FakePecFactory(loader).bind(null)];
        const slotComposer = new FakeSlotComposer();
        const arc = new Arc({ id, pecFactories, slotComposer, loader, context });
        const [recipe] = arc.context.recipes;
        assert.isTrue(recipe.normalize() && recipe.isResolved());
        await arc.instantiate(recipe);
        await arc.idle;
        const slotConsumer = slotComposer.consumers[0];
        assert.deepEqual(slotConsumer.getRendering().model, { name: 'Jack', age: '10' });
        assert.deepEqual(slotConsumer._content.template, `Hello <span>{{name}}</span>, old age: <span>{{age}}</span>`);
        loader._fileMap['A.js'] = `defineParticle(({DomParticle}) => {
      return class extends DomParticle {
        get template() { return 'Hello <span>{{name}}</span>, new age: <span>{{age}}</span>'; }

        render() {
          return {name: 'Jack', age: '15'};
        }
      };
    });`;
        arc.pec.reload(arc.pec.particles);
        await arc.idle;
        assert.deepEqual(slotConsumer.getRendering().model, { name: 'Jack', age: '15' });
        assert.deepEqual(slotConsumer._content.template, `Hello <span>{{name}}</span>, new age: <span>{{age}}</span>`);
    });
});
describe('Hot Code Reload for WASM Particle', async () => {
    before(function () {
        if (!global['testFlags'].bazel) {
            this.skip();
        }
    });
    it('updates model and template', async () => {
        // StubWasmLoader returns wasm-particle-old.wasm or wasm-particle-new.wasm instead of
        // wasm-particle.wasm based on the reloaded flag
        const context = await Manifest.parse(`
      particle HotReloadTest in 'bazel-bin/src/tests/source/wasm-particle.wasm'
        consume root

      recipe
        slot 'rootslotid-root' as slot0
        HotReloadTest
          consume root as slot0`);
        const loader = new StubWasmLoader();
        const id = ArcId.newForTest('HotReload');
        const pecFactories = [FakePecFactory(loader).bind(null)];
        const slotComposer = new FakeSlotComposer();
        const arc = new Arc({ id, pecFactories, slotComposer, loader, context });
        const [recipe] = arc.context.recipes;
        assert.isTrue(recipe.normalize() && recipe.isResolved());
        await arc.instantiate(recipe);
        await arc.idle;
        const slotConsumer = slotComposer.consumers[0];
        assert.deepEqual(slotConsumer.getRendering().model, { name: 'Jack', age: '10' });
        assert.deepEqual(slotConsumer._content.template, `<div>Hello <span>{{name}}</span>, old age: <span>{{age}}</span></div>`);
        loader.reloaded = true;
        arc.pec.reload(arc.pec.particles);
        await arc.idle;
        assert.deepEqual(slotConsumer.getRendering().model, { name: 'Jack', age: '15' });
        assert.deepEqual(slotConsumer._content.template, `<div>Hello <span>{{name}}</span>, new age: <span>{{age}}</span></div>`);
    });
});
//# sourceMappingURL=hotreload-integration-test.js.map