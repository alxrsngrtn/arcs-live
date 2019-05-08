import { ProvideSlotConnectionSpec, ConsumeSlotConnectionSpec } from '../particle-spec.js';
import { Particle } from './particle.js';
import { Recipe } from './recipe.js';
import { SlotConnection } from './slot-connection.js';
import { Slot } from './slot.js';
export declare class SlotUtils {
    static getClonedSlot(recipe: Recipe, selectedSlot: any): Slot;
    static connectSlotConnection(slotConnection: SlotConnection, selectedSlot: Slot): void;
    static findAllSlotCandidates(particle: Particle, slotSpec: ConsumeSlotConnectionSpec, arc: any): {
        local: any;
        remote: any;
    };
    private static _findSlotCandidates;
    static slotMatches(particle: Particle, slotSpec: ConsumeSlotConnectionSpec, slot: any): boolean;
    static specMatch(slotSpec: any, providedSlotSpec: any): boolean;
    static handlesMatch(particle: Particle, slot: any): boolean;
    static tagsOrNameMatch(consumeSlotSpec: ConsumeSlotConnectionSpec, provideSlotSpec: ProvideSlotConnectionSpec, consumeSlotConn?: SlotConnection, provideSlot?: Slot): boolean;
    static replaceOldSlot(recipe: Recipe, oldSlot: Slot, newSlot: Slot): boolean;
}
