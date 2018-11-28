export declare class OuterPortAttachment {
    _devtoolsChannel: any;
    _arcIdString: string;
    _speculative: boolean;
    constructor(arc: any, devtoolsChannel: any);
    handlePecMessage(name: any, pecMsgBody: any, pecMsgCount: any, stackString: any): void;
    _extractStackFrames(stackString: any): any[];
}
