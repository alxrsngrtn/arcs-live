/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ArcDebugListenerDerived } from '../../runtime/debug/abstract-devtools-channel.js';
import { Arc } from '../arc.js';
import { Particle } from '../recipe/particle.js';
export declare class ArcDebugHandler {
    private arcDevtoolsChannel;
    constructor(arc: Arc, listenerClasses: ArcDebugListenerDerived[]);
    recipeInstantiated({ particles, activeRecipe }: {
        particles: Particle[];
        activeRecipe: string;
    }): void;
    sendEnvironmentMessage(arc: Arc): void;
}
export declare const defaultCoreDebugListeners: ArcDebugListenerDerived[];
