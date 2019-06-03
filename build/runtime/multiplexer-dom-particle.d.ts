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
import { TransformationDomParticle } from './transformation-dom-particle.js';
import { Handle } from './handle.js';
import { InnerArcHandle } from './particle-execution-context.js';
import { Type } from './type.js';
import { Content } from './slot-consumer.js';
import { Dictionary } from './hot.js';
export declare class MultiplexerDomParticle extends TransformationDomParticle {
    private _itemSubIdByHostedSlotId;
    private _connByHostedConn;
    handleIds: Dictionary<Promise<Handle>>;
    _mapParticleConnections(listHandleName: string, particleHandleName: string, hostedParticle: ParticleSpec, handles: ReadonlyMap<string, Handle>, arc: InnerArcHandle): Promise<string[][]>;
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
    combineHostedModel(slotName: string, hostedSlotId: string, content: Content): void;
    combineHostedTemplate(slotName: string, hostedSlotId: string, content: Content): void;
    constructInnerRecipe?(hostedParticle: any, item: any, itemHandle: any, slot: any, other: any): string;
    getListEntries(list: any[]): IterableIterator<[number, any]>;
}
