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
import { digest } from '../../platform/digest-web.js';
import { Modality } from '../modality.js';
import { InterfaceType } from '../type.js';
import { ConnectionConstraint } from './connection-constraint.js';
import { Handle } from './handle.js';
import { Particle } from './particle.js';
import { TypeChecker } from './type-checker.js';
import { Search } from './search.js';
import { Slot } from './slot.js';
import { compareComparables } from './comparable.js';
export class Recipe {
    constructor(name) {
        this._requires = [];
        this._particles = [];
        this._handles = [];
        this._slots = [];
        this._localName = undefined;
        this.annotation = undefined;
        this.triggers = [];
        // TODO: Recipes should be collections of records that are tagged
        // with a type. Strategies should register the record types they
        // can handle. ConnectionConstraints should be a different record
        // type to particles/handles.
        this._connectionConstraints = [];
        // Obligations are like connection constraints in that they describe
        // required connections between particles/verbs. However, where
        // connection constraints can be acted upon in order to create these
        // connections, obligations can't be. Instead, they describe requirements
        // that must be discharged before a recipe can be considered to be
        // resolved.
        this._obligations = [];
        this._verbs = [];
        // TODO: Change to array, if needed for search strings of merged recipes.
        this._search = null;
        this._patterns = [];
        this._name = name;
    }
    newConnectionConstraint(from, to, direction) {
        const result = new ConnectionConstraint(from, to, direction, 'constraint');
        this._connectionConstraints.push(result);
        return result;
    }
    newObligation(from, to, direction) {
        const result = new ConnectionConstraint(from, to, direction, 'obligation');
        this._obligations.push(result);
        return result;
    }
    removeObligation(obligation) {
        const idx = this._obligations.indexOf(obligation);
        assert(idx > -1);
        this._obligations.splice(idx, 1);
    }
    removeConstraint(constraint) {
        const idx = this._connectionConstraints.indexOf(constraint);
        assert(idx >= 0);
        this._connectionConstraints.splice(idx, 1);
    }
    clearConnectionConstraints() {
        this._connectionConstraints.length = 0; // truncate
    }
    newRequireSection() {
        const require = new RequireSection(this);
        this._requires.push(require);
        return require;
    }
    newParticle(name) {
        const particle = new Particle(this, name);
        this._particles.push(particle);
        return particle;
    }
    removeParticle(particle) {
        const idx = this._particles.indexOf(particle);
        assert(idx > -1);
        this._particles.splice(idx, 1);
        particle.getSlotConnections().map(conn => conn.remove());
    }
    newHandle() {
        const handle = new Handle(this);
        this._handles.push(handle);
        return handle;
    }
    removeHandle(handle) {
        assert(handle.connections.length === 0);
        const idx = this._handles.indexOf(handle);
        assert(idx > -1);
        this._handles.splice(idx, 1);
    }
    newSlot(name) {
        const slot = new Slot(this, name);
        this._slots.push(slot);
        return slot;
    }
    addSlot(slot) {
        if (this.slots.indexOf(slot) === -1) {
            this.slots.push(slot);
        }
    }
    removeSlot(slot) {
        assert(slot.consumeConnections.length === 0);
        let idx = this._slots.indexOf(slot);
        assert(idx > -1);
        this._slots.splice(idx, 1);
        for (const requires of this.requires) {
            idx = requires.slots.indexOf(slot);
            if (idx !== -1) {
                requires.slots.splice(idx, 1);
            }
        }
    }
    isResolved(options) {
        assert(Object.isFrozen(this), 'Recipe must be normalized to be resolved.');
        const checkThat = (check, label) => {
            if (!check && options && options.errors) {
                options.errors.set(this.name, label);
            }
            return check;
        };
        return checkThat(this._obligations.length === 0, 'unresolved obligations')
            && checkThat(this._connectionConstraints.length === 0, 'unresolved constraints')
            && checkThat(this.requires.every(require => require.isEmpty()), 'unresolved require')
            && checkThat((this._search === null || this._search.isResolved()), 'unresolved search')
            && checkThat(this._handles.every(handle => handle.isResolved()), 'unresolved handles')
            && checkThat(this._particles.every(particle => particle.isResolved(options)), 'unresolved particles')
            && checkThat(this.modality.isResolved(), 'unresolved modality')
            && checkThat(this.allRequiredSlotsPresent(options), 'unresolved required slot')
            && checkThat(this._slots.every(slot => slot.isResolved()), 'unresolved slots')
            && checkThat(this.handleConnections.every(connection => connection.isResolved(options)), 'unresolved handle connections')
            && checkThat(this.slotConnections.every(slotConnection => slotConnection.isResolved(options)), 'unresolved slot connections');
        // TODO: check recipe level resolution requirements, eg there is no slot loops.
    }
    isCompatible(modality) {
        return this.particles.every(p => !p.spec || p.spec.isCompatible(modality));
    }
    get modality() {
        return Modality.intersection(this.particles.filter(p => Boolean(p.spec && p.spec.slotConnections.size > 0)).map(p => p.spec.modality));
    }
    allRequiredSlotsPresent(options = undefined) {
        // All required slots and at least one consume slot for each particle must be present in order for the 
        // recipe to be considered resolved.
        for (const particle of this.particles) {
            if (particle.spec.slotConnections.size === 0) {
                continue;
            }
            let atLeastOneSlotConnection = false;
            let usesSlandles = false;
            for (const handleSpec of Object.values(particle.spec.connections)) {
                if (handleSpec.type.isSlot() ||
                    (handleSpec.type.isCollectionType() && handleSpec.type.collectionType.isSlot())) {
                    usesSlandles = true;
                }
            }
            for (const [name, slotSpec] of particle.spec.slotConnections) {
                if (slotSpec.isRequired && !particle.getSlotConnectionByName(name)) {
                    if (options && options.errors) {
                        options.errors.set(name, `required slot ${name} has no matching connection`);
                    }
                    return false;
                }
                // required provided slots are only required when the corresponding consume slot connection is present
                if (particle.getSlotConnectionByName(name)) {
                    atLeastOneSlotConnection = true;
                    for (const providedSlotSpec of slotSpec.provideSlotConnections) {
                        if (providedSlotSpec.isRequired && !particle.getProvidedSlotByName(name, providedSlotSpec.name)) {
                            if (options && options.errors) {
                                options.errors.set(name, `required provided slot ${providedSlotSpec.name} has no matching connection`);
                            }
                            return false;
                        }
                    }
                }
            }
            // TODO: Remove check for slots in SLANDLESv2
            if (!usesSlandles && !atLeastOneSlotConnection) {
                if (options && options.errors) {
                    options.errors.set(`?`, `no slot connections`);
                }
                return false;
            }
        }
        return true;
    }
    _findDuplicate(items, options) {
        const seenHandles = new Set();
        const duplicateHandle = items.find(handle => {
            if (handle.id) {
                if (seenHandles.has(handle.id)) {
                    return handle;
                }
                seenHandles.add(handle.id);
            }
        });
        if (duplicateHandle && options && options.errors) {
            options.errors.set(duplicateHandle, `Has Duplicate ${duplicateHandle instanceof Handle ? 'Handle' : 'Slot'} '${duplicateHandle.id}'`);
        }
        return duplicateHandle;
    }
    _isValid(options = undefined) {
        const checkAllValid = (list) => list.every(item => item._isValid(options));
        return !this._findDuplicate(this._handles, options)
            && !this._findDuplicate(this._slots, options)
            && checkAllValid(this._handles)
            && checkAllValid(this._particles)
            && checkAllValid(this._slots)
            && checkAllValid(this.handleConnections)
            && checkAllValid(this.slotConnections)
            && (!this.search || this.search.isValid());
    }
    get requires() { return this._requires; }
    get name() { return this._name; }
    set name(name) { this._name = name; }
    get localName() { return this._localName; }
    set localName(name) { this._localName = name; }
    get particles() { return this._particles; }
    set particles(particles) { this._particles = particles; }
    get handles() { return this._handles; }
    set handles(handles) { this._handles = handles; }
    get slots() { return this._slots; }
    set slots(slots) { this._slots = slots; }
    get connectionConstraints() { return this._connectionConstraints; }
    get obligations() { return this._obligations; }
    get verbs() { return this._verbs; }
    set verbs(verbs) { this._verbs = verbs; }
    get search() { return this._search; }
    set search(search) {
        this._search = search;
    }
    setSearchPhrase(phrase) {
        assert(!this._search, 'Cannot override search phrase');
        if (phrase) {
            this._search = new Search(phrase);
        }
    }
    get slotConnections() {
        // TODO: Is this the correct api?
        const slotConnections = [];
        this._particles.forEach(particle => {
            slotConnections.push(...particle.getSlotConnections());
        });
        return slotConnections;
    }
    get handleConnections() {
        const handleConnections = [];
        this._particles.forEach(particle => {
            handleConnections.push(...Object.values(particle.connections));
            handleConnections.push(...particle._unnamedConnections);
        });
        return handleConnections;
    }
    isEmpty() {
        return this.particles.length === 0 &&
            this.handles.length === 0 &&
            this.slots.length === 0 &&
            this._connectionConstraints.length === 0;
    }
    findHandle(id) {
        for (const handle of this.handles) {
            if (handle.id === id) {
                return handle;
            }
        }
        return null;
    }
    findSlot(id) {
        for (const slot of this.slots) {
            if (slot.id === id) {
                return slot;
            }
        }
        return null;
    }
    get patterns() {
        return this._patterns;
    }
    set patterns(patterns) {
        this._patterns = patterns;
    }
    set description(description) {
        const pattern = description.find(desc => desc.name === 'pattern');
        if (pattern) {
            pattern.patterns.forEach(pattern => this._patterns.push(pattern));
        }
        description.forEach(desc => {
            if (desc.name !== 'pattern') {
                const handle = this.handles.find(handle => handle.localName === desc.name);
                assert(handle, `Cannot set description pattern for nonexistent handle ${desc.name}.`);
                handle.pattern = desc.pattern;
            }
        });
    }
    async digest() {
        return digest(this.toString());
    }
    normalize(options) {
        if (Object.isFrozen(this)) {
            if (options && options.errors) {
                options.errors.set(this, 'already normalized');
            }
            return false;
        }
        if (!this._isValid()) {
            this._findDuplicate(this._handles, options);
            this._findDuplicate(this._slots, options);
            const checkForInvalid = (list) => list.forEach(item => !item._isValid(options));
            checkForInvalid(this._handles);
            checkForInvalid(this._particles);
            checkForInvalid(this._slots);
            checkForInvalid(this.handleConnections);
            checkForInvalid(this.slotConnections);
            return false;
        }
        // Get handles and particles ready to sort connections.
        for (const particle of this._particles) {
            particle._startNormalize();
        }
        for (const handle of this._handles) {
            handle._startNormalize();
        }
        for (const slot of this._slots) {
            slot._startNormalize();
        }
        // Sort and normalize handle connections.
        const connections = this.handleConnections;
        for (const connection of connections) {
            connection._normalize();
        }
        connections.sort(compareComparables);
        // Sort and normalize slot connections.
        const slotConnections = this.slotConnections;
        for (const slotConnection of slotConnections) {
            slotConnection._normalize();
        }
        slotConnections.sort(compareComparables);
        if (this.search) {
            this.search._normalize();
        }
        for (const require of this.requires) {
            require.normalize();
        }
        // Finish normalizing particles and handles with sorted connections.
        for (const particle of this._particles) {
            particle._finishNormalize();
        }
        for (const handle of this._handles) {
            handle._finishNormalize();
        }
        for (const slot of this._slots) {
            slot._finishNormalize();
        }
        const seenHandles = new Set();
        const seenParticles = new Set();
        const seenSlots = new Set();
        const particles = [];
        const handles = [];
        const slots = [];
        // Reorder connections so that interfaces come last.
        // TODO: update handle-connection comparison method instead?
        let ordered = connections.filter(c => !c.type || !(c.type instanceof InterfaceType));
        ordered = ordered.concat(connections.filter(c => !!c.type && !!(c.type instanceof InterfaceType)));
        for (const connection of ordered) {
            if (!seenParticles.has(connection.particle)) {
                particles.push(connection.particle);
                seenParticles.add(connection.particle);
            }
            if (connection.handle && !seenHandles.has(connection.handle)) {
                handles.push(connection.handle);
                seenHandles.add(connection.handle);
            }
        }
        for (const slotConnection of slotConnections) {
            if (slotConnection.targetSlot && !seenSlots.has(slotConnection.targetSlot)) {
                slots.push(slotConnection.targetSlot);
                seenSlots.add(slotConnection.targetSlot);
            }
            Object.values(slotConnection.providedSlots).forEach(ps => {
                if (!seenSlots.has(ps)) {
                    slots.push(ps);
                    seenSlots.add(ps);
                }
            });
        }
        const orphanedHandles = this._handles.filter(handle => !seenHandles.has(handle));
        orphanedHandles.sort(compareComparables);
        handles.push(...orphanedHandles);
        const orphanedParticles = this._particles.filter(particle => !seenParticles.has(particle));
        orphanedParticles.sort(compareComparables);
        particles.push(...orphanedParticles);
        const orphanedSlots = this._slots.filter(slot => !seenSlots.has(slot));
        orphanedSlots.sort(compareComparables);
        slots.push(...orphanedSlots);
        // Put particles and handles in their final ordering.
        this._particles = particles;
        this._handles = handles;
        this._slots = slots;
        this._connectionConstraints.sort(compareComparables);
        this._verbs.sort();
        this._patterns.sort();
        Object.freeze(this._particles);
        Object.freeze(this._handles);
        Object.freeze(this._slots);
        Object.freeze(this._connectionConstraints);
        Object.freeze(this);
        return true;
    }
    clone(map = undefined) {
        // for now, just copy everything
        const recipe = new Recipe(this.name);
        if (map == undefined) {
            map = new Map();
        }
        this._copyInto(recipe, map);
        // TODO: figure out a better approach than stashing the cloneMap permanently
        // on the recipe
        recipe._cloneMap = map;
        return recipe;
    }
    // tslint:disable-next-line: no-any
    mergeInto(recipe) {
        const cloneMap = new Map();
        const numHandles = recipe._handles.length;
        const numParticles = recipe._particles.length;
        const numSlots = recipe._slots.length;
        this._copyInto(recipe, cloneMap);
        return {
            handles: recipe._handles.slice(numHandles),
            particles: recipe._particles.slice(numParticles),
            slots: recipe._slots.slice(numSlots),
            cloneMap
        };
    }
    _copyInto(recipe, cloneMap) {
        const variableMap = new Map();
        const cloneTheThing = (ob) => {
            const clonedObject = ob._copyInto(recipe, cloneMap, variableMap);
            cloneMap.set(ob, clonedObject);
        };
        recipe._name = this.name;
        recipe._verbs = recipe._verbs.concat(...this._verbs);
        this._handles.forEach(cloneTheThing);
        this._particles.forEach(cloneTheThing);
        this._slots.forEach(cloneTheThing);
        this._connectionConstraints.forEach(cloneTheThing);
        this._obligations.forEach(cloneTheThing);
        recipe.verbs = recipe.verbs.slice();
        if (this.search) {
            this.search._copyInto(recipe);
        }
        for (const require of this.requires) {
            const newRequires = recipe.newRequireSection();
            require._copyInto(newRequires, cloneMap);
            newRequires._cloneMap = cloneMap;
        }
        recipe.patterns = recipe.patterns.concat(this.patterns);
    }
    // tslint:disable-next-line: no-any
    updateToClone(dict) {
        const result = {};
        Object.keys(dict).forEach(key => result[key] = this._cloneMap.get(dict[key]));
        return result;
    }
    _makeLocalNameMap() {
        const names = new Set([...this.particles,
            ...this.handles,
            ...this.slots].map((item) => item.localName));
        let i;
        const nameMap = new Map();
        const mapName = (item, prefix) => {
            let localName = item.localName;
            if (!localName) {
                do {
                    localName = `${prefix}${i++}`;
                } while (names.has(localName));
            }
            nameMap.set(item, localName);
        };
        i = 0;
        this.particles.map(particle => mapName(particle, 'particle'));
        i = 0;
        this.handles.map(handle => mapName(handle, 'handle'));
        i = 0;
        this.slots.map(slot => mapName(slot, 'slot'));
        return nameMap;
    }
    // TODO: Add a normalize() which strips local names and puts and nested
    //       lists into a normal ordering.
    //
    // use { showUnresolved: true } in options to see why a recipe can't resolve.
    toString(options) {
        const nameMap = this._makeLocalNameMap();
        const result = [];
        const verbs = this.verbs.length > 0 ? ` ${this.verbs.map(verb => `&${verb}`).join(' ')}` : '';
        result.push(`recipe${this.name ? ` ${this.name}` : ''}${verbs}`);
        if (options && options.showUnresolved) {
            if (this.search) {
                result.push(this.search.toString(options).replace(/^|(\n)/g, '$1  '));
            }
        }
        for (const constraint of this._connectionConstraints) {
            let constraintStr = constraint.toString().replace(/^|(\n)/g, '$1  ');
            if (options && options.showUnresolved) {
                constraintStr = constraintStr.concat(' // unresolved connection-constraint');
            }
            result.push(constraintStr);
        }
        result.push(...this.handles
            .map(h => h.toString(options, nameMap))
            .filter(strValue => strValue)
            .map(strValue => strValue.replace(/^|(\n)/g, '$1  ')));
        for (const slot of this.slots) {
            const slotString = slot.toString(options, nameMap);
            if (slotString) {
                result.push(slotString.replace(/^|(\n)/g, '$1  '));
            }
        }
        for (const require of this.requires) {
            if (!require.isEmpty())
                result.push(require.toString(options, nameMap).replace(/^|(\n)/g, '$1  '));
        }
        for (const particle of this.particles) {
            result.push(particle.toString(options, nameMap).replace(/^|(\n)/g, '$1  '));
        }
        if (this.patterns.length > 0 || this.handles.find(h => h.pattern !== undefined)) {
            result.push(`  description \`${this.patterns[0]}\``);
            for (let i = 1; i < this.patterns.length; ++i) {
                result.push(`    pattern \`${this.patterns[i]}\``);
            }
            this.handles.forEach(h => {
                if (h.pattern) {
                    result.push(`    ${h.localName} \`${h.pattern}\``);
                }
            });
        }
        if (this._obligations.length > 0) {
            result.push('  obligations');
            for (const obligation of this._obligations) {
                const obligationStr = obligation.toString(nameMap).replace(/^|(\n)/g, '$1    ');
                result.push(obligationStr);
            }
        }
        return result.join('\n');
    }
    getFreeHandles() {
        return this.handles.filter(handle => handle.connections.length === 0);
    }
    get allSpecifiedConnections() {
        return [].concat(...this.particles.filter(p => p.spec && p.spec.connections).map(particle => particle.spec.connections.map(connSpec => ({ particle, connSpec }))));
    }
    getFreeConnections(type) {
        // TODO(jopra): Check that this works for required connections that are
        // dependent on optional connections.
        return this.allSpecifiedConnections.filter(({ particle, connSpec }) => !connSpec.isOptional &&
            connSpec.name !== 'descriptions' &&
            connSpec.direction !== 'host' &&
            !particle.connections[connSpec.name] &&
            (!type || TypeChecker.compareTypes({ type }, { type: connSpec.type })));
    }
    findHandleByID(id) {
        return this.handles.find(handle => handle.id === id);
    }
    getUnnamedUntypedConnections() {
        return this.handleConnections.find(hc => !hc.type || !hc.name || hc.isOptional);
    }
    getParticlesByImplFile(files) {
        return this.particles.filter(particle => particle.spec && files.has(particle.spec.implFile));
    }
    // overridded by RequireSection
    findSlotByID(id) {
        let slot = this.slots.find(s => s.id === id);
        if (slot === undefined) {
            for (const require of this.requires) {
                slot = require.slots.find(s => s.id === id);
                if (slot !== undefined)
                    break;
            }
        }
        return slot;
    }
}
export class RequireSection extends Recipe {
    constructor(parent, name) {
        super(name);
        this.parent = parent;
    }
    findSlotByID(id) {
        let slot = this.slots.find(s => s.id === id);
        if (slot === undefined) {
            slot = this.parent.slots.find(s => s.id === id);
        }
        return slot;
    }
    toString(options = {}, nameMap) {
        if (nameMap == undefined) {
            nameMap = this._makeLocalNameMap();
        }
        const result = [];
        result.push(`require`);
        if (options.showUnresolved) {
            if (this.search) {
                result.push(this.search.toString(options).replace(/^|(\n)/g, '$1  '));
            }
        }
        for (const constraint of this.connectionConstraints) {
            let constraintStr = constraint.toString().replace(/^|(\n)/g, '$1  ');
            if (options.showUnresolved) {
                constraintStr = constraintStr.concat(' // unresolved connection-constraint');
            }
            result.push(constraintStr);
        }
        result.push(...this.handles
            .map(h => h.toString(options, nameMap))
            .filter(strValue => strValue)
            .map(strValue => strValue.replace(/^|(\n)/g, '$1  ')));
        for (const slot of this.slots) {
            const slotString = slot.toString(options, nameMap);
            if (slotString) {
                result.push(slotString.replace(/^|(\n)/g, '$1  '));
            }
        }
        for (const particle of this.particles) {
            result.push(particle.toString(options, nameMap).replace(/^|(\n)/g, '$1  '));
        }
        if (this.patterns.length > 0 || this.handles.find(h => h.pattern !== undefined)) {
            result.push(`  description \`${this.patterns[0]}\``);
            for (let i = 1; i < this.patterns.length; ++i) {
                result.push(`    pattern \`${this.patterns[i]}\``);
            }
            this.handles.forEach(h => {
                if (h.pattern) {
                    result.push(`    ${h.localName} \`${h.pattern}\``);
                }
            });
        }
        if (this.obligations.length > 0) {
            result.push('  obligations');
            for (const obligation of this.obligations) {
                const obligationStr = obligation.toString(nameMap).replace(/^|(\n)/g, '$1    ');
                result.push(obligationStr);
            }
        }
        return result.join('\n');
    }
}
//# sourceMappingURL=recipe.js.map