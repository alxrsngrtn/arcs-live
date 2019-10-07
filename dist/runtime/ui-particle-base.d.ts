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
    private currentSlotName;
    /**
     * Override if necessary, to modify superclass config.
     */
    readonly config: UiParticleConfig;
    /**
     * Override to return a template.
     */
    readonly template: string;
    /**
     * Override to return a String defining primary markup for the given slot name.
     */
    /**
     * Override to return a String defining the name of the template for the given slot name.
     */
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
    protected _getStateArgs(): any[];
    fireEvent(slotName: string, { handler, data }: {
        handler: any;
        data: any;
    }): void;
    setParticleDescription(pattern: string | {
        template: any;
        model: {};
    }): Promise<boolean | undefined>;
    /**
     * Remove all entities from named handle.
     */
    clearHandle(handleName: string): Promise<void>;
    /**
     * Merge entities from Array into named handle.
     */
    mergeEntitiesToHandle(handleName: string, entities: Entity[]): Promise<void>;
    /**
     * Append entities from Array to named handle.
     */
    appendEntitiesToHandle(handleName: string, entities: Entity[]): Promise<void>;
    /**
     * Create an entity from each rawData, and append to named handle.
     */
    appendRawDataToHandle(handleName: string, rawDataArray: any): Promise<void>;
    /**
     * Modify value of named handle. A new entity is created
     * from `rawData` (`new [EntityClass](rawData)`).
     */
    updateSingleton(handleName: string, rawData: any): Promise<Entity>;
    /**
     * Modify or insert `entity` into named handle.
     * Modification is done by removing the old entity and reinserting the new one.
     */
    updateCollection(handleName: string, entity: Entity): Promise<void>;
    set(handleName: any, value: any): Promise<any>;
    /**
     * Return array of Entities dereferenced from array of Share-Type Entities
     */
    derefShares(shares: any): Promise<Entity[]>;
    /**
     * Returns array of Entities found in BOXED data `box` that are owned by `userid`
     */
    boxQuery(box: any, userid: any): Promise<{}[]>;
}
