/**
 * @license
 * Copyright 2015 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const events = [];
let pid;
let now;
if (typeof document === 'object') {
    pid = 42;
    now = () => {
        return performance.now() * 1000;
    };
}
else {
    pid = process.pid;
    now = () => {
        const t = process.hrtime();
        return t[0] * 1000000 + t[1] / 1000;
    };
}
let flowId = 0;
function parseInfo(info) {
    if (!info) {
        return {};
    }
    if (typeof info === 'function') {
        return parseInfo(info());
    }
    if (info.toTraceInfo) {
        return parseInfo(info.toTraceInfo());
    }
    return info;
}
const streamingCallbacks = [];
function pushEvent(event) {
    event.pid = pid;
    event.tid = 0;
    if (!event.args) {
        delete event.args;
    }
    if (!event.ov) {
        delete event.ov;
    }
    if (!event.cat) {
        event.cat = '';
    }
    // Only keep events in memory if we're not streaming them.
    if (streamingCallbacks.length === 0)
        events.push(event);
    void Promise.resolve().then(() => {
        for (const { callback, predicate } of streamingCallbacks) {
            if (!predicate || predicate(event))
                callback(event);
        }
    });
}
const module_ = { exports: {} };
// tslint:disable-next-line: variable-name
export const Tracing = module_.exports;
module_.exports.enabled = false;
module_.exports.enable = () => {
    if (!module_.exports.enabled) {
        module_.exports.enabled = true;
        init();
    }
};
function init() {
    const result = {
        async wait(v) {
            return v;
        },
        start() {
            return this;
        },
        end() {
            return this;
        },
        step() {
            return this;
        },
        addArgs() {
        },
        async endWith(v) {
            return v;
        },
    };
    module_.exports.wrap = (info, fn) => {
        return fn;
    };
    module_.exports.start = (info) => {
        return result;
    };
    module_.exports.flow = (info) => {
        return result;
    };
    if (!module_.exports.enabled) {
        return;
    }
    module_.exports.wrap = (info, fn) => {
        return (...args) => {
            const t = module_.exports.start(info);
            try {
                return fn(...args);
            }
            finally {
                t.end();
            }
        };
    };
    function startSyncTrace(info) {
        info = parseInfo(info);
        let args = info.args;
        const begin = now();
        return {
            addArgs(extraArgs) {
                args = { ...(args || {}), ...extraArgs };
            },
            end(endInfo = {}, flow) {
                endInfo = parseInfo(endInfo);
                if (endInfo.args) {
                    args = { ...(args || {}), ...endInfo.args };
                }
                endInfo = { ...info, ...endInfo };
                this.endTs = now();
                pushEvent({
                    ph: 'X',
                    ts: begin,
                    dur: this.endTs - begin,
                    cat: endInfo.cat,
                    name: endInfo.name,
                    ov: endInfo.overview,
                    args,
                    // Arcs Devtools Specific:
                    flowId: flow && flow.id(),
                    seq: endInfo.sequence
                });
            },
            beginTs: begin
        };
    }
    module_.exports.start = (info) => {
        let trace = startSyncTrace(info);
        let flow;
        const baseInfo = { cat: info.cat, name: info.name + ' (async)', overview: info.overview, sequence: info.sequence };
        return {
            async wait(v, info) {
                const flowExisted = !!flow;
                if (!flowExisted) {
                    flow = module_.exports.flow(baseInfo);
                }
                trace.end(info, flow);
                if (flowExisted) {
                    flow.step({ ts: trace.beginTs, ...baseInfo });
                }
                else {
                    flow.start({ ts: trace.endTs });
                }
                trace = null;
                try {
                    return await v;
                }
                finally {
                    trace = startSyncTrace(baseInfo);
                }
            },
            addArgs(extraArgs) {
                trace.addArgs(extraArgs);
            },
            end(endInfo) {
                trace.end(endInfo, flow);
                if (flow) {
                    flow.end({ ts: trace.beginTs });
                }
            },
            async endWith(v, endInfo) {
                if (Promise.resolve(v) === v) { // If v is a promise.
                    v = this.wait(v, null);
                    try {
                        return await v;
                    }
                    finally {
                        this.end(endInfo);
                    }
                }
                else { // If v is not a promise.
                    this.end(endInfo);
                    return v;
                }
            }
        };
    };
    module_.exports.flow = (info) => {
        info = parseInfo(info);
        const id = flowId++;
        let started = false;
        return {
            start(startInfo) {
                const ts = (startInfo && startInfo.ts) || now();
                started = true;
                pushEvent({
                    ph: 's',
                    ts,
                    cat: info.cat,
                    name: info.name,
                    ov: info.overview,
                    args: info.args,
                    id,
                    seq: info.sequence
                });
                return this;
            },
            end(endInfo) {
                if (!started)
                    return this;
                const ts = (endInfo && endInfo.ts) || now();
                endInfo = parseInfo(endInfo);
                pushEvent({
                    ph: 'f',
                    bp: 'e',
                    ts,
                    cat: info.cat,
                    name: info.name,
                    ov: info.overview,
                    args: endInfo && endInfo.args,
                    id,
                    seq: info.sequence
                });
                return this;
            },
            step(stepInfo) {
                if (!started)
                    return this;
                const ts = (stepInfo && stepInfo.ts) || now();
                stepInfo = parseInfo(stepInfo);
                pushEvent({
                    ph: 't',
                    ts,
                    cat: info.cat,
                    name: info.name,
                    ov: info.overview,
                    args: stepInfo && stepInfo.args,
                    id,
                    seq: info.sequence
                });
                return this;
            },
            id: () => id
        };
    };
    module_.exports.save = () => {
        return { traceEvents: events };
    };
    module_.exports.download = () => {
        const a = document.createElement('a');
        a.download = 'trace.json';
        a.href = 'data:text/plain;base64,' + btoa(JSON.stringify(module_.exports.save()));
        a.click();
    };
    module_.exports.now = now;
    module_.exports.stream = (callback, predicate) => {
        // Once we start streaming we no longer keep events in memory.
        events.length = 0;
        streamingCallbacks.push({ callback, predicate });
    };
    module_.exports.__clearForTests = () => {
        events.length = 0;
        streamingCallbacks.length = 0;
    };
}
init();
//# sourceMappingURL=trace.js.map