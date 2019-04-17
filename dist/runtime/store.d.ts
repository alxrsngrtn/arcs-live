import { PropagatedException } from "./arc-exceptions";
import { Type } from "./type";
import { EntityIdComponents } from "./entity";
import { ParticleExecutionContext } from "./particle-execution-context";
/**
 * Interface for a storage system. This is implemented by different classes depending on whether the code is running on the host or in a PEC.
 * On the host, it is implemented by StorageProviderBase. In a PEC, by StorageProxy. The storage proxy essentially forwards its calls through to
 * the host over the API channel, to be run on a real storage provider instance. This interface provides an API for operating on storage,
 * without knowing whether you are talking to a storage provider or proxy.
 */
export interface Store {
    name: string;
    readonly id: string;
    readonly type: Type;
    readonly pec?: ParticleExecutionContext;
    reportExceptionInHost(exception: PropagatedException): void;
    generateID(): string;
    generateIDComponents(): EntityIdComponents;
}
export interface VariableStore extends Store {
    get(): Promise<any>;
    set(entity: any, particleId: string): Promise<void>;
    clear(particleId: string): Promise<void>;
}
export interface CollectionStore extends Store {
    get(id: string): Promise<any>;
    store(value: any, keys: string[], particleId?: string): Promise<void>;
    clear?(particleId: string): Promise<void>;
    remove(id: string, keys: string[], particleId?: string): Promise<void>;
    toList(): Promise<any[]>;
}
export interface BigCollectionStore extends Store {
    store(value: any, keys: string[], particleId?: string): Promise<void>;
    remove(id: string, keys?: string[], originatorId?: string): Promise<void>;
    stream(pageSize: number, forward?: boolean): Promise<number>;
    cursorNext(cursorId: number): Promise<any>;
    cursorClose(cursorId: number): Promise<void>;
}
