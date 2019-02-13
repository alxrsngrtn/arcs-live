import { StorageProviderBase } from '../../runtime/storage/storage-provider-base.js';
import { Strategy } from '../strategizer.js';
export declare class AssignHandles extends Strategy {
    generate(inputParams: any): any;
    getMappableStores(fate: any, type: any, tags: any, counts: any): Map<StorageProviderBase, string>;
}
