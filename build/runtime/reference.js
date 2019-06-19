/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { handleFor } from './handle.js';
import { ReferenceType } from './type.js';
import { Entity } from './entity.js';
import { SYMBOL_INTERNALS } from './symbols.js';
var ReferenceMode;
(function (ReferenceMode) {
    ReferenceMode[ReferenceMode["Unstored"] = 0] = "Unstored";
    ReferenceMode[ReferenceMode["Stored"] = 1] = "Stored";
})(ReferenceMode || (ReferenceMode = {}));
export class Reference {
    constructor(data, type, context) {
        this.entity = null;
        this.storageProxy = null;
        this.handle = null;
        this.id = data.id;
        this.storageKey = data.storageKey;
        this.context = context;
        this.type = type;
        this[SYMBOL_INTERNALS] = {
            serialize: () => ({ id: this.id, rawData: this.dataClone() })
        };
    }
    async ensureStorageProxy() {
        if (this.storageProxy == null) {
            this.storageProxy = await this.context.getStorageProxy(this.storageKey, this.type.referredType);
            this.handle = handleFor(this.storageProxy, this.context.idGenerator);
            if (this.storageKey) {
                assert(this.storageKey === this.storageProxy.storageKey);
            }
            else {
                this.storageKey = this.storageProxy.storageKey;
            }
        }
    }
    async dereference() {
        assert(this.context, 'Must have context to dereference');
        if (this.entity) {
            return this.entity;
        }
        await this.ensureStorageProxy();
        this.entity = await this.handle.get(this.id);
        return this.entity;
    }
    dataClone() {
        return { storageKey: this.storageKey, id: this.id };
    }
}
/** A subclass of Reference that clients can create. */
export class ClientReference extends Reference {
    /** Use the newClientReference factory method instead. */
    constructor(entity, context) {
        // TODO(shans): start carrying storageKey information around on Entity objects
        super({ id: Entity.id(entity), storageKey: null }, new ReferenceType(Entity.entityClass(entity).type), context);
        this.mode = ReferenceMode.Unstored;
        this.entity = entity;
        this.stored = new Promise(async (resolve, reject) => {
            await this.storeReference(entity);
            resolve();
        });
    }
    async storeReference(entity) {
        await this.ensureStorageProxy();
        await this.handle.store(entity);
        this.mode = ReferenceMode.Stored;
    }
    async dereference() {
        if (this.mode === ReferenceMode.Unstored) {
            return null;
        }
        return super.dereference();
    }
    isIdentified() {
        return Entity.isIdentified(this.entity);
    }
    static newClientReference(context) {
        return class extends ClientReference {
            constructor(entity) {
                super(entity, context);
            }
        };
    }
}
//# sourceMappingURL=reference.js.map