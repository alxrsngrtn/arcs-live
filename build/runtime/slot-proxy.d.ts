/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Particle } from './particle';
import { PECInnerPort } from './api-channel';
/**
 * A representation of a consumed slot. Retrieved from a particle using
 * particle.getSlot(name)
 */
export declare class SlotProxy {
    readonly slotName: string;
    readonly particle: Particle;
    readonly providedSlots: ReadonlyMap<string, string>;
    private readonly apiPort;
    private readonly handlers;
    readonly requestedContentTypes: Set<string>;
    private _isRendered;
    constructor(apiPort: PECInnerPort, particle: Particle, slotName: string, providedSlots: ReadonlyMap<string, string>);
    readonly isRendered: boolean;
    /**
     * renders content to the slot.
     */
    render(content: any): void;
    /**
     * registers a callback to be invoked when 'name' event happens.
     */
    registerEventHandler(name: string, f: any): void;
    clearEventHandlers(name: string): void;
    fireEvent(event: any): void;
}
