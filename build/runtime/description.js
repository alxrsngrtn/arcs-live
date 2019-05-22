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
import { DescriptionFormatter } from './description-formatter.js';
import { BigCollectionType, CollectionType, EntityType, InterfaceType } from './type.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
export class Description {
    constructor(storeDescById = {}, 
    // TODO(mmandlis): replace Particle[] with serializable json objects.
    arcRecipes, particleDescriptions = []) {
        this.storeDescById = storeDescById;
        this.arcRecipes = arcRecipes;
        this.particleDescriptions = particleDescriptions;
    }
    static async createForPlan(plan) {
        const particleDescriptions = await Description.initDescriptionHandles(plan.particles);
        return new Description({}, [{ patterns: plan.patterns, particles: plan.particles }], particleDescriptions);
    }
    /**
     * Create a new Description object for the given Arc with an
     * optional Relevance object.
     */
    static async create(arc, relevance) {
        // Execute async related code here
        const allParticles = [].concat(...arc.allDescendingArcs.map(arc => arc.activeRecipe.particles));
        const particleDescriptions = await Description.initDescriptionHandles(allParticles, arc, relevance);
        const storeDescById = {};
        for (const { id } of arc.activeRecipe.handles) {
            const store = arc.findStoreById(id);
            if (store && store instanceof StorageProviderBase) {
                storeDescById[id] = arc.getStoreDescription(store);
            }
        }
        // ... and pass to the private constructor.
        return new Description(storeDescById, arc.recipeDeltas, particleDescriptions);
    }
    getArcDescription(formatterClass = DescriptionFormatter) {
        const patterns = [].concat(...this.arcRecipes.map(recipe => recipe.patterns));
        const particles = [].concat(...this.arcRecipes.map(recipe => recipe.particles));
        const desc = new (formatterClass)(this.particleDescriptions, this.storeDescById).getDescription({
            patterns,
            particles
        });
        if (desc) {
            return desc;
        }
        return undefined;
    }
    getRecipeSuggestion(formatterClass = DescriptionFormatter) {
        const formatter = new (formatterClass)(this.particleDescriptions, this.storeDescById);
        return formatter.getDescription(this.arcRecipes[this.arcRecipes.length - 1]);
    }
    getHandleDescription(recipeHandle) {
        assert(recipeHandle.connections.length > 0, 'handle has no connections?');
        const formatter = new DescriptionFormatter(this.particleDescriptions, this.storeDescById);
        formatter.excludeValues = true;
        return formatter.getHandleDescription(recipeHandle);
    }
    static async initDescriptionHandles(allParticles, arc, relevance) {
        return await Promise.all(allParticles.map(particle => Description._createParticleDescription(particle, arc, relevance)));
    }
    static async _createParticleDescription(particle, arc, relevance) {
        let pDesc = {
            _particle: particle,
            _connections: {}
        };
        if (relevance) {
            pDesc._rank = relevance.calcParticleRelevance(particle);
        }
        const descByName = await Description._getPatternByNameFromDescriptionHandle(particle, arc);
        pDesc = { ...pDesc, ...descByName };
        pDesc.pattern = pDesc.pattern || particle.spec.pattern;
        for (const handleConn of Object.values(particle.connections)) {
            const specConn = particle.spec.handleConnectionMap.get(handleConn.name);
            const pattern = descByName[handleConn.name] || specConn.pattern;
            const store = arc ? arc.findStoreById(handleConn.handle.id) : null;
            pDesc._connections[handleConn.name] = {
                pattern,
                _handleConn: handleConn,
                value: await Description._prepareStoreValue(store)
            };
        }
        return pDesc;
    }
    static async _getPatternByNameFromDescriptionHandle(particle, arc) {
        const descriptionConn = particle.connections['descriptions'];
        if (descriptionConn && descriptionConn.handle && descriptionConn.handle.id) {
            const descHandle = arc.findStoreById(descriptionConn.handle.id);
            if (descHandle) {
                // TODO(shans): fix this mess when there's a unified Collection class or interface.
                const descByName = {};
                for (const d of await descHandle.toList()) {
                    descByName[d.rawData.key] = d.rawData.value;
                }
                return descByName;
            }
        }
        return {};
    }
    static async _prepareStoreValue(store) {
        if (!store) {
            return undefined;
        }
        if (store.type instanceof CollectionType) {
            const collectionStore = store;
            const values = await collectionStore.toList();
            if (values && values.length > 0) {
                return { collectionValues: values };
            }
        }
        else if (store.type instanceof BigCollectionType) {
            const bigCollectionStore = store;
            const cursorId = await bigCollectionStore.stream(1);
            const { value, done } = await bigCollectionStore.cursorNext(cursorId);
            bigCollectionStore.cursorClose(cursorId);
            if (!done && value[0].rawData.name) {
                return { bigCollectionValues: value[0] };
            }
        }
        else if (store.type instanceof EntityType) {
            const variableStore = store;
            const value = await variableStore.get();
            if (value && value['rawData']) {
                return { entityValue: value['rawData'], valueDescription: store.type.entitySchema.description.value };
            }
        }
        else if (store.type instanceof InterfaceType) {
            const variableStore = store;
            const interfaceValue = await variableStore.get();
            if (interfaceValue) {
                return { interfaceValue };
            }
        }
        return undefined;
    }
}
//# sourceMappingURL=description.js.map