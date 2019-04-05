import { DomParticle } from './dom-particle.js';
/** @class TransformationDomParticle
 * Particle that does transformation stuff with DOM.
 */
export declare class TransformationDomParticle extends DomParticle {
    getTemplate(slotName: any): any;
    getTemplateName(slotName: any): any;
    render(props: any, state: any): any;
    shouldRender(props: any, state: any): boolean;
    renderHostedSlot(slotName: any, hostedSlotId: any, content: any): void;
    combineHostedTemplate(slotName: any, hostedSlotId: any, content: any): void;
    combineHostedModel(slotName: any, hostedSlotId: any, content: any): void;
    static propsToItems(propsValues: any): any;
}
