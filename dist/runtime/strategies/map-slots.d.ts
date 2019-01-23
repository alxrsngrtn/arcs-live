import { Strategy } from '../../planning/strategizer.js';
import { SlotConnection } from '../recipe/slot-connection.js';
import { Particle } from '../recipe/particle.js';
import { SlotSpec, ProvidedSlotSpec } from '../particle-spec.js';
import { Slot } from '../recipe/slot.js';
export declare class MapSlots extends Strategy {
    generate(inputParams: any): any;
    static connectSlotConnection(slotConnection: any, selectedSlot: any): void;
    static findAllSlotCandidates(particle: Particle, slotSpec: SlotSpec, arc: any): {
        local: any;
        remote: any;
    };
    static _findSlotCandidates(particle: Particle, slotSpec: SlotSpec, slots: any): any;
    static slotMatches(particle: Particle, slotSpec: SlotSpec, slot: any): boolean;
    static specMatch(slotSpec: any, providedSlotSpec: any): boolean;
    static handlesMatch(particle: Particle, slot: any): boolean;
    static tagsOrNameMatch(consumeSlotSpec: SlotSpec, provideSlotSpec: ProvidedSlotSpec, consumeSlotConn?: SlotConnection, provideSlot?: Slot): boolean;
}
