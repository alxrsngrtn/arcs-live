export declare class SlotInfo {
    formFactor: string;
    handle: string;
    constructor(formFactor: string, handle: string);
    toLiteral(): SlotInfo;
    static fromLiteral({ formFactor, handle }: {
        formFactor: string;
        handle: string;
    }): SlotInfo;
}
