// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert } from './chai-web.js';
import { CrdtCollectionModel } from '../storage/crdt-collection-model.js';
describe('crdt-collection-model', () => {
    it('can add values', () => __awaiter(this, void 0, void 0, function* () {
        let model = new CrdtCollectionModel();
        let effective = model.add('id', 'value', ['key1', 'key2']);
        assert.isTrue(effective);
        assert.equal(model.size, 1);
        assert.equal(model.getValue('id'), 'value');
        assert.sameMembers(model.getKeys('id'), ['key1', 'key2']);
    }));
    it('can remove values', () => __awaiter(this, void 0, void 0, function* () {
        let model = new CrdtCollectionModel();
        model.add('id', 'value', ['key1', 'key2']);
        let effective = model.remove('id', ['key1', 'key2']);
        assert.isTrue(effective);
        assert.equal(model.size, 0);
    }));
    it('treats add with different keys as idempotent', () => __awaiter(this, void 0, void 0, function* () {
        let model = new CrdtCollectionModel();
        model.add('id', 'value', ['key1']);
        let effective = model.add('id', 'value', ['key2']);
        assert.isFalse(effective);
        assert.equal(model.size, 1);
        assert.equal(model.getValue('id'), 'value');
        assert.sameMembers(model.getKeys('id'), ['key1', 'key2']);
    }));
    it('treats remove as idempotent', () => __awaiter(this, void 0, void 0, function* () {
        let model = new CrdtCollectionModel();
        model.add('id', 'value', ['key1', 'key2']);
        model.remove('id', ['key1', 'key2']);
        let effective = model.remove('id', ['key1', 'key2']);
        assert.isFalse(effective);
    }));
    it('doesnt treat value as removed until all keys are removed', () => __awaiter(this, void 0, void 0, function* () {
        let model = new CrdtCollectionModel();
        model.add('id', 'value', ['key1', 'key2']);
        let effective = model.remove('id', ['key1']);
        assert.isFalse(effective);
        assert.equal(model.size, 1);
        assert.sameMembers(model.getKeys('id'), ['key2']);
        effective = model.remove('id', ['key2']);
        assert.isTrue(effective);
        assert.equal(model.size, 0);
    }));
    it('allows a value to be updated', () => __awaiter(this, void 0, void 0, function* () {
        let model = new CrdtCollectionModel();
        model.add('id', 'value', ['key1', 'key2']);
        let effective = model.add('id', 'value2', ['key3']);
        assert.isTrue(effective);
        assert.equal(model.getValue('id'), 'value2');
    }));
    it('does not allow a value to be updated unless new keys are added', () => __awaiter(this, void 0, void 0, function* () {
        let model = new CrdtCollectionModel();
        model.add('id', 'value', ['key1', 'key2']);
        assert.throws(() => model.add('id', 'value2', ['key1'], /cannot add without new keys/));
    }));
    it('does not allow a value to be added without keys', () => __awaiter(this, void 0, void 0, function* () {
        let model = new CrdtCollectionModel();
        assert.throws(() => model.add('id', 'value', []), /add requires keys/);
    }));
    it('allows keys to be initialized empty', () => __awaiter(this, void 0, void 0, function* () {
        let model = new CrdtCollectionModel([
            { id: 'nokeys', 'value': 'value' },
            { id: 'keys', 'value': 'value', keys: ['key1'] },
        ]);
        assert.equal(model.size, 2);
        assert.isEmpty(model.getKeys('nokeys'));
        assert.sameMembers(model.getKeys('keys'), ['key1']);
        let effective = model.remove('nokeys', []);
        assert.isTrue(effective);
        assert(model.size, 1);
    }));
});
