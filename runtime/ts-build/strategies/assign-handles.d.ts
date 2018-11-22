import { Strategy } from '../strategizer/strategizer.js';
import { StorageProviderBase } from '../storage/storage-provider-base.js';
export declare class AssignHandles extends Strategy {
    generate(inputParams: any): Promise<import("../strategizer/strategizer.js").Descendant[]>;
    getMappableStores(fate: any, type: any, tags: any, counts: any): Map<StorageProviderBase, string>;
}
