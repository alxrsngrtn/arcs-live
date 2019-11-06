declare enum ModalityName {
    Dom = "dom",
    DomTouch = "domTouch",
    Vr = "vr",
    Voice = "voice"
}
export declare class Modality {
    readonly all: boolean;
    readonly names: string[];
    private constructor();
    static create(names: string[]): Modality;
    intersection(other: Modality): Modality;
    static intersection(modalities: Modality[]): Modality;
    union(other: Modality): Modality;
    static union(modalities: Modality[]): Modality;
    isResolved(): boolean;
    isCompatible(names: string[]): boolean;
    static get Name(): typeof ModalityName;
    static readonly all: Modality;
    static readonly dom: Modality;
    static readonly domTouch: Modality;
    static readonly voice: Modality;
    static readonly vr: Modality;
}
export {};
