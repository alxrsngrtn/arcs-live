import { ClaimIsTag } from './particle-claim.js';
import { StorageProviderFactory } from './storage/storage-provider-factory.js';
import { Type } from './type.js';
import { UnifiedStore, UnifiedActiveStore } from './storageNG/unified-store.js';
import { ProxyCallback } from './storageNG/store.js';
export declare class StorageStub extends UnifiedStore {
    readonly storageKey: string;
    readonly storageProviderFactory: StorageProviderFactory;
    readonly version?: number;
    referenceMode: boolean;
    readonly model?: {}[];
    protected unifiedStoreType: 'StorageStub';
    constructor(type: Type, id: string, name: string, storageKey: string, storageProviderFactory: StorageProviderFactory, originalId: string, claims: ClaimIsTag[], description: string, version?: number, source?: string, referenceMode?: boolean, model?: {}[]);
    on(callback: ProxyCallback<null>): number;
    off(callback: number): void;
    activate(): Promise<UnifiedActiveStore>;
    inflate(storageProviderFactory?: StorageProviderFactory): Promise<import("./storage/storage-provider-base.js").StorageProviderBase>;
    toLiteral(): any;
    isBackedByManifest(): boolean;
    _compareTo(other: UnifiedStore): number;
}
