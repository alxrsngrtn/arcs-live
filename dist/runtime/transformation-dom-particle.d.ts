/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { DomParticle } from './dom-particle.js';
/**
 * Particle that does transformation stuff with DOM.
 */
export declare class TransformationDomParticle extends DomParticle {
    getTemplate(slotName: string): any;
    getTemplateName(slotName: string): any;
    render(props: any, state: any): any;
    shouldRender(props: any, state: any): boolean;
    renderHostedSlot(slotName: any, hostedSlotId: any, content: any): void;
    combineHostedTemplate(slotName: string, hostedSlotId: any, content: any): void;
    combineHostedModel(slotName: any, hostedSlotId: any, content: any): void;
    static propsToItems(propsValues: any): any;
}
