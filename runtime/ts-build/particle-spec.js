/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { Type } from './type.js';
import { TypeChecker } from './recipe/type-checker.js';
import { Shape } from './shape.js';
import { assert } from '../../platform/assert-web.js';
class ConnectionSpec {
    constructor(rawData, typeVarMap) {
        this.parentConnection = null;
        this.rawData = rawData;
        this.direction = rawData.direction;
        this.name = rawData.name;
        this.type = rawData.type.mergeTypeVariablesByName(typeVarMap);
        this.isOptional = rawData.isOptional;
        this.tags = rawData.tags || [];
        this.dependentConnections = [];
    }
    instantiateDependentConnections(particle, typeVarMap) {
        for (const dependentArg of this.rawData.dependentConnections) {
            const dependentConnection = particle.createConnection(dependentArg, typeVarMap);
            dependentConnection.parentConnection = this;
            this.dependentConnections.push(dependentConnection);
        }
    }
    get isInput() {
        // TODO: we probably don't really want host to be here.
        return this.direction === 'in' || this.direction === 'inout' || this.direction === 'host';
    }
    get isOutput() {
        return this.direction === 'out' || this.direction === 'inout';
    }
    isCompatibleType(type) {
        return TypeChecker.compareTypes({ type }, { type: this.type, direction: this.direction });
    }
}
export class SlotSpec {
    constructor(slotModel) {
        this.name = slotModel.name;
        this.isRequired = slotModel.isRequired;
        this.isSet = slotModel.isSet;
        this.tags = slotModel.tags || [];
        this.formFactor = slotModel.formFactor; // TODO: deprecate form factors?
        this.providedSlots = [];
        if (!slotModel.providedSlots) {
            return;
        }
        slotModel.providedSlots.forEach(ps => {
            this.providedSlots.push(new ProvidedSlotSpec(ps));
        });
    }
    getProvidedSlotSpec(name) {
        return this.providedSlots.find(ps => ps.name === name);
    }
}
export class ProvidedSlotSpec {
    constructor(slotModel) {
        this.name = slotModel.name;
        this.isRequired = slotModel.isRequired || false;
        this.isSet = slotModel.isSet || false;
        this.tags = slotModel.tags || [];
        this.formFactor = slotModel.formFactor; // TODO: deprecate form factors?
        this.handles = slotModel.handles || [];
    }
}
export class ParticleSpec {
    constructor(model) {
        this.model = model;
        this.name = model.name;
        this.verbs = model.verbs;
        const typeVarMap = new Map();
        this.connections = [];
        model.args.forEach(arg => this.createConnection(arg, typeVarMap));
        this.connectionMap = new Map();
        this.connections.forEach(a => this.connectionMap.set(a.name, a));
        this.inputs = this.connections.filter(a => a.isInput);
        this.outputs = this.connections.filter(a => a.isOutput);
        // initialize descriptions patterns.
        model.description = model.description || {};
        this.validateDescription(model.description);
        this.pattern = model.description['pattern'];
        this.connections.forEach(connectionSpec => {
            connectionSpec.pattern = model.description[connectionSpec.name];
        });
        this.implFile = model.implFile;
        this.affordance = model.affordance;
        this.slots = new Map();
        if (model.slots) {
            model.slots.forEach(s => this.slots.set(s.name, new SlotSpec(s)));
        }
        // Verify provided slots use valid handle connection names.
        this.slots.forEach(slot => {
            slot.providedSlots.forEach(ps => {
                ps.handles.forEach(v => assert(this.connectionMap.has(v), 'Cannot provide slot for nonexistent handle constraint ', v));
            });
        });
    }
    createConnection(arg, typeVarMap) {
        const connection = new ConnectionSpec(arg, typeVarMap);
        this.connections.push(connection);
        connection.instantiateDependentConnections(this, typeVarMap);
        return connection;
    }
    isInput(param) {
        for (const input of this.inputs)
            if (input.name === param)
                return true;
        return false;
    }
    isOutput(param) {
        for (const outputs of this.outputs)
            if (outputs.name === param)
                return true;
        return false;
    }
    getSlotSpec(slotName) {
        return this.slots.get(slotName);
    }
    get primaryVerb() {
        return (this.verbs.length > 0) ? this.verbs[0] : undefined;
    }
    matchAffordance(affordance) {
        return this.slots.size <= 0 || this.affordance.includes(affordance);
    }
    toLiteral() {
        const { args, name, verbs, description, implFile, affordance, slots } = this.model;
        const connectionToLiteral = ({ type, direction, name, isOptional, dependentConnections }) => ({ type: type.toLiteral(), direction, name, isOptional, dependentConnections: dependentConnections.map(connectionToLiteral) });
        const argsLiteral = args.map(a => connectionToLiteral(a));
        return { args: argsLiteral, name, verbs, description, implFile, affordance, slots };
    }
    static fromLiteral(literal) {
        let { args, name, verbs, description, implFile, affordance, slots } = literal;
        const connectionFromLiteral = ({ type, direction, name, isOptional, dependentConnections }) => ({ type: Type.fromLiteral(type), direction, name, isOptional, dependentConnections: dependentConnections ? dependentConnections.map(connectionFromLiteral) : [] });
        args = args.map(connectionFromLiteral);
        return new ParticleSpec({ args, name, verbs: verbs || [], description, implFile, affordance, slots });
    }
    clone() {
        return ParticleSpec.fromLiteral(this.toLiteral());
    }
    equals(other) {
        return JSON.stringify(this.toLiteral()) === JSON.stringify(other.toLiteral());
    }
    validateDescription(description) {
        Object.keys(description || []).forEach(d => {
            assert(['kind', 'location', 'pattern'].includes(d) || this.connectionMap.has(d), `Unexpected description for ${d}`);
        });
    }
    toInterface() {
        return Type.newInterface(this._toShape());
    }
    _toShape() {
        const handles = this.model.args;
        // TODO: wat do?
        assert(!this.slots.size, 'please implement slots toShape');
        const slots = [];
        return new Shape(this.name, handles, slots);
    }
    toString() {
        const results = [];
        let verbs = '';
        if (this.verbs.length > 0) {
            verbs = ' ' + this.verbs.map(verb => `&${verb}`).join(' ');
        }
        results.push(`particle ${this.name}${verbs} in '${this.implFile}'`.trim());
        const indent = '  ';
        const writeConnection = (connection, indent) => {
            results.push(`${indent}${connection.direction} ${connection.type.toString()}${connection.isOptional ? '?' : ''} ${connection.name}`);
            for (const dependent of connection.dependentConnections) {
                writeConnection(dependent, indent + '  ');
            }
        };
        for (const connection of this.connections) {
            if (connection.parentConnection) {
                continue;
            }
            writeConnection(connection, indent);
        }
        this.affordance.filter(a => a !== 'mock').forEach(a => results.push(`  affordance ${a}`));
        this.slots.forEach(s => {
            // Consume slot.
            const consume = [];
            if (s.isRequired) {
                consume.push('must');
            }
            consume.push('consume');
            if (s.isSet) {
                consume.push('set of');
            }
            consume.push(s.name);
            if (s.tags.length > 0) {
                consume.push(s.tags.map(a => `#${a}`).join(' '));
            }
            results.push(`  ${consume.join(' ')}`);
            if (s.formFactor) {
                results.push(`    formFactor ${s.formFactor}`);
            }
            // Provided slots.
            s.providedSlots.forEach(ps => {
                const provide = [];
                if (ps.isRequired) {
                    provide.push('must');
                }
                provide.push('provide');
                if (ps.isSet) {
                    provide.push('set of');
                }
                provide.push(ps.name);
                if (ps.tags.length > 0) {
                    provide.push(ps.tags.map(a => `#${a}`).join(' '));
                }
                results.push(`    ${provide.join(' ')}`);
                if (ps.formFactor) {
                    results.push(`      formFactor ${ps.formFactor}`);
                }
                ps.handles.forEach(handle => results.push(`      handle ${handle}`));
            });
        });
        // Description
        if (this.pattern) {
            results.push(`  description \`${this.pattern}\``);
            this.connections.forEach(cs => {
                if (cs.pattern) {
                    results.push(`    ${cs.name} \`${cs.pattern}\``);
                }
            });
        }
        return results.join('\n');
    }
    toManifestString() {
        return this.toString();
    }
}
//# sourceMappingURL=particle-spec.js.map