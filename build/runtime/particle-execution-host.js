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
import { PECOuterPort } from './api-channel.js';
import { reportSystemException } from './arc-exceptions.js';
import { Manifest } from './manifest.js';
import { StorageStub } from './storage-stub.js';
import { RecipeResolver } from './recipe/recipe-resolver.js';
import { Services } from './services.js';
import { floatingPromiseToAudit } from './util.js';
export class ParticleExecutionHost {
    constructor(slotComposer, arc, ports) {
        this._portByParticle = new Map();
        this.nextIdentifier = 0;
        this.idleVersion = 0;
        this.particles = [];
        this.close = () => {
            ports.forEach(port => port.close());
            this._apiPorts.forEach(apiPort => apiPort.close());
        };
        this.arc = arc;
        this.slotComposer = slotComposer;
        const pec = this;
        this._apiPorts = ports.map(port => new PECOuterPortImpl(port, arc));
    }
    choosePortForParticle(particle) {
        assert(!this._portByParticle.has(particle), `port already found for particle '${particle.spec.name}'`);
        const port = this._apiPorts.find(port => particle.isJavaParticle() === port.supportsJavaParticle());
        assert(!!port, `No port found for '${particle.spec.name}'`);
        this._portByParticle.set(particle, port);
        return this.getPort(particle);
    }
    getPort(particle) {
        assert(this._portByParticle.has(particle), `Cannot get port for particle '${particle.spec.name}'`);
        return this._portByParticle.get(particle);
    }
    stop() {
        this._apiPorts.forEach(apiPort => apiPort.Stop());
    }
    get idle() {
        if (this.idlePromise == undefined) {
            this.idlePromise = new Promise((resolve, reject) => {
                this.idleResolve = resolve;
            });
        }
        this.idleVersion = this.nextIdentifier;
        this._apiPorts.forEach(apiPort => apiPort.AwaitIdle(this.nextIdentifier++));
        return this.idlePromise;
    }
    get messageCount() {
        return [...this._apiPorts.values()].map(apiPort => apiPort.messageCount).reduce((prev, current) => prev + current, 0);
    }
    sendEvent(particle, slotName, event) {
        this.getPort(particle).UIEvent(particle, slotName, event);
    }
    instantiate(particle, stores) {
        this.particles.push(particle);
        const apiPort = this.choosePortForParticle(particle);
        stores.forEach((store, name) => {
            apiPort.DefineHandle(store, store.type.resolvedType(), name);
        });
        apiPort.InstantiateParticle(particle, particle.id.toString(), particle.spec, stores);
    }
    reinstantiate(particle, stores) {
        assert(this.particles.find(p => p === particle), `Cannot reinstantiate nonexistent particle ${particle.name}`);
        const apiPort = this.getPort(particle);
        stores.forEach((store, name) => {
            apiPort.DefineHandle(store, store.type.resolvedType(), name);
        });
        apiPort.ReinstantiateParticle(particle.id.toString(), particle.spec, stores);
    }
    reload(particles) {
        // Create a mapping from port to given list of particles
        const portMap = new Map();
        particles.forEach(particle => {
            const port = this.getPort(particle);
            let list = portMap.get(port);
            if (!list) {
                list = [particle];
                portMap.set(port, list);
            }
            else {
                list.push(particle);
            }
        });
        // Reload particles based on ports
        portMap.forEach((particles, port) => {
            port.ReloadParticles(particles, particles.map(p => p.id.toString()));
        });
    }
    startRender({ particle, slotName, providedSlots, contentTypes }) {
        this.getPort(particle).StartRender(particle, slotName, providedSlots, contentTypes);
    }
    stopRender({ particle, slotName }) {
        this.getPort(particle).StopRender(particle, slotName);
    }
    innerArcRender(transformationParticle, transformationSlotName, hostedSlotId, content) {
        // Note: Transformations are not supported in Java PEC.
        this.getPort(transformationParticle).InnerArcRender(transformationParticle, transformationSlotName, hostedSlotId, content);
    }
    resolveIfIdle(version, relevance) {
        if (version === this.idleVersion) {
            this.idlePromise = undefined;
            this.idleResolve(relevance);
        }
    }
}
class PECOuterPortImpl extends PECOuterPort {
    constructor(port, arc) {
        super(port, arc);
        this.arc = arc;
    }
    onRender(particle, slotName, content) {
        if (this.arc.pec.slotComposer) {
            this.arc.pec.slotComposer.renderSlot(particle, slotName, content);
        }
    }
    onInitializeProxy(handle, callback) {
        const target = {};
        handle.on('change', data => this.SimpleCallback(callback, data), target);
    }
    async onSynchronizeProxy(handle, callback) {
        const data = await handle.modelForSynchronization();
        this.SimpleCallback(callback, data);
    }
    async onHandleGet(handle, callback) {
        const data = await handle.get();
        this.SimpleCallback(callback, data);
    }
    async onHandleToList(handle, callback) {
        const data = await handle.toList();
        this.SimpleCallback(callback, data);
    }
    onHandleSet(handle, data, particleId, barrier) {
        // TODO: Awaiting this promise causes tests to fail...
        floatingPromiseToAudit(handle.set(data, particleId, barrier));
    }
    onHandleClear(handle, particleId, barrier) {
        // TODO: Awaiting this promise causes tests to fail...
        floatingPromiseToAudit(handle.clear(particleId, barrier));
    }
    async onHandleStore(handle, callback, data, particleId) {
        // TODO(shans): fix typing once we have types for Singleton/Collection/etc
        // tslint:disable-next-line: no-any
        await handle.store(data.value, data.keys, particleId);
        this.SimpleCallback(callback, {});
    }
    async onHandleRemove(handle, callback, data, particleId) {
        // TODO(shans): fix typing once we have types for Singleton/Collection/etc
        // tslint:disable-next-line: no-any
        await handle.remove(data.id, data.keys, particleId);
        this.SimpleCallback(callback, {});
    }
    async onHandleRemoveMultiple(handle, callback, data, particleId) {
        await handle.removeMultiple(data, particleId);
        this.SimpleCallback(callback, {});
    }
    async onHandleStream(handle, callback, pageSize, forward) {
        this.SimpleCallback(callback, await handle.stream(pageSize, forward));
    }
    async onStreamCursorNext(handle, callback, cursorId) {
        this.SimpleCallback(callback, await handle.cursorNext(cursorId));
    }
    onStreamCursorClose(handle, cursorId) {
        handle.cursorClose(cursorId);
    }
    onIdle(version, relevance) {
        this.arc.pec.resolveIfIdle(version, relevance);
    }
    async onGetBackingStore(callback, storageKey, type) {
        if (!storageKey) {
            storageKey = this.arc.storageProviderFactory.baseStorageKey(type, this.arc.storageKey || 'volatile');
        }
        const store = await this.arc.storageProviderFactory.baseStorageFor(type, storageKey);
        // TODO(shans): THIS IS NOT SAFE!
        //
        // Without an auditor on the runtime side that inspects what is being fetched from
        // this store, particles with a reference can access any data of that reference's type.
        //
        // TOODO(sjmiles): randomizing the id as a workaround for https://github.com/PolymerLabs/arcs/issues/2936
        this.GetBackingStoreCallback(store, callback, type.collectionOf(), type.toString(), `${store.id}:${`String(Math.random())`.slice(2, 9)}`, storageKey);
    }
    onConstructInnerArc(callback, particle) {
        const arc = this.arc.createInnerArc(particle);
        this.ConstructArcCallback(callback, arc);
    }
    async onArcCreateHandle(callback, arc, type, name) {
        // At the moment, inner arcs are not persisted like their containers, but are instead
        // recreated when an arc is deserialized. As a consequence of this, dynamically
        // created handles for inner arcs must always be volatile to prevent storage
        // in firebase.
        const store = await arc.createStore(type, name, null, [], 'volatile');
        // Store belongs to the inner arc, but the transformation particle,
        // which itself is in the outer arc gets access to it.
        this.CreateHandleCallback(store, callback, type, name, store.id);
    }
    onArcMapHandle(callback, arc, handle) {
        assert(this.arc.findStoreById(handle.id), `Cannot map nonexistent handle ${handle.id}`);
        // TODO: create hosted handles map with specially generated ids instead of returning the real ones?
        this.MapHandleCallback({}, callback, handle.id);
    }
    onArcCreateSlot(callback, arc, transformationParticle, transformationSlotName, handleId) {
        let hostedSlotId;
        if (this.arc.pec.slotComposer) {
            hostedSlotId = this.arc.pec.slotComposer.createHostedSlot(arc, transformationParticle, transformationSlotName, handleId);
        }
        this.CreateSlotCallback({}, callback, hostedSlotId);
    }
    async onArcLoadRecipe(arc, recipe, callback) {
        const manifest = await Manifest.parse(recipe, { loader: arc.loader, fileName: '' });
        const successResponse = {
            providedSlotIds: {}
        };
        let error = undefined;
        // TODO(wkorman): Consider reporting an error or at least warning if
        // there's more than one recipe since currently we silently ignore them.
        let recipe0 = manifest.recipes[0];
        if (recipe0) {
            for (const slot of recipe0.slots) {
                slot.id = slot.id || `slotid-${arc.generateID()}`;
                if (slot.sourceConnection) {
                    const particlelocalName = slot.sourceConnection.particle.localName;
                    if (particlelocalName) {
                        successResponse.providedSlotIds[`${particlelocalName}.${slot.name}`] = slot.id;
                    }
                }
            }
            const missingHandles = [];
            for (const handle of recipe0.handles) {
                const fromHandle = this.arc.findStoreById(handle.id) || manifest.findStoreById(handle.id);
                if (fromHandle) {
                    handle.mapToStorage(fromHandle);
                }
                else {
                    missingHandles.push(handle);
                    continue;
                }
            }
            if (missingHandles.length > 0) {
                let recipeToResolve = recipe0;
                // We're resolving both against the inner and the outer arc.
                for (const resolver of [new RecipeResolver(arc /* inner */), new RecipeResolver(this.arc /* outer */)]) {
                    recipeToResolve = await resolver.resolve(recipeToResolve) || recipeToResolve;
                }
                if (recipeToResolve === recipe0) {
                    error = `Recipe couldn't load due to missing handles [recipe=${recipe0}, missingHandles=${missingHandles.join('\n')}].`;
                }
                else {
                    recipe0 = recipeToResolve;
                }
            }
            if (!error) {
                const options = { errors: new Map() };
                // If we had missing handles but we made it here, then we ran recipe
                // resolution which will have already normalized the recipe.
                if ((missingHandles.length > 0) || recipe0.normalize(options)) {
                    if (recipe0.isResolved()) {
                        // TODO: pass tags through too, and reconcile with similar logic
                        // in Arc.deserialize.
                        for (const store of manifest.stores) {
                            if (store instanceof StorageStub) {
                                this.arc._registerStore(await store.inflate(), []);
                            }
                            else {
                                this.arc._registerStore(store, []);
                            }
                        }
                        // TODO: Awaiting this promise causes tests to fail...
                        floatingPromiseToAudit(arc.instantiate(recipe0));
                    }
                    else {
                        error = `Recipe is not resolvable:\n${recipe0.toString({ showUnresolved: true })}`;
                    }
                }
                else {
                    error = `Recipe ${recipe0} could not be normalized:\n${[...options.errors.values()].join('\n')}`;
                }
            }
        }
        else {
            error = 'No recipe defined';
        }
        this.SimpleCallback(callback, error ? { error } : successResponse);
    }
    // TODO(sjmiles): experimental `output` impl
    onOutput(particle, content) {
        const composer = this.arc.pec.slotComposer;
        if (composer && composer['delegateOutput']) {
            composer['delegateOutput'](this.arc, particle, content);
        }
    }
    onReportExceptionInHost(exception) {
        if (!exception.particleName) {
            exception.particleName = this.arc.loadedParticleInfo.get(exception.particleId).spec.name;
        }
        reportSystemException(exception);
    }
    // TODO(sjmiles): experimental `services` impl
    async onServiceRequest(particle, request, callback) {
        const response = await Services.request(request);
        this.SimpleCallback(callback, response);
    }
}
//# sourceMappingURL=particle-execution-host.js.map