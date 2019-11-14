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
import { UiParticleBase } from './ui-particle-base.js';
import { Handle } from './handle.js';
import { Runnable } from './hot.js';
export interface UiStatefulParticle extends UiParticleBase {
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
     * Copy values from `state` into the particle's internal state,
     * triggering an update cycle unless currently updating.
     */
    setState(state: any): boolean | undefined;
    /**
     * Getters and setters for working with state/props.
     */
    get state(): any;
    /**
     * Syntactic sugar: `this.state = {state}` is equivalent to `this.setState(state)`.
     * This is a merge, not an assignment.
     */
    set state(state: any);
    get props(): any;
    _shouldUpdate(): boolean;
    _update(...args: any[]): void;
    _async(fn: any): NodeJS.Timeout;
    ready(): void;
    onHandleSync(handle: Handle, model: any): Promise<void>;
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
