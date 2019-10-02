import { ClaimIsTag } from './particle-claim.js';
import { StorageProviderBase } from './storage/storage-provider-base.js';
import { StorageProviderFactory } from './storage/storage-provider-factory.js';
import { Type } from './type.js';
import { UnifiedStore } from './storageNG/unified-store.js';
export declare class StorageStub extends UnifiedStore {
    readonly type: Type;
    readonly id: string;
    readonly name: string;
    readonly storageKey: string;
    readonly storageProviderFactory: StorageProviderFactory;
    readonly originalId: string;
    /** Trust tags claimed by this data store. */
    readonly claims: ClaimIsTag[];
    readonly description: string;
    readonly version?: number;
    readonly source?: string;
    referenceMode: boolean;
    readonly model?: {}[];
    protected unifiedStoreType: 'StorageStub';
    constructor(type: Type, id: string, name: string, storageKey: string, storageProviderFactory: StorageProviderFactory, originalId: string, 
    /** Trust tags claimed by this data store. */
    claims: ClaimIsTag[], description: string, version?: number, source?: string, referenceMode?: boolean, model?: {}[]);
    inflate(storageProviderFactory?: StorageProviderFactory): Promise<StorageProviderBase>;
    toLiteral(): any;
    isBackedByManifest(): boolean;
    toString(handleTags: string[]): string;
    _compareTo(other: StorageProviderBase): number;
}
