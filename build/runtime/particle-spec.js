/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import { assert } from '../platform/assert-web.js';
import { Modality } from './modality.js';
import { TypeChecker } from './recipe/type-checker.js';
import { InterfaceType, SlotType, Type } from './type.js';
import { createCheck } from './particle-check.js';
import { createParticleClaim } from './particle-claim.js';
import { Flags } from './flags.js';
function asType(t) {
    return (t instanceof Type) ? t : Type.fromLiteral(t);
}
function asTypeLiteral(t) {
    return (t instanceof Type) ? t.toLiteral() : t;
}
export function isRoot({ name, tags, id, type, fate }) {
    const rootNames = [
        'root',
        'toproot',
        'modal'
    ];
    if ((fate && fate !== '`slot') || (type && !type.slandleType())) {
        // If this is a handle that is not a Slandle, it cannot be a root slot.
        return false;
    }
    // Checks that, if the id exists, it starts with the root id prefx.
    const prefix = 'rootslotid-';
    if (id && id.lastIndexOf(prefix, 0) === 0) {
        const rootName = id.substr(prefix.length);
        if (rootNames.includes(rootName)) {
            return true;
        }
    }
    return rootNames.includes(name) || tags.some(tag => rootNames.includes(tag));
}
export class HandleConnectionSpec {
    constructor(rawData, typeVarMap) {
        this.parentConnection = null;
        this.rawData = rawData;
        this.direction = rawData.direction;
        this.name = rawData.name;
        this.type = asType(rawData.type).mergeTypeVariablesByName(typeVarMap);
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
    toSlotConnectionSpec() {
        // TODO: Remove in SLANDLESv2
        const slotType = this.type.slandleType();
        if (!slotType) {
            return undefined;
        }
        const isSet = this.type.isCollectionType();
        const slotInfo = slotType.getSlot();
        return {
            name: this.name,
            isOptional: this.isOptional,
            direction: this.direction,
            tags: this.tags,
            dependentConnections: this.dependentConnections.map(conn => conn.toSlotConnectionSpec()),
            // Fakes
            isRequired: !this.isOptional,
            isSet,
            type: slotType,
            handles: slotInfo.handle ? [slotInfo.handle] : [],
            formFactor: slotInfo.formFactor,
            provideSlotConnections: this.dependentConnections.map(conn => conn.toSlotConnectionSpec()),
        };
    }
    get isInput() {
        // TODO: we probably don't really want host to be here.
        // TODO: do we want to consider any here?
        return this.direction === 'in' || this.direction === 'inout' || this.direction === 'host';
    }
    get isOutput() {
        // TODO: do we want to consider any here?
        return this.direction === 'out' || this.direction === 'inout';
    }
    isCompatibleType(type) {
        return TypeChecker.compareTypes({ type }, { type: this.type, direction: this.direction });
    }
}
export class ConsumeSlotConnectionSpec {
    constructor(slotModel) {
        this.name = slotModel.name;
        this.isRequired = slotModel.isRequired || false;
        this.isSet = slotModel.isSet || false;
        this.tags = slotModel.tags || [];
        this.formFactor = slotModel.formFactor; // TODO: deprecate form factors?
        this.handles = slotModel.handles || [];
        this.provideSlotConnections = [];
        if (!slotModel.provideSlotConnections) {
            return;
        }
        slotModel.provideSlotConnections.forEach(ps => {
            this.provideSlotConnections.push(new ProvideSlotConnectionSpec(ps));
        });
    }
    // Getters to 'fake' being a Handle.
    get isOptional() { return !this.isRequired; }
    get direction() { return '`consume'; }
    get type() {
        //TODO(jopra): FIXME make the null handle optional.
        const slotT = SlotType.make(this.formFactor, null);
        if (this.isSet) {
            return slotT.collectionOf();
        }
        return slotT;
    }
    get dependentConnections() { return this.provideSlotConnections; }
}
export class ProvideSlotConnectionSpec extends ConsumeSlotConnectionSpec {
    constructor(slotModel) {
        super(slotModel);
        this.check = slotModel.check;
    }
}
export class ParticleSpec {
    constructor(model) {
        this.model = model;
        this.name = model.name;
        this.verbs = model.verbs;
        const typeVarMap = new Map();
        this.handleConnectionMap = new Map();
        model.args.forEach(arg => this.createConnection(arg, typeVarMap));
        // initialize descriptions patterns.
        model.description = model.description || {};
        this.validateDescription(model.description);
        this.pattern = model.description['pattern'];
        this.handleConnectionMap.forEach((connectionSpec, name) => {
            connectionSpec.pattern = model.description[name];
        });
        this.implFile = model.implFile;
        this.implBlobUrl = model.implBlobUrl;
        this.modality = model.modality ? Modality.create(model.modality) : Modality.all;
        this.slotConnections = new Map();
        if (model.slotConnections) {
            model.slotConnections.forEach(s => this.slotConnections.set(s.name, new ConsumeSlotConnectionSpec(s)));
        }
        // Verify provided slots use valid handle connection names.
        this.slotConnections.forEach(slot => {
            slot.provideSlotConnections.forEach(ps => {
                ps.handles.forEach(v => assert(this.handleConnectionMap.has(v), 'Cannot provide slot for nonexistent handle constraint ' + v));
            });
        });
        this.trustClaims = this.validateTrustClaims(model.trustClaims);
        this.trustChecks = this.validateTrustChecks(model.trustChecks);
    }
    createConnection(arg, typeVarMap) {
        const connection = new HandleConnectionSpec(arg, typeVarMap);
        if (this.handleConnectionMap.get(connection.name)) {
            throw new Error(`Particle Spec ${this.name} already has a handle connection named "${connection.name}".`);
        }
        this.handleConnectionMap.set(connection.name, connection);
        connection.instantiateDependentConnections(this, typeVarMap);
        return connection;
    }
    get handleConnections() {
        return this.connections;
    }
    get connections() {
        return [...this.handleConnectionMap.values()];
    }
    get inputs() {
        return this.connections.filter(a => a.isInput);
    }
    get outputs() {
        return this.connections.filter(a => a.isOutput);
    }
    isInput(param) {
        const connection = this.handleConnectionMap.get(param);
        return connection && connection.isInput;
    }
    isOutput(param) {
        const connection = this.handleConnectionMap.get(param);
        return connection && connection.isOutput;
    }
    getConnectionByName(name) {
        return this.handleConnectionMap.get(name);
    }
    getSlotSpec(slotName) {
        return this.slotConnections.get(slotName);
    }
    getSlandleSpec(slotName) {
        const slot = this.slotConnections.get(slotName);
        if (slot)
            return slot;
        const handleConn = this.handleConnectionMap.get(slotName);
        return handleConn.toSlotConnectionSpec();
    }
    slandleConnectionNames() {
        const slandleNames = this.handleConnections.filter(conn => conn.toSlotConnectionSpec()).map(conn => conn.name);
        return [...this.slotConnections.keys(), ...slandleNames];
    }
    slotConnectionNames() {
        return [...this.slotConnections.keys()];
    }
    get primaryVerb() {
        return (this.verbs.length > 0) ? this.verbs[0] : undefined;
    }
    isCompatible(modality) {
        return this.slandleConnectionNames().length === 0 || this.modality.intersection(modality).isResolved();
    }
    setImplBlobUrl(url) {
        this.model.implBlobUrl = this.implBlobUrl = url;
    }
    toLiteral() {
        const { args, name, verbs, description, implFile, implBlobUrl, modality, slotConnections, trustClaims, trustChecks } = this.model;
        const connectionToLiteral = ({ type, direction, name, isOptional, dependentConnections }) => ({ type: asTypeLiteral(type), direction, name, isOptional, dependentConnections: dependentConnections.map(connectionToLiteral) });
        const argsLiteral = args.map(a => connectionToLiteral(a));
        return { args: argsLiteral, name, verbs, description, implFile, implBlobUrl, modality, slotConnections, trustClaims, trustChecks };
    }
    static fromLiteral(literal) {
        let { args, name, verbs, description, implFile, implBlobUrl, modality, slotConnections, trustClaims, trustChecks } = literal;
        const connectionFromLiteral = ({ type, direction, name, isOptional, dependentConnections }) => ({ type: asType(type), direction, name, isOptional, dependentConnections: dependentConnections ? dependentConnections.map(connectionFromLiteral) : [] });
        args = args.map(connectionFromLiteral);
        return new ParticleSpec({ args, name, verbs: verbs || [], description, implFile, implBlobUrl, modality, slotConnections, trustClaims, trustChecks });
    }
    // Note: this method shouldn't be called directly.
    clone() {
        return ParticleSpec.fromLiteral(this.toLiteral());
    }
    // Note: this method shouldn't be called directly (only as part of particle copying).
    cloneWithResolutions(variableMap) {
        const spec = this.clone();
        this.handleConnectionMap.forEach((conn, name) => {
            spec.handleConnectionMap.get(name).type = conn.type._cloneWithResolutions(variableMap);
        });
        return spec;
    }
    equals(other) {
        return JSON.stringify(this.toLiteral()) === JSON.stringify(other.toLiteral());
    }
    validateDescription(description) {
        Object.keys(description || []).forEach(d => {
            assert(['kind', 'location', 'pattern'].includes(d) || this.handleConnectionMap.has(d), `Unexpected description for ${d}`);
        });
    }
    toInterface() {
        // TODO: wat do?
        assert(!this.slotConnections.size, 'please implement slots toInterface');
        const handles = this.model.args.map(({ type, name, direction }) => ({ type: asType(type), name, direction }));
        const slots = [];
        return InterfaceType.make(this.name, handles, slots);
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
            const tags = connection.tags.map((tag) => ` #${tag}`).join('');
            if (Flags.usePreSlandlesSyntax) {
                // TODO: Remove post slandles syntax
                results.push(`${indent}${connection.direction}${connection.isOptional ? '?' : ''} ${connection.type.toString()} ${connection.name}${tags}`);
            }
            else {
                results.push(`${indent}${connection.name}: ${connection.direction}${connection.isOptional ? '?' : ''} ${connection.type.toString()}${tags}`);
            }
            for (const dependent of connection.dependentConnections) {
                writeConnection(dependent, indent + '  ');
            }
        };
        for (const connection of this.handleConnections) {
            if (connection.parentConnection) {
                continue;
            }
            writeConnection(connection, indent);
        }
        this.trustClaims.forEach(claim => results.push(`  ${claim.toManifestString()}`));
        this.trustChecks.forEach(check => results.push(`  ${check.toManifestString()}`));
        this.modality.names.forEach(a => results.push(`  modality ${a}`));
        const slotToString = (s, direction, indent) => {
            const tokens = [];
            if (s.isRequired) {
                tokens.push('must');
            }
            tokens.push(direction);
            if (s.isSet) {
                tokens.push('set of');
            }
            tokens.push(s.name);
            if (s.tags.length > 0) {
                tokens.push(s.tags.map(a => `#${a}`).join(' '));
            }
            results.push(`${indent}${tokens.join(' ')}`);
            if (s.formFactor) {
                results.push(`${indent}  formFactor ${s.formFactor}`);
            }
            for (const handle of s.handles) {
                results.push(`${indent}  handle ${handle}`);
            }
            if (s.provideSlotConnections) {
                // Provided slots.
                s.provideSlotConnections.forEach(p => slotToString(p, 'provide', indent + '  '));
            }
        };
        this.slotConnections.forEach(s => slotToString(s, 'consume', '  '));
        // Description
        if (this.pattern) {
            results.push(`  description \`${this.pattern}\``);
            this.handleConnectionMap.forEach(cs => {
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
    validateTrustClaims(statements) {
        const results = [];
        if (statements) {
            statements.forEach(statement => {
                const handle = this.handleConnectionMap.get(statement.handle);
                if (!handle) {
                    throw new Error(`Can't make a claim on unknown handle ${statement.handle}.`);
                }
                if (!handle.isOutput) {
                    throw new Error(`Can't make a claim on handle ${statement.handle} (not an output handle).`);
                }
                if (handle.claims) {
                    throw new Error(`Can't make multiple claims on the same output (${statement.handle}).`);
                }
                const particleClaim = createParticleClaim(handle, statement, this.handleConnectionMap);
                handle.claims = particleClaim.claims;
                results.push(particleClaim);
            });
        }
        return results;
    }
    validateTrustChecks(checks) {
        const results = [];
        if (checks) {
            const providedSlotNames = this.getProvidedSlotsByName();
            checks.forEach(check => {
                switch (check.target.targetType) {
                    case 'handle': {
                        const handleName = check.target.name;
                        const handle = this.handleConnectionMap.get(handleName);
                        if (!handle) {
                            throw new Error(`Can't make a check on unknown handle ${handleName}.`);
                        }
                        if (handle.direction === '`consume' || handle.direction === '`provide') {
                            // Do slandles versions of slots checks and claims.
                            if (handle.direction === '`consume') {
                                throw new Error(`Can't make a check on handle ${handleName}. Can only make checks on input and provided handles.`);
                            }
                        }
                        else if (!handle.isInput) {
                            throw new Error(`Can't make a check on handle ${handleName} (not an input handle).`);
                        }
                        if (handle.check) {
                            throw new Error(`Can't make multiple checks on the same input (${handleName}).`);
                        }
                        handle.check = createCheck(handle, check, this.handleConnectionMap);
                        results.push(handle.check);
                        break;
                    }
                    case 'slot': {
                        const slotName = check.target.name;
                        const slotSpec = providedSlotNames.get(slotName);
                        if (!slotSpec) {
                            if (this.slotConnectionNames().includes(slotName)) {
                                throw new Error(`Slot ${slotName} is a consumed slot. Can only make checks on provided slots.`);
                            }
                            else {
                                throw new Error(`Can't make a check on unknown slot ${slotName}.`);
                            }
                        }
                        slotSpec.check = createCheck(slotSpec, check, this.handleConnectionMap);
                        results.push(slotSpec.check);
                        break;
                    }
                    default:
                        throw new Error('Unknown check target type.');
                }
            });
        }
        return results;
    }
    getProvidedSlotsByName() {
        const result = new Map();
        for (const consumeConnection of this.slotConnections.values()) {
            for (const provideConnection of consumeConnection.provideSlotConnections) {
                const name = provideConnection.name;
                if (result.has(name)) {
                    throw new Error(`Another slot with name '${name}' has already been provided by this particle.`);
                }
                result.set(name, provideConnection);
            }
        }
        return result;
    }
}
//# sourceMappingURL=particle-spec.js.map