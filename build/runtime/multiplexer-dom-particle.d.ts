import { ParticleSpec } from './particle-spec.js';
import { TransformationDomParticle } from './transformation-dom-particle.js';
import { Handle } from './handle.js';
import { InnerArcHandle } from './particle-execution-context.js';
import { Type } from './type.js';
import { Content } from './slot-consumer.js';
export declare class MultiplexerDomParticle extends TransformationDomParticle {
    private _itemSubIdByHostedSlotId;
    private _connByHostedConn;
    handleIds: {
        [key: string]: Promise<Handle>;
    };
    _mapParticleConnections(listHandleName: string, particleHandleName: string, hostedParticle: ParticleSpec, handles: ReadonlyMap<string, Handle>, arc: any): Promise<string[][]>;
    setHandles(handles: ReadonlyMap<string, Handle>): Promise<void>;
    willReceiveProps({ list }: {
        list: any;
    }, { arc, type, hostedParticle, otherMappedHandles, otherConnections }: {
        arc: InnerArcHandle;
        type: Type;
        hostedParticle: ParticleSpec;
        otherMappedHandles: string[];
        otherConnections: string[];
    }): Promise<void>;
    combineHostedModel(slotName: string, hostedSlotId: string, content: Content): void;
    combineHostedTemplate(slotName: string, hostedSlotId: string, content: Content): void;
    constructInnerRecipe?(hostedParticle: any, item: any, itemHandle: any, slot: any, other: any): string;
    getListEntries(list: any[]): IterableIterator<[number, any]>;
}
