/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _build_tracelib_trace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



window.Tracing = _build_tracelib_trace_js__WEBPACK_IMPORTED_MODULE_0__["Tracing"];


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tracing", function() { return Tracing; });
/*
  Copyright 2015 Google Inc. All Rights Reserved.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const events = [];
let pid;
let now;
if (typeof document == 'object') {
  pid = 42;
  now = function() {
    return performance.now() * 1000;
  };
} else {
  pid = process.pid;
  now = function() {
    const t = process.hrtime();
    return t[0] * 1000000 + t[1] / 1000;
  };
}

let flowId = 0;

function parseInfo(info) {
  if (!info) {
    return {};
  }
  if (typeof info == 'function') {
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
    if (streamingCallbacks.length === 0) events.push(event);
    Promise.resolve().then(() => {
      for (const {callback, predicate} of streamingCallbacks) {
          if (!predicate || predicate(event)) callback(event);
      }
    });
}

const module = {exports: {}};
const Tracing = module.exports;
module.exports.enabled = false;
module.exports.enable = function() {
  module.exports.enabled = true;
  init();
};

// TODO: Add back support for options.
//module.exports.options = options;
//var enabled = Boolean(options.traceFile);

function init() {
  const result = {
    wait: async function(v) {
      return v;
    },
    start: function() {
      return this;
    },
    end: function() {
      return this;
    },
    step: function() {
      return this;
    },
    addArgs: function() {
    },
    endWith: async function(v) {
      return v;
    },
  };
  module.exports.wrap = function(info, fn) {
    return fn;
  };
  module.exports.start = function(info, fn) {
    return result;
  };
  module.exports.flow = function(info, fn) {
    return result;
  };

  if (!module.exports.enabled) {
    return;
  }

  module.exports.wrap = function(info, fn) {
    return function(...args) {
      const t = module.exports.start(info);
      try {
        return fn(...args);
      } finally {
        t.end();
      }
    };
  };

  function startSyncTrace(info) {
    info = parseInfo(info);
    let args = info.args;
    const begin = now();
    return {
      addArgs: function(extraArgs) {
        args = Object.assign(args || {}, extraArgs);
      },
      end: function(endInfo = {}, flow) {
        endInfo = parseInfo(endInfo);
        if (endInfo.args) {
          args = Object.assign(args || {}, endInfo.args);
        }
        endInfo = Object.assign({}, info, endInfo);
        this.endTs = now();
        pushEvent({
          ph: 'X',
          ts: begin,
          dur: this.endTs - begin,
          cat: endInfo.cat,
          name: endInfo.name,
          ov: endInfo.overview,
          args: args,
          // Arcs Devtools Specific:
          flowId: flow && flow.id(),
          seq: endInfo.sequence
        });
      },
      beginTs: begin
    };
  }
  module.exports.start = function(info) {
    let trace = startSyncTrace(info);
    let flow;
    const baseInfo = {cat: info.cat, name: info.name + ' (async)', overview: info.overview, sequence: info.sequence};
    return {
      async wait(v, info) {
        const flowExisted = !!flow;
        if (!flowExisted) {
          flow = module.exports.flow(baseInfo);
        }
        trace.end(info, flow);
        if (flowExisted) {
          flow.step(Object.assign({ts: trace.beginTs}, baseInfo));
        } else {
          flow.start({ts: trace.endTs});
        }
        trace = null;
        try {
          return await v;
        } finally {
          trace = startSyncTrace(baseInfo);
        }
      },
      addArgs(extraArgs) {
        trace.addArgs(extraArgs);
      },
      end(endInfo) {
        trace.end(endInfo, flow);
        if (flow) {
          flow.end({ts: trace.beginTs});
        }
      },
      async endWith(v, endInfo) {
        if (Promise.resolve(v) === v) { // If v is a promise.
          v = this.wait(v);
          try {
            return await v;
          } finally {
            this.end(endInfo);
          }
        } else { // If v is not a promise.
          this.end(endInfo);
          return v;
        }
      }
    };
  };
  module.exports.flow = function(info) {
    info = parseInfo(info);
    const id = flowId++;
    let started = false;
    return {
      start: function(startInfo) {
        const ts = (startInfo && startInfo.ts) || now();
        started = true;
        pushEvent({
          ph: 's',
          ts,
          cat: info.cat,
          name: info.name,
          ov: info.overview,
          args: info.args,
          id: id,
          seq: info.sequence
        });
        return this;
      },
      end: function(endInfo) {
        if (!started) return;
        const ts = (endInfo && endInfo.ts) || now();
        endInfo = parseInfo(endInfo);
        pushEvent({
          ph: 'f',
          bp: 'e', // binding point is enclosing slice.
          ts,
          cat: info.cat,
          name: info.name,
          ov: info.overview,
          args: endInfo && endInfo.args,
          id: id,
          seq: info.sequence
        });
        return this;
      },
      step: function(stepInfo) {
        if (!started) return;
        const ts = (stepInfo && stepInfo.ts) || now();
        stepInfo = parseInfo(stepInfo);
        pushEvent({
          ph: 't',
          ts,
          cat: info.cat,
          name: info.name,
          ov: info.overview,
          args: stepInfo && stepInfo.args,
          id: id,
          seq: info.sequence
        });
        return this;
      },
      id: () => id
    };
  };
  module.exports.save = function() {
    return {traceEvents: events};
  };
  module.exports.download = function() {
    const a = document.createElement('a');
    a.download = 'trace.json';
    a.href = 'data:text/plain;base64,' + btoa(JSON.stringify(module.exports.save()));
    a.click();
  };
  module.exports.now = now;
  module.exports.stream = function(callback, predicate) {
    // Once we start streaming we no longer keep events in memory.
    events.length = 0;
    streamingCallbacks.push({callback, predicate});
  };
  module.exports.__clearForTests = function() {
    events.length = 0;
    streamingCallbacks.length = 0;
  };
}

init();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
//# sourceMappingURL=Tracelib.js.map