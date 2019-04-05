import { TransformationDomParticle } from './transformation-dom-particle.js';
export declare class MultiplexerDomParticle extends TransformationDomParticle {
    constructor();
    _mapParticleConnections(listHandleName: any, particleHandleName: any, hostedParticle: any, handles: any, arc: any): Promise<any[][]>;
    setHandles(handles: any): Promise<void>;
    willReceiveProps({ list }: {
        list: any;
    }, { arc, type, hostedParticle, otherMappedHandles, otherConnections }: {
        arc: any;
        type: any;
        hostedParticle: any;
        otherMappedHandles: any;
        otherConnections: any;
    }): Promise<void>;
    combineHostedModel(slotName: any, hostedSlotId: any, content: any): void;
    combineHostedTemplate(slotName: any, hostedSlotId: any, content: any): void;
    constructInnerRecipe(hostedParticle: any, item: any, itemHandle: any, slot: any, other: any): void;
    getListEntries(list: any): any;
}
