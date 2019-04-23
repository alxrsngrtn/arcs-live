import { Id } from './id.js';
import { Type } from './type.js';
import { ModelValue } from './storage/crdt-collection-model.js';
export declare class ArcInfo {
    readonly id: string;
    readonly serialization: string;
    constructor(arcId: Id, serialization: string);
    static extractSerialization(data: any): string;
}
export declare class ArcHandle implements ModelValue {
    readonly id: string;
    readonly storageKey: string;
    readonly type: Type;
    readonly tags: string[];
    constructor(id: string, storageKey: string, type: Type, tags: string[]);
}
