// @
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
import { assert } from '../../platform/assert-web.js';
import { Tracing } from '../../tracelib/trace.js';
import * as util from '../recipe/util.js';
export class StorageProviderBase {
    constructor(type, name, id, key) {
        assert(id, 'id must be provided when constructing StorageProviders');
        assert(!type.hasUnresolvedVariable, 'Storage types must be concrete');
        let trace = Tracing.start({ cat: 'handle', name: 'StorageProviderBase::constructor', args: { type: type.key, name: name } });
        this._type = type;
        this._listeners = new Map();
        this.name = name;
        this._version = 0;
        this.id = id;
        this.source = null;
        this._storageKey = key;
        this._nextLocalID = 0;
        trace.end();
    }
    get storageKey() {
        return this._storageKey;
    }
    generateID() {
        return `${this.id}:${this._nextLocalID++}`;
    }
    generateIDComponents() {
        return { base: this.id, component: () => this._nextLocalID++ };
    }
    get type() {
        return this._type;
    }
    // TODO: add 'once' which returns a promise.
    on(kind, callback, target) {
        assert(target !== undefined, 'must provide a target to register a storage event handler');
        let listeners = this._listeners.get(kind) || new Map();
        listeners.set(callback, { target });
        this._listeners.set(kind, listeners);
    }
    // TODO: rename to _fireAsync so it's clear that callers are not re-entrant.
    _fire(kind, details) {
        return __awaiter(this, void 0, void 0, function* () {
            let listenerMap = this._listeners.get(kind);
            if (!listenerMap || listenerMap.size == 0)
                return;
            let trace = Tracing.start({ cat: 'handle', name: 'StorageProviderBase::_fire', args: { kind, type: this._type.key,
                    name: this.name, listeners: listenerMap.size } });
            let callbacks = [];
            for (let [callback] of listenerMap.entries()) {
                callbacks.push(callback);
            }
            // Yield so that event firing is not re-entrant with mutation.
            yield trace.wait(0);
            for (let callback of callbacks) {
                callback(details);
            }
            trace.end();
        });
    }
    _compareTo(other) {
        let cmp;
        if ((cmp = util.compareStrings(this.name, other.name)) != 0)
            return cmp;
        if ((cmp = util.compareNumbers(this._version, other._version)) != 0)
            return cmp;
        if ((cmp = util.compareStrings(this.source, other.source)) != 0)
            return cmp;
        if ((cmp = util.compareStrings(this.id, other.id)) != 0)
            return cmp;
        return 0;
    }
    toString(handleTags) {
        let results = [];
        let handleStr = [];
        handleStr.push(`store`);
        if (this.name) {
            handleStr.push(`${this.name}`);
        }
        handleStr.push(`of ${this.type.toString()}`);
        if (this.id) {
            handleStr.push(`'${this.id}'`);
        }
        if (handleTags && handleTags.length) {
            handleStr.push(`${[...handleTags].join(' ')}`);
        }
        if (this.source) {
            handleStr.push(`in '${this.source}'`);
        }
        results.push(handleStr.join(' '));
        if (this.description)
            results.push(`  description \`${this.description}\``);
        return results.join('\n');
    }
    get apiChannelMappingId() {
        return this.id;
    }
}
