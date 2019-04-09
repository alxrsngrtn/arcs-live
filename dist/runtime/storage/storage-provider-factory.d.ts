import { StorageBase, StorageProviderBase } from './storage-provider-base.js';
import { Id } from '../id.js';
import { Type } from '../type.js';
import { KeyBase } from './key-base.js';
export declare class StorageProviderFactory {
    private readonly arcId;
    static register(name: string, instance: {
        storage: Function;
        isPersistent: boolean;
    }): void;
    private _storageInstances;
    constructor(arcId: Id);
    private getInstance;
    _storageForKey(key: string): StorageBase;
    isPersistent(key: any): boolean;
    construct(id: string, type: Type, keyFragment: string): Promise<StorageProviderBase>;
    connect(id: string, type: Type, key: string): Promise<StorageProviderBase>;
    connectOrConstruct(id: string, type: Type, key: string): Promise<StorageProviderBase>;
    baseStorageFor(type: Type, keyString: string): Promise<StorageProviderBase>;
    baseStorageKey(type: Type, keyString: string): string;
    parseStringAsKey(s: string): KeyBase;
    newKey(id: any, associatedKeyFragment: any): void;
    shutdown(): Promise<void>;
}
