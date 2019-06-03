import { AmlServiceContext } from './util.js';
export declare class LspLoader {
    context: AmlServiceContext;
    constructor(context: AmlServiceContext);
    path(fileName: string): string;
    join(prefix: string, filepath: string): string;
    loadResource(fileName: string): Promise<string>;
}
