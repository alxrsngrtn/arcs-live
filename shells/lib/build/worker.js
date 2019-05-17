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
/* harmony import */ var _build_runtime_particle_execution_context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _build_platform_loader_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);
/* harmony import */ var _build_runtime_id_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(23);
/*
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





self.onmessage = function(e) {
  self.onmessage = null;
  const {id, base} = e.data;
  new _build_runtime_particle_execution_context_js__WEBPACK_IMPORTED_MODULE_0__["ParticleExecutionContext"](e.ports[0], _build_runtime_id_js__WEBPACK_IMPORTED_MODULE_2__["Id"].fromString(id), _build_runtime_id_js__WEBPACK_IMPORTED_MODULE_2__["IdGenerator"].newSession(), new _build_platform_loader_web_js__WEBPACK_IMPORTED_MODULE_1__["PlatformLoader"](base));
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticleExecutionContext", function() { return ParticleExecutionContext; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _api_channel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
/* harmony import */ var _slot_proxy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var _storage_proxy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);
/* harmony import */ var _wasm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31);
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
                    setTimeout(() => { this.Idle(version, pec.relevance); }, 0);
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
                await particle.setHandles(handleMap);
                registerList.forEach(({ proxy, particle, handle }) => proxy.register(particle, handle));
                const idx = this.pendingLoads.indexOf(p);
                this.pendingLoads.splice(idx, 1);
                resolve();
            }];
    }
    async loadWasmParticle(spec) {
        // TODO: use instantiateStreaming? requires passing the fetch() Response, not its ArrayBuffer
        const buffer = await this.loader.loadBinary(spec.implFile);
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(buffer && buffer.byteLength > 0);
        // Particle constructor expects spec to be attached to the class object.
        _wasm_js__WEBPACK_IMPORTED_MODULE_5__["WasmParticle"].spec = spec;
        const particle = new _wasm_js__WEBPACK_IMPORTED_MODULE_5__["WasmParticle"]();
        await particle.initialize(buffer);
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
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
/* harmony import */ var _debug_devtools_connection_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _debug_outer_port_attachment_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _particle_spec_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
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
    if (!targets.has(target)) {
        targets.set(target, new Map());
    }
    if (!targets.get(target).has(propertyKey)) {
        targets.get(target).set(propertyKey, []);
    }
}
function set(target, propertyKey, parameterIndex, info) {
    setPropertyKey(target, propertyKey);
    targets.get(target).get(propertyKey)[parameterIndex] = info;
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
    Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(targets.get(target.constructor));
    Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(targets.get(target.constructor).get(propertyKey));
    Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(targets.get(target.constructor).get(propertyKey)[parameterIndex]);
    targets.get(target.constructor).get(propertyKey)[parameterIndex].identifier = true;
}
function RemoteIgnore(target, propertyKey, parameterIndex) {
    Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(targets.get(target.constructor));
    Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(targets.get(target.constructor).get(propertyKey));
    Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(targets.get(target.constructor).get(propertyKey)[parameterIndex]);
    targets.get(target.constructor).get(propertyKey)[parameterIndex].ignore = true;
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
        this.establishThingMapping(id, thing);
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
        this._debugAttachment = null;
        this._attachStack = false;
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
        if (this._debugAttachment) {
            this._debugAttachment.handlePecMessage('on' + e.data.messageType, e.data.messageBody, count, e.data.stack);
        }
        this['before' + e.data.messageType](e.data.messageBody);
    }
    send(name, args) {
        const call = { messageType: name, messageBody: args, stack: this._attachStack ? new Error().stack : undefined };
        const count = this.messageCount++;
        if (this._debugAttachment) {
            this._debugAttachment.handlePecMessage(name, args, count, new Error().stack);
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
            return info.converter.fromLiteral(value);
        default:
            throw new Error(`Can't yet recieve MappingType ${info.type}`);
    }
}
function AutoConstruct(target) {
    return (constructor) => {
        const doConstruct = (me, other) => {
            const functions = targets.get(me);
            for (const f of functions.keys()) {
                const argNames = getArgs(me.prototype[f]);
                const descriptor = functions.get(f);
                // If this descriptor is for an initializer, record that fact and we'll process it after
                // the rest of the arguments.
                const initializer = descriptor.findIndex(d => d.initializer);
                // If this descriptor records that this argument is the identifier, record it
                // as the requestedId for mapping below.
                const requestedId = descriptor.findIndex(d => d.identifier);
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
                        await Promise.all(promises.map(a => a.promise));
                        promises.forEach(a => args[a.position] = args[a.position]());
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
        _debug_devtools_connection_js__WEBPACK_IMPORTED_MODULE_1__["DevtoolsConnection"].onceConnected.then(devtoolsChannel => {
            this.DevToolsConnected();
            this._debugAttachment = new _debug_outer_port_attachment_js__WEBPACK_IMPORTED_MODULE_2__["OuterPortAttachment"](arc, devtoolsChannel);
        });
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
    __param(0, RedundantInitializer), __param(1, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_4__["Type"])), __param(2, Direct)
], PECOuterPort.prototype, "DefineHandle", null);
__decorate([
    __param(0, Initializer), __param(1, Identifier), __param(1, Direct), __param(2, ByLiteral(_particle_spec_js__WEBPACK_IMPORTED_MODULE_3__["ParticleSpec"])), __param(3, ObjectMap(MappingType.Direct, MappingType.Mapped))
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
    __param(0, Initializer), __param(1, RemoteMapped), __param(2, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_4__["Type"])), __param(3, Direct), __param(4, Identifier), __param(4, Direct), __param(5, Direct)
], PECOuterPort.prototype, "GetBackingStoreCallback", null);
__decorate([
    __param(0, RemoteMapped), __param(1, LocalMapped)
], PECOuterPort.prototype, "ConstructArcCallback", null);
__decorate([
    __param(0, Initializer), __param(1, RemoteMapped), __param(2, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_4__["Type"])), __param(3, Direct), __param(4, Identifier), __param(4, Direct)
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
        this._attachStack = true;
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
    __param(0, LocalMapped), __param(1, Direct), __param(2, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_4__["Type"]))
], PECInnerPort.prototype, "GetBackingStore", null);
__decorate([
    __param(0, LocalMapped), __param(1, Mapped)
], PECInnerPort.prototype, "ConstructInnerArc", null);
__decorate([
    __param(0, LocalMapped), __param(1, RemoteMapped), __param(2, ByLiteral(_type_js__WEBPACK_IMPORTED_MODULE_4__["Type"])), __param(3, Direct)
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
    __param(0, ByLiteral(_arc_exceptions_js__WEBPACK_IMPORTED_MODULE_5__["PropagatedException"]))
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevtoolsConnection", function() { return DevtoolsConnection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevtoolsForTests", function() { return DevtoolsForTests; });
/* harmony import */ var _devtools_shared_devtools_broker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _platform_devtools_channel_web_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _testing_devtools_channel_stub_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




let channel = null;
let isConnected = false;
let onceConnectedResolve = null;
let onceConnected = new Promise(resolve => onceConnectedResolve = resolve);
_devtools_shared_devtools_broker_js__WEBPACK_IMPORTED_MODULE_0__["DevtoolsBroker"].onceConnected.then(() => {
    DevtoolsConnection.ensure();
    onceConnectedResolve(channel);
    isConnected = true;
});
class DevtoolsConnection {
    static get isConnected() {
        return isConnected;
    }
    static get onceConnected() {
        return onceConnected;
    }
    static get() {
        return channel;
    }
    static ensure() {
        if (!channel)
            channel = new _platform_devtools_channel_web_js__WEBPACK_IMPORTED_MODULE_2__["DevtoolsChannel"]();
    }
}
class DevtoolsForTests {
    static get channel() {
        return channel;
    }
    static ensureStub() {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_1__["assert"])(!channel);
        channel = new _testing_devtools_channel_stub_js__WEBPACK_IMPORTED_MODULE_3__["DevtoolsChannelStub"]();
        onceConnectedResolve(channel);
        isConnected = true;
    }
    static reset() {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_1__["assert"])(channel);
        isConnected = false;
        onceConnectedResolve = null;
        onceConnected = new Promise(resolve => onceConnectedResolve = resolve);
        channel = null;
    }
}
//# sourceMappingURL=devtools-connection.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevtoolsBroker", function() { return DevtoolsBroker; });
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// Debugging is initialized either by /devtools/src/run-mark-connected.js, which is
// injected by the devtools extension content script in the browser env,
// or used directly when debugging nodeJS.

// Data needs to be referenced via a global object, otherwise extension and
// Arcs have different instances.
const root = typeof window === 'object' ? window : global;

if (!root._arcDebugPromise) {
  root._arcDebugPromise = new Promise(resolve => {
    root._arcDebugPromiseResolve = resolve;
  });
}

class DevtoolsBroker {
  static get onceConnected() {
    return root._arcDebugPromise;
  }
  static markConnected() {
    root._arcDebugPromiseResolve();
  }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevtoolsChannel", function() { return DevtoolsChannel; });
/* harmony import */ var _runtime_debug_abstract_devtools_channel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




class DevtoolsChannel extends _runtime_debug_abstract_devtools_channel_js__WEBPACK_IMPORTED_MODULE_0__["AbstractDevtoolsChannel"] {
  _flush(messages) {
  }
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractDevtoolsChannel", function() { return AbstractDevtoolsChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcDevtoolsChannel", function() { return ArcDevtoolsChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcDebugListener", function() { return ArcDebugListener; });
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

class AbstractDevtoolsChannel {
    constructor() {
        this.debouncedMessages = [];
        this.messageListeners = new Map();
        this.timer = null;
    }
    send(message) {
        this.ensureNoCycle(message);
        this.debouncedMessages.push(message);
        // Temporary workaround for WebRTC slicing messages above 2^18 characters.
        // Need to find a proper fix. Is there some config in WebRTC to fix this?
        // If not prefer to slice messages based on their serialized form.
        // Maybe zip them for transport?
        if (this.debouncedMessages.length > 10) {
            this._empty();
        }
        else if (!this.timer) {
            this.timer = setTimeout(() => this._empty(), 100);
        }
    }
    listen(arcOrId, messageType, listener) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(messageType);
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(arcOrId);
        const arcId = typeof arcOrId === 'string' ? arcOrId : arcOrId.id.toString();
        const key = `${arcId}/${messageType}`;
        let listeners = this.messageListeners.get(key);
        if (!listeners) {
            this.messageListeners.set(key, listeners = []);
        }
        listeners.push(listener);
    }
    forArc(arc) {
        return new ArcDevtoolsChannel(arc, this);
    }
    _handleMessage(msg) {
        const listeners = this.messageListeners.get(`${msg.arcId}/${msg.messageType}`);
        if (!listeners) {
            console.warn(`No one is listening to ${msg.messageType} message`);
        }
        else {
            for (const listener of listeners) {
                listener(msg);
            }
        }
    }
    _empty() {
        this._flush(this.debouncedMessages);
        this.debouncedMessages = [];
        clearTimeout(this.timer);
        this.timer = null;
    }
    _flush(_messages) {
        throw new Error('Not implemented in an abstract class');
    }
    // tslint:disable-next-line: no-any
    ensureNoCycle(object, objectPath = []) {
        if (!object || typeof object !== 'object')
            return;
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(objectPath.indexOf(object) === -1, 'Message cannot contain a cycle');
        objectPath.push(object);
        (Array.isArray(object) ? object : Object.values(object)).forEach(element => this.ensureNoCycle(element, objectPath));
        objectPath.pop();
    }
}
class ArcDevtoolsChannel {
    constructor(arc, channel) {
        this.channel = channel;
        this.arcId = arc.id.toString();
    }
    send(message) {
        this.channel.send({
            meta: { arcId: this.arcId },
            ...message
        });
    }
    listen(messageType, callback) {
        this.channel.listen(this.arcId, messageType, callback);
    }
    static instantiateListener(listenerClass, arc, channel) {
        return new listenerClass(arc, channel);
    }
}
class ArcDebugListener {
    constructor(_arc, _channel) { }
}
//# sourceMappingURL=abstract-devtools-channel.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevtoolsChannelStub", function() { return DevtoolsChannelStub; });
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class DevtoolsChannelStub {
    constructor() {
        this._messages = [];
    }
    get messages() {
        return this._messages;
    }
    send(message) {
        this._messages.push(JSON.parse(JSON.stringify(message)));
    }
    listen(arcOrId, messageType, listener) {
        // No-op.
    }
    clear() {
        this._messages.length = 0;
    }
    forArc(arc) {
        return this;
    }
}
//# sourceMappingURL=devtools-channel-stub.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OuterPortAttachment", function() { return OuterPortAttachment; });
/* harmony import */ var _platform_sourcemapped_stacktrace_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

class OuterPortAttachment {
    constructor(arc, devtoolsChannel) {
        this.arcDevtoolsChannel = devtoolsChannel.forArc(arc);
    }
    handlePecMessage(name, pecMsgBody, pecMsgCount, stackString) {
        const stack = this._extractStackFrames(stackString);
        this.arcDevtoolsChannel.send({
            messageType: 'PecLog',
            messageBody: { name, pecMsgBody, pecMsgCount, timestamp: Date.now(), stack },
        });
    }
    _extractStackFrames(stackString) {
        const stack = [];
        if (!stackString)
            return stack;
        // File refs should appear only in stack traces generated by tests run with
        // --explore set.
        if (stackString.includes('(file:///')) {
            // The slice discards the 'Error' text and the the stack frame
            // corresponding to the API channel function, which is already being
            // displayed in the log entry.
            for (const frameString of stackString.split('\n    at ').slice(2)) {
                const match = frameString.match(/^(.*) \((.*)\)$/);
                const method = match ? match[1] : '<unknown>';
                let location = match ? match[2] : frameString;
                location = location.replace(/:[0-9]+$/, '');
                if (location.startsWith('file')) {
                    // 'file:///<path>/arcs.*/runtime/file.js:84'
                    // -> location: 'runtime/file.js:150'
                    location = location.replace(/^.*\/arcs[^/]*\//, '');
                }
                stack.push({ method, location, target: null, targetClass: 'noLink' });
            }
            return stack;
        }
        // The slice discards the stack frame corresponding to the API channel
        // function, which is already being displayed in the log entry.
        if (_platform_sourcemapped_stacktrace_web_js__WEBPACK_IMPORTED_MODULE_0__["mapStackTrace"]) {
            Object(_platform_sourcemapped_stacktrace_web_js__WEBPACK_IMPORTED_MODULE_0__["mapStackTrace"])(stackString, (mapped) => mapped.slice(1).map(frameString => {
                // Each frame has the form '    at function (source:line:column)'.
                // Extract the function name and source:line:column text, then set up
                // a frame object with the following fields:
                //   location: text to display as the source in devtools Arcs panel
                //   target: URL to open in devtools Sources panel
                //   targetClass: CSS class specifier to attach to the location text
                const match = frameString.match(/^ {4}at (.*) \((.*)\)$/);
                const method = match ? match[1] : '<unknown>';
                let source = match ? match[2] : frameString.replace(/^ *at */, '');
                const frame = { method };
                source = match[2].replace(/:[0-9]+$/, '');
                if (source.startsWith('http')) {
                    // 'http://<url>/arcs.*/shell/file.js:150'
                    // -> location: 'shell/file.js:150', target: same as source
                    frame.location = source.replace(/^.*\/arcs[^/]*\//, '');
                    frame.target = source;
                    frame.targetClass = 'link';
                }
                else if (source.startsWith('webpack')) {
                    // 'webpack:///runtime/sub/file.js:18'
                    // -> location: 'runtime/sub/file.js:18', target: 'webpack:///./runtime/sub/file.js:18'
                    frame.location = source.slice(11);
                    frame.target = `webpack:///./${frame.location}`;
                    frame.targetClass = 'link';
                }
                else {
                    // '<anonymous>' (or similar)
                    frame.location = source;
                    frame.target = null;
                    frame.targetClass = 'noLink';
                }
                stack.push(frame);
            }), { sync: false, cacheGlobally: true });
        }
        return stack;
    }
}
//# sourceMappingURL=outer-port-attachment.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStackTrace", function() { return mapStackTrace; });
// Copyright (c) 2018 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

// This is only relevant in the web devtools, but we need to
// ensure that the stack trace is passed through on node
// so that system exceptions are plumbed properly.
const mapStackTrace = (x, f) => f([x]);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandleConnectionSpec", function() { return HandleConnectionSpec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsumeSlotConnectionSpec", function() { return ConsumeSlotConnectionSpec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvideSlotConnectionSpec", function() { return ProvideSlotConnectionSpec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticleSpec", function() { return ParticleSpec; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _modality_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(14);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
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
        const { args, name, verbs, description, implFile, implBlobUrl, modality, slotConnections } = this.model;
        const connectionToLiteral = ({ type, direction, name, isOptional, dependentConnections }) => ({ type: asTypeLiteral(type), direction, name, isOptional, dependentConnections: dependentConnections.map(connectionToLiteral) });
        const argsLiteral = args.map(a => connectionToLiteral(a));
        return { args: argsLiteral, name, verbs, description, implFile, implBlobUrl, modality, slotConnections };
    }
    static fromLiteral(literal) {
        let { args, name, verbs, description, implFile, implBlobUrl, modality, slotConnections } = literal;
        const connectionFromLiteral = ({ type, direction, name, isOptional, dependentConnections }) => ({ type: asType(type), direction, name, isOptional, dependentConnections: dependentConnections ? dependentConnections.map(connectionFromLiteral) : [] });
        args = args.map(connectionFromLiteral);
        return new ParticleSpec({ args, name, verbs: verbs || [], description, implFile, implBlobUrl, modality, slotConnections });
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
        this.modality.names.forEach(a => results.push(`  modality ${a}`));
        this.slotConnections.forEach(s => {
            // Consume slot.
            const consume = [];
            if (s.isRequired) {
                consume.push('must');
            }
            consume.push('consume');
            if (s.isSet) {
                consume.push('set of');
            }
            consume.push(s.name);
            if (s.tags.length > 0) {
                consume.push(s.tags.map(a => `#${a}`).join(' '));
            }
            results.push(`  ${consume.join(' ')}`);
            if (s.formFactor) {
                results.push(`    formFactor ${s.formFactor}`);
            }
            // Provided slots.
            s.provideSlotConnections.forEach(ps => {
                const provide = [];
                if (ps.isRequired) {
                    provide.push('must');
                }
                provide.push('provide');
                if (ps.isSet) {
                    provide.push('set of');
                }
                provide.push(ps.name);
                if (ps.tags.length > 0) {
                    provide.push(ps.tags.map(a => `#${a}`).join(' '));
                }
                results.push(`    ${provide.join(' ')}`);
                if (ps.formFactor) {
                    results.push(`      formFactor ${ps.formFactor}`);
                }
                ps.handles.forEach(handle => results.push(`      handle ${handle}`));
            });
        });
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
}
//# sourceMappingURL=particle-spec.js.map

/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeChecker", function() { return TypeChecker; });
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

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
/* 15 */
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
/* harmony import */ var _interface_info_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _schema_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _slot_info_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var _synthetic_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);
/* harmony import */ var _type_variable_info_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(27);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





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
            if (type1.canReadSubset instanceof EntityType) {
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
            if (type1.canWriteSuperset instanceof EntityType) {
                return _schema_js__WEBPACK_IMPORTED_MODULE_1__["Schema"].union(type1.canWriteSuperset.entitySchema, type2.canWriteSuperset.entitySchema) !== null;
            }
        }
        return true;
    }
    // If you want to type-check fully, this is an improvement over just using
    // this instaneceof CollectionType,
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
    // TODO: export InterfaceInfo's Handle and Slot interfaces to type check here?
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
    get isSlot() {
        return true;
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterfaceInfo", function() { return InterfaceInfo; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Schema", function() { return Schema; });
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _symbols_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class Entity {
    // Currently we need a ParticleExecutionContext to be injected here in order to construct entity References (done in the sanitizeEntry
    // function below).
    // TODO(shans): Remove this dependency on ParticleExecutionContext, so that you can construct entities without one.
    constructor(data, schema, context, userIDComponent) {
        this._mutable = true;
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!userIDComponent || userIDComponent.indexOf(':') === -1, 'user IDs must not contain the \':\' character');
        setEntityId(this, undefined);
        this.userIDComponent = userIDComponent;
        this.schema = schema;
        this.context = context;
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(data, `can't construct entity with null data`);
        this.rawData = createRawDataProxy(data, schema, context);
    }
    /** Returns true if this Entity instance can have its fields mutated. */
    get mutable() {
        // TODO: Only the Arc that "owns" this Entity should be allowed to mutate it.
        return this._mutable;
    }
    /**
     * Prevents further mutation of this Entity instance. Note that calling this method only affects this particular Entity instance; the entity
     * it represents (in a data store somewhere) can still be mutated by others. Also note that this field offers no security at all against
     * malicious developers; they can reach in and modify the "private" backing field directly.
     */
    set mutable(mutable) {
        if (!this.mutable && mutable) {
            throw new Error('You cannot make an immutable entity mutable again.');
        }
        this._mutable = mutable;
    }
    /**
     * Mutates the entity. Supply either the new data for the entity, which replaces the existing entity's data entirely, or a mutation function.
     * The supplied mutation function will be called with a mutable copy of the entity's data. The mutations performed by that function will be
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
        this.rawData = createRawDataProxy(newData, this.schema, this.context);
        // TODO: Send mutations to data store.
    }
    getUserID() {
        return this.userIDComponent;
    }
    isIdentified() {
        return getEntityId(this) !== undefined;
    }
    // TODO: entity should not be exposing its IDs.
    get id() {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!!this.isIdentified());
        return getEntityId(this);
    }
    identify(identifier) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this.isIdentified());
        setEntityId(this, identifier);
        const components = identifier.split(':');
        const uid = components.lastIndexOf('uid');
        this.userIDComponent = uid > 0 ? components.slice(uid + 1).join(':') : '';
    }
    createIdentity(parentId, idGenerator) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this.isIdentified());
        let id;
        if (this.userIDComponent) {
            // TODO: Stop creating IDs by manually concatenating strings.
            id = `${parentId.toString()}:uid:${this.userIDComponent}`;
        }
        else {
            id = idGenerator.newChildId(parentId).toString();
        }
        setEntityId(this, id);
    }
    toLiteral() {
        return this.rawData;
    }
    toJSON() {
        return this.rawData;
    }
    dataClone() {
        const clone = {};
        const fieldTypes = this.schema.fields;
        for (const name of Object.keys(fieldTypes)) {
            if (this.rawData[name] !== undefined) {
                if (fieldTypes[name] && fieldTypes[name].kind === 'schema-reference') {
                    if (this.rawData[name]) {
                        clone[name] = this.rawData[name].dataClone();
                    }
                }
                else if (fieldTypes[name] && fieldTypes[name].kind === 'schema-collection') {
                    if (this.rawData[name]) {
                        clone[name] = [...this.rawData[name]].map(a => a.dataClone());
                    }
                }
                else {
                    clone[name] = this.rawData[name];
                }
            }
        }
        return clone;
    }
    serialize() {
        const id = getEntityId(this);
        const rawData = this.dataClone();
        return { id, rawData };
    }
    /** Dynamically constructs a new JS class for the entity type represented by the given schema. */
    static createEntityClass(schema, context) {
        // Create a new class which extends the Entity base class, and implement all of the required static methods/properties.
        const clazz = class extends Entity {
            constructor(data, userIDComponent) {
                super(data, schema, context, userIDComponent);
            }
            get entityClass() {
                return clazz;
            }
            static get type() {
                // TODO: should the entity's key just be its type?
                // Should it just be called type in that case?
                return new _type_js__WEBPACK_IMPORTED_MODULE_2__["EntityType"](schema);
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
        // Add convenience properties for all of the entity's fields. These just proxy everything to the rawData proxy, but offer a nice API for
        // getting/setting fields.
        // TODO: add query / getter functions for user properties
        for (const name of Object.keys(schema.fields)) {
            Object.defineProperty(clazz.prototype, name, {
                get() {
                    return this.rawData[name];
                },
                set(v) {
                    this.rawData[name] = v;
                }
            });
        }
        return clazz;
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
function validateFieldAndTypes({ op, name, value, schema, fieldType }) {
    fieldType = fieldType || schema.fields[name];
    if (fieldType === undefined) {
        throw new Error(`Can't ${op} field ${name}; not in schema ${schema.name}`);
    }
    if (value === undefined || value === null) {
        return;
    }
    switch (fieldType.kind) {
        case 'schema-primitive': {
            const valueType = value.constructor.name === 'Uint8Array' ? 'Uint8Array' : typeof (value);
            if (valueType !== convertToJsType(fieldType, schema.name)) {
                throw new TypeError(`Type mismatch ${op}ting field ${name} (type ${fieldType.type}); ` +
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
            throw new TypeError(`Type mismatch ${op}ting field ${name} (union [${fieldType.types}]); ` +
                `value '${value}' is type ${typeof (value)}`);
        case 'schema-tuple':
            // Value must be an array whose contents match each of the tuple types.
            if (!Array.isArray(value)) {
                throw new TypeError(`Cannot ${op} tuple ${name} with non-array value '${value}'`);
            }
            if (value.length !== fieldType.types.length) {
                throw new TypeError(`Length mismatch ${op}ting tuple ${name} ` +
                    `[${fieldType.types}] with value '${value}'`);
            }
            fieldType.types.map((innerType, i) => {
                if (value[i] !== undefined && value[i] !== null &&
                    typeof (value[i]) !== convertToJsType(innerType, schema.name)) {
                    throw new TypeError(`Type mismatch ${op}ting field ${name} (tuple [${fieldType.types}]); ` +
                        `value '${value}' has type ${typeof (value[i])} at index ${i}`);
                }
            });
            break;
        case 'schema-reference':
            if (!(value instanceof _reference_js__WEBPACK_IMPORTED_MODULE_3__["Reference"])) {
                throw new TypeError(`Cannot ${op} reference ${name} with non-reference '${value}'`);
            }
            if (!_recipe_type_checker_js__WEBPACK_IMPORTED_MODULE_4__["TypeChecker"].compareTypes({ type: value.type }, { type: new _type_js__WEBPACK_IMPORTED_MODULE_2__["ReferenceType"](fieldType.schema.model) })) {
                throw new TypeError(`Cannot ${op} reference ${name} with value '${value}' of mismatched type`);
            }
            break;
        case 'schema-collection':
            // WTF?! value instanceof Set is returning false sometimes here because the Set in
            // this environment (a native code constructor) isn't equal to the Set that the value
            // has been constructed with (another native code constructor)...
            if (value.constructor.name !== 'Set') {
                throw new TypeError(`Cannot ${op} collection ${name} with non-Set '${value}'`);
            }
            for (const element of value) {
                validateFieldAndTypes({ op, name, value: element, schema, fieldType: fieldType.schema });
            }
            break;
        default:
            throw new Error(`Unknown kind ${fieldType.kind} in schema ${schema.name}`);
    }
}
function sanitizeData(data, schema, context) {
    const sanitizedData = {};
    for (const [name, value] of Object.entries(data)) {
        const sanitizedValue = sanitizeEntry(schema.fields[name], value, name, context);
        validateFieldAndTypes({ op: 'set', name, value: sanitizedValue, schema });
        sanitizedData[name] = sanitizedValue;
    }
    return sanitizedData;
}
function sanitizeEntry(type, value, name, context) {
    if (!type) {
        // If there isn't a field type for this, the proxy will pick up
        // that fact and report a meaningful error.
        return value;
    }
    if (type.kind === 'schema-reference' && value) {
        if (value instanceof _reference_js__WEBPACK_IMPORTED_MODULE_3__["Reference"]) {
            // Setting value as Reference (Particle side). This will enforce that the type provided for
            // the handle matches the type of the reference.
            return value;
        }
        else if (value.id && value.storageKey) {
            // Setting value from raw data (Channel side).
            // TODO(shans): This can't enforce type safety here as there isn't any type data available.
            // Maybe this is OK because there's type checking on the other side of the channel?
            return new _reference_js__WEBPACK_IMPORTED_MODULE_3__["Reference"](value, new _type_js__WEBPACK_IMPORTED_MODULE_2__["ReferenceType"](type.schema.model), context);
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
/** Constructs a Proxy object to use for entities' rawData objects. This proxy will perform type-checking when getting/setting fields. */
function createRawDataProxy(data, schema, context) {
    const classJunk = ['toJSON', 'prototype', 'toString', 'inspect'];
    // TODO: figure out how to do this only on wire-created entities.
    const sanitizedData = sanitizeData(data, schema, context);
    return new Proxy(sanitizedData, {
        get: (target, name) => {
            if (classJunk.includes(name) || name.constructor === Symbol) {
                return undefined;
            }
            const value = target[name];
            validateFieldAndTypes({ op: 'get', name, value, schema });
            return value;
        },
        set: (target, name, value) => {
            throw new Error(`Tried to modify entity field '${name}'. Use the mutate method instead.`);
        }
    });
}
/**
 * Returns the ID of the given entity. This is a function private to this file instead of a method on the Entity class, so that developers can't
 * get access to it.
 */
function getEntityId(entity) {
    // Typescript doesn't let us use symbols as indexes, so cast to any first.
    // tslint:disable-next-line: no-any
    return entity[_symbols_js__WEBPACK_IMPORTED_MODULE_1__["Symbols"].identifier];
}
/**
 * Sets the ID of the given entity. This is a function private to this file instead of a method on the Entity class, so that developers can't
 * get access to it.
 */
function setEntityId(entity, id) {
    // Typescript doesn't let us use symbols as indexes, so cast to any first.
    // tslint:disable-next-line: no-any
    entity[_symbols_js__WEBPACK_IMPORTED_MODULE_1__["Symbols"].identifier] = id;
}
//# sourceMappingURL=entity.js.map

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Symbols", function() { return Symbols; });
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
// tslint:disable-next-line: variable-name
const Symbols = { identifier: Symbol('id') };
//# sourceMappingURL=symbols.js.map

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reference", function() { return Reference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientReference", function() { return ClientReference; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/** @license
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
    serialize() {
        return {
            id: this.id,
            rawData: this.dataClone(),
        };
    }
}
/** A subclass of Reference that clients can create. */
class ClientReference extends Reference {
    /** Use the newClientReference factory method instead. */
    constructor(entity, context) {
        // TODO(shans): start carrying storageKey information around on Entity objects
        super({ id: entity.id, storageKey: null }, new _type_js__WEBPACK_IMPORTED_MODULE_2__["ReferenceType"](entity.entityClass.type), context);
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
        return this.entity.isIdentified();
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
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Handle", function() { return Handle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collection", function() { return Collection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Variable", function() { return Variable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BigCollection", function() { return BigCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleFor", function() { return handleFor; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _particle_spec_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(23);
/** @license
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
        entity.identify(entry.id);
    }
    // TODO some relation magic, somewhere, at some point.
    return entity;
}
/**
 * Base class for Collections and Variables.
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
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(entity, 'can\'t serialize a null entity');
        if (entity instanceof _entity_js__WEBPACK_IMPORTED_MODULE_5__["Entity"]) {
            if (!entity.isIdentified()) {
                entity.createIdentity(_id_js__WEBPACK_IMPORTED_MODULE_6__["Id"].fromString(this._id), this.idGenerator);
            }
        }
        return entity.serialize();
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
    _notify(kind, particle, details) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.canRead, '_notify should not be called for non-readable handles');
        switch (kind) {
            case 'sync':
                try {
                    particle.onHandleSync(this, this._restore(details));
                }
                catch (e) {
                    this.reportUserExceptionInHost(e, particle, 'onHandleSync');
                }
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
                particle.onHandleUpdate(this, update);
                return;
            }
            case 'desync':
                particle.onHandleDesync(this);
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
        this.storage.remove(serialization.id, keys, this._particleId);
    }
}
/**
 * A handle on a single entity. A particle's manifest dictates
 * the types of handles that need to be connected to that particle, and
 * the current recipe identifies which handles are connected.
 */
class Variable extends Handle {
    // Called by StorageProxy.
    async _notify(kind, particle, details) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(this.canRead, '_notify should not be called for non-readable handles');
        switch (kind) {
            case 'sync':
                try {
                    await particle.onHandleSync(this, this._restore(details));
                }
                catch (e) {
                    this.reportUserExceptionInHost(e, particle, 'onHandleSync');
                }
                return;
            case 'update': {
                try {
                    const data = this._restore(details.data);
                    const oldData = this._restore(details.oldData);
                    await particle.onHandleUpdate(this, { data, oldData });
                }
                catch (e) {
                    this.reportUserExceptionInHost(e, particle, 'onHandleUpdate');
                }
                return;
            }
            case 'desync':
                try {
                    await particle.onHandleDesync(this);
                }
                catch (e) {
                    this.reportUserExceptionInHost(e, particle, 'onHandleDesync');
                }
                return;
            default:
                throw new Error('unsupported');
        }
    }
    /**
     * @returns the Entity contained by the Variable, or undefined if the Variable
     * is cleared.
     * @throws {Error} if this variable is not configured as a readable handle (i.e. 'in' or 'inout')
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
     * Stores a new entity into the Variable, replacing any existing entity.
     * @throws {Error} if this variable is not configured as a writeable handle (i.e. 'out' or 'inout')
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
     * Clears any entity currently in the Variable.
     * @throws {Error} if this variable is not configured as a writeable handle (i.e. 'out' or 'inout')
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
        await particle.onHandleSync(this, []);
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
        this.storage.remove(serialization.id, [], this._particleId);
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
     * @throws {Error} if this variable is not configured as a readable handle (i.e. 'in' or 'inout')
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
        handle = new Variable(storage, idGenerator, name, particleId, canRead, canWrite);
    }
    const type = storage.type.getContainedType() || storage.type;
    if (type instanceof _type_js__WEBPACK_IMPORTED_MODULE_4__["EntityType"]) {
        handle.entityClass = type.entitySchema.entityClass(storage.pec);
    }
    return handle;
}
//# sourceMappingURL=handle.js.map

/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdGenerator", function() { return IdGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Id", function() { return Id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcId", function() { return ArcId; });
/* harmony import */ var _random_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
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
/* 24 */
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlotInfo", function() { return SlotInfo; });
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
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
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcInfo", function() { return ArcInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArcHandle", function() { return ArcHandle; });
// @license
// Copyright (c) 2018 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeVariableInfo", function() { return TypeVariableInfo; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _schema_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt



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
/* 28 */
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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageProxy", function() { return StorageProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollectionProxy", function() { return CollectionProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VariableProxy", function() { return VariableProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BigCollectionProxy", function() { return BigCollectionProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StorageProxyScheduler", function() { return StorageProxyScheduler; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _platform_sourcemapped_stacktrace_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _arc_exceptions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _storage_crdt_collection_model_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
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
        return new VariableProxy(id, type, port, pec, scheduler, name);
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
            // If we are a variable waiting for a barriered set response
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
 * VariableProxy mutates the model, it sets a barrier and expects to
 * receive the barrier value echoed back in a subsequent update event.
 * Between those two points in time updates are not applied or
 * notified about as these reflect concurrent writes that did not 'win'.
 */
class VariableProxy extends StorageProxy {
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CrdtCollectionModel", function() { return CrdtCollectionModel; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toProtoJSON", function() { return toProtoJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EntityProtoConverter", function() { return EntityProtoConverter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WasmParticle", function() { return WasmParticle; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _platform_protobufjs_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/**
 * @license
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




function jsonBaseType(type) {
    const kind = (type.kind === 'schema-primitive') ? type.type : type.kind;
    switch (kind) {
        case 'Text':
            return 'string';
        case 'URL':
            return 'Url';
        case 'Number':
            return 'double';
        case 'Boolean':
            return 'bool';
        case 'Bytes':
        case 'Object':
        case 'schema-union':
        case 'schema-tuple':
        case 'schema-reference':
            throw new Error(`'${kind}' not yet supported for schema to proto-json conversion`);
        case 'schema-collection':
            throw new Error(`Nested collections not yet supported for schema to proto-json conversion`);
        default:
            throw new Error(`Unknown type '${kind}' in schema`);
    }
}
// Returns a JSON representation that protobufjs can use to de/serialize entity data as protobufs.
function toProtoJSON(schema) {
    let id = 0;
    let hasUrl = false;
    const fields = {};
    for (const [name, type] of Object.entries(schema.fields).sort()) {
        id++;
        let field;
        if (type.kind === 'schema-collection') {
            field = { rule: 'repeated', type: jsonBaseType(type.schema), id };
        }
        else {
            field = { type: jsonBaseType(type), id };
        }
        hasUrl = hasUrl || (field.type === 'Url');
        fields[name] = field;
    }
    const json = {
        nested: {
            [schema.name]: { fields }
        }
    };
    if (hasUrl) {
        json.nested.Url = { fields: { href: { type: 'string', id: 1 } } };
    }
    return json;
}
class EntityProtoConverter {
    constructor(schema) {
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(schema.names.length > 0, 'At least one schema name is required for proto conversion');
        const protoRoot = _platform_protobufjs_web_js__WEBPACK_IMPORTED_MODULE_1__["protobufjs"].Root.fromJSON(toProtoJSON(schema));
        this.schema = schema;
        this.message = protoRoot.lookupType(schema.name);
    }
    encode(entity) {
        const proto = this.message.create();
        const scalar = (field, value) => (field.type === 'URL') ? { href: value } : value;
        for (const [name, value] of Object.entries(entity.toLiteral())) {
            const field = this.schema.fields[name];
            if (field.kind === 'schema-collection') {
                // tslint:disable-next-line: no-any
                proto[name] = [...value].map(v => scalar(field.schema, v));
            }
            else {
                proto[name] = scalar(field, value);
            }
        }
        return this.message.encode(proto).finish();
    }
    decode(buffer) {
        const proto = this.message.decode(buffer);
        const scalar = (field, value) => (field.type === 'URL') ? value.href : value;
        const data = {};
        for (const [name, value] of Object.entries(proto.toJSON())) {
            const field = this.schema.fields[name];
            if (field.kind === 'schema-collection') {
                data[name] = value.map(v => scalar(field.schema, v));
            }
            else {
                data[name] = scalar(field, value);
            }
        }
        return new (this.schema.entityClass())(data);
    }
}
async function setVariable(handle, num) {
    const entity = new handle.entityClass({ num });
    await handle.set(entity);
}
function errFunc(label) {
    return err => { throw new Error(label + ': ' + err); };
}
class WasmParticle extends _particle_js__WEBPACK_IMPORTED_MODULE_2__["Particle"] {
    constructor() {
        super(...arguments);
        this.handleMap = new Map();
        this.revHandleMap = new Map();
        this.converters = new Map();
    }
    async initialize(buffer) {
        this.memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
        this.heap = new Uint8Array(this.memory.buffer);
        // SO MANY MAGIC NUMBERS
        const env = {
            // Memory setup
            memory: this.memory,
            __memory_base: 1024,
            table: new WebAssembly.Table({ initial: 35, maximum: 35, element: 'anyfunc' }),
            __table_base: 0,
            DYNAMICTOP_PTR: 4096,
            // Heap management
            _emscripten_get_heap_size: () => this.heap.length,
            _emscripten_resize_heap: size => false,
            _emscripten_memcpy_big: (dst, src, cnt) => { this.heap.set(this.heap.subarray(src, src + cnt), dst); },
            // Error handling
            abort: errFunc('abort'),
            _abort: errFunc('_abort'),
            ___assert_fail: errFunc('assert'),
            ___setErrNo: errFunc('setErrNo'),
            abortOnCannotGrowMemory: errFunc('abortOnCannotGrowMemory'),
            // Handle API
            _handleSet: async (wasmHandle, num) => setVariable(this.revHandleMap.get(wasmHandle), num),
            // Logging functions
            _console: i => console.log(`<${this.spec.name}> ${this.readString(i)}`),
            _consoleN: (i, n) => console.log(`<${this.spec.name}> ${this.readString(i)} ${n}`),
        };
        this.wasm = await WebAssembly.instantiate(buffer, { env });
        this.exports = this.wasm.instance.exports;
        this.innerParticle = this.exports._newParticle();
        console.log('---------------------------------------------------');
    }
    async setHandles(handles) {
        for (const [name, handle] of handles) {
            // Currently only Variables with a 'Number num' field are supported.
            Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_3__["Variable"]);
            Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(handle.entityClass.schema.fields.num.type === 'Number');
            // Ownership of 'name' is passed to the inner particle.
            const p = this.storeString(name);
            const wasmHandle = this.exports._newHandle(this.innerParticle, p);
            this.handleMap.set(handle, wasmHandle);
            this.revHandleMap.set(wasmHandle, handle);
        }
        this.exports._initParticle(this.innerParticle);
    }
    async onHandleSync(handle, model) {
        if (!model)
            return;
        let converter = this.converters.get(model.schema);
        if (!converter) {
            converter = new EntityProtoConverter(model.schema);
            this.converters.set(model.schema, converter);
        }
        const buf = converter.encode(model);
        // Encode and send the protobuf... but for now just stuff 'num' in as the first byte to be extracted wasm-side.
        buf[0] = model.num & 0xff;
        const p = this.storeBuffer(buf);
        this.exports._syncHandle(this.innerParticle, this.handleMap.get(handle), p, buf.length);
        this.exports._free(p);
    }
    // tslint:disable-next-line: no-any
    async onHandleUpdate(handle, update) { }
    async onHandleDesync(handle) { }
    renderSlot(slotName, contentTypes) { }
    renderHostedSlot(slotName, hostedSlotId, content) { }
    fireEvent(slotName, event) { }
    // Allocates memory in the wasm container.
    storeBuffer(buf) {
        const p = this.exports._malloc(buf.length);
        for (let i = 0; i < buf.length; i++) {
            this.heap[p + i] = buf[i];
        }
        return p;
    }
    // Allocates memory in the wasm container.
    storeString(str) {
        const p = this.exports._malloc(str.length + 1);
        for (let i = 0; i < str.length; i++) {
            this.heap[p + i] = str.charCodeAt(i);
        }
        this.heap[p + str.length] = 0;
        return p;
    }
    readString(idx) {
        let str = '';
        while (idx < this.heap.length && this.heap[idx] !== 0) {
            str += String.fromCharCode(this.heap[idx++]);
        }
        return str;
    }
}
//# sourceMappingURL=wasm.js.map

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_protobufjs_dist_protobuf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var _node_modules_protobufjs_dist_protobuf_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_protobufjs_dist_protobuf_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "protobufjs", function() { return _node_modules_protobufjs_dist_protobuf_js__WEBPACK_IMPORTED_MODULE_0__; });
// Copyright (c) 2019 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
// TODO: figure out how to correctly pull this into the worker environment


//# sourceMappingURL=protobufjs-web.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * protobuf.js v6.8.8 (c) 2016, daniel wirtz
 * compiled thu, 19 jul 2018 00:33:25 utc
 * licensed under the bsd-3-clause license
 * see: https://github.com/dcodeio/protobuf.js for details
 */
(function(undefined){"use strict";(function prelude(modules, cache, entries) {

    // This is the prelude used to bundle protobuf.js for the browser. Wraps up the CommonJS
    // sources through a conflict-free require shim and is again wrapped within an iife that
    // provides a minification-friendly `undefined` var plus a global "use strict" directive
    // so that minification can remove the directives of each module.

    function $require(name) {
        var $module = cache[name];
        if (!$module)
            modules[name][0].call($module = cache[name] = { exports: {} }, $require, $module, $module.exports);
        return $module.exports;
    }

    var protobuf = $require(entries[0]);

    // Expose globally
    protobuf.util.global.protobuf = protobuf;

    // Be nice to AMD
    if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(35)], __WEBPACK_AMD_DEFINE_RESULT__ = (function(Long) {
            if (Long && Long.isLong) {
                protobuf.util.Long = Long;
                protobuf.configure();
            }
            return protobuf;
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    // Be nice to CommonJS
    if ( true && module && module.exports)
        module.exports = protobuf;

})/* end of prelude */({1:[function(require,module,exports){
"use strict";
module.exports = asPromise;

/**
 * Callback as used by {@link util.asPromise}.
 * @typedef asPromiseCallback
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {...*} params Additional arguments
 * @returns {undefined}
 */

/**
 * Returns a promise from a node-style callback function.
 * @memberof util
 * @param {asPromiseCallback} fn Function to call
 * @param {*} ctx Function context
 * @param {...*} params Function arguments
 * @returns {Promise<*>} Promisified function
 */
function asPromise(fn, ctx/*, varargs */) {
    var params  = new Array(arguments.length - 1),
        offset  = 0,
        index   = 2,
        pending = true;
    while (index < arguments.length)
        params[offset++] = arguments[index++];
    return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err/*, varargs */) {
            if (pending) {
                pending = false;
                if (err)
                    reject(err);
                else {
                    var params = new Array(arguments.length - 1),
                        offset = 0;
                    while (offset < params.length)
                        params[offset++] = arguments[offset];
                    resolve.apply(null, params);
                }
            }
        };
        try {
            fn.apply(ctx || null, params);
        } catch (err) {
            if (pending) {
                pending = false;
                reject(err);
            }
        }
    });
}

},{}],2:[function(require,module,exports){
"use strict";

/**
 * A minimal base64 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var base64 = exports;

/**
 * Calculates the byte length of a base64 encoded string.
 * @param {string} string Base64 encoded string
 * @returns {number} Byte length
 */
base64.length = function length(string) {
    var p = string.length;
    if (!p)
        return 0;
    var n = 0;
    while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
    return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;)
    s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;

/**
 * Encodes a buffer to a base64 encoded string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} Base64 encoded string
 */
base64.encode = function encode(buffer, start, end) {
    var parts = null,
        chunk = [];
    var i = 0, // output index
        j = 0, // goto index
        t;     // temporary
    while (start < end) {
        var b = buffer[start++];
        switch (j) {
            case 0:
                chunk[i++] = b64[b >> 2];
                t = (b & 3) << 4;
                j = 1;
                break;
            case 1:
                chunk[i++] = b64[t | b >> 4];
                t = (b & 15) << 2;
                j = 2;
                break;
            case 2:
                chunk[i++] = b64[t | b >> 6];
                chunk[i++] = b64[b & 63];
                j = 0;
                break;
        }
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (j) {
        chunk[i++] = b64[t];
        chunk[i++] = 61;
        if (j === 1)
            chunk[i++] = 61;
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
 * Decodes a base64 encoded string to a buffer.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Number of bytes written
 * @throws {Error} If encoding is invalid
 */
base64.decode = function decode(string, buffer, offset) {
    var start = offset;
    var j = 0, // goto index
        t;     // temporary
    for (var i = 0; i < string.length;) {
        var c = string.charCodeAt(i++);
        if (c === 61 && j > 1)
            break;
        if ((c = s64[c]) === undefined)
            throw Error(invalidEncoding);
        switch (j) {
            case 0:
                t = c;
                j = 1;
                break;
            case 1:
                buffer[offset++] = t << 2 | (c & 48) >> 4;
                t = c;
                j = 2;
                break;
            case 2:
                buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
                t = c;
                j = 3;
                break;
            case 3:
                buffer[offset++] = (t & 3) << 6 | c;
                j = 0;
                break;
        }
    }
    if (j === 1)
        throw Error(invalidEncoding);
    return offset - start;
};

/**
 * Tests if the specified string appears to be base64 encoded.
 * @param {string} string String to test
 * @returns {boolean} `true` if probably base64 encoded, otherwise false
 */
base64.test = function test(string) {
    return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};

},{}],3:[function(require,module,exports){
"use strict";
module.exports = codegen;

/**
 * Begins generating a function.
 * @memberof util
 * @param {string[]} functionParams Function parameter names
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 */
function codegen(functionParams, functionName) {

    /* istanbul ignore if */
    if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = undefined;
    }

    var body = [];

    /**
     * Appends code to the function's body or finishes generation.
     * @typedef Codegen
     * @type {function}
     * @param {string|Object.<string,*>} [formatStringOrScope] Format string or, to finish the function, an object of additional scope variables, if any
     * @param {...*} [formatParams] Format parameters
     * @returns {Codegen|Function} Itself or the generated function if finished
     * @throws {Error} If format parameter counts do not match
     */

    function Codegen(formatStringOrScope) {
        // note that explicit array handling below makes this ~50% faster

        // finish the function
        if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose)
                console.log("codegen: " + source); // eslint-disable-line no-console
            source = "return " + source;
            if (formatStringOrScope) {
                var scopeKeys   = Object.keys(formatStringOrScope),
                    scopeParams = new Array(scopeKeys.length + 1),
                    scopeValues = new Array(scopeKeys.length),
                    scopeOffset = 0;
                while (scopeOffset < scopeKeys.length) {
                    scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                    scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
                }
                scopeParams[scopeOffset] = source;
                return Function.apply(null, scopeParams).apply(null, scopeValues); // eslint-disable-line no-new-func
            }
            return Function(source)(); // eslint-disable-line no-new-func
        }

        // otherwise append to body
        var formatParams = new Array(arguments.length - 1),
            formatOffset = 0;
        while (formatOffset < formatParams.length)
            formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
            var value = formatParams[formatOffset++];
            switch ($1) {
                case "d": case "f": return String(Number(value));
                case "i": return String(Math.floor(value));
                case "j": return JSON.stringify(value);
                case "s": return String(value);
            }
            return "%";
        });
        if (formatOffset !== formatParams.length)
            throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return Codegen;
    }

    function toString(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
    }

    Codegen.toString = toString;
    return Codegen;
}

/**
 * Begins generating a function.
 * @memberof util
 * @function codegen
 * @param {string} [functionName] Function name if not anonymous
 * @returns {Codegen} Appender that appends code to the function's body
 * @variation 2
 */

/**
 * When set to `true`, codegen will log generated code to console. Useful for debugging.
 * @name util.codegen.verbose
 * @type {boolean}
 */
codegen.verbose = false;

},{}],4:[function(require,module,exports){
"use strict";
module.exports = EventEmitter;

/**
 * Constructs a new event emitter instance.
 * @classdesc A minimal event emitter.
 * @memberof util
 * @constructor
 */
function EventEmitter() {

    /**
     * Registered listeners.
     * @type {Object.<string,*>}
     * @private
     */
    this._listeners = {};
}

/**
 * Registers an event listener.
 * @param {string} evt Event name
 * @param {function} fn Listener
 * @param {*} [ctx] Listener context
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
    (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn  : fn,
        ctx : ctx || this
    });
    return this;
};

/**
 * Removes an event listener or any matching listeners if arguments are omitted.
 * @param {string} [evt] Event name. Removes all listeners if omitted.
 * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.off = function off(evt, fn) {
    if (evt === undefined)
        this._listeners = {};
    else {
        if (fn === undefined)
            this._listeners[evt] = [];
        else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length;)
                if (listeners[i].fn === fn)
                    listeners.splice(i, 1);
                else
                    ++i;
        }
    }
    return this;
};

/**
 * Emits an event by calling its listeners with the specified arguments.
 * @param {string} evt Event name
 * @param {...*} args Arguments
 * @returns {util.EventEmitter} `this`
 */
EventEmitter.prototype.emit = function emit(evt) {
    var listeners = this._listeners[evt];
    if (listeners) {
        var args = [],
            i = 1;
        for (; i < arguments.length;)
            args.push(arguments[i++]);
        for (i = 0; i < listeners.length;)
            listeners[i].fn.apply(listeners[i++].ctx, args);
    }
    return this;
};

},{}],5:[function(require,module,exports){
"use strict";
module.exports = fetch;

var asPromise = require(1),
    inquire   = require(7);

var fs = inquire("fs");

/**
 * Node-style callback as used by {@link util.fetch}.
 * @typedef FetchCallback
 * @type {function}
 * @param {?Error} error Error, if any, otherwise `null`
 * @param {string} [contents] File contents, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Options as used by {@link util.fetch}.
 * @typedef FetchOptions
 * @type {Object}
 * @property {boolean} [binary=false] Whether expecting a binary response
 * @property {boolean} [xhr=false] If `true`, forces the use of XMLHttpRequest
 */

/**
 * Fetches the contents of a file.
 * @memberof util
 * @param {string} filename File path or url
 * @param {FetchOptions} options Fetch options
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 */
function fetch(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    } else if (!options)
        options = {};

    if (!callback)
        return asPromise(fetch, this, filename, options); // eslint-disable-line no-invalid-this

    // if a node-like filesystem is present, try it first but fall back to XHR if nothing is found.
    if (!options.xhr && fs && fs.readFile)
        return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
            return err && typeof XMLHttpRequest !== "undefined"
                ? fetch.xhr(filename, options, callback)
                : err
                ? callback(err)
                : callback(null, options.binary ? contents : contents.toString("utf8"));
        });

    // use the XHR version otherwise.
    return fetch.xhr(filename, options, callback);
}

/**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */

/**
 * Fetches the contents of a file.
 * @name util.fetch
 * @function
 * @param {string} path File path or url
 * @param {FetchOptions} [options] Fetch options
 * @returns {Promise<string|Uint8Array>} Promise
 * @variation 3
 */

/**/
fetch.xhr = function fetch_xhr(filename, options, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange /* works everywhere */ = function fetchOnReadyStateChange() {

        if (xhr.readyState !== 4)
            return undefined;

        // local cors security errors return status 0 / empty string, too. afaik this cannot be
        // reliably distinguished from an actually empty file for security reasons. feel free
        // to send a pull request if you are aware of a solution.
        if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));

        // if binary data is expected, make sure that some sort of array is returned, even if
        // ArrayBuffers are not supported. the binary string fallback, however, is unsafe.
        if (options.binary) {
            var buffer = xhr.response;
            if (!buffer) {
                buffer = [];
                for (var i = 0; i < xhr.responseText.length; ++i)
                    buffer.push(xhr.responseText.charCodeAt(i) & 255);
            }
            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
        }
        return callback(null, xhr.responseText);
    };

    if (options.binary) {
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data#Receiving_binary_data_in_older_browsers
        if ("overrideMimeType" in xhr)
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.responseType = "arraybuffer";
    }

    xhr.open("GET", filename);
    xhr.send();
};

},{"1":1,"7":7}],6:[function(require,module,exports){
"use strict";

module.exports = factory(factory);

/**
 * Reads / writes floats / doubles from / to buffers.
 * @name util.float
 * @namespace
 */

/**
 * Writes a 32 bit float to a buffer using little endian byte order.
 * @name util.float.writeFloatLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 32 bit float to a buffer using big endian byte order.
 * @name util.float.writeFloatBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 32 bit float from a buffer using little endian byte order.
 * @name util.float.readFloatLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 32 bit float from a buffer using big endian byte order.
 * @name util.float.readFloatBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Writes a 64 bit double to a buffer using little endian byte order.
 * @name util.float.writeDoubleLE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Writes a 64 bit double to a buffer using big endian byte order.
 * @name util.float.writeDoubleBE
 * @function
 * @param {number} val Value to write
 * @param {Uint8Array} buf Target buffer
 * @param {number} pos Target buffer offset
 * @returns {undefined}
 */

/**
 * Reads a 64 bit double from a buffer using little endian byte order.
 * @name util.float.readDoubleLE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

/**
 * Reads a 64 bit double from a buffer using big endian byte order.
 * @name util.float.readDoubleBE
 * @function
 * @param {Uint8Array} buf Source buffer
 * @param {number} pos Source buffer offset
 * @returns {number} Value read
 */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

    // float: typed array
    if (typeof Float32Array !== "undefined") (function() {

        var f32 = new Float32Array([ -0 ]),
            f8b = new Uint8Array(f32.buffer),
            le  = f8b[3] === 128;

        function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
        }

        function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos    ] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
        /* istanbul ignore next */
        exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

        function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
        }

        function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos    ];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
        }

        /* istanbul ignore next */
        exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
        /* istanbul ignore next */
        exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
    })(); else (function() {

        function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0)
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos);
            else if (isNaN(val))
                writeUint(2143289344, buf, pos);
            else if (val > 3.4028234663852886e+38) // +-Infinity
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 1.1754943508222875e-38) // denormal
                writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);
            else {
                var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
        }

        exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
        exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

        function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos),
                sign = (uint >> 31) * 2 + 1,
                exponent = uint >>> 23 & 255,
                mantissa = uint & 8388607;
            return exponent === 255
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 1.401298464324817e-45 * mantissa
                : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
        }

        exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
        exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

    })();

    // double: typed array
    if (typeof Float64Array !== "undefined") (function() {

        var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le  = f8b[7] === 128;

        function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
        }

        function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos    ] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
        }

        /* istanbul ignore next */
        exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
        /* istanbul ignore next */
        exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

        function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos    ];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
        }

        function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos    ];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
        }

        /* istanbul ignore next */
        exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
        /* istanbul ignore next */
        exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
    })(); else (function() {

        function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
                val = -val;
            if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? /* positive */ 0 : /* negative 0 */ 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
            } else if (val > 1.7976931348623157e+308) { // +-Infinity
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
                var mantissa;
                if (val < 2.2250738585072014e-308) { // denormal
                    mantissa = val / 5e-324;
                    writeUint(mantissa >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2);
                    if (exponent === 1024)
                        exponent = 1023;
                    mantissa = val * Math.pow(2, -exponent);
                    writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                    writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
            }
        }

        exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
        exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

        function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0),
                hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
                exponent = hi >>> 20 & 2047,
                mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
                ? mantissa
                ? NaN
                : sign * Infinity
                : exponent === 0 // denormal
                ? sign * 5e-324 * mantissa
                : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
        }

        exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
        exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

    })();

    return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
    buf[pos    ] =  val        & 255;
    buf[pos + 1] =  val >>> 8  & 255;
    buf[pos + 2] =  val >>> 16 & 255;
    buf[pos + 3] =  val >>> 24;
}

function writeUintBE(val, buf, pos) {
    buf[pos    ] =  val >>> 24;
    buf[pos + 1] =  val >>> 16 & 255;
    buf[pos + 2] =  val >>> 8  & 255;
    buf[pos + 3] =  val        & 255;
}

function readUintLE(buf, pos) {
    return (buf[pos    ]
          | buf[pos + 1] << 8
          | buf[pos + 2] << 16
          | buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
    return (buf[pos    ] << 24
          | buf[pos + 1] << 16
          | buf[pos + 2] << 8
          | buf[pos + 3]) >>> 0;
}

},{}],7:[function(require,module,exports){
"use strict";
module.exports = inquire;

/**
 * Requires a module only if available.
 * @memberof util
 * @param {string} moduleName Module to require
 * @returns {?Object} Required module if available and not empty, otherwise `null`
 */
function inquire(moduleName) {
    try {
        var mod = eval("quire".replace(/^/,"re"))(moduleName); // eslint-disable-line no-eval
        if (mod && (mod.length || Object.keys(mod).length))
            return mod;
    } catch (e) {} // eslint-disable-line no-empty
    return null;
}

},{}],8:[function(require,module,exports){
"use strict";

/**
 * A minimal path module to resolve Unix, Windows and URL paths alike.
 * @memberof util
 * @namespace
 */
var path = exports;

var isAbsolute =
/**
 * Tests if the specified path is absolute.
 * @param {string} path Path to test
 * @returns {boolean} `true` if path is absolute
 */
path.isAbsolute = function isAbsolute(path) {
    return /^(?:\/|\w+:)/.test(path);
};

var normalize =
/**
 * Normalizes the specified path.
 * @param {string} path Path to normalize
 * @returns {string} Normalized path
 */
path.normalize = function normalize(path) {
    path = path.replace(/\\/g, "/")
               .replace(/\/{2,}/g, "/");
    var parts    = path.split("/"),
        absolute = isAbsolute(path),
        prefix   = "";
    if (absolute)
        prefix = parts.shift() + "/";
    for (var i = 0; i < parts.length;) {
        if (parts[i] === "..") {
            if (i > 0 && parts[i - 1] !== "..")
                parts.splice(--i, 2);
            else if (absolute)
                parts.splice(i, 1);
            else
                ++i;
        } else if (parts[i] === ".")
            parts.splice(i, 1);
        else
            ++i;
    }
    return prefix + parts.join("/");
};

/**
 * Resolves the specified include path against the specified origin path.
 * @param {string} originPath Path to the origin file
 * @param {string} includePath Include path relative to origin path
 * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
 * @returns {string} Path to the include file
 */
path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
    if (!alreadyNormalized)
        includePath = normalize(includePath);
    if (isAbsolute(includePath))
        return includePath;
    if (!alreadyNormalized)
        originPath = normalize(originPath);
    return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
};

},{}],9:[function(require,module,exports){
"use strict";
module.exports = pool;

/**
 * An allocator as used by {@link util.pool}.
 * @typedef PoolAllocator
 * @type {function}
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */

/**
 * A slicer as used by {@link util.pool}.
 * @typedef PoolSlicer
 * @type {function}
 * @param {number} start Start offset
 * @param {number} end End offset
 * @returns {Uint8Array} Buffer slice
 * @this {Uint8Array}
 */

/**
 * A general purpose buffer pool.
 * @memberof util
 * @function
 * @param {PoolAllocator} alloc Allocator
 * @param {PoolSlicer} slice Slicer
 * @param {number} [size=8192] Slab size
 * @returns {PoolAllocator} Pooled allocator
 */
function pool(alloc, slice, size) {
    var SIZE   = size || 8192;
    var MAX    = SIZE >>> 1;
    var slab   = null;
    var offset = SIZE;
    return function pool_alloc(size) {
        if (size < 1 || size > MAX)
            return alloc(size);
        if (offset + size > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size);
        if (offset & 7) // align to 32 bit
            offset = (offset | 7) + 1;
        return buf;
    };
}

},{}],10:[function(require,module,exports){
"use strict";

/**
 * A minimal UTF8 implementation for number arrays.
 * @memberof util
 * @namespace
 */
var utf8 = exports;

/**
 * Calculates the UTF8 byte length of a string.
 * @param {string} string String
 * @returns {number} Byte length
 */
utf8.length = function utf8_length(string) {
    var len = 0,
        c = 0;
    for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
            len += 1;
        else if (c < 2048)
            len += 2;
        else if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
            ++i;
            len += 4;
        } else
            len += 3;
    }
    return len;
};

/**
 * Reads UTF8 bytes as a string.
 * @param {Uint8Array} buffer Source buffer
 * @param {number} start Source start
 * @param {number} end Source end
 * @returns {string} String read
 */
utf8.read = function utf8_read(buffer, start, end) {
    var len = end - start;
    if (len < 1)
        return "";
    var parts = null,
        chunk = [],
        i = 0, // char offset
        t;     // temporary
    while (start < end) {
        t = buffer[start++];
        if (t < 128)
            chunk[i++] = t;
        else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
            chunk[i++] = 0xD800 + (t >> 10);
            chunk[i++] = 0xDC00 + (t & 1023);
        } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
        }
    }
    if (parts) {
        if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
    }
    return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
 * Writes a string as UTF8 bytes.
 * @param {string} string Source string
 * @param {Uint8Array} buffer Destination buffer
 * @param {number} offset Destination offset
 * @returns {number} Bytes written
 */
utf8.write = function utf8_write(string, buffer, offset) {
    var start = offset,
        c1, // character 1
        c2; // character 2
    for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6       | 192;
            buffer[offset++] = c1       & 63 | 128;
        } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
            c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
            ++i;
            buffer[offset++] = c1 >> 18      | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12      | 224;
            buffer[offset++] = c1 >> 6  & 63 | 128;
            buffer[offset++] = c1       & 63 | 128;
        }
    }
    return offset - start;
};

},{}],11:[function(require,module,exports){
"use strict";
module.exports = common;

var commonRe = /\/|\./;

/**
 * Provides common type definitions.
 * Can also be used to provide additional google types or your own custom types.
 * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
 * @param {Object.<string,*>} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
 * @returns {undefined}
 * @property {INamespace} google/protobuf/any.proto Any
 * @property {INamespace} google/protobuf/duration.proto Duration
 * @property {INamespace} google/protobuf/empty.proto Empty
 * @property {INamespace} google/protobuf/field_mask.proto FieldMask
 * @property {INamespace} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
 * @property {INamespace} google/protobuf/timestamp.proto Timestamp
 * @property {INamespace} google/protobuf/wrappers.proto Wrappers
 * @example
 * // manually provides descriptor.proto (assumes google/protobuf/ namespace and .proto extension)
 * protobuf.common("descriptor", descriptorJson);
 *
 * // manually provides a custom definition (uses my.foo namespace)
 * protobuf.common("my/foo/bar.proto", myFooBarJson);
 */
function common(name, json) {
    if (!commonRe.test(name)) {
        name = "google/protobuf/" + name + ".proto";
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
    }
    common[name] = json;
}

// Not provided because of limited use (feel free to discuss or to provide yourself):
//
// google/protobuf/descriptor.proto
// google/protobuf/source_context.proto
// google/protobuf/type.proto
//
// Stripped and pre-parsed versions of these non-bundled files are instead available as part of
// the repository or package within the google/protobuf directory.

common("any", {

    /**
     * Properties of a google.protobuf.Any message.
     * @interface IAny
     * @type {Object}
     * @property {string} [typeUrl]
     * @property {Uint8Array} [bytes]
     * @memberof common
     */
    Any: {
        fields: {
            type_url: {
                type: "string",
                id: 1
            },
            value: {
                type: "bytes",
                id: 2
            }
        }
    }
});

var timeType;

common("duration", {

    /**
     * Properties of a google.protobuf.Duration message.
     * @interface IDuration
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */
    Duration: timeType = {
        fields: {
            seconds: {
                type: "int64",
                id: 1
            },
            nanos: {
                type: "int32",
                id: 2
            }
        }
    }
});

common("timestamp", {

    /**
     * Properties of a google.protobuf.Timestamp message.
     * @interface ITimestamp
     * @type {Object}
     * @property {number|Long} [seconds]
     * @property {number} [nanos]
     * @memberof common
     */
    Timestamp: timeType
});

common("empty", {

    /**
     * Properties of a google.protobuf.Empty message.
     * @interface IEmpty
     * @memberof common
     */
    Empty: {
        fields: {}
    }
});

common("struct", {

    /**
     * Properties of a google.protobuf.Struct message.
     * @interface IStruct
     * @type {Object}
     * @property {Object.<string,IValue>} [fields]
     * @memberof common
     */
    Struct: {
        fields: {
            fields: {
                keyType: "string",
                type: "Value",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Value message.
     * @interface IValue
     * @type {Object}
     * @property {string} [kind]
     * @property {0} [nullValue]
     * @property {number} [numberValue]
     * @property {string} [stringValue]
     * @property {boolean} [boolValue]
     * @property {IStruct} [structValue]
     * @property {IListValue} [listValue]
     * @memberof common
     */
    Value: {
        oneofs: {
            kind: {
                oneof: [
                    "nullValue",
                    "numberValue",
                    "stringValue",
                    "boolValue",
                    "structValue",
                    "listValue"
                ]
            }
        },
        fields: {
            nullValue: {
                type: "NullValue",
                id: 1
            },
            numberValue: {
                type: "double",
                id: 2
            },
            stringValue: {
                type: "string",
                id: 3
            },
            boolValue: {
                type: "bool",
                id: 4
            },
            structValue: {
                type: "Struct",
                id: 5
            },
            listValue: {
                type: "ListValue",
                id: 6
            }
        }
    },

    NullValue: {
        values: {
            NULL_VALUE: 0
        }
    },

    /**
     * Properties of a google.protobuf.ListValue message.
     * @interface IListValue
     * @type {Object}
     * @property {Array.<IValue>} [values]
     * @memberof common
     */
    ListValue: {
        fields: {
            values: {
                rule: "repeated",
                type: "Value",
                id: 1
            }
        }
    }
});

common("wrappers", {

    /**
     * Properties of a google.protobuf.DoubleValue message.
     * @interface IDoubleValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    DoubleValue: {
        fields: {
            value: {
                type: "double",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.FloatValue message.
     * @interface IFloatValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    FloatValue: {
        fields: {
            value: {
                type: "float",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Int64Value message.
     * @interface IInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */
    Int64Value: {
        fields: {
            value: {
                type: "int64",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.UInt64Value message.
     * @interface IUInt64Value
     * @type {Object}
     * @property {number|Long} [value]
     * @memberof common
     */
    UInt64Value: {
        fields: {
            value: {
                type: "uint64",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.Int32Value message.
     * @interface IInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    Int32Value: {
        fields: {
            value: {
                type: "int32",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.UInt32Value message.
     * @interface IUInt32Value
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    UInt32Value: {
        fields: {
            value: {
                type: "uint32",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.BoolValue message.
     * @interface IBoolValue
     * @type {Object}
     * @property {boolean} [value]
     * @memberof common
     */
    BoolValue: {
        fields: {
            value: {
                type: "bool",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.StringValue message.
     * @interface IStringValue
     * @type {Object}
     * @property {string} [value]
     * @memberof common
     */
    StringValue: {
        fields: {
            value: {
                type: "string",
                id: 1
            }
        }
    },

    /**
     * Properties of a google.protobuf.BytesValue message.
     * @interface IBytesValue
     * @type {Object}
     * @property {Uint8Array} [value]
     * @memberof common
     */
    BytesValue: {
        fields: {
            value: {
                type: "bytes",
                id: 1
            }
        }
    }
});

common("field_mask", {

    /**
     * Properties of a google.protobuf.FieldMask message.
     * @interface IDoubleValue
     * @type {Object}
     * @property {number} [value]
     * @memberof common
     */
    FieldMask: {
        fields: {
            paths: {
                rule: "repeated",
                type: "string",
                id: 1
            }
        }
    }
});

/**
 * Gets the root definition of the specified common proto file.
 *
 * Bundled definitions are:
 * - google/protobuf/any.proto
 * - google/protobuf/duration.proto
 * - google/protobuf/empty.proto
 * - google/protobuf/field_mask.proto
 * - google/protobuf/struct.proto
 * - google/protobuf/timestamp.proto
 * - google/protobuf/wrappers.proto
 *
 * @param {string} file Proto file name
 * @returns {INamespace|null} Root definition or `null` if not defined
 */
common.get = function get(file) {
    return common[file] || null;
};

},{}],12:[function(require,module,exports){
"use strict";
/**
 * Runtime message from/to plain object converters.
 * @namespace
 */
var converter = exports;

var Enum = require(15),
    util = require(37);

/**
 * Generates a partial value fromObject conveter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(d%s){", prop);
            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
                if (field.repeated && values[keys[i]] === field.typeDefault) gen
                ("default:");
                gen
                ("case%j:", keys[i])
                ("case %i:", values[keys[i]])
                    ("m%s=%j", prop, values[keys[i]])
                    ("break");
            } gen
            ("}");
        } else gen
            ("if(typeof d%s!==\"object\")", prop)
                ("throw TypeError(%j)", field.fullName + ": object expected")
            ("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
                ("m%s=Number(d%s)", prop, prop); // also catches "NaN", "Infinity"
                break;
            case "uint32":
            case "fixed32": gen
                ("m%s=d%s>>>0", prop, prop);
                break;
            case "int32":
            case "sint32":
            case "sfixed32": gen
                ("m%s=d%s|0", prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(util.Long)")
                    ("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)
                ("else if(typeof d%s===\"string\")", prop)
                    ("m%s=parseInt(d%s,10)", prop, prop)
                ("else if(typeof d%s===\"number\")", prop)
                    ("m%s=d%s", prop, prop)
                ("else if(typeof d%s===\"object\")", prop)
                    ("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
                break;
            case "bytes": gen
                ("if(typeof d%s===\"string\")", prop)
                    ("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)
                ("else if(d%s.length)", prop)
                    ("m%s=d%s", prop, prop);
                break;
            case "string": gen
                ("m%s=String(d%s)", prop, prop);
                break;
            case "bool": gen
                ("m%s=Boolean(d%s)", prop, prop);
                break;
            /* default: gen
                ("m%s=d%s", prop, prop);
                break; */
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a plain object to runtime message converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.fromObject = function fromObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray;
    var gen = util.codegen(["d"], mtype.name + "$fromObject")
    ("if(d instanceof this.ctor)")
        ("return d");
    if (!fields.length) return gen
    ("return new this.ctor");
    gen
    ("var m=new this.ctor");
    for (var i = 0; i < fields.length; ++i) {
        var field  = fields[i].resolve(),
            prop   = util.safeProp(field.name);

        // Map fields
        if (field.map) { gen
    ("if(d%s){", prop)
        ("if(typeof d%s!==\"object\")", prop)
            ("throw TypeError(%j)", field.fullName + ": object expected")
        ("m%s={}", prop)
        ("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[ks[i]]")
        ("}")
    ("}");

        // Repeated fields
        } else if (field.repeated) { gen
    ("if(d%s){", prop)
        ("if(!Array.isArray(d%s))", prop)
            ("throw TypeError(%j)", field.fullName + ": array expected")
        ("m%s=[]", prop)
        ("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(gen, field, /* not sorted */ i, prop + "[i]")
        ("}")
    ("}");

        // Non-repeated fields
        } else {
            if (!(field.resolvedType instanceof Enum)) gen // no need to test for null/undefined if an enum (uses switch)
    ("if(d%s!=null){", prop); // !== undefined && !== null
        genValuePartial_fromObject(gen, field, /* not sorted */ i, prop);
            if (!(field.resolvedType instanceof Enum)) gen
    ("}");
        }
    } return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};

/**
 * Generates a partial value toObject converter.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} prop Property reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genValuePartial_toObject(gen, field, fieldIndex, prop) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) gen
            ("d%s=o.enums===String?types[%i].values[m%s]:m%s", prop, fieldIndex, prop, prop);
        else gen
            ("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
    } else {
        var isUnsigned = false;
        switch (field.type) {
            case "double":
            case "float": gen
            ("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
                break;
            case "uint64":
                isUnsigned = true;
                // eslint-disable-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
            ("if(typeof m%s===\"number\")", prop)
                ("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)
            ("else") // Long-like
                ("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true": "", prop);
                break;
            case "bytes": gen
            ("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
                break;
            default: gen
            ("d%s=m%s", prop, prop);
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}

/**
 * Generates a runtime message to plain object converter specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
converter.toObject = function toObject(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
    if (!fields.length)
        return util.codegen()("return {}");
    var gen = util.codegen(["m", "o"], mtype.name + "$toObject")
    ("if(!o)")
        ("o={}")
    ("var d={}");

    var repeatedFields = [],
        mapFields = [],
        normalFields = [],
        i = 0;
    for (; i < fields.length; ++i)
        if (!fields[i].partOf)
            ( fields[i].resolve().repeated ? repeatedFields
            : fields[i].map ? mapFields
            : normalFields).push(fields[i]);

    if (repeatedFields.length) { gen
    ("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i) gen
        ("d%s=[]", util.safeProp(repeatedFields[i].name));
        gen
    ("}");
    }

    if (mapFields.length) { gen
    ("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i) gen
        ("d%s={}", util.safeProp(mapFields[i].name));
        gen
    ("}");
    }

    if (normalFields.length) { gen
    ("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i],
                prop  = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen
        ("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen
        ("if(util.Long){")
            ("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)
            ("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)
        ("}else")
            ("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) {
                var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
                gen
        ("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))
        ("else{")
            ("d%s=%s", prop, arrayDefault)
            ("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)
        ("}");
            } else gen
        ("d%s=%j", prop, field.typeDefault); // also messages (=null)
        } gen
    ("}");
    }
    var hasKs2 = false;
    for (i = 0; i < fields.length; ++i) {
        var field = fields[i],
            index = mtype._fieldsArray.indexOf(field),
            prop  = util.safeProp(field.name);
        if (field.map) {
            if (!hasKs2) { hasKs2 = true; gen
    ("var ks2");
            } gen
    ("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)
        ("d%s={}", prop)
        ("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[ks2[j]]")
        ("}");
        } else if (field.repeated) { gen
    ("if(m%s&&m%s.length){", prop, prop)
        ("d%s=[]", prop)
        ("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(gen, field, /* sorted */ index, prop + "[j]")
        ("}");
        } else { gen
    ("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name); // !== undefined && !== null
        genValuePartial_toObject(gen, field, /* sorted */ index, prop);
        if (field.partOf) gen
        ("if(o.oneofs)")
            ("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen
    ("}");
    }
    return gen
    ("return d");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
};

},{"15":15,"37":37}],13:[function(require,module,exports){
"use strict";
module.exports = decoder;

var Enum    = require(15),
    types   = require(36),
    util    = require(37);

function missing(field) {
    return "missing required '" + field.name + "'";
}

/**
 * Generates a decoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function decoder(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen(["r", "l"], mtype.name + "$decode")
    ("if(!(r instanceof Reader))")
        ("r=Reader.create(r)")
    ("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field) { return field.map; }).length ? ",k" : ""))
    ("while(r.pos<c){")
        ("var t=r.uint32()");
    if (mtype.group) gen
        ("if((t&7)===4)")
            ("break");
    gen
        ("switch(t>>>3){");

    var i = 0;
    for (; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            type  = field.resolvedType instanceof Enum ? "int32" : field.type,
            ref   = "m" + util.safeProp(field.name); gen
            ("case %i:", field.id);

        // Map fields
        if (field.map) { gen
                ("r.skip().pos++") // assumes id 1 + key wireType
                ("if(%s===util.emptyObject)", ref)
                    ("%s={}", ref)
                ("k=r.%s()", field.keyType)
                ("r.pos++"); // assumes id 2 + value wireType
            if (types.long[field.keyType] !== undefined) {
                if (types.basic[type] === undefined) gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                else gen
                ("%s[typeof k===\"object\"?util.longToHash(k):k]=r.%s()", ref, type);
            } else {
                if (types.basic[type] === undefined) gen
                ("%s[k]=types[%i].decode(r,r.uint32())", ref, i); // can't be groups
                else gen
                ("%s[k]=r.%s()", ref, type);
            }

        // Repeated fields
        } else if (field.repeated) { gen

                ("if(!(%s&&%s.length))", ref, ref)
                    ("%s=[]", ref);

            // Packable (always check for forward and backward compatiblity)
            if (types.packed[type] !== undefined) gen
                ("if((t&7)===2){")
                    ("var c2=r.uint32()+r.pos")
                    ("while(r.pos<c2)")
                        ("%s.push(r.%s())", ref, type)
                ("}else");

            // Non-packed
            if (types.basic[type] === undefined) gen(field.resolvedType.group
                    ? "%s.push(types[%i].decode(r))"
                    : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
            else gen
                    ("%s.push(r.%s())", ref, type);

        // Non-repeated
        } else if (types.basic[type] === undefined) gen(field.resolvedType.group
                ? "%s=types[%i].decode(r)"
                : "%s=types[%i].decode(r,r.uint32())", ref, i);
        else gen
                ("%s=r.%s()", ref, type);
        gen
                ("break");
    // Unknown fields
    } gen
            ("default:")
                ("r.skipType(t&7)")
                ("break")

        ("}")
    ("}");

    // Field presence
    for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required) gen
    ("if(!m.hasOwnProperty(%j))", rfield.name)
        ("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
    }

    return gen
    ("return m");
    /* eslint-enable no-unexpected-multiline */
}

},{"15":15,"36":36,"37":37}],14:[function(require,module,exports){
"use strict";
module.exports = encoder;

var Enum     = require(15),
    types    = require(36),
    util     = require(37);

/**
 * Generates a partial message type encoder.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genTypePartial(gen, field, fieldIndex, ref) {
    return field.resolvedType.group
        ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0)
        : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
}

/**
 * Generates an encoder specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function encoder(mtype) {
    /* eslint-disable no-unexpected-multiline, block-scoped-var, no-redeclare */
    var gen = util.codegen(["m", "w"], mtype.name + "$encode")
    ("if(!w)")
        ("w=Writer.create()");

    var i, ref;

    // "when a message is serialized its known fields should be written sequentially by field number"
    var fields = /* initializes */ mtype.fieldsArray.slice().sort(util.compareFieldsById);

    for (var i = 0; i < fields.length; ++i) {
        var field    = fields[i].resolve(),
            index    = mtype._fieldsArray.indexOf(field),
            type     = field.resolvedType instanceof Enum ? "int32" : field.type,
            wireType = types.basic[type];
            ref      = "m" + util.safeProp(field.name);

        // Map fields
        if (field.map) {
            gen
    ("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name) // !== undefined && !== null
        ("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)
            ("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === undefined) gen
            ("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref); // can't be groups
            else gen
            (".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen
        ("}")
    ("}");

            // Repeated fields
        } else if (field.repeated) { gen
    ("if(%s!=null&&%s.length){", ref, ref); // !== undefined && !== null

            // Packed repeated
            if (field.packed && types.packed[type] !== undefined) { gen

        ("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)
        ("for(var i=0;i<%s.length;++i)", ref)
            ("w.%s(%s[i])", type, ref)
        ("w.ldelim()");

            // Non-packed
            } else { gen

        ("for(var i=0;i<%s.length;++i)", ref);
                if (wireType === undefined)
            genTypePartial(gen, field, index, ref + "[i]");
                else gen
            ("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);

            } gen
    ("}");

        // Non-repeated
        } else {
            if (field.optional) gen
    ("if(%s!=null&&m.hasOwnProperty(%j))", ref, field.name); // !== undefined && !== null

            if (wireType === undefined)
        genTypePartial(gen, field, index, ref);
            else gen
        ("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);

        }
    }

    return gen
    ("return w");
    /* eslint-enable no-unexpected-multiline, block-scoped-var, no-redeclare */
}
},{"15":15,"36":36,"37":37}],15:[function(require,module,exports){
"use strict";
module.exports = Enum;

// extends ReflectionObject
var ReflectionObject = require(24);
((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";

var Namespace = require(23),
    util = require(37);

/**
 * Constructs a new enum instance.
 * @classdesc Reflected enum.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {Object.<string,number>} [values] Enum values as an object, by name
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] The comment for this enum
 * @param {Object.<string,string>} [comments] The value comments for this enum
 */
function Enum(name, values, options, comment, comments) {
    ReflectionObject.call(this, name, options);

    if (values && typeof values !== "object")
        throw TypeError("values must be an object");

    /**
     * Enum values by id.
     * @type {Object.<number,string>}
     */
    this.valuesById = {};

    /**
     * Enum values by name.
     * @type {Object.<string,number>}
     */
    this.values = Object.create(this.valuesById); // toJSON, marker

    /**
     * Enum comment text.
     * @type {string|null}
     */
    this.comment = comment;

    /**
     * Value comment texts, if any.
     * @type {Object.<string,string>}
     */
    this.comments = comments || {};

    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */
    this.reserved = undefined; // toJSON

    // Note that values inherit valuesById on their prototype which makes them a TypeScript-
    // compatible enum. This is used by pbts to write actual enum definitions that work for
    // static and reflection code alike instead of emitting generic object definitions.

    if (values)
        for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
            if (typeof values[keys[i]] === "number") // use forward entries only
                this.valuesById[ this.values[keys[i]] = values[keys[i]] ] = keys[i];
}

/**
 * Enum descriptor.
 * @interface IEnum
 * @property {Object.<string,number>} values Enum values
 * @property {Object.<string,*>} [options] Enum options
 */

/**
 * Constructs an enum from an enum descriptor.
 * @param {string} name Enum name
 * @param {IEnum} json Enum descriptor
 * @returns {Enum} Created enum
 * @throws {TypeError} If arguments are invalid
 */
Enum.fromJSON = function fromJSON(name, json) {
    var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
    enm.reserved = json.reserved;
    return enm;
};

/**
 * Converts this enum to an enum descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IEnum} Enum descriptor
 */
Enum.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options"  , this.options,
        "values"   , this.values,
        "reserved" , this.reserved && this.reserved.length ? this.reserved : undefined,
        "comment"  , keepComments ? this.comment : undefined,
        "comments" , keepComments ? this.comments : undefined
    ]);
};

/**
 * Adds a value to this enum.
 * @param {string} name Value name
 * @param {number} id Value id
 * @param {string} [comment] Comment, if any
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a value with this name or id
 */
Enum.prototype.add = function add(name, id, comment) {
    // utilized by the parser but not by .fromJSON

    if (!util.isString(name))
        throw TypeError("name must be a string");

    if (!util.isInteger(id))
        throw TypeError("id must be an integer");

    if (this.values[name] !== undefined)
        throw Error("duplicate name '" + name + "' in " + this);

    if (this.isReservedId(id))
        throw Error("id " + id + " is reserved in " + this);

    if (this.isReservedName(name))
        throw Error("name '" + name + "' is reserved in " + this);

    if (this.valuesById[id] !== undefined) {
        if (!(this.options && this.options.allow_alias))
            throw Error("duplicate id " + id + " in " + this);
        this.values[name] = id;
    } else
        this.valuesById[this.values[name] = id] = name;

    this.comments[name] = comment || null;
    return this;
};

/**
 * Removes a value from this enum
 * @param {string} name Value name
 * @returns {Enum} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `name` is not a name of this enum
 */
Enum.prototype.remove = function remove(name) {

    if (!util.isString(name))
        throw TypeError("name must be a string");

    var val = this.values[name];
    if (val == null)
        throw Error("name '" + name + "' does not exist in " + this);

    delete this.valuesById[val];
    delete this.values[name];
    delete this.comments[name];

    return this;
};

/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Enum.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
};

/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Enum.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
};

},{"23":23,"24":24,"37":37}],16:[function(require,module,exports){
"use strict";
module.exports = Field;

// extends ReflectionObject
var ReflectionObject = require(24);
((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";

var Enum  = require(15),
    types = require(36),
    util  = require(37);

var Type; // cyclic

var ruleRe = /^required|optional|repeated$/;

/**
 * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
 * @name Field
 * @classdesc Reflected message field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 */

/**
 * Constructs a field from a field descriptor.
 * @param {string} name Field name
 * @param {IField} json Field descriptor
 * @returns {Field} Created field
 * @throws {TypeError} If arguments are invalid
 */
Field.fromJSON = function fromJSON(name, json) {
    return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
};

/**
 * Not an actual constructor. Use {@link Field} instead.
 * @classdesc Base class of all reflected message fields. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports FieldBase
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} type Value type
 * @param {string|Object.<string,*>} [rule="optional"] Field rule
 * @param {string|Object.<string,*>} [extend] Extended type if different from parent
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */
function Field(name, id, type, rule, extend, options, comment) {

    if (util.isObject(rule)) {
        comment = extend;
        options = rule;
        rule = extend = undefined;
    } else if (util.isObject(extend)) {
        comment = options;
        options = extend;
        extend = undefined;
    }

    ReflectionObject.call(this, name, options);

    if (!util.isInteger(id) || id < 0)
        throw TypeError("id must be a non-negative integer");

    if (!util.isString(type))
        throw TypeError("type must be a string");

    if (rule !== undefined && !ruleRe.test(rule = rule.toString().toLowerCase()))
        throw TypeError("rule must be a string rule");

    if (extend !== undefined && !util.isString(extend))
        throw TypeError("extend must be a string");

    /**
     * Field rule, if any.
     * @type {string|undefined}
     */
    this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON

    /**
     * Field type.
     * @type {string}
     */
    this.type = type; // toJSON

    /**
     * Unique field id.
     * @type {number}
     */
    this.id = id; // toJSON, marker

    /**
     * Extended type if different from parent.
     * @type {string|undefined}
     */
    this.extend = extend || undefined; // toJSON

    /**
     * Whether this field is required.
     * @type {boolean}
     */
    this.required = rule === "required";

    /**
     * Whether this field is optional.
     * @type {boolean}
     */
    this.optional = !this.required;

    /**
     * Whether this field is repeated.
     * @type {boolean}
     */
    this.repeated = rule === "repeated";

    /**
     * Whether this field is a map or not.
     * @type {boolean}
     */
    this.map = false;

    /**
     * Message this field belongs to.
     * @type {Type|null}
     */
    this.message = null;

    /**
     * OneOf this field belongs to, if any,
     * @type {OneOf|null}
     */
    this.partOf = null;

    /**
     * The field type's default value.
     * @type {*}
     */
    this.typeDefault = null;

    /**
     * The field's default value on prototypes.
     * @type {*}
     */
    this.defaultValue = null;

    /**
     * Whether this field's value should be treated as a long.
     * @type {boolean}
     */
    this.long = util.Long ? types.long[type] !== undefined : /* istanbul ignore next */ false;

    /**
     * Whether this field's value is a buffer.
     * @type {boolean}
     */
    this.bytes = type === "bytes";

    /**
     * Resolved type if not a basic type.
     * @type {Type|Enum|null}
     */
    this.resolvedType = null;

    /**
     * Sister-field within the extended type if a declaring extension field.
     * @type {Field|null}
     */
    this.extensionField = null;

    /**
     * Sister-field within the declaring namespace if an extended field.
     * @type {Field|null}
     */
    this.declaringField = null;

    /**
     * Internally remembers whether this field is packed.
     * @type {boolean|null}
     * @private
     */
    this._packed = null;

    /**
     * Comment for this field.
     * @type {string|null}
     */
    this.comment = comment;
}

/**
 * Determines whether this field is packed. Only relevant when repeated and working with proto2.
 * @name Field#packed
 * @type {boolean}
 * @readonly
 */
Object.defineProperty(Field.prototype, "packed", {
    get: function() {
        // defaults to packed=true if not explicity set to false
        if (this._packed === null)
            this._packed = this.getOption("packed") !== false;
        return this._packed;
    }
});

/**
 * @override
 */
Field.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (name === "packed") // clear cached before setting
        this._packed = null;
    return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
};

/**
 * Field descriptor.
 * @interface IField
 * @property {string} [rule="optional"] Field rule
 * @property {string} type Field type
 * @property {number} id Field id
 * @property {Object.<string,*>} [options] Field options
 */

/**
 * Extension field descriptor.
 * @interface IExtensionField
 * @extends IField
 * @property {string} extend Extended type
 */

/**
 * Converts this field to a field descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IField} Field descriptor
 */
Field.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "rule"    , this.rule !== "optional" && this.rule || undefined,
        "type"    , this.type,
        "id"      , this.id,
        "extend"  , this.extend,
        "options" , this.options,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * Resolves this field's type references.
 * @returns {Field} `this`
 * @throws {Error} If any reference cannot be resolved
 */
Field.prototype.resolve = function resolve() {

    if (this.resolved)
        return this;

    if ((this.typeDefault = types.defaults[this.type]) === undefined) { // if not a basic type, resolve it
        this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type)
            this.typeDefault = null;
        else // instanceof Enum
            this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]; // first defined
    }

    // use explicitly set default value if present
    if (this.options && this.options["default"] != null) {
        this.typeDefault = this.options["default"];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
            this.typeDefault = this.resolvedType.values[this.typeDefault];
    }

    // remove unnecessary options
    if (this.options) {
        if (this.options.packed === true || this.options.packed !== undefined && this.resolvedType && !(this.resolvedType instanceof Enum))
            delete this.options.packed;
        if (!Object.keys(this.options).length)
            this.options = undefined;
    }

    // convert to internal data type if necesssary
    if (this.long) {
        this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");

        /* istanbul ignore else */
        if (Object.freeze)
            Object.freeze(this.typeDefault); // long instances are meant to be immutable anyway (i.e. use small int cache that even requires it)

    } else if (this.bytes && typeof this.typeDefault === "string") {
        var buf;
        if (util.base64.test(this.typeDefault))
            util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
        else
            util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
        this.typeDefault = buf;
    }

    // take special care of maps and repeated fields
    if (this.map)
        this.defaultValue = util.emptyObject;
    else if (this.repeated)
        this.defaultValue = util.emptyArray;
    else
        this.defaultValue = this.typeDefault;

    // ensure proper value on prototype
    if (this.parent instanceof Type)
        this.parent.ctor.prototype[this.name] = this.defaultValue;

    return ReflectionObject.prototype.resolve.call(this);
};

/**
 * Decorator function as returned by {@link Field.d} and {@link MapField.d} (TypeScript).
 * @typedef FieldDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} fieldName Field name
 * @returns {undefined}
 */

/**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"string"|"bool"|"bytes"|Object} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @param {T} [defaultValue] Default value
 * @returns {FieldDecorator} Decorator function
 * @template T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[]
 */
Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {

    // submessage: decorate the submessage and use its name as the type
    if (typeof fieldType === "function")
        fieldType = util.decorateType(fieldType).name;

    // enum reference: create a reflected copy of the enum and keep reuseing it
    else if (fieldType && typeof fieldType === "object")
        fieldType = util.decorateEnum(fieldType).name;

    return function fieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor)
            .add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
    };
};

/**
 * Field decorator (TypeScript).
 * @name Field.d
 * @function
 * @param {number} fieldId Field id
 * @param {Constructor<T>|string} fieldType Field type
 * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
 * @returns {FieldDecorator} Decorator function
 * @template T extends Message<T>
 * @variation 2
 */
// like Field.d but without a default value

// Sets up cyclic dependencies (called in index-light)
Field._configure = function configure(Type_) {
    Type = Type_;
};

},{"15":15,"24":24,"36":36,"37":37}],17:[function(require,module,exports){
"use strict";
var protobuf = module.exports = require(18);

protobuf.build = "light";

/**
 * A node-style callback as used by {@link load} and {@link Root#load}.
 * @typedef LoadCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Root} [root] Root, if there hasn't been an error
 * @returns {undefined}
 */

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} root Root namespace, defaults to create a new one if omitted.
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 */
function load(filename, root, callback) {
    if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
    } else if (!root)
        root = new protobuf.Root();
    return root.load(filename, callback);
}

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and calls the callback.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @see {@link Root#load}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into a common root namespace and returns a promise.
 * @name load
 * @function
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Promise<Root>} Promise
 * @see {@link Root#load}
 * @variation 3
 */
// function load(filename:string, [root:Root]):Promise<Root>

protobuf.load = load;

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into a common root namespace (node only).
 * @param {string|string[]} filename One or multiple files to load
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 * @see {@link Root#loadSync}
 */
function loadSync(filename, root) {
    if (!root)
        root = new protobuf.Root();
    return root.loadSync(filename);
}

protobuf.loadSync = loadSync;

// Serialization
protobuf.encoder          = require(14);
protobuf.decoder          = require(13);
protobuf.verifier         = require(40);
protobuf.converter        = require(12);

// Reflection
protobuf.ReflectionObject = require(24);
protobuf.Namespace        = require(23);
protobuf.Root             = require(29);
protobuf.Enum             = require(15);
protobuf.Type             = require(35);
protobuf.Field            = require(16);
protobuf.OneOf            = require(25);
protobuf.MapField         = require(20);
protobuf.Service          = require(33);
protobuf.Method           = require(22);

// Runtime
protobuf.Message          = require(21);
protobuf.wrappers         = require(41);

// Utility
protobuf.types            = require(36);
protobuf.util             = require(37);

// Set up possibly cyclic reflection dependencies
protobuf.ReflectionObject._configure(protobuf.Root);
protobuf.Namespace._configure(protobuf.Type, protobuf.Service, protobuf.Enum);
protobuf.Root._configure(protobuf.Type);
protobuf.Field._configure(protobuf.Type);

},{"12":12,"13":13,"14":14,"15":15,"16":16,"18":18,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"29":29,"33":33,"35":35,"36":36,"37":37,"40":40,"41":41}],18:[function(require,module,exports){
"use strict";
var protobuf = exports;

/**
 * Build type, one of `"full"`, `"light"` or `"minimal"`.
 * @name build
 * @type {string}
 * @const
 */
protobuf.build = "minimal";

// Serialization
protobuf.Writer       = require(42);
protobuf.BufferWriter = require(43);
protobuf.Reader       = require(27);
protobuf.BufferReader = require(28);

// Utility
protobuf.util         = require(39);
protobuf.rpc          = require(31);
protobuf.roots        = require(30);
protobuf.configure    = configure;

/* istanbul ignore next */
/**
 * Reconfigures the library according to the environment.
 * @returns {undefined}
 */
function configure() {
    protobuf.Reader._configure(protobuf.BufferReader);
    protobuf.util._configure();
}

// Set up buffer utility according to the environment
protobuf.Writer._configure(protobuf.BufferWriter);
configure();

},{"27":27,"28":28,"30":30,"31":31,"39":39,"42":42,"43":43}],19:[function(require,module,exports){
"use strict";
var protobuf = module.exports = require(17);

protobuf.build = "full";

// Parser
protobuf.tokenize         = require(34);
protobuf.parse            = require(26);
protobuf.common           = require(11);

// Configure parser
protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);

},{"11":11,"17":17,"26":26,"34":34}],20:[function(require,module,exports){
"use strict";
module.exports = MapField;

// extends Field
var Field = require(16);
((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";

var types   = require(36),
    util    = require(37);

/**
 * Constructs a new map field instance.
 * @classdesc Reflected map field.
 * @extends FieldBase
 * @constructor
 * @param {string} name Unique name within its namespace
 * @param {number} id Unique id within its namespace
 * @param {string} keyType Key type
 * @param {string} type Value type
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */
function MapField(name, id, keyType, type, options, comment) {
    Field.call(this, name, id, type, undefined, undefined, options, comment);

    /* istanbul ignore if */
    if (!util.isString(keyType))
        throw TypeError("keyType must be a string");

    /**
     * Key type.
     * @type {string}
     */
    this.keyType = keyType; // toJSON, marker

    /**
     * Resolved key type if not a basic type.
     * @type {ReflectionObject|null}
     */
    this.resolvedKeyType = null;

    // Overrides Field#map
    this.map = true;
}

/**
 * Map field descriptor.
 * @interface IMapField
 * @extends {IField}
 * @property {string} keyType Key type
 */

/**
 * Extension map field descriptor.
 * @interface IExtensionMapField
 * @extends IMapField
 * @property {string} extend Extended type
 */

/**
 * Constructs a map field from a map field descriptor.
 * @param {string} name Field name
 * @param {IMapField} json Map field descriptor
 * @returns {MapField} Created map field
 * @throws {TypeError} If arguments are invalid
 */
MapField.fromJSON = function fromJSON(name, json) {
    return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
};

/**
 * Converts this map field to a map field descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IMapField} Map field descriptor
 */
MapField.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "keyType" , this.keyType,
        "type"    , this.type,
        "id"      , this.id,
        "extend"  , this.extend,
        "options" , this.options,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * @override
 */
MapField.prototype.resolve = function resolve() {
    if (this.resolved)
        return this;

    // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"
    if (types.mapKey[this.keyType] === undefined)
        throw Error("invalid key type: " + this.keyType);

    return Field.prototype.resolve.call(this);
};

/**
 * Map field decorator (TypeScript).
 * @name MapField.d
 * @function
 * @param {number} fieldId Field id
 * @param {"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"} fieldKeyType Field key type
 * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"|"bytes"|Object|Constructor<{}>} fieldValueType Field value type
 * @returns {FieldDecorator} Decorator function
 * @template T extends { [key: string]: number | Long | string | boolean | Uint8Array | Buffer | number[] | Message<{}> }
 */
MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {

    // submessage value: decorate the submessage and use its name as the type
    if (typeof fieldValueType === "function")
        fieldValueType = util.decorateType(fieldValueType).name;

    // enum reference value: create a reflected copy of the enum and keep reuseing it
    else if (fieldValueType && typeof fieldValueType === "object")
        fieldValueType = util.decorateEnum(fieldValueType).name;

    return function mapFieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor)
            .add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
    };
};

},{"16":16,"36":36,"37":37}],21:[function(require,module,exports){
"use strict";
module.exports = Message;

var util = require(39);

/**
 * Constructs a new message instance.
 * @classdesc Abstract runtime message.
 * @constructor
 * @param {Properties<T>} [properties] Properties to set
 * @template T extends object = object
 */
function Message(properties) {
    // not used internally
    if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            this[keys[i]] = properties[keys[i]];
}

/**
 * Reference to the reflected type.
 * @name Message.$type
 * @type {Type}
 * @readonly
 */

/**
 * Reference to the reflected type.
 * @name Message#$type
 * @type {Type}
 * @readonly
 */

/*eslint-disable valid-jsdoc*/

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<T>} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.create = function create(properties) {
    return this.$type.create(properties);
};

/**
 * Encodes a message of this type.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.encode = function encode(message, writer) {
    return this.$type.encode(message, writer);
};

/**
 * Encodes a message of this type preceeded by its length as a varint.
 * @param {T|Object.<string,*>} message Message to encode
 * @param {Writer} [writer] Writer to use
 * @returns {Writer} Writer
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.encodeDelimited = function encodeDelimited(message, writer) {
    return this.$type.encodeDelimited(message, writer);
};

/**
 * Decodes a message of this type.
 * @name Message.decode
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.decode = function decode(reader) {
    return this.$type.decode(reader);
};

/**
 * Decodes a message of this type preceeded by its length as a varint.
 * @name Message.decodeDelimited
 * @function
 * @param {Reader|Uint8Array} reader Reader or buffer to decode
 * @returns {T} Decoded message
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.decodeDelimited = function decodeDelimited(reader) {
    return this.$type.decodeDelimited(reader);
};

/**
 * Verifies a message of this type.
 * @name Message.verify
 * @function
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {string|null} `null` if valid, otherwise the reason why it is not
 */
Message.verify = function verify(message) {
    return this.$type.verify(message);
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object
 * @returns {T} Message instance
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.fromObject = function fromObject(object) {
    return this.$type.fromObject(object);
};

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {T} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @template T extends Message<T>
 * @this Constructor<T>
 */
Message.toObject = function toObject(message, options) {
    return this.$type.toObject(message, options);
};

/**
 * Converts this message to JSON.
 * @returns {Object.<string,*>} JSON object
 */
Message.prototype.toJSON = function toJSON() {
    return this.$type.toObject(this, util.toJSONOptions);
};

/*eslint-enable valid-jsdoc*/
},{"39":39}],22:[function(require,module,exports){
"use strict";
module.exports = Method;

// extends ReflectionObject
var ReflectionObject = require(24);
((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";

var util = require(37);

/**
 * Constructs a new service method instance.
 * @classdesc Reflected service method.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Method name
 * @param {string|undefined} type Method type, usually `"rpc"`
 * @param {string} requestType Request message type
 * @param {string} responseType Response message type
 * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
 * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] The comment for this method
 */
function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment) {

    /* istanbul ignore next */
    if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = undefined;
    } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = undefined;
    }

    /* istanbul ignore if */
    if (!(type === undefined || util.isString(type)))
        throw TypeError("type must be a string");

    /* istanbul ignore if */
    if (!util.isString(requestType))
        throw TypeError("requestType must be a string");

    /* istanbul ignore if */
    if (!util.isString(responseType))
        throw TypeError("responseType must be a string");

    ReflectionObject.call(this, name, options);

    /**
     * Method type.
     * @type {string}
     */
    this.type = type || "rpc"; // toJSON

    /**
     * Request type.
     * @type {string}
     */
    this.requestType = requestType; // toJSON, marker

    /**
     * Whether requests are streamed or not.
     * @type {boolean|undefined}
     */
    this.requestStream = requestStream ? true : undefined; // toJSON

    /**
     * Response type.
     * @type {string}
     */
    this.responseType = responseType; // toJSON

    /**
     * Whether responses are streamed or not.
     * @type {boolean|undefined}
     */
    this.responseStream = responseStream ? true : undefined; // toJSON

    /**
     * Resolved request type.
     * @type {Type|null}
     */
    this.resolvedRequestType = null;

    /**
     * Resolved response type.
     * @type {Type|null}
     */
    this.resolvedResponseType = null;

    /**
     * Comment for this method
     * @type {string|null}
     */
    this.comment = comment;
}

/**
 * Method descriptor.
 * @interface IMethod
 * @property {string} [type="rpc"] Method type
 * @property {string} requestType Request type
 * @property {string} responseType Response type
 * @property {boolean} [requestStream=false] Whether requests are streamed
 * @property {boolean} [responseStream=false] Whether responses are streamed
 * @property {Object.<string,*>} [options] Method options
 */

/**
 * Constructs a method from a method descriptor.
 * @param {string} name Method name
 * @param {IMethod} json Method descriptor
 * @returns {Method} Created method
 * @throws {TypeError} If arguments are invalid
 */
Method.fromJSON = function fromJSON(name, json) {
    return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment);
};

/**
 * Converts this method to a method descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IMethod} Method descriptor
 */
Method.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "type"           , this.type !== "rpc" && /* istanbul ignore next */ this.type || undefined,
        "requestType"    , this.requestType,
        "requestStream"  , this.requestStream,
        "responseType"   , this.responseType,
        "responseStream" , this.responseStream,
        "options"        , this.options,
        "comment"        , keepComments ? this.comment : undefined
    ]);
};

/**
 * @override
 */
Method.prototype.resolve = function resolve() {

    /* istanbul ignore if */
    if (this.resolved)
        return this;

    this.resolvedRequestType = this.parent.lookupType(this.requestType);
    this.resolvedResponseType = this.parent.lookupType(this.responseType);

    return ReflectionObject.prototype.resolve.call(this);
};

},{"24":24,"37":37}],23:[function(require,module,exports){
"use strict";
module.exports = Namespace;

// extends ReflectionObject
var ReflectionObject = require(24);
((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";

var Field    = require(16),
    util     = require(37);

var Type,    // cyclic
    Service,
    Enum;

/**
 * Constructs a new namespace instance.
 * @name Namespace
 * @classdesc Reflected namespace.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 */

/**
 * Constructs a namespace from JSON.
 * @memberof Namespace
 * @function
 * @param {string} name Namespace name
 * @param {Object.<string,*>} json JSON object
 * @returns {Namespace} Created namespace
 * @throws {TypeError} If arguments are invalid
 */
Namespace.fromJSON = function fromJSON(name, json) {
    return new Namespace(name, json.options).addJSON(json.nested);
};

/**
 * Converts an array of reflection objects to JSON.
 * @memberof Namespace
 * @param {ReflectionObject[]} array Object array
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
 */
function arrayToJSON(array, toJSONOptions) {
    if (!(array && array.length))
        return undefined;
    var obj = {};
    for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON(toJSONOptions);
    return obj;
}

Namespace.arrayToJSON = arrayToJSON;

/**
 * Tests if the specified id is reserved.
 * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Namespace.isReservedId = function isReservedId(reserved, id) {
    if (reserved)
        for (var i = 0; i < reserved.length; ++i)
            if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] >= id)
                return true;
    return false;
};

/**
 * Tests if the specified name is reserved.
 * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Namespace.isReservedName = function isReservedName(reserved, name) {
    if (reserved)
        for (var i = 0; i < reserved.length; ++i)
            if (reserved[i] === name)
                return true;
    return false;
};

/**
 * Not an actual constructor. Use {@link Namespace} instead.
 * @classdesc Base class of all reflection objects containing nested objects. This is not an actual class but here for the sake of having consistent type definitions.
 * @exports NamespaceBase
 * @extends ReflectionObject
 * @abstract
 * @constructor
 * @param {string} name Namespace name
 * @param {Object.<string,*>} [options] Declared options
 * @see {@link Namespace}
 */
function Namespace(name, options) {
    ReflectionObject.call(this, name, options);

    /**
     * Nested objects by name.
     * @type {Object.<string,ReflectionObject>|undefined}
     */
    this.nested = undefined; // toJSON

    /**
     * Cached nested objects as an array.
     * @type {ReflectionObject[]|null}
     * @private
     */
    this._nestedArray = null;
}

function clearCache(namespace) {
    namespace._nestedArray = null;
    return namespace;
}

/**
 * Nested objects of this namespace as an array for iteration.
 * @name NamespaceBase#nestedArray
 * @type {ReflectionObject[]}
 * @readonly
 */
Object.defineProperty(Namespace.prototype, "nestedArray", {
    get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
    }
});

/**
 * Namespace descriptor.
 * @interface INamespace
 * @property {Object.<string,*>} [options] Namespace options
 * @property {Object.<string,AnyNestedObject>} [nested] Nested object descriptors
 */

/**
 * Any extension field descriptor.
 * @typedef AnyExtensionField
 * @type {IExtensionField|IExtensionMapField}
 */

/**
 * Any nested object descriptor.
 * @typedef AnyNestedObject
 * @type {IEnum|IType|IService|AnyExtensionField|INamespace}
 */
// ^ BEWARE: VSCode hangs forever when using more than 5 types (that's why AnyExtensionField exists in the first place)

/**
 * Converts this namespace to a namespace descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {INamespace} Namespace descriptor
 */
Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
    return util.toObject([
        "options" , this.options,
        "nested"  , arrayToJSON(this.nestedArray, toJSONOptions)
    ]);
};

/**
 * Adds nested objects to this namespace from nested object descriptors.
 * @param {Object.<string,AnyNestedObject>} nestedJson Any nested object descriptors
 * @returns {Namespace} `this`
 */
Namespace.prototype.addJSON = function addJSON(nestedJson) {
    var ns = this;
    /* istanbul ignore else */
    if (nestedJson) {
        for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
            nested = nestedJson[names[i]];
            ns.add( // most to least likely
                ( nested.fields !== undefined
                ? Type.fromJSON
                : nested.values !== undefined
                ? Enum.fromJSON
                : nested.methods !== undefined
                ? Service.fromJSON
                : nested.id !== undefined
                ? Field.fromJSON
                : Namespace.fromJSON )(names[i], nested)
            );
        }
    }
    return this;
};

/**
 * Gets the nested object of the specified name.
 * @param {string} name Nested object name
 * @returns {ReflectionObject|null} The reflection object or `null` if it doesn't exist
 */
Namespace.prototype.get = function get(name) {
    return this.nested && this.nested[name]
        || null;
};

/**
 * Gets the values of the nested {@link Enum|enum} of the specified name.
 * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
 * @param {string} name Nested enum name
 * @returns {Object.<string,number>} Enum values
 * @throws {Error} If there is no such enum
 */
Namespace.prototype.getEnum = function getEnum(name) {
    if (this.nested && this.nested[name] instanceof Enum)
        return this.nested[name].values;
    throw Error("no such enum: " + name);
};

/**
 * Adds a nested object to this namespace.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name
 */
Namespace.prototype.add = function add(object) {

    if (!(object instanceof Field && object.extend !== undefined || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace))
        throw TypeError("object must be a valid nested object");

    if (!this.nested)
        this.nested = {};
    else {
        var prev = this.get(object.name);
        if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
                // replace plain namespace but keep existing nested elements and options
                var nested = prev.nestedArray;
                for (var i = 0; i < nested.length; ++i)
                    object.add(nested[i]);
                this.remove(prev);
                if (!this.nested)
                    this.nested = {};
                object.setOptions(prev.options, true);

            } else
                throw Error("duplicate name '" + object.name + "' in " + this);
        }
    }
    this.nested[object.name] = object;
    object.onAdd(this);
    return clearCache(this);
};

/**
 * Removes a nested object from this namespace.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Namespace} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this namespace
 */
Namespace.prototype.remove = function remove(object) {

    if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
    if (object.parent !== this)
        throw Error(object + " is not a member of " + this);

    delete this.nested[object.name];
    if (!Object.keys(this.nested).length)
        this.nested = undefined;

    object.onRemove(this);
    return clearCache(this);
};

/**
 * Defines additial namespaces within this one if not yet existing.
 * @param {string|string[]} path Path to create
 * @param {*} [json] Nested types to create from JSON
 * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
 */
Namespace.prototype.define = function define(path, json) {

    if (util.isString(path))
        path = path.split(".");
    else if (!Array.isArray(path))
        throw TypeError("illegal path");
    if (path && path.length && path[0] === "")
        throw Error("path must be relative");

    var ptr = this;
    while (path.length > 0) {
        var part = path.shift();
        if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace))
                throw Error("path conflicts with non-namespace objects");
        } else
            ptr.add(ptr = new Namespace(part));
    }
    if (json)
        ptr.addJSON(json);
    return ptr;
};

/**
 * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree, but comes at a cost.
 * @returns {Namespace} `this`
 */
Namespace.prototype.resolveAll = function resolveAll() {
    var nested = this.nestedArray, i = 0;
    while (i < nested.length)
        if (nested[i] instanceof Namespace)
            nested[i++].resolveAll();
        else
            nested[i++].resolve();
    return this.resolve();
};

/**
 * Recursively looks up the reflection object matching the specified path in the scope of this namespace.
 * @param {string|string[]} path Path to look up
 * @param {*|Array.<*>} filterTypes Filter types, any combination of the constructors of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
 * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 */
Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {

    /* istanbul ignore next */
    if (typeof filterTypes === "boolean") {
        parentAlreadyChecked = filterTypes;
        filterTypes = undefined;
    } else if (filterTypes && !Array.isArray(filterTypes))
        filterTypes = [ filterTypes ];

    if (util.isString(path) && path.length) {
        if (path === ".")
            return this.root;
        path = path.split(".");
    } else if (!path.length)
        return this;

    // Start at root if path is absolute
    if (path[0] === "")
        return this.root.lookup(path.slice(1), filterTypes);

    // Test if the first part matches any nested object, and if so, traverse if path contains more
    var found = this.get(path[0]);
    if (found) {
        if (path.length === 1) {
            if (!filterTypes || filterTypes.indexOf(found.constructor) > -1)
                return found;
        } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true)))
            return found;

    // Otherwise try each nested namespace
    } else
        for (var i = 0; i < this.nestedArray.length; ++i)
            if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true)))
                return found;

    // If there hasn't been a match, try again at the parent
    if (this.parent === null || parentAlreadyChecked)
        return null;
    return this.parent.lookup(path, filterTypes);
};

/**
 * Looks up the reflection object at the specified path, relative to this namespace.
 * @name NamespaceBase#lookup
 * @function
 * @param {string|string[]} path Path to look up
 * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
 * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
 * @variation 2
 */
// lookup(path: string, [parentAlreadyChecked: boolean])

/**
 * Looks up the {@link Type|type} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type
 * @throws {Error} If `path` does not point to a type
 */
Namespace.prototype.lookupType = function lookupType(path) {
    var found = this.lookup(path, [ Type ]);
    if (!found)
        throw Error("no such type: " + path);
    return found;
};

/**
 * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Enum} Looked up enum
 * @throws {Error} If `path` does not point to an enum
 */
Namespace.prototype.lookupEnum = function lookupEnum(path) {
    var found = this.lookup(path, [ Enum ]);
    if (!found)
        throw Error("no such Enum '" + path + "' in " + this);
    return found;
};

/**
 * Looks up the {@link Type|type} or {@link Enum|enum} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type or enum
 * @throws {Error} If `path` does not point to a type or enum
 */
Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
    var found = this.lookup(path, [ Type, Enum ]);
    if (!found)
        throw Error("no such Type or Enum '" + path + "' in " + this);
    return found;
};

/**
 * Looks up the {@link Service|service} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Service} Looked up service
 * @throws {Error} If `path` does not point to a service
 */
Namespace.prototype.lookupService = function lookupService(path) {
    var found = this.lookup(path, [ Service ]);
    if (!found)
        throw Error("no such Service '" + path + "' in " + this);
    return found;
};

// Sets up cyclic dependencies (called in index-light)
Namespace._configure = function(Type_, Service_, Enum_) {
    Type    = Type_;
    Service = Service_;
    Enum    = Enum_;
};

},{"16":16,"24":24,"37":37}],24:[function(require,module,exports){
"use strict";
module.exports = ReflectionObject;

ReflectionObject.className = "ReflectionObject";

var util = require(37);

var Root; // cyclic

/**
 * Constructs a new reflection object instance.
 * @classdesc Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {Object.<string,*>} [options] Declared options
 * @abstract
 */
function ReflectionObject(name, options) {

    if (!util.isString(name))
        throw TypeError("name must be a string");

    if (options && !util.isObject(options))
        throw TypeError("options must be an object");

    /**
     * Options.
     * @type {Object.<string,*>|undefined}
     */
    this.options = options; // toJSON

    /**
     * Unique name within its namespace.
     * @type {string}
     */
    this.name = name;

    /**
     * Parent namespace.
     * @type {Namespace|null}
     */
    this.parent = null;

    /**
     * Whether already resolved or not.
     * @type {boolean}
     */
    this.resolved = false;

    /**
     * Comment text, if any.
     * @type {string|null}
     */
    this.comment = null;

    /**
     * Defining file name.
     * @type {string|null}
     */
    this.filename = null;
}

Object.defineProperties(ReflectionObject.prototype, {

    /**
     * Reference to the root namespace.
     * @name ReflectionObject#root
     * @type {Root}
     * @readonly
     */
    root: {
        get: function() {
            var ptr = this;
            while (ptr.parent !== null)
                ptr = ptr.parent;
            return ptr;
        }
    },

    /**
     * Full name including leading dot.
     * @name ReflectionObject#fullName
     * @type {string}
     * @readonly
     */
    fullName: {
        get: function() {
            var path = [ this.name ],
                ptr = this.parent;
            while (ptr) {
                path.unshift(ptr.name);
                ptr = ptr.parent;
            }
            return path.join(".");
        }
    }
});

/**
 * Converts this reflection object to its descriptor representation.
 * @returns {Object.<string,*>} Descriptor
 * @abstract
 */
ReflectionObject.prototype.toJSON = /* istanbul ignore next */ function toJSON() {
    throw Error(); // not implemented, shouldn't happen
};

/**
 * Called when this object is added to a parent.
 * @param {ReflectionObject} parent Parent added to
 * @returns {undefined}
 */
ReflectionObject.prototype.onAdd = function onAdd(parent) {
    if (this.parent && this.parent !== parent)
        this.parent.remove(this);
    this.parent = parent;
    this.resolved = false;
    var root = parent.root;
    if (root instanceof Root)
        root._handleAdd(this);
};

/**
 * Called when this object is removed from a parent.
 * @param {ReflectionObject} parent Parent removed from
 * @returns {undefined}
 */
ReflectionObject.prototype.onRemove = function onRemove(parent) {
    var root = parent.root;
    if (root instanceof Root)
        root._handleRemove(this);
    this.parent = null;
    this.resolved = false;
};

/**
 * Resolves this objects type references.
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.resolve = function resolve() {
    if (this.resolved)
        return this;
    if (this.root instanceof Root)
        this.resolved = true; // only if part of a root
    return this;
};

/**
 * Gets an option value.
 * @param {string} name Option name
 * @returns {*} Option value or `undefined` if not set
 */
ReflectionObject.prototype.getOption = function getOption(name) {
    if (this.options)
        return this.options[name];
    return undefined;
};

/**
 * Sets an option.
 * @param {string} name Option name
 * @param {*} value Option value
 * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
    if (!ifNotSet || !this.options || this.options[name] === undefined)
        (this.options || (this.options = {}))[name] = value;
    return this;
};

/**
 * Sets multiple options.
 * @param {Object.<string,*>} options Options to set
 * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
 * @returns {ReflectionObject} `this`
 */
ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
    if (options)
        for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
            this.setOption(keys[i], options[keys[i]], ifNotSet);
    return this;
};

/**
 * Converts this instance to its string representation.
 * @returns {string} Class name[, space, full name]
 */
ReflectionObject.prototype.toString = function toString() {
    var className = this.constructor.className,
        fullName  = this.fullName;
    if (fullName.length)
        return className + " " + fullName;
    return className;
};

// Sets up cyclic dependencies (called in index-light)
ReflectionObject._configure = function(Root_) {
    Root = Root_;
};

},{"37":37}],25:[function(require,module,exports){
"use strict";
module.exports = OneOf;

// extends ReflectionObject
var ReflectionObject = require(24);
((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";

var Field = require(16),
    util  = require(37);

/**
 * Constructs a new oneof instance.
 * @classdesc Reflected oneof.
 * @extends ReflectionObject
 * @constructor
 * @param {string} name Oneof name
 * @param {string[]|Object.<string,*>} [fieldNames] Field names
 * @param {Object.<string,*>} [options] Declared options
 * @param {string} [comment] Comment associated with this field
 */
function OneOf(name, fieldNames, options, comment) {
    if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = undefined;
    }
    ReflectionObject.call(this, name, options);

    /* istanbul ignore if */
    if (!(fieldNames === undefined || Array.isArray(fieldNames)))
        throw TypeError("fieldNames must be an Array");

    /**
     * Field names that belong to this oneof.
     * @type {string[]}
     */
    this.oneof = fieldNames || []; // toJSON, marker

    /**
     * Fields that belong to this oneof as an array for iteration.
     * @type {Field[]}
     * @readonly
     */
    this.fieldsArray = []; // declared readonly for conformance, possibly not yet added to parent

    /**
     * Comment for this field.
     * @type {string|null}
     */
    this.comment = comment;
}

/**
 * Oneof descriptor.
 * @interface IOneOf
 * @property {Array.<string>} oneof Oneof field names
 * @property {Object.<string,*>} [options] Oneof options
 */

/**
 * Constructs a oneof from a oneof descriptor.
 * @param {string} name Oneof name
 * @param {IOneOf} json Oneof descriptor
 * @returns {OneOf} Created oneof
 * @throws {TypeError} If arguments are invalid
 */
OneOf.fromJSON = function fromJSON(name, json) {
    return new OneOf(name, json.oneof, json.options, json.comment);
};

/**
 * Converts this oneof to a oneof descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IOneOf} Oneof descriptor
 */
OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options" , this.options,
        "oneof"   , this.oneof,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * Adds the fields of the specified oneof to the parent if not already done so.
 * @param {OneOf} oneof The oneof
 * @returns {undefined}
 * @inner
 * @ignore
 */
function addFieldsToParent(oneof) {
    if (oneof.parent)
        for (var i = 0; i < oneof.fieldsArray.length; ++i)
            if (!oneof.fieldsArray[i].parent)
                oneof.parent.add(oneof.fieldsArray[i]);
}

/**
 * Adds a field to this oneof and removes it from its current parent, if any.
 * @param {Field} field Field to add
 * @returns {OneOf} `this`
 */
OneOf.prototype.add = function add(field) {

    /* istanbul ignore if */
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");

    if (field.parent && field.parent !== this.parent)
        field.parent.remove(field);
    this.oneof.push(field.name);
    this.fieldsArray.push(field);
    field.partOf = this; // field.parent remains null
    addFieldsToParent(this);
    return this;
};

/**
 * Removes a field from this oneof and puts it back to the oneof's parent.
 * @param {Field} field Field to remove
 * @returns {OneOf} `this`
 */
OneOf.prototype.remove = function remove(field) {

    /* istanbul ignore if */
    if (!(field instanceof Field))
        throw TypeError("field must be a Field");

    var index = this.fieldsArray.indexOf(field);

    /* istanbul ignore if */
    if (index < 0)
        throw Error(field + " is not a member of " + this);

    this.fieldsArray.splice(index, 1);
    index = this.oneof.indexOf(field.name);

    /* istanbul ignore else */
    if (index > -1) // theoretical
        this.oneof.splice(index, 1);

    field.partOf = null;
    return this;
};

/**
 * @override
 */
OneOf.prototype.onAdd = function onAdd(parent) {
    ReflectionObject.prototype.onAdd.call(this, parent);
    var self = this;
    // Collect present fields
    for (var i = 0; i < this.oneof.length; ++i) {
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
            field.partOf = self;
            self.fieldsArray.push(field);
        }
    }
    // Add not yet present fields
    addFieldsToParent(this);
};

/**
 * @override
 */
OneOf.prototype.onRemove = function onRemove(parent) {
    for (var i = 0, field; i < this.fieldsArray.length; ++i)
        if ((field = this.fieldsArray[i]).parent)
            field.parent.remove(field);
    ReflectionObject.prototype.onRemove.call(this, parent);
};

/**
 * Decorator function as returned by {@link OneOf.d} (TypeScript).
 * @typedef OneOfDecorator
 * @type {function}
 * @param {Object} prototype Target prototype
 * @param {string} oneofName OneOf name
 * @returns {undefined}
 */

/**
 * OneOf decorator (TypeScript).
 * @function
 * @param {...string} fieldNames Field names
 * @returns {OneOfDecorator} Decorator function
 * @template T extends string
 */
OneOf.d = function decorateOneOf() {
    var fieldNames = new Array(arguments.length),
        index = 0;
    while (index < arguments.length)
        fieldNames[index] = arguments[index++];
    return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor)
            .add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
        });
    };
};

},{"16":16,"24":24,"37":37}],26:[function(require,module,exports){
"use strict";
module.exports = parse;

parse.filename = null;
parse.defaults = { keepCase: false };

var tokenize  = require(34),
    Root      = require(29),
    Type      = require(35),
    Field     = require(16),
    MapField  = require(20),
    OneOf     = require(25),
    Enum      = require(15),
    Service   = require(33),
    Method    = require(22),
    types     = require(36),
    util      = require(37);

var base10Re    = /^[1-9][0-9]*$/,
    base10NegRe = /^-?[1-9][0-9]*$/,
    base16Re    = /^0[x][0-9a-fA-F]+$/,
    base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
    base8Re     = /^0[0-7]+$/,
    base8NegRe  = /^-?0[0-7]+$/,
    numberRe    = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
    nameRe      = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
    typeRefRe   = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/,
    fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;

/**
 * Result object returned from {@link parse}.
 * @interface IParserResult
 * @property {string|undefined} package Package name, if declared
 * @property {string[]|undefined} imports Imports, if any
 * @property {string[]|undefined} weakImports Weak imports, if any
 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
 * @property {Root} root Populated root instance
 */

/**
 * Options modifying the behavior of {@link parse}.
 * @interface IParseOptions
 * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
 * @property {boolean} [alternateCommentMode=false] Recognize double-slash comments in addition to doc-block comments.
 */

/**
 * Options modifying the behavior of JSON serialization.
 * @interface IToJSONOptions
 * @property {boolean} [keepComments=false] Serializes comments.
 */

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @param {string} source Source contents
 * @param {Root} root Root to populate
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 */
function parse(source, root, options) {
    /* eslint-disable callback-return */
    if (!(root instanceof Root)) {
        options = root;
        root = new Root();
    }
    if (!options)
        options = parse.defaults;

    var tn = tokenize(source, options.alternateCommentMode || false),
        next = tn.next,
        push = tn.push,
        peek = tn.peek,
        skip = tn.skip,
        cmnt = tn.cmnt;

    var head = true,
        pkg,
        imports,
        weakImports,
        syntax,
        isProto3 = false;

    var ptr = root;

    var applyCase = options.keepCase ? function(name) { return name; } : util.camelCase;

    /* istanbul ignore next */
    function illegal(token, name, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch)
            parse.filename = null;
        return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
    }

    function readString() {
        var values = [],
            token;
        do {
            /* istanbul ignore if */
            if ((token = next()) !== "\"" && token !== "'")
                throw illegal(token);

            values.push(next());
            skip(token);
            token = peek();
        } while (token === "\"" || token === "'");
        return values.join("");
    }

    function readValue(acceptTypeRef) {
        var token = next();
        switch (token) {
            case "'":
            case "\"":
                push(token);
                return readString();
            case "true": case "TRUE":
                return true;
            case "false": case "FALSE":
                return false;
        }
        try {
            return parseNumber(token, /* insideTryCatch */ true);
        } catch (e) {

            /* istanbul ignore else */
            if (acceptTypeRef && typeRefRe.test(token))
                return token;

            /* istanbul ignore next */
            throw illegal(token, "value");
        }
    }

    function readRanges(target, acceptStrings) {
        var token, start;
        do {
            if (acceptStrings && ((token = peek()) === "\"" || token === "'"))
                target.push(readString());
            else
                target.push([ start = parseId(next()), skip("to", true) ? parseId(next()) : start ]);
        } while (skip(",", true));
        skip(";");
    }

    function parseNumber(token, insideTryCatch) {
        var sign = 1;
        if (token.charAt(0) === "-") {
            sign = -1;
            token = token.substring(1);
        }
        switch (token) {
            case "inf": case "INF": case "Inf":
                return sign * Infinity;
            case "nan": case "NAN": case "Nan": case "NaN":
                return NaN;
            case "0":
                return 0;
        }
        if (base10Re.test(token))
            return sign * parseInt(token, 10);
        if (base16Re.test(token))
            return sign * parseInt(token, 16);
        if (base8Re.test(token))
            return sign * parseInt(token, 8);

        /* istanbul ignore else */
        if (numberRe.test(token))
            return sign * parseFloat(token);

        /* istanbul ignore next */
        throw illegal(token, "number", insideTryCatch);
    }

    function parseId(token, acceptNegative) {
        switch (token) {
            case "max": case "MAX": case "Max":
                return 536870911;
            case "0":
                return 0;
        }

        /* istanbul ignore if */
        if (!acceptNegative && token.charAt(0) === "-")
            throw illegal(token, "id");

        if (base10NegRe.test(token))
            return parseInt(token, 10);
        if (base16NegRe.test(token))
            return parseInt(token, 16);

        /* istanbul ignore else */
        if (base8NegRe.test(token))
            return parseInt(token, 8);

        /* istanbul ignore next */
        throw illegal(token, "id");
    }

    function parsePackage() {

        /* istanbul ignore if */
        if (pkg !== undefined)
            throw illegal("package");

        pkg = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(pkg))
            throw illegal(pkg, "name");

        ptr = ptr.define(pkg);
        skip(";");
    }

    function parseImport() {
        var token = peek();
        var whichImports;
        switch (token) {
            case "weak":
                whichImports = weakImports || (weakImports = []);
                next();
                break;
            case "public":
                next();
                // eslint-disable-line no-fallthrough
            default:
                whichImports = imports || (imports = []);
                break;
        }
        token = readString();
        skip(";");
        whichImports.push(token);
    }

    function parseSyntax() {
        skip("=");
        syntax = readString();
        isProto3 = syntax === "proto3";

        /* istanbul ignore if */
        if (!isProto3 && syntax !== "proto2")
            throw illegal(syntax, "syntax");

        skip(";");
    }

    function parseCommon(parent, token) {
        switch (token) {

            case "option":
                parseOption(parent, token);
                skip(";");
                return true;

            case "message":
                parseType(parent, token);
                return true;

            case "enum":
                parseEnum(parent, token);
                return true;

            case "service":
                parseService(parent, token);
                return true;

            case "extend":
                parseExtension(parent, token);
                return true;
        }
        return false;
    }

    function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
            obj.comment = cmnt(); // try block-type comment
            obj.filename = parse.filename;
        }
        if (skip("{", true)) {
            var token;
            while ((token = next()) !== "}")
                fnIf(token);
            skip(";", true);
        } else {
            if (fnElse)
                fnElse();
            skip(";");
            if (obj && typeof obj.comment !== "string")
                obj.comment = cmnt(trailingLine); // try line-type comment if no block
        }
    }

    function parseType(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "type name");

        var type = new Type(token);
        ifBlock(type, function parseType_block(token) {
            if (parseCommon(type, token))
                return;

            switch (token) {

                case "map":
                    parseMapField(type, token);
                    break;

                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;

                case "oneof":
                    parseOneOf(type, token);
                    break;

                case "extensions":
                    readRanges(type.extensions || (type.extensions = []));
                    break;

                case "reserved":
                    readRanges(type.reserved || (type.reserved = []), true);
                    break;

                default:
                    /* istanbul ignore if */
                    if (!isProto3 || !typeRefRe.test(token))
                        throw illegal(token);

                    push(token);
                    parseField(type, "optional");
                    break;
            }
        });
        parent.add(type);
    }

    function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
            parseGroup(parent, rule);
            return;
        }

        /* istanbul ignore if */
        if (!typeRefRe.test(type))
            throw illegal(type, "type");

        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        name = applyCase(name);
        skip("=");

        var field = new Field(name, parseId(next()), type, rule, extend);
        ifBlock(field, function parseField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal(token);

        }, function parseField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);

        // JSON defaults to packed=true if not set so we have to set packed=false explicity when
        // parsing proto2 descriptors without the option, where applicable. This must be done for
        // all known packable types and anything that could be an enum (= is not a basic type).
        if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined))
            field.setOption("packed", false, /* ifNotSet */ true);
    }

    function parseGroup(parent, rule) {
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        var fieldName = util.lcFirst(name);
        if (name === fieldName)
            name = util.ucFirst(name);
        skip("=");
        var id = parseId(next());
        var type = new Type(name);
        type.group = true;
        var field = new Field(fieldName, id, name, rule);
        field.filename = parse.filename;
        ifBlock(type, function parseGroup_block(token) {
            switch (token) {

                case "option":
                    parseOption(type, token);
                    skip(";");
                    break;

                case "required":
                case "optional":
                case "repeated":
                    parseField(type, token);
                    break;

                /* istanbul ignore next */
                default:
                    throw illegal(token); // there are no groups with proto3 semantics
            }
        });
        parent.add(type)
              .add(field);
    }

    function parseMapField(parent) {
        skip("<");
        var keyType = next();

        /* istanbul ignore if */
        if (types.mapKey[keyType] === undefined)
            throw illegal(keyType, "type");

        skip(",");
        var valueType = next();

        /* istanbul ignore if */
        if (!typeRefRe.test(valueType))
            throw illegal(valueType, "type");

        skip(">");
        var name = next();

        /* istanbul ignore if */
        if (!nameRe.test(name))
            throw illegal(name, "name");

        skip("=");
        var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
        ifBlock(field, function parseMapField_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(field, token);
                skip(";");
            } else
                throw illegal(token);

        }, function parseMapField_line() {
            parseInlineOptions(field);
        });
        parent.add(field);
    }

    function parseOneOf(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var oneof = new OneOf(applyCase(token));
        ifBlock(oneof, function parseOneOf_block(token) {
            if (token === "option") {
                parseOption(oneof, token);
                skip(";");
            } else {
                push(token);
                parseField(oneof, "optional");
            }
        });
        parent.add(oneof);
    }

    function parseEnum(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var enm = new Enum(token);
        ifBlock(enm, function parseEnum_block(token) {
          switch(token) {
            case "option":
              parseOption(enm, token);
              skip(";");
              break;

            case "reserved":
              readRanges(enm.reserved || (enm.reserved = []), true);
              break;

            default:
              parseEnumValue(enm, token);
          }
        });
        parent.add(enm);
    }

    function parseEnumValue(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token))
            throw illegal(token, "name");

        skip("=");
        var value = parseId(next(), true),
            dummy = {};
        ifBlock(dummy, function parseEnumValue_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(dummy, token); // skip
                skip(";");
            } else
                throw illegal(token);

        }, function parseEnumValue_line() {
            parseInlineOptions(dummy); // skip
        });
        parent.add(token, value, dummy.comment);
    }

    function parseOption(parent, token) {
        var isCustom = skip("(", true);

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token, "name");

        var name = token;
        if (isCustom) {
            skip(")");
            name = "(" + name + ")";
            token = peek();
            if (fqTypeRefRe.test(token)) {
                name += token;
                next();
            }
        }
        skip("=");
        parseOptionValue(parent, name);
    }

    function parseOptionValue(parent, name) {
        if (skip("{", true)) { // { a: "foo" b { c: "bar" } }
            do {
                /* istanbul ignore if */
                if (!nameRe.test(token = next()))
                    throw illegal(token, "name");

                if (peek() === "{")
                    parseOptionValue(parent, name + "." + token);
                else {
                    skip(":");
                    if (peek() === "{")
                        parseOptionValue(parent, name + "." + token);
                    else
                        setOption(parent, name + "." + token, readValue(true));
                }
                skip(",", true);
            } while (!skip("}", true));
        } else
            setOption(parent, name, readValue(true));
        // Does not enforce a delimiter to be universal
    }

    function setOption(parent, name, value) {
        if (parent.setOption)
            parent.setOption(name, value);
    }

    function parseInlineOptions(parent) {
        if (skip("[", true)) {
            do {
                parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
        }
        return parent;
    }

    function parseService(parent, token) {

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "service name");

        var service = new Service(token);
        ifBlock(service, function parseService_block(token) {
            if (parseCommon(service, token))
                return;

            /* istanbul ignore else */
            if (token === "rpc")
                parseMethod(service, token);
            else
                throw illegal(token);
        });
        parent.add(service);
    }

    function parseMethod(parent, token) {
        var type = token;

        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
            throw illegal(token, "name");

        var name = token,
            requestType, requestStream,
            responseType, responseStream;

        skip("(");
        if (skip("stream", true))
            requestStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token);

        requestType = token;
        skip(")"); skip("returns"); skip("(");
        if (skip("stream", true))
            responseStream = true;

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token);

        responseType = token;
        skip(")");

        var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
        ifBlock(method, function parseMethod_block(token) {

            /* istanbul ignore else */
            if (token === "option") {
                parseOption(method, token);
                skip(";");
            } else
                throw illegal(token);

        });
        parent.add(method);
    }

    function parseExtension(parent, token) {

        /* istanbul ignore if */
        if (!typeRefRe.test(token = next()))
            throw illegal(token, "reference");

        var reference = token;
        ifBlock(null, function parseExtension_block(token) {
            switch (token) {

                case "required":
                case "repeated":
                case "optional":
                    parseField(parent, token, reference);
                    break;

                default:
                    /* istanbul ignore if */
                    if (!isProto3 || !typeRefRe.test(token))
                        throw illegal(token);
                    push(token);
                    parseField(parent, "optional", reference);
                    break;
            }
        });
    }

    var token;
    while ((token = next()) !== null) {
        switch (token) {

            case "package":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parsePackage();
                break;

            case "import":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseImport();
                break;

            case "syntax":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseSyntax();
                break;

            case "option":

                /* istanbul ignore if */
                if (!head)
                    throw illegal(token);

                parseOption(ptr, token);
                skip(";");
                break;

            default:

                /* istanbul ignore else */
                if (parseCommon(ptr, token)) {
                    head = false;
                    continue;
                }

                /* istanbul ignore next */
                throw illegal(token);
        }
    }

    parse.filename = null;
    return {
        "package"     : pkg,
        "imports"     : imports,
         weakImports  : weakImports,
         syntax       : syntax,
         root         : root
    };
}

/**
 * Parses the given .proto source and returns an object with the parsed contents.
 * @name parse
 * @function
 * @param {string} source Source contents
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {IParserResult} Parser result
 * @property {string} filename=null Currently processing file name for error reporting, if known
 * @property {IParseOptions} defaults Default {@link IParseOptions}
 * @variation 2
 */

},{"15":15,"16":16,"20":20,"22":22,"25":25,"29":29,"33":33,"34":34,"35":35,"36":36,"37":37}],27:[function(require,module,exports){
"use strict";
module.exports = Reader;

var util      = require(39);

var BufferReader; // cyclic

var LongBits  = util.LongBits,
    utf8      = util.utf8;

/* istanbul ignore next */
function indexOutOfRange(reader, writeLength) {
    return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}

/**
 * Constructs a new reader instance using the specified buffer.
 * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 * @param {Uint8Array} buffer Buffer to read from
 */
function Reader(buffer) {

    /**
     * Read buffer.
     * @type {Uint8Array}
     */
    this.buf = buffer;

    /**
     * Read buffer position.
     * @type {number}
     */
    this.pos = 0;

    /**
     * Read buffer length.
     * @type {number}
     */
    this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined"
    ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    }
    /* istanbul ignore next */
    : function create_array(buffer) {
        if (Array.isArray(buffer))
            return new Reader(buffer);
        throw Error("illegal buffer");
    };

/**
 * Creates a new reader using the specified buffer.
 * @function
 * @param {Uint8Array|Buffer} buffer Buffer to read from
 * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
 * @throws {Error} If `buffer` is not a valid buffer
 */
Reader.create = util.Buffer
    ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer) {
            return util.Buffer.isBuffer(buffer)
                ? new BufferReader(buffer)
                /* istanbul ignore next */
                : create_array(buffer);
        })(buffer);
    }
    /* istanbul ignore next */
    : create_array;

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */ util.Array.prototype.slice;

/**
 * Reads a varint as an unsigned 32 bit value.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.uint32 = (function read_uint32_setup() {
    var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
    return function read_uint32() {
        value = (         this.buf[this.pos] & 127       ) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) <<  7) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0; if (this.buf[this.pos++] < 128) return value;
        value = (value | (this.buf[this.pos] &  15) << 28) >>> 0; if (this.buf[this.pos++] < 128) return value;

        /* istanbul ignore if */
        if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
        }
        return value;
    };
})();

/**
 * Reads a varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.int32 = function read_int32() {
    return this.uint32() | 0;
};

/**
 * Reads a zig-zag encoded varint as a signed 32 bit value.
 * @returns {number} Value read
 */
Reader.prototype.sint32 = function read_sint32() {
    var value = this.uint32();
    return value >>> 1 ^ -(value & 1) | 0;
};

/* eslint-disable no-invalid-this */

function readLongVarint() {
    // tends to deopt with local vars for octet etc.
    var bits = new LongBits(0, 0);
    var i = 0;
    if (this.len - this.pos > 4) { // fast route (lo)
        for (; i < 4; ++i) {
            // 1st..4th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 5th
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >>  4) >>> 0;
        if (this.buf[this.pos++] < 128)
            return bits;
        i = 0;
    } else {
        for (; i < 3; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 1st..3th
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
        // 4th
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
    }
    if (this.len - this.pos > 4) { // fast route (hi)
        for (; i < 5; ++i) {
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    } else {
        for (; i < 5; ++i) {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
            // 6th..10th
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
                return bits;
        }
    }
    /* istanbul ignore next */
    throw Error("invalid varint encoding");
}

/* eslint-enable no-invalid-this */

/**
 * Reads a varint as a signed 64 bit value.
 * @name Reader#int64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as an unsigned 64 bit value.
 * @name Reader#uint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a zig-zag encoded varint as a signed 64 bit value.
 * @name Reader#sint64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a varint as a boolean.
 * @returns {boolean} Value read
 */
Reader.prototype.bool = function read_bool() {
    return this.uint32() !== 0;
};

function readFixed32_end(buf, end) { // note that this uses `end`, not `pos`
    return (buf[end - 4]
          | buf[end - 3] << 8
          | buf[end - 2] << 16
          | buf[end - 1] << 24) >>> 0;
}

/**
 * Reads fixed 32 bits as an unsigned 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.fixed32 = function read_fixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4);
};

/**
 * Reads fixed 32 bits as a signed 32 bit integer.
 * @returns {number} Value read
 */
Reader.prototype.sfixed32 = function read_sfixed32() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64(/* this: Reader */) {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);

    return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}

/* eslint-enable no-invalid-this */

/**
 * Reads fixed 64 bits.
 * @name Reader#fixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads zig-zag encoded fixed 64 bits.
 * @name Reader#sfixed64
 * @function
 * @returns {Long} Value read
 */

/**
 * Reads a float (32 bit) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.float = function read_float() {

    /* istanbul ignore if */
    if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readFloatLE(this.buf, this.pos);
    this.pos += 4;
    return value;
};

/**
 * Reads a double (64 bit float) as a number.
 * @function
 * @returns {number} Value read
 */
Reader.prototype.double = function read_double() {

    /* istanbul ignore if */
    if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);

    var value = util.float.readDoubleLE(this.buf, this.pos);
    this.pos += 8;
    return value;
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @returns {Uint8Array} Value read
 */
Reader.prototype.bytes = function read_bytes() {
    var length = this.uint32(),
        start  = this.pos,
        end    = this.pos + length;

    /* istanbul ignore if */
    if (end > this.len)
        throw indexOutOfRange(this, length);

    this.pos += length;
    if (Array.isArray(this.buf)) // plain array
        return this.buf.slice(start, end);
    return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
};

/**
 * Reads a string preceeded by its byte length as a varint.
 * @returns {string} Value read
 */
Reader.prototype.string = function read_string() {
    var bytes = this.bytes();
    return utf8.read(bytes, 0, bytes.length);
};

/**
 * Skips the specified number of bytes if specified, otherwise skips a varint.
 * @param {number} [length] Length if known, otherwise a varint is assumed
 * @returns {Reader} `this`
 */
Reader.prototype.skip = function skip(length) {
    if (typeof length === "number") {
        /* istanbul ignore if */
        if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
        this.pos += length;
    } else {
        do {
            /* istanbul ignore if */
            if (this.pos >= this.len)
                throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
    }
    return this;
};

/**
 * Skips the next element of the specified wire type.
 * @param {number} wireType Wire type received
 * @returns {Reader} `this`
 */
Reader.prototype.skipType = function(wireType) {
    switch (wireType) {
        case 0:
            this.skip();
            break;
        case 1:
            this.skip(8);
            break;
        case 2:
            this.skip(this.uint32());
            break;
        case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType);
            }
            break;
        case 5:
            this.skip(4);
            break;

        /* istanbul ignore next */
        default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
    }
    return this;
};

Reader._configure = function(BufferReader_) {
    BufferReader = BufferReader_;

    var fn = util.Long ? "toLong" : /* istanbul ignore next */ "toNumber";
    util.merge(Reader.prototype, {

        int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
        },

        uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
        },

        sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
        },

        fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
        },

        sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
        }

    });
};

},{"39":39}],28:[function(require,module,exports){
"use strict";
module.exports = BufferReader;

// extends Reader
var Reader = require(27);
(BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;

var util = require(39);

/**
 * Constructs a new buffer reader instance.
 * @classdesc Wire format reader using node buffers.
 * @extends Reader
 * @constructor
 * @param {Buffer} buffer Buffer to read from
 */
function BufferReader(buffer) {
    Reader.call(this, buffer);

    /**
     * Read buffer.
     * @name BufferReader#buf
     * @type {Buffer}
     */
}

/* istanbul ignore else */
if (util.Buffer)
    BufferReader.prototype._slice = util.Buffer.prototype.slice;

/**
 * @override
 */
BufferReader.prototype.string = function read_string_buffer() {
    var len = this.uint32(); // modifies pos
    return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len));
};

/**
 * Reads a sequence of bytes preceeded by its length as a varint.
 * @name BufferReader#bytes
 * @function
 * @returns {Buffer} Value read
 */

},{"27":27,"39":39}],29:[function(require,module,exports){
"use strict";
module.exports = Root;

// extends Namespace
var Namespace = require(23);
((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";

var Field   = require(16),
    Enum    = require(15),
    OneOf   = require(25),
    util    = require(37);

var Type,   // cyclic
    parse,  // might be excluded
    common; // "

/**
 * Constructs a new root namespace instance.
 * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
 * @extends NamespaceBase
 * @constructor
 * @param {Object.<string,*>} [options] Top level options
 */
function Root(options) {
    Namespace.call(this, "", options);

    /**
     * Deferred extension fields.
     * @type {Field[]}
     */
    this.deferred = [];

    /**
     * Resolved file names of loaded files.
     * @type {string[]}
     */
    this.files = [];
}

/**
 * Loads a namespace descriptor into a root namespace.
 * @param {INamespace} json Nameespace descriptor
 * @param {Root} [root] Root namespace, defaults to create a new one if omitted
 * @returns {Root} Root namespace
 */
Root.fromJSON = function fromJSON(json, root) {
    if (!root)
        root = new Root();
    if (json.options)
        root.setOptions(json.options);
    return root.addJSON(json.nested);
};

/**
 * Resolves the path of an imported file, relative to the importing origin.
 * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
 * @function
 * @param {string} origin The file name of the importing file
 * @param {string} target The file name being imported
 * @returns {string|null} Resolved path to `target` or `null` to skip the file
 */
Root.prototype.resolvePath = util.path.resolve;

// A symbol-like function to safely signal synchronous loading
/* istanbul ignore next */
function SYNC() {} // eslint-disable-line no-empty-function

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} options Parse options
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 */
Root.prototype.load = function load(filename, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = undefined;
    }
    var self = this;
    if (!callback)
        return util.asPromise(load, self, filename, options);

    var sync = callback === SYNC; // undocumented

    // Finishes loading by calling the callback (exactly once)
    function finish(err, root) {
        /* istanbul ignore if */
        if (!callback)
            return;
        var cb = callback;
        callback = null;
        if (sync)
            throw err;
        cb(err, root);
    }

    // Processes a single file
    function process(filename, source) {
        try {
            if (util.isString(source) && source.charAt(0) === "{")
                source = JSON.parse(source);
            if (!util.isString(source))
                self.setOptions(source.options).addJSON(source.nested);
            else {
                parse.filename = filename;
                var parsed = parse(source, self, options),
                    resolved,
                    i = 0;
                if (parsed.imports)
                    for (; i < parsed.imports.length; ++i)
                        if (resolved = self.resolvePath(filename, parsed.imports[i]))
                            fetch(resolved);
                if (parsed.weakImports)
                    for (i = 0; i < parsed.weakImports.length; ++i)
                        if (resolved = self.resolvePath(filename, parsed.weakImports[i]))
                            fetch(resolved, true);
            }
        } catch (err) {
            finish(err);
        }
        if (!sync && !queued)
            finish(null, self); // only once anyway
    }

    // Fetches a single file
    function fetch(filename, weak) {

        // Strip path if this file references a bundled definition
        var idx = filename.lastIndexOf("google/protobuf/");
        if (idx > -1) {
            var altname = filename.substring(idx);
            if (altname in common)
                filename = altname;
        }

        // Skip if already loaded / attempted
        if (self.files.indexOf(filename) > -1)
            return;
        self.files.push(filename);

        // Shortcut bundled definitions
        if (filename in common) {
            if (sync)
                process(filename, common[filename]);
            else {
                ++queued;
                setTimeout(function() {
                    --queued;
                    process(filename, common[filename]);
                });
            }
            return;
        }

        // Otherwise fetch from disk or network
        if (sync) {
            var source;
            try {
                source = util.fs.readFileSync(filename).toString("utf8");
            } catch (err) {
                if (!weak)
                    finish(err);
                return;
            }
            process(filename, source);
        } else {
            ++queued;
            util.fetch(filename, function(err, source) {
                --queued;
                /* istanbul ignore if */
                if (!callback)
                    return; // terminated meanwhile
                if (err) {
                    /* istanbul ignore else */
                    if (!weak)
                        finish(err);
                    else if (!queued) // can't be covered reliably
                        finish(null, self);
                    return;
                }
                process(filename, source);
            });
        }
    }
    var queued = 0;

    // Assembling the root namespace doesn't require working type
    // references anymore, so we can load everything in parallel
    if (util.isString(filename))
        filename = [ filename ];
    for (var i = 0, resolved; i < filename.length; ++i)
        if (resolved = self.resolvePath("", filename[i]))
            fetch(resolved);

    if (sync)
        return self;
    if (!queued)
        finish(null, self);
    return undefined;
};
// function load(filename:string, options:IParseOptions, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Promise<Root>} Promise
 * @variation 3
 */
// function load(filename:string, [options:IParseOptions]):Promise<Root>

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace (node only).
 * @function Root#loadSync
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 */
Root.prototype.loadSync = function loadSync(filename, options) {
    if (!util.isNode)
        throw Error("not supported");
    return this.load(filename, options, SYNC);
};

/**
 * @override
 */
Root.prototype.resolveAll = function resolveAll() {
    if (this.deferred.length)
        throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
            return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
    return Namespace.prototype.resolveAll.call(this);
};

// only uppercased (and thus conflict-free) children are exposed, see below
var exposeRe = /^[A-Z]/;

/**
 * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
 * @param {Root} root Root instance
 * @param {Field} field Declaring extension field witin the declaring type
 * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
 * @inner
 * @ignore
 */
function tryHandleExtension(root, field) {
    var extendedType = field.parent.lookup(field.extend);
    if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
    }
    return false;
}

/**
 * Called when any object is added to this root or its sub-namespaces.
 * @param {ReflectionObject} object Object added
 * @returns {undefined}
 * @private
 */
Root.prototype._handleAdd = function _handleAdd(object) {
    if (object instanceof Field) {

        if (/* an extension field (implies not part of a oneof) */ object.extend !== undefined && /* not already handled */ !object.extensionField)
            if (!tryHandleExtension(this, object))
                this.deferred.push(object);

    } else if (object instanceof Enum) {

        if (exposeRe.test(object.name))
            object.parent[object.name] = object.values; // expose enum values as property of its parent

    } else if (!(object instanceof OneOf)) /* everything else is a namespace */ {

        if (object instanceof Type) // Try to handle any deferred extensions
            for (var i = 0; i < this.deferred.length;)
                if (tryHandleExtension(this, this.deferred[i]))
                    this.deferred.splice(i, 1);
                else
                    ++i;
        for (var j = 0; j < /* initializes */ object.nestedArray.length; ++j) // recurse into the namespace
            this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name))
            object.parent[object.name] = object; // expose namespace as property of its parent
    }

    // The above also adds uppercased (and thus conflict-free) nested types, services and enums as
    // properties of namespaces just like static code does. This allows using a .d.ts generated for
    // a static module with reflection-based solutions where the condition is met.
};

/**
 * Called when any object is removed from this root or its sub-namespaces.
 * @param {ReflectionObject} object Object removed
 * @returns {undefined}
 * @private
 */
Root.prototype._handleRemove = function _handleRemove(object) {
    if (object instanceof Field) {

        if (/* an extension field */ object.extend !== undefined) {
            if (/* already handled */ object.extensionField) { // remove its sister field
                object.extensionField.parent.remove(object.extensionField);
                object.extensionField = null;
            } else { // cancel the extension
                var index = this.deferred.indexOf(object);
                /* istanbul ignore else */
                if (index > -1)
                    this.deferred.splice(index, 1);
            }
        }

    } else if (object instanceof Enum) {

        if (exposeRe.test(object.name))
            delete object.parent[object.name]; // unexpose enum values

    } else if (object instanceof Namespace) {

        for (var i = 0; i < /* initializes */ object.nestedArray.length; ++i) // recurse into the namespace
            this._handleRemove(object._nestedArray[i]);

        if (exposeRe.test(object.name))
            delete object.parent[object.name]; // unexpose namespaces

    }
};

// Sets up cyclic dependencies (called in index-light)
Root._configure = function(Type_, parse_, common_) {
    Type   = Type_;
    parse  = parse_;
    common = common_;
};

},{"15":15,"16":16,"23":23,"25":25,"37":37}],30:[function(require,module,exports){
"use strict";
module.exports = {};

/**
 * Named roots.
 * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
 * Can also be used manually to make roots available accross modules.
 * @name roots
 * @type {Object.<string,Root>}
 * @example
 * // pbjs -r myroot -o compiled.js ...
 *
 * // in another module:
 * require("./compiled.js");
 *
 * // in any subsequent module:
 * var root = protobuf.roots["myroot"];
 */

},{}],31:[function(require,module,exports){
"use strict";

/**
 * Streaming RPC helpers.
 * @namespace
 */
var rpc = exports;

/**
 * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
 * @typedef RPCImpl
 * @type {function}
 * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
 * @param {Uint8Array} requestData Request data
 * @param {RPCImplCallback} callback Callback function
 * @returns {undefined}
 * @example
 * function rpcImpl(method, requestData, callback) {
 *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
 *         throw Error("no such method");
 *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
 *         callback(err, responseData);
 *     });
 * }
 */

/**
 * Node-style callback as used by {@link RPCImpl}.
 * @typedef RPCImplCallback
 * @type {function}
 * @param {Error|null} error Error, if any, otherwise `null`
 * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
 * @returns {undefined}
 */

rpc.Service = require(32);

},{"32":32}],32:[function(require,module,exports){
"use strict";
module.exports = Service;

var util = require(39);

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
 * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
 *
 * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
 * @typedef rpc.ServiceMethodCallback
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {Error|null} error Error, if any
 * @param {TRes} [response] Response message
 * @returns {undefined}
 */

/**
 * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
 * @typedef rpc.ServiceMethod
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 * @type {function}
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
 * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
 */

/**
 * Constructs a new RPC service instance.
 * @classdesc An RPC service as returned by {@link Service#create}.
 * @exports rpc.Service
 * @extends util.EventEmitter
 * @constructor
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

    if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");

    util.EventEmitter.call(this);

    /**
     * RPC implementation. Becomes `null` once the service is ended.
     * @type {RPCImpl|null}
     */
    this.rpcImpl = rpcImpl;

    /**
     * Whether requests are length-delimited.
     * @type {boolean}
     */
    this.requestDelimited = Boolean(requestDelimited);

    /**
     * Whether responses are length-delimited.
     * @type {boolean}
     */
    this.responseDelimited = Boolean(responseDelimited);
}

/**
 * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
 * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
 * @param {Constructor<TReq>} requestCtor Request constructor
 * @param {Constructor<TRes>} responseCtor Response constructor
 * @param {TReq|Properties<TReq>} request Request message or plain object
 * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
 * @returns {undefined}
 * @template TReq extends Message<TReq>
 * @template TRes extends Message<TRes>
 */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

    if (!request)
        throw TypeError("request must be specified");

    var self = this;
    if (!callback)
        return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

    if (!self.rpcImpl) {
        setTimeout(function() { callback(Error("already ended")); }, 0);
        return undefined;
    }

    try {
        return self.rpcImpl(
            method,
            requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {

                if (err) {
                    self.emit("error", err, method);
                    return callback(err);
                }

                if (response === null) {
                    self.end(/* endedByRPC */ true);
                    return undefined;
                }

                if (!(response instanceof responseCtor)) {
                    try {
                        response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
                    } catch (err) {
                        self.emit("error", err, method);
                        return callback(err);
                    }
                }

                self.emit("data", response, method);
                return callback(null, response);
            }
        );
    } catch (err) {
        self.emit("error", err, method);
        setTimeout(function() { callback(err); }, 0);
        return undefined;
    }
};

/**
 * Ends this service and emits the `end` event.
 * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
 * @returns {rpc.Service} `this`
 */
Service.prototype.end = function end(endedByRPC) {
    if (this.rpcImpl) {
        if (!endedByRPC) // signal end to rpcImpl
            this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
    }
    return this;
};

},{"39":39}],33:[function(require,module,exports){
"use strict";
module.exports = Service;

// extends Namespace
var Namespace = require(23);
((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";

var Method = require(22),
    util   = require(37),
    rpc    = require(31);

/**
 * Constructs a new service instance.
 * @classdesc Reflected service.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Service name
 * @param {Object.<string,*>} [options] Service options
 * @throws {TypeError} If arguments are invalid
 */
function Service(name, options) {
    Namespace.call(this, name, options);

    /**
     * Service methods.
     * @type {Object.<string,Method>}
     */
    this.methods = {}; // toJSON, marker

    /**
     * Cached methods as an array.
     * @type {Method[]|null}
     * @private
     */
    this._methodsArray = null;
}

/**
 * Service descriptor.
 * @interface IService
 * @extends INamespace
 * @property {Object.<string,IMethod>} methods Method descriptors
 */

/**
 * Constructs a service from a service descriptor.
 * @param {string} name Service name
 * @param {IService} json Service descriptor
 * @returns {Service} Created service
 * @throws {TypeError} If arguments are invalid
 */
Service.fromJSON = function fromJSON(name, json) {
    var service = new Service(name, json.options);
    /* istanbul ignore else */
    if (json.methods)
        for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
            service.add(Method.fromJSON(names[i], json.methods[names[i]]));
    if (json.nested)
        service.addJSON(json.nested);
    service.comment = json.comment;
    return service;
};

/**
 * Converts this service to a service descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IService} Service descriptor
 */
Service.prototype.toJSON = function toJSON(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options" , inherited && inherited.options || undefined,
        "methods" , Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */ {},
        "nested"  , inherited && inherited.nested || undefined,
        "comment" , keepComments ? this.comment : undefined
    ]);
};

/**
 * Methods of this service as an array for iteration.
 * @name Service#methodsArray
 * @type {Method[]}
 * @readonly
 */
Object.defineProperty(Service.prototype, "methodsArray", {
    get: function() {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
    }
});

function clearCache(service) {
    service._methodsArray = null;
    return service;
}

/**
 * @override
 */
Service.prototype.get = function get(name) {
    return this.methods[name]
        || Namespace.prototype.get.call(this, name);
};

/**
 * @override
 */
Service.prototype.resolveAll = function resolveAll() {
    var methods = this.methodsArray;
    for (var i = 0; i < methods.length; ++i)
        methods[i].resolve();
    return Namespace.prototype.resolve.call(this);
};

/**
 * @override
 */
Service.prototype.add = function add(object) {

    /* istanbul ignore if */
    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);

    if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};

/**
 * @override
 */
Service.prototype.remove = function remove(object) {
    if (object instanceof Method) {

        /* istanbul ignore if */
        if (this.methods[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};

/**
 * Creates a runtime service using the specified rpc implementation.
 * @param {RPCImpl} rpcImpl RPC implementation
 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
 * @returns {rpc.Service} RPC service. Useful where requests and/or responses are streamed.
 */
Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
    var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
    for (var i = 0, method; i < /* initializes */ this.methodsArray.length; ++i) {
        var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
        rpcService[methodName] = util.codegen(["r","c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
            m: method,
            q: method.resolvedRequestType.ctor,
            s: method.resolvedResponseType.ctor
        });
    }
    return rpcService;
};

},{"22":22,"23":23,"31":31,"37":37}],34:[function(require,module,exports){
"use strict";
module.exports = tokenize;

var delimRe        = /[\s{}=;:[\],'"()<>]/g,
    stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
    stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;

var setCommentRe = /^ *[*/]+ */,
    setCommentAltRe = /^\s*\*?\/*/,
    setCommentSplitRe = /\n/g,
    whitespaceRe = /\s/,
    unescapeRe = /\\(.?)/g;

var unescapeMap = {
    "0": "\0",
    "r": "\r",
    "n": "\n",
    "t": "\t"
};

/**
 * Unescapes a string.
 * @param {string} str String to unescape
 * @returns {string} Unescaped string
 * @property {Object.<string,string>} map Special characters map
 * @memberof tokenize
 */
function unescape(str) {
    return str.replace(unescapeRe, function($0, $1) {
        switch ($1) {
            case "\\":
            case "":
                return $1;
            default:
                return unescapeMap[$1] || "";
        }
    });
}

tokenize.unescape = unescape;

/**
 * Gets the next token and advances.
 * @typedef TokenizerHandleNext
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */

/**
 * Peeks for the next token.
 * @typedef TokenizerHandlePeek
 * @type {function}
 * @returns {string|null} Next token or `null` on eof
 */

/**
 * Pushes a token back to the stack.
 * @typedef TokenizerHandlePush
 * @type {function}
 * @param {string} token Token
 * @returns {undefined}
 */

/**
 * Skips the next token.
 * @typedef TokenizerHandleSkip
 * @type {function}
 * @param {string} expected Expected token
 * @param {boolean} [optional=false] If optional
 * @returns {boolean} Whether the token matched
 * @throws {Error} If the token didn't match and is not optional
 */

/**
 * Gets the comment on the previous line or, alternatively, the line comment on the specified line.
 * @typedef TokenizerHandleCmnt
 * @type {function}
 * @param {number} [line] Line number
 * @returns {string|null} Comment text or `null` if none
 */

/**
 * Handle object returned from {@link tokenize}.
 * @interface ITokenizerHandle
 * @property {TokenizerHandleNext} next Gets the next token and advances (`null` on eof)
 * @property {TokenizerHandlePeek} peek Peeks for the next token (`null` on eof)
 * @property {TokenizerHandlePush} push Pushes a token back to the stack
 * @property {TokenizerHandleSkip} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
 * @property {TokenizerHandleCmnt} cmnt Gets the comment on the previous line or the line comment on the specified line, if any
 * @property {number} line Current line number
 */

/**
 * Tokenizes the given .proto source and returns an object with useful utility functions.
 * @param {string} source Source contents
 * @param {boolean} alternateCommentMode Whether we should activate alternate comment parsing mode.
 * @returns {ITokenizerHandle} Tokenizer handle
 */
function tokenize(source, alternateCommentMode) {
    /* eslint-disable callback-return */
    source = source.toString();

    var offset = 0,
        length = source.length,
        line = 1,
        commentType = null,
        commentText = null,
        commentLine = 0,
        commentLineEmpty = false;

    var stack = [];

    var stringDelim = null;

    /* istanbul ignore next */
    /**
     * Creates an error for illegal syntax.
     * @param {string} subject Subject
     * @returns {Error} Error created
     * @inner
     */
    function illegal(subject) {
        return Error("illegal " + subject + " (line " + line + ")");
    }

    /**
     * Reads a string till its end.
     * @returns {string} String read
     * @inner
     */
    function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
            throw illegal("string");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape(match[1]);
    }

    /**
     * Gets the character at `pos` within the source.
     * @param {number} pos Position
     * @returns {string} Character
     * @inner
     */
    function charAt(pos) {
        return source.charAt(pos);
    }

    /**
     * Sets the current comment text.
     * @param {number} start Start offset
     * @param {number} end End offset
     * @returns {undefined}
     * @inner
     */
    function setComment(start, end) {
        commentType = source.charAt(start++);
        commentLine = line;
        commentLineEmpty = false;
        var lookback;
        if (alternateCommentMode) {
            lookback = 2;  // alternate comment parsing: "//" or "/*"
        } else {
            lookback = 3;  // "///" or "/**"
        }
        var commentOffset = start - lookback,
            c;
        do {
            if (--commentOffset < 0 ||
                    (c = source.charAt(commentOffset)) === "\n") {
                commentLineEmpty = true;
                break;
            }
        } while (c === " " || c === "\t");
        var lines = source
            .substring(start, end)
            .split(setCommentSplitRe);
        for (var i = 0; i < lines.length; ++i)
            lines[i] = lines[i]
                .replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "")
                .trim();
        commentText = lines
            .join("\n")
            .trim();
    }

    function isDoubleSlashCommentLine(startOffset) {
        var endOffset = findEndOfLine(startOffset);

        // see if remaining line matches comment pattern
        var lineText = source.substring(startOffset, endOffset);
        // look for 1 or 2 slashes since startOffset would already point past
        // the first slash that started the comment.
        var isComment = /^\s*\/{1,2}/.test(lineText);
        return isComment;
    }

    function findEndOfLine(cursor) {
        // find end of cursor's line
        var endOffset = cursor;
        while (endOffset < length && charAt(endOffset) !== "\n") {
            endOffset++;
        }
        return endOffset;
    }

    /**
     * Obtains the next token.
     * @returns {string|null} Next token or `null` on eof
     * @inner
     */
    function next() {
        if (stack.length > 0)
            return stack.shift();
        if (stringDelim)
            return readString();
        var repeat,
            prev,
            curr,
            start,
            isDoc;
        do {
            if (offset === length)
                return null;
            repeat = false;
            while (whitespaceRe.test(curr = charAt(offset))) {
                if (curr === "\n")
                    ++line;
                if (++offset === length)
                    return null;
            }

            if (charAt(offset) === "/") {
                if (++offset === length) {
                    throw illegal("comment");
                }
                if (charAt(offset) === "/") { // Line
                    if (!alternateCommentMode) {
                        // check for triple-slash comment
                        isDoc = charAt(start = offset + 1) === "/";

                        while (charAt(++offset) !== "\n") {
                            if (offset === length) {
                                return null;
                            }
                        }
                        ++offset;
                        if (isDoc) {
                            setComment(start, offset - 1);
                        }
                        ++line;
                        repeat = true;
                    } else {
                        // check for double-slash comments, consolidating consecutive lines
                        start = offset;
                        isDoc = false;
                        if (isDoubleSlashCommentLine(offset)) {
                            isDoc = true;
                            do {
                                offset = findEndOfLine(offset);
                                if (offset === length) {
                                    break;
                                }
                                offset++;
                            } while (isDoubleSlashCommentLine(offset));
                        } else {
                            offset = Math.min(length, findEndOfLine(offset) + 1);
                        }
                        if (isDoc) {
                            setComment(start, offset);
                        }
                        line++;
                        repeat = true;
                    }
                } else if ((curr = charAt(offset)) === "*") { /* Block */
                    // check for /** (regular comment mode) or /* (alternate comment mode)
                    start = offset + 1;
                    isDoc = alternateCommentMode || charAt(start) === "*";
                    do {
                        if (curr === "\n") {
                            ++line;
                        }
                        if (++offset === length) {
                            throw illegal("comment");
                        }
                        prev = curr;
                        curr = charAt(offset);
                    } while (prev !== "*" || curr !== "/");
                    ++offset;
                    if (isDoc) {
                        setComment(start, offset - 2);
                    }
                    repeat = true;
                } else {
                    return "/";
                }
            }
        } while (repeat);

        // offset !== length if we got here

        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(charAt(end++));
        if (!delim)
            while (end < length && !delimRe.test(charAt(end)))
                ++end;
        var token = source.substring(offset, offset = end);
        if (token === "\"" || token === "'")
            stringDelim = token;
        return token;
    }

    /**
     * Pushes a token back to the stack.
     * @param {string} token Token
     * @returns {undefined}
     * @inner
     */
    function push(token) {
        stack.push(token);
    }

    /**
     * Peeks for the next token.
     * @returns {string|null} Token or `null` on eof
     * @inner
     */
    function peek() {
        if (!stack.length) {
            var token = next();
            if (token === null)
                return null;
            push(token);
        }
        return stack[0];
    }

    /**
     * Skips a token.
     * @param {string} expected Expected token
     * @param {boolean} [optional=false] Whether the token is optional
     * @returns {boolean} `true` when skipped, `false` if not
     * @throws {Error} When a required token is not present
     * @inner
     */
    function skip(expected, optional) {
        var actual = peek(),
            equals = actual === expected;
        if (equals) {
            next();
            return true;
        }
        if (!optional)
            throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
    }

    /**
     * Gets a comment.
     * @param {number} [trailingLine] Line number if looking for a trailing comment
     * @returns {string|null} Comment text
     * @inner
     */
    function cmnt(trailingLine) {
        var ret = null;
        if (trailingLine === undefined) {
            if (commentLine === line - 1 && (alternateCommentMode || commentType === "*" || commentLineEmpty)) {
                ret = commentText;
            }
        } else {
            /* istanbul ignore else */
            if (commentLine < trailingLine) {
                peek();
            }
            if (commentLine === trailingLine && !commentLineEmpty && (alternateCommentMode || commentType === "/")) {
                ret = commentText;
            }
        }
        return ret;
    }

    return Object.defineProperty({
        next: next,
        peek: peek,
        push: push,
        skip: skip,
        cmnt: cmnt
    }, "line", {
        get: function() { return line; }
    });
    /* eslint-enable callback-return */
}

},{}],35:[function(require,module,exports){
"use strict";
module.exports = Type;

// extends Namespace
var Namespace = require(23);
((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";

var Enum      = require(15),
    OneOf     = require(25),
    Field     = require(16),
    MapField  = require(20),
    Service   = require(33),
    Message   = require(21),
    Reader    = require(27),
    Writer    = require(42),
    util      = require(37),
    encoder   = require(14),
    decoder   = require(13),
    verifier  = require(40),
    converter = require(12),
    wrappers  = require(41);

/**
 * Constructs a new reflected message type instance.
 * @classdesc Reflected message type.
 * @extends NamespaceBase
 * @constructor
 * @param {string} name Message name
 * @param {Object.<string,*>} [options] Declared options
 */
function Type(name, options) {
    Namespace.call(this, name, options);

    /**
     * Message fields.
     * @type {Object.<string,Field>}
     */
    this.fields = {};  // toJSON, marker

    /**
     * Oneofs declared within this namespace, if any.
     * @type {Object.<string,OneOf>}
     */
    this.oneofs = undefined; // toJSON

    /**
     * Extension ranges, if any.
     * @type {number[][]}
     */
    this.extensions = undefined; // toJSON

    /**
     * Reserved ranges, if any.
     * @type {Array.<number[]|string>}
     */
    this.reserved = undefined; // toJSON

    /*?
     * Whether this type is a legacy group.
     * @type {boolean|undefined}
     */
    this.group = undefined; // toJSON

    /**
     * Cached fields by id.
     * @type {Object.<number,Field>|null}
     * @private
     */
    this._fieldsById = null;

    /**
     * Cached fields as an array.
     * @type {Field[]|null}
     * @private
     */
    this._fieldsArray = null;

    /**
     * Cached oneofs as an array.
     * @type {OneOf[]|null}
     * @private
     */
    this._oneofsArray = null;

    /**
     * Cached constructor.
     * @type {Constructor<{}>}
     * @private
     */
    this._ctor = null;
}

Object.defineProperties(Type.prototype, {

    /**
     * Message fields by id.
     * @name Type#fieldsById
     * @type {Object.<number,Field>}
     * @readonly
     */
    fieldsById: {
        get: function() {

            /* istanbul ignore if */
            if (this._fieldsById)
                return this._fieldsById;

            this._fieldsById = {};
            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
                var field = this.fields[names[i]],
                    id = field.id;

                /* istanbul ignore if */
                if (this._fieldsById[id])
                    throw Error("duplicate id " + id + " in " + this);

                this._fieldsById[id] = field;
            }
            return this._fieldsById;
        }
    },

    /**
     * Fields of this message as an array for iteration.
     * @name Type#fieldsArray
     * @type {Field[]}
     * @readonly
     */
    fieldsArray: {
        get: function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
    },

    /**
     * Oneofs of this message as an array for iteration.
     * @name Type#oneofsArray
     * @type {OneOf[]}
     * @readonly
     */
    oneofsArray: {
        get: function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
    },

    /**
     * The registered constructor, if any registered, otherwise a generic constructor.
     * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
     * @name Type#ctor
     * @type {Constructor<{}>}
     */
    ctor: {
        get: function() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function(ctor) {

            // Ensure proper prototype
            var prototype = ctor.prototype;
            if (!(prototype instanceof Message)) {
                (ctor.prototype = new Message()).constructor = ctor;
                util.merge(ctor.prototype, prototype);
            }

            // Classes and messages reference their reflected type
            ctor.$type = ctor.prototype.$type = this;

            // Mix in static methods
            util.merge(ctor, Message, true);

            this._ctor = ctor;

            // Messages have non-enumerable default values on their prototype
            var i = 0;
            for (; i < /* initializes */ this.fieldsArray.length; ++i)
                this._fieldsArray[i].resolve(); // ensures a proper value

            // Messages have non-enumerable getters and setters for each virtual oneof field
            var ctorProperties = {};
            for (i = 0; i < /* initializes */ this.oneofsArray.length; ++i)
                ctorProperties[this._oneofsArray[i].resolve().name] = {
                    get: util.oneOfGetter(this._oneofsArray[i].oneof),
                    set: util.oneOfSetter(this._oneofsArray[i].oneof)
                };
            if (i)
                Object.defineProperties(ctor.prototype, ctorProperties);
        }
    }
});

/**
 * Generates a constructor function for the specified type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
Type.generateConstructor = function generateConstructor(mtype) {
    /* eslint-disable no-unexpected-multiline */
    var gen = util.codegen(["p"], mtype.name);
    // explicitly initialize mutable object/array fields so that these aren't just inherited from the prototype
    for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
        if ((field = mtype._fieldsArray[i]).map) gen
            ("this%s={}", util.safeProp(field.name));
        else if (field.repeated) gen
            ("this%s=[]", util.safeProp(field.name));
    return gen
    ("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)") // omit undefined or null
        ("this[ks[i]]=p[ks[i]]");
    /* eslint-enable no-unexpected-multiline */
};

function clearCache(type) {
    type._fieldsById = type._fieldsArray = type._oneofsArray = null;
    delete type.encode;
    delete type.decode;
    delete type.verify;
    return type;
}

/**
 * Message type descriptor.
 * @interface IType
 * @extends INamespace
 * @property {Object.<string,IOneOf>} [oneofs] Oneof descriptors
 * @property {Object.<string,IField>} fields Field descriptors
 * @property {number[][]} [extensions] Extension ranges
 * @property {number[][]} [reserved] Reserved ranges
 * @property {boolean} [group=false] Whether a legacy group or not
 */

/**
 * Creates a message type from a message type descriptor.
 * @param {string} name Message name
 * @param {IType} json Message type descriptor
 * @returns {Type} Created message type
 */
Type.fromJSON = function fromJSON(name, json) {
    var type = new Type(name, json.options);
    type.extensions = json.extensions;
    type.reserved = json.reserved;
    var names = Object.keys(json.fields),
        i = 0;
    for (; i < names.length; ++i)
        type.add(
            ( typeof json.fields[names[i]].keyType !== "undefined"
            ? MapField.fromJSON
            : Field.fromJSON )(names[i], json.fields[names[i]])
        );
    if (json.oneofs)
        for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
            type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
    if (json.nested)
        for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
            var nested = json.nested[names[i]];
            type.add( // most to least likely
                ( nested.id !== undefined
                ? Field.fromJSON
                : nested.fields !== undefined
                ? Type.fromJSON
                : nested.values !== undefined
                ? Enum.fromJSON
                : nested.methods !== undefined
                ? Service.fromJSON
                : Namespace.fromJSON )(names[i], nested)
            );
        }
    if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
    if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
    if (json.group)
        type.group = true;
    if (json.comment)
        type.comment = json.comment;
    return type;
};

/**
 * Converts this message type to a message type descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {IType} Message type descriptor
 */
Type.prototype.toJSON = function toJSON(toJSONOptions) {
    var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
    var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
    return util.toObject([
        "options"    , inherited && inherited.options || undefined,
        "oneofs"     , Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
        "fields"     , Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) { return !obj.declaringField; }), toJSONOptions) || {},
        "extensions" , this.extensions && this.extensions.length ? this.extensions : undefined,
        "reserved"   , this.reserved && this.reserved.length ? this.reserved : undefined,
        "group"      , this.group || undefined,
        "nested"     , inherited && inherited.nested || undefined,
        "comment"    , keepComments ? this.comment : undefined
    ]);
};

/**
 * @override
 */
Type.prototype.resolveAll = function resolveAll() {
    var fields = this.fieldsArray, i = 0;
    while (i < fields.length)
        fields[i++].resolve();
    var oneofs = this.oneofsArray; i = 0;
    while (i < oneofs.length)
        oneofs[i++].resolve();
    return Namespace.prototype.resolveAll.call(this);
};

/**
 * @override
 */
Type.prototype.get = function get(name) {
    return this.fields[name]
        || this.oneofs && this.oneofs[name]
        || this.nested && this.nested[name]
        || null;
};

/**
 * Adds a nested object to this type.
 * @param {ReflectionObject} object Nested object to add
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If there is already a nested object with this name or, if a field, when there is already a field with this id
 */
Type.prototype.add = function add(object) {

    if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);

    if (object instanceof Field && object.extend === undefined) {
        // NOTE: Extension fields aren't actual fields on the declaring type, but nested objects.
        // The root object takes care of adding distinct sister-fields to the respective extended
        // type instead.

        // avoids calling the getter if not absolutely necessary because it's called quite frequently
        if (this._fieldsById ? /* istanbul ignore next */ this._fieldsById[object.id] : this.fieldsById[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id))
            throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name))
            throw Error("name '" + object.name + "' is reserved in " + this);

        if (object.parent)
            object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {
        if (!this.oneofs)
            this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
    }
    return Namespace.prototype.add.call(this, object);
};

/**
 * Removes a nested object from this type.
 * @param {ReflectionObject} object Nested object to remove
 * @returns {Type} `this`
 * @throws {TypeError} If arguments are invalid
 * @throws {Error} If `object` is not a member of this type
 */
Type.prototype.remove = function remove(object) {
    if (object instanceof Field && object.extend === undefined) {
        // See Type#add for the reason why extension fields are excluded here.

        /* istanbul ignore if */
        if (!this.fields || this.fields[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    if (object instanceof OneOf) {

        /* istanbul ignore if */
        if (!this.oneofs || this.oneofs[object.name] !== object)
            throw Error(object + " is not a member of " + this);

        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
    }
    return Namespace.prototype.remove.call(this, object);
};

/**
 * Tests if the specified id is reserved.
 * @param {number} id Id to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedId = function isReservedId(id) {
    return Namespace.isReservedId(this.reserved, id);
};

/**
 * Tests if the specified name is reserved.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
Type.prototype.isReservedName = function isReservedName(name) {
    return Namespace.isReservedName(this.reserved, name);
};

/**
 * Creates a new message of this type using the specified properties.
 * @param {Object.<string,*>} [properties] Properties to set
 * @returns {Message<{}>} Message instance
 */
Type.prototype.create = function create(properties) {
    return new this.ctor(properties);
};

/**
 * Sets up {@link Type#encode|encode}, {@link Type#decode|decode} and {@link Type#verify|verify}.
 * @returns {Type} `this`
 */
Type.prototype.setup = function setup() {
    // Sets up everything at once so that the prototype chain does not have to be re-evaluated
    // multiple times (V8, soft-deopt prototype-check).

    var fullName = this.fullName,
        types    = [];
    for (var i = 0; i < /* initializes */ this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);

    // Replace setup methods with type-specific generated functions
    this.encode = encoder(this)({
        Writer : Writer,
        types  : types,
        util   : util
    });
    this.decode = decoder(this)({
        Reader : Reader,
        types  : types,
        util   : util
    });
    this.verify = verifier(this)({
        types : types,
        util  : util
    });
    this.fromObject = converter.fromObject(this)({
        types : types,
        util  : util
    });
    this.toObject = converter.toObject(this)({
        types : types,
        util  : util
    });

    // Inject custom wrappers for common types
    var wrapper = wrappers[fullName];
    if (wrapper) {
        var originalThis = Object.create(this);
        // if (wrapper.fromObject) {
            originalThis.fromObject = this.fromObject;
            this.fromObject = wrapper.fromObject.bind(originalThis);
        // }
        // if (wrapper.toObject) {
            originalThis.toObject = this.toObject;
            this.toObject = wrapper.toObject.bind(originalThis);
        // }
    }

    return this;
};

/**
 * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encode = function encode_setup(message, writer) {
    return this.setup().encode(message, writer); // overrides this method
};

/**
 * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
 * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
 * @param {Writer} [writer] Writer to encode to
 * @returns {Writer} writer
 */
Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
};

/**
 * Decodes a message of this type.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @param {number} [length] Length of the message, if known beforehand
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError<{}>} If required fields are missing
 */
Type.prototype.decode = function decode_setup(reader, length) {
    return this.setup().decode(reader, length); // overrides this method
};

/**
 * Decodes a message of this type preceeded by its byte length as a varint.
 * @param {Reader|Uint8Array} reader Reader or buffer to decode from
 * @returns {Message<{}>} Decoded message
 * @throws {Error} If the payload is not a reader or valid buffer
 * @throws {util.ProtocolError} If required fields are missing
 */
Type.prototype.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof Reader))
        reader = Reader.create(reader);
    return this.decode(reader, reader.uint32());
};

/**
 * Verifies that field values are valid and that required fields are present.
 * @param {Object.<string,*>} message Plain object to verify
 * @returns {null|string} `null` if valid, otherwise the reason why it is not
 */
Type.prototype.verify = function verify_setup(message) {
    return this.setup().verify(message); // overrides this method
};

/**
 * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
 * @param {Object.<string,*>} object Plain object to convert
 * @returns {Message<{}>} Message instance
 */
Type.prototype.fromObject = function fromObject(object) {
    return this.setup().fromObject(object);
};

/**
 * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
 * @interface IConversionOptions
 * @property {Function} [longs] Long conversion type.
 * Valid values are `String` and `Number` (the global types).
 * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
 * @property {Function} [enums] Enum value conversion type.
 * Only valid value is `String` (the global type).
 * Defaults to copy the present value, which is the numeric id.
 * @property {Function} [bytes] Bytes value conversion type.
 * Valid values are `Array` and (a base64 encoded) `String` (the global types).
 * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
 * @property {boolean} [defaults=false] Also sets default values on the resulting object
 * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
 * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
 * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
 * @property {boolean} [json=false] Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings
 */

/**
 * Creates a plain object from a message of this type. Also converts values to other types if specified.
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 */
Type.prototype.toObject = function toObject(message, options) {
    return this.setup().toObject(message, options);
};

/**
 * Decorator function as returned by {@link Type.d} (TypeScript).
 * @typedef TypeDecorator
 * @type {function}
 * @param {Constructor<T>} target Target constructor
 * @returns {undefined}
 * @template T extends Message<T>
 */

/**
 * Type decorator (TypeScript).
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {TypeDecorator<T>} Decorator function
 * @template T extends Message<T>
 */
Type.d = function decorateType(typeName) {
    return function typeDecorator(target) {
        util.decorateType(target, typeName);
    };
};

},{"12":12,"13":13,"14":14,"15":15,"16":16,"20":20,"21":21,"23":23,"25":25,"27":27,"33":33,"37":37,"40":40,"41":41,"42":42}],36:[function(require,module,exports){
"use strict";

/**
 * Common type constants.
 * @namespace
 */
var types = exports;

var util = require(37);

var s = [
    "double",   // 0
    "float",    // 1
    "int32",    // 2
    "uint32",   // 3
    "sint32",   // 4
    "fixed32",  // 5
    "sfixed32", // 6
    "int64",    // 7
    "uint64",   // 8
    "sint64",   // 9
    "fixed64",  // 10
    "sfixed64", // 11
    "bool",     // 12
    "string",   // 13
    "bytes"     // 14
];

function bake(values, offset) {
    var i = 0, o = {};
    offset |= 0;
    while (i < values.length) o[s[i + offset]] = values[i++];
    return o;
}

/**
 * Basic type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 * @property {number} bytes=2 Ldelim wire type
 */
types.basic = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2,
    /* bytes    */ 2
]);

/**
 * Basic type defaults.
 * @type {Object.<string,*>}
 * @const
 * @property {number} double=0 Double default
 * @property {number} float=0 Float default
 * @property {number} int32=0 Int32 default
 * @property {number} uint32=0 Uint32 default
 * @property {number} sint32=0 Sint32 default
 * @property {number} fixed32=0 Fixed32 default
 * @property {number} sfixed32=0 Sfixed32 default
 * @property {number} int64=0 Int64 default
 * @property {number} uint64=0 Uint64 default
 * @property {number} sint64=0 Sint32 default
 * @property {number} fixed64=0 Fixed64 default
 * @property {number} sfixed64=0 Sfixed64 default
 * @property {boolean} bool=false Bool default
 * @property {string} string="" String default
 * @property {Array.<number>} bytes=Array(0) Bytes default
 * @property {null} message=null Message default
 */
types.defaults = bake([
    /* double   */ 0,
    /* float    */ 0,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 0,
    /* sfixed32 */ 0,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 0,
    /* sfixed64 */ 0,
    /* bool     */ false,
    /* string   */ "",
    /* bytes    */ util.emptyArray,
    /* message  */ null
]);

/**
 * Basic long type wire types.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 */
types.long = bake([
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1
], 7);

/**
 * Allowed types for map keys with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 * @property {number} string=2 Ldelim wire type
 */
types.mapKey = bake([
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0,
    /* string   */ 2
], 2);

/**
 * Allowed types for packed repeated fields with their associated wire type.
 * @type {Object.<string,number>}
 * @const
 * @property {number} double=1 Fixed64 wire type
 * @property {number} float=5 Fixed32 wire type
 * @property {number} int32=0 Varint wire type
 * @property {number} uint32=0 Varint wire type
 * @property {number} sint32=0 Varint wire type
 * @property {number} fixed32=5 Fixed32 wire type
 * @property {number} sfixed32=5 Fixed32 wire type
 * @property {number} int64=0 Varint wire type
 * @property {number} uint64=0 Varint wire type
 * @property {number} sint64=0 Varint wire type
 * @property {number} fixed64=1 Fixed64 wire type
 * @property {number} sfixed64=1 Fixed64 wire type
 * @property {number} bool=0 Varint wire type
 */
types.packed = bake([
    /* double   */ 1,
    /* float    */ 5,
    /* int32    */ 0,
    /* uint32   */ 0,
    /* sint32   */ 0,
    /* fixed32  */ 5,
    /* sfixed32 */ 5,
    /* int64    */ 0,
    /* uint64   */ 0,
    /* sint64   */ 0,
    /* fixed64  */ 1,
    /* sfixed64 */ 1,
    /* bool     */ 0
]);

},{"37":37}],37:[function(require,module,exports){
"use strict";

/**
 * Various utility functions.
 * @namespace
 */
var util = module.exports = require(39);

var roots = require(30);

var Type, // cyclic
    Enum;

util.codegen = require(3);
util.fetch   = require(5);
util.path    = require(8);

/**
 * Node's fs module if available.
 * @type {Object.<string,*>}
 */
util.fs = util.inquire("fs");

/**
 * Converts an object's values to an array.
 * @param {Object.<string,*>} object Object to convert
 * @returns {Array.<*>} Converted array
 */
util.toArray = function toArray(object) {
    if (object) {
        var keys  = Object.keys(object),
            array = new Array(keys.length),
            index = 0;
        while (index < keys.length)
            array[index] = object[keys[index++]];
        return array;
    }
    return [];
};

/**
 * Converts an array of keys immediately followed by their respective value to an object, omitting undefined values.
 * @param {Array.<*>} array Array to convert
 * @returns {Object.<string,*>} Converted object
 */
util.toObject = function toObject(array) {
    var object = {},
        index  = 0;
    while (index < array.length) {
        var key = array[index++],
            val = array[index++];
        if (val !== undefined)
            object[key] = val;
    }
    return object;
};

var safePropBackslashRe = /\\/g,
    safePropQuoteRe     = /"/g;

/**
 * Tests whether the specified name is a reserved word in JS.
 * @param {string} name Name to test
 * @returns {boolean} `true` if reserved, otherwise `false`
 */
util.isReserved = function isReserved(name) {
    return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
};

/**
 * Returns a safe property accessor for the specified property name.
 * @param {string} prop Property name
 * @returns {string} Safe accessor
 */
util.safeProp = function safeProp(prop) {
    if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop))
        return "[\"" + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, "\\\"") + "\"]";
    return "." + prop;
};

/**
 * Converts the first character of a string to upper case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.ucFirst = function ucFirst(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
};

var camelCaseRe = /_([a-z])/g;

/**
 * Converts a string to camel case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.camelCase = function camelCase(str) {
    return str.substring(0, 1)
         + str.substring(1)
               .replace(camelCaseRe, function($0, $1) { return $1.toUpperCase(); });
};

/**
 * Compares reflected fields by id.
 * @param {Field} a First field
 * @param {Field} b Second field
 * @returns {number} Comparison value
 */
util.compareFieldsById = function compareFieldsById(a, b) {
    return a.id - b.id;
};

/**
 * Decorator helper for types (TypeScript).
 * @param {Constructor<T>} ctor Constructor function
 * @param {string} [typeName] Type name, defaults to the constructor's name
 * @returns {Type} Reflected type
 * @template T extends Message<T>
 * @property {Root} root Decorators root
 */
util.decorateType = function decorateType(ctor, typeName) {

    /* istanbul ignore if */
    if (ctor.$type) {
        if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
        }
        return ctor.$type;
    }

    /* istanbul ignore next */
    if (!Type)
        Type = require(35);

    var type = new Type(typeName || ctor.name);
    util.decorateRoot.add(type);
    type.ctor = ctor; // sets up .encode, .decode etc.
    Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
    Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
    return type;
};

var decorateEnumIndex = 0;

/**
 * Decorator helper for enums (TypeScript).
 * @param {Object} object Enum object
 * @returns {Enum} Reflected enum
 */
util.decorateEnum = function decorateEnum(object) {

    /* istanbul ignore if */
    if (object.$type)
        return object.$type;

    /* istanbul ignore next */
    if (!Enum)
        Enum = require(15);

    var enm = new Enum("Enum" + decorateEnumIndex++, object);
    util.decorateRoot.add(enm);
    Object.defineProperty(object, "$type", { value: enm, enumerable: false });
    return enm;
};

/**
 * Decorator root (TypeScript).
 * @name util.decorateRoot
 * @type {Root}
 * @readonly
 */
Object.defineProperty(util, "decorateRoot", {
    get: function() {
        return roots["decorated"] || (roots["decorated"] = new (require(29))());
    }
});

},{"15":15,"29":29,"3":3,"30":30,"35":35,"39":39,"5":5,"8":8}],38:[function(require,module,exports){
"use strict";
module.exports = LongBits;

var util = require(39);

/**
 * Constructs new long bits.
 * @classdesc Helper class for working with the low and high bits of a 64 bit value.
 * @memberof util
 * @constructor
 * @param {number} lo Low 32 bits, unsigned
 * @param {number} hi High 32 bits, unsigned
 */
function LongBits(lo, hi) {

    // note that the casts below are theoretically unnecessary as of today, but older statically
    // generated converter code might still call the ctor with signed 32bits. kept for compat.

    /**
     * Low bits.
     * @type {number}
     */
    this.lo = lo >>> 0;

    /**
     * High bits.
     * @type {number}
     */
    this.hi = hi >>> 0;
}

/**
 * Zero bits.
 * @memberof util.LongBits
 * @type {util.LongBits}
 */
var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function() { return 0; };
zero.zzEncode = zero.zzDecode = function() { return this; };
zero.length = function() { return 1; };

/**
 * Zero hash.
 * @memberof util.LongBits
 * @type {string}
 */
var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

/**
 * Constructs new long bits from the specified number.
 * @param {number} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.fromNumber = function fromNumber(value) {
    if (value === 0)
        return zero;
    var sign = value < 0;
    if (sign)
        value = -value;
    var lo = value >>> 0,
        hi = (value - lo) / 4294967296 >>> 0;
    if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
                hi = 0;
        }
    }
    return new LongBits(lo, hi);
};

/**
 * Constructs new long bits from a number, long or string.
 * @param {Long|number|string} value Value
 * @returns {util.LongBits} Instance
 */
LongBits.from = function from(value) {
    if (typeof value === "number")
        return LongBits.fromNumber(value);
    if (util.isString(value)) {
        /* istanbul ignore else */
        if (util.Long)
            value = util.Long.fromString(value);
        else
            return LongBits.fromNumber(parseInt(value, 10));
    }
    return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

/**
 * Converts this long bits to a possibly unsafe JavaScript number.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {number} Possibly unsafe number
 */
LongBits.prototype.toNumber = function toNumber(unsigned) {
    if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0,
            hi = ~this.hi     >>> 0;
        if (!lo)
            hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
    }
    return this.lo + this.hi * 4294967296;
};

/**
 * Converts this long bits to a long.
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long} Long
 */
LongBits.prototype.toLong = function toLong(unsigned) {
    return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        /* istanbul ignore next */
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

/**
 * Constructs new long bits from the specified 8 characters long hash.
 * @param {string} hash Hash
 * @returns {util.LongBits} Bits
 */
LongBits.fromHash = function fromHash(hash) {
    if (hash === zeroHash)
        return zero;
    return new LongBits(
        ( charCodeAt.call(hash, 0)
        | charCodeAt.call(hash, 1) << 8
        | charCodeAt.call(hash, 2) << 16
        | charCodeAt.call(hash, 3) << 24) >>> 0
    ,
        ( charCodeAt.call(hash, 4)
        | charCodeAt.call(hash, 5) << 8
        | charCodeAt.call(hash, 6) << 16
        | charCodeAt.call(hash, 7) << 24) >>> 0
    );
};

/**
 * Converts this long bits to a 8 characters long hash.
 * @returns {string} Hash
 */
LongBits.prototype.toHash = function toHash() {
    return String.fromCharCode(
        this.lo        & 255,
        this.lo >>> 8  & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24      ,
        this.hi        & 255,
        this.hi >>> 8  & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
    );
};

/**
 * Zig-zag encodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzEncode = function zzEncode() {
    var mask =   this.hi >> 31;
    this.hi  = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
    this.lo  = ( this.lo << 1                   ^ mask) >>> 0;
    return this;
};

/**
 * Zig-zag decodes this long bits.
 * @returns {util.LongBits} `this`
 */
LongBits.prototype.zzDecode = function zzDecode() {
    var mask = -(this.lo & 1);
    this.lo  = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
    this.hi  = ( this.hi >>> 1                  ^ mask) >>> 0;
    return this;
};

/**
 * Calculates the length of this longbits when encoded as a varint.
 * @returns {number} Length
 */
LongBits.prototype.length = function length() {
    var part0 =  this.lo,
        part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
        part2 =  this.hi >>> 24;
    return part2 === 0
         ? part1 === 0
           ? part0 < 16384
             ? part0 < 128 ? 1 : 2
             : part0 < 2097152 ? 3 : 4
           : part1 < 16384
             ? part1 < 128 ? 5 : 6
             : part1 < 2097152 ? 7 : 8
         : part2 < 128 ? 9 : 10;
};

},{"39":39}],39:[function(require,module,exports){
"use strict";
var util = exports;

// used to return a Promise where callback is omitted
util.asPromise = require(1);

// converts to / from base64 encoded strings
util.base64 = require(2);

// base class of rpc.Service
util.EventEmitter = require(4);

// float handling accross browsers
util.float = require(6);

// requires modules optionally and hides the call from bundlers
util.inquire = require(7);

// converts to / from utf8 encoded strings
util.utf8 = require(10);

// provides a node-like buffer pool in the browser
util.pool = require(9);

// utility to work with the low and high bits of a 64 bit value
util.LongBits = require(38);

// global object reference
util.global = typeof window !== "undefined" && window
           || typeof global !== "undefined" && global
           || typeof self   !== "undefined" && self
           || this; // eslint-disable-line no-invalid-this

/**
 * An immuable empty array.
 * @memberof util
 * @type {Array.<*>}
 * @const
 */
util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */ []; // used on prototypes

/**
 * An immutable empty object.
 * @type {Object}
 * @const
 */
util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */ {}; // used on prototypes

/**
 * Whether running within node or not.
 * @memberof util
 * @type {boolean}
 * @const
 */
util.isNode = Boolean(util.global.process && util.global.process.versions && util.global.process.versions.node);

/**
 * Tests if the specified value is an integer.
 * @function
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is an integer
 */
util.isInteger = Number.isInteger || /* istanbul ignore next */ function isInteger(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

/**
 * Tests if the specified value is a string.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a string
 */
util.isString = function isString(value) {
    return typeof value === "string" || value instanceof String;
};

/**
 * Tests if the specified value is a non-null object.
 * @param {*} value Value to test
 * @returns {boolean} `true` if the value is a non-null object
 */
util.isObject = function isObject(value) {
    return value && typeof value === "object";
};

/**
 * Checks if a property on a message is considered to be present.
 * This is an alias of {@link util.isSet}.
 * @function
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isset =

/**
 * Checks if a property on a message is considered to be present.
 * @param {Object} obj Plain object or message instance
 * @param {string} prop Property name
 * @returns {boolean} `true` if considered to be present, otherwise `false`
 */
util.isSet = function isSet(obj, prop) {
    var value = obj[prop];
    if (value != null && obj.hasOwnProperty(prop)) // eslint-disable-line eqeqeq, no-prototype-builtins
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
    return false;
};

/**
 * Any compatible Buffer instance.
 * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
 * @interface Buffer
 * @extends Uint8Array
 */

/**
 * Node's Buffer class if available.
 * @type {Constructor<Buffer>}
 */
util.Buffer = (function() {
    try {
        var Buffer = util.inquire("buffer").Buffer;
        // refuse to use non-node buffers if not explicitly assigned (perf reasons):
        return Buffer.prototype.utf8Write ? Buffer : /* istanbul ignore next */ null;
    } catch (e) {
        /* istanbul ignore next */
        return null;
    }
})();

// Internal alias of or polyfull for Buffer.from.
util._Buffer_from = null;

// Internal alias of or polyfill for Buffer.allocUnsafe.
util._Buffer_allocUnsafe = null;

/**
 * Creates a new buffer of whatever type supported by the environment.
 * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
 * @returns {Uint8Array|Buffer} Buffer
 */
util.newBuffer = function newBuffer(sizeOrArray) {
    /* istanbul ignore next */
    return typeof sizeOrArray === "number"
        ? util.Buffer
            ? util._Buffer_allocUnsafe(sizeOrArray)
            : new util.Array(sizeOrArray)
        : util.Buffer
            ? util._Buffer_from(sizeOrArray)
            : typeof Uint8Array === "undefined"
                ? sizeOrArray
                : new Uint8Array(sizeOrArray);
};

/**
 * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
 * @type {Constructor<Uint8Array>}
 */
util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

/**
 * Any compatible Long instance.
 * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
 * @interface Long
 * @property {number} low Low bits
 * @property {number} high High bits
 * @property {boolean} unsigned Whether unsigned or not
 */

/**
 * Long.js's Long class if available.
 * @type {Constructor<Long>}
 */
util.Long = /* istanbul ignore next */ util.global.dcodeIO && /* istanbul ignore next */ util.global.dcodeIO.Long
         || /* istanbul ignore next */ util.global.Long
         || util.inquire("long");

/**
 * Regular expression used to verify 2 bit (`bool`) map keys.
 * @type {RegExp}
 * @const
 */
util.key2Re = /^true|false|0|1$/;

/**
 * Regular expression used to verify 32 bit (`int32` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;

/**
 * Regular expression used to verify 64 bit (`int64` etc.) map keys.
 * @type {RegExp}
 * @const
 */
util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;

/**
 * Converts a number or long to an 8 characters long hash string.
 * @param {Long|number} value Value to convert
 * @returns {string} Hash
 */
util.longToHash = function longToHash(value) {
    return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
};

/**
 * Converts an 8 characters long hash string to a long or number.
 * @param {string} hash Hash
 * @param {boolean} [unsigned=false] Whether unsigned or not
 * @returns {Long|number} Original value
 */
util.longFromHash = function longFromHash(hash, unsigned) {
    var bits = util.LongBits.fromHash(hash);
    if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
    return bits.toNumber(Boolean(unsigned));
};

/**
 * Merges the properties of the source object into the destination object.
 * @memberof util
 * @param {Object.<string,*>} dst Destination object
 * @param {Object.<string,*>} src Source object
 * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
 * @returns {Object.<string,*>} Destination object
 */
function merge(dst, src, ifNotSet) { // used by converters
    for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === undefined || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
    return dst;
}

util.merge = merge;

/**
 * Converts the first character of a string to lower case.
 * @param {string} str String to convert
 * @returns {string} Converted string
 */
util.lcFirst = function lcFirst(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
};

/**
 * Creates a custom error constructor.
 * @memberof util
 * @param {string} name Error name
 * @returns {Constructor<Error>} Custom error constructor
 */
function newError(name) {

    function CustomError(message, properties) {

        if (!(this instanceof CustomError))
            return new CustomError(message, properties);

        // Error.call(this, message);
        // ^ just returns a new error instance because the ctor can be called as a function

        Object.defineProperty(this, "message", { get: function() { return message; } });

        /* istanbul ignore next */
        if (Error.captureStackTrace) // node
            Error.captureStackTrace(this, CustomError);
        else
            Object.defineProperty(this, "stack", { value: (new Error()).stack || "" });

        if (properties)
            merge(this, properties);
    }

    (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

    Object.defineProperty(CustomError.prototype, "name", { get: function() { return name; } });

    CustomError.prototype.toString = function toString() {
        return this.name + ": " + this.message;
    };

    return CustomError;
}

util.newError = newError;

/**
 * Constructs a new protocol error.
 * @classdesc Error subclass indicating a protocol specifc error.
 * @memberof util
 * @extends Error
 * @template T extends Message<T>
 * @constructor
 * @param {string} message Error message
 * @param {Object.<string,*>} [properties] Additional properties
 * @example
 * try {
 *     MyMessage.decode(someBuffer); // throws if required fields are missing
 * } catch (e) {
 *     if (e instanceof ProtocolError && e.instance)
 *         console.log("decoded so far: " + JSON.stringify(e.instance));
 * }
 */
util.ProtocolError = newError("ProtocolError");

/**
 * So far decoded message instance.
 * @name util.ProtocolError#instance
 * @type {Message<T>}
 */

/**
 * A OneOf getter as returned by {@link util.oneOfGetter}.
 * @typedef OneOfGetter
 * @type {function}
 * @returns {string|undefined} Set field name, if any
 */

/**
 * Builds a getter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfGetter} Unbound getter
 */
util.oneOfGetter = function getOneOf(fieldNames) {
    var fieldMap = {};
    for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;

    /**
     * @returns {string|undefined} Set field name, if any
     * @this Object
     * @ignore
     */
    return function() { // eslint-disable-line consistent-return
        for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
            if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];
    };
};

/**
 * A OneOf setter as returned by {@link util.oneOfSetter}.
 * @typedef OneOfSetter
 * @type {function}
 * @param {string|undefined} value Field name
 * @returns {undefined}
 */

/**
 * Builds a setter for a oneof's present field name.
 * @param {string[]} fieldNames Field names
 * @returns {OneOfSetter} Unbound setter
 */
util.oneOfSetter = function setOneOf(fieldNames) {

    /**
     * @param {string} name Field name
     * @returns {undefined}
     * @this Object
     * @ignore
     */
    return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
                delete this[fieldNames[i]];
    };
};

/**
 * Default conversion options used for {@link Message#toJSON} implementations.
 *
 * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
 *
 * - Longs become strings
 * - Enums become string keys
 * - Bytes become base64 encoded strings
 * - (Sub-)Messages become plain objects
 * - Maps become plain objects with all string keys
 * - Repeated fields become arrays
 * - NaN and Infinity for float and double fields become strings
 *
 * @type {IConversionOptions}
 * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
 */
util.toJSONOptions = {
    longs: String,
    enums: String,
    bytes: String,
    json: true
};

// Sets up buffer utility according to the environment (called in index-minimal)
util._configure = function() {
    var Buffer = util.Buffer;
    /* istanbul ignore if */
    if (!Buffer) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
    }
    // because node 4.x buffers are incompatible & immutable
    // see: https://github.com/dcodeIO/protobuf.js/pull/665
    util._Buffer_from = Buffer.from !== Uint8Array.from && Buffer.from ||
        /* istanbul ignore next */
        function Buffer_from(value, encoding) {
            return new Buffer(value, encoding);
        };
    util._Buffer_allocUnsafe = Buffer.allocUnsafe ||
        /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
            return new Buffer(size);
        };
};

},{"1":1,"10":10,"2":2,"38":38,"4":4,"6":6,"7":7,"9":9}],40:[function(require,module,exports){
"use strict";
module.exports = verifier;

var Enum      = require(15),
    util      = require(37);

function invalid(field, expected) {
    return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:"+field.keyType+"}" : "") + " expected";
}

/**
 * Generates a partial value verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {number} fieldIndex Field index
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyValue(gen, field, fieldIndex, ref) {
    /* eslint-disable no-unexpected-multiline */
    if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) { gen
            ("switch(%s){", ref)
                ("default:")
                    ("return%j", invalid(field, "enum value"));
            for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) gen
                ("case %i:", field.resolvedType.values[keys[j]]);
            gen
                    ("break")
            ("}");
        } else {
            gen
            ("{")
                ("var e=types[%i].verify(%s);", fieldIndex, ref)
                ("if(e)")
                    ("return%j+e", field.name + ".")
            ("}");
        }
    } else {
        switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32": gen
                ("if(!util.isInteger(%s))", ref)
                    ("return%j", invalid(field, "integer"));
                break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64": gen
                ("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)
                    ("return%j", invalid(field, "integer|Long"));
                break;
            case "float":
            case "double": gen
                ("if(typeof %s!==\"number\")", ref)
                    ("return%j", invalid(field, "number"));
                break;
            case "bool": gen
                ("if(typeof %s!==\"boolean\")", ref)
                    ("return%j", invalid(field, "boolean"));
                break;
            case "string": gen
                ("if(!util.isString(%s))", ref)
                    ("return%j", invalid(field, "string"));
                break;
            case "bytes": gen
                ("if(!(%s&&typeof %s.length===\"number\"||util.isString(%s)))", ref, ref, ref)
                    ("return%j", invalid(field, "buffer"));
                break;
        }
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a partial key verifier.
 * @param {Codegen} gen Codegen instance
 * @param {Field} field Reflected field
 * @param {string} ref Variable reference
 * @returns {Codegen} Codegen instance
 * @ignore
 */
function genVerifyKey(gen, field, ref) {
    /* eslint-disable no-unexpected-multiline */
    switch (field.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32": gen
            ("if(!util.key32Re.test(%s))", ref)
                ("return%j", invalid(field, "integer key"));
            break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64": gen
            ("if(!util.key64Re.test(%s))", ref) // see comment above: x is ok, d is not
                ("return%j", invalid(field, "integer|Long key"));
            break;
        case "bool": gen
            ("if(!util.key2Re.test(%s))", ref)
                ("return%j", invalid(field, "boolean key"));
            break;
    }
    return gen;
    /* eslint-enable no-unexpected-multiline */
}

/**
 * Generates a verifier specific to the specified message type.
 * @param {Type} mtype Message type
 * @returns {Codegen} Codegen instance
 */
function verifier(mtype) {
    /* eslint-disable no-unexpected-multiline */

    var gen = util.codegen(["m"], mtype.name + "$verify")
    ("if(typeof m!==\"object\"||m===null)")
        ("return%j", "object expected");
    var oneofs = mtype.oneofsArray,
        seenFirstField = {};
    if (oneofs.length) gen
    ("var p={}");

    for (var i = 0; i < /* initializes */ mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
            ref   = "m" + util.safeProp(field.name);

        if (field.optional) gen
        ("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name); // !== undefined && !== null

        // map fields
        if (field.map) { gen
            ("if(!util.isObject(%s))", ref)
                ("return%j", invalid(field, "object"))
            ("var k=Object.keys(%s)", ref)
            ("for(var i=0;i<k.length;++i){");
                genVerifyKey(gen, field, "k[i]");
                genVerifyValue(gen, field, i, ref + "[k[i]]")
            ("}");

        // repeated fields
        } else if (field.repeated) { gen
            ("if(!Array.isArray(%s))", ref)
                ("return%j", invalid(field, "array"))
            ("for(var i=0;i<%s.length;++i){", ref);
                genVerifyValue(gen, field, i, ref + "[i]")
            ("}");

        // required or present fields
        } else {
            if (field.partOf) {
                var oneofProp = util.safeProp(field.partOf.name);
                if (seenFirstField[field.partOf.name] === 1) gen
            ("if(p%s===1)", oneofProp)
                ("return%j", field.partOf.name + ": multiple values");
                seenFirstField[field.partOf.name] = 1;
                gen
            ("p%s=1", oneofProp);
            }
            genVerifyValue(gen, field, i, ref);
        }
        if (field.optional) gen
        ("}");
    }
    return gen
    ("return null");
    /* eslint-enable no-unexpected-multiline */
}
},{"15":15,"37":37}],41:[function(require,module,exports){
"use strict";

/**
 * Wrappers for common types.
 * @type {Object.<string,IWrapper>}
 * @const
 */
var wrappers = exports;

var Message = require(21);

/**
 * From object converter part of an {@link IWrapper}.
 * @typedef WrapperFromObjectConverter
 * @type {function}
 * @param {Object.<string,*>} object Plain object
 * @returns {Message<{}>} Message instance
 * @this Type
 */

/**
 * To object converter part of an {@link IWrapper}.
 * @typedef WrapperToObjectConverter
 * @type {function}
 * @param {Message<{}>} message Message instance
 * @param {IConversionOptions} [options] Conversion options
 * @returns {Object.<string,*>} Plain object
 * @this Type
 */

/**
 * Common type wrapper part of {@link wrappers}.
 * @interface IWrapper
 * @property {WrapperFromObjectConverter} [fromObject] From object converter
 * @property {WrapperToObjectConverter} [toObject] To object converter
 */

// Custom wrapper for Any
wrappers[".google.protobuf.Any"] = {

    fromObject: function(object) {

        // unwrap value type if mapped
        if (object && object["@type"]) {
            var type = this.lookup(object["@type"]);
            /* istanbul ignore else */
            if (type) {
                // type_url does not accept leading "."
                var type_url = object["@type"].charAt(0) === "." ?
                    object["@type"].substr(1) : object["@type"];
                // type_url prefix is optional, but path seperator is required
                return this.create({
                    type_url: "/" + type_url,
                    value: type.encode(type.fromObject(object)).finish()
                });
            }
        }

        return this.fromObject(object);
    },

    toObject: function(message, options) {

        // decode value if requested and unmapped
        if (options && options.json && message.type_url && message.value) {
            // Only use fully qualified type name after the last '/'
            var name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            /* istanbul ignore else */
            if (type)
                message = type.decode(message.value);
        }

        // wrap value if unmapped
        if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            object["@type"] = message.$type.fullName;
            return object;
        }

        return this.toObject(message, options);
    }
};

},{"21":21}],42:[function(require,module,exports){
"use strict";
module.exports = Writer;

var util      = require(39);

var BufferWriter; // cyclic

var LongBits  = util.LongBits,
    base64    = util.base64,
    utf8      = util.utf8;

/**
 * Constructs a new writer operation instance.
 * @classdesc Scheduled writer operation.
 * @constructor
 * @param {function(*, Uint8Array, number)} fn Function to call
 * @param {number} len Value byte length
 * @param {*} val Value to write
 * @ignore
 */
function Op(fn, len, val) {

    /**
     * Function to call.
     * @type {function(Uint8Array, number, *)}
     */
    this.fn = fn;

    /**
     * Value byte length.
     * @type {number}
     */
    this.len = len;

    /**
     * Next operation.
     * @type {Writer.Op|undefined}
     */
    this.next = undefined;

    /**
     * Value to write.
     * @type {*}
     */
    this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

    /**
     * Current head.
     * @type {Writer.Op}
     */
    this.head = writer.head;

    /**
     * Current tail.
     * @type {Writer.Op}
     */
    this.tail = writer.tail;

    /**
     * Current buffer length.
     * @type {number}
     */
    this.len = writer.len;

    /**
     * Next state.
     * @type {State|null}
     */
    this.next = writer.states;
}

/**
 * Constructs a new writer instance.
 * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
 * @constructor
 */
function Writer() {

    /**
     * Current length.
     * @type {number}
     */
    this.len = 0;

    /**
     * Operations head.
     * @type {Object}
     */
    this.head = new Op(noop, 0, 0);

    /**
     * Operations tail
     * @type {Object}
     */
    this.tail = this.head;

    /**
     * Linked forked states.
     * @type {Object|null}
     */
    this.states = null;

    // When a value is written, the writer calculates its byte length and puts it into a linked
    // list of operations to perform when finish() is called. This both allows us to allocate
    // buffers of the exact required size and reduces the amount of work we have to do compared
    // to first calculating over objects and then encoding over objects. In our case, the encoding
    // part is just a linked list walk calling operations with already prepared values.
}

/**
 * Creates a new writer.
 * @function
 * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
 */
Writer.create = util.Buffer
    ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
            return new BufferWriter();
        })();
    }
    /* istanbul ignore next */
    : function create_array() {
        return new Writer();
    };

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Uint8Array} Buffer
 */
Writer.alloc = function alloc(size) {
    return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
    Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
 * Pushes a new operation to the queue.
 * @param {function(Uint8Array, number, *)} fn Function to call
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @returns {Writer} `this`
 * @private
 */
Writer.prototype._push = function push(fn, len, val) {
    this.tail = this.tail.next = new Op(fn, len, val);
    this.len += len;
    return this;
};

function writeByte(val, buf, pos) {
    buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
    while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
    }
    buf[pos] = val;
}

/**
 * Constructs a new varint writer operation instance.
 * @classdesc Scheduled varint writer operation.
 * @extends Op
 * @constructor
 * @param {number} len Value byte length
 * @param {number} val Value to write
 * @ignore
 */
function VarintOp(len, val) {
    this.len = len;
    this.next = undefined;
    this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
 * Writes an unsigned 32 bit value as a varint.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.uint32 = function write_uint32(value) {
    // here, the call to this.push has been inlined and a varint specific Op subclass is used.
    // uint32 is by far the most frequently used operation and benefits significantly from this.
    this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0)
                < 128       ? 1
        : value < 16384     ? 2
        : value < 2097152   ? 3
        : value < 268435456 ? 4
        :                     5,
    value)).len;
    return this;
};

/**
 * Writes a signed 32 bit value as a varint.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.int32 = function write_int32(value) {
    return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
        : this.uint32(value);
};

/**
 * Writes a 32 bit value as a varint, zig-zag encoded.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sint32 = function write_sint32(value) {
    return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
    while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
    }
    while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
    }
    buf[pos++] = val.lo;
}

/**
 * Writes an unsigned 64 bit value as a varint.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.uint64 = function write_uint64(value) {
    var bits = LongBits.from(value);
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a signed 64 bit value as a varint.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
 * Writes a signed 64 bit value as a varint, zig-zag encoded.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sint64 = function write_sint64(value) {
    var bits = LongBits.from(value).zzEncode();
    return this._push(writeVarint64, bits.length(), bits);
};

/**
 * Writes a boolish value as a varint.
 * @param {boolean} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.bool = function write_bool(value) {
    return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
    buf[pos    ] =  val         & 255;
    buf[pos + 1] =  val >>> 8   & 255;
    buf[pos + 2] =  val >>> 16  & 255;
    buf[pos + 3] =  val >>> 24;
}

/**
 * Writes an unsigned 32 bit value as fixed 32 bits.
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.fixed32 = function write_fixed32(value) {
    return this._push(writeFixed32, 4, value >>> 0);
};

/**
 * Writes a signed 32 bit value as fixed 32 bits.
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
 * Writes an unsigned 64 bit value as fixed 64 bits.
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.fixed64 = function write_fixed64(value) {
    var bits = LongBits.from(value);
    return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
 * Writes a signed 64 bit value as fixed 64 bits.
 * @function
 * @param {Long|number|string} value Value to write
 * @returns {Writer} `this`
 * @throws {TypeError} If `value` is a string and no long library is present.
 */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
 * Writes a float (32 bit).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.float = function write_float(value) {
    return this._push(util.float.writeFloatLE, 4, value);
};

/**
 * Writes a double (64 bit float).
 * @function
 * @param {number} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.double = function write_double(value) {
    return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set
    ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos); // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
            buf[pos + i] = val[i];
    };

/**
 * Writes a sequence of bytes.
 * @param {Uint8Array|string} value Buffer or base64 encoded string to write
 * @returns {Writer} `this`
 */
Writer.prototype.bytes = function write_bytes(value) {
    var len = value.length >>> 0;
    if (!len)
        return this._push(writeByte, 1, 0);
    if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
    }
    return this.uint32(len)._push(writeBytes, len, value);
};

/**
 * Writes a string.
 * @param {string} value Value to write
 * @returns {Writer} `this`
 */
Writer.prototype.string = function write_string(value) {
    var len = utf8.length(value);
    return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
};

/**
 * Forks this writer's state by pushing it to a stack.
 * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
 * @returns {Writer} `this`
 */
Writer.prototype.fork = function fork() {
    this.states = new State(this);
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
    return this;
};

/**
 * Resets this instance to the last state.
 * @returns {Writer} `this`
 */
Writer.prototype.reset = function reset() {
    if (this.states) {
        this.head   = this.states.head;
        this.tail   = this.states.tail;
        this.len    = this.states.len;
        this.states = this.states.next;
    } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len  = 0;
    }
    return this;
};

/**
 * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
 * @returns {Writer} `this`
 */
Writer.prototype.ldelim = function ldelim() {
    var head = this.head,
        tail = this.tail,
        len  = this.len;
    this.reset().uint32(len);
    if (len) {
        this.tail.next = head.next; // skip noop
        this.tail = tail;
        this.len += len;
    }
    return this;
};

/**
 * Finishes the write operation.
 * @returns {Uint8Array} Finished buffer
 */
Writer.prototype.finish = function finish() {
    var head = this.head.next, // skip noop
        buf  = this.constructor.alloc(this.len),
        pos  = 0;
    while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
    }
    // this.head = this.tail = null;
    return buf;
};

Writer._configure = function(BufferWriter_) {
    BufferWriter = BufferWriter_;
};

},{"39":39}],43:[function(require,module,exports){
"use strict";
module.exports = BufferWriter;

// extends Writer
var Writer = require(42);
(BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;

var util = require(39);

var Buffer = util.Buffer;

/**
 * Constructs a new buffer writer instance.
 * @classdesc Wire format writer using node buffers.
 * @extends Writer
 * @constructor
 */
function BufferWriter() {
    Writer.call(this);
}

/**
 * Allocates a buffer of the specified size.
 * @param {number} size Buffer size
 * @returns {Buffer} Buffer
 */
BufferWriter.alloc = function alloc_buffer(size) {
    return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size);
};

var writeBytesBuffer = Buffer && Buffer.prototype instanceof Uint8Array && Buffer.prototype.set.name === "set"
    ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos); // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                           // also works for plain array values
    }
    /* istanbul ignore next */
    : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy) // Buffer values
            val.copy(buf, pos, 0, val.length);
        else for (var i = 0; i < val.length;) // plain array values
            buf[pos++] = val[i++];
    };

/**
 * @override
 */
BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
    if (util.isString(value))
        value = util._Buffer_from(value, "base64");
    var len = value.length >>> 0;
    this.uint32(len);
    if (len)
        this._push(writeBytesBuffer, len, value);
    return this;
};

function writeStringBuffer(val, buf, pos) {
    if (val.length < 40) // plain js is faster for short strings (probably due to redundant assertions)
        util.utf8.write(val, buf, pos);
    else
        buf.utf8Write(val, pos);
}

/**
 * @override
 */
BufferWriter.prototype.string = function write_string_buffer(value) {
    var len = Buffer.byteLength(value);
    this.uint32(len);
    if (len)
        this._push(writeStringBuffer, len, value);
    return this;
};


/**
 * Finishes the write operation.
 * @name BufferWriter#finish
 * @function
 * @returns {Buffer} Finished buffer
 */

},{"39":39,"42":42}]},{},[19])

})();
//# sourceMappingURL=protobuf.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2), __webpack_require__(34)(module)))

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = Long;

/**
 * wasm optimizations, to do native i64 multiplication and divide
 */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11
  ])), {}).exports;
} catch (e) {
  // no wasm support :(
}

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

    /**
     * The low 32 bits as a signed value.
     * @type {number}
     */
    this.low = low | 0;

    /**
     * The high 32 bits as a signed value.
     * @type {number}
     */
    this.high = high | 0;

    /**
     * Whether unsigned or not.
     * @type {boolean}
     */
    this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 * @inner
 */
function isLong(obj) {
    return (obj && obj["__isLong__"]) === true;
}

/**
 * Tests if the specified object is a Long.
 * @function
 * @param {*} obj Object
 * @returns {boolean}
 */
Long.isLong = isLong;

/**
 * A cache of the Long representations of small integer values.
 * @type {!Object}
 * @inner
 */
var INT_CACHE = {};

/**
 * A cache of the Long representations of small unsigned integer values.
 * @type {!Object}
 * @inner
 */
var UINT_CACHE = {};

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromInt(value, unsigned) {
    var obj, cachedObj, cache;
    if (unsigned) {
        value >>>= 0;
        if (cache = (0 <= value && value < 256)) {
            cachedObj = UINT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
        if (cache)
            UINT_CACHE[value] = obj;
        return obj;
    } else {
        value |= 0;
        if (cache = (-128 <= value && value < 128)) {
            cachedObj = INT_CACHE[value];
            if (cachedObj)
                return cachedObj;
        }
        obj = fromBits(value, value < 0 ? -1 : 0, false);
        if (cache)
            INT_CACHE[value] = obj;
        return obj;
    }
}

/**
 * Returns a Long representing the given 32 bit integer value.
 * @function
 * @param {number} value The 32 bit integer in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromInt = fromInt;

/**
 * @param {number} value
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromNumber(value, unsigned) {
    if (isNaN(value))
        return unsigned ? UZERO : ZERO;
    if (unsigned) {
        if (value < 0)
            return UZERO;
        if (value >= TWO_PWR_64_DBL)
            return MAX_UNSIGNED_VALUE;
    } else {
        if (value <= -TWO_PWR_63_DBL)
            return MIN_VALUE;
        if (value + 1 >= TWO_PWR_63_DBL)
            return MAX_VALUE;
    }
    if (value < 0)
        return fromNumber(-value, unsigned).neg();
    return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
}

/**
 * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
 * @function
 * @param {number} value The number in question
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromNumber = fromNumber;

/**
 * @param {number} lowBits
 * @param {number} highBits
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromBits(lowBits, highBits, unsigned) {
    return new Long(lowBits, highBits, unsigned);
}

/**
 * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
 *  assumed to use 32 bits.
 * @function
 * @param {number} lowBits The low 32 bits
 * @param {number} highBits The high 32 bits
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long} The corresponding Long value
 */
Long.fromBits = fromBits;

/**
 * @function
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 * @inner
 */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
    if (str.length === 0)
        throw Error('empty string');
    if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
        return ZERO;
    if (typeof unsigned === 'number') {
        // For goog.math.long compatibility
        radix = unsigned,
        unsigned = false;
    } else {
        unsigned = !! unsigned;
    }
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');

    var p;
    if ((p = str.indexOf('-')) > 0)
        throw Error('interior hyphen');
    else if (p === 0) {
        return fromString(str.substring(1), unsigned, radix).neg();
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 8));

    var result = ZERO;
    for (var i = 0; i < str.length; i += 8) {
        var size = Math.min(8, str.length - i),
            value = parseInt(str.substring(i, i + size), radix);
        if (size < 8) {
            var power = fromNumber(pow_dbl(radix, size));
            result = result.mul(power).add(fromNumber(value));
        } else {
            result = result.mul(radixToPower);
            result = result.add(fromNumber(value));
        }
    }
    result.unsigned = unsigned;
    return result;
}

/**
 * Returns a Long representation of the given string, written using the specified radix.
 * @function
 * @param {string} str The textual representation of the Long
 * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
 * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
 * @returns {!Long} The corresponding Long value
 */
Long.fromString = fromString;

/**
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
 * @param {boolean=} unsigned
 * @returns {!Long}
 * @inner
 */
function fromValue(val, unsigned) {
    if (typeof val === 'number')
        return fromNumber(val, unsigned);
    if (typeof val === 'string')
        return fromString(val, unsigned);
    // Throws for non-objects, converts non-instanceof Long:
    return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
 * Converts the specified value to a Long using the appropriate from* function for its type.
 * @function
 * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {!Long}
 */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_24_DBL = 1 << 24;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
 * @type {!Long}
 * @const
 * @inner
 */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
 * @type {!Long}
 * @inner
 */
var ZERO = fromInt(0);

/**
 * Signed zero.
 * @type {!Long}
 */
Long.ZERO = ZERO;

/**
 * @type {!Long}
 * @inner
 */
var UZERO = fromInt(0, true);

/**
 * Unsigned zero.
 * @type {!Long}
 */
Long.UZERO = UZERO;

/**
 * @type {!Long}
 * @inner
 */
var ONE = fromInt(1);

/**
 * Signed one.
 * @type {!Long}
 */
Long.ONE = ONE;

/**
 * @type {!Long}
 * @inner
 */
var UONE = fromInt(1, true);

/**
 * Unsigned one.
 * @type {!Long}
 */
Long.UONE = UONE;

/**
 * @type {!Long}
 * @inner
 */
var NEG_ONE = fromInt(-1);

/**
 * Signed negative one.
 * @type {!Long}
 */
Long.NEG_ONE = NEG_ONE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

/**
 * Maximum signed value.
 * @type {!Long}
 */
Long.MAX_VALUE = MAX_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

/**
 * Maximum unsigned value.
 * @type {!Long}
 */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
 * @type {!Long}
 * @inner
 */
var MIN_VALUE = fromBits(0, 0x80000000|0, false);

/**
 * Minimum signed value.
 * @type {!Long}
 */
Long.MIN_VALUE = MIN_VALUE;

/**
 * @alias Long.prototype
 * @inner
 */
var LongPrototype = Long.prototype;

/**
 * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
 * @returns {number}
 */
LongPrototype.toInt = function toInt() {
    return this.unsigned ? this.low >>> 0 : this.low;
};

/**
 * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
 * @returns {number}
 */
LongPrototype.toNumber = function toNumber() {
    if (this.unsigned)
        return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
    return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
 * Converts the Long to a string written in the specified radix.
 * @param {number=} radix Radix (2-36), defaults to 10
 * @returns {string}
 * @override
 * @throws {RangeError} If `radix` is out of range
 */
LongPrototype.toString = function toString(radix) {
    radix = radix || 10;
    if (radix < 2 || 36 < radix)
        throw RangeError('radix');
    if (this.isZero())
        return '0';
    if (this.isNegative()) { // Unsigned Longs are never negative
        if (this.eq(MIN_VALUE)) {
            // We need to change the Long value before it can be negated, so we remove
            // the bottom-most digit in this base and then recurse to do the rest.
            var radixLong = fromNumber(radix),
                div = this.div(radixLong),
                rem1 = div.mul(radixLong).sub(this);
            return div.toString(radix) + rem1.toInt().toString(radix);
        } else
            return '-' + this.neg().toString(radix);
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
        rem = this;
    var result = '';
    while (true) {
        var remDiv = rem.div(radixToPower),
            intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
            digits = intval.toString(radix);
        rem = remDiv;
        if (rem.isZero())
            return digits + result;
        else {
            while (digits.length < 6)
                digits = '0' + digits;
            result = '' + digits + result;
        }
    }
};

/**
 * Gets the high 32 bits as a signed integer.
 * @returns {number} Signed high bits
 */
LongPrototype.getHighBits = function getHighBits() {
    return this.high;
};

/**
 * Gets the high 32 bits as an unsigned integer.
 * @returns {number} Unsigned high bits
 */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
    return this.high >>> 0;
};

/**
 * Gets the low 32 bits as a signed integer.
 * @returns {number} Signed low bits
 */
LongPrototype.getLowBits = function getLowBits() {
    return this.low;
};

/**
 * Gets the low 32 bits as an unsigned integer.
 * @returns {number} Unsigned low bits
 */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
    return this.low >>> 0;
};

/**
 * Gets the number of bits needed to represent the absolute value of this Long.
 * @returns {number}
 */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
    if (this.isNegative()) // Unsigned Longs are never negative
        return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
    var val = this.high != 0 ? this.high : this.low;
    for (var bit = 31; bit > 0; bit--)
        if ((val & (1 << bit)) != 0)
            break;
    return this.high != 0 ? bit + 33 : bit + 1;
};

/**
 * Tests if this Long's value equals zero.
 * @returns {boolean}
 */
LongPrototype.isZero = function isZero() {
    return this.high === 0 && this.low === 0;
};

/**
 * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
 * @returns {boolean}
 */
LongPrototype.eqz = LongPrototype.isZero;

/**
 * Tests if this Long's value is negative.
 * @returns {boolean}
 */
LongPrototype.isNegative = function isNegative() {
    return !this.unsigned && this.high < 0;
};

/**
 * Tests if this Long's value is positive.
 * @returns {boolean}
 */
LongPrototype.isPositive = function isPositive() {
    return this.unsigned || this.high >= 0;
};

/**
 * Tests if this Long's value is odd.
 * @returns {boolean}
 */
LongPrototype.isOdd = function isOdd() {
    return (this.low & 1) === 1;
};

/**
 * Tests if this Long's value is even.
 * @returns {boolean}
 */
LongPrototype.isEven = function isEven() {
    return (this.low & 1) === 0;
};

/**
 * Tests if this Long's value equals the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.equals = function equals(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
        return false;
    return this.high === other.high && this.low === other.low;
};

/**
 * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.eq = LongPrototype.equals;

/**
 * Tests if this Long's value differs from the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.notEquals = function notEquals(other) {
    return !this.eq(/* validates */ other);
};

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.neq = LongPrototype.notEquals;

/**
 * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ne = LongPrototype.notEquals;

/**
 * Tests if this Long's value is less than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThan = function lessThan(other) {
    return this.comp(/* validates */ other) < 0;
};

/**
 * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lt = LongPrototype.lessThan;

/**
 * Tests if this Long's value is less than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
    return this.comp(/* validates */ other) <= 0;
};

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
 * Tests if this Long's value is greater than the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThan = function greaterThan(other) {
    return this.comp(/* validates */ other) > 0;
};

/**
 * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gt = LongPrototype.greaterThan;

/**
 * Tests if this Long's value is greater than or equal the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
    return this.comp(/* validates */ other) >= 0;
};

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
 * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {boolean}
 */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
 * Compares this Long's value with the specified's.
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.compare = function compare(other) {
    if (!isLong(other))
        other = fromValue(other);
    if (this.eq(other))
        return 0;
    var thisNeg = this.isNegative(),
        otherNeg = other.isNegative();
    if (thisNeg && !otherNeg)
        return -1;
    if (!thisNeg && otherNeg)
        return 1;
    // At this point the sign bits are the same
    if (!this.unsigned)
        return this.sub(other).isNegative() ? -1 : 1;
    // Both are positive if at least one is unsigned
    return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
};

/**
 * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
 * @function
 * @param {!Long|number|string} other Other value
 * @returns {number} 0 if they are the same, 1 if the this is greater and -1
 *  if the given one is greater
 */
LongPrototype.comp = LongPrototype.compare;

/**
 * Negates this Long's value.
 * @returns {!Long} Negated Long
 */
LongPrototype.negate = function negate() {
    if (!this.unsigned && this.eq(MIN_VALUE))
        return MIN_VALUE;
    return this.not().add(ONE);
};

/**
 * Negates this Long's value. This is an alias of {@link Long#negate}.
 * @function
 * @returns {!Long} Negated Long
 */
LongPrototype.neg = LongPrototype.negate;

/**
 * Returns the sum of this and the specified Long.
 * @param {!Long|number|string} addend Addend
 * @returns {!Long} Sum
 */
LongPrototype.add = function add(addend) {
    if (!isLong(addend))
        addend = fromValue(addend);

    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = addend.high >>> 16;
    var b32 = addend.high & 0xFFFF;
    var b16 = addend.low >>> 16;
    var b00 = addend.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the difference of this and the specified Long.
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.subtract = function subtract(subtrahend) {
    if (!isLong(subtrahend))
        subtrahend = fromValue(subtrahend);
    return this.add(subtrahend.neg());
};

/**
 * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
 * @function
 * @param {!Long|number|string} subtrahend Subtrahend
 * @returns {!Long} Difference
 */
LongPrototype.sub = LongPrototype.subtract;

/**
 * Returns the product of this and the specified Long.
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.multiply = function multiply(multiplier) {
    if (this.isZero())
        return ZERO;
    if (!isLong(multiplier))
        multiplier = fromValue(multiplier);

    // use wasm support if present
    if (wasm) {
        var low = wasm.mul(this.low,
                           this.high,
                           multiplier.low,
                           multiplier.high);
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (multiplier.isZero())
        return ZERO;
    if (this.eq(MIN_VALUE))
        return multiplier.isOdd() ? MIN_VALUE : ZERO;
    if (multiplier.eq(MIN_VALUE))
        return this.isOdd() ? MIN_VALUE : ZERO;

    if (this.isNegative()) {
        if (multiplier.isNegative())
            return this.neg().mul(multiplier.neg());
        else
            return this.neg().mul(multiplier).neg();
    } else if (multiplier.isNegative())
        return this.mul(multiplier.neg()).neg();

    // If both longs are small, use float multiplication
    if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
        return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high >>> 16;
    var a32 = this.high & 0xFFFF;
    var a16 = this.low >>> 16;
    var a00 = this.low & 0xFFFF;

    var b48 = multiplier.high >>> 16;
    var b32 = multiplier.high & 0xFFFF;
    var b16 = multiplier.low >>> 16;
    var b00 = multiplier.low & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
};

/**
 * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
 * @function
 * @param {!Long|number|string} multiplier Multiplier
 * @returns {!Long} Product
 */
LongPrototype.mul = LongPrototype.multiply;

/**
 * Returns this Long divided by the specified. The result is signed if this Long is signed or
 *  unsigned if this Long is unsigned.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.divide = function divide(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);
    if (divisor.isZero())
        throw Error('division by zero');

    // use wasm support if present
    if (wasm) {
        // guard against signed division overflow: the largest
        // negative number / -1 would be 1 larger than the largest
        // positive number, due to two's complement.
        if (!this.unsigned &&
            this.high === -0x80000000 &&
            divisor.low === -1 && divisor.high === -1) {
            // be consistent with non-wasm code path
            return this;
        }
        var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    if (this.isZero())
        return this.unsigned ? UZERO : ZERO;
    var approx, rem, res;
    if (!this.unsigned) {
        // This section is only relevant for signed longs and is derived from the
        // closure library as a whole.
        if (this.eq(MIN_VALUE)) {
            if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.eq(MIN_VALUE))
                return ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shr(1);
                approx = halfThis.div(divisor).shl(1);
                if (approx.eq(ZERO)) {
                    return divisor.isNegative() ? ONE : NEG_ONE;
                } else {
                    rem = this.sub(divisor.mul(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.eq(MIN_VALUE))
            return this.unsigned ? UZERO : ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.neg().div(divisor.neg());
            return this.neg().div(divisor).neg();
        } else if (divisor.isNegative())
            return this.div(divisor.neg()).neg();
        res = ZERO;
    } else {
        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (!divisor.unsigned)
            divisor = divisor.toUnsigned();
        if (divisor.gt(this))
            return UZERO;
        if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
            return UONE;
        res = UZERO;
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    rem = this;
    while (rem.gte(divisor)) {
        // Approximate the result of division. This may be a little greater or
        // smaller than the actual value.
        approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

        // We will tweak the approximate result by changing it in the 48-th digit or
        // the smallest non-fractional digit, whichever is larger.
        var log2 = Math.ceil(Math.log(approx) / Math.LN2),
            delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

        // Decrease the approximation until it is smaller than the remainder.  Note
        // that if it is too large, the product overflows and is negative.
            approxRes = fromNumber(approx),
            approxRem = approxRes.mul(divisor);
        while (approxRem.isNegative() || approxRem.gt(rem)) {
            approx -= delta;
            approxRes = fromNumber(approx, this.unsigned);
            approxRem = approxRes.mul(divisor);
        }

        // We know the answer can't be zero... and actually, zero would cause
        // infinite recursion since we would make no progress.
        if (approxRes.isZero())
            approxRes = ONE;

        res = res.add(approxRes);
        rem = rem.sub(approxRem);
    }
    return res;
};

/**
 * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Quotient
 */
LongPrototype.div = LongPrototype.divide;

/**
 * Returns this Long modulo the specified.
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.modulo = function modulo(divisor) {
    if (!isLong(divisor))
        divisor = fromValue(divisor);

    // use wasm support if present
    if (wasm) {
        var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
            this.low,
            this.high,
            divisor.low,
            divisor.high
        );
        return fromBits(low, wasm.get_high(), this.unsigned);
    }

    return this.sub(this.div(divisor).mul(divisor));
};

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.mod = LongPrototype.modulo;

/**
 * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
 * @function
 * @param {!Long|number|string} divisor Divisor
 * @returns {!Long} Remainder
 */
LongPrototype.rem = LongPrototype.modulo;

/**
 * Returns the bitwise NOT of this Long.
 * @returns {!Long}
 */
LongPrototype.not = function not() {
    return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
 * Returns the bitwise AND of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.and = function and(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
 * Returns the bitwise OR of this Long and the specified.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.or = function or(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
 * Returns the bitwise XOR of this Long and the given one.
 * @param {!Long|number|string} other Other Long
 * @returns {!Long}
 */
LongPrototype.xor = function xor(other) {
    if (!isLong(other))
        other = fromValue(other);
    return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
    else
        return fromBits(0, this.low << (numBits - 32), this.unsigned);
};

/**
 * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRight = function shiftRight(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    if ((numBits &= 63) === 0)
        return this;
    else if (numBits < 32)
        return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
    else
        return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
 * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr = LongPrototype.shiftRight;

/**
 * Returns this Long with bits logically shifted to the right by the given amount.
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
    if (isLong(numBits))
        numBits = numBits.toInt();
    numBits &= 63;
    if (numBits === 0)
        return this;
    else {
        var high = this.high;
        if (numBits < 32) {
            var low = this.low;
            return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
        } else if (numBits === 32)
            return fromBits(high, 0, this.unsigned);
        else
            return fromBits(high >>> (numBits - 32), 0, this.unsigned);
    }
};

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
 * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
 * @function
 * @param {number|!Long} numBits Number of bits
 * @returns {!Long} Shifted Long
 */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
 * Converts this Long to signed.
 * @returns {!Long} Signed long
 */
LongPrototype.toSigned = function toSigned() {
    if (!this.unsigned)
        return this;
    return fromBits(this.low, this.high, false);
};

/**
 * Converts this Long to unsigned.
 * @returns {!Long} Unsigned long
 */
LongPrototype.toUnsigned = function toUnsigned() {
    if (this.unsigned)
        return this;
    return fromBits(this.low, this.high, true);
};

/**
 * Converts this Long to its byte representation.
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {!Array.<number>} Byte representation
 */
LongPrototype.toBytes = function toBytes(le) {
    return le ? this.toBytesLE() : this.toBytesBE();
};

/**
 * Converts this Long to its little endian byte representation.
 * @returns {!Array.<number>} Little endian byte representation
 */
LongPrototype.toBytesLE = function toBytesLE() {
    var hi = this.high,
        lo = this.low;
    return [
        lo        & 0xff,
        lo >>>  8 & 0xff,
        lo >>> 16 & 0xff,
        lo >>> 24       ,
        hi        & 0xff,
        hi >>>  8 & 0xff,
        hi >>> 16 & 0xff,
        hi >>> 24
    ];
};

/**
 * Converts this Long to its big endian byte representation.
 * @returns {!Array.<number>} Big endian byte representation
 */
LongPrototype.toBytesBE = function toBytesBE() {
    var hi = this.high,
        lo = this.low;
    return [
        hi >>> 24       ,
        hi >>> 16 & 0xff,
        hi >>>  8 & 0xff,
        hi        & 0xff,
        lo >>> 24       ,
        lo >>> 16 & 0xff,
        lo >>>  8 & 0xff,
        lo        & 0xff
    ];
};

/**
 * Creates a Long from its byte representation.
 * @param {!Array.<number>} bytes Byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @param {boolean=} le Whether little or big endian, defaults to big endian
 * @returns {Long} The corresponding Long value
 */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
    return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
 * Creates a Long from its little endian byte representation.
 * @param {!Array.<number>} bytes Little endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
    return new Long(
        bytes[0]       |
        bytes[1] <<  8 |
        bytes[2] << 16 |
        bytes[3] << 24,
        bytes[4]       |
        bytes[5] <<  8 |
        bytes[6] << 16 |
        bytes[7] << 24,
        unsigned
    );
};

/**
 * Creates a Long from its big endian byte representation.
 * @param {!Array.<number>} bytes Big endian byte representation
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @returns {Long} The corresponding Long value
 */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
    return new Long(
        bytes[4] << 24 |
        bytes[5] << 16 |
        bytes[6] <<  8 |
        bytes[7],
        bytes[0] << 24 |
        bytes[1] << 16 |
        bytes[2] <<  8 |
        bytes[3],
        unsigned
    );
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return Particle; });
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
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
    /**
     * Called for handles that are configured with both keepSynced and notifySync, when they are
     * updated with the full model of their data. This will occur once after setHandles() and any time
     * thereafter if the handle is resynchronized.
     *
     * @param handle The Handle instance that was updated.
     * @param model For Variable-backed Handles, the Entity data or null if the Variable is not set.
     *        For Collection-backed Handles, the Array of Entities, which may be empty.
     */
    async onHandleSync(handle, model) {
    }
    /**
     * Called for handles that are configued with notifyUpdate, when change events are received from
     * the backing store. For handles also configured with keepSynced these events will be correctly
     * ordered, with some potential skips if a desync occurs. For handles not configured with
     * keepSynced, all change events will be passed through as they are received.
     *
     * @param handle The Handle instance that was updated.
     * @param update An object containing one of the following fields:
     *  - data: The full Entity for a Variable-backed Handle.
     *  - oldData: The previous value of a Variable before it was updated.
     *  - added: An Array of Entities added to a Collection-backed Handle.
     *  - removed: An Array of Entities removed from a Collection-backed Handle.
     */
    // tslint:disable-next-line: no-any
    async onHandleUpdate(handle, update) {
    }
    /**
     * Called for handles that are configured with both keepSynced and notifyDesync, when they are
     * detected as being out-of-date against the backing store. For Variables, the event that triggers
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
            this._idle = new Promise(resolve => this._idleResolver = resolve);
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
    setParticleDescription(pattern) {
        return this.setDescriptionPattern('pattern', pattern);
    }
    setDescriptionPattern(connectionName, pattern) {
        const descriptions = this.handles.get('descriptions');
        if (descriptions) {
            const entityClass = descriptions.entityClass;
            if (descriptions instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Collection"] || descriptions instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["BigCollection"]) {
                descriptions.store(new entityClass({ key: connectionName, value: pattern }, this.spec.name + '-' + connectionName));
            }
            return true;
        }
        throw new Error('A particle needs a description handle to set a decription pattern');
    }
    // abstract
    renderSlot(slotName, contentTypes) { }
    renderHostedSlot(slotName, hostedSlotId, content) { }
    fireEvent(slotName, event) { }
}
//# sourceMappingURL=particle.js.map

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformLoader", function() { return PlatformLoader; });
/* harmony import */ var _loader_platform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38);
/* harmony import */ var _platform_log_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(49);
/**
 * Copyright (c) 2019 Google Inc. All rights reserved.
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
    clazz.spec = spec;
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
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformLoaderBase", function() { return PlatformLoaderBase; });
/* harmony import */ var _runtime_loader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var _runtime_particle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);
/* harmony import */ var _runtime_dom_particle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(44);
/* harmony import */ var _runtime_multiplexer_dom_particle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47);
/* harmony import */ var _runtime_transformation_dom_particle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(48);
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
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return Loader; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _platform_fetch_web_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40);
/* harmony import */ var _platform_fs_web_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41);
/* harmony import */ var _platform_vm_web_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var _converters_jsonldToManifest_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(43);
/* harmony import */ var _dom_particle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44);
/* harmony import */ var _multiplexer_dom_particle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(47);
/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(36);
/* harmony import */ var _reference_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(20);
/* harmony import */ var _transformation_dom_particle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(48);
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
        return this._loadFile(file, 'utf-8');
    }
    async loadBinary(file) {
        if (/^https?:\/\//.test(file)) {
            return Object(_platform_fetch_web_js__WEBPACK_IMPORTED_MODULE_1__["fetch"])(file).then(res => res.arrayBuffer());
        }
        else {
            return this._loadFile(file, null);
        }
    }
    async _loadFile(file, encoding) {
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
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return localFetch; });
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt
// 'export default fetch' works because 'fetch' is evaluated as an expression, which finds the
// appropriate global definition - but we don't want to use default exports.
// 'export {fetch}' doesn't work because 'fetch' is just a name in that context and is not defined.
// So we need to use an expression to find the global fetch function then map that for export.
const localFetch = fetch;

//# sourceMappingURL=fetch-web.js.map

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fs", function() { return fs; });
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

const fs = {};


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vm", function() { return vm; });
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

const vm = {};


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomParticle", function() { return DomParticle; });
/* harmony import */ var _modalities_dom_components_xen_xen_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var _dom_particle_base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(46);
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21);
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
    constructor() {
        super();
    }
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
     * Added getters and setters to support usage of .state.
     */
    get state() {
        return this._state;
    }
    set state(state) {
        this.setState(state);
    }
    get props() {
        return this._props;
    }
    /**
     * This is called once during particle setup. Override to control sync and update
     * configuration on specific handles (via their configure() method).
     * `handles` is a map from names to handle instances.
     */
    configureHandles(handles) {
        // Example: handles.get('foo').configure({keepSynced: false});
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
    /** @deprecated */
    get _views() {
        console.warn(`Particle ${this.spec.name} uses deprecated _views getter.`);
        return this.handles;
    }
    async setHandles(handles) {
        this.configureHandles(handles);
        this.handles = handles;
        this._handlesToSync = new Set();
        for (const name of this.config.handleNames) {
            const handle = handles.get(name);
            if (handle && handle.options.keepSynced && handle.options.notifySync) {
                this._handlesToSync.add(name);
            }
        }
        // TODO(sjmiles): we must invalidate at least once,
        // let's assume we will miss _handlesToProps if handlesToSync is empty
        if (!this._handlesToSync.size) {
            this._invalidate();
        }
    }
    async onHandleSync(handle, model) {
        this._handlesToSync.delete(handle.name);
        if (this._handlesToSync.size === 0) {
            await this._handlesToProps();
        }
    }
    async onHandleUpdate(handle, update) {
        // TODO(sjmiles): debounce handles updates
        // TODO(alxr) Do we need `update`?
        const work = () => {
            //console.warn(handle, update);
            this._handlesToProps();
        };
        this._debounce('handleUpdateDebounce', work, 300);
    }
    async _handlesToProps() {
        // convert handle data (array) into props (dictionary)
        const props = Object.create(null);
        // acquire list data from handles
        const { handleNames } = this.config;
        // data-acquisition is async
        await Promise.all(handleNames.map(name => this._addNamedHandleData(props, name)));
        // initialize properties
        this._setProps(props);
    }
    async _addNamedHandleData(dictionary, handleName) {
        const handle = this.handles.get(handleName);
        if (handle) {
            dictionary[handleName] = await this._getHandleData(handle);
        }
    }
    async _getHandleData(handle) {
        if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_2__["Collection"]) {
            return await handle.toList();
        }
        if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_2__["Variable"]) {
            return await handle.get();
        }
        // other types (e.g. BigCollections) map to the handle itself
        return handle;
    }
    fireEvent(slotName, { handler, data }) {
        if (this[handler]) {
            // TODO(sjmiles): remove `this._state` parameter
            this[handler]({ data }, this._state);
        }
    }
    _debounce(key, func, delay) {
        const subkey = `_debounce_${key}`;
        if (!this._state[subkey]) {
            this.startBusy();
        }
        const idleThenFunc = () => {
            this.doneBusy();
            func();
            this._state[subkey] = null;
        };
        super._debounce(key, idleThenFunc, delay);
    }
}
//# sourceMappingURL=dom-particle.js.map

/***/ }),
/* 45 */
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
    // TODO(sjmiles): fundamental dirty-checking issue here. Can be overridden to change
    // behavior, but the default implementation will use strict reference checking.
    // To modify structured values one must create a new Object with the new values.
    // See `_setImmutableState`.
    return (map[name] !== value);
    // TODO(sjmiles): an example of dirty-checking that instead simply punts on structured data
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
  _setImmutableState(name, value) {
    if (typeof name === 'object') {
      console.warn('Xen:: _setImmutableState takes name and value args for a single property, dictionaries not supported.');
      value = Object.values(name)[0];
      name = Object.names(name)[0];
    }
    if (typeof value === 'object') {
      value = Object.assign(Object.create(null), value);
    }
    this._state[name] = value;
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
    //return setTimeout(fn.bind(this), 10);
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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DomParticleBase", function() { return DomParticleBase; });
/* harmony import */ var _handle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _particle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);
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
    setParticleDescription(pattern) {
        if (typeof pattern === 'string') {
            return super.setParticleDescription(pattern);
        }
        if (pattern.template && pattern.model) {
            super.setDescriptionPattern('_template_', pattern.template);
            super.setDescriptionPattern('_model_', JSON.stringify(pattern.model));
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
        if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Variable"] || handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Collection"]) {
            handle.clear();
        }
        else {
            throw new Error('Variable/Collection required');
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
                if (!idMap[entity.id]) {
                    handle.store(entity);
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
                Promise.all(entities.map(entity => handle.store(entity)));
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
                Promise.all(rawDataArray.map(raw => handle.store(new entityClass(raw))));
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
    updateVariable(handleName, rawData) {
        const handle = this.handles.get(handleName);
        if (handle && handle.entityClass) {
            if (handle instanceof _handle_js__WEBPACK_IMPORTED_MODULE_0__["Variable"]) {
                const entityClass = handle.entityClass;
                const entity = new entityClass(rawData);
                handle.set(entity);
                return entity;
            }
            else {
                throw new Error('Variable required');
            }
        }
        return undefined;
    }
    /**
     * Modify or insert `entity` into named handle.
     * Modification is done by removing the old entity and reinserting the new one.
     */
    async updateSet(handleName, entity) {
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
     * Returns array of Entities found in BOXED data `box` that are owned by `userid`
     */
    boxQuery(box, userid) {
        return box && box.filter(item => userid === item.getUserID().split('|')[0]);
    }
}
//# sourceMappingURL=dom-particle-base.js.map

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiplexerDomParticle", function() { return MultiplexerDomParticle; });
/* harmony import */ var _platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _particle_spec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _transformation_dom_particle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48);
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
    async willReceiveProps({ list }, { arc, type, hostedParticle, otherMappedHandles, otherConnections }) {
        if (list.length > 0) {
            this.relevance = 0.1;
        }
        for (const [index, item] of this.getListEntries(list)) {
            let resolvedHostedParticle = hostedParticle;
            if (this.handleIds[item.id]) {
                const itemHandle = await this.handleIds[item.id];
                // tslint:disable-next-line: no-any
                itemHandle.set(item);
                continue;
            }
            const itemHandlePromise = arc.createHandle(type.getContainedType(), `item${index}`);
            this.handleIds[item.id] = itemHandlePromise;
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
            this._itemSubIdByHostedSlotId.set(slotId, item.id);
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
        this._setState({ renderModel: { items } });
    }
    combineHostedTemplate(slotName, hostedSlotId, content) {
        const subId = this._itemSubIdByHostedSlotId.get(hostedSlotId);
        if (!subId) {
            return;
        }
        Object(_platform_assert_web_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(content.templateName, `Template name is missing for slot '${slotName}' (hosted slot ID: '${hostedSlotId}')`);
        const templateName = { ...this._state.templateName, [subId]: `${content.templateName}` };
        this._setState({ templateName });
        if (content.template) {
            let template = content.template;
            // Append subid$={{subid}} attribute to all provided slots, to make it usable for the transformation particle.
            template = template.replace(new RegExp('slotid="[a-z]+"', 'gi'), '$& subid$="{{subId}}"');
            // Replace hosted particle connection in template with the corresponding particle connection names.
            // TODO: make this generic!
            this._connByHostedConn.forEach((conn, hostedConn) => {
                template = template.replace(new RegExp(`{{${hostedConn}.description}}`, 'g'), `{{${conn}.description}}`);
            });
            this._setState({ template: { ...this._state.template, [content.templateName]: template } });
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformationDomParticle", function() { return TransformationDomParticle; });
/* harmony import */ var _dom_particle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
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
        return propsValues ? propsValues.map(({ rawData, id }) => ({ ...rawData, subId: id })) : [];
    }
}
//# sourceMappingURL=transformation-dom-particle.js.map

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logFactory", function() { return logFactory; });
/**
 * Copyright (c) 2019 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const _factory = (preamble, color, log='log') => console[log].bind(console, `%c${preamble}`, `background: ${color || 'gray'}; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`);

// when punting, use full logging
let logLevel = 2;
// TODO(sjmiles): worker.js uses log-web, but has no Window; we need to plumb the
// global configuration into the worker.
// there should always be `window`, we are log-web; if not, use punt value above
if (typeof window !== 'undefined') {
  // use specified logLevel otherwise 0
  logLevel = ('logLevel' in window) ? window.logLevel : 0;
  console.log(`log-web: binding logFactory to level [${logLevel}]`);
}

const factory = logLevel > 0 ? _factory : () => () => {};
const logFactory = (...args) => factory(...args);


/***/ })
/******/ ]);
//# sourceMappingURL=worker.js.map