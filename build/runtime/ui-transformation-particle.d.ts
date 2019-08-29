/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { UiParticle } from './ui-particle.js';
/**
 * Particle that does transformation.
 */
export declare class UiTransformationParticle extends UiParticle {
    getTemplate(slotName: string): any;
    getTemplateName(slotName: string): any;
    render(props: any, state: any): any;
    shouldRender(props: any, state: any): boolean;
    static propsToItems(propsValues: any): any;
}
