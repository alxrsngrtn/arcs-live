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
import { assert } from './chai-web.js';
import { Arc } from '../arc.js';
import { Schema } from '../schema.js';
import { SlotComposer } from '../slot-composer.js';
import { Type } from '../type.js';
import { handleFor } from '../handle.js';
describe('entity', function () {
    return __awaiter(this, void 0, void 0, function* () {
        it('can be created, stored, and restored', () => __awaiter(this, void 0, void 0, function* () {
            let schema = new Schema({ names: ['TestSchema'], fields: { 'value': 'Text' } });
            let arc = new Arc({ slotComposer: new SlotComposer({ rootContainer: 'test', affordance: 'mock' }), id: 'test' });
            let entity = new (schema.entityClass())({ value: 'hello world' });
            assert.isDefined(entity);
            let storage = yield arc.createStore(Type.newEntity(schema).collectionOf());
            let handle = handleFor(storage);
            yield handle.store(entity);
            let list = yield arc.findStoresByType(entity.constructor.type.collectionOf())[0].toList();
            let clone = list[0];
            assert.isDefined(clone);
            assert.deepEqual(clone.rawData, { value: 'hello world' });
            assert.notEqual(entity, clone);
        }));
    });
});
describe.skip('relation', function () {
    it('can be created, stored, and restored', function () {
        let Relation;
        let BasicEntity;
        let arc = new Arc({});
        let relation = new Relation(new BasicEntity('thing1'), new BasicEntity('thing2'));
        assert.isDefined(relation);
        arc.commit([relation]);
        let clone = arc.findStoresByType(relation.constructor.type.collectionOf())[0].toList()[0];
        assert.isDefined(clone);
        assert.equal(clone.entities[0].data, 'thing1');
        assert.notEqual(relation, clone);
    });
});
