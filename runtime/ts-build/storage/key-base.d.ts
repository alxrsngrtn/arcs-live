export declare abstract class KeyBase {
    protocol: string;
    abstract childKeyForHandle(id: any): KeyBase;
    abstract toString(): string;
}
