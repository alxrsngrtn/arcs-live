/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ParticleSpec } from './particle-spec.js';
import { UiTransformationParticle } from './ui-transformation-particle.js';
import { Handle } from './handle.js';
import { InnerArcHandle } from './particle-execution-context.js';
import { Type } from './type.js';
export declare class UiMultiplexerParticle extends UiTransformationParticle {
    plexeds: any;
    setHandles(handles: ReadonlyMap<string, Handle>): Promise<void>;
    update({ list }: {
        list: any;
    }, { arc, type, hostedParticle, otherMappedHandles, otherConnections }: {
        arc: InnerArcHandle;
        type: Type;
        hostedParticle: ParticleSpec;
        otherMappedHandles: string[];
        otherConnections: string[];
    }, oldProps: any, oldState: any): Promise<void>;
    updateEntry(index: any, item: any, { hostedParticle, arc, type, otherConnections, otherMappedHandles }: {
        hostedParticle: any;
        arc: any;
        type: any;
        otherConnections: any;
        otherMappedHandles: any;
    }): Promise<any>;
    requirePlexed(index: any, item: any, { arc, type, hostedParticle, otherConnections, otherMappedHandles }: {
        arc: any;
        type: any;
        hostedParticle: any;
        otherConnections: any;
        otherMappedHandles: any;
    }): Promise<any>;
    resolveHosting(item: any, { arc, hostedParticle, otherConnections, otherMappedHandles }: {
        arc: any;
        hostedParticle: any;
        otherConnections: any;
        otherMappedHandles: any;
    }): Promise<{
        hostedParticle: any;
        otherConnections: any;
        otherMappedHandles: any;
    }>;
    acquireItemHandle(index: any, { arc, item, type }: {
        arc: any;
        item: any;
        type: any;
    }): Promise<any>;
    resolveHostedParticle(item: any, arc: any): Promise<{
        otherConnections: string[];
        otherMappedHandles: string[];
        hostedParticle: ParticleSpec;
    }>;
    _mapParticleConnections(listHandleName: string, particleHandleName: string, hostedParticle: ParticleSpec, handles: ReadonlyMap<string, Handle>, arc: InnerArcHandle): Promise<{
        otherMappedHandles: string[];
        otherConnections: string[];
    }>;
    createInnards(item: any, { arc, handle, hosting: { hostedParticle, otherMappedHandles, otherConnections } }: {
        arc: any;
        handle: any;
        hosting: {
            hostedParticle: any;
            otherMappedHandles: any;
            otherConnections: any;
        };
    }): Promise<any>;
    getListEntries(list: {}[]): IterableIterator<[number, {}]>;
    constructInnerRecipe?(hostedParticle: any, item: any, itemHandle: any, slot: any, other: any): string;
}
