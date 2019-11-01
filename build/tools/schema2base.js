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
import { Runtime } from '../runtime/runtime.js';
import { SchemaGraph } from './schema2graph.js';
export class Schema2Base {
    constructor(opts) {
        this.opts = opts;
        Runtime.init('../..');
        this.scope = this.opts.package || 'arcs';
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
    async processFile(src) {
        const outName = this.opts.outfile || this.outputName(path.basename(src));
        const outPath = path.join(this.opts.outdir, outName);
        console.log(outPath);
        if (this.opts.update && fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs > fs.statSync(src).mtimeMs) {
            return;
        }
        const manifest = await Runtime.parse(`import '${src}'`);
        if (manifest.errors.length) {
            return;
        }
        const classes = this.processManifest(manifest);
        if (classes.length === 0) {
            console.warn(`Could not find any particle connections with schemas in '${src}'`);
            return;
        }
        const outFile = fs.openSync(outPath, 'w');
        fs.writeSync(outFile, this.fileHeader(outName));
        for (const text of classes) {
            fs.writeSync(outFile, text.replace(/ +\n/g, '\n'));
        }
        fs.writeSync(outFile, this.fileFooter());
        fs.closeSync(outFile);
    }
    processManifest(manifest) {
        // TODO: consider an option to generate one file per particle
        const classes = [];
        for (const particle of manifest.allParticles) {
            const graph = new SchemaGraph(particle);
            // Generate one class definition per node in the graph.
            for (const node of graph.walk()) {
                const generator = this.getClassGenerator(node);
                const fields = Object.entries(node.schema.fields);
                for (const [field, descriptor] of fields) {
                    const inherited = !node.extras.includes(field);
                    switch (this.typeSummary(descriptor)) {
                        case 'schema-primitive:Text':
                            generator.processField(field, 'T', inherited, null);
                            break;
                        case 'schema-primitive:URL':
                            generator.processField(field, 'U', inherited, null);
                            break;
                        case 'schema-primitive:Number':
                            generator.processField(field, 'N', inherited, null);
                            break;
                        case 'schema-primitive:Boolean':
                            generator.processField(field, 'B', inherited, null);
                            break;
                        case 'schema-reference':
                            // TODO: this will be changed to its own method in a follow-up CL
                            generator.processField(field, 'R', inherited, node.refs.get(field).name);
                            break;
                        default:
                            console.log(`Schema type for field '${field}' is not yet supported:`);
                            console.dir(descriptor, { depth: null });
                            process.exit(1);
                    }
                }
                classes.push(generator.generate(fields.length));
            }
        }
        return classes;
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
    outputName(baseName) { return ''; }
    fileHeader(outName) { return ''; }
    fileFooter() { return ''; }
}
//# sourceMappingURL=schema2base.js.map