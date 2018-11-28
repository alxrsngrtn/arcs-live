export declare abstract class KeyBase {
    protocol: string;
    location: string;
    abstract childKeyForHandle(id: any): KeyBase;
    abstract toString(): string;
}
