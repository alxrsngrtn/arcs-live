import { Entity } from './entity.js';
import { Type } from './type.js';
export declare class Relation extends Entity {
    entities: Entity[];
    constructor(...entities: any[]);
    readonly data: any[];
    static typeFor(relation: any): Type;
}
