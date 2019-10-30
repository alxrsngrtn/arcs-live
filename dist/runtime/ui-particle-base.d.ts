/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Entity } from './entity.js';
import { Particle } from './particle.js';
export interface UiParticleConfig {
    handleNames: string[];
    slotNames: string[];
}
export declare type RenderModel = object;
/**
 * Particle that can render and process events.
 */
export declare class UiParticleBase extends Particle {
    /**
     * Override if necessary, to modify superclass config.
     */
    readonly config: UiParticleConfig;
    /**
     * Override to return a template.
     */
    readonly template: string;
    /**
     * Override to return false if the Particle isn't ready to `render()`
     */
    shouldRender(...args: any[]): boolean;
    renderOutput(...args: any[]): void;
    renderModel(model: any): void;
    /**
     * Override to return a dictionary to map into the template.
     */
    render(...args: any[]): RenderModel;
    fireEvent(slotName: string, { handler, data }: {
        handler: any;
        data: any;
    }): void;
    setParticleDescription(pattern: string | {
        template: any;
        model: {};
    }): Promise<boolean | undefined>;
    /**
     * Invoke async function `task` with Particle busy-guard.
     */
    await(task: (p: this) => Promise<any>): Promise<any>;
    /**
     * Set a singleton value. Value can be an Entity or a POJO.
     */
    set(handleName: string, value: Entity | {}): Promise<void>;
    /**
     * Add to a collection. Value can be an Entity or a POJO (or an Array of such values).
     */
    add(handleName: string, value: Entity | {} | [Entity] | [{}]): Promise<void>;
    private _requireEntity;
    /**
     * Remove from a collection. Value must be an Entity or an array of Entities.
     */
    remove(handleName: string, value: Entity | [Entity]): Promise<void>;
    private _remove;
    /**
     * Remove all entities from named handle.
     */
    clear(handleName: string): Promise<void>;
    /**
     * Return the named handle or throw.
     */
    private _requireHandle;
    /**
     * Return array of Entities dereferenced from array of Share-Type Entities
     */
    derefShares(shares: any): Promise<Entity[]>;
    /**
     * Returns array of Entities found in BOXED data `box` that are owned by `userid`
     */
    boxQuery(box: any, userid: any): Promise<{}[]>;
}
