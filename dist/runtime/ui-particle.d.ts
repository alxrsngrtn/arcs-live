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
import { UiSimpleParticle, RenderModel } from './ui-simple-particle.js';
import { Handle } from './handle.js';
import { Runnable } from './hot.js';
export interface UiStatefulParticle extends UiSimpleParticle {
    _invalidate(): void;
}
export interface UiParticle extends UiStatefulParticle {
}
declare const UiParticle_base: any;
/**
 * Particle that interoperates with DOM and uses a simple state system
 * to handle updates.
 */
export declare class UiParticle extends UiParticle_base {
    /**
     * Override if necessary, to do things when props change.
     * Avoid if possible, use `update` instead.
     */
    willReceiveProps(...args: any[]): void;
    _willReceiveProps(...args: any[]): void;
    /**
     * Override to do things when props or state change.
     */
    update(...args: any[]): void;
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
    * This is actually a merge, not an assignment.
    */
    state: any;
    readonly props: any;
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
