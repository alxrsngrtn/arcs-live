import { Arc } from './arc.js';
import { SlotComposer } from './slot-composer.js';
export declare class ParticleExecutionHost {
    private _apiPort;
    close: () => void;
    private arc;
    private nextIdentifier;
    slotComposer: SlotComposer;
    private idleVersion;
    private idlePromise;
    private idleResolve;
    constructor(port: any, slotComposer: SlotComposer, arc: Arc);
    stop(): void;
    readonly idle: Promise<number>;
    readonly messageCount: any;
    sendEvent(particle: any, slotName: any, event: any): void;
    instantiate(particle: any, spec: any, handles: any): any;
    startRender({ particle, slotName, providedSlots, contentTypes }: {
        particle: any;
        slotName: any;
        providedSlots: any;
        contentTypes: any;
    }): void;
    stopRender({ particle, slotName }: {
        particle: any;
        slotName: any;
    }): void;
    innerArcRender(transformationParticle: any, transformationSlotName: any, hostedSlotId: any, content: any): void;
}
