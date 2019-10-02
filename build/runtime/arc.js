/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { FakePecFactory } from './fake-pec-factory.js';
import { Id, IdGenerator, ArcId } from './id.js';
import { Manifest } from './manifest.js';
import { Modality } from './modality.js';
import { ParticleExecutionHost } from './particle-execution-host.js';
import { StorageStub } from './storage-stub.js';
import { Handle } from './recipe/handle.js';
import { Recipe } from './recipe/recipe.js';
import { compareComparables } from './recipe/comparable.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
import { StorageProviderFactory } from './storage/storage-provider-factory.js';
import { ArcType, CollectionType, EntityType, InterfaceType, RelationType, Type, TypeVariable } from './type.js';
import { Mutex } from './mutex.js';
import { Runtime } from './runtime.js';
import { VolatileMemory, VolatileStorageDriverProvider } from './storageNG/drivers/volatile.js';
import { DriverFactory, Exists } from './storageNG/drivers/driver-factory.js';
import { Store } from './storageNG/store.js';
export class Arc {
    constructor({ id, context, pecFactories, slotComposer, loader, storageKey, storageProviderFactory, speculative, innerArc, stub, inspectorFactory }) {
        this._activeRecipe = new Recipe();
        this._recipeDeltas = [];
        this.dataChangeCallbacks = new Map();
        // All the stores, mapped by store ID
        this.storesById = new Map();
        // storage keys for referenced handles
        this.storageKeys = {};
        // Map from each store to a set of tags. public for debug access
        this.storeTags = new Map();
        // Map from each store to its description (originating in the manifest).
        this.storeDescriptions = new Map();
        this.innerArcsByParticle = new Map();
        this.instantiateMutex = new Mutex();
        this.idGenerator = IdGenerator.newSession();
        this.loadedParticleInfo = new Map();
        // Volatile storage local to this Arc instance.
        this.volatileMemory = new VolatileMemory();
        // TODO: context should not be optional.
        this._context = context || new Manifest({ id });
        // TODO: pecFactories should not be optional. update all callers and fix here.
        this.pecFactories = pecFactories && pecFactories.length > 0 ? pecFactories.slice() : [FakePecFactory(loader).bind(null)];
        // TODO(sjmiles): FIXME: currently some UiBrokers need to recover arc from composer in order to forward events
        if (slotComposer && !slotComposer['arc']) {
            slotComposer['arc'] = this;
        }
        if (typeof id === 'string') {
            // TODO(csilvestrini): Replace this warning with an exception.
            console.error(`Arc created with string ID ${id}!!! This should be an object of type Id instead. This warning will turn into an ` +
                `exception soon (end of April 2019).`);
            this.id = ArcId.fromString(id);
        }
        else {
            this.id = id;
        }
        this.isSpeculative = !!speculative; // undefined => false
        this.isInnerArc = !!innerArc; // undefined => false
        this.isStub = !!stub;
        this._loader = loader;
        this.inspectorFactory = inspectorFactory;
        this.inspector = inspectorFactory && inspectorFactory.create(this);
        this.storageKey = storageKey;
        const ports = this.pecFactories.map(f => f(this.generateID(), this.idGenerator));
        this.pec = new ParticleExecutionHost(slotComposer, this, ports);
        this.storageProviderFactory = storageProviderFactory || new StorageProviderFactory(this.id);
        this.volatileStorageDriverProvider = new VolatileStorageDriverProvider(this);
        DriverFactory.register(this.volatileStorageDriverProvider);
    }
    get loader() {
        return this._loader;
    }
    get modality() {
        if (this.pec.slotComposer && this.pec.slotComposer.modality) {
            return this.pec.slotComposer.modality;
        }
        if (!this.activeRecipe.isEmpty()) {
            return this.activeRecipe.modality;
        }
        return Modality.union(this.context.allRecipes.map(recipe => recipe.modality));
    }
    dispose() {
        for (const innerArc of this.innerArcs) {
            innerArc.dispose();
        }
        // TODO: disconnect all associated store event handlers
        this.pec.stop();
        this.pec.close();
        // Slot contexts and consumers from inner and outer arcs can be interwoven. Slot composer
        // is therefore disposed in its entirety with an outer Arc's disposal.
        if (!this.isInnerArc && this.pec.slotComposer) {
            // Just a sanity check that we're not disposing a SlotComposer used by some other arc.
            const allArcs = this.allDescendingArcs;
            this.pec.slotComposer.consumers.forEach(consumer => assert(allArcs.includes(consumer.arc)));
            this.pec.slotComposer.dispose();
        }
        DriverFactory.unregister(this.volatileStorageDriverProvider);
        for (const store of this._stores) {
            Runtime.getRuntime().unregisterStore(store.id, [...this.findStoreTags(store)]);
        }
    }
    // Returns a promise that spins sending a single `AwaitIdle` message until it
    // sees no other messages were sent.
    async _waitForIdle() {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const messageCount = this.pec.messageCount;
            const innerArcs = this.innerArcs;
            // tslint:disable-next-line: no-any
            await Promise.all([this.pec.idle, ...innerArcs.map(async (arc) => arc.idle)]);
            // We're idle if no new inner arcs appeared and this.pec had exactly 2 messages,
            // one requesting the idle status, and one answering it.
            if (this.innerArcs.length === innerArcs.length
                && this.pec.messageCount === messageCount + 2)
                break;
        }
    }
    get idle() {
        if (this.waitForIdlePromise) {
            return this.waitForIdlePromise;
        }
        // Store one active completion promise for use by any subsequent callers.
        // We explicitly want to avoid, for example, multiple simultaneous
        // attempts to identify idle state each sending their own `AwaitIdle`
        // message and expecting settlement that will never arrive.
        const promise = this._waitForIdle().then(() => this.waitForIdlePromise = null);
        this.waitForIdlePromise = promise;
        return promise;
    }
    findInnerArcs(particle) {
        return this.innerArcsByParticle.get(particle) || [];
    }
    // Inner arcs of this arc's transformation particles.
    // Does *not* include inner arcs of this arc's inner arcs.
    get innerArcs() {
        return [].concat(...this.innerArcsByParticle.values());
    }
    // This arc and all its descendants.
    // *Does* include inner arcs of this arc's inner arcs.
    get allDescendingArcs() {
        return [this].concat(...this.innerArcs.map(arc => arc.allDescendingArcs));
    }
    createInnerArc(transformationParticle) {
        const id = this.generateID('inner');
        const innerArc = new Arc({ id, pecFactories: this.pecFactories, slotComposer: this.pec.slotComposer, loader: this._loader, context: this.context, innerArc: true, speculative: this.isSpeculative, inspectorFactory: this.inspectorFactory });
        let particleInnerArcs = this.innerArcsByParticle.get(transformationParticle);
        if (!particleInnerArcs) {
            particleInnerArcs = [];
            this.innerArcsByParticle.set(transformationParticle, particleInnerArcs);
        }
        particleInnerArcs.push(innerArc);
        return innerArc;
    }
    async _serializeStore(store, context, id) {
        const type = store.type.getContainedType() || store.type;
        if (type instanceof InterfaceType) {
            context.interfaces += type.interfaceInfo.toString() + '\n';
        }
        let key;
        if (typeof store.storageKey === 'string') {
            key = this.storageProviderFactory.parseStringAsKey(store.storageKey);
        }
        else {
            key = store.storageKey;
        }
        const tags = this.storeTags.get(store) || new Set();
        const handleTags = [...tags].map(a => `#${a}`).join(' ');
        const actualHandle = this.activeRecipe.findHandle(store.id);
        const originalId = actualHandle ? actualHandle.originalId : null;
        let combinedId = `'${store.id}'`;
        if (originalId) {
            combinedId += `!!'${originalId}'`;
        }
        switch (key.protocol) {
            case 'firebase':
            case 'pouchdb':
                context.handles += `store ${id} of ${store.type.toString()} ${combinedId} @${store.version === null ? 0 : store.version} ${handleTags} at '${store.storageKey}'\n`;
                break;
            case 'volatile': {
                // TODO(sjmiles): emit empty data for stores marked `volatile`: shell will supply data
                const volatile = handleTags.includes('volatile');
                let serializedData = [];
                if (!volatile) {
                    // TODO: include keys in serialized [big]collections?
                    serializedData = (await store.toLiteral()).model.map((model) => {
                        const { id, value } = model;
                        const index = model['index']; // TODO: Invalid Type
                        if (value == null) {
                            return null;
                        }
                        let result;
                        if (value.rawData) {
                            result = { $id: id };
                            for (const field of Object.keys(value.rawData)) {
                                result[field] = value.rawData[field];
                            }
                        }
                        else {
                            result = value;
                        }
                        if (index !== undefined) {
                            result.$index = index;
                        }
                        return result;
                    });
                }
                if (store.referenceMode && serializedData.length > 0) {
                    const storageKey = serializedData[0].storageKey;
                    if (!context.dataResources.has(storageKey)) {
                        const storeId = `${id}_Data`;
                        context.dataResources.set(storageKey, storeId);
                        // TODO: can't just reach into the store for the backing Store like this, should be an
                        // accessor that loads-on-demand in the storage objects.
                        if (store instanceof StorageProviderBase) {
                            await store.ensureBackingStore();
                            await this._serializeStore(store.backingStore, context, storeId);
                        }
                    }
                    const storeId = context.dataResources.get(storageKey);
                    serializedData.forEach(a => { a.storageKey = storeId; });
                }
                const indent = '  ';
                const data = JSON.stringify(serializedData);
                context.resources += `resource ${id}Resource\n`
                    + indent + 'start\n'
                    + data.split('\n').map(line => indent + line).join('\n')
                    + '\n';
                context.handles += `store ${id} of ${store.type.toString()} ${combinedId} @${store.version || 0} ${handleTags} in ${id}Resource\n`;
                break;
            }
            default:
                throw new Error(`unknown storageKey protocol ${key.protocol}`);
        }
    }
    async _serializeHandles() {
        const context = { handles: '', resources: '', interfaces: '', dataResources: new Map() };
        let id = 0;
        const importSet = new Set();
        const handlesToSerialize = new Set();
        const contextSet = new Set(this.context.stores.map(store => store.id));
        for (const handle of this._activeRecipe.handles) {
            if (handle.fate === 'map') {
                importSet.add(this.context.findManifestUrlForHandleId(handle.id));
            }
            else {
                // Immediate value handles have values inlined in the recipe and are not serialized.
                if (handle.immediateValue)
                    continue;
                handlesToSerialize.add(handle.id);
            }
        }
        for (const url of importSet.values()) {
            context.resources += `import '${url}'\n`;
        }
        for (const store of this._stores) {
            if (!handlesToSerialize.has(store.id) || contextSet.has(store.id)) {
                continue;
            }
            await this._serializeStore(store, context, `Store${id++}`);
        }
        return context.resources + context.interfaces + context.handles;
    }
    _serializeParticles() {
        const particleSpecs = [];
        // Particles used directly.
        particleSpecs.push(...this._activeRecipe.particles.map(entry => entry.spec));
        // Particles referenced in an immediate mode.
        particleSpecs.push(...this._activeRecipe.handles
            .filter(h => h.immediateValue)
            .map(h => h.immediateValue));
        const results = [];
        particleSpecs.forEach(spec => {
            for (const connection of spec.handleConnections) {
                if (connection.type instanceof InterfaceType) {
                    results.push(connection.type.interfaceInfo.toString());
                }
            }
            results.push(spec.toString());
        });
        return results.join('\n');
    }
    _serializeStorageKey() {
        if (this.storageKey) {
            return `storageKey: '${this.storageKey}'\n`;
        }
        return '';
    }
    async serialize() {
        await this.idle;
        return `
meta
  name: '${this.id}'
  ${this._serializeStorageKey()}

${await this._serializeHandles()}

${this._serializeParticles()}

@active
${this.activeRecipe.toString()}`;
    }
    // Writes `serialization` to the ArcInfo child key under the Arc's storageKey.
    // This does not directly use serialize() as callers may want to modify the
    // contents of the serialized arc before persisting.
    async persistSerialization(serialization) {
        const storage = this.storageProviderFactory;
        let key;
        if (typeof this.storageKey === 'string') {
            key = storage.parseStringAsKey(this.storageKey).childKeyForArcInfo();
        }
        else {
            key = this.storageKey.childKeyForArcInfo();
        }
        const arcInfoType = new ArcType();
        const store = await storage.connectOrConstruct('store', arcInfoType, key.toString());
        store.referenceMode = false;
        // TODO: storage refactor: make sure set() is available here (or wrap store in a Handle-like adaptor).
        await store.set(arcInfoType.newInstance(this.id, serialization));
    }
    static async deserialize({ serialization, pecFactories, slotComposer, loader, fileName, context, inspectorFactory }) {
        const manifest = await Manifest.parse(serialization, { loader, fileName, context });
        const arc = new Arc({
            id: Id.fromString(manifest.meta.name),
            storageKey: manifest.meta.storageKey,
            slotComposer,
            pecFactories,
            loader,
            storageProviderFactory: manifest.storageProviderFactory,
            context,
            inspectorFactory
        });
        await Promise.all(manifest.stores.map(async (storeStub) => {
            const tags = manifest.storeTags.get(storeStub);
            const store = await storeStub.inflate();
            arc._registerStore(store, tags);
        }));
        const recipe = manifest.activeRecipe.clone();
        const options = { errors: new Map() };
        assert(recipe.normalize(options), `Couldn't normalize recipe ${recipe.toString()}:\n${[...options.errors.values()].join('\n')}`);
        await arc.instantiate(recipe);
        return arc;
    }
    get context() {
        return this._context;
    }
    get activeRecipe() { return this._activeRecipe; }
    get allRecipes() { return [this.activeRecipe].concat(this.context.allRecipes); }
    get recipes() { return [this.activeRecipe]; }
    get recipeDeltas() { return this._recipeDeltas; }
    loadedParticleSpecs() {
        return [...this.loadedParticleInfo.values()].map(({ spec }) => spec);
    }
    async reinstantiateParticle(recipeParticle) {
        const info = await this._getParticleInstantiationInfo(recipeParticle);
        this.pec.reinstantiate(recipeParticle, info.stores);
    }
    async _instantiateParticle(recipeParticle) {
        if (!recipeParticle.id) {
            recipeParticle.id = this.generateID('particle');
        }
        const info = await this._getParticleInstantiationInfo(recipeParticle);
        this.pec.instantiate(recipeParticle, info.stores);
    }
    async _getParticleInstantiationInfo(recipeParticle) {
        const info = { spec: recipeParticle.spec, stores: new Map() };
        this.loadedParticleInfo.set(recipeParticle.id.toString(), info);
        // if supported, provide particle caching via a BlobUrl representing spec.implFile
        if (!recipeParticle.isJavaParticle()) {
            await this._provisionSpecUrl(recipeParticle.spec);
        }
        for (const [name, connection] of Object.entries(recipeParticle.connections)) {
            if (connection.handle.fate !== '`slot') {
                const store = this.findStoreById(connection.handle.id);
                assert(store, `can't find store of id ${connection.handle.id}`);
                assert(info.spec.handleConnectionMap.get(name) !== undefined, 'can\'t connect handle to a connection that doesn\'t exist');
                info.stores.set(name, store);
            }
        }
        return info;
    }
    async _provisionSpecUrl(spec) {
        if (!spec.implBlobUrl) {
            // if supported, construct spec.implBlobUrl for spec.implFile
            if (this.loader && this.loader['provisionObjectUrl']) {
                const url = await this.loader['provisionObjectUrl'](spec.implFile);
                if (url) {
                    spec.setImplBlobUrl(url);
                }
                else {
                    throw new Error(`Expected url for ${spec.implFile} but got ${url}`);
                }
            }
        }
    }
    generateID(component = '') {
        return this.idGenerator.newChildId(this.id, component);
    }
    get _stores() {
        return [...this.storesById.values()];
    }
    // Makes a copy of the arc used for speculative execution.
    async cloneForSpeculativeExecution() {
        const arc = new Arc({ id: this.generateID(),
            pecFactories: this.pecFactories,
            context: this.context,
            loader: this._loader,
            speculative: true,
            innerArc: this.isInnerArc,
            inspectorFactory: this.inspectorFactory });
        const storeMap = new Map();
        for (const store of this._stores) {
            const clone = await arc.storageProviderFactory.construct(store.id, store.type, 'volatile');
            await clone.cloneFrom(store);
            storeMap.set(store, clone);
            if (this.storeDescriptions.has(store)) {
                arc.storeDescriptions.set(clone, this.storeDescriptions.get(store));
            }
        }
        this.loadedParticleInfo.forEach((info, id) => {
            const stores = new Map();
            info.stores.forEach((store, name) => stores.set(name, storeMap.get(store)));
            arc.loadedParticleInfo.set(id, { spec: info.spec, stores });
        });
        const { cloneMap } = this._activeRecipe.mergeInto(arc._activeRecipe);
        this._recipeDeltas.forEach(recipe => arc._recipeDeltas.push({
            particles: recipe.particles.map(p => cloneMap.get(p)),
            handles: recipe.handles.map(h => cloneMap.get(h)),
            slots: recipe.slots.map(s => cloneMap.get(s)),
            patterns: recipe.patterns
        }));
        for (const [particle, innerArcs] of this.innerArcsByParticle.entries()) {
            arc.innerArcsByParticle.set(cloneMap.get(particle), await Promise.all(innerArcs.map(async (arc) => arc.cloneForSpeculativeExecution())));
        }
        for (const v of storeMap.values()) {
            // FIXME: Tags
            arc._registerStore(v, []);
        }
        return arc;
    }
    /**
     * Instantiates the given recipe in the Arc.
     *
     * Executes the following steps:
     *
     * - Merges the recipe into the Active Recipe
     * - Populates missing slots.
     * - Processes the Handles and creates stores for them.
     * - Instantiates the new Particles
     * - Passes these particles for initialization in the PEC
     *
     * Waits for completion of an existing Instantiate before returning.
     */
    async instantiate(recipe) {
        assert(recipe.isResolved(), `Cannot instantiate an unresolved recipe: ${recipe.toString({ showUnresolved: true })}`);
        assert(recipe.isCompatible(this.modality), `Cannot instantiate recipe ${recipe.toString()} with [${recipe.modality.names}] modalities in '${this.modality.names}' arc`);
        const release = await this.instantiateMutex.acquire();
        try {
            await this._doInstantiate(recipe);
        }
        finally {
            release();
        }
    }
    async mergeIntoActiveRecipe(recipe) {
        const { handles, particles, slots } = recipe.mergeInto(this._activeRecipe);
        this._recipeDeltas.push({ particles, handles, slots, patterns: recipe.patterns });
        // TODO(mmandlis, jopra): Get rid of populating the missing local slot & slandle IDs here,
        // it should be done at planning stage.
        slots.forEach(slot => slot.id = slot.id || this.generateID('slot').toString());
        handles.forEach(handle => {
            if (handle.toSlot()) {
                handle.id = handle.id || this.generateID('slandle').toString();
            }
        });
        for (const recipeHandle of handles) {
            const store = this.context.findStoreById(recipeHandle.id);
            // TODO(sjmiles): I added `(store instanceof StorageStub)` clause below because the context generators used
            // in shells/* work today by creating and updating inflated stores in the context.
            if (['copy', 'create'].includes(recipeHandle.fate) ||
                ((recipeHandle.fate === 'map')
                    && (store instanceof StorageStub)
                    && store.isBackedByManifest())) {
                let type = recipeHandle.type;
                if (recipeHandle.fate === 'create') {
                    assert(type.maybeEnsureResolved(), `Can't assign resolved type to ${type}`);
                }
                type = type.resolvedType();
                assert(type.isResolved(), `Can't create handle for unresolved type ${type}`);
                const newStore = await this.createStore(type, /* name= */ null, this.generateID().toString(), recipeHandle.tags, recipeHandle.immediateValue ? 'volatile' : null);
                if (recipeHandle.immediateValue) {
                    const particleSpec = recipeHandle.immediateValue;
                    const type = recipeHandle.type;
                    assert(type instanceof InterfaceType && type.interfaceInfo.particleMatches(particleSpec));
                    const particleClone = particleSpec.clone().toLiteral();
                    particleClone.id = newStore.id;
                    // TODO(shans): clean this up when we have interfaces for Singleton, Collection, etc.
                    // tslint:disable-next-line: no-any
                    await newStore.set(particleClone);
                }
                else if (['copy', 'map'].includes(recipeHandle.fate)) {
                    const copiedStoreRef = this.context.findStoreById(recipeHandle.id);
                    const copiedStore = await copiedStoreRef.inflate(this.storageProviderFactory);
                    assert(copiedStore, `Cannot find store ${recipeHandle.id}`);
                    assert(copiedStore.version !== null, `Copied store ${recipeHandle.id} doesn't have version.`);
                    await newStore.cloneFrom(copiedStore);
                    this._tagStore(newStore, this.context.findStoreTags(copiedStoreRef));
                    newStore.name = copiedStore.name && `Copy of ${copiedStore.name}`;
                    const copiedStoreDesc = this.getStoreDescription(copiedStore);
                    if (copiedStoreDesc) {
                        this.storeDescriptions.set(newStore, copiedStoreDesc);
                    }
                }
                recipeHandle.id = newStore.id;
                recipeHandle.fate = 'use';
                recipeHandle.storageKey = newStore.storageKey;
                continue;
                // TODO: move the call to ParticleExecutionHost's DefineHandle to here
            }
            // TODO(shans/sjmiles): This shouldn't be possible, but at the moment the
            // shell pre-populates all arcs with a set of handles so if a recipe explicitly
            // asks for one of these there's a conflict. Ideally these will end up as a
            // part of the context and will be populated on-demand like everything else.
            if (this.storesById.has(recipeHandle.id)) {
                continue;
            }
            if (recipeHandle.fate !== '`slot') {
                let storageKey = recipeHandle.storageKey;
                if (!storageKey) {
                    storageKey = this.keyForId(recipeHandle.id);
                }
                assert(storageKey, `couldn't find storage key for handle '${recipeHandle}'`);
                const type = recipeHandle.type.resolvedType();
                assert(type.isResolved());
                if (typeof storageKey === 'string') {
                    const store = await this.storageProviderFactory.connect(recipeHandle.id, type, storageKey);
                    assert(store, `store '${recipeHandle.id}' was not found (${storageKey})`);
                    this._registerStore(store, recipeHandle.tags);
                }
                else {
                    throw new Error('Need to implement storageNG code path here!');
                }
            }
        }
        return { handles, particles, slots };
    }
    // Critical section for instantiate,
    async _doInstantiate(recipe) {
        const { handles, particles, slots } = await this.mergeIntoActiveRecipe(recipe);
        await Promise.all(particles.map(recipeParticle => this._instantiateParticle(recipeParticle)));
        if (this.pec.slotComposer) {
            // TODO: pass slot-connections instead
            await this.pec.slotComposer.initializeRecipe(this, particles);
        }
        if (this.inspector) {
            this.inspector.recipeInstantiated(particles, this.activeRecipe.toString());
        }
    }
    async createStore(type, name, id, tags, storageKey) {
        assert(type instanceof Type, `can't createStore with type ${type} that isn't a Type`);
        if (type instanceof RelationType) {
            type = new CollectionType(type);
        }
        if (id == undefined) {
            id = this.generateID().toString();
        }
        if (storageKey == undefined) {
            if (typeof this.storageKey === 'string') {
                storageKey = this.storageProviderFactory.parseStringAsKey(this.storageKey).childKeyForHandle(id).toString();
            }
            else if (this.storageKey) {
                storageKey = this.storageKey.childKeyForHandle(id);
            }
        }
        // TODO(sjmiles): use `volatile` for volatile stores
        const hasVolatileTag = (tags) => tags && tags.includes('volatile');
        if (storageKey == undefined || hasVolatileTag(tags)) {
            storageKey = 'volatile';
        }
        if (typeof storageKey === 'string') {
            const store = await this.storageProviderFactory.construct(id, type, storageKey);
            assert(store, `failed to create store with id [${id}]`);
            store.name = name;
            this._registerStore(store, tags);
            return store;
        }
        else {
            const store = new Store(storageKey, Exists.ShouldCreate, type, id, name);
            this._registerStore(store, tags);
            return store;
        }
    }
    _registerStore(store, tags) {
        assert(!this.storesById.has(store.id), `Store already registered '${store.id}'`);
        tags = tags || [];
        tags = Array.isArray(tags) ? tags : [tags];
        this.storesById.set(store.id, store);
        this.storeTags.set(store, new Set(tags));
        this.storageKeys[store.id] = store.storageKey;
        store.on('change', () => this._onDataChange(), this);
        Runtime.getRuntime().registerStore(store, tags);
    }
    _tagStore(store, tags) {
        assert(this.storesById.has(store.id) && this.storeTags.has(store), `Store not registered '${store.id}'`);
        const storeTags = this.storeTags.get(store);
        tags = tags || new Set();
        tags.forEach(tag => storeTags.add(tag));
    }
    _onDataChange() {
        for (const callback of this.dataChangeCallbacks.values()) {
            callback();
        }
    }
    onDataChange(callback, registration) {
        this.dataChangeCallbacks.set(registration, callback);
    }
    clearDataChange(registration) {
        this.dataChangeCallbacks.delete(registration);
    }
    // Convert a type to a normalized key that we can use for
    // equality testing.
    //
    // TODO: we should be testing the schemas for compatiblity instead of using just the name.
    // TODO: now that this is only used to implement findStoresByType we can probably replace
    // the check there with a type system equality check or similar.
    static _typeToKey(type) {
        const elementType = type.getContainedType();
        if (elementType) {
            const key = this._typeToKey(elementType);
            if (key) {
                return `list:${key}`;
            }
        }
        else if (type instanceof EntityType) {
            return type.entitySchema.name;
        }
        else if (type instanceof InterfaceType) {
            // TODO we need to fix this too, otherwise all handles of interface type will
            // be of the 'same type' when searching by type.
            return type.interfaceInfo;
        }
        else if (type instanceof TypeVariable && type.isResolved()) {
            return Arc._typeToKey(type.resolvedType());
        }
        return null;
    }
    findStoresByType(type, options) {
        const typeKey = Arc._typeToKey(type);
        let stores = [...this.storesById.values()].filter(handle => {
            if (typeKey) {
                const handleKey = Arc._typeToKey(handle.type);
                if (typeKey === handleKey) {
                    return true;
                }
            }
            else {
                if (type instanceof TypeVariable && !type.isResolved() && handle.type instanceof EntityType) {
                    return true;
                }
                // elementType will only be non-null if type is either Collection or BigCollection; the tag
                // comparison ensures that handle.type is the same sort of collection.
                const elementType = type.getContainedType();
                if (elementType && elementType instanceof TypeVariable && !elementType.isResolved() && type.tag === handle.type.tag) {
                    return true;
                }
            }
            return false;
        });
        if (options && options.tags && options.tags.length > 0) {
            stores = stores.filter(store => options.tags.filter(tag => !this.storeTags.get(store).has(tag)).length === 0);
        }
        // Quick check that a new handle can fulfill the type contract.
        // Rewrite of this method tracked by https://github.com/PolymerLabs/arcs/issues/1636.
        return stores.filter(s => !!Handle.effectiveType(type, [{ type: s.type, direction: (s.type instanceof InterfaceType) ? 'host' : 'inout' }]));
    }
    findStoreById(id) {
        const store = this.storesById.get(id);
        if (store == null) {
            return this._context.findStoreById(id);
        }
        return store;
    }
    findStoreTags(store) {
        if (this.storeTags.has(store)) {
            return this.storeTags.get(store);
        }
        return this._context.findStoreTags(store);
    }
    getStoreDescription(store) {
        assert(store, 'Cannot fetch description for nonexistent store');
        return this.storeDescriptions.get(store) || store.description;
    }
    getVersionByStore({ includeArc = true, includeContext = false }) {
        const versionById = {};
        if (includeArc) {
            this.storesById.forEach((handle, id) => versionById[id] = handle.version);
        }
        if (includeContext) {
            this._context.allStores.forEach(handle => versionById[handle.id] = handle.version);
        }
        return versionById;
    }
    keyForId(id) {
        return this.storageKeys[id];
    }
    toContextString() {
        const results = [];
        const stores = [...this.storesById.values()].sort(compareComparables);
        stores.forEach(store => {
            results.push(store.toString([...this.storeTags.get(store)]));
        });
        // TODO: include stores entities
        // TODO: include (remote) slots?
        if (!this._activeRecipe.isEmpty()) {
            results.push(this._activeRecipe.toString());
        }
        return results.join('\n');
    }
    get apiChannelMappingId() {
        return this.id.toString();
    }
    get idGeneratorForTesting() {
        return this.idGenerator;
    }
}
//# sourceMappingURL=arc.js.map