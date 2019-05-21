import { Particle } from './recipe/particle.js';
import { Arc } from './arc.js';
export interface ArcInspectorFactory {
    create(arc: Arc): ArcInspector;
}
/**
 * Interface for inspecting an Arc and receiving notifications of updates.
 */
export interface ArcInspector {
    isActive(): boolean;
    onceActive: Promise<void>;
    /**
     * Notifies of a recipe instantiated in the arc.
     *
     * @param particles particles instantiated in the arc
     * @param activeRecipe resulting active recipe that the arc holds
     */
    recipeInstantiated(particles: Particle[], activeRecipe: string): void;
    /**
     * Notifies of a message exchanged over the Particle Execution Context.
     */
    pecMessage(methodName: string, body: object, pecMsgCount: number, stackString: string): void;
}
