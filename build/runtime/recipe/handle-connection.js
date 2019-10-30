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
import { SlotConnection } from './slot-connection.js';
import { acceptedDirections } from './recipe-util.js';
import { TypeChecker } from './type-checker.js';
import { compareArrays, compareComparables, compareStrings } from './comparable.js';
import { directionToArrow, preSlandlesDirectionToDirection } from '../manifest-ast-nodes.js';
import { Flags } from '../flags.js';
export class HandleConnection {
    constructor(name, particle) {
        this._tags = [];
        this.resolvedType = undefined;
        this._direction = 'any';
        this._handle = undefined;
        assert(particle);
        assert(particle.recipe);
        this._recipe = particle.recipe;
        this._name = name;
        this._particle = particle;
    }
    _clone(particle, cloneMap) {
        if (cloneMap.has(this)) {
            return cloneMap.get(this);
        }
        const handleConnection = new HandleConnection(this._name, particle);
        handleConnection._tags = [...this._tags];
        // Note: _resolvedType will be cloned later by the particle that references this connection.
        // Doing it there allows the particle to maintain variable associations across the particle
        // scope.
        handleConnection.resolvedType = this.resolvedType;
        handleConnection._direction = this._direction;
        if (this._handle != undefined) {
            handleConnection._handle = cloneMap.get(this._handle);
            assert(handleConnection._handle !== undefined);
            handleConnection._handle.connections.push(handleConnection);
        }
        cloneMap.set(this, handleConnection);
        return handleConnection;
    }
    // Note: don't call this method directly, only called from particle cloning.
    cloneTypeWithResolutions(variableMap) {
        if (this.resolvedType) {
            this.resolvedType = this.resolvedType._cloneWithResolutions(variableMap);
        }
    }
    _normalize() {
        this._tags.sort();
        // TODO: type?
        Object.freeze(this);
    }
    _compareTo(other) {
        let cmp;
        if ((cmp = compareComparables(this._particle, other._particle)) !== 0)
            return cmp;
        if ((cmp = compareStrings(this._name, other._name)) !== 0)
            return cmp;
        if ((cmp = compareArrays(this._tags, other._tags, compareStrings)) !== 0)
            return cmp;
        if ((cmp = compareComparables(this._handle, other._handle)) !== 0)
            return cmp;
        // TODO: add type comparison
        // if ((cmp = compareStrings(this._type, other._type)) != 0) return cmp;
        if ((cmp = compareStrings(this._direction, other._direction)) !== 0)
            return cmp;
        return 0;
    }
    get recipe() { return this._recipe; }
    get name() { return this._name; } // Parameter name?
    getQualifiedName() { return `${this.particle.name}::${this.name}`; }
    get tags() { return this._tags; }
    get type() {
        if (this.resolvedType) {
            return this.resolvedType;
        }
        const spec = this.spec;
        // TODO: We need a global way to generate variables so that everything can
        // have proper type bounds.
        return spec ? spec.type : undefined;
    }
    get direction() {
        // TODO: Should take the most strict of the direction and the spec direction.
        if (this._direction !== 'any') {
            return this._direction;
        }
        const spec = this.spec;
        return spec ? spec.direction : 'any';
    }
    get isInput() {
        return this.direction === 'in' || this.direction === 'inout';
    }
    get isOutput() {
        return this.direction === 'out' || this.direction === 'inout';
    }
    get handle() { return this._handle; } // Handle?
    get particle() { return this._particle; } // never null
    set tags(tags) { this._tags = tags; }
    set type(type) {
        this.resolvedType = type;
        this._resetHandleType();
    }
    set direction(direction) {
        if (direction === null) {
            throw new Error(`Invalid direction '${direction}' for handle connection '${this.getQualifiedName()}'`);
        }
        this._direction = direction;
        this._resetHandleType();
    }
    get spec() {
        if (this.particle.spec == null) {
            return null;
        }
        return this.particle.spec.handleConnectionMap.get(this.name);
    }
    toSlotConnection() {
        // TODO: Remove in SLANDLESv2
        if (!this.handle || this.handle.fate !== '`slot') {
            return undefined;
        }
        const slandle = new SlotConnection(this.name, this.particle);
        slandle.tags = this.tags;
        slandle.targetSlot = this.handle && this.handle.toSlot();
        slandle.targetSlot.name = slandle.targetSlot.name || this.name;
        if (this.spec) {
            this.spec.dependentConnections.forEach(connSpec => {
                const conn = this.particle.getConnectionByName(connSpec.name);
                if (!conn)
                    return;
                const slandleConn = conn.toSlotConnection();
                if (!slandleConn)
                    return;
                assert(!slandle.providedSlots[conn.spec.name], `provided slot '${conn.spec.name}' already exists`);
                slandle.providedSlots[conn.spec.name] = slandleConn.targetSlot;
            });
        }
        return slandle;
    }
    get isOptional() {
        if (this.spec == null) {
            return false;
        }
        return this.spec.isOptional;
    }
    _isValid(options) {
        // Note: The following casts are necessary to catch invalid values that typescript does not manage to check).
        if (this.direction === null || this.direction === undefined) {
            if (options && options.errors) {
                options.errors.set(this, `Invalid direction '${this.direction}' for handle connection '${this.getQualifiedName()}'`);
            }
            return false;
        }
        if (this.particle.spec && this.name) {
            const connectionSpec = this.spec;
            if (!connectionSpec) {
                if (options && options.errors) {
                    options.errors.set(this, `Connection ${this.name} is not defined by ${this.particle.name}.`);
                }
                return false;
            }
            if (!acceptedDirections(this.direction).includes(connectionSpec.direction)) {
                if (options && options.errors) {
                    options.errors.set(this, `Direction '${this.direction}' for handle connection '${this.getQualifiedName()}' doesn't match particle spec's direction '${connectionSpec.direction}'`);
                }
                return false;
            }
            if (this.resolvedType) {
                if (!connectionSpec.isCompatibleType(this.resolvedType)) {
                    if (options && options.errors) {
                        options.errors.set(this, `Type '${this.resolvedType.toString()} for handle connection '${this.getQualifiedName()}' doesn't match particle spec's type '${connectionSpec.type.toString()}'`);
                    }
                    return false;
                }
            }
            else {
                this.resolvedType = connectionSpec.type;
            }
        }
        return true;
    }
    isResolved(options) {
        assert(Object.isFrozen(this));
        let parent;
        if (this.spec && this.spec.parentConnection) {
            parent = this.particle.connections[this.spec.parentConnection.name];
            if (!parent) {
                if (options) {
                    options.details = `parent connection '${this.spec.parentConnection.name}' missing`;
                }
                return false;
            }
            if (!parent.handle) {
                if (options) {
                    options.details = `parent connection '${this.spec.parentConnection.name}' missing handle`;
                }
                return false;
            }
        }
        if (!this.handle) {
            if (this.isOptional) {
                // We're optional we don't need to resolve.
                return true;
            }
            // We're not optional we do need to resolve.
            if (options) {
                options.details = 'missing handle';
            }
            return false;
        }
        if (!this.direction) {
            if (options) {
                options.details = 'missing direction';
            }
            return false;
        }
        // TODO: This should use this._type, or possibly not consider type at all.
        if (!this.type) {
            if (options) {
                options.details = 'missing type';
            }
            return false;
        }
        return true;
    }
    _resetHandleType() {
        if (this._handle) {
            this._handle._type = undefined;
        }
    }
    connectToHandle(handle) {
        assert(handle.recipe === this.recipe);
        this._handle = handle;
        this._resetHandleType();
        this._handle.connections.push(this);
    }
    disconnectHandle() {
        const idx = this._handle.connections.indexOf(this);
        assert(idx >= 0);
        this._handle.connections.splice(idx, 1);
        this._handle = undefined;
    }
    toString(nameMap, options) {
        const result = [];
        if (Flags.defaultToPreSlandlesSyntax) {
            result.push(`${this.name || '*'}`); // TODO: Remove post slandles syntax
            result.push(directionToArrow(this.direction));
        }
        else {
            result.push(`${this.name || '*'}:`);
            result.push(preSlandlesDirectionToDirection(this.direction)); // TODO(jopra): support optionality.
        }
        if (this.handle) {
            if (this.handle.immediateValue) {
                result.push(this.handle.immediateValue.name);
            }
            else {
                result.push(`${(nameMap && nameMap.get(this.handle)) || this.handle.localName}`);
            }
        }
        result.push(...this.tags.map(a => `#${a}`));
        if (options && options.showUnresolved) {
            if (!this.isResolved(options)) {
                result.push(`// unresolved handle-connection: ${options.details}`);
            }
        }
        return result.join(' ');
    }
    // TODO: the logic is wrong :)
    findSpecsForUnnamedHandles() {
        return this.particle.spec.handleConnections.filter(specConn => {
            // filter specs with matching types that don't have handles bound to the corresponding handle connection.
            return !specConn.isOptional &&
                TypeChecker.compareTypes({ type: this.handle.type }, { type: specConn.type }) &&
                !this.particle.getConnectionByName(specConn.name);
        });
    }
}
//# sourceMappingURL=handle-connection.js.map