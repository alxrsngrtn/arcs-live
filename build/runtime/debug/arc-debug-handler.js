/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { ArcDevtoolsChannel } from '../../runtime/debug/abstract-devtools-channel.js';
import { ArcStoresFetcher } from './arc-stores-fetcher.js';
import { DevtoolsConnection } from './devtools-connection.js';
import { enableTracingAdapter } from './tracing-adapter.js';
// Arc-independent handlers for devtools logic.
DevtoolsConnection.onceConnected.then(devtoolsChannel => {
    enableTracingAdapter(devtoolsChannel);
});
export class ArcDebugHandler {
    constructor(arc, listenerClasses) {
        this.arcDevtoolsChannel = null;
        if (arc.isStub)
            return;
        const connectedOnInstantiate = DevtoolsConnection.isConnected;
        DevtoolsConnection.onceConnected.then(devtoolsChannel => {
            if (!connectedOnInstantiate) {
                devtoolsChannel.send({
                    messageType: 'warning',
                    messageBody: 'pre-existing-arc'
                });
            }
            this.arcDevtoolsChannel = devtoolsChannel.forArc(arc);
            if (!!listenerClasses) { // undefined -> false
                listenerClasses.forEach(l => ArcDevtoolsChannel.instantiateListener(l, arc, this.arcDevtoolsChannel));
            }
            this.arcDevtoolsChannel.send({
                messageType: 'arc-available',
                messageBody: {
                    speculative: arc.isSpeculative
                }
            });
            this.sendEnvironmentMessage(arc);
        });
    }
    recipeInstantiated({ particles }) {
        if (!this.arcDevtoolsChannel)
            return;
        const truncate = ({ id, name }) => ({ id, name });
        const slotConnections = [];
        particles.forEach(p => Object.values(p.consumedSlotConnections).forEach(cs => {
            if (cs.targetSlot) {
                slotConnections.push({
                    particleId: cs.particle.id,
                    consumed: truncate(cs.targetSlot),
                    provided: Object.values(cs.providedSlots).map(slot => truncate(slot)),
                });
            }
        }));
        this.arcDevtoolsChannel.send({
            messageType: 'recipe-instantiated',
            messageBody: { slotConnections }
        });
    }
    sendEnvironmentMessage(arc) {
        const allManifests = [];
        (function traverse(manifest) {
            allManifests.push(manifest);
            manifest.imports.forEach(traverse);
        })(arc.context);
        this.arcDevtoolsChannel.send({
            messageType: 'arc-environment',
            messageBody: {
                recipes: arc.context.allRecipes.map(r => ({
                    name: r.name,
                    text: r.toString(),
                    file: allManifests.find(m => m.recipes.includes(r)).fileName
                })),
                particles: arc.context.allParticles.map(p => ({
                    name: p.name,
                    spec: p.toString(),
                    file: allManifests.find(m => m.particles.includes(p)).fileName
                }))
            }
        });
    }
}
// TODO: This should move to the core interface file when it exists. 
export const defaultCoreDebugListeners = [
    ArcStoresFetcher
];
//# sourceMappingURL=arc-debug-handler.js.map