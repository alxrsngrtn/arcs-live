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
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _build_runtime_particle_execution_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _build_platform_loader_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var _build_runtime_id_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





self.onmessage = function(e) {
  self.onmessage = null;
  const {id, base, logLevel} = e.data;
  // TODO(sjmiles): happens too late for modules that immediately construct loggers, but
  // soon enough for `log` injected into Particle.
  global.logLevel = logLevel;
  new _build_runtime_particle_execution_context_js__WEBPACK_IMPORTED_MODULE_0__["ParticleExecutionContext"](e.ports[0], _build_runtime_id_js__WEBPACK_IMPORTED_MODULE_2__["Id"].fromString(id), _build_runtime_id_js__WEBPACK_IMPORTED_MODULE_2__["IdGenerator"].newSession(), new _build_platform_loader_web_js__WEBPACK_IMPORTED_MODULE_1__["PlatformLoader"](base));
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticleExecutionContext", function() { return ParticleExecutionContext; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _api_channel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _slot_proxy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(24);
/* harmony import */ var _storage_proxy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);
/* harmony import */ var _wasm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







class ParticleExecutionContext {
    constructor(port, pecId, idGenerator, loader) {
        this.particles = [];
        this.pendingLoads = [];
        this.scheduler = new _storage_proxy_js__WEBPACK_IMPORTED_MODULE_4__["StorageProxyScheduler"]();
        this.keyedProxies = {};
        this.wasmContainers = {};
        const pec = this;
        this.apiPort = new class extends _api_channel_js__WEBPACK_IMPORTED_MODULE_1__["PECInnerPort"] {
            onDefineHandle(identifier, type, name) {
                return _storage_proxy_js__WEBPACK_IMPORTED_MODULE_4__["StorageProxy"].newProxy(identifier, type, this, pec, pec.scheduler, name);
            }
            onGetBackingStoreCallback(callback, type, name, id, storageKey) {
                const proxy = _storage_proxy_js__WEBPACK_IMPORTED_MODULE_4__["StorageProxy"].newProxy(id, type, this, pec, pec.scheduler, name);
                proxy.storageKey = storageKey;
                return [proxy, () => callback(proxy, storageKey)];
            }
            onCreateHandleCallback(callback, type, name, id) {
                const proxy = _storage_proxy_js__WEBPACK_IMPORTED_MODULE_4__["StorageProxy"].newProxy(id, type, this, pec, pec.scheduler, name);
                return [proxy, () => callback(proxy)];
            }
            onMapHandleCallback(callback, id) {
                return [id, () => callback(id)];
            }
            onCreateSlotCallback(callback, hostedSlotId) {
                return [hostedSlotId, () => callback(hostedSlotId)];
            }
            onInnerArcRender(transformationParticle, transformationSlotName, hostedSlotId, content) {
                transformationParticle.renderHostedSlot(transformationSlotName, hostedSlotId, content);
            }
            onStop() {
                if (global['close']) {
                    global['close']();
                }
            }
            async onInstantiateParticle(id, spec, proxies) {
                return pec.instantiateParticle(id, spec, proxies);
            }
            onSimpleCallback(callback, data) {
                callback(data);
            }
            onConstructArcCallback(callback, arc) {
                callback(arc);
            }
            onAwaitIdle(version) {
                pec.idle.then(a => {
                    // TODO: dom-particles update is async, this is a workaround to allow dom-particles to
                    // update relevance, after handles are updated. Needs better idle signal.
                    setTimeout(() => this.Idle(version, pec.relevance), 0);
                });
            }
            onUIEvent(particle, slotName, event) {
                particle.fireEvent(slotName, event);
            }
            onStartRender(particle, slotName, providedSlots, contentTypes) {
                particle.addSlotProxy(new _slot_proxy_js__WEBPACK_IMPORTED_MODULE_3__["SlotProxy"](this, particle, slotName, providedSlots));
                particle.renderSlot(slotName, contentTypes);
            }
            onStopRender(particle, slotName) {
                Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(particle.hasSlotProxy(slotName), `Stop render called for particle ${particle.spec.name} slot ${slotName} without start render being called.`);
                particle.removeSlotProxy(slotName);
            }
        }(port);
        this.pecId = pecId;
        this.idGenerator = idGenerator;
        this.loader = loader;
        loader.setParticleExecutionContext(this);
        /*
         * This code ensures that the relevant types are known
         * in the scope object, because otherwise we can't do
         * particleSpec resolution, which is currently a necessary
         * part of particle construction.
         *
         * Possibly we should eventually consider having particle
         * specifications separated from particle classes - and
         * only keeping type information on the arc side.
         */
    }
    generateID() {
        return this.idGenerator.newChildId(this.pecId).toString();
    }
    innerArcHandle(arcId, particleId) {
        const pec = this;
        return {
            async createHandle(type, name, hostParticle) {
                return new Promise((resolve, reject) => pec.apiPort.ArcCreateHandle(proxy => {
                    const handle = Object(_handle_js__WEBPACK_IMPORTED_MODULE_2__["handleFor"])(proxy, pec.idGenerator, name, particleId);
                    resolve(handle);
                    if (hostParticle) {
                        proxy.register(hostParticle, handle);
                    }
                }, arcId, type, name));
            },
            async mapHandle(handle) {
                return new Promise((resolve, reject) => pec.apiPort.ArcMapHandle(id => {
                    resolve(id);
                }, arcId, handle)); // recipe handle vs not?
            },
            async createSlot(transformationParticle, transformationSlotName, handleId) {
                // handleId: the ID of a handle (returned by `createHandle` above) this slot is rendering; null - if not applicable.
                // TODO: support multiple handle IDs.
                return new Promise((resolve, reject) => pec.apiPort.ArcCreateSlot(hostedSlotId => resolve(hostedSlotId), arcId, transformationParticle, transformationSlotName, handleId));
            },
            async loadRecipe(recipe) {
                // TODO: do we want to return a promise on completion?
                return new Promise((resolve, reject) => pec.apiPort.ArcLoadRecipe(arcId, recipe, response => {
                    if (response.error) {
                        reject(response.error);
                    }
                    else {
                        resolve(response);
                    }
                }));
            }
        };
    }
    getStorageProxy(storageKey, type) {
        if (!this.keyedProxies[storageKey]) {
            this.keyedProxies[storageKey] = new Promise((resolve, reject) => {
                this.apiPort.GetBackingStore((proxy, storageKey) => {
                    this.keyedProxies[storageKey] = proxy;
                    resolve(proxy);
                }, storageKey, type);
            });
        }
        return this.keyedProxies[storageKey];
    }
    defaultCapabilitySet() {
        return {
            constructInnerArc: async (particle) => {
                return new Promise((resolve, reject) => this.apiPort.ConstructInnerArc(arcId => resolve(this.innerArcHandle(arcId, particle.id)), particle));
            },
            // TODO(sjmiles): experimental `services` impl
            serviceRequest: (particle, args, callback) => {
                this.apiPort.ServiceRequest(particle, args, callback);
            }
        };
    }
    // tslint:disable-next-line: no-any
    async instantiateParticle(id, spec, proxies) {
        let resolve;
        const p = new Promise(res => resolve = res);
        this.pendingLoads.push(p);
        let particle;
        if (spec.implFile && spec.implFile.endsWith('.wasm')) {
            particle = await this.loadWasmParticle(spec);
            particle.setCapabilities({});
        }
        else {
            const clazz = await this.loader.loadParticleClass(spec);
            particle = new clazz();
            particle.setCapabilities(this.defaultCapabilitySet());
        }
        this.particles.push(particle);
        const handleMap = new Map();
        const registerList = [];
        proxies.forEach((proxy, name) => {
            const connSpec = spec.handleConnectionMap.get(name);
            const handle = Object(_handle_js__WEBPACK_IMPORTED_MODULE_2__["handleFor"])(proxy, this.idGenerator, name, id, connSpec.isInput, connSpec.isOutput);
            handleMap.set(name, handle);
            // Defer registration of handles with proxies until after particles have a chance to
            // configure them in setHandles.
            registerList.push({ proxy, particle, handle });
        });
        return [particle, async () => {
                await particle.callSetHandles(handleMap, err => {
                    const exc = new _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_6__["UserException"](err, 'setHandles', id, spec.name);
                    this.apiPort.ReportExceptionInHost(exc);
                });
                registerList.forEach(({ proxy, particle, handle }) => proxy.register(particle, handle));
                const idx = this.pendingLoads.indexOf(p);
                this.pendingLoads.splice(idx, 1);
                resolve();
            }];
    }
    async loadWasmParticle(spec) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(spec.name.length > 0);
        let container = this.wasmContainers[spec.implFile];
        if (!container) {
            const buffer = await this.loader.loadBinary(spec.implFile);
            if (!buffer || buffer.byteLength === 0) {
                throw new Error(`Failed to load binary file '${spec.implFile}'`);
            }
            container = new _wasm_js__WEBPACK_IMPORTED_MODULE_5__["WasmContainer"]();
            await container.initialize(buffer);
            this.wasmContainers[spec.implFile] = container;
        }
        // Particle constructor expects spec to be attached to the class object (and attaches it to
        // the particle instance at that time).
        _wasm_js__WEBPACK_IMPORTED_MODULE_5__["WasmParticle"].spec = spec;
        const particle = new _wasm_js__WEBPACK_IMPORTED_MODULE_5__["WasmParticle"](container);
        _wasm_js__WEBPACK_IMPORTED_MODULE_5__["WasmParticle"].spec = null;
        return particle;
    }
    get relevance() {
        const rMap = new Map();
        this.particles.forEach(p => {
            if (p.relevances.length === 0) {
                return;
            }
            rMap.set(p, p.relevances);
            p.relevances.length = 0; // truncate
        });
        return rMap;
    }
    get busy() {
        if (this.pendingLoads.length > 0 || this.scheduler.busy) {
            return true;
        }
        if (this.particles.filter(particle => particle.busy).length > 0) {
            return true;
        }
        return false;
    }
    get idle() {
        if (!this.busy) {
            return Promise.resolve();
        }
        const busyParticlePromises = this.particles.filter(async (particle) => particle.busy).map(async (particle) => particle.idle);
        return Promise.all([this.scheduler.idle, ...this.pendingLoads, ...busyParticlePromises]).then(() => this.idle);
    }
}
//# sourceMappingURL=particle-execution-context.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
function assert(test, message) {
    if (!test) {
        if (typeof window !== 'object') {
            // tslint:disable-next-line: no-debugger
            debugger; // eslint-disable-line no-debugger
        }
        throw new Error(message);
    }
}
//# sourceMappingURL=assert-web.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APIPort", function() { return APIPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PECOuterPort", function() { return PECOuterPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PECInnerPort", function() { return PECInnerPort; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _particle_spec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var MappingType;
(function (MappingType) {
    MappingType[MappingType["Mapped"] = 0] = "Mapped";
    MappingType[MappingType["LocalMapped"] = 1] = "LocalMapped";
    MappingType[MappingType["RemoteMapped"] = 2] = "RemoteMapped";
    MappingType[MappingType["Direct"] = 3] = "Direct";
    MappingType[MappingType["ObjectMap"] = 4] = "ObjectMap";
    MappingType[MappingType["List"] = 5] = "List";
    MappingType[MappingType["ByLiteral"] = 6] = "ByLiteral";
})(MappingType || (MappingType = {}));
const targets = new Map();
function setPropertyKey(target, propertyKey) {
    let map = targets.get(target);
    if (map == undefined) {
        map = new Map();
        targets.set(target, map);
    }
    let list = map.get(propertyKey);
    if (list == undefined) {
        list = [];
        map.set(propertyKey, list);
    }
    return list;
}
function getPropertyKey(target, propertyKey, parameterIndex) {
    const map = targets.get(target);
    if (map) {
        const list = map.get(propertyKey);
        if (list) {
            const result = list[parameterIndex];
            if (result) {
                return result;
            }
        }
    }
    throw new Error(`the target ${target}, propertyKey ${propertyKey} and parameterIndex ${parameterIndex} provided did not exist`);
}
function set(target, propertyKey, parameterIndex, info) {
    const list = setPropertyKey(target, propertyKey);
    list[parameterIndex] = info;
}
function Direct(target, propertyKey, parameterIndex) {
    set(target.constructor, propertyKey, parameterIndex, { type: MappingType.Direct });
}
function Mapped(target, propertyKey, parameterIndex) {
    set(target.constructor, propertyKey, parameterIndex, { type: MappingType.Mapped });
}
function ByLiteral(constructor) {
    return (target, propertyKey, parameterIndex) => {
        const info = { type: MappingType.ByLiteral, converter: constructor };
        set(target.constructor, propertyKey, parameterIndex, info);
    };
}
function ObjectMap(key, value) {
    return (target, propertyKey, parameterIndex) => {
        const info = { type: MappingType.ObjectMap, key: { type: key }, value: { type: value } };
        set(target.constructor, propertyKey, parameterIndex, info);
    };
}
function List(value) {
    return (target, propertyKey, parameterIndex) => {
        const info = { type: MappingType.List, value: { type: value } };
        set(target.constructor, propertyKey, parameterIndex, info);
    };
}
function LocalMapped(target, propertyKey, parameterIndex) {
    set(target.constructor, propertyKey, parameterIndex, { type: MappingType.LocalMapped });
}
function RemoteMapped(target, propertyKey, parameterIndex) {
    set(target.constructor, propertyKey, parameterIndex, { type: MappingType.RemoteMapped });
}
function NoArgs(target, propertyKey) {
    setPropertyKey(target.constructor, propertyKey);
}
function RedundantInitializer(target, propertyKey, parameterIndex) {
    set(target.constructor, propertyKey, parameterIndex, { type: MappingType.Direct, initializer: true, redundant: true });
}
function Initializer(target, propertyKey, parameterIndex) {
    set(target.constructor, propertyKey, parameterIndex, { type: MappingType.Direct, initializer: true });
}
function Identifier(target, propertyKey, parameterIndex) {
    getPropertyKey(target.constructor, propertyKey, parameterIndex).identifier = true;
}
function RemoteIgnore(target, propertyKey, parameterIndex) {
    getPropertyKey(target.constructor, propertyKey, parameterIndex).ignore = true;
}
class ThingMapper {
    constructor(prefix) {
        this._prefix = prefix;
        this._nextIdentifier = 0;
        this._idMap = new Map();
        this._reverseIdMap = new Map();
    }
    _newIdentifier() {
        return this._prefix + (this._nextIdentifier++);
    }
    createMappingForThing(thing, requestedId = undefined) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this._reverseIdMap.has(thing));
        let id;
        if (requestedId) {
            id = requestedId;
        }
        else if (thing.apiChannelMappingId) {
            id = thing.apiChannelMappingId;
        }
        else {
            id = this._newIdentifier();
        }
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this._idMap.has(id), `${requestedId ? 'requestedId' : (thing.apiChannelMappingId ? 'apiChannelMappingId' : 'newIdentifier()')} ${id} already in use`);
        // TODO: Awaiting this promise causes tests to fail...
        Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["floatingPromiseToAudit"])(this.establishThingMapping(id, thing));
        return id;
    }
    maybeCreateMappingForThing(thing) {
        if (this.hasMappingForThing(thing)) {
            return this.identifierForThing(thing);
        }
        return this.createMappingForThing(thing);
    }
    async establishThingMapping(id, thing) {
        let continuation;
        if (Array.isArray(thing)) {
            [thing, continuation] = thing;
        }
        this._idMap.set(id, thing);
        if (thing instanceof Promise) {
            Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(continuation == null);
            await this.establishThingMapping(id, await thing);
        }
        else {
            this._reverseIdMap.set(thing, id);
            if (continuation) {
                await continuation();
            }
        }
    }
    hasMappingForThing(thing) {
        return this._reverseIdMap.has(thing);
    }
    identifierForThing(thing) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this._reverseIdMap.has(thing), `Missing thing [${thing}]`);
        return this._reverseIdMap.get(thing);
    }
    thingForIdentifier(id) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this._idMap.has(id), `Missing id: ${id}`);
        return this._idMap.get(id);
    }
}
class APIPort {
    constructor(messagePort, prefix) {
        this._port = messagePort;
        this._mapper = new ThingMapper(prefix);
        this._port.onmessage = async (e) => this._processMessage(e);
        this.inspector = null;
        this.attachStack = false;
        this.messageCount = 0;
        this._testingHook();
    }
    // Overridden by unit tests.
    _testingHook() {
    }
    close() {
        this._port.close();
    }
    async _processMessage(e) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this['before' + e.data.messageType] !== undefined);
        const count = this.messageCount++;
        if (this.inspector) {
            this.inspector.pecMessage('on' + e.data.messageType, e.data.messageBody, count, e.data.stack);
        }
        this['before' + e.data.messageType](e.data.messageBody);
    }
    send(name, args) {
        const call = { messageType: name, messageBody: args, stack: this.attachStack ? new Error().stack : undefined };
        const count = this.messageCount++;
        if (this.inspector) {
            this.inspector.pecMessage(name, args, count, new Error().stack || '');
        }
        this._port.postMessage(call);
    }
}
// The horror. From https://davidwalsh.name/javascript-arguments
function getArgs(func) {
    // First match everything inside the function argument parens.
    const args = func.toString().match(/.*?\(([^)]*)\)/)[1];
    // Split the arguments string into an array comma delimited.
    return args.split(',').map((arg) => {
        // Ensure no inline comments are parsed and trim the whitespace.
        return arg.replace(/\/\*.*\*\//, '').trim();
        // Ensure no undefined values are added.
    }).filter((arg) => arg);
}
// value is covariant with info, and errors will be found
// at start of runtime.
// tslint:disable-next-line: no-any
function convert(info, value, mapper) {
    if (info === undefined) {
        return;
    }
    switch (info.type) {
        case MappingType.Mapped:
            return mapper.identifierForThing(value);
        case MappingType.LocalMapped:
            return mapper.maybeCreateMappingForThing(value);
        case MappingType.RemoteMapped:
            // This is on the local side, so we don't do anything here.
            return value;
        case MappingType.Direct:
            return value;
        case MappingType.ObjectMap: {
            const r = {};
            value.forEach((childvalue, key) => r[convert(info.key, key, mapper)] = convert(info.value, childvalue, mapper));
            return r;
        }
        case MappingType.List:
            return value.map(v => convert(info.value, v, mapper));
        case MappingType.ByLiteral:
            return value.toLiteral();
        default:
            throw new Error(`Can't yet send MappingType ${info.type}`);
    }
}
// value is covariant with info, and errors will be found
// at start of runtime.
// tslint:disable-next-line: no-any
function unconvert(info, value, mapper) {
    if (info === undefined) {
        return;
    }
    switch (info.type) {
        case MappingType.Mapped:
            return mapper.thingForIdentifier(value);
        case MappingType.LocalMapped:
            // This is on the remote side, so we don't do anything here.
            return value;
        case MappingType.RemoteMapped:
            return mapper.thingForIdentifier(value);
        case MappingType.Direct:
            return value;
        case MappingType.ObjectMap: {
            const r = new Map();
            for (const key of Object.keys(value)) {
                r.set(unconvert(info.key, key, mapper), unconvert(info.value, value[key], mapper));
            }
            return r;
        }
        case MappingType.List:
            return value.map(v => unconvert(info.value, v, mapper));
        case MappingType.ByLiteral:
            if (!info.converter) {
                throw new Error(`Expected ${info.type} to have a converter but it doesn't`);
            }
            return info.converter.fromLiteral(value);
        default:
            throw new Error(`Can't yet recieve MappingType ${info.type}`);
    }
}
function AutoConstruct(target) {
    return (constructor) => {
        const doConstruct = (me, other) => {
            const functions = targets.get(me) || new Map();
            for (const f of functions.keys()) {
                const argNames = getArgs(me.prototype[f]);
                const descriptor = functions.get(f) || [];
                // If this descriptor is for an initializer, record that fact and we'll process it after
                // the rest of the arguments.
                const initializer = descriptor.findIndex(d => d.initializer || false);
                // If this descriptor records that this argument is the identifier, record it
                // as the requestedId for mapping below.
                const requestedId = descriptor.findIndex(d => d.identifier || false);
                /** @this APIPort */
                const impl = function (...args) {
                    const messageBody = {};
                    for (let i = 0; i < descriptor.length; i++) {
                        if (i === initializer) {
                            continue;
                        }
                        // Process this argument.
                        messageBody[argNames[i]] = convert(descriptor[i], args[i], this._mapper);
                    }
                    // Process the initializer if present.
                    if (initializer !== -1) {
                        if (descriptor[initializer].redundant) {
                            Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(requestedId === -1);
                            messageBody['identifier'] = this._mapper.maybeCreateMappingForThing(args[initializer]);
                        }
                        else {
                            messageBody['identifier'] = this._mapper.createMappingForThing(args[initializer], args[requestedId]);
                        }
                    }
                    this.send(f, messageBody);
                };
                /** @this APIPort */
                const before = async function before(messageBody) {
                    const args = [];
                    const promises = [];
                    for (let i = 0; i < descriptor.length; i++) {
                        // If there's a requestedId then the receiving end won't expect to
                        // see the identifier as well.
                        if (i === initializer && (requestedId !== -1 || descriptor[i].ignore)) {
                            continue;
                        }
                        const argName = i === initializer ? 'identifier' : argNames[i];
                        const result = unconvert(descriptor[i], messageBody[argName], this._mapper);
                        if (result instanceof Promise) {
                            promises.push({ promise: result, position: args.length });
                            args.push(() => unconvert(descriptor[i], messageBody[argName], this._mapper));
                        }
                        else {
                            args.push(result);
                        }
                    }
                    if (promises.length > 0) {
                        await Promise.all(promises.map(async (a) => a.promise));
                        promises.forEach(a => {
                            args[a.position] = args[a.position]();
                        });
                    }
                    const result = this['on' + f](...args);
                    // If this message is an initializer, need to establish a mapping
                    // with the result of processing the message.
                    if (initializer > -1) {
                        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(messageBody['identifier']);
                        await this._mapper.establishThingMapping(messageBody['identifier'], result);
                    }
                };
                Object.defineProperty(me.prototype, f, {
                    get() {
                        return impl;
                    }
                });
                Object.defineProperty(other.prototype, 'before' + f, {
                    get() {
                        return before;
                    }
                });
            }
        };
        doConstruct(constructor, target);
        doConstruct(target, constructor);
    };
}
class PECOuterPort extends APIPort {
    constructor(messagePort, arc) {
        super(messagePort, 'o');
        this.inspector = arc.inspector;
        if (this.inspector) {
            this.inspector.onceActive.then(() => this.DevToolsConnected(), e => console.error(e));
        }
    }
    Stop() { }
    DefineHandle(store, type, name) { }
    InstantiateParticle(particle, id, spec, stores) { }
    UIEvent(particle, slotName, event) { }
    SimpleCallback(callback, data) { }
    AwaitIdle(version) { }
    StartRender(particle, slotName, providedSlots, contentTypes) { }
    StopRender(particle, slotName) { }
    GetBackingStoreCallback(store, callback, type, name, id, storageKey) { }
    ConstructArcCallback(callback, arc) { }
    CreateHandleCallback(handle, callback, type, name, id) { }
    MapHandleCallback(newHandle, callback, id) { }
    CreateSlotCallback(slot, callback, hostedSlotId) { }
    InnerArcRender(transformationParticle, transformationSlotName, hostedSlotId, content) { }
    // We need an API call to tell the context side that DevTools has been connected, so it can start sending
    // stack traces attached to the API calls made from that side.
    DevToolsConnected() { }
}
__decorate([
    NoArgs
], PECOuterPort.prototype, "Stop", null);
__decorate([
    __param(0, RedundantInitializer), __param(1, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_2__["Type"])), __param(2, Direct)
], PECOuterPort.prototype, "DefineHandle", null);
__decorate([
    __param(0, Initializer), __param(1, Identifier), __param(1, Direct), __param(2, ByLiteral(_particle_spec_js__WEBPACK_IMPORTED_MODULE_1__["ParticleSpec"])), __param(3, ObjectMap(MappingType.Direct, MappingType.Mapped))
], PECOuterPort.prototype, "InstantiateParticle", null);
__decorate([
    __param(0, Mapped), __param(1, Direct), __param(2, Direct)
], PECOuterPort.prototype, "UIEvent", null);
__decorate([
    __param(0, RemoteMapped), __param(1, Direct)
], PECOuterPort.prototype, "SimpleCallback", null);
__decorate([
    __param(0, Direct)
], PECOuterPort.prototype, "AwaitIdle", null);
__decorate([
    __param(0, Mapped), __param(1, Direct), __param(2, ObjectMap(MappingType.Direct, MappingType.Direct)), __param(3, List(MappingType.Direct))
], PECOuterPort.prototype, "StartRender", null);
__decorate([
    __param(0, Mapped), __param(1, Direct)
], PECOuterPort.prototype, "StopRender", null);
__decorate([
    __param(0, Initializer), __param(1, RemoteMapped), __param(2, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_2__["Type"])), __param(3, Direct), __param(4, Identifier), __param(4, Direct), __param(5, Direct)
], PECOuterPort.prototype, "GetBackingStoreCallback", null);
__decorate([
    __param(0, RemoteMapped), __param(1, LocalMapped)
], PECOuterPort.prototype, "ConstructArcCallback", null);
__decorate([
    __param(0, Initializer), __param(1, RemoteMapped), __param(2, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_2__["Type"])), __param(3, Direct), __param(4, Identifier), __param(4, Direct)
], PECOuterPort.prototype, "CreateHandleCallback", null);
__decorate([
    __param(0, RemoteIgnore), __param(0, Initializer), __param(1, RemoteMapped), __param(2, Direct)
], PECOuterPort.prototype, "MapHandleCallback", null);
__decorate([
    __param(0, RemoteIgnore), __param(0, Initializer), __param(1, RemoteMapped), __param(2, Direct)
], PECOuterPort.prototype, "CreateSlotCallback", null);
__decorate([
    __param(0, Mapped), __param(1, Direct), __param(2, Direct), __param(3, Direct)
], PECOuterPort.prototype, "InnerArcRender", null);
__decorate([
    NoArgs
], PECOuterPort.prototype, "DevToolsConnected", null);
let PECInnerPort = class PECInnerPort extends APIPort {
    constructor(messagePort) {
        super(messagePort, 'i');
    }
    Render(particle, slotName, content) { }
    InitializeProxy(handle, callback) { }
    SynchronizeProxy(handle, callback) { }
    HandleGet(handle, callback) { }
    HandleToList(handle, callback) { }
    HandleSet(handle, data, particleId, barrier) { }
    HandleClear(handle, particleId, barrier) { }
    HandleStore(handle, callback, data, particleId) { }
    HandleRemove(handle, callback, data, particleId) { }
    HandleRemoveMultiple(handle, callback, data, particleId) { }
    HandleStream(handle, callback, pageSize, forward) { }
    StreamCursorNext(handle, callback, cursorId) { }
    StreamCursorClose(handle, cursorId) { }
    Idle(version, relevance) { }
    GetBackingStore(callback, storageKey, type) { }
    ConstructInnerArc(callback, particle) { }
    ArcCreateHandle(callback, arc, type, name) { }
    ArcMapHandle(callback, arc, handle) { }
    // TODO(sjmiles): experimental `services` impl
    ServiceRequest(particle, content, callback) { }
    ArcCreateSlot(callback, arc, transformationParticle, transformationSlotName, handleId) { }
    ArcLoadRecipe(arc, recipe, callback) { }
    ReportExceptionInHost(exception) { }
    // To show stack traces for calls made inside the context, we need to capture the trace at the call point and
    // send it along with the message. We only want to do this after a DevTools connection has been detected, which
    // we can't directly detect inside a worker context, so the PECOuterPort will send an API message instead.
    onDevToolsConnected() {
        this.attachStack = true;
    }
};
__decorate([
    __param(0, Mapped), __param(1, Direct), __param(2, Direct)
], PECInnerPort.prototype, "Render", null);
__decorate([
    __param(0, Mapped), __param(1, LocalMapped)
], PECInnerPort.prototype, "InitializeProxy", null);
__decorate([
    __param(0, Mapped), __param(1, LocalMapped)
], PECInnerPort.prototype, "SynchronizeProxy", null);
__decorate([
    __param(0, Mapped), __param(1, LocalMapped)
], PECInnerPort.prototype, "HandleGet", null);
__decorate([
    __param(0, Mapped), __param(1, LocalMapped)
], PECInnerPort.prototype, "HandleToList", null);
__decorate([
    __param(0, Mapped), __param(1, Direct), __param(2, Direct), __param(3, Direct)
], PECInnerPort.prototype, "HandleSet", null);
__decorate([
    __param(0, Mapped), __param(1, Direct), __param(2, Direct)
], PECInnerPort.prototype, "HandleClear", null);
__decorate([
    __param(0, Mapped), __param(1, LocalMapped), __param(2, Direct), __param(3, Direct)
], PECInnerPort.prototype, "HandleStore", null);
__decorate([
    __param(0, Mapped), __param(1, LocalMapped), __param(2, Direct), __param(3, Direct)
], PECInnerPort.prototype, "HandleRemove", null);
__decorate([
    __param(0, Mapped), __param(1, LocalMapped), __param(2, Direct), __param(3, Direct)
], PECInnerPort.prototype, "HandleRemoveMultiple", null);
__decorate([
    __param(0, Mapped), __param(1, LocalMapped), __param(2, Direct), __param(3, Direct)
], PECInnerPort.prototype, "HandleStream", null);
__decorate([
    __param(0, Mapped), __param(1, LocalMapped), __param(2, Direct)
], PECInnerPort.prototype, "StreamCursorNext", null);
__decorate([
    __param(0, Mapped), __param(1, Direct)
], PECInnerPort.prototype, "StreamCursorClose", null);
__decorate([
    __param(0, Direct), __param(1, ObjectMap(MappingType.Mapped, MappingType.Direct))
], PECInnerPort.prototype, "Idle", null);
__decorate([
    __param(0, LocalMapped), __param(1, Direct), __param(2, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_2__["Type"]))
], PECInnerPort.prototype, "GetBackingStore", null);
__decorate([
    __param(0, LocalMapped), __param(1, Mapped)
], PECInnerPort.prototype, "ConstructInnerArc", null);
__decorate([
    __param(0, LocalMapped), __param(1, RemoteMapped), __param(2, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_2__["Type"])), __param(3, Direct)
], PECInnerPort.prototype, "ArcCreateHandle", null);
__decorate([
    __param(0, LocalMapped), __param(1, RemoteMapped), __param(2, Mapped)
], PECInnerPort.prototype, "ArcMapHandle", null);
__decorate([
    __param(0, Mapped), __param(1, Direct), __param(2, LocalMapped)
], PECInnerPort.prototype, "ServiceRequest", null);
__decorate([
    __param(0, LocalMapped), __param(1, RemoteMapped), __param(2, Mapped), __param(3, Direct), __param(4, Direct)
], PECInnerPort.prototype, "ArcCreateSlot", null);
__decorate([
    __param(0, RemoteMapped), __param(1, Direct), __param(2, LocalMapped)
], PECInnerPort.prototype, "ArcLoadRecipe", null);
__decorate([
    __param(0, ByLiteral(_arc_exceptions_js__WEBPACK_IMPORTED_MODULE_3__["PropagatedException"]))
], PECInnerPort.prototype, "ReportExceptionInHost", null);
PECInnerPort = __decorate([
    AutoConstruct(PECOuterPort)
], PECInnerPort);

//# sourceMappingURL=api-channel.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandleConnectionSpec", function() { return HandleConnectionSpec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsumeSlotConnectionSpec", function() { return ConsumeSlotConnectionSpec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvideSlotConnectionSpec", function() { return ProvideSlotConnectionSpec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticleSpec", function() { return ParticleSpec; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _modality_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _particle_check_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _particle_claim_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






function asType(t) {
    return (t instanceof _type_js__WEBPACK_IMPORTED_MODULE_3__["Type"]) ? t : _type_js__WEBPACK_IMPORTED_MODULE_3__["Type"].fromLiteral(t);
}
function asTypeLiteral(t) {
    return (t instanceof _type_js__WEBPACK_IMPORTED_MODULE_3__["Type"]) ? t.toLiteral() : t;
}
class HandleConnectionSpec {
    constructor(rawData, typeVarMap) {
        this.parentConnection = null;
        this.rawData = rawData;
        this.direction = rawData.direction;
        this.name = rawData.name;
        this.type = asType(rawData.type).mergeTypeVariablesByName(typeVarMap);
        this.isOptional = rawData.isOptional;
        this.tags = rawData.tags || [];
        this.dependentConnections = [];
    }
    instantiateDependentConnections(particle, typeVarMap) {
        for (const dependentArg of this.rawData.dependentConnections) {
            const dependentConnection = particle.createConnection(dependentArg, typeVarMap);
            dependentConnection.parentConnection = this;
            this.dependentConnections.push(dependentConnection);
        }
    }
    get isInput() {
        // TODO: we probably don't really want host to be here.
        return this.direction === 'in' || this.direction === 'inout' || this.direction === 'host';
    }
    get isOutput() {
        return this.direction === 'out' || this.direction === 'inout';
    }
    isCompatibleType(type) {
        return _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_2__["TypeChecker"].compareTypes({ type }, { type: this.type, direction: this.direction });
    }
}
class ConsumeSlotConnectionSpec {
    constructor(slotModel) {
        this.name = slotModel.name;
        this.isRequired = slotModel.isRequired || false;
        this.isSet = slotModel.isSet || false;
        this.tags = slotModel.tags || [];
        this.formFactor = slotModel.formFactor; // TODO: deprecate form factors?
        this.handles = slotModel.handles || [];
        this.provideSlotConnections = [];
        if (!slotModel.provideSlotConnections) {
            return;
        }
        slotModel.provideSlotConnections.forEach(ps => {
            this.provideSlotConnections.push(new ProvideSlotConnectionSpec(ps));
        });
    }
    // Getters to 'fake' being a Handle.
    get isOptional() { return !this.isRequired; }
    get direction() { return '`consume'; }
    get type() { return _type_js__WEBPACK_IMPORTED_MODULE_3__["SlotType"].make(this.formFactor, null); } //TODO(jopra): FIX THIS NULL!
    get dependentConnections() { return this.provideSlotConnections; }
}
class ProvideSlotConnectionSpec extends ConsumeSlotConnectionSpec {
    constructor(slotModel) {
        super(slotModel);
        this.check = slotModel.check;
    }
}
class ParticleSpec {
    constructor(model) {
        this.model = model;
        this.name = model.name;
        this.verbs = model.verbs;
        const typeVarMap = new Map();
        this.handleConnectionMap = new Map();
        model.args.forEach(arg => this.createConnection(arg, typeVarMap));
        // initialize descriptions patterns.
        model.description = model.description || {};
        this.validateDescription(model.description);
        this.pattern = model.description['pattern'];
        this.handleConnectionMap.forEach((connectionSpec, name) => {
            connectionSpec.pattern = model.description[name];
        });
        this.implFile = model.implFile;
        this.implBlobUrl = model.implBlobUrl;
        this.modality = _modality_js__WEBPACK_IMPORTED_MODULE_1__["Modality"].create(model.modality || []);
        this.slotConnections = new Map();
        if (model.slotConnections) {
            model.slotConnections.forEach(s => this.slotConnections.set(s.name, new ConsumeSlotConnectionSpec(s)));
        }
        // Verify provided slots use valid handle connection names.
        this.slotConnections.forEach(slot => {
            slot.provideSlotConnections.forEach(ps => {
                ps.handles.forEach(v => Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.handleConnectionMap.has(v), 'Cannot provide slot for nonexistent handle constraint ' + v));
            });
        });
        this.trustClaims = this.validateTrustClaims(model.trustClaims);
        this.trustChecks = this.validateTrustChecks(model.trustChecks);
    }
    createConnection(arg, typeVarMap) {
        const connection = new HandleConnectionSpec(arg, typeVarMap);
        this.handleConnectionMap.set(connection.name, connection);
        connection.instantiateDependentConnections(this, typeVarMap);
        return connection;
    }
    get handleConnections() {
        return this.connections;
    }
    get connections() {
        return [...this.handleConnectionMap.values()];
    }
    get inputs() {
        return this.connections.filter(a => a.isInput);
    }
    get outputs() {
        return this.connections.filter(a => a.isOutput);
    }
    isInput(param) {
        const connection = this.handleConnectionMap.get(param);
        return connection && connection.isInput;
    }
    isOutput(param) {
        const connection = this.handleConnectionMap.get(param);
        return connection && connection.isOutput;
    }
    getConnectionByName(name) {
        return this.handleConnectionMap.get(name);
    }
    getSlotSpec(slotName) {
        return this.slotConnections.get(slotName);
    }
    get slotConnectionNames() {
        return [...this.slotConnections.keys()];
    }
    get primaryVerb() {
        return (this.verbs.length > 0) ? this.verbs[0] : undefined;
    }
    isCompatible(modality) {
        return this.slotConnections.size === 0 || this.modality.intersection(modality).isResolved();
    }
    setImplBlobUrl(url) {
        this.model.implBlobUrl = this.implBlobUrl = url;
    }
    toLiteral() {
        const { args, name, verbs, description, implFile, implBlobUrl, modality, slotConnections, trustClaims, trustChecks } = this.model;
        const connectionToLiteral = ({ type, direction, name, isOptional, dependentConnections }) => ({ type: asTypeLiteral(type), direction, name, isOptional, dependentConnections: dependentConnections.map(connectionToLiteral) });
        const argsLiteral = args.map(a => connectionToLiteral(a));
        return { args: argsLiteral, name, verbs, description, implFile, implBlobUrl, modality, slotConnections, trustClaims, trustChecks };
    }
    static fromLiteral(literal) {
        let { args, name, verbs, description, implFile, implBlobUrl, modality, slotConnections, trustClaims, trustChecks } = literal;
        const connectionFromLiteral = ({ type, direction, name, isOptional, dependentConnections }) => ({ type: asType(type), direction, name, isOptional, dependentConnections: dependentConnections ? dependentConnections.map(connectionFromLiteral) : [] });
        args = args.map(connectionFromLiteral);
        return new ParticleSpec({ args, name, verbs: verbs || [], description, implFile, implBlobUrl, modality, slotConnections, trustClaims, trustChecks });
    }
    // Note: this method shouldn't be called directly.
    clone() {
        return ParticleSpec.fromLiteral(this.toLiteral());
    }
    // Note: this method shouldn't be called directly (only as part of particle copying).
    cloneWithResolutions(variableMap) {
        const spec = this.clone();
        this.handleConnectionMap.forEach((conn, name) => {
            spec.handleConnectionMap.get(name).type = conn.type._cloneWithResolutions(variableMap);
        });
        return spec;
    }
    equals(other) {
        return JSON.stringify(this.toLiteral()) === JSON.stringify(other.toLiteral());
    }
    validateDescription(description) {
        Object.keys(description || []).forEach(d => {
            Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(['kind', 'location', 'pattern'].includes(d) || this.handleConnectionMap.has(d), `Unexpected description for ${d}`);
        });
    }
    toInterface() {
        // TODO: wat do?
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this.slotConnections.size, 'please implement slots toInterface');
        const handles = this.model.args.map(({ type, name, direction }) => ({ type: asType(type), name, direction }));
        const slots = [];
        return _type_js__WEBPACK_IMPORTED_MODULE_3__["InterfaceType"].make(this.name, handles, slots);
    }
    toString() {
        const results = [];
        let verbs = '';
        if (this.verbs.length > 0) {
            verbs = ' ' + this.verbs.map(verb => `&${verb}`).join(' ');
        }
        results.push(`particle ${this.name}${verbs} in '${this.implFile}'`.trim());
        const indent = '  ';
        const writeConnection = (connection, indent) => {
            const tags = connection.tags.map((tag) => ` #${tag}`).join('');
            results.push(`${indent}${connection.direction}${connection.isOptional ? '?' : ''} ${connection.type.toString()} ${connection.name}${tags}`);
            for (const dependent of connection.dependentConnections) {
                writeConnection(dependent, indent + '  ');
            }
        };
        for (const connection of this.handleConnections) {
            if (connection.parentConnection) {
                continue;
            }
            writeConnection(connection, indent);
        }
        this.trustClaims.forEach(claim => results.push(`  ${claim.toManifestString()}`));
        this.trustChecks.forEach(check => results.push(`  ${check.toManifestString()}`));
        this.modality.names.forEach(a => results.push(`  modality ${a}`));
        const slotToString = (s, direction, indent) => {
            const tokens = [];
            if (s.isRequired) {
                tokens.push('must');
            }
            tokens.push(direction);
            if (s.isSet) {
                tokens.push('set of');
            }
            tokens.push(s.name);
            if (s.tags.length > 0) {
                tokens.push(s.tags.map(a => `#${a}`).join(' '));
            }
            results.push(`${indent}${tokens.join(' ')}`);
            if (s.formFactor) {
                results.push(`${indent}  formFactor ${s.formFactor}`);
            }
            for (const handle of s.handles) {
                results.push(`${indent}  handle ${handle}`);
            }
            if (s.provideSlotConnections) {
                // Provided slots.
                s.provideSlotConnections.forEach(p => slotToString(p, 'provide', indent + '  '));
            }
        };
        this.slotConnections.forEach(s => slotToString(s, 'consume', '  '));
        // Description
        if (this.pattern) {
            results.push(`  description \`${this.pattern}\``);
            this.handleConnectionMap.forEach(cs => {
                if (cs.pattern) {
                    results.push(`    ${cs.name} \`${cs.pattern}\``);
                }
            });
        }
        return results.join('\n');
    }
    toManifestString() {
        return this.toString();
    }
    validateTrustClaims(claims) {
        const results = new Map();
        if (claims) {
            claims.forEach(claim => {
                const handle = this.handleConnectionMap.get(claim.handle);
                if (!handle) {
                    throw new Error(`Can't make a claim on unknown handle ${claim.handle}.`);
                }
                if (!handle.isOutput) {
                    throw new Error(`Can't make a claim on handle ${claim.handle} (not an output handle).`);
                }
                if (handle.claim) {
                    throw new Error(`Can't make multiple claims on the same output (${claim.handle}).`);
                }
                handle.claim = Object(_particle_claim_js__WEBPACK_IMPORTED_MODULE_5__["createClaim"])(handle, claim, this.handleConnectionMap);
                results.set(claim.handle, handle.claim);
            });
        }
        return results;
    }
    validateTrustChecks(checks) {
        const results = [];
        if (checks) {
            const providedSlotNames = this.getProvidedSlotsByName();
            checks.forEach(check => {
                switch (check.target.targetType) {
                    case 'handle': {
                        const handleName = check.target.name;
                        const handle = this.handleConnectionMap.get(handleName);
                        if (!handle) {
                            throw new Error(`Can't make a check on unknown handle ${handleName}.`);
                        }
                        if (!handle.isInput) {
                            throw new Error(`Can't make a check on handle ${handleName} (not an input handle).`);
                        }
                        if (handle.check) {
                            throw new Error(`Can't make multiple checks on the same input (${handleName}).`);
                        }
                        handle.check = Object(_particle_check_js__WEBPACK_IMPORTED_MODULE_4__["createCheck"])(handle, check, this.handleConnectionMap);
                        results.push(handle.check);
                        break;
                    }
                    case 'slot': {
                        const slotName = check.target.name;
                        const slotSpec = providedSlotNames.get(slotName);
                        if (!slotSpec) {
                            if (this.slotConnectionNames.includes(slotName)) {
                                throw new Error(`Slot ${slotName} is a consumed slot. Can only make checks on provided slots.`);
                            }
                            else {
                                throw new Error(`Can't make a check on unknown slot ${slotName}.`);
                            }
                        }
                        slotSpec.check = Object(_particle_check_js__WEBPACK_IMPORTED_MODULE_4__["createCheck"])(slotSpec, check, this.handleConnectionMap);
                        results.push(slotSpec.check);
                        break;
                    }
                    default:
                        throw new Error('Unknown check target type.');
                }
            });
        }
        return results;
    }
    getProvidedSlotsByName() {
        const result = new Map();
        for (const consumeConnection of this.slotConnections.values()) {
            for (const provideConnection of consumeConnection.provideSlotConnections) {
                const name = provideConnection.name;
                if (result.has(name)) {
                    throw new Error(`Another slot with name '${name}' has already been provided by this particle.`);
                }
                result.set(name, provideConnection);
            }
        }
        return result;
    }
}
//# sourceMappingURL=particle-spec.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modality", function() { return Modality; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

var ModalityName;
(function (ModalityName) {
    ModalityName["Dom"] = "dom";
    ModalityName["DomTouch"] = "dom-touch";
    ModalityName["Vr"] = "vr";
    ModalityName["Voice"] = "voice";
})(ModalityName || (ModalityName = {}));
class Modality {
    constructor(names) {
        this.names = names;
    }
    static create(names) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(names.every(name => Modality.all.names.includes(name)), `Unsupported modality in: ${names}`);
        return new Modality(names);
    }
    intersection(other) {
        return new Modality(this.names.filter(name => other.names.includes(name)));
    }
    isResolved() {
        return this.names.length > 0;
    }
    isCompatible(names) {
        return this.intersection(Modality.create(names)).isResolved();
    }
    static get Name() { return ModalityName; }
}
Modality.all = new Modality([
    Modality.Name.Dom, Modality.Name.DomTouch, Modality.Name.Vr, Modality.Name.Voice
]);
Modality.dom = new Modality([Modality.Name.Dom]);
Modality.domTouch = new Modality([Modality.Name.DomTouch]);
Modality.voice = new Modality([Modality.Name.Voice]);
Modality.vr = new Modality([Modality.Name.Vr]);
//# sourceMappingURL=modality.js.map

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeChecker", function() { return TypeChecker; });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

class TypeChecker {
    // resolve a list of handleConnection types against a handle
    // base type. This is the core type resolution mechanism, but should only
    // be used when types can actually be associated with each other / constrained.
    //
    // By design this function is called exactly once per handle in a recipe during
    // normalization, and should provide the same final answers regardless of the
    // ordering of handles within that recipe
    //
    // NOTE: you probably don't want to call this function, if you think you
    // do, talk to shans@.
    static processTypeList(baseType, list) {
        const newBaseType = _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"].make('', null, null);
        if (baseType) {
            newBaseType.variable.resolution = baseType;
        }
        baseType = newBaseType;
        const concreteTypes = [];
        // baseType might be a variable (and is definitely a variable if no baseType was available).
        // Some of the list might contain variables too.
        // First attempt to merge all the variables into the baseType
        //
        // If the baseType is a variable then this results in a single place to manipulate the constraints
        // of all the other connected variables at the same time.
        for (const item of list) {
            if (item.type.resolvedType().hasVariable) {
                baseType = TypeChecker._tryMergeTypeVariable(baseType, item.type);
                if (baseType == null) {
                    return null;
                }
            }
            else {
                concreteTypes.push(item);
            }
        }
        for (const item of concreteTypes) {
            if (!TypeChecker._tryMergeConstraints(baseType, item)) {
                return null;
            }
        }
        const getResolution = (candidate) => {
            if (!(candidate instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"])) {
                return candidate;
            }
            if (candidate.canReadSubset == null || candidate.canWriteSuperset == null) {
                return candidate;
            }
            if (candidate.canReadSubset.isMoreSpecificThan(candidate.canWriteSuperset)) {
                if (candidate.canWriteSuperset.isMoreSpecificThan(candidate.canReadSubset)) {
                    candidate.variable.resolution = candidate.canReadSubset;
                }
                return candidate;
            }
            return null;
        };
        const candidate = baseType.resolvedType();
        if (candidate.isCollectionType()) {
            const resolution = getResolution(candidate.collectionType);
            return (resolution !== null) ? resolution.collectionOf() : null;
        }
        if (candidate.isBigCollectionType()) {
            const resolution = getResolution(candidate.bigCollectionType);
            return (resolution !== null) ? resolution.bigCollectionOf() : null;
        }
        return getResolution(candidate);
    }
    static _tryMergeTypeVariable(base, onto) {
        const [primitiveBase, primitiveOnto] = _type_js__WEBPACK_IMPORTED_MODULE_0__["Type"].unwrapPair(base.resolvedType(), onto.resolvedType());
        if (primitiveBase instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"]) {
            if (primitiveOnto instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"]) {
                // base, onto both variables.
                const result = primitiveBase.variable.maybeMergeConstraints(primitiveOnto.variable);
                if (result === false) {
                    return null;
                }
                primitiveOnto.variable.resolution = primitiveBase;
            }
            else {
                // base variable, onto not.
                if (!primitiveBase.variable.isValidResolutionCandidate(primitiveOnto).result) {
                    return null;
                }
                primitiveBase.variable.resolution = primitiveOnto;
            }
            return base;
        }
        else if (primitiveOnto instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"]) {
            // onto variable, base not.
            if (!primitiveOnto.variable.isValidResolutionCandidate(primitiveBase).result) {
                return null;
            }
            primitiveOnto.variable.resolution = primitiveBase;
            return onto;
        }
        else if (primitiveBase instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["InterfaceType"] && primitiveOnto instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["InterfaceType"]) {
            const result = primitiveBase.interfaceInfo.tryMergeTypeVariablesWith(primitiveOnto.interfaceInfo);
            if (result == null) {
                return null;
            }
            return new _type_js__WEBPACK_IMPORTED_MODULE_0__["InterfaceType"](result);
        }
        else if ((primitiveBase.isTypeContainer() && primitiveBase.hasVariable)
            || (primitiveOnto.isTypeContainer() && primitiveOnto.hasVariable)) {
            // Cannot merge [~a] with a type that is not a variable and not a collection.
            return null;
        }
        throw new Error('tryMergeTypeVariable shouldn\'t be called on two types without any type variables');
    }
    static _tryMergeConstraints(handleType, { type, direction }) {
        let [primitiveHandleType, primitiveConnectionType] = _type_js__WEBPACK_IMPORTED_MODULE_0__["Type"].unwrapPair(handleType.resolvedType(), type.resolvedType());
        if (primitiveHandleType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"]) {
            while (primitiveConnectionType.isTypeContainer()) {
                if (primitiveHandleType.variable.resolution != null
                    || primitiveHandleType.variable.canReadSubset != null
                    || primitiveHandleType.variable.canWriteSuperset != null) {
                    // Resolved and/or constrained variables can only represent Entities, not sets.
                    return false;
                }
                // If this is an undifferentiated variable then we need to create structure to match against. That's
                // allowed because this variable could represent anything, and it needs to represent this structure
                // in order for type resolution to succeed.
                const newVar = _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"].make('a', null, null);
                if (primitiveConnectionType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["CollectionType"]) {
                    primitiveHandleType.variable.resolution = new _type_js__WEBPACK_IMPORTED_MODULE_0__["CollectionType"](newVar);
                }
                else if (primitiveConnectionType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["BigCollectionType"]) {
                    primitiveHandleType.variable.resolution = new _type_js__WEBPACK_IMPORTED_MODULE_0__["BigCollectionType"](newVar);
                }
                else {
                    primitiveHandleType.variable.resolution = new _type_js__WEBPACK_IMPORTED_MODULE_0__["ReferenceType"](newVar);
                }
                const unwrap = _type_js__WEBPACK_IMPORTED_MODULE_0__["Type"].unwrapPair(primitiveHandleType.resolvedType(), primitiveConnectionType);
                [primitiveHandleType, primitiveConnectionType] = unwrap;
                if (!(primitiveHandleType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"])) {
                    // This should never happen, and the guard above is just here so we type-check.
                    throw new TypeError('unwrapping a wrapped TypeVariable somehow didn\'t become a TypeVariable');
                }
            }
            if (direction === 'out' || direction === 'inout' || direction === '`provide') {
                // the canReadSubset of the handle represents the maximal type that can be read from the
                // handle, so we need to intersect out any type that is more specific than the maximal type
                // that could be written.
                if (!primitiveHandleType.variable.maybeMergeCanReadSubset(primitiveConnectionType.canWriteSuperset)) {
                    return false;
                }
            }
            if (direction === 'in' || direction === 'inout' || direction === '`consume') {
                // the canWriteSuperset of the handle represents the maximum lower-bound type that is read from the handle,
                // so we need to union it with the type that wants to be read here.
                if (!primitiveHandleType.variable.maybeMergeCanWriteSuperset(primitiveConnectionType.canReadSubset)) {
                    return false;
                }
            }
        }
        else {
            if (primitiveConnectionType.tag !== primitiveHandleType.tag) {
                return false;
            }
            if (direction === 'out' || direction === 'inout') {
                if (!TypeChecker._writeConstraintsApply(primitiveHandleType, primitiveConnectionType)) {
                    return false;
                }
            }
            if (direction === 'in' || direction === 'inout') {
                if (!TypeChecker._readConstraintsApply(primitiveHandleType, primitiveConnectionType)) {
                    return false;
                }
            }
        }
        return true;
    }
    static _writeConstraintsApply(handleType, connectionType) {
        // this connection wants to write to this handle. If the written type is
        // more specific than the canReadSubset then it isn't violating the maximal type
        // that can be read.
        const writtenType = connectionType.canWriteSuperset;
        if (writtenType == null || handleType.canReadSubset == null) {
            return true;
        }
        if (writtenType.isMoreSpecificThan(handleType.canReadSubset)) {
            return true;
        }
        return false;
    }
    static _readConstraintsApply(handleType, connectionType) {
        // this connection wants to read from this handle. If the read type
        // is less specific than the canWriteSuperset, then it isn't violating
        // the maximum lower-bound read type.
        const readType = connectionType.canReadSubset;
        if (readType == null || handleType.canWriteSuperset == null) {
            return true;
        }
        if (handleType.canWriteSuperset.isMoreSpecificThan(readType)) {
            return true;
        }
        return false;
    }
    // Compare two types to see if they could be potentially resolved (in the absence of other
    // information). This is used as a filter when selecting compatible handles or checking
    // validity of recipes. This function returning true never implies that full type resolution
    // will succeed, but if the function returns false for a pair of types that are associated
    // then type resolution is guaranteed to fail.
    //
    // left, right: {type, direction, connection}
    static compareTypes(left, right) {
        const resolvedLeft = left.type.resolvedType();
        const resolvedRight = right.type.resolvedType();
        const [leftType, rightType] = _type_js__WEBPACK_IMPORTED_MODULE_0__["Type"].unwrapPair(resolvedLeft, resolvedRight);
        // a variable is compatible with a set only if it is unconstrained.
        if (leftType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"] && rightType.isTypeContainer()) {
            return !(leftType.variable.canReadSubset || leftType.variable.canWriteSuperset);
        }
        if (rightType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"] && leftType.isTypeContainer()) {
            return !(rightType.variable.canReadSubset || rightType.variable.canWriteSuperset);
        }
        if (leftType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"] || rightType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["TypeVariable"]) {
            // TODO: everything should use this, eventually. Need to implement the
            // right functionality in Interfaces first, though.
            return _type_js__WEBPACK_IMPORTED_MODULE_0__["Type"].canMergeConstraints(leftType, rightType);
        }
        if ((leftType === undefined) !== (rightType === undefined)) {
            return false;
        }
        if (leftType === rightType) {
            return true;
        }
        if (leftType.tag !== rightType.tag) {
            return false;
        }
        if (leftType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["SlotType"]) {
            return true;
        }
        // TODO: we need a generic way to evaluate type compatibility
        //       interfaces + entities + etc
        if (leftType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["InterfaceType"] && rightType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["InterfaceType"]) {
            if (leftType.interfaceInfo.equals(rightType.interfaceInfo)) {
                return true;
            }
        }
        if (!(leftType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["EntityType"]) || !(rightType instanceof _type_js__WEBPACK_IMPORTED_MODULE_0__["EntityType"])) {
            return false;
        }
        const leftIsSub = leftType.entitySchema.isMoreSpecificThan(rightType.entitySchema);
        const leftIsSuper = rightType.entitySchema.isMoreSpecificThan(leftType.entitySchema);
        if (leftIsSuper && leftIsSub) {
            return true;
        }
        if (!leftIsSuper && !leftIsSub) {
            return false;
        }
        const [superclass, subclass] = leftIsSuper ? [left, right] : [right, left];
        // treat handle types as if they were 'inout' connections. Note that this
        // guarantees that the handle's type will be preserved, and that the fact
        // that the type comes from a handle rather than a connection will also
        // be preserved.
        const superDirection = superclass.direction || (superclass.connection ? superclass.connection.direction : 'inout');
        const subDirection = subclass.direction || (subclass.connection ? subclass.connection.direction : 'inout');
        if (superDirection === 'in') {
            return true;
        }
        if (subDirection === 'out') {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=type-checker.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Type", function() { return Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityType", function() { return EntityType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeVariable", function() { return TypeVariable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionType", function() { return CollectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BigCollectionType", function() { return BigCollectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelationType", function() { return RelationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterfaceType", function() { return InterfaceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlotType", function() { return SlotType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReferenceType", function() { return ReferenceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcType", function() { return ArcType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandleType", function() { return HandleType; });
/* harmony import */ var _interface_info_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _schema_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _slot_info_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _synthetic_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _type_variable_info_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





class Type {
    constructor(tag) {
        this.tag = tag;
    }
    static fromLiteral(literal) {
        switch (literal.tag) {
            case 'Entity':
                return new EntityType(_schema_js__WEBPACK_IMPORTED_MODULE_1__["Schema"].fromLiteral(literal.data));
            case 'TypeVariable':
                return new TypeVariable(_type_variable_info_js__WEBPACK_IMPORTED_MODULE_4__["TypeVariableInfo"].fromLiteral(literal.data));
            case 'Collection':
                return new CollectionType(Type.fromLiteral(literal.data));
            case 'BigCollection':
                return new BigCollectionType(Type.fromLiteral(literal.data));
            case 'Relation':
                return new RelationType(literal.data.map(t => Type.fromLiteral(t)));
            case 'Interface':
                return new InterfaceType(_interface_info_js__WEBPACK_IMPORTED_MODULE_0__["InterfaceInfo"].fromLiteral(literal.data));
            case 'Slot':
                return new SlotType(_slot_info_js__WEBPACK_IMPORTED_MODULE_2__["SlotInfo"].fromLiteral(literal.data));
            case 'Reference':
                return new ReferenceType(Type.fromLiteral(literal.data));
            case 'Arc':
                return new ArcType();
            case 'Handle':
                return new HandleType();
            default:
                throw new Error(`fromLiteral: unknown type ${literal}`);
        }
    }
    static unwrapPair(type1, type2) {
        if (type1.tag === type2.tag) {
            const contained1 = type1.getContainedType();
            if (contained1 !== null) {
                return Type.unwrapPair(contained1, type2.getContainedType());
            }
        }
        return [type1, type2];
    }
    /** Tests whether two types' constraints are compatible with each other. */
    static canMergeConstraints(type1, type2) {
        return Type._canMergeCanReadSubset(type1, type2) && Type._canMergeCanWriteSuperset(type1, type2);
    }
    static _canMergeCanReadSubset(type1, type2) {
        if (type1.canReadSubset && type2.canReadSubset) {
            if (type1.canReadSubset.tag !== type2.canReadSubset.tag) {
                return false;
            }
            if (type1.canReadSubset instanceof EntityType && type2.canReadSubset instanceof EntityType) {
                return _schema_js__WEBPACK_IMPORTED_MODULE_1__["Schema"].intersect(type1.canReadSubset.entitySchema, type2.canReadSubset.entitySchema) !== null;
            }
            throw new Error(`_canMergeCanReadSubset not implemented for types tagged with ${type1.canReadSubset.tag}`);
        }
        return true;
    }
    static _canMergeCanWriteSuperset(type1, type2) {
        if (type1.canWriteSuperset && type2.canWriteSuperset) {
            if (type1.canWriteSuperset.tag !== type2.canWriteSuperset.tag) {
                return false;
            }
            if (type1.canWriteSuperset instanceof EntityType && type2.canWriteSuperset instanceof EntityType) {
                return _schema_js__WEBPACK_IMPORTED_MODULE_1__["Schema"].union(type1.canWriteSuperset.entitySchema, type2.canWriteSuperset.entitySchema) !== null;
            }
        }
        return true;
    }
    isSlot() {
        return this instanceof SlotType;
    }
    // If you want to type-check fully, this is an improvement over just using
    // this instanceof CollectionType,
    // because instanceof doesn't propagate generic restrictions.
    isCollectionType() {
        return this instanceof CollectionType;
    }
    // If you want to type-check fully, this is an improvement over just using
    // this instaneceof BigCollectionType,
    // because instanceof doesn't propagate generic restrictions.
    isBigCollectionType() {
        return this instanceof BigCollectionType;
    }
    isResolved() {
        // TODO: one of these should not exist.
        return !this.hasUnresolvedVariable;
    }
    mergeTypeVariablesByName(variableMap) {
        return this;
    }
    _applyExistenceTypeTest(test) {
        return test(this);
    }
    get hasVariable() {
        return this._applyExistenceTypeTest(type => type instanceof TypeVariable);
    }
    get hasUnresolvedVariable() {
        return this._applyExistenceTypeTest(type => type instanceof TypeVariable && !type.variable.isResolved());
    }
    getContainedType() {
        return null;
    }
    isTypeContainer() {
        return false;
    }
    collectionOf() {
        return new CollectionType(this);
    }
    bigCollectionOf() {
        return new BigCollectionType(this);
    }
    resolvedType() {
        return this;
    }
    canEnsureResolved() {
        return this.isResolved() || this._canEnsureResolved();
    }
    _canEnsureResolved() {
        return true;
    }
    maybeEnsureResolved() {
        return true;
    }
    get canWriteSuperset() {
        throw new Error(`canWriteSuperset not implemented for ${this}`);
    }
    get canReadSubset() {
        throw new Error(`canReadSubset not implemented for ${this}`);
    }
    isMoreSpecificThan(type) {
        return this.tag === type.tag && this._isMoreSpecificThan(type);
    }
    _isMoreSpecificThan(type) {
        throw new Error(`isMoreSpecificThan not implemented for ${this}`);
    }
    /**
     * Clone a type object.
     * When cloning multiple types, variables that were associated with the same name
     * before cloning should still be associated after cloning. To maintain this
     * property, create a Map() and pass it into all clone calls in the group.
     */
    clone(variableMap) {
        return this.resolvedType()._clone(variableMap);
    }
    _clone(variableMap) {
        return Type.fromLiteral(this.toLiteral());
    }
    /**
     * Clone a type object, maintaining resolution information.
     * This function SHOULD NOT BE USED at the type level. In order for type variable
     * information to be maintained correctly, an entire context root needs to be
     * cloned.
     */
    _cloneWithResolutions(variableMap) {
        return Type.fromLiteral(this.toLiteral());
    }
    // TODO: is this the same as _applyExistenceTypeTest
    hasProperty(property) {
        return property(this) || this._hasProperty(property);
    }
    _hasProperty(property) {
        return false;
    }
    toString(options = undefined) {
        return this.tag;
    }
    getEntitySchema() {
        return null;
    }
    toPrettyString() {
        return null;
    }
}
class EntityType extends Type {
    constructor(schema) {
        super('Entity');
        this.entitySchema = schema;
    }
    static make(names, fields, description) {
        return new EntityType(new _schema_js__WEBPACK_IMPORTED_MODULE_1__["Schema"](names, fields, description));
    }
    // These type identifier methods are being left in place for non-runtime code.
    get isEntity() {
        return true;
    }
    get canWriteSuperset() {
        return this;
    }
    get canReadSubset() {
        return this;
    }
    _isMoreSpecificThan(type) {
        return this.entitySchema.isMoreSpecificThan(type.entitySchema);
    }
    toLiteral() {
        return { tag: this.tag, data: this.entitySchema.toLiteral() };
    }
    toString(options = undefined) {
        return this.entitySchema.toInlineSchemaString(options);
    }
    getEntitySchema() {
        return this.entitySchema;
    }
    _cloneWithResolutions(variableMap) {
        if (variableMap.has(this.entitySchema)) {
            return variableMap.get(this.entitySchema);
        }
        const clonedEntityType = new EntityType(this.entitySchema);
        variableMap.set(this.entitySchema, clonedEntityType);
        return clonedEntityType;
    }
    toPrettyString() {
        if (this.entitySchema.description.pattern) {
            return this.entitySchema.description.pattern;
        }
        // Spit MyTypeFOO to My Type FOO
        if (this.entitySchema.name) {
            return this.entitySchema.name.replace(/([^A-Z])([A-Z])/g, '$1 $2')
                .replace(/([A-Z][^A-Z])/g, ' $1')
                .replace(/[\s]+/g, ' ')
                .trim();
        }
        return JSON.stringify(this.entitySchema.toLiteral());
    }
}
class TypeVariable extends Type {
    constructor(variable) {
        super('TypeVariable');
        this.variable = variable;
    }
    static make(name, canWriteSuperset, canReadSubset) {
        return new TypeVariable(new _type_variable_info_js__WEBPACK_IMPORTED_MODULE_4__["TypeVariableInfo"](name, canWriteSuperset, canReadSubset));
    }
    get isVariable() {
        return true;
    }
    mergeTypeVariablesByName(variableMap) {
        const name = this.variable.name;
        let variable = variableMap.get(name);
        if (!variable) {
            variable = this;
            variableMap.set(name, this);
        }
        else if (variable instanceof TypeVariable) {
            if (variable.variable.hasConstraint || this.variable.hasConstraint) {
                const mergedConstraint = variable.variable.maybeMergeConstraints(this.variable);
                if (!mergedConstraint) {
                    throw new Error('could not merge type variables');
                }
            }
        }
        return variable;
    }
    resolvedType() {
        return this.variable.resolution || this;
    }
    _canEnsureResolved() {
        return this.variable.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.variable.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        return this.variable.canWriteSuperset;
    }
    get canReadSubset() {
        return this.variable.canReadSubset;
    }
    _clone(variableMap) {
        const name = this.variable.name;
        if (variableMap.has(name)) {
            return new TypeVariable(variableMap.get(name));
        }
        else {
            const newTypeVariable = _type_variable_info_js__WEBPACK_IMPORTED_MODULE_4__["TypeVariableInfo"].fromLiteral(this.variable.toLiteral());
            variableMap.set(name, newTypeVariable);
            return new TypeVariable(newTypeVariable);
        }
    }
    _cloneWithResolutions(variableMap) {
        if (variableMap.has(this.variable)) {
            return new TypeVariable(variableMap.get(this.variable));
        }
        else {
            const newTypeVariable = _type_variable_info_js__WEBPACK_IMPORTED_MODULE_4__["TypeVariableInfo"].fromLiteral(this.variable.toLiteralIgnoringResolutions());
            if (this.variable.resolution) {
                newTypeVariable._resolution = this.variable._resolution._cloneWithResolutions(variableMap);
            }
            if (this.variable._canReadSubset) {
                newTypeVariable.canReadSubset = this.variable.canReadSubset._cloneWithResolutions(variableMap);
            }
            if (this.variable._canWriteSuperset) {
                newTypeVariable.canWriteSuperset = this.variable.canWriteSuperset._cloneWithResolutions(variableMap);
            }
            variableMap.set(this.variable, newTypeVariable);
            return new TypeVariable(newTypeVariable);
        }
    }
    toLiteral() {
        return this.variable.resolution ? this.variable.resolution.toLiteral()
            : { tag: this.tag, data: this.variable.toLiteral() };
    }
    toString(options = undefined) {
        return `~${this.variable.name}`;
    }
    getEntitySchema() {
        return this.variable.isResolved() ? this.resolvedType().getEntitySchema() : null;
    }
    toPrettyString() {
        return this.variable.isResolved() ? this.resolvedType().toPrettyString() : `[~${this.variable.name}]`;
    }
}
class CollectionType extends Type {
    constructor(collectionType) {
        super('Collection');
        this.collectionType = collectionType;
    }
    get isCollection() {
        return true;
    }
    mergeTypeVariablesByName(variableMap) {
        const collectionType = this.collectionType;
        const result = collectionType.mergeTypeVariablesByName(variableMap);
        return (result === collectionType) ? this : result.collectionOf();
    }
    _applyExistenceTypeTest(test) {
        return this.collectionType._applyExistenceTypeTest(test);
    }
    getContainedType() {
        return this.collectionType;
    }
    isTypeContainer() {
        return true;
    }
    resolvedType() {
        const collectionType = this.collectionType;
        const resolvedCollectionType = collectionType.resolvedType();
        return (collectionType !== resolvedCollectionType) ? resolvedCollectionType.collectionOf() : this;
    }
    _canEnsureResolved() {
        return this.collectionType.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.collectionType.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        return InterfaceType.make(this.tag, [], []);
    }
    get canReadSubset() {
        return InterfaceType.make(this.tag, [], []);
    }
    _clone(variableMap) {
        const data = this.collectionType.clone(variableMap).toLiteral();
        return Type.fromLiteral({ tag: this.tag, data });
    }
    _cloneWithResolutions(variableMap) {
        return new CollectionType(this.collectionType._cloneWithResolutions(variableMap));
    }
    toLiteral() {
        return { tag: this.tag, data: this.collectionType.toLiteral() };
    }
    _hasProperty(property) {
        return this.collectionType.hasProperty(property);
    }
    toString(options = undefined) {
        return `[${this.collectionType.toString(options)}]`;
    }
    getEntitySchema() {
        return this.collectionType.getEntitySchema();
    }
    toPrettyString() {
        const entitySchema = this.getEntitySchema();
        if (entitySchema && entitySchema.description.plural) {
            return entitySchema.description.plural;
        }
        return `${this.collectionType.toPrettyString()} List`;
    }
}
class BigCollectionType extends Type {
    constructor(bigCollectionType) {
        super('BigCollection');
        this.bigCollectionType = bigCollectionType;
    }
    get isBigCollection() {
        return true;
    }
    mergeTypeVariablesByName(variableMap) {
        const collectionType = this.bigCollectionType;
        const result = collectionType.mergeTypeVariablesByName(variableMap);
        return (result === collectionType) ? this : result.bigCollectionOf();
    }
    _applyExistenceTypeTest(test) {
        return this.bigCollectionType._applyExistenceTypeTest(test);
    }
    getContainedType() {
        return this.bigCollectionType;
    }
    isTypeContainer() {
        return true;
    }
    resolvedType() {
        const collectionType = this.bigCollectionType;
        const resolvedCollectionType = collectionType.resolvedType();
        return (collectionType !== resolvedCollectionType) ? resolvedCollectionType.bigCollectionOf() : this;
    }
    _canEnsureResolved() {
        return this.bigCollectionType.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.bigCollectionType.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        return InterfaceType.make(this.tag, [], []);
    }
    get canReadSubset() {
        return InterfaceType.make(this.tag, [], []);
    }
    _clone(variableMap) {
        const data = this.bigCollectionType.clone(variableMap).toLiteral();
        return Type.fromLiteral({ tag: this.tag, data });
    }
    _cloneWithResolutions(variableMap) {
        return new BigCollectionType(this.bigCollectionType._cloneWithResolutions(variableMap));
    }
    toLiteral() {
        return { tag: this.tag, data: this.bigCollectionType.toLiteral() };
    }
    _hasProperty(property) {
        return this.bigCollectionType.hasProperty(property);
    }
    toString(options = undefined) {
        return `BigCollection<${this.bigCollectionType.toString(options)}>`;
    }
    getEntitySchema() {
        return this.bigCollectionType.getEntitySchema();
    }
    toPrettyString() {
        const entitySchema = this.getEntitySchema();
        if (entitySchema && entitySchema.description.plural) {
            return entitySchema.description.plural;
        }
        return `Collection of ${this.bigCollectionType.toPrettyString()}`;
    }
}
class RelationType extends Type {
    constructor(relation) {
        super('Relation');
        this.relationEntities = relation;
    }
    get isRelation() {
        return true;
    }
    toLiteral() {
        return { tag: this.tag, data: this.relationEntities.map(t => t.toLiteral()) };
    }
    toPrettyString() {
        return JSON.stringify(this.relationEntities);
    }
}
class InterfaceType extends Type {
    constructor(iface) {
        super('Interface');
        this.interfaceInfo = iface;
    }
    static make(name, handles, slots) {
        return new InterfaceType(new _interface_info_js__WEBPACK_IMPORTED_MODULE_0__["InterfaceInfo"](name, handles, slots));
    }
    get isInterface() {
        return true;
    }
    mergeTypeVariablesByName(variableMap) {
        const interfaceInfo = this.interfaceInfo.clone(new Map());
        interfaceInfo.mergeTypeVariablesByName(variableMap);
        // TODO: only build a new type when a variable is modified
        return new InterfaceType(interfaceInfo);
    }
    _applyExistenceTypeTest(test) {
        return this.interfaceInfo._applyExistenceTypeTest(test);
    }
    resolvedType() {
        return new InterfaceType(this.interfaceInfo.resolvedType());
    }
    _canEnsureResolved() {
        return this.interfaceInfo.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.interfaceInfo.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        return new InterfaceType(this.interfaceInfo.canWriteSuperset);
    }
    get canReadSubset() {
        return new InterfaceType(this.interfaceInfo.canReadSubset);
    }
    _isMoreSpecificThan(type) {
        return this.interfaceInfo.isMoreSpecificThan(type.interfaceInfo);
    }
    _clone(variableMap) {
        const data = this.interfaceInfo.clone(variableMap).toLiteral();
        return Type.fromLiteral({ tag: this.tag, data });
    }
    _cloneWithResolutions(variableMap) {
        return new InterfaceType(this.interfaceInfo._cloneWithResolutions(variableMap));
    }
    toLiteral() {
        return { tag: this.tag, data: this.interfaceInfo.toLiteral() };
    }
    toString(options = undefined) {
        return this.interfaceInfo.name;
    }
    toPrettyString() {
        return this.interfaceInfo.toPrettyString();
    }
}
class SlotType extends Type {
    constructor(slot) {
        super('Slot');
        this.slot = slot;
    }
    static make(formFactor, handle) {
        return new SlotType(new _slot_info_js__WEBPACK_IMPORTED_MODULE_2__["SlotInfo"](formFactor, handle));
    }
    get canWriteSuperset() {
        return this;
    }
    get canReadSubset() {
        return this;
    }
    _isMoreSpecificThan(type) {
        // TODO: formFactor checking, etc.
        return true;
    }
    toLiteral() {
        return { tag: this.tag, data: this.slot.toLiteral() };
    }
    toString(options = undefined) {
        const fields = [];
        for (const key of Object.keys(this.slot)) {
            if (this.slot[key] !== undefined) {
                fields.push(`${key}:${this.slot[key]}`);
            }
        }
        let fieldsString = '';
        if (fields.length !== 0) {
            fieldsString = ` {${fields.join(', ')}}`;
        }
        return `Slot${fieldsString}`;
    }
    toPrettyString() {
        const fields = [];
        for (const key of Object.keys(this.slot)) {
            if (this.slot[key] !== undefined) {
                fields.push(`${key}:${this.slot[key]}`);
            }
        }
        let fieldsString = '';
        if (fields.length !== 0) {
            fieldsString = ` {${fields.join(', ')}}`;
        }
        return `Slot${fieldsString}`;
    }
}
class ReferenceType extends Type {
    constructor(reference) {
        super('Reference');
        this.referredType = reference;
    }
    get isReference() {
        return true;
    }
    getContainedType() {
        return this.referredType;
    }
    isTypeContainer() {
        return true;
    }
    resolvedType() {
        const referredType = this.referredType;
        const resolvedReferredType = referredType.resolvedType();
        return (referredType !== resolvedReferredType) ? new ReferenceType(resolvedReferredType) : this;
    }
    _canEnsureResolved() {
        return this.referredType.canEnsureResolved();
    }
    maybeEnsureResolved() {
        return this.referredType.maybeEnsureResolved();
    }
    get canWriteSuperset() {
        // TODO(cypher1): Possibly cannot write to references.
        return this.referredType.canWriteSuperset;
    }
    get canReadSubset() {
        return this.referredType.canReadSubset;
    }
    _clone(variableMap) {
        const data = this.referredType.clone(variableMap).toLiteral();
        return Type.fromLiteral({ tag: this.tag, data });
    }
    _cloneWithResolutions(variableMap) {
        return new ReferenceType(this.referredType._cloneWithResolutions(variableMap));
    }
    toLiteral() {
        return { tag: this.tag, data: this.referredType.toLiteral() };
    }
    toString(options = undefined) {
        return 'Reference<' + this.referredType.toString() + '>';
    }
}
class ArcType extends Type {
    constructor() {
        super('Arc');
    }
    get isArc() {
        return true;
    }
    newInstance(arcId, serialization) {
        return new _synthetic_types_js__WEBPACK_IMPORTED_MODULE_3__["ArcInfo"](arcId, serialization);
    }
    toLiteral() {
        return { tag: this.tag };
    }
}
class HandleType extends Type {
    constructor() {
        super('Handle');
    }
    get isHandle() {
        return true;
    }
    toLiteral() {
        return { tag: this.tag };
    }
}
//# sourceMappingURL=type.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterfaceInfo", function() { return InterfaceInfo; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



function _typeFromLiteral(member) {
    return _type_js__WEBPACK_IMPORTED_MODULE_2__["Type"].fromLiteral(member);
}
function _typeVarOrStringFromLiteral(member) {
    if (typeof member === 'object') {
        return _typeFromLiteral(member);
    }
    return member;
}
function _HandleFromLiteral({ type, name, direction }) {
    const typel = type ? _typeFromLiteral(type) : undefined;
    const namel = name ? _typeVarOrStringFromLiteral(name) : undefined;
    return { type: typel, name: namel, direction };
}
function _SlotFromLiteral({ name, direction, isRequired, isSet }) {
    const namel = name ? _typeVarOrStringFromLiteral(name) : undefined;
    return { name: namel, direction, isRequired, isSet };
}
function _typeToLiteral(member) {
    return member.toLiteral();
}
function _typeVarOrStringToLiteral(member) {
    if (member instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["TypeVariable"]) {
        return member.toLiteral();
    }
    return member;
}
function _HandleToLiteral({ type, name, direction }) {
    const typel = type ? _typeToLiteral(type) : undefined;
    const namel = name ? _typeVarOrStringToLiteral(name) : undefined;
    return { type: typel, name: namel, direction };
}
function _SlotToLiteral({ name, direction, isRequired, isSet }) {
    const namel = name ? _typeVarOrStringToLiteral(name) : undefined;
    return { name: namel, direction, isRequired, isSet };
}
const handleFields = ['type', 'name', 'direction'];
const slotFields = ['name', 'direction', 'isRequired', 'isSet'];
class InterfaceInfo {
    constructor(name, handles, slots) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(name);
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(handles !== undefined);
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(slots !== undefined);
        this.name = name;
        this.handles = handles;
        this.slots = slots;
        this.typeVars = [];
        for (const handle of handles) {
            for (const field of handleFields) {
                if (InterfaceInfo.isTypeVar(handle[field])) {
                    this.typeVars.push({ object: handle, field });
                }
            }
        }
        for (const slot of slots) {
            for (const field of slotFields) {
                if (InterfaceInfo.isTypeVar(slot[field])) {
                    this.typeVars.push({ object: slot, field });
                }
            }
        }
    }
    toPrettyString() {
        return 'InterfaceInfo';
    }
    mergeTypeVariablesByName(variableMap) {
        this.typeVars.map(({ object, field }) => object[field] = object[field].mergeTypeVariablesByName(variableMap));
    }
    get canReadSubset() {
        return this._cloneAndUpdate(typeVar => typeVar.canReadSubset);
    }
    get canWriteSuperset() {
        return this._cloneAndUpdate(typeVar => typeVar.canWriteSuperset);
    }
    isMoreSpecificThan(other) {
        if (this.handles.length !== other.handles.length ||
            this.slots.length !== other.slots.length) {
            return false;
        }
        // TODO: should probably confirm that handles and slots actually match.
        for (let i = 0; i < this.typeVars.length; i++) {
            const thisTypeVar = this.typeVars[i];
            const otherTypeVar = other.typeVars[i];
            if (!thisTypeVar.object[thisTypeVar.field].isMoreSpecificThan(otherTypeVar.object[otherTypeVar.field])) {
                return false;
            }
        }
        return true;
    }
    _applyExistenceTypeTest(test) {
        for (const typeRef of this.typeVars) {
            if (test(typeRef.object[typeRef.field])) {
                return true;
            }
        }
        return false;
    }
    _handlesToManifestString() {
        return this.handles
            .map(h => `  ${h.direction ? h.direction + ' ' : ''}${h.type.toString()} ${h.name ? h.name : '*'}`)
            .join('\n');
    }
    _slotsToManifestString() {
        // TODO deal with isRequired
        return this.slots
            .map(slot => `  ${slot.direction} ${slot.isSet ? 'set of ' : ''}${slot.name ? slot.name + ' ' : ''}`)
            .join('\n');
    }
    // TODO: Include name as a property of the interface and normalize this to just toString()
    toString() {
        return `interface ${this.name}
${this._handlesToManifestString()}
${this._slotsToManifestString()}`;
    }
    static fromLiteral(data) {
        const handles = data.handles.map(_HandleFromLiteral);
        const slots = data.slots.map(_SlotFromLiteral);
        return new InterfaceInfo(data.name, handles, slots);
    }
    toLiteral() {
        const handles = this.handles.map(_HandleToLiteral);
        const slots = this.slots.map(_SlotToLiteral);
        return { name: this.name, handles, slots };
    }
    clone(variableMap) {
        const handles = this.handles.map(({ name, direction, type }) => ({ name, direction, type: type ? type.clone(variableMap) : undefined }));
        const slots = this.slots.map(({ name, direction, isRequired, isSet }) => ({ name, direction, isRequired, isSet }));
        return new InterfaceInfo(this.name, handles, slots);
    }
    cloneWithResolutions(variableMap) {
        return this._cloneWithResolutions(variableMap);
    }
    _cloneWithResolutions(variableMap) {
        const handles = this.handles.map(({ name, direction, type }) => ({ name, direction, type: type ? type._cloneWithResolutions(variableMap) : undefined }));
        const slots = this.slots.map(({ name, direction, isRequired, isSet }) => ({ name, direction, isRequired, isSet }));
        return new InterfaceInfo(this.name, handles, slots);
    }
    canEnsureResolved() {
        for (const typeVar of this.typeVars) {
            if (!typeVar.object[typeVar.field].canEnsureResolved()) {
                return false;
            }
        }
        return true;
    }
    maybeEnsureResolved() {
        for (const typeVar of this.typeVars) {
            let variable = typeVar.object[typeVar.field];
            variable = variable.clone(new Map());
            if (!variable.maybeEnsureResolved())
                return false;
        }
        for (const typeVar of this.typeVars) {
            typeVar.object[typeVar.field].maybeEnsureResolved();
        }
        return true;
    }
    tryMergeTypeVariablesWith(other) {
        // Type variable enabled slot matching will Just Work when we
        // unify slots and handles.
        if (!this._equalItems(other.slots, this.slots, this._equalSlot)) {
            return null;
        }
        if (other.handles.length !== this.handles.length) {
            return null;
        }
        const handles = new Set(this.handles);
        const otherHandles = new Set(other.handles);
        const handleMap = new Map();
        let sizeCheck = handles.size;
        while (handles.size > 0) {
            const handleMatches = [...handles.values()].map(handle => ({ handle, match: [...otherHandles.values()].filter(otherHandle => this._equalHandle(handle, otherHandle)) }));
            for (const handleMatch of handleMatches) {
                // no match!
                if (handleMatch.match.length === 0) {
                    return null;
                }
                if (handleMatch.match.length === 1) {
                    handleMap.set(handleMatch.handle, handleMatch.match[0]);
                    otherHandles.delete(handleMatch.match[0]);
                    handles.delete(handleMatch.handle);
                }
            }
            // no progress!
            if (handles.size === sizeCheck) {
                return null;
            }
            sizeCheck = handles.size;
        }
        const handleList = [];
        for (const handle of this.handles) {
            const otherHandle = handleMap.get(handle);
            let resultType;
            if (handle.type.hasVariable || otherHandle.type.hasVariable) {
                resultType = _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_1__["TypeChecker"]._tryMergeTypeVariable(handle.type, otherHandle.type);
                if (!resultType) {
                    return null;
                }
            }
            else {
                resultType = handle.type || otherHandle.type;
            }
            handleList.push({ name: handle.name || otherHandle.name, direction: handle.direction || otherHandle.direction, type: resultType });
        }
        const slots = this.slots.map(({ name, direction, isRequired, isSet }) => ({ name, direction, isRequired, isSet }));
        return new InterfaceInfo(this.name, handleList, slots);
    }
    resolvedType() {
        return this._cloneAndUpdate(typeVar => typeVar.resolvedType());
    }
    equals(other) {
        if (this.handles.length !== other.handles.length) {
            return false;
        }
        // TODO: this isn't quite right as it doesn't deal with duplicates properly
        if (!this._equalItems(other.handles, this.handles, this._equalHandle)) {
            return false;
        }
        if (!this._equalItems(other.slots, this.slots, this._equalSlot)) {
            return false;
        }
        return true;
    }
    _equalHandle(handle, otherHandle) {
        return handle.name === otherHandle.name
            && handle.direction === otherHandle.direction
            && _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_1__["TypeChecker"].compareTypes({ type: handle.type }, { type: otherHandle.type });
    }
    _equalSlot(slot, otherSlot) {
        return slot.name === otherSlot.name && slot.direction === otherSlot.direction && slot.isRequired === otherSlot.isRequired && slot.isSet === otherSlot.isSet;
    }
    _equalItems(otherItems, items, compareItem) {
        for (const otherItem of otherItems) {
            let exists = false;
            for (const item of items) {
                if (compareItem(item, otherItem)) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                return false;
            }
        }
        return true;
    }
    _cloneAndUpdate(update) {
        const copy = this.clone(new Map());
        copy.typeVars.forEach(typeVar => InterfaceInfo._updateTypeVar(typeVar, update));
        return copy;
    }
    static _updateTypeVar(typeVar, update) {
        typeVar.object[typeVar.field] = update(typeVar.object[typeVar.field]);
    }
    static isTypeVar(reference) {
        return reference instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["TypeVariable"] || reference instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["Type"] && reference.hasVariable;
    }
    static mustMatch(reference) {
        return !(reference == undefined || InterfaceInfo.isTypeVar(reference));
    }
    static handlesMatch(interfaceHandle, particleHandle) {
        if (InterfaceInfo.mustMatch(interfaceHandle.name) &&
            interfaceHandle.name !== particleHandle.name) {
            return false;
        }
        // TODO: direction subsetting?
        if (InterfaceInfo.mustMatch(interfaceHandle.direction) &&
            interfaceHandle.direction !== particleHandle.direction) {
            return false;
        }
        if (interfaceHandle.type == undefined) {
            return true;
        }
        const [left, right] = _type_js__WEBPACK_IMPORTED_MODULE_2__["Type"].unwrapPair(interfaceHandle.type, particleHandle.type);
        if (left instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["TypeVariable"]) {
            return [{ var: left, value: right, direction: interfaceHandle.direction }];
        }
        else {
            return _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_1__["TypeChecker"].compareTypes({ type: left }, { type: right });
        }
    }
    static slotsMatch(interfaceSlot, particleSlot) {
        if (InterfaceInfo.mustMatch(interfaceSlot.name) &&
            interfaceSlot.name !== particleSlot.name) {
            return false;
        }
        if (InterfaceInfo.mustMatch(interfaceSlot.direction) &&
            interfaceSlot.direction !== particleSlot.direction) {
            return false;
        }
        if (InterfaceInfo.mustMatch(interfaceSlot.isRequired) &&
            interfaceSlot.isRequired !== particleSlot.isRequired) {
            return false;
        }
        if (InterfaceInfo.mustMatch(interfaceSlot.isSet) &&
            interfaceSlot.isSet !== particleSlot.isSet) {
            return false;
        }
        return true;
    }
    particleMatches(particleSpec) {
        const interfaceInfo = this.cloneWithResolutions(new Map());
        return interfaceInfo.restrictType(particleSpec) !== false;
    }
    restrictType(particleSpec) {
        return this._restrictThis(particleSpec);
    }
    _restrictThis(particleSpec) {
        const handleMatches = this.handles.map(h => particleSpec.handleConnections.map(c => ({ match: c, result: InterfaceInfo.handlesMatch(h, c) }))
            .filter(a => a.result !== false));
        const particleSlots = [];
        particleSpec.slotConnections.forEach(consumedSlot => {
            particleSlots.push({ name: consumedSlot.name, direction: 'consume', isRequired: consumedSlot.isRequired, isSet: consumedSlot.isSet });
            consumedSlot.provideSlotConnections.forEach(providedSlot => {
                particleSlots.push({ name: providedSlot.name, direction: 'provide', isRequired: false, isSet: providedSlot.isSet });
            });
        });
        const slotsThatMatch = this.slots.map(slot => particleSlots.filter(particleSlot => InterfaceInfo.slotsMatch(slot, particleSlot)));
        const slotMatches = slotsThatMatch.map(matchList => matchList.map(slot => ({ match: slot, result: true })));
        // TODO: this probably doesn't deal with multiple match options.
        function choose(list, exclusions) {
            if (list.length === 0) {
                return [];
            }
            const thisLevel = list.pop();
            for (const connection of thisLevel) {
                if (exclusions.includes(connection.match)) {
                    continue;
                }
                const newExclusions = exclusions.slice();
                newExclusions.push(connection.match);
                const constraints = choose(list, newExclusions);
                if (constraints !== false) {
                    if (typeof connection.result === 'boolean') {
                        return constraints;
                    }
                    return constraints.concat(connection.result);
                }
            }
            return false;
        }
        const handleOptions = choose(handleMatches, []);
        const slotOptions = choose(slotMatches, []);
        if (handleOptions === false || slotOptions === false) {
            return false;
        }
        for (const constraint of handleOptions) {
            if (!constraint.var.variable.resolution) {
                constraint.var.variable.resolution = constraint.value;
            }
            else if (constraint.var.variable.resolution instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["TypeVariable"]) {
                // TODO(shans): revisit how this should be done,
                // consider reusing tryMergeTypeVariablesWith(other).
                if (!_recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_1__["TypeChecker"].processTypeList(constraint.var, [{
                        type: constraint.value, direction: constraint.direction
                    }]))
                    return false;
            }
            else {
                if (!_recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_1__["TypeChecker"].compareTypes({ type: constraint.var.variable.resolution }, { type: constraint.value })) {
                    return false;
                }
            }
        }
        return true;
    }
}
//# sourceMappingURL=interface-info.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schema", function() { return Schema; });
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


class Schema {
    // For convenience, primitive field types can be specified as {name: 'Type'}
    // in `fields`; the constructor will convert these to the correct schema form.
    // tslint:disable-next-line: no-any
    constructor(names, fields, description) {
        this.description = {};
        this.names = names;
        this.fields = {};
        for (const [name, field] of Object.entries(fields)) {
            if (typeof (field) === 'string') {
                this.fields[name] = { kind: 'schema-primitive', type: field };
            }
            else {
                this.fields[name] = field;
            }
        }
        if (description) {
            description.description.forEach(desc => this.description[desc.name] = desc.pattern || desc.patterns[0]);
        }
    }
    toLiteral() {
        const fields = {};
        const updateField = field => {
            if (field.kind === 'schema-reference') {
                const schema = field.schema;
                return { kind: 'schema-reference', schema: { kind: schema.kind, model: schema.model.toLiteral() } };
            }
            else if (field.kind === 'schema-collection') {
                return { kind: 'schema-collection', schema: updateField(field.schema) };
            }
            else {
                return field;
            }
        };
        for (const key of Object.keys(this.fields)) {
            fields[key] = updateField(this.fields[key]);
        }
        return { names: this.names, fields, description: this.description };
    }
    static fromLiteral(data = { fields: {}, names: [], description: {} }) {
        const fields = {};
        const updateField = field => {
            if (field.kind === 'schema-reference') {
                const schema = field.schema;
                return { kind: 'schema-reference', schema: { kind: schema.kind, model: _type_js__WEBPACK_IMPORTED_MODULE_1__["Type"].fromLiteral(schema.model) } };
            }
            else if (field.kind === 'schema-collection') {
                return { kind: 'schema-collection', schema: updateField(field.schema) };
            }
            else {
                return field;
            }
        };
        for (const key of Object.keys(data.fields)) {
            fields[key] = updateField(data.fields[key]);
        }
        const result = new Schema(data.names, fields);
        result.description = data.description || {};
        return result;
    }
    // TODO: This should only be an ident used in manifest parsing.
    get name() {
        return this.names[0];
    }
    static typesEqual(fieldType1, fieldType2) {
        // TODO: structural check instead of stringification.
        return Schema._typeString(fieldType1) === Schema._typeString(fieldType2);
    }
    static _typeString(type) {
        switch (type.kind) {
            case 'schema-primitive':
                return type.type;
            case 'schema-union':
                return `(${type.types.map(t => t.type).join(' or ')})`;
            case 'schema-tuple':
                return `(${type.types.map(t => t.type).join(', ')})`;
            case 'schema-reference':
                return `Reference<${Schema._typeString(type.schema)}>`;
            case 'type-name':
            case 'schema-inline':
                return type.model.entitySchema.toInlineSchemaString();
            case 'schema-collection':
                return `[${Schema._typeString(type.schema)}]`;
            default:
                throw new Error(`Unknown type kind ${type.kind} in schema ${this.name}`);
        }
    }
    static union(schema1, schema2) {
        const names = [...new Set([...schema1.names, ...schema2.names])];
        const fields = {};
        for (const [field, type] of [...Object.entries(schema1.fields), ...Object.entries(schema2.fields)]) {
            if (fields[field]) {
                if (!Schema.typesEqual(fields[field], type)) {
                    return null;
                }
            }
            else {
                fields[field] = type;
            }
        }
        return new Schema(names, fields);
    }
    static intersect(schema1, schema2) {
        const names = [...schema1.names].filter(name => schema2.names.includes(name));
        const fields = {};
        for (const [field, type] of Object.entries(schema1.fields)) {
            const otherType = schema2.fields[field];
            if (otherType && Schema.typesEqual(type, otherType)) {
                fields[field] = type;
            }
        }
        return new Schema(names, fields);
    }
    equals(otherSchema) {
        return this === otherSchema || (this.name === otherSchema.name
            // TODO: Check equality without calling contains.
            && this.isMoreSpecificThan(otherSchema)
            && otherSchema.isMoreSpecificThan(this));
    }
    isMoreSpecificThan(otherSchema) {
        const names = new Set(this.names);
        for (const name of otherSchema.names) {
            if (!names.has(name)) {
                return false;
            }
        }
        const fields = {};
        for (const [name, type] of Object.entries(this.fields)) {
            fields[name] = type;
        }
        for (const [name, type] of Object.entries(otherSchema.fields)) {
            if (fields[name] == undefined) {
                return false;
            }
            if (!Schema.typesEqual(fields[name], type)) {
                return false;
            }
        }
        return true;
    }
    get type() {
        return new _type_js__WEBPACK_IMPORTED_MODULE_1__["EntityType"](this);
    }
    entityClass(context = null) {
        return _entity_js__WEBPACK_IMPORTED_MODULE_0__["Entity"].createEntityClass(this, context);
    }
    toInlineSchemaString(options) {
        const names = this.names.join(' ') || '*';
        const fields = Object.entries(this.fields).map(([name, type]) => `${Schema._typeString(type)} ${name}`).join(', ');
        return `${names} {${fields.length > 0 && options && options.hideFields ? '...' : fields}}`;
    }
    toManifestString() {
        const results = [];
        results.push(`schema ${this.names.join(' ')}`);
        results.push(...Object.entries(this.fields).map(([name, type]) => `  ${Schema._typeString(type)} ${name}`));
        if (Object.keys(this.description).length > 0) {
            results.push(`  description \`${this.description.pattern}\``);
            for (const name of Object.keys(this.description)) {
                if (name !== 'pattern') {
                    results.push(`    ${name} \`${this.description[name]}\``);
                }
            }
        }
        return results.join('\n');
    }
}
//# sourceMappingURL=schema.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





// This class holds extra entity-related fields used by the runtime. Instances of this are stored
// in their parent Entity via a Symbol-based key. This allows Entities to hold whatever field names
// their Schemas describe without any possibility of names clashing. For example, an Entity can have
// an 'id' field that is distinct (in both value and type) from the id field here. Access to this
// class should be via the static helpers in Entity.
class EntityInternals {
    constructor(entity, entityClass, schema, context, userIDComponent) {
        // TODO: Only the Arc that "owns" this Entity should be allowed to mutate it.
        this.mutable = true;
        this.entity = entity;
        this.entityClass = entityClass;
        this.schema = schema;
        this.context = context;
        this.userIDComponent = userIDComponent;
    }
    getId() {
        if (this.id === undefined) {
            throw new Error('no id');
        }
        return this.id;
    }
    getEntityClass() {
        return this.entityClass;
    }
    isIdentified() {
        return this.id !== undefined;
    }
    identify(identifier) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this.isIdentified(), 'identify() called on already identified entity');
        this.id = identifier;
        const components = identifier.split(':');
        const uid = components.lastIndexOf('uid');
        this.userIDComponent = uid > 0 ? components.slice(uid + 1).join(':') : '';
    }
    createIdentity(parentId, idGenerator) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this.isIdentified(), 'createIdentity() called on already identified entity');
        let id;
        if (this.userIDComponent) {
            // TODO: Stop creating IDs by manually concatenating strings.
            id = `${parentId.toString()}:uid:${this.userIDComponent}`;
        }
        else {
            id = idGenerator.newChildId(parentId).toString();
        }
        this.id = id;
    }
    isMutable() {
        return this.mutable;
    }
    /**
     * Prevents further mutation of this Entity instance. Note that calling this method only affects
     * this particular Entity instance; the entity it represents (in a data store somewhere) can
     * still be mutated by others. Also note that this doesn't necessarily offer any security against
     * malicious developers.
     */
    makeImmutable() {
        this.mutable = false;
    }
    /**
     * Mutates the entity. Supply either the new data for the entity, which replaces the existing
     * entity's data entirely, or a mutation function. The supplied mutation function will be called
     * with a mutable copy of the entity's data. The mutations performed by that function will be
     * reflected in the original entity instance (i.e. mutations applied in place).
     */
    mutate(mutation) {
        if (!this.mutable) {
            throw new Error('Entity is immutable.');
        }
        let newData;
        // Using typeof instead of instanceof here, because apparently sometimes lambdas aren't an instance of Function... :-/
        if (typeof mutation === 'function') {
            newData = this.dataClone();
            mutation(newData);
        }
        else {
            newData = mutation;
        }
        // Note that this does *not* trigger the error in the Entity's Proxy 'set' trap, because we're
        // applying the field updates directly to the original Entity instance (this.entity), not the
        // Proxied version returned by the Entity constructor. Not confusing at all!
        sanitizeAndApply(this.entity, newData, this.schema, this.context);
        // TODO: Send mutations to data store.
    }
    toLiteral() {
        return JSON.parse(JSON.stringify(this.entity));
    }
    dataClone() {
        const clone = {};
        const fieldTypes = this.schema.fields;
        for (const name of Object.keys(fieldTypes)) {
            if (this.entity[name] !== undefined) {
                if (fieldTypes[name] && fieldTypes[name].kind === 'schema-reference') {
                    if (this.entity[name]) {
                        clone[name] = this.entity[name].dataClone();
                    }
                }
                else if (fieldTypes[name] && fieldTypes[name].kind === 'schema-collection') {
                    if (this.entity[name]) {
                        clone[name] = [...this.entity[name]].map(a => a.dataClone());
                    }
                }
                else {
                    clone[name] = this.entity[name];
                }
            }
        }
        return clone;
    }
    serialize() {
        return { id: this.id, rawData: this.dataClone() };
    }
    debugLog() {
        // Here be dragons! Create a copy of the entity class but with an enumerable version of this
        // internals object so it will appear in the log output, with a few tweaks for better display.
        const original = this.entity;
        // Strip the noisy-and-not-very-useful 'location' field from the schema.
        const schema = JSON.parse(JSON.stringify(this.schema, (k, v) => (k !== 'location') ? v : undefined));
        const copy = new EntityInternals(null, this.entityClass, schema, this.context, this.userIDComponent);
        copy.id = this.id;
        // Force 'entity' to show as '[Circular]'. The 'any' is required because 'entity' is readonly.
        // tslint:disable-next-line: no-any
        copy.entity = copy;
        // Set up a class that looks the same as the real entity, copy the schema fields in, add an
        // enumerable version of the copied internals, and use console.dir to show the full object.
        // Node displays the name set up with defineProperty below, but Chrome uses the name of the
        // class variable defined here, so we'll call that entity.
        const entity = class extends Entity {
            constructor() {
                super();
                Object.assign(this, original);
                this[_symbols_js__WEBPACK_IMPORTED_MODULE_4__["SYMBOL_INTERNALS"]] = copy;
            }
        };
        Object.defineProperty(entity, 'name', { value: original.constructor.name });
        console.dir(new entity(), { depth: null });
    }
}
class Entity {
    toString() {
        const fields = Object.entries(this).map(([name, value]) => `${name}: ${JSON.stringify(value)}`);
        return `${this.constructor.name} { ${fields.join(', ')} }`;
    }
    // TODO: remove ASAP, once we're satisfied there are no lingering direct accesses on these fields
    // Note that this breaks any schemas that have an 'id' field (or rawData/dataClone).
    get id() { throw new Error('entity.id is no longer valid; use Entity.id() or Particle.idFor()'); }
    get rawData() { throw new Error('entity.rawData is no longer valid; use plain .field access or spread notation'); }
    get dataClone() { throw new Error('entity.dataClone() is no longer valid; use use Entity.dataClone() or Particle.dataClone()'); }
    // Dynamically constructs a new JS class for the entity type represented by the given schema.
    // This creates a new class which extends the Entity base class and implements the required
    // static properties, then returns a Proxy wrapping that to guard against incorrect field writes.
    static createEntityClass(schema, context) {
        const clazz = class extends Entity {
            constructor(data, userIDComponent) {
                super();
                Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(data, `can't construct entity with null data`);
                Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!userIDComponent || userIDComponent.indexOf(':') === -1, `user IDs must not contain the ':' character`);
                // We want the SYMBOL_INTERNALS property to be non-enumerable so any copies made of this
                // entity (e.g. via Object.assign) pick up only the plain data fields from the schema, and
                // not the EntityInternals object (which should be unique to this instance).
                Object.defineProperty(this, _symbols_js__WEBPACK_IMPORTED_MODULE_4__["SYMBOL_INTERNALS"], {
                    value: new EntityInternals(this, clazz, schema, context, userIDComponent),
                    enumerable: false
                });
                sanitizeAndApply(this, data, schema, context);
                // We don't want a 'get' trap here because JS accesses various fields as part of routine
                // system behaviour, and making sure we special case all of them is going to be brittle.
                // For example: when returning an object from an async function, JS needs to check if the
                // object is a 'thenable' (so it knows whether to wrap it in a Promise or not), and it does
                // this by checking for the existence of a 'then' method. Not trapping 'get' is ok because
                // callers who try to read fields that aren't in the schema will just get 'undefined', which
                // is idiomatic for JS anyway.
                return new Proxy(this, {
                    set: (target, name, value) => {
                        throw new Error(`Tried to modify entity field '${name}'. Use the mutate method instead.`);
                    }
                });
            }
            static get type() {
                // TODO: should the entity's key just be its type?
                // Should it just be called type in that case?
                return new _type_js__WEBPACK_IMPORTED_MODULE_1__["EntityType"](schema);
            }
            static get key() {
                return { tag: 'entity', schema };
            }
            static get schema() {
                return schema;
            }
        };
        // Override the name property to use the name of the entity given in the schema.
        Object.defineProperty(clazz, 'name', { value: schema.name });
        return clazz;
    }
    static id(entity) {
        return getInternals(entity).getId();
    }
    static entityClass(entity) {
        return getInternals(entity).getEntityClass();
    }
    static isIdentified(entity) {
        return getInternals(entity).isIdentified();
    }
    static identify(entity, identifier) {
        getInternals(entity).identify(identifier);
    }
    static createIdentity(entity, parentId, idGenerator) {
        getInternals(entity).createIdentity(parentId, idGenerator);
    }
    static isMutable(entity) {
        return getInternals(entity).isMutable();
    }
    static makeImmutable(entity) {
        getInternals(entity).makeImmutable();
    }
    static mutate(entity, mutation) {
        getInternals(entity).mutate(mutation);
    }
    static toLiteral(entity) {
        return getInternals(entity).toLiteral();
    }
    static dataClone(entity) {
        return getInternals(entity).dataClone();
    }
    static serialize(entity) {
        return getInternals(entity).serialize();
    }
    // Because the internals object is non-enumerable, console.log(entity) in Node only shows the
    // schema-based fields; use this function to log a more complete record of the entity in tests.
    // Chrome's console.log already shows the internals object so that's usually sufficient for
    // debugging, but this function can still be useful for logging a snapshot of an entity that
    // is later modified.
    static debugLog(entity) {
        getInternals(entity).debugLog();
    }
}
function getInternals(entity) {
    const internals = entity[_symbols_js__WEBPACK_IMPORTED_MODULE_4__["SYMBOL_INTERNALS"]];
    Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(internals !== undefined, 'SYMBOL_INTERNALS lookup on non-entity');
    return internals;
}
function sanitizeAndApply(target, data, schema, context) {
    for (const [name, value] of Object.entries(data)) {
        const sanitizedValue = sanitizeEntry(schema.fields[name], value, name, context);
        validateFieldAndTypes(name, sanitizedValue, schema);
        target[name] = sanitizedValue;
    }
}
function convertToJsType(primitiveType, schemaName) {
    switch (primitiveType.type) {
        case 'Text':
            return 'string';
        case 'URL':
            return 'string';
        case 'Number':
            return 'number';
        case 'Boolean':
            return 'boolean';
        case 'Bytes':
            return 'Uint8Array';
        case 'Object':
            return 'object';
        default:
            throw new Error(`Unknown field type ${primitiveType.type} in schema ${schemaName}`);
    }
}
// tslint:disable-next-line: no-any
function validateFieldAndTypes(name, value, schema, fieldType) {
    fieldType = fieldType || schema.fields[name];
    if (fieldType === undefined) {
        throw new Error(`Can't set field ${name}; not in schema ${schema.name}`);
    }
    if (value === undefined || value === null) {
        return;
    }
    switch (fieldType.kind) {
        case 'schema-primitive': {
            const valueType = value.constructor.name === 'Uint8Array' ? 'Uint8Array' : typeof (value);
            if (valueType !== convertToJsType(fieldType, schema.name)) {
                throw new TypeError(`Type mismatch setting field ${name} (type ${fieldType.type}); ` +
                    `value '${value}' is type ${typeof (value)}`);
            }
            break;
        }
        case 'schema-union':
            // Value must be a primitive that matches one of the union types.
            for (const innerType of fieldType.types) {
                if (typeof (value) === convertToJsType(innerType, schema.name)) {
                    return;
                }
            }
            throw new TypeError(`Type mismatch setting field ${name} (union [${fieldType.types}]); ` +
                `value '${value}' is type ${typeof (value)}`);
        case 'schema-tuple':
            // Value must be an array whose contents match each of the tuple types.
            if (!Array.isArray(value)) {
                throw new TypeError(`Cannot set tuple ${name} with non-array value '${value}'`);
            }
            if (value.length !== fieldType.types.length) {
                throw new TypeError(`Length mismatch setting tuple ${name} ` +
                    `[${fieldType.types}] with value '${value}'`);
            }
            fieldType.types.map((innerType, i) => {
                if (value[i] !== undefined && value[i] !== null &&
                    typeof (value[i]) !== convertToJsType(innerType, schema.name)) {
                    throw new TypeError(`Type mismatch setting field ${name} (tuple [${fieldType.types}]); ` +
                        `value '${value}' has type ${typeof (value[i])} at index ${i}`);
                }
            });
            break;
        case 'schema-reference':
            if (!(value instanceof _reference_js__WEBPACK_IMPORTED_MODULE_2__["Reference"])) {
                throw new TypeError(`Cannot set reference ${name} with non-reference '${value}'`);
            }
            if (!_recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_3__["TypeChecker"].compareTypes({ type: value.type }, { type: new _type_js__WEBPACK_IMPORTED_MODULE_1__["ReferenceType"](fieldType.schema.model) })) {
                throw new TypeError(`Cannot set reference ${name} with value '${value}' of mismatched type`);
            }
            break;
        case 'schema-collection':
            // WTF?! value instanceof Set is returning false sometimes here because the Set in
            // this environment (a native code constructor) isn't equal to the Set that the value
            // has been constructed with (another native code constructor)...
            if (value.constructor.name !== 'Set') {
                throw new TypeError(`Cannot set collection ${name} with non-Set '${value}'`);
            }
            for (const element of value) {
                validateFieldAndTypes(name, element, schema, fieldType.schema);
            }
            break;
        default:
            throw new Error(`Unknown kind '${fieldType.kind}' for field ${name} in schema ${schema.name}`);
    }
}
function sanitizeEntry(type, value, name, context) {
    if (!type) {
        // If there isn't a field type for this, the proxy will pick up
        // that fact and report a meaningful error.
        return value;
    }
    if (type.kind === 'schema-reference' && value) {
        if (value instanceof _reference_js__WEBPACK_IMPORTED_MODULE_2__["Reference"]) {
            // Setting value as Reference (Particle side). This will enforce that the type provided for
            // the handle matches the type of the reference.
            return value;
        }
        else if (value.id && value.storageKey) {
            // Setting value from raw data (Channel side).
            // TODO(shans): This can't enforce type safety here as there isn't any type data available.
            // Maybe this is OK because there's type checking on the other side of the channel?
            return new _reference_js__WEBPACK_IMPORTED_MODULE_2__["Reference"](value, new _type_js__WEBPACK_IMPORTED_MODULE_1__["ReferenceType"](type.schema.model), context);
        }
        else {
            throw new TypeError(`Cannot set reference ${name} with non-reference '${value}'`);
        }
    }
    else if (type.kind === 'schema-collection' && value) {
        // WTF?! value instanceof Set is returning false sometimes here because the Set in
        // this environment (a native code constructor) isn't equal to the Set that the value
        // has been constructed with (another native code constructor)...
        if (value.constructor.name === 'Set') {
            return value;
        }
        else if (value.length && value instanceof Object) {
            return new Set(value.map(v => sanitizeEntry(type.schema, v, name, context)));
        }
        else {
            throw new TypeError(`Cannot set collection ${name} with non-collection '${value}'`);
        }
    }
    else {
        return value;
    }
}
//# sourceMappingURL=entity.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return Reference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientReference", function() { return ClientReference; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





var ReferenceMode;
(function (ReferenceMode) {
    ReferenceMode[ReferenceMode["Unstored"] = 0] = "Unstored";
    ReferenceMode[ReferenceMode["Stored"] = 1] = "Stored";
})(ReferenceMode || (ReferenceMode = {}));
class Reference {
    constructor(data, type, context) {
        this.entity = null;
        this.storageProxy = null;
        this.handle = null;
        this.id = data.id;
        this.storageKey = data.storageKey;
        this.context = context;
        this.type = type;
        this[_symbols_js__WEBPACK_IMPORTED_MODULE_4__["SYMBOL_INTERNALS"]] = {
            serialize: () => ({ id: this.id, rawData: this.dataClone() })
        };
    }
    async ensureStorageProxy() {
        if (this.storageProxy == null) {
            this.storageProxy = await this.context.getStorageProxy(this.storageKey, this.type.referredType);
            this.handle = Object(_handle_js__WEBPACK_IMPORTED_MODULE_1__["handleFor"])(this.storageProxy, this.context.idGenerator);
            if (this.storageKey) {
                Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.storageKey === this.storageProxy.storageKey);
            }
            else {
                this.storageKey = this.storageProxy.storageKey;
            }
        }
    }
    async dereference() {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.context, 'Must have context to dereference');
        if (this.entity) {
            return this.entity;
        }
        await this.ensureStorageProxy();
        this.entity = await this.handle.get(this.id);
        return this.entity;
    }
    dataClone() {
        return { storageKey: this.storageKey, id: this.id };
    }
}
/** A subclass of Reference that clients can create. */
class ClientReference extends Reference {
    /** Use the newClientReference factory method instead. */
    constructor(entity, context) {
        // TODO(shans): start carrying storageKey information around on Entity objects
        super({ id: _entity_js__WEBPACK_IMPORTED_MODULE_3__["Entity"].id(entity), storageKey: null }, new _type_js__WEBPACK_IMPORTED_MODULE_2__["ReferenceType"](_entity_js__WEBPACK_IMPORTED_MODULE_3__["Entity"].entityClass(entity).type), context);
        this.mode = ReferenceMode.Unstored;
        this.entity = entity;
        this.stored = new Promise(async (resolve, reject) => {
            await this.storeReference(entity);
            resolve();
        });
    }
    async storeReference(entity) {
        await this.ensureStorageProxy();
        await this.handle.store(entity);
        this.mode = ReferenceMode.Stored;
    }
    async dereference() {
        if (this.mode === ReferenceMode.Unstored) {
            return null;
        }
        return super.dereference();
    }
    isIdentified() {
        return _entity_js__WEBPACK_IMPORTED_MODULE_3__["Entity"].isIdentified(this.entity);
    }
    static newClientReference(context) {
        return class extends ClientReference {
            constructor(entity) {
                super(entity, context);
            }
        };
    }
}
//# sourceMappingURL=reference.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Handle", function() { return Handle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collection", function() { return Collection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Singleton", function() { return Singleton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BigCollection", function() { return BigCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleFor", function() { return handleFor; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _particle_spec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */








// TODO: This won't be needed once runtime is transferred between contexts.
function cloneData(data) {
    return data;
    //return JSON.parse(JSON.stringify(data));
}
function restore(entry, entityClass) {
    Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(entityClass, 'Handles need entity classes for deserialization');
    const { id, rawData } = entry;
    const entity = new entityClass(cloneData(rawData));
    if (entry.id) {
        _entity_js__WEBPACK_IMPORTED_MODULE_5__["Entity"].identify(entity, entry.id);
    }
    // TODO some relation magic, somewhere, at some point.
    return entity;
}
/**
 * Base class for Collections and Singletons.
 */
class Handle {
    // TODO type particleId, marked as string, but called with number
    constructor(storage, idGenerator, name, particleId, canRead, canWrite) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!(storage instanceof Handle));
        this.storage = storage;
        this.idGenerator = idGenerator;
        this.name = name || this.storage.name;
        this.canRead = canRead;
        this.canWrite = canWrite;
        this._particleId = particleId;
        this.options = {
            keepSynced: true,
            notifySync: true,
            notifyUpdate: true,
            notifyDesync: false,
        };
    }
    reportUserExceptionInHost(exception, particle, method) {
        this.storage.reportExceptionInHost(new _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_1__["UserException"](exception, method, this._particleId, particle.spec.name));
    }
    reportSystemExceptionInHost(exception, method) {
        this.storage.reportExceptionInHost(new _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_1__["SystemException"](exception, method, this._particleId));
    }
    // `options` may contain any of:
    // - keepSynced (bool): load full data on startup, maintain data in proxy and resync as required
    // - notifySync (bool): if keepSynced is true, call onHandleSync when the full data is received
    // - notifyUpdate (bool): call onHandleUpdate for every change event received
    // - notifyDesync (bool): if keepSynced is true, call onHandleDesync when desync is detected
    configure(options) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.canRead, 'configure can only be called on readable Handles');
        try {
            const keys = Object.keys(this.options);
            const badKeys = Object.keys(options).filter(o => !keys.includes(o));
            if (badKeys.length > 0) {
                throw new Error(`Invalid option in Handle.configure(): ${badKeys}`);
            }
            Object.assign(this.options, options);
        }
        catch (e) {
            this.reportSystemExceptionInHost(e, 'Handle::configure');
            throw e;
        }
    }
    _serialize(entity) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(entity, `can't serialize a null entity`);
        if (entity instanceof _entity_js__WEBPACK_IMPORTED_MODULE_5__["Entity"]) {
            if (!_entity_js__WEBPACK_IMPORTED_MODULE_5__["Entity"].isIdentified(entity)) {
                this.createIdentityFor(entity);
            }
        }
        return entity[_symbols_js__WEBPACK_IMPORTED_MODULE_7__["SYMBOL_INTERNALS"]].serialize();
    }
    createIdentityFor(entity) {
        _entity_js__WEBPACK_IMPORTED_MODULE_5__["Entity"].createIdentity(entity, _id_js__WEBPACK_IMPORTED_MODULE_6__["Id"].fromString(this._id), this.idGenerator);
    }
    get type() {
        return this.storage.type;
    }
    get _id() {
        return this.storage.id;
    }
    toManifestString() {
        return `'${this._id}'`;
    }
    generateKey() {
        return this.idGenerator.newChildId(_id_js__WEBPACK_IMPORTED_MODULE_6__["Id"].fromString(this._id), 'key').toString();
    }
}
/**
 * A handle on a set of Entity data. Note that, as a set, a Collection can only
 * contain a single version of an Entity for each given ID. Further, no order is
 * implied by the set. A particle's manifest dictates the types of handles that
 * need to be connected to that particle, and the current recipe identifies
 * which handles are connected.
 */
class Collection extends Handle {
    async _notify(kind, particle, details) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.canRead, '_notify should not be called for non-readable handles');
        switch (kind) {
            case 'sync':
                await particle.callOnHandleSync(this, this._restore(details), e => this.reportUserExceptionInHost(e, particle, 'onHandleSync'));
                return;
            case 'update': {
                // tslint:disable-next-line: no-any
                const update = {};
                if ('add' in details) {
                    update.added = this._restore(details.add);
                }
                if ('remove' in details) {
                    update.removed = this._restore(details.remove);
                }
                update.originator = details.originatorId === this._particleId;
                await particle.callOnHandleUpdate(this, update, e => this.reportUserExceptionInHost(e, particle, 'onHandleUpdate'));
                return;
            }
            case 'desync':
                await particle.callOnHandleDesync(this, e => this.reportUserExceptionInHost(e, particle, 'onHandleUpdate'));
                return;
            default:
                throw new Error('unsupported');
        }
    }
    /**
     * Returns the Entity specified by id contained by the handle, or null if this id is not
     * contained by the handle.
     * @throws {Error} if this handle is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    async get(id) {
        if (!this.canRead) {
            throw new Error('Handle not readable');
        }
        return this._restore([await this.storage.get(id)])[0];
    }
    /**
     * @returns a list of the Entities contained by the handle.
     * @throws {Error} if this handle is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    async toList() {
        if (!this.canRead) {
            throw new Error('Handle not readable');
        }
        return this._restore(await this.storage.toList());
    }
    _restore(list) {
        return (list !== null) ? list.map(a => restore(a, this.entityClass)) : null;
    }
    /**
     * Stores a new entity into the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async store(entity) {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        const serialization = this._serialize(entity);
        const keys = [this.generateKey()];
        return this.storage.store(serialization, keys, this._particleId);
    }
    /**
     * Removes all known entities from the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async clear() {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        if (this.storage.clear) {
            return this.storage.clear(this._particleId);
        }
        else {
            throw new Error('clear not implemented by storage');
        }
    }
    /**
     * Removes an entity from the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async remove(entity) {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        const serialization = this._serialize(entity);
        // Remove the keys that exist at storage/proxy.
        const keys = [];
        await this.storage.remove(serialization.id, keys, this._particleId);
    }
}
/**
 * A handle on a single entity. A particle's manifest dictates
 * the types of handles that need to be connected to that particle, and
 * the current recipe identifies which handles are connected.
 */
class Singleton extends Handle {
    // Called by StorageProxy.
    async _notify(kind, particle, details) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.canRead, '_notify should not be called for non-readable handles');
        switch (kind) {
            case 'sync':
                await particle.callOnHandleSync(this, this._restore(details), e => this.reportUserExceptionInHost(e, particle, 'onHandleSync'));
                return;
            case 'update': {
                const data = this._restore(details.data);
                const oldData = this._restore(details.oldData);
                await particle.callOnHandleUpdate(this, { data, oldData }, e => this.reportUserExceptionInHost(e, particle, 'onHandleUpdate'));
                return;
            }
            case 'desync':
                await particle.callOnHandleDesync(this, e => this.reportUserExceptionInHost(e, particle, 'onHandleDesync'));
                return;
            default:
                throw new Error('unsupported');
        }
    }
    /**
     * @returns the Entity contained by the Singleton, or undefined if the Singleton is cleared.
     * @throws {Error} if this Singleton is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    async get() {
        if (!this.canRead) {
            throw new Error('Handle not readable');
        }
        const model = await this.storage.get();
        return this._restore(model);
    }
    _restore(model) {
        if (model == null) {
            return null;
        }
        if (this.type instanceof _type_js__WEBPACK_IMPORTED_MODULE_4__["EntityType"]) {
            return restore(model, this.entityClass);
        }
        if (this.type instanceof _type_js__WEBPACK_IMPORTED_MODULE_4__["InterfaceType"]) {
            return _particle_spec_js__WEBPACK_IMPORTED_MODULE_2__["ParticleSpec"].fromLiteral(model);
        }
        if (this.type instanceof _type_js__WEBPACK_IMPORTED_MODULE_4__["ReferenceType"]) {
            return new _reference_js__WEBPACK_IMPORTED_MODULE_3__["Reference"](model, this.type, this.storage.pec);
        }
        throw new Error(`Don't know how to deliver handle data of type ${this.type}`);
    }
    /**
     * Stores a new entity into the Singleton, replacing any existing entity.
     * @throws {Error} if this Singleton is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async set(entity) {
        try {
            if (!this.canWrite) {
                throw new Error('Handle not writeable');
            }
            const serialization = this._serialize(entity);
            return this.storage.set(serialization, this._particleId);
        }
        catch (e) {
            this.reportSystemExceptionInHost(e, 'Handle::set');
            throw e;
        }
    }
    /**
     * Clears any entity currently in the Singleton.
     * @throws {Error} if this Singleton is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async clear() {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        return this.storage.clear(this._particleId);
    }
}
/**
 * Provides paginated read access to a BigCollection. Conforms to the javascript iterator protocol
 * but is not marked as iterable because next() is async, which is currently not supported by
 * implicit iteration in Javascript.
 */
class Cursor {
    constructor(parent, cursorId) {
        this._parent = parent;
        this._cursorId = cursorId;
    }
    /**
     * Returns {value: [items], done: false} while there are items still available, or {done: true}
     * when the cursor has completed reading the collection.
     */
    async next() {
        const data = await this._parent.storage.cursorNext(this._cursorId);
        if (!data.done) {
            data.value = data.value.map(a => restore(a, this._parent.entityClass));
        }
        return data;
    }
    /**
     * Terminates the streamed read. This must be called if a cursor is no longer needed but has not
     * yet completed streaming (i.e. next() hasn't returned {done: true}).
     */
    close() {
        this._parent.storage.cursorClose(this._cursorId);
    }
}
/**
 * A handle on a large set of Entity data. Similar to Collection, except the complete set of
 * entities is not available directly; use stream() to read the full set. Particles wanting to
 * operate on BigCollections should do so in the setHandles() call, since BigCollections do not
 * trigger onHandleSync() or onHandleUpdate().
 */
class BigCollection extends Handle {
    configure(options) {
        throw new Error('BigCollections do not support sync/update configuration');
    }
    async _notify(kind, particle, details) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.canRead, '_notify should not be called for non-readable handles');
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(kind === 'sync', 'BigCollection._notify only supports sync events');
        await particle.callOnHandleSync(this, [], e => this.reportUserExceptionInHost(e, particle, 'onHandleSync'));
    }
    /**
     * Stores a new entity into the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async store(entity) {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        const serialization = this._serialize(entity);
        const keys = [this.generateKey()];
        return this.storage.store(serialization, keys, this._particleId);
    }
    /**
     * Removes an entity from the Handle.
     * @throws {Error} if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     * in the particle's manifest.
     */
    async remove(entity) {
        if (!this.canWrite) {
            throw new Error('Handle not writeable');
        }
        const serialization = this._serialize(entity);
        await this.storage.remove(serialization.id, [], this._particleId);
    }
    /**
     * @returns a Cursor instance that iterates over the full set of entities, reading `pageSize`
     * entities at a time. The cursor views a snapshot of the collection, locked to the version
     * at which the cursor is created.
     *
     * By default items are returned in order of original insertion into the collection (with the
     * caveat that items removed during a streamed read may be returned at the end). Set `forward`
     * to false to return items in reverse insertion order.
     *
     * @throws {Error} if this Singleton is not configured as a readable handle (i.e. 'in' or 'inout')
     * in the particle's manifest.
     */
    async stream({ pageSize, forward = true }) {
        if (!this.canRead) {
            throw new Error('Handle not readable');
        }
        if (isNaN(pageSize) || pageSize < 1) {
            throw new Error('Streamed reads require a positive pageSize');
        }
        const cursorId = await this.storage.stream(pageSize, forward);
        return new Cursor(this, cursorId);
    }
}
function handleFor(storage, idGenerator, name = null, particleId = '', canRead = true, canWrite = true) {
    let handle;
    if (storage.type instanceof _type_js__WEBPACK_IMPORTED_MODULE_4__["CollectionType"]) {
        handle = new Collection(storage, idGenerator, name, particleId, canRead, canWrite);
    }
    else if (storage.type instanceof _type_js__WEBPACK_IMPORTED_MODULE_4__["BigCollectionType"]) {
        handle = new BigCollection(storage, idGenerator, name, particleId, canRead, canWrite);
    }
    else {
        handle = new Singleton(storage, idGenerator, name, particleId, canRead, canWrite);
    }
    const type = storage.type.getContainedType() || storage.type;
    if (type instanceof _type_js__WEBPACK_IMPORTED_MODULE_4__["EntityType"]) {
        handle.entityClass = type.entitySchema.entityClass(storage.pec);
    }
    return handle;
}
//# sourceMappingURL=handle.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropagatedException", function() { return PropagatedException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SystemException", function() { return SystemException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserException", function() { return UserException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportSystemException", function() { return reportSystemException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerSystemExceptionHandler", function() { return registerSystemExceptionHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeSystemExceptionHandler", function() { return removeSystemExceptionHandler; });
/** An exception that is to be propagated back to the host. */
class PropagatedException extends Error {
    constructor(cause, method, particleId, particleName) {
        super();
        this.cause = cause;
        this.method = method;
        this.particleId = particleId;
        this.particleName = particleName;
        this.stack += `\nCaused by: ${this.cause.stack}`;
    }
    toLiteral() {
        return {
            exceptionType: this.constructor.name,
            cause: {
                name: this.cause.name,
                message: this.cause.message,
                stack: this.cause.stack,
            },
            method: this.method,
            particleId: this.particleId,
            particleName: this.particleName,
            stack: this.stack,
        };
    }
    static fromLiteral(literal) {
        const cause = literal.cause;
        let exception;
        switch (literal.exceptionType) {
            case SystemException.name:
                exception = new SystemException(cause, literal.method, literal.particleId, literal.particleName);
                break;
            case UserException.name:
                exception = new UserException(cause, literal.method, literal.particleId, literal.particleName);
                break;
            default:
                throw new Error(`Unknown exception type: ${literal.exceptionType}`);
        }
        exception.stack = literal.stack;
        return exception;
    }
}
/** An exception thrown in Arcs runtime code. */
class SystemException extends PropagatedException {
    get message() {
        const particleName = this.particleName ? this.particleName : this.particleId;
        return `SystemException: exception ${this.cause.name} raised when invoking system function ${this.method} on behalf of particle ${particleName}: ${this.cause.message}`;
    }
}
/** An exception thrown in the user particle code (as opposed to an error in the Arcs runtime). */
class UserException extends PropagatedException {
    get message() {
        const particleName = this.particleName ? this.particleName : this.particleId;
        return `UserException: exception ${this.cause.name} raised when invoking function ${this.method} on particle ${particleName}: ${this.cause.message}`;
    }
}
const systemHandlers = [];
function reportSystemException(exception) {
    for (const handler of systemHandlers) {
        handler(exception);
    }
}
function registerSystemExceptionHandler(handler) {
    if (!systemHandlers.includes(handler)) {
        systemHandlers.push(handler);
    }
}
function removeSystemExceptionHandler(handler) {
    const idx = systemHandlers.indexOf(handler);
    if (idx > -1) {
        systemHandlers.splice(idx, 1);
    }
}
registerSystemExceptionHandler((exception) => {
    console.log(exception.method, exception.particleName);
    throw exception;
});
//# sourceMappingURL=arc-exceptions.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdGenerator", function() { return IdGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Id", function() { return Id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcId", function() { return ArcId; });
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Generates new IDs which are rooted in the current session. Only one IdGenerator should be instantiated for each running Arc, and all of the
 * IDs created should be created using that same IdGenerator instance.
 */
class IdGenerator {
    /** Use the newSession factory method instead. */
    constructor(currentSessionId) {
        this._nextComponentId = 0;
        this._currentSessionId = currentSessionId;
    }
    /** Generates a new random session ID to use when creating new IDs. */
    static newSession() {
        const sessionId = Math.floor(_random_js__WEBPACK_IMPORTED_MODULE_0__["Random"].next() * Math.pow(2, 50)) + '';
        return new IdGenerator(sessionId);
    }
    /**
     * Intended only for testing the IdGenerator class itself. Lets you specify the session ID manually. Prefer using the real
     * IdGenerator.newSession() method when testing other classes.
     */
    static createWithSessionIdForTesting(sessionId) {
        return new IdGenerator(sessionId);
    }
    newArcId(name) {
        return ArcId._newArcIdInternal(this._currentSessionId, name);
    }
    /**
     * Creates a new ID, as a child of the given parentId. The given subcomponent will be appended to the component hierarchy of the given ID, but
     * the generator's random session ID will be used as the ID's root.
     */
    newChildId(parentId, subcomponent = '') {
        // Append (and increment) a counter to the subcomponent, to ensure that it is unique.
        subcomponent += this._nextComponentId++;
        return Id._newIdInternal(this._currentSessionId, [...parentId.idTree, subcomponent]);
    }
    get currentSessionIdForTesting() {
        return this._currentSessionId;
    }
}
/**
 * An immutable object consisting of two components: a root, and an idTree. The root is the session ID from the particular session in which the
 * ID was constructed (see the IdGenerator class). The idTree is a list of subcomponents, forming a hierarchy of IDs (child IDs are created by
 * appending subcomponents to their parent ID's idTree).
 */
class Id {
    /** Protected constructor. Use IdGenerator to create new IDs instead. */
    constructor(root, idTree = []) {
        /** The components of the idTree. */
        this.idTree = [];
        this.root = root;
        this.idTree = idTree;
    }
    /** Creates a new ID. Use IdGenerator to create new IDs instead. */
    static _newIdInternal(root, idTree = []) {
        return new Id(root, idTree);
    }
    /** Parses a string representation of an ID (see toString). */
    static fromString(str) {
        const bits = str.split(':');
        if (bits[0].startsWith('!')) {
            const root = bits[0].slice(1);
            const idTree = bits.slice(1).filter(component => component.length > 0);
            return new Id(root, idTree);
        }
        else {
            return new Id('', bits);
        }
    }
    /** Returns the full ID string. */
    toString() {
        return `!${this.root}:${this.idTree.join(':')}`;
    }
    /** Returns the idTree as as string (without the root). */
    idTreeAsString() {
        return this.idTree.join(':');
    }
    equal(id) {
        if (id.root !== this.root || id.idTree.length !== this.idTree.length) {
            return false;
        }
        for (let i = 0; i < id.idTree.length; i++) {
            if (id.idTree[i] !== this.idTree[i]) {
                return false;
            }
        }
        return true;
    }
}
class ArcId extends Id {
    /** Creates a new Arc ID. Use IdGenerator to create new IDs instead. */
    static _newArcIdInternal(root, name) {
        return new ArcId(root, [name]);
    }
    /** Creates a new Arc ID with the given name. For convenience in unit testing only; otherwise use IdGenerator to create new IDs instead. */
    static newForTest(id) {
        return IdGenerator.newSession().newArcId(id);
    }
}
//# sourceMappingURL=id.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Random", function() { return Random; });
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class RNG {
}
/**
 * A basic random number generator using Math.random();
 */
class MathRandomRNG extends RNG {
    next() {
        return Math.random();
    }
}
// Singleton Pattern
const random = new MathRandomRNG();
class Random {
    static next() {
        return random.next();
    }
}
//# sourceMappingURL=random.js.map

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYMBOL_INTERNALS", function() { return SYMBOL_INTERNALS; });
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// TypeScript seems to lose the necessary type info if this symbol is wrapped in an object and then
// used as an interface key (e.g. 'interface Foo { [Symbols.internals]: {...} }'), so we just have
// to export it as a standard variable. See the EntityInternals class for the usage of this symbol.
const SYMBOL_INTERNALS = Symbol('internals');
//# sourceMappingURL=symbols.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlotInfo", function() { return SlotInfo; });
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class SlotInfo {
    constructor(formFactor, handle) {
        this.formFactor = formFactor;
        this.handle = handle;
    }
    toLiteral() {
        return this;
    }
    static fromLiteral({ formFactor, handle }) {
        return new SlotInfo(formFactor, handle);
    }
}
//# sourceMappingURL=slot-info.js.map

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcInfo", function() { return ArcInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcHandle", function() { return ArcHandle; });
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Equivalent to an Entity with Schema { serialization Text }
class ArcInfo {
    constructor(arcId, serialization) {
        this.id = arcId.toString();
        // TODO: remove the import-removal hack when import statements no longer appear
        // in serialized manifests, or deal with them correctly if they end up staying
        this.serialization = serialization.replace(/\bimport .*\n/g, '');
    }
    // Retrieves the serialized string from a stored instance of ArcInfo.
    static extractSerialization(data) {
        return data.serialization.replace(/\bimport .*\n/g, '');
    }
}
class ArcHandle {
    constructor(id, storageKey, type, tags) {
        this.id = id;
        this.storageKey = storageKey;
        this.type = type;
        this.tags = tags;
    }
}
//# sourceMappingURL=synthetic-types.js.map

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeVariableInfo", function() { return TypeVariableInfo; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _schema_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



class TypeVariableInfo {
    constructor(name, canWriteSuperset, canReadSubset) {
        this.name = name;
        this._canWriteSuperset = canWriteSuperset;
        this._canReadSubset = canReadSubset;
        this._resolution = null;
    }
    /**
     * Merge both the read subset (upper bound) and write superset (lower bound) constraints
     * of two variables together. Use this when two separate type variables need to resolve
     * to the same value.
     */
    maybeMergeConstraints(variable) {
        if (!this.maybeMergeCanReadSubset(variable.canReadSubset)) {
            return false;
        }
        return this.maybeMergeCanWriteSuperset(variable.canWriteSuperset);
    }
    /**
     * Merge a type variable's read subset (upper bound) constraints into this variable.
     * This is used to accumulate read constraints when resolving a handle's type.
     */
    maybeMergeCanReadSubset(constraint) {
        if (constraint == null) {
            return true;
        }
        if (this.canReadSubset == null) {
            this.canReadSubset = constraint;
            return true;
        }
        if (this.canReadSubset instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["SlotType"] && constraint instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["SlotType"]) {
            // TODO: formFactor compatibility, etc.
            return true;
        }
        if (this.canReadSubset instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["EntityType"] && constraint instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["EntityType"]) {
            const mergedSchema = _schema_js__WEBPACK_IMPORTED_MODULE_1__["Schema"].intersect(this.canReadSubset.entitySchema, constraint.entitySchema);
            if (!mergedSchema) {
                return false;
            }
            this.canReadSubset = new _type_js__WEBPACK_IMPORTED_MODULE_2__["EntityType"](mergedSchema);
            return true;
        }
        return false;
    }
    /**
     * merge a type variable's write superset (lower bound) constraints into this variable.
     * This is used to accumulate write constraints when resolving a handle's type.
     */
    maybeMergeCanWriteSuperset(constraint) {
        if (constraint == null) {
            return true;
        }
        if (this.canWriteSuperset == null) {
            this.canWriteSuperset = constraint;
            return true;
        }
        if (this.canWriteSuperset instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["SlotType"] && constraint instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["SlotType"]) {
            // TODO: formFactor compatibility, etc.
            return true;
        }
        if (this.canWriteSuperset instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["EntityType"] && constraint instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["EntityType"]) {
            const mergedSchema = _schema_js__WEBPACK_IMPORTED_MODULE_1__["Schema"].union(this.canWriteSuperset.entitySchema, constraint.entitySchema);
            if (!mergedSchema) {
                return false;
            }
            this.canWriteSuperset = new _type_js__WEBPACK_IMPORTED_MODULE_2__["EntityType"](mergedSchema);
            return true;
        }
        return false;
    }
    isSatisfiedBy(type) {
        const constraint = this._canWriteSuperset;
        if (!constraint) {
            return true;
        }
        if (!(constraint instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["EntityType"]) || !(type instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["EntityType"])) {
            throw new Error(`constraint checking not implemented for ${this} and ${type}`);
        }
        return type.getEntitySchema().isMoreSpecificThan(constraint.getEntitySchema());
    }
    get resolution() {
        if (this._resolution) {
            return this._resolution.resolvedType();
        }
        return null;
    }
    isValidResolutionCandidate(value) {
        const elementType = value.resolvedType().getContainedType();
        if (elementType instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["TypeVariable"] && elementType.variable === this) {
            return { result: false, detail: 'variable cannot resolve to collection of itself' };
        }
        return { result: true };
    }
    set resolution(value) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this._resolution);
        const isValid = this.isValidResolutionCandidate(value);
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(isValid.result, isValid.detail);
        let probe = value;
        while (probe) {
            if (!(probe instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["TypeVariable"])) {
                break;
            }
            if (probe.variable === this) {
                return;
            }
            probe = probe.variable.resolution;
        }
        this._resolution = value;
        this._canWriteSuperset = null;
        this._canReadSubset = null;
    }
    get canWriteSuperset() {
        if (this._resolution) {
            Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this._canWriteSuperset);
            if (this._resolution instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["TypeVariable"]) {
                return this._resolution.variable.canWriteSuperset;
            }
            return null;
        }
        return this._canWriteSuperset;
    }
    set canWriteSuperset(value) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this._resolution);
        this._canWriteSuperset = value;
    }
    get canReadSubset() {
        if (this._resolution) {
            Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this._canReadSubset);
            if (this._resolution instanceof _type_js__WEBPACK_IMPORTED_MODULE_2__["TypeVariable"]) {
                return this._resolution.variable.canReadSubset;
            }
            return null;
        }
        return this._canReadSubset;
    }
    set canReadSubset(value) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this._resolution);
        this._canReadSubset = value;
    }
    get hasConstraint() {
        return this._canReadSubset !== null || this._canWriteSuperset !== null;
    }
    canEnsureResolved() {
        if (this._resolution) {
            return this._resolution.canEnsureResolved();
        }
        if (this._canWriteSuperset || this._canReadSubset) {
            return true;
        }
        return false;
    }
    maybeEnsureResolved() {
        if (this._resolution) {
            return this._resolution.maybeEnsureResolved();
        }
        if (this._canWriteSuperset) {
            this.resolution = this._canWriteSuperset;
            return true;
        }
        if (this._canReadSubset) {
            this.resolution = this._canReadSubset;
            return true;
        }
        return false;
    }
    toLiteral() {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.resolution == null);
        return this.toLiteralIgnoringResolutions();
    }
    toLiteralIgnoringResolutions() {
        return {
            name: this.name,
            canWriteSuperset: this._canWriteSuperset && this._canWriteSuperset.toLiteral(),
            canReadSubset: this._canReadSubset && this._canReadSubset.toLiteral()
        };
    }
    static fromLiteral(data) {
        return new TypeVariableInfo(data.name, data.canWriteSuperset ? _type_js__WEBPACK_IMPORTED_MODULE_2__["Type"].fromLiteral(data.canWriteSuperset) : null, data.canReadSubset ? _type_js__WEBPACK_IMPORTED_MODULE_2__["Type"].fromLiteral(data.canReadSubset) : null);
    }
    isResolved() {
        return (this._resolution && this._resolution.isResolved());
    }
}
//# sourceMappingURL=type-variable-info.js.map

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckType", function() { return CheckType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Check", function() { return Check; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckBooleanExpression", function() { return CheckBooleanExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckHasTag", function() { return CheckHasTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckIsFromHandle", function() { return CheckIsFromHandle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCheck", function() { return createCheck; });
/* harmony import */ var _particle_spec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


/** The different types of trust checks that particles can make. */
var CheckType;
(function (CheckType) {
    CheckType["HasTag"] = "has-tag";
    CheckType["IsFromHandle"] = "is-from-handle";
})(CheckType || (CheckType = {}));
class Check {
    constructor(target, expression) {
        this.target = target;
        this.expression = expression;
    }
    toManifestString() {
        let targetString;
        if (this.target instanceof _particle_spec_js__WEBPACK_IMPORTED_MODULE_0__["HandleConnectionSpec"]) {
            targetString = this.target.name;
        }
        else {
            targetString = `${this.target.name} data`;
        }
        return `check ${targetString} ${this.expression.toManifestString()}`;
    }
}
/** A boolean expression inside a trust check. */
class CheckBooleanExpression {
    constructor(type, children) {
        this.type = type;
        this.children = children;
    }
    /**
     * @inheritdoc
     * @param requireParens Indicates whether to enclose the expression inside parentheses. All nested boolean expressions must have parentheses,
     *     but a top-level expression doesn't need to.
     */
    toManifestString(requireParens = false) {
        const str = this.children.map(child => child.toManifestString(/* requireParens= */ true)).join(` ${this.type} `);
        return requireParens ? `(${str})` : str;
    }
}
/** A check condition of the form 'check x is <tag>'. */
class CheckHasTag {
    constructor(tag) {
        this.tag = tag;
        this.type = CheckType.HasTag;
    }
    static fromASTNode(astNode) {
        return new CheckHasTag(astNode.tag);
    }
    toManifestString() {
        return `is ${this.tag}`;
    }
}
/** A check condition of the form 'check x is from handle <handle>'. */
class CheckIsFromHandle {
    constructor(parentHandle) {
        this.parentHandle = parentHandle;
        this.type = CheckType.IsFromHandle;
    }
    static fromASTNode(astNode, handleConnectionMap) {
        const parentHandle = handleConnectionMap.get(astNode.parentHandle);
        if (!parentHandle) {
            throw new Error(`Unknown "check is from handle" handle name: ${parentHandle}.`);
        }
        return new CheckIsFromHandle(parentHandle);
    }
    toManifestString() {
        return `is from handle ${this.parentHandle.name}`;
    }
}
/** Converts the given AST node into a CheckCondition object. */
function createCheckCondition(astNode, handleConnectionMap) {
    switch (astNode.checkType) {
        case CheckType.HasTag:
            return CheckHasTag.fromASTNode(astNode);
        case CheckType.IsFromHandle:
            return CheckIsFromHandle.fromASTNode(astNode, handleConnectionMap);
        default:
            throw new Error('Unknown check type.');
    }
}
/** Converts the given AST node into a CheckExpression object. */
function createCheckExpression(astNode, handleConnectionMap) {
    if (astNode.kind === 'particle-trust-check-boolean-expression') {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_1__["assert"])(astNode.children.length >= 2, 'Boolean check expressions must have at least two children.');
        return new CheckBooleanExpression(astNode.operator, astNode.children.map(child => createCheckExpression(child, handleConnectionMap)));
    }
    else {
        return createCheckCondition(astNode, handleConnectionMap);
    }
}
/** Converts the given AST node into a Check object. */
function createCheck(checkTarget, astNode, handleConnectionMap) {
    const expression = createCheckExpression(astNode.expression, handleConnectionMap);
    return new Check(checkTarget, expression);
}
//# sourceMappingURL=particle-check.js.map

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClaimType", function() { return ClaimType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClaimIsTag", function() { return ClaimIsTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClaimDerivesFrom", function() { return ClaimDerivesFrom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClaim", function() { return createClaim; });
/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/** The different types of trust claims that particles can make. */
var ClaimType;
(function (ClaimType) {
    ClaimType["IsTag"] = "is-tag";
    ClaimType["DerivesFrom"] = "derives-from";
})(ClaimType || (ClaimType = {}));
class ClaimIsTag {
    constructor(handle, isNot, tag) {
        this.handle = handle;
        this.isNot = isNot;
        this.tag = tag;
        this.type = ClaimType.IsTag;
    }
    static fromASTNode(handle, astNode) {
        return new ClaimIsTag(handle, astNode.isNot, astNode.tag);
    }
    toManifestString() {
        return `claim ${this.handle.name} is ${this.isNot ? 'not ' : ''}${this.tag}`;
    }
}
class ClaimDerivesFrom {
    constructor(handle, parentHandles) {
        this.handle = handle;
        this.parentHandles = parentHandles;
        this.type = ClaimType.DerivesFrom;
    }
    static fromASTNode(handle, astNode, handleConnectionMap) {
        // Convert handle names into HandleConnectionSpec objects.
        const parentHandles = astNode.parentHandles.map(parentHandleName => {
            const parentHandle = handleConnectionMap.get(parentHandleName);
            if (!parentHandle) {
                throw new Error(`Unknown "derives from" handle name: ${parentHandle}.`);
            }
            return parentHandle;
        });
        return new ClaimDerivesFrom(handle, parentHandles);
    }
    toManifestString() {
        return `claim ${this.handle.name} derives from ${this.parentHandles.map(h => h.name).join(' and ')}`;
    }
}
function createClaim(handle, astNode, handleConnectionMap) {
    switch (astNode.claimType) {
        case ClaimType.IsTag:
            return ClaimIsTag.fromASTNode(handle, astNode);
        case ClaimType.DerivesFrom:
            return ClaimDerivesFrom.fromASTNode(handle, astNode, handleConnectionMap);
        default:
            throw new Error('Unknown claim type.');
    }
}
//# sourceMappingURL=particle-claim.js.map

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDiff", function() { return setDiff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDiffCustom", function() { return setDiffCustom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floatingPromiseToAudit", function() { return floatingPromiseToAudit; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

/**
 * Returns the set delta between two lists based on direct object comparison.
 */
function setDiff(from, to) {
    const result = { add: [], remove: [] };
    const items = new Set([...from, ...to]);
    const fromSet = new Set(from);
    const toSet = new Set(to);
    for (const item of items) {
        if (fromSet.has(item)) {
            if (toSet.has(item)) {
                continue;
            }
            result.remove.push(item);
            continue;
        }
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(toSet.has(item));
        result.add.push(item);
    }
    return result;
}
/**
 * Returns the set delta between two lists based on custom object comparison.
 * `keyFn` takes type T and returns the value by which items should be compared.
 */
function setDiffCustom(from, to, keyFn) {
    const result = { add: [], remove: [] };
    const items = new Map();
    const fromSet = new Map();
    const toSet = new Map();
    for (const item of from) {
        const key = keyFn(item);
        items.set(key, item);
        fromSet.set(key, item);
    }
    for (const item of to) {
        const key = keyFn(item);
        items.set(key, item);
        toSet.set(key, item);
    }
    for (const [key, item] of items) {
        if (fromSet.has(key)) {
            if (toSet.has(key)) {
                continue;
            }
            result.remove.push(item);
            continue;
        }
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(toSet.has(key));
        result.add.push(item);
    }
    return result;
}
/**
 * A hack to ignore a floating promise and bypass the linter. Promises should very rarely be left floating, and when such behaviour is intended,
 * it should be clearly marked as such. See https://tsetse.info/must-use-promises.html for details.
 *
 * TODO: Remove all usages of this function and then delete it.
 */
function floatingPromiseToAudit(promise) { }
//# sourceMappingURL=util.js.map

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlotProxy", function() { return SlotProxy; });
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A representation of a consumed slot. Retrieved from a particle using
 * particle.getSlot(name)
 */
class SlotProxy {
    constructor(apiPort, particle, slotName, providedSlots) {
        // eslint-disable-next-line func-call-spacing
        this.handlers = new Map();
        this.requestedContentTypes = new Set();
        this._isRendered = false;
        this.apiPort = apiPort;
        this.slotName = slotName;
        this.particle = particle;
        this.providedSlots = providedSlots;
    }
    get isRendered() {
        return this._isRendered;
    }
    /**
     * renders content to the slot.
     */
    render(content) {
        this.apiPort.Render(this.particle, this.slotName, content);
        Object.keys(content).forEach(key => { this.requestedContentTypes.delete(key); });
        // Slot is considered rendered, if a non-empty content was sent and all requested content types were fullfilled.
        this._isRendered = this.requestedContentTypes.size === 0 && (Object.keys(content).length > 0);
    }
    /**
     * registers a callback to be invoked when 'name' event happens.
     */
    registerEventHandler(name, f) {
        if (!this.handlers.has(name)) {
            this.handlers.set(name, []);
        }
        this.handlers.get(name).push(f);
    }
    clearEventHandlers(name) {
        this.handlers.set(name, []);
    }
    fireEvent(event) {
        for (const handler of this.handlers.get(event.handler) || []) {
            handler(event);
        }
    }
}
//# sourceMappingURL=slot-proxy.js.map

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageProxy", function() { return StorageProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionProxy", function() { return CollectionProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingletonProxy", function() { return SingletonProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BigCollectionProxy", function() { return BigCollectionProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageProxyScheduler", function() { return StorageProxyScheduler; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _platform_sourcemapped_stacktrace_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _storage_crdt_collection_model_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






var SyncState;
(function (SyncState) {
    SyncState[SyncState["none"] = 0] = "none";
    SyncState[SyncState["pending"] = 1] = "pending";
    SyncState[SyncState["full"] = 2] = "full";
})(SyncState || (SyncState = {}));
/**
 * Mediates between one or more Handles and the backing store outside the PEC.
 *
 * This can operate in two modes, based on how observing handles are configured:
 * - synchronized: the proxy maintains a copy of the full data held by the backing store, keeping
 *                 it in sync by listening to change events from the store.
 * - unsynchronized: the proxy simply passes through calls from Handles to the backing store.
 *
 * In synchronized mode we maintain a queue of sorted update events received from the backing store.
 * While events are received correctly - each update is one version ahead of our stored model - they
 * are processed immediately and observing handles are notified accordingly. If we receive an update
 * with a "future" version, the proxy is desynchronized:
 * - a request for the full data is sent to the backing store;
 * - any update events received after that (and before the response) are added to the queue;
 * - any new updates that can be applied will be (which may cause the proxy to "catch up" and resync
 *   before the full data response arrives);
 * - once the resync response is received, stale queued updates are discarded and any remaining ones
 *   are applied.
 */
class StorageProxy {
    constructor(id, type, port, pec, scheduler, name) {
        this.version = undefined;
        this.listenerAttached = false;
        this.keepSynced = false;
        this.synchronized = SyncState.none;
        this.observers = [];
        this.updates = [];
        this.barrier = null;
        this.id = id;
        this.type = type;
        this.port = port;
        this.scheduler = scheduler;
        this.name = name;
        this.updates = [];
        this.pec = pec;
    }
    static newProxy(id, type, port, pec, scheduler, name) {
        if (type instanceof _type_js__WEBPACK_IMPORTED_MODULE_4__["CollectionType"]) {
            return new CollectionProxy(id, type, port, pec, scheduler, name);
        }
        if (type instanceof _type_js__WEBPACK_IMPORTED_MODULE_4__["BigCollectionType"]) {
            return new BigCollectionProxy(id, type, port, pec, scheduler, name);
        }
        return new SingletonProxy(id, type, port, pec, scheduler, name);
    }
    reportExceptionInHost(exception) {
        // TODO: Encapsulate source-mapping of the stack trace once there are more users of the port.RaiseSystemException() call.
        if (_platform_sourcemapped_stacktrace_web_js__WEBPACK_IMPORTED_MODULE_1__["mapStackTrace"]) {
            Object(_platform_sourcemapped_stacktrace_web_js__WEBPACK_IMPORTED_MODULE_1__["mapStackTrace"])(exception.cause.stack, mappedStack => {
                exception.cause.stack = mappedStack;
                this.port.ReportExceptionInHost(exception);
            });
        }
        else {
            this.port.ReportExceptionInHost(exception);
        }
    }
    /**
     *  Called by ParticleExecutionContext to associate (potentially multiple) particle/handle pairs with this proxy.
     */
    register(particle, handle) {
        if (!handle.canRead) {
            return;
        }
        this.observers.push({ particle, handle });
        // Attach an event listener to the backing store when the first readable handle is registered.
        if (!this.listenerAttached) {
            this.port.InitializeProxy(this, x => this._onUpdate(x));
            this.listenerAttached = true;
        }
        // Change to synchronized mode as soon as we get any handle configured with keepSynced and send
        // a request to get the full model (once).
        // TODO: drop back to non-sync mode if all handles re-configure to !keepSynced
        if (handle.options.keepSynced) {
            if (!this.keepSynced) {
                this.port.SynchronizeProxy(this, x => this._onSynchronize(x));
                this.keepSynced = true;
            }
            // If a handle configured for sync notifications registers after we've received the full
            // model, notify it immediately.
            if (handle.options.notifySync && this.synchronized === SyncState.full) {
                const syncModel = this._getModelForSync();
                this.scheduler.enqueue(particle, handle, ['sync', particle, syncModel]);
            }
        }
    }
    _onSynchronize({ version, model }) {
        if (this.version !== undefined && version <= this.version) {
            console.warn(`StorageProxy '${this.id}' received stale model version ${version}; ` +
                `current is ${this.version}`);
            return;
        }
        // Replace the stored data with the new one and notify handles that are configured for it.
        if (!this._synchronizeModel(version, model)) {
            return;
        }
        // We may have queued updates that were received after a desync; discard any that are stale
        // with respect to the received model.
        this.synchronized = SyncState.full;
        while (this.updates.length > 0 && this.updates[0].version <= version) {
            this.updates.shift();
        }
        const syncModel = this._getModelForSync();
        this._notify('sync', syncModel, options => options.keepSynced && options.notifySync);
        this._processUpdates();
    }
    _onUpdate(update) {
        // Immediately notify any handles that are not configured with keepSynced but do want updates.
        if (this.observers.find(({ handle }) => !handle.options.keepSynced && handle.options.notifyUpdate)) {
            const handleUpdate = this._processUpdate(update, false);
            this._notify('update', handleUpdate, options => !options.keepSynced && options.notifyUpdate);
        }
        // Bail if we're not in synchronized mode or this is a stale event.
        if (!this.keepSynced) {
            return;
        }
        if (update.version <= this.version) {
            console.warn(`StorageProxy '${this.id}' received stale update version ${update.version}; ` +
                `current is ${this.version}`);
            return;
        }
        // Add the update to the queue and process. Most of the time the queue should be empty and
        // _processUpdates will consume this event immediately.
        this.updates.push(update);
        this.updates.sort((a, b) => a.version - b.version);
        this._processUpdates();
    }
    _notify(kind, details, predicate = (ignored) => true) {
        for (const { handle, particle } of this.observers) {
            if (predicate(handle.options)) {
                this.scheduler.enqueue(particle, handle, [kind, particle, details]);
            }
        }
    }
    _processUpdates() {
        const updateIsNext = update => {
            if (update.version === this.version + 1) {
                return true;
            }
            // Holy Layering Violation Batman
            //
            // If we are a singleton waiting for a barriered set response
            // then that set response *is* the next thing we're waiting for,
            // regardless of version numbers.
            //
            // TODO(shans): refactor this code so we don't need to layer-violate.
            if (this.barrier && update.barrier === this.barrier) {
                return true;
            }
            return false;
        };
        // Consume all queued updates whose versions are monotonically increasing from our stored one.
        while (this.updates.length > 0 && updateIsNext(this.updates[0])) {
            const update = this.updates.shift();
            // Fold the update into our stored model.
            const handleUpdate = this._processUpdate(update);
            this.version = update.version;
            // Notify handles configured with keepSynced and notifyUpdates (non-keepSynced handles are
            // notified as updates are received).
            if (handleUpdate) {
                this._notify('update', handleUpdate, options => options.keepSynced && options.notifyUpdate);
            }
        }
        // If we still have update events queued, we must have received a future version are are now
        // desynchronized. Send a request for the full model and notify handles configured for it.
        if (this.updates.length > 0) {
            if (this.synchronized !== SyncState.none) {
                this.synchronized = SyncState.none;
                this.port.SynchronizeProxy(this, x => this._onSynchronize(x));
                for (const { handle, particle } of this.observers) {
                    if (handle.options.notifyDesync) {
                        this.scheduler.enqueue(particle, handle, ['desync', particle, {}]);
                    }
                }
            }
        }
        else if (this.synchronized !== SyncState.full) {
            // If we were desynced but have now consumed all update events, we've caught up.
            this.synchronized = SyncState.full;
        }
    }
    generateBarrier() {
        return this.pec.idGenerator.newChildId(_id_js__WEBPACK_IMPORTED_MODULE_5__["Id"].fromString(this.id), 'barrier').toString();
    }
}
/**
 * Collections are synchronized in a CRDT Observed/Removed scheme.
 * Each value is identified by an ID and a set of membership keys.
 * Concurrent adds of the same value will specify the same ID but different
 * keys. A value is removed by removing all of the observed keys. A value
 * is considered to be removed if all of it's keys have been removed.
 *
 * In synchronized mode mutation takes place synchronously inside the proxy.
 * The proxy uses the originatorId to skip over redundant events sent back
 * by the storage object.
 *
 * In unsynchronized mode removal is not based on the keys observed at the
 * proxy, since the proxy does not remember the state, but instead the set
 * of keys that exist at the storage object at the time it receives the
 * request.
 */
class CollectionProxy extends StorageProxy {
    constructor() {
        super(...arguments);
        this.model = new _storage_crdt_collection_model_js__WEBPACK_IMPORTED_MODULE_3__["CrdtCollectionModel"]();
    }
    _getModelForSync() {
        return this.model.toList();
    }
    _synchronizeModel(version, model) {
        this.version = version;
        this.model = new _storage_crdt_collection_model_js__WEBPACK_IMPORTED_MODULE_3__["CrdtCollectionModel"](model);
        return true;
    }
    _processUpdate(update, apply = true) {
        if (this.synchronized === SyncState.full) {
            // If we're synchronized, then any updates we sent have
            // already been applied/notified.
            for (const { handle } of this.observers) {
                if (update.originatorId === handle._particleId) {
                    return null;
                }
            }
        }
        const added = [];
        const removed = [];
        if ('add' in update) {
            for (const { value, keys, effective } of update.add) {
                if (apply && this.model.add(value.id, value, keys) || !apply && effective) {
                    added.push(value);
                }
            }
        }
        else if ('remove' in update) {
            for (const { value, keys, effective } of update.remove) {
                const localValue = this.model.getValue(value.id);
                if (apply && this.model.remove(value.id, keys) || !apply && effective) {
                    removed.push(localValue);
                }
            }
        }
        else {
            throw new Error(`StorageProxy received invalid update event: ${JSON.stringify(update)}`);
        }
        if (added.length || removed.length) {
            const result = { originatorId: update.originatorId };
            if (added.length)
                result.add = added;
            if (removed.length)
                result.remove = removed;
            return result;
        }
        return null;
    }
    // Read ops: if we're synchronized we can just return the local copy of the data.
    // Otherwise, send a request to the backing store.
    async toList() {
        if (this.synchronized === SyncState.full) {
            return Promise.resolve(this.model.toList());
        }
        else {
            // TODO: in synchronized mode, this should integrate with SynchronizeProxy rather than
            //       sending a parallel request
            return new Promise(resolve => this.port.HandleToList(this, resolve));
        }
    }
    async get(id) {
        if (this.synchronized === SyncState.full) {
            return Promise.resolve(this.model.getValue(id));
        }
        else {
            return new Promise((resolve, reject) => this.port.HandleToList(this, r => resolve(r.find(entity => entity.id === id))));
        }
    }
    // tslint:disable-next-line: no-any
    async store(value, keys, particleId) {
        const id = value.id;
        const data = { value, keys };
        this.port.HandleStore(this, () => { }, data, particleId);
        if (this.synchronized !== SyncState.full) {
            return Promise.resolve();
        }
        if (!this.model.add(id, value, keys)) {
            return Promise.resolve();
        }
        const update = { originatorId: particleId, add: [value] };
        this._notify('update', update, options => options.notifyUpdate);
        return Promise.resolve();
    }
    async clear(particleId) {
        if (this.synchronized !== SyncState.full) {
            this.port.HandleRemoveMultiple(this, () => { }, [], particleId);
        }
        let items = this.model.toList().map(item => ({ id: item.id, keys: this.model.getKeys(item.id) }));
        this.port.HandleRemoveMultiple(this, () => { }, items, particleId);
        items = items.map(({ id, keys }) => ({ rawData: this.model.getValue(id).rawData, id, keys }));
        items = items.filter(item => this.model.remove(item.id, item.keys));
        if (items.length > 0) {
            this._notify('update', { originatorId: particleId, remove: items }, options => options.notifyUpdate);
        }
        return Promise.resolve();
    }
    async remove(id, keys, particleId) {
        if (this.synchronized !== SyncState.full) {
            const data = { id, keys: [] };
            this.port.HandleRemove(this, () => { }, data, particleId);
            return Promise.resolve();
        }
        const value = this.model.getValue(id);
        if (!value) {
            return Promise.resolve();
        }
        if (keys.length === 0) {
            keys = this.model.getKeys(id);
        }
        const data = { id, keys };
        this.port.HandleRemove(this, () => { }, data, particleId);
        if (!this.model.remove(id, keys)) {
            return Promise.resolve();
        }
        const update = { originatorId: particleId, remove: [value] };
        this._notify('update', update, options => options.notifyUpdate);
        return Promise.resolve();
    }
}
/**
 * Variables are synchronized in a 'last-writer-wins' scheme. When the
 * SingletonProxy mutates the model, it sets a barrier and expects to
 * receive the barrier value echoed back in a subsequent update event.
 * Between those two points in time updates are not applied or
 * notified about as these reflect concurrent writes that did not 'win'.
 */
class SingletonProxy extends StorageProxy {
    constructor() {
        super(...arguments);
        this.model = null;
    }
    _getModelForSync() {
        return this.model;
    }
    _synchronizeModel(version, model) {
        // If there's an active barrier then we shouldn't apply the model here, because
        // there is a more recent write from the particle side that is still in flight.
        if (this.barrier != null) {
            return false;
        }
        this.version = version;
        this.model = model.length === 0 ? null : model[0].value;
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.model !== undefined);
        return true;
    }
    _processUpdate(update, apply = true) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])('data' in update);
        if (!apply) {
            return update;
        }
        // If we have set a barrier, suppress updates until after
        // we have seen the barrier return via an update.
        if (this.barrier != null) {
            if (update.barrier === this.barrier) {
                this.barrier = null;
                // HOLY LAYERING VIOLATION BATMAN
                //
                // We just cleared a barrier which means we are now synchronized. If we weren't
                // synchronized already, then we need to tell the handles.
                //
                // TODO(shans): refactor this code so we don't need to layer-violate.
                if (this.synchronized !== SyncState.full) {
                    this.synchronized = SyncState.full;
                    const syncModel = this._getModelForSync();
                    this._notify('sync', syncModel, options => options.keepSynced && options.notifySync);
                }
            }
            return null;
        }
        const oldData = this.model;
        this.model = update.data;
        return { ...update, oldData };
    }
    // Read ops: if we're synchronized we can just return the local copy of the data.
    // Otherwise, send a request to the backing store.
    // TODO: in synchronized mode, these should integrate with SynchronizeProxy rather than
    //       sending a parallel request
    async get() {
        if (this.synchronized === SyncState.full) {
            return Promise.resolve(this.model);
        }
        else {
            return new Promise(resolve => this.port.HandleGet(this, resolve));
        }
    }
    async set(entity, particleId) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(entity !== undefined);
        if (JSON.stringify(this.model) === JSON.stringify(entity)) {
            return Promise.resolve();
        }
        let barrier;
        // If we're setting to this handle but we aren't listening to firebase,
        // then there's no point creating a barrier. In fact, if the response
        // to the set comes back before a listener is registered then this proxy will
        // end up locked waiting for a barrier that will never arrive.
        if (this.listenerAttached) {
            barrier = this.generateBarrier();
        }
        else {
            barrier = null;
        }
        const oldData = this.model;
        // TODO: is this already a clone?
        this.model = JSON.parse(JSON.stringify(entity));
        this.barrier = barrier;
        this.port.HandleSet(this, entity, particleId, barrier);
        const update = { originatorId: particleId, data: entity, oldData };
        this._notify('update', update, options => options.notifyUpdate);
        return Promise.resolve();
    }
    async clear(particleId) {
        if (this.model == null) {
            return Promise.resolve();
        }
        const barrier = this.generateBarrier();
        const oldData = this.model;
        this.model = null;
        this.barrier = barrier;
        this.port.HandleClear(this, particleId, barrier);
        const update = { originatorId: particleId, data: null, oldData };
        this._notify('update', update, options => options.notifyUpdate);
        return Promise.resolve();
    }
}
// BigCollections are never synchronized. No local state is held and all operations are passed
// directly through to the backing store.
class BigCollectionProxy extends StorageProxy {
    register(particle, handle) {
        if (handle.canRead) {
            this.scheduler.enqueue(particle, handle, ['sync', particle, {}]);
        }
    }
    _getModelForSync() {
        throw new Error('_getModelForSync not implemented for BigCollectionProxy');
    }
    _processUpdate() {
        throw new Error('_processUpdate not implemented for BigCollectionProxy');
    }
    _synchronizeModel() {
        throw new Error('_synchronizeModel not implemented for BigCollectionProxy');
    }
    // TODO: surface get()
    async get(id) {
        throw new Error('unimplemented');
    }
    async store(value, keys, particleId) {
        return new Promise(resolve => this.port.HandleStore(this, resolve, { value, keys }, particleId));
    }
    async remove(id, keys, particleId) {
        return new Promise(resolve => this.port.HandleRemove(this, resolve, { id, keys: [] }, particleId));
    }
    async stream(pageSize, forward) {
        return new Promise(resolve => this.port.HandleStream(this, resolve, pageSize, forward));
    }
    // tslint:disable-next-line: no-any
    async cursorNext(cursorId) {
        return new Promise(resolve => this.port.StreamCursorNext(this, resolve, cursorId));
    }
    async cursorClose(cursorId) {
        this.port.StreamCursorClose(this, cursorId);
        return Promise.resolve();
    }
}
class StorageProxyScheduler {
    constructor() {
        this._scheduled = false;
        this._queues = new Map();
        this._idleResolver = null;
        this._idle = null;
        this._scheduled = false;
        // Particle -> {Handle -> [Queue of events]}
        this._queues = new Map();
    }
    // TODO: break apart args here, sync events should flush the queue.
    enqueue(particle, handle, args) {
        if (!this._queues.has(particle)) {
            this._queues.set(particle, new Map());
        }
        const byHandle = this._queues.get(particle);
        if (!byHandle.has(handle)) {
            byHandle.set(handle, []);
        }
        const queue = byHandle.get(handle);
        queue.push(args);
        this._schedule();
    }
    get busy() {
        return this._queues.size > 0;
    }
    _updateIdle() {
        if (this._idleResolver && !this.busy) {
            this._idleResolver();
            this._idle = null;
            this._idleResolver = null;
        }
    }
    get idle() {
        if (!this.busy) {
            return Promise.resolve();
        }
        if (!this._idle) {
            this._idle = new Promise(resolve => this._idleResolver = resolve);
        }
        return this._idle;
    }
    _schedule() {
        if (this._scheduled) {
            return;
        }
        this._scheduled = true;
        setTimeout(() => {
            this._scheduled = false;
            this._dispatch();
        }, 0);
    }
    _dispatch() {
        // TODO: should we process just one particle per task?
        while (this._queues.size > 0) {
            const particle = [...this._queues.keys()][0];
            const byHandle = this._queues.get(particle);
            this._queues.delete(particle);
            for (const [handle, queue] of byHandle.entries()) {
                for (const args of queue) {
                    try {
                        handle._notify(...args);
                    }
                    catch (e) {
                        console.error('Error dispatching to particle', e);
                        handle.storage.reportExceptionInHost(new _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_2__["SystemException"](e, handle._particleId, 'StorageProxyScheduler::_dispatch'));
                    }
                }
            }
        }
        this._updateIdle();
    }
}
//# sourceMappingURL=storage-proxy.js.map

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStackTrace", function() { return mapStackTrace; });
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// This is only relevant in the web devtools, but we need to
// ensure that the stack trace is passed through on node
// so that system exceptions are plumbed properly.
const mapStackTrace = (x, f) => f([x]);


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrdtCollectionModel", function() { return CrdtCollectionModel; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

class CrdtCollectionModel {
    constructor(model) {
        // id => {value, Set[keys]}
        this.items = new Map();
        if (model) {
            for (let { id, value, keys } of model) {
                if (!keys) {
                    keys = [];
                }
                this.items.set(id, { value, keys: new Set(keys) });
            }
        }
    }
    /**
     * Adds membership, `keys`, of `value` indexed by `id` to this collection.
     * Returns whether the change is effective (`id` is new to the collection,
     * or `value` is different to the value previously stored).
     */
    add(id, value, keys) {
        // Ensure that keys is actually an array, not a single string.
        // TODO(shans): remove this when all callers are implemented in typeScript.
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(keys.length > 0 && typeof keys === 'object', 'add requires a list of keys');
        let item = this.items.get(id);
        let effective = false;
        if (!item) {
            item = { value, keys: new Set(keys) };
            this.items.set(id, item);
            effective = true;
        }
        else {
            let newKeys = false;
            for (const key of keys) {
                if (!item.keys.has(key)) {
                    newKeys = true;
                }
                item.keys.add(key);
            }
            if (!this._equals(item.value, value)) {
                Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(newKeys, 'cannot add without new keys. incoming=' + keys.join(',') + ' existing=' + [...item.keys].join(','));
                item.value = value;
                effective = true;
            }
        }
        return effective;
    }
    _equals(value1, value2) {
        if (Boolean(value1) !== Boolean(value2)) {
            return false;
        }
        if (!value1) {
            return true;
        }
        const type1 = typeof (value1);
        if (type1 !== typeof (value2)) {
            return false;
        }
        if (type1 === 'object') {
            const keys = Object.keys(value1);
            if (keys.length !== Object.keys(value2).length) {
                return false;
            }
            return keys.every(key => this._equals(value1[key], value2[key]));
        }
        return JSON.stringify(value1) === JSON.stringify(value2);
    }
    /**
     * Removes the membership, `keys`, of the value indexed by `id` from this collection.
     * Returns whether the change is effective (the value is no longer present
     * in the collection because all of the keys have been removed).
     */
    remove(id, keys) {
        const item = this.items.get(id);
        if (!item) {
            return false;
        }
        for (const key of keys) {
            item.keys.delete(key);
        }
        const effective = item.keys.size === 0;
        if (effective) {
            this.items.delete(id);
        }
        return effective;
    }
    toLiteral() {
        const result = [];
        for (const [id, { value, keys }] of this.items.entries()) {
            result.push({ id, value, keys: [...keys] });
        }
        return result;
    }
    toList() {
        return [...this.items.values()].map(item => item.value);
    }
    has(id) {
        return this.items.has(id);
    }
    getKeys(id) {
        const item = this.items.get(id);
        return item ? [...item.keys] : [];
    }
    getValue(id) {
        const item = this.items.get(id);
        return item ? item.value : null;
    }
    get size() {
        return this.items.size;
    }
}
//# sourceMappingURL=crdt-collection-model.js.map

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityPackager", function() { return EntityPackager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WasmContainer", function() { return WasmContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WasmParticle", function() { return WasmParticle; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




// Encodes/decodes the wire format for transferring entities over the wasm boundary.
// Note that entities must have an id before serializing for use in a wasm particle.
//
//  <singleton> = <id-length>:<id>|<name>:<value>|<name>:<value>| ... |
//  <value> depends on the field type:
//    Text       <name>:T<length>:<text>
//    URL        <name>:U<length>:<text>
//    Number     <name>:N<number>:
//    Boolean    <name>:B<zero-or-one>
//
//  <collection> = <num-entities>:<length>:<encoded><length>:<encoded> ...
//
// Examples:
//   Singleton:   4:id05|txt:T3:abc|lnk:U10:http://def|num:N37:|flg:B1|
//   Collection:  3:29:4:id12|txt:T4:qwer|num:N9.2:|18:6:id2670|num:N-7:|15:5:id501|flg:B0|
class EntityPackager {
    constructor(schema) {
        this.encoder = new StringEncoder();
        this.decoder = new StringDecoder();
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(schema.names.length > 0, 'At least one schema name is required for entity packaging');
        this.schema = schema;
    }
    encodeSingleton(entity) {
        return this.encoder.encodeSingleton(this.schema, entity);
    }
    encodeCollection(entities) {
        return this.encoder.encodeCollection(this.schema, entities);
    }
    decodeSingleton(str) {
        const { id, data } = this.decoder.decodeSingleton(str);
        const entity = new (this.schema.entityClass())(data);
        if (id !== '') {
            _entity_js__WEBPACK_IMPORTED_MODULE_1__["Entity"].identify(entity, id);
        }
        return entity;
    }
}
class StringEncoder {
    encodeSingleton(schema, entity) {
        const id = _entity_js__WEBPACK_IMPORTED_MODULE_1__["Entity"].id(entity);
        let encoded = id.length + ':' + id + '|';
        for (const [name, value] of Object.entries(entity)) {
            encoded += this.encodeField(schema.fields[name], name, value);
        }
        return encoded;
    }
    encodeCollection(schema, entities) {
        let encoded = entities.length + ':';
        for (const entity of entities) {
            const str = this.encodeSingleton(schema, entity);
            encoded += str.length + ':' + str;
        }
        return encoded;
    }
    encodeField(field, name, value) {
        switch (field.kind) {
            case 'schema-primitive':
                return name + ':' + field.type.substr(0, 1) + this.encodeValue(field.type, value) + '|';
            case 'schema-collection':
            case 'schema-union':
            case 'schema-tuple':
            case 'schema-reference':
                throw new Error(`'${field.kind}' not yet supported for entity packaging`);
            default:
                throw new Error(`Unknown field kind '${field.kind}' in schema`);
        }
    }
    encodeValue(type, value) {
        switch (type) {
            case 'Text':
            case 'URL':
                return value.length + ':' + value;
            case 'Number':
                return value + ':';
            case 'Boolean':
                return (value ? '1' : '0');
            case 'Bytes':
            case 'Object':
                throw new Error(`'${type}' not yet supported for entity packaging`);
            default:
                throw new Error(`Unknown primitive value type '${type}' in schema`);
        }
    }
}
class StringDecoder {
    decodeSingleton(str) {
        this.str = str;
        const len = Number(this.upTo(':'));
        const id = this.chomp(len);
        this.validate('|');
        const data = {};
        while (this.str.length > 0) {
            const name = this.upTo(':');
            const typeChar = this.chomp(1);
            data[name] = this.decodeValue(typeChar);
            this.validate('|');
        }
        return { id, data };
    }
    // Format is <size>:<key-len>:<key><value-len>:<value><key-len>:<key><value-len>:<value>...
    decodeDictionary(str) {
        this.str = str;
        const dict = {};
        let num = Number(this.upTo(':'));
        while (num--) {
            const klen = Number(this.upTo(':'));
            const key = this.chomp(klen);
            const vlen = Number(this.upTo(':'));
            dict[key] = this.chomp(vlen);
        }
        return dict;
    }
    upTo(char) {
        const i = this.str.indexOf(char);
        if (i < 0) {
            throw new Error(`Packaged entity decoding fail: expected '${char}' separator in '${this.str}'`);
        }
        const token = this.str.slice(0, i);
        this.str = this.str.slice(i + 1);
        return token;
    }
    chomp(len) {
        if (len > this.str.length) {
            throw new Error(`Packaged entity decoding fail: expected '${len}' chars to remain in '${this.str}'`);
        }
        const token = this.str.slice(0, len);
        this.str = this.str.slice(len);
        return token;
    }
    validate(token) {
        if (this.chomp(token.length) !== token) {
            throw new Error(`Packaged entity decoding fail: expected '${token}' at start of '${this.str}'`);
        }
    }
    decodeValue(typeChar) {
        switch (typeChar) {
            case 'T':
            case 'U': {
                const len = Number(this.upTo(':'));
                return this.chomp(len);
            }
            case 'N':
                return Number(this.upTo(':'));
            case 'B':
                return Boolean(this.chomp(1) === '1');
            default:
                throw new Error(`Packaged entity decoding fail: unknown or unsupported primitive value type '${typeChar}'`);
        }
    }
}
class EmscriptenWasmDriver {
    constructor(customSection) {
        // Wasm modules built by emscripten require some external memory configuration by the caller,
        // which is usually built into the glue code generated alongside the module. We're not using
        // the glue code, but if we set the EMIT_EMSCRIPTEN_METADATA flag when building, emscripten
        // will provide a custom section in the module itself with the required values.
        const METADATA_SIZE = 10;
        const METADATA_MAJOR = 0;
        const METADATA_MINOR = 1;
        const ABI_MAJOR = 0;
        const ABI_MINOR = 3;
        // The logic for reading metadata values here was copied from the emscripten source.
        const buffer = new Uint8Array(customSection);
        const metadata = [];
        let offset = 0;
        while (offset < buffer.byteLength) {
            let result = 0;
            let shift = 0;
            while (1) {
                const byte = buffer[offset++];
                result |= (byte & 0x7f) << shift;
                if (!(byte & 0x80)) {
                    break;
                }
                shift += 7;
            }
            metadata.push(result);
        }
        // The specifics of the section are not published anywhere official (yet). The values here
        // correspond to emscripten version 1.38.34:
        //   https://github.com/emscripten-core/emscripten/blob/1.38.34/tools/shared.py#L3065
        if (metadata.length !== METADATA_SIZE) {
            throw new Error(`emscripten metadata section should have ${METADATA_SIZE} values; ` +
                `got ${metadata.length}`);
        }
        if (metadata[0] !== METADATA_MAJOR || metadata[1] !== METADATA_MINOR) {
            throw new Error(`emscripten metadata version should be ${METADATA_MAJOR}.${METADATA_MINOR}; ` +
                `got ${metadata[0]}.${metadata[1]}`);
        }
        if (metadata[2] !== ABI_MAJOR || metadata[3] !== ABI_MINOR) {
            throw new Error(`emscripten ABI version should be ${ABI_MAJOR}.${ABI_MINOR}; ` +
                `got ${metadata[2]}.${metadata[3]}`);
        }
        // metadata[9] is 'tempdoublePtr'; appears to be related to pthreads and is not used here.
        this.cfg = {
            memSize: metadata[4],
            tableSize: metadata[5],
            globalBase: metadata[6],
            dynamicBase: metadata[7],
            dynamictopPtr: metadata[8],
        };
    }
    configureEnvironment(module, container, env) {
        container.memory = new WebAssembly.Memory({ initial: this.cfg.memSize, maximum: this.cfg.memSize });
        container.heapU8 = new Uint8Array(container.memory.buffer);
        container.heap32 = new Int32Array(container.memory.buffer);
        // We need to poke the address of the heap base into the memory buffer prior to instantiating.
        container.heap32[this.cfg.dynamictopPtr >> 2] = this.cfg.dynamicBase;
        Object.assign(env, {
            // Memory setup
            memory: container.memory,
            __memory_base: this.cfg.globalBase,
            table: new WebAssembly.Table({ initial: this.cfg.tableSize, maximum: this.cfg.tableSize, element: 'anyfunc' }),
            __table_base: 0,
            DYNAMICTOP_PTR: this.cfg.dynamictopPtr,
            // Heap management
            _emscripten_get_heap_size: () => container.heapU8.length,
            _emscripten_resize_heap: (size) => false,
            _emscripten_memcpy_big: (dst, src, num) => container.heapU8.set(container.heapU8.subarray(src, src + num), dst),
            // Error handling
            _systemError: (msg) => { throw new Error(container.read(msg)); },
            abortOnCannotGrowMemory: (size) => { throw new Error(`abortOnCannotGrowMemory(${size})`); },
            // Logging
            _setLogInfo: (file, line) => container.logInfo = [container.read(file), line],
            ___syscall146: (which, varargs) => container.sysWritev(which, varargs),
        });
    }
    initializeInstance(container, instance) {
        // Emscripten doesn't need main() invoked
    }
}
class KotlinWasmDriver {
    configureEnvironment(module, container, env) {
        Object.assign(env, {
            // These two are used by launcher.cpp
            Konan_js_arg_size: (index) => 1,
            Konan_js_fetch_arg: (index, ptr) => 'dummyArg',
            // These two are imported, but never used
            Konan_js_allocateArena: (array) => { },
            Konan_js_freeArena: (arenaIndex) => { },
            // These two are used by logging functions
            write: (ptr) => console.log(container.read(ptr)),
            flush: () => { },
            // Apparently used by Kotlin Memory management
            Konan_notify_memory_grow: () => this.updateMemoryViews(container),
            // Kotlin's own glue for abort and exit
            Konan_abort: (pointer) => { throw new Error('Konan_abort(' + container.read(pointer) + ')'); },
            Konan_exit: (status) => { },
            // Needed by some code that tries to get the current time in it's runtime
            Konan_date_now: (pointer) => {
                const now = Date.now();
                const high = Math.floor(now / 0xffffffff);
                const low = Math.floor(now % 0xffffffff);
                container.heap32[pointer] = low;
                container.heap32[pointer + 1] = high;
            },
        });
    }
    // Kotlin manages its own heap construction, as well as tables.
    initializeInstance(container, instance) {
        this.updateMemoryViews(container);
        // Kotlin main() must be invoked before everything else.
        instance.exports.Konan_js_main(1, 0);
    }
    updateMemoryViews(container) {
        container.memory = container.exports.memory;
        container.heapU8 = new Uint8Array(container.memory.buffer);
        container.heap32 = new Int32Array(container.memory.buffer);
    }
}
// Holds an instance of a running wasm module, which may contain multiple particles.
class WasmContainer {
    constructor() {
        this.particleMap = new Map();
        // Records file and line for console logging in C++. This is set by the console/error macros in
        // arcs.h and used immediately in the following printf call (implemented by sysWritev() below).
        this.logInfo = null;
    }
    async initialize(buffer) {
        // TODO: vet the imports/exports on 'module'
        // TODO: use compileStreaming? requires passing the fetch() Response, not its ArrayBuffer
        const module = await WebAssembly.compile(buffer);
        const driver = this.driverForModule(module);
        // Shared ENV between Emscripten and Kotlin
        const env = {
            abort: () => { throw new Error('Abort!'); },
            // Inner particle API
            _singletonSet: (p, h, encoded) => this.getParticle(p).singletonSet(h, encoded),
            _singletonClear: (p, h) => this.getParticle(p).singletonClear(h),
            _collectionStore: (p, h, encoded) => this.getParticle(p).collectionStore(h, encoded),
            _collectionRemove: (p, h, encoded) => this.getParticle(p).collectionRemove(h, encoded),
            _collectionClear: (p, h) => this.getParticle(p).collectionClear(h),
            _render: (p, slotName, template, model) => this.getParticle(p).renderImpl(slotName, template, model),
        };
        driver.configureEnvironment(module, this, env);
        const global = { 'NaN': NaN, 'Infinity': Infinity };
        this.wasm = await WebAssembly.instantiate(module, { env, global });
        this.exports = this.wasm.exports;
        driver.initializeInstance(this, this.wasm);
    }
    driverForModule(module) {
        const customSections = WebAssembly.Module.customSections(module, 'emscripten_metadata');
        if (customSections.length === 1) {
            return new EmscriptenWasmDriver(customSections[0]);
        }
        return new KotlinWasmDriver();
    }
    getParticle(innerParticle) {
        return this.particleMap.get(innerParticle);
    }
    register(particle, innerParticle) {
        this.particleMap.set(innerParticle, particle);
    }
    // Allocates memory in the wasm container.
    store(str) {
        const p = this.exports._malloc(str.length + 1);
        for (let i = 0; i < str.length; i++) {
            this.heapU8[p + i] = str.charCodeAt(i);
        }
        this.heapU8[p + str.length] = 0;
        return p;
    }
    // Currently only supports ASCII. TODO: unicode
    read(idx) {
        let str = '';
        while (idx < this.heapU8.length && this.heapU8[idx] !== 0) {
            str += String.fromCharCode(this.heapU8[idx++]);
        }
        return str;
    }
    // C++ printf support cribbed from emscripten glue js - currently only supports ASCII
    sysWritev(which, varargs) {
        const get = () => {
            varargs += 4;
            return this.heap32[(((varargs) - (4)) >> 2)];
        };
        const output = (get() === 1) ? console.log : console.error;
        const iov = get();
        const iovcnt = get();
        // TODO: does this need to be persistent across calls? (i.e. due to write buffering)
        let str = this.logInfo ? `[${this.logInfo[0]}:${this.logInfo[1]}] ` : '';
        let ret = 0;
        for (let i = 0; i < iovcnt; i++) {
            const ptr = this.heap32[(((iov) + (i * 8)) >> 2)];
            const len = this.heap32[(((iov) + (i * 8 + 4)) >> 2)];
            for (let j = 0; j < len; j++) {
                const curr = this.heapU8[ptr + j];
                if (curr === 0 || curr === 10) { // NUL or \n
                    output(str);
                    str = '';
                }
                else {
                    str += String.fromCharCode(curr);
                }
            }
            ret += len;
        }
        this.logInfo = null;
        return ret;
    }
}
// Creates and interfaces to a particle inside a WasmContainer's module.
class WasmParticle extends _particle_js__WEBPACK_IMPORTED_MODULE_2__["Particle"] {
    constructor(container) {
        super();
        this.handleMap = new Map();
        this.revHandleMap = new Map();
        this.converters = new Map();
        this.container = container;
        this.exports = container.exports;
        this.innerParticle = this.exports[`_new${this.spec.name}`]();
        container.register(this, this.innerParticle);
    }
    // TODO: for now we set up Handle objects with onDefineHandle and map them into the
    // wasm container through this call, which creates corresponding Handle objects in there.
    // That means entity transfer goes from the StorageProxy, deserializes at the outer Handle
    // which then notifies this class (calling onHandle*), and we then serialize into the wasm
    // transfer format. Obviously this can be improved.
    async setHandles(handles) {
        for (const [name, handle] of handles) {
            const p = this.container.store(name);
            const wasmHandle = this.exports._connectHandle(this.innerParticle, p, handle.canRead, handle.canWrite);
            this.exports._free(p);
            if (wasmHandle === 0) {
                throw new Error(`Wasm particle failed to connect handle '${name}'`);
            }
            this.handleMap.set(handle, wasmHandle);
            this.revHandleMap.set(wasmHandle, handle);
            this.converters.set(handle, new EntityPackager(handle.entityClass.schema));
        }
    }
    async onHandleSync(handle, model) {
        const wasmHandle = this.handleMap.get(handle);
        if (!model) {
            this.exports._syncHandle(this.innerParticle, wasmHandle, 0);
            return;
        }
        const converter = this.converters.get(handle);
        if (!converter) {
            throw new Error('cannot find handle ' + handle.name);
        }
        let encoded;
        if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_3__["Singleton"]) {
            encoded = converter.encodeSingleton(model);
        }
        else {
            encoded = converter.encodeCollection(model);
        }
        const p = this.container.store(encoded);
        this.exports._syncHandle(this.innerParticle, wasmHandle, p);
        this.exports._free(p);
    }
    // tslint:disable-next-line: no-any
    async onHandleUpdate(handle, update) {
        if (update.originator) {
            return;
        }
        const wasmHandle = this.handleMap.get(handle);
        const converter = this.converters.get(handle);
        if (!converter) {
            throw new Error('cannot find handle ' + handle.name);
        }
        let p1 = 0;
        let p2 = 0;
        if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_3__["Singleton"]) {
            if (update.data) {
                p1 = this.container.store(converter.encodeSingleton(update.data));
            }
        }
        else {
            p1 = this.container.store(converter.encodeCollection(update.added || []));
            p2 = this.container.store(converter.encodeCollection(update.removed || []));
        }
        this.exports._updateHandle(this.innerParticle, wasmHandle, p1, p2);
        if (p1)
            this.exports._free(p1);
        if (p2)
            this.exports._free(p2);
    }
    // Ignored for wasm particles.
    async onHandleDesync(handle) { }
    // Store API.
    //
    // Each of these calls an async storage method, but we don't want to await them because returning
    // a Promise to wasm doesn't work, and control (surprisingly) returns to the calling wasm function
    // at the first await point anyway. However, our CRDTs make it safe to fire-and-forget the storage
    // updates, and the wasm handles already have the updated version of the stored data, so it's safe
    // to leave the promises floating.
    // If the given entity doesn't have an id, this will create one for it and return the new id
    // in allocated memory that the wasm particle must free. If the entity already has an id this
    // returns 0 (nulltpr).
    singletonSet(wasmHandle, encoded) {
        const singleton = this.getHandle(wasmHandle);
        const entity = this.decodeEntity(singleton, encoded);
        const p = this.ensureIdentified(entity, singleton);
        void singleton.set(entity);
        return p;
    }
    singletonClear(wasmHandle) {
        const singleton = this.getHandle(wasmHandle);
        void singleton.clear();
    }
    // If the given entity doesn't have an id, this will create one for it and return the new id
    // in allocated memory that the wasm particle must free. If the entity already has an id this
    // returns 0 (nulltpr).
    collectionStore(wasmHandle, encoded) {
        const collection = this.getHandle(wasmHandle);
        const entity = this.decodeEntity(collection, encoded);
        const p = this.ensureIdentified(entity, collection);
        void collection.store(entity);
        return p;
    }
    collectionRemove(wasmHandle, encoded) {
        const collection = this.getHandle(wasmHandle);
        void collection.remove(this.decodeEntity(collection, encoded));
    }
    collectionClear(wasmHandle) {
        const collection = this.getHandle(wasmHandle);
        void collection.clear();
    }
    getHandle(wasmHandle) {
        const handle = this.revHandleMap.get(wasmHandle);
        if (!handle) {
            throw new Error(`wasm particle '${this.spec.name}' attempted to write to unconnected handle`);
        }
        return handle;
    }
    decodeEntity(handle, encoded) {
        const converter = this.converters.get(handle);
        return converter.decodeSingleton(this.container.read(encoded));
    }
    ensureIdentified(entity, handle) {
        let p = 0;
        if (!_entity_js__WEBPACK_IMPORTED_MODULE_1__["Entity"].isIdentified(entity)) {
            handle.createIdentityFor(entity);
            p = this.container.store(_entity_js__WEBPACK_IMPORTED_MODULE_1__["Entity"].id(entity));
        }
        return p;
    }
    // Called by the shell to initiate rendering; the particle will call env._render in response.
    renderSlot(slotName, contentTypes) {
        const p = this.container.store(slotName);
        const sendTemplate = contentTypes.includes('template');
        const sendModel = contentTypes.includes('model');
        this.exports._renderSlot(this.innerParticle, p, sendTemplate, sendModel);
        this.exports._free(p);
    }
    // TODO
    renderHostedSlot(slotName, hostedSlotId, content) {
        throw new Error('renderHostedSlot not implemented for wasm particles');
    }
    // Actually renders the slot. May be invoked due to an external request via renderSlot(),
    // or directly from the wasm particle itself (e.g. in response to a data update).
    // template is a string provided by the particle. model is an encoded key:value dictionary.
    renderImpl(slotName, template, model) {
        const slot = this.slotProxiesByName.get(this.container.read(slotName));
        if (slot) {
            const content = { templateName: 'default' };
            if (template) {
                content.template = this.container.read(template);
                slot.requestedContentTypes.add('template');
            }
            if (model) {
                content.model = new StringDecoder().decodeDictionary(this.container.read(model));
                slot.requestedContentTypes.add('model');
            }
            slot.render(content);
        }
    }
    fireEvent(slotName, event) {
        const sp = this.container.store(slotName);
        const hp = this.container.store(event.handler);
        this.exports._fireEvent(this.innerParticle, sp, hp);
        this.exports._free(sp);
        this.exports._free(hp);
    }
}
//# sourceMappingURL=wasm.js.map

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return Particle; });
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



/**
 * A basic particle. For particles that provide UI, you may like to
 * instead use DOMParticle.
 */
class Particle {
    constructor() {
        this.relevances = [];
        this._idle = Promise.resolve();
        this._busy = 0;
        this.slotProxiesByName = new Map();
        // Typescript only sees this.constructor as a Function type.
        // TODO(shans): move spec off the constructor
        this.spec = this.constructor['spec'];
        if (this.spec.inputs.length === 0) {
            this.extraData = true;
        }
    }
    /**
     * This sets the capabilities for this particle.  This can only
     * be called once.
     */
    setCapabilities(capabilities) {
        if (this.capabilities) {
            // Capabilities already set, throw an error.
            throw new Error('capabilities should only be set once');
        }
        this.capabilities = capabilities || {};
    }
    async invokeSafely(fun, err) {
        try {
            this.startBusy();
            await fun(this);
        }
        catch (e) {
            err(e);
        }
        finally {
            this.doneBusy();
        }
    }
    async callSetHandles(handles, onException) {
        await this.invokeSafely(async (p) => p.setHandles(handles), onException);
    }
    /**
     * This method is invoked with a handle for each store this particle
     * is registered to interact with, once those handles are ready for
     * interaction. Override the method to register for events from
     * the handles.
     *
     * @param handles a map from handle names to store handles.
     */
    async setHandles(handles) {
    }
    async callOnHandleSync(handle, model, onException) {
        await this.invokeSafely(async (p) => p.onHandleSync(handle, model), onException);
    }
    /**
     * Called for handles that are configured with both keepSynced and notifySync, when they are
     * updated with the full model of their data. This will occur once after setHandles() and any time
     * thereafter if the handle is resynchronized.
     *
     * @param handle The Handle instance that was updated.
     * @param model For Singleton-backed Handles, the Entity data or null if the Singleton is not set.
     *        For Collection-backed Handles, the Array of Entities, which may be empty.
     */
    async onHandleSync(handle, model) {
    }
    // tslint:disable-next-line: no-any
    async callOnHandleUpdate(handle, update, onException) {
        await this.invokeSafely(async (p) => p.onHandleUpdate(handle, update), onException);
    }
    /**
     * Called for handles that are configued with notifyUpdate, when change events are received from
     * the backing store. For handles also configured with keepSynced these events will be correctly
     * ordered, with some potential skips if a desync occurs. For handles not configured with
     * keepSynced, all change events will be passed through as they are received.
     *
     * @param handle The Handle instance that was updated.
     * @param update An object containing one of the following fields:
     *  - data: The full Entity for a Singleton-backed Handle.
     *  - oldData: The previous value of a Singleton before it was updated.
     *  - added: An Array of Entities added to a Collection-backed Handle.
     *  - removed: An Array of Entities removed from a Collection-backed Handle.
     */
    // tslint:disable-next-line: no-any
    async onHandleUpdate(handle, update) {
    }
    async callOnHandleDesync(handle, onException) {
        await this.invokeSafely(async (p) => p.onHandleDesync(handle), onException);
    }
    /**
     * Called for handles that are configured with both keepSynced and notifyDesync, when they are
     * detected as being out-of-date against the backing store. For Singletons, the event that triggers
     * this will also resync the data and thus this call may usually be ignored. For Collections, the
     * underlying proxy will automatically request a full copy of the stored data to resynchronize.
     * onHandleSync will be invoked when that is received.
     *
     * @param handle The Handle instance that was desynchronized.
     */
    async onHandleDesync(handle) {
    }
    async constructInnerArc() {
        if (!this.capabilities.constructInnerArc) {
            throw new Error('This particle is not allowed to construct inner arcs');
        }
        return this.capabilities.constructInnerArc(this);
    }
    get busy() {
        return this._busy > 0;
    }
    get idle() {
        return this._idle;
    }
    set relevance(r) {
        this.relevances.push(r);
    }
    startBusy() {
        if (this._busy === 0) {
            this._idle = new Promise(resolve => this._idleResolver = () => resolve());
        }
        this._busy++;
    }
    doneBusy() {
        this._busy--;
        if (this._busy === 0) {
            this._idleResolver();
        }
    }
    inputs() {
        return this.spec.inputs;
    }
    outputs() {
        return this.spec.outputs;
    }
    hasSlotProxy(name) {
        return this.slotProxiesByName.has(name);
    }
    addSlotProxy(slotlet) {
        this.slotProxiesByName.set(slotlet.slotName, slotlet);
    }
    removeSlotProxy(name) {
        this.slotProxiesByName.delete(name);
    }
    /**
     * Request (outerPEC) service invocations.
     */
    // TODO(sjmiles): experimental services impl
    async service(request) {
        if (!this.capabilities['serviceRequest']) {
            console.warn(`${this.spec.name} has no service support.`);
            return null;
        }
        return new Promise(resolve => {
            this.capabilities['serviceRequest'](this, request, response => resolve(response));
        });
    }
    /**
     * Returns the slot with provided name.
     */
    getSlot(name) {
        return this.slotProxiesByName.get(name);
    }
    static buildManifest(strings, ...bits) {
        const output = [];
        for (let i = 0; i < bits.length; i++) {
            const str = strings[i];
            const indent = / *$/.exec(str)[0];
            let bitStr;
            if (typeof bits[i] === 'string') {
                bitStr = bits[i];
            }
            else {
                bitStr = bits[i].toManifestString();
            }
            bitStr = bitStr.replace(/(\n)/g, '$1' + indent);
            output.push(str);
            output.push(bitStr);
        }
        if (strings.length > bits.length) {
            output.push(strings[strings.length - 1]);
        }
        return output.join('');
    }
    async setParticleDescription(pattern) {
        return this.setDescriptionPattern('pattern', pattern);
    }
    async setDescriptionPattern(connectionName, pattern) {
        const descriptions = this.handles.get('descriptions');
        if (descriptions) {
            const entityClass = descriptions.entityClass;
            if (descriptions instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Collection"] || descriptions instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["BigCollection"]) {
                await descriptions.store(new entityClass({ key: connectionName, value: pattern }, this.spec.name + '-' + connectionName));
            }
            return true;
        }
        throw new Error('A particle needs a description handle to set a decription pattern');
    }
    // Entity functions.
    idFor(entity) {
        return _entity_js__WEBPACK_IMPORTED_MODULE_1__["Entity"].id(entity);
    }
    dataClone(entity) {
        return _entity_js__WEBPACK_IMPORTED_MODULE_1__["Entity"].dataClone(entity);
    }
    mutate(entity, mutation) {
        _entity_js__WEBPACK_IMPORTED_MODULE_1__["Entity"].mutate(entity, mutation);
    }
    // abstract
    renderSlot(slotName, contentTypes) { }
    renderHostedSlot(slotName, hostedSlotId, content) { }
    fireEvent(slotName, event) { }
}
//# sourceMappingURL=particle.js.map

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformLoader", function() { return PlatformLoader; });
/* harmony import */ var _loader_platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _platform_log_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);
/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




const log = Object(_platform_log_web_js__WEBPACK_IMPORTED_MODULE_1__["logFactory"])('loader-web', 'green');
const warn = Object(_platform_log_web_js__WEBPACK_IMPORTED_MODULE_1__["logFactory"])('loader-web', 'green', 'warn');
const error = Object(_platform_log_web_js__WEBPACK_IMPORTED_MODULE_1__["logFactory"])('loader-web', 'green', 'error');

class PlatformLoader extends _loader_platform_js__WEBPACK_IMPORTED_MODULE_0__["PlatformLoaderBase"] {
  flushCaches() {
    // punt object urls?
  }
  async loadResource(url) {
    // subclass impl differentiates paths and URLs,
    // for browser env we can feed both kinds into _loadURL
    return super._loadURL(this._resolve(url));
  }
  async loadBinary(url) {
    return super.loadBinary(this._resolve(url));
  }
  async provisionObjectUrl(fileName) {
    const raw = await this.loadResource(fileName);
    const code = `${raw}\n//# sourceURL=${fileName}`;
    return URL.createObjectURL(new Blob([code], {type: 'application/javascript'}));
  }
  // Below here invoked from inside Worker
  async loadParticleClass(spec) {
    const clazz = await this.requireParticle(spec.implFile, spec.implBlobUrl);
    if (clazz) {
      clazz.spec = spec;
    } else {
      warn(`[spec.implFile]::defineParticle() returned no particle.`);
    }
    return clazz;
  }
  async requireParticle(unresolvedPath, blobUrl) {
    // inject path to this particle into the UrlMap,
    // allows "foo.js" particle to invoke "importScripts(resolver('foo/othermodule.js'))"
    this.mapParticleUrl(unresolvedPath);
    // resolved target
    const url = blobUrl || this._resolve(unresolvedPath);
    // load wrapped particle
    const particle = this.loadWrappedParticle(url);
    // execute particle wrapper, if we have one
    if (particle) {
      const logger = this.provisionLogger(unresolvedPath);
      return this.unwrapParticle(particle, logger);
    }
  }
  provisionLogger(fileName) {
    return Object(_platform_log_web_js__WEBPACK_IMPORTED_MODULE_1__["logFactory"])(fileName.split('/').pop(), '#1faa00');
  }
  loadWrappedParticle(url) {
    let result;
    // MUST be synchronous from here until deletion
    // of self.defineParticle because we share this
    // scope with other particles
    self.defineParticle = function(particleWrapper) {
      if (result) {
        warn('multiple particles not supported, last particle wins');
      }
      // multiple particles not supported: last particle wins
      result = particleWrapper;
    };
    try {
      // import (execute) particle code
      importScripts(url);
    } catch (x) {
      error(x);
    }
    // clean up
    delete self.defineParticle;
    return result;
  }
}


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformLoaderBase", function() { return PlatformLoaderBase; });
/* harmony import */ var _runtime_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _runtime_particle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var _runtime_dom_particle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37);
/* harmony import */ var _runtime_multiplexer_dom_particle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _runtime_transformation_dom_particle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







const html = (strings, ...values) => (strings[0] + values.map((v, i) => v + strings[i + 1]).join('')).trim();

class PlatformLoaderBase extends _runtime_loader_js__WEBPACK_IMPORTED_MODULE_0__["Loader"] {
  constructor(urlMap) {
    super();
    this._urlMap = urlMap || [];
  }
  loadResource(name) {
    const path = this._resolve(name);
    return super.loadResource(path);
  }
  _resolve(path) {
    let url = this._urlMap[path];
    if (!url && path) {
      // TODO(sjmiles): inefficient!
      const macro = Object.keys(this._urlMap).sort((a, b) => b.length - a.length).find(k => path.slice(0, k.length) == k);
      if (macro) {
        url = this._urlMap[macro] + path.slice(macro.length);
      }
    }
    url = this.normalizeDots(url || path);
    return url;
  }
  mapParticleUrl(path) {
    const parts = path.split('/');
    const suffix = parts.pop();
    const folder = parts.join('/');
    const name = suffix.split('.').shift();
    const resolved = this._resolve(folder);
    this._urlMap[name] = resolved;
    this._urlMap['$here'] = resolved;
  }
  unwrapParticle(particleWrapper, log) {
    // TODO(sjmiles): regarding `resolver`:
    //  _resolve method allows particles to request remapping of assets paths
    //  for use in DOM
    const resolver = this._resolve.bind(this);
    return particleWrapper({
      Particle: _runtime_particle_js__WEBPACK_IMPORTED_MODULE_1__["Particle"],
      DomParticle: _runtime_dom_particle_js__WEBPACK_IMPORTED_MODULE_2__["DomParticle"],
      MultiplexerDomParticle: _runtime_multiplexer_dom_particle_js__WEBPACK_IMPORTED_MODULE_3__["MultiplexerDomParticle"],
      SimpleParticle: _runtime_dom_particle_js__WEBPACK_IMPORTED_MODULE_2__["DomParticle"],
      TransformationDomParticle: _runtime_transformation_dom_particle_js__WEBPACK_IMPORTED_MODULE_4__["TransformationDomParticle"],
      resolver,
      log: log || (() => {}),
      html
    });
  }
}


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return Loader; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _platform_fetch_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var _platform_fs_web_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _platform_vm_web_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(35);
/* harmony import */ var _converters_jsonldToManifest_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
/* harmony import */ var _dom_particle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(37);
/* harmony import */ var _multiplexer_dom_particle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(40);
/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29);
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12);
/* harmony import */ var _transformation_dom_particle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(41);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */










const html = (strings, ...values) => (strings[0] + values.map((v, i) => v + strings[i + 1]).join('')).trim();
function schemaLocationFor(name) {
    return `../entities/${name}.schema`;
}
class Loader {
    path(fileName) {
        return fileName.replace(/[/][^/]+$/, '/');
    }
    join(prefix, path) {
        if (/^https?:\/\//.test(path)) {
            return path;
        }
        // TODO: replace this with something that isn't hacky
        if (path[0] === '/' || path[1] === ':') {
            return path;
        }
        prefix = this.path(prefix);
        path = this.normalizeDots(`${prefix}${path}`);
        return path;
    }
    // convert `././foo/bar/../baz` to `./foo/baz`
    normalizeDots(path) {
        // only unix slashes
        path = path.replace(/\\/g, '/');
        // remove './'
        path = path.replace(/\/\.\//g, '/');
        // remove 'foo/..'
        const norm = s => s.replace(/(?:^|\/)[^./]*\/\.\./g, '');
        for (let n = norm(path); n !== path; path = n, n = norm(path))
            ;
        // remove '//' except after `:`
        path = path.replace(/([^:])(\/\/)/g, '$1/');
        return path;
    }
    async loadResource(file) {
        if (/^https?:\/\//.test(file)) {
            return this._loadURL(file);
        }
        return this.loadFile(file, 'utf-8');
    }
    async loadBinary(file) {
        if (/^https?:\/\//.test(file)) {
            return Object(_platform_fetch_web_js__WEBPACK_IMPORTED_MODULE_1__["fetch"])(file).then(res => res.arrayBuffer());
        }
        else {
            return this.loadFile(file);
        }
    }
    async loadFile(file, encoding) {
        return new Promise((resolve, reject) => {
            _platform_fs_web_js__WEBPACK_IMPORTED_MODULE_2__["fs"].readFile(file, { encoding }, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(encoding ? data : data.buffer);
                }
            });
        });
    }
    async _loadURL(url) {
        if (/\/\/schema.org\//.test(url)) {
            if (url.endsWith('/Thing')) {
                return Object(_platform_fetch_web_js__WEBPACK_IMPORTED_MODULE_1__["fetch"])('https://schema.org/Product.jsonld').then(res => res.text()).then(data => _converters_jsonldToManifest_js__WEBPACK_IMPORTED_MODULE_4__["JsonldToManifest"].convert(data, { '@id': 'schema:Thing' }));
            }
            return Object(_platform_fetch_web_js__WEBPACK_IMPORTED_MODULE_1__["fetch"])(url + '.jsonld').then(res => res.text()).then(data => _converters_jsonldToManifest_js__WEBPACK_IMPORTED_MODULE_4__["JsonldToManifest"].convert(data));
        }
        return Object(_platform_fetch_web_js__WEBPACK_IMPORTED_MODULE_1__["fetch"])(url).then(res => res.text());
    }
    /**
     * Returns a particle class implementation by loading and executing
     * the code defined by a particle.  In the following example `x.js`
     * will be loaded and executed:
     *
     * ```
     * Particle foo in 'x.js'
     * ```
     */
    async loadParticleClass(spec) {
        const clazz = await this.requireParticle(spec.implFile);
        clazz.spec = spec;
        return clazz;
    }
    /**
     * Loads a particle class from the given filename by loading the
     * script contained in `fileName` and executing it as a script.
     *
     * Protected for use in tests.
     */
    async requireParticle(fileName) {
        if (fileName === null)
            fileName = '';
        const src = await this.loadResource(fileName);
        // Note. This is not real isolation.
        const script = new _platform_vm_web_js__WEBPACK_IMPORTED_MODULE_3__["vm"].Script(src, { filename: fileName, displayErrors: true });
        const result = [];
        // TODO(lindner): restrict Math.random here.
        const self = {
            defineParticle(particleWrapper) {
                result.push(particleWrapper);
            },
            console,
            fetch: _platform_fetch_web_js__WEBPACK_IMPORTED_MODULE_1__["fetch"],
            setTimeout,
            importScripts: s => null //console.log(`(skipping browser-space import for [${s}])`)
        };
        script.runInNewContext(self, { filename: fileName, displayErrors: true });
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(result.length > 0 && typeof result[0] === 'function', `Error while instantiating particle implementation from ${fileName}`);
        return this.unwrapParticle(result[0]);
    }
    setParticleExecutionContext(pec) {
        this.pec = pec;
    }
    /**
     * executes the defineParticle() code and returns the results which should be a class definition.
     */
    unwrapParticle(particleWrapper) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.pec);
        return particleWrapper({ Particle: _particle_js__WEBPACK_IMPORTED_MODULE_7__["Particle"], DomParticle: _dom_particle_js__WEBPACK_IMPORTED_MODULE_5__["DomParticle"], TransformationDomParticle: _transformation_dom_particle_js__WEBPACK_IMPORTED_MODULE_9__["TransformationDomParticle"], MultiplexerDomParticle: _multiplexer_dom_particle_js__WEBPACK_IMPORTED_MODULE_6__["MultiplexerDomParticle"], Reference: _reference_js__WEBPACK_IMPORTED_MODULE_8__["ClientReference"].newClientReference(this.pec), html });
    }
}
//# sourceMappingURL=loader.js.map

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return localFetch; });
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// 'export default fetch' works because 'fetch' is evaluated as an expression, which finds the
// appropriate global definition - but we don't want to use default exports.
// 'export {fetch}' doesn't work because 'fetch' is just a name in that context and is not defined.
// So we need to use an expression to find the global fetch function then map that for export.
const localFetch = fetch;

//# sourceMappingURL=fetch-web.js.map

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fs", function() { return fs; });
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const fs = {};


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vm", function() { return vm; });
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const vm = {};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportedTypes", function() { return supportedTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JsonldToManifest", function() { return JsonldToManifest; });
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const supportedTypes = ['Text', 'URL', 'Number', 'Boolean'];
class JsonldToManifest {
    static convert(jsonld, theClass = undefined) {
        const obj = JSON.parse(jsonld);
        const classes = {};
        const properties = {};
        if (!obj['@graph']) {
            obj['@graph'] = [obj];
        }
        for (const item of obj['@graph']) {
            if (item['@type'] === 'rdf:Property') {
                properties[item['@id']] = item;
            }
            else if (item['@type'] === 'rdfs:Class') {
                classes[item['@id']] = item;
                item['subclasses'] = [];
                item['superclass'] = null;
            }
        }
        for (const clazz of Object.values(classes)) {
            if (clazz['rdfs:subClassOf'] !== undefined) {
                if (clazz['rdfs:subClassOf'].length == undefined) {
                    clazz['rdfs:subClassOf'] = [clazz['rdfs:subClassOf']];
                }
                for (const subClass of clazz['rdfs:subClassOf']) {
                    const superclass = subClass['@id'];
                    if (clazz['superclass'] == undefined) {
                        clazz['superclass'] = [];
                    }
                    if (classes[superclass]) {
                        classes[superclass].subclasses.push(clazz);
                        clazz['superclass'].push(classes[superclass]);
                    }
                    else {
                        clazz['superclass'].push({ '@id': superclass });
                    }
                }
            }
        }
        for (const clazz of Object.values(classes)) {
            if (clazz['subclasses'].length === 0 && theClass == undefined) {
                theClass = clazz;
            }
        }
        const relevantProperties = [];
        for (const property of Object.values(properties)) {
            let domains = property['schema:domainIncludes'];
            if (!domains) {
                domains = { '@id': theClass['@id'] };
            }
            if (!domains.length) {
                domains = [domains];
            }
            domains = domains.map(a => a['@id']);
            if (domains.includes(theClass['@id'])) {
                const name = property['@id'].split(':')[1];
                let type = property['schema:rangeIncludes'];
                if (!type) {
                    console.log(property);
                }
                if (!type.length) {
                    type = [type];
                }
                type = type.map(a => a['@id'].split(':')[1]);
                type = type.filter(type => supportedTypes.includes(type));
                if (type.length > 0) {
                    relevantProperties.push({ name, type });
                }
            }
        }
        const className = theClass['@id'].split(':')[1];
        const superNames = theClass && theClass.superclass ? theClass.superclass.map(a => a['@id'].split(':')[1]) : [];
        let s = '';
        for (const superName of superNames) {
            s += `import 'https://schema.org/${superName}'\n\n`;
        }
        s += `schema ${className}`;
        if (superNames.length > 0) {
            s += ` extends ${superNames.join(', ')}`;
        }
        if (relevantProperties.length > 0) {
            for (const property of relevantProperties) {
                let type;
                if (property.type.length > 1) {
                    type = '(' + property.type.join(' or ') + ')';
                }
                else {
                    type = property.type[0];
                }
                s += `\n  ${type} ${property.name}`;
            }
        }
        s += '\n';
        return s;
    }
}
//# sourceMappingURL=jsonldToManifest.js.map

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomParticle", function() { return DomParticle; });
/* harmony import */ var _modalities_dom_components_xen_xen_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var _dom_particle_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


/**
 * Particle that interoperates with DOM and uses a simple state system
 * to handle updates.
 */
class DomParticle extends Object(_modalities_dom_components_xen_xen_state_js__WEBPACK_IMPORTED_MODULE_0__["XenStateMixin"])(_dom_particle_base_js__WEBPACK_IMPORTED_MODULE_1__["DomParticleBase"]) {
    /**
     * Override if necessary, to do things when props change.
     */
    willReceiveProps(...args) {
    }
    /**
     * Override if necessary, to modify superclass config.
     */
    update(...args) {
    }
    /**
     * Override to return false if the Particle won't use
     * it's slot.
     */
    shouldRender(...args) {
        return true;
    }
    /**
     * Override to return a dictionary to map into the template.
     */
    render(...args) {
        return {};
    }
    /**
     * Copy values from `state` into the particle's internal state,
     * triggering an update cycle unless currently updating.
     */
    setState(state) {
        return this._setState(state);
    }
    /**
     * Getters and setters for working with state/props.
     */
    get state() {
        return this._state;
    }
    /**
     * Syntactic sugar: `this.state = {state}` is equivalent to `this.setState(state)`.
     */
    set state(state) {
        this.setState(state);
    }
    get props() {
        return this._props;
    }
    /**
     * Override if necessary, to modify superclass config.
     */
    get config() {
        // TODO(sjmiles): getter that does work is a bad idea, this is temporary
        return {
            handleNames: this.spec.inputs.map(i => i.name),
            // TODO(mmandlis): this.spec needs to be replaced with a particle-spec loaded from
            // .manifest files, instead of .ptcl ones.
            slotNames: [...this.spec.slotConnections.values()].map(s => s.name)
        };
    }
    // affordances for aliasing methods to remove `_`
    _willReceiveProps(...args) {
        this.willReceiveProps(...args);
    }
    _update(...args) {
        this.update(...args);
        if (this.shouldRender(...args)) { // TODO: should shouldRender be slot specific?
            this.relevance = 1; // TODO: improve relevance signal.
        }
        this.config.slotNames.forEach(s => this.renderSlot(s, ['model']));
    }
    _async(fn) {
        // asynchrony in Particle code must be bookended with start/doneBusy
        this.startBusy();
        const done = () => {
            try {
                fn.call(this);
            }
            finally {
                this.doneBusy();
            }
        };
        // TODO(sjmiles): superclass uses Promise.resolve(),
        // but here use a short timeout for a wider debounce
        return setTimeout(done, 10);
    }
    async setHandles(handles) {
        this.configureHandles(handles);
        this.handles = handles;
        // TODO(sjmiles): we must invalidate at least once, is there a way to know
        // whether handleSync/update will be called?
        this._invalidate();
    }
    /**
     * This is called once during particle setup. Override to control sync and update
     * configuration on specific handles (via their configure() method).
     * `handles` is a map from names to handle instances.
     */
    configureHandles(handles) {
        // Example: handles.get('foo').configure({keepSynced: false});
    }
    async onHandleSync(handle, model) {
        this._setProperty(handle.name, model);
    }
    async onHandleUpdate({ name }, { data, added, removed }) {
        if (data !== undefined) {
            //console.log('update.data:', JSON.stringify(data, null, '  '));
            this._setProps({ [name]: data });
        }
        if (added) {
            //console.log('update.added:', JSON.stringify(added, null, '  '));
            const prop = (this.props[name] || []).concat(added);
            // TODO(sjmiles): generally improper to set `this._props` directly, this is a special case
            this._props[name] = prop;
            this._setProps({ [name]: prop });
        }
        if (removed) {
            //console.log('update.removed:', JSON.stringify(removed, null, '  '));
            const prop = this.props[name];
            if (Array.isArray(prop)) {
                removed.forEach(removed => {
                    // TODO(sjmiles): linear search is inefficient
                    const index = prop.findIndex(entry => this.idFor(entry) === this.idFor(removed));
                    if (index >= 0) {
                        prop.splice(index, 1);
                    }
                    else {
                        console.warn(`dom-particle::onHandleUpdate: couldn't find item to remove`);
                    }
                });
                this._setProps({ [name]: prop });
            }
        }
    }
    fireEvent(slotName, { handler, data }) {
        if (this[handler]) {
            // TODO(sjmiles): remove `this._state` parameter
            this[handler]({ data }, this._state);
        }
    }
    debounce(key, func, delay) {
        const subkey = `_debounce_${key}`;
        const state = this.state;
        if (!state[subkey]) {
            state[subkey] = true;
            this.startBusy();
        }
        const idleThenFunc = () => {
            this.doneBusy();
            func();
            state[subkey] = null;
        };
        // TODO(sjmiles): rewrite Xen debounce so caller has idle control
        super._debounce(key, idleThenFunc, delay);
    }
}
//# sourceMappingURL=dom-particle.js.map

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XenStateMixin", function() { return XenStateMixin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nob", function() { return nob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

const nob = () => Object.create(null);

const debounce = (key, action, delay) => {
  if (key) {
    clearTimeout(key);
  }
  if (action && delay) {
    return setTimeout(action, delay);
  }
};

const XenStateMixin = Base => class extends Base {
  constructor() {
    super();
    this._pendingProps = nob();
    this._props = this._getInitialProps() || nob();
    this._lastProps = nob();
    this._state = this._getInitialState() || nob();
    this._lastState = nob();
  }
  _getInitialProps() {
  }
  _getInitialState() {
  }
  _getProperty(name) {
    return this._pendingProps[name] || this._props[name];
  }
  _setProperty(name, value) {
    // dirty checking opportunity
    if (this._validator || this._wouldChangeProp(name, value)) {
      this._pendingProps[name] = value;
      this._invalidateProps();
    }
  }
  _wouldChangeValue(map, name, value) {
    // Important dirty-checking behavior controlled here,
    // can be overridden.
    // The default implementation will use strict reference checking.
    // To modify structured values one must create a new Object to
    // replace the old one.
    return (map[name] !== value);
    // an example of dirty-checking that instead simply punts on structured data
    //return (typeof value === 'object') || (map[name] !== value);
  }
  _wouldChangeProp(name, value) {
    return this._wouldChangeValue(this._props, name, value);
  }
  _wouldChangeState(name, value) {
    return this._wouldChangeValue(this._state, name, value);
  }
  _setProps(props) {
    // TODO(sjmiles): should be a replace instead of a merge?
    Object.assign(this._pendingProps, props);
    this._invalidateProps();
  }
  _invalidateProps() {
    this._propsInvalid = true;
    this._invalidate();
  }
  _setState(object) {
    let dirty = false;
    const state = this._state;
    for (const property in object) {
      const value = object[property];
      if (this._wouldChangeState(property, value)) {
        dirty = true;
        state[property] = value;
      }
    }
    if (dirty) {
      this._invalidate();
      return true;
    }
  }
  _async(fn) {
    return Promise.resolve().then(fn.bind(this));
  }
  _invalidate() {
    if (!this._validator) {
      this._validator = this._async(this._validate);
    }
  }
  _getStateArgs() {
    return [this._props, this._state, this._lastProps, this._lastState];
  }
  _validate() {
    const stateArgs = this._getStateArgs();
    // try..catch to ensure we nullify `validator` before return
    try {
      // TODO(sjmiles): should be a replace instead of a merge
      Object.assign(this._props, this._pendingProps);
      if (this._propsInvalid) {
        // TODO(sjmiles): should/can have different timing from rendering?
        this._willReceiveProps(...stateArgs);
        this._propsInvalid = false;
      }
      if (this._shouldUpdate(...stateArgs)) {
        // TODO(sjmiles): consider throttling update to rAF
        this._ensureMount();
        this._doUpdate(...stateArgs);
      }
    } catch (x) {
      console.error(x);
    }
    // nullify validator _after_ methods so state changes don't reschedule validation
    this._validator = null;
    // save the old props and state
    this._lastProps = Object.assign(nob(), this._props);
    this._lastState = Object.assign(nob(), this._state);
  }
  _doUpdate(...stateArgs) {
    this._update(...stateArgs);
    this._didUpdate(...stateArgs);
  }
  _ensureMount() {
  }
  _willReceiveProps() {
  }
  _shouldUpdate() {
    return true;
  }
  _update() {
  }
  _didUpdate() {
  }
  _debounce(key, func, delay) {
    key = `_debounce_${key}`;
    this._state[key] = debounce(this._state[key], func, delay != null ? delay : 16);
  }
};




/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomParticleBase", function() { return DomParticleBase; });
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


/**
 * Particle that interoperates with DOM.
 */
class DomParticleBase extends _particle_js__WEBPACK_IMPORTED_MODULE_1__["Particle"] {
    /**
     * Override to return a String defining primary markup.
     */
    get template() {
        return '';
    }
    /**
     * Override to return a String defining primary markup for the given slot name.
     */
    getTemplate(slotName) {
        // TODO: only supports a single template for now. add multiple templates support.
        return this.template;
    }
    /**
     * Override to return a String defining the name of the template for the given slot name.
     */
    getTemplateName(slotName) {
        // TODO: only supports a single template for now. add multiple templates support.
        return `default`;
    }
    /**
     * Override to return false if the Particle won't use it's slot.
     */
    shouldRender(stateArgs) {
        return true;
    }
    /**
     * Override to return a dictionary to map into the template.
     */
    render(stateArgs) {
        return {};
    }
    renderSlot(slotName, contentTypes) {
        const stateArgs = this._getStateArgs();
        const slot = this.getSlot(slotName);
        if (!slot) {
            return; // didn't receive StartRender.
        }
        // Set this to support multiple slots consumed by a particle, without needing
        // to pass slotName to particle's render method, where it useless in most cases.
        this.currentSlotName = slotName;
        contentTypes.forEach(ct => slot.requestedContentTypes.add(ct));
        // TODO(sjmiles): redundant, same answer for every slot
        if (this.shouldRender(...stateArgs)) {
            const content = {};
            if (slot.requestedContentTypes.has('template')) {
                content.template = this.getTemplate(slot.slotName);
            }
            if (slot.requestedContentTypes.has('model')) {
                content.model = this.render(...stateArgs);
            }
            content.templateName = this.getTemplateName(slot.slotName);
            // Backwards-compatibility and convenience code:
            //  - Rewrites slotid="slotName" to slotid$="{{$slotName}}" in templates.
            //  - Enhances the model with `$slotName` fields.
            if (slot.providedSlots.size > 0) {
                if (content.template) {
                    if (typeof content.template === 'string') {
                        content.template = this.slotNamesToModelReferences(slot, content.template);
                    }
                    else {
                        content.template = Object.entries(content.template).reduce((templateDictionary, [templateName, templateValue]) => {
                            templateDictionary[templateName] = this.slotNamesToModelReferences(slot, templateValue);
                            return templateDictionary;
                        }, {});
                    }
                }
                if (content.model) {
                    const slotIDs = {};
                    slot.providedSlots.forEach((slotId, slotName) => slotIDs[`$${slotName}`] = slotId);
                    content.model = this.enhanceModelWithSlotIDs(content.model, slotIDs);
                }
            }
            slot.render(content);
        }
        else if (slot.isRendered) {
            // Send empty object, to clear rendered slot contents.
            slot.render({});
        }
        this.currentSlotName = undefined;
    }
    slotNamesToModelReferences(slot, template) {
        slot.providedSlots.forEach((slotId, slotName) => {
            // TODO: This is a simple string replacement right now,
            // ensuring that 'slotid' is an attribute on an HTML element would be an improvement.
            // TODO(sjmiles): clone original id as `slotname` for human readability
            template = template.replace(new RegExp(`slotid="${slotName}"`, 'gi'), `slotname="${slotName}" slotid$="{{$${slotName}}}"`);
        });
        return template;
    }
    // We put slot IDs at the top-level of the model as well as in models for sub-templates.
    // This is temporary and should go away when we move from sub-IDs to [(Entity, Slot)] constructs.
    enhanceModelWithSlotIDs(model, slotIDs, topLevel = true) {
        if (topLevel) {
            model = { ...slotIDs, ...model };
        }
        if (model.hasOwnProperty('$template') && model.hasOwnProperty('models') && Array.isArray(model['models'])) {
            model['models'] = model['models'].map(m => this.enhanceModelWithSlotIDs(m, slotIDs));
        }
        for (const [key, value] of Object.entries(model)) {
            if (!!value && typeof value === 'object') {
                model[key] = this.enhanceModelWithSlotIDs(value, slotIDs, false);
            }
        }
        return model;
    }
    _getStateArgs() {
        return [];
    }
    forceRenderTemplate(slotName = '') {
        this.slotProxiesByName.forEach((slot, name) => {
            if (!slotName || (name === slotName)) {
                slot.requestedContentTypes.add('template');
            }
        });
    }
    fireEvent(slotName, { handler, data }) {
        if (this[handler]) {
            this[handler]({ data });
        }
    }
    async setParticleDescription(pattern) {
        if (typeof pattern === 'string') {
            return super.setParticleDescription(pattern);
        }
        if (pattern.template && pattern.model) {
            await super.setDescriptionPattern('_template_', pattern.template);
            await super.setDescriptionPattern('_model_', JSON.stringify(pattern.model));
            return undefined;
        }
        else {
            throw new Error('Description pattern must either be string or have template and model');
        }
    }
    /**
     * Remove all entities from named handle.
     */
    async clearHandle(handleName) {
        const handle = this.handles.get(handleName);
        if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Singleton"] || handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Collection"]) {
            await handle.clear();
        }
        else {
            throw new Error('Singleton/Collection required');
        }
    }
    /**
     * Merge entities from Array into named handle.
     */
    async mergeEntitiesToHandle(handleName, entities) {
        const idMap = {};
        const handle = this.handles.get(handleName);
        if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Collection"]) {
            const handleEntities = await handle.toList();
            handleEntities.forEach(entity => idMap[entity.id] = entity);
            for (const entity of entities) {
                if (!idMap[this.idFor(entity)]) {
                    await handle.store(entity);
                }
            }
        }
        else {
            throw new Error('Collection required');
        }
    }
    /**
     * Append entities from Array to named handle.
     */
    async appendEntitiesToHandle(handleName, entities) {
        const handle = this.handles.get(handleName);
        if (handle) {
            if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Collection"] || handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["BigCollection"]) {
                await Promise.all(entities.map(entity => handle.store(entity)));
            }
            else {
                throw new Error('Collection required');
            }
        }
    }
    /**
     * Create an entity from each rawData, and append to named handle.
     */
    async appendRawDataToHandle(handleName, rawDataArray) {
        const handle = this.handles.get(handleName);
        if (handle && handle.entityClass) {
            if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Collection"] || handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["BigCollection"]) {
                const entityClass = handle.entityClass;
                await Promise.all(rawDataArray.map(raw => handle.store(new entityClass(raw))));
            }
            else {
                throw new Error('Collection required');
            }
        }
    }
    /**
     * Modify value of named handle. A new entity is created
     * from `rawData` (`new [EntityClass](rawData)`).
     */
    async updateSingleton(handleName, rawData) {
        const handle = this.handles.get(handleName);
        if (handle && handle.entityClass) {
            if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Singleton"]) {
                const entity = new handle.entityClass(rawData);
                await handle.set(entity);
                return entity;
            }
            else {
                throw new Error('Singleton required');
            }
        }
        return undefined;
    }
    /**
     * Modify or insert `entity` into named handle.
     * Modification is done by removing the old entity and reinserting the new one.
     */
    async updateCollection(handleName, entity) {
        // Set the entity into the right place in the set. If we find it
        // already present replace it, otherwise, add it.
        // TODO(dstockwell): Replace this with happy entity mutation approach.
        const handle = this.handles.get(handleName);
        if (handle) {
            if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Collection"] || handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["BigCollection"]) {
                await handle.remove(entity);
                await handle.store(entity);
            }
            else {
                throw new Error('Collection required');
            }
        }
    }
    /**
     * Return array of Entities dereferenced from array of Share-Type Entities
     */
    async derefShares(shares) {
        let entities = [];
        this.startBusy();
        try {
            const derefPromises = shares.map(async (share) => share.ref.dereference());
            entities = await Promise.all(derefPromises);
        }
        finally {
            this.doneBusy();
        }
        return entities;
    }
    /**
     * Returns array of Entities found in BOXED data `box` that are owned by `userid`
     */
    async boxQuery(box, userid) {
        if (!box) {
            return [];
        }
        else {
            const matches = box.filter(item => userid === item.fromKey);
            return await this.derefShares(matches);
        }
    }
}
//# sourceMappingURL=dom-particle-base.js.map

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiplexerDomParticle", function() { return MultiplexerDomParticle; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _particle_spec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _transformation_dom_particle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




class MultiplexerDomParticle extends _transformation_dom_particle_js__WEBPACK_IMPORTED_MODULE_2__["TransformationDomParticle"] {
    constructor() {
        super(...arguments);
        this._itemSubIdByHostedSlotId = new Map();
        this._connByHostedConn = new Map();
    }
    async _mapParticleConnections(listHandleName, particleHandleName, hostedParticle, handles, arc) {
        const otherMappedHandles = [];
        const otherConnections = [];
        let index = 2;
        const skipConnectionNames = [listHandleName, particleHandleName];
        for (const [connectionName, otherHandle] of handles) {
            if (skipConnectionNames.includes(connectionName)) {
                continue;
            }
            // TODO(wkorman): For items with embedded recipes we may need a map
            // (perhaps id to index) to make sure we don't map a handle into the inner
            // arc multiple times unnecessarily.
            // TODO(lindner): type erasure to avoid mismatch of Store vs Handle in arc.mapHandle
            // tslint:disable-next-line: no-any
            const otherHandleStore = otherHandle.storage;
            otherMappedHandles.push(`use '${await arc.mapHandle(otherHandleStore)}' as v${index}`);
            const hostedOtherConnection = hostedParticle.handleConnections.find(conn => conn.isCompatibleType(otherHandle.type));
            if (hostedOtherConnection) {
                otherConnections.push(`${hostedOtherConnection.name} = v${index++}`);
                // TODO(wkorman): For items with embedded recipes where we may have a
                // different particle rendering each item, we need to track
                // |connByHostedConn| keyed on the particle type.
                this._connByHostedConn.set(hostedOtherConnection.name, connectionName);
            }
        }
        return [otherMappedHandles, otherConnections];
    }
    async setHandles(handles) {
        this.handleIds = {};
        const arc = await this.constructInnerArc();
        const listHandleName = 'list';
        const particleHandleName = 'hostedParticle';
        const particleHandle = handles.get(particleHandleName);
        let hostedParticle = null;
        let otherMappedHandles = [];
        let otherConnections = [];
        if (particleHandle) {
            // Typecast to any; the get() method doesn't exist on raw Handles.
            // tslint:disable-next-line: no-any
            hostedParticle = await particleHandle.get();
            if (hostedParticle) {
                [otherMappedHandles, otherConnections] =
                    await this._mapParticleConnections(listHandleName, particleHandleName, hostedParticle, handles, arc);
            }
        }
        this.setState({
            arc,
            type: handles.get(listHandleName).type,
            hostedParticle,
            otherMappedHandles,
            otherConnections
        });
        await super.setHandles(handles);
    }
    async update({ list }, { arc, type, hostedParticle, otherMappedHandles, otherConnections }, oldProps, oldState) {
        //console.warn(`[${this.spec.name}]::update`, list, arc);
        if (!list || !arc) {
            return;
        }
        if (oldProps.list === list && oldState.arc === arc) {
            return;
        }
        if (list.length > 0) {
            this.relevance = 0.1;
        }
        for (const [index, item] of this.getListEntries(list)) {
            let resolvedHostedParticle = hostedParticle;
            const id = _entity_js__WEBPACK_IMPORTED_MODULE_3__["Entity"].id(item);
            if (this.handleIds[id]) {
                const itemHandle = await this.handleIds[id];
                // tslint:disable-next-line: no-any
                itemHandle.set(item);
                continue;
            }
            const itemHandlePromise = arc.createHandle(type.getContainedType(), `item${index}`);
            this.handleIds[id] = itemHandlePromise;
            const itemHandle = await itemHandlePromise;
            if (!resolvedHostedParticle) {
                // If we're muxing on behalf of an item with an embedded recipe, the
                // hosted particle should be retrievable from the item itself. Else we
                // just skip this item.
                if (!item.renderParticleSpec) {
                    continue;
                }
                resolvedHostedParticle =
                    _particle_spec_js__WEBPACK_IMPORTED_MODULE_1__["ParticleSpec"].fromLiteral(JSON.parse(item.renderParticleSpec));
                // Re-map compatible handles and compute the connections specific
                // to this item's render particle.
                const listHandleName = 'list';
                const particleHandleName = 'renderParticle';
                [otherMappedHandles, otherConnections] =
                    await this._mapParticleConnections(listHandleName, particleHandleName, resolvedHostedParticle, this.handles, arc);
            }
            const hostedSlotName = [...resolvedHostedParticle.slotConnections.keys()][0];
            const slotName = [...this.spec.slotConnections.values()][0].name;
            const slotId = await arc.createSlot(this, slotName, itemHandle._id);
            if (!slotId) {
                continue;
            }
            this._itemSubIdByHostedSlotId.set(slotId, id);
            try {
                const recipe = this.constructInnerRecipe(resolvedHostedParticle, item, itemHandle, { name: hostedSlotName, id: slotId }, { connections: otherConnections, handles: otherMappedHandles });
                await arc.loadRecipe(recipe);
                // tslint:disable-next-line: no-any
                itemHandle.set(item);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    combineHostedModel(slotName, hostedSlotId, content) {
        const subId = this._itemSubIdByHostedSlotId.get(hostedSlotId);
        if (!subId) {
            return;
        }
        const items = this._state.renderModel ? this._state.renderModel.items : [];
        const listIndex = items.findIndex(item => item.subId === subId);
        const item = { ...content.model, subId };
        if (listIndex >= 0 && listIndex < items.length) {
            items[listIndex] = item;
        }
        else {
            items.push(item);
        }
        this.setState({ renderModel: { items } });
    }
    combineHostedTemplate(slotName, hostedSlotId, content) {
        const subId = this._itemSubIdByHostedSlotId.get(hostedSlotId);
        if (!subId) {
            return;
        }
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(content.templateName, `Template name is missing for slot '${slotName}' (hosted slot ID: '${hostedSlotId}')`);
        const templateName = { ...this._state.templateName, [subId]: `${content.templateName}` };
        this.setState({ templateName });
        if (content.template) {
            let template = content.template;
            // Append subid$={{subid}} attribute to all provided slots, to make it usable for the transformation particle.
            template = template.replace(new RegExp('slotid="[a-z]+"', 'gi'), '$& subid$="{{subId}}"');
            // Replace hosted particle connection in template with the corresponding particle connection names.
            // TODO: make this generic!
            this._connByHostedConn.forEach((conn, hostedConn) => {
                template = template.replace(new RegExp(`{{${hostedConn}.description}}`, 'g'), `{{${conn}.description}}`);
            });
            this.setState({ template: { ...this._state.template, [content.templateName]: template } });
            this.forceRenderTemplate();
        }
    }
    // Called with the list of items and by default returns the direct result of
    // `Array.entries()`. Subclasses can override this method to alter the item
    // order or otherwise permute the items as desired before their slots are
    // created and contents are rendered.
    // tslint:disable-next-line: no-any
    getListEntries(list) {
        return list.entries();
    }
}
//# sourceMappingURL=multiplexer-dom-particle.js.map

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformationDomParticle", function() { return TransformationDomParticle; });
/* harmony import */ var _dom_particle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


// Regex to separate style and template.
const re = /<style>((?:.|[\r\n])*)<\/style>((?:.|[\r\n])*)/;
/**
 * Particle that does transformation stuff with DOM.
 */
class TransformationDomParticle extends _dom_particle_js__WEBPACK_IMPORTED_MODULE_0__["DomParticle"] {
    getTemplate(slotName) {
        // TODO: add support for multiple slots.
        return this._state.template;
    }
    getTemplateName(slotName) {
        // TODO: add support for multiple slots.
        return this._state.templateName;
    }
    render(props, state) {
        return state.renderModel;
    }
    shouldRender(props, state) {
        return Boolean((state.template || state.templateName) && state.renderModel);
    }
    renderHostedSlot(slotName, hostedSlotId, content) {
        this.combineHostedTemplate(slotName, hostedSlotId, content);
        this.combineHostedModel(slotName, hostedSlotId, content);
    }
    // abstract
    combineHostedTemplate(slotName, hostedSlotId, content) {
    }
    combineHostedModel(slotName, hostedSlotId, content) {
    }
    // Helper methods that may be reused in transformation particles to combine hosted content.
    static propsToItems(propsValues) {
        return propsValues ? propsValues.map(e => ({ subId: _entity_js__WEBPACK_IMPORTED_MODULE_1__["Entity"].id(e), ...e })) : [];
    }
}
//# sourceMappingURL=transformation-dom-particle.js.map

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logFactory", function() { return logFactory; });
/**
 * @license
 * Copyright 2019 Google LLC.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const _factory = (preamble, color, log = 'log') =>
  console[log].bind(
    console,
    `%c${preamble}`,
    `background: ${color || 'gray'}; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`
  );

// don't spam the console for workers
if (typeof window !== 'undefined') {
  console.log(`log-web: binding logFactory to level [${window.logLevel}]`);
}

const logFactory = (...args) => {
  // could be running in worker
  const g = (typeof window !== 'undefined') ? window : global;
  // use specified logLevel otherwise 0
  const logLevel = ('logLevel' in g) ? g['logLevel'] : 0;
  // modulate factory based on logLevel
  const factory = logLevel > 0 ? _factory : () => () => {};
  return factory(...args);
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ })
/******/ ]);
//# sourceMappingURL=worker.js.map