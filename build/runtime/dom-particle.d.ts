/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/// <reference types="node" />
import { DomParticleBase, RenderModel } from './dom-particle-base.js';
import { Handle } from './handle.js';
import { Runnable } from './hot.js';
export interface StatefulDomParticle extends DomParticleBase {
    _invalidate(): void;
}
export interface DomParticle extends StatefulDomParticle {
}
export interface DomParticleConfig {
    handleNames: string[];
    slotNames: string[];
}
declare const DomParticle_base: any;
/**
 * Particle that interoperates with DOM and uses a simple state system
 * to handle updates.
 */
export declare class DomParticle extends DomParticle_base {
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
    render(...args: any[]): RenderModel;
    /**
     * Copy values from `state` into the particle's internal state,
     * triggering an update cycle unless currently updating.
     */
    setState(state: any): boolean | undefined;
    /**
     * Getters and setters for working with state/props.
     */
    /**
    * Syntactic sugar: `this.state = {state}` is equivalent to `this.setState(state)`.
    */
    state: any;
    readonly props: any;
    /**
     * Override if necessary, to modify superclass config.
     */
    readonly config: DomParticleConfig;
    _willReceiveProps(...args: any[]): void;
    _update(...args: any[]): void;
    _async(fn: any): NodeJS.Timeout;
    setHandles(handles: ReadonlyMap<string, Handle>): Promise<void>;
    /**
     * This is called once during particle setup. Override to control sync and update
     * configuration on specific handles (via their configure() method).
     * `handles` is a map from names to handle instances.
     */
    configureHandles(handles: ReadonlyMap<string, Handle>): void;
    onHandleSync(handle: Handle, model: RenderModel): Promise<void>;
    onHandleUpdate({ name }: Handle, { data, added, removed }: {
        data: any;
        added: any;
        removed: any;
    }): Promise<void>;
    fireEvent(slotName: string, { handler, data }: {
        handler: any;
        data: any;
    }): void;
    debounce(key: string, func: Runnable, delay: number): void;
}
export {};
