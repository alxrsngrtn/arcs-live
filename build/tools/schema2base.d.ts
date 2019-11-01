import minimist from 'minimist';
import { Manifest } from '../runtime/manifest.js';
import { SchemaNode } from './schema2graph.js';
export interface ClassGenerator {
    addField(field: string, typeChar: string, inherited: boolean): any;
    addReference(field: string, inherited: boolean, refName: string): any;
    generate(fieldCount: number): string;
}
export declare abstract class Schema2Base {
    readonly opts: minimist.ParsedArgs;
    scope: string;
    constructor(opts: minimist.ParsedArgs);
    call(): Promise<void>;
    private processFile;
    processManifest(manifest: Manifest): string[];
    private typeSummary;
    outputName(baseName: string): string;
    fileHeader(outName: string): string;
    fileFooter(): string;
    abstract getClassGenerator(node: SchemaNode): ClassGenerator;
}
