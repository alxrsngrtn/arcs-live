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
import { PECInnerPort } from './api-channel.js';
import { handleFor } from './handle.js';
import { SlotProxy } from './slot-proxy.js';
import { StorageProxy, StorageProxyScheduler } from './storage-proxy.js';
export class ParticleExecutionContext {
    constructor(port, pecId, idGenerator, loader) {
        this.particles = [];
        this.pendingLoads = [];
        this.scheduler = new StorageProxyScheduler();
        this.keyedProxies = {};
        const pec = this;
        this.apiPort = new class extends PECInnerPort {
            onDefineHandle(identifier, type, name) {
                return StorageProxy.newProxy(identifier, type, this, pec, pec.scheduler, name);
            }
            onGetBackingStoreCallback(callback, type, name, id, storageKey) {
                const proxy = StorageProxy.newProxy(id, type, this, pec, pec.scheduler, name);
                proxy.storageKey = storageKey;
                return [proxy, () => callback(proxy, storageKey)];
            }
            onCreateHandleCallback(callback, type, name, id) {
                const proxy = StorageProxy.newProxy(id, type, this, pec, pec.scheduler, name);
                return [proxy, () => callback(proxy)];
            }
            onMapHandleCallback(callback, id) {
                return [id, () => callback(id)];
            }
            onCreateSlotCallback(callback, hostedSlotId) {
                return [hostedSlotId, () => callback(hostedSlotId)];
            }
            onInnerArcRender(transformationParticle, transformationSlotName, hostedSlotId, content) {
                transformationParticle.renderHostedSlot(transformationSlotName, hostedSlotId, content);
            }
            onStop() {
                if (global['close']) {
                    global['close']();
                }
            }
            onInstantiateParticle(id, spec, proxies) {
                return pec._instantiateParticle(id, spec, proxies);
            }
            onSimpleCallback(callback, data) {
                callback(data);
            }
            onConstructArcCallback(callback, arc) {
                callback(arc);
            }
            onAwaitIdle(version) {
                pec.idle.then(a => {
                    // TODO: dom-particles update is async, this is a workaround to allow dom-particles to
                    // update relevance, after handles are updated. Needs better idle signal.
                    setTimeout(() => { this.Idle(version, pec.relevance); }, 0);
                });
            }
            onUIEvent(particle, slotName, event) {
                particle.fireEvent(slotName, event);
            }
            onStartRender(particle, slotName, providedSlots, contentTypes) {
                particle.addSlotProxy(new SlotProxy(this, particle, slotName, providedSlots));
                particle.renderSlot(slotName, contentTypes);
            }
            onStopRender(particle, slotName) {
                assert(particle.hasSlotProxy(slotName), `Stop render called for particle ${particle.spec.name} slot ${slotName} without start render being called.`);
                particle.removeSlotProxy(slotName);
            }
        }(port);
        this.pecId = pecId;
        this.idGenerator = idGenerator;
        this.loader = loader;
        loader.setParticleExecutionContext(this);
        /*
         * This code ensures that the relevant types are known
         * in the scope object, because otherwise we can't do
         * particleSpec resolution, which is currently a necessary
         * part of particle construction.
         *
         * Possibly we should eventually consider having particle
         * specifications separated from particle classes - and
         * only keeping type information on the arc side.
         */
    }
    generateID() {
        return this.idGenerator.newChildId(this.pecId).toString();
    }
    innerArcHandle(arcId, particleId) {
        const pec = this;
        return {
            createHandle(type, name, hostParticle) {
                return new Promise((resolve, reject) => pec.apiPort.ArcCreateHandle(proxy => {
                    const handle = handleFor(proxy, pec.idGenerator, name, particleId);
                    resolve(handle);
                    if (hostParticle) {
                        proxy.register(hostParticle, handle);
                    }
                }, arcId, type, name));
            },
            mapHandle(handle) {
                return new Promise((resolve, reject) => pec.apiPort.ArcMapHandle(id => {
                    resolve(id);
                }, arcId, handle)); // recipe handle vs not?
            },
            createSlot(transformationParticle, transformationSlotName, handleId) {
                // handleId: the ID of a handle (returned by `createHandle` above) this slot is rendering; null - if not applicable.
                // TODO: support multiple handle IDs.
                return new Promise((resolve, reject) => pec.apiPort.ArcCreateSlot(hostedSlotId => resolve(hostedSlotId), arcId, transformationParticle, transformationSlotName, handleId));
            },
            loadRecipe(recipe) {
                // TODO: do we want to return a promise on completion?
                return new Promise((resolve, reject) => pec.apiPort.ArcLoadRecipe(arcId, recipe, response => {
                    if (response.error) {
                        reject(response.error);
                    }
                    else {
                        resolve(response);
                    }
                }));
            }
        };
    }
    getStorageProxy(storageKey, type) {
        if (!this.keyedProxies[storageKey]) {
            this.keyedProxies[storageKey] = new Promise((resolve, reject) => {
                this.apiPort.GetBackingStore((proxy, storageKey) => {
                    this.keyedProxies[storageKey] = proxy;
                    resolve(proxy);
                }, storageKey, type);
            });
        }
        return this.keyedProxies[storageKey];
    }
    defaultCapabilitySet() {
        return {
            constructInnerArc: particle => {
                return new Promise((resolve, reject) => this.apiPort.ConstructInnerArc(arcId => resolve(this.innerArcHandle(arcId, particle.id)), particle));
            }
        };
    }
    // tslint:disable-next-line: no-any
    async _instantiateParticle(id, spec, proxies) {
        let resolve = null;
        const p = new Promise(res => resolve = res);
        this.pendingLoads.push(p);
        const clazz = await this.loader.loadParticleClass(spec);
        const capabilities = this.defaultCapabilitySet();
        const particle = new clazz();
        particle.setCapabilities(capabilities);
        this.particles.push(particle);
        const handleMap = new Map();
        const registerList = [];
        proxies.forEach((proxy, name) => {
            const connSpec = spec.handleConnectionMap.get(name);
            const handle = handleFor(proxy, this.idGenerator, name, id, connSpec.isInput, connSpec.isOutput);
            handleMap.set(name, handle);
            // Defer registration of handles with proxies until after particles have a chance to
            // configure them in setHandles.
            registerList.push({ proxy, particle, handle });
        });
        return [particle, async () => {
                await particle.setHandles(handleMap);
                registerList.forEach(({ proxy, particle, handle }) => proxy.register(particle, handle));
                const idx = this.pendingLoads.indexOf(p);
                this.pendingLoads.splice(idx, 1);
                resolve();
            }];
    }
    get relevance() {
        const rMap = new Map();
        this.particles.forEach(p => {
            if (p.relevances.length === 0) {
                return;
            }
            rMap.set(p, p.relevances);
            p.relevances.length = 0; // truncate
        });
        return rMap;
    }
    get busy() {
        if (this.pendingLoads.length > 0 || this.scheduler.busy) {
            return true;
        }
        if (this.particles.filter(particle => particle.busy).length > 0) {
            return true;
        }
        return false;
    }
    get idle() {
        if (!this.busy) {
            return Promise.resolve();
        }
        const busyParticlePromises = this.particles.filter(particle => particle.busy).map(particle => particle.idle);
        return Promise.all([this.scheduler.idle, ...this.pendingLoads, ...busyParticlePromises]).then(() => this.idle);
    }
}
//# sourceMappingURL=particle-execution-context.js.map