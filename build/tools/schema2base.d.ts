import minimist from 'minimist';
import { Schema } from '../runtime/schema.js';
import { Dictionary } from '../runtime/hot.js';
import { Manifest } from '../runtime/manifest.js';
export declare type Aliases = Dictionary<Set<string>>;
export declare abstract class Schema2Base {
    readonly opts: minimist.ParsedArgs;
    private readonly scope;
    constructor(opts: minimist.ParsedArgs);
    call(): Promise<void>;
    /** Collect schemas from particle connections and build map of aliases. */
    processManifest(manifest: Manifest): [Aliases, Dictionary<Schema>, Dictionary<Schema>];
    private processFile;
    protected processSchema(schema: Schema, processField: (field: string, typeChar: string, refName: string) => void): number;
    private typeSummary;
    private inlineSchemaName;
    abstract outputName(baseName: string): string;
    abstract fileHeader(outName: string): string;
    abstract fileFooter(): string;
    abstract entityClass(name: string, schema: Schema): string;
    abstract addAliases(aliases: Aliases): string;
    abstract addScope(namespace: string): any;
}
