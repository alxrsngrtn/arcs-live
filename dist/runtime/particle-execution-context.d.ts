/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Handle } from './handle.js';
import { Id, IdGenerator } from './id.js';
import { Loader } from './loader.js';
import { ParticleSpec } from './particle-spec.js';
import { Particle } from './particle.js';
import { StorageProxy } from './storage-proxy.js';
import { Type } from './type.js';
import { MessagePort } from './message-channel.js';
export declare type PecFactory = (pecId: Id, idGenerator: IdGenerator) => MessagePort;
export declare type InnerArcHandle = {
    createHandle(type: Type, name: string, hostParticle?: Particle): Promise<Handle>;
    mapHandle(handle: Handle): Promise<string>;
    createSlot(transformationParticle: Particle, transformationSlotName: string, handleId: string): Promise<string>;
    loadRecipe(recipe: string): Promise<{
        error?: string;
    }>;
};
export declare class ParticleExecutionContext {
    private apiPort;
    private particles;
    private readonly pecId;
    private readonly idGenerator;
    private loader;
    private pendingLoads;
    private scheduler;
    private keyedProxies;
    constructor(port: any, pecId: Id, idGenerator: IdGenerator, loader: Loader);
    generateID(): string;
    innerArcHandle(arcId: string, particleId: string): InnerArcHandle;
    getStorageProxy(storageKey: any, type: any): StorageProxy | Promise<StorageProxy>;
    defaultCapabilitySet(): {
        constructInnerArc: (particle: any) => Promise<InnerArcHandle>;
    };
    _instantiateParticle(id: string, spec: ParticleSpec, proxies: Map<string, StorageProxy>): Promise<any[]>;
    readonly relevance: Map<any, any>;
    readonly busy: boolean;
    readonly idle: Promise<any>;
}
