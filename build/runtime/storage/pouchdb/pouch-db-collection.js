import { assert } from '../../../platform/assert-web.js';
import { CrdtCollectionModel } from '../crdt-collection-model.js';
import { ChangeEvent } from '../storage-provider-base.js';
import { PouchDbStorageProvider } from './pouch-db-storage-provider.js';
export class PouchDbCollection extends PouchDbStorageProvider {
    /**
     * Create a new PouchDbCollection.
     *
     * @param type the underlying type for this collection.
     * @param storageEngine a reference back to the PouchDbStorage, used for baseStorageKey calls.
     * @param name appears unused.
     * @param id see base class.
     * @param key the storage key for this collection.
     */
    constructor(type, storageEngine, name, id, key) {
        super(type, storageEngine, name, id, key);
        this._model = new CrdtCollectionModel();
        this.initialized = new Promise(resolve => this.resolveInitialized = resolve);
        // Ensure that the underlying database item is created.
        this.db.get(this.pouchDbKey.location).then(() => {
            this.resolveInitialized();
        }).catch((err) => {
            if (err.name === 'not_found') {
                this.db.put({
                    _id: this.pouchDbKey.location,
                    model: this._model.toLiteral(),
                    referenceMode: null,
                    type: this.type.toLiteral()
                }).then(() => {
                    this.version = 0;
                    this.resolveInitialized();
                }).catch((e) => {
                    // should throw something?
                    console.warn('error init', e);
                });
            }
        });
        assert(this.version !== null);
    }
    /** @inheritDoc */
    backingType() {
        return this.type.getContainedType();
    }
    // TODO(lindner): write tests
    clone() {
        const handle = new PouchDbCollection(this.type, this.storageEngine, this.name, this.id, null);
        handle.cloneFrom(this); // async?
        return handle;
    }
    // TODO(lindner): this should be a static constructor
    // TODO(lindner): don't allow this to run on items with data...
    async cloneFrom(handle) {
        await this.initialized;
        this.referenceMode = handle.referenceMode;
        const literal = await handle.toLiteral();
        if (this.referenceMode && literal.model.length > 0) {
            await Promise.all([this.ensureBackingStore(), handle.ensureBackingStore()]);
            literal.model = literal.model.map(({ id, value }) => ({ id, value: { id: value.id, storageKey: this.backingStore.storageKey } }));
            const underlying = await handle.backingStore.getMultiple(literal.model.map(({ id }) => id));
            await this.backingStore.storeMultiple(underlying, [this.storageKey]);
        }
        const updatedCrdtModel = new CrdtCollectionModel(literal.model);
        await this.getModelAndUpdate(crdtmodel => updatedCrdtModel);
        const updatedCrdtModelLiteral = updatedCrdtModel.toLiteral();
        const dataToFire = updatedCrdtModelLiteral.length === 0 ? null : updatedCrdtModelLiteral[0].value;
        this._fire('change', new ChangeEvent({ data: dataToFire, version: this.version }));
    }
    /** @inheritDoc */
    async modelForSynchronization() {
        await this.initialized;
        // TODO(lindner): should this change for reference mode??
        return {
            version: this.version,
            model: await this._toList()
        };
    }
    /** @inheritDoc */
    // Returns {version, model: [{id, value, keys: []}]}
    // TODO(lindner): this is async, but the base class isn't....
    async toLiteral() {
        await this.initialized;
        return {
            version: this.version,
            model: (await this.getModel()).toLiteral()
        };
    }
    async _toList() {
        if (this.referenceMode) {
            const items = (await this.getModel()).toLiteral();
            if (items.length === 0) {
                return [];
            }
            const refSet = new Set();
            items.forEach(item => refSet.add(item.value.storageKey));
            assert(refSet.size === 1, `multiple storageKeys in reference set of collection not yet supported.`);
            const ref = refSet.values().next().value;
            await this.ensureBackingStore();
            // Get id strings and corresponding backingStore values
            const ids = items.map(item => item.value.id);
            const backingStoreValues = await this.backingStore.getMultiple(ids);
            // merge items/backingStoreValues into retval
            const retval = [];
            for (const item of items) {
                // backingStoreValues corresponds to each
                const backingStoreValue = backingStoreValues.shift();
                retval.push({ id: item.value.id, value: backingStoreValue, keys: item.keys });
            }
            return retval;
        }
        // !this.referenceMode
        return (await this.getModel()).toLiteral();
    }
    async toList() {
        await this.initialized;
        return (await this._toList()).map(item => item.value);
    }
    /**
     * Returns an array of values for each of the specified ids.
     *
     * @param ids items to fetch from the underlying CRDT model.
     * @return an array of values from the underlying CRDT
     */
    async getMultiple(ids) {
        await this.initialized;
        assert(!this.referenceMode, 'getMultiple not implemented for referenceMode stores');
        const model = await this.getModel();
        return ids.map(id => model.getValue(id));
    }
    /**
     * Store multiple values with the given keys in the Collection.
     * TODO(lindner): document originatorId, which is unused.
     */
    async storeMultiple(values, keys, originatorId = null) {
        await this.initialized;
        assert(!this.referenceMode, 'storeMultiple not implemented for referenceMode stores');
        this.getModelAndUpdate(crdtmodel => {
            values.map(value => crdtmodel.add(value.id, value, keys));
            return crdtmodel;
        });
        // fire?
    }
    /**
     * Get a specific Id value previously set using store().
     *
     * @remarks Note that the id referred to here is not the same as
     * used in the constructor.
     */
    async get(id) {
        await this.initialized;
        if (this.referenceMode) {
            const ref = (await this.getModel()).getValue(id);
            // NOTE(wkorman): Firebase returns null if ref is null, but it's not clear
            // that we ever want to return a null value for a get, so for Pouch we
            // choose to assert instead at least for the time being.
            assert(ref !== null, `no reference for id [id=${id}, collection.id=${this.id}, storageKey=${this._storageKey}, referenceMode=${this.referenceMode}].`);
            await this.ensureBackingStore();
            const backedValue = await this.backingStore.get(ref.id);
            assert(backedValue !== null, `should never return a null entity value [ref.id=${ref.id}, collection.id=${this.id}, storageKey=${this._storageKey}, referenceMode=${this.referenceMode}].`);
            return backedValue;
        }
        const model = await this.getModel();
        const modelValue = model.getValue(id);
        assert(modelValue !== null, `should never return a null entity value [id=${id}, collection.id=${this.id}, storageKey=${this._storageKey}, referenceMode=${this.referenceMode}].`);
        return modelValue;
    }
    /**
     * Store the specific value to the collection.  Value must include an id entry.
     *
     * @param value A data object with an id entry that is used as a key.
     * @param keys The CRDT keys used to store this object
     * @param originatorId TBD passed to event listeners
     */
    async store(value, keys, originatorId = null) {
        await this.initialized;
        assert(keys != null && keys.length > 0, 'keys required');
        const id = value.id;
        // item contains data that is passed to _fire
        const item = { value, keys, effective: false };
        if (this.referenceMode) {
            const referredType = this.type.getContainedType();
            const storageKey = this.storageEngine.baseStorageKey(referredType, this.storageKey);
            // Update the referred data
            await this.getModelAndUpdate(crdtmodel => {
                item.effective = crdtmodel.add(value.id, { id: value.id, storageKey }, keys);
                return crdtmodel;
            });
            await this.ensureBackingStore();
            await this.backingStore.store(value, keys);
        }
        else {
            await this.getModelAndUpdate(crdtmodel => {
                // check for existing keys?
                item.effective = crdtmodel.add(value.id, value, keys);
                return crdtmodel;
            });
        }
        this.version++;
        // Notify Listeners
        this._fire('change', new ChangeEvent({ add: [item], version: this.version, originatorId }));
    }
    async removeMultiple(items, originatorId = null) {
        await this.initialized;
        await this.getModelAndUpdate(crdtmodel => {
            if (items.length === 0) {
                items = crdtmodel.toList().map(item => ({ id: item.id, keys: [] }));
            }
            items.forEach(item => {
                if (item.keys.length === 0) {
                    item.keys = crdtmodel.getKeys(item.id);
                }
                item.value = crdtmodel.getValue(item.id);
                if (item.value !== null) {
                    item.effective = crdtmodel.remove(item.id, item.keys);
                }
            });
            return crdtmodel;
        }).then(() => {
            this._fire('change', new ChangeEvent({ remove: items, version: this.version, originatorId }));
        });
    }
    /**
     * Remove ids from a collection for specific keys.
     * @param id the id to remove.
     * @param keys the CRDT specific keys to remove.
     * @param originatorId TBD passed to event listeners.
     */
    async remove(id, keys = [], originatorId = null) {
        await this.initialized;
        await this.getModelAndUpdate(crdtmodel => {
            if (keys.length === 0) {
                keys = crdtmodel.getKeys(id);
            }
            const value = crdtmodel.getValue(id);
            if (value !== null) {
                const effective = crdtmodel.remove(id, keys);
                // TODO(lindner): isolate side effects...
                this.version++;
                this._fire('change', new ChangeEvent({ remove: [{ value, keys, effective }], version: this.version, originatorId }));
            }
            return crdtmodel;
        });
    }
    /**
     * Triggered when the storage key has been modified.  For now we
     * just refetch and trigger listeners.  This is fast since the data
     * is synced locally.
     */
    onRemoteStateSynced(doc) {
        // updates internal state
        const previousRev = this._rev;
        const previousModel = this._model;
        if (this._rev === doc._rev) {
            return;
        }
        // remote revision is different, update local copy.
        const model = doc.model;
        this._model = new CrdtCollectionModel(model);
        this._rev = doc._rev;
        this.version++;
        // TODO(lindner): handle referenceMode
        // TODO(lindner): calculate added/removed keys from previousModel/model
        // TODO(lindner): fire change events here?
        //   this._fire('change', new ChangeEvent({add, remove, version: this.version}));
    }
    /**
     * Updates the local model cache from PouchDB and returns the CRDT
     * model for use.
     */
    async getModel() {
        try {
            const result = await this.db.get(this.pouchDbKey.location);
            // compare revisions
            if (this._rev !== result._rev) {
                // remote revision is different, update local copy.
                this._model = new CrdtCollectionModel(result['model']);
                this._rev = result._rev;
                this.version++; // yuck.
                // TODO(lindner): fire change events here?
            }
        }
        catch (err) {
            if (err.name === 'not_found') {
                this._model = new CrdtCollectionModel();
                this._rev = undefined;
            }
            else {
                console.warn('PouchDbCollection.getModel err=', err);
                throw err;
            }
        }
        return this._model;
    }
    /**
     * Provides a way to apply changes to the model in a way that will result in the
     * crdt being written to the underlying PouchDB.
     *
     * - A new entry is stored if it doesn't exist.
     * - If the existing entry is available it is fetched and the
     *   internal state is updated.
     * - A copy of the CRDT model is passed to the modelMutator, which may change it.
     * - If the model is mutated by `modelMutator`, write a new revision and update the local
     *   cached copy.
     *
     * @param modelMutator allows for modifying a copy of the underlying crdt model.
     */
    async getModelAndUpdate(modelMutator) {
        // Keep retrying the operation until it succeeds.
        while (1) {
            // TODO(lindner): add backoff and error out if this goes on for too long
            let doc;
            let notFound = false;
            try {
                doc = await this.db.get(this.pouchDbKey.location);
                // Check remote doc.
                // TODO(lindner): refactor with getModel above.
                if (this._rev !== doc._rev) {
                    // remote revision is different, update local copy.
                    this._model = new CrdtCollectionModel(doc.model);
                    this._rev = doc._rev;
                    // referenceMode is set to null for stub entries.
                    if (doc.referenceMode != null) {
                        this.referenceMode = doc.referenceMode;
                    }
                    this.bumpVersion(doc.version);
                    // TODO(lindner): fire change events here?
                }
            }
            catch (err) {
                if (err.name !== 'not_found') {
                    throw err;
                }
                notFound = true;
                // setup basic doc, model/version updated below.
                doc = {
                    _id: this.pouchDbKey.location,
                    referenceMode: this.referenceMode,
                    type: this.type.toLiteral(),
                    model: null,
                    version: null,
                    _rev: null,
                };
            }
            // Run the mutator on a copy of the existing model
            // TODO(lindner): check about how many times we call toLiteral here.
            const newModel = modelMutator(new CrdtCollectionModel(this._model.toLiteral()));
            // Check if the mutator made any changes..
            // TODO(lindner): consider changing the api to let the mutator tell us if changes were made.
            if (!notFound && JSON.stringify(this._model.toLiteral()) === JSON.stringify(newModel.toLiteral())) {
                // mutator didn't make any changes.
                return this._model;
            }
            // Apply changes made by the mutator
            doc.model = newModel.toLiteral();
            doc.version = this.version;
            // Update on pouchdb
            try {
                const putResult = await this.db.put(doc);
                // success! update local with new model
                this._rev = putResult.rev;
                this._model = newModel;
                return this._model;
            }
            catch (err) {
                if (err.name === 'conflict') {
                    // keep trying;
                }
                else {
                    // failed to write new doc, give up.
                    console.warn('PouchDbCollection.getModelAndUpdate (err,doc)=', err, doc);
                    throw err;
                }
            }
        } // end while (1)
        // can never get here..
        return null;
    }
    /**
     * Remove this item from the database for testing purposes.
     */
    async clearItemsForTesting() {
        await this.initialized;
        // Remove the Pouch Document
        // TODO(lindner): does this need to work with reference mode?
        try {
            const doc = await this.db.get(this.pouchDbKey.location);
            await this.db.remove(doc);
        }
        catch (err) {
            if (err.name !== 'not_found') {
                console.warn('clearItemsForTesting: error removing', err);
            }
        }
        this._model = new CrdtCollectionModel();
        this._rev = undefined;
    }
}
//# sourceMappingURL=pouch-db-collection.js.map