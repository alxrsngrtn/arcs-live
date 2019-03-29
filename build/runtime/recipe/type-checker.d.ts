import { BigCollectionType, CollectionType, Type, TypeVariable } from '../type.js';
interface TypeListInfo {
    type: Type;
    direction?: string;
    connection?: {
        direction: string;
    };
}
export declare class TypeChecker {
    static processTypeList(baseType: Type, list: TypeListInfo[]): Type | TypeVariable | CollectionType<TypeVariable> | BigCollectionType<TypeVariable>;
    static _tryMergeTypeVariable(base: Type, onto: Type): Type;
    static _tryMergeConstraints(handleType: Type, { type, direction }: TypeListInfo): boolean;
    static _writeConstraintsApply(handleType: Type, connectionType: Type): boolean;
    static _readConstraintsApply(handleType: Type, connectionType: Type): boolean;
    static compareTypes(left: TypeListInfo, right: TypeListInfo): any;
}
export {};
