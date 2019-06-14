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
export declare type RenderModel = object;
/**
 * Particle that interoperates with DOM.
 */
export declare class DomParticleBase extends Particle {
    private currentSlotName;
    /**
     * Override to return a String defining primary markup.
     */
    readonly template: string;
    /**
     * Override to return a String defining primary markup for the given slot name.
     */
    getTemplate(slotName: string): string;
    /**
     * Override to return a String defining the name of the template for the given slot name.
     */
    getTemplateName(slotName: string): string;
    /**
     * Override to return false if the Particle won't use it's slot.
     */
    shouldRender(stateArgs?: any): boolean;
    /**
     * Override to return a dictionary to map into the template.
     */
    render(stateArgs?: any): RenderModel;
    renderSlot(slotName: string, contentTypes: string[]): void;
    private slotNamesToModelReferences;
    private enhanceModelWithSlotIDs;
    protected _getStateArgs(): any[];
    forceRenderTemplate(slotName?: string): void;
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
    updateSingleton(handleName: string, rawData: any): Promise<import("./entity.js").EntityInterface>;
    /**
     * Modify or insert `entity` into named handle.
     * Modification is done by removing the old entity and reinserting the new one.
     */
    updateCollection(handleName: string, entity: Entity): Promise<void>;
    /**
     * Return array of Entities dereferenced from array of Share-Type Entities
     */
    derefShares(shares: any): Promise<Entity[]>;
    /**
     * Returns array of Entities found in BOXED data `box` that are owned by `userid`
     */
    boxQuery(box: any, userid: any): Promise<{}[]>;
}
