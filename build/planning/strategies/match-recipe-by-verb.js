/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../../platform/assert-web.js';
import { Handle } from '../../runtime/recipe/handle.js';
import { StrategizerWalker, Strategy } from '../strategizer.js';
export class MatchRecipeByVerb extends Strategy {
    async generate(inputParams) {
        const arc = this.arc;
        return StrategizerWalker.over(this.getResults(inputParams), new class extends StrategizerWalker {
            onParticle(recipe, particle) {
                if (particle.name) {
                    // Particle already has explicit name.
                    return undefined;
                }
                let recipes = arc.context.findRecipesByVerb(particle.primaryVerb);
                // Extract slot information from recipe. This is extracted in the form:
                // {consume-slot-name: targetSlot: <slot>, providedSlots: {provide-slot-name: <slot>}}
                //
                // Note that slots are only included if connected to other components of the recipe - e.g.
                // the target slot has a source connection.
                const slotConstraints = {};
                for (const consumeSlot of particle.getSlotConnections()) {
                    const targetSlot = consumeSlot.targetSlot && consumeSlot.targetSlot.sourceConnection ? consumeSlot.targetSlot : null;
                    slotConstraints[consumeSlot.name] = { targetSlot, providedSlots: {} };
                    for (const providedSlot of Object.keys(consumeSlot.providedSlots)) {
                        const sourceSlot = consumeSlot.providedSlots[providedSlot].consumeConnections.length > 0 ? consumeSlot.providedSlots[providedSlot] : null;
                        slotConstraints[consumeSlot.name].providedSlots[providedSlot] = sourceSlot;
                    }
                }
                const handleConstraints = { named: {}, unnamed: [] };
                for (const handleConnection of Object.values(particle.connections)) {
                    handleConstraints.named[handleConnection.name] = { direction: handleConnection.direction, handle: handleConnection.handle };
                }
                for (const unnamedConnection of particle.unnamedConnections) {
                    handleConstraints.unnamed.push({ direction: unnamedConnection.direction, handle: unnamedConnection.handle });
                }
                recipes = recipes.filter(recipe => MatchRecipeByVerb.satisfiesSlotConstraints(recipe, slotConstraints))
                    .filter(recipe => MatchRecipeByVerb.satisfiesHandleConstraints(recipe, handleConstraints));
                return recipes.map(recipe => {
                    return (outputRecipe, particleForReplacing) => {
                        const { particles } = recipe.mergeInto(outputRecipe);
                        particleForReplacing.remove();
                        for (const consumeSlot of Object.keys(slotConstraints)) {
                            const constraints = slotConstraints[consumeSlot];
                            if (constraints.targetSlot || Object.values(constraints.providedSlots).filter(a => a).length > 0) {
                                let slotMapped = false;
                                for (const particle of particles) {
                                    if (MatchRecipeByVerb.slotsMatchConstraint(particle, particle.getSlotSpecs(), consumeSlot, constraints.providedSlots)) {
                                        if (constraints.targetSlot) {
                                            const { mappedSlot } = outputRecipe.updateToClone({ mappedSlot: constraints.targetSlot });
                                            // if slotConnection doesn't exist, then create it before connecting it to slot.
                                            const consumeConn = particle.getSlotConnectionByName(consumeSlot) || particle.addSlotConnection(consumeSlot);
                                            consumeConn.targetSlot = mappedSlot;
                                            mappedSlot.consumeConnections.push(consumeConn);
                                        }
                                        for (const slotName of Object.keys(constraints.providedSlots)) {
                                            const slot = constraints.providedSlots[slotName];
                                            if (!slot) {
                                                continue;
                                            }
                                            const { mappedSlot } = outputRecipe.updateToClone({ mappedSlot: slot });
                                            const consumeConn = particle.getSlotConnectionByName(consumeSlot) || particle.addSlotConnection(consumeSlot);
                                            consumeConn.providedSlots[slotName].remove();
                                            consumeConn.providedSlots[slotName] = mappedSlot;
                                            mappedSlot._sourceConnection = consumeConn;
                                        }
                                        slotMapped = true;
                                        break;
                                    }
                                }
                                assert(slotMapped);
                            }
                        }
                        function tryApplyHandleConstraint(name, connSpec, particle, constraint, handle) {
                            let connection = particle.connections[name];
                            if (connection && connection.handle) {
                                return false;
                            }
                            if (!MatchRecipeByVerb.connectionMatchesConstraint(connection || connSpec, constraint)) {
                                return false;
                            }
                            connection = connection || particle.addConnectionName(connSpec.name);
                            for (let i = 0; i < handle.connections.length; i++) {
                                const candidate = handle.connections[i];
                                // TODO candidate.name === name triggers test failures
                                // tslint:disable-next-line: triple-equals
                                if (candidate.particle === particleForReplacing && candidate.name == name) {
                                    connection._handle = handle;
                                    handle.connections[i] = connection;
                                    return true;
                                }
                            }
                            return false;
                        }
                        function applyHandleConstraint(name, constraint, handle) {
                            const { mappedHandle } = outputRecipe.updateToClone({ mappedHandle: handle });
                            for (const particle of particles) {
                                if (name) {
                                    if (tryApplyHandleConstraint(name, particle.spec.getConnectionByName(name), particle, constraint, mappedHandle)) {
                                        return true;
                                    }
                                }
                                else {
                                    for (const connSpec of particle.spec.handleConnections) {
                                        if (tryApplyHandleConstraint(name, connSpec, particle, constraint, mappedHandle)) {
                                            return true;
                                        }
                                    }
                                }
                            }
                            return false;
                        }
                        for (const name in handleConstraints.named) {
                            if (handleConstraints.named[name].handle) {
                                assert(applyHandleConstraint(name, handleConstraints.named[name], handleConstraints.named[name].handle));
                            }
                        }
                        for (const connection of handleConstraints.unnamed) {
                            if (connection.handle) {
                                assert(applyHandleConstraint(null, connection, connection.handle));
                            }
                        }
                        return 1;
                    };
                });
            }
        }(StrategizerWalker.Permuted), this);
    }
    static satisfiesHandleConstraints(recipe, handleConstraints) {
        for (const handleName in handleConstraints.named) {
            if (!MatchRecipeByVerb.satisfiesHandleConnection(recipe, handleName, handleConstraints.named[handleName])) {
                return false;
            }
        }
        for (const handleConstraint of handleConstraints.unnamed) {
            if (!MatchRecipeByVerb.satisfiesUnnamedHandleConnection(recipe, handleConstraint)) {
                return false;
            }
        }
        return true;
    }
    static satisfiesUnnamedHandleConnection(recipe, handleConstraint) {
        // refuse to match unnamed handle connections unless some type information is present.
        if (!handleConstraint.handle) {
            return false;
        }
        for (const particle of recipe.particles) {
            for (const connection of Object.values(particle.connections)) {
                if (MatchRecipeByVerb.connectionMatchesConstraint(connection, handleConstraint)) {
                    return true;
                }
            }
            if (particle.spec) {
                for (const connectionSpec of particle.spec.handleConnections) {
                    if (MatchRecipeByVerb.connectionSpecMatchesConstraint(connectionSpec, handleConstraint)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    static satisfiesHandleConnection(recipe, handleName, handleConstraint) {
        for (const particle of recipe.particles) {
            if (particle.connections[handleName]) {
                if (MatchRecipeByVerb.connectionMatchesConstraint(particle.connections[handleName], handleConstraint)) {
                    return true;
                }
            }
            else if (particle.spec && particle.spec.getConnectionByName(handleName)) {
                if (MatchRecipeByVerb.connectionSpecMatchesConstraint(particle.spec.getConnectionByName(handleName), handleConstraint)) {
                    return true;
                }
            }
        }
        return false;
    }
    static connectionSpecMatchesConstraint(connSpec, handleConstraint) {
        if (connSpec.direction !== handleConstraint.direction) {
            return false;
        }
        return true;
    }
    static connectionMatchesConstraint(connection, handleConstraint) {
        if (connection.direction !== handleConstraint.direction) {
            return false;
        }
        if (!handleConstraint.handle) {
            return true;
        }
        const connections = [...handleConstraint.handle.connections, connection];
        return Boolean(Handle.effectiveType(handleConstraint.handle.mappedType, connections));
    }
    static satisfiesSlotConstraints(recipe, slotConstraints) {
        for (const slotName in slotConstraints) {
            if (!MatchRecipeByVerb.satisfiesSlotConnection(recipe, slotName, slotConstraints[slotName])) {
                return false;
            }
        }
        return true;
    }
    static satisfiesSlotConnection(recipe, slotName, constraints) {
        for (const particle of recipe.particles) {
            if (!particle.spec)
                continue;
            if (MatchRecipeByVerb.slotsMatchConstraint(particle, particle.getSlotSpecs(), slotName, constraints)) {
                return true;
            }
        }
        return false;
    }
    static slotsMatchConstraint(particle, slotSpecs, name, constraints) {
        if (!slotSpecs.get(name)) {
            return false;
        }
        const slotConn = particle.getSlotConnectionBySpec(slotSpecs.get(name));
        if (slotConn && slotConn.targetSlot && constraints.targetSlot) {
            return false;
        }
        for (const provideName in constraints.providedSlots) {
            if (slotSpecs.get(name).provideSlotConnections.find(spec => spec.name === provideName) === undefined) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=match-recipe-by-verb.js.map