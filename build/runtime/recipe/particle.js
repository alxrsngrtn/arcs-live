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
import { HandleConnection } from './handle-connection.js';
import { RequireSection } from './recipe.js';
import { TypeChecker } from './type-checker.js';
import { SlotConnection } from './slot-connection.js';
import { compareArrays, compareComparables, compareStrings } from './comparable.js';
export class Particle {
    constructor(recipe, name) {
        this._id = undefined;
        this._localName = undefined;
        this.spec = undefined;
        this._verbs = [];
        this._tags = [];
        this._connections = {};
        // TODO: replace with constraint connections on the recipe
        this._unnamedConnections = [];
        // map of consumed Slot connections by slot name.
        this._consumedSlotConnections = {};
        assert(recipe);
        this._recipe = recipe;
        this._name = name;
    }
    _copyInto(recipe, cloneMap, variableMap) {
        const particle = recipe.newParticle(this._name);
        particle._id = this._id;
        particle._verbs = [...this._verbs];
        particle._tags = [...this._tags];
        particle.spec = this.spec ? this.spec.cloneWithResolutions(variableMap) : undefined;
        Object.keys(this._connections).forEach(key => {
            particle._connections[key] = this._connections[key]._clone(particle, cloneMap);
        });
        particle._unnamedConnections = this._unnamedConnections.map(connection => connection._clone(particle, cloneMap));
        particle._cloneConnectionRawTypes(variableMap);
        for (const [key, slotConn] of Object.entries(this.consumedSlotConnections)) {
            particle._consumedSlotConnections[key] = slotConn._clone(particle, cloneMap);
            // if recipe is a requireSection, then slot may already exist in recipe.
            if (cloneMap.has(slotConn.targetSlot)) {
                assert(recipe instanceof RequireSection);
                const targetSlot = cloneMap.get(slotConn.targetSlot);
                particle.consumedSlotConnections[key].connectToSlot(targetSlot);
                if (particle.recipe.slots.indexOf(targetSlot) === -1) {
                    particle.recipe.slots.push(targetSlot);
                }
            }
            for (const [name, slot] of Object.entries(slotConn.providedSlots)) {
                if (cloneMap.has(slot)) {
                    assert(recipe instanceof RequireSection);
                    const clonedSlot = cloneMap.get(slot);
                    clonedSlot.sourceConnection = particle.consumedSlotConnections[key];
                    particle.consumedSlotConnections[key].providedSlots[name] = clonedSlot;
                    if (particle.recipe.slots.indexOf(clonedSlot) === -1) {
                        particle.recipe.slots.push(clonedSlot);
                    }
                }
            }
        }
        return particle;
    }
    _cloneConnectionRawTypes(variableMap) {
        for (const connection of Object.values(this._connections)) {
            connection.cloneTypeWithResolutions(variableMap);
        }
        for (const connection of this._unnamedConnections) {
            connection.cloneTypeWithResolutions(variableMap);
        }
    }
    _startNormalize() {
        this._localName = null;
        this._verbs.sort();
        this._tags.sort();
        const normalizedConnections = {};
        for (const key of (Object.keys(this._connections).sort())) {
            normalizedConnections[key] = this._connections[key];
        }
        this._connections = normalizedConnections;
        const normalizedSlotConnections = {};
        for (const key of (Object.keys(this.consumedSlotConnections).sort())) {
            normalizedSlotConnections[key] = this.consumedSlotConnections[key];
        }
        this._consumedSlotConnections = normalizedSlotConnections;
    }
    _finishNormalize() {
        this._unnamedConnections.sort(compareComparables);
        Object.freeze(this);
    }
    _compareTo(other) {
        let cmp;
        if ((cmp = compareStrings(this._id ? this._id.toString() : '', other._id ? other._id.toString() : '')) !== 0)
            return cmp;
        if ((cmp = compareStrings(this._name, other._name)) !== 0)
            return cmp;
        if ((cmp = compareStrings(this._localName, other._localName)) !== 0)
            return cmp;
        // TODO: spec?
        if ((cmp = compareArrays(this._verbs, other._verbs, compareStrings)) !== 0)
            return cmp;
        if ((cmp = compareArrays(this._tags, other._tags, compareStrings)) !== 0)
            return cmp;
        // TODO: slots
        return 0;
    }
    /**
     * Param particle matches this particle if the names are the same and the slot and handle requirements this particle
     * is a subset of the slot and handle requirements of the param particle.
     * @param particle
     */
    matches(particle) {
        if (this.name && particle.name && this.name !== particle.name)
            return false;
        for (const [name, slotConn] of Object.entries(this.consumedSlotConnections)) {
            if (particle.consumedSlotConnections[name] == undefined
                || particle.consumedSlotConnections[name].targetSlot == undefined)
                return false;
            if (slotConn.targetSlot && slotConn.targetSlot.id && slotConn.targetSlot.id !== particle.consumedSlotConnections[name].targetSlot.id)
                return false;
            for (const pname of Object.keys(slotConn.providedSlots)) {
                const slot = slotConn.providedSlots[pname];
                const pslot = particle.consumedSlotConnections[name].providedSlots[pname];
                if (pslot == undefined || (slot.id && pslot.id && slot.id !== pslot.id))
                    return false;
            }
        }
        return true;
    }
    _isValid(options) {
        if (!this.spec) {
            return true;
        }
        if (!this.name && !this.primaryVerb) {
            // Must have either name of a verb
            if (options && options.errors) {
                options.errors.set(this, `Particle has no name and no verb`);
            }
            return false;
        }
        // TODO: What
        return true;
    }
    isResolved(options = undefined) {
        assert(Object.isFrozen(this));
        if (!this.spec) {
            if (options && options.showUnresolved) {
                options.details = 'missing spec';
            }
            return false;
        }
        const slandleConnections = Object.values(this.connections).filter(connection => connection.type.isSlot()
            || (connection.type.isCollectionType() && connection.type.getContainedType().isSlot()));
        if (slandleConnections.length === 0 && this.spec.slotConnections.size > 0) {
            const fulfilledSlotConnections = Object.values(this.consumedSlotConnections).filter(connection => connection.targetSlot !== undefined);
            if (fulfilledSlotConnections.length === 0) {
                if (options && options.showUnresolved) {
                    options.details = `unfullfilled slot connections ${JSON.stringify([...this.spec.slotConnections])}`;
                }
                return false;
            }
        }
        if (!this.spec) {
            if (options && options.showUnresolved) {
                options.details = 'missing spec';
            }
            return false;
        }
        const unresolvedRequiredConnections = this.getUnboundConnections().filter(connSpec => {
            // A non-optional connection dependent on an optional and unresolved is ok.
            let parent = connSpec.parentConnection;
            while (parent !== null) {
                if (!this.connections[parent.name]) {
                    return false;
                }
                parent = parent.parentConnection;
            }
            return true;
        });
        if (unresolvedRequiredConnections.length > 0) {
            if (options && options.showUnresolved) {
                options.details = `unresolved connections: ${unresolvedRequiredConnections.map(c => c.name).join(', ')}`;
            }
            return false;
        }
        if (this.unnamedConnections.length !== 0) {
            if (options && options.showUnresolved) {
                options.details = `${this.unnamedConnections.length} unnamed connections`;
            }
            return false;
        }
        return true;
    }
    get recipe() { return this._recipe; }
    get localName() { return this._localName; }
    set localName(name) { this._localName = name; }
    get id() { return this._id; } // Not resolved until we have an ID.
    set id(id) { assert(!this._id, 'Particle ID can only be set once.'); this._id = id; }
    get name() { return this._name; }
    set name(name) { this._name = name; }
    get connections() { return this._connections; } // {parameter -> HandleConnection}
    get unnamedConnections() { return this._unnamedConnections; } // HandleConnection*
    get consumedSlotConnections() { return this._consumedSlotConnections; }
    get primaryVerb() { return (this._verbs.length > 0) ? this._verbs[0] : undefined; }
    set verbs(verbs) { this._verbs = verbs; }
    set tags(tags) { this._tags = tags; }
    addUnnamedConnection() {
        const connection = new HandleConnection(undefined, this);
        this._unnamedConnections.push(connection);
        return connection;
    }
    addConnectionName(name) {
        assert(name, `Cannot create connection with no name`);
        assert(this._connections[name] == undefined);
        this._connections[name] = new HandleConnection(name, this);
        return this._connections[name];
    }
    allConnections() {
        return Object.values(this._connections).concat(this._unnamedConnections);
    }
    ensureConnectionName(name) {
        return this._connections[name] || this.addConnectionName(name);
    }
    getConnectionByName(name) {
        return this._connections[name];
    }
    nameConnection(connection, name) {
        assert(!this._connections[name], `Connection "${name}" already has a handle`);
        const idx = this._unnamedConnections.indexOf(connection);
        assert(idx >= 0, `Cannot name '${name}' nonexistent unnamed connection.`);
        // TODO: FIX: The following is accessing a readonly field illegally.
        // tslint:disable-next-line: no-any
        connection._name = name;
        const connectionSpec = this.spec.getConnectionByName(name);
        connection.type = connectionSpec.type;
        if (connection.direction !== connectionSpec.direction) {
            assert(connection.direction === 'inout', `Unnamed connection cannot adjust direction ${connection.direction} to ${name}'s direction ${connectionSpec.direction}`);
            connection.direction = connectionSpec.direction;
        }
        this._connections[name] = connection;
        this._unnamedConnections.splice(idx, 1);
    }
    getUnboundConnections(type) {
        return this.spec.handleConnections.filter(connSpec => !connSpec.isOptional &&
            !this.getConnectionByName(connSpec.name) &&
            (!type || TypeChecker.compareTypes({ type }, { type: connSpec.type })));
    }
    addSlotConnection(name) {
        assert(!(name in this.consumedSlotConnections), 'slot connection already exists');
        const slandle = this.spec && this.spec.connections.find(conn => conn.name === name);
        const isSlandle = slandle && slandle.type.isSlot();
        const isSetSlandle = slandle && slandle.type.isCollectionType() && slandle.type.getContainedType().isSlot();
        assert(!this.spec || this.spec.slotConnections.has(name) || isSlandle || isSetSlandle, `slot connection '${name}' is not in particle spec`);
        const slotConn = this.addSlotConnectionAsCopy(name);
        const slotSpec = this.getSlotSpecByName(name);
        if (slotSpec) {
            slotSpec.provideSlotConnections.forEach(providedSlot => {
                const slot = this.recipe.newSlot(providedSlot.name);
                slot.sourceConnection = slotConn;
                slotConn.providedSlots[providedSlot.name] = slot;
                // TODO: hook the handles up
            });
        }
        return slotConn;
    }
    addSlotConnectionAsCopy(name) {
        // Called when a recipe and all of it's contents are being cloned. 
        // Each slot connection in the existing recipe has to be created for the clone, 
        // This method must not create slots for provided slot connections otherwise there 
        // will be duplicate slots.
        const slotConn = new SlotConnection(name, this);
        this._consumedSlotConnections[name] = slotConn;
        return slotConn;
    }
    removeSlotConnection(slotConnection) {
        this._consumedSlotConnections[slotConnection.name] = null;
        slotConnection.disconnectFromSlot();
    }
    remove() {
        this.recipe.removeParticle(this);
    }
    getSlotConnectionBySpec(spec) {
        return Object.values(this.consumedSlotConnections).find(slotConn => slotConn.getSlotSpec() === spec);
    }
    getSlotConnections() {
        return Object.values(this.consumedSlotConnections);
    }
    getSlotSpecByName(name) {
        if (!this.spec)
            return undefined;
        const slot = this.spec.slotConnections.get(name);
        if (slot)
            return slot;
        // TODO(jopra): Provided slots should always be listed in the particle spec.
        for (const slot of this.spec.slotConnections.values()) {
            for (const provided of slot.provideSlotConnections) {
                if (provided.name === name)
                    return provided;
            }
        }
        return undefined;
    }
    getSlotConnectionByName(name) {
        return this.consumedSlotConnections[name];
    }
    getProvidedSlotByName(consumeName, name) {
        return this.consumedSlotConnections[consumeName] && this.consumedSlotConnections[consumeName].providedSlots[name];
    }
    getSlotSpecs() {
        if (this.spec)
            return this.spec.slotConnections;
        return new Map();
    }
    isJavaParticle() {
        return this.spec && (this.spec.implFile || '').endsWith('java');
    }
    toString(options = {}, nameMap) {
        let result = [];
        // TODO: we need at least name or verb(s)
        if (this.name) {
            result.push(this.name);
            result.push(`as ${(nameMap && nameMap.get(this)) || this.localName}`);
            if (this.primaryVerb && this.primaryVerb !== this.name) {
                result.push(`// verb=${this.primaryVerb}`);
            }
        }
        else { // verb must exist, if there is no name.
            result.push(`&${this.primaryVerb}`);
        }
        if (options.showUnresolved) {
            if (!this.isResolved(options)) {
                result.push(`// unresolved particle: ${options.details}`);
            }
        }
        result = [result.join(' ')];
        for (const connection of this.unnamedConnections) {
            result.push(connection.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
        }
        for (const connection of Object.values(this.connections)) {
            result.push(connection.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
        }
        for (const slotConnection of Object.values(this.consumedSlotConnections)) {
            result.push(slotConnection.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
        }
        return result.join('\n');
    }
}
//# sourceMappingURL=particle.js.map