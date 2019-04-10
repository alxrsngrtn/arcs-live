import { assert } from '../../platform/chai-web.js';
import { Manifest } from '../manifest.js';
describe('Entity', () => {
    describe('mutability', async () => {
        const manifest = await Manifest.parse(`
      schema Foo
        Text bar
    `);
        const schema = manifest.findSchemaByName('Foo');
        const entityClass = schema.entityClass();
        // Helper function to create new Foo entities.
        const newFooEntity = (bar) => new entityClass({ bar });
        it('is mutable by default', () => {
            const entity = newFooEntity('abc');
            assert.isTrue(entity.mutable);
            assert.equal(entity.bar, 'abc');
            entity.bar = 'xyz';
            assert.equal(entity.bar, 'xyz');
        });
        it('rejects mutations when immutable', () => {
            const entity = newFooEntity('abc');
            entity.mutable = false;
            assert.throws(() => {
                entity.bar = 'xyz';
            }, /Entity is immutable/);
            assert.equal(entity.bar, 'abc');
        });
        it('stays immutable forever', () => {
            const entity = newFooEntity('abc');
            entity.mutable = false;
            assert.throws(() => {
                entity.mutable = true;
            }, /You cannot make an immutable entity mutable again/);
            assert.isFalse(entity.mutable);
        });
    });
});
//# sourceMappingURL=entity-test.js.map