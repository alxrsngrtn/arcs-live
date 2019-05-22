import { Dictionary, Producer, Predicate } from '../runtime/hot.js';
export declare type TraceInfo = {
    cat?: string;
    name?: string;
    overview?: boolean;
    sequence?: string;
    ts?: number;
    args?: Dictionary<any>;
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
    args: Dictionary<any>;
    id?: number;
    flowId?: number;
    seq?: string;
};
export interface Trace {
    wait<T>(v: Promise<T>, info?: TraceInfo): T;
    start(info?: TraceInfo): any;
    addArgs(extraArgs: Dictionary<any>): any;
    step(info?: TraceInfo): any;
    end(info?: TraceInfo): any;
    endWith(v: any, info?: TraceInfo): any;
    id: Producer<number>;
}
export interface TracingInterface {
    enable(): void;
    now: Producer<number>;
    wrap(info: TraceInfo, fn: Function): Function;
    start(info: TraceInfo): Trace;
    flow(info: TraceInfo): Trace;
    save(): {
        traceEvents: TraceEvent[];
    };
    download(): void;
    stream(callback: (e: TraceEvent) => any, predicate?: Predicate<TraceEvent>): void;
    __clearForTests(): void;
}
export declare const Tracing: TracingInterface;
