import { Particle } from './particle';
import { PECInnerPort } from './api-channel';
/**
 * A representation of a consumed slot. Retrieved from a particle using
 * particle.getSlot(name)
 */
export declare class SlotProxy {
    readonly slotName: string;
    readonly particle: Particle;
    readonly providedSlots: Map<string, string>;
    private readonly apiPort;
    private handlers;
    requestedContentTypes: Set<string>;
    private _isRendered;
    constructor(apiPort: PECInnerPort, particle: Particle, slotName: string, providedSlots: Map<string, string>);
    readonly isRendered: boolean;
    /**
     * renders content to the slot.
     */
    render(content: any): void;
    /** @method registerEventHandler(name, f)
     * registers a callback to be invoked when 'name' event happens.
     */
    registerEventHandler(name: any, f: any): void;
    clearEventHandlers(name: any): void;
    fireEvent(event: any): void;
}
