/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Arc } from './arc.js';
import { Particle } from './recipe/particle.js';
import { SlotComposer } from './slot-composer.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
export declare type StartRenderOptions = {
    particle: Particle;
    slotName: string;
    providedSlots: Map<string, string>;
    contentTypes: string[];
};
export declare type StopRenderOptions = {
    particle: Particle;
    slotName: string;
};
export declare class ParticleExecutionHost {
    private _apiPort;
    close: () => void;
    private arc;
    private nextIdentifier;
    slotComposer: SlotComposer;
    private idleVersion;
    private idlePromise;
    private idleResolve;
    constructor(port: any, slotComposer: SlotComposer, arc: Arc);
    stop(): void;
    readonly idle: Promise<Map<Particle, number[]>>;
    readonly messageCount: number;
    sendEvent(particle: any, slotName: any, event: any): void;
    instantiate(particle: Particle, stores: Map<string, StorageProviderBase>): void;
    startRender({ particle, slotName, providedSlots, contentTypes }: StartRenderOptions): void;
    stopRender({ particle, slotName }: StopRenderOptions): void;
    innerArcRender(transformationParticle: Particle, transformationSlotName: string, hostedSlotId: string, content: any): void;
}
