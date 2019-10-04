import minimist from 'minimist';
import { Schema } from '../runtime/schema.js';
export declare abstract class Schema2Base {
    readonly opts: minimist.ParsedArgs;
    constructor(opts: minimist.ParsedArgs);
    call(): Promise<void>;
    private processFile;
    protected processSchema(schema: Schema, processField: (field: string, typeChar: string, refName: string) => void): number;
    private typeSummary;
    private inlineSchemaName;
    abstract outputName(baseName: string): string;
    abstract fileHeader(outName: string): string;
    abstract fileFooter(): string;
    abstract entityClass(name: string, schema: Schema): string;
}
