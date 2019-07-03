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
import { Runnable } from './hot.js';
import { MessagePort } from './message-channel.js';
import { Particle } from './recipe/particle.js';
import { SlotComposer } from './slot-composer.js';
import { Content } from './slot-consumer.js';
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
    private readonly _apiPorts;
    private readonly _portByParticle;
    close: Runnable;
    private readonly arc;
    private nextIdentifier;
    readonly slotComposer: SlotComposer;
    private idleVersion;
    private idlePromise;
    private idleResolve;
    constructor(slotComposer: SlotComposer, arc: Arc, ports: MessagePort[]);
    private choosePortForParticle;
    private getPort;
    stop(): void;
    readonly idle: Promise<Map<Particle, number[]>> | undefined;
    readonly messageCount: number;
    sendEvent(particle: any, slotName: any, event: any): void;
    instantiate(particle: Particle, stores: Map<string, StorageProviderBase>): void;
    startRender({ particle, slotName, providedSlots, contentTypes }: StartRenderOptions): void;
    stopRender({ particle, slotName }: StopRenderOptions): void;
    innerArcRender(transformationParticle: Particle, transformationSlotName: string, hostedSlotId: string, content: Content): void;
    resolveIfIdle(version: number, relevance: Map<Particle, number[]>): void;
}
