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
import { RequireSection } from './recipe.js';
import { compareComparables, compareStrings } from './comparable.js';
import { Flags } from '../flags.js';
export class SlotConnection {
    constructor(name, particle) {
        this._targetSlot = undefined;
        this._providedSlots = {};
        this._tags = [];
        assert(particle);
        assert(particle.recipe);
        assert(name);
        this._recipe = particle.recipe;
        this._particle = particle;
        this._name = name;
    }
    remove() {
        this._particle.removeSlotConnection(this);
    }
    get recipe() { return this._recipe; }
    get particle() { return this._particle; }
    get name() { return this._name; }
    getQualifiedName() { return `${this.particle.name}::${this.name}`; }
    get targetSlot() { return this._targetSlot; }
    set targetSlot(targetSlot) { this._targetSlot = targetSlot; }
    get providedSlots() { return this._providedSlots; }
    get tags() { return this._tags; }
    set tags(tags) { this._tags = tags; }
    getSlotSpec() {
        return this.particle.spec && this.particle.spec.getSlandleSpec(this.name);
    }
    connectToSlot(targetSlot) {
        assert(targetSlot);
        assert(!this.targetSlot);
        assert(this.recipe instanceof RequireSection || this.recipe === targetSlot.recipe, 'Cannot connect to slot from different recipe');
        this._targetSlot = targetSlot;
        targetSlot.consumeConnections.push(this);
    }
    disconnectFromSlot() {
        if (this._targetSlot) {
            this._targetSlot.removeConsumeConnection(this);
            this._targetSlot = undefined;
        }
    }
    _clone(particle, cloneMap) {
        if (cloneMap.has(this)) {
            return cloneMap.get(this);
        }
        const slotConnection = particle.addSlotConnectionAsCopy(this.name);
        slotConnection.tags = this.tags;
        cloneMap.set(this, slotConnection);
        return slotConnection;
    }
    _normalize() {
        const normalizedSlots = {};
        for (const key of (Object.keys(this._providedSlots).sort())) {
            normalizedSlots[key] = this._providedSlots[key];
        }
        this._providedSlots = normalizedSlots;
        Object.freeze(this);
    }
    _compareTo(other) {
        let cmp;
        if ((cmp = compareStrings(this.name, other.name)) !== 0)
            return cmp;
        if ((cmp = compareComparables(this._targetSlot, other._targetSlot)) !== 0)
            return cmp;
        if ((cmp = compareComparables(this._particle, other._particle)) !== 0)
            return cmp;
        return 0;
    }
    _isValid(options) {
        if (this._targetSlot && this._targetSlot.sourceConnection &&
            this._targetSlot !== this._targetSlot.sourceConnection.providedSlots[this._targetSlot.name]) {
            if (options && options.errors) {
                options.errors.set(this, `Invalid target slot '${this._targetSlot.name}' for slot connection '${this.name}' of particle ${this.particle.name}`);
            }
            return false;
        }
        // TODO: add more checks.
        return true;
    }
    isResolved(options) {
        const error = (label) => {
            if (options && options.errors) {
                options.errors.set(this.name, label);
            }
            if (options && options.details) {
                options.details = label; // TODO(jopra): use .errors instead.
            }
        };
        assert(Object.isFrozen(this), `slot connection ${this.name} must be frozen before it is resolved`);
        if (!this.name) {
            error('missing name');
            return false;
        }
        if (!this.particle) {
            error('missing particle');
            return false;
        }
        const slotSpec = this.getSlotSpec();
        if (slotSpec === undefined || slotSpec.isRequired) {
            if (!this.targetSlot) {
                // The required connection has no target slot
                error(`missing target-slot`);
                return false;
            }
            if (!this.targetSlot.id && !(this.targetSlot.sourceConnection && this.targetSlot.sourceConnection.isConnected())) {
                // The required connection's target slot is not resolved (has no ID or source connection).
                error(`unresolved target-slot`);
                return false;
            }
        }
        if (!this.targetSlot) {
            return true;
        }
        if (slotSpec === undefined)
            return true;
        return this.getSlotSpec().provideSlotConnections.every(providedSlot => {
            if (providedSlot && providedSlot.isRequired && this.providedSlots[providedSlot.name].consumeConnections.length === 0) {
                error('missing consuming slot');
                return false;
            }
            return true;
        });
    }
    isConnectedToInternalSlot() {
        return this.targetSlot && (!!this.targetSlot.sourceConnection);
    }
    isConnectedToRemoteSlot() {
        return this.targetSlot && (!!this.targetSlot.id);
    }
    isConnected() {
        return this.isConnectedToInternalSlot() || this.isConnectedToRemoteSlot();
    }
    toString(nameMap, options) {
        const consumeRes = [];
        if (Flags.defaultToPreSlandlesSyntax) {
            consumeRes.push('consume');
            consumeRes.push(`${this.name}`);
            if (this.targetSlot) {
                consumeRes.push(`as ${(nameMap && nameMap.get(this.targetSlot)) ||
                    this.targetSlot.localName}`);
            }
        }
        else {
            consumeRes.push(`${this.name}:`);
            consumeRes.push('consumes');
            if (this.targetSlot) {
                consumeRes.push(`${(nameMap && nameMap.get(this.targetSlot)) ||
                    this.targetSlot.localName}`);
            }
        }
        if (options && options.showUnresolved) {
            if (!this.isResolved(options)) {
                consumeRes.push(`// unresolved slot-connection: ${options.details}`);
            }
        }
        const result = [];
        result.push(consumeRes.join(' '));
        Object.keys(this.providedSlots).forEach(psName => {
            const providedSlot = this.providedSlots[psName];
            const provideRes = [];
            // Only assert that there's a spec for this provided slot if there's a spec for
            // the consumed slot .. otherwise this is just a constraint.
            if (this.getSlotSpec()) {
                const providedSlotSpec = this.particle.getSlotSpecByName(psName);
                assert(providedSlotSpec, `Cannot find providedSlotSpec for ${psName}`);
            }
            if (Flags.defaultToPreSlandlesSyntax) {
                provideRes.push('  provide');
                provideRes.push(`${psName}`);
                provideRes.push(`as ${(nameMap && nameMap.get(providedSlot)) || providedSlot}`);
            }
            else {
                provideRes.push(`  ${psName}:`);
                provideRes.push('provides');
                provideRes.push(`${(nameMap && nameMap.get(providedSlot)) || providedSlot}`);
            }
            result.push(provideRes.join(' '));
        });
        return result.join('\n');
    }
}
//# sourceMappingURL=slot-connection.js.map