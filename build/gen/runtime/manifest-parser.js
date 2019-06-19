// tslint:disable:no-any
// tslint:disable: only-arrow-functions
// tslint:disable: max-line-length
// tslint:disable: trailing-comma
// tslint:disable: interface-name
// tslint:disable: switch-default
// tslint:disable: object-literal-shorthand
export class SyntaxError extends Error {
    static buildMessage(expected, found) {
        function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/"/g, "\\\"")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
        }
        function classEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/\]/g, "\\]")
                .replace(/\^/g, "\\^")
                .replace(/-/g, "\\-")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
        }
        function describeExpectation(expectation) {
            switch (expectation.type) {
                case "literal":
                    return "\"" + literalEscape(expectation.text) + "\"";
                case "class":
                    const escapedParts = expectation.parts.map((part) => {
                        return Array.isArray(part)
                            ? classEscape(part[0]) + "-" + classEscape(part[1])
                            : classEscape(part);
                    });
                    return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                case "any":
                    return "any character";
                case "end":
                    return "end of input";
                case "other":
                    return expectation.description;
            }
        }
        function describeExpected(expected1) {
            const descriptions = expected1.map(describeExpectation);
            let i;
            let j;
            descriptions.sort();
            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                    if (descriptions[i - 1] !== descriptions[i]) {
                        descriptions[j] = descriptions[i];
                        j++;
                    }
                }
                descriptions.length = j;
            }
            switch (descriptions.length) {
                case 1:
                    return descriptions[0];
                case 2:
                    return descriptions[0] + " or " + descriptions[1];
                default:
                    return descriptions.slice(0, -1).join(", ")
                        + ", or "
                        + descriptions[descriptions.length - 1];
            }
        }
        function describeFound(found1) {
            return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    }
    constructor(message, expected, found, location) {
        super();
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, SyntaxError);
        }
    }
}
function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    const peg$FAILED = {};
    const peg$startRuleFunctions = { Manifest: peg$parseManifest };
    let peg$startRuleFunction = peg$parseManifest;
    const peg$c0 = function (items) {
        const result = items.map(item => {
            const manifestItem = item[2];
            manifestItem.annotation = optional(item[0], a => a[1], null);
            return manifestItem;
        });
        checkNormal(result);
        return result;
    };
    const peg$c1 = peg$otherExpectation("an annotation (e.g. @foo)");
    const peg$c2 = "@";
    const peg$c3 = peg$literalExpectation("@", false);
    const peg$c4 = function (annotation) { return annotation; };
    const peg$c5 = "resource";
    const peg$c6 = peg$literalExpectation("resource", false);
    const peg$c7 = function (name, body) {
        return {
            kind: 'resource',
            name,
            data: body,
            location: location()
        };
    };
    const peg$c8 = "start";
    const peg$c9 = peg$literalExpectation("start", false);
    const peg$c10 = function () { startIndent = indent; };
    const peg$c11 = function (lines) {
        return lines.map(line => line[0].substring(startIndent.length) + line[1]).join('');
    };
    const peg$c12 = /^[^\n]/;
    const peg$c13 = peg$classExpectation(["\n"], true, false);
    const peg$c14 = function () { return text(); };
    const peg$c15 = "store";
    const peg$c16 = peg$literalExpectation("store", false);
    const peg$c17 = "of";
    const peg$c18 = peg$literalExpectation("of", false);
    const peg$c19 = "!!";
    const peg$c20 = peg$literalExpectation("!!", false);
    const peg$c21 = function (name, type, id, originalId, version, tags, source, items) {
        items = optional(items, extractIndented, []);
        return {
            kind: 'store',
            location: location(),
            name,
            type,
            id: optional(id, id => id[1], null),
            originalId: optional(originalId, originalId => originalId[1], null),
            version: optional(version, version => version[1], null),
            tags: optional(tags, tags => tags[1], null),
            source: source.source,
            origin: source.origin,
            description: items.length > 0 ? items[0][2] : null
        };
    };
    const peg$c22 = "in";
    const peg$c23 = peg$literalExpectation("in", false);
    const peg$c24 = function (source) { return { origin: 'file', source }; };
    const peg$c25 = function (source) { return { origin: 'resource', source }; };
    const peg$c26 = "at";
    const peg$c27 = peg$literalExpectation("at", false);
    const peg$c28 = function (source) { return { origin: 'storage', source }; };
    const peg$c29 = "description";
    const peg$c30 = peg$literalExpectation("description", false);
    const peg$c31 = "import";
    const peg$c32 = peg$literalExpectation("import", false);
    const peg$c33 = function (path) {
        return {
            kind: 'import',
            location: location(),
            path,
        };
    };
    const peg$c34 = peg$otherExpectation("an interface");
    const peg$c35 = "interface";
    const peg$c36 = peg$literalExpectation("interface", false);
    const peg$c37 = "<";
    const peg$c38 = peg$literalExpectation("<", false);
    const peg$c39 = ">";
    const peg$c40 = peg$literalExpectation(">", false);
    const peg$c41 = function (name, typeVars, items) {
        return {
            kind: 'interface',
            location: location(),
            name,
            args: optional(items, extractIndented, []).filter(item => item.kind === 'interface-argument'),
            slots: optional(items, extractIndented, []).filter(item => item.kind === 'interface-slot'),
        };
    };
    const peg$c42 = "*";
    const peg$c43 = peg$literalExpectation("*", false);
    const peg$c44 = function (direction, type, name) {
        direction = optional(direction, dir => dir[0], null);
        if (direction === 'host') {
            error(`Interface cannot have arguments with a 'host' direction.`);
        }
        return {
            kind: 'interface-argument',
            location: location(),
            direction,
            type: optional(type, ty => ty[0], null),
            name,
        };
    };
    const peg$c45 = "must";
    const peg$c46 = peg$literalExpectation("must", false);
    const peg$c47 = "consume";
    const peg$c48 = peg$literalExpectation("consume", false);
    const peg$c49 = "provide";
    const peg$c50 = peg$literalExpectation("provide", false);
    const peg$c51 = "set of";
    const peg$c52 = peg$literalExpectation("set of", false);
    const peg$c53 = function (isRequired, direction, isSet, name) {
        return {
            kind: 'interface-slot',
            location: location(),
            name: optional(name, isRequired => name[1], null),
            isRequired: optional(isRequired, isRequired => isRequired[0] === 'must', false),
            direction,
            isSet: !!isSet,
        };
    };
    const peg$c54 = "meta";
    const peg$c55 = peg$literalExpectation("meta", false);
    const peg$c56 = function (items) {
        items = items ? extractIndented(items) : [];
        return { kind: 'meta', items: items, location: location() };
    };
    const peg$c57 = "name";
    const peg$c58 = peg$literalExpectation("name", false);
    const peg$c59 = ":";
    const peg$c60 = peg$literalExpectation(":", false);
    const peg$c61 = function (name) {
        return { key: 'name', value: name, location: location(), kind: 'name' };
    };
    const peg$c62 = "storageKey";
    const peg$c63 = peg$literalExpectation("storageKey", false);
    const peg$c64 = function (key) {
        return { key: 'storageKey', value: key, location: location(), kind: 'storageKey' };
    };
    const peg$c65 = "particle";
    const peg$c66 = peg$literalExpectation("particle", false);
    const peg$c67 = function (name, verbs, implFile, items) {
        let args = [];
        const modality = [];
        const slotConnections = [];
        const trustClaims = [];
        const trustChecks = [];
        let description = null;
        let hasParticleArgument = false;
        verbs = optional(verbs, parsedOutput => parsedOutput[1], []);
        items = optional(items, extractIndented, []);
        items.forEach(item => {
            if (item.kind === 'particle-interface') {
                if (/[A-Z]/.test(item.verb[0]) && item.verb !== name) {
                    error(`Verb ${item.verb} must start with a lower case character or be same as particle name.`);
                }
                verbs.push(item.verb);
                args = item.args; // TODO(jopra): This should merge, not overwrite;
                hasParticleArgument = true;
            }
            else if (item.kind === 'particle-argument') {
                args.push(item);
            }
            else if (item.kind === 'particle-slot') {
                slotConnections.push(item);
            }
            else if (item.kind === 'description') {
                description = {
                    kind: 'description',
                    location: location() // TODO: FIXME Get the locations of the item descriptions.
                };
                item.description.forEach(d => description[d.name] = d.pattern || d.patterns[0]);
            }
            else if (item.kind === 'particle-trust-claim-is-tag' || item.kind === 'particle-trust-claim-derives-from') {
                trustClaims.push(item);
            }
            else if (item.kind === 'particle-trust-check') {
                trustChecks.push(item);
            }
            else if (item.modality) {
                modality.push(item.modality);
            }
            else {
                error(`Particle ${name} contains an unknown element: ${item.name}`);
            }
        });
        if (modality.length === 0) {
            // Add default modality
            modality.push('dom');
        }
        return {
            kind: 'particle',
            location: location(),
            name,
            implFile: optional(implFile, implFile => implFile[3], null),
            verbs,
            args,
            modality,
            slotConnections,
            description,
            hasParticleArgument,
            trustClaims,
            trustChecks,
        };
    };
    const peg$c68 = peg$otherExpectation("a particle item");
    const peg$c69 = "claim";
    const peg$c70 = peg$literalExpectation("claim", false);
    const peg$c71 = "is";
    const peg$c72 = peg$literalExpectation("is", false);
    const peg$c73 = function (handle, tag) {
        return {
            kind: 'particle-trust-claim-is-tag',
            claimType: 'is-tag',
            location: location(),
            handle,
            tag,
        };
    };
    const peg$c74 = "derives from";
    const peg$c75 = peg$literalExpectation("derives from", false);
    const peg$c76 = "and";
    const peg$c77 = peg$literalExpectation("and", false);
    const peg$c78 = function (handle, first, rest) {
        const parentHandles = [first, ...rest.map(item => item[3])];
        return {
            kind: 'particle-trust-claim-derives-from',
            claimType: 'derives-from',
            location: location(),
            handle,
            parentHandles,
        };
    };
    const peg$c79 = "check";
    const peg$c80 = peg$literalExpectation("check", false);
    const peg$c81 = "or";
    const peg$c82 = peg$literalExpectation("or", false);
    const peg$c83 = function (handle, first, rest) {
        const conditions = [first, ...rest.map(item => item[3])];
        return {
            kind: 'particle-trust-check',
            location: location(),
            handle,
            conditions,
        };
    };
    const peg$c84 = function (tag) {
        return {
            kind: 'particle-trust-check-has-tag',
            checkType: 'has-tag',
            location: location(),
            tag,
        };
    };
    const peg$c85 = "is from handle";
    const peg$c86 = peg$literalExpectation("is from handle", false);
    const peg$c87 = function (parentHandle) {
        return {
            kind: 'particle-trust-check-is-from-handle',
            checkType: 'is-from-handle',
            location: location(),
            parentHandle,
        };
    };
    const peg$c88 = function (arg, dependentConnections) {
        arg.dependentConnections = optional(dependentConnections, extractIndented, []);
        return arg;
    };
    const peg$c89 = "?";
    const peg$c90 = peg$literalExpectation("?", false);
    const peg$c91 = function (direction, isOptional, type, nametag) {
        return {
            kind: 'particle-argument',
            location: location(),
            direction,
            type: type,
            isOptional: !!isOptional,
            dependentConnections: [],
            name: nametag.name,
            tags: nametag.tags,
        };
    };
    const peg$c92 = peg$otherExpectation("a direction (e.g. inout, in, out, host, `consume, `provide)");
    const peg$c93 = "inout";
    const peg$c94 = peg$literalExpectation("inout", false);
    const peg$c95 = "out";
    const peg$c96 = peg$literalExpectation("out", false);
    const peg$c97 = "host";
    const peg$c98 = peg$literalExpectation("host", false);
    const peg$c99 = "`consume";
    const peg$c100 = peg$literalExpectation("`consume", false);
    const peg$c101 = "`provide";
    const peg$c102 = peg$literalExpectation("`provide", false);
    const peg$c103 = function () {
        return text();
    };
    const peg$c104 = "[";
    const peg$c105 = peg$literalExpectation("[", false);
    const peg$c106 = "]";
    const peg$c107 = peg$literalExpectation("]", false);
    const peg$c108 = function (type) {
        return {
            kind: 'collection-type',
            location: location(),
            type,
        };
    };
    const peg$c109 = "BigCollection<";
    const peg$c110 = peg$literalExpectation("BigCollection<", false);
    const peg$c111 = function (type) {
        return {
            kind: 'big-collection-type',
            location: location(),
            type,
        };
    };
    const peg$c112 = "Reference<";
    const peg$c113 = peg$literalExpectation("Reference<", false);
    const peg$c114 = function (type) {
        return {
            kind: 'reference-type',
            location: location(),
            type,
        };
    };
    const peg$c115 = peg$otherExpectation("a type variable (e.g. ~foo)");
    const peg$c116 = "~";
    const peg$c117 = peg$literalExpectation("~", false);
    const peg$c118 = "with";
    const peg$c119 = peg$literalExpectation("with", false);
    const peg$c120 = function (name, constraint) {
        return {
            kind: 'variable-type',
            location: location(),
            name,
            constraint: optional(constraint, constraint => constraint[3], null),
        };
    };
    const peg$c121 = "Slot";
    const peg$c122 = peg$literalExpectation("Slot", false);
    const peg$c123 = /^[^a-z0-9_]/i;
    const peg$c124 = peg$classExpectation([["a", "z"], ["0", "9"], "_"], true, true);
    const peg$c125 = "{";
    const peg$c126 = peg$literalExpectation("{", false);
    const peg$c127 = ",";
    const peg$c128 = peg$literalExpectation(",", false);
    const peg$c129 = "}";
    const peg$c130 = peg$literalExpectation("}", false);
    const peg$c131 = function (fields) {
        fields = optional(fields, fields => {
            const data = fields[2];
            return [data[0]].concat(data[1].map(tail => tail[2]));
        }, []);
        return {
            kind: 'slot-type',
            location: location(),
            fields
        };
    };
    const peg$c132 = function (name, value) {
        return {
            kind: 'slot-field',
            location: location(),
            name,
            value
        };
    };
    const peg$c133 = function (name) {
        return {
            kind: 'type-name',
            location: location(),
            name,
        };
    };
    const peg$c134 = function (head, tail) {
        return [head, ...tail.map(a => a[2])];
    };
    const peg$c135 = "modality";
    const peg$c136 = peg$literalExpectation("modality", false);
    const peg$c137 = function (modality) {
        return {
            kind: 'particle-modality',
            location: location(),
            modality,
        };
    };
    const peg$c138 = "dom-touch";
    const peg$c139 = peg$literalExpectation("dom-touch", false);
    const peg$c140 = "dom";
    const peg$c141 = peg$literalExpectation("dom", false);
    const peg$c142 = "vr";
    const peg$c143 = peg$literalExpectation("vr", false);
    const peg$c144 = "voice";
    const peg$c145 = peg$literalExpectation("voice", false);
    const peg$c146 = "mock-dom-touch";
    const peg$c147 = peg$literalExpectation("mock-dom-touch", false);
    const peg$c148 = "mock-dom";
    const peg$c149 = peg$literalExpectation("mock-dom", false);
    const peg$c150 = "mock-vr";
    const peg$c151 = peg$literalExpectation("mock-vr", false);
    const peg$c152 = "mock-voice";
    const peg$c153 = peg$literalExpectation("mock-voice", false);
    const peg$c154 = function (isRequired, isSet, name, tags, items) {
        let formFactor = null;
        const provideSlotConnections = [];
        items = optional(items, extractIndented, []);
        items.forEach(item => {
            if (item.kind === 'provided-slot') {
                provideSlotConnections.push(item);
            }
            else if (item.kind === 'form-factor') {
                if (formFactor) {
                    error('duplicate form factor for a slot');
                }
                formFactor = item.formFactor;
            }
            else {
                error('Unsupported particle slot item ', item);
            }
        });
        return {
            kind: 'particle-slot',
            location: location(),
            name,
            tags: optional(tags, tags => tags[1], []),
            isRequired: optional(isRequired, isRequired => isRequired[0] === 'must', false),
            isSet: !!isSet,
            formFactor,
            provideSlotConnections
        };
    };
    const peg$c155 = "formFactor";
    const peg$c156 = peg$literalExpectation("formFactor", false);
    const peg$c157 = "fullscreen";
    const peg$c158 = peg$literalExpectation("fullscreen", false);
    const peg$c159 = "big";
    const peg$c160 = peg$literalExpectation("big", false);
    const peg$c161 = "medium";
    const peg$c162 = peg$literalExpectation("medium", false);
    const peg$c163 = "small";
    const peg$c164 = peg$literalExpectation("small", false);
    const peg$c165 = function (formFactor) {
        return {
            kind: 'form-factor',
            location: location(),
            formFactor
        };
    };
    const peg$c166 = function (isRequired, isSet, name, tags, items) {
        let formFactor = null;
        const handles = [];
        items = items ? extractIndented(items) : [];
        items.forEach(item => {
            if (item.kind === 'form-factor') {
                if (formFactor) {
                    error('duplicate form factor for a slot');
                }
                formFactor = item.formFactor;
            }
            else {
                handles.push(item.handle);
            }
        });
        return {
            kind: 'provided-slot',
            location: location(),
            name,
            tags: optional(tags, tags => tags[1], []),
            isRequired: optional(isRequired, isRequired => isRequired[0] === 'must', false),
            isSet: !!isSet,
            formFactor,
            handles
        };
    };
    const peg$c167 = "handle";
    const peg$c168 = peg$literalExpectation("handle", false);
    const peg$c169 = function (handle) {
        return {
            kind: 'particle-provided-slot-handle',
            location: location(),
            handle,
        };
    };
    const peg$c170 = function (pattern, handleDescriptions) {
        handleDescriptions = optional(handleDescriptions, extractIndented, []);
        const patterns = [];
        if (pattern) {
            patterns.push(pattern);
        }
        handleDescriptions.filter(desc => desc.name === 'pattern').forEach(p => patterns.push(p));
        handleDescriptions = handleDescriptions.filter(desc => desc.name !== 'pattern');
        return {
            kind: 'description',
            location: location(),
            description: [
                {
                    // TODO: this should be stored in a different field.
                    // TODO: FIXME
                    kind: 'default-description?',
                    location: location(),
                    name: 'pattern',
                    patterns: patterns,
                },
                ...handleDescriptions,
            ],
        };
    };
    const peg$c171 = function (name, pattern) {
        return {
            kind: 'handle-description',
            location: location(),
            name,
            pattern,
        };
    };
    const peg$c172 = "recipe";
    const peg$c173 = peg$literalExpectation("recipe", false);
    const peg$c174 = function (name, verbs, items) {
        verbs = optional(verbs, parsedOutput => parsedOutput[1], []);
        return {
            kind: 'recipe',
            location: location(),
            name: optional(name, name => name[1], null),
            verbs,
            items: optional(items, extractIndented, []),
        };
    };
    const peg$c175 = "as";
    const peg$c176 = peg$literalExpectation("as", false);
    const peg$c177 = /^[a-zA-Z0-9]/;
    const peg$c178 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"]], false, false);
    const peg$c179 = function () { expected(`lower identifier`); };
    const peg$c180 = function (name) {
        return name;
    };
    const peg$c181 = function (ref, name, connections) {
        const handleConnections = [];
        const slotConnections = [];
        if (connections) {
            connections = extractIndented(connections);
            for (const conn of connections) {
                if (conn.kind === 'handle-connection') {
                    handleConnections.push(conn);
                }
                else {
                    slotConnections.push(conn);
                }
            }
        }
        return {
            kind: 'particle',
            location: location(),
            name: optional(name, name => name[1], null),
            ref,
            connections: handleConnections,
            slotConnections: slotConnections,
        };
    };
    const peg$c182 = function (param, dir, target, dependentConnections) {
        return {
            kind: 'handle-connection',
            location: location(),
            param,
            dir,
            target: optional(target, target => target[1], null),
            dependentConnections: optional(dependentConnections, extractIndented, []),
        };
    };
    const peg$c183 = function (param, tags) {
        param = optional(param, param => param, null);
        let name = null;
        let particle = null;
        if (param) {
            if (param[0].toUpperCase() === param[0]) {
                particle = param;
            }
            else {
                name = param;
            }
        }
        return {
            kind: 'handle-connection-components',
            location: location(),
            name,
            particle,
            tags: optional(tags, tags => tags, []),
        };
    };
    const peg$c184 = function (direction, ref, name, dependentSlotConnections) {
        return {
            kind: 'slot-connection',
            location: location(),
            direction,
            param: ref.param,
            tags: ref.tags,
            name: optional(name, name => name[1], null),
            dependentSlotConnections: optional(dependentSlotConnections, extractIndented, []),
        };
    };
    const peg$c185 = function (param, tags) {
        return {
            kind: 'slot-connection-ref',
            location: location(),
            param,
            tags,
        };
    };
    const peg$c186 = function (from, direction, to) {
        return {
            kind: 'connection',
            location: location(),
            direction,
            from,
            to,
        };
    };
    const peg$c187 = "search";
    const peg$c188 = peg$literalExpectation("search", false);
    const peg$c189 = "tokens";
    const peg$c190 = peg$literalExpectation("tokens", false);
    const peg$c191 = function (phrase, tokens) {
        return {
            kind: 'search',
            location: location(),
            phrase,
            tokens: optional(tokens, tokens => tokens[1][2].map(t => t[1]), null)
        };
    };
    const peg$c192 = "<-";
    const peg$c193 = peg$literalExpectation("<-", false);
    const peg$c194 = "->";
    const peg$c195 = peg$literalExpectation("->", false);
    const peg$c196 = "=";
    const peg$c197 = peg$literalExpectation("=", false);
    const peg$c198 = function (verbs, components) {
        const { param, tags } = optional(components, components => components, { param: null, tags: [] });
        return {
            kind: 'connection-target',
            location: location(),
            targetType: 'verb',
            verbs,
            param,
            tags
        };
    };
    const peg$c199 = function (tags) {
        return {
            kind: 'connection-target',
            location: location(),
            targetType: 'tag',
            tags
        };
    };
    const peg$c200 = function (name, components) {
        const { param, tags } = optional(components, components => components, { param: null, tags: [] });
        return {
            kind: 'connection-target',
            targetType: 'localName',
            location: location(),
            name,
            param,
            tags
        };
    };
    const peg$c201 = function (particle, components) {
        const { param, tags } = optional(components, components => components, { param: null, tags: [] });
        return {
            kind: 'connection-target',
            targetType: 'particle',
            location: location(),
            particle,
            param,
            tags
        };
    };
    const peg$c202 = ".";
    const peg$c203 = peg$literalExpectation(".", false);
    const peg$c204 = function (param, tags) {
        return {
            param: optional(param, param => param, null),
            tags: optional(tags, tags => tags[1], []),
        };
    };
    const peg$c205 = "use";
    const peg$c206 = peg$literalExpectation("use", false);
    const peg$c207 = "map";
    const peg$c208 = peg$literalExpectation("map", false);
    const peg$c209 = "create";
    const peg$c210 = peg$literalExpectation("create", false);
    const peg$c211 = "copy";
    const peg$c212 = peg$literalExpectation("copy", false);
    const peg$c213 = "`slot";
    const peg$c214 = peg$literalExpectation("`slot", false);
    const peg$c215 = function (type, ref, name) {
        return {
            kind: 'handle',
            location: location(),
            name: optional(name, name => name[1], null),
            ref: optional(ref, ref => ref[1], emptyRef()),
            fate: type
        };
    };
    const peg$c216 = "require";
    const peg$c217 = peg$literalExpectation("require", false);
    const peg$c218 = function (items) {
        return {
            kind: 'require',
            location: location(),
            items: extractIndented(items),
        };
    };
    const peg$c219 = function (name, ref) {
        return {
            kind: 'requireHandle',
            location: location(),
            name: optional(name, name => name[1], null),
            ref: optional(ref, ref => ref[1], emptyRef()),
        };
    };
    const peg$c220 = "#";
    const peg$c221 = peg$literalExpectation("#", false);
    const peg$c222 = /^[a-zA-Z]/;
    const peg$c223 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
    const peg$c224 = /^[a-zA-Z0-9_]/;
    const peg$c225 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false);
    const peg$c226 = function () { return text().substring(1); };
    const peg$c227 = function (head, tail) { return [head, ...(tail && tail[1] || [])]; };
    const peg$c228 = peg$otherExpectation("a verb (e.g. &Verb)");
    const peg$c229 = "&";
    const peg$c230 = peg$literalExpectation("&", false);
    const peg$c231 = function (tags) { return tags; };
    const peg$c232 = function (name, tags) {
        return {
            location: location(),
            name: name,
            tags: tags = optional(tags, list => list[1], [])
        };
    };
    const peg$c233 = function (name) {
        return {
            location: location(),
            name: name,
            tags: []
        };
    };
    const peg$c234 = function (tags) {
        return {
            location: location(),
            name: tags[0],
            tags: tags
        };
    };
    const peg$c235 = function (name) {
        return {
            kind: 'particle-ref',
            location: location(),
            name,
            verbs: [],
            tags: []
        };
    };
    const peg$c236 = function (verb) {
        return {
            kind: 'particle-ref',
            location: location(),
            verbs: [verb],
            tags: []
        };
    };
    const peg$c237 = function (id, tags) {
        return {
            kind: 'handle-ref',
            location: location(),
            id,
            tags: tags || [],
        };
    };
    const peg$c238 = function (name, tags) {
        return {
            kind: 'handle-ref',
            location: location(),
            name,
            tags: tags || [],
        };
    };
    const peg$c239 = function (tags) {
        return {
            kind: 'handle-ref',
            location: location(),
            tags,
        };
    };
    const peg$c240 = "slot";
    const peg$c241 = peg$literalExpectation("slot", false);
    const peg$c242 = function (ref, name) {
        return {
            kind: 'slot',
            location: location(),
            ref: optional(ref, ref => ref[1], emptyRef()),
            name: optional(name, name => name[1], '')
        };
    };
    const peg$c243 = function (names, fields) {
        return {
            kind: 'schema-inline',
            location: location(),
            names: optional(names, names => names.map(name => name[0]).filter(name => name !== '*'), []),
            fields: optional(fields, fields => [fields[0], ...fields[1].map(tail => tail[2])], []),
        };
    };
    const peg$c244 = function (type, name) {
        return {
            kind: 'schema-inline-field',
            location: location(),
            name,
            type: optional(type, type => type[0], null),
        };
    };
    const peg$c245 = "schema";
    const peg$c246 = peg$literalExpectation("schema", false);
    const peg$c247 = function (names, parents) {
        return {
            names: names.map(name => name[1]).filter(name => name !== '*'),
            parents: optional(parents, parents => parents, []),
        };
    };
    const peg$c248 = "alias";
    const peg$c249 = peg$literalExpectation("alias", false);
    const peg$c250 = function (spec, alias, items) {
        return {
            kind: 'schema',
            location: location(),
            items: optional(items, extractIndented, []),
            alias,
            ...spec
        };
    };
    const peg$c251 = function (spec, items) {
        return {
            kind: 'schema',
            location: location(),
            items: optional(items, extractIndented, []),
            ...spec
        };
    };
    const peg$c252 = "extends";
    const peg$c253 = peg$literalExpectation("extends", false);
    const peg$c254 = function (first, rest) {
        return [first, ...(rest.map(item => item[3]))];
    };
    const peg$c255 = function (type, name) {
        return {
            kind: 'schema-field',
            location: location(),
            type,
            name,
        };
    };
    const peg$c256 = function (schema) {
        return {
            kind: 'schema-collection',
            location: location(),
            schema
        };
    };
    const peg$c257 = function (schema) {
        return {
            kind: 'schema-reference',
            location: location(),
            schema
        };
    };
    const peg$c258 = "Text";
    const peg$c259 = peg$literalExpectation("Text", false);
    const peg$c260 = "URL";
    const peg$c261 = peg$literalExpectation("URL", false);
    const peg$c262 = "Number";
    const peg$c263 = peg$literalExpectation("Number", false);
    const peg$c264 = "Boolean";
    const peg$c265 = peg$literalExpectation("Boolean", false);
    const peg$c266 = "Bytes";
    const peg$c267 = peg$literalExpectation("Bytes", false);
    const peg$c268 = "Object";
    const peg$c269 = peg$literalExpectation("Object", false);
    const peg$c270 = function (type) {
        return {
            kind: 'schema-primitive',
            location: location(),
            type
        };
    };
    const peg$c271 = "(";
    const peg$c272 = peg$literalExpectation("(", false);
    const peg$c273 = ")";
    const peg$c274 = peg$literalExpectation(")", false);
    const peg$c275 = function (first, rest) {
        const types = [first];
        for (const type of rest) {
            types.push(type[3]);
        }
        return { kind: 'schema-union', location: location(), types };
    };
    const peg$c276 = function (first, rest) {
        const types = [first];
        for (const type of rest) {
            types.push(type[3]);
        }
        return { kind: 'schema-tuple', location: location(), types };
    };
    const peg$c277 = peg$otherExpectation("a version number (e.g. @012)");
    const peg$c278 = /^[0-9]/;
    const peg$c279 = peg$classExpectation([["0", "9"]], false, false);
    const peg$c280 = function (version) {
        return Number(version.join(''));
    };
    const peg$c281 = peg$otherExpectation("indentation");
    const peg$c282 = " ";
    const peg$c283 = peg$literalExpectation(" ", false);
    const peg$c284 = function (i) {
        i = i.join('');
        if (i.length > indent.length) {
            indents.push(indent);
            indent = i;
            return true;
        }
        return false;
    };
    const peg$c285 = peg$otherExpectation("same indentation");
    const peg$c286 = function (i) {
        i = i.join('');
        if (i.length === indent.length) {
            return true;
        }
        else if (i.length < indent.length) {
            indent = indents.pop();
            return false;
        }
        return false;
    };
    const peg$c287 = peg$otherExpectation("same or more indentation");
    const peg$c288 = function (i) {
        i = i.join('');
        if (i.length >= indent.length) {
            return true;
        }
        else if (i.length < indent.length) {
            indent = indents.pop();
            return false;
        }
        return undefined;
    };
    const peg$c289 = /^[^a-zA-Z0-9_]/;
    const peg$c290 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_"], true, false);
    const peg$c291 = peg$anyExpectation();
    const peg$c292 = function (keyword) {
        expected(`identifier`);
    };
    const peg$c293 = peg$otherExpectation("a `backquoted string`");
    const peg$c294 = "`";
    const peg$c295 = peg$literalExpectation("`", false);
    const peg$c296 = /^[^`]/;
    const peg$c297 = peg$classExpectation(["`"], true, false);
    const peg$c298 = function (pattern) { return pattern.join(''); };
    const peg$c299 = peg$otherExpectation("an identifier (e.g. 'id')");
    const peg$c300 = "'";
    const peg$c301 = peg$literalExpectation("'", false);
    const peg$c302 = /^[^']/;
    const peg$c303 = peg$classExpectation(["'"], true, false);
    const peg$c304 = function (id) { return id.join(''); };
    const peg$c305 = peg$otherExpectation("an uppercase identifier (e.g. Foo)");
    const peg$c306 = /^[A-Z]/;
    const peg$c307 = peg$classExpectation([["A", "Z"]], false, false);
    const peg$c308 = /^[a-z0-9_]/i;
    const peg$c309 = peg$classExpectation([["a", "z"], ["0", "9"], "_"], false, true);
    const peg$c310 = peg$otherExpectation("a lowercase identifier (e.g. foo)");
    const peg$c311 = /^[a-z]/;
    const peg$c312 = peg$classExpectation([["a", "z"]], false, false);
    const peg$c313 = peg$otherExpectation("a field name (e.g. foo9)");
    const peg$c314 = peg$otherExpectation("one or more whitespace characters");
    const peg$c315 = peg$otherExpectation("a group of new lines (and optionally comments)");
    const peg$c316 = /^[ ]/;
    const peg$c317 = peg$classExpectation([" "], false, false);
    const peg$c318 = "//";
    const peg$c319 = peg$literalExpectation("//", false);
    const peg$c320 = peg$otherExpectation("a new line");
    const peg$c321 = "\r";
    const peg$c322 = peg$literalExpectation("\r", false);
    const peg$c323 = "\n";
    const peg$c324 = peg$literalExpectation("\n", false);
    let peg$currPos = 0;
    let peg$savedPos = 0;
    const peg$posDetailsCache = [{ line: 1, column: 1 }];
    let peg$maxFailPos = 0;
    let peg$maxFailExpected = [];
    let peg$silentFails = 0;
    let peg$result;
    if (options.startRule !== undefined) {
        if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
    }
    function error(message, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location1);
    }
    function peg$literalExpectation(text1, ignoreCase) {
        return { type: "literal", text: text1, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        let details = peg$posDetailsCache[pos];
        let p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        const startPosDetails = peg$computePosDetails(startPos);
        const endPosDetails = peg$computePosDetails(endPos);
        return {
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected1) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected1);
    }
    function peg$buildSimpleError(message, location1) {
        return new SyntaxError(message, [], "", location1);
    }
    function peg$buildStructuredError(expected1, found, location1) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }
    function peg$parseManifest() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parseeolWhiteSpace();
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseIndent();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$currPos;
                s5 = peg$currPos;
                s6 = peg$parseSameIndent();
                if (s6 !== peg$FAILED) {
                    s7 = peg$parseAnnotation();
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parseeolWhiteSpace();
                        if (s8 !== peg$FAILED) {
                            s6 = [s6, s7, s8];
                            s5 = s6;
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                }
                if (s5 === peg$FAILED) {
                    s5 = null;
                }
                if (s5 !== peg$FAILED) {
                    s6 = peg$parseSameIndent();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseManifestItem();
                        if (s7 !== peg$FAILED) {
                            s5 = [s5, s6, s7];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    s4 = peg$currPos;
                    s5 = peg$currPos;
                    s6 = peg$parseSameIndent();
                    if (s6 !== peg$FAILED) {
                        s7 = peg$parseAnnotation();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parseeolWhiteSpace();
                            if (s8 !== peg$FAILED) {
                                s6 = [s6, s7, s8];
                                s5 = s6;
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    if (s5 === peg$FAILED) {
                        s5 = null;
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseSameIndent();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseManifestItem();
                            if (s7 !== peg$FAILED) {
                                s5 = [s5, s6, s7];
                                s4 = s5;
                            }
                            else {
                                peg$currPos = s4;
                                s4 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c0(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseManifestItem() {
        let s0;
        s0 = peg$parseRecipe();
        if (s0 === peg$FAILED) {
            s0 = peg$parseParticle();
            if (s0 === peg$FAILED) {
                s0 = peg$parseImport();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseSchema();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseSchemaAlias();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseManifestStorage();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parseInterface();
                                if (s0 === peg$FAILED) {
                                    s0 = peg$parseMeta();
                                    if (s0 === peg$FAILED) {
                                        s0 = peg$parseResource();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseAnnotation() {
        let s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 64) {
            s1 = peg$c2;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c3);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parselowerIdent();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c4(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c1);
            }
        }
        return s0;
    }
    function peg$parseResource() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 8) === peg$c5) {
            s1 = peg$c5;
            peg$currPos += 8;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c6);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseupperIdent();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseIndent();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseSameIndent();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseResourceStart();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parseResourceBody();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseeolWhiteSpace();
                                        if (s9 === peg$FAILED) {
                                            s9 = null;
                                        }
                                        if (s9 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c7(s3, s8);
                                            s0 = s1;
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseResourceStart() {
        let s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c8) {
            s1 = peg$c8;
            peg$currPos += 5;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c9);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseeol();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c10();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseResourceBody() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parseSameOrMoreIndent();
        if (s3 !== peg$FAILED) {
            s4 = peg$parseResourceLine();
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$currPos;
                s3 = peg$parseSameOrMoreIndent();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseResourceLine();
                    if (s4 !== peg$FAILED) {
                        s3 = [s3, s4];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c11(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseResourceLine() {
        let s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c12.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c13);
            }
        }
        while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c12.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c13);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseeol();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c14();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseManifestStorage() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19, s20;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c15) {
            s1 = peg$c15;
            peg$currPos += 5;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c16);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseupperIdent();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c17) {
                            s5 = peg$c17;
                            peg$currPos += 2;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c18);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsewhiteSpace();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseManifestStorageType();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$currPos;
                                    s9 = peg$parsewhiteSpace();
                                    if (s9 !== peg$FAILED) {
                                        s10 = peg$parseid();
                                        if (s10 !== peg$FAILED) {
                                            s9 = [s9, s10];
                                            s8 = s9;
                                        }
                                        else {
                                            peg$currPos = s8;
                                            s8 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s8;
                                        s8 = peg$FAILED;
                                    }
                                    if (s8 === peg$FAILED) {
                                        s8 = null;
                                    }
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$currPos;
                                        if (input.substr(peg$currPos, 2) === peg$c19) {
                                            s10 = peg$c19;
                                            peg$currPos += 2;
                                        }
                                        else {
                                            s10 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c20);
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parseid();
                                            if (s11 !== peg$FAILED) {
                                                s10 = [s10, s11];
                                                s9 = s10;
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                        if (s9 === peg$FAILED) {
                                            s9 = null;
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$currPos;
                                            s11 = peg$parsewhiteSpace();
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parseVersion();
                                                if (s12 !== peg$FAILED) {
                                                    s11 = [s11, s12];
                                                    s10 = s11;
                                                }
                                                else {
                                                    peg$currPos = s10;
                                                    s10 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s10;
                                                s10 = peg$FAILED;
                                            }
                                            if (s10 === peg$FAILED) {
                                                s10 = null;
                                            }
                                            if (s10 !== peg$FAILED) {
                                                s11 = peg$currPos;
                                                s12 = peg$parsewhiteSpace();
                                                if (s12 !== peg$FAILED) {
                                                    s13 = peg$parseTagList();
                                                    if (s13 !== peg$FAILED) {
                                                        s12 = [s12, s13];
                                                        s11 = s12;
                                                    }
                                                    else {
                                                        peg$currPos = s11;
                                                        s11 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s11;
                                                    s11 = peg$FAILED;
                                                }
                                                if (s11 === peg$FAILED) {
                                                    s11 = null;
                                                }
                                                if (s11 !== peg$FAILED) {
                                                    s12 = peg$parsewhiteSpace();
                                                    if (s12 !== peg$FAILED) {
                                                        s13 = peg$parseManifestStorageSource();
                                                        if (s13 !== peg$FAILED) {
                                                            s14 = peg$parseeolWhiteSpace();
                                                            if (s14 !== peg$FAILED) {
                                                                s15 = peg$currPos;
                                                                s16 = peg$parseIndent();
                                                                if (s16 !== peg$FAILED) {
                                                                    s17 = [];
                                                                    s18 = peg$currPos;
                                                                    s19 = peg$parseSameIndent();
                                                                    if (s19 !== peg$FAILED) {
                                                                        s20 = peg$parseManifestStorageDescription();
                                                                        if (s20 !== peg$FAILED) {
                                                                            s19 = [s19, s20];
                                                                            s18 = s19;
                                                                        }
                                                                        else {
                                                                            peg$currPos = s18;
                                                                            s18 = peg$FAILED;
                                                                        }
                                                                    }
                                                                    else {
                                                                        peg$currPos = s18;
                                                                        s18 = peg$FAILED;
                                                                    }
                                                                    if (s18 !== peg$FAILED) {
                                                                        while (s18 !== peg$FAILED) {
                                                                            s17.push(s18);
                                                                            s18 = peg$currPos;
                                                                            s19 = peg$parseSameIndent();
                                                                            if (s19 !== peg$FAILED) {
                                                                                s20 = peg$parseManifestStorageDescription();
                                                                                if (s20 !== peg$FAILED) {
                                                                                    s19 = [s19, s20];
                                                                                    s18 = s19;
                                                                                }
                                                                                else {
                                                                                    peg$currPos = s18;
                                                                                    s18 = peg$FAILED;
                                                                                }
                                                                            }
                                                                            else {
                                                                                peg$currPos = s18;
                                                                                s18 = peg$FAILED;
                                                                            }
                                                                        }
                                                                    }
                                                                    else {
                                                                        s17 = peg$FAILED;
                                                                    }
                                                                    if (s17 !== peg$FAILED) {
                                                                        s16 = [s16, s17];
                                                                        s15 = s16;
                                                                    }
                                                                    else {
                                                                        peg$currPos = s15;
                                                                        s15 = peg$FAILED;
                                                                    }
                                                                }
                                                                else {
                                                                    peg$currPos = s15;
                                                                    s15 = peg$FAILED;
                                                                }
                                                                if (s15 === peg$FAILED) {
                                                                    s15 = null;
                                                                }
                                                                if (s15 !== peg$FAILED) {
                                                                    peg$savedPos = s0;
                                                                    s1 = peg$c21(s3, s7, s8, s9, s10, s11, s13, s15);
                                                                    s0 = s1;
                                                                }
                                                                else {
                                                                    peg$currPos = s0;
                                                                    s0 = peg$FAILED;
                                                                }
                                                            }
                                                            else {
                                                                peg$currPos = s0;
                                                                s0 = peg$FAILED;
                                                            }
                                                        }
                                                        else {
                                                            peg$currPos = s0;
                                                            s0 = peg$FAILED;
                                                        }
                                                    }
                                                    else {
                                                        peg$currPos = s0;
                                                        s0 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s0;
                                                    s0 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s0;
                                                s0 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseManifestStorageType() {
        let s0;
        s0 = peg$parseSchemaInline();
        if (s0 === peg$FAILED) {
            s0 = peg$parseCollectionType();
            if (s0 === peg$FAILED) {
                s0 = peg$parseBigCollectionType();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseTypeName();
                }
            }
        }
        return s0;
    }
    function peg$parseManifestStorageSource() {
        let s0;
        s0 = peg$parseManifestStorageFileSource();
        if (s0 === peg$FAILED) {
            s0 = peg$parseManifestStorageResourceSource();
            if (s0 === peg$FAILED) {
                s0 = peg$parseManifestStorageStorageSource();
            }
        }
        return s0;
    }
    function peg$parseManifestStorageFileSource() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c22) {
            s1 = peg$c22;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c23);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseid();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c24(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseManifestStorageResourceSource() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c22) {
            s1 = peg$c22;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c23);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseupperIdent();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c25(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseManifestStorageStorageSource() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c26) {
            s1 = peg$c26;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c27);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseid();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c28(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseManifestStorageDescription() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 11) === peg$c29) {
            s1 = peg$c29;
            peg$currPos += 11;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c30);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsebackquotedString();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        s1 = [s1, s2, s3, s4];
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseImport() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c31) {
            s1 = peg$c31;
            peg$currPos += 6;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c32);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseid();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c33(s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseInterface() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 9) === peg$c35) {
            s1 = peg$c35;
            peg$currPos += 9;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c36);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseupperIdent();
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    s5 = peg$parsewhiteSpace();
                    if (s5 === peg$FAILED) {
                        s5 = null;
                    }
                    if (s5 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 60) {
                            s6 = peg$c37;
                            peg$currPos++;
                        }
                        else {
                            s6 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c38);
                            }
                        }
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parsewhiteSpace();
                            if (s7 === peg$FAILED) {
                                s7 = null;
                            }
                            if (s7 !== peg$FAILED) {
                                s8 = peg$parseTypeVariableList();
                                if (s8 !== peg$FAILED) {
                                    s9 = peg$parsewhiteSpace();
                                    if (s9 === peg$FAILED) {
                                        s9 = null;
                                    }
                                    if (s9 !== peg$FAILED) {
                                        if (input.charCodeAt(peg$currPos) === 62) {
                                            s10 = peg$c39;
                                            peg$currPos++;
                                        }
                                        else {
                                            s10 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c40);
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s5 = [s5, s6, s7, s8, s9, s10];
                                            s4 = s5;
                                        }
                                        else {
                                            peg$currPos = s4;
                                            s4 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s4;
                                        s4 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s4;
                                    s4 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s4;
                                s4 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseeolWhiteSpace();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$currPos;
                            s7 = peg$parseIndent();
                            if (s7 !== peg$FAILED) {
                                s8 = [];
                                s9 = peg$currPos;
                                s10 = peg$parseSameIndent();
                                if (s10 !== peg$FAILED) {
                                    s11 = peg$parseInterfaceItem();
                                    if (s11 !== peg$FAILED) {
                                        s10 = [s10, s11];
                                        s9 = s10;
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s9;
                                    s9 = peg$FAILED;
                                }
                                while (s9 !== peg$FAILED) {
                                    s8.push(s9);
                                    s9 = peg$currPos;
                                    s10 = peg$parseSameIndent();
                                    if (s10 !== peg$FAILED) {
                                        s11 = peg$parseInterfaceItem();
                                        if (s11 !== peg$FAILED) {
                                            s10 = [s10, s11];
                                            s9 = s10;
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                }
                                if (s8 !== peg$FAILED) {
                                    s7 = [s7, s8];
                                    s6 = s7;
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseeolWhiteSpace();
                                if (s7 === peg$FAILED) {
                                    s7 = null;
                                }
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c41(s3, s4, s6);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c34);
            }
        }
        return s0;
    }
    function peg$parseInterfaceItem() {
        let s0;
        s0 = peg$parseInterfaceSlot();
        if (s0 === peg$FAILED) {
            s0 = peg$parseInterfaceArgument();
        }
        return s0;
    }
    function peg$parseInterfaceArgument() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parseParticleArgumentDirection();
        if (s2 !== peg$FAILED) {
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseParticleArgumentType();
            if (s3 !== peg$FAILED) {
                s4 = peg$parsewhiteSpace();
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parselowerIdent();
                if (s3 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 42) {
                        s3 = peg$c42;
                        peg$currPos++;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c43);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c44(s1, s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseInterfaceSlot() {
        let s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c45) {
            s2 = peg$c45;
            peg$currPos += 4;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c46);
            }
        }
        if (s2 !== peg$FAILED) {
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c47) {
                s2 = peg$c47;
                peg$currPos += 7;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c48);
                }
            }
            if (s2 === peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c49) {
                    s2 = peg$c49;
                    peg$currPos += 7;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c50);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parsewhiteSpace();
                if (s4 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 6) === peg$c51) {
                        s5 = peg$c51;
                        peg$currPos += 6;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c52);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    s5 = peg$parsewhiteSpace();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parselowerIdent();
                        if (s6 !== peg$FAILED) {
                            s5 = [s5, s6];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseeolWhiteSpace();
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c53(s1, s2, s3, s4);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseMeta() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c54) {
            s1 = peg$c54;
            peg$currPos += 4;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c55);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseeolWhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parseIndent();
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$currPos;
                    s7 = peg$parseSameIndent();
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parseMetaItem();
                        if (s8 !== peg$FAILED) {
                            s7 = [s7, s8];
                            s6 = s7;
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$currPos;
                        s7 = peg$parseSameIndent();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parseMetaItem();
                            if (s8 !== peg$FAILED) {
                                s7 = [s7, s8];
                                s6 = s7;
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c56(s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseMetaItem() {
        let s0;
        s0 = peg$parseMetaStorageKey();
        if (s0 === peg$FAILED) {
            s0 = peg$parseMetaName();
        }
        return s0;
    }
    function peg$parseMetaName() {
        let s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c57) {
            s1 = peg$c57;
            peg$currPos += 4;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c58);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                    s3 = peg$c59;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c60);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseid();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseeolWhiteSpace();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c61(s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseMetaStorageKey() {
        let s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 10) === peg$c62) {
            s1 = peg$c62;
            peg$currPos += 10;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c63);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                    s3 = peg$c59;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c60);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseid();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseeolWhiteSpace();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c64(s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticle() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 8) === peg$c65) {
            s1 = peg$c65;
            peg$currPos += 8;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c66);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseupperIdent();
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    s5 = peg$parsewhiteSpace();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseVerbList();
                        if (s6 !== peg$FAILED) {
                            s5 = [s5, s6];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$currPos;
                        s6 = peg$parsewhiteSpace();
                        if (s6 !== peg$FAILED) {
                            if (input.substr(peg$currPos, 2) === peg$c22) {
                                s7 = peg$c22;
                                peg$currPos += 2;
                            }
                            else {
                                s7 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c23);
                                }
                            }
                            if (s7 !== peg$FAILED) {
                                s8 = peg$parsewhiteSpace();
                                if (s8 !== peg$FAILED) {
                                    s9 = peg$parseid();
                                    if (s9 !== peg$FAILED) {
                                        s6 = [s6, s7, s8, s9];
                                        s5 = s6;
                                    }
                                    else {
                                        peg$currPos = s5;
                                        s5 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s5;
                                    s5 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseeolWhiteSpace();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$currPos;
                                s8 = peg$parseIndent();
                                if (s8 !== peg$FAILED) {
                                    s9 = [];
                                    s10 = peg$currPos;
                                    s11 = peg$parseSameIndent();
                                    if (s11 !== peg$FAILED) {
                                        s12 = peg$parseParticleItem();
                                        if (s12 !== peg$FAILED) {
                                            s11 = [s11, s12];
                                            s10 = s11;
                                        }
                                        else {
                                            peg$currPos = s10;
                                            s10 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s10;
                                        s10 = peg$FAILED;
                                    }
                                    while (s10 !== peg$FAILED) {
                                        s9.push(s10);
                                        s10 = peg$currPos;
                                        s11 = peg$parseSameIndent();
                                        if (s11 !== peg$FAILED) {
                                            s12 = peg$parseParticleItem();
                                            if (s12 !== peg$FAILED) {
                                                s11 = [s11, s12];
                                                s10 = s11;
                                            }
                                            else {
                                                peg$currPos = s10;
                                                s10 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s10;
                                            s10 = peg$FAILED;
                                        }
                                    }
                                    if (s9 !== peg$FAILED) {
                                        s8 = [s8, s9];
                                        s7 = s8;
                                    }
                                    else {
                                        peg$currPos = s7;
                                        s7 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                                if (s7 === peg$FAILED) {
                                    s7 = null;
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parseeolWhiteSpace();
                                    if (s8 === peg$FAILED) {
                                        s8 = null;
                                    }
                                    if (s8 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c67(s3, s4, s5, s7);
                                        s0 = s1;
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleItem() {
        let s0, s1;
        peg$silentFails++;
        s0 = peg$parseParticleModality();
        if (s0 === peg$FAILED) {
            s0 = peg$parseParticleSlot();
            if (s0 === peg$FAILED) {
                s0 = peg$parseDescription();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseParticleHandle();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseParticleClaimStatement();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseParticleCheckStatement();
                        }
                    }
                }
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c68);
            }
        }
        return s0;
    }
    function peg$parseParticleClaimStatement() {
        let s0;
        s0 = peg$parseParticleClaimIsTag();
        if (s0 === peg$FAILED) {
            s0 = peg$parseParticleClaimDerivesFrom();
        }
        return s0;
    }
    function peg$parseParticleClaimIsTag() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c69) {
            s1 = peg$c69;
            peg$currPos += 5;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c70);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parselowerIdent();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c71) {
                            s5 = peg$c71;
                            peg$currPos += 2;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c72);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsewhiteSpace();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parselowerIdent();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parseeolWhiteSpace();
                                    if (s8 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c73(s3, s7);
                                        s0 = s1;
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleClaimDerivesFrom() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c69) {
            s1 = peg$c69;
            peg$currPos += 5;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c70);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parselowerIdent();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 12) === peg$c74) {
                            s5 = peg$c74;
                            peg$currPos += 12;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c75);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parsewhiteSpace();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parselowerIdent();
                                if (s7 !== peg$FAILED) {
                                    s8 = [];
                                    s9 = peg$currPos;
                                    s10 = peg$parsewhiteSpace();
                                    if (s10 !== peg$FAILED) {
                                        if (input.substr(peg$currPos, 3) === peg$c76) {
                                            s11 = peg$c76;
                                            peg$currPos += 3;
                                        }
                                        else {
                                            s11 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c77);
                                            }
                                        }
                                        if (s11 !== peg$FAILED) {
                                            s12 = peg$parsewhiteSpace();
                                            if (s12 !== peg$FAILED) {
                                                s13 = peg$parselowerIdent();
                                                if (s13 !== peg$FAILED) {
                                                    s10 = [s10, s11, s12, s13];
                                                    s9 = s10;
                                                }
                                                else {
                                                    peg$currPos = s9;
                                                    s9 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                    while (s9 !== peg$FAILED) {
                                        s8.push(s9);
                                        s9 = peg$currPos;
                                        s10 = peg$parsewhiteSpace();
                                        if (s10 !== peg$FAILED) {
                                            if (input.substr(peg$currPos, 3) === peg$c76) {
                                                s11 = peg$c76;
                                                peg$currPos += 3;
                                            }
                                            else {
                                                s11 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c77);
                                                }
                                            }
                                            if (s11 !== peg$FAILED) {
                                                s12 = peg$parsewhiteSpace();
                                                if (s12 !== peg$FAILED) {
                                                    s13 = peg$parselowerIdent();
                                                    if (s13 !== peg$FAILED) {
                                                        s10 = [s10, s11, s12, s13];
                                                        s9 = s10;
                                                    }
                                                    else {
                                                        peg$currPos = s9;
                                                        s9 = peg$FAILED;
                                                    }
                                                }
                                                else {
                                                    peg$currPos = s9;
                                                    s9 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s9;
                                                s9 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                    }
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseeolWhiteSpace();
                                        if (s9 !== peg$FAILED) {
                                            peg$savedPos = s0;
                                            s1 = peg$c78(s3, s7, s8);
                                            s0 = s1;
                                        }
                                        else {
                                            peg$currPos = s0;
                                            s0 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleCheckStatement() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c79) {
            s1 = peg$c79;
            peg$currPos += 5;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c80);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parselowerIdent();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseParticleCheckCondition();
                        if (s5 !== peg$FAILED) {
                            s6 = [];
                            s7 = peg$currPos;
                            s8 = peg$parsewhiteSpace();
                            if (s8 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 2) === peg$c81) {
                                    s9 = peg$c81;
                                    peg$currPos += 2;
                                }
                                else {
                                    s9 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c82);
                                    }
                                }
                                if (s9 !== peg$FAILED) {
                                    s10 = peg$parsewhiteSpace();
                                    if (s10 !== peg$FAILED) {
                                        s11 = peg$parseParticleCheckCondition();
                                        if (s11 !== peg$FAILED) {
                                            s8 = [s8, s9, s10, s11];
                                            s7 = s8;
                                        }
                                        else {
                                            peg$currPos = s7;
                                            s7 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s7;
                                        s7 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                            while (s7 !== peg$FAILED) {
                                s6.push(s7);
                                s7 = peg$currPos;
                                s8 = peg$parsewhiteSpace();
                                if (s8 !== peg$FAILED) {
                                    if (input.substr(peg$currPos, 2) === peg$c81) {
                                        s9 = peg$c81;
                                        peg$currPos += 2;
                                    }
                                    else {
                                        s9 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c82);
                                        }
                                    }
                                    if (s9 !== peg$FAILED) {
                                        s10 = peg$parsewhiteSpace();
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parseParticleCheckCondition();
                                            if (s11 !== peg$FAILED) {
                                                s8 = [s8, s9, s10, s11];
                                                s7 = s8;
                                            }
                                            else {
                                                peg$currPos = s7;
                                                s7 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s7;
                                            s7 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s7;
                                        s7 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseeolWhiteSpace();
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c83(s3, s5, s6);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleCheckCondition() {
        let s0;
        s0 = peg$parseParticleCheckIsFromHandle();
        if (s0 === peg$FAILED) {
            s0 = peg$parseParticleCheckHasTag();
        }
        return s0;
    }
    function peg$parseParticleCheckHasTag() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c71) {
            s1 = peg$c71;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c72);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parselowerIdent();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c84(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleCheckIsFromHandle() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 14) === peg$c85) {
            s1 = peg$c85;
            peg$currPos += 14;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c86);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parselowerIdent();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c87(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleHandle() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parseParticleArgument();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseeolWhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parseIndent();
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$currPos;
                    s7 = peg$parseSameIndent();
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parseParticleHandle();
                        if (s8 !== peg$FAILED) {
                            s7 = [s7, s8];
                            s6 = s7;
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$currPos;
                        s7 = peg$parseSameIndent();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parseParticleHandle();
                            if (s8 !== peg$FAILED) {
                                s7 = [s7, s8];
                                s6 = s7;
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c88(s1, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleArgument() {
        let s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parseParticleArgumentDirection();
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 63) {
                s2 = peg$c89;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c90);
                }
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsewhiteSpace();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseParticleArgumentType();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsewhiteSpace();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseNameAndTagList();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c91(s1, s2, s4, s6);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleArgumentDirection() {
        let s0, s1;
        peg$silentFails++;
        if (input.substr(peg$currPos, 5) === peg$c93) {
            s0 = peg$c93;
            peg$currPos += 5;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c94);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c22) {
                s0 = peg$c22;
                peg$currPos += 2;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c23);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c95) {
                    s0 = peg$c95;
                    peg$currPos += 3;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c96);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 4) === peg$c97) {
                        s0 = peg$c97;
                        peg$currPos += 4;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c98);
                        }
                    }
                    if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 8) === peg$c99) {
                            s0 = peg$c99;
                            peg$currPos += 8;
                        }
                        else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c100);
                            }
                        }
                        if (s0 === peg$FAILED) {
                            s0 = peg$currPos;
                            if (input.substr(peg$currPos, 8) === peg$c101) {
                                s1 = peg$c101;
                                peg$currPos += 8;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c102);
                                }
                            }
                            if (s1 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c103();
                            }
                            s0 = s1;
                        }
                    }
                }
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c92);
            }
        }
        return s0;
    }
    function peg$parseParticleArgumentType() {
        let s0;
        s0 = peg$parseTypeVariable();
        if (s0 === peg$FAILED) {
            s0 = peg$parseCollectionType();
            if (s0 === peg$FAILED) {
                s0 = peg$parseBigCollectionType();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseReferenceType();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseSlotType();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseSchemaInline();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parseTypeName();
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseCollectionType() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c104;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c105);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseParticleArgumentType();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                    s3 = peg$c106;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c107);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c108(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseBigCollectionType() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 14) === peg$c109) {
            s1 = peg$c109;
            peg$currPos += 14;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c110);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseParticleArgumentType();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                    s3 = peg$c39;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c40);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c111(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseReferenceType() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 10) === peg$c112) {
            s1 = peg$c112;
            peg$currPos += 10;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c113);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseParticleArgumentType();
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                    s3 = peg$c39;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c40);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c114(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseTypeVariable() {
        let s0, s1, s2, s3, s4, s5, s6, s7;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 126) {
            s1 = peg$c116;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c117);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parselowerIdent();
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parsewhiteSpace();
                if (s4 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 4) === peg$c118) {
                        s5 = peg$c118;
                        peg$currPos += 4;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c119);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parsewhiteSpace();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$parseParticleArgumentType();
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c120(s2, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c115);
            }
        }
        return s0;
    }
    function peg$parseSlotType() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c121) {
            s1 = peg$c121;
            peg$currPos += 4;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c122);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            if (peg$c123.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c124);
                }
            }
            peg$silentFails--;
            if (s3 !== peg$FAILED) {
                peg$currPos = s2;
                s2 = undefined;
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parsewhiteSpace();
                if (s4 === peg$FAILED) {
                    s4 = null;
                }
                if (s4 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 123) {
                        s5 = peg$c125;
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c126);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$currPos;
                        s7 = peg$parseSlotField();
                        if (s7 !== peg$FAILED) {
                            s8 = [];
                            s9 = peg$currPos;
                            if (input.charCodeAt(peg$currPos) === 44) {
                                s10 = peg$c127;
                                peg$currPos++;
                            }
                            else {
                                s10 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c128);
                                }
                            }
                            if (s10 !== peg$FAILED) {
                                s11 = peg$parsewhiteSpace();
                                if (s11 !== peg$FAILED) {
                                    s12 = peg$parseSlotField();
                                    if (s12 !== peg$FAILED) {
                                        s10 = [s10, s11, s12];
                                        s9 = s10;
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s9;
                                    s9 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s9;
                                s9 = peg$FAILED;
                            }
                            while (s9 !== peg$FAILED) {
                                s8.push(s9);
                                s9 = peg$currPos;
                                if (input.charCodeAt(peg$currPos) === 44) {
                                    s10 = peg$c127;
                                    peg$currPos++;
                                }
                                else {
                                    s10 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c128);
                                    }
                                }
                                if (s10 !== peg$FAILED) {
                                    s11 = peg$parsewhiteSpace();
                                    if (s11 !== peg$FAILED) {
                                        s12 = peg$parseSlotField();
                                        if (s12 !== peg$FAILED) {
                                            s10 = [s10, s11, s12];
                                            s9 = s10;
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s9;
                                    s9 = peg$FAILED;
                                }
                            }
                            if (s8 !== peg$FAILED) {
                                s7 = [s7, s8];
                                s6 = s7;
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                        if (s6 === peg$FAILED) {
                            s6 = null;
                        }
                        if (s6 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 125) {
                                s7 = peg$c129;
                                peg$currPos++;
                            }
                            else {
                                s7 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c130);
                                }
                            }
                            if (s7 !== peg$FAILED) {
                                s4 = [s4, s5, s6, s7];
                                s3 = s4;
                            }
                            else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c131(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSlotField() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsefieldName();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                    s3 = peg$c59;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c60);
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parselowerIdent();
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c132(s1, s5);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseTypeName() {
        let s0, s1;
        s0 = peg$currPos;
        s1 = peg$parseupperIdent();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c133(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseTypeVariableList() {
        let s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parseTypeVariable();
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
                s4 = peg$c127;
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c128);
                }
            }
            if (s4 !== peg$FAILED) {
                s5 = peg$parsewhiteSpace();
                if (s5 !== peg$FAILED) {
                    s6 = peg$parseTypeVariable();
                    if (s6 !== peg$FAILED) {
                        s4 = [s4, s5, s6];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 44) {
                    s4 = peg$c127;
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c128);
                    }
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parsewhiteSpace();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseTypeVariable();
                        if (s6 !== peg$FAILED) {
                            s4 = [s4, s5, s6];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c134(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleModality() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 8) === peg$c135) {
            s1 = peg$c135;
            peg$currPos += 8;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c136);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseModality();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c137(s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseModality() {
        let s0;
        if (input.substr(peg$currPos, 9) === peg$c138) {
            s0 = peg$c138;
            peg$currPos += 9;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c139);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c140) {
                s0 = peg$c140;
                peg$currPos += 3;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c141);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c142) {
                    s0 = peg$c142;
                    peg$currPos += 2;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c143);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 5) === peg$c144) {
                        s0 = peg$c144;
                        peg$currPos += 5;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c145);
                        }
                    }
                    if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 14) === peg$c146) {
                            s0 = peg$c146;
                            peg$currPos += 14;
                        }
                        else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c147);
                            }
                        }
                        if (s0 === peg$FAILED) {
                            if (input.substr(peg$currPos, 8) === peg$c148) {
                                s0 = peg$c148;
                                peg$currPos += 8;
                            }
                            else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c149);
                                }
                            }
                            if (s0 === peg$FAILED) {
                                if (input.substr(peg$currPos, 7) === peg$c150) {
                                    s0 = peg$c150;
                                    peg$currPos += 7;
                                }
                                else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c151);
                                    }
                                }
                                if (s0 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 10) === peg$c152) {
                                        s0 = peg$c152;
                                        peg$currPos += 10;
                                    }
                                    else {
                                        s0 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c153);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseParticleSlot() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c45) {
            s2 = peg$c45;
            peg$currPos += 4;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c46);
            }
        }
        if (s2 !== peg$FAILED) {
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c47) {
                s2 = peg$c47;
                peg$currPos += 7;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c48);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsewhiteSpace();
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    if (input.substr(peg$currPos, 6) === peg$c51) {
                        s5 = peg$c51;
                        peg$currPos += 6;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c52);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parsewhiteSpace();
                        if (s6 !== peg$FAILED) {
                            s5 = [s5, s6];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parselowerIdent();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$currPos;
                            s7 = peg$parsewhiteSpace();
                            if (s7 !== peg$FAILED) {
                                s8 = peg$parseTagList();
                                if (s8 !== peg$FAILED) {
                                    s7 = [s7, s8];
                                    s6 = s7;
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseeolWhiteSpace();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$currPos;
                                    s9 = peg$parseIndent();
                                    if (s9 !== peg$FAILED) {
                                        s10 = [];
                                        s11 = peg$currPos;
                                        s12 = peg$parseSameIndent();
                                        if (s12 !== peg$FAILED) {
                                            s13 = peg$parseParticleSlotItem();
                                            if (s13 !== peg$FAILED) {
                                                s12 = [s12, s13];
                                                s11 = s12;
                                            }
                                            else {
                                                peg$currPos = s11;
                                                s11 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s11;
                                            s11 = peg$FAILED;
                                        }
                                        while (s11 !== peg$FAILED) {
                                            s10.push(s11);
                                            s11 = peg$currPos;
                                            s12 = peg$parseSameIndent();
                                            if (s12 !== peg$FAILED) {
                                                s13 = peg$parseParticleSlotItem();
                                                if (s13 !== peg$FAILED) {
                                                    s12 = [s12, s13];
                                                    s11 = s12;
                                                }
                                                else {
                                                    peg$currPos = s11;
                                                    s11 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s11;
                                                s11 = peg$FAILED;
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s9 = [s9, s10];
                                            s8 = s9;
                                        }
                                        else {
                                            peg$currPos = s8;
                                            s8 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s8;
                                        s8 = peg$FAILED;
                                    }
                                    if (s8 === peg$FAILED) {
                                        s8 = null;
                                    }
                                    if (s8 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c154(s1, s4, s5, s6, s8);
                                        s0 = s1;
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleSlotItem() {
        let s0;
        s0 = peg$parseSlotFormFactor();
        if (s0 === peg$FAILED) {
            s0 = peg$parseParticleProvidedSlot();
        }
        return s0;
    }
    function peg$parseSlotFormFactor() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 10) === peg$c155) {
            s1 = peg$c155;
            peg$currPos += 10;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c156);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                if (input.substr(peg$currPos, 10) === peg$c157) {
                    s3 = peg$c157;
                    peg$currPos += 10;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c158);
                    }
                }
                if (s3 === peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c159) {
                        s3 = peg$c159;
                        peg$currPos += 3;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c160);
                        }
                    }
                    if (s3 === peg$FAILED) {
                        if (input.substr(peg$currPos, 6) === peg$c161) {
                            s3 = peg$c161;
                            peg$currPos += 6;
                        }
                        else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c162);
                            }
                        }
                        if (s3 === peg$FAILED) {
                            if (input.substr(peg$currPos, 5) === peg$c163) {
                                s3 = peg$c163;
                                peg$currPos += 5;
                            }
                            else {
                                s3 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c164);
                                }
                            }
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c165(s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleProvidedSlot() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c45) {
            s2 = peg$c45;
            peg$currPos += 4;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c46);
            }
        }
        if (s2 !== peg$FAILED) {
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c49) {
                s2 = peg$c49;
                peg$currPos += 7;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c50);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsewhiteSpace();
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    if (input.substr(peg$currPos, 6) === peg$c51) {
                        s5 = peg$c51;
                        peg$currPos += 6;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c52);
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parsewhiteSpace();
                        if (s6 !== peg$FAILED) {
                            s5 = [s5, s6];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parselowerIdent();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$currPos;
                            s7 = peg$parsewhiteSpace();
                            if (s7 !== peg$FAILED) {
                                s8 = peg$parseTagList();
                                if (s8 !== peg$FAILED) {
                                    s7 = [s7, s8];
                                    s6 = s7;
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseeolWhiteSpace();
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$currPos;
                                    s9 = peg$parseIndent();
                                    if (s9 !== peg$FAILED) {
                                        s10 = [];
                                        s11 = peg$currPos;
                                        s12 = peg$parseSameIndent();
                                        if (s12 !== peg$FAILED) {
                                            s13 = peg$parseParticleProvidedSlotItem();
                                            if (s13 !== peg$FAILED) {
                                                s12 = [s12, s13];
                                                s11 = s12;
                                            }
                                            else {
                                                peg$currPos = s11;
                                                s11 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s11;
                                            s11 = peg$FAILED;
                                        }
                                        while (s11 !== peg$FAILED) {
                                            s10.push(s11);
                                            s11 = peg$currPos;
                                            s12 = peg$parseSameIndent();
                                            if (s12 !== peg$FAILED) {
                                                s13 = peg$parseParticleProvidedSlotItem();
                                                if (s13 !== peg$FAILED) {
                                                    s12 = [s12, s13];
                                                    s11 = s12;
                                                }
                                                else {
                                                    peg$currPos = s11;
                                                    s11 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s11;
                                                s11 = peg$FAILED;
                                            }
                                        }
                                        if (s10 !== peg$FAILED) {
                                            s9 = [s9, s10];
                                            s8 = s9;
                                        }
                                        else {
                                            peg$currPos = s8;
                                            s8 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s8;
                                        s8 = peg$FAILED;
                                    }
                                    if (s8 === peg$FAILED) {
                                        s8 = null;
                                    }
                                    if (s8 !== peg$FAILED) {
                                        peg$savedPos = s0;
                                        s1 = peg$c166(s1, s4, s5, s6, s8);
                                        s0 = s1;
                                    }
                                    else {
                                        peg$currPos = s0;
                                        s0 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleProvidedSlotItem() {
        let s0;
        s0 = peg$parseSlotFormFactor();
        if (s0 === peg$FAILED) {
            s0 = peg$parseParticleProvidedSlotHandle();
        }
        return s0;
    }
    function peg$parseParticleProvidedSlotHandle() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c167) {
            s1 = peg$c167;
            peg$currPos += 6;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c168);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parselowerIdent();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c169(s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseDescription() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 11) === peg$c29) {
            s1 = peg$c29;
            peg$currPos += 11;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c30);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsebackquotedString();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$currPos;
                        s6 = peg$parseIndent();
                        if (s6 !== peg$FAILED) {
                            s7 = [];
                            s8 = peg$currPos;
                            s9 = peg$parseSameIndent();
                            if (s9 !== peg$FAILED) {
                                s10 = peg$parseParticleHandleDescription();
                                if (s10 !== peg$FAILED) {
                                    s9 = [s9, s10];
                                    s8 = s9;
                                }
                                else {
                                    peg$currPos = s8;
                                    s8 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s8;
                                s8 = peg$FAILED;
                            }
                            if (s8 !== peg$FAILED) {
                                while (s8 !== peg$FAILED) {
                                    s7.push(s8);
                                    s8 = peg$currPos;
                                    s9 = peg$parseSameIndent();
                                    if (s9 !== peg$FAILED) {
                                        s10 = peg$parseParticleHandleDescription();
                                        if (s10 !== peg$FAILED) {
                                            s9 = [s9, s10];
                                            s8 = s9;
                                        }
                                        else {
                                            peg$currPos = s8;
                                            s8 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s8;
                                        s8 = peg$FAILED;
                                    }
                                }
                            }
                            else {
                                s7 = peg$FAILED;
                            }
                            if (s7 !== peg$FAILED) {
                                s6 = [s6, s7];
                                s5 = s6;
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c170(s3, s5);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleHandleDescription() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parselowerIdent();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsebackquotedString();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c171(s1, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRecipe() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c172) {
            s1 = peg$c172;
            peg$currPos += 6;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c173);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s4 = peg$parseupperIdent();
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parsewhiteSpace();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseVerbList();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$currPos;
                        s6 = peg$parseIndent();
                        if (s6 !== peg$FAILED) {
                            s7 = [];
                            s8 = peg$currPos;
                            s9 = peg$parseSameIndent();
                            if (s9 !== peg$FAILED) {
                                s10 = peg$parseRecipeItem();
                                if (s10 !== peg$FAILED) {
                                    s9 = [s9, s10];
                                    s8 = s9;
                                }
                                else {
                                    peg$currPos = s8;
                                    s8 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s8;
                                s8 = peg$FAILED;
                            }
                            while (s8 !== peg$FAILED) {
                                s7.push(s8);
                                s8 = peg$currPos;
                                s9 = peg$parseSameIndent();
                                if (s9 !== peg$FAILED) {
                                    s10 = peg$parseRecipeItem();
                                    if (s10 !== peg$FAILED) {
                                        s9 = [s9, s10];
                                        s8 = s9;
                                    }
                                    else {
                                        peg$currPos = s8;
                                        s8 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s8;
                                    s8 = peg$FAILED;
                                }
                            }
                            if (s7 !== peg$FAILED) {
                                s6 = [s6, s7];
                                s5 = s6;
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c174(s2, s3, s5);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRecipeItem() {
        let s0;
        s0 = peg$parseRecipeParticle();
        if (s0 === peg$FAILED) {
            s0 = peg$parseRecipeHandle();
            if (s0 === peg$FAILED) {
                s0 = peg$parseRequireHandleSection();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseRecipeRequire();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseRecipeSlot();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseRecipeSearch();
                            if (s0 === peg$FAILED) {
                                s0 = peg$parseRecipeConnection();
                                if (s0 === peg$FAILED) {
                                    s0 = peg$parseDescription();
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseLocalName() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c175) {
            s1 = peg$c175;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c176);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parselowerIdent();
                if (s3 === peg$FAILED) {
                    s3 = peg$currPos;
                    s4 = [];
                    if (peg$c177.test(input.charAt(peg$currPos))) {
                        s5 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c178);
                        }
                    }
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        if (peg$c177.test(input.charAt(peg$currPos))) {
                            s5 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c178);
                            }
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s3;
                        s4 = peg$c179();
                    }
                    s3 = s4;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c180(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseTopLevelAlias() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c175) {
            s1 = peg$c175;
            peg$currPos += 2;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c176);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseupperIdent();
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c180(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRecipeParticle() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        s1 = peg$parseParticleRef();
        if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 42) {
                s1 = peg$c42;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c43);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s4 = peg$parseLocalName();
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseeolWhiteSpace();
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    s5 = peg$parseIndent();
                    if (s5 !== peg$FAILED) {
                        s6 = [];
                        s7 = peg$currPos;
                        s8 = peg$parseSameIndent();
                        if (s8 !== peg$FAILED) {
                            s9 = peg$parseRecipeParticleItem();
                            if (s9 !== peg$FAILED) {
                                s8 = [s8, s9];
                                s7 = s8;
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s7;
                            s7 = peg$FAILED;
                        }
                        while (s7 !== peg$FAILED) {
                            s6.push(s7);
                            s7 = peg$currPos;
                            s8 = peg$parseSameIndent();
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parseRecipeParticleItem();
                                if (s9 !== peg$FAILED) {
                                    s8 = [s8, s9];
                                    s7 = s8;
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                        }
                        if (s6 !== peg$FAILED) {
                            s5 = [s5, s6];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c181(s1, s2, s4);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRecipeParticleItem() {
        let s0;
        s0 = peg$parseRecipeParticleSlotConnection();
        if (s0 === peg$FAILED) {
            s0 = peg$parseRecipeParticleConnection();
        }
        return s0;
    }
    function peg$parseRecipeParticleConnection() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        s1 = peg$parselowerIdent();
        if (s1 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 42) {
                s1 = peg$c42;
                peg$currPos++;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c43);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseDirection();
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    s5 = peg$parsewhiteSpace();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseParticleConnectionTargetComponents();
                        if (s6 !== peg$FAILED) {
                            s5 = [s5, s6];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseeolWhiteSpace();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$currPos;
                            s7 = peg$parseIndent();
                            if (s7 !== peg$FAILED) {
                                s8 = [];
                                s9 = peg$currPos;
                                s10 = peg$parseSameIndent();
                                if (s10 !== peg$FAILED) {
                                    s11 = peg$parseRecipeParticleConnection();
                                    if (s11 !== peg$FAILED) {
                                        s10 = [s10, s11];
                                        s9 = s10;
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s9;
                                    s9 = peg$FAILED;
                                }
                                while (s9 !== peg$FAILED) {
                                    s8.push(s9);
                                    s9 = peg$currPos;
                                    s10 = peg$parseSameIndent();
                                    if (s10 !== peg$FAILED) {
                                        s11 = peg$parseRecipeParticleConnection();
                                        if (s11 !== peg$FAILED) {
                                            s10 = [s10, s11];
                                            s9 = s10;
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                }
                                if (s8 !== peg$FAILED) {
                                    s7 = [s7, s8];
                                    s6 = s7;
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c182(s1, s3, s4, s6);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleConnectionTargetComponents() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parseupperIdent();
        if (s1 === peg$FAILED) {
            s1 = peg$parselowerIdent();
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseTagList();
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c183(s1, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRecipeParticleSlotConnection() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        s1 = peg$parseSlotDirection();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseRecipeSlotConnectionRef();
                if (s3 !== peg$FAILED) {
                    s4 = peg$currPos;
                    s5 = peg$parsewhiteSpace();
                    if (s5 !== peg$FAILED) {
                        s6 = peg$parseLocalName();
                        if (s6 !== peg$FAILED) {
                            s5 = [s5, s6];
                            s4 = s5;
                        }
                        else {
                            peg$currPos = s4;
                            s4 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                    }
                    if (s4 === peg$FAILED) {
                        s4 = null;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseeolWhiteSpace();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$currPos;
                            s7 = peg$parseIndent();
                            if (s7 !== peg$FAILED) {
                                s8 = [];
                                s9 = peg$currPos;
                                s10 = peg$parseSameIndent();
                                if (s10 !== peg$FAILED) {
                                    s11 = peg$parseRecipeParticleSlotConnection();
                                    if (s11 !== peg$FAILED) {
                                        s10 = [s10, s11];
                                        s9 = s10;
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s9;
                                    s9 = peg$FAILED;
                                }
                                while (s9 !== peg$FAILED) {
                                    s8.push(s9);
                                    s9 = peg$currPos;
                                    s10 = peg$parseSameIndent();
                                    if (s10 !== peg$FAILED) {
                                        s11 = peg$parseRecipeParticleSlotConnection();
                                        if (s11 !== peg$FAILED) {
                                            s10 = [s10, s11];
                                            s9 = s10;
                                        }
                                        else {
                                            peg$currPos = s9;
                                            s9 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s9;
                                        s9 = peg$FAILED;
                                    }
                                }
                                if (s8 !== peg$FAILED) {
                                    s7 = [s7, s8];
                                    s6 = s7;
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                            if (s6 === peg$FAILED) {
                                s6 = null;
                            }
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c184(s1, s3, s4, s6);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRecipeSlotConnectionRef() {
        let s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parselowerIdent();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseSpaceTagList();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c185(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSlotDirection() {
        let s0;
        if (input.substr(peg$currPos, 7) === peg$c49) {
            s0 = peg$c49;
            peg$currPos += 7;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c50);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c47) {
                s0 = peg$c47;
                peg$currPos += 7;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c48);
                }
            }
        }
        return s0;
    }
    function peg$parseRecipeConnection() {
        let s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$parseConnectionTarget();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseDirection();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseConnectionTarget();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseeolWhiteSpace();
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c186(s1, s3, s5);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRecipeSearch() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c187) {
            s1 = peg$c187;
            peg$currPos += 6;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c188);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsebackquotedString();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$currPos;
                        s6 = peg$parseIndent();
                        if (s6 !== peg$FAILED) {
                            s7 = peg$currPos;
                            s8 = peg$parseSameIndent();
                            if (s8 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 6) === peg$c189) {
                                    s9 = peg$c189;
                                    peg$currPos += 6;
                                }
                                else {
                                    s9 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c190);
                                    }
                                }
                                if (s9 !== peg$FAILED) {
                                    s10 = [];
                                    s11 = peg$currPos;
                                    s12 = peg$parsewhiteSpace();
                                    if (s12 !== peg$FAILED) {
                                        s13 = peg$parsebackquotedString();
                                        if (s13 !== peg$FAILED) {
                                            s12 = [s12, s13];
                                            s11 = s12;
                                        }
                                        else {
                                            peg$currPos = s11;
                                            s11 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s11;
                                        s11 = peg$FAILED;
                                    }
                                    if (s11 !== peg$FAILED) {
                                        while (s11 !== peg$FAILED) {
                                            s10.push(s11);
                                            s11 = peg$currPos;
                                            s12 = peg$parsewhiteSpace();
                                            if (s12 !== peg$FAILED) {
                                                s13 = peg$parsebackquotedString();
                                                if (s13 !== peg$FAILED) {
                                                    s12 = [s12, s13];
                                                    s11 = s12;
                                                }
                                                else {
                                                    peg$currPos = s11;
                                                    s11 = peg$FAILED;
                                                }
                                            }
                                            else {
                                                peg$currPos = s11;
                                                s11 = peg$FAILED;
                                            }
                                        }
                                    }
                                    else {
                                        s10 = peg$FAILED;
                                    }
                                    if (s10 !== peg$FAILED) {
                                        s11 = peg$parseeolWhiteSpace();
                                        if (s11 !== peg$FAILED) {
                                            s8 = [s8, s9, s10, s11];
                                            s7 = s8;
                                        }
                                        else {
                                            peg$currPos = s7;
                                            s7 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s7;
                                        s7 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s7;
                                s7 = peg$FAILED;
                            }
                            if (s7 !== peg$FAILED) {
                                s6 = [s6, s7];
                                s5 = s6;
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c191(s3, s5);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseDirection() {
        let s0;
        if (input.substr(peg$currPos, 2) === peg$c192) {
            s0 = peg$c192;
            peg$currPos += 2;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c193);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c194) {
                s0 = peg$c194;
                peg$currPos += 2;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c195);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 61) {
                    s0 = peg$c196;
                    peg$currPos++;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c197);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 7) === peg$c47) {
                        s0 = peg$c47;
                        peg$currPos += 7;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c48);
                        }
                    }
                    if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 7) === peg$c49) {
                            s0 = peg$c49;
                            peg$currPos += 7;
                        }
                        else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c50);
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseConnectionTarget() {
        let s0;
        s0 = peg$parseVerbConnectionTarget();
        if (s0 === peg$FAILED) {
            s0 = peg$parseTagConnectionTarget();
            if (s0 === peg$FAILED) {
                s0 = peg$parseParticleConnectionTarget();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseNameConnectionTarget();
                }
            }
        }
        return s0;
    }
    function peg$parseVerbConnectionTarget() {
        let s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parseVerbList();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseConnectionTargetHandleComponents();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c198(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseTagConnectionTarget() {
        let s0, s1;
        s0 = peg$currPos;
        s1 = peg$parseTagList();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c199(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseNameConnectionTarget() {
        let s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parselowerIdent();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseConnectionTargetHandleComponents();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c200(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseParticleConnectionTarget() {
        let s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parseupperIdent();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseConnectionTargetHandleComponents();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c201(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseConnectionTargetHandleComponents() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
            s1 = peg$c202;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c203);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parselowerIdent();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parsewhiteSpace();
                if (s4 === peg$FAILED) {
                    s4 = null;
                }
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseTagList();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c204(s2, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRecipeHandleFate() {
        let s0;
        if (input.charCodeAt(peg$currPos) === 63) {
            s0 = peg$c89;
            peg$currPos++;
        }
        else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c90);
            }
        }
        if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c205) {
                s0 = peg$c205;
                peg$currPos += 3;
            }
            else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c206);
                }
            }
            if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c207) {
                    s0 = peg$c207;
                    peg$currPos += 3;
                }
                else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c208);
                    }
                }
                if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 6) === peg$c209) {
                        s0 = peg$c209;
                        peg$currPos += 6;
                    }
                    else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c210);
                        }
                    }
                    if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 4) === peg$c211) {
                            s0 = peg$c211;
                            peg$currPos += 4;
                        }
                        else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c212);
                            }
                        }
                        if (s0 === peg$FAILED) {
                            if (input.substr(peg$currPos, 5) === peg$c213) {
                                s0 = peg$c213;
                                peg$currPos += 5;
                            }
                            else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c214);
                                }
                            }
                        }
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseRecipeHandle() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parseRecipeHandleFate();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s4 = peg$parseHandleRef();
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parsewhiteSpace();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseLocalName();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c215(s1, s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRecipeRequire() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c216) {
            s1 = peg$c216;
            peg$currPos += 7;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c217);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parseeolWhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parseIndent();
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$currPos;
                    s7 = peg$parseSameIndent();
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parseRecipeParticle();
                        if (s8 === peg$FAILED) {
                            s8 = peg$parseRequireHandleSection();
                            if (s8 === peg$FAILED) {
                                s8 = peg$parseRecipeSlot();
                            }
                        }
                        if (s8 !== peg$FAILED) {
                            s7 = [s7, s8];
                            s6 = s7;
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$currPos;
                        s7 = peg$parseSameIndent();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parseRecipeParticle();
                            if (s8 === peg$FAILED) {
                                s8 = peg$parseRequireHandleSection();
                                if (s8 === peg$FAILED) {
                                    s8 = peg$parseRecipeSlot();
                                }
                            }
                            if (s8 !== peg$FAILED) {
                                s7 = [s7, s8];
                                s6 = s7;
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c218(s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseRequireHandleSection() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c167) {
            s1 = peg$c167;
            peg$currPos += 6;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c168);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s4 = peg$parseLocalName();
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parsewhiteSpace();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseHandleRef();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c219(s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseTag() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 35) {
            s1 = peg$c220;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c221);
            }
        }
        if (s1 !== peg$FAILED) {
            if (peg$c222.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c223);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                if (peg$c224.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c225);
                    }
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    if (peg$c224.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c225);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c226();
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseTagList() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parseTag();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s4 = peg$parseTagList();
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c227(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseVerb() {
        let s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 38) {
            s1 = peg$c229;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c230);
            }
        }
        if (s1 !== peg$FAILED) {
            if (peg$c222.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c223);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                if (peg$c224.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c225);
                    }
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    if (peg$c224.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c225);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c226();
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c228);
            }
        }
        return s0;
    }
    function peg$parseVerbList() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parseVerb();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s4 = peg$parseVerbList();
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c227(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSpaceTagList() {
        let s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parsewhiteSpace();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseTagList();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c231(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseNameAndTagList() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parselowerIdent();
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s4 = peg$parseTagList();
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c232(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsewhiteSpace();
            if (s1 !== peg$FAILED) {
                s2 = peg$parselowerIdent();
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c233(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parsewhiteSpace();
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseTagList();
                    if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c234(s2);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
        }
        return s0;
    }
    function peg$parseParticleRef() {
        let s0, s1;
        s0 = peg$currPos;
        s1 = peg$parseupperIdent();
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c235(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseVerb();
            if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c236(s1);
            }
            s0 = s1;
        }
        return s0;
    }
    function peg$parseHandleRef() {
        let s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parseid();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseSpaceTagList();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c237(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseupperIdent();
            if (s1 !== peg$FAILED) {
                s2 = peg$parseSpaceTagList();
                if (s2 === peg$FAILED) {
                    s2 = null;
                }
                if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c238(s1, s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parseTagList();
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c239(s1);
                }
                s0 = s1;
            }
        }
        return s0;
    }
    function peg$parseRecipeSlot() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c240) {
            s1 = peg$c240;
            peg$currPos += 4;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c241);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s4 = peg$parseHandleRef();
                if (s4 !== peg$FAILED) {
                    s3 = [s3, s4];
                    s2 = s3;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parsewhiteSpace();
                if (s4 !== peg$FAILED) {
                    s5 = peg$parseLocalName();
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c242(s2, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaInline() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parseupperIdent();
        if (s3 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 42) {
                s3 = peg$c42;
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c43);
                }
            }
        }
        if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$currPos;
                s3 = peg$parseupperIdent();
                if (s3 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 42) {
                        s3 = peg$c42;
                        peg$currPos++;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c43);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 !== peg$FAILED) {
                        s3 = [s3, s4];
                        s2 = s3;
                    }
                    else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
                s2 = peg$c125;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c126);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parseSchemaInlineField();
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 44) {
                        s7 = peg$c127;
                        peg$currPos++;
                    }
                    else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c128);
                        }
                    }
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parsewhiteSpace();
                        if (s8 !== peg$FAILED) {
                            s9 = peg$parseSchemaInlineField();
                            if (s9 !== peg$FAILED) {
                                s7 = [s7, s8, s9];
                                s6 = s7;
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s7 = peg$c127;
                            peg$currPos++;
                        }
                        else {
                            s7 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c128);
                            }
                        }
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parsewhiteSpace();
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parseSchemaInlineField();
                                if (s9 !== peg$FAILED) {
                                    s7 = [s7, s8, s9];
                                    s6 = s7;
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                        s4 = peg$c129;
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c130);
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c243(s1, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaInlineField() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parseSchemaType();
        if (s2 !== peg$FAILED) {
            s3 = peg$parsewhiteSpace();
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsefieldName();
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c244(s1, s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaSpec() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c245) {
            s1 = peg$c245;
            peg$currPos += 6;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c246);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 42) {
                    s5 = peg$c42;
                    peg$currPos++;
                }
                else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c43);
                    }
                }
                if (s5 === peg$FAILED) {
                    s5 = peg$parseupperIdent();
                }
                if (s5 !== peg$FAILED) {
                    s4 = [s4, s5];
                    s3 = s4;
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s3;
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$currPos;
                    s4 = peg$parsewhiteSpace();
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 42) {
                            s5 = peg$c42;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c43);
                            }
                        }
                        if (s5 === peg$FAILED) {
                            s5 = peg$parseupperIdent();
                        }
                        if (s5 !== peg$FAILED) {
                            s4 = [s4, s5];
                            s3 = s4;
                        }
                        else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseSchemaExtends();
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c247(s2, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaAlias() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c248) {
            s1 = peg$c248;
            peg$currPos += 5;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c249);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parseSchemaSpec();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parsewhiteSpace();
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parseTopLevelAlias();
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parseeolWhiteSpace();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$currPos;
                                s8 = peg$parseIndent();
                                if (s8 !== peg$FAILED) {
                                    s9 = [];
                                    s10 = peg$currPos;
                                    s11 = peg$parseSameIndent();
                                    if (s11 !== peg$FAILED) {
                                        s12 = peg$parseSchemaItem();
                                        if (s12 !== peg$FAILED) {
                                            s11 = [s11, s12];
                                            s10 = s11;
                                        }
                                        else {
                                            peg$currPos = s10;
                                            s10 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s10;
                                        s10 = peg$FAILED;
                                    }
                                    while (s10 !== peg$FAILED) {
                                        s9.push(s10);
                                        s10 = peg$currPos;
                                        s11 = peg$parseSameIndent();
                                        if (s11 !== peg$FAILED) {
                                            s12 = peg$parseSchemaItem();
                                            if (s12 !== peg$FAILED) {
                                                s11 = [s11, s12];
                                                s10 = s11;
                                            }
                                            else {
                                                peg$currPos = s10;
                                                s10 = peg$FAILED;
                                            }
                                        }
                                        else {
                                            peg$currPos = s10;
                                            s10 = peg$FAILED;
                                        }
                                    }
                                    if (s9 !== peg$FAILED) {
                                        s8 = [s8, s9];
                                        s7 = s8;
                                    }
                                    else {
                                        peg$currPos = s7;
                                        s7 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s7;
                                    s7 = peg$FAILED;
                                }
                                if (s7 === peg$FAILED) {
                                    s7 = null;
                                }
                                if (s7 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c250(s3, s5, s7);
                                    s0 = s1;
                                }
                                else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchema() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parseSchemaSpec();
        if (s1 !== peg$FAILED) {
            s2 = peg$parseeolWhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                s4 = peg$parseIndent();
                if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$currPos;
                    s7 = peg$parseSameIndent();
                    if (s7 !== peg$FAILED) {
                        s8 = peg$parseSchemaItem();
                        if (s8 !== peg$FAILED) {
                            s7 = [s7, s8];
                            s6 = s7;
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                    }
                    while (s6 !== peg$FAILED) {
                        s5.push(s6);
                        s6 = peg$currPos;
                        s7 = peg$parseSameIndent();
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parseSchemaItem();
                            if (s8 !== peg$FAILED) {
                                s7 = [s7, s8];
                                s6 = s7;
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                    }
                    if (s5 !== peg$FAILED) {
                        s4 = [s4, s5];
                        s3 = s4;
                    }
                    else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c251(s1, s3);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaExtends() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        s1 = peg$parsewhiteSpace();
        if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c252) {
                s2 = peg$c252;
                peg$currPos += 7;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c253);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parsewhiteSpace();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseupperIdent();
                    if (s4 !== peg$FAILED) {
                        s5 = [];
                        s6 = peg$currPos;
                        s7 = peg$parsewhiteSpace();
                        if (s7 === peg$FAILED) {
                            s7 = null;
                        }
                        if (s7 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 44) {
                                s8 = peg$c127;
                                peg$currPos++;
                            }
                            else {
                                s8 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c128);
                                }
                            }
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parsewhiteSpace();
                                if (s9 !== peg$FAILED) {
                                    s10 = peg$parseupperIdent();
                                    if (s10 !== peg$FAILED) {
                                        s7 = [s7, s8, s9, s10];
                                        s6 = s7;
                                    }
                                    else {
                                        peg$currPos = s6;
                                        s6 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                        }
                        while (s6 !== peg$FAILED) {
                            s5.push(s6);
                            s6 = peg$currPos;
                            s7 = peg$parsewhiteSpace();
                            if (s7 === peg$FAILED) {
                                s7 = null;
                            }
                            if (s7 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 44) {
                                    s8 = peg$c127;
                                    peg$currPos++;
                                }
                                else {
                                    s8 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c128);
                                    }
                                }
                                if (s8 !== peg$FAILED) {
                                    s9 = peg$parsewhiteSpace();
                                    if (s9 !== peg$FAILED) {
                                        s10 = peg$parseupperIdent();
                                        if (s10 !== peg$FAILED) {
                                            s7 = [s7, s8, s9, s10];
                                            s6 = s7;
                                        }
                                        else {
                                            peg$currPos = s6;
                                            s6 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s6;
                                        s6 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s6;
                                    s6 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c254(s4, s5);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaItem() {
        let s0;
        s0 = peg$parseSchemaField();
        if (s0 === peg$FAILED) {
            s0 = peg$parseDescription();
        }
        return s0;
    }
    function peg$parseSchemaField() {
        let s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parseSchemaType();
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
                s3 = peg$parsefieldName();
                if (s3 !== peg$FAILED) {
                    s4 = peg$parseeolWhiteSpace();
                    if (s4 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c255(s1, s3);
                        s0 = s1;
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaType() {
        let s0;
        s0 = peg$parseSchemaReferenceType();
        if (s0 === peg$FAILED) {
            s0 = peg$parseSchemaCollectionType();
            if (s0 === peg$FAILED) {
                s0 = peg$parseSchemaPrimitiveType();
                if (s0 === peg$FAILED) {
                    s0 = peg$parseSchemaUnionType();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseSchemaTupleType();
                    }
                }
            }
        }
        return s0;
    }
    function peg$parseSchemaCollectionType() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c104;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c105);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsewhiteSpace();
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parsewhiteSpace();
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseSchemaReferenceType();
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$parsewhiteSpace();
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$parsewhiteSpace();
                    }
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 93) {
                            s5 = peg$c106;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c107);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c256(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaReferenceType() {
        let s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 10) === peg$c112) {
            s1 = peg$c112;
            peg$currPos += 10;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c113);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsewhiteSpace();
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parsewhiteSpace();
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseSchemaInline();
                if (s3 === peg$FAILED) {
                    s3 = peg$parseTypeName();
                }
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$parsewhiteSpace();
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$parsewhiteSpace();
                    }
                    if (s4 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 62) {
                            s5 = peg$c39;
                            peg$currPos++;
                        }
                        else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c40);
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c257(s3);
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaPrimitiveType() {
        let s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c258) {
            s1 = peg$c258;
            peg$currPos += 4;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c259);
            }
        }
        if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c260) {
                s1 = peg$c260;
                peg$currPos += 3;
            }
            else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c261);
                }
            }
            if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c262) {
                    s1 = peg$c262;
                    peg$currPos += 6;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c263);
                    }
                }
                if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 7) === peg$c264) {
                        s1 = peg$c264;
                        peg$currPos += 7;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c265);
                        }
                    }
                    if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 5) === peg$c266) {
                            s1 = peg$c266;
                            peg$currPos += 5;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c267);
                            }
                        }
                        if (s1 === peg$FAILED) {
                            if (input.substr(peg$currPos, 6) === peg$c268) {
                                s1 = peg$c268;
                                peg$currPos += 6;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c269);
                                }
                            }
                        }
                    }
                }
            }
        }
        if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c270(s1);
        }
        s0 = s1;
        return s0;
    }
    function peg$parseSchemaUnionType() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c271;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c272);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseSchemaPrimitiveType();
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$currPos;
                    s6 = peg$parsewhiteSpace();
                    if (s6 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c81) {
                            s7 = peg$c81;
                            peg$currPos += 2;
                        }
                        else {
                            s7 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c82);
                            }
                        }
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parsewhiteSpace();
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parseSchemaPrimitiveType();
                                if (s9 !== peg$FAILED) {
                                    s6 = [s6, s7, s8, s9];
                                    s5 = s6;
                                }
                                else {
                                    peg$currPos = s5;
                                    s5 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    if (s5 !== peg$FAILED) {
                        while (s5 !== peg$FAILED) {
                            s4.push(s5);
                            s5 = peg$currPos;
                            s6 = peg$parsewhiteSpace();
                            if (s6 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 2) === peg$c81) {
                                    s7 = peg$c81;
                                    peg$currPos += 2;
                                }
                                else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c82);
                                    }
                                }
                                if (s7 !== peg$FAILED) {
                                    s8 = peg$parsewhiteSpace();
                                    if (s8 !== peg$FAILED) {
                                        s9 = peg$parseSchemaPrimitiveType();
                                        if (s9 !== peg$FAILED) {
                                            s6 = [s6, s7, s8, s9];
                                            s5 = s6;
                                        }
                                        else {
                                            peg$currPos = s5;
                                            s5 = peg$FAILED;
                                        }
                                    }
                                    else {
                                        peg$currPos = s5;
                                        s5 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s5;
                                    s5 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                    }
                    else {
                        s4 = peg$FAILED;
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsewhiteSpace();
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                                s6 = peg$c273;
                                peg$currPos++;
                            }
                            else {
                                s6 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c274);
                                }
                            }
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c275(s3, s4);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseSchemaTupleType() {
        let s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
            s1 = peg$c271;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c272);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 === peg$FAILED) {
                s2 = null;
            }
            if (s2 !== peg$FAILED) {
                s3 = peg$parseSchemaPrimitiveType();
                if (s3 !== peg$FAILED) {
                    s4 = [];
                    s5 = peg$currPos;
                    s6 = peg$parsewhiteSpace();
                    if (s6 === peg$FAILED) {
                        s6 = null;
                    }
                    if (s6 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                            s7 = peg$c127;
                            peg$currPos++;
                        }
                        else {
                            s7 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c128);
                            }
                        }
                        if (s7 !== peg$FAILED) {
                            s8 = peg$parsewhiteSpace();
                            if (s8 === peg$FAILED) {
                                s8 = null;
                            }
                            if (s8 !== peg$FAILED) {
                                s9 = peg$parseSchemaPrimitiveType();
                                if (s9 !== peg$FAILED) {
                                    s6 = [s6, s7, s8, s9];
                                    s5 = s6;
                                }
                                else {
                                    peg$currPos = s5;
                                    s5 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                    }
                    while (s5 !== peg$FAILED) {
                        s4.push(s5);
                        s5 = peg$currPos;
                        s6 = peg$parsewhiteSpace();
                        if (s6 === peg$FAILED) {
                            s6 = null;
                        }
                        if (s6 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 44) {
                                s7 = peg$c127;
                                peg$currPos++;
                            }
                            else {
                                s7 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c128);
                                }
                            }
                            if (s7 !== peg$FAILED) {
                                s8 = peg$parsewhiteSpace();
                                if (s8 === peg$FAILED) {
                                    s8 = null;
                                }
                                if (s8 !== peg$FAILED) {
                                    s9 = peg$parseSchemaPrimitiveType();
                                    if (s9 !== peg$FAILED) {
                                        s6 = [s6, s7, s8, s9];
                                        s5 = s6;
                                    }
                                    else {
                                        peg$currPos = s5;
                                        s5 = peg$FAILED;
                                    }
                                }
                                else {
                                    peg$currPos = s5;
                                    s5 = peg$FAILED;
                                }
                            }
                            else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                        }
                    }
                    if (s4 !== peg$FAILED) {
                        s5 = peg$parsewhiteSpace();
                        if (s5 === peg$FAILED) {
                            s5 = null;
                        }
                        if (s5 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                                s6 = peg$c273;
                                peg$currPos++;
                            }
                            else {
                                s6 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c274);
                                }
                            }
                            if (s6 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c276(s3, s4);
                                s0 = s1;
                            }
                            else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parseVersion() {
        let s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 64) {
            s1 = peg$c2;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c3);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c278.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c279);
                }
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    if (peg$c278.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c279);
                        }
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c280(s2);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c277);
            }
        }
        return s0;
    }
    function peg$parseIndent() {
        let s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        peg$silentFails++;
        s1 = peg$currPos;
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c282;
            peg$currPos++;
        }
        else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c283);
            }
        }
        if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (input.charCodeAt(peg$currPos) === 32) {
                    s3 = peg$c282;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c283);
                    }
                }
            }
        }
        else {
            s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s3 = peg$c284(s2);
            if (s3) {
                s3 = undefined;
            }
            else {
                s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
            }
            else {
                peg$currPos = s1;
                s1 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        peg$silentFails--;
        if (s1 !== peg$FAILED) {
            peg$currPos = s0;
            s0 = undefined;
        }
        else {
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c281);
            }
        }
        return s0;
    }
    function peg$parseSameIndent() {
        let s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$currPos;
        s3 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
            s4 = peg$c282;
            peg$currPos++;
        }
        else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c283);
            }
        }
        while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (input.charCodeAt(peg$currPos) === 32) {
                s4 = peg$c282;
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c283);
                }
            }
        }
        if (s3 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s4 = peg$c286(s3);
            if (s4) {
                s4 = undefined;
            }
            else {
                s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        peg$silentFails--;
        if (s2 !== peg$FAILED) {
            peg$currPos = s1;
            s1 = undefined;
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (input.charCodeAt(peg$currPos) === 32) {
                s3 = peg$c282;
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c283);
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (input.charCodeAt(peg$currPos) === 32) {
                    s3 = peg$c282;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c283);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c285);
            }
        }
        return s0;
    }
    function peg$parseSameOrMoreIndent() {
        let s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$currPos;
        s3 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
            s4 = peg$c282;
            peg$currPos++;
        }
        else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c283);
            }
        }
        while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (input.charCodeAt(peg$currPos) === 32) {
                s4 = peg$c282;
                peg$currPos++;
            }
            else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c283);
                }
            }
        }
        if (s3 !== peg$FAILED) {
            peg$savedPos = peg$currPos;
            s4 = peg$c288(s3);
            if (s4) {
                s4 = undefined;
            }
            else {
                s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s2;
            s2 = peg$FAILED;
        }
        peg$silentFails--;
        if (s2 !== peg$FAILED) {
            peg$currPos = s1;
            s1 = undefined;
        }
        else {
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (input.charCodeAt(peg$currPos) === 32) {
                s3 = peg$c282;
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c283);
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (input.charCodeAt(peg$currPos) === 32) {
                    s3 = peg$c282;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c283);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c14();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c287);
            }
        }
        return s0;
    }
    function peg$parseReservedWord() {
        let s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parseDirection();
        if (s1 === peg$FAILED) {
            s1 = peg$parseParticleArgumentDirection();
            if (s1 === peg$FAILED) {
                s1 = peg$parseRecipeHandleFate();
                if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 8) === peg$c65) {
                        s1 = peg$c65;
                        peg$currPos += 8;
                    }
                    else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c66);
                        }
                    }
                    if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 6) === peg$c172) {
                            s1 = peg$c172;
                            peg$currPos += 6;
                        }
                        else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c173);
                            }
                        }
                        if (s1 === peg$FAILED) {
                            if (input.substr(peg$currPos, 6) === peg$c31) {
                                s1 = peg$c31;
                                peg$currPos += 6;
                            }
                            else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                    peg$fail(peg$c32);
                                }
                            }
                            if (s1 === peg$FAILED) {
                                if (input.substr(peg$currPos, 9) === peg$c35) {
                                    s1 = peg$c35;
                                    peg$currPos += 9;
                                }
                                else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                        peg$fail(peg$c36);
                                    }
                                }
                                if (s1 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 6) === peg$c245) {
                                        s1 = peg$c245;
                                        peg$currPos += 6;
                                    }
                                    else {
                                        s1 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                            peg$fail(peg$c246);
                                        }
                                    }
                                    if (s1 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 7) === peg$c216) {
                                            s1 = peg$c216;
                                            peg$currPos += 7;
                                        }
                                        else {
                                            s1 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                                peg$fail(peg$c217);
                                            }
                                        }
                                        if (s1 === peg$FAILED) {
                                            if (input.substr(peg$currPos, 6) === peg$c167) {
                                                s1 = peg$c167;
                                                peg$currPos += 6;
                                            }
                                            else {
                                                s1 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                    peg$fail(peg$c168);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (s1 !== peg$FAILED) {
            if (peg$c289.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c290);
                }
            }
            if (s2 === peg$FAILED) {
                s2 = peg$currPos;
                peg$silentFails++;
                if (input.length > peg$currPos) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c291);
                    }
                }
                peg$silentFails--;
                if (s3 === peg$FAILED) {
                    s2 = undefined;
                }
                else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c292(s1);
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        return s0;
    }
    function peg$parsebackquotedString() {
        let s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 96) {
            s1 = peg$c294;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c295);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c296.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c297);
                }
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    if (peg$c296.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c297);
                        }
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 96) {
                    s3 = peg$c294;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c295);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c298(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c293);
            }
        }
        return s0;
    }
    function peg$parseid() {
        let s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c300;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c301);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c302.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c303);
                }
            }
            if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    if (peg$c302.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c303);
                        }
                    }
                }
            }
            else {
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 39) {
                    s3 = peg$c300;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c301);
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c304(s2);
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c299);
            }
        }
        return s0;
    }
    function peg$parseupperIdent() {
        let s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        if (peg$c306.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c307);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c308.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c309);
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (peg$c308.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c309);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c14();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c305);
            }
        }
        return s0;
    }
    function peg$parselowerIdent() {
        let s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parseReservedWord();
        peg$silentFails--;
        if (s2 === peg$FAILED) {
            s1 = undefined;
        }
        else {
            peg$currPos = s1;
            s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
            if (peg$c311.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c312);
                }
            }
            if (s2 !== peg$FAILED) {
                s3 = [];
                if (peg$c308.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c309);
                    }
                }
                while (s4 !== peg$FAILED) {
                    s3.push(s4);
                    if (peg$c308.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c309);
                        }
                    }
                }
                if (s3 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c14();
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c310);
            }
        }
        return s0;
    }
    function peg$parsefieldName() {
        let s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        if (peg$c311.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c312);
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = [];
            if (peg$c308.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c309);
                }
            }
            while (s3 !== peg$FAILED) {
                s2.push(s3);
                if (peg$c308.test(input.charAt(peg$currPos))) {
                    s3 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c309);
                    }
                }
            }
            if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c14();
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c313);
            }
        }
        return s0;
    }
    function peg$parsewhiteSpace() {
        let s0, s1;
        peg$silentFails++;
        s0 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
            s1 = peg$c282;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c283);
            }
        }
        if (s1 !== peg$FAILED) {
            while (s1 !== peg$FAILED) {
                s0.push(s1);
                if (input.charCodeAt(peg$currPos) === 32) {
                    s1 = peg$c282;
                    peg$currPos++;
                }
                else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c283);
                    }
                }
            }
        }
        else {
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c314);
            }
        }
        return s0;
    }
    function peg$parseeolWhiteSpace() {
        let s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c316.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
        }
        else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c317);
            }
        }
        while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c316.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c317);
                }
            }
        }
        if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            if (input.length > peg$currPos) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c291);
                }
            }
            peg$silentFails--;
            if (s3 === peg$FAILED) {
                s2 = undefined;
            }
            else {
                peg$currPos = s2;
                s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            if (peg$c316.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c317);
                }
            }
            while (s2 !== peg$FAILED) {
                s1.push(s2);
                if (peg$c316.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c317);
                    }
                }
            }
            if (s1 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c318) {
                    s2 = peg$c318;
                    peg$currPos += 2;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c319);
                    }
                }
                if (s2 !== peg$FAILED) {
                    s3 = [];
                    if (peg$c12.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c13);
                        }
                    }
                    while (s4 !== peg$FAILED) {
                        s3.push(s4);
                        if (peg$c12.test(input.charAt(peg$currPos))) {
                            s4 = input.charAt(peg$currPos);
                            peg$currPos++;
                        }
                        else {
                            s4 = peg$FAILED;
                            if (peg$silentFails === 0) {
                                peg$fail(peg$c13);
                            }
                        }
                    }
                    if (s3 !== peg$FAILED) {
                        s4 = peg$parseeolWhiteSpace();
                        if (s4 !== peg$FAILED) {
                            s1 = [s1, s2, s3, s4];
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = [];
                if (peg$c316.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                }
                else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c317);
                    }
                }
                while (s2 !== peg$FAILED) {
                    s1.push(s2);
                    if (peg$c316.test(input.charAt(peg$currPos))) {
                        s2 = input.charAt(peg$currPos);
                        peg$currPos++;
                    }
                    else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) {
                            peg$fail(peg$c317);
                        }
                    }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseeol();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseeolWhiteSpace();
                        if (s3 === peg$FAILED) {
                            s3 = null;
                        }
                        if (s3 !== peg$FAILED) {
                            s1 = [s1, s2, s3];
                            s0 = s1;
                        }
                        else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    }
                    else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c315);
            }
        }
        return s0;
    }
    function peg$parseeol() {
        let s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 13) {
            s1 = peg$c321;
            peg$currPos++;
        }
        else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c322);
            }
        }
        if (s1 === peg$FAILED) {
            s1 = null;
        }
        if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 10) {
                s2 = peg$c323;
                peg$currPos++;
            }
            else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                    peg$fail(peg$c324);
                }
            }
            if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 13) {
                    s3 = peg$c321;
                    peg$currPos++;
                }
                else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                        peg$fail(peg$c322);
                    }
                }
                if (s3 === peg$FAILED) {
                    s3 = null;
                }
                if (s3 !== peg$FAILED) {
                    s1 = [s1, s2, s3];
                    s0 = s1;
                }
                else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
            }
            else {
                peg$currPos = s0;
                s0 = peg$FAILED;
            }
        }
        else {
            peg$currPos = s0;
            s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
                peg$fail(peg$c320);
            }
        }
        return s0;
    }
    let indent = '';
    let startIndent = '';
    const indents = [];
    const emptyRef = () => ({ kind: 'handle-ref', id: null, name: null, tags: [], location: location() });
    function extractIndented(items) {
        return items[1].map(item => item[1]);
    }
    function optional(result, extract, defaultValue) {
        if (result !== null) {
            const value = extract(result);
            if (value !== null) {
                return value;
            }
        }
        return defaultValue === null ? null : defaultValue;
    }
    function checkNormal(result) {
        if (['string', 'number', 'boolean'].includes(typeof result) || result === null) {
            return;
        }
        if (result === undefined) {
            error(`result was undefined`);
        }
        if (Array.isArray(result)) {
            for (const item of result) {
                checkNormal(item);
            }
            return;
        }
        if (result.model) {
            error(`unexpected 'model' in ${JSON.stringify(result)}`);
        }
        if (!result.location) {
            error(`no 'location' in ${JSON.stringify(result)}`);
        }
        if (!result.kind) {
            error(`no 'kind' in ${JSON.stringify(result)}`);
        }
        for (const key of Object.keys(result)) {
            if (['location', 'kind'].includes(key)) {
                continue;
            }
            checkNormal(result[key]);
        }
    }
    peg$result = peg$startRuleFunction();
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
export const parse = peg$parse;
//# sourceMappingURL=manifest-parser.js.map