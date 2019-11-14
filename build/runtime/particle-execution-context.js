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
import { unifiedHandleFor } from './handle.js';
import { SlotProxy } from './slot-proxy.js';
import { StorageProxy, StorageProxyScheduler } from './storage-proxy.js';
import { StorageProxy as StorageProxyNG } from './storageNG/storage-proxy.js';
import { WasmContainer, WasmParticle } from './wasm.js';
import { UserException } from './arc-exceptions.js';
import { Flags } from './flags.js';
export class ParticleExecutionContext {
    constructor(port, pecId, idGenerator, loader) {
        this.particles = new Map();
        this.pendingLoads = [];
        this.scheduler = new StorageProxyScheduler();
        this.keyedProxies = {};
        this.wasmContainers = {};
        const pec = this;
        this.apiPort = new class extends PECInnerPort {
            onDefineHandle(identifier, type, name) {
                if (Flags.useNewStorageStack) {
                    return new StorageProxyNG(identifier, pec, type);
                }
                return StorageProxy.newProxy(identifier, type, this, pec, pec.scheduler, name);
            }
            onGetBackingStoreCallback(callback, type, name, id, storageKey) {
                let proxy;
                if (Flags.useNewStorageStack) {
                    proxy = new StorageProxyNG(id, pec, type);
                }
                else {
                    proxy = StorageProxy.newProxy(id, type, this, pec, pec.scheduler, name);
                    proxy.storageKey = storageKey;
                }
                return [proxy, () => callback(proxy, storageKey)];
            }
            onCreateHandleCallback(callback, type, name, id) {
                let proxy;
                if (Flags.useNewStorageStack) {
                    proxy = new StorageProxyNG(id, pec, type);
                }
                else {
                    proxy = StorageProxy.newProxy(id, type, this, pec, pec.scheduler, name);
                }
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
            async onInstantiateParticle(id, spec, proxies) {
                return pec.instantiateParticle(id, spec, proxies);
            }
            async onReinstantiateParticle(id, spec, proxies) {
                assert(false, `Not implemented`);
            }
            async onReloadParticles(ids) {
                return pec.reloadParticles(ids);
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
                    setTimeout(() => this.Idle(version, pec.relevance), 0);
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
    getStorageEndpoint(storageProxy) {
        const pec = this;
        let id;
        return {
            async onProxyMessage(message) {
                message.id = await id;
                return new Promise((resolve) => pec.apiPort.ProxyMessage(storageProxy, message, ret => resolve(ret)));
            },
            setCallback(callback) {
                id = new Promise((resolve) => pec.apiPort.Register(storageProxy, x => storageProxy.onMessage(x), retId => resolve(retId)));
            },
            reportExceptionInHost(exception) {
                pec.apiPort.ReportExceptionInHost(exception);
            }
        };
    }
    innerArcHandle(arcId, particleId) {
        const pec = this;
        return {
            async createHandle(type, name, hostParticle) {
                return new Promise((resolve, reject) => pec.apiPort.ArcCreateHandle(proxy => {
                    const handle = unifiedHandleFor({ proxy, idGenerator: pec.idGenerator, name, particleId });
                    resolve(handle);
                    if (hostParticle) {
                        proxy.register(hostParticle, handle);
                    }
                }, arcId, type, name));
            },
            async mapHandle(handle) {
                return new Promise((resolve, reject) => pec.apiPort.ArcMapHandle(id => {
                    resolve(id);
                }, arcId, handle)); // recipe handle vs not?
            },
            async createSlot(transformationParticle, transformationSlotName, handleId) {
                // handleId: the ID of a handle (returned by `createHandle` above) this slot is rendering; null - if not applicable.
                // TODO: support multiple handle IDs.
                return new Promise((resolve, reject) => pec.apiPort.ArcCreateSlot(hostedSlotId => resolve(hostedSlotId), arcId, transformationParticle, transformationSlotName, handleId));
            },
            async loadRecipe(recipe) {
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
    capabilities(hasInnerArcs) {
        const cap = {
            // TODO(sjmiles): experimental `services` impl
            serviceRequest: (particle, args, callback) => {
                this.apiPort.ServiceRequest(particle, args, callback);
            },
            // TODO(sjmiles): alternate render path via slotObserver (UiBroker)
            output: (particle, content) => {
                this.apiPort.Output(particle, content);
            }
        };
        if (hasInnerArcs) {
            // TODO: Particle doesn't have an id field; not sure if it needs one or innerArcHandle shouldn't have that arg.
            cap.constructInnerArc = async (particle) => {
                return new Promise((resolve, reject) => this.apiPort.ConstructInnerArc(arcId => resolve(this.innerArcHandle(arcId, undefined)), particle));
            };
        }
        return cap;
    }
    // tslint:disable-next-line: no-any
    async instantiateParticle(id, spec, proxies) {
        let resolve;
        const p = new Promise(res => resolve = res);
        this.pendingLoads.push(p);
        const particle = await this.createParticleFromSpec(id, spec);
        const handleMap = new Map();
        const registerList = [];
        proxies.forEach((proxy, name) => {
            this.createHandle(particle, spec, id, name, proxy, handleMap, registerList);
        });
        return [particle, async () => {
                await this.assignHandle(particle, spec, id, handleMap, registerList, p);
                resolve();
            }];
    }
    async reloadParticles(ids) {
        // Delete old particles' caches
        ids.forEach(id => {
            const oldParticle = this.particles.get(id);
            if (oldParticle.spec.implBlobUrl)
                delete oldParticle.spec.implBlobUrl;
            if (oldParticle.spec.implFile.endsWith('.wasm') && this.wasmContainers[oldParticle.spec.implFile]) {
                // For WASM particles the container will be re-instantiated along with all of the particles
                this.wasmContainers[oldParticle.spec.implFile] = undefined;
            }
        });
        const result = [];
        // Go through the given array of particles one by one
        for (const id of ids) {
            let resolve;
            const p = new Promise(res => resolve = res);
            this.pendingLoads.push(p);
            // Get the old particle
            const oldParticle = this.particles.get(id);
            // Create a new particle and replace the old one
            const particle = await this.createParticleFromSpec(id, oldParticle.spec);
            const handleMap = new Map();
            const registerList = [];
            // Create new handles and disable the handles of the old particles
            oldParticle.handles.forEach((oldHandle) => {
                this.createHandle(particle, oldParticle.spec, id, oldHandle.name, oldHandle.storage, handleMap, registerList);
                oldHandle.disable(oldParticle);
            });
            result.push([particle, async () => {
                    // Set the new handles to the new particle
                    await this.assignHandle(particle, oldParticle.spec, id, handleMap, registerList, p);
                    resolve();
                    // Transfer the slot proxies from the old particle to the new one
                    for (const name of oldParticle.getSlotNames()) {
                        oldParticle.getSlot(name).rewire(particle);
                    }
                }]);
        }
        return result;
    }
    createHandle(particle, spec, id, name, proxy, handleMap, registerList) {
        const connSpec = spec.handleConnectionMap.get(name);
        const handle = unifiedHandleFor({
            proxy,
            idGenerator: this.idGenerator,
            name,
            particleId: id,
            particle,
            canRead: connSpec.isInput,
            canWrite: connSpec.isOutput,
        });
        handleMap.set(name, handle);
        // Defer registration of handles with proxies until after particles have a chance to
        // configure them in setHandles.
        registerList.push({ proxy, particle, handle });
    }
    async assignHandle(particle, spec, id, handleMap, registerList, p) {
        await particle.callSetHandles(handleMap, err => {
            const exc = new UserException(err, 'setHandles', id, spec.name);
            this.apiPort.ReportExceptionInHost(exc);
        });
        registerList.forEach(({ proxy, particle, handle }) => {
            if (proxy instanceof StorageProxy) {
                proxy.register(particle, handle);
            }
            else if (proxy instanceof StorageProxyNG) {
                proxy.registerHandle(handle);
            }
            else {
                throw new Error('Expecting a StorageProxy');
            }
        });
        const idx = this.pendingLoads.indexOf(p);
        this.pendingLoads.splice(idx, 1);
    }
    async createParticleFromSpec(id, spec) {
        let particle;
        if (spec.implFile && spec.implFile.endsWith('.wasm')) {
            particle = await this.loadWasmParticle(id, spec);
            particle.setCapabilities(this.capabilities(false));
        }
        else {
            const clazz = await this.loader.loadParticleClass(spec);
            particle = new clazz();
            particle.setCapabilities(this.capabilities(true));
        }
        this.particles.set(id, particle);
        return particle;
    }
    async loadWasmParticle(id, spec) {
        assert(spec.name.length > 0);
        let container = this.wasmContainers[spec.implFile];
        if (!container) {
            const buffer = await this.loader.loadBinaryResource(spec.implFile);
            if (!buffer || buffer.byteLength === 0) {
                throw new Error(`Failed to load wasm binary '${spec.implFile}'`);
            }
            container = new WasmContainer(this, this.loader, this.apiPort);
            await container.initialize(buffer);
            this.wasmContainers[spec.implFile] = container;
        }
        // Particle constructor expects spec to be attached to the class object (and attaches it to
        // the particle instance at that time).
        WasmParticle.spec = spec;
        const particle = new WasmParticle(id, container);
        WasmParticle.spec = null;
        return particle;
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
        if ([...this.particles.values()].filter(particle => particle.busy).length > 0) {
            return true;
        }
        return false;
    }
    get idle() {
        if (!this.busy) {
            return Promise.resolve();
        }
        const busyParticlePromises = [...this.particles.values()].filter(particle => particle.busy).map(async (particle) => particle.idle);
        return Promise.all([this.scheduler.idle, ...this.pendingLoads, ...busyParticlePromises]).then(() => this.idle);
    }
}
//# sourceMappingURL=particle-execution-context.js.map