export declare class SuggestFilter {
    readonly showAll: boolean;
    readonly search?: string;
    constructor(showAll: boolean, search?: string);
    isEquivalent(showAll: boolean, search?: string): boolean;
}
