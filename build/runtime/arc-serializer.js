/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Flags } from './flags.js';
import { InterfaceType } from './type.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
export class ArcSerializer {
    constructor(arc) {
        this.handles = '';
        this.resources = '';
        this.interfaces = '';
        this.dataResources = new Map();
        this.memoryResourceNames = new Map();
        this.arc = arc;
    }
    async serialize() {
        return `
meta
  name: '${this.arc.id}'
  ${this.serializeStorageKey()}

${await this.serializeVolatileMemory()}

${await this.serializeHandles()}

${this.serializeParticles()}

@active
${this.arc.activeRecipe.toString()}`;
    }
    async serializeVolatileMemory() {
        let resourceNum = 0;
        let serialization = '';
        const indent = '  ';
        if (Flags.useNewStorageStack) {
            for (const [key, value] of this.arc.volatileMemory.entries.entries()) {
                this.memoryResourceNames.set(key, `VolatileMemoryResource${resourceNum}`);
                const data = { root: value.root.data, locations: {} };
                for (const [key, entry] of Object.entries(value.locations)) {
                    data.locations[key] = entry.data;
                }
                serialization +=
                    `resource VolatileMemoryResource${resourceNum++} // ${key}\n` +
                        indent + 'start\n' +
                        JSON.stringify(data).split('\n').map(line => indent + line).join('\n') + '\n';
            }
            return serialization;
        }
        else {
            return '';
        }
    }
    async _serializeStore(store, name) {
        const type = store.type.getContainedType() || store.type;
        if (type instanceof InterfaceType) {
            this.interfaces += type.interfaceInfo.toString() + '\n';
        }
        let key;
        if (typeof store.storageKey === 'string') {
            key = this.arc.storageProviderFactory.parseStringAsKey(store.storageKey);
        }
        else {
            key = store.storageKey;
        }
        const tags = this.arc.storeTags.get(store) || new Set();
        const handleTags = [...tags];
        const actualHandle = this.arc.activeRecipe.findHandle(store.id);
        const originalId = actualHandle ? actualHandle.originalId : null;
        let combinedId = `'${store.id}'`;
        if (originalId) {
            combinedId += `!!'${originalId}'`;
        }
        switch (key.protocol) {
            case 'reference-mode':
            case 'firebase':
            case 'pouchdb':
                this.handles += store.toManifestString({ handleTags, overrides: { name } }) + '\n';
                break;
            case 'volatile':
                if (Flags.useNewStorageStack) {
                    const storageKey = store.storageKey;
                    this.handles += store.toManifestString({ handleTags, overrides: { name, source: this.memoryResourceNames.get(storageKey.unique), origin: 'resource', includeKey: storageKey.toString() } }) + '\n';
                }
                else {
                    // TODO(sjmiles): emit empty data for stores marked `volatile`: shell will supply data
                    const volatile = handleTags.includes('volatile');
                    let serializedData = [];
                    if (!volatile) {
                        // TODO: include keys in serialized [big]collections?
                        const activeStore = await store.activate();
                        const model = await activeStore.serializeContents();
                        serializedData = model.model.map((model) => {
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
                        if (!this.dataResources.has(storageKey)) {
                            const storeId = `${name}_Data`;
                            this.dataResources.set(storageKey, storeId);
                            // TODO: can't just reach into the store for the backing Store like this, should be an
                            // accessor that loads-on-demand in the storage objects.
                            if (store instanceof StorageProviderBase) {
                                await store.ensureBackingStore();
                                await this._serializeStore(store.backingStore, storeId);
                            }
                        }
                        const storeId = this.dataResources.get(storageKey);
                        serializedData.forEach(a => { a.storageKey = storeId; });
                    }
                    const indent = '  ';
                    const data = JSON.stringify(serializedData);
                    const resourceName = `${name}Resource`;
                    this.resources += `resource ${resourceName}\n`
                        + indent + 'start\n'
                        + data.split('\n').map(line => indent + line).join('\n')
                        + '\n';
                    this.handles += store.toManifestString({ handleTags, overrides: { name, source: resourceName, origin: 'resource' } }) + '\n';
                }
                break;
            default:
                throw new Error(`unknown storageKey protocol ${key.protocol}`);
        }
    }
    async serializeHandles() {
        let id = 0;
        const importSet = new Set();
        const handlesToSerialize = new Set();
        const contextSet = new Set(this.arc.context.stores.map(store => store.id));
        for (const handle of this.arc.activeRecipe.handles) {
            if (handle.fate === 'map') {
                importSet.add(this.arc.context.findManifestUrlForHandleId(handle.id));
            }
            else {
                // Immediate value handles have values inlined in the recipe and are not serialized.
                if (handle.immediateValue)
                    continue;
                handlesToSerialize.add(handle.id);
            }
        }
        for (const url of importSet.values()) {
            this.resources += `import '${url}'\n`;
        }
        for (const store of this.arc._stores) {
            if (Flags.useNewStorageStack || (handlesToSerialize.has(store.id) && !contextSet.has(store.id))) {
                await this._serializeStore(store, `Store${id++}`);
            }
        }
        return this.resources + this.interfaces + this.handles;
    }
    serializeParticles() {
        const particleSpecs = [];
        // Particles used directly.
        particleSpecs.push(...this.arc.activeRecipe.particles.map(entry => entry.spec));
        // Particles referenced in an immediate mode.
        particleSpecs.push(...this.arc.activeRecipe.handles
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
    serializeStorageKey() {
        if (this.arc.storageKey) {
            return `storageKey: '${this.arc.storageKey}'\n`;
        }
        return '';
    }
}
//# sourceMappingURL=arc-serializer.js.map