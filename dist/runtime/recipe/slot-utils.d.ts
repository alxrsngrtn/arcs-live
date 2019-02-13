import { ProvidedSlotSpec, SlotSpec } from '../particle-spec.js';
import { Particle } from './particle.js';
import { Recipe } from './recipe.js';
import { SlotConnection } from './slot-connection.js';
import { Slot } from './slot.js';
export declare class SlotUtils {
    static getClonedSlot(recipe: any, selectedSlot: any): any;
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
    static replaceOldSlot(recipe: Recipe, oldSlot: Slot, newSlot: Slot): boolean;
}
