/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
import fs from 'fs';
import path from 'path';
import { Utils } from '../../shells/lib/utils.js';
export class Schema2Base {
    constructor(opts) {
        this.opts = opts;
        Utils.init('../..');
    }
    async call() {
        fs.mkdirSync(this.opts.outdir, { recursive: true });
        for (const file of this.opts._) {
            if (fs.existsSync(file)) {
                await this.processFile(file);
            }
            else {
                throw new Error(`File not found: ${file}`);
            }
        }
    }
    /** Collect schemas from particle connections and build map of aliases. */
    processManifest(manifest) {
        const aliases = {};
        const updateTheseAliases = (aliases_) => (rhs, alias) => {
            if (aliases_[rhs] !== undefined) {
                aliases_[rhs].add(alias);
            }
            else {
                aliases_[rhs] = new Set([alias]);
            }
        };
        const updateAliases = updateTheseAliases(aliases);
        const schemas = {};
        const refSchemas = {};
        for (const particle of manifest.allParticles) {
            const namespaceByParticle = (other) => `${particle.name}_${other}`;
            for (const connection of particle.connections) {
                const schema = connection.type.getEntitySchema();
                if (!schema) {
                    continue;
                }
                // Include primary schemas from particle and connection name
                // Given non-inline schemas: Create particle-namespaced schemas and alias connections to them.
                const name = namespaceByParticle(connection.name);
                if (aliases[name] === undefined) {
                    aliases[name] = new Set([]);
                }
                schemas[name] = schema;
                schema.names.forEach(n => {
                    const mangledName = namespaceByParticle(n);
                    if (Object.values(aliases).some(lst => lst.has(mangledName))) {
                        Object.values(aliases).forEach(lst => lst.delete(mangledName));
                    }
                    else {
                        aliases[name].add(mangledName);
                    }
                });
                // Collect reference schema fields. These will be output first so they're defined
                // prior to use in their containing entity classes.
                for (const [field, descriptor] of Object.entries(schema.fields)) {
                    if (descriptor.kind === 'schema-reference') {
                        const refSchemaName = this.inlineSchemaName(field, descriptor);
                        const refSchema = descriptor.schema.model.getEntitySchema();
                        if (!(refSchemaName in refSchemas)) {
                            refSchemas[refSchemaName] = refSchema;
                        }
                        // TODO(alxr) Test the corner cases
                        refSchema.names.filter(n => n !== refSchemaName).forEach(n => updateAliases(refSchemaName, n));
                    }
                }
            }
        }
        return [aliases, refSchemas, schemas];
    }
    async processFile(src) {
        const outName = this.opts.outfile || this.outputName(path.basename(src));
        const outPath = path.join(this.opts.outdir, outName);
        console.log(outPath);
        if (this.opts.update && fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs > fs.statSync(src).mtimeMs) {
            return;
        }
        const manifest = await Utils.parse(`import '${src}'`);
        const [aliases, ...schemas] = this.processManifest(manifest);
        if (Object.values(schemas).map(s => Object.keys(s).length).reduce((acc, x) => acc + x, 0) === 0) {
            console.warn(`No schemas found in '${src}'`);
            return;
        }
        const outFile = fs.openSync(outPath, 'w');
        fs.writeSync(outFile, this.fileHeader(outName));
        for (const dict of schemas) {
            for (const [name, schema] of Object.entries(dict)) {
                fs.writeSync(outFile, this.entityClass(name, schema).replace(/ +\n/g, '\n'));
            }
        }
        fs.writeSync(outFile, `\n${this.addAliases(aliases)}\n`);
        fs.writeSync(outFile, this.fileFooter());
        fs.closeSync(outFile);
    }
    processSchema(schema, processField) {
        let fieldCount = 0;
        for (const [field, descriptor] of Object.entries(schema.fields)) {
            fieldCount++;
            switch (this.typeSummary(descriptor)) {
                case 'schema-primitive:Text':
                    processField(field, 'T', null);
                    break;
                case 'schema-primitive:URL':
                    processField(field, 'U', null);
                    break;
                case 'schema-primitive:Number':
                    processField(field, 'N', null);
                    break;
                case 'schema-primitive:Boolean':
                    processField(field, 'B', null);
                    break;
                case 'schema-reference':
                    processField(field, 'R', this.inlineSchemaName(field, descriptor));
                    break;
                default:
                    console.log(`Schema type for field '${field}' is not yet supported:`);
                    console.dir(descriptor, { depth: null });
                    process.exit(1);
            }
        }
        return fieldCount;
    }
    typeSummary(descriptor) {
        switch (descriptor.kind) {
            case 'schema-primitive':
                return `schema-primitive:${descriptor.type}`;
            case 'schema-collection':
                return `schema-collection:${descriptor.schema.type}`;
            default:
                return descriptor.kind;
        }
    }
    inlineSchemaName(field, descriptor) {
        let name = descriptor.schema.name;
        if (!name && descriptor.schema.names && descriptor.schema.names.length > 0) {
            name = descriptor.schema.names[0];
        }
        if (!name) {
            console.log(`Unnamed inline schemas (field '${field}') are not yet supported`);
            process.exit(1);
        }
        return name;
    }
}
//# sourceMappingURL=schema2base.js.map