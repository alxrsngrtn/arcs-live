/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DomParticleBase } from './dom-particle-base.js';
import { Handle } from './handle.js';
interface StatefulDomParticle extends DomParticleBase {
    _invalidate(): void;
}
export interface DomParticle extends StatefulDomParticle {
}
declare const DomParticle_base: any;
/**
 * Particle that interoperates with DOM and uses a simple state system
 * to handle updates.
 */
export declare class DomParticle extends DomParticle_base {
    _handlesToSync: Set<string>;
    constructor();
    /**
     * Override if necessary, to do things when props change.
     */
    willReceiveProps(...args: any[]): void;
    /**
     * Override if necessary, to modify superclass config.
     */
    update(...args: any[]): void;
    /**
     * Override to return false if the Particle won't use
     * it's slot.
     */
    shouldRender(...args: any[]): boolean;
    /**
     * Override to return a dictionary to map into the template.
     */
    render(...args: any[]): {};
    /**
     * Copy values from `state` into the particle's internal state,
     * triggering an update cycle unless currently updating.
     */
    setState(state: any): any;
    /**
     * Added getters and setters to support usage of .state.
     */
    state: any;
    readonly props: any;
    /**
     * This is called once during particle setup. Override to control sync and update
     * configuration on specific handles (via their configure() method).
     * `handles` is a map from names to handle instances.
     */
    configureHandles(handles: ReadonlyMap<string, Handle>): void;
    /**
     * Override if necessary, to modify superclass config.
     */
    readonly config: {
        handleNames: string[];
        slotNames: string[];
    };
    _willReceiveProps(...args: any[]): void;
    _update(...args: any[]): void;
    /** @deprecated */
    readonly _views: ReadonlyMap<string, Handle>;
    setHandles(handles: ReadonlyMap<string, Handle>): Promise<void>;
    onHandleSync(handle: Handle, model: any): Promise<void>;
    onHandleUpdate(handle: Handle, update: any): Promise<void>;
    _handlesToProps(): Promise<void>;
    _addNamedHandleData(dictionary: any, handleName: any): Promise<void>;
    _getHandleData(handle: Handle): Promise<any>;
    fireEvent(slotName: string, { handler, data }: {
        handler: any;
        data: any;
    }): void;
    _debounce(key: string, func: Function, delay: number): void;
}
export {};
