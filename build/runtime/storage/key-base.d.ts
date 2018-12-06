export declare abstract class KeyBase {
    protocol: string;
    location: string;
    abstract childKeyForHandle(id: any): KeyBase;
    abstract childKeyForArcInfo(): KeyBase;
    abstract toString(): string;
}
