import { StorageProviderBase } from '../../runtime/storage/storage-provider-base.js';
import { Strategy } from '../strategizer.js';
import { StorageStub } from '../../runtime/manifest.js';
export declare class AssignHandles extends Strategy {
    generate(inputParams: any): any;
    getMappableStores(fate: any, type: any, tags: string[], counts: any): Map<StorageProviderBase | StorageStub, string>;
}
