export declare type TraceInfo = {
    cat?: string;
    name?: string;
    overview?: boolean;
    sequence?: string;
    args?: {
        [index: string]: any;
    };
};
export declare type TraceEvent = {
    pid?: number;
    tid?: number;
    ph: string;
    bp?: string;
    ts: number;
    dur?: number;
    cat: string;
    name: string;
    ov: boolean;
    args: {
        [index: string]: any;
    };
    id?: number;
    flowId?: number;
    seq: string;
};
export interface Trace {
    wait<T>(v: Promise<T>, info?: TraceInfo): T;
    start(info?: TraceInfo): any;
    addArgs(extraArgs: {
        [index: string]: any;
    }): any;
    step(info?: TraceInfo): any;
    end(info?: TraceInfo): any;
    endWith(v: any, info?: TraceInfo): any;
    id: () => number;
}
export interface TracingInterface {
    enable(): void;
    now: () => number;
    wrap(info: TraceInfo, fn: Function): Function;
    start(info: TraceInfo): Trace;
    flow(info: TraceInfo): Trace;
    save(): {
        traceEvents: TraceEvent[];
    };
    download(): void;
    stream(callback: (e: TraceEvent) => any, predicate?: (e: TraceEvent) => boolean): void;
    __clearForTests(): void;
}
export declare const Tracing: TracingInterface;
