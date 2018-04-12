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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = assert;
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

function assert(test, message) {
  if (!test) {
    debugger; // eslint-disable-line no-debugger
    throw new Error(message);
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connection_constraint_js__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particle_js__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__slot_js__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__handle_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__digest_web_js__ = __webpack_require__(84);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt











class Recipe {
  constructor(name) {
    this._particles = [];
    this._handles = [];
    this._slots = [];
    this.name = name;

    // TODO: Recipes should be collections of records that are tagged
    // with a type. Strategies should register the record types they
    // can handle. ConnectionConstraints should be a different record
    // type to particles/handles.
    this._connectionConstraints = [];

    // TODO: Change to array, if needed for search strings of merged recipes.
    this._search = null;

    this._pattern = null;
  }

  newConnectionConstraint(from, fromConnection, to, toConnection) {
    this._connectionConstraints.push(new __WEBPACK_IMPORTED_MODULE_2__connection_constraint_js__["a" /* default */](from, fromConnection, to, toConnection));
  }

  removeConstraint(constraint) {
    let idx = this._connectionConstraints.indexOf(constraint);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(idx >= 0);
    this._connectionConstraints.splice(idx, 1);
  }

  clearConnectionConstraints() {
    this._connectionConstraints = [];
  }

  newParticle(name) {
    let particle = new __WEBPACK_IMPORTED_MODULE_3__particle_js__["a" /* default */](this, name);
    this._particles.push(particle);
    return particle;
  }

  removeParticle(particle) {
    let idx = this._particles.indexOf(particle);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(idx > -1);
    this._particles.splice(idx, 1);
    for (let slotConnection of Object.values(particle._consumedSlotConnections))
      slotConnection.remove();
  }

  removeSlot(slot) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot.consumeConnections.length == 0);
    let idx = this._slots.indexOf(slot);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(idx > -1);
    this._slots.splice(idx, 1);
  }

  newHandle() {
    let handle = new __WEBPACK_IMPORTED_MODULE_6__handle_js__["a" /* default */](this);
    this._handles.push(handle);
    return handle;
  }

  newSlot(name) {
    let slot = new __WEBPACK_IMPORTED_MODULE_5__slot_js__["a" /* default */](this, name);
    this._slots.push(slot);
    return slot;
  }

  isResolved() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this), 'Recipe must be normalized to be resolved.');
    return this._connectionConstraints.length == 0
        && (this._search === null || this._search.isResolved())
        && this._handles.every(handle => handle.isResolved())
        && this._particles.every(particle => particle.isResolved())
        && this._slots.every(slot => slot.isResolved())
        && this.handleConnections.every(connection => connection.isResolved())
        // Verify slot connections: all required slot connections must be resolved,
        // and for each particle their must be an at least one resolved slot connection.
        && this._particles.every(particle => {
          let connections = Object.values(particle.consumedSlotConnections);
          if (connections.length == 0) {
            return true;
          }
          return !!connections.find(connection => connection.isResolved())
              && connections.every(connection => !connection.slotSpec.isRequired || connection.isResolved());
        });
  }

  _findDuplicate(items, options) {
    let seenHandles = new Set();
    let duplicateHandle = items.find(handle => {
      if (handle.id) {
        if (seenHandles.has(handle.id)) {
          return handle;
        }
        seenHandles.add(handle.id);
      }
    });
    if (duplicateHandle && options && options.errors) {
      options.errors.set(duplicateHandle, `Has Duplicate ${duplicateHandle instanceof __WEBPACK_IMPORTED_MODULE_6__handle_js__["a" /* default */] ? 'Handle' : 'Slot'} '${duplicateHandle.id}'`);
    }
    return duplicateHandle;
  }

  _isValid(options) {
    return !this._findDuplicate(this._handles, options)
        && !this._findDuplicate(this._slots, options)
        && this._handles.every(handle => handle._isValid(options))
        && this._particles.every(particle => particle._isValid(options))
        && this._slots.every(slot => slot._isValid(options))
        && this.handleConnections.every(connection => connection._isValid(options))
        && this.slotConnections.every(connection => connection._isValid(options))
        && (!this.search || this.search.isValid(options));
  }

  get localName() { return this._localName; }
  set localName(name) { this._localName = name; }
  get particles() { return this._particles; } // Particle*
  set particles(particles) { this._particles = particles; }
  get handles() { return this._handles; } // Handle*
  set handles(handles) { this._handles = handles; }
  get slots() { return this._slots; } // Slot*
  set slots(slots) { this._slots = slots; }
  get connectionConstraints() { return this._connectionConstraints; }
  get search() { return this._search; }
  set search(search) {
    this._search = search;
  }
  setSearchPhrase(phrase) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._search, 'Cannot override search phrase');
    if (phrase) {
      this._search = new __WEBPACK_IMPORTED_MODULE_4__search_js__["a" /* default */](phrase);
    }
  }

  get slotConnections() { // SlotConnection*
    let slotConnections = [];
    this._particles.forEach(particle => {
      slotConnections.push(...Object.values(particle.consumedSlotConnections));
    });
    return slotConnections;
  }

  get handleConnections() {
    let handleConnections = [];
    this._particles.forEach(particle => {
      handleConnections.push(...Object.values(particle.connections));
      handleConnections.push(...particle._unnamedConnections);
    });
    return handleConnections;
  }

  isEmpty() {
    return this.particles.length == 0 &&
           this.handles.length == 0 &&
           this.slots.length == 0 &&
           this._connectionConstraints.length == 0;
  }

  findHandle(id) {
    for (let handle of this.handles) {
      if (handle.id == id)
        return handle;
    }
  }

  findSlot(id) {
    for (let slot of this.slots) {
      if (slot.id == id)
        return slot;
    }
  }
  get pattern() { return this._pattern; }
  set pattern(pattern) { this._pattern = pattern; }
  set description(description) {
    let pattern = description.find(desc => desc.name == 'pattern');
    if (pattern) {
      this._pattern = pattern.pattern;
    }
    description.forEach(desc => {
      if (desc.name != 'pattern') {
        let handle = this.handles.find(handle => handle.localName == desc.name);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(handle, `Cannot set description pattern for nonexistent handle ${desc.name}.`);
        handle.pattern = desc.pattern;
      }
    });
  }

  async digest() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__digest_web_js__["a" /* default */])(this.toString());
  }

  normalize(options) {
    if (Object.isFrozen(this)) {
      if (options && options.errors) {
        options.errors.set(this, 'already normalized');
      }
      return;
    }
    if (!this._isValid()) {
      this._findDuplicate(this._handles, options);
      this._findDuplicate(this._slots, options);
      let checkForInvalid = (list) => list.forEach(item => !item._isValid(options));
      checkForInvalid(this._handles);
      checkForInvalid(this._particles);
      checkForInvalid(this._slots);
      checkForInvalid(this.handleConnections);
      checkForInvalid(this.slotConnections);
      return false;
    }
    // Get handles and particles ready to sort connections.
    for (let particle of this._particles) {
      particle._startNormalize();
    }
    for (let handle of this._handles) {
      handle._startNormalize();
    }
    for (let slot of this._slots) {
      slot._startNormalize();
    }

    // Sort and normalize handle connections.
    let connections = this.handleConnections;
    for (let connection of connections) {
      connection._normalize();
    }
    connections.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);

    // Sort and normalize slot connections.
    let slotConnections = this.slotConnections;
    for (let slotConnection of slotConnections) {
      slotConnection._normalize();
    }
    slotConnections.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);

    if (this.search) {
      this.search._normalize();
    }

    // Finish normalizing particles and handles with sorted connections.
    for (let particle of this._particles) {
      particle._finishNormalize();
    }
    for (let handle of this._handles) {
      handle._finishNormalize();
    }
    for (let slot of this._slots) {
      slot._finishNormalize();
    }

    let seenHandles = new Set();
    let seenParticles = new Set();
    let seenSlots = new Set();
    let particles = [];
    let handles = [];
    let slots = [];
    // Reorder connections so that interfaces come last.
    // TODO: update handle-connection comparison method instead?
    for (let connection of connections.filter(c => !c.type || !c.type.isInterface).concat(connections.filter(c => !!c.type && !!c.type.isInterface))) {
      if (!seenParticles.has(connection.particle)) {
        particles.push(connection.particle);
        seenParticles.add(connection.particle);
      }
      if (connection.handle && !seenHandles.has(connection.handle)) {
        handles.push(connection.handle);
        seenHandles.add(connection.handle);
      }
    }

    for (let slotConnection of slotConnections) {
      if (slotConnection.targetSlot && !seenSlots.has(slotConnection.targetSlot)) {
        slots.push(slotConnection.targetSlot);
        seenSlots.add(slotConnection.targetSlot);
      }
      Object.values(slotConnection.providedSlots).forEach(ps => {
        if (!seenSlots.has(ps)) {
          slots.push(ps);
          seenSlots.add(ps);
        }
      });
    }

    let orphanedHandles = this._handles.filter(handle => !seenHandles.has(handle));
    orphanedHandles.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);
    handles.push(...orphanedHandles);

    let orphanedParticles = this._particles.filter(particle => !seenParticles.has(particle));
    orphanedParticles.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);
    particles.push(...orphanedParticles);

    let orphanedSlots = this._slots.filter(slot => !seenSlots.has(slot));
    orphanedSlots.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);
    slots.push(...orphanedSlots);

    // Put particles and handles in their final ordering.
    this._particles = particles;
    this._handles = handles;
    this._slots = slots;
    this._connectionConstraints.sort(__WEBPACK_IMPORTED_MODULE_7__util_js__["a" /* default */].compareComparables);

    Object.freeze(this._particles);
    Object.freeze(this._handles);
    Object.freeze(this._slots);
    Object.freeze(this._connectionConstraints);
    Object.freeze(this);

    return true;
  }

  clone(cloneMap) {
    // for now, just copy everything

    let recipe = new Recipe();

    if (cloneMap == undefined)
      cloneMap = new Map();

    this._copyInto(recipe, cloneMap);

    // TODO: figure out a better approach than stashing the cloneMap permanently
    // on the recipe
    recipe._cloneMap = cloneMap;

    return recipe;
  }

  mergeInto(recipe) {
    let cloneMap = new Map();
    let numHandles = recipe._handles.length;
    let numParticles = recipe._particles.length;
    let numSlots = recipe._slots.length;
    this._copyInto(recipe, cloneMap);
    return {
      handles: recipe._handles.slice(numHandles),
      particles: recipe._particles.slice(numParticles),
      slots: recipe._slots.slice(numSlots)
    };
  }

  _copyInto(recipe, cloneMap) {
    function cloneTheThing(object) {
      let clonedObject = object._copyInto(recipe, cloneMap);
      cloneMap.set(object, clonedObject);
    }

    this._handles.forEach(cloneTheThing);
    this._particles.forEach(cloneTheThing);
    this._slots.forEach(cloneTheThing);
    this._connectionConstraints.forEach(cloneTheThing);
    if (this.search) {
      this.search._copyInto(recipe);
    }
    if (this.pattern) {
      if (recipe.pattern) {
        // TODO(mmandlis): Join |this.pattern| with the pattern already existing in the recipe.
      } else {
        recipe.pattern = this.pattern;
      }
    }
  }

  updateToClone(dict) {
    let result = {};
    Object.keys(dict).forEach(key => result[key] = this._cloneMap.get(dict[key]));
    return result;
  }

  static over(results, walker, strategy) {
    return __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["a" /* Strategizer */].over(results, walker, strategy);
  }

  _makeLocalNameMap() {
    let names = new Set();
    for (let particle of this.particles) {
      names.add(particle.localName);
    }
    for (let handle of this.handles) {
      names.add(handle.localName);
    }
    for (let slot of this.slots) {
      names.add(slot.localName);
    }

    let nameMap = new Map();
    let i = 0;
    for (let particle of this.particles) {
      let localName = particle.localName;
      if (!localName) {
        do {
          localName = `particle${i++}`;
        } while (names.has(localName));
      }
      nameMap.set(particle, localName);
    }

    i = 0;
    for (let handle of this.handles) {
      let localName = handle.localName;
      if (!localName) {
        do {
          localName = `view${i++}`;
        } while (names.has(localName));
      }
      nameMap.set(handle, localName);
    }

    i = 0;
    for (let slot of this.slots) {
      let localName = slot.localName;
      if (!localName) {
        do {
          localName = `slot${i++}`;
        } while (names.has(localName));
      }
      nameMap.set(slot, localName);
    }

    return nameMap;
  }

  // TODO: Add a normalize() which strips local names and puts and nested
  //       lists into a normal ordering.
  //
  // use { showUnresolved: true } in options to see why a recipe can't resolve.
  toString(options) {
    let nameMap = this._makeLocalNameMap();
    let result = [];
    result.push(`recipe${this.name ? ' ' + this.name : ''}`);
    if (this.search) {
      result.push(this.search.toString(options).replace(/^|(\n)/g, '$1  '));
    }
    for (let constraint of this._connectionConstraints) {
      let constraintStr = constraint.toString().replace(/^|(\n)/g, '$1  ');
      if (options && options.showUnresolved) {
        constraintStr = constraintStr.concat(' // unresolved connection-constraint');
      }
      result.push(constraintStr);
    }
    for (let handle of this.handles) {
      result.push(handle.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    for (let slot of this.slots) {
      let slotString = slot.toString(nameMap, options);
      if (slotString) {
        result.push(slotString.replace(/^|(\n)/g, '$1  '));
      }
    }
    for (let particle of this.particles) {
      result.push(particle.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    if (this.pattern || this.handles.find(h => h.pattern)) {
      result.push(`  description \`${this.pattern}\``);
      this.handles.forEach(h => {
        if (h.pattern) {
          result.push(`    ${h.localName} \`${h.pattern}\``);
        }
      });
    }
    return result.join('\n');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Recipe);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt



class Strategizer {
  constructor(strategies, evaluators, {maxPopulation, generationSize, discardSize, ruleset}) {
    this._strategies = strategies;
    this._evaluators = evaluators;
    this._generation = 0;
    this._internalPopulation = [];
    this._population = [];
    this._generated = [];
    this._terminal = [];
    this._ruleset = ruleset;
    this._options = {
      maxPopulation,
      generationSize,
      discardSize,
    };
    this.populationHash = new Map();
  }
  // Latest generation number.
  get generation() {
    return this._generation;
  }
  // All individuals in the current population.
  get population() {
    return this._population;
  }
  // Individuals of the latest generation.
  get generated() {
    return this._generated;
  }
  // Individuals that were discarded in the latest generation.
  get discarded() {
    return this._discarded;
    // TODO: Do we need this?
  }
  // Individuals from the previous generation that were not decended from in the
  // current generation.
  get terminal() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._terminal);
    return this._terminal;
  }
  async generate() {
    // Generate
    let generation = this.generation + 1;
    let individualsPerStrategy = Math.floor(this._options.generationSize / this._strategies.length);
    let generated = await Promise.all(this._strategies.map(strategy => {
      let recipeFilter = recipe => this._ruleset.isAllowed(strategy, recipe);
      return strategy.generate({
        generation: this.generation,
        generated: this.generated.filter(recipeFilter),
        terminal: this.terminal.filter(recipeFilter),
        population: this.population.filter(recipeFilter),
        outputLimit: individualsPerStrategy
      });
    }));

    let record = {};
    record.generation = generation;
    record.sizeOfLastGeneration = this.generated.length;
    record.generatedDerivationsByStrategy = {};
    for (let i = 0; i < this._strategies.length; i++) {
      record.generatedDerivationsByStrategy[this._strategies[i].constructor.name] = generated[i].length;
    }

    generated = [].concat(...generated);

    // TODO: get rid of this additional asynchrony
    generated = await Promise.all(generated.map(async result => {
      if (result.hash) result.hash = await result.hash;
      return result;
    }));

    record.generatedDerivations = generated.length;
    record.nullDerivations = 0;
    record.invalidDerivations = 0;
    record.duplicateDerivations = 0;
    record.duplicateSameParentDerivations = 0;
    record.nullDerivationsByStrategy = {};
    record.invalidDerivationsByStrategy = {};
    record.duplicateDerivationsByStrategy = {};
    record.duplicateSameParentDerivationsByStrategy = {};

    generated = generated.filter(result => {
      let strategy = result.derivation[0].strategy.constructor.name;
      if (result.hash) {
        let existingResult = this.populationHash.get(result.hash);
        if (existingResult) {
          if (result.derivation[0].parent == existingResult) {
            record.nullDerivations += 1;
            if (record.nullDerivationsByStrategy[strategy] == undefined)
              record.nullDerivationsByStrategy[strategy] = 0;
            record.nullDerivationsByStrategy[strategy]++;
          } else if (existingResult.derivation.map(a => a.parent).indexOf(result.derivation[0].parent) != -1) {
            record.duplicateSameParentDerivations += 1;
            if (record.duplicateSameParentDerivationsByStrategy[strategy] == undefined)
              record.duplicateSameParentDerivationsByStrategy[strategy] = 0;
            record.duplicateSameParentDerivationsByStrategy[strategy]++;
          } else {
            record.duplicateDerivations += 1;
            if (record.duplicateDerivationsByStrategy[strategy] == undefined)
              record.duplicateDerivationsByStrategy[strategy] = 0;
            record.duplicateDerivationsByStrategy[strategy]++;
            this.populationHash.get(result.hash).derivation.push(result.derivation[0]);
          }
          return false;
        }
        this.populationHash.set(result.hash, result);
      }
      if (result.valid === false) {
        record.invalidDerivations++;
        record.invalidDerivationsByStrategy[strategy] = (record.invalidDerivationsByStrategy[strategy] || 0) + 1;
        return false;
      }
      return true;
    });

    let terminal = new Map();
    for (let candidate of this.generated) {
      terminal.set(candidate.result, candidate);
    }
    for (let result of generated) {
      for (let {parent} of result.derivation) {
        if (parent && terminal.has(parent.result)) {
          terminal.delete(parent.result);
        }
      }
    }
    terminal = [...terminal.values()];

    record.survivingDerivations = generated.length;

    generated.sort((a, b) => {
      if (a.score > b.score)
        return -1;
      if (a.score < b.score)
        return 1;
      return 0;
    });

    // Evalute
    let evaluations = await Promise.all(this._evaluators.map(strategy => {
      return strategy.evaluate(this, generated);
    }));
    let fitness = Strategizer._mergeEvaluations(evaluations, generated);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(fitness.length == generated.length);


    // Merge + Discard
    let discarded = [];
    let newGeneration = [];

    for (let i = 0; i < fitness.length; i++) {
      newGeneration.push({
        fitness: fitness[i],
        individual: generated[i],
      });
    }

    while (this._internalPopulation.length > (this._options.maxPopulation - this._options.discardSize)) {
      discarded.push(this._internalPopulation.pop().individual);
    }

    newGeneration.sort((x, y) => y.fitness - x.fitness);

    for (let i = 0; i < newGeneration.length && i < this._options.discardSize; i++) {
      if (i < this._options.discardSize) {
        this._internalPopulation.push(newGeneration[i]);
      } else {
        discarded.push(newGeneration[i].individual);
      }
    }

    // TODO: Instead of push+sort, merge `internalPopulation` with `generated`.
    this._internalPopulation.sort((x, y) => y.fitness - x.fitness);

    for (let strategy of this._strategies) {
      strategy.discard(discarded);
    }

    // Publish
    this._terminal = terminal;
    this._generation = generation;
    this._generated = generated;
    this._population = this._internalPopulation.map(x => x.individual);

    return record;
  }

  static _mergeEvaluations(evaluations, generated) {
    let n = generated.length;
    let mergedEvaluations = [];
    for (let i = 0; i < n; i++) {
      let merged = NaN;
      for (let evaluation of evaluations) {
        let fitness = evaluation[i];
        if (isNaN(fitness)) {
          continue;
        }
        if (isNaN(merged)) {
          merged = fitness;
        } else {
          // TODO: how should evaluations be combined?
          merged = (merged * i + fitness) / (i + 1);
        }
      }
      if (isNaN(merged)) {
        // TODO: What should happen when there was no evaluation?
        merged = 0.5;
      }
      mergedEvaluations.push(merged);
    }
    return mergedEvaluations;
  }

  static over(results, walker, strategy) {
    walker.onStrategy(strategy);
    results.forEach(result => {
      walker.onResult(result);
      walker.onResultDone();
    });
    walker.onStrategyDone();
    return walker.descendants;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Strategizer;


class Walker {
  constructor() {
    this.descendants = [];
  }

  onStrategy(strategy) {
    this.currentStrategy = strategy;
  }

  onResult(result) {
    this.currentResult = result;
  }

  createDescendant(result, score, hash, valid) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.currentResult, 'no current result');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.currentStrategy, 'no current strategy');
    if (this.currentResult.score)
      score += this.currentResult.score;
    this.descendants.push({
      result,
      score,
      derivation: [{parent: this.currentResult, strategy: this.currentStrategy}],
      hash,
      valid,
    });
  }

  onResultDone() {
    this.currentResult = undefined;
  }

  onStrategyDone() {
    this.currentStrategy = undefined;
  }
}

Strategizer.Walker = Walker;

// TODO: Doc call convention, incl strategies are stateful.
class Strategy {
  async activate(strategizer) {
    // Returns estimated ability to generate/evaluate.
    // TODO: What do these numbers mean? Some sort of indication of the accuracy of the
    // generated individuals and evaluations.
    return {generate: 0, evaluate: 0};
  }
  getResults(inputParams) {
    return inputParams.generated;
  }
  async generate(inputParams) {
    return [];
  }
  discard(individuals) {
  }
  async evaluate(strategizer, individuals) {
    return individuals.map(() => NaN);
  }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Strategy;


class Ruleset {
  constructor(orderingRules) {
    this._orderingRules = orderingRules;
  }

  isAllowed(strategy, recipe) {
    let forbiddenAncestors = this._orderingRules.get(strategy.constructor);
    if (!forbiddenAncestors) return true;
    // TODO: This can be sped up with AND-ing bitsets of derivation strategies and forbiddenAncestors.
    return !recipe.derivation.some(d => forbiddenAncestors.has(d.strategy.constructor));
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Ruleset;


Ruleset.Builder = class {
  constructor() {
    // Strategy -> [Strategy*]
    this._orderingRules = new Map();
  }

  /**
   * When invoked for strategies (A, B), ensures that B will never follow A in
   * the chain of derivations of all generated recipes.
   *
   * Following sequences are therefore valid: A, B, AB, AAABB, AC, DBC, CADCBCBD
   * Following sequences are therefore invalid: BA, ABA, BCA, DBCA
   *
   * Transitive closure of the ordering is computed.
   * I.e. For orderings (A, B) and (B, C), the ordering (A, C) is implied.
   *
   * Method can be called with multiple strategies at once.
   * E.g. (A, B, C) implies (A, B), (B, C) and transitively (A, C).
   *
   * Method can be called with arrays of strategies, which represent groups.
   * The ordering in the group is not enforced, but the ordering between them is.
   * E.g. ([A, B], [C, D], E) is a shorthand for:
   * (A, C), (A, D), (B, C), (B, D), (C, E), (D, E).
   */
  order(...strategiesOrGroups) {
    for (let i = 0; i < strategiesOrGroups.length - 1; i++) {
      let current = strategiesOrGroups[i], next = strategiesOrGroups[i + 1];
      for (let strategy of Array.isArray(current) ? current : [current]) {
        let set = this._orderingRules.get(strategy);
        if (!set) {
          this._orderingRules.set(strategy, set = new Set());
        }
        for (let nextStrategy of Array.isArray(next) ? next : [next]) {
          set.add(nextStrategy);
        }
      }
    }
    return this;
  }

  build() {
    // Making the ordering transitive.
    let beingExpanded = new Set();
    let alreadyExpanded = new Set();
    for (let strategy of this._orderingRules.keys()) {
      this._transitiveClosureFor(strategy, beingExpanded, alreadyExpanded);
    }
    return new Ruleset(this._orderingRules);
  }

  _transitiveClosureFor(strategy, beingExpanded, alreadyExpanded) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!beingExpanded.has(strategy), 'Detected a loop in the ordering rules');

    let followingStrategies = this._orderingRules.get(strategy);
    if (alreadyExpanded.has(strategy)) return followingStrategies || [];

    if (followingStrategies) {
      beingExpanded.add(strategy);
      for (let following of followingStrategies) {
        for (let expanded of this._transitiveClosureFor(
            following, beingExpanded, alreadyExpanded)) {
          followingStrategies.add(expanded);
        }
      }
      beingExpanded.delete(strategy);
    }
    alreadyExpanded.add(strategy);

    return followingStrategies || [];
  }
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__walker_base_js__ = __webpack_require__(89);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class Walker extends __WEBPACK_IMPORTED_MODULE_1__walker_base_js__["a" /* default */] {
  onResult(result) {
    super.onResult(result);
    let recipe = result.result;
    let updateList = [];

    // update phase - walk through recipe and call onRecipe,
    // onView, etc.

    if (this.onRecipe) {
      result = this.onRecipe(recipe, result);
      if (!this.isEmptyResult(result))
        updateList.push({continuation: result});
    }
    for (let particle of recipe.particles) {
      if (this.onParticle) {
        let result = this.onParticle(recipe, particle);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: particle});
      }
    }
    for (let handleConnection of recipe.handleConnections) {
      if (this.onHandleConnection) {
        let result = this.onHandleConnection(recipe, handleConnection);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: handleConnection});
      }
    }
    for (let view of recipe.handles) {
      if (this.onView) {
        let result = this.onView(recipe, view);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: view});
      }
    }
    for (let slotConnection of recipe.slotConnections) {
      if (this.onSlotConnection) {
        let result = this.onSlotConnection(recipe, slotConnection);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: slotConnection});
      }
    }
    for (let slot of recipe.slots) {
      if (this.onSlot) {
        let result = this.onSlot(recipe, slot);
        if (!this.isEmptyResult(result))
          updateList.push({continuation: result, context: slot});
      }
    }

    this._runUpdateList(recipe, updateList);
  }
}

Walker.Permuted = __WEBPACK_IMPORTED_MODULE_1__walker_base_js__["a" /* default */].Permuted;
Walker.Independent = __WEBPACK_IMPORTED_MODULE_1__walker_base_js__["a" /* default */].Independent;

/* harmony default export */ __webpack_exports__["a"] = (Walker);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shape_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schema_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__type_variable_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tuple_fields_js__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recipe_type_checker_js__ = __webpack_require__(10);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




function addType(name, arg) {
  let lowerName = name[0].toLowerCase() + name.substring(1);
  Object.defineProperty(Type, `new${name}`, {
    value: function(arg) {
      return new Type(name, arg);
    }});
  let upperArg = arg ? arg[0].toUpperCase() + arg.substring(1) : '';
  Object.defineProperty(Type.prototype, `${lowerName}${upperArg}`, {
    get: function() {
      if (!this[`is${name}`])
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this[`is${name}`], `{${this.tag}, ${this.data}} is not of type ${name}`);
      return this.data;
    }});
  Object.defineProperty(Type.prototype, `is${name}`, {
    get: function() {
      return this.tag == name;
    }});
}

class Type {
  constructor(tag, data) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(typeof tag == 'string');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(data);
    if (tag == 'Entity') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(data instanceof __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* default */]);
    }
    if (tag == 'SetView') {
      if (!(data instanceof Type) && data.tag && data.data) {
        data = new Type(data.tag, data.data);
      }
    }
    if (tag == 'Variable') {
      if (!(data instanceof __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* default */])) {
        data = new __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* default */](data.name, data.constraint);
      }
    }
    this.tag = tag;
    this.data = data;
  }

  static newHandle(type) {
    console.warn('Type.newView is deprecated. Please use Type.newSetView instead');
    return Type.newSetView(type);
  }

  get isView() {
    console.warn('Type.isView is deprecated. Please use Type.isSetView instead');
    return this.isSetView;
  }

  get viewType() {
    console.warn('Type.viewType is deprecated. Please use Type.setViewType isntead');
    return this.setViewType;
  }

  viewOf() {
    console.warn('Type.viewOf is deprecated. Please use Type.setViewOf instead');
    return this.setViewOf();
  }

  get manifestReferenceName() {
    console.warn('Type.manifestReferenceName is deprecated. Please use Type.manifestReference instead');
    return this.manifestReference;
  }

  get variableVariable() {
    console.warn('Type.variableVariable is deprecated. Please use Type.variable instead');
    return this.variable;
  }

  // TODO: rename SetView to Collection
  // Once everything's moved over to this, we can change the
  // underlying representation
  get isCollection() {
    return this.isSetView;
  }
  static newCollection(type) {
    return Type.newSetView(type);
  }
  collectionOf() {
    return Type.newSetView(this);
  }
  
  mergeTypeVariablesByName(variableMap) {
    if (this.isVariable) {
      let name = this.variable.name;
      let variable = variableMap.get(name);
      if (!variable) {
        variable = this;
        variableMap.set(name, this);
      } else {
        if (variable.variable.constraint || this.variable.constraint) {
          let mergedConstraint = __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* default */].maybeMergeConstraints(variable.variable, this.variable);
          if (!mergedConstraint) {
            throw new Error('could not merge type variables');
          }
          variable.variable.constraint = mergedConstraint;
        }
      }
      return variable;
    }

    if (this.isSetView) {
      let primitiveType = this.primitiveType();
      let result = primitiveType.mergeTypeVariablesByName(variableMap);
      if (result === primitiveType) {
        return this;
      }
      return result.setViewOf();
    }

    if (this.isInterface) {
      let shape = this.interfaceShape.clone();
      shape._typeVars.map(({object, field}) => object[field] = object[field].mergeTypeVariablesByName(variableMap));
      // TODO: only build a new type when a variable is modified
      return Type.newInterface(shape);
    }

    return this;
  }

  static unwrapPair(type1, type2) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(type1 instanceof Type);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(type2 instanceof Type);
    if (type1.isSetView && type2.isSetView)
      return Type.unwrapPair(type1.primitiveType(), type2.primitiveType());
    return [type1, type2];
  }


  // TODO: update call sites to use the type checker instead (since they will
  // have additional information about direction etc.)
  equals(type) {
    return __WEBPACK_IMPORTED_MODULE_5__recipe_type_checker_js__["a" /* default */].compareTypes({type: this}, {type});
  }

  _applyExistenceTypeTest(test) {
    if (this.isSetView)
      return this.primitiveType()._applyExistenceTypeTest(test);
    if (this.isInterface)
      return this.data._applyExistenceTypeTest(test);
    return test(this);
  }

  get hasVariable() {
    return this._applyExistenceTypeTest(type => type.isVariable);
  }

  get hasUnresolvedVariable() {
    return this._applyExistenceTypeTest(type => type.isVariable && !type.variable.isResolved());
  }

  get hasVariableReference() {
    return this._applyExistenceTypeTest(type => type.isVariableReference);
  }

  // TODO: remove this in favor of a renamed setViewType
  primitiveType() {
    return this.setViewType;
  }

  resolvedType() {
    if (this.isSetView) {
      let primitiveType = this.primitiveType();
      let resolvedPrimitiveType = primitiveType.resolvedType();
      return primitiveType !== resolvedPrimitiveType ? resolvedPrimitiveType.setViewOf() : this;
    }
    if (this.isVariable) {
      let resolution = this.variable.resolution;
      if (resolution)
        return resolution;
    }
    if (this.isInterface) {
      return Type.newInterface(this.data.resolvedType());
    }
    return this;
  }

  isResolved() {
    // TODO: one of these should not exist.
    return !this.hasUnresolvedVariable;
  }

  canEnsureResolved() {
    if (this.isResolved())
      return true;
    if (this.isInterface)
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `canEnsureResolved not implemented for ${this}`);
    if (this.isVariable)
      return this.variable.canEnsureResolved();
    if (this.isSetView)
      return this.primitiveType().canEnsureResolved();
    return true; 
  }

  maybeEnsureResolved() {
    if (this.isInterface)
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `maybeEnsureResolved not implemented for ${this}`);
    if (this.isVariable)
      return this.variable.maybeEnsureResolved();
    if (this.isSetView)
      return this.primitiveType().maybeEnsureResolved();
    return true;
  }

  get canWriteSuperset() {
    if (this.isVariable)
      return this.variable.canWriteSuperset;
    if (this.isEntity)
      return this;
    if (this.isInterface)
      return Type.newInterface(this.interfaceShape.canWriteSuperset);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `canWriteSuperset not implemented for ${this}`);
  }

  get canReadSubset() {
    if (this.isVariable)
      return this.variable.canReadSubset;
    if (this.isEntity)
      return this;
    if (this.isInterface)
      return Type.newInterface(this.interfaceShape.canReadSubset);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `canReadSubset not implemented for ${this}`);
  }

  isMoreSpecificThan(type) {
    if (this.tag !== type.tag)
      return false;
    if (this.isEntity)
      return this.entitySchema.isMoreSpecificThan(type.entitySchema);
    if (this.isInterface)
      return this.interfaceShape.isMoreSpecificThan(type.interfaceShape);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, 'contains not implemented for ${this}');
  }

  static _canMergeCanReadSubset(type1, type2) {
    if (type1.canReadSubset && type2.canReadSubset) {
      if (type1.canReadSubset.tag !== type2.canReadSubset.tag)
        return false;
      if (type1.canReadSubset.isEntity)
        return __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* default */].intersect(type1.canReadSubset.entitySchema, type2.canReadSubset.entitySchema) !== null;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `_canMergeCanReadSubset not implemented for types tagged with ${type1.canReadSubset.tag}`);
    }
    return true;
  }

  static _canMergeCanWriteSuperset(type1, type2) {
    if (type1.canWriteSuperset && type2.canWriteSuperset) {
      if (type1.canWriteSuperset.tag !== type2.canWriteSuperset.tag)
        return false;
      if (type1.canWriteSuperset.isEntity)
        return __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* default */].union(type1.canWriteSuperset.entitySchema, type2.canWriteSuperset.entitySchema) !== null;
      
    }
    return true;
  }

  // Tests whether two types' constraints are compatible with each other
  static canMergeConstraints(type1, type2) {
    return Type._canMergeCanReadSubset(type1, type2) && Type._canMergeCanWriteSuperset(type1, type2);
  }

  toLiteral() {
    if (this.isVariable && this.isResolved()) {
      return this.resolvedType().toLiteral();
    }
    if (this.data.toLiteral)
      return {tag: this.tag, data: this.data.toLiteral()};
    return this;
  }

  static _deliteralizer(tag) {
    switch (tag) {
      case 'Interface':
        return __WEBPACK_IMPORTED_MODULE_1__shape_js__["a" /* default */].fromLiteral;
      case 'Entity':
        return __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* default */].fromLiteral;
      case 'SetView':
        return Type.fromLiteral;
      case 'Tuple':
        return __WEBPACK_IMPORTED_MODULE_4__tuple_fields_js__["a" /* default */].fromLiteral;
      case 'Variable':
        return __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* default */].fromLiteral;
      default:
        return a => a;
    }
  }

  static fromLiteral(literal) {
    return new Type(literal.tag, Type._deliteralizer(literal.tag)(literal.data));
  }

  setViewOf() {
    return Type.newSetView(this);
  }

  // TODO: is this the same as _applyExistenceTypeTest
  hasProperty(property) {
    if (property(this))
      return true;
    if (this.isSetView)
      return this.setViewType.hasProperty(property);
    return false;
  }

  toString() {
    if (this.isSetView)
      return `[${this.primitiveType().toString()}]`;
    if (this.isEntity)
      return this.entitySchema.toInlineSchemaString();
    if (this.isInterface)
      return this.interfaceShape.name;
    if (this.isTuple)
      return this.tupleFields.toString();
    if (this.isVariableReference)
      return `~${this.data}`;
    if (this.isManifestReference)
      return this.data;
    if (this.isVariable)
      return `~${this.data.name}`;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `Add support to serializing type: ${JSON.stringify(this)}`);
  }

  getEntitySchema() {
    if (this.isSetView) {
      return this.primitiveType().getEntitySchema();
    }
    if (this.isEntity) {
      return this.entitySchema;
    }
    if (this.isVariable) {
      if (this.variable.isResolved()) {
        return this.resolvedType().getEntitySchema();
      }
    }
  }

  toPrettyString() {
    // Try extract the description from schema spec.
    let entitySchema = this.getEntitySchema();
    if (entitySchema) {
      if (this.isSetView && entitySchema.description.plural) {
        return entitySchema.description.plural;
      }
      if (this.isEntity && entitySchema.description.pattern) {
        return entitySchema.description.pattern;
      }
    }

    if (this.isRelation) {
      return JSON.stringify(this.data);
    }
    if (this.isSetView) {
      return `${this.primitiveType().toPrettyString()} List`;
    }
    if (this.isVariable)
      return this.variable.isResolved() ? this.resolvedType().toPrettyString() : `[~${this.name}]`;
    if (this.isEntity) {
      // Spit MyTypeFOO to My Type FOO
      if (this.entitySchema.name) {
        return this.entitySchema.name.replace(/([^A-Z])([A-Z])/g, '$1 $2').replace(/([A-Z][^A-Z])/g, ' $1').trim();
      } 
      return JSON.stringify(this.entitySchema._model);
    }
    if (this.isTuple)
      return this.tupleFields.toString();
    if (this.isInterface)
      return this.interfaceShape.toPrettyString();
  }
}

addType('Entity', 'schema');
addType('Variable');
addType('SetView', 'type');
addType('Relation', 'entities');
addType('Interface', 'shape');
addType('Tuple', 'fields');

/* harmony default export */ __webpack_exports__["a"] = (Type);









/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


function compareNulls(o1, o2) {
  if (o1 == o2) return 0;
  if (o1 == null) return -1;
  return 1;
}
function compareStrings(s1, s2) {
  if (s1 == null || s2 == null) return compareNulls(s1, s2);
  return s1.localeCompare(s2);
}
function compareNumbers(n1, n2) {
  if (n1 == null || n2 == null) return compareNulls(n1, n2);
  return n1 - n2;
}
function compareBools(b1, b2) {
  if (b1 == null || b2 == null) return compareNulls(b1, b2);
  return b1 - b2;
}
function compareArrays(a1, a2, compare) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(a1 != null);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(a2 != null);
  if (a1.length != a2.length) return compareNumbers(a1.length, a2.length);
  for (let i = 0; i < a1.length; i++) {
    let result;
    if ((result = compare(a1[i], a2[i])) != 0) return result;
  }
  return 0;
}
function compareObjects(o1, o2, compare) {
  let keys = Object.keys(o1);
  let result;
  if ((result = compareNumbers(keys.length, Object.keys(o2).length)) != 0) return result;
  for (let key of keys) {
    if ((result = compare(o1[key], o2[key])) != 0) return result;
  }
  return 0;
}
function compareComparables(o1, o2) {
  if (o1 == null || o2 == null) return compareNulls(o1, o2);
  return o1._compareTo(o2);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  compareNulls,
  compareStrings,
  compareNumbers,
  compareBools,
  compareArrays,
  compareObjects,
  compareComparables,
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class Shape {
  constructor(recipe, particles, handles, hcs) {
    this.recipe = recipe;
    this.particles = particles;
    this.handles = handles;
    this.reverse = new Map();
    for (let p in particles)
      this.reverse.set(particles[p], p);
    for (let h in handles)
      this.reverse.set(handles[h], h);
    for (let hc in hcs)
      this.reverse.set(hcs[hc], hc);
  }
}

class RecipeUtil {
  static makeShape(particles, handles, map, recipe) {
    recipe = recipe || new __WEBPACK_IMPORTED_MODULE_0__recipe_js__["a" /* default */]();
    let pMap = {};
    let hMap = {};
    let hcMap = {};
    particles.forEach(particle => pMap[particle] = recipe.newParticle(particle));
    handles.forEach(handle => hMap[handle] = recipe.newHandle());
    Object.keys(map).forEach(key => {
      Object.keys(map[key]).forEach(name => {
        let handle = map[key][name];
        pMap[key].addConnectionName(name).connectToHandle(hMap[handle]);
        hcMap[key + ':' + name] = pMap[key].connections[name];
      });
    });
    return new Shape(recipe, pMap, hMap, hcMap);
  }

  static recipeToShape(recipe) {
    let particles = {};
    let id = 0;
    recipe.particles.forEach(particle => particles[particle.name] = particle);
    let handles = {};
    recipe.handles.forEach(handle => handles['h' + id++] = handle);
    let hcs = {};
    recipe.handleConnections.forEach(hc => hcs[hc.particle.name + ':' + hc.name] = hc);
    return new Shape(recipe, particles, handles, hcs);
  }

  static find(recipe, shape) {

    function _buildNewHCMatches(recipe, shapeHC, match, outputList) {
      let {forward, reverse, score} = match;
      let matchFound = false;
      for (let recipeHC of recipe.handleConnections) {
        // TODO are there situations where multiple handleConnections should
        // be allowed to point to the same one in the recipe?
        if (reverse.has(recipeHC))
          continue;

        // TODO support unnamed shape particles.
        if (recipeHC.particle.name != shapeHC.particle.name)
          continue;

        if (shapeHC.name && shapeHC.name != recipeHC.name)
          continue;

        // recipeHC is a candidate for shapeHC. shapeHC references a
        // particle, so recipeHC must reference the matching particle,
        // or a particle that isn't yet mapped from shape.
        if (reverse.has(recipeHC.particle)) {
          if (reverse.get(recipeHC.particle) != shapeHC.particle)
            continue;
        } else if (forward.has(shapeHC.particle)) {
          // we've already mapped the particle referenced by shapeHC
          // and it doesn't match recipeHC's particle as recipeHC's
          // particle isn't mapped
          continue;
        }

        // shapeHC doesn't necessarily reference a handle, but if it does
        // then recipeHC needs to reference the matching handle, or one
        // that isn't yet mapped, or no handle yet.
        if (shapeHC.handle && recipeHC.handle) {
          if (reverse.has(recipeHC.handle)) {
            if (reverse.get(recipeHC.handle) != shapeHC.handle)
              continue;
          } else if (forward.has(shapeHC.handle) && forward.get(shapeHC.handle) !== null) {
            continue;
          }
          // Check whether shapeHC and recipeHC reference the same handle.
          // Note: the id of a handle with 'copy' fate changes during recipe instantiation, hence comparing to original id too.
          // Skip the check if handles have 'create' fate (their ids are arbitrary).
          if ((shapeHC.handle.fate != 'create' || (recipeHC.handle.fate != 'create' && recipeHC.handle.originalFate != 'create')) &&
              shapeHC.handle.id != recipeHC.handle.id && shapeHC.handle.id != recipeHC.handle.originalId) {
            // this is a different handle.
            continue;
          }
        }

        // clone forward and reverse mappings and establish new components.
        let newMatch = {forward: new Map(forward), reverse: new Map(reverse), score};
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(!newMatch.forward.has(shapeHC.particle) || newMatch.forward.get(shapeHC.particle) == recipeHC.particle);
        newMatch.forward.set(shapeHC.particle, recipeHC.particle);
        newMatch.reverse.set(recipeHC.particle, shapeHC.particle);
        if (shapeHC.handle) {
          if (!recipeHC.handle) {
            if (!newMatch.forward.has(shapeHC.handle)) {
              newMatch.forward.set(shapeHC.handle, null);
              newMatch.score -= 2;
            }
          } else {
            newMatch.forward.set(shapeHC.handle, recipeHC.handle);
            newMatch.reverse.set(recipeHC.handle, shapeHC.handle);
          }
        }
        newMatch.forward.set(shapeHC, recipeHC);
        newMatch.reverse.set(recipeHC, shapeHC);
        outputList.push(newMatch);
        matchFound = true;
      }
      if (matchFound == false) {
        let newMatches = [];
        _buildNewParticleMatches(recipe, shapeHC.particle, match, newMatches);
        newMatches.forEach(newMatch => {
          if (shapeHC.handle && !newMatch.forward.has(shapeHC.handle)) {
            newMatch.forward.set(shapeHC.handle, null);
            newMatch.score -= 2;
          }
          newMatch.forward.set(shapeHC, null);
          newMatch.score -= 1;
          outputList.push(newMatch);
        });
      }
    }

    function _buildNewParticleMatches(recipe, shapeParticle, match, newMatches) {
      let {forward, reverse, score} = match;
      let matchFound = false;
      for (let recipeParticle of recipe.particles) {
        if (reverse.has(recipeParticle))
          continue;

        if (recipeParticle.name != shapeParticle.name)
          continue;
        let newMatch = {forward: new Map(forward), reverse: new Map(reverse), score};
        newMatch.forward.set(shapeParticle, recipeParticle);
        newMatch.reverse.set(recipeParticle, shapeParticle);
        newMatches.push(newMatch);
        matchFound = true;
      }
      if (matchFound == false) {
        let newMatch = {forward: new Map(), reverse: new Map(), score: 0};
        forward.forEach((value, key) => newMatch.forward.set(key, value));
        reverse.forEach((value, key) => newMatch.reverse.set(key, value));
        if (!newMatch.forward.has(shapeParticle)) {
          newMatch.forward.set(shapeParticle, null);
          newMatch.score = match.score - 1;
        }
        newMatches.push(newMatch);
      }
    }

    function _assignHandlesToEmptyPosition(match, emptyHandles, nullHandles) {
      if (emptyHandles.length == 1) {
        let matches = [];
        let {forward, reverse, score} = match;
        for (let nullHandle of nullHandles) {
          let newMatch = {forward: new Map(forward), reverse: new Map(reverse), score: score + 1};
          newMatch.forward.set(nullHandle, emptyHandles[0]);
          newMatch.reverse.set(emptyHandles[0], nullHandle);
          matches.push(newMatch);
        }
        return matches;
      }
      let thisHandle = emptyHandles.pop();
      let matches = _assignHandlesToEmptyPosition(match, emptyHandles, nullHandles);
      let newMatches = [];
      for (let match of matches) {
        let nullHandles = Object.values(shape.handle).filter(handle => match.forward.get(handle) == null);
        if (nullHandles.length > 0)
          newMatches = newMatches.concat(_assignHandlesToEmptyPosition(match, [thisHandle], nullHandles));
        else
          newMatches.concat(match);
      }
      return newMatches;
    }

    // Particles and Handles are initially stored by a forward map from
    // shape component to recipe component.
    // Handle connections, particles and handles are also stored by a reverse map
    // from recipe component to shape component.

    // Start with a single, empty match
    let matches = [{forward: new Map(), reverse: new Map(), score: 0}];
    for (let shapeHC of shape.recipe.handleConnections) {
      let newMatches = [];
      for (let match of matches) {
        // collect matching handle connections into a new matches list
        _buildNewHCMatches(recipe, shapeHC, match, newMatches);
      }
      matches = newMatches;
    }

    for (let shapeParticle of shape.recipe.particles) {
      if (Object.keys(shapeParticle.connections).length > 0)
        continue;
      if (shapeParticle.unnamedConnections.length > 0)
        continue;
      let newMatches = [];
      for (let match of matches)
        _buildNewParticleMatches(recipe, shapeParticle, match, newMatches);
      matches = newMatches;
    }

    let emptyHandles = recipe.handles.filter(handle => handle.connections.length == 0);

    if (emptyHandles.length > 0) {
      let newMatches = [];
      for (let match of matches) {
        let nullHandles = Object.values(shape.handles).filter(handle => match.forward.get(handle) == null);
        if (nullHandles.length > 0)
          newMatches = newMatches.concat(_assignHandlesToEmptyPosition(match, emptyHandles, nullHandles));
        else
          newMatches.concat(match);
      }
      matches = newMatches;
    }

    return matches.map(({forward, score}) => {
      let match = {};
      forward.forEach((value, key) => match[shape.reverse.get(key)] = value);
      return {match, score};
    });
  }

  static directionCounts(handle) {
    let counts = {'in': 0, 'out': 0, 'inout': 0, 'unknown': 0};
    for (let connection of handle.connections) {
      let direction = connection.direction;
      if (counts[direction] == undefined)
        direction = 'unknown';
      counts[direction]++;
    }
    counts.in += counts.inout;
    counts.out += counts.inout;
    return counts;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RecipeUtil);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_fs_web_js__ = __webpack_require__(27);
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



let events = [];
let pid;
let now;
if (typeof document == 'object') {
  pid = 42;
  now = function() {
    let t = performance.now();
    return t;
  };
} else {
  pid = process.pid;
  now = function() {
    let t = process.hrtime();
    return t[0] * 1000000 + t[1] / 1000;
  };
}

let flowId = 0;

function parseInfo(info) {
  if (!info)
    return {};
  if (typeof info == 'function')
    return parseInfo(info());
  if (info.toTraceInfo)
    return parseInfo(info.toTraceInfo());
  return info;
}

let module = {exports: {}};
/* harmony default export */ __webpack_exports__["a"] = (module.exports);
module.exports.enabled = false;
module.exports.enable = function() {
  module.exports.enabled = true;
  init();
};

// TODO: Add back support for options.
//module.exports.options = options;
//var enabled = Boolean(options.traceFile);

function init() {
  let result = {
    wait: function(f) {
      if (f instanceof Function) {
        return f();
      }
      return f;
    },
    resume: function() {
      return this;
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
    endWrap: function(fn) {
      return fn;
    },
  };
  module.exports.wrap = function(info, fn) {
    return fn;
  };
  module.exports.start = function(info, fn) {
    return result;
  };
  module.exports.async = function(info, fn) {
    return result;
  };
  module.exports.flow = function(info, fn) {
    return result;
  };
  module.exports.dump = function() {
  };

  if (!module.exports.enabled) {
    return;
  }

  module.exports.wrap = function(info, fn) {
    return function(...args) {
      let t = module.exports.start(info);
      try {
        return fn(...args);
      } finally {
        t.end();
      }
    };
  };
  module.exports.start = function(info) {
    info = parseInfo(info);
    let args = info.args || {};
    let begin = now();
    return {
      end: function(endInfo) {
        if (endInfo && endInfo.args) {
          Object.assign(args, endInfo.args);
        }
        let end = now();
        events.push({
          ph: 'X',
          ts: begin,
          dur: end - begin,
          cat: info.cat,
          name: info.name,
          args: args,
        });
      },
    };
  };
  // TODO: perhaps this should just be the only API, it acts the same as
  //       start() when there is no call to wait/resume().
  module.exports.async = function(info) {
    let trace = module.exports.start(info);
    let flow;
    let baseInfo = {cat: info.cat, name: info.name + ' (async)'};
    let n = 0;
    return {
      async wait(v) {
        let result = await v;
        if (!flow) {
          flow = module.exports.flow(baseInfo).start();
        }
        trace.end();
        trace = null;
        return result;
      },
      resume(info) {
        if (info) {
          Object.assign(info, baseInfo);
        } else {
          info = baseInfo;
        }
        trace = module.exports.start(info);
        flow.step(baseInfo);
      },
      end(endInfo) {
        if (flow) {
          flow.end();
        }
        trace.end(endInfo);
      },
    };
  };
  module.exports.flow = function(info) {
    info = parseInfo(info);
    let id = flowId++;
    let started = false;
    return {
      start: function() {
        let begin = now();
        started = true;
        events.push({
          ph: 's',
          ts: begin,
          cat: info.cat,
          name: info.name,
          args: info.args,
          id: id,
        });
        return this;
      },
      end: function(endInfo) {
        if (!started) return;
        let end = now();
        endInfo = parseInfo(endInfo);
        events.push({
          ph: 'f',
          bp: 'e', // binding point is enclosing slice.
          ts: end,
          cat: info.cat,
          name: info.name,
          args: endInfo && endInfo.args,
          id: id,
        });
        return this;
      },
      step: function(stepInfo) {
        if (!started) return;
        let step = now();
        stepInfo = parseInfo(stepInfo);
        events.push({
          ph: 't',
          ts: step,
          cat: info.cat,
          name: info.name,
          args: stepInfo && stepInfo.args,
          id: id,
        });
        return this;
      },
    };
  };
  module.exports.save = function() {
    events.forEach(function(event) {
      event.pid = pid;
      event.tid = 0;
      if (!event.args) {
        delete event.args;
      }
      if (!event.cat) {
        event.cat = '';
      }
    });
    return {traceEvents: events};
  };
  module.exports.download = function() {
    let a = document.createElement('a');
    a.download = 'trace.json';
    a.href = 'data:text/plain;base64,' + btoa(JSON.stringify(module.exports.save()));
    a.click();
  };
}

init();

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(25)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entity_js__ = __webpack_require__(13);
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
  constructor(model) {
    let legacy = [];
    // TODO: remove this (remnants of normative/optional)
    if (model.sections) {
      legacy.push('sections');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!model.fields);
      model.fields = {};
      for (let section of model.sections) {
        Object.assign(model.fields, section.fields);
      }
      delete model.sections;
    }
    if (model.name) {
      legacy.push('name');
      model.names = [model.name];
      delete model.name;
    }
    if (model.parents) {
      legacy.push('parents');
      for (let parent of model.parents) {
        let parentSchema = new Schema(parent);
        model.names.push(...parent.names);
        Object.assign(model.fields, parent.fields);
      }
      model.names = [...new Set(model.names)];
    }
    if (legacy.length > 0) {
      console.warn(`Schema ${model.names[0] || '*'} was serialized with legacy format (${legacy.join(', ')})`, new Error());
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(model.fields);
    this._model = model;
    this.description = {};
    if (model.description) {
      model.description.description.forEach(desc => this.description[desc.name] = desc.pattern);
    }
  }

  toLiteral() {
    return this._model;
  }

  static fromLiteral(data) {
    return new Schema(data);
  }

  get fields() {
    return this._model.fields;
  }

  get names() {
    return this._model.names;
  }

  // TODO: This should only be an ident used in manifest parsing.
  get name() {
    return this.names[0];
  }

  static typesEqual(fieldType1, fieldType2) {
    // TODO: structural check instead of stringification.
    return Schema._typeString(fieldType1) == Schema._typeString(fieldType2);
  }

  static _typeString(type) {
    if (typeof(type) != 'object') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(typeof type == 'string');
      return type;
    }
    switch (type.kind) {
      case 'schema-union':
        return `(${type.types.join(' or ')})`;
      case 'schema-tuple':
        return `(${type.types.join(', ')})`;
      default:
        throw new Error(`Unknown type kind ${type.kind} in schema ${this.name}`);
    }
  }

  static union(schema1, schema2) {
    let names = [...new Set([...schema1.names, ...schema2.names])];
    let fields = {};

    for (let [field, type] of [...Object.entries(schema1.fields), ...Object.entries(schema2.fields)]) {
      if (fields[field]) {
        if (!Schema.typesEqual(fields[field], type)) {
          return null;
        }
      } else {
        fields[field] = type;
      }
    }

    return new Schema({
      names,
      fields,
    });
  }

  static intersect(schema1, schema2) {
    if (schema1.isMoreSpecificThan(schema2))
      return schema2;
    else if (schema2.isMoreSpecificThan(schema1))
      return schema1;
    
    // TODO: Don't be lazy
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, 'non-trivial intersection of schemas not implemented.');
    return null;
  }

  equals(otherSchema) {
    return this === otherSchema || (this.name == otherSchema.name
       // TODO: Check equality without calling contains.
       && this.isMoreSpecificThan(otherSchema)
       && otherSchema.isMoreSpecificThan(this));
  }

  isMoreSpecificThan(otherSchema) {
    let names = new Set(this.names);
    for (let name of otherSchema.names) {
      if (!names.has(name)) {
        return false;
      }
    }
    let fields = {};
    for (let [name, type] of Object.entries(this.fields)) {
      fields[name] = type;
    }
    for (let [name, type] of Object.entries(otherSchema.fields)) {
      if (fields[name] == undefined)
        return false;
      if (!Schema.typesEqual(fields[name], type)) {
        return false;
      }
    }
    return true;
  }

  get type() {
    return __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* default */].newEntity(this);
  }

  entityClass() {
    let schema = this;
    let className = this.name;
    let classJunk = ['toJSON', 'prototype', 'toString', 'inspect'];

    let convertToJsType = fieldType => {
      switch (fieldType) {
        case 'Text':
          return 'string';
        case 'URL':
          return 'string';
        case 'Number':
          return 'number';
        case 'Boolean':
          return 'boolean';
        case 'Object':
          return 'object';
        default:
          throw new Error(`Unknown field type ${fieldType} in schema ${className}`);
      }
    };

    const fieldTypes = this.fields;
    let validateFieldAndTypes = (op, name, value) => {
      let fieldType = fieldTypes[name];
      if (fieldType === undefined) {
        throw new Error(`Can't ${op} field ${name}; not in schema ${className}`);
      }
      if (value === undefined || value === null) {
        return;
      }

      if (typeof(fieldType) !== 'object') {
        // Primitive fields.
        if (typeof(value) !== convertToJsType(fieldType)) {
          throw new TypeError(
              `Type mismatch ${op}ting field ${name} (type ${fieldType}); ` +
              `value '${value}' is type ${typeof(value)}`);
        }
        return;
      }

      switch (fieldType.kind) {
        case 'schema-union':
          // Value must be a primitive that matches one of the union types.
          for (let innerType of fieldType.types) {
            if (typeof(value) === convertToJsType(innerType)) {
              return;
            }
          }
          throw new TypeError(
              `Type mismatch ${op}ting field ${name} (union [${fieldType.types}]); ` +
              `value '${value}' is type ${typeof(value)}`);

        case 'schema-tuple':
          // Value must be an array whose contents match each of the tuple types.
          if (!Array.isArray(value)) {
            throw new TypeError(`Cannot ${op} tuple ${name} with non-array value '${value}'`);
          }
          if (value.length != fieldType.types.length) {
            throw new TypeError(`Length mismatch ${op}ting tuple ${name} ` +
                                `[${fieldType.types}] with value '${value}'`);
          }
          fieldType.types.map((innerType, i) => {
            if (value[i] !== undefined && value[i] !== null &&
                typeof(value[i]) !== convertToJsType(innerType)) {
              throw new TypeError(
                  `Type mismatch ${op}ting field ${name} (tuple [${fieldType.types}]); ` +
                  `value '${value}' has type ${typeof(value[i])} at index ${i}`);
            }
          });
          break;

        default:
          throw new Error(`Unknown kind ${fieldType.kind} in schema ${className}`);
      }
    };

    let clazz = class extends __WEBPACK_IMPORTED_MODULE_2__entity_js__["a" /* default */] {
      constructor(data, userIDComponent) {
        super(userIDComponent);
        this.rawData = new Proxy({}, {
          get: (target, name) => {
            if (classJunk.includes(name) || name.constructor == Symbol) {
              return undefined;
            }
            let value = target[name];
            validateFieldAndTypes('get', name, value);
            return value;
          },
          set: (target, name, value) => {
            validateFieldAndTypes('set', name, value);
            target[name] = value;
            return true;
          }
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(data, `can't construct entity with null data`);
        for (let [name, value] of Object.entries(data)) {
          this.rawData[name] = value;
        }
      }

      dataClone() {
        let clone = {};
        for (let name of Object.keys(schema.fields)) {
          if (this.rawData[name] !== undefined)
            clone[name] = this.rawData[name];
        }
        return clone;
      }

      static get key() {
        return {
          tag: 'entity',
          schema: schema.toLiteral(),
        };
      }
    };

    Object.defineProperty(clazz, 'type', {value: this.type});
    Object.defineProperty(clazz, 'name', {value: this.name});
    // TODO: add query / getter functions for user properties
    for (let name of Object.keys(this.fields)) {
      Object.defineProperty(clazz.prototype, name, {
        get: function() {
          return this.rawData[name];
        },
        set: function(v) {
          this.rawData[name] = v;
        }
      });
    }
    return clazz;
  }

  toInlineSchemaString() {
    let names = (this.names || ['*']).join(' ');
    let fields = Object.entries(this.fields).map(([name, type]) => `${Schema._typeString(type)} ${name}`).join(', ');
    return `${names} {${fields}}`;
  }
  
  toManifestString() {
    let results = [];
    results.push(`schema ${this.names.join(' ')}`);
    results.push(...Object.entries(this.fields).map(([name, type]) => `  ${Schema._typeString(type)} ${name}`));
    if (Object.keys(this.description).length > 0) {
      results.push(`  description \`${this.description.pattern}\``);
      for (let name of Object.keys(this.description)) {
        if (name != 'pattern') {
          results.push(`    ${name} \`${this.description[name]}\``);
        }
      }
    }
    return results.join('\n');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Schema;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_type_checker_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shape_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__ = __webpack_require__(0);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






class ConnectionSpec {
  constructor(rawData, typeVarMap) {
    this.rawData = rawData;
    this.direction = rawData.direction;
    this.name = rawData.name;
    this.type = rawData.type.mergeTypeVariablesByName(typeVarMap);
    this.isOptional = rawData.isOptional;
  }

  get isInput() {
    // TODO: we probably don't really want host to be here.
    return this.direction == 'in' || this.direction == 'inout' || this.direction == 'host';
  }

  get isOutput() {
    return this.direction == 'out' || this.direction == 'inout';
  }

  isCompatibleType(type) {
    return __WEBPACK_IMPORTED_MODULE_1__recipe_type_checker_js__["a" /* default */].compareTypes({type}, {type: this.type, direction: this.direction});
  }
}

class SlotSpec {
  constructor(slotModel) {
    this.name = slotModel.name;
    this.isRequired = slotModel.isRequired;
    this.isSet = slotModel.isSet;
    this.tags = slotModel.tags || [];
    this.formFactor = slotModel.formFactor; // TODO: deprecate form factors?
    this.providedSlots = [];
    if (!slotModel.providedSlots)
      return;
    slotModel.providedSlots.forEach(ps => {
      this.providedSlots.push(new ProvidedSlotSpec(ps.name, ps.isSet, ps.tags, ps.formFactor, ps.handles));
    });
  }

  getProvidedSlotSpec(name) {
    return this.providedSlots.find(ps => ps.name == name);
  }
}

class ProvidedSlotSpec {
  constructor(name, isSet, tags, formFactor, handles) {
    this.name = name;
    this.isSet = isSet;
    this.tags = tags || [];
    this.formFactor = formFactor; // TODO: deprecate form factors?
    this.handles = handles || [];
  }
}

class ParticleSpec {
  constructor(model) {
    this._model = model;
    this.name = model.name;
    this.verbs = model.verbs;
    let typeVarMap = new Map();
    this.connections = model.args.map(a => new ConnectionSpec(a, typeVarMap));
    this.connectionMap = new Map();
    this.connections.forEach(a => this.connectionMap.set(a.name, a));
    this.inputs = this.connections.filter(a => a.isInput);
    this.outputs = this.connections.filter(a => a.isOutput);

    // initialize descriptions patterns.
    model.description = model.description || {};
    this.validateDescription(model.description);
    this.pattern = model.description['pattern'];
    this.connections.forEach(connectionSpec => {
      connectionSpec.pattern = model.description[connectionSpec.name];
    });

    this.implFile = model.implFile;
    this.affordance = model.affordance;
    this.slots = new Map();
    if (model.slots)
      model.slots.forEach(s => this.slots.set(s.name, new SlotSpec(s)));
    // Verify provided slots use valid view connection names.
    this.slots.forEach(slot => {
      slot.providedSlots.forEach(ps => {
        ps.handles.forEach(v => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(this.connectionMap.has(v), 'Cannot provide slot for nonexistent view constraint ', v));
      });
    });
  }

  isInput(param) {
    for (let input of this.inputs) if (input.name == param) return true;
  }

  isOutput(param) {
    for (let outputs of this.outputs) if (outputs.name == param) return true;
  }

  getSlotSpec(slotName) {
    return this.slots.get(slotName);
  }

  get primaryVerb() {
    if (this.verbs.length > 0) {
      return this.verbs[0];
    }
  }

  matchAffordance(affordance) {
    return this.slots.size <= 0 || this.affordance.includes(affordance);
  }

  toLiteral() {
    let {args, name, verbs, description, implFile, affordance, slots} = this._model;
    args = args.map(a => {
      let {type, direction, name, isOptional} = a;
      type = type.toLiteral();
      return {type, direction, name, isOptional};
    });
    return {args, name, verbs, description, implFile, affordance, slots};
  }

  static fromLiteral(literal) {
    let {args, name, verbs, description, implFile, affordance, slots} = literal;
    args = args.map(({type, direction, name, isOptional}) => ({type: __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].fromLiteral(type), direction, name, isOptional}));
    return new ParticleSpec({args, name, verbs, description, implFile, affordance, slots});
  }

  clone() {
    return ParticleSpec.fromLiteral(this.toLiteral());
  }

  equals(other) {
    return JSON.stringify(this.toLiteral()) === JSON.stringify(other.toLiteral());
  }

  validateDescription(description) {
    Object.keys(description || []).forEach(d => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(['kind', 'location', 'pattern'].includes(d) || this.connectionMap.has(d), `Unexpected description for ${d}`);
    });
  }

  toInterface() {
    return __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].newInterface(this._toShape());
  }

  _toShape() {
    const handles = this._model.args;
    // TODO: wat do?
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(!this.slots.length, 'please implement slots toShape');
    const slots = [];
    return new __WEBPACK_IMPORTED_MODULE_2__shape_js__["a" /* default */](handles, slots);
  }

  toString() {
    let results = [];
    results.push(`particle ${this.name} in '${this.implFile}'`);
    let connRes = this.connections.map(cs => `${cs.direction} ${cs.type.toString()}${cs.isOptional ? '?' : ''} ${cs.name}`);
    results.push(`  ${this.primaryVerb}(${connRes.join(', ')})`);
    this.affordance.filter(a => a != 'mock').forEach(a => results.push(`  affordance ${a}`));
    // TODO: support form factors
    this.slots.forEach(s => {
      // Consume slot.
      let consume = [];
      if (s.isRequired) {
        consume.push('must');
      }
      consume.push('consume');
      if (s.isSet) {
        consume.push('set of');
      }
      consume.push(s.name);
      if (s.tags.length > 0) {
        consume.push(s.tags.join(' '));
      }
      results.push(`  ${consume.join(' ')}`);
      if (s.formFactor) {
        results.push(`    formFactor ${s.formFactor}`);
      }
      // Provided slots.
      s.providedSlots.forEach(ps => {
        let provide = ['provide'];
        if (ps.isSet) {
          provide.push('set of');
        }
        provide.push(ps.name);
        if (ps.tags.length > 0) {
          provide.push(ps.tags.join(' '));
        }
        results.push(`    ${provide.join(' ')}`);
        if (ps.formFactor) {
          results.push(`      formFactor ${ps.formFactor}`);
        }
        ps.handles.forEach(psv => results.push(`      view ${psv}`));
      });
    });
    // Description
    if (this.pattern) {
      results.push(`  description \`${this.pattern}\``);
      this.connections.forEach(cs => {
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

/* harmony default export */ __webpack_exports__["a"] = (ParticleSpec);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_variable_js__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
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
    if (baseType == undefined)
      baseType = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].newVariable(new __WEBPACK_IMPORTED_MODULE_1__type_variable_js__["a" /* default */]('a'));

    let concreteTypes = [];

    // baseType might be a variable (and is definitely a variable if no baseType was available).
    // Some of the list might contain variables too.
    
    // First attempt to merge all the variables into the baseType
    //
    // If the baseType is a variable then this results in a single place to manipulate the constraints
    // of all the other connected variables at the same time.
    for (let item of list) {
      if (item.type.resolvedType().hasVariable) {
        baseType = TypeChecker._tryMergeTypeVariable(baseType, item.type);
        if (baseType == null)
          return null;
      } else {
        concreteTypes.push(item);
      }
    }

    for (let item of concreteTypes) {
      let success = TypeChecker._tryMergeConstraints(baseType, item);
      if (!success)
        return null;
    }

    let getResolution = candidate => {
      if (candidate.isVariable == false)
        return candidate;
      if (candidate.canReadSubset == null || candidate.canWriteSuperset == null)
        return candidate;
      if (candidate.canReadSubset.isMoreSpecificThan(candidate.canWriteSuperset)) {
        if (candidate.canWriteSuperset.isMoreSpecificThan(candidate.canReadSubset))
          candidate.variable.resolution = candidate.canReadSubset;
        return candidate;
      }  
      return null;
    };

    let candidate = baseType.resolvedType();

    if (candidate.isSetView) {
      candidate = candidate.primitiveType();
      let resolution = getResolution(candidate);
      if (resolution == null)
        return null;
      return resolution.setViewOf();
    }

    return getResolution(candidate);
  }

  static _tryMergeTypeVariable(base, onto) {
    let [primitiveBase, primitiveOnto] = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].unwrapPair(base.resolvedType(), onto.resolvedType());

    if (primitiveBase.isVariable) {
      if (primitiveOnto.isVariable) {
        // base, onto both variables.
        let result = primitiveBase.variable.maybeMergeConstraints(primitiveOnto.variable);
        if (result == false)
          return null;
        primitiveOnto.variable.resolution = primitiveBase;
      } else {
        // base variable, onto not.
        primitiveBase.variable.resolution = primitiveOnto;
      }
    } else if (primitiveOnto.isVariable) {
      // onto variable, base not.
      primitiveOnto.variable.resolution = primitiveBase;
      return onto;
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(false, 'tryMergeTypeVariable shouldn\'t be called on two types without any type variables');
    }
    
    return base;
  }

  static _tryMergeConstraints(handleType, {type, direction}) {
    let [primitiveHandleType, primitiveConnectionType] = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].unwrapPair(handleType.resolvedType(), type.resolvedType());
    if (primitiveHandleType.isVariable) {
      // if this is an undifferentiated variable then we need to create structure to match against. That's
      // allowed because this variable could represent anything, and it needs to represent this structure
      // in order for type resolution to succeed.
      if (primitiveConnectionType.isSetView) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(primitiveHandleType.variable.resolution == null && primitiveHandleType.variable.canReadSubset == null && primitiveHandleType.variable.canWriteSuperset == null);
        primitiveHandleType.variable.resolution = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].newSetView(__WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].newVariable(new __WEBPACK_IMPORTED_MODULE_1__type_variable_js__["a" /* default */]('a')));
        let unwrap = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].unwrapPair(primitiveHandleType.resolvedType(), primitiveConnectionType);
        primitiveHandleType = unwrap[0];
        primitiveConnectionType = unwrap[1];
      }

      if (direction == 'out' || direction == 'inout') {
        // the canReadSubset of the handle represents the maximal type that can be read from the
        // handle, so we need to intersect out any type that is more specific than the maximal type
        // that could be written.
        if (!primitiveHandleType.variable.maybeMergeCanReadSubset(primitiveConnectionType.canWriteSuperset))
          return false;
      }
      if (direction == 'in' || direction == 'inout') {
        // the canWriteSuperset of the handle represents the maximum lower-bound type that is read from the handle,
        // so we need to union it with the type that wants to be read here.
        if (!primitiveHandleType.variable.maybeMergeCanWriteSuperset(primitiveConnectionType.canReadSubset))
          return false;
      }
    } else {
      if (direction == 'out' || direction == 'inout')
        if (!TypeChecker._writeConstraintsApply(primitiveHandleType, primitiveConnectionType))
          return false;
      if (direction == 'in' || direction == 'inout')
        if (!TypeChecker._readConstraintsApply(primitiveHandleType, primitiveConnectionType))
          return false;
    }

    return true;
  }

  static _writeConstraintsApply(handleType, connectionType) {
    // this connection wants to write to this handle. If the written type is
    // more specific than the canReadSubset then it isn't violating the maximal type
    // that can be read.
    let writtenType = connectionType.canWriteSuperset;
    if (writtenType == null || handleType.canReadSubset == null)
      return true;
    if (writtenType.isMoreSpecificThan(handleType.canReadSubset))
      return true;
    return false;
  }

  static _readConstraintsApply(handleType, connectionType) {
    // this connection wants to read from this handle. If the read type
    // is less specific than the canWriteSuperset, then it isn't violating
    // the maximum lower-bound read type.
    let readType = connectionType.canReadSubset;
    if (readType == null|| handleType.canWriteSuperset == null)
      return true;
    if (handleType.canWriteSuperset.isMoreSpecificThan(readType))
      return true;
    return false;
  }

  // TODO: what is this? Does it still belong here?
  static restrictType(type, instance) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(type.isInterface, `restrictType not implemented for ${type}`);

    let shape = type.interfaceShape.restrictType(instance);
    if (shape == false)
      return false;
    return __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].newInterface(shape);
  }

  // Compare two types to see if they could be potentially resolved (in the absence of other
  // information). This is used as a filter when selecting compatible handles or checking 
  // validity of recipes. This function returning true never implies that full type resolution
  // will succeed, but if the function returns false for a pair of types that are associated
  // then type resolution is guaranteed to fail.
  //
  // left, right: {type, direction, connection}
  static compareTypes(left, right) {
    let resolvedLeft = left.type.resolvedType();
    let resolvedRight = right.type.resolvedType();
    let [leftType, rightType] = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].unwrapPair(resolvedLeft, resolvedRight);

    if (leftType.isVariable || rightType.isVariable) {
      // TODO: everything should use this, eventually. Need to implement the
      // right functionality in Shapes first, though.
      return __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].canMergeConstraints(leftType, rightType);
    }

    if (leftType.type != rightType.type) {
      return false;
    }

    // TODO: we need a generic way to evaluate type compatibility
    //       shapes + entities + etc
    if (leftType.isInterface && rightType.isInterface) {
      if (leftType.interfaceShape.equals(rightType.interfaceShape)) {
        return true;
      }
    }

    if (!leftType.isEntity || !rightType.isEntity) {
      return false;
    }

    let leftIsSub = leftType.entitySchema.isMoreSpecificThan(rightType.entitySchema);
    let leftIsSuper = rightType.entitySchema.isMoreSpecificThan(leftType.entitySchema);

    if (leftIsSuper && leftIsSub) {
       return true;
    }
    if (!leftIsSuper && !leftIsSub) {
      return false;
    }
    let [superclass, subclass] = leftIsSuper ? [left, right] : [right, left];

    // treat view types as if they were 'inout' connections. Note that this
    // guarantees that the view's type will be preserved, and that the fact
    // that the type comes from a view rather than a connection will also
    // be preserved.
    let superDirection = superclass.direction || (superclass.connection ? superclass.connection.direction : 'inout');
    let subDirection = subclass.direction || (subclass.connection ? subclass.connection.direction : 'inout');
    if (superDirection == 'in') {
      return true;
    }
    if (subDirection == 'out') {
      return true;
    }
    return false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TypeChecker);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__particle_spec_js__ = __webpack_require__(9);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






class Description {
  constructor(arc) {
    this._arc = arc;
    this._relevance = null;
  }
  get arc() { return this._arc; }
  get relevance() { return this._relevance; }
  set relevance(relevance) { this._relevance = relevance; }

  async getArcDescription(formatterClass) {
    let desc = await new (formatterClass || DescriptionFormatter)(this).getDescription(this._arc.activeRecipe);
    if (desc) {
      return desc;
    }
  }

  async getRecipeSuggestion(formatterClass) {
    let desc = await new (formatterClass || DescriptionFormatter)(this).getDescription(this._arc.recipes[this._arc.recipes.length - 1]);
    if (desc) {
      return desc;
    }

    return this._arc.activeRecipe.name;
  }

  async getHandleDescription(recipeHandle) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipeHandle.connections.length > 0, 'handle has no connections?');

    let formatter = new DescriptionFormatter(this);
    formatter.excludeValues = true;
    return await formatter.getHandleDescription(recipeHandle);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Description;


class DescriptionFormatter {
  constructor(description) {
    this._description = description;
    this._arc = description._arc;
    this._particleDescriptions = [];

    this.seenHandles = new Set();
    this.seenParticles = new Set();
    this.excludeValues = false;
  }

  async getDescription(recipe) {
    await this._updateDescriptionHandles(this._description);

    if (recipe.pattern) {
      let recipeDesc = await this.patternToSuggestion(recipe.pattern);
      if (recipeDesc) {
        return this._combineSelectedDescriptions([{pattern: recipeDesc}]);
      }
    }

    // Choose particles, sort them by rank and generate suggestions.
    let particlesSet = new Set(recipe.particles);
    let selectedDescriptions = this._particleDescriptions
      .filter(desc => (particlesSet.has(desc._particle) && this._isSelectedDescription(desc)));
    // Prefer particles that render UI, if any.
    if (selectedDescriptions.find(desc => (desc._particle.spec.slots.size > 0))) {
      selectedDescriptions = selectedDescriptions.filter(desc => (desc._particle.spec.slots.size > 0));
    }
    selectedDescriptions = selectedDescriptions.sort(DescriptionFormatter.sort);

    if (selectedDescriptions.length > 0) {
      return this._combineSelectedDescriptions(selectedDescriptions);
    }
  }

  _isSelectedDescription(desc) {
    return !!desc.pattern;
  }

  async getHandleDescription(recipeHandle) {
    await this._updateDescriptionHandles(this._description);

    let handleConnection = this._selectHandleConnection(recipeHandle) || recipeHandle.connections[0];
    let handle = this._arc.findHandleById(recipeHandle.id);
    return this._formatDescription(handleConnection, handle);
  }

  async _updateDescriptionHandles(description) {
    this._particleDescriptions = [];

    // Combine all particles from direct and inner arcs.
    let innerParticlesByName = {};
    description._arc.recipes.forEach(recipe => {
      let innerArcs = [...recipe.innerArcs.values()];
      innerArcs.forEach(innerArc => {
        innerArc.recipes.forEach(innerRecipe => {
          innerRecipe.particles.forEach(innerParticle => {
            if (!innerParticlesByName[innerParticle.name]) {
              innerParticlesByName[innerParticle.name] = innerParticle;
            }
          });
        });
      });
    });
    let allParticles = description.arc.activeRecipe.particles.concat(Object.values(innerParticlesByName));

    await Promise.all(allParticles.map(async particle => {
      this._particleDescriptions.push(await this._createParticleDescription(particle, description.relevance));
    }));
  }

  async _createParticleDescription(particle, relevance) {
    let pDesc = {
      _particle: particle,
      _connections: {}
    };
    if (relevance) {
      pDesc._rank = relevance.calcParticleRelevance(particle);
    }

    let descByName = await this._getPatternByNameFromDescriptionHandle(particle) || {};
    pDesc = Object.assign(pDesc, this._populateParticleDescription(particle, descByName));
    Object.values(particle.connections).forEach(handleConn => {
      let specConn = particle.spec.connectionMap.get(handleConn.name);
      let pattern = descByName[handleConn.name] || specConn.pattern;
      if (pattern) {
        let handleDescription = {pattern: pattern, _handleConn: handleConn, _handle: this._arc.findHandleById(handleConn.handle.id)};
        pDesc._connections[handleConn.name] = handleDescription;
      }
    });
    return pDesc;
  }

  async _getPatternByNameFromDescriptionHandle(particle) {
    let descriptionConn = particle.connections['descriptions'];
    if (descriptionConn && descriptionConn.handle && descriptionConn.handle.id) {
      let descHandle = this._arc.findHandleById(descriptionConn.handle.id);
      if (descHandle) {
        let descList = await descHandle.toList();
        let descByName = {};
        descList.forEach(d => descByName[d.rawData.key] = d.rawData.value);
        return descByName;
      }
    }
  }

  _populateParticleDescription(particle, descriptionByName) {
    let pattern = descriptionByName['_pattern_'] || particle.spec.pattern;
    return pattern ? {pattern} : {};
  }

  async _combineSelectedDescriptions(selectedDescriptions) {
    let suggestions = [];
    await Promise.all(selectedDescriptions.map(async particle => {
      if (!this.seenParticles.has(particle._particle)) {
        suggestions.push(await this.patternToSuggestion(particle.pattern, particle));
      }
    }));
    return this._capitalizeAndPunctuate(this._joinDescriptions(suggestions));
  }

  _joinDescriptions(strings) {
    let nonEmptyStrings = strings.filter(str => str);
    let count = nonEmptyStrings.length;
    // Combine descriptions into a sentence:
    // "A."
    // "A and b."
    // "A, b, ..., and z." (Oxford comma ftw)
    let delim = ['', '', ' and ', ', and '][Math.min(3, count)];
    const lastString = nonEmptyStrings.pop();
    return `${nonEmptyStrings.join(', ')}${delim}${lastString}`;
  }

  _joinTokens(tokens) {
    return tokens.join('');
  }

  _capitalizeAndPunctuate(sentence) {
    // "Capitalize, punctuate." (if the sentence doesn't end with a punctuation character).
    let last = sentence.length - 1;
    return `${sentence[0].toUpperCase()}${sentence.slice(1, last)}${sentence[last]}${sentence[last].match(/[a-z0-9\(\)'>\]]/i) ? '.' : ''}`;
  }

  async patternToSuggestion(pattern, particleDescription) {
    let tokens = this._initTokens(pattern, particleDescription);
    let tokenPromises = tokens.map(async token => await this.tokenToString(token));
    let tokenResults = await Promise.all(tokenPromises);
    if (tokenResults.filter(res => res == undefined).length == 0) {
      return this._joinTokens(tokenResults);
    }
  }

  _initTokens(pattern, particleDescription) {
    pattern = pattern.replace(/</g, '&lt;');
    let results = [];
    while (pattern.length > 0) {
      let tokens = pattern.match(/\${[a-zA-Z0-9\.]+}(?:\.[_a-zA-Z]+)?/g);
      let firstToken;
      let tokenIndex;
      if (tokens) {
        firstToken = tokens[0];
        tokenIndex = pattern.indexOf(firstToken);
      } else {
        firstToken = '';
        tokenIndex = pattern.length;
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(tokenIndex >= 0);
      let nextToken = pattern.substring(0, tokenIndex);
      if (nextToken.length > 0)
        results.push({text: nextToken});
      if (firstToken.length > 0) {
        results.push(this._initHandleToken(firstToken, particleDescription));
      }
      pattern = pattern.substring(tokenIndex + firstToken.length);
    }
    return results;
  }

  _initHandleToken(pattern, particleDescription) {
    let valueTokens = pattern.match(/\${([a-zA-Z0-9\.]+)}(?:\.([_a-zA-Z]+))?/);
    let handleNames = valueTokens[1].split('.');
    let extra = valueTokens.length == 3 ? valueTokens[2] : undefined;
    let valueToken;

    // Fetch the particle description by name from the value token - if it wasn't passed, this is a recipe description.
    if (!particleDescription) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(handleNames.length > 1, `'${valueTokens[1]}' must contain dot-separated particle and handle connection name.`);
      let particleName = handleNames.shift();
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particleName[0] === particleName[0].toUpperCase(), `Expected particle name, got '${particleName}' instead.`);
      let particleDescriptions = this._particleDescriptions.filter(desc => desc._particle.name == particleName);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particleDescriptions.length > 0, `Cannot find particles with name ${particleName}.`);
      if (particleDescriptions.length > 1) {
        console.warn(`Multiple particles with name ${particleName}.`);
      }
      particleDescription = particleDescriptions[0];
    }
    let particle = particleDescription._particle;

    let handleConn = particle.connections[handleNames[0]];
    if (handleConn) { // handle connection
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(handleConn.handle && handleConn.handle.id, 'Missing id???');
      return {
        fullName: valueTokens[0],
        handleName: handleConn.name,
        properties: handleNames.splice(1),
        extra,
        _handleConn: handleConn,
        _handle: this._arc.findHandleById(handleConn.handle.id)};
    }

    // slot connection
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(handleNames.length == 2, 'slot connections tokens must have 2 names');
    let providedSlotConn = particle.consumedSlotConnections[handleNames[0]].providedSlots[handleNames[1]];
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(providedSlotConn, `Could not find handle ${handleNames.join('.')}`);
    return {fullName: valueTokens[0], consumeSlotName: handleNames[0], provideSlotName: handleNames[1], extra, _providedSlotConn: providedSlotConn};
  }

  async tokenToString(token) {
    if (token.text) {
      return token.text;
    }
    if (token.handleName) {
      return this._handleTokenToString(token);
    } else if (token.consumeSlotName && token.provideSlotName) {
      return this._slotTokenToString(token);
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, 'no handle or slot name');
  }

  async _handleTokenToString(token) {
    switch (token.extra) {
      case '_type_':
        return token._handleConn.type.toPrettyString().toLowerCase();
      case '_values_':
        return this._formatHandleValue(token.handleName, token._handle);
      case '_name_':
        return this._formatDescription(token._handleConn, token._handle);
      default: {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!token.extra, `Unrecognized extra ${token.extra}`);

        // Transformation's hosted particle.
        if (token._handleConn.type.isInterface) {
          let particleSpec = __WEBPACK_IMPORTED_MODULE_2__particle_spec_js__["a" /* default */].fromLiteral(await token._handle.get());
          // TODO: call this.patternToSuggestion(...) to resolved expressions in the pattern template.
          return particleSpec.pattern;
        }

        // singleton handle property.
        if (token.properties && token.properties.length > 0) {
          return this._propertyTokenToString(token.handleName, token._handle, token.properties);
        }

        // full handle description
        let description = (await this._formatDescriptionPattern(token._handleConn)) ||
                          this._formatHandleDescription(token._handleConn, token._handle);
        let handleValue = await this._formatHandleValue(token.handleName, token._handle);
        if (!description) {
          // For singleton handle, if there is no real description (the type was used), use the plain value for description.
          if (handleValue && !token._handle.type.isSetView && !this.excludeValues) {
            return handleValue;
          }
        }

        description = description || this._formatHandleType(token._handleConn);
        if (handleValue && !this.excludeValues && !this.seenHandles.has(token._handle.id)) {
          this.seenHandles.add(token._handle.id);
          return this._combineDescriptionAndValue(token, description, handleValue);
        }
        return description;
      }
    }
  }

  _combineDescriptionAndValue(token, description, handleValue) {
    return `${description} (${handleValue})`;
  }

  async _slotTokenToString(token) {
    switch (token.extra) {
      case '_empty_':
        // TODO: also return false, if the consuming particles generate an empty description.
        return token._providedSlotConn.consumeConnections.length == 0;
      default:
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!token.extra, `Unrecognized slot extra ${token.extra}`);
    }

    let results = (await Promise.all(token._providedSlotConn.consumeConnections.map(async consumeConn => {
      let particle = consumeConn.particle;
      let particleDescription = this._particleDescriptions.find(desc => desc._particle == particle);
      this.seenParticles.add(particle);
      return this.patternToSuggestion(particle.spec.pattern, particleDescription);
    })));

    return this._joinDescriptions(results);
  }

  async _propertyTokenToString(handleName, handle, properties) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!handle.type.isSetView, `Cannot return property ${properties.join(',')} for set-view`);
    // Use singleton value's property (eg. "09/15" for person's birthday)
    let handleVar = await handle.get();
    if (handleVar) {
      let value = handleVar.rawData;
      properties.forEach(p => {
        if (value) {
          value = value[p];
        }
      });
      if (value) {
        return this._formatEntityProperty(handleName, properties, value);
      }
    }
  }

  _formatEntityProperty(handleName, properties, value) {
    return value;
  }

  async _formatHandleValue(handleName, handle) {
    if (!handle) {
      return;
    }
    if (handle.type.isSetView) {
      let handleList = await handle.toList();
      if (handleList && handleList.length > 0) {
        return this._formatSetHandle(handleName, handleList);
      }
    } else {
      let handleVar = await handle.get();
      if (handleVar) {
        return this._formatSingleton(handleName, handleVar);
      }
    }
  }

  _formatSetHandle(handleName, handleList) {
    if (handleList[0].rawData.name) {
      if (handleList.length > 2) {
        return `${handleList[0].rawData.name} plus ${handleList.length-1} other items`;
      }
      return handleList.map(v => v.rawData.name).join(', ');
    } else {
      return `${handleList.length} items`;
    }
  }

  _formatSingleton(handleName, handleVar) {
    if (handleVar.rawData.name) {
      return handleVar.rawData.name;
    }
  }

  async _formatDescription(handleConnection, handle) {
    return (await this._formatDescriptionPattern(handleConnection)) ||
           this._formatHandleDescription(handleConnection, handle) ||
           this._formatHandleType(handleConnection);
  }

  async _formatDescriptionPattern(handleConnection) {
    let chosenConnection = handleConnection;

    // For "out" connection, use its own description
    // For "in" connection, use description of the highest ranked out connection with description.
    if (!chosenConnection.spec.isOutput) {
      let otherConnection = this._selectHandleConnection(handleConnection.handle);
      if (otherConnection) {
        chosenConnection = otherConnection;
      }
    }

    let chosenParticleDescription = this._particleDescriptions.find(desc => desc._particle == chosenConnection.particle);
    let handleDescription = chosenParticleDescription ? chosenParticleDescription._connections[chosenConnection.name] : null;
    // Add description to result array.
    if (handleDescription) {
      // Add the connection spec's description pattern.
      return await this.patternToSuggestion(handleDescription.pattern, chosenParticleDescription);
    }
  }
  _formatHandleDescription(handleConn, handle) {
    if (handle) {
      let handleDescription = this._arc.getHandleDescription(handle);
      let handleType = this._formatHandleType(handleConn);
      // Use the handle description available in the arc (if it is different than type name).
      if (!!handleDescription && handleDescription != handleType) {
        return handleDescription;
      }
    }
  }
  _formatHandleType(handleConnection) {
    return handleConnection.type.toPrettyString().toLowerCase();
  }

  _selectHandleConnection(recipeHandle) {
    let possibleConnections = recipeHandle.connections.filter(connection => {
      // Choose connections with patterns (manifest-based or dynamic).
      let connectionSpec = connection.spec;
      let particleDescription = this._particleDescriptions.find(desc => desc._particle == connection.particle);
      return !!connectionSpec.pattern || !!particleDescription._connections[connection.name];
    });

    possibleConnections.sort((c1, c2) => {
      let isOutput1 = c1.spec.isOutput;
      let isOutput2 = c2.spec.isOutput;
      if (isOutput1 != isOutput2) {
        // Prefer output connections
        return isOutput1 ? -1 : 1;
      }

      let d1 = this._particleDescriptions.find(desc => desc._particle == c1.particle);
      let d2 = this._particleDescriptions.find(desc => desc._particle == c2.particle);
      // Sort by particle's rank in descending order.
      return d2._rank - d1._rank;
    });

    if (possibleConnections.length > 0) {
      return possibleConnections[0];
    }
  }

  static sort(p1, p2) {
    let isRoot = (slotSpec) => slotSpec.name == 'root' || slotSpec.tags.includes('#root');
    // Root slot comes first.
    let hasRoot1 = Boolean([...p1._particle.spec.slots.values()].find(slotSpec => isRoot(slotSpec)));
    let hasRoot2 = Boolean([...p2._particle.spec.slots.values()].find(slotSpec => isRoot(slotSpec)));
    if (hasRoot1 != hasRoot2) {
      return hasRoot1 ? -1 : 1;
    }

    // Sort by rank
    if (p1._rank != p2._rank) {
      return p2._rank - p1._rank;
    }

    // Sort by number of singleton slots.
    let p1Slots = 0, p2Slots = 0;
    p1._particle.spec.slots.forEach((slotSpec) => { if (!slotSpec.isSet) ++p1Slots; });
    p2._particle.spec.slots.forEach((slotSpec) => { if (!slotSpec.isSet) ++p2Slots; });
    return p2Slots - p1Slots;
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = DescriptionFormatter;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__build_manifest_parser_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particle_spec_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schema_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recipe_search_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shape_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__recipe_util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__storage_storage_provider_factory_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__scheduler_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__manifest_meta_js__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__recipe_type_checker_js__ = __webpack_require__(10);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */















class ManifestError extends Error {
  constructor(location, message) {
    super(message);
    this.location = location;
  }
}

// Calls `this.visit()` for each node in a manfest AST, parents before children.
class ManifestVisitor {
  traverse(ast) {
    if (['string', 'number', 'boolean'].includes(typeof ast) || ast === null) {
      return;
    }
    if (Array.isArray(ast)) {
      for (let item of ast) {
        this.traverse(item);
      }
      return;
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(ast.location, 'expected manifest node to have `location`');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(ast.kind, 'expected manifest node to have `kind`');
    let childrenVisited = false;
    let visitChildren = () => {
      if (childrenVisited) {
        return;
      }
      childrenVisited = true;
      for (let key of Object.keys(ast)) {
        if (['location', 'kind', 'model'].includes(key)) {
          continue;
        }
        this.traverse(ast[key]);
      }
    };
    this.visit(ast, visitChildren);
    visitChildren();
  }

  // Parents are visited before children, but an implementation can force
  // children to be visted by calling `visitChildren()`.
  visit(node, visitChildren) {
  }
}

class Manifest {
  constructor({id}) {
    this._recipes = [];
    this._imports = [];
    // TODO: These should be lists, possibly with a separate flattened map.
    this._particles = {};
    this._schemas = {};
    this._stores = [];
    this._shapes = [];
    this._handleTags = new Map();
    this._fileName = null;
    this._nextLocalID = 0;
    this._id = id;
    this._storageProviderFactory = undefined;
    this._scheduler = __WEBPACK_IMPORTED_MODULE_10__scheduler_js__["a" /* default */];
    this._meta = new __WEBPACK_IMPORTED_MODULE_11__manifest_meta_js__["a" /* default */]();
    this._resources = {};
    this._handleManifestUrls = new Map();
    this._warnings = [];
  }
  get id() {
    if (this._meta.name)
      return this._meta.name;
    return this._id;
  }
  get storageProviderFactory() {
    if (this._storageProviderFactory == undefined)
      this._storageProviderFactory = new __WEBPACK_IMPORTED_MODULE_9__storage_storage_provider_factory_js__["a" /* default */](this.id);
    return this._storageProviderFactory;
  }
  get recipes() {
    return [...new Set(this._findAll(manifest => manifest._recipes))];
  }

  get activeRecipe() {
    return this._recipes.find(recipe => recipe.annotation == 'active');
  }

  get particles() {
    return [...new Set(this._findAll(manifest => Object.values(manifest._particles)))];
  }
  get imports() {
    return this._imports;
  }
  get schemas() {
    return this._schemas;
  }
  get fileName() {
    return this._fileName;
  }
  get handles() {
    return this._stores;
  }
  get scheduler() {
    return this._scheduler;
  }
  get shapes() {
    return this._shapes;
  }
  get meta() {
    return this._meta;
  }
  get resources() {
    return this._resources;
  }
  applyMeta(section) {
    if (this._storageProviderFactory !== undefined)
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(section.name == this._meta.name || section.name == undefined, `can't change manifest ID after storage is constructed`);
    this._meta.apply(section);
  }
  // TODO: newParticle, Schema, etc.
  // TODO: simplify() / isValid().
  async newStore(type, name, id, tags) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!type.hasVariableReference, `handles can't have variable references`);
    let handle = await this.storageProviderFactory.construct(id, type, `in-memory://${this.id}`);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(handle._version !== null);
    handle.name = name;
    this._handleManifestUrls.set(handle.id, this.fileName);
    return this._addStore(handle, tags);
  }

  _addStore(handle, tags) {
    this._stores.push(handle);
    this._handleTags.set(handle, tags ? tags : []);
    return handle;
  }

  newStorageStub(type, name, id, storageKey, tags) {
    return this._addStore({type, id, name, storageKey}, tags);
  }

  _find(manifestFinder) {
    let result = manifestFinder(this);
    if (!result) {
      for (let importedManifest of this._imports) {
        result = importedManifest._find(manifestFinder);
        if (result) {
          break;
        }
      }
    }
    return result;
  }
  * _findAll(manifestFinder) {
    yield* manifestFinder(this);
    for (let importedManifest of this._imports) {
      yield* importedManifest._findAll(manifestFinder);
    }
  }
  findSchemaByName(name) {
    return this._find(manifest => manifest._schemas[name]);
  }
  findTypeByName(name) {
    let schema = this.findSchemaByName(name);
    if (schema)
      return __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newEntity(schema);
    let shape = this.findShapeByName(name);
    if (shape)
      return __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newInterface(shape);
    return null;
  }
  findParticleByName(name) {
    return this._find(manifest => manifest._particles[name]);
  }
  findParticlesByVerb(verb) {
    return [...this._findAll(manifest => Object.values(manifest._particles).filter(particle => particle.primaryVerb == verb))];
  }
  findStorageByName(name) {
    return this._find(manifest => manifest._stores.find(store => store.name == name));
  }
  findStorageById(id) {
    return this._find(manifest => manifest._stores.find(store => store.id == id));
  }
  findManifestUrlForHandleId(id) {
    return this._find(manifest => manifest._handleManifestUrls.get(id));
  }
  findStorageByType(type, options={}) {
    let tags = options.tags || [];
    let subtype = options.subtype || false;
    function typePredicate(store) {
      let resolvedType = type.resolvedType();
      if (!resolvedType.isResolved()) {
        return type.isCollection == store.type.isCollection;
      }

      if (subtype) {
        let [left, right] = __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].unwrapPair(store.type, resolvedType);
        if (left.isEntity && right.isEntity) {
          return left.entitySchema.isMoreSpecificThan(right.entitySchema);
        }
        return false;
      }

      return store.type.equals(type);
    }
    function tagPredicate(manifest, handle) {
      return tags.filter(tag => !manifest._handleTags.get(handle).includes(tag)).length == 0;
    }
    return [...this._findAll(manifest => manifest._stores.filter(store => typePredicate(store) && tagPredicate(manifest, store)))];
  }
  findShapeByName(name) {
    return this._find(manifest => manifest._shapes.find(shape => shape.name == name));
  }
  findRecipesByVerb(verb) {
    return [...this._findAll(manifest => manifest._recipes.filter(recipe => recipe.name == verb))];
  }
  generateID() {
    return `${this.id}:${this._nextLocalID++}`;
  }
  static async load(fileName, loader, options) {
    options = options || {};
    let {registry, id} = options;
    registry = registry || {};
    if (registry && registry[fileName]) {
      return await registry[fileName];
    }
    registry[fileName] = (async () => {
      let content = await loader.loadResource(fileName);
      // TODO: When does this happen? The loader should probably throw an exception here.
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(content !== undefined, `${fileName} unable to be loaded by Manifest parser`);
      return await Manifest.parse(content, {
        id,
        fileName,
        loader,
        registry,
        position: {line: 1, column: 0}
      });
    })();
    return await registry[fileName];
  }

  static async parse(content, options) {
    options = options || {};
    let {id, fileName, position, loader, registry} = options;
    registry = registry || {};
    position = position || {line: 1, column: 0};
    id = `manifest:${fileName}:`;

    function dumpWarnings(manifest) {
      for (let warning of manifest._warnings) {
        // TODO: make a decision as to whether we should be logging these here, or if it should
        //       be a responsibility of the caller.
        // TODO: figure out how to have node print the correct message and stack trace
        console.warn(processError(warning).message);
      }
    }

    function processError(e, parseError) {
      if (!((e instanceof ManifestError) || e.location)) {
        return e;
      }
      let lines = content.split('\n');
      let line = lines[e.location.start.line - 1];
      let span = 1;
      if (e.location.end.line == e.location.start.line) {
        span = e.location.end.column - e.location.start.column;
      } else {
        span = line.length - e.location.start.column;
      }
      span = Math.max(1, span);
      let highlight = '';
      for (let i = 0; i < e.location.start.column - 1; i++) {
        highlight += ' ';
      }
      for (let i = 0; i < span; i++) {
        highlight += '^';
      }
      let preamble;
      if (parseError)
        preamble = 'Parse error in';
      else
        preamble = 'Post-parse processing error caused by';
      let message = `${preamble} '${fileName}' line ${e.location.start.line}.
${e.message}
  ${line}
  ${highlight}`;
      let err = new Error(message);
      if (!parseError)
        err.stack = e.stack;
      return err;
    }

    let items = [];
    try {
      items = __WEBPACK_IMPORTED_MODULE_1__build_manifest_parser_js__["a" /* default */].parse(content);
    } catch (e) {
      throw processError(e, true);
    }
    let manifest = new Manifest({id});
    manifest._fileName = fileName;

    try {
      // Loading of imported manifests is triggered in parallel to avoid a serial loading
      // of resources over the network. 
      await Promise.all(items.filter(item => item.kind == 'import').map(async item => {
        let path = loader.path(manifest.fileName);
        let target = loader.join(path, item.path);
        try {
          manifest._imports.push(await Manifest.load(target, loader, {registry}));
        } catch (e) {
          manifest._warnings.push(e);
          manifest._warnings.push(new ManifestError(item.location, `Error importing '${target}'`));
        }
      }));

      let processItems = async (kind, f) => {
        for (let item of items) {
          if (item.kind == kind) {
            Manifest._augmentAstWithTypes(manifest, item);
            await f(item);
          }
        }
      };

      // processing meta sections should come first as this contains identifying
      // information that might need to be used in other sections. For example,
      // the meta.name, if present, becomes the manifest id which is relevant
      // when constructing manifest handles.
      await processItems('meta', meta => manifest.applyMeta(meta.items));
      // similarly, resources may be referenced from other parts of the manifest.
      await processItems('resource', item => this._processResource(manifest, item));
      await processItems('schema', item => this._processSchema(manifest, item));
      await processItems('shape', item => this._processShape(manifest, item));
      await processItems('particle', item => this._processParticle(manifest, item, loader));
      await processItems('store', item => this._processStore(manifest, item, loader));
      await processItems('recipe', item => this._processRecipe(manifest, item, loader));
    } catch (e) {
      dumpWarnings(manifest);
      throw processError(e, false);
    }
    dumpWarnings(manifest);
    return manifest;
  }
  static _augmentAstWithTypes(manifest, items) {
    let visitor = new class extends ManifestVisitor {
      constructor() {
        super();
      }
      visit(node, visitChildren) {
        // TODO(dstockwell): set up a scope and merge type variables here, so that
        //     errors relating to failed merges can reference the manifest source.
        visitChildren();
        switch (node.kind) {
        case 'schema-inline': {
          let schemas = [];
          let aliases = [];
          let names = [];
          for (let name of node.names) {
            let resolved = manifest.resolveReference(name);
            if (resolved && resolved.schema && resolved.schema.isAlias) {
              aliases.push(resolved.schema);
            } else {
              names.push(name);
            }
            if (resolved && resolved.schema) {
              schemas.push(resolved.schema);
            }
          }
          let fields = {};
          for (let {name, type} of node.fields) {
            for (let schema of schemas) {
              if (!type) {
                // If we don't have a type, try to infer one from the schema.
                type = schema.fields[name];
              } else {
                // Validate that the specified or inferred type matches the schema.
                let externalType = schema.fields[name];
                if (externalType && !__WEBPACK_IMPORTED_MODULE_4__schema_js__["a" /* default */].typesEqual(externalType, type)) {
                  throw new ManifestError(
                      node.location,
                      `Type of '${name}' does not match schema (${type} vs ${externalType})`);
                }
              }
            }
            if (!type) {
              throw new ManifestError(
                  node.location,
                  `Could not infer type of '${name}' field`);
            }
            fields[name] = type;
          }
          let schema = new __WEBPACK_IMPORTED_MODULE_4__schema_js__["a" /* default */]({
            names,
            fields,
          });
          for (let alias of aliases) {
            schema = __WEBPACK_IMPORTED_MODULE_4__schema_js__["a" /* default */].union(alias, schema);
            if (!schema) {
              throw new ManifestError(
                  node.location,
                  `Could not merge schema aliases`);
            }
          }
          node.model = __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newEntity(schema);
          return;
        }
        case 'variable-type': {
          let constraint = node.constraint && node.constraint.model;
          node.model = __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newVariable({name: node.name, constraint});
          return;
        }
        case 'reference-type': {
          let resolved = manifest.resolveReference(node.name);
          if (!resolved) {
            throw new ManifestError(
                node.location,
                `Could not resolve type reference '${node.name}'`);
          }
          if (resolved.schema) {
            node.model = __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newEntity(resolved.schema);
          } else if (resolved.shape) {
            node.model = __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newInterface(resolved.shape);
          } else {
            throw new Error('Expected {shape} or {schema}');
          }
          return;
        }
        case 'list-type':
          node.model = __WEBPACK_IMPORTED_MODULE_7__type_js__["a" /* default */].newCollection(node.type.model);
          return;
        default:
          return;
        }
      }
    }();
    visitor.traverse(items);
  }
  static _processSchema(manifest, schemaItem) {
    let description = '';
    let fields = {};
    let names = [...schemaItem.names];
    for (let item of schemaItem.items) {
      switch (item.kind) {
        case 'schema-field': {
          let field = item;
          if (fields[field.name]) {
            throw new ManifestError(field.location, `Duplicate definition of field '${field.name}'`);
          }
          fields[field.name] = field.type;
          break;
        }
        case 'schema-section': {
          let section = item;
          manifest._warnings.push(new ManifestError(section.location, `Schema sections are deprecated`));
          for (let field of section.fields) {
            if (fields[field.name]) {
              throw new ManifestError(field.location, `Duplicate definition of field '${field.name}'`);
            }
            fields[field.name] = field.type;
          }
          break;
        }
        case 'description': {
          if (description) {
            throw new ManifestError(item.location, `Duplicate schema description`);
          }
          description = item;
        }
      }
    }

    for (let parent of schemaItem.parents) {
      let result = manifest.findSchemaByName(parent);
      if (!result) {
        throw new ManifestError(
            schemaItem.location,
            `Could not find parent schema '${parent}'`);
      }
      for (let [name, type] of Object.entries(result.fields)) {
        if (fields[name] && !__WEBPACK_IMPORTED_MODULE_4__schema_js__["a" /* default */].typesEqual(fields[name], type)) {
          throw new ManifestError(schemaItem.location,
              `'${parent}' defines incompatible type for field '${name}'`);
        }
      }
      Object.assign(fields, result.fields);
      names.push(...result.names);
    } 
    names = [names[0], ...names.filter(name => name != names[0])];
    let name = schemaItem.alias || names[0];
    if (!name) {
      throw new ManifestError(
          schemaItem.location,
          `Schema defined without name or alias`);
    }
    let schema = new __WEBPACK_IMPORTED_MODULE_4__schema_js__["a" /* default */]({
      names,
      description: description,
      fields,
    });
    if (schemaItem.alias) {
      schema.isAlias = true;
    }
    manifest._schemas[name] = schema;
  }
  static _processResource(manifest, schemaItem) {
    manifest._resources[schemaItem.name] = schemaItem.data;
  }
  static _processParticle(manifest, particleItem, loader) {
    // TODO: we should be producing a new particleSpec, not mutating
    //       particleItem directly.
    // TODO: we should require both of these and update failing tests...
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particleItem.implFile == null || particleItem.args !== null, 'no valid body defined for this particle');
    if (!particleItem.args) {
      particleItem.args = [];
    }
    // TODO: loader should not be optional.
    if (particleItem.implFile && loader) {
      particleItem.implFile = loader.join(manifest.fileName, particleItem.implFile);
    }

    for (let arg of particleItem.args) {
      arg.type = arg.type.model;
    }

    let particleSpec = new __WEBPACK_IMPORTED_MODULE_3__particle_spec_js__["a" /* default */](particleItem);
    manifest._particles[particleItem.name] = particleSpec;
  }
  // TODO: Move this to a generic pass over the AST and merge with resolveReference.
  static _processShape(manifest, shapeItem) {
    for (let arg of shapeItem.interface.args) {
      if (arg.type) {
        // TODO: we should copy rather than mutate the AST like this
        arg.type = arg.type.model;
      }
    }
    let handles = shapeItem.interface.args;
    let slots = [];
    for (let slotItem of shapeItem.slots) {
      slots.push({
        direction: slotItem.direction,
        name: slotItem.name,
        isRequired: slotItem.isRequired,
        isSet: slotItem.isSet
      });
    }
    // TODO: move shape to recipe/ and add shape builder?
    let shape = new __WEBPACK_IMPORTED_MODULE_6__shape_js__["a" /* default */](shapeItem.name, handles, slots);
    manifest._shapes.push(shape);
  }
  static async _processRecipe(manifest, recipeItem, loader) {
    // TODO: annotate other things too
    let recipe = manifest._newRecipe(recipeItem.name);
    recipe.annotation = recipeItem.annotation;
    let items = {
      handles: recipeItem.items.filter(item => item.kind == 'handle'),
      byHandle: new Map(),
      particles: recipeItem.items.filter(item => item.kind == 'particle'),
      byParticle: new Map(),
      slots: recipeItem.items.filter(item => item.kind == 'slot'),
      bySlot: new Map(),
      byName: new Map(),
      connections: recipeItem.items.filter(item => item.kind == 'connection'),
      search: recipeItem.items.find(item => item.kind == 'search'),
      description: recipeItem.items.find(item => item.kind == 'description')
    };

    for (let connection of items.connections) {
      let fromParticle = manifest.findParticleByName(connection.from.particle);
      let toParticle = manifest.findParticleByName(connection.to.particle);
      if (!fromParticle) {
        throw new ManifestError(connection.location, `could not find particle '${connection.from.particle}'`);
      }
      if (!toParticle) {
        throw new ManifestError(connection.location, `could not find particle '${connection.to.particle}'`);
      }
      if (!fromParticle.connectionMap.has(connection.from.param)) {
        throw new ManifestError(connection.location, `param '${connection.from.param} is not defined by '${connection.from.particle}'`);
      }
      if (!toParticle.connectionMap.has(connection.to.param)) {
        throw new ManifestError(connection.location, `param '${connection.to.param} is not defined by '${connection.to.particle}'`);
      }
      recipe.newConnectionConstraint(fromParticle, connection.from.param,
                                     toParticle, connection.to.param);
    }

    if (items.search) {
      recipe.search = new __WEBPACK_IMPORTED_MODULE_5__recipe_search_js__["a" /* default */](items.search.phrase, items.search.tokens);
    }

    for (let item of items.handles) {
      let handle = recipe.newHandle();
      let ref = item.ref || {tags: []};
      if (ref.id) {
        handle.id = ref.id;
        let targetStore = manifest.findStorageById(handle.id);
        if (targetStore)
          handle.mapToStorage(targetStore);
      } else if (ref.name) {
        let targetStore = manifest.findStorageByName(ref.name);
        // TODO: Error handling.
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(targetStore, `Could not find handle ${ref.name}`);
        handle.mapToStorage(targetStore);
      }
      handle.tags = ref.tags;
      if (item.name) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!items.byName.has(item.name));
        handle.localName = item.name;
        items.byName.set(item.name, {item, handle});
      }
      handle.fate = item.fate;
      items.byHandle.set(handle, item);
    }

    for (let item of items.slots) {
      let slot = recipe.newSlot();
      item.ref = item.ref || {};
      if (item.ref.id) {
        slot.id = item.ref.id;
      }
      if (item.ref.tags) {
        slot.tags = item.ref.tags;
      }
      if (item.name) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!items.byName.has(item.name), `Duplicate slot local name ${item.name}`);
        slot.localName = item.name;
        items.byName.set(item.name, slot);
      }
      items.bySlot.set(slot, item);
    }

    // TODO: disambiguate.
    for (let item of items.particles) {
      let particle = recipe.newParticle(item.ref.name);
      particle.tags = item.ref.tags;
      particle.verbs = item.ref.verbs;
      if (item.ref.name) {
        let spec = manifest.findParticleByName(item.ref.name);
        if (!spec) {
          throw new ManifestError(item.location, `could not find particle ${item.ref.name}`);
        }
        particle.spec = spec.clone();
      }
      if (item.name) {
        // TODO: errors.
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!items.byName.has(item.name));
        particle.localName = item.name;
        items.byName.set(item.name, {item, particle});
      }
      items.byParticle.set(particle, item);

      for (let slotConnectionItem of item.slotConnections) {
        let slotConn = particle.consumedSlotConnections[slotConnectionItem.param];
        if (!slotConn) {
          slotConn = particle.addSlotConnection(slotConnectionItem.param);
        }
        slotConn.tags = slotConnectionItem.tags || [];
        slotConnectionItem.providedSlots.forEach(ps => {
          let providedSlot = slotConn.providedSlots[ps.param];
          if (providedSlot) {
            items.byName.set(ps.name, providedSlot);
            items.bySlot.set(providedSlot, ps);
          } else
            providedSlot = items.byName.get(ps.name);
          if (!providedSlot) {
            providedSlot = recipe.newSlot(ps.param);
            providedSlot.localName = ps.name;
            providedSlot.sourceConnection = slotConn;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!items.byName.has(ps.name));
            items.byName.set(ps.name, providedSlot);
            items.bySlot.set(providedSlot, ps);
          }
          if (!slotConn.providedSlots[ps.param]) {
            slotConn.providedSlots[ps.param] = providedSlot;
          }
        });
      }
    }

    for (let [particle, item] of items.byParticle) {
      for (let connectionItem of item.connections) {
        let connection;
        if (connectionItem.param == '*') {
          connection = particle.addUnnamedConnection();
        } else {
          connection = particle.connections[connectionItem.param];
          if (!connection) {
            connection = particle.addConnectionName(connectionItem.param);
          }
          // TODO: else, merge tags? merge directions?
        }
        connection.tags = connectionItem.target ? connectionItem.target.tags : [];
        let direction = {'->': 'out', '<-': 'in', '=': 'inout'}[connectionItem.dir];
        if (connection.direction) {
          if (connection.direction != direction && direction != 'inout' && !(connection.direction == 'host' && direction == 'in')) {
            throw new ManifestError(
                connectionItem.location,
                `'${connectionItem.dir}' not compatible with '${connection.direction}' param of '${particle.name}'`);
          }
        } else {
          if (connectionItem.param != '*' && particle.spec !== undefined) {
            throw new ManifestError(
                connectionItem.location,
                `param '${connectionItem.param}' is not defined by '${particle.name}'`);
          }
          connection.direction = direction;
        }

        let targetHandle;
        let targetParticle;

        if (connectionItem.target && connectionItem.target.name) {
          let entry = items.byName.get(connectionItem.target.name);
          if (!entry) {
            throw new ManifestError(
                connectionItem.location,
                `Could not find handle '${connectionItem.target.name}'`);
          }
          if (entry.item.kind == 'handle') {
            targetHandle = entry.handle;
          } else if (entry.item.kind == 'particle') {
            targetParticle = entry.particle;
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `did not expect ${entry.item.kind}`);
          }
        }

        // Handle implicit handle connections in the form `param = SomeParticle`
        if (connectionItem.target && connectionItem.target.particle) {
          let hostedParticle = manifest.findParticleByName(connectionItem.target.particle);
          if (!hostedParticle) {
            throw new ManifestError(
                connectionItem.target.location,
                `Could not find hosted particle '${connectionItem.target.particle}'`);
          }
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!connection.type.hasVariableReference);
          let type = __WEBPACK_IMPORTED_MODULE_12__recipe_type_checker_js__["a" /* default */].restrictType(connection.type, hostedParticle);
          if (!type) {
            throw new ManifestError(
                connectionItem.target.location,
                `Hosted particle '${hostedParticle.name}' does not match shape '${connection.name}'`);
          }
          let id = `${manifest.generateID()}:immediate${hostedParticle.name}`;
          // TODO: Mark as immediate.
          targetHandle = recipe.newHandle();
          targetHandle.fate = 'copy';
          let store = await manifest.newStore(type, null, id, []);
          // TODO: loader should not be optional.
          if (hostedParticle.implFile && loader) {
            hostedParticle.implFile = loader.join(manifest.fileName, hostedParticle.implFile);
          }
          store.set(hostedParticle.clone().toLiteral());
          targetHandle.mapToStorage(store);
        }

        if (targetParticle) {
          let targetConnection;
          if (connectionItem.target.param) {
            targetConnection = targetParticle.connections[connectionItem.target.param];
            if (!targetConnection) {
              targetConnection = targetParticle.addConnectionName(connectionItem.target.param);
              // TODO: direction?
            }
          } else {
            targetConnection = targetParticle.addUnnamedConnection();
            // TODO: direction?
          }

          targetHandle = targetConnection.handle;
          if (!targetHandle) {
            // TODO: tags?
            targetHandle = recipe.newHandle();
            targetConnection.connectToHandle(targetHandle);
          }
        }

        if (targetHandle) {
          connection.connectToHandle(targetHandle);
        }
      }

      for (let slotConnectionItem of item.slotConnections) {
        // particles that reference verbs should store slot connection information as constraints to be used 
        // during verb matching. However, if there's a spec then the slots need to be validated against it
        // instead.
        if (particle.spec !== undefined) {
          // Validate consumed and provided slots names are according to spec.
          if (!particle.spec.slots.has(slotConnectionItem.param)) {
            throw new ManifestError(
                slotConnectionItem.location,
                `Consumed slot '${slotConnectionItem.param}' is not defined by '${particle.name}'`);
          }
          slotConnectionItem.providedSlots.forEach(ps => {
            if (!particle.spec.slots.get(slotConnectionItem.param).getProvidedSlotSpec(ps.param)) {
              throw new ManifestError(
                  ps.location,
                  `Provided slot '${ps.param}' is not defined by '${particle.name}'`);
            }
          });
        }

        let targetSlot = items.byName.get(slotConnectionItem.name);
        if (targetSlot) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(items.bySlot.has(targetSlot));
          if (!targetSlot.name) {
            targetSlot.name = slotConnectionItem.param;
          }
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(targetSlot == items.byName.get(slotConnectionItem.name),
                 `Target slot ${targetSlot.name} doesn't match slot connection ${slotConnectionItem.param}`);
        } else if (slotConnectionItem.name) {
          targetSlot = recipe.newSlot(slotConnectionItem.param);
          targetSlot.localName = slotConnectionItem.name;
          if (slotConnectionItem.name)
            items.byName.set(slotConnectionItem.name, targetSlot);
          items.bySlot.set(targetSlot, slotConnectionItem);
        }
        if (targetSlot) {
          particle.consumedSlotConnections[slotConnectionItem.param].connectToSlot(targetSlot);
        }
      }
    }

    if (items.description && items.description.description) {
      recipe.description = items.description.description;
    }
  }
  resolveReference(name) {
    let schema = this.findSchemaByName(name);
    if (schema) {
      return {schema};
    }
    let shape = this.findShapeByName(name);
    if (shape) {
      return {shape};
    }
    return null;
  }
  static async _processStore(manifest, item, loader) {
    let name = item.name;
    let id = item.id;
    let type = item.type.model;
    if (id == null) {
      id = `${manifest._id}store${manifest._stores.length}`;
    }
    let tags = item.tags;
    if (tags == null)
      tags = [];

    if (item.origin == 'storage') {
      manifest.newStorageStub(type, name, id, item.source, tags);
      return;
    }

    let store = await manifest.newStore(type, name, id, tags);
    store.source = item.source;
    store.description = item.description;
    let json;
    let source;
    if (item.origin == 'file') {
      source = loader.join(manifest.fileName, item.source);
      // TODO: json5?
      json = await loader.loadResource(source);
    } else if (item.origin == 'resource') {
      source = item.source;
      json = manifest.resources[source];
      if (json == undefined)
        throw new Error(`Resource '${source}' referenced by store '${id}' is not defined in this manifest`);
    }
    let entities;
    try {
      entities = JSON.parse(json);
    } catch (e) {
      throw new ManifestError(item.location, `Error parsing JSON from '${source}' (${e.message})'`);
    }

    let unitType;
    if (!type.isCollection) {
      if (entities.length == 0)
        return;
      entities = entities.slice(entities.length - 1);
      unitType = type;
    } else {
      unitType = type.primitiveType();
    }

    if (unitType.isEntity) {
      entities = entities.map(entity => {
        if (entity == null)
          return null;
        let id = entity.$id || manifest.generateID();
        delete entity.$id;
        return {id, rawData: entity};
      });
    }

    let version = item.version || 0;

    if (type.isCollection) {
      store._fromListWithVersion(entities, version);
    } else {
      store._setWithVersion(entities[0], version);
    }
  }
  _newRecipe(name) {
    let recipe = new __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */](name);
    this._recipes.push(recipe);
    return recipe;
  }

  toString(options) {
    // TODO: sort?
    options = options || {};
    let results = [];

    this._imports.forEach(i => {
      if (options.recursive) {
        results.push(`// import '${i.fileName}'`);
        let importStr = i.toString(options);
        results.push(`${i.toString(options)}`);
      } else {
        results.push(`import '${i.fileName}'`);
      }
    });

    Object.values(this._schemas).forEach(s => {
      results.push(s.toManifestString());
    });

    Object.values(this._particles).forEach(p => {
      results.push(p.toString());
    });

    this._recipes.forEach(r => {
      results.push(r.toString(options));
    });

    let handles = [...this.handles].sort(__WEBPACK_IMPORTED_MODULE_8__recipe_util_js__["a" /* default */].compareComparables);
    handles.forEach(h => {
      results.push(h.toString(this._handleTags.get(h)));
    });

    return results.join('\n');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Manifest);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbols_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_js__ = __webpack_require__(4);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class Entity {
  constructor(userIDComponent) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!userIDComponent || userIDComponent.indexOf(':') == -1, 'user IDs must not contain the \':\' character');
    this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier] = undefined;
    this._userIDComponent = userIDComponent;
  }
  get data() {
    return undefined;
  }

  getUserID() {
    return this._userIDComponent;
  }

  isIdentified() {
    return this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier] !== undefined;
  }
  // TODO: entity should not be exposing its IDs.
  get id() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!!this.isIdentified());
    return this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier];
  }
  identify(identifier) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this.isIdentified());
    this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier] = identifier;
    let components = identifier.split(':');
    if (components[components.length - 2] == 'uid')
      this._userIDComponent = components[components.length - 1];
  }
  createIdentity(components) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this.isIdentified());
    let id;
    if (this._userIDComponent)
      id = `${components.base}:uid:${this._userIDComponent}`;
    else
      id = `${components.base}:${components.component()}`;
    this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier] = id;
  }
  toLiteral() {
    return this.rawData;
  }

  static get type() {
    // TODO: should the entity's key just be its type?
    // Should it just be called type in that case?
    return __WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */].newEntity(this.key.schema);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Entity);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


/* harmony default export */ __webpack_exports__["a"] = ({identifier: Symbol('id')});


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tracelib_trace_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class Scheduler {
  constructor() {
    this.frameQueue = [];
    this.targetMap = new Map();
    this._finishNotifiers = [];
    this._idle = Promise.resolve();
    this._idleResolver = null;
    this._idleCallback = null;
  }

  clone() {
    return new Scheduler();
  }

  set idleCallback(idleCallback) { this._idleCallback = idleCallback; }

  enqueue(view, eventRecords) {
    let trace = __WEBPACK_IMPORTED_MODULE_0__tracelib_trace_js__["a" /* default */].flow({cat: 'view', name: 'ViewBase::_fire flow'}).start();
    if (this.frameQueue.length == 0 && eventRecords.length > 0)
      this._asyncProcess();
    if (!this._idleResolver) {
      this._idle = new Promise((resolve, reject) => this._idleResolver = resolve);
    }
    for (let record of eventRecords) {
      let frame = this.targetMap.get(record.target);
      if (frame == undefined) {
        frame = {target: record.target, views: new Map(), traces: []};
        this.frameQueue.push(frame);
        this.targetMap.set(record.target, frame);
      }
      frame.traces.push(trace);
      let viewEvents = frame.views.get(view);
      if (viewEvents == undefined) {
        viewEvents = new Map();
        frame.views.set(view, viewEvents);
      }
      let kindEvents = viewEvents.get(record.kind);
      if (kindEvents == undefined) {
        kindEvents = [];
        viewEvents.set(record.kind, kindEvents);
      }
      kindEvents.push(record);
    }
  }

  get busy() {
    return this.frameQueue.length > 0;
  }

  get idle() {
    return this._idle;
  }

  _asyncProcess() {
    Promise.resolve().then(() => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(this.frameQueue.length > 0, '_asyncProcess should not be invoked with 0 length queue');
      let frame = this.frameQueue.shift();
      this.targetMap.delete(frame.target);
      if (this.frameQueue.length > 0)
        this._asyncProcess();
      this._applyFrame(frame);
      if (this.frameQueue.length == 0) {
        this._idleResolver();
        this._idleResolver = null;
        if (this._idleCallback) {
          this._idleCallback();
        }
      }
    });
  }

  _applyFrame(frame) {
    let trace = __WEBPACK_IMPORTED_MODULE_0__tracelib_trace_js__["a" /* default */].start({cat: 'scheduler', name: 'Scheduler::_applyFrame', args: {target: frame.target ? frame.target.constructor.name : 'NULL TARGET'}});

    let totalRecords = 0;
    for (let [view, kinds] of frame.views.entries()) {
      for (let [kind, records] of kinds.entries()) {
        let record = records[records.length - 1];
        record.callback(record.details);
      }
    }

    frame.traces.forEach(trace => trace.end());

    trace.end();
  }
}

// TODO: Scheduler needs to be per arc, once multi-arc support is implemented.
/* harmony default export */ __webpack_exports__["a"] = (new Scheduler());


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shell_components_xen_xen_state_js__ = __webpack_require__(97);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







/** @class DomParticle
 * Particle that does stuff with DOM.
 */
class DomParticle extends __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shell_components_xen_xen_state_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__particle_js__["b" /* Particle */]) {
  constructor() {
    super();
    this.state = this._state;
    this.props = this._props;
  }
  /** @method get template()
   * Override to return a String defining primary markup.
   */
  get template() {
    return '';
  }
  /** @method getTemplate(slotName)
   * Override to return a String defining primary markup for the given slot name.
   */
  getTemplate(slotName) {
    // TODO: only supports a single template for now. add multiple templates support.
    return this.template;
  }
  /** @method willReceiveProps(props, state, oldProps, oldState)
   * Override if necessary, to do things when props change.
   */
  willReceiveProps() {
  }
  /** @method update(props, state, oldProps, oldState)
   * Override if necessary, to modify superclass config.
   */
  update() {
  }
  /** @method shouldRender(props, state, oldProps, oldState)
   * Override to return false if the Particle won't use
   * it's slot.
   */
  shouldRender() {
    return true;
  }
  /** @method render(props, state, oldProps, oldState)
   * Override to return a dictionary to map into the template.
   */
  render() {
    return {};
  }
  setState(state) {
    return this._setState(state);
  }
  // TODO(sjmiles): deprecated, just use setState
  setIfDirty(state) {
    console.warn('DomParticle: `setIfDirty` is deprecated, please use `setState` instead');
    return this._setState(state);
  }
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
  /** @method get config()
   * Override if necessary, to modify superclass config.
   */
  get config() {
    // TODO(sjmiles): getter that does work is a bad idea, this is temporary
    return {
      views: this.spec.inputs.map(i => i.name),
      // TODO(mmandlis): this.spec needs to be replaced with a particle-spec loaded from
      // .manifest files, instead of .ptcl ones.
      slotNames: [...this.spec.slots.values()].map(s => s.name)
    };
  }
  _info() {
    return `---------- DomParticle::[${this.spec.name}]`;
  }
  async setViews(views) {
    this.handles = views;
    this._views = views;
    let config = this.config;
    this.when([new __WEBPACK_IMPORTED_MODULE_1__particle_js__["c" /* ViewChanges */](views, config.views, 'change')], async () => {
      await this._handlesToProps(views, config);
    });
    // make sure we invalidate once, even if there are no incoming views
    this._invalidate();
  }
  async _handlesToProps(views, config) {
    // acquire (async) list data from views
    let data = await Promise.all(
      config.views
      .map(name => views.get(name))
      .map(view => view.toList ? view.toList() : view.get())
    );
    // convert view data (array) into props (dictionary)
    let props = Object.create(null);
    config.views.forEach((name, i) => {
      props[name] = data[i];
    });
    this._setProps(props);
  }
  renderSlot(slotName, contentTypes) {
    const stateArgs = this._getStateArgs();
    let slot = this.getSlot(slotName);
    if (!slot) {
      return; // didn't receive StartRender.
    }

    // Set this to support multiple slots consumed by a particle, without needing
    // to pass slotName to particle's render method, where it useless in most cases.
    this.currentSlotName = slotName;

    contentTypes.forEach(ct => slot._requestedContentTypes.add(ct));
    // TODO(sjmiles): redundant, same answer for every
    if (this.shouldRender(...stateArgs)) {
      let content = {};
      if (slot._requestedContentTypes.has('template')) {
        content.template = this.getTemplate(slot.slotName);
      }
      if (slot._requestedContentTypes.has('model')) {
        content.model = this.render(...stateArgs);
      }
      slot.render(content);
    } else if (slot.isRendered) {
      // Send empty object, to clear rendered slot contents.
      slot.render({});
    }

    this.currentSlotName = undefined;
  }
  fireEvent(slotName, {handler, data}) {
    if (this[handler]) {
      // TODO(sjmiles): remove `this._state` parameter
      this[handler]({data}, this._state);
    }
  }
  setParticleDescription(pattern) {
    if (typeof pattern === 'string') {
      return super.setParticleDescription(pattern);
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!!pattern.template && !!pattern.model, 'Description pattern must either be string or have template and model');
    super.setDescriptionPattern('_template_', pattern.template);
    super.setDescriptionPattern('_model_', JSON.stringify(pattern.model));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DomParticle);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_fs_web_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_vm_web_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fetch_web_js__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dom_particle_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__multiplexer_dom_particle_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__transformation_dom_particle_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__converters_jsonldToManifest_js__ = __webpack_require__(69);
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
    let path = fileName.replace(/[\/][^\/]+$/, '/');
    return path;
  }

  join(prefix, path) {
    if (/^https?:\/\//.test(path))
      return path;
    // TODO: replace this with something that isn't hacky
    if (path[0] == '/' || path[1] == ':')
      return path;
    prefix = this.path(prefix);
    return prefix + path;
  }

  loadResource(file) {
    if (/^https?:\/\//.test(file))
      return this._loadURL(file);
    return this._loadFile(file);
  }

  _loadFile(file) {
    return new Promise((resolve, reject) => {
      __WEBPACK_IMPORTED_MODULE_0__platform_fs_web_js__["a" /* default */].readFile(file, (err, data) => {
        if (err)
          reject(err);
        else
          resolve(data.toString('utf-8'));
      });
    });
  }

  _loadURL(url) {
    if (/\/\/schema.org\//.test(url)) {
      if (url.endsWith('/Thing')) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fetch_web_js__["a" /* default */])('https://schema.org/Product.jsonld').then(res => res.text()).then(data => __WEBPACK_IMPORTED_MODULE_8__converters_jsonldToManifest_js__["a" /* default */].convert(data, {'@id': 'schema:Thing'}));
      }
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fetch_web_js__["a" /* default */])(url + '.jsonld').then(res => res.text()).then(data => __WEBPACK_IMPORTED_MODULE_8__converters_jsonldToManifest_js__["a" /* default */].convert(data));
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fetch_web_js__["a" /* default */])(url).then(res => res.text());
  }

  async loadParticleClass(spec) {
    let clazz = await this.requireParticle(spec.implFile);
    clazz.spec = spec;
    return clazz;
  }

  async requireParticle(fileName) {
    let src = await this.loadResource(fileName);
    // Note. This is not real isolation.
    let script = new __WEBPACK_IMPORTED_MODULE_1__platform_vm_web_js__["a" /* default */].Script(src, {filename: fileName, displayErrors: true});
    let result = [];
    let self = {
      defineParticle(particleWrapper) {
        result.push(particleWrapper);
      },
      console,
      importScripts: s => null //console.log(`(skipping browser-space import for [${s}])`)
    };
    script.runInNewContext(self, {filename: fileName, displayErrors: true});
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(result.length > 0 && typeof result[0] == 'function', `Error while instantiating particle implementation from ${fileName}`);
    return this.unwrapParticle(result[0]);
  }

  unwrapParticle(particleWrapper) {
    return particleWrapper({particle: __WEBPACK_IMPORTED_MODULE_4__particle_js__["a" /* default */], Particle: __WEBPACK_IMPORTED_MODULE_4__particle_js__["a" /* default */].Particle, DomParticle: __WEBPACK_IMPORTED_MODULE_5__dom_particle_js__["a" /* default */], TransformationDomParticle: __WEBPACK_IMPORTED_MODULE_7__transformation_dom_particle_js__["a" /* default */], MultiplexerDomParticle: __WEBPACK_IMPORTED_MODULE_6__multiplexer_dom_particle_js__["a" /* default */], html});
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Loader);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_spec_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tracelib_trace_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__schema_js__ = __webpack_require__(8);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */








/** @class Particle
 * A basic particle. For particles that provide UI, you may like to
 * instead use DOMParticle.
 */
class Particle {
  constructor(capabilities) {
    this.spec = this.constructor.spec;
    if (this.spec.inputs.length == 0)
      this.extraData = true;
    this.relevances = [];
    this._idle = Promise.resolve();
    this._idleResolver = null;
    this._busy = 0;
    this.slotHandlers = [];
    this.stateHandlers = new Map();
    this.states = new Map();
    this._slotByName = new Map();
    this.capabilities = capabilities || {};
  }

  /** @method setViews(views)
   * This method is invoked with a handle for each view this particle
   * is registered to interact with, once those views are ready for
   * interaction. Override the method to register for events from
   * the views.
   *
   * Views is a map from view names to view handles.
   */
  setViews(views) {

  }

  constructInnerArc() {
    if (!this.capabilities.constructInnerArc)
      throw new Error('This particle is not allowed to construct inner arcs');
    return this.capabilities.constructInnerArc(this);
  }

  get busy() {
    return this._busy > 0;
  }

  get idle() {
    return this._idle;
  }

  /** @method setBusy()
   * Prevents this particle from indicating that it's idle until a matching
   * call to setIdle is made.
   */
  setBusy() {
    if (this._busy == 0)
    this._idle = new Promise((resolve, reject) => {
      this._idleResolver = resolve;
    });
    this._busy++;
  }

  /** @method setIdle()
   * Indicates that a busy period (initiated by a call to setBusy) has completed.
   */
  setIdle() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(this._busy > 0);
    this._busy--;
    if (this._busy == 0)
      this._idleResolver();
  }

  set relevance(r) {
    this.relevances.push(r);
  }

  inputs() {
    return this.spec.inputs;
  }

  outputs() {
    return this.spec.outputs;
  }

  /** @method getSlot(name)
   * Returns the slot with provided name.
   */
  getSlot(name) {
    return this._slotByName.get(name);
  }

  addSlotHandler(f) {
    this.slotHandlers.push(f);
  }

  addStateHandler(states, f) {
    states.forEach(state => {
      if (!this.stateHandlers.has(state)) {
        this.stateHandlers.set(state, []);
      }
      this.stateHandlers.get(state).push(f);
    });
  }

  emit(state, value) {
    this.states.set(state, value);
    this.stateHandlers.get(state).forEach(f => f(value));
  }

  /** @method on(views, names, kind, f)
   * Convenience method for registering a callback on multiple views at once.
   *
   * views is a map from names to view handles
   * names indicates the views which should have a callback installed on them
   * kind is the kind of event that should be registered for
   * f is the callback function
   */
  on(views, names, kind, f) {
    if (typeof names == 'string')
      names = [names];
    let trace = __WEBPACK_IMPORTED_MODULE_2__tracelib_trace_js__["a" /* default */].start({cat: 'particle', names: this.constructor.name + '::on', args: {view: names, event: kind}});
    names.forEach(name => views.get(name).on(kind, __WEBPACK_IMPORTED_MODULE_2__tracelib_trace_js__["a" /* default */].wrap({cat: 'particle', name: this.constructor.name, args: {view: name, event: kind}}, f), this));
    trace.end();
  }

  when(changes, f) {
    changes.forEach(change => change.register(this, f));
  }

  fireEvent(slotName, event) {
    // TODO(sjmiles): tests can get here without a `this.slot`, maybe this needs to be fixed in MockSlotManager?
    let slot = this.getSlot(slotName);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(slot, `Particle::fireEvent: slot ${slotName} is falsey`);
    slot.fireEvent(event);
  }

  static buildManifest(strings, ...bits) {
    let output = [];
    for (let i = 0; i < bits.length; i++) {
        let str = strings[i];
        let indent = / *$/.exec(str)[0];
        let bitStr;
        if (typeof bits[i] == 'string')
          bitStr = bits[i];
        else
          bitStr = bits[i].toManifestString();
        bitStr = bitStr.replace(/(\n)/g, '$1' + indent);
        output.push(str);
        output.push(bitStr);
    }
    if (strings.length > bits.length)
      output.push(strings[strings.length - 1]);
    return output.join('');
  }

  setParticleDescription(pattern) {
    return this.setDescriptionPattern('_pattern_', pattern);
  }
  setDescriptionPattern(connectionName, pattern) {
    let descriptions = this._views.get('descriptions');
    if (descriptions) {
      descriptions.store(new descriptions.entityClass({key: connectionName, value: pattern}, connectionName));
      return true;
    }
    return false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Particle;


class ViewChanges {
  constructor(views, names, type) {
    if (typeof names == 'string')
      names = [names];
    this.names = names;
    this.views = views;
    this.type = type;
  }
  register(particle, f) {
    let modelCount = 0;
    let afterAllModels = () => { if (++modelCount == this.names.length) { f(); } };

    for (let name of this.names) {
      let view = this.views.get(name);
      view.synchronize(this.type, afterAllModels, f, particle);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = ViewChanges;


class SlotChanges {
  constructor() {
  }
  register(particle, f) {
    particle.addSlotHandler(f);
  }
}
/* unused harmony export SlotChanges */


class StateChanges {
  constructor(states) {
    if (typeof states == 'string')
      states = [states];
    this.states = states;
  }
  register(particle, f) {
    particle.addStateHandler(this.states, f);
  }
}
/* unused harmony export StateChanges */


/* harmony default export */ __webpack_exports__["a"] = ({Particle, ViewChanges, SlotChanges, StateChanges});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__symbols_js__ = __webpack_require__(14);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







// TODO: Should relations normalized by another layer, or here?
class Relation extends __WEBPACK_IMPORTED_MODULE_1__entity_js__["a" /* default */] {
  constructor(...entities) {
    super();
    this.entities = entities;
  }
  get data() {
    return this.entities.map(entity => entity[__WEBPACK_IMPORTED_MODULE_3__symbols_js__["a" /* default */].identifier].toLiteral());
  }
  static typeFor(relation) {
    let result = new __WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */](relation.entities.map(entity => entity.constructor.type), relation.constructor);
    return result;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Relation);


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(4);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



// ShapeHandle {name, direction, type}
// Slot {name, direction, isRequired, isSet}

function _fromLiteral(member) {
  if (!!member && typeof member == 'object')
    return __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* default */].fromLiteral(member);
  return member;
}

function _toLiteral(member) {
  if (!!member && member.toLiteral)
    return member.toLiteral();
  return member;
}

const handleFields = ['type', 'name', 'direction'];
const slotFields = ['name', 'direction', 'isRequired', 'isSet'];

class Shape {
  constructor(name, handles, slots) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(name);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(handles !== undefined);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slots !== undefined);
    this.name = name;
    this.handles = handles;
    this.slots = slots;
    this._typeVars = [];
    for (let handle of handles)
      for (let field of handleFields)
        if (Shape.isTypeVar(handle[field]))
          this._typeVars.push({object: handle, field});

    for (let slot of slots)
      for (let field of slotFields)
        if (Shape.isTypeVar(slot[field]))
          this._typeVars.push({object: slot, field});
  }

  toPrettyString() {
    return 'SHAAAAPE';
  }

  get canReadSubset() {
    return this._cloneAndUpdate(typeVar => typeVar.canReadSubset);
  }

  get canWriteSuperset() {
    return this._cloneAndUpdate(typeVar => typeVar.canWriteSuperset);
  }

  isMoreSpecificThan(other) {
    if (this.handles.length !== other.handles.length || this.slots.length !== other.slots.length)
      return false;
    // TODO: should probably confirm that handles and slots actually match.
    for (let i = 0; i < this._typeVars.length; i++) {
      let thisTypeVar = this._typeVars[i];
      let otherTypeVar = other._typeVars[i];
      if (!thistypeVar.object[thistypeVar.field].isMoreSpecificThan(othertypeVar.object[othertypeVar.field]))
        return false;
    }
    return true;
  }

  _applyExistenceTypeTest(test) {
    for (let typeRef of this._typeVars) {
      if (test(typeRef.object[typeRef.field]))
        return true;
    }

    return false;
  }

  _handlesToManifestString() {
    return this.handles
      .map(handle => {
        let type = handle.type.resolvedType();
        return `${handle.direction ? handle.direction + ' ': ''}${type.toString()}${handle.name ? ' ' + handle.name : ''}`;
      }).join(', ');
  }

  _slotsToManifestString() {
    // TODO deal with isRequired
    return this.slots
      .map(slot => `  ${slot.direction} ${slot.isSet ? 'set of ' : ''}${slot.name ? slot.name + ' ' : ''}`)
      .join('\n');
  }
  // TODO: Include name as a property of the shape and normalize this to just
  // toString().
  toString() {
    return `shape ${this.name}
  ${this.name}(${this._handlesToManifestString()})
${this._slotsToManifestString()}
`;
  }

  static fromLiteral(data) {
    let handles = data.handles.map(handle => ({type: _fromLiteral(handle.type), name: _fromLiteral(handle.name), direction: _fromLiteral(handle.direction)}));
    let slots = data.slots.map(slot => ({name: _fromLiteral(slot.name), direction: _fromLiteral(slot.direction), isRequired: _fromLiteral(slot.isRequired), isSet: _fromLiteral(slot.isSet)}));
    return new Shape(data.name, handles, slots);
  }

  toLiteral() {
    let handles = this.handles.map(handle => ({type: _toLiteral(handle.type), name: _toLiteral(handle.name), direction: _toLiteral(handle.direction)}));
    let slots = this.slots.map(slot => ({name: _toLiteral(slot.name), direction: _toLiteral(slot.direction), isRequired: _toLiteral(slot.isRequired), isSet: _toLiteral(slot.isSet)}));
    return {name: this.name, handles, slots};
  }

  clone() {
    let handles = this.handles.map(({name, direction, type}) => ({name, direction, type}));
    let slots = this.slots.map(({name, direction, isRequired, isSet}) => ({name, direction, isRequired, isSet}));
    return new Shape(this.name, handles, slots);
  }

  resolvedType() {
    return this._cloneAndUpdate(typeVar => typeVar.resolvedType());
  }

  equals(other) {
    if (this.handles.length !== other.handles.length)
      return false;

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
    return handle.name == otherHandle.name && handle.direction == otherHandle.direction && handle.type.equals(otherHandle.type);
  }

  _equalSlot(slot, otherSlot) {
    return slot.name == otherSlot.name && slot.direction == otherSlot.direction && slot.isRequired == otherSlot.isRequired && slot.isSet == otherSlot.isSet;
  }

  _equalItems(otherItems, items, compareItem) {
    for (let otherItem of otherItems) {
      let exists = false;
      for (let item of items) {
        if (compareItem(item, otherItem)) {
          exists = true;
          break;
        }
      }
      if (!exists)
        return false;
    }

    return true;
  }

  _cloneAndUpdate(update) {
    let copy = this.clone();
    copy._typeVars.forEach(typeVar => Shape._updateTypeVar(typeVar, update));
    return copy;
  }

  static _updateTypeVar(typeVar, update) {
    typeVar.object[typeVar.field] = update(typeVar.object[typeVar.field]);
  }

  static isTypeVar(reference) {
    return (reference instanceof __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* default */]) && reference.hasProperty(r => r.isVariable);
  }

  static mustMatch(reference) {
    return !(reference == undefined || Shape.isTypeVar(reference));
  }

  static handlesMatch(shapeHandle, particleHandle) {
    if (Shape.mustMatch(shapeHandle.name) && shapeHandle.name !== particleHandle.name)
      return false;
    // TODO: direction subsetting?
    if (Shape.mustMatch(shapeHandle.direction) && shapeHandle.direction !== particleHandle.direction)
      return false;
    if (shapeHandle.type == undefined)
      return true;
    if (shapeHandle.type.isVariableReference)
      return false;
    let [left, right] = __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* default */].unwrapPair(shapeHandle.type, particleHandle.type);
    if (left.isVariable) {
      return [{var: left, value: right}];
    } else {
      return left.equals(right);
    }

  }

  static slotsMatch(shapeSlot, particleSlot) {
    if (Shape.mustMatch(shapeSlot.name) && shapeSlot.name !== particleSlot.name)
      return false;
    if (Shape.mustMatch(shapeSlot.direction) && shapeSlot.direction !== particleSlot.direction)
      return false;
    if (Shape.mustMatch(shapeSlot.isRequired) && shapeSlot.isRequired !== particleSlot.isRequired)
      return false;
    if (Shape.mustMatch(shapeSlot.isSet) && shapeSlot.isSet !== particleSlot.isSet)
      return false;
    return true;
  }

  particleMatches(particleSpec) {
    return this.restrictType(particleSpec) !== false;
  }

  restrictType(particleSpec) {
    let newShape = this.clone();
    return newShape._restrictThis(particleSpec); 
  }

  _restrictThis(particleSpec) {

    let handleMatches = this.handles.map(
      handle => particleSpec.connections.map(connection => ({match: connection, result: Shape.handlesMatch(handle, connection)}))
                                      .filter(a => a.result !== false));

    let particleSlots = [];
    particleSpec.slots.forEach(consumedSlot => {
      particleSlots.push({name: consumedSlot.name, direction: 'consume', isRequired: consumedSlot.isRequired, isSet: consumedSlot.isSet});
      consumedSlot.providedSlots.forEach(providedSlot => {
        particleSlots.push({name: providedSlot.name, direction: 'provide', isRequired: false, isSet: providedSlot.isSet});
      });
    });
    let slotMatches = this.slots.map(slot => particleSlots.filter(particleSlot => Shape.slotsMatch(slot, particleSlot)));
    slotMatches = slotMatches.map(matchList => matchList.map(slot => ({match: slot, result: true})));

    let exclusions = [];

    // TODO: this probably doesn't deal with multiple match options.
    function choose(list, exclusions) {
      if (list.length == 0)
        return [];
      let thisLevel = list.pop();
      for (let connection of thisLevel) {
        if (exclusions.includes(connection.match))
          continue;
        let newExclusions = exclusions.slice();
        newExclusions.push(connection.match);
        let constraints = choose(list, newExclusions);
        if (constraints !== false) {
          return connection.result.length ? constraints.concat(connection.result) : constraints;
        }
      }

      return false;
    }
    
    let handleOptions = choose(handleMatches, []);
    let slotOptions = choose(slotMatches, []);

    if (handleOptions === false || slotOptions === false)
      return false;

    for (let constraint of handleOptions)
      if (!constraint.var.variable.resolution)
        constraint.var.variable.resolution = constraint.value;

    return this;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Shape);




/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







class MapSlots extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor(arc) {
    super();
    this._arc = arc;
  }
  async generate(inputParams) {
    let arc = this._arc;

    return __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onSlotConnection(recipe, slotConnection) {
        // don't try to connect verb constraints
        // TODO: is this right? Should constraints be connectible, in order to precompute the
        // recipe side once the verb is substituted?
        if (slotConnection.slotSpec == undefined)
          return;

        if (slotConnection.isConnected()) {
          return;
        }

        let selectedSlots = MapSlots.findAllSlotCandidates(slotConnection, arc);
        if (selectedSlots.length < 2) {
          return;
        }

        let selectedSlot = selectedSlots[0]; // TODO: return combinatorial results?

        return (recipe, slotConnection) => {
          MapSlots.connectSlotConnection(slotConnection, selectedSlot);
          return 1;
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);
  }

  // Helper methods.
  // Connect the given slot connection to the selectedSlot, create the slot, if needed.
  static connectSlotConnection(slotConnection, selectedSlot) {
    let recipe = slotConnection.recipe;
    if (!slotConnection.targetSlot) {
      let clonedSlot = recipe.updateToClone({selectedSlot}).selectedSlot;

      if (!clonedSlot) {
        clonedSlot = recipe.slots.find(s => selectedSlot.id && selectedSlot.id == s.id);
        if (clonedSlot == undefined) {
          clonedSlot = recipe.newSlot(selectedSlot.name);
          clonedSlot.id = selectedSlot.id;
        }
      }
      slotConnection.connectToSlot(clonedSlot);
    }

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__["a" /* default */])(!selectedSlot.id || !slotConnection.targetSlot.id || (selectedSlot.id == slotConnection.targetSlot.id),
           `Cannot override slot id '${slotConnection.targetSlot.id}' with '${selectedSlot.id}'`);
    slotConnection.targetSlot.id = selectedSlot.id || slotConnection.targetSlot.id;

    // TODO: need to concat to existing tags and dedup?
    slotConnection.targetSlot.tags = [...selectedSlot.tags];
  }

  // Returns all possible slot candidates, sorted by "quality"
  static findAllSlotCandidates(slotConnection, arc) {
    let selectedSlots = [];
    if (!slotConnection.targetSlot) {
      // Note: during manfiest parsing, target slot is only set in slot connection, if the slot exists in the recipe.
      // If this slot is internal to the recipe, it has the sourceConnection set to the providing connection
      // (and hence the consuming connection is considered connected already). Otherwise, this may only be a remote slot.
      selectedSlots = MapSlots._findSlotCandidates(slotConnection, slotConnection.recipe.slots);
    }
    return selectedSlots.concat(MapSlots._findSlotCandidates(slotConnection, arc.pec.slotComposer.getAvailableSlots()));
  }

  // Returns the given slot candidates, sorted by "quality".
  static _findSlotCandidates(slotConnection, slots) {
    let possibleSlots = slots.filter(s => this._filterSlot(slotConnection, s));
    possibleSlots.sort((slot1, slot2) => {
        // TODO: implement.
        return slot1.name < slot2.name;
    });
    return possibleSlots;
  }

  // Returns true, if the given slot is a viable candidate for the slotConnection.
  static _filterSlot(slotConnection, slot) {
    // if there's no slotSpec, this is just a slot constraint on a verb
    if (!slotConnection.slotSpec)
      return false;

    if (slotConnection.slotSpec.isSet != slot.getProvidedSlotSpec().isSet) {
      return false;
    }

    // Match by tag on slot name.
    if (!MapSlots._tagsMatch(slotConnection, slot)) {
      // For backward compatibility support explicit slot names matching.
      if (slotConnection.name !== slot.name) {
        return false;
      }
    }

    // Match handles of the provided slot with the slot-connection particle's handles.
    if (!MapSlots._handlesMatch(slotConnection.particle, slot.handleConnections.map(connection => connection.handle).filter(a => a !== undefined))) {
      return false;
    }

    return true;
  }

  // Returns true, if the slot connection's tags intersection with slot's tags is nonempty.
  // TODO: replace with generic tag matcher
  static _tagsMatch(slotConnection, slot) {
    let consumeConnTags = [].concat(slotConnection.slotSpec.tags || [], slotConnection.tags);
    let slotTags = new Set([].concat(slot.tags, slot.getProvidedSlotSpec().tags || []));
    // Consume connection tags aren't empty and intersection with the slot isn't empty.
    return consumeConnTags.length > 0 && consumeConnTags.filter(t => slotTags.has(t)).length > 0;
  }

  // Returns true, if the providing slot handle restrictions are satisfied by the consuming slot connection.
      // TODO: should we move some of this logic to the recipe? Or type matching?
  static _handlesMatch(consumingParticle, providingSlotHandles) {
    if (providingSlotHandles.length == 0) {
      return true; // slot is not limited to specific handles
    }
    return Object.values(consumingParticle.connections).find(handleConn => {
      return providingSlotHandles.includes(handleConn.handle) ||
              (handleConn.handle && handleConn.handle.id && providingSlotHandles.map(sh => sh.id).includes(handleConn.handle.id));
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MapSlots;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







class ViewMapperBase extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  async generate(inputParams) {
    let self = this;

    return __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__["a" /* default */] {
      onView(recipe, view) {
        if (view.fate !== self.fate)
          return;

        if (view.connections.length == 0)
          return;

        if (view.id)
          return;

        if (!view.type)
          return;

        // TODO: using the connection to retrieve type information is wrong.
        // Once validation of recipes generates type information on the view
        // we should switch to using that instead.
        let counts = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].directionCounts(view);
        return this.mapView(view, view.tags, view.type, counts);
      }

      mapView(view, tags, type, counts) {
        let score = -1;
        if (counts.in == 0 || counts.out == 0) {
          if (counts.unknown > 0)
            return;
          if (counts.out == 0)
            score = 1;
          else
            score = 0;
        }

        if (tags.length > 0)
          score += 4;

        let fate = self.fate;
        if (counts.out > 0 && fate == 'map') {
          return;
        }
        let views = self.getMappableViews(type, tags, counts);
        if (views.length < 2)
          return;

        let responses = views.map(newView =>
          ((recipe, clonedView) => {
            for (let existingView of recipe.handles)
              // TODO: Why don't we link the view connections to the existingView?
              if (existingView.id == newView.id)
                return 0;
            let tscore = 0;

            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__["a" /* default */])(newView.id);
            clonedView.mapToStorage(newView);
            if (clonedView.fate != 'copy') {
              clonedView.fate = fate;
            }
            return score + tscore;
          }));

        responses.push(null); // "do nothing" for this view.
        return responses;
      }
    }(__WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__["a" /* default */].Permuted), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ViewMapperBase;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom_particle_js__ = __webpack_require__(16);
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
let re = /<style>((?:.|[\r\n])*)<\/style>((?:.|[\r\n])*)/;

/** @class TransformationDomParticle
 * Particle that does transformation stuff with DOM.
 */
class TransformationDomParticle extends __WEBPACK_IMPORTED_MODULE_1__dom_particle_js__["a" /* default */] {
  getTemplate(slotName) {
    return this._state.template;
  }
  render(props, state) {
    return state.renderModel;
  }
  shouldRender(props, state) {
    return Boolean(state.template && state.renderModel);
  }

  renderHostedSlot(slotName, hostedSlotId, content) {
    this.combineHostedTemplate(slotName, hostedSlotId, content);
    this.combineHostedModel(slotName, hostedSlotId, content);
  }

  // abstract
  combineHostedTemplate(slotName, hostedSlotId, content) {}
  combineHostedModel(slotName, hostedSlotId, content) {}

  // Helper methods that may be reused in transformation particles to combine hosted content.
  static combineTemplates(transformationTemplate, hostedTemplate) {
    let transformationMatch = transformationTemplate.match(re);
    if (!transformationMatch || transformationMatch.length != 3) {
      return;
    }
    let hostedMatch = hostedTemplate.match(re);
    if (!hostedMatch || hostedMatch.length != 3) {
      return;
    }

    return `
      <style>${transformationMatch[1].trim()}${hostedMatch[1].trim()}</style>
      ${transformationMatch[2].trim().replace('{{hostedParticle}}', hostedMatch[2].trim())}
    `;
  }
  static propsToItems(propsValues) {
    return propsValues ? propsValues.map(({rawData, id}) => Object.assign({}, rawData, {subId: id})) : [];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TransformationDomParticle);


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slot_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_context_js__ = __webpack_require__(30);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






const templates = new Map();

class DomSlot extends __WEBPACK_IMPORTED_MODULE_1__slot_js__["a" /* default */] {
  constructor(consumeConn, arc, containerKind) {
    super(consumeConn, arc);
    this._templateName = [this.consumeConn.particle.name, this.consumeConn.name].concat(
        Object.values(this.consumeConn.particle.connections).filter(conn => conn.type.isInterface).map(conn => conn.handle.id)).join('::');
    this._model = null;
    this._observer = this._initMutationObserver();
    this._containerKind = containerKind;
  }

  setContext(context) {
    let wasNull = true;
    if (this.getContext()) {
      this.getContext().clear();
      wasNull = false;
    }

    if (context) {
      if (!this.getContext()) {
        this._context = this._createDomContext();
      }
      this.getContext().initContext(context);
      if (!wasNull) {
        this._doRender();
      }
    } else {
      this._context = null;
    }
  }
  _createDomContext() {
    if (this.consumeConn.slotSpec.isSet) {
      return new __WEBPACK_IMPORTED_MODULE_2__dom_context_js__["a" /* SetDomContext */](this._containerKind);
    }
    return new __WEBPACK_IMPORTED_MODULE_2__dom_context_js__["b" /* DomContext */](null, this._containerKind);
  }

  // TODO(sjmiles): next three functions are a quick-fix for cleaning up MOs when there is
  // an Arcpocalypse (dropping one Arc, producing another).
  // Where there are other situations where a DomSlot is dropped, we have to make sure
  // we disconnect the observer.
  // Perhaps we need `Arc.cleanup()` or `Arc.dispose()` as a clearing-house for these tasks.
  static addObserver(observer) {
    const observers = DomSlot._observers || (DomSlot._observers = []);
    observers.push(observer);
  }
  static dispose() {
    // disconnect observers
    const observers = DomSlot._observers;
    observers && observers.forEach(o => o.disconnect());
    DomSlot._observers = [];
    // empty template cache
    templates.clear();
  }
  _initMutationObserver() {
    const observer = this.__initMutationObserver();
    DomSlot.addObserver(observer);
    return observer;
  }
  __initMutationObserver() {
    const observer = new MutationObserver(async (records) => {
      this._observer.disconnect();
      if (this.getContext() && records.some(r => this.getContext().isDirectInnerSlot(r.target))) {
        // Update inner slots.
        this.getContext().initInnerContexts(this.consumeConn.slotSpec);
        this.innerSlotsUpdateCallback(this);
        // Reactivate the observer.
        this.getContext().observe(this._observer);
      }
    });
    return observer;
  }
  isSameContext(context) {
    return this.getContext().isEqual(context);
  }

  getTemplate() {
    return templates.get(this._templateName);
  }

  // TODO(sjmiles): triggered when innerPEC sends Render message to outerPEC,
  // (usually by request of DomParticle::render())
  // `handler` is generated by caller (slot-composer::renderSlot())
  async setContent(content, handler) {
    if (!content || Object.keys(content).length == 0) {
      if (this.getContext()) {
        this.getContext().clear();
      }
      this._model = null;
      return;
    }
    if (!this.getContext()) {
      return;
    }
    if (content.template) {
      if (this.getTemplate()) {
        // Template is being replaced.
        this.getContext().clear();
      }
      templates.set(this._templateName, this.getContext().createTemplateElement(content.template));
    }
    this.eventHandler = handler;
    if (Object.keys(content).indexOf('model') >= 0) {
      if (content.model) {
        this._model = Object.assign(content.model, await this.populateHandleDescriptions());
      } else {
        this._model = undefined;
      }
    }
    this._doRender();
  }

  _doRender() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.getContext());

    this.getContext().observe(this._observer);

    // Initialize template, if possible.
    if (this.getTemplate()) {
      this.getContext().stampTemplate(this.getTemplate(), this.eventHandler);
    }
    // else {
    // TODO: should trigger request to particle, if template missing?
    //}

    if (this._model) {
      this.getContext().updateModel(this._model);
    }
  }
  getInnerContext(slotName) {
    return this.getContext() && this.getContext().getInnerContext(slotName);
  }
  constructRenderRequest() {
    let request = ['model'];
    if (!this.getTemplate()) {
      request.push('template');
    }
    return request;
  }
  static findRootSlots(context) {
    return new __WEBPACK_IMPORTED_MODULE_2__dom_context_js__["b" /* DomContext */](context, this._containerKind).findRootSlots(context);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DomSlot);


/***/ }),
/* 25 */
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


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

/* harmony default export */ __webpack_exports__["a"] = ({});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PECOuterPort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PECInnerPort; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_spec_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__debug_outer_port_attachment_js__ = __webpack_require__(71);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







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

  createMappingForThing(thing, requestedId) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._reverseIdMap.has(thing));
    let id;
    if (requestedId) {
      id = requestedId;
    } else if (thing.apiChannelMappingId) {
      id = thing.apiChannelMappingId;
    } else {
      id = this._newIdentifier();
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._idMap.has(id), `${requestedId ? 'requestedId' : (thing.apiChannelMappingId ? 'apiChannelMappingId' : 'newIdentifier()')} ${id} already in use`);
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(continuation == null);
      await this.establishThingMapping(id, await thing);
    } else {
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._reverseIdMap.has(thing), `Missing thing ${thing}`);
    return this._reverseIdMap.get(thing);
  }

  thingForIdentifier(id) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._idMap.has(id), `Missing id: ${id}`);
    return this._idMap.get(id);
  }
}


class APIPort {
  constructor(messagePort, prefix) {
    this._port = messagePort;
    this._mapper = new ThingMapper(prefix);
    this._messageMap = new Map();
    this._port.onmessage = async e => this._handle(e);
    this._debugAttachment = null;
    this.messageCount = 0;

    this.Direct = {
      convert: a => a,
      unconvert: a => a
    };

    this.Stringify = {
      convert: a => a.toString(),
      unconvert: a => eval(a)
    };

    this.LocalMapped = {
      convert: a => this._mapper.maybeCreateMappingForThing(a),
      unconvert: a => this._mapper.thingForIdentifier(a)
    };

    this.Mapped = {
      convert: a => this._mapper.identifierForThing(a),
      unconvert: a => this._mapper.thingForIdentifier(a)
    };

    this.Dictionary = function(primitive) {
      return {
        convert: a => {
          let r = {};
          for (let key in a) {
            r[key] = primitive.convert(a[key]);
          }
          return r;
        }
      };
    };

    this.Map = function(keyprimitive, valueprimitive) {
      return {
        convert: a => {
          let r = {};
          a.forEach((value, key) => r[keyprimitive.convert(key)] = valueprimitive.convert(value));
          return r;
        },
        unconvert: a => {
          let r = new Map();
          for (let key in a)
            r.set(keyprimitive.unconvert(key), valueprimitive.unconvert(a[key]));
          return r;
        }
      };
    };

    this.List = function(primitive) {
      return {
        convert: a => a.map(v => primitive.convert(v)),
        unconvert: a => a.map(v => primitive.unconvert(v))
      };
    };

    this.ByLiteral = function(clazz) {
      return {
        convert: a => a.toLiteral(),
        unconvert: a => clazz.fromLiteral(a)
      };
    };
  }

  close() {
    this._port.close();
  }

  async _handle(e) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._messageMap.has(e.data.messageType));

    this.messageCount++;

    let handler = this._messageMap.get(e.data.messageType);
    let args;
    try {
      args = this._unprocessArguments(handler.args, e.data.messageBody);
    } catch (exc) {
      console.error(`Exception during unmarshaling for ${e.data.messageType}`);
      throw exc;
    }
    // If any of the converted arguments are still pending promises
    // wait for them to complete before processing the message.
    for (let arg of Object.values(args)) {
      if (arg instanceof Promise) {
        arg.then(() => this._handle(e));
        return;
      }
    }
    let handlerName = 'on' + e.data.messageType;
    let result = this[handlerName](args);
    if (this._debugAttachment && this._debugAttachment[handlerName]) {
      this._debugAttachment[handlerName](args);
    }
    if (handler.isInitializer) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(args.identifier);
      await this._mapper.establishThingMapping(args.identifier, result);
    }
  }

  _processArguments(argumentTypes, args) {
    let messageBody = {};
    for (let argument in argumentTypes)
      messageBody[argument] = argumentTypes[argument].convert(args[argument]);
    return messageBody;
  }

  _unprocessArguments(argumentTypes, args) {
    let messageBody = {};
    for (let argument in argumentTypes)
      messageBody[argument] = argumentTypes[argument].unconvert(args[argument]);
    return messageBody;
  }

  registerCall(name, argumentTypes) {
    this[name] = args => {
      let call = {messageType: name, messageBody: this._processArguments(argumentTypes, args)};
      this._port.postMessage(call);
      if (this._debugAttachment && this._debugAttachment[name]) {
        this._debugAttachment[name](args);
      }
    };
  }

  registerHandler(name, argumentTypes) {
    this._messageMap.set(name, {args: argumentTypes});
  }

  registerInitializerHandler(name, argumentTypes) {
    argumentTypes.identifier = this.Direct;
    this._messageMap.set(name, {
      isInitializer: true,
      args: argumentTypes,
    });
  }

  registerRedundantInitializer(name, argumentTypes, mappingIdArg) {
    this.registerInitializer(name, argumentTypes, mappingIdArg, true /* redundant */);
  }

  registerInitializer(name, argumentTypes, mappingIdArg = null, redundant = false) {
    this[name] = (thing, args) => {
      if (redundant && this._mapper.hasMappingForThing(thing)) return;
      let call = {messageType: name, messageBody: this._processArguments(argumentTypes, args)};
      let requestedId = mappingIdArg && args[mappingIdArg];
      call.messageBody.identifier = this._mapper.createMappingForThing(thing, requestedId);
      this._port.postMessage(call);
      if (this._debugAttachment && this._debugAttachment[name]) {
        this._debugAttachment[name](thing, args);
      }
    };
  }

  initDebug(arc) {
    if (!this._debugAttachment) this._debugAttachment = new __WEBPACK_IMPORTED_MODULE_3__debug_outer_port_attachment_js__["a" /* default */](arc);
  }
}

class PECOuterPort extends APIPort {
  constructor(messagePort) {
    super(messagePort, 'o');

    this.registerCall('Stop', {});
    this.registerRedundantInitializer('DefineHandle', {type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct});
    this.registerInitializer('InstantiateParticle',
      {id: this.Direct, spec: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_1__particle_spec_js__["a" /* default */]), handles: this.Map(this.Direct, this.Mapped)}, 'id');

    this.registerCall('UIEvent', {particle: this.Mapped, slotName: this.Direct, event: this.Direct});
    this.registerCall('SimpleCallback', {callback: this.Direct, data: this.Direct});
    this.registerCall('AwaitIdle', {version: this.Direct});
    this.registerCall('StartRender', {particle: this.Mapped, slotName: this.Direct, contentTypes: this.List(this.Direct)});
    this.registerCall('StopRender', {particle: this.Mapped, slotName: this.Direct});

    this.registerHandler('Render', {particle: this.Mapped, slotName: this.Direct, content: this.Direct});
    this.registerHandler('Synchronize', {handle: this.Mapped, target: this.Mapped,
                                    type: this.Direct, callback: this.Direct,
                                    modelCallback: this.Direct, particleId: this.Direct});
    this.registerHandler('HandleGet', {handle: this.Mapped, callback: this.Direct, particleId: this.Direct});
    this.registerHandler('HandleToList', {handle: this.Mapped, callback: this.Direct, particleId: this.Direct});
    this.registerHandler('HandleSet', {handle: this.Mapped, data: this.Direct, particleId: this.Direct});
    this.registerHandler('HandleStore', {handle: this.Mapped, data: this.Direct, particleId: this.Direct});
    this.registerHandler('HandleRemove', {handle: this.Mapped, data: this.Direct});
    this.registerHandler('HandleClear', {handle: this.Mapped, particleId: this.Direct});
    this.registerHandler('Idle', {version: this.Direct, relevance: this.Map(this.Mapped, this.Direct)});

    this.registerHandler('ConstructInnerArc', {callback: this.Direct, particle: this.Mapped});
    this.registerCall('ConstructArcCallback', {callback: this.Direct, arc: this.LocalMapped});

    this.registerHandler('ArcCreateHandle', {callback: this.Direct, arc: this.LocalMapped, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct});
    this.registerInitializer('CreateHandleCallback', {callback: this.Direct, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct, id: this.Direct});

    this.registerHandler('ArcMapHandle', {callback: this.Direct, arc: this.LocalMapped, handle: this.Mapped});
    this.registerInitializer('MapHandleCallback', {callback: this.Direct, id: this.Direct});

    this.registerHandler('ArcCreateSlot',
      {callback: this.Direct, arc: this.LocalMapped, transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedParticleName: this.Direct, hostedSlotName: this.Direct});
    this.registerInitializer('CreateSlotCallback', {callback: this.Direct, hostedSlotId: this.Direct});
    this.registerCall('InnerArcRender', {transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedSlotId: this.Direct, content: this.Direct});

    this.registerHandler('ArcLoadRecipe', {arc: this.LocalMapped, recipe: this.Direct, callback: this.Direct});
  }
}

class PECInnerPort extends APIPort {
  constructor(messagePort) {
    super(messagePort, 'i');

    this.registerHandler('Stop', {});
    // particleFunction needs to be eval'd in context or it won't work.
    this.registerHandler('DefineParticle',
      {particleDefinition: this.Direct, particleFunction: this.Direct});
    this.registerInitializerHandler('DefineHandle', {type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct});
    this.registerInitializerHandler('InstantiateParticle',
      {id: this.Direct, spec: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_1__particle_spec_js__["a" /* default */]), handles: this.Map(this.Direct, this.Mapped)});

    this.registerHandler('UIEvent', {particle: this.Mapped, slotName: this.Direct, event: this.Direct});
    this.registerHandler('SimpleCallback', {callback: this.LocalMapped, data: this.Direct});
    this.registerHandler('AwaitIdle', {version: this.Direct});
    this.registerHandler('StartRender', {particle: this.Mapped, slotName: this.Direct, contentTypes: this.Direct});
    this.registerHandler('StopRender', {particle: this.Mapped, slotName: this.Direct});

    this.registerCall('Render', {particle: this.Mapped, slotName: this.Direct, content: this.Direct});
    this.registerCall('Synchronize', {handle: this.Mapped, target: this.Mapped,
                                 type: this.Direct, callback: this.LocalMapped,
                                 modelCallback: this.LocalMapped, particleId: this.Direct});
    this.registerCall('HandleGet', {handle: this.Mapped, callback: this.LocalMapped, particleId: this.Direct});
    this.registerCall('HandleToList', {handle: this.Mapped, callback: this.LocalMapped, particleId: this.Direct});
    this.registerCall('HandleSet', {handle: this.Mapped, data: this.Direct, particleId: this.Direct});
    this.registerCall('HandleStore', {handle: this.Mapped, data: this.Direct, particleId: this.Direct});
    this.registerCall('HandleRemove', {handle: this.Mapped, data: this.Direct});
    this.registerCall('HandleClear', {handle: this.Mapped, particleId: this.Direct});
    this.registerCall('Idle', {version: this.Direct, relevance: this.Map(this.Mapped, this.Direct)});

    this.registerCall('ConstructInnerArc', {callback: this.LocalMapped, particle: this.Mapped});
    this.registerHandler('ConstructArcCallback', {callback: this.LocalMapped, arc: this.Direct});

    this.registerCall('ArcCreateHandle', {callback: this.LocalMapped, arc: this.Direct, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct});
    this.registerInitializerHandler('CreateHandleCallback', {callback: this.LocalMapped, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* default */]), name: this.Direct, id: this.Direct});
    this.registerCall('ArcMapHandle', {callback: this.LocalMapped, arc: this.Direct, handle: this.Mapped});
    this.registerInitializerHandler('MapHandleCallback', {callback: this.LocalMapped, id: this.Direct});
    this.registerCall('ArcCreateSlot',
      {callback: this.LocalMapped, arc: this.Direct, transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedParticleName: this.Direct, hostedSlotName: this.Direct});
    this.registerInitializerHandler('CreateSlotCallback', {callback: this.LocalMapped, hostedSlotId: this.Direct});
    this.registerHandler('InnerArcRender', {transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedSlotId: this.Direct, content: this.Direct});

    this.registerCall('ArcLoadRecipe', {arc: this.Direct, recipe: this.Direct, callback: this.LocalMapped});
  }
}


/* unused harmony default export */ var _unused_webpack_default_export = ({PECOuterPort, PECInnerPort});


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_devtools_channel_web_js__ = __webpack_require__(65);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




let instance = null;
/* harmony default export */ __webpack_exports__["a"] = ({
  get: () => {
    if (!instance) instance = new __WEBPACK_IMPORTED_MODULE_0__platform_devtools_channel_web_js__["a" /* default */]();
    return instance;
  }
});


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DomContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetDomContext; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shell_components_xen_xen_template_js__ = __webpack_require__(98);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





class DomContext {
  constructor(context, containerKind) {
    this._context = context;
    this._containerKind = containerKind;
    // TODO(sjmiles): _liveDom needs new name
    this._liveDom = null;
    this._innerContextBySlotName = {};
    this._subId = null;
  }
  get subId() {return this._subId; }
  set subId(subId) { this._subId = subId; }
  static createContext(context, content) {
    let domContext = new DomContext(context);
    domContext.stampTemplate(domContext.createTemplateElement(content.template), () => {});
    domContext.updateModel(content.model);
    return domContext;
  }
  initContext(context) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(context);
    if (!this._context) {
      this._context = document.createElement(this._containerKind || 'div');
      this._setParticleName('');
      context.appendChild(this._context);
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._context.parentNode == context,
             'TODO: add support for moving slot to different context');
    }
  }
  updateParticleName(slotName, particleName) {
    this._setParticleName(`${slotName}::${particleName}`);
  }
  _setParticleName(name) {
    this._context.setAttribute('particle-host', name);
  }
  get context() { return this._context; }
  isEqual(context) {
    return this._context.parentNode == context;
  }
  updateModel(model) {
    if (this._liveDom) {
      this._liveDom.set(model);
    }
  }
  clear() {
    if (this._liveDom) {
      this._liveDom.root.textContent = '';
    }
    this._liveDom = null;
    this._innerContextBySlotName = {};

  }
  static createTemplateElement(template) {
    return Object.assign(document.createElement('template'), {innerHTML: template});
  }
  createTemplateElement(template) {
    return DomContext.createTemplateElement(template);
  }
  stampTemplate(template, eventHandler) {
    if (!this._liveDom) {
      // TODO(sjmiles): hack to allow subtree elements (e.g. x-list) to marshal events
      this._context._eventMapper = this._eventMapper.bind(this, eventHandler);
      this._liveDom = __WEBPACK_IMPORTED_MODULE_1__shell_components_xen_xen_template_js__["a" /* default */]
          .stamp(template)
          .events(this._context._eventMapper)
          .appendTo(this._context);
    }
  }
  observe(observer) {
    observer.observe(this._context, {childList: true, subtree: true});
  }
  getInnerContext(innerSlotName) {
    return this._innerContextBySlotName[innerSlotName];
  }
  isDirectInnerSlot(slot) {
    if (slot === this._context) {
      return true;
    }

    let parentNode = slot.parentNode;
    while (parentNode) {
      if (parentNode == this._context) {
        return true;
      }
      if (parentNode.getAttribute('slotid')) {
        // this is an inner slot of an inner slot.
        return false;
      }
      parentNode = parentNode.parentNode;
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false);
  }
  // get a value from node that could be an attribute, if not a property
  getNodeValue(node, name) {
    // TODO(sjmiles): remember that attribute names from HTML are lower-case
    return node[name] || node.getAttribute(name);
  }
  initInnerContexts(slotSpec) {
    this._innerContextBySlotName = {};
    Array.from(this._context.querySelectorAll('[slotid]')).forEach(elem => {
      if (!this.isDirectInnerSlot(elem)) {
        // Skip inner slots of an inner slot of the given slot.
        return;
      }
      const slotId = this.getNodeValue(elem, 'slotid');
      const providedSlotSpec = slotSpec.getProvidedSlotSpec(slotId);
      if (!providedSlotSpec) { // Skip non-declared slots
        console.warn(`Slot ${slotSpec.name} has unexpected inner slot ${slotId}`);
        return;
      }
      const subId = this.getNodeValue(elem, 'subid');
      this._validateSubId(providedSlotSpec, subId);
      this._initInnerSlotContext(slotId, subId, elem);
    });
  }
  _initInnerSlotContext(slotId, subId, elem) {
    if (subId) {
      if (!this._innerContextBySlotName[slotId]) {
        this._innerContextBySlotName[slotId] = {};
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._innerContextBySlotName[slotId][subId], `Multiple ${slotId}:${subId} inner slots cannot be provided`);
      this._innerContextBySlotName[slotId][subId] = elem;
    } else {
      this._innerContextBySlotName[slotId] = elem;
    }
  }
  _validateSubId(providedSlotSpec, subId) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this.subId || !subId || this.subId == subId, `Unexpected sub-id ${subId}, expecting ${this.subId}`);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Boolean(this.subId || subId) === providedSlotSpec.isSet,
        `Sub-id ${subId} for provided slot ${providedSlotSpec.name} doesn't match set spec: ${providedSlotSpec.isSet}`);
  }
  findRootSlots() {
    let innerSlotById = {};
    Array.from(this._context.querySelectorAll('[slotid]')).forEach(s => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.isDirectInnerSlot(s), 'Unexpected inner slot');
      let slotId = s.getAttribute('slotid');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!innerSlotById[slotId], `Duplicate root slot ${slotId}`);
      innerSlotById[slotId] = s;
    });
    return innerSlotById;
  }
  _eventMapper(eventHandler, node, eventName, handlerName) {
    node.addEventListener(eventName, event => {
      // TODO(sjmiles): we have an extremely minimalist approach to events here, this is useful IMO for
      // finding the smallest set of features that we are going to need.
      // First problem: click event firing multiple times as it bubbles up the tree, minimalist solution
      // is to enforce a 'first listener' rule by executing `stopPropagation`.
      event.stopPropagation();
      // propagate keyboard information
      const {altKey, ctrlKey, metaKey, shiftKey, code, key, repeat} = event;
      eventHandler({
        handler: handlerName,
        data: {
          // TODO(sjmiles): this is a data-key (as in key-value pair), may be confusing vs `keys`
          key: node.key,
          value: node.value,
          keys: {altKey, ctrlKey, metaKey, shiftKey, code, key, repeat}
        }
      });
    });
  }
}

class SetDomContext {
  constructor(containerKind) {
    this._contextBySubId = {};
    this._containerKind = containerKind;
  }
  initContext(context) {
    Object.keys(context).forEach(subId => {
      if (!this._contextBySubId[subId] || !this._contextBySubId[subId].isEqual(context[subId])) {
        this._contextBySubId[subId] = new DomContext(null, this._containerKind);
        this._contextBySubId[subId].subId = subId;
      }
      this._contextBySubId[subId].initContext(context[subId]);
    });
    // Delete sub-contexts that are not found in the new context.
    Object.keys(this._contextBySubId).forEach(subId => {
      if (!context[subId]) {
        delete this._contextBySubId[subId];
      }
    });
  }
  updateParticleName(slotName, particleName) {
    Object.values(this._contextBySubId).forEach(context => context.updateParticleName(slotName, particleName));
  }
  isEqual(context) {
    return Object.keys(this._contextBySubId).length == Object.keys(context).length &&
           !Object.keys(this._contextBySubId).find(c => this._contextBySubId[c] != context[c]);
  }
  updateModel(model) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(model.items, `Model must contain items`);
    model.items.forEach(item => {
      // Properties from item override properties from model.
      item = Object.assign(Object.assign({}, model), item);
      delete item.items;
      if (this._contextBySubId[item.subId]) {
        this._contextBySubId[item.subId].updateModel(item);
      }
    });
  }
  clear() {
    Object.values(this._contextBySubId).forEach(context => context.clear());
  }
  createTemplateElement(template) {
    let templates = {};
    if (typeof template === 'string') {
      templates[''] = DomContext.createTemplateElement(template);
    } else {
      Object.keys(template).forEach(subId => {
        templates[subId] = this._contextBySubId[subId].createTemplateElement(template[subId]);
      });
    }
    return templates;
  }
  stampTemplate(template, eventHandler, eventMapper) {
    Object.keys(this._contextBySubId).forEach(subId => {
      let templateForSubId = template[subId] || template[''];
      if (templateForSubId) {
        this._contextBySubId[subId].stampTemplate(templateForSubId, eventHandler, eventMapper);
      }
    });
  }
  observe(observer) {
    Object.values(this._contextBySubId).forEach(context => context.observe(observer));
  }
  getInnerContext(innerSlotName) {
    let innerContexts = {};
    Object.keys(this._contextBySubId).forEach(subId => {
      innerContexts[subId] = this._contextBySubId[subId].getInnerContext(innerSlotName);
    });
    return innerContexts;
  }
  initInnerContexts(slotSpec) {
    Object.keys(this._contextBySubId).forEach(subId => this._contextBySubId[subId].initInnerContexts(slotSpec, subId));
  }
  isDirectInnerSlot(slot) {
    return Object.values(this._contextBySubId).find(context => context.isDirectInnerSlot(slot)) != null;
  }
}




/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__relation_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbols_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_spec_js__ = __webpack_require__(9);
/** @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





let identifier = __WEBPACK_IMPORTED_MODULE_2__symbols_js__["a" /* default */].identifier;



// TODO: This won't be needed once runtime is transferred between contexts.
function cloneData(data) {
  return data;
  //return JSON.parse(JSON.stringify(data));
}

function restore(entry, entityClass) {
  let {id, rawData} = entry;
  let entity = new entityClass(cloneData(rawData));
  if (entry.id) {
    entity.identify(entry.id);
  }

  // TODO some relation magic, somewhere, at some point.

  return entity;
}

/** @class Handle
 * Base class for Collections and Variables.
 */
class Handle {
  constructor(proxy, particleId, canRead, canWrite) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(!(proxy instanceof Handle));
    this._proxy = proxy;
    this.canRead = canRead;
    this.canWrite = canWrite;
    this._particleId = particleId;
  }
  underlyingProxy() {
    return this._proxy;
  }
  /** @method on(kind, callback, target)
   * Register for callbacks every time the requested kind of event occurs.
   * Events are grouped into delivery sets by target, which should therefore
   * be the recieving particle.
   */
  on(kind, callback, target) {
    return this._proxy.on(kind, callback, target, this._particleId);
  }

  synchronize(kind, modelCallback, callback, target) {
    return this._proxy.synchronize(kind, modelCallback, callback, target, this._particleId);
  }

  generateID() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(this._proxy.generateID);
    return this._proxy.generateID();
  }

  generateIDComponents() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(this._proxy.generateIDComponents);
    return this._proxy.generateIDComponents();
  }

  _serialize(entity) {
    if (!entity.isIdentified())
      entity.createIdentity(this.generateIDComponents());
    let id = entity[identifier];
    let rawData = entity.dataClone();
    return {
      id,
      rawData
    };
  }

  _restore(entry) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* default */])(this.entityClass, 'Handles need entity classes for deserialization');
    return restore(entry, this.entityClass);
  }

  get type() {
    return this._proxy._type;
  }
  get name() {
    return this._proxy.name;
  }

  get _id() {
    return this._proxy._id;
  }

  toManifestString() {
    return `'${this._id}'`;
  }
}

/** @class Collection
 * A handle on a set of Entity data. Note that, as a set, a Collection can only
 * contain a single version of an Entity for each given ID. Further, no order is
 * implied by the set. A particle's manifest dictates the types of handles that
 * need to be connected to that particle, and the current recipe identifies
 * which handles are connected.
 */
class Collection extends Handle {
  constructor(proxy, particleId, canRead, canWrite) {
    // TODO: this should talk to an API inside the PEC.
    super(proxy, particleId, canRead, canWrite);
  }
  query() {
    // TODO: things
  }
  /** @method async toList()
   * Returns a list of the Entities contained by the handle.
   * throws: Error if this handle is not configured as a readable handle (i.e. 'in' or 'inout')
     in the particle's manifest.
   */
  async toList() {
    // TODO: remove this and use query instead
    if (!this.canRead)
      throw new Error('Handle not readable');
    return (await this._proxy.toList(this._particleId)).map(a => this._restore(a));
  }

  /** @method store(entity)
   * Stores a new entity into the Handle.
   * throws: Error if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async store(entity) {
    if (!this.canWrite)
      throw new Error('Handle not writeable');
    let serialization = this._serialize(entity);
    return this._proxy.store(serialization, this._particleId);
  }

  /** @method remove(entity)
   * Removes an entity from the Handle.
   * throws: Error if this handle is not configured as a writeable handle (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async remove(entity) {
    if (!this.canWrite)
      throw new Error('View not writeable');
    let serialization = this._serialize(entity);
    return this._proxy.remove(serialization.id, this._particleId);
  }
}

/** @class Variable
 * A handle on a single entity. A particle's manifest dictates
 * the types of handles that need to be connected to that particle, and
 * the current recipe identifies which handles are connected.
 */
class Variable extends Handle {
  constructor(variable, canRead, canWrite, particleId) {
    super(variable, canRead, canWrite, particleId);
  }

  /** @method async get()
  * Returns the Entity contained by the Variable, or undefined if the Variable
  * is cleared.
  * throws: Error if this variable is not configured as a readable handle (i.e. 'in' or 'inout')
    in the particle's manifest.
   */
  async get() {
    if (!this.canRead)
      throw new Error('View not readable');
    let result = await this._proxy.get(this._particleId);
    if (result == null)
      return undefined;
    if (this.type.isEntity)
      return this._restore(result);
    if (this.type.isInterface)
      return __WEBPACK_IMPORTED_MODULE_4__particle_spec_js__["a" /* default */].fromLiteral(result);
    return result;
  }

  /** @method set(entity)
   * Stores a new entity into the Variable, replacing any existing entity.
   * throws: Error if this variable is not configured as a writeable handle (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async set(entity) {
    if (!this.canWrite)
      throw new Error('View not writeable');
    return this._proxy.set(this._serialize(entity), this._particleId);
  }

  /** @method clear()
   * Clears any entity currently in the Variable.
   * throws: Error if this variable is not configured as a writeable handle (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async clear() {
    if (!this.canWrite)
      throw new Error('View not writeable');
    await this._proxy.clear(this._particleId);
  }
}

function handleFor(proxy, isSet, particleId, canRead = true, canWrite = true) {
  return (isSet || (isSet == undefined && proxy.type.isSetView))
      ? new Collection(proxy, particleId, canRead, canWrite)
      : new Variable(proxy, particleId, canRead, canWrite);
}

/* harmony default export */ __webpack_exports__["a"] = ({handleFor});


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particle_spec_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transformation_dom_particle_js__ = __webpack_require__(23);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





class MultiplexerDomParticle extends __WEBPACK_IMPORTED_MODULE_1__transformation_dom_particle_js__["a" /* default */] {
  constructor() {
    super();
    this._itemSubIdByHostedSlotId = new Map();
    this._connByHostedConn = new Map();
  }

  async _mapParticleConnections(
      listHandleName,
      particleHandleName,
      hostedParticle,
      views,
      arc) {
    let otherMappedViews = [];
    let otherConnections = [];
    let index = 2;
    const skipConnectionNames = [listHandleName, particleHandleName];
    for (let [connectionName, otherView] of views) {
      if (skipConnectionNames.includes(connectionName)) {
        continue;
      }
      // TODO(wkorman): For items with embedded recipes we may need a map
      // (perhaps id to index) to make sure we don't map a handle into the inner
      // arc multiple times unnecessarily.
      otherMappedViews.push(
          `map '${await arc.mapHandle(otherView._proxy)}' as v${index}`);
      let hostedOtherConnection = hostedParticle.connections.find(
          conn => conn.isCompatibleType(otherView.type));
      if (hostedOtherConnection) {
        otherConnections.push(`${hostedOtherConnection.name} <- v${index++}`);
        // TODO(wkorman): For items with embedded recipes where we may have a
        // different particle rendering each item, we need to track
        // |connByHostedConn| keyed on the particle type.
        this._connByHostedConn.set(hostedOtherConnection.name, connectionName);
      }
    }
    return [otherMappedViews, otherConnections];
  }

  async setViews(views) {
    this.handleIds = {};
    let arc = await this.constructInnerArc();
    const listHandleName = 'list';
    const particleHandleName = 'hostedParticle';
    let particleView = views.get(particleHandleName);
    let hostedParticle = null;
    let otherMappedViews = [];
    let otherConnections = [];
    if (particleView) {
      hostedParticle = await particleView.get();
      if (hostedParticle) {
        [otherMappedViews, otherConnections] =
            await this._mapParticleConnections(
                listHandleName, particleHandleName, hostedParticle, views, arc);
      }
    }
    this.setState({
      arc,
      type: views.get(listHandleName).type,
      hostedParticle,
      otherMappedViews,
      otherConnections
    });

    super.setViews(views);
  }

  async willReceiveProps(
      {list},
      {arc, type, hostedParticle, otherMappedViews, otherConnections}) {
    if (list.length > 0) {
      this.relevance = 0.1;
    }

    for (let [index, item] of list.entries()) {
      if (this.handleIds[item.id]) {
        let itemView = await this.handleIds[item.id];
        itemView.set(item);
        continue;
      }

      let itemViewPromise =
          arc.createHandle(type.primitiveType(), 'item' + index);
      this.handleIds[item.id] = itemViewPromise;

      let itemView = await itemViewPromise;

      if (!hostedParticle) {
        // If we're muxing on behalf of an item with an embedded recipe, the
        // hosted particle should be retrievable from the item itself. Else we
        // just skip this item.
        if (!item.renderParticleSpec) {
          continue;
        }
        hostedParticle =
            __WEBPACK_IMPORTED_MODULE_0__particle_spec_js__["a" /* default */].fromLiteral(JSON.parse(item.renderParticleSpec));
        // Re-map compatible handles and compute the connections specific
        // to this item's render particle.
        const listHandleName = 'list';
        const particleHandleName = 'renderParticle';
        [otherMappedViews, otherConnections] =
            await this._mapParticleConnections(
                listHandleName,
                particleHandleName,
                hostedParticle,
                this._views,
                arc);
      }
      let hostedSlotName = [...hostedParticle.slots.keys()][0];
      let slotName = [...this.spec.slots.values()][0].name;
      let slotId = await arc.createSlot(
          this, slotName, hostedParticle.name, hostedSlotName);

      if (!slotId) {
        continue;
      }

      this._itemSubIdByHostedSlotId.set(slotId, item.id);

      try {
        await arc.loadRecipe(
            this.constructInnerRecipe(
                hostedParticle,
                item,
                itemView,
                {name: hostedSlotName, id: slotId},
                {connections: otherConnections, views: otherMappedViews}),
            this);
        itemView.set(item);
      } catch (e) {
        console.log(e);
      }
    }
  }

  combineHostedModel(slotName, hostedSlotId, content) {
    let subId = this._itemSubIdByHostedSlotId.get(hostedSlotId);
    if (!subId) {
      return;
    }
    let items = this._state.renderModel ? this._state.renderModel.items : [];
    let listIndex = items.findIndex(item => item.subId == subId);
    let item = Object.assign({}, content.model, {subId});
    if (listIndex >= 0 && listIndex < items.length) {
      items[listIndex] = item;
    } else {
      items.push(item);
    }
    this._setState({renderModel: {items}});
  }

  combineHostedTemplate(slotName, hostedSlotId, content) {
    if (!this._state.template && !!content.template) {
      let template = content.template;
      // Replace hosted particle connection in template with the corresponding particle connection names.
      // TODO: make this generic!
      this._connByHostedConn.forEach((conn, hostedConn) => {
        template = template.replace(
            new RegExp(`{{${hostedConn}.description}}`, 'g'),
            `{{${conn}.description}}`);
      });
      this._setState({template});
    }
  }

  // Abstract
  constructInnerRecipe(hostedParticle, item, itemView, slot, other) {
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiplexerDomParticle;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_checker_js__ = __webpack_require__(10);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class Handle {
  constructor(recipe) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipe);
    this._recipe = recipe;
    this._id = null;
    this._localName = undefined;
    this._tags = [];
    this._type = undefined;
    this._fate = null;
    // TODO: replace originalFate and originalId with more generic mechanism for tracking
    // how and from what the recipe was generated.
    this._originalFate = null;
    this._originalId = null;
    this._connections = [];
    this._mappedType = undefined;
    this._storageKey = undefined;
    this._pattern = undefined;
  }

  _copyInto(recipe) {
    let handle = undefined;
    if (this._id !== null && ['map', 'use', 'copy'].includes(this.fate))
      handle = recipe.findHandle(this._id);

    if (handle == undefined) {
      handle = recipe.newHandle();
      handle._id = this._id;
      handle._tags = [...this._tags];
      handle._type = this._type;
      handle._fate = this._fate;
      handle._originalFate = this._originalFate;
      handle._originalId = this._originalId;
      handle._mappedType = this._mappedType;
      handle._storageKey = this._storageKey;

      // the connections are re-established when Particles clone their
      // attached HandleConnection objects.
      handle._connections = [];
      handle._pattern = this._pattern;
    }
    return handle;
  }

  _startNormalize() {
    this._localName = null;
    this._tags.sort();
    // TODO: type?
  }

  _finishNormalize() {
    for (let connection of this._connections) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(connection), `View connection '${connection.name}' is not frozen.`);
    }
    this._connections.sort(__WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables);
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this._id, other._id)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this._localName, other._localName)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareArrays(this._tags, other._tags, __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings)) != 0) return cmp;
    // TODO: type?
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.fate, other.fate)) != 0) return cmp;
    return 0;
  }

  // a resolved View has either an id or create=true
  get fate() { return this._fate || '?'; }
  set fate(fate) {
    if (this._originalFate == null) {
      this._originalFate = this._fate;
    }
    this._fate = fate;
  }
  get originalFate() { return this._originalFate || '?'; }
  get originalId() { return this._originalId; }
  get recipe() { return this._recipe; }
  get tags() { return this._tags; } // only tags owned by the view
  set tags(tags) { this._tags = tags; }
  get type() { return this._type; } // nullable
  get id() { return this._id; }
  set id(id) {
    if (!this._originalId) {
      this._originalId = this._id;
    }
    this._id = id;
  }
  mapToStorage(storage) {
    this._id = storage.id;
    this._type = undefined;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(storage.type == undefined || !(storage.type.hasVariableReference), `variable references shouldn't be part of handle types`);
    this._mappedType = storage.type;
    this._storageKey = storage.storageKey;
  }
  get localName() { return this._localName; }
  set localName(name) { this._localName = name; }
  get connections() { return this._connections; } // HandleConnection*
  get storageKey() { return this._storageKey; }
  set storageKey(key) { this._storageKey = key; }
  get pattern() { return this._pattern; }
  set pattern(pattern) { this._pattern = pattern; }

  static effectiveType(handleType, connections) {
    let typeSet = connections.filter(connection => connection.type != null).map(connection => ({type: connection.type, direction: connection.direction, connection}));
    return __WEBPACK_IMPORTED_MODULE_2__type_checker_js__["a" /* default */].processTypeList(handleType, typeSet);
  }

  _isValid(options) {
    let tags = new Set();
    for (let connection of this._connections) {
      // A remote view cannot be connected to an output param.
      if (this.fate == 'map' && ['out', 'inout'].includes(connection.direction)) {
        if (options && options.errors) {
          options.errors.set(this, `Invalid fate '${this.fate}' for handle '${this}'; it is used for '${connection.direction}' ${connection.particle.name}::${connection.name} connection`);
        }
        return false;
      }
      connection.tags.forEach(tag => tags.add(tag));
    }
    let type = Handle.effectiveType(this._mappedType, this._connections);
    if (type) {
      this._type = type;
      this._tags.forEach(tag => tags.add(tag));
      this._tags = [...tags];
      return true;
    }
    if (options && options.errors) {
      // TODO: pass options to TypeChecker.processTypeList for better error.
      options.errors.set(this, `Type validations failed for handle '${this}'`);
    }
    return false;
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));
    if (!this._type) {
      if (options) {
        options.details = 'missing type';
      }
      return false;
    }
    if ((!this.type.isResolved() && this.fate !== 'create') || (!this.type.canEnsureResolved() && this.fate == 'create')) {
      if (options) {
        options.details = 'unresolved type';
      }
      return false;
    }
    switch (this.fate) {
      case '?': {
        if (options) {
          options.details = 'missing fate';
        }
        return false;
      }
      case 'copy':
      case 'map':
      case 'use': {
        if (options && this.id === null) {
          options.details = 'missing id';
        }
        return this.id !== null;
      }
      case 'create':
        return true;
      default: {
        if (options) {
          options.details = `invalid fate ${this.fate}`;
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(false, `Unexpected fate: ${this.fate}`);
      }
    }
  }

  toString(nameMap, options) {
    // TODO: type? maybe output in a comment
    let result = [];
    result.push(this.fate);
    if (this.id) {
      result.push(`'${this.id}'`);
    }
    result.push(...this.tags);
    result.push(`as ${(nameMap && nameMap.get(this)) || this.localName}`);
    if (this.type) {
      result.push('//');
      result.push(this.type.resolvedType().toString());
    }
    if (options && options.showUnresolved) {
      let options = {};
      if (!this.isResolved(options)) {
        result.push(` // unresolved view: ${options.details}`);
      }
    }

    return result.join(' ');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Handle);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class Search {
  constructor(phrase, unresolvedTokens) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(phrase);

    this._phrase = '';
    this._unresolvedTokens = [];
    this._resolvedTokens = [];

    this.appendPhrase(phrase, unresolvedTokens);
  }
  appendPhrase(phrase, unresolvedTokens) {
    // concat phrase
    if (this._phrase.length > 0) {
      this._phrase = this.phrase.concat(' ');
    }
    this._phrase = this._phrase.concat(phrase);

    // update tokens
    let newTokens = phrase.toLowerCase().split(/[^a-z0-9]/g);
    newTokens.forEach(t => {
      if (!unresolvedTokens || unresolvedTokens.indexOf(t) >= 0) {
        this._unresolvedTokens.push(t);
      } else {
        this._resolvedTokens.push(t);
      }
    });
  }
  get phrase() { return this._phrase; }
  get unresolvedTokens() { return this._unresolvedTokens; }
  get resolvedTokens() { return this._resolvedTokens; }
  resolveToken(token) {
    let index = this.unresolvedTokens.indexOf(token.toLowerCase());
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(index >= 0, `Cannot resolved nonexistent token ${token}`);
    this._unresolvedTokens.splice(index, 1);
    this._resolvedTokens.push(token.toLowerCase());
  }

  isValid() {
    return this._unresolvedTokens.length > 0 || this._resolvedTokens.length > 0;
  }

  isResolved() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));
    // Recipe is considered resolved, if at least one of the search tokens was resolved.
    // TODO: Unresolved tokens don't prevent the recipe from being resolved. For now...
    return this._resolvedTokens.length > 0;
  }

  _normalize() {
    this._unresolvedTokens.sort();
    this._resolvedTokens.sort();

    Object.freeze(this);
  }

  _copyInto(recipe) {
    if (recipe.search) {
      recipe.search.appendPhrase(this.phrase, this.unresolvedTokens);
    } else {
      recipe.search = new Search(this.phrase, this.unresolvedTokens);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipe.search.resolvedTokens.length == this.resolvedTokens.length);
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.resolvedTokens.every(rt => recipe.search.resolvedTokens.indexOf(rt) >= 0) &&
           this.unresolvedTokens.every(rt => recipe.search.unresolvedTokens.indexOf(rt) >= 0));
    return recipe.search;
  }

  toString(options) {
    let result = [];
    result.push(`search \`${this.phrase}\``);

    let tokenStr = [];
    tokenStr.push('  tokens');
    if (this.unresolvedTokens.length > 0) {
      tokenStr.push(this.unresolvedTokens.map(t => `\`${t}\``).join(' '));
    }
    if (this.resolvedTokens.length > 0) {
      tokenStr.push(`// ${this.resolvedTokens.map(t => `\`${t}\``).join(' ')}`);
    }
    if (options && options.showUnresolved) {
      if (this.unresolvedTokens.length > 0) {
        tokenStr.push('// unresolved search tokens');
      }
    }
    result.push(tokenStr.join(' '));

    return result.join('\n');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Search);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbols_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entity_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__schema_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__relation_js__ = __webpack_require__(19);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */








function testEntityClass(type) {
  return new __WEBPACK_IMPORTED_MODULE_3__schema_js__["a" /* default */]({
    names: [type],
    fields: {
      id: 'Number',
      value: 'Text',
    },
  }).entityClass();
}

let BasicEntity = testEntityClass('BasicEntity');

/* unused harmony default export */ var _unused_webpack_default_export = ({
  Entity: __WEBPACK_IMPORTED_MODULE_2__entity_js__["a" /* default */],
  Relation: __WEBPACK_IMPORTED_MODULE_5__relation_js__["a" /* default */],
  testing: {
    testEntityClass,
  },
  internals: {
    identifier: __WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* default */].identifier,
    Type: __WEBPACK_IMPORTED_MODULE_4__type_js__["a" /* default */],
  }
});


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




class Slot {
  constructor(consumeConn, arc) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(consumeConn);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(arc);
    this._consumeConn = consumeConn;
    this._arc = arc;
    this._context = null;
    this.startRenderCallback = null;
    this.stopRenderCallback = null;
    this._hostedSlotById = new Map();
  }
  get consumeConn() { return this._consumeConn; }
  get arc() { return this._arc; }
  getContext() { return this._context; }
  setContext(context) { this._context = context; }
  isSameContext(context) { return this._context == context; }

  updateContext(context) {
    // do nothing, if context unchanged.
    if ((!this.getContext() && !context) ||
        (this.getContext() && context && this.isSameContext(context))) {
      return;
    }

    // update the context;
    let wasNull = !this.getContext();
    this.setContext(context);
    if (this.getContext()) {
      if (wasNull) {
        this.startRender();
      }
    } else {
      this.stopRender();
    }
  }
  startRender() {
    if (this.startRenderCallback) {
      const slotName = this.consumeConn.name;
      const particle = this.consumeConn.particle;
      const context = this.getContext();
      if (context.updateParticleName) {
        context.updateParticleName(slotName, particle.name);
      }
      const contentTypes = this.constructRenderRequest();
      this.startRenderCallback({particle, slotName, contentTypes});

      for (let hostedSlot of this._hostedSlotById.values()) {
        if (hostedSlot.particle) {
          // Note: hosted particle may still not be set, if the hosted slot was already created, but the inner recipe wasn't instantiate yet.
          this.startRenderCallback({particle: hostedSlot.particle, slotName: hostedSlot.slotName, contentTypes});
        }
      }
    }
  }

  stopRender() {
    if (this.stopRenderCallback) {
      this.stopRenderCallback({particle: this.consumeConn.particle, slotName: this.consumeConn.name});

      for (let hostedSlot of this._hostedSlotById.values()) {
        this.stopRenderCallback({particle: hostedSlot.particle, slotName: hostedSlot.slotName});
      }
    }
  }

  async populateHandleDescriptions() {
    let descriptions = {};
    await Promise.all(Object.values(this.consumeConn.particle.connections).map(async handleConn => {
      if (handleConn.handle) {
        descriptions[`${handleConn.name}.description`] = (await this._arc.description.getHandleDescription(handleConn.handle)).toString();
      }
    }));
    return descriptions;
  }

  addHostedSlot(hostedSlotId, hostedParticleName, hostedSlotName) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(hostedSlotId, `Hosted slot ID must be provided`);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._hostedSlotById.has(hostedSlotId), `Hosted slot ${hostedSlotId} already exists`);
    this._hostedSlotById.set(hostedSlotId, {slotId: hostedSlotId, particleName: hostedParticleName, slotName: hostedSlotName});
    return hostedSlotId;
  }
  getHostedSlot(hostedSlotId) {
    return this._hostedSlotById.get(hostedSlotId);
  }
  findHostedSlot(hostedParticle, hostedSlotName) {
    for (let hostedSlot of this._hostedSlotById.values()) {
      if (hostedSlot.particle == hostedParticle && hostedSlot.slotName == hostedSlotName) {
        return hostedSlot;
      }
    }
  }
  initHostedSlot(hostedSlotId, hostedParticle) {
    let hostedSlot = this.getHostedSlot(hostedSlotId);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(hostedSlot, `Hosted slot ${hostedSlotId} doesn't exist`);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(hostedSlot.particleName == hostedParticle.name,
           `Unexpected particle name ${hostedParticle.name} for slot ${hostedSlotId}; expected: ${hostedSlot.particleName}`);
    hostedSlot.particle = hostedParticle;
    if (this.getContext() && this.startRenderCallback) {
      this.startRenderCallback({particle: hostedSlot.particle, slotName: hostedSlot.slotName, contentTypes: this.constructRenderRequest()});
    }
  }

  // Abstract methods.
  async setContent(content, handler) {}
  getInnerContext(slotName) {}
  constructRenderRequest() {}
  static findRootSlots(context) { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Slot;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


class KeyBase {
  childKeyForHandle(id) {
    throw 'NotImplemented';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyBase;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_util_js__ = __webpack_require__(5);
// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class StorageProviderBase {
  constructor(type, arcId, name, id, key) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(id, 'id must be provided when constructing StorageProviders');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!type.hasUnresolvedVariable, 'Storage types must be concrete');
    let trace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: 'view', name: 'StorageProviderBase::constructor', args: {type: type.key, name: name}});
    this._type = type;
    this._arcId = arcId;
    this._listeners = new Map();
    this.name = name;
    this._version = 0;
    this.id = id;
    this.source = null;
    this._storageKey = key;
    this._nextLocalID = 0;
    trace.end();
  }

  get storageKey() {
    return this._storageKey;
  }

  generateID() {
    return `${this.id}:${this._nextLocalID++}`;
  }

  generateIDComponents() {
    return {base: this.id, component: () => this._nextLocalID++};
  }

  get type() {
    return this._type;
  }
  // TODO: add 'once' which returns a promise.
  on(kind, callback, target) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(target !== undefined, 'must provide a target to register a storage event handler');
    let scheduler = target._scheduler;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(scheduler !== undefined, 'must provider a scheduler to register a storage event handler');
    let listeners = this._listeners.get(kind) || new Map();
    listeners.set(callback, {version: -Infinity, target, scheduler});
    this._listeners.set(kind, listeners);
  }

  _fire(kind, details) {
    let listenerMap = this._listeners.get(kind);
    if (!listenerMap || listenerMap.size == 0)
      return;

    let callTrace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: 'view', name: 'StorageProviderBase::_fire', args: {kind, type: this._type.key,
        name: this.name, listeners: listenerMap.size}});

    // TODO: wire up a target (particle)
    let eventRecords = new Map();

    for (let [callback, registration] of listenerMap.entries()) {
      let target = registration.target;
      if (!eventRecords.has(registration.scheduler))
        eventRecords.set(registration.scheduler, []);
      eventRecords.get(registration.scheduler).push({target, callback, kind, details});
    }
    eventRecords.forEach((records, scheduler) => scheduler.enqueue(this, records));
    callTrace.end();
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_2__recipe_util_js__["a" /* default */].compareStrings(this.name, other.name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_2__recipe_util_js__["a" /* default */].compareNumbers(this._version, other._version)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_2__recipe_util_js__["a" /* default */].compareStrings(this.source, other.source)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_2__recipe_util_js__["a" /* default */].compareStrings(this.id, other.id)) != 0) return cmp;
    return 0;
  }

  toString(viewTags) {
    let results = [];
    let viewStr = [];
    viewStr.push(`view`);
    if (this.name) {
      viewStr.push(`${this.name}`);
    }
    viewStr.push(`of ${this.type.toString()}`);
    if (this.id) {
      viewStr.push(`'${this.id}'`);
    }
    if (viewTags && viewTags.length) {
      viewStr.push(`${[...viewTags].join(' ')}`);
    }
    if (this.source) {
      viewStr.push(`in '${this.source}'`);
    }
    results.push(viewStr.join(' '));
    if (this.description)
      results.push(`  description \`${this.description}\``);
    return results.join('\n');
  }

  get apiChannelMappingId() {
    return this.id;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StorageProviderBase;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__in_memory_storage_js__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firebase_storage_js__ = __webpack_require__(92);
// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class StorageProviderFactory {
  constructor(arcId) {
    this._arcId = arcId;
    this._storageInstances = {'in-memory': new __WEBPACK_IMPORTED_MODULE_0__in_memory_storage_js__["a" /* default */](arcId), 'firebase': new __WEBPACK_IMPORTED_MODULE_1__firebase_storage_js__["a" /* default */](arcId)};
  }

  _storageForKey(key) {
    let protocol = key.split(':')[0];
    return this._storageInstances[protocol];
  }

  async construct(id, type, keyFragment) {
    return this._storageForKey(keyFragment).construct(id, type, keyFragment);
  }

  async connect(id, type, key) {
    return this._storageForKey(key).connect(id, type, key);
  }

  parseStringAsKey(string) {
    return this._storageForKey(string).parseStringAsKey(string);
  }

  newKey(id, associatedKeyFragment) {

  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StorageProviderFactory;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class AddUseViews extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  // TODO: move generation to use an async generator.
  async generate(inputParams) {
    return __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onRecipe(recipe) {
        // Don't add use handles while there are outstanding constraints
        if (recipe.connectionConstraints.length > 0)
          return;
        // Don't add use handles to a recipe with free handles
        let freeHandles = recipe.handles.filter(handle => handle.connections.length == 0);
        if (freeHandles.length > 0)
          return;

        // TODO: "description" handles are always created, and in the future they need to be "optional" (blocked by optional handles
        // not being properly supported in arc instantiation). For now just hardcode skiping them.
        let disconnectedConnections = recipe.handleConnections.filter(hc => hc.handle == null && !hc.isOptional && hc.name != 'descriptions');
        if (disconnectedConnections.length == 0) {
          return;
        }

        return recipe => {
          disconnectedConnections.forEach(hc => {
            let clonedHC = recipe.updateToClone({hc}).hc;
            let handle = recipe.newHandle();
            handle.fate = 'use';
            clonedHC.connectToHandle(handle);
          });
          return 0;
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AddUseViews;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__schema_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt










class AssignRemoteViews extends __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__["a" /* default */] {
  constructor(arc) {
    super();
    this._arc = arc;
    this.fate = 'map';
  }

  getMappableViews(type, tags=[]) {
    return this._arc.context.findStorageByType(type, {tags, subtype: true});
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssignRemoteViews;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt









class AssignViewsByTagAndType extends __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__["a" /* default */] {
  constructor(arc) {
    super();
    this.arc = arc;
    this.fate = 'use';
  }

  getMappableViews(type, tags, counts) {
    // We can use a handle that has a subtype only when all of the connections
    // are inputs.
    let subtype = counts.out == 0;
    if (tags.length > 0) {
      return this.arc.findHandlesByType(type, {tags, subtype});
    } else {
      return this.arc.findHandlesByType(type);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AssignViewsByTagAndType;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class ConvertConstraintsToConnections extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor(arc) {
    super();
    this.affordance = arc.pec.slotComposer ? arc.pec.slotComposer.affordance : null;
  }
  async generate(inputParams) {
    let affordance = this.affordance;
    return __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onRecipe(recipe) {
        let particles = new Set();
        let views = new Set();
        let map = {};
        let particlesByName = {};
        let viewCount = 0;
        if (recipe.connectionConstraints.length == 0) {
          return;
        }

        for (let constraint of recipe.connectionConstraints) {
          if (affordance && (!constraint.fromParticle.matchAffordance(affordance) || !constraint.toParticle.matchAffordance(affordance))) {
            return;
          }
          particles.add(constraint.fromParticle.name);
          if (map[constraint.fromParticle.name] == undefined) {
            map[constraint.fromParticle.name] = {};
            particlesByName[constraint.fromParticle.name] = constraint.fromParticle;
          }
          particles.add(constraint.toParticle.name);
          if (map[constraint.toParticle.name] == undefined) {
            map[constraint.toParticle.name] = {};
            particlesByName[constraint.toParticle.name] = constraint.toParticle;
          }
          let view = map[constraint.fromParticle.name][constraint.fromConnection] || map[constraint.toParticle.name][constraint.toConnection];
          if (view == undefined) {
            view = 'v' + viewCount++;
            views.add(view);
          }
          map[constraint.fromParticle.name][constraint.fromConnection] = view;
          map[constraint.toParticle.name][constraint.toConnection] = view;
        }
        let shape = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].makeShape([...particles.values()], [...views.values()], map);
        let results = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].find(recipe, shape);

        return results.filter(match => {
          // Ensure that every handle is either matched, or an input of at least one
          // connected particle in the constraints.
          let resolvedHandles = {};
          for (let particle in map) {
            for (let connection in map[particle]) {
              let handle = map[particle][connection];
              if (resolvedHandles[handle]) {
                continue;
              }
              if (match.match[handle]) {
                resolvedHandles[handle] = true;
              } else {
                let spec = particlesByName[particle];
                resolvedHandles[handle] = spec.isOutput(connection);
              }
            }
          }
          return Object.values(resolvedHandles).every(value => value);
        }).map(match => {
          return (recipe) => {
            let score = recipe.connectionConstraints.length + match.score;
            let recipeMap = recipe.updateToClone(match.match);
            for (let particle in map) {
              for (let connection in map[particle]) {
                let view = map[particle][connection];
                let recipeParticle = recipeMap[particle];
                if (recipeParticle == null) {
                  recipeParticle = recipe.newParticle(particle);
                  recipeParticle.spec = particlesByName[particle];
                  recipeMap[particle] = recipeParticle;
                }
                let recipeHandleConnection = recipeParticle.connections[connection];
                if (recipeHandleConnection == undefined)
                  recipeHandleConnection = recipeParticle.addConnectionName(connection);
                let recipeView = recipeMap[view];
                if (recipeView == null) {
                  recipeView = recipe.newHandle();
                  recipeView.fate = 'create';
                  recipeMap[view] = recipeView;
                }
                if (recipeHandleConnection.handle == null)
                  recipeHandleConnection.connectToHandle(recipeView);
              }
            }
            recipe.clearConnectionConstraints();
            return score;
          };
        });
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Independent), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ConvertConstraintsToConnections;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__schema_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt










class CopyRemoteViews extends __WEBPACK_IMPORTED_MODULE_4__view_mapper_base_js__["a" /* default */] {
  constructor(arc) {
    super();
    this._arc = arc;
    this.fate = 'copy';
  }

  getMappableViews(type, tags=[]) {
    return this._arc.context.findStorageByType(type, {tags, subtype: true});
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CopyRemoteViews;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class CreateDescriptionHandle extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["c" /* Strategy */] {
  async generate(inputParams) {
    return __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */] {
      onHandleConnection(recipe, handleConnection) {
        if (handleConnection.handle)
          return;
        if (handleConnection.name != 'descriptions')
          return;

        return (recipe, handleConnection) => {
          let handle = recipe.newHandle();
          handle.fate = 'create';
          handleConnection.connectToHandle(handle);
          return 1;
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */].Permuted), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CreateDescriptionHandle;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class CreateViews extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  // TODO: move generation to use an async generator.
  async generate(inputParams) {
    return __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */] {
      onView(recipe, view) {
        let counts = __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_util_js__["a" /* default */].directionCounts(view);

        // Don't make a 'create' handle, unless there is someone reading,
        // someone writing and at least 2 particles invloved.
        if (counts.in == 0 || counts.out == 0
            // TODO: Allow checking number of particles without touching privates.
            || new Set(view.connections.map(hc => hc._particle)).size <= 1) {
          return;
        }

        if (!view.id && view.fate == '?') {
          return (recipe, view) => {view.fate = 'create'; return 1;};
        }
      }
    }(__WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */].Permuted), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CreateViews;



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);

// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class FallbackFate extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["c" /* Strategy */] {
  getResults(inputParams) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(inputParams);
    let generated = inputParams.generated.filter(result => !result.result.isResolved());
    let terminal = inputParams.terminal;
    return [...generated, ...terminal];
  }

  async generate(inputParams) {
    return __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */] {
      onView(recipe, view) {
        // Only apply this strategy only to user query based recipes with resolved tokens.
        if (!recipe.search || (recipe.search.resolvedTokens.length == 0)) {
          return;
        }

        // Only apply to views whose fate is set, but wasn't explicitly defined in the recipe.
        if (view.isResolved() || view.fate == '?' || view.originalFate != '?') {
          return;
        }

        let hasOutConns = view.connections.some(hc => hc.isOutput);
        let newFate = hasOutConns ? 'copy' : 'map';
        if (view.fate == newFate) {
          return;
        }

        return (recipe, clonedView) => {
          clonedView.fate = newFate;
          return 0;
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */].Permuted), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FallbackFate;



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class GroupHandleConnections extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor() {
    super();

    this._walker = new class extends __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */] {
      onRecipe(recipe) {
        // Only apply this strategy if ALL handle connections are named and have types.
        if (recipe.handleConnections.find(hc => !hc.type || !hc.name || hc.isOptional)) {
          return;
        }
        // Find all unique types used in the recipe that have unbound handle connections.
        let types = new Set();
        recipe.handleConnections.forEach(hc => {
          if (!hc.isOptional && !hc.handle && !Array.from(types).find(t => t.equals(hc.type))) {
            types.add(hc.type);
          }
        });

        let groupsByType = new Map();
        types.forEach(type => {
          // Find the particle with the largest number of unbound connections of the same type.
          let countConnectionsByType = (connections) => Object.values(connections).filter(conn => {
            return !conn.isOptional && !conn.handle && type.equals(conn.type);
          }).length;
          let sortedParticles = [...recipe.particles].sort((p1, p2) => {
            return countConnectionsByType(p2.connections) - countConnectionsByType(p1.connections);
          }).filter(p => countConnectionsByType(p.connections) > 0);
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(sortedParticles.length > 0);

          // Handle connections of the same particle cannot be bound to the same handle. Iterate on handle connections of the particle
          // with the most connections of the given type, and group each of them with same typed handle connections of other particles.
          let particleWithMostConnectionsOfType = sortedParticles[0];
          let groups = new Map();
          let allTypeHandleConnections = recipe.handleConnections.filter(c => {
            return !c.isOptional && !c.handle && type.equals(c.type) && (c.particle != particleWithMostConnectionsOfType);
          });

          let iteration = 0;
          while (allTypeHandleConnections.length > 0) {
            Object.values(particleWithMostConnectionsOfType.connections).forEach(handleConnection => {
              if (!type.equals(handleConnection.type)) {
                return;
              }
              if (!groups.has(handleConnection)) {
                groups.set(handleConnection, []);
              }
              let group = groups.get(handleConnection);

              // filter all connections where this particle is already in a group.
              let possibleConnections = allTypeHandleConnections.filter(c => !group.find(gc => gc.particle == c.particle));
              let selectedConn = possibleConnections.find(c => handleConnection.isInput != c.isInput || handleConnection.isOutput != c.isOutput);
              // TODO: consider tags.
              // TODO: Slots handle restrictions should also be accounted for when grouping.
              if (!selectedConn) {
                if (possibleConnections.length == 0 || iteration == 0) {
                  // During first iteration only bind opposite direction connections ("in" with "out" and vice versa)
                  // to ensure each group has both direction connections as much as possible.
                  return;
                }
                selectedConn = possibleConnections[0];
              }
              group.push(selectedConn);
              allTypeHandleConnections = allTypeHandleConnections.filter(c => c != selectedConn);
            });
            iteration++;
          }
          // Remove groups where no connections were bound together.
          groups.forEach((otherConns, conn) => {
            if (otherConns.length == 0) {
              groups.delete(conn);
            } else {
              otherConns.push(conn);
            }
          });

          if (groups.size !== 0) {
            groupsByType.set(type, groups);
          }
        });

        if (groupsByType.size > 0) return recipe => {
          groupsByType.forEach((groups, type) => {
            groups.forEach(group => {
              let recipeHandle = recipe.newHandle();
              group.forEach(conn => {
                let cloneConn = recipe.updateToClone({conn}).conn;
                cloneConn.connectToHandle(recipeHandle);
              });
            });
          });
          // TODO: score!
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */].Permuted);
  }
  get walker() {
    return this._walker;
  }
  async generate(inputParams) {
    return __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), this.walker, this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GroupHandleConnections;



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt



class InitPopulation extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor(arc) {
    super();
    this._recipes = [];
    for (let recipe of (arc.context.recipes || [])) {
      // Filter out recipes containing particles that don't support the current affordance.
      if (arc.pec.slotComposer) {
        if (recipe.particles.find(p => p.spec && !p.spec.matchAffordance(arc.pec.slotComposer.affordance)) !== undefined) {
          continue;
        }
      }
      recipe = recipe.clone();
      let options = {errors: new Map()};
      if (!recipe.normalize(options)) {
        console.warn(`could not normalize a context recipe: ${[...options.errors.values()].join('\n')}.\n${recipe.toString()}`);
      } else {
        this._recipes.push(recipe);
      }
    }
    this._loadedParticles = new Set(arc.loadedParticles().map(spec => spec.implFile));
  }
  async generate({generation}) {
    if (generation != 0) {
      return [];
    }
    return this._recipes.map(recipe => ({
      result: recipe,
      score: 1 - recipe.particles.filter(particle => particle.spec && this._loadedParticles.has(particle.spec.implFile)).length,
      derivation: [{strategy: this, parent: undefined}],
      hash: recipe.digest(),
      valid: Object.isFrozen(recipe),
    }));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InitPopulation;



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class InitSearch extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor(arc) {
    super();
    // TODO: Figure out where this should really come from.
    this._search = arc.search;
  }
  async generate({generation}) {
    if (this._search == null || generation != 0) {
      return [];
    }

    let recipe = new __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */]();
    recipe.setSearchPhrase(this._search);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(recipe.normalize());
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(!recipe.isResolved());

    return [{
      result: recipe,
      score: 0,
      derivation: [{strategy: this, parent: undefined}],
      hash: recipe.digest(),
    }];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InitSearch;



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







/*
 * Match free handles (i.e. handles that aren't connected to any connections)
 * to connections.
 */
class MatchFreeHandlesToConnections extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  async generate(inputParams) {
    let self = this;

    return __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__["a" /* default */] {
      onView(recipe, handle) {
        if (handle.connections.length > 0)
          return;

        let matchingConnections = recipe.handleConnections.filter(connection => connection.handle == undefined && connection.name !== 'descriptions');

        return matchingConnections.map(connection => {
          return (recipe, handle) => {
            let newConnection = recipe.updateToClone({connection}).connection;
            newConnection.connectToHandle(handle);
            return 1;
          };
        });
      }
    }(__WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__["a" /* default */].Permuted), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MatchFreeHandlesToConnections;



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class MatchParticleByVerb extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor(arc) {
    super();
    this._arc = arc;
  }

  async generate(inputParams) {
    let arc = this._arc;
    return __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onParticle(recipe, particle) {
        if (particle.name) {
          // Particle already has explicit name.
          return;
        }

        let particleSpecs = arc.context.findParticlesByVerb(particle.primaryVerb)
            .filter(spec => !arc.pec.slotComposer || spec.matchAffordance(arc.pec.slotComposer.affordance));

        return particleSpecs.map(spec => {
          return (recipe, particle) => {
            let score = 1;

            particle.name = spec.name;
            particle.spec = spec;

            return score;
          };
        });
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MatchParticleByVerb;



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_handle_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







// This strategy substitutes 'particle can verb' declarations with recipes, 
// according to the following conditions:
// 1) the recipe is named by the verb described in the particle
// 2) the recipe has the slot pattern (if any) owned by the particle
//
// The strategy also reconnects any slots that were connected to the 
// particle, so that the substituted recipe fully takes the particle's place. 
//
// Note that the recipe may have the slot pattern multiple times over, but
// this strategy currently only connects the first instance of the pattern up
// if there are multiple instances.
class MatchRecipeByVerb extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor(arc) {
    super();
    this._arc = arc;
  }

  async generate(inputParams) {
    let arc = this._arc;
    return __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onParticle(recipe, particle) {
        if (particle.name) {
          // Particle already has explicit name.
          return;
        }

        let recipes = arc.context.findRecipesByVerb(particle.primaryVerb);

        // Extract slot information from recipe. This is extracted in the form:
        // {consume-slot-name: targetSlot: <slot>, providedSlots: {provide-slot-name: <slot>}}
        // 
        // Note that slots are only included if connected to other components of the recipe - e.g.
        // the target slot has a source connection. 
        let slotConstraints = {};
        for (let consumeSlot of Object.values(particle.consumedSlotConnections)) {
          let targetSlot = consumeSlot.targetSlot && consumeSlot.targetSlot.sourceConnection ? consumeSlot.targetSlot : null;
          slotConstraints[consumeSlot.name] = {targetSlot, providedSlots: {}};
          for (let providedSlot of Object.keys(consumeSlot.providedSlots)) {
            let sourceSlot = consumeSlot.providedSlots[providedSlot].consumeConnections.length > 0 ? consumeSlot.providedSlots[providedSlot] : null;
            slotConstraints[consumeSlot.name].providedSlots[providedSlot] = sourceSlot;
          }
        }

        let handleConstraints = {named: {}, unnamed: []};
        for (let handleConnection of Object.values(particle.connections)) {
          handleConstraints.named[handleConnection.name] = {direction: handleConnection.direction, handle: handleConnection.handle};
        }
        for (let unnamedConnection of particle.unnamedConnections) {
          handleConstraints.unnamed.push({direction: unnamedConnection.direction, handle: unnamedConnection.handle});
        }

        recipes = recipes.filter(recipe => MatchRecipeByVerb.satisfiesSlotConstraints(recipe, slotConstraints))
                         .filter(recipe => MatchRecipeByVerb.satisfiesHandleConstraints(recipe, handleConstraints));

        return recipes.map(recipe => {
          return (outputRecipe, particleForReplacing) => {
            let {handles, particles, slots} = recipe.mergeInto(outputRecipe);

            particleForReplacing.remove();


            for (let consumeSlot in slotConstraints) {
              if (slotConstraints[consumeSlot].targetSlot || Object.values(slotConstraints[consumeSlot].providedSlots).filter(a => a != null).length > 0) {
                let slotMapped = false;                
                for (let particle of particles) {
                  if (MatchRecipeByVerb.slotsMatchConstraint(particle.consumedSlotConnections, consumeSlot, slotConstraints[consumeSlot].providedSlots)) {
                    if (slotConstraints[consumeSlot].targetSlot) {
                      let {mappedSlot} = outputRecipe.updateToClone({mappedSlot: slotConstraints[consumeSlot].targetSlot});
                      particle.consumedSlotConnections[consumeSlot]._targetSlot = mappedSlot;
                      mappedSlot._consumerConnections.push(particle.consumedSlotConnections[consumeSlot]); 
                    }
                    for (let slotName in slotConstraints[consumeSlot].providedSlots) {
                      let slot = slotConstraints[consumeSlot].providedSlots[slotName];
                      if (slot == null)
                        continue;
                      let {mappedSlot} = outputRecipe.updateToClone({mappedSlot: slot});
                      let oldSlot = particle.consumedSlotConnections[consumeSlot].providedSlots[slotName];
                      oldSlot.remove();
                      particle.consumedSlotConnections[consumeSlot].providedSlots[slotName] = mappedSlot;
                      mappedSlot._sourceConnection = particle.consumedSlotConnections[consumeSlot];
                    }
                    slotMapped = true;
                    break;
                  }
                }
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__["a" /* default */])(slotMapped);
              }
            }

            function tryApplyHandleConstraint(name, connection, constraint, handle) {
              if (connection.handle != null)
                return false;
              if (!MatchRecipeByVerb.connectionMatchesConstraint(connection, constraint))
                return false;
              for (let i = 0; i < handle.connections.length; i++) {
                let candidate = handle.connections[i];
                if (candidate.particle == particleForReplacing && candidate.name == name) {
                  connection._handle = handle;
                  handle.connections[i] = connection;
                  return true;
                }              
              }
              return false;
            }

            function applyHandleConstraint(name, constraint, handle) {
              let {mappedHandle} = outputRecipe.updateToClone({mappedHandle: handle});
              for (let particle of particles) {
                if (name) {
                  if (tryApplyHandleConstraint(name, particle.connections[name], constraint, mappedHandle))
                    return true;
                } else {
                  for (let connection of Object.values(particle.connections)) {
                    if (tryApplyHandleConstraint(name, connection, constraint, mappedHandle))
                      return true;
                  }
                }
              }
              return false;
            } 

            for (let name in handleConstraints.named) {
              if (handleConstraints.named[name].handle)
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__["a" /* default */])(applyHandleConstraint(name, handleConstraints.named[name], handleConstraints.named[name].handle));
            }

            for (let connection of handleConstraints.unnamed) {
              if (connection.handle)
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__["a" /* default */])(applyHandleConstraint(null, connection, connection.handle));
            }

            return 1;
          };
        });
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);
  }

  static satisfiesHandleConstraints(recipe, handleConstraints) {
    for (let handleName in handleConstraints.named)
      if (!MatchRecipeByVerb.satisfiesHandleConnection(recipe, handleName, handleConstraints.named[handleName]))
        return false;
    for (let handleData of handleConstraints.unnamed) {
      if (!MatchRecipeByVerb.satisfiesUnnamedHandleConnection(recipe, handleData))
        return false;
    }
    return true;
  }

  static satisfiesUnnamedHandleConnection(recipe, handleData) {
    // refuse to match unnamed handle connections unless some type information is present.
    if (!handleData.handle)
      return false;
    for (let particle of recipe.particles) {
      for (let connection of Object.values(particle.connections)) {
        if (MatchRecipeByVerb.connectionMatchesConstraint(connection, handleData))
          return true;
      }
    }
    return false;
  }

  static satisfiesHandleConnection(recipe, handleName, handleData) {
    for (let particle of recipe.particles) {
      if (particle.connections[handleName]) {
        if (MatchRecipeByVerb.connectionMatchesConstraint(particle.connections[handleName], handleData))
          return true;
      }
    }
    return false;
  }

  static connectionMatchesConstraint(connection, handleData) {
    if (connection.direction !== handleData.direction)
      return false;
    if (!handleData.handle)
      return true;
    return __WEBPACK_IMPORTED_MODULE_3__recipe_handle_js__["a" /* default */].effectiveType(handleData.handle._mappedType, handleData.handle.connections.concat(connection)) != null;
  }

  static satisfiesSlotConstraints(recipe, slotConstraints) {
    for (let slotName in slotConstraints)
      if (!MatchRecipeByVerb.satisfiesSlotConnection(recipe, slotName, slotConstraints[slotName]))
        return false;
    return true;
  }

  static satisfiesSlotConnection(recipe, slotName, constraints) {
    for (let particle of recipe.particles) {
      if (MatchRecipeByVerb.slotsMatchConstraint(particle.consumedSlotConnections, slotName, constraints))
        return true;
    }
    return false;
  }

  static slotsMatchConstraint(connections, name, constraints) {
    if (connections[name] == null)
      return false;
    if (connections[name]._targetSlot != null && constraints.targetSlot != null)
      return false;
    for (let provideName in constraints.providedSlots)
      if (connections[name].providedSlots[provideName] == null)
        return false;
    return true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MatchRecipeByVerb;



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class NameUnnamedConnections extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  async generate(inputParams) {
    return __WEBPACK_IMPORTED_MODULE_1__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */] {
      onHandleConnection(recipe, handleConnection) {
        if (handleConnection.name)
          return; // it is already named.

        if (!handleConnection.particle.spec)
          return; // the particle doesn't have spec yet.

        let possibleSpecConns = handleConnection.particle.spec.connections.filter(specConn => {
          // filter specs with matching types that don't have handles bound to the corresponding handle connection.
          return !specConn.isOptional &&
                 handleConnection.handle.type.equals(specConn.type) &&
                 !handleConnection.particle.getConnectionByName(specConn.name).handle;
        });

        return possibleSpecConns.map(specConn => {
          return (recipe, handleConnection) => {
            handleConnection.particle.nameConnection(handleConnection, specConn.name);
            return 1;
          };
        });
      }
    }(__WEBPACK_IMPORTED_MODULE_2__recipe_walker_js__["a" /* default */].Permuted), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NameUnnamedConnections;



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_slots_js__ = __webpack_require__(21);
// Copyright (c) 2018 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt








class ResolveRecipe extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor(arc) {
    super();
    this._arc = arc;
  }

  async generate(inputParams) {
    let arc = this._arc;
    return __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), new class extends __WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__["a" /* default */] {
      onView(recipe, handle) {
        if (handle.connections.length == 0 || handle.id || (!handle.type) || (!handle.fate))
          return;

        const counts = __WEBPACK_IMPORTED_MODULE_3__recipe_recipe_util_js__["a" /* default */].directionCounts(handle);

        let mappable;

        switch (handle.fate) {
          case 'use':
            mappable = arc.findHandlesByType(handle.type, {tags: handle.tags, subtype: counts.out == 0});
            break;
          case 'map':
          case 'copy':
            mappable = arc.context.findStorageByType(handle.type, {tags: handle.tags, subtype: true});
            break;
          case 'create':
          case '?':
            mappable = [];
            break;
          default:
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__platform_assert_web_js__["a" /* default */])(false, `unexpected fate ${handle.fate}`);
        }

        mappable = mappable.filter(incomingHandle => {
          for (let existingHandle of recipe.handles)
            if (incomingHandle.id == existingHandle.id)
              return false;
          return true;
        });

        if (mappable.length == 1) {
          return (recipe, handle) => {
            handle.mapToStorage(mappable[0]);
          };
        }
      }

      onSlotConnection(recipe, slotConnection) {
        if (slotConnection.isConnected()) {
          return;
        }

        let selectedSlots = __WEBPACK_IMPORTED_MODULE_5__map_slots_js__["a" /* default */].findAllSlotCandidates(slotConnection, arc);
        if (selectedSlots.length !== 1) {
          return;
        }

        let selectedSlot = selectedSlots[0];

        return (recipe, slotConnection) => {
          __WEBPACK_IMPORTED_MODULE_5__map_slots_js__["a" /* default */].connectSlotConnection(slotConnection, selectedSlot);
          return 1;
        };
      }
    }(__WEBPACK_IMPORTED_MODULE_1__recipe_walker_js__["a" /* default */].Permuted), this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ResolveRecipe;



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class SearchTokensToParticles extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor(arc) {
    super();
    // TODO: Recipes. Views?
    this._byToken = {};
    for (let particle of arc.context.particles) {
      let name = particle.name.toLowerCase();
      this._addParticle(name, particle);

      let verb = particle.primaryVerb;
      if (verb != name) {
        this._addParticle(verb, particle);
      }
    }

    let findParticles = token => this._byToken[token] || [];
    class Walker extends __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */] {
      onRecipe(recipe) {
        if (!recipe.search || !recipe.search.unresolvedTokens.length) {
          return;
        }

        let specsByToken = {};
        for (let token of recipe.search.unresolvedTokens) {
          for (let spec of findParticles(token)) {
            // TODO: Skip particles that are already in the active recipe?
            specsByToken[token] = specsByToken[token] || [];
            specsByToken[token].push(spec);
          }
        }
        let resolvedTokens = Object.keys(specsByToken);
        if (resolvedTokens.length == 0) {
          return;
        }

        const flatten = (arr) => [].concat(...arr);
        const product = (...sets) =>
          sets.reduce((acc, set) =>
            flatten(acc.map(x => set.map(y => [...x, y]))),
            [[]]);
        let possibleCombinations = product(...Object.values(specsByToken).map(v => flatten(v)));

        return possibleCombinations.map(combination => {
          return recipe => {
            resolvedTokens.forEach(token => recipe.search.resolveToken(token));
            combination.forEach(spec => {
              let particle = recipe.newParticle(spec.name);
              particle.spec = spec;
            });
            return resolvedTokens.size;
          };
        });
      }
    }
    this._walker = new Walker(__WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__["a" /* default */].Permuted);
  }

  get walker() {
    return this._walker;
  }

  getResults(inputParams) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(inputParams);
    let generated = super.getResults(inputParams).filter(result => !result.result.isResolved());
    let terminal = inputParams.terminal;
    return [...generated, ...terminal];
  }

  _addParticle(token, particle) {
    this._byToken[token] = this._byToken[token] || [];
    this._byToken[token].push(particle);
  }
  async generate(inputParams) {
    return __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(this.getResults(inputParams), this.walker, this);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SearchTokensToParticles;



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schema_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_type_checker_js__ = __webpack_require__(10);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







class TypeVariable {
  constructor(name, canWriteSuperset, canReadSubset) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(typeof name == 'string');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(canWriteSuperset == null || canWriteSuperset instanceof __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */]);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(canReadSubset == null || canReadSubset instanceof __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */]);
    this.name = name;
    this._canWriteSuperset = canWriteSuperset;
    this._canReadSubset = canReadSubset;
    this._resolution = null;
  }

  // Merge both the read subset (upper bound) and write superset (lower bound) constraints
  // of two variables together. Use this when two separate type variables need to resolve
  // to the same value.
  maybeMergeConstraints(variable) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(variable instanceof TypeVariable);

    if (!this.maybeMergeCanReadSubset(variable.canReadSubset))
      return false;
    return this.maybeMergeCanWriteSuperset(variable.canWriteSuperset);
  }

  // merge a type variable's read subset (upper bound) constraints into this variable.
  // This is used to accumulate read constraints when resolving a handle's type.
  maybeMergeCanReadSubset(constraint) {
    if (constraint == null)
      return true;
    
    if (this.canReadSubset == null) {
      this.canReadSubset = constraint;
      return true;
    }

    let mergedSchema = __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* default */].intersect(this.canReadSubset.entitySchema, constraint.entitySchema);
    if (!mergedSchema)
      return false;
    
    this.canReadSubset = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].newEntity(mergedSchema);
    return true;
  }

  // merge a type variable's write superset (lower bound) constraints into this variable.
  // This is used to accumulate write constraints when resolving a handle's type.
  maybeMergeCanWriteSuperset(constraint) {
    if (constraint == null)
      return true;

    if (this.canWriteSuperset == null) {
      this.canWriteSuperset = constraint;
      return true;
    }

    let mergedSchema = __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* default */].union(this.canWriteSuperset.entitySchema, constraint.entitySchema);
    if (!mergedSchema)
      return false;

    this.canWriteSuperset = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].newEntity(mergedSchema);
    return true;
  }

  isSatisfiedBy(type) {
    let constraint = this._canWriteSuperset;
    if (!constraint) {
      return true;
    }
    if (!constraint.isEntity || !type.isEntity) {
      throw new Error(`constraint checking not implemented for ${this} and ${type}`);
    }
    return type.entitySchema.isMoreSpecificThan(constraint.entitySchema);
  }

  get resolution() {
    if (this._resolution) {
      return this._resolution.resolvedType();
    }
    return null;
  }

  set resolution(value) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(value instanceof __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */]);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(!this._resolution);
    let probe = value;
    while (probe) {
      if (!probe.isVariable)
        break;
      if (probe.variable == this)
        return;
      probe = probe.resolution;
    }

    this._resolution = value;
    this._canWriteSuperset = null;
    this._canReadSubset = null;
  }

  get canWriteSuperset() {
    if (this._resolution) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(!this._canWriteSuperset);
      if (this._resolution.isVariable) {
        return this._resolution.variable.canWriteSuperset;
      }
      return null;
    }
    return this._canWriteSuperset;
  }

  set canWriteSuperset(value) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(!this._resolution);
    this._canWriteSuperset = value;
  }

  get canReadSubset() {
    if (this._resolution) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(!this._canReadSubset);
      if (this._resolution.isVariable) {
        return this._resolution.variable.canReadSubset;
      }
      return null;
    }
    return this._canReadSubset;
  }

  set canReadSubset(value) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(!this._resolution);
    this._canReadSubset = value;
  }

  canEnsureResolved() {
    if (this._resolution)
      return this._resolution.canEnsureResolved();
    return (this._canWriteSuperset || this._canReadSubset);
  }

  maybeEnsureResolved() {
    if (this._resolution)
      return this._resolution.maybeEnsureResolved();
    if (this._canWriteSuperset) {
      this._resolution = this._canWriteSuperset;
      return true;
    }
    if (this._canReadSubset) {
      this._resolution = this._canReadSubset;
      return true;
    }
    return false;
  }

  toLiteral() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(this.resolution == null);
    return {
      name: this.name,
      canWriteSuperset: this._canWriteSuperset && this._canWriteSuperset.toLiteral(),
      canReadSubset: this._canReadSubset && this._canReadSubset.toLiteral()
    };
  }

  static fromLiteral(data) {
    return new TypeVariable(
        data.name,
        data.canWriteSuperset ? __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].fromLiteral(data.canWriteSuperset) : null,
        data.canReadSubset ? __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* default */].fromLiteral(data.canReadSubset) : null);
  }

  isResolved() {
    return (this._resolution && this._resolution.isResolved());
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TypeVariable);


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tracelib_trace_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__relation_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__handle_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__outer_PEC_js__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__manifest_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__description_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__recipe_util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__fake_pec_factory_js__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__storage_storage_provider_factory_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__scheduler_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__devtools_shared_arc_registry_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__id_js__ = __webpack_require__(76);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */



















class Arc {
  constructor({id, context, pecFactory, slotComposer, loader, storageKey, storageProviderFactory, speculative}) {
    // TODO: context should not be optional.
    this._context = context || new __WEBPACK_IMPORTED_MODULE_8__manifest_js__["a" /* default */]({id});
    // TODO: pecFactory should not be optional. update all callers and fix here.
    this._pecFactory = pecFactory || __WEBPACK_IMPORTED_MODULE_11__fake_pec_factory_js__["a" /* default */].bind(null);

    // for now, every Arc gets its own session
    this.sessionId = __WEBPACK_IMPORTED_MODULE_15__id_js__["a" /* default */].newSessionId();
    this.id = this.sessionId.fromString(id);
    this._speculative = !!speculative; // undefined => false
    this._nextLocalID = 0;
    this._activeRecipe = new __WEBPACK_IMPORTED_MODULE_7__recipe_recipe_js__["a" /* default */]();
    // TODO: rename: this are just tuples of {particles, handles, slots, pattern} of instantiated recipes merged into active recipe.
    this._recipes = [];
    this._loader = loader;
    this._scheduler = __WEBPACK_IMPORTED_MODULE_13__scheduler_js__["a" /* default */];

    // All the handles, mapped by handle ID
    this._handlesById = new Map();

    // information about last-seen-versions of handles
    this._lastSeenVersion = new Map();

    // storage keys for referenced handles
    this._storageKeys = {};
    this._storageKey = storageKey;


    this.particleHandleMaps = new Map();
    let pecId = this.generateID();
    let innerPecPort = this._pecFactory(pecId);
    this.pec = new __WEBPACK_IMPORTED_MODULE_6__outer_PEC_js__["a" /* default */](innerPecPort, slotComposer, this, `${pecId}:outer`);
    if (slotComposer) {
      slotComposer.arc = this;
    }
    this._storageProviderFactory = storageProviderFactory || new __WEBPACK_IMPORTED_MODULE_12__storage_storage_provider_factory_js__["a" /* default */](this.id);

    // Dictionary from each tag string to a list of handles
    this._tags = {};
    // Map from each handle to a list of tags.
    this._handleTags = new Map();
    // Map from each handle to its description (originating in the manifest).
    this._handleDescriptions = new Map();

    this._search = null;
    this._description = new __WEBPACK_IMPORTED_MODULE_9__description_js__["a" /* default */](this);
    this._debugging = false;

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__devtools_shared_arc_registry_js__["a" /* registerArc */])(this);
  }
  get loader() {
    return this._loader;
  }

  get scheduler() {
    return this._scheduler;
  }

  set search(search) {
    this._search = search ? search.toLowerCase().trim() : null;
  }

  get search() {
    return this._search;
  }

  get description() { return this._description; }

  get makeSuggestions() { return this._makeSuggestions; }
  set makeSuggestions(callback) {
    this._makeSuggestions = callback;
    this._scheduler.idleCallback = callback;
  }

  get idle() {
    let awaitCompletion = async () => {
      await this.scheduler.idle;
      let messageCount = this.pec.messageCount;
      await this.pec.idle;
      if (this.pec.messageCount !== messageCount + 1)
        return awaitCompletion();
    };

    return awaitCompletion();
  }

  get isSpeculative() {
    return this._speculative;
  }

  async _serializeHandles() {
    let handles = '';
    let resources = '';
    let interfaces = '';

    let id = 0;
    let importSet = new Set();
    let handleSet = new Set();
    for (let handle of this._activeRecipe.handles) {
      if (handle.fate == 'map')
        importSet.add(this.context.findManifestUrlForHandleId(handle.id));
      else 
        handleSet.add(handle.id);
    }
    for (let url of importSet.values())
      resources += `import '${url}'\n`;

    for (let handle of this._handles) {
      if (!handleSet.has(handle.id))
        continue;
      let type = handle.type;
      if (type.isCollection)
        type = type.primitiveType();
      if (type.isInterface) {
        interfaces += type.interfaceShape.toString() + '\n';
      }
      let key = this._storageProviderFactory.parseStringAsKey(handle.storageKey);
      switch (key.protocol) {
        case 'firebase':
          handles += `store Store${id++} of ${handle.type.toString()} '${handle.id}' @${handle._version} at '${handle.storageKey}'\n`;
          break;
        case 'in-memory': {
          resources += `resource Store${id}Resource\n`;
          let indent = '  ';
          resources += indent + 'start\n';

          let serializedData = (await handle.serializedData()).map(a => {
            if (a == null)
              return null;
            if (a.rawData) {
              let result = {};
              result.$id = a.id;
              for (let field in a.rawData) {
                result[field] = a.rawData[field];
              }
              return result;
            }
            return a;
          });
          let data = JSON.stringify(serializedData);
          resources += data.split('\n').map(line => indent + line).join('\n');
          resources += '\n';
          handles += `store Store${id} of ${handle.type.toString()} '${handle.id}' @${handle._version} in Store${id++}Resource\n`;
          break;
        }
      }
    }

    return resources + interfaces + handles;
  }

  _serializeParticles() {
    return this._activeRecipe.particles.map(entry => entry.spec.toString()).join('\n');
  }

  _serializeStorageKey() {
    if (this._storageKey)
      return `storageKey: '${this._storageKey}'\n`;
    return '';
  }

  async serialize() {
    await this.idle;
    return `
meta
  name: '${this.id}'
  ${this._serializeStorageKey()}

${await this._serializeHandles()}

${this._serializeParticles()}

@active
${this.activeRecipe.toString()}`;
  }

  static async deserialize({serialization, pecFactory, slotComposer, loader, fileName, context}) {
    let manifest = await __WEBPACK_IMPORTED_MODULE_8__manifest_js__["a" /* default */].parse(serialization, {loader, fileName});
    let arc = new Arc({
      id: manifest.meta.name,
      storageKey: manifest.meta.storageKey,
      slotComposer,
      pecFactory,
      loader,
      storageProviderFactory: manifest._storageProviderFactory,
      context
    });
    // TODO: pass tags through too
    manifest.handles.forEach(handle => arc._registerHandle(handle, []));
    let recipe = manifest.activeRecipe.clone();
    let options = {errors: new Map()};
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(recipe.normalize(options), `Couldn't normalize recipe ${recipe.toString()}:\n${[...options.errors.values()].join('\n')}`);
    await arc.instantiate(recipe);
    return arc;
  }

  get context() {
    return this._context;
  }

  get activeRecipe() { return this._activeRecipe; }
  get recipes() { return this._recipes; }

  loadedParticles() {
    return [...this.particleHandleMaps.values()].map(({spec}) => spec);
  }

  _instantiateParticle(recipeParticle) {
    let id = this.generateID('particle');
    let handleMap = {spec: recipeParticle.spec, handles: new Map()};
    this.particleHandleMaps.set(id, handleMap);

    for (let [name, connection] of Object.entries(recipeParticle.connections)) {
      if (!connection.handle) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(connection.isOptional);
        continue;
      }
      let handle = this.findHandleById(connection.handle.id);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(handle, `can't find handle of id ${connection.handle.id}`);
      this._connectParticleToHandle(id, recipeParticle, name, handle);
    }

    // At least all non-optional connections must be resolved
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(handleMap.handles.size >= handleMap.spec.connections.filter(c => !c.isOptional).length,
           `Not all mandatory connections are resolved for {$particle}`);
    this.pec.instantiate(recipeParticle, id, handleMap.spec, handleMap.handles, this._lastSeenVersion);
    recipeParticle._scheduler = this.scheduler;
    return id;
  }

  generateID(component) {
    return this.id.createId(component).toString();
  }

  generateIDComponents() {
    return {base: this.id, component: () => this._nextLocalID++};
  }

  get _handles() {
    return [...this._handlesById.values()];
  }

  // Makes a copy of the arc used for speculative execution.
  async cloneForSpeculativeExecution() {
    let arc = new Arc({id: this.generateID().toString(), pecFactory: this._pecFactory, context: this.context, loader: this._loader, speculative: true});
    arc._scheduler = this._scheduler.clone();
    let handleMap = new Map();
    for (let handle of this._handles) {
      let clone = await arc._storageProviderFactory.construct(handle.id, handle.type, 'in-memory');
      await clone.cloneFrom(handle);
      handleMap.set(handle, clone);
      if (this._handleDescriptions.has(handle)) {
        arc._handleDescriptions.set(clone, this._handleDescriptions.get(handle));
      }
    }
    this.particleHandleMaps.forEach((value, key) => {
      arc.particleHandleMaps.set(key, {
        spec: value.spec,
        handles: new Map()
      });
      value.handles.forEach(handle => arc.particleHandleMaps.get(key).handles.set(handle.name, handleMap.get(handle)));
    });

   let {particles, handles, slots} = this._activeRecipe.mergeInto(arc._activeRecipe);
   let particleIndex = 0, handleIndex = 0, slotIndex = 0;
   this._recipes.forEach(recipe => {
     let arcRecipe = {particles: [], handles: [], slots: [], innerArcs: new Map(), pattern: recipe.pattern};
     recipe.particles.forEach(p => {
       arcRecipe.particles.push(particles[particleIndex++]);
       if (recipe.innerArcs.has(p)) {
         let thisInnerArc = recipe.innerArcs.get(p);
         let transformationParticle = arcRecipe.particles[arcRecipe.particles.length - 1];
         let innerArc = {activeRecipe: new __WEBPACK_IMPORTED_MODULE_7__recipe_recipe_js__["a" /* default */](), recipes: []};
         let innerTuples = thisInnerArc.activeRecipe.mergeInto(innerArc.activeRecipe);
         thisInnerArc.recipes.forEach(thisInnerArcRecipe => {
           let innerArcRecipe = {particles: [], handles: [], slots: [], innerArcs: new Map()};
           let innerIndex = 0;
           thisInnerArcRecipe.particles.forEach(thisInnerArcRecipeParticle => {
             innerArcRecipe.particles.push(innerTuples.particles[innerIndex++]);
           });
           innerIndex = 0;
           thisInnerArcRecipe.handles.forEach(thisInnerArcRecipeParticle => {
             innerArcRecipe.handles.push(innerTuples.handles[innerIndex++]);
           });
           innerIndex = 0;
           thisInnerArcRecipe.slots.forEach(thisInnerArcRecipeParticle => {
             innerArcRecipe.slots.push(innerTuples.slots[innerIndex++]);
           });
           innerArc.recipes.push(innerArcRecipe);
         });
         arcRecipe.innerArcs.set(transformationParticle, innerArc);
       }
     });
     recipe.handles.forEach(p => {
       arcRecipe.handles.push(handles[handleIndex++]);
     });
     recipe.slots.forEach(p => {
       arcRecipe.slots.push(slots[slotIndex++]);
     });

     arc._recipes.push(arcRecipe);
   });

    for (let v of handleMap.values()) {
      // FIXME: Tags
      arc._registerHandle(v, []);
    }
    return arc;
  }

  async instantiate(recipe, innerArc) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(recipe.isResolved(), 'Cannot instantiate an unresolved recipe');

    let currentArc = {activeRecipe: this._activeRecipe, recipes: this._recipes};
    if (innerArc) {
      let innerArcs = this._recipes.find(r => !!r.particles.find(p => p == innerArc.particle)).innerArcs;
      if (!innerArcs.has(innerArc.particle)) {
         innerArcs.set(innerArc.particle, {activeRecipe: new __WEBPACK_IMPORTED_MODULE_7__recipe_recipe_js__["a" /* default */](), recipes: []});
      }
      currentArc = innerArcs.get(innerArc.particle);
    }
    let {handles, particles, slots} = recipe.mergeInto(currentArc.activeRecipe);
    currentArc.recipes.push({particles, handles, slots, innerArcs: new Map(), pattern: recipe.pattern});
    slots.forEach(slot => slot.id = slot.id || `slotid-${this.generateID()}`);

    for (let recipeHandle of handles) {
      if (['copy', 'create'].includes(recipeHandle.fate)) {
        let type = recipeHandle.type;
        if (recipeHandle.fate == 'create')
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(type.maybeEnsureResolved(), `Can't assign resolved type to ${type}`);

        type = type.resolvedType();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(type.isResolved(), `Can't create handle for unresolved type ${type}`);

        let handle = await this.createHandle(type, /* name= */ null, this.generateID(), recipeHandle.tags);
        if (recipeHandle.fate === 'copy') {
          let copiedHandle = this.findHandleById(recipeHandle.id);
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(copiedHandle._version !== null);
          await handle.cloneFrom(copiedHandle);
          let copiedHandleDesc = this.getHandleDescription(copiedHandle);
          if (copiedHandleDesc) {
            this._handleDescriptions.set(handle, copiedHandleDesc);
          }
        }
        recipeHandle.id = handle.id;
        recipeHandle.fate = 'use';
        recipeHandle.storageKey = handle.storageKey;
        // TODO: move the call to OuterPEC's DefineHandle to here
      }

      let storageKey = recipeHandle.storageKey;
      if (!storageKey)
        storageKey = this.keyForId(recipeHandle.id);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(storageKey, `couldn't find storage key for handle '${recipeHandle}'`);
      let handle = await this._storageProviderFactory.connect(recipeHandle.id, recipeHandle.type, storageKey);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(handle, `handle '${recipeHandle.id}' was not found`);
    }

    particles.forEach(recipeParticle => this._instantiateParticle(recipeParticle));

    if (this.pec.slotComposer) {
      // TODO: pass slot-connections instead
      this.pec.slotComposer.initializeRecipe(particles);
    }
  }

  _connectParticleToHandle(particleId, particle, name, targetHandle) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(targetHandle, 'no target handle provided');
    let handleMap = this.particleHandleMaps.get(particleId);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(handleMap.spec.connectionMap.get(name) !== undefined, 'can\'t connect handle to a connection that doesn\'t exist');
    handleMap.handles.set(name, targetHandle);
  }

  async createHandle(type, name, id, tags, storageKey) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(type instanceof __WEBPACK_IMPORTED_MODULE_3__type_js__["a" /* default */], `can't createHandle with type ${type} that isn't a Type`);

    if (type.isRelation) {
      type = __WEBPACK_IMPORTED_MODULE_3__type_js__["a" /* default */].newCollection(type);
    }

    if (id == undefined)
      id = this.generateID();

    if (storageKey == undefined && this._storageKey)
      storageKey = this._storageProviderFactory.parseStringAsKey(this._storageKey).childKeyForHandle(id).toString();

    if (storageKey == undefined)
      storageKey = 'in-memory';

    let handle = await this._storageProviderFactory.construct(id, type, storageKey);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(handle, 'handle with id ${id} already exists');
    handle.name = name;

    this._registerHandle(handle, tags);
    return handle;
  }

  _registerHandle(handle, tags) {
    tags = tags || [];
    tags = Array.isArray(tags) ? tags : [tags];
    tags.forEach(tag => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(tag.startsWith('#'),
      `tag ${tag} must start with '#'`));

    this._handlesById.set(handle.id, handle);

    if (tags.length) {
      for (let tag of tags) {
        if (this._tags[tag] == undefined)
          this._tags[tag] = [];
        this._tags[tag].push(handle);
      }
    }
    this._handleTags.set(handle, new Set(tags));

    this._storageKeys[handle.id] = handle.storageKey;
  }

  // Convert a type to a normalized key that we can use for
  // equality testing.
  //
  // TODO: we should be testing the schemas for compatiblity instead of using just the name.
  // TODO: now that this is only used to implement findHandlesByType we can probably replace
  // the check there with a type system equality check or similar.
  static _typeToKey(type) {
    if (type.isCollection) {
      let key = this._typeToKey(type.primitiveType());
      if (key) {
        return `list:${key}`;
      }
    } else if (type.isEntity) {
      return type.entitySchema.name;
    } else if (type.isShape) {
      // TODO we need to fix this too, otherwise all handles of shape type will
      // be of the 'same type' when searching by type.
      return type.shapeShape;
    } else if (type.isVariable && type.isResolved()) {
      return Arc._typeToKey(type.resolvedType());
    }
  }

  findHandlesByType(type, options) {
    // TODO: dstockwell to rewrite this to use constraints and more
    let typeKey = Arc._typeToKey(type);
    let handles = [...this._handlesById.values()].filter(handle => {
      if (typeKey) {
        let handleKey = Arc._typeToKey(handle.type);
        if (typeKey === handleKey) {
          return true;
        }
      } else {
        if (type.isVariable && !type.isResolved() && handle.type.isEntity) {
          return true;
        } else if (type.isCollection && type.primitiveType().isVariable && !type.primitiveType().isResolved() && handle.type.isCollection) {
          return true;
        }
      }
      return false;
    });

    if (options && options.tags && options.tags.length > 0) {
      handles = handles.filter(handle => options.tags.filter(tag => !this._handleTags.get(handle).has(tag)).length == 0);
    }
    return handles;
  }

  findHandleById(id) {
    let handle = this._handlesById.get(id);
    if (handle == null) {
      handle = this._context.findStorageById(id);
    }
    return handle;
  }

  getHandleDescription(handle) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(handle, 'Cannot fetch description for nonexistent handle');
    return this._handleDescriptions.get(handle) || handle.description;
  }

  keyForId(id) {
    return this._storageKeys[id];
  }

  newCommit(entityMap) {
    for (let [entity, handle] of entityMap.entries()) {
      entity.identify(this.generateID());
    }
    for (let [entity, handle] of entityMap.entries()) {
      new handle.handleFor(handle).store(entity);
    }
  }

  stop() {
    this.pec.stop();
  }

  toContextString(options) {
    let results = [];
    let handles = [...this._handlesById.values()].sort(__WEBPACK_IMPORTED_MODULE_10__recipe_util_js__["a" /* default */].compareComparables);
    handles.forEach(v => {
      results.push(v.toString(this._handleTags.get(v)));
    });

    // TODO: include handles entities
    // TODO: include (remote) slots?

    if (!this._activeRecipe.isEmpty()) {
      results.push(this._activeRecipe.toString());
    }

    return results.join('\n');
  }

  initDebug() {
    this._debugging = true;
    this.pec.initDebug();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Arc);


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategies_rulesets_js__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform_deviceinfo_web_js__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recipe_recipe_util_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__recipe_walker_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__strategies_convert_constraints_to_connections_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__strategies_assign_remote_views_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__strategies_copy_remote_views_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__strategies_assign_views_by_tag_and_type_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__strategies_init_population_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__strategies_map_slots_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__strategies_match_particle_by_verb_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__strategies_match_recipe_by_verb_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__strategies_name_unnamed_connections_js__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__strategies_add_use_views_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__strategies_create_description_handle_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__manifest_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__strategies_init_search_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__strategies_search_tokens_to_particles_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__strategies_fallback_fate_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__strategies_group_handle_connections_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__strategies_match_free_handles_to_connections_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__strategies_create_views_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__strategies_resolve_recipe_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__speculator_js__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__description_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__tracelib_trace_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__debug_strategy_explorer_adapter_js__ = __webpack_require__(72);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


































class Planner {
  // TODO: Use context.arc instead of arc
  init(arc, {strategies, ruleset} = {}) {
    this._arc = arc;
    strategies = strategies || [
      new __WEBPACK_IMPORTED_MODULE_11__strategies_init_population_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_19__strategies_init_search_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_20__strategies_search_tokens_to_particles_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_22__strategies_group_handle_connections_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_21__strategies_fallback_fate_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_24__strategies_create_views_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_10__strategies_assign_views_by_tag_and_type_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_7__strategies_convert_constraints_to_connections_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_12__strategies_map_slots_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_8__strategies_assign_remote_views_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_9__strategies_copy_remote_views_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_13__strategies_match_particle_by_verb_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_14__strategies_match_recipe_by_verb_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_15__strategies_name_unnamed_connections_js__["a" /* default */](arc),
      new __WEBPACK_IMPORTED_MODULE_16__strategies_add_use_views_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_17__strategies_create_description_handle_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_23__strategies_match_free_handles_to_connections_js__["a" /* default */](),
      new __WEBPACK_IMPORTED_MODULE_25__strategies_resolve_recipe_js__["a" /* default */](arc)
    ];
    this.strategizer = new __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategizer */](strategies, [], {
      maxPopulation: 100,
      generationSize: 100,
      discardSize: 20,
      ruleset: ruleset || __WEBPACK_IMPORTED_MODULE_1__strategies_rulesets_js__["a" /* Empty */]
    });
  }

  // Specify a timeout value less than zero to disable timeouts.
  async plan(timeout, generations) {
    let trace = __WEBPACK_IMPORTED_MODULE_28__tracelib_trace_js__["a" /* default */].async({cat: 'planning', name: 'Planner::plan', args: {timeout}});
    timeout = timeout || -1;
    let allResolved = [];
    let now = () => (typeof performance == 'object') ? performance.now() : process.hrtime();
    let start = now();
    do {
      let record = await trace.wait(() => this.strategizer.generate());
      let generated = this.strategizer.generated;
      trace.resume({args: {
        generated: generated.length,
      }});
      if (generations) {
        generations.push({generated, record});
      }

      let resolved = this.strategizer.generated
          .map(individual => individual.result)
          .filter(recipe => recipe.isResolved());
      allResolved.push(...resolved);
      const elapsed = now() - start;
      if (timeout >= 0 && elapsed > timeout) {
        console.warn(`Planner.plan timed out [elapsed=${Math.floor(elapsed)}ms, timeout=${timeout}ms].`);
        break;
      }
    } while (this.strategizer.generated.length > 0);
    trace.end();
    return allResolved;
  }

  _matchesActiveRecipe(plan) {
    let planShape = __WEBPACK_IMPORTED_MODULE_5__recipe_recipe_util_js__["a" /* default */].recipeToShape(plan);
    let result = __WEBPACK_IMPORTED_MODULE_5__recipe_recipe_util_js__["a" /* default */].find(this._arc._activeRecipe, planShape);
    return result.some(r => r.score == 0);
  }

  _speculativeThreadCount() {
    // TODO(wkorman): We'll obviously have to rework the below when we do
    // speculation in the cloud.
    const cores = __WEBPACK_IMPORTED_MODULE_3__platform_deviceinfo_web_js__["a" /* default */].hardwareConcurrency();
    const memory = __WEBPACK_IMPORTED_MODULE_3__platform_deviceinfo_web_js__["a" /* default */].deviceMemory();
    // For now, allow occupying half of the available cores while constraining
    // total memory used to at most a quarter of what's available. In the
    // absence of resource information we just run two in parallel as a
    // perhaps-low-end-device-oriented balancing act.
    const minCores = 2;
    if (!cores || !memory) {
      return minCores;
    }

    // A rough estimate of memory used per thread in gigabytes.
    const memoryPerThread = 0.125;
    const quarterMemory = memory / 4;
    const maxThreadsByMemory = quarterMemory / memoryPerThread;
    const maxThreadsByCores = cores / 2;
    return Math.max(minCores, Math.min(maxThreadsByMemory, maxThreadsByCores));
  }
  _splitToGroups(items, groupCount) {
    const groups = [];
    if (!items || items.length == 0) return groups;
    const groupItemSize = Math.max(1, Math.floor(items.length / groupCount));
    let startIndex = 0;
    for (let i = 0; i < groupCount && startIndex < items.length; i++) {
      groups.push(items.slice(startIndex, startIndex + groupItemSize));
      startIndex += groupItemSize;
    }
    // Add any remaining items to the end of the last group.
    if (startIndex < items.length) {
      groups[groups.length - 1].push(...items.slice(startIndex, items.length));
    }
    return groups;
  }
  async suggest(timeout, generations) {
    if (!generations && this._arc._debugging) generations = [];
    let trace = __WEBPACK_IMPORTED_MODULE_28__tracelib_trace_js__["a" /* default */].async({cat: 'planning', name: 'Planner::suggest', args: {timeout}});
    let plans = await trace.wait(() => this.plan(timeout, generations));
    trace.resume();
    let suggestions = [];
    let speculator = new __WEBPACK_IMPORTED_MODULE_26__speculator_js__["a" /* default */]();
    // We don't actually know how many threads the VM will decide to use to
    // handle the parallel speculation, but at least we know we won't kick off
    // more than this number and so can somewhat limit resource utilization.
    // TODO(wkorman): Rework this to use a fixed size 'thread' pool for more
    // efficient work distribution.
    const threadCount = this._speculativeThreadCount();
    const planGroups = this._splitToGroups(plans, threadCount);
    let results = await trace.wait(() => Promise.all(planGroups.map(async (group, groupIndex) => {
      let results = [];
      for (let plan of group) {
        let hash = ((hash) => { return hash.substring(hash.length - 4);})(await plan.digest());

        if (this._matchesActiveRecipe(plan)) {
          this._updateGeneration(generations, hash, (g) => g.active = true);
          continue;
        }

        // TODO(wkorman): Look at restoring trace.wait() here, and whether we
        // should do similar for the async getRecipeSuggestion() below as well?
        let relevance = await speculator.speculate(this._arc, plan);
        if (!relevance.isRelevant(plan)) {
          continue;
        }
        let rank = relevance.calcRelevanceScore();

        relevance.newArc.description.relevance = relevance;
        let description = await relevance.newArc.description.getRecipeSuggestion();

        this._updateGeneration(generations, hash, (g) => g.description = description);

        // TODO: Move this logic inside speculate, so that it can stop the arc
        // before returning.
        relevance.newArc.stop();

        // Filter plans based on arc._search string.
        if (this._arc.search) {
          if (!plan.search) {
            // This plan wasn't constructed based on the provided search terms.
            if (description.toLowerCase().indexOf(this._arc.search) < 0) {
              // Description must contain the full search string.
              // TODO: this could be a strategy, if description was already available during strategies execution.
              continue;
            }
          } else {
            // This mean the plan was constructed based on provided search terms,
            // and at least one of them were resolved (in order for the plan to be resolved).
          }
        }

        results.push({
          plan,
          rank,
          description: relevance.newArc.description,
          descriptionText: description, // TODO(mmandlis): exclude the text description from returned results.
          hash,
          groupIndex
        });
      }
      return results;
    })));
    trace.resume();
    results = [].concat(...results);
    trace.end();

    if (this._arc._debugging) {
      __WEBPACK_IMPORTED_MODULE_29__debug_strategy_explorer_adapter_js__["a" /* default */].processGenerations(generations);
    }

    return results;
  }
  _updateGeneration(generations, hash, handler) {
    if (generations) {
      generations.forEach(g => {
        g.generated.forEach(gg => {
          if (gg.hash.endsWith(hash)) {
            handler(gg);
          }
        });
      });
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Planner);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(25)))

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slot_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_slot_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dom_context_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__description_dom_formatter_js__ = __webpack_require__(73);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */








class SlotComposer {
  /**
   * |options| must contain:
   * - affordance: the UI affordance the slots composer render to (for example: dom).
   * - rootContext: the context containing top level context to be used for slots.
   * and may contain:
   * - containerKind: the type of container wrapping each slot's context (for example, div).
   * - suggestionsContext: the context for rendering suggestions.
   */
  constructor(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(options.affordance, 'Affordance is mandatory');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(options.rootContext, 'Root context is mandatory');

    this._containerKind = options.containerKind;
    this._affordance = options.affordance;
    this._slotClass = this.getSlotClass();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._slotClass);

    let slotContextByName = this._slotClass.findRootSlots(options.rootContext) || {};
    if (Object.keys(slotContextByName).length == 0) {
      // fallback to single 'root' slot using the rootContext.
      slotContextByName['root'] = options.rootContext;
    }

    this._suggestionsContext = options.suggestionsContext || slotContextByName['suggestions'];

    this._contextSlots = [];
    Object.keys(slotContextByName).forEach(slotName => {
      this._contextSlots.push({id: `rootslotid-${slotName}`, name: slotName, tags: [`#${slotName}`], context: slotContextByName[slotName], handleConnections: [], views: 0, getProvidedSlotSpec: () => { return {isSet: false}; }});
    });

    this._slots = [];
  }
  get affordance() { return this._affordance; }
  getSlotClass() {
    switch (this._affordance) {
      case 'dom':
      case 'dom-touch':
      case 'vr':
        return __WEBPACK_IMPORTED_MODULE_2__dom_slot_js__["a" /* default */];
      case 'mock':
        return __WEBPACK_IMPORTED_MODULE_1__slot_js__["a" /* default */];
      default:
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])('unsupported affordance ', this._affordance);
    }
  }
  _getSuggestionContext() {
    switch (this._affordance) {
      case 'dom':
      case 'dom-touch':
      case 'vr':
        return __WEBPACK_IMPORTED_MODULE_3__dom_context_js__["b" /* DomContext */];
      default:
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])('unsupported affordance ', this._affordance);
    }
  }
  _getDescriptionFormatter() {
    switch (this._affordance) {
      case 'dom':
      case 'dom-touch':
      case 'vr':
        return __WEBPACK_IMPORTED_MODULE_4__description_dom_formatter_js__["a" /* default */];
      default:
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])('unsupported affordance ', this._affordance);
    }
  }

  async setSuggestions(suggestions) {
    // TODO(mmandlis): slot composer should not be familiar with suggestions concept - they should just be slots.
    if (!this._suggestionsContext) {
      return;
    }

    this._suggestionsContext.textContent = '';

    suggestions.forEach(async suggestion => {
      let suggestionContent =
        await suggestion.description.getRecipeSuggestion(this._getDescriptionFormatter());

      if (!suggestionContent) {
        suggestionContent = 'No suggestion content was generated (unnamed recipe and no describable particles)';
      }

      this._getSuggestionContext().createContext(
          this.createSuggestionElement(this._suggestionsContext, suggestion),
          suggestionContent
      );
    });
  }

  createSuggestionElement(container, plan) {
    let suggest = Object.assign(document.createElement('suggestion-element'), {plan});
    // TODO(sjmiles): LIFO is weird, iterate top-down elsewhere?
    container.insertBefore(suggest, container.firstElementChild);
    return suggest;
  }

  getSlot(particle, slotName) {
    return this._slots.find(s => s.consumeConn.particle == particle && s.consumeConn.name == slotName);
  }

  _findContext(slotId) {
    let contextSlot = this._contextSlots.find(slot => slot.id == slotId);
    if (contextSlot) {
      return contextSlot.context;
    }
  }

  createHostedSlot(transformationParticle, transformationSlotName, hostedParticleName, hostedSlotName) {
    let hostedSlotId = this.arc.generateID();

    let transformationSlot = this.getSlot(transformationParticle, transformationSlotName);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(transformationSlot,
           `Unexpected transformation slot particle ${transformationParticle.name}:${transformationSlotName}, hosted particle ${hostedParticleName}, slot name ${hostedSlotName}`);
    transformationSlot.addHostedSlot(hostedSlotId, hostedParticleName, hostedSlotName);
    return hostedSlotId;
  }
  _findSlotByHostedSlotId(hostedSlotId) {
    for (let slot of this._slots) {
      let hostedSlot = slot.getHostedSlot(hostedSlotId);
      if (hostedSlot) {
        return slot;
      }
    }
  }
  findHostedSlot(hostedParticle, hostedSlotName) {
    for (let slot of this._slots) {
      let hostedSlot = slot.findHostedSlot(hostedParticle, hostedSlotName);
      if (hostedSlot) {
        return hostedSlot;
      }
    }
  }

  initializeRecipe(recipeParticles) {
    let newSlots = [];
    // Create slots for each of the recipe's particles slot connections.
    recipeParticles.forEach(p => {
      Object.values(p.consumedSlotConnections).forEach(cs => {
        if (!cs.targetSlot) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!cs.slotSpec.isRequired, `No target slot for particle's ${p.name} required consumed slot: ${cs.name}.`);
          return;
        }

        if (this._initHostedSlot(cs.targetSlot.id, p)) {
          // Skip slot creation for hosted slots.
          return;
        }

        let slot = new this._slotClass(cs, this.arc, this._containerKind);
        slot.startRenderCallback = this.arc.pec.startRender.bind(this.arc.pec);
        slot.stopRenderCallback = this.arc.pec.stopRender.bind(this.arc.pec);
        slot.innerSlotsUpdateCallback = this.updateInnerSlots.bind(this);
        newSlots.push(slot);
      });
    });

    // Attempt to set context for each of the slots.
    newSlots.forEach(s => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!s.getContext(), `Unexpected context in new slot`);

      let context = null;
      let sourceConnection = s.consumeConn.targetSlot && s.consumeConn.targetSlot.sourceConnection;
      if (sourceConnection) {
        let sourceConnSlot = this.getSlot(sourceConnection.particle, sourceConnection.name);
        if (sourceConnSlot) {
          context = sourceConnSlot.getInnerContext(s.consumeConn.name);
        }
      } else { // External slots provided at SlotComposer ctor (eg 'root')
        context = this._findContext(s.consumeConn.targetSlot.id);
      }

      this._slots.push(s);

      if (context) {
        s.updateContext(context);
      }
    });
  }

  _initHostedSlot(hostedSlotId, hostedParticle) {
    let transformationSlot = this._findSlotByHostedSlotId(hostedSlotId);
    if (!transformationSlot) {
      return false;
    }
    transformationSlot.initHostedSlot(hostedSlotId, hostedParticle);
    return true;
  }

  async renderSlot(particle, slotName, content) {
    let slot = this.getSlot(particle, slotName);
    if (slot) {
      // Set the slot's new content.
      await slot.setContent(content, eventlet => {
        this.arc.pec.sendEvent(particle, slotName, eventlet);
      });
      return;
    }

    if (this._renderHostedSlot(particle, slotName, content)) {
      return;
    }

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot, `Cannot find slot (or hosted slot) ${slotName} for particle ${particle.name}`);
  }

  _renderHostedSlot(particle, slotName, content) {
    let hostedSlot = this.findHostedSlot(particle, slotName);
    if (!hostedSlot) {
      return false;
    }
    let transformationSlot = this._findSlotByHostedSlotId(hostedSlot.slotId);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(transformationSlot, `No transformation slot found for ${hostedSlot.slotId}`);

    this.arc.pec.innerArcRender(transformationSlot.consumeConn.particle, transformationSlot.consumeConn.name, hostedSlot.slotId, content);

    return true;
  }

  updateInnerSlots(slot) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot, 'Cannot update inner slots of null');
    // Update provided slot contexts.
    Object.keys(slot.consumeConn.providedSlots).forEach(providedSlotName => {
      let providedContext = slot.getInnerContext(providedSlotName);
      let providedSlot = slot.consumeConn.providedSlots[providedSlotName];
      providedSlot.consumeConnections.forEach(cc => {
        // This will trigger 'start' or 'stop' render, if applicable.
        this.getSlot(cc.particle, cc.name).updateContext(providedContext);
      });
    });
  }

  getAvailableSlots() {
    let availableSlots = this.arc.activeRecipe.slots.slice();

    this._contextSlots.forEach(contextSlot => {
      if (!availableSlots.find(s => s.id == contextSlot.id)) {
        availableSlots.push(contextSlot);
      }
    });
    return availableSlots;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SlotComposer);


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_loader_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__runtime_particle_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runtime_dom_particle_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__runtime_multiplexer_dom_particle_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__runtime_transformation_dom_particle_js__ = __webpack_require__(23);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







const logFactory = (preamble, color, log='log') => console[log].bind(console, `Ptcl:%c${preamble}`, `background: ${color}; color: white; padding: 1px 6px 2px 7px; border-radius: 4px;`);
const html = (strings, ...values) => (strings[0] + values.map((v, i) => v + strings[i + 1]).join('')).trim();

const dumbCache = {};

class BrowserLoader extends __WEBPACK_IMPORTED_MODULE_0__runtime_loader_js__["a" /* default */] {
  constructor(urlMap) {
    super();
    this._urlMap = urlMap;
  }
  _loadURL(url) {
    // use URL to normalize the path for deduping
    const cacheKey = new URL(url, document.URL).href;
    const resource = dumbCache[cacheKey];
    return resource || (dumbCache[cacheKey] = super._loadURL(url));
  }
  _resolve(path) {
    //return new URL(path, this._base).href;
    let url = this._urlMap[path];
    if (!url && path) {
      // TODO(sjmiles): inefficient!
      let macro = Object.keys(this._urlMap).sort((a, b) => b.length - a.length).find(k => path.slice(0, k.length) == k);
      if (macro) {
        url = this._urlMap[macro] + path.slice(macro.length);
      }
    }
    url = url || path;
    //console.log(`browser-loader: resolve(${path}) = ${url}`);
    return url;
  }
  loadResource(name) {
    return this._loadURL(this._resolve(name));
  }
  requireParticle(fileName) {
    const path = this._resolve(fileName);
    // inject path to this particle into the UrlMap,
    // allows "foo.js" particle to invoke `importScripts(resolver('foo/othermodule.js'))`
    this.mapParticleUrl(path);
    const result = [];
    self.defineParticle = function(particleWrapper) {
      result.push(particleWrapper);
    };
    importScripts(path);
    delete self.defineParticle;
    const logger = logFactory(fileName.split('/').pop(), 'blue');
    return this.unwrapParticle(result[0], logger);
  }
  mapParticleUrl(path) {
    let parts = path.split('/');
    let suffix = parts.pop();
    let folder = parts.join('/');
    let name = suffix.split('.').shift();
    this._urlMap[name] = folder;
  }
  unwrapParticle(particleWrapper, log) {
    // TODO(sjmiles): regarding `resolver`:
    //  _resolve method allows particles to request remapping of assets paths
    //  for use in DOM
    let resolver = this._resolve.bind(this);
    return particleWrapper({
      particle: __WEBPACK_IMPORTED_MODULE_1__runtime_particle_js__["a" /* default */],
      Particle: __WEBPACK_IMPORTED_MODULE_1__runtime_particle_js__["a" /* default */].Particle,
      DomParticle: __WEBPACK_IMPORTED_MODULE_2__runtime_dom_particle_js__["a" /* default */],
      MultiplexerDomParticle: __WEBPACK_IMPORTED_MODULE_3__runtime_multiplexer_dom_particle_js__["a" /* default */],
      SimpleParticle: __WEBPACK_IMPORTED_MODULE_2__runtime_dom_particle_js__["a" /* default */],
      TransformationDomParticle: __WEBPACK_IMPORTED_MODULE_4__runtime_transformation_dom_particle_js__["a" /* default */],
      resolver,
      log,
      html
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BrowserLoader;



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export initDebug */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return registerArc; });
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// Debugging is initialized either by /devtools/src/run-init-debug.js, which is
// injected by the devtools extension content script in the browser env,
// or used directly when debugging nodeJS.
// This is why data needs to be referenced via a global object.

let root = typeof window === 'object' ? window : global;

root._arcDebugRegistry = root._arcDebugRegistry || {
  arcList: [],
  debug: false
};

let registry = root._arcDebugRegistry;

function initDebug() {
  if (registry.debug) return {};
  let preExistingArcs = registry.arcList.length > 0;
  for (let arc of registry.arcList) {
    arc.initDebug();
  }
  delete registry.arcList;
  registry.debug = true;
  return {preExistingArcs};
}

function registerArc(arc) {
  if (registry.debug) {
    arc.initDebug();
  } else {
    registry.arcList.push(arc);
  }
}



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(26)))

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

// Assume firebase has been loaded. We can't `import` it here as it does not
// support strict mode.
/* harmony default export */ __webpack_exports__["a"] = (window.btoa);


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2018 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

// Provides access to device hardware resource metrics for a web browser.
class DeviceInfo {
  // Returns the number of logical cores.
  static hardwareConcurrency() {
    return navigator.hardwareConcurrency;
  }
  // Returns the device memory in gigabytes.
  static deviceMemory() {
    return navigator.deviceMemory;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DeviceInfo;



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_debug_abstract_devtools_channel_js__ = __webpack_require__(70);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




class ChromeExtensionChannel extends __WEBPACK_IMPORTED_MODULE_0__runtime_debug_abstract_devtools_channel_js__["a" /* default */] {
  constructor() {
    super();
    this._makeReady(); // TODO: Consider readiness if connecting via extension.
  }

  _flush(messages) {
    document.dispatchEvent(new CustomEvent('arcs-debug', {detail: messages}));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChromeExtensionChannel;



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

// Assume firebase has been loaded. We can't `import` it here as it does not
// support strict mode.
/* harmony default export */ __webpack_exports__["a"] = (window.firebase);


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

/* harmony default export */ __webpack_exports__["a"] = ({});


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((function() {
  "use strict";

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  peg$SyntaxError.buildMessage = function(expected, found) {
    var DESCRIBE_EXPECTATION_FNS = {
          literal: function(expectation) {
            return "\"" + literalEscape(expectation.text) + "\"";
          },

          "class": function(expectation) {
            var escapedParts = "",
                i;

            for (i = 0; i < expectation.parts.length; i++) {
              escapedParts += expectation.parts[i] instanceof Array
                ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
                : classEscape(expectation.parts[i]);
            }

            return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
          },

          any: function(expectation) {
            return "any character";
          },

          end: function(expectation) {
            return "end of input";
          },

          other: function(expectation) {
            return expectation.description;
          }
        };

    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/"/g,  '\\"')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
    }

    function classEscape(s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/\]/g, '\\]')
        .replace(/\^/g, '\\^')
        .replace(/-/g,  '\\-')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = new Array(expected.length),
          i, j;

      for (i = 0; i < expected.length; i++) {
        descriptions[i] = describeExpectation(expected[i]);
      }

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  function peg$parse(input, options) {
    options = options !== void 0 ? options : {};

    var peg$FAILED = {},

        peg$startRuleFunctions = { Manifest: peg$parseManifest },
        peg$startRuleFunction  = peg$parseManifest,

        peg$c0 = function(items) {
            let result = items.map(item => {
              let manifestItem = item[2];
              manifestItem.annotation = optional(item[0], a => a[1], null);
              return manifestItem;
            });
            checkNormal(result);
            return result;
          },
        peg$c1 = "@",
        peg$c2 = peg$literalExpectation("@", false),
        peg$c3 = function(annotation) { return annotation; },
        peg$c4 = "resource",
        peg$c5 = peg$literalExpectation("resource", false),
        peg$c6 = function(name, body) {
          return {
            kind: 'resource',
            name,
            data: body,
            location: location()
          };
        },
        peg$c7 = "start",
        peg$c8 = peg$literalExpectation("start", false),
        peg$c9 = function() { startIndent = indent; },
        peg$c10 = function(lines) {
          return lines.map(line => line[0].substring(startIndent.length) + line[1]).join('');
        },
        peg$c11 = /^[^\n]/,
        peg$c12 = peg$classExpectation(["\n"], true, false),
        peg$c13 = function() { return text(); },
        peg$c14 = "view",
        peg$c15 = peg$literalExpectation("view", false),
        peg$c16 = "store",
        peg$c17 = peg$literalExpectation("store", false),
        peg$c18 = "of",
        peg$c19 = peg$literalExpectation("of", false),
        peg$c20 = function(name, type, id, version, tags, source, items) {
            items = optional(items, extractIndented, []);
            return {
              kind: 'store',
              location: location(),
              name,
              type,
              id: optional(id, id => id[1], null),
              version: optional(version, version => version[1], null),
              tags: optional(tags, tags => tags[1], null),
              source: source.source,
              origin: source.origin,
              description: items.length > 0 ? items[0][2] : null
            };
          },
        peg$c21 = "in",
        peg$c22 = peg$literalExpectation("in", false),
        peg$c23 = function(source) { return {origin: 'file', source }; },
        peg$c24 = function(source) { return {origin: 'resource', source }; },
        peg$c25 = "at",
        peg$c26 = peg$literalExpectation("at", false),
        peg$c27 = function(source) { return {origin: 'storage', source }; },
        peg$c28 = "description",
        peg$c29 = peg$literalExpectation("description", false),
        peg$c30 = "import",
        peg$c31 = peg$literalExpectation("import", false),
        peg$c32 = function(path) {
            return {
              kind: 'import',
              location: location(),
              path,
            };
          },
        peg$c33 = "shape",
        peg$c34 = peg$literalExpectation("shape", false),
        peg$c35 = "<",
        peg$c36 = peg$literalExpectation("<", false),
        peg$c37 = ">",
        peg$c38 = peg$literalExpectation(">", false),
        peg$c39 = function(name, typeVars, items) {
            return {
              kind: 'shape',
              location: location(),
              name,
              interface: optional(items, extractIndented, []).find(item => item.kind == 'shape-interface'),
              slots: optional(items, extractIndented, []).filter(item => item.kind == 'shape-slot'),
            }
          },
        peg$c40 = "(",
        peg$c41 = peg$literalExpectation("(", false),
        peg$c42 = ")",
        peg$c43 = peg$literalExpectation(")", false),
        peg$c44 = function(verb, args) {
            return {
              kind: 'shape-interface',
              location: location(),
              verb,
              args: args || []
            };
          },
        peg$c45 = ",",
        peg$c46 = peg$literalExpectation(",", false),
        peg$c47 = function(head, tail) {
            return [head].concat(tail.map(a => a[2]));
          },
        peg$c48 = function(direction, type, name) {
            if (direction == 'host') {
              error(`Shape cannot have arguments with a 'host' direction.`);
            }

            return {
              kind: 'shape-argument',
              location: location(),
              direction,
              type,
              name,
            };
          },
        peg$c49 = "must",
        peg$c50 = peg$literalExpectation("must", false),
        peg$c51 = "consume",
        peg$c52 = peg$literalExpectation("consume", false),
        peg$c53 = "provide",
        peg$c54 = peg$literalExpectation("provide", false),
        peg$c55 = "set of",
        peg$c56 = peg$literalExpectation("set of", false),
        peg$c57 = function(isRequired, direction, isSet, name) {
            return {
              kind: 'shape-slot',
              location: location(),
              name: optional(name, isRequired => name[1], null),
              isRequired: optional(isRequired, isRequired => isRequired[0] == 'must', false),
              direction,
              isSet: !!isSet,
            }
          },
        peg$c58 = "meta",
        peg$c59 = peg$literalExpectation("meta", false),
        peg$c60 = function(items) {
          items = items ? extractIndented(items): [];
          return {kind: 'meta', items: items, location: location()};
        },
        peg$c61 = "name",
        peg$c62 = peg$literalExpectation("name", false),
        peg$c63 = ":",
        peg$c64 = peg$literalExpectation(":", false),
        peg$c65 = function(name) {
          return { key: 'name', value: name, location: location(), kind: 'name' }
        },
        peg$c66 = "storageKey",
        peg$c67 = peg$literalExpectation("storageKey", false),
        peg$c68 = function(key) {
          return {key: 'storageKey', value: key, location: location(), kind: 'storageKey' }
        },
        peg$c69 = "particle",
        peg$c70 = peg$literalExpectation("particle", false),
        peg$c71 = function(name, implFile, items) {
            let args = null;
            let verbs = [];
            let affordance = [];
            let slots = [];
            let description = null;
            items = items ? extractIndented(items) : [];
            items.forEach(item => {
              if (item.kind == 'interface') {
                if (/[A-Z]/.test(item.verb[0]) && item.verb != name) {
                  error(`Verb ${item.verb} must start with a lower case character or be same as particle name.`);
                }
                verbs.push(item.verb);
                args = item.args;
              } else if (item.kind == 'particle-slot') {
                slots.push(item);
              } else if (item.kind == 'description') {
                // TODO: Super hacks.
                description = {
                  kind: 'description?',
                  location: 'FIXME',
                };
                item.description.forEach(d => { description[d.name] = d.pattern; });
              } else if (item.affordance) {
                affordance.push(item.affordance)
              } else {
                error(`Particle ${name} contains an unknown element: ${item.name}`);
              }
            });
            if (affordance.length == 0) {
              // Add default affordance
              affordance.push('dom');
            }
            affordance.push('mock');

            return {
              kind: 'particle',
              location: location(),
              name,
              implFile: optional(implFile, implFile => implFile[3], null),
              verbs,
              args,
              affordance,
              slots,
              description,
            };
          },
        peg$c72 = function(verb, args) {
            return {
              kind: 'interface',
              location: location(),
              verb,
              args: args || []
            };
          },
        peg$c73 = "?",
        peg$c74 = peg$literalExpectation("?", false),
        peg$c75 = function(direction, type, isOptional, name) {
            return {
              kind: 'particle-argument',
              location: location(),
              direction,
              type: type,
              isOptional: !!isOptional,
              name,
            };
          },
        peg$c76 = "inout",
        peg$c77 = peg$literalExpectation("inout", false),
        peg$c78 = "out",
        peg$c79 = peg$literalExpectation("out", false),
        peg$c80 = "host",
        peg$c81 = peg$literalExpectation("host", false),
        peg$c82 = function() {
            return text();
          },
        peg$c83 = "[",
        peg$c84 = peg$literalExpectation("[", false),
        peg$c85 = "]",
        peg$c86 = peg$literalExpectation("]", false),
        peg$c87 = function(type) {
            return {
              kind: 'list-type',
              location: location(),
              type,
            };
          },
        peg$c88 = "~",
        peg$c89 = peg$literalExpectation("~", false),
        peg$c90 = "with",
        peg$c91 = peg$literalExpectation("with", false),
        peg$c92 = function(name, constraint) {
            return {
              kind: 'variable-type',
              location: location(),
              name,
              constraint: optional(constraint, constraint => constraint[3], null),
            };
          },
        peg$c93 = function(name) {
            return {
              kind: 'reference-type',
              location: location(),
              name,
            };
          },
        peg$c94 = function(head, tail) {
            return [head, ...tail.map(a => a[2])];
          },
        peg$c95 = "affordance",
        peg$c96 = peg$literalExpectation("affordance", false),
        peg$c97 = "dom-touch",
        peg$c98 = peg$literalExpectation("dom-touch", false),
        peg$c99 = "dom",
        peg$c100 = peg$literalExpectation("dom", false),
        peg$c101 = "vr",
        peg$c102 = peg$literalExpectation("vr", false),
        peg$c103 = "voice",
        peg$c104 = peg$literalExpectation("voice", false),
        peg$c105 = function(affordance) {
            return {
              kind: 'particle-affordance',
              location: location(),
              affordance,
            };
          },
        peg$c106 = function(isRequired, isSet, name, tags, items) {
            let formFactor = null;
            let providedSlots = [];
            items = optional(items, extractIndented, []);
            items.forEach(item => {
              if (item.kind == 'provided-slot') {
                providedSlots.push(item);
              } else if (item.kind == 'form-factor') {
                if (formFactor)
                  error('duplicate form factor for a slot');
                formFactor = item.formFactor;
              } else {
                error('Unsupported particle slot item ', item);
              }
            });
            return {
              kind: 'particle-slot',
              location: location(),
              name,
              tags: optional(tags, tags => tags[1], []),
              isRequired: optional(isRequired, isRequired => isRequired[0] == 'must', false),
              isSet: !!isSet,
              formFactor,
              providedSlots
            };
          },
        peg$c107 = "formFactor",
        peg$c108 = peg$literalExpectation("formFactor", false),
        peg$c109 = "fullscreen",
        peg$c110 = peg$literalExpectation("fullscreen", false),
        peg$c111 = "big",
        peg$c112 = peg$literalExpectation("big", false),
        peg$c113 = "medium",
        peg$c114 = peg$literalExpectation("medium", false),
        peg$c115 = "small",
        peg$c116 = peg$literalExpectation("small", false),
        peg$c117 = function(formFactor) {
            return {
              kind: 'form-factor',
              location: location(),
              formFactor
            };
          },
        peg$c118 = function(isSet, name, tags, items) {
            let formFactor = null;
            let handles = [];
            items = items ? extractIndented(items) : [];
            items.forEach(item => {
              if (item.kind == 'form-factor') {
                if (formFactor)
                  error('duplicate form factor for a slot');
                formFactor = item.formFactor;
              } else {
                handles.push(item.handle);
              }
            });
            return {
              kind: 'provided-slot',
              location: location(),
              name,
              tags: optional(tags, tags => tags[1], []),
              isSet: !!isSet,
              formFactor,
              handles
            };
          },
        peg$c119 = "handle",
        peg$c120 = peg$literalExpectation("handle", false),
        peg$c121 = function(handle) {
            return {
              kind: 'particle-provided-slot-handle',
              location: location(),
              handle,
            };
          },
        peg$c122 = function(pattern, handleDescriptions) {
            return {
              kind: 'description',
              location: location(),
              description: [
                {
                  // TODO: this should be stored in a different field.
                  kind: 'default-description?',
                  location: location(),
                  name: 'pattern',
                  pattern: pattern,
                },
                ...optional(handleDescriptions, extractIndented, []),
              ],
            };
          },
        peg$c123 = function(name, pattern) {
            return {
              kind: 'handle-description',
              location: location(),
              name,
              pattern,
            };
          },
        peg$c124 = "recipe",
        peg$c125 = peg$literalExpectation("recipe", false),
        peg$c126 = function(name, tags, items) {
            return {
              kind: 'recipe',
              location: location(),
              name: optional(name, name => name[1], null),
              tags: optional(tags, tags => tags[1], []),
              items: optional(items, extractIndented, []),
            };
          },
        peg$c127 = "as",
        peg$c128 = peg$literalExpectation("as", false),
        peg$c129 = function(name) {
            return name;
          },
        peg$c130 = function(ref, name, connections) {
            let handleConnections = [];
            let slotConnections = [];
            if (connections) {
              connections = extractIndented(connections);
              for (let conn of connections) {
                if (conn.kind == 'handle-connection')
                  handleConnections.push(conn);
                else
                  slotConnections.push(conn)
              }
            }
            return {
              kind: 'particle',
              location: location(),
              name: optional(name, name => name[1], null),
              ref,
              connections: handleConnections,
              slotConnections: slotConnections,
            };
          },
        peg$c131 = "*",
        peg$c132 = peg$literalExpectation("*", false),
        peg$c133 = function(param, dir, target) {
            return {
              kind: 'handle-connection',
              location: location(),
              param,
              dir,
              target: optional(target, target => target[1], null),
            };
          },
        peg$c134 = function(ref, name, providedSlots) {
            return {
              kind: 'slot-connection',
              location: location(),
              param: ref.param,
              tags: ref.tags,
              name: optional(name, name=>name[1], null),
              providedSlots: optional(providedSlots, extractIndented, [])
            };
          },
        peg$c135 = function(param, tags) {
            return {
              kind: 'slot-connection-ref',
              location: location(),
              param,
              tags,
            };
          },
        peg$c136 = function(param, name) {
            return {
              kind: 'provided-slot',
              location: location(),
              param,
              name: optional(name, name=>name[1], null)
            };
          },
        peg$c137 = function(from, dir, to) {
            return {
              kind: 'connection',
              location: location(),
              dir,
              from,
              to,
            };
          },
        peg$c138 = "search",
        peg$c139 = peg$literalExpectation("search", false),
        peg$c140 = "tokens",
        peg$c141 = peg$literalExpectation("tokens", false),
        peg$c142 = function(phrase, tokens) {
            return {
              kind: 'search',
              location: location(),
              phrase,
              tokens: optional(tokens, tokens => tokens[1][2].map(t => t[1]), null)
            };
          },
        peg$c143 = "<-",
        peg$c144 = peg$literalExpectation("<-", false),
        peg$c145 = "->",
        peg$c146 = peg$literalExpectation("->", false),
        peg$c147 = "=",
        peg$c148 = peg$literalExpectation("=", false),
        peg$c149 = ".",
        peg$c150 = peg$literalExpectation(".", false),
        peg$c151 = function(ident, param, tags) {
            let particle = null;
            let name = null;
            if (ident) {
              if (/^[A-Z]/.test(ident)) {
                particle = ident;
              } else {
                name = ident;
              }
            }

            return {
              kind: 'connection-target',
              location: location(),
              particle,
              name,
              param: optional(param, param => param[1], null),
              tags: optional(tags, tags => tags[1], []),
            }
          },
        peg$c152 = function(tags) {
            return {
              kind: 'connection-target',
              location: location(),
              tags,
            };
          },
        peg$c153 = "use",
        peg$c154 = peg$literalExpectation("use", false),
        peg$c155 = "map",
        peg$c156 = peg$literalExpectation("map", false),
        peg$c157 = "create",
        peg$c158 = peg$literalExpectation("create", false),
        peg$c159 = "copy",
        peg$c160 = peg$literalExpectation("copy", false),
        peg$c161 = function(type, ref, name) {
            return {
              kind: 'handle',
              location: location(),
              name: optional(name, name => name[1], null),
              ref: optional(ref, ref => ref[1], null),
              fate: type
            }
          },
        peg$c162 = "#",
        peg$c163 = peg$literalExpectation("#", false),
        peg$c164 = /^[a-zA-Z]/,
        peg$c165 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
        peg$c166 = /^[a-zA-Z0-9_]/,
        peg$c167 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false),
        peg$c168 = function() {return text()},
        peg$c169 = function(head, tail) { return [head, ...(tail && tail[1] || [])]; },
        peg$c170 = function(tags) { return tags; },
        peg$c171 = function(name, tags) {
            return {
              kind: 'particle-ref',
              location: location(),
              name,
              tags: tags || [],
              verbs: [],
            };
          },
        peg$c172 = function(tags) {
            return {
              kind: 'particle-ref',
              location: location(),
              tags,
              verbs: [],
            };
          },
        peg$c173 = "particle can",
        peg$c174 = peg$literalExpectation("particle can", false),
        peg$c175 = function(verb, tags) {
            return {
              kind: 'particle-ref',
              location: location(),
              verbs: [verb],
              tags: tags || [],
            };
          },
        peg$c176 = function(id, tags) {
            return {
              kind: 'handle-ref',
              location: location(),
              id,
              tags: tags || [],
            };
          },
        peg$c177 = function(name, tags) {
            return {
              kind: 'handle-ref',
              location: location(),
              name,
              tags: tags || [],
            };
          },
        peg$c178 = function(tags) {
            return {
              kind: 'handle-ref',
              location: location(),
              tags,
            };
          },
        peg$c179 = "slot",
        peg$c180 = peg$literalExpectation("slot", false),
        peg$c181 = function(ref, name) {
            return {
              kind: 'slot',
              location: location(),
              ref: optional(ref, ref => ref[1], null),
              name: optional(name, name => name[1], '')
            }
          },
        peg$c182 = "{",
        peg$c183 = peg$literalExpectation("{", false),
        peg$c184 = "}",
        peg$c185 = peg$literalExpectation("}", false),
        peg$c186 = function(names, fields) {
            return {
              kind: 'schema-inline',
              location: location(),
              names: optional(names, names => names.map(name => name[0]).filter(name => name != '*'), []),
              fields: optional(fields, fields => [fields[0], ...fields[1].map(tail => tail[2])], []),
            }
          },
        peg$c187 = function(type, name) {
            return {
              kind: 'schema-inline-field',
              location: location(),
              name,
              type: optional(type, type => type[0], null),
            };
          },
        peg$c188 = "schema",
        peg$c189 = peg$literalExpectation("schema", false),
        peg$c190 = function(names, parents) {
            return {
              names: names.map(name => name[1]).filter(name => name != '*'),
              parents: optional(parents, parents => parents, []),
            };
          },
        peg$c191 = "alias",
        peg$c192 = peg$literalExpectation("alias", false),
        peg$c193 = function(spec, alias, items) {
            return Object.assign(spec, {
              kind: 'schema',
              location: location(),
              items: optional(items, extractIndented, []),
              alias,
            });
          },
        peg$c194 = function(spec, items) {
            return Object.assign(spec, {
              kind: 'schema',
              location: location(),
              items: optional(items, extractIndented, []),
            });
          },
        peg$c195 = "extends",
        peg$c196 = peg$literalExpectation("extends", false),
        peg$c197 = function(first, rest) {
          var list = [first];
          for (let item of rest) {
            list.push(item[3]);
          }
          return list;
        },
        peg$c198 = "normative",
        peg$c199 = peg$literalExpectation("normative", false),
        peg$c200 = "optional",
        peg$c201 = peg$literalExpectation("optional", false),
        peg$c202 = function(sectionType, fields) {
            return {
              kind: 'schema-section',
              location: location(),
              sectionType,
              fields: extractIndented(fields),
            };
          },
        peg$c203 = function(type, name) {
            return {
              kind: 'schema-field',
              location: location(),
              type,
              name,
            };
          },
        peg$c204 = "Text",
        peg$c205 = peg$literalExpectation("Text", false),
        peg$c206 = "URL",
        peg$c207 = peg$literalExpectation("URL", false),
        peg$c208 = "Number",
        peg$c209 = peg$literalExpectation("Number", false),
        peg$c210 = "Boolean",
        peg$c211 = peg$literalExpectation("Boolean", false),
        peg$c212 = "Bytes",
        peg$c213 = peg$literalExpectation("Bytes", false),
        peg$c214 = "Object",
        peg$c215 = peg$literalExpectation("Object", false),
        peg$c216 = "or",
        peg$c217 = peg$literalExpectation("or", false),
        peg$c218 = function(first, rest) {
            let types = [first];
            for (let type of rest) {
              types.push(type[3]);
            }
            return {kind: 'schema-union', location: location(), types};
          },
        peg$c219 = function(first, rest) {
            let types = [first];
            for (let type of rest) {
              types.push(type[3]);
            }
            return {kind: 'schema-tuple', location: location(), types};
          },
        peg$c220 = /^[0-9]/,
        peg$c221 = peg$classExpectation([["0", "9"]], false, false),
        peg$c222 = function(version) {
            return Number(version.join(''));
          },
        peg$c223 = " ",
        peg$c224 = peg$literalExpectation(" ", false),
        peg$c225 = function(i) {
          i = i.join('');
          if (i.length > indent.length) {
            indents.push(indent);
            indent = i;
            return true;
          }
        },
        peg$c226 = function(i) {
          i = i.join('');
          if (i.length == indent.length) {
            return true;
          } else if (i.length < indent.length) {
            indent = indents.pop();
            return false;
          }
        },
        peg$c227 = function(i) {
          i = i.join('');
          if (i.length >= indent.length) {
            return true;
          } else if (i.length < indent.length) {
            indent = indents.pop();
            return false;
          }
        },
        peg$c228 = "`",
        peg$c229 = peg$literalExpectation("`", false),
        peg$c230 = /^[^`]/,
        peg$c231 = peg$classExpectation(["`"], true, false),
        peg$c232 = function(pattern) { return pattern.join(''); },
        peg$c233 = "'",
        peg$c234 = peg$literalExpectation("'", false),
        peg$c235 = /^[^']/,
        peg$c236 = peg$classExpectation(["'"], true, false),
        peg$c237 = function(id) {return id.join('')},
        peg$c238 = /^[A-Z]/,
        peg$c239 = peg$classExpectation([["A", "Z"]], false, false),
        peg$c240 = /^[a-z0-9_]/i,
        peg$c241 = peg$classExpectation([["a", "z"], ["0", "9"], "_"], false, true),
        peg$c242 = function(ident) {return text()},
        peg$c243 = /^[a-z]/,
        peg$c244 = peg$classExpectation([["a", "z"]], false, false),
        peg$c245 = /^[ ]/,
        peg$c246 = peg$classExpectation([" "], false, false),
        peg$c247 = peg$anyExpectation(),
        peg$c248 = "\r",
        peg$c249 = peg$literalExpectation("\r", false),
        peg$c250 = "\n",
        peg$c251 = peg$literalExpectation("\n", false),
        peg$c252 = "//",
        peg$c253 = peg$literalExpectation("//", false),
        peg$c254 = function(marker) {
            if (marker === '#' && !deprecatedCommentWarningShown) {
              console.warn("'#' for comments is deprecated. Please use '//' instead");
              deprecatedCommentWarningShown = true;
            }
          },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1 }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

      throw peg$buildStructuredError(
        [peg$otherExpectation(description)],
        input.substring(peg$savedPos, peg$currPos),
        location
      );
    }

    function error(message, location) {
      location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

      throw peg$buildSimpleError(message, location);
    }

    function peg$literalExpectation(text, ignoreCase) {
      return { type: "literal", text: text, ignoreCase: ignoreCase };
    }

    function peg$classExpectation(parts, inverted, ignoreCase) {
      return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }

    function peg$anyExpectation() {
      return { type: "any" };
    }

    function peg$endExpectation() {
      return { type: "end" };
    }

    function peg$otherExpectation(description) {
      return { type: "other", description: description };
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos], p;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildSimpleError(message, location) {
      return new peg$SyntaxError(message, null, null, location);
    }

    function peg$buildStructuredError(expected, found, location) {
      return new peg$SyntaxError(
        peg$SyntaxError.buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parseManifest() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parseeolWhiteSpace();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseIndent();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$currPos;
          s6 = peg$parseSameIndent();
          if (s6 !== peg$FAILED) {
            s7 = peg$parseAnnotation();
            if (s7 !== peg$FAILED) {
              s8 = peg$parseeolWhiteSpace();
              if (s8 !== peg$FAILED) {
                s6 = [s6, s7, s8];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          if (s5 === peg$FAILED) {
            s5 = null;
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parseSameIndent();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseManifestItem();
              if (s7 !== peg$FAILED) {
                s5 = [s5, s6, s7];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$currPos;
            s6 = peg$parseSameIndent();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseAnnotation();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseeolWhiteSpace();
                if (s8 !== peg$FAILED) {
                  s6 = [s6, s7, s8];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parseSameIndent();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseManifestItem();
                if (s7 !== peg$FAILED) {
                  s5 = [s5, s6, s7];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c0(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseManifestItem() {
      var s0;

      s0 = peg$parseRecipe();
      if (s0 === peg$FAILED) {
        s0 = peg$parseParticleDefinition();
        if (s0 === peg$FAILED) {
          s0 = peg$parseImport();
          if (s0 === peg$FAILED) {
            s0 = peg$parseSchemaDefinition();
            if (s0 === peg$FAILED) {
              s0 = peg$parseSchemaAliasDefinition();
              if (s0 === peg$FAILED) {
                s0 = peg$parseManifestStorage();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseShape();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseMeta();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseResource();
                    }
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseAnnotation() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 64) {
        s1 = peg$c1;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c2); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parselowerIdent();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c3(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseResource() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 8) === peg$c4) {
        s1 = peg$c4;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c5); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseupperIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseIndent();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseSameIndent();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseResourceStart();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseResourceBody();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parseeolWhiteSpace();
                      if (s9 === peg$FAILED) {
                        s9 = null;
                      }
                      if (s9 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c6(s3, s8);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseResourceStart() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c7) {
        s1 = peg$c7;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseeolWhiteSpace();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c9();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseResourceBody() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parseSameOrMoreIndent();
      if (s3 !== peg$FAILED) {
        s4 = peg$parseResourceLine();
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parseSameOrMoreIndent();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseResourceLine();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c10(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseResourceLine() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c11.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c11.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c12); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseeol();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c13();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseManifestStorage() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16, s17, s18, s19;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c14) {
        s1 = peg$c14;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c16) {
          s1 = peg$c16;
          peg$currPos += 5;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseupperIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c18) {
                s5 = peg$c18;
                peg$currPos += 2;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c19); }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsewhiteSpace();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseSchemaInline();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseListType();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseReferenceType();
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$currPos;
                    s9 = peg$parsewhiteSpace();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseid();
                      if (s10 !== peg$FAILED) {
                        s9 = [s9, s10];
                        s8 = s9;
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                    if (s8 === peg$FAILED) {
                      s8 = null;
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$currPos;
                      s10 = peg$parsewhiteSpace();
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parseVersion();
                        if (s11 !== peg$FAILED) {
                          s10 = [s10, s11];
                          s9 = s10;
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                      if (s9 === peg$FAILED) {
                        s9 = null;
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$currPos;
                        s11 = peg$parsewhiteSpace();
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parseTagList();
                          if (s12 !== peg$FAILED) {
                            s11 = [s11, s12];
                            s10 = s11;
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                        if (s10 === peg$FAILED) {
                          s10 = null;
                        }
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsewhiteSpace();
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parseManifestStorageSource();
                            if (s12 !== peg$FAILED) {
                              s13 = peg$parseeolWhiteSpace();
                              if (s13 !== peg$FAILED) {
                                s14 = peg$currPos;
                                s15 = peg$parseIndent();
                                if (s15 !== peg$FAILED) {
                                  s16 = [];
                                  s17 = peg$currPos;
                                  s18 = peg$parseSameIndent();
                                  if (s18 !== peg$FAILED) {
                                    s19 = peg$parseManifestStorageDescription();
                                    if (s19 !== peg$FAILED) {
                                      s18 = [s18, s19];
                                      s17 = s18;
                                    } else {
                                      peg$currPos = s17;
                                      s17 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s17;
                                    s17 = peg$FAILED;
                                  }
                                  if (s17 !== peg$FAILED) {
                                    while (s17 !== peg$FAILED) {
                                      s16.push(s17);
                                      s17 = peg$currPos;
                                      s18 = peg$parseSameIndent();
                                      if (s18 !== peg$FAILED) {
                                        s19 = peg$parseManifestStorageDescription();
                                        if (s19 !== peg$FAILED) {
                                          s18 = [s18, s19];
                                          s17 = s18;
                                        } else {
                                          peg$currPos = s17;
                                          s17 = peg$FAILED;
                                        }
                                      } else {
                                        peg$currPos = s17;
                                        s17 = peg$FAILED;
                                      }
                                    }
                                  } else {
                                    s16 = peg$FAILED;
                                  }
                                  if (s16 !== peg$FAILED) {
                                    s15 = [s15, s16];
                                    s14 = s15;
                                  } else {
                                    peg$currPos = s14;
                                    s14 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s14;
                                  s14 = peg$FAILED;
                                }
                                if (s14 === peg$FAILED) {
                                  s14 = null;
                                }
                                if (s14 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c20(s3, s7, s8, s9, s10, s12, s14);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseManifestStorageSource() {
      var s0;

      s0 = peg$parseManifestStorageFileSource();
      if (s0 === peg$FAILED) {
        s0 = peg$parseManifestStorageResourceSource();
        if (s0 === peg$FAILED) {
          s0 = peg$parseManifestStorageStorageSource();
        }
      }

      return s0;
    }

    function peg$parseManifestStorageFileSource() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c21) {
        s1 = peg$c21;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c22); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c23(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseManifestStorageResourceSource() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c21) {
        s1 = peg$c21;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c22); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseupperIdent();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c24(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseManifestStorageStorageSource() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c27(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseManifestStorageDescription() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 11) === peg$c28) {
        s1 = peg$c28;
        peg$currPos += 11;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebackquotedString();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseImport() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c30) {
        s1 = peg$c30;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseid();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c32(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseShape() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c33) {
        s1 = peg$c33;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c34); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseupperIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 60) {
                s6 = peg$c35;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c36); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsewhiteSpace();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseVariableTypeList();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsewhiteSpace();
                    if (s9 === peg$FAILED) {
                      s9 = null;
                    }
                    if (s9 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 62) {
                        s10 = peg$c37;
                        peg$currPos++;
                      } else {
                        s10 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c38); }
                      }
                      if (s10 !== peg$FAILED) {
                        s5 = [s5, s6, s7, s8, s9, s10];
                        s4 = s5;
                      } else {
                        peg$currPos = s4;
                        s4 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s4;
                      s4 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parseIndent();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$currPos;
                  s10 = peg$parseSameIndent();
                  if (s10 !== peg$FAILED) {
                    s11 = peg$parseShapeItem();
                    if (s11 !== peg$FAILED) {
                      s10 = [s10, s11];
                      s9 = s10;
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s9;
                    s9 = peg$FAILED;
                  }
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$currPos;
                    s10 = peg$parseSameIndent();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseShapeItem();
                      if (s11 !== peg$FAILED) {
                        s10 = [s10, s11];
                        s9 = s10;
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseeolWhiteSpace();
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c39(s3, s4, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseShapeItem() {
      var s0;

      s0 = peg$parseShapeInterface();
      if (s0 === peg$FAILED) {
        s0 = peg$parseShapeSlot();
      }

      return s0;
    }

    function peg$parseShapeInterface() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseupperIdent();
      if (s1 === peg$FAILED) {
        s1 = peg$parselowerIdent();
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c40;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseShapeArgumentList();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c42;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c43); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c44(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseShapeArgumentList() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseShapeArgument();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 44) {
          s4 = peg$c45;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsewhiteSpace();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseShapeArgument();
            if (s6 !== peg$FAILED) {
              s4 = [s4, s5, s6];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c45;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c46); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseShapeArgument();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c47(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseShapeArgument() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseParticleArgumentDirection();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseParticleArgumentType();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parselowerIdent();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c48(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseShapeSlot() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c49) {
        s2 = peg$c49;
        peg$currPos += 4;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c50); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c51) {
          s2 = peg$c51;
          peg$currPos += 7;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c52); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 7) === peg$c53) {
            s2 = peg$c53;
            peg$currPos += 7;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c54); }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c55) {
              s5 = peg$c55;
              peg$currPos += 6;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c56); }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parselowerIdent();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c57(s1, s2, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseMeta() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c58) {
        s1 = peg$c58;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c59); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseeolWhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parseIndent();
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$currPos;
            s7 = peg$parseSameIndent();
            if (s7 !== peg$FAILED) {
              s8 = peg$parseMetaItem();
              if (s8 !== peg$FAILED) {
                s7 = [s7, s8];
                s6 = s7;
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              s6 = peg$currPos;
              s7 = peg$parseSameIndent();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseMetaItem();
                if (s8 !== peg$FAILED) {
                  s7 = [s7, s8];
                  s6 = s7;
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c60(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseMetaItem() {
      var s0;

      s0 = peg$parseMetaStorageKey();
      if (s0 === peg$FAILED) {
        s0 = peg$parseMetaName();
      }

      return s0;
    }

    function peg$parseMetaName() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c61) {
        s1 = peg$c61;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c62); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c63;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c64); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseid();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseeolWhiteSpace();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c65(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseMetaStorageKey() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 10) === peg$c66) {
        s1 = peg$c66;
        peg$currPos += 10;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c67); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s3 = peg$c63;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c64); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseid();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseeolWhiteSpace();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c68(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleDefinition() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 8) === peg$c69) {
        s1 = peg$c69;
        peg$currPos += 8;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c70); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseupperIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c21) {
                s6 = peg$c21;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c22); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsewhiteSpace();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseid();
                  if (s8 !== peg$FAILED) {
                    s5 = [s5, s6, s7, s8];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parseIndent();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$currPos;
                  s10 = peg$parseSameIndent();
                  if (s10 !== peg$FAILED) {
                    s11 = peg$parseParticleItem();
                    if (s11 !== peg$FAILED) {
                      s10 = [s10, s11];
                      s9 = s10;
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s9;
                    s9 = peg$FAILED;
                  }
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$currPos;
                    s10 = peg$parseSameIndent();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseParticleItem();
                      if (s11 !== peg$FAILED) {
                        s10 = [s10, s11];
                        s9 = s10;
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseeolWhiteSpace();
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c71(s3, s4, s6);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleItem() {
      var s0;

      s0 = peg$parseParticleInterface();
      if (s0 === peg$FAILED) {
        s0 = peg$parseParticleAffordance();
        if (s0 === peg$FAILED) {
          s0 = peg$parseParticleSlot();
          if (s0 === peg$FAILED) {
            s0 = peg$parseDescription();
          }
        }
      }

      return s0;
    }

    function peg$parseParticleInterface() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseupperIdent();
      if (s1 === peg$FAILED) {
        s1 = peg$parselowerIdent();
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 40) {
          s2 = peg$c40;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseParticleArgumentList();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c42;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c43); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c72(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleArgumentList() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseParticleArgument();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 44) {
          s4 = peg$c45;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsewhiteSpace();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseParticleArgument();
            if (s6 !== peg$FAILED) {
              s4 = [s4, s5, s6];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c45;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c46); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseParticleArgument();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c47(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleArgument() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseParticleArgumentDirection();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseParticleArgumentType();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 63) {
              s4 = peg$c73;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c74); }
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsewhiteSpace();
              if (s5 !== peg$FAILED) {
                s6 = peg$parselowerIdent();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c75(s1, s3, s4, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleArgumentDirection() {
      var s0, s1;

      if (input.substr(peg$currPos, 5) === peg$c76) {
        s0 = peg$c76;
        peg$currPos += 5;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c77); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c21) {
          s0 = peg$c21;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c22); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c78) {
            s0 = peg$c78;
            peg$currPos += 3;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c79); }
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 4) === peg$c80) {
              s1 = peg$c80;
              peg$currPos += 4;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c81); }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c82();
            }
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parseParticleArgumentType() {
      var s0;

      s0 = peg$parseVariableType();
      if (s0 === peg$FAILED) {
        s0 = peg$parseSchemaInline();
        if (s0 === peg$FAILED) {
          s0 = peg$parseReferenceType();
          if (s0 === peg$FAILED) {
            s0 = peg$parseListType();
          }
        }
      }

      return s0;
    }

    function peg$parseListType() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c83;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c84); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseParticleArgumentType();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 93) {
            s3 = peg$c85;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c86); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c87(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseVariableType() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 126) {
        s1 = peg$c88;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c89); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parselowerIdent();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c90) {
              s5 = peg$c90;
              peg$currPos += 4;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c91); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsewhiteSpace();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseParticleArgumentType();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c92(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseReferenceType() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseupperIdent();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c93(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseVariableTypeList() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseVariableType();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 44) {
          s4 = peg$c45;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parsewhiteSpace();
          if (s5 !== peg$FAILED) {
            s6 = peg$parseVariableType();
            if (s6 !== peg$FAILED) {
              s4 = [s4, s5, s6];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c45;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c46); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseVariableType();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c94(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleAffordance() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 10) === peg$c95) {
        s1 = peg$c95;
        peg$currPos += 10;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c96); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 9) === peg$c97) {
            s3 = peg$c97;
            peg$currPos += 9;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c98); }
          }
          if (s3 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c99) {
              s3 = peg$c99;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c100); }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c101) {
                s3 = peg$c101;
                peg$currPos += 2;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c102); }
              }
              if (s3 === peg$FAILED) {
                if (input.substr(peg$currPos, 5) === peg$c103) {
                  s3 = peg$c103;
                  peg$currPos += 5;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c104); }
                }
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c105(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleSlot() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c49) {
        s2 = peg$c49;
        peg$currPos += 4;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c50); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c51) {
          s2 = peg$c51;
          peg$currPos += 7;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c52); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsewhiteSpace();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            if (input.substr(peg$currPos, 6) === peg$c55) {
              s5 = peg$c55;
              peg$currPos += 6;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c56); }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsewhiteSpace();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parselowerIdent();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parsewhiteSpace();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseTagList();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseeolWhiteSpace();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$currPos;
                    s9 = peg$parseIndent();
                    if (s9 !== peg$FAILED) {
                      s10 = [];
                      s11 = peg$currPos;
                      s12 = peg$parseSameIndent();
                      if (s12 !== peg$FAILED) {
                        s13 = peg$parseParticleSlotItem();
                        if (s13 !== peg$FAILED) {
                          s12 = [s12, s13];
                          s11 = s12;
                        } else {
                          peg$currPos = s11;
                          s11 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s11;
                        s11 = peg$FAILED;
                      }
                      while (s11 !== peg$FAILED) {
                        s10.push(s11);
                        s11 = peg$currPos;
                        s12 = peg$parseSameIndent();
                        if (s12 !== peg$FAILED) {
                          s13 = peg$parseParticleSlotItem();
                          if (s13 !== peg$FAILED) {
                            s12 = [s12, s13];
                            s11 = s12;
                          } else {
                            peg$currPos = s11;
                            s11 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s11;
                          s11 = peg$FAILED;
                        }
                      }
                      if (s10 !== peg$FAILED) {
                        s9 = [s9, s10];
                        s8 = s9;
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                    if (s8 === peg$FAILED) {
                      s8 = null;
                    }
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c106(s1, s4, s5, s6, s8);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleSlotItem() {
      var s0;

      s0 = peg$parseSlotFormFactor();
      if (s0 === peg$FAILED) {
        s0 = peg$parseParticleProvidedSlot();
      }

      return s0;
    }

    function peg$parseSlotFormFactor() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 10) === peg$c107) {
        s1 = peg$c107;
        peg$currPos += 10;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c108); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 10) === peg$c109) {
            s3 = peg$c109;
            peg$currPos += 10;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c110); }
          }
          if (s3 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c111) {
              s3 = peg$c111;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c112); }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c113) {
                s3 = peg$c113;
                peg$currPos += 6;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c114); }
              }
              if (s3 === peg$FAILED) {
                if (input.substr(peg$currPos, 5) === peg$c115) {
                  s3 = peg$c115;
                  peg$currPos += 5;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c116); }
                }
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c117(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleProvidedSlot() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c53) {
        s1 = peg$c53;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c54); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.substr(peg$currPos, 6) === peg$c55) {
            s4 = peg$c55;
            peg$currPos += 6;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c56); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parselowerIdent();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parsewhiteSpace();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseTagList();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parseeolWhiteSpace();
                if (s6 !== peg$FAILED) {
                  s7 = peg$currPos;
                  s8 = peg$parseIndent();
                  if (s8 !== peg$FAILED) {
                    s9 = [];
                    s10 = peg$currPos;
                    s11 = peg$parseSameIndent();
                    if (s11 !== peg$FAILED) {
                      s12 = peg$parseParticleProvidedSlotItem();
                      if (s12 !== peg$FAILED) {
                        s11 = [s11, s12];
                        s10 = s11;
                      } else {
                        peg$currPos = s10;
                        s10 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s10;
                      s10 = peg$FAILED;
                    }
                    while (s10 !== peg$FAILED) {
                      s9.push(s10);
                      s10 = peg$currPos;
                      s11 = peg$parseSameIndent();
                      if (s11 !== peg$FAILED) {
                        s12 = peg$parseParticleProvidedSlotItem();
                        if (s12 !== peg$FAILED) {
                          s11 = [s11, s12];
                          s10 = s11;
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s10;
                        s10 = peg$FAILED;
                      }
                    }
                    if (s9 !== peg$FAILED) {
                      s8 = [s8, s9];
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c118(s3, s4, s5, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleProvidedSlotItem() {
      var s0;

      s0 = peg$parseSlotFormFactor();
      if (s0 === peg$FAILED) {
        s0 = peg$parseParticleProvidedSlotHandle();
      }

      return s0;
    }

    function peg$parseParticleProvidedSlotHandle() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c14) {
        s1 = peg$c14;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 6) === peg$c119) {
          s1 = peg$c119;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c120); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parselowerIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c121(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseDescription() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 11) === peg$c28) {
        s1 = peg$c28;
        peg$currPos += 11;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebackquotedString();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseIndent();
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$currPos;
                s9 = peg$parseSameIndent();
                if (s9 !== peg$FAILED) {
                  s10 = peg$parseParticleHandleDescription();
                  if (s10 !== peg$FAILED) {
                    s9 = [s9, s10];
                    s8 = s9;
                  } else {
                    peg$currPos = s8;
                    s8 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s8;
                  s8 = peg$FAILED;
                }
                if (s8 !== peg$FAILED) {
                  while (s8 !== peg$FAILED) {
                    s7.push(s8);
                    s8 = peg$currPos;
                    s9 = peg$parseSameIndent();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseParticleHandleDescription();
                      if (s10 !== peg$FAILED) {
                        s9 = [s9, s10];
                        s8 = s9;
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                  }
                } else {
                  s7 = peg$FAILED;
                }
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c122(s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleHandleDescription() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parselowerIdent();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebackquotedString();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c123(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipe() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c124) {
        s1 = peg$c124;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c125); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseupperIdent();
          if (s4 === peg$FAILED) {
            s4 = peg$parselowerIdent();
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseTagList();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseIndent();
              if (s6 !== peg$FAILED) {
                s7 = [];
                s8 = peg$currPos;
                s9 = peg$parseSameIndent();
                if (s9 !== peg$FAILED) {
                  s10 = peg$parseRecipeItem();
                  if (s10 !== peg$FAILED) {
                    s9 = [s9, s10];
                    s8 = s9;
                  } else {
                    peg$currPos = s8;
                    s8 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s8;
                  s8 = peg$FAILED;
                }
                while (s8 !== peg$FAILED) {
                  s7.push(s8);
                  s8 = peg$currPos;
                  s9 = peg$parseSameIndent();
                  if (s9 !== peg$FAILED) {
                    s10 = peg$parseRecipeItem();
                    if (s10 !== peg$FAILED) {
                      s9 = [s9, s10];
                      s8 = s9;
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s8;
                    s8 = peg$FAILED;
                  }
                }
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c126(s2, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeItem() {
      var s0;

      s0 = peg$parseRecipeParticle();
      if (s0 === peg$FAILED) {
        s0 = peg$parseRecipeHandle();
        if (s0 === peg$FAILED) {
          s0 = peg$parseRecipeSlot();
          if (s0 === peg$FAILED) {
            s0 = peg$parseRecipeConnection();
            if (s0 === peg$FAILED) {
              s0 = peg$parseRecipeSearch();
              if (s0 === peg$FAILED) {
                s0 = peg$parseDescription();
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseLocalName() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c127) {
        s1 = peg$c127;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c128); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parselowerIdent();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c129(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseTopLevelAlias() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c127) {
        s1 = peg$c127;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c128); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseupperIdent();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c129(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeParticle() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      s1 = peg$parseParticleRef();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseLocalName();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseeolWhiteSpace();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parseIndent();
            if (s5 !== peg$FAILED) {
              s6 = [];
              s7 = peg$currPos;
              s8 = peg$parseSameIndent();
              if (s8 !== peg$FAILED) {
                s9 = peg$parseRecipeParticleItem();
                if (s9 !== peg$FAILED) {
                  s8 = [s8, s9];
                  s7 = s8;
                } else {
                  peg$currPos = s7;
                  s7 = peg$FAILED;
                }
              } else {
                peg$currPos = s7;
                s7 = peg$FAILED;
              }
              while (s7 !== peg$FAILED) {
                s6.push(s7);
                s7 = peg$currPos;
                s8 = peg$parseSameIndent();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseRecipeParticleItem();
                  if (s9 !== peg$FAILED) {
                    s8 = [s8, s9];
                    s7 = s8;
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s7;
                  s7 = peg$FAILED;
                }
              }
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c130(s1, s2, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeParticleItem() {
      var s0;

      s0 = peg$parseRecipeParticleConnection();
      if (s0 === peg$FAILED) {
        s0 = peg$parseRecipeParticleSlotConnection();
      }

      return s0;
    }

    function peg$parseRecipeParticleConnection() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parselowerIdent();
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 42) {
          s1 = peg$c131;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c132); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseDirection();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseConnectionTarget();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c133(s1, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeParticleSlotConnection() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c51) {
        s1 = peg$c51;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c52); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseRecipeSlotConnectionRef();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseLocalName();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                s7 = peg$parseIndent();
                if (s7 !== peg$FAILED) {
                  s8 = [];
                  s9 = peg$currPos;
                  s10 = peg$parseSameIndent();
                  if (s10 !== peg$FAILED) {
                    s11 = peg$parseRecipeParticleProvidedSlot();
                    if (s11 !== peg$FAILED) {
                      s10 = [s10, s11];
                      s9 = s10;
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s9;
                    s9 = peg$FAILED;
                  }
                  while (s9 !== peg$FAILED) {
                    s8.push(s9);
                    s9 = peg$currPos;
                    s10 = peg$parseSameIndent();
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseRecipeParticleProvidedSlot();
                      if (s11 !== peg$FAILED) {
                        s10 = [s10, s11];
                        s9 = s10;
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 === peg$FAILED) {
                  s6 = null;
                }
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c134(s3, s4, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeSlotConnectionRef() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parselowerIdent();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSpaceTagList();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c135(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeParticleProvidedSlot() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c53) {
        s1 = peg$c53;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c54); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parselowerIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$currPos;
            s5 = peg$parsewhiteSpace();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseLocalName();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseeolWhiteSpace();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c136(s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeConnection() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parseConnectionTarget();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseDirection();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseConnectionTarget();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseeolWhiteSpace();
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c137(s1, s3, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseRecipeSearch() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c138) {
        s1 = peg$c138;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c139); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsebackquotedString();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseIndent();
              if (s6 !== peg$FAILED) {
                s7 = peg$currPos;
                s8 = peg$parseSameIndent();
                if (s8 !== peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c140) {
                    s9 = peg$c140;
                    peg$currPos += 6;
                  } else {
                    s9 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c141); }
                  }
                  if (s9 !== peg$FAILED) {
                    s10 = [];
                    s11 = peg$currPos;
                    s12 = peg$parsewhiteSpace();
                    if (s12 !== peg$FAILED) {
                      s13 = peg$parsebackquotedString();
                      if (s13 !== peg$FAILED) {
                        s12 = [s12, s13];
                        s11 = s12;
                      } else {
                        peg$currPos = s11;
                        s11 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s11;
                      s11 = peg$FAILED;
                    }
                    if (s11 !== peg$FAILED) {
                      while (s11 !== peg$FAILED) {
                        s10.push(s11);
                        s11 = peg$currPos;
                        s12 = peg$parsewhiteSpace();
                        if (s12 !== peg$FAILED) {
                          s13 = peg$parsebackquotedString();
                          if (s13 !== peg$FAILED) {
                            s12 = [s12, s13];
                            s11 = s12;
                          } else {
                            peg$currPos = s11;
                            s11 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s11;
                          s11 = peg$FAILED;
                        }
                      }
                    } else {
                      s10 = peg$FAILED;
                    }
                    if (s10 !== peg$FAILED) {
                      s11 = peg$parseeolWhiteSpace();
                      if (s11 !== peg$FAILED) {
                        s8 = [s8, s9, s10, s11];
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s7;
                  s7 = peg$FAILED;
                }
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c142(s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseDirection() {
      var s0;

      if (input.substr(peg$currPos, 2) === peg$c143) {
        s0 = peg$c143;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c144); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c145) {
          s0 = peg$c145;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c146); }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s0 = peg$c147;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c148); }
          }
        }
      }

      return s0;
    }

    function peg$parseConnectionTarget() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseupperIdent();
      if (s1 === peg$FAILED) {
        s1 = peg$parselowerIdent();
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 46) {
          s3 = peg$c149;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c150); }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parselowerIdent();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseTagList();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c151(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseTagList();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c152(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseRecipeHandle() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 63) {
        s1 = peg$c73;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c74); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c153) {
          s1 = peg$c153;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c154); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c155) {
            s1 = peg$c155;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c156); }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c157) {
              s1 = peg$c157;
              peg$currPos += 6;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c158); }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 4) === peg$c159) {
                s1 = peg$c159;
                peg$currPos += 4;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c160); }
              }
            }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseHandleOrSlotRef();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseLocalName();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c161(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseTag() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s1 = peg$c162;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c163); }
      }
      if (s1 !== peg$FAILED) {
        if (peg$c164.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c165); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c166.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c167); }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c166.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c167); }
            }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c168();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseTagList() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseTag();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseTagList();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c169(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSpaceTagList() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsewhiteSpace();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseTagList();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c170(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseParticleRef() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseupperIdent();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSpaceTagList();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c171(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseTagList();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c172(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 12) === peg$c173) {
            s1 = peg$c173;
            peg$currPos += 12;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c174); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsewhiteSpace();
            if (s2 !== peg$FAILED) {
              s3 = peg$parselowerIdent();
              if (s3 !== peg$FAILED) {
                s4 = peg$parseSpaceTagList();
                if (s4 === peg$FAILED) {
                  s4 = null;
                }
                if (s4 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c175(s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
      }

      return s0;
    }

    function peg$parseHandleOrSlotRef() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseid();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseSpaceTagList();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c176(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseupperIdent();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseSpaceTagList();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c177(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseTagList();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c178(s1);
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseRecipeSlot() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c179) {
        s1 = peg$c179;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c180); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseHandleOrSlotRef();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parsewhiteSpace();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseLocalName();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c181(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaInline() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parseupperIdent();
      if (s3 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 42) {
          s3 = peg$c131;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c132); }
        }
      }
      if (s3 !== peg$FAILED) {
        s4 = peg$parsewhiteSpace();
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parseupperIdent();
          if (s3 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 42) {
              s3 = peg$c131;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c132); }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 123) {
          s2 = peg$c182;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c183); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parseSchemaInlineField();
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s7 = peg$c45;
              peg$currPos++;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c46); }
            }
            if (s7 !== peg$FAILED) {
              s8 = peg$parsewhiteSpace();
              if (s8 !== peg$FAILED) {
                s9 = peg$parseSchemaInlineField();
                if (s9 !== peg$FAILED) {
                  s7 = [s7, s8, s9];
                  s6 = s7;
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              s6 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s7 = peg$c45;
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c46); }
              }
              if (s7 !== peg$FAILED) {
                s8 = peg$parsewhiteSpace();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseSchemaInlineField();
                  if (s9 !== peg$FAILED) {
                    s7 = [s7, s8, s9];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s4 = peg$c184;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c185); }
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c186(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaInlineField() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseSchemaType();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsewhiteSpace();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parselowerIdent();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c187(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaSpec() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c188) {
        s1 = peg$c188;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c189); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parsewhiteSpace();
        if (s4 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 42) {
            s5 = peg$c131;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c132); }
          }
          if (s5 === peg$FAILED) {
            s5 = peg$parseupperIdent();
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 42) {
                s5 = peg$c131;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c132); }
              }
              if (s5 === peg$FAILED) {
                s5 = peg$parseupperIdent();
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseSchemaExtends();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c190(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaAliasDefinition() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c191) {
        s1 = peg$c191;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c192); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseSchemaSpec();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsewhiteSpace();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseTopLevelAlias();
              if (s5 !== peg$FAILED) {
                s6 = peg$parseeolWhiteSpace();
                if (s6 !== peg$FAILED) {
                  s7 = peg$currPos;
                  s8 = peg$parseIndent();
                  if (s8 !== peg$FAILED) {
                    s9 = [];
                    s10 = peg$currPos;
                    s11 = peg$parseSameIndent();
                    if (s11 !== peg$FAILED) {
                      s12 = peg$parseSchemaItem();
                      if (s12 !== peg$FAILED) {
                        s11 = [s11, s12];
                        s10 = s11;
                      } else {
                        peg$currPos = s10;
                        s10 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s10;
                      s10 = peg$FAILED;
                    }
                    while (s10 !== peg$FAILED) {
                      s9.push(s10);
                      s10 = peg$currPos;
                      s11 = peg$parseSameIndent();
                      if (s11 !== peg$FAILED) {
                        s12 = peg$parseSchemaItem();
                        if (s12 !== peg$FAILED) {
                          s11 = [s11, s12];
                          s10 = s11;
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s10;
                        s10 = peg$FAILED;
                      }
                    }
                    if (s9 !== peg$FAILED) {
                      s8 = [s8, s9];
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c193(s3, s5, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaDefinition() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parseSchemaSpec();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseeolWhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parseIndent();
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$currPos;
            s7 = peg$parseSameIndent();
            if (s7 !== peg$FAILED) {
              s8 = peg$parseSchemaItem();
              if (s8 !== peg$FAILED) {
                s7 = [s7, s8];
                s6 = s7;
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              s6 = peg$currPos;
              s7 = peg$parseSameIndent();
              if (s7 !== peg$FAILED) {
                s8 = peg$parseSchemaItem();
                if (s8 !== peg$FAILED) {
                  s7 = [s7, s8];
                  s6 = s7;
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c194(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaExtends() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

      s0 = peg$currPos;
      s1 = peg$parsewhiteSpace();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c195) {
          s2 = peg$c195;
          peg$currPos += 7;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c196); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsewhiteSpace();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseupperIdent();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$currPos;
              s7 = peg$parsewhiteSpace();
              if (s7 === peg$FAILED) {
                s7 = null;
              }
              if (s7 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s8 = peg$c45;
                  peg$currPos++;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c46); }
                }
                if (s8 !== peg$FAILED) {
                  s9 = peg$parsewhiteSpace();
                  if (s9 !== peg$FAILED) {
                    s10 = peg$parseupperIdent();
                    if (s10 !== peg$FAILED) {
                      s7 = [s7, s8, s9, s10];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$currPos;
                s7 = peg$parsewhiteSpace();
                if (s7 === peg$FAILED) {
                  s7 = null;
                }
                if (s7 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 44) {
                    s8 = peg$c45;
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c46); }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parsewhiteSpace();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseupperIdent();
                      if (s10 !== peg$FAILED) {
                        s7 = [s7, s8, s9, s10];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c197(s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaItem() {
      var s0;

      s0 = peg$parseSchemaSection();
      if (s0 === peg$FAILED) {
        s0 = peg$parseSchemaField();
        if (s0 === peg$FAILED) {
          s0 = peg$parseDescription();
        }
      }

      return s0;
    }

    function peg$parseSchemaSection() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 9) === peg$c198) {
        s1 = peg$c198;
        peg$currPos += 9;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c199); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 8) === peg$c200) {
          s1 = peg$c200;
          peg$currPos += 8;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c201); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseeolWhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$parseIndent();
          if (s4 !== peg$FAILED) {
            s5 = [];
            s6 = peg$currPos;
            s7 = peg$parseSameIndent();
            if (s7 !== peg$FAILED) {
              s8 = peg$parseSchemaField();
              if (s8 !== peg$FAILED) {
                s7 = [s7, s8];
                s6 = s7;
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            if (s6 !== peg$FAILED) {
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                s6 = peg$currPos;
                s7 = peg$parseSameIndent();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseSchemaField();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
              }
            } else {
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c202(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaField() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseSchemaType();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 !== peg$FAILED) {
          s3 = peg$parselowerIdent();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c203(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaType() {
      var s0;

      s0 = peg$parseSchemaPrimitiveType();
      if (s0 === peg$FAILED) {
        s0 = peg$parseSchemaUnionType();
        if (s0 === peg$FAILED) {
          s0 = peg$parseSchemaTupleType();
        }
      }

      return s0;
    }

    function peg$parseSchemaPrimitiveType() {
      var s0;

      if (input.substr(peg$currPos, 4) === peg$c204) {
        s0 = peg$c204;
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c205); }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 3) === peg$c206) {
          s0 = peg$c206;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c207); }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 6) === peg$c208) {
            s0 = peg$c208;
            peg$currPos += 6;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c209); }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c210) {
              s0 = peg$c210;
              peg$currPos += 7;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c211); }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 5) === peg$c212) {
                s0 = peg$c212;
                peg$currPos += 5;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c213); }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c214) {
                  s0 = peg$c214;
                  peg$currPos += 6;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c215); }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseSchemaUnionType() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c40;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c41); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseSchemaPrimitiveType();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parsewhiteSpace();
            if (s6 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c216) {
                s7 = peg$c216;
                peg$currPos += 2;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c217); }
              }
              if (s7 !== peg$FAILED) {
                s8 = peg$parsewhiteSpace();
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseSchemaPrimitiveType();
                  if (s9 !== peg$FAILED) {
                    s6 = [s6, s7, s8, s9];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$currPos;
                s6 = peg$parsewhiteSpace();
                if (s6 !== peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c216) {
                    s7 = peg$c216;
                    peg$currPos += 2;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c217); }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parsewhiteSpace();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parseSchemaPrimitiveType();
                      if (s9 !== peg$FAILED) {
                        s6 = [s6, s7, s8, s9];
                        s5 = s6;
                      } else {
                        peg$currPos = s5;
                        s5 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              }
            } else {
              s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsewhiteSpace();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s6 = peg$c42;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c43); }
                }
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c218(s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSchemaTupleType() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c40;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c41); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsewhiteSpace();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseSchemaPrimitiveType();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parsewhiteSpace();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 44) {
                s7 = peg$c45;
                peg$currPos++;
              } else {
                s7 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c46); }
              }
              if (s7 !== peg$FAILED) {
                s8 = peg$parsewhiteSpace();
                if (s8 === peg$FAILED) {
                  s8 = null;
                }
                if (s8 !== peg$FAILED) {
                  s9 = peg$parseSchemaPrimitiveType();
                  if (s9 !== peg$FAILED) {
                    s6 = [s6, s7, s8, s9];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parsewhiteSpace();
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s7 = peg$c45;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c46); }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parsewhiteSpace();
                  if (s8 === peg$FAILED) {
                    s8 = null;
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parseSchemaPrimitiveType();
                    if (s9 !== peg$FAILED) {
                      s6 = [s6, s7, s8, s9];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsewhiteSpace();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s6 = peg$c42;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c43); }
                }
                if (s6 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c219(s3, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseVersion() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 64) {
        s1 = peg$c1;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c2); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c220.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c221); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c220.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c221); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c222(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseIndent() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      peg$silentFails++;
      s1 = peg$currPos;
      s2 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s3 = peg$c223;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c224); }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c223;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c224); }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s3 = peg$c225(s2);
        if (s3) {
          s3 = void 0;
        } else {
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      peg$silentFails--;
      if (s1 !== peg$FAILED) {
        peg$currPos = s0;
        s0 = void 0;
      } else {
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSameIndent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s4 = peg$c223;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c224); }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        if (input.charCodeAt(peg$currPos) === 32) {
          s4 = peg$c223;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c224); }
        }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s4 = peg$c226(s3);
        if (s4) {
          s4 = void 0;
        } else {
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 !== peg$FAILED) {
        peg$currPos = s1;
        s1 = void 0;
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c223;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c224); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c223;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c224); }
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseSameOrMoreIndent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$currPos;
      s3 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s4 = peg$c223;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c224); }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        if (input.charCodeAt(peg$currPos) === 32) {
          s4 = peg$c223;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c224); }
        }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = peg$currPos;
        s4 = peg$c227(s3);
        if (s4) {
          s4 = void 0;
        } else {
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      peg$silentFails--;
      if (s2 !== peg$FAILED) {
        peg$currPos = s1;
        s1 = void 0;
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c223;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c224); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (input.charCodeAt(peg$currPos) === 32) {
            s3 = peg$c223;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c224); }
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c13();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsebackquotedString() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 96) {
        s1 = peg$c228;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c229); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c230.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c231); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c230.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c231); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 96) {
            s3 = peg$c228;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c229); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c232(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseid() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c233;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c234); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c235.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c236); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c235.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c236); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c233;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c234); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c237(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseupperIdent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c238.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c239); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c240.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c241); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c240.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c241); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c242(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parselowerIdent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c243.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c244); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c240.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c241); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c240.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c241); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c242(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsewhiteSpace() {
      var s0, s1;

      s0 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s1 = peg$c223;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c224); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (input.charCodeAt(peg$currPos) === 32) {
            s1 = peg$c223;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c224); }
          }
        }
      } else {
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseeolWhiteSpace() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c245.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c246); }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c245.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c246); }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        peg$silentFails++;
        if (input.length > peg$currPos) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c247); }
        }
        peg$silentFails--;
        if (s3 === peg$FAILED) {
          s2 = void 0;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c245.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c246); }
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c245.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c246); }
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseeol();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseeolWhiteSpace();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              s1 = [s1, s2, s3];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsecomment();
        }
      }

      return s0;
    }

    function peg$parseeol() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 13) {
        s1 = peg$c248;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c249); }
      }
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 10) {
          s2 = peg$c250;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c251); }
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 13) {
            s3 = peg$c248;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c249); }
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c245.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c246); }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c245.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c246); }
        }
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 35) {
          s2 = peg$c162;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c163); }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c252) {
            s2 = peg$c252;
            peg$currPos += 2;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c253); }
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c11.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c11.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c12); }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseeolWhiteSpace();
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c254(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }


      var indent = '';
      var startIndent = '';
      var indents = [];
      var deprecatedCommentWarningShown = false;
      function extractIndented(items) {
        return items[1].map(item => item[1]);
      }
      function optional(result, extract, defaultValue) {
        if (result != null) {
          let value = extract(result);
          if (value != null) {
            return value;
          }
        }
        return defaultValue == null ? null : defaultValue;
      }
      function checkNormal(result) {
        if (['string', 'number', 'boolean'].includes(typeof result) || result === null) {
          return;
        }
        if (result === undefined) {
          throw new Error(`result was undefined`);
        }
        if (Array.isArray(result)) {
          for (let item of result) {
            checkNormal(item);
          }
          return;
        }
        if (result.model) {
          throw new Error(`unexpected 'model' in ${JSON.stringify(result)}`);
        }
        if (!result.location) {
          throw new Error(`no 'location' in ${JSON.stringify(result)}`);
        }
        if (!result.kind) {
          throw new Error(`no 'kind' in ${JSON.stringify(result)}`);
        }
        for (let key of Object.keys(result)) {
          if (['location', 'kind'].includes(key)) {
            continue;
          }
          checkNormal(result[key]);
        }
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})());

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

let supportedTypes = ['Text', 'URL', 'Number', 'Boolean'];

class JsonldToManifest {
  static convert(jsonld, theClass) {
    let obj = JSON.parse(jsonld);
    let classes = {};
    let properties = {};

    if (!obj['@graph']) {
      obj['@graph'] = [obj];
    }

    for (let item of obj['@graph']) {
      if (item['@type'] == 'rdf:Property')
        properties[item['@id']] = item;
      else if (item['@type'] == 'rdfs:Class') {
        classes[item['@id']] = item;
        item.subclasses = [];
        item.superclass = null;
      }
    }

    for (let clazz of Object.values(classes)) {
      if (clazz['rdfs:subClassOf'] !== undefined) {
        if (clazz['rdfs:subClassOf'].length == undefined)
          clazz['rdfs:subClassOf'] = [clazz['rdfs:subClassOf']];
        for (let subClass of clazz['rdfs:subClassOf']) {
          let superclass = subClass['@id'];
          if (clazz.superclass == undefined)
            clazz.superclass = [];
          if (classes[superclass]) {
            classes[superclass].subclasses.push(clazz);
            clazz.superclass.push(classes[superclass]);
          } else {
            clazz.superclass.push({'@id': superclass});
          }
        }
      }
    }

    for (let clazz of Object.values(classes)) {
      if (clazz.subclasses.length == 0 && theClass == undefined) {
        theClass = clazz;
      }
    }

    let relevantProperties = [];
    for (let property of Object.values(properties)) {
      let domains = property['schema:domainIncludes'];
      if (!domains)
        domains = {'@id': theClass['@id']};
      if (!domains.length)
        domains = [domains];
      domains = domains.map(a => a['@id']);
      if (domains.includes(theClass['@id'])) {
        let name = property['@id'].split(':')[1];
        let type = property['schema:rangeIncludes'];
        if (!type)
          console.log(property);
        if (!type.length)
          type = [type];

        type = type.map(a => a['@id'].split(':')[1]);
        type = type.filter(type => supportedTypes.includes(type));
        if (type.length > 0)
        relevantProperties.push({name, type});
      }
    }

    let className = theClass['@id'].split(':')[1];
    let superNames = theClass.superclass ? theClass.superclass.map(a => a['@id'].split(':')[1]) : [];

    let s = '';
    for (let superName of superNames)
      s += `import 'https://schema.org/${superName}'\n\n`;

    s += `schema ${className}`;
    if (superNames.length > 0)
      s += ` extends ${superNames.join(', ')}`;

    if (relevantProperties.length > 0) {
      for (let property of relevantProperties) {
        let type;
        if (property.type.length > 1)
          type = '(' + property.type.join(' or ') + ')';
        else
          type = property.type[0];
        s += `\n  ${type} ${property.name}`;
      }
    }
    s += '\n';

    return s;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (JsonldToManifest);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    this.debouncing = false;
    this.ready = new Promise((resolve, reject) => {
      this._makeReady = resolve;
    });
  }

  send(message) {
    this.debouncedMessages.push(message);
    if (!this.debouncing) {
      this.debouncing = true;
      setTimeout(() => {
        this._flush(this.debouncedMessages);
        this.debouncedMessages = [];
        this.debouncing = false;
      }, 100);
    }
  }

  _flush(messages) {
    throw 'Not implemented in an abstract class';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractDevtoolsChannel;



/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__devtools_channel_provider_js__ = __webpack_require__(29);
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
  constructor(arc) {
    this._arcIdString = arc.id.toString();
    this._speculative = arc.isSpeculative;
    this._callbackRegistry = {};
    this._particleRegistry = {};
  }

  InstantiateParticle(particle, {id, spec, handles}) {
    this._particleRegistry[id] = spec;
    __WEBPACK_IMPORTED_MODULE_0__devtools_channel_provider_js__["a" /* default */].get().send({
      messageType: 'InstantiateParticle',
      messageBody: Object.assign(
        this._arcMetadata(),
        this._trimParticleSpec(id, spec, handles)
      )
    });
  }

  SimpleCallback({callback, data}) {
    let callbackDetails = this._callbackRegistry[callback];
    if (callbackDetails) {
      // Copying callback data, as the callback can be used multiple times.
      this._sendDataflowMessage(Object.assign({}, callbackDetails), data);
    }
  }

  onSynchronize({handle, target, callback, modelCallback, type, particleId}) {
    this._callbackRegistry[callback] = this._describeHandleCall(
      {operation: `on-${type}`, handle, particleId});
    this._callbackRegistry[modelCallback] = this._describeHandleCall(
      {operation: 'sync-model', handle, particleId});
  }

  onHandleGet({handle, callback, particleId}) {
    this._callbackRegistry[callback] = this._describeHandleCall(
      {operation: 'get', handle, particleId});
  }

  onHandleToList({handle, callback, particleId}) {
    this._callbackRegistry[callback] = this._describeHandleCall(
      {operation: 'toList', handle, particleId});
  }

  onHandleSet({handle, data, particleId}) {
    this._logHandleCall({operation: 'set', handle, data, particleId});
  }

  onHandleStore({handle, data, particleId}) {
    this._logHandleCall({operation: 'store', handle, data, particleId});
  }

  onHandleClear({handle, particleId}) {
    this._logHandleCall({operation: 'clear', handle, particleId});
  }

  onHandleRemove({handle, data, particleId}) {
    this._logHandleCall({operation: 'remove', handle, data, particleId});
  }

  _logHandleCall(args) {
    this._sendDataflowMessage(this._describeHandleCall(args), args.data);
  }

  _sendDataflowMessage(messageBody, data) {
    messageBody.data = JSON.stringify(data);
    messageBody.timestamp = Date.now();
    __WEBPACK_IMPORTED_MODULE_0__devtools_channel_provider_js__["a" /* default */].get().send({messageType: 'dataflow', messageBody});
  }

  _describeHandleCall({operation, handle, particleId}) {
    return Object.assign(this._arcMetadata(), {
      operation,
      particle: this._describeParticle(particleId),
      handle: this._describeHandle(handle)
    });
  }

  _arcMetadata() {
    return {
      arcId: this._arcIdString,
      speculative: this._speculative
    };
  }

  _trimParticleSpec(id, spec, handles) {
    let connections = {};
    spec.connectionMap.forEach((value, key) => {
      connections[key] = Object.assign({
        direction: value.direction
      }, this._describeHandle(handles.get(key)));
    });
    return {
      id,
      name: spec.name,
      connections,
      implFile: spec.implFile
    };
  }

  _describeParticle(id) {
    let particleSpec = this._particleRegistry[id];
    return {
      id,
      name: particleSpec && particleSpec.name
      // TODO: Send entire spec only once and refer to it by ID in the tool.
    };
  }

  _describeHandle(handle) {
    return {
      id: handle.id,
      storageKey: handle._storageKey,
      name: handle.name,
      description: handle.description,
      type: this._describeHandleType(handle._type)
    };
  }

  // TODO: This is fragile and incomplete. Change this into sending entire
  //       handle object once and refer back to it via its ID in the tool.
  _describeHandleType(handleType) {
    switch (handleType.constructor.name) {
      case 'Type':
        switch (handleType.tag) {
          case 'SetView': return `[${this._describeHandleType(handleType.data)}]`;
          case 'Entity': return this._describeHandleType(handleType.data);
          default: return `${handleType.tag} ${this._describeHandleType(handleType.data)}`;
        }
      case 'Schema':
        return handleType.name;
      case 'Shape':
        return 'Shape';
    }
    return '';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = OuterPortAttachment;



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__devtools_channel_provider_js__ = __webpack_require__(29);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


class StrategyExplorerAdapter {
  static processGenerations(generations) {
    __WEBPACK_IMPORTED_MODULE_0__devtools_channel_provider_js__["a" /* default */].get().send({
      messageType: 'generations',
      // TODO: Implement simple serialization and move the logic in adapt()
      //       into the Strategy Explorer proper.
      messageBody: new StrategyExplorerAdapter().adapt(generations)
    });
  }
  constructor() {
    this.parentMap = new Map();
    this.lastID = 0;
  }
  adapt(generations) {
    return generations.map(pop => this._preparePopulation(pop.generated, pop.record));
  }
  _addExtraPredecessor(parent, hash) {
    let extras = [];
    if (parent && !this.parentMap.has(parent)) {
      this.parentMap.set(parent, this.lastID);
      parent.derivation.forEach(d => extras = extras.concat(this._addExtraPredecessor(d.parent, hash)));
      extras.push({result: parent.result,
                   score: parent.score,
                   derivation: parent.derivation,
                   description: parent.description,
                   hash: hash,
                   valid: parent.valid,
                   active: parent.active,
                   combined: true,
                   id: this.lastID++});
    }
    return extras;
  }
  _preparePopulation(population, record) {
    // Adding those here to reuse recipe resolution computation.
    record.resolvedDerivations = 0;
    record.resolvedDerivationsByStrategy = {};

    let extras = [];
    population = population.map(recipe => {
      let {result, score, derivation, description, hash, valid, active} = recipe;
      recipe.derivation.forEach(d => extras = extras.concat(this._addExtraPredecessor(d.parent, hash)));
      this.parentMap.set(recipe, this.lastID);
      return {result, score, derivation, description, hash, valid, active, id: this.lastID++};
    });
    population = extras.concat(population);

    population.forEach(item => {
      item.derivation = item.derivation.map(derivItem => {
        let parent, strategy;
        if (derivItem.parent)
          parent = this.parentMap.get(derivItem.parent);
        if (derivItem.strategy)
          strategy = derivItem.strategy.constructor.name;
        return {parent, strategy};
      });
      item.resolved = item.result.isResolved();
      if (item.resolved) {
        record.resolvedDerivations++;
        let strategy = item.derivation[0].strategy;
        if (record.resolvedDerivationsByStrategy[strategy] === undefined)
          record.resolvedDerivationsByStrategy[strategy] = 0;
        record.resolvedDerivationsByStrategy[strategy]++;
      }
      let options = {showUnresolved: true, showInvalid: false, details: ''};
      item.result = item.result.toString(options);
    });
    let populationMap = {};
    population.forEach(item => {
      if (populationMap[item.derivation[0].strategy] == undefined)
        populationMap[item.derivation[0].strategy] = [];
      populationMap[item.derivation[0].strategy].push(item);
    });
    let result = {population: [], record};
    Object.keys(populationMap).forEach(strategy => {
      result.population.push({strategy: strategy, recipes: populationMap[strategy]});
    });
    return result;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StrategyExplorerAdapter;



/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__description_js__ = __webpack_require__(11);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */





class DescriptionDomFormatter extends __WEBPACK_IMPORTED_MODULE_1__description_js__["b" /* DescriptionFormatter */] {
  constructor(description) {
    super(description);
    this._nextID = 0;
  }

  _isSelectedDescription(desc) {
    return super._isSelectedDescription(desc) || (!!desc.template && !!desc.model);
  }

  _populateParticleDescription(particle, descriptionByName) {
    let result = super._populateParticleDescription(particle, descriptionByName);

    if (descriptionByName['_template_']) {
      result = Object.assign(result, {
        template: descriptionByName['_template_'],
        model: JSON.parse(descriptionByName['_model_'])
      });
    }

    return result;
  }

  async _combineSelectedDescriptions(selectedDescriptions) {
    let suggestionByParticleDesc = new Map();
    await Promise.all(selectedDescriptions.map(async (particleDesc, index) => {
      if (this.seenParticles.has(particleDesc._particle)) {
        return;
      }

      let {template, model} = this._retrieveTemplateAndModel(particleDesc, index);

      let success = await Promise.all(Object.keys(model).map(async tokenKey => {
        let token = this._initHandleToken(model[tokenKey], particleDesc);
        let tokenValue = await this.tokenToString(token);

        if (tokenValue == undefined) {
          return false;
        } else if (tokenValue && tokenValue.template && tokenValue.model) {
          // Dom token.
          template = template.replace(`{{${tokenKey}}}`, tokenValue.template);
          delete model[tokenKey];
          model = Object.assign(model, tokenValue.model);
        } else { // Text token.
          // Replace tokenKey, in case multiple selected suggestions use the same key.
          let newTokenKey = `${tokenKey}${++this._nextID}`;
          template = template.replace(`{{${tokenKey}}}`, `{{${newTokenKey}}}`);
          delete model[tokenKey];
          model[newTokenKey] = tokenValue;
        }
        return true;
      }));

      if (success.every(s => !!s)) {
        suggestionByParticleDesc.set(particleDesc, {template, model});
      }
    }));

    // Populate suggestions list while maintaining original particles order.
    let suggestions = [];
    selectedDescriptions.forEach(desc => {
      if (suggestionByParticleDesc.has(desc)) {
        suggestions.push(suggestionByParticleDesc.get(desc));
      }
    });

    if (suggestions.length > 0) {
      let result = this._joinDescriptions(suggestions);
      result.template += '.';
      return result;
    }
  }

  _retrieveTemplateAndModel(particleDesc, index) {
    if (particleDesc.template && particleDesc.model) {
      return {template: particleDesc.template, model: particleDesc.model};
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particleDesc.pattern, 'Description must contain template and model, or pattern');
    let template = '';
    let model = {};
    let tokens = this._initTokens(particleDesc.pattern, particleDesc);

    tokens.forEach((token, i) => {
      if (token.text) {
        template = template.concat(`${index == 0 && i == 0 ? token.text[0].toUpperCase() + token.text.slice(1) : token.text}`);
      } else { // handle or slot handle.
        let sanitizedFullName = token.fullName.replace(/[.{}_\$]/g, '');
        let attribute = '';
        // TODO(mmandlis): capitalize the data in the model instead.
        if (i == 0) {
          // Capitalize the first letter in the token.
          template = template.concat(`<style>
            [firstletter]::first-letter { text-transform: capitalize; }
            [firstletter] {display: inline-block}
            </style>`);
          attribute = ' firstletter';
        }
        template = template.concat(`<span${attribute}>{{${sanitizedFullName}}}</span>`);
        model[sanitizedFullName] = token.fullName;
      }
    });

    return {template, model};
  }

  _joinDescriptions(descs) {
    // // If all tokens are strings, just join them.
    if (descs.every(desc => typeof desc === 'string')) {
      return super._joinDescriptions(descs);
    }

    let result = {template: '', model: {}};
    let count = descs.length;
    descs.forEach((desc, i) => {
      if (!desc.template || !desc.model) {
        return;
      }

      result.template += desc.template;
      result.model = Object.assign(result.model, desc.model);
      let delim;
      if (i < count - 2) {
        delim = ', ';
      } else if (i == count - 2) {
        delim = ['', '', ' and ', ', and '][Math.min(3, count)];
      }
      if (delim) {
        result.template += delim;
      }
    });
    return result;
  }

  _joinTokens(tokens) {
    // If all tokens are strings, just join them.
    if (tokens.every(token => typeof token === 'string')) {
      return super._joinTokens(tokens);
    }

    tokens = tokens.map(token => {
      if (typeof token !== 'object') {
        return {
          template: `<span>{{text${++this._nextID}}}</span>`,
          model: {[`text${this._nextID}`]: token}
        };
      }
      return token;
    });

    let nonEmptyTokens = tokens.filter(token => token && !!token.template && !!token.model);
    return {
      template: nonEmptyTokens.map(token => token.template).join(''),
      model: nonEmptyTokens.map(token => token.model).reduce((prev, curr) => Object.assign(prev, curr), {})
    };
  }

  _combineDescriptionAndValue(token, description, handleValue) {
    if (!!description.template && !!description.model) {
      return {
        template: `${description.template} (${handleValue.template})`,
        model: Object.assign(description.model, handleValue.model)
      };
    }
    let descKey = `${token.handleName}Description${++this._nextID}`;
    return {
      template: `<span>{{${descKey}}}</span> (${handleValue.template})`,
      model: Object.assign({[descKey]: description}, handleValue.model)
    };
  }

  _formatEntityProperty(handleName, properties, value) {
    let key = `${handleName}${properties.join('')}Value${++this._nextID}`;
    return {
      template: `<b>{{${key}}}</b>`,
      model: {[`${key}`]: value}
    };
  }

  _formatSetHandle(handleName, handleList) {
    let handleKey = `${handleName}${++this._nextID}`;
    if (handleList[0].rawData.name) {
      if (handleList.length > 2) {
        return {
          template: `<b>{{${handleKey}FirstName}}</b> plus <b>{{${handleKey}OtherCount}}</b> other items`,
          model: {[`${handleKey}FirstName`]: handleList[0].rawData.name, [`${handleKey}OtherCount`]: handleList.length - 1}
        };
      }
      return {
        template: handleList.map((v, i) => `<b>{{${handleKey}${i}}}</b>`).join(', '),
        model: Object.assign(...handleList.map((v, i) => ({[`${handleKey}${i}`]: v.rawData.name} )))
      };
    }
    return {
      template: `<b>{{${handleKey}Length}}</b> items`,
      model: {[`${handleKey}Length`]: handleList.length}
    };
  }
  _formatSingleton(handleName, handleVar) {
    if (handleVar.rawData.name) {
      return {
        template: `<b>{{${handleName}Var}}</b>`,
        model: {[`${handleName}Var`]: handleVar.rawData.name}
      };
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DescriptionDomFormatter;



/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__inner_PEC_js__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_channel_js__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loader_js__ = __webpack_require__(17);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







// TODO: Make this generic so that it can also be used in-browser, or add a
// separate in-process browser pec-factory.
/* harmony default export */ __webpack_exports__["a"] = (function(id) {
  let channel = new __WEBPACK_IMPORTED_MODULE_1__message_channel_js__["a" /* default */]();
  new __WEBPACK_IMPORTED_MODULE_0__inner_PEC_js__["a" /* default */](channel.port1, `${id}:inner`, new __WEBPACK_IMPORTED_MODULE_2__loader_js__["a" /* default */]());
  return channel.port2;
});


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

/* harmony default export */ __webpack_exports__["a"] = (fetch);


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__random_js__ = __webpack_require__(82);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




class Id {
  constructor(currentSession) {
    this._session = currentSession;
    this._currentSession = currentSession;
    this._nextIdComponent = 0;
    this._components = [];
  }
  static newSessionId() {
    let session = Math.floor(__WEBPACK_IMPORTED_MODULE_1__random_js__["a" /* default */].next() * Math.pow(2, 50)) + '';
    return new Id(session);
  }

  fromString(string) {
    let components = string.split(':');

    let id = new Id(this._currentSession);

    if (components[0][0] == '!') {
      id._session = components[0].slice(1);
      id._components = components.slice(1);
    } else {
      id._components = components;
    }

    return id;
  }

  toString() {
    return `!${this._session}:${this._components.join(':')}`;
  }

  // Only use this for testing!
  toStringWithoutSessionForTesting() {
    return this._components.join(':');
  }

  createId(component) {
    if (component == undefined)
      component = '';
    let id = new Id(this._currentSession);
    id._components = this._components.slice();
    id._components.push(component + this._nextIdComponent++);
    return id;
  }

  equal(id) {
    if (id._session !== this._session)
      return false;
    return this.equalWithoutSession(id);
  }

  // Only use this for testing!
  equalWithoutSessionForTesting(id) {
    if (id._components.length !== this._components.length)
      return false;
    for (let i = 0; i < id._components.length; i++)
      if (id._components[i] !== this._components[i])
        return false;

    return true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Id;



/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handle_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_channel_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_spec_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__schema_js__ = __webpack_require__(8);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */









class StorageProxy {
  constructor(id, type, port, pec, name, version) {
    this._id = id;
    this._type = type;
    this._port = port;
    this._pec = pec;
    this.name = name;
    this._version = version;
    this.state = 'outOfDate';
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  generateIDComponents() {
    return this._pec.generateIDComponents();
  }

  on(type, callback, target, particleId) {
    let dataFreeCallback = (d) => callback();
    this.synchronize(type, dataFreeCallback, dataFreeCallback, target, particleId);
  }

  synchronize(type, modelCallback, callback, target, particleId) {
    this._port.Synchronize({handle: this, modelCallback, callback, target, type, particleId});
  }

  get(particleId) {
    return new Promise((resolve, reject) =>
      this._port.HandleGet({callback: r => resolve(r), handle: this, particleId}));
  }

  toList(particleId) {
    return new Promise((resolve, reject) =>
      this._port.HandleToList({callback: r => resolve(r), handle: this, particleId}));
  }

  set(entity, particleId) {
    this._port.HandleSet({data: entity, handle: this, particleId});
  }

  store(entity, particleId) {
    this._port.HandleStore({data: entity, handle: this, particleId});
  }

  remove(entityId, particleId) {
    this._port.HandleRemove({data: entityId, handle: this, particleId});
  }

  clear(particleId) {
    this._port.HandleClear({handle: this, particleId});
  }
}

class InnerPEC {
  constructor(port, idBase, loader) {
    this._apiPort = new __WEBPACK_IMPORTED_MODULE_3__api_channel_js__["b" /* PECInnerPort */](port);
    this._particles = [];
    this._idBase = idBase;
    this._nextLocalID = 0;
    this._loader = loader;
    this._pendingLoads = [];

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
    this._apiPort.onDefineHandle = ({type, identifier, name, version}) => {
      return new StorageProxy(identifier, type, this._apiPort, this, name, version);
    };

    this._apiPort.onCreateHandleCallback = ({type, id, name, callback}) => {
      let proxy = new StorageProxy(id, type, this._apiPort, this, name, 0);
      Promise.resolve().then(() => callback(proxy));
      return proxy;
    };

    this._apiPort.onMapHandleCallback = ({id, callback}) => {
      Promise.resolve().then(() => callback(id));
      return id;
    };

    this._apiPort.onCreateSlotCallback = ({hostedSlotId, callback}) => {
      Promise.resolve().then(() => callback(hostedSlotId));
      return hostedSlotId;
    };

    this._apiPort.onInnerArcRender = ({transformationParticle, transformationSlotName, hostedSlotId, content}) => {
      transformationParticle.renderHostedSlot(transformationSlotName, hostedSlotId, content);
    };

    this._apiPort.onStop = () => {
      if (global.close) {
        global.close();
      }
    };

    this._apiPort.onInstantiateParticle =
      ({id, spec, handles}) => this._instantiateParticle(id, spec, handles);

    this._apiPort.onSimpleCallback = ({callback, data}) => callback(data);

    this._apiPort.onConstructArcCallback = ({callback, arc}) => callback(arc);

    this._apiPort.onAwaitIdle = ({version}) =>
      this.idle.then(a => {
        // TODO: dom-particles update is async, this is a workaround to allow dom-particles to
        // update relevance, after handles are updated. Needs better idle signal.
        setTimeout(() => { this._apiPort.Idle({version, relevance: this.relevance}); }, 0);
      });

    this._apiPort.onUIEvent = ({particle, slotName, event}) => particle.fireEvent(slotName, event);

    this._apiPort.onStartRender = ({particle, slotName, contentTypes}) => {
      /** @class Slot
       * A representation of a consumed slot. Retrieved from a particle using
       * particle.getSlot(name)
       */
      class Slotlet {
        constructor(pec, particle, slotName) {
          this._slotName = slotName;
          this._particle = particle;
          this._handlers = new Map();
          this._pec = pec;
          this._requestedContentTypes = new Set();
        }
        get particle() { return this._particle; }
        get slotName() { return this._slotName; }
        get isRendered() { return this._isRendered; }
        /** @method render(content)
         * renders content to the slot.
         */
        render(content) {
          this._pec._apiPort.Render({particle, slotName, content});

          Object.keys(content).forEach(key => { this._requestedContentTypes.delete(key); });
          // Slot is considered rendered, if a non-empty content was sent and all requested content types were fullfilled.
          this._isRendered = this._requestedContentTypes.size == 0 && (Object.keys(content).length > 0);
        }
        /** @method registerEventHandler(name, f)
         * registers a callback to be invoked when 'name' event happens.
         */
        registerEventHandler(name, f) {
          if (!this._handlers.has(name)) {
            this._handlers.set(name, []);
          }
          this._handlers.get(name).push(f);
        }
        clearEventHandlers(name) {
          this._handlers.set(name, []);
        }
        fireEvent(event) {
          for (let handler of this._handlers.get(event.handler) || []) {
            handler(event);
          }
        }
      }

      particle._slotByName.set(slotName, new Slotlet(this, particle, slotName));
      particle.renderSlot(slotName, contentTypes);
    };

    this._apiPort.onStopRender = ({particle, slotName}) => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(particle._slotByName.has(slotName),
        `Stop render called for particle ${particle.name} slot ${slotName} without start render being called.`);
      particle._slotByName.delete(slotName);
    };
  }

  generateIDComponents() {
    return {base: this._idBase, component: () => this._nextLocalID++};
  }

  generateID() {
    return `${this._idBase}:${this._nextLocalID++}`;
  }

  innerArcHandle(arcId, particleId) {
    let pec = this;
    return {
      createHandle: function(type, name) {
        return new Promise((resolve, reject) =>
          pec._apiPort.ArcCreateHandle({arc: arcId, type, name, callback: proxy => {
            let v = __WEBPACK_IMPORTED_MODULE_1__handle_js__["a" /* default */].handleFor(proxy, proxy.type.isSetView, particleId);
            v.entityClass = (proxy.type.isSetView ? proxy.type.primitiveType().entitySchema : proxy.type.entitySchema).entityClass();
            resolve(v);
          }}));
      },
      mapHandle: function(handle) {
        return new Promise((resolve, reject) =>
          pec._apiPort.ArcMapHandle({arc: arcId, handle, callback: id => {
            resolve(id);
          }}));
      },
      createSlot: function(transformationParticle, transformationSlotName, hostedParticleName, hostedSlotName) {
        return new Promise((resolve, reject) =>
          pec._apiPort.ArcCreateSlot({arc: arcId, transformationParticle, transformationSlotName, hostedParticleName, hostedSlotName, callback: hostedSlotId => {
            resolve(hostedSlotId);
          }}));
      },
      loadRecipe: function(recipe) {
        // TODO: do we want to return a promise on completion?
        return new Promise((resolve, reject) =>
          pec._apiPort.ArcLoadRecipe({arc: arcId, recipe, callback: a => {
            if (a == undefined)
              resolve();
            else
              reject(a);
          }}));
      }
    };
  }

  defaultCapabilitySet() {
    return {
      constructInnerArc: particle => {
        return new Promise((resolve, reject) =>
          this._apiPort.ConstructInnerArc({callback: arcId => {resolve(this.innerArcHandle(arcId, particle.id));}, particle}));
      }
    };
  }

  async _instantiateParticle(id, spec, proxies) {
    let name = spec.name;
    let resolve = null;
    let p = new Promise((res, rej) => resolve = res);
    this._pendingLoads.push(p);
    let clazz = await this._loader.loadParticleClass(spec);
    let capabilities = this.defaultCapabilitySet();
    let particle = new clazz(); // TODO: how can i add an argument to DomParticle ctor?
    particle.id = id;
    particle.capabilities = capabilities;
    this._particles.push(particle);

    let handleMap = new Map();
    proxies.forEach((value, key) => {
      handleMap.set(key, __WEBPACK_IMPORTED_MODULE_1__handle_js__["a" /* default */].handleFor(value, value.type.isSetView, id, spec.connectionMap.get(key).isInput, spec.connectionMap.get(key).isOutput));
    });

    for (let localHandle of handleMap.values()) {
      let type = localHandle.underlyingProxy().type;
      let schemaModel;
      if (type.isSetView && type.primitiveType().isEntity) {
        schemaModel = type.primitiveType().entitySchema;
      } else if (type.isEntity) {
        schemaModel = type.entitySchema;
      }

      if (schemaModel)
        localHandle.entityClass = schemaModel.entityClass();
    }

    return [particle, async () => {
      resolve();
      let idx = this._pendingLoads.indexOf(p);
      this._pendingLoads.splice(idx, 1);
      await particle.setViews(handleMap);
    }];
  }

  get relevance() {
    let rMap = new Map();
    this._particles.forEach(p => {
      if (p.relevances.length == 0)
        return;
      rMap.set(p, p.relevances);
      p.relevances = [];
    });
    return rMap;
  }

  get busy() {
    if (this._pendingLoads.length > 0)
      return true;
    for (let particle of this._particles) {
      if (particle.busy) {
        return true;
      }
    }
    return false;
  }

  get idle() {
    if (!this.busy) {
      return Promise.resolve();
    }
    return Promise.all(this._pendingLoads.concat(this._particles.map(particle => particle.idle))).then(() => this.idle);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (InnerPEC);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(26)))

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


class ManifestMeta {
  constructor() {
    this.storageKey = null;
    this.name = null;
  }
  apply(items) {
    items.forEach(item => { this[item.key] = item.value; });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ManifestMeta;


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


class MessagePort {
  constructor(channel, id, other) {
    this._channel = channel;
    this._id = id;
    this._other = other;
    this._onmessage = undefined;
  }

  postMessage(message) {
    this._channel._post(this._other, message);
  }

  set onmessage(f) {
    this._onmessage = f;
  }

  close() {
    this.postMessage = function() {};
  }
}

class MessageEvent {
  constructor(message) {
    this.data = message;
  }
}

class MessageChannel {
  constructor() {
    this.port1 = new MessagePort(this, 0, 1);
    this.port2 = new MessagePort(this, 1, 0);
    this._ports = [this.port1, this.port2];
  }

  async _post(id, message) {
    message = JSON.parse(JSON.stringify(message));
    if (this._ports[id]._onmessage) {
      try {
        // Yield so that we deliver the message asynchronously.
        await 0;
        await this._ports[id]._onmessage(new MessageEvent(message));
      } catch (e) {
        console.error('Exception in particle code\n', e);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MessageChannel);


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__particle_execution_context_js__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_channel_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manifest_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loader_js__ = __webpack_require__(17);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







// TODO: fix


class OuterPEC extends __WEBPACK_IMPORTED_MODULE_0__particle_execution_context_js__["a" /* default */] {
  constructor(port, slotComposer, arc) {
    super();
    this._particles = [];
    this._apiPort = new __WEBPACK_IMPORTED_MODULE_2__api_channel_js__["a" /* PECOuterPort */](port);
    this._arc = arc;
    this._nextIdentifier = 0;
    this.slotComposer = slotComposer;

    this._apiPort.onRender = ({particle, slotName, content}) => {
      if (this.slotComposer) {
        this.slotComposer.renderSlot(particle, slotName, content);
      }
    };

    this._apiPort.onSynchronize = async ({handle, target, callback, modelCallback, type}) => {
      let model;
      if (handle.toList == undefined) {
        model = await handle.get();
      } else {
        model = await handle.toList();
      }
      this._apiPort.SimpleCallback({callback: modelCallback, data: model}, target);
      handle.on(type, data => this._apiPort.SimpleCallback({callback, data}), target);
    };

    this._apiPort.onHandleGet = async ({handle, callback}) => {
      this._apiPort.SimpleCallback({callback, data: await handle.get()});
    };

    this._apiPort.onHandleToList = async ({handle, callback}) => {
      this._apiPort.SimpleCallback({callback, data: await handle.toList()});
    };

    this._apiPort.onHandleSet = ({handle, data}) => {handle.set(data);};
    this._apiPort.onHandleStore = ({handle, data}) => handle.store(data);
    this._apiPort.onHandleClear = ({handle}) => handle.clear();
    this._apiPort.onHandleRemove = ({handle, data}) => handle.remove(data);

    this._apiPort.onIdle = ({version, relevance}) => {
      if (version == this._idleVersion) {
        this._idlePromise = undefined;
        this._idleResolve(relevance);
      }
    };

    this._apiPort.onConstructInnerArc = ({callback, particle}) => {
      let arc = {particle};
      this._apiPort.ConstructArcCallback({callback, arc});
    };

    this._apiPort.onArcCreateHandle = async ({callback, arc, type, name}) => {
      let handle = await this._arc.createHandle(type, name);
      this._apiPort.CreateHandleCallback(handle, {type, name, callback, id: handle.id});
    };

    this._apiPort.onArcMapHandle = async ({callback, arc, handle}) => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* default */])(this._arc.findHandleById(handle.id), `Cannot map nonexistent handle ${handle.id}`);
      // TODO: create hosted handles map with specially generated ids instead of returning the real ones?
      this._apiPort.MapHandleCallback({}, {callback, id: handle.id});
    };

    this._apiPort.onArcCreateSlot = ({callback, arc, transformationParticle, transformationSlotName, hostedParticleName, hostedSlotName}) => {
      let hostedSlotId;
      if (this.slotComposer) {
        hostedSlotId = this.slotComposer.createHostedSlot(transformationParticle, transformationSlotName, hostedParticleName, hostedSlotName);
      }
      this._apiPort.CreateSlotCallback({}, {callback, hostedSlotId});
    };

    this._apiPort.onArcLoadRecipe = async ({arc, recipe, callback}) => {
      let manifest = await __WEBPACK_IMPORTED_MODULE_3__manifest_js__["a" /* default */].parse(recipe, {loader: this._arc._loader, fileName: ''});
      let error = undefined;
      let recipe0 = manifest.recipes[0];
      if (recipe0) {
        const missingHandles = [];
        for (let handle of recipe0.handles) {
          const fromHandle = this._arc.findHandleById(handle.id);
          if (!fromHandle) {
            missingHandles.push(handle);
            continue;
          }
          handle.mapToStorage(fromHandle);
        }
        if (missingHandles.length > 0) {
          error = `Recipe couldn't load due to missing handles [recipe=${recipe0}, missingHandles=${missingHandles.join('\n')}].`;
        } else {
          let options = {errors: new Map()};
          if (recipe0.normalize(options)) {
            if (recipe0.isResolved()) {
              this._arc.instantiate(recipe0, arc);
            } else {
              error = `Recipe is not resolvable ${recipe0.toString({showUnresolved: true})}`;
            }
          } else {
            error = `Recipe ${recipe0} could not be normalized:\n${[...options.errors.values()].join('\n')}`;
          }
        }
      } else {
        error = 'No recipe defined';
      }
      this._apiPort.SimpleCallback({callback, data: error});
    };
  }

  stop() {
    this._apiPort.Stop();
  }

  get idle() {
    if (this._idlePromise == undefined) {
      this._idlePromise = new Promise((resolve, reject) => {
        this._idleResolve = resolve;
      });
    }
    this._idleVersion = this._nextIdentifier;
    this._apiPort.AwaitIdle({version: this._nextIdentifier++});
    return this._idlePromise;
  }

  get messageCount() {
    return this._apiPort.messageCount;
  }

  sendEvent(particle, slotName, event) {
    this._apiPort.UIEvent({particle, slotName, event});
  }

  instantiate(particleSpec, id, spec, handles, lastSeenVersion) {
    handles.forEach(handle => {
      let version = lastSeenVersion.get(handle.id) || 0;
      this._apiPort.DefineHandle(handle, {type: handle.type.resolvedType(), name: handle.name,
                                       version});
    });

    // TODO: Can we just always define the particle and map a handle for use in later
    //       calls to InstantiateParticle?
    if (spec._model._isInline) {
      this._apiPort.DefineParticle({
        particleDefinition: spec._model._inlineDefinition,
        particleFunction: spec._model._inlineUpdateFunction
      });
    }

    // TODO: rename this concept to something like instantiatedParticle, handle or registration.
    this._apiPort.InstantiateParticle(particleSpec, {id, spec, handles});
    return particleSpec;
  }
  startRender({particle, slotName, contentTypes}) {
    this._apiPort.StartRender({particle, slotName, contentTypes});
  }
  stopRender({particle, slotName}) {
    this._apiPort.StopRender({particle, slotName});
  }
  innerArcRender(transformationParticle, transformationSlotName, hostedSlotId, content) {
    this._apiPort.InnerArcRender({transformationParticle, transformationSlotName, hostedSlotId, content});
  }
  initDebug() {
    this._apiPort.initDebug(this._arc);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (OuterPEC);


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


class ParticleExecutionContext {
  constructor() {
  }

  // Instantiates `particle` in this context, connecting `views` to the particle's inputs and outputs.
  // `mutateCallback` will be called each time the particle mutates a view or entity.
  // Returns an identifier to refer to the particle (in `dispatch`).
  instantiate(particle, views, mutateCallback) {
    // views => {name => viewId}
    throw 'unimplemented';
  }

  // Dispatches an event to the particle identified by `particleId` for the view or entity identified
  // by `entityId` concerning `eventDetails. The `morePending` flag indicates whether there are any
  // known further events to be dispatched to the same particle.
  dispatch(particleId, entityId, eventDetails, morePending) {
    throw 'unimplemented';
  }

  // Returns a promise which resolves when the PEC becomes idle (no known input processing).
  get idle() {
    throw 'unimplemented';
  }

  // Returns a promise which resolves to a map from particle identifier to a list of the relevance
  // entries generated by that particle.
  get relevance() {
    throw 'unimplemented';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ParticleExecutionContext);


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

let random = Math.random;

const seededRandom = (() => {
  let x = 0;
  return () => (x = Math.pow(x + Math.E, Math.PI) % 1);
})();

class Random {
  static next() {
    return random();
  }

  static seedForTests() {
    random = seededRandom;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Random;



/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt



class ConnectionConstraint {
  constructor(from, fromConnection, to, toConnection) {
    this.fromParticle = from;
    this.fromConnection = fromConnection;
    this.toParticle = to;
    this.toConnection = toConnection;
    Object.freeze(this);
  }

  _copyInto(recipe) {
    return recipe.newConnectionConstraint(this.fromParticle, this.fromConnection, this.toParticle, this.toConnection);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].compareStrings(this.fromParticle.name, other.fromParticle.name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].compareStrings(this.fromConnection, other.fromConnection)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].compareStrings(this.toParticle.name, other.toParticle.name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* default */].compareStrings(this.toConnection, other.toConnection)) != 0) return cmp;
    return 0;
  }

  toString() {
    return `${this.fromParticle.name}.${this.fromConnection} -> ${this.toParticle.name}.${this.toConnection}`;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ConnectionConstraint);


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

/* harmony default export */ __webpack_exports__["a"] = (async function(str) {
  let buffer = new TextEncoder('utf-8').encode(str);
  let digest = await crypto.subtle.digest('SHA-1', buffer);
  return Array.from(new Uint8Array(digest)).map(x => ('00' + x.toString(16)).slice(-2)).join('');
});


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_checker_js__ = __webpack_require__(10);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





class HandleConnection {
  constructor(name, particle) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particle);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particle.recipe);
    this._recipe = particle.recipe;
    this._name = name;
    this._tags = [];
    this._type = undefined;
    this._rawType = undefined;
    this._direction = undefined;
    this._particle = particle;
    this._handle = undefined;
  }

  _clone(particle, cloneMap) {
    if (cloneMap.has(this)) {
      return cloneMap.get(this);
    }
    let handleConnection = new HandleConnection(this._name, particle);
    handleConnection._tags = [...this._tags];
    handleConnection._type = this._type;
    handleConnection._rawType = this._rawType;
    handleConnection._direction = this._direction;
    if (this._handle != undefined) {
      handleConnection._handle = cloneMap.get(this._handle);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(handleConnection._handle !== undefined);
      handleConnection._handle.connections.push(handleConnection);
    }
    cloneMap.set(this, handleConnection);
    return handleConnection;
  }

  _normalize() {
    this._tags.sort();
    // TODO: type?
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables(this._particle, other._particle)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this._name, other._name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareArrays(this._tags, other._tags, __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables(this._handle, other._handle)) != 0) return cmp;
    // TODO: add type comparison
    // if ((cmp = util.compareStrings(this._type, other._type)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this._direction, other._direction)) != 0) return cmp;
    return 0;
  }

  get recipe() { return this._recipe; }
  get name() { return this._name; } // Parameter name?
  get tags() { return this._tags; }
  get type() {
    if (this._type)
      return this._type;
    return this._rawType;
  }
  get rawType() {
    return this._rawType;
  }
  get direction() { return this._direction; } // in/out
  get isInput() {
    return this.direction == 'in' || this.direction == 'inout';
  }
  get isOutput() {
    return this.direction == 'out' || this.direction == 'inout';
  }
  get handle() { return this._handle; } // Handle?
  get particle() { return this._particle; } // never null

  set tags(tags) { this._tags = tags; }
  set type(type) {
    this._rawType = type;
    this._type = undefined;
    this._resetHandleType();
  }

  set direction(direction) {
    this._direction = direction;
    this._resetHandleType();
  }

  get spec() {
    if (this.particle.spec == null)
      return null;
    return this.particle.spec.connectionMap.get(this.name);
  }

  get isOptional() {
    if (this.spec == null)
      return false;
    return this.spec.isOptional;
  }

  _isValid(options) {
    if (this.direction && !['in', 'out', 'inout', 'host'].includes(this.direction)) {
      if (options && options.errors) {
        options.errors.set(this, `Invalid direction '${this.direction}' for handle connection '${this.particle.name}::${this.name}'`);
      }
      return false;
    }
    if (this.type && this.particle && this.particle.spec) {
      let connectionSpec = this.particle.spec.connectionMap.get(this.name);
      if (connectionSpec) {
        if (!connectionSpec.isCompatibleType(this.rawType)) {
          if (options && options.errors) {
            options.errors.set(this, `Type '${this.rawType} for handle connection '${this.particle.name}::${this.name}' doesn't match particle spec's type '${connectionSpec.type}'`);
          }
          return false;
        }
        if (this.direction != connectionSpec.direction) {
          if (options && options.errors) {
            options.errors.set(this, `Direction '${this.direction}' for handle connection '${this.particle.name}::${this.name}' doesn't match particle spec's direction '${connectionSpec.direction}'`);
          }
          return false;
        }
      }
    }
    return true;
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));

    if (this.isOptional) {
      return true;
    }

    // TODO: This should use this._type, or possibly not consider type at all.
    if (!this.type) {
      if (options) {
        options.details = 'missing type';
      }
      return false;
    }
    if (!this._direction) {
      if (options) {
        options.details = 'missing direction';
      }
      return false;
    }
    if (!this.handle) {
      if (options) {
        options.details = 'missing handle';
      }
      return false;
    }
    return true;
  }

  _resetHandleType() {
    if (this._handle)
      this._handle._type = undefined;
  }

  connectToHandle(handle) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(handle.recipe == this.recipe);
    this._handle = handle;
    this._resetHandleType();
    this._handle.connections.push(this);
  }

  toString(nameMap, options) {
    let result = [];
    result.push(this.name || '*');
    // TODO: better deal with unspecified direction.
    result.push({'in': '<-', 'out': '->', 'inout': '=', 'host': '='}[this.direction] || this.direction || '=');
    if (this.handle) {
      result.push(`${(nameMap && nameMap.get(this.handle)) || this.handle.localName}`);
    }
    result.push(...this.tags);

    if (options && options.showUnresolved) {
      if (!this.isResolved(options)) {
        result.push(`// unresolved handle-connection: ${options.details}`);
      }
    }

    return result.join(' ');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HandleConnection);


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slot_connection_js__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__handle_connection_js__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class Particle {
  constructor(recipe, name) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipe);
    this._recipe = recipe;
    this._id = undefined;
    this._name = name;
    this._localName = undefined;
    this._spec = undefined;
    this._tags = [];
    this._verbs = [];

    this._connections = {};
    // TODO: replace with constraint connections on the recipe
    this._unnamedConnections = [];
    this._consumedSlotConnections = {}; // map of consumed Slot connections by slot name.
  }

  _copyInto(recipe, cloneMap) {
    let particle = recipe.newParticle(this._name);
    particle._id = this._id;
    particle._tags = [...this._tags];
    particle._verbs = [...this._verbs];
    particle._spec = this._spec;

    Object.keys(this._connections).forEach(key => {
      particle._connections[key] = this._connections[key]._clone(particle, cloneMap);
    });
    particle._unnamedConnections = this._unnamedConnections.map(connection => connection._clone(particle, cloneMap));
    Object.keys(this._consumedSlotConnections).forEach(key => {
      particle._consumedSlotConnections[key] = this._consumedSlotConnections[key]._clone(particle, cloneMap);
    });

    return particle;
  }

  _startNormalize() {
    this._localName = null;
    this._tags.sort();
    this._verbs.sort();
    let normalizedConnections = {};
    for (let key of (Object.keys(this._connections).sort())) {
      normalizedConnections[key] = this._connections[key];
    }
    this._connections = normalizedConnections;

    let normalizedSlotConnections = {};
    for (let key of (Object.keys(this._consumedSlotConnections).sort())) {
      normalizedSlotConnections[key] = this._consumedSlotConnections[key];
    }
    this._consumedSlotConnections = normalizedSlotConnections;
  }

  _finishNormalize() {
    this._unnamedConnections.sort(__WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareComparables);
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings(this._id, other._id)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings(this._name, other._name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings(this._localName, other._localName)) != 0) return cmp;
    // TODO: spec?
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareArrays(this._tags, other._tags, __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareArrays(this._verbs, other._verbs, __WEBPACK_IMPORTED_MODULE_3__util_js__["a" /* default */].compareStrings)) != 0) return cmp;
    // TODO: slots
    return 0;
  }

  _isValid(options) {
    if (!this.spec) {
      return true;
    }
    if (!this.name && !this.primaryVerb) {
      // Must have either name of a verb
      if (options && options.errors) {
        options.errors.set(this, `Particle has no name and no verb`);
      }
      return false;
    }
    // TODO: What
    return true;
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));
    // TODO: slots
    if (this.consumedSlotConnections.length > 0) {
      let fulfilledSlotConnections = this.consumedSlotConnections.filter(connection => connection.targetSlot !== undefined);
      if (fulfilledSlotConnections.length == 0) {
        if (options && options.showUnresolved) {
          options.details = 'unfullfilled slot connections';
        }
        return false;
      }
    }
    if (!this.spec) {
      if (options && options.showUnresolved) {
        options.details = 'missing spec';
      }
      return false;
    }
    if (this.spec.connectionMap.size != Object.keys(this._connections).length) {
      if (options && options.showUnresolved) {
        options.details = 'unresolved connections';
      }
      return false;
    }
    if (this.unnamedConnections.length != 0) {
      if (options && options.showUnresolved) {
        options.details = `${this.unnamedConnections.length} unnamed connections`;
      }
      return false;
    }
    return true;
  }

  get recipe() { return this._recipe; }
  get localName() { return this._localName; }
  set localName(name) { this._localName = name; }
  get id() { return this._id; } // Not resolved until we have an ID.
  get name() { return this._name; }
  set name(name) { this._name = name; }
  get spec() { return this._spec; }
  get tags() { return this._tags; }
  set tags(tags) { this._tags = tags; }
  get connections() { return this._connections; } // {parameter -> HandleConnection}
  get unnamedConnections() { return this._unnamedConnections; } // HandleConnection*
  get consumedSlotConnections() { return this._consumedSlotConnections; }
  get primaryVerb() { if (this._verbs.length > 0) return this._verbs[0]; }
  set verbs(verbs) { this._verbs = verbs; }

  set spec(spec) {
    this._spec = spec;
    for (let connectionName of spec.connectionMap.keys()) {
      let speccedConnection = spec.connectionMap.get(connectionName);
      let connection = this.connections[connectionName];
      if (connection == undefined) {
        connection = this.addConnectionName(connectionName);
      }
      // TODO: don't just overwrite here, check that the types
      // are compatible if one already exists.
      connection.type = speccedConnection.type;
      connection.direction = speccedConnection.direction;
    }
    spec.slots.forEach(slotSpec => {
      if (this._consumedSlotConnections[slotSpec.name] == undefined)
        this.addSlotConnection(slotSpec.name);
      this._consumedSlotConnections[slotSpec.name].slotSpec = slotSpec;
    });
  }

  addUnnamedConnection() {
    let connection = new __WEBPACK_IMPORTED_MODULE_2__handle_connection_js__["a" /* default */](undefined, this);
    this._unnamedConnections.push(connection);
    return connection;
  }

  addConnectionName(name) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._connections[name] == undefined);
    this._connections[name] = new __WEBPACK_IMPORTED_MODULE_2__handle_connection_js__["a" /* default */](name, this);
    return this._connections[name];
  }

  allConnections() {
    return Object.values(this._connections).concat(this._unnamedConnections);
  }

  ensureConnectionName(name) {
    return this._connections[name] || this.addConnectionName(name);
  }

  getConnectionByName(name) {
    return this._connections[name];
  }

  nameConnection(connection, name) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this._connections[name].handle, `Connection "${name}" already has a handle`);

    let idx = this._unnamedConnections.indexOf(connection);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(idx >= 0, `Cannot name '${name}' nonexistent unnamed connection.`);
    connection._name = name;

    connection.type = this._connections[name].type;
    if (connection.direction != this._connections[name].direction) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(connection.direction == 'inout',
             `Unnamed connection cannot adjust direction ${connection.direction} to ${name}'s direction ${this._connections[name].direction}`);
      connection.direction = this._connections[name].direction;
    }

    this._connections[name] = connection;
    this._unnamedConnections.splice(idx, 1);
  }

  addSlotConnection(name) {
    let slotConn = new __WEBPACK_IMPORTED_MODULE_1__slot_connection_js__["a" /* default */](name, this);
    this._consumedSlotConnections[name] = slotConn;
    return slotConn;
  }

  removeSlotConnection(slotConnection) {
    this._consumedSlotConnections[slotConnection._name] = null;
    slotConnection.disconnectFromSlot();
  }

  remove() {
    this.recipe.removeParticle(this);
  }

  toString(nameMap, options) {
    let result = [];
    // TODO: we need at least name or tags
    if (this.name) {
      result.push(this.name);
      result.push(...this.tags);

      result.push(`as ${(nameMap && nameMap.get(this)) || this.localName}`);
      if (this.primaryVerb && this.primaryVerb != this.name) {
        result.push(`// verb=${this.primaryVerb}`);
      }
    } else { // verb must exist, if there is no name.
      result.push(`particle can ${this.primaryVerb}`);
    }
    if (options && options.showUnresolved) {
      if (!this.isResolved(options)) {
        result.push(`// unresolved particle: ${options.details}`);
      }
    }

    result = [result.join(' ')];

    for (let connection of this.unnamedConnections) {
      result.push(connection.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    for (let connection of Object.values(this.connections)) {
      result.push(connection.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    for (let slotConnection of Object.values(this._consumedSlotConnections)) {
      result.push(slotConnection.toString(nameMap, options).replace(/^|(\n)/g, '$1  '));
    }
    return result.join('\n');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Particle);


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class SlotConnection {
  constructor(name, particle) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particle);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(particle.recipe);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(name);

    this._recipe = particle.recipe;
    this._particle = particle;
    this._name = name;
    this._slotSpec = undefined; // isRequired + formFactor
    this._targetSlot = undefined; // Slot?
    this._providedSlots = {}; // Slot*
    this._tags = [];
  }

  remove() {
    this._particle.removeSlotConnection(this);
  }

  get recipe() { return this._recipe; }
  get particle() { return this._particle; }
  get name() { return this._name; }
  get slotSpec() { return this._slotSpec; }
  get targetSlot() { return this._targetSlot; }
  get providedSlots() { return this._providedSlots; }
  get tags() { return this._tags; }
  set tags(tags) { this._tags = tags; }

  set slotSpec(slotSpec) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.name == slotSpec.name);
    this._slotSpec = slotSpec;
    slotSpec.providedSlots.forEach(providedSlot => {
      let slot = this.providedSlots[providedSlot.name];
      if (slot == undefined) {
        slot = this.recipe.newSlot(providedSlot.name);
        slot._sourceConnection = this;
        slot._name = providedSlot.name;
        this.providedSlots[providedSlot.name] = slot;
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot.handleConnections.length == 0, 'Handle connections must be empty');
      providedSlot.handles.forEach(handle => slot.handleConnections.push(this.particle.connections[handle]));
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(slot._name == providedSlot.name);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!slot.formFactor);
      slot.formFactor = providedSlot.formFactor;
    });
  }

  connectToSlot(targetSlot) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(targetSlot);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(!this.targetSlot);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.recipe == targetSlot.recipe, 'Cannot connect to slot from different recipe');

    this._targetSlot = targetSlot;
    targetSlot.consumeConnections.push(this);
  }

  disconnectFromSlot() {
    if (this._targetSlot) {
      this._targetSlot.removeConsumeConnection(this);
      this._targetSlot = undefined;
    }
  }
  
  _clone(particle, cloneMap) {
    if (cloneMap.has(this)) {
      return cloneMap.get(this);
    }

    let slotConnection = particle.addSlotConnection(this.name);
    slotConnection.tags = this.tags;
    if (this.slotSpec) {
      slotConnection._slotSpec = particle.spec.getSlotSpec(this.name);
    }

    cloneMap.set(this, slotConnection);
    return slotConnection;
  }

  _normalize() {
    let normalizedSlots = {};
    for (let key of (Object.keys(this._providedSlots).sort())) {
      normalizedSlots[key] = this._providedSlots[key];
    }
    this._providedSlots = normalizedSlots;
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.name, other.name)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables(this._targetSlot, other._targetSlot)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables(this._particle, other._particle)) != 0) return cmp;
    return 0;
  }

  _isValid(options) {
    if (this._targetSlot && this._targetSlot.sourceConnection &&
        this._targetSlot != this._targetSlot.sourceConnection.providedSlots[this._targetSlot.name]) {
      if (options && options.errors) {
        options.errors.set(this, `Invalid target slot '${this._targetSlot.name}' for slot connection '${this.name}' of particle ${this.particle.name}`);
      }
      return false;
    }

    // TODO: add more checks.
    return true;
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));

    if (!this.name) {
      if (options) {
        options.details = 'missing name';
      }
      return false;
    }
    if (!this.particle) {
      if (options) {
        options.details = 'missing particle';
      }
      return false;
    }
    if (!this.targetSlot) {
      if (options) {
        options.details = 'missing target-slot';
      }
      return false;
    }
    return true;
  }

  isConnectedToInternalSlot() {
    return this.targetSlot && (!!this.targetSlot.sourceConnection);
  }
  isConnectedToRemoteSlot() {
    return this.targetSlot && (!!this.targetSlot.id);
  }
  isConnected() {
    return this.isConnectedToInternalSlot() || this.isConnectedToRemoteSlot();
  }

  toString(nameMap, options) {
    let consumeRes = [];
    consumeRes.push('consume');
    consumeRes.push(`${this.name}`);
    if (this.targetSlot)
      consumeRes.push(`as ${(nameMap && nameMap.get(this.targetSlot)) || this.targetSlot.localName}`);

    if (options && options.showUnresolved) {
      if (!this.isResolved(options)) {
        consumeRes.push(`// unresolved slot-connection: ${options.details}`);
      }
    }

    let result = [];
    result.push(consumeRes.join(' '));

    Object.keys(this.providedSlots).forEach(psName => {
      let providedSlot = this.providedSlots[psName];
      let provideRes = [];
      provideRes.push('  provide');
      
      // Only assert that there's a spec for this provided slot if there's a spec for
      // the consumed slot .. otherwise this is just a constraint.
      if (this.slotSpec) {
        let providedSlotSpec = this.slotSpec.getProvidedSlotSpec(psName);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(providedSlotSpec, `Cannot find providedSlotSpec for ${psName}`);
      }
      provideRes.push(`${psName} as ${(nameMap && nameMap.get(providedSlot)) || providedSlot}`);
      result.push(provideRes.join(' '));
    });
    return result.join('\n');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SlotConnection);


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(5);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




class Slot {
  constructor(recipe, name) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(recipe);

    this._recipe = recipe;
    this._id = undefined; // The ID of the slot in the context
    this._localName = undefined; // Local id within the recipe
    this._name = name;
    this._tags = [];

    this._formFactor = undefined;
    this._handleConnections = []; // HandleConnection* (can only be set if source connection is set and particle in slot connections is set)
    this._sourceConnection = undefined; // SlotConnection
    this._consumerConnections = []; // SlotConnection*
  }

  get recipe() { return this._recipe; }
  get id() { return this._id; }
  set id(id) { this._id = id; }
  get localName() { return this._localName; }
  set localName(localName) { this._localName = localName; }
  get name() { return this._name; }
  set name(name) { this._name = name; }
  get tags() { return this._tags; }
  set tags(tags) { this._tags = tags; }
  get formFactor() { return this._formFactor; }
  set formFactor(formFactor) { this._formFactor = formFactor; }
  get handleConnections() { return this._handleConnections; }
  get sourceConnection() { return this._sourceConnection; }
  set sourceConnection(sourceConnection) { this._sourceConnection = sourceConnection; }
  get consumeConnections() { return this._consumerConnections; }
  getProvidedSlotSpec() {
    // TODO: should this return something that indicates this isn't available yet instead of 
    // the constructed {isSet: false, tags: []}?
    return (this.sourceConnection && this.sourceConnection.slotSpec) ? this.sourceConnection.slotSpec.getProvidedSlotSpec(this.name) : {isSet: false, tags: []};
  }

  _copyInto(recipe, cloneMap) {
    let slot = undefined;
    if (!this.sourceConnection && this.id)
      slot = recipe.findSlot(this.id);
    if (slot == undefined) {
      slot = recipe.newSlot(this.name);
      slot._id = this.id;
      slot._formFactor = this.formFactor;
      slot._localName = this._localName;
      slot._tags = [...this._tags];
      // the connections are re-established when Particles clone their attached SlotConnection objects.
      slot._sourceConnection = cloneMap.get(this._sourceConnection);
      if (slot.sourceConnection)
        slot.sourceConnection._providedSlots[slot.name] = slot;
      this._handleConnections.forEach(connection => slot._handleConnections.push(cloneMap.get(connection)));
    }
    this._consumerConnections.forEach(connection => cloneMap.get(connection).connectToSlot(slot));
    return slot;
  }

  _startNormalize() {
    this.localName = null;
    this._tags.sort();
  }

  _finishNormalize() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this._source));
    this._consumerConnections.forEach(cc => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(cc)));
    this._consumerConnections.sort(__WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareComparables);
    Object.freeze(this);
  }

  _compareTo(other) {
    let cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.id, other.id)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.localName, other.localName)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings(this.formFactor, other.formFactor)) != 0) return cmp;
    if ((cmp = __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareArrays(this._tags, other._tags, __WEBPACK_IMPORTED_MODULE_1__util_js__["a" /* default */].compareStrings)) != 0) return cmp;
    return 0;
  }

  removeConsumeConnection(slotConnection) {
    let idx = this._consumerConnections.indexOf(slotConnection);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(idx > -1);
    this._consumerConnections.splice(idx, 1);
    if (this._consumerConnections.length == 0)
      this.remove();
  }

  remove() {
    this._recipe.removeSlot(this);
  }

  isResolved(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(Object.isFrozen(this));

    if (options && options.showUnresolved) {
      options.details = [];
      if (!this._sourceConnection) {
        options.details.push('missing source-connection');
      }
      if (!this.id) {
        options.details.push('missing id');
      }
      options.details = options.details.join('; ');
    }

    return this._sourceConnection || this.id;
  }

  _isValid(options) {
    // TODO: implement
    return true;
  }

  toString(nameMap, options) {
    let result = [];
    result.push('slot');
    if (this.id) {
      result.push(`'${this.id}'`);
    }
    if (this.tags.length > 0) {
      result.push(this.tags.join(' '));
    }
    result.push(`as ${(nameMap && nameMap.get(this)) || this.localName}`);
    let includeUnresolved = options && options.showUnresolved && !this.isResolved(options);
    if (includeUnresolved) {
      result.push(`// unresolved slot: ${options.details}`);
    }

    if (this.id || includeUnresolved) {
      return result.join(' ');
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Slot);


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt





/**
 * Walkers traverse an object, calling methods based on the
 * features encountered on that object. For example, a RecipeWalker
 * takes a list of recipes and calls methods when:
 *  - a new recipe is encountered
 *  - a handle is found inside a recipe
 *  - a particle is found inside a recipe
 *  - etc..
 * 
 * Each of these methods can return a list of updates:
 *   [(recipe, encountered_thing) => new_recipe]
 *
 * The walker then does something with the updates depending on the
 * tactic selected.
 * 
 * If the tactic is "Permuted", then an output will be generated
 * for every combination of 1 element drawn from each update list.
 * For example, if 3 methods return [a,b], [c,d,e], and [f] respectively
 * then "Permuted" will cause 6 outputs to be generated: [acf, adf, aef, bcf, bdf, bef]
 * 
 * If the tactic is "Independent", an output will be generated for each
 * update, regardless of the list the update is in. For example,
 * if 3 methods return [a,b], [c,d,e], and [f] respectively,
 * then "Independent" will cause 6 outputs to be generated: [a,b,c,d,e,f]
 */
class WalkerBase extends __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["a" /* Strategizer */].Walker {
  constructor(tactic) {
    super();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(tactic);
    this.tactic = tactic;
  }

  _runUpdateList(recipe, updateList) {
    let newRecipes = [];
    if (updateList.length) {
      switch (this.tactic) {
        case WalkerBase.Permuted: {
          let permutations = [[]];
          updateList.forEach(({continuation, context}) => {
            let newResults = [];
            if (typeof continuation == 'function')
              continuation = [continuation];
            continuation.forEach(f => {
              permutations.forEach(p => {
                let newP = p.slice();
                newP.push({f, context});
                newResults.push(newP);
              });
            });
            permutations = newResults;
          });

          for (let permutation of permutations) {
            let cloneMap = new Map();
            let newRecipe = recipe.clone(cloneMap);
            let score = 0;
            permutation = permutation.filter(p => p.f !== null);
            if (permutation.length == 0)
              continue;
            permutation.forEach(({f, context}) => {
              score += f(newRecipe, cloneMap.get(context));
            });

            newRecipes.push({recipe: newRecipe, score});
          }
          break;
        }
        case WalkerBase.Independent:
          updateList.forEach(({continuation, context}) => {
            if (typeof continuation == 'function')
              continuation = [continuation];
            continuation.forEach(f => {
              if (f == null)
                f = () => 0;
              let cloneMap = new Map();
              let newRecipe = recipe.clone(cloneMap);
              let score = f(newRecipe, cloneMap.get(context));
              newRecipes.push({recipe: newRecipe, score});
            });
          });
          break;
        default:
          throw `${this.tactic} not supported`;
      }
    }

    // commit phase - output results.

    for (let newRecipe of newRecipes) {
      let result = this.createDescendant(newRecipe.recipe, newRecipe.score);
    }
  }

  createDescendant(recipe, score) {
    let valid = recipe.normalize();
    //if (!valid) debugger;
    let hash = valid ? recipe.digest() : null;
    super.createDescendant(recipe, score, hash, valid);
  }

  isEmptyResult(result) {
    if (!result)
      return true;

    if (result.constructor == Array && result.length <= 0)
      return true;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(typeof result == 'function' || result.length);

    return false;
  }
}

WalkerBase.Permuted = 'permuted';
WalkerBase.Independent = 'independent';

/* harmony default export */ __webpack_exports__["a"] = (WalkerBase);


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


class Relevance {
  constructor() {
    this.relevanceMap = new Map();
  }

  apply(relevance) {
    for (let key of relevance.keys()) {
      if (this.relevanceMap.has(key))
        this.relevanceMap.set(key, this.relevanceMap.get(key).concat(relevance.get(key)));
      else
        this.relevanceMap.set(key, relevance.get(key));
    }
  }

  calcRelevanceScore() {
    let relevance = 1;
    let hasNegative = false;
    for (let rList of this.relevanceMap.values()) {
      let particleRelevance = Relevance.particleRelevance(rList);
      if (particleRelevance < 0) {
        hasNegative = true;
      }
      relevance *= Math.abs(particleRelevance);
    }
    return relevance * (hasNegative ? -1 : 1);
  }

  // Returns false, if at least one of the particles relevance lists ends with a negative score.
  isRelevant(plan) {
    let hasUi = plan.particles.some(p => Object.keys(p.consumedSlotConnections).length > 0);
    let rendersUi = false;
    this.relevanceMap.forEach((rList, particle) => {
      if (rList[rList.length - 1] < 0) {
        return false;
      } else if (Object.keys(particle.consumedSlotConnections).length) {
        rendersUi = true;
      }
    });
    // If the recipe has UI rendering particles, at least one of the particles must render UI.
    return hasUi == rendersUi;
  }

  static scaleRelevance(relevance) {
    if (relevance == undefined) {
      relevance = 5;
    }
    relevance = Math.max(-1, Math.min(relevance, 10));
    // TODO: might want to make this geometric or something instead;
    return relevance / 5;
  }

  static particleRelevance(relevanceList) {
    let relevance = 1;
    let hasNegative = false;
    relevanceList.forEach(r => {
      let scaledRelevance = Relevance.scaleRelevance(r);
      if (scaledRelevance < 0) {
        hasNegative = true;
      }
      relevance *= Math.abs(scaledRelevance);
    });
    return relevance * (hasNegative ? -1 : 1);
  }

  calcParticleRelevance(particle) {
    if (this.relevanceMap.has(particle)) {
      return Relevance.particleRelevance(this.relevanceMap.get(particle));
    }
    return -1;
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Relevance);


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__relevance_js__ = __webpack_require__(90);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






class Speculator {

  async speculate(arc, plan) {
    let trace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: 'speculator', name: 'Speculator::speculate'});
    let newArc = await arc.cloneForSpeculativeExecution();
    let relevance = new __WEBPACK_IMPORTED_MODULE_2__relevance_js__["a" /* default */]();
    async function awaitCompletion() {
      await newArc.scheduler.idle;
      let messageCount = newArc.pec.messageCount;
      relevance.apply(await newArc.pec.idle);

      if (newArc.pec.messageCount !== messageCount + 1)
        return awaitCompletion();
      else {
        relevance.newArc = newArc;
        return relevance;
      }
    }

    let result = newArc.instantiate(plan).then(a => awaitCompletion());
    trace.end();
    return result;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Speculator);


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__storage_provider_base_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_firebase_web_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__key_base_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__platform_btoa_web_js__ = __webpack_require__(63);
// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt







class FirebaseKey extends __WEBPACK_IMPORTED_MODULE_3__key_base_js__["a" /* default */] {
  constructor(key) {
    super();
    let parts = key.split('://');
    this.protocol = parts[0];
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(this.protocol == 'firebase');
    if (parts[1]) {
      parts = parts[1].split('/');
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(parts[0].endsWith('.firebaseio.com'));
      this.databaseUrl = parts[0];
      this.projectId = this.databaseUrl.split('.')[0];
      this.apiKey = parts[1];
      this.location = parts.slice(2).join('/');
    } else {
      this.databaseUrl = undefined;
      this.projectId = undefined;
      this.apiKey = undefined;
      this.location = '';
    }
  }

  childKeyForHandle(id) {
    let location = '';
    if (this.location != undefined && this.location.length > 0)
      location = this.location + '/';
    location += `handles/${id}`;
    return new FirebaseKey(`${this.protocol}://${this.databaseUrl}/${this.apiKey}/${location}`);
  }

  toString() {
    if (this.databaseUrl && this.apiKey)
      return `${this.protocol}://${this.databaseUrl}/${this.apiKey}/${this.location}`;
    return `${this.protocol}://`;
  }
}

async function realTransaction(reference, transactionFunction) {
  let realData = undefined;
  await reference.once('value', data => {realData = data.val(); });
  return reference.transaction(data => {
    if (data == null)
      data = realData;
    let result = transactionFunction(data);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(result);
    return result;
  }, undefined, false);
}

let _nextAppNameSuffix = 0;

class FirebaseStorage {
  constructor(arcId) {
    this._arcId = arcId;
    this._apps = {};
  }

  async construct(id, type, keyFragment) {
    return this._join(id, type, keyFragment, false);
  }

  async connect(id, type, key) {
    return this._join(id, type, key, true);
  }

  parseStringAsKey(string) {
    return new FirebaseKey(string);
  }

  async _join(id, type, key, shouldExist) {
    key = new FirebaseKey(key);
    // TODO: is it ever going to be possible to autoconstruct new firebase datastores?
    if (key.databaseUrl == undefined || key.apiKey == undefined)
      throw new Error('Can\'t complete partial firebase keys');

    if (this._apps[key.projectId] == undefined) {
      for (let app of __WEBPACK_IMPORTED_MODULE_1__platform_firebase_web_js__["a" /* default */].apps) {
        if (app.options.databaseURL == key.databaseURL) {
          this._apps[key.projectId] = app;
          break;
        }
      }
    }

    if (this._apps[key.projectId] == undefined) {
      this._apps[key.projectId] = __WEBPACK_IMPORTED_MODULE_1__platform_firebase_web_js__["a" /* default */].initializeApp({
        apiKey: key.apiKey,
        databaseURL: key.databaseUrl
      }, `app${_nextAppNameSuffix++}`);
    }

    let reference = __WEBPACK_IMPORTED_MODULE_1__platform_firebase_web_js__["a" /* default */].database(this._apps[key.projectId]).ref(key.location);

    let result = await realTransaction(reference, data => {
      if ((data == null) == shouldExist)
        return; // abort transaction
      if (!shouldExist) {
        return {version: 0};
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* default */])(data);     
      return data;
    });


    if (!result.committed)
      return null;

    return FirebaseStorageProvider.newProvider(type, this._arcId, id, reference, key);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FirebaseStorage;


class FirebaseStorageProvider extends __WEBPACK_IMPORTED_MODULE_0__storage_provider_base_js__["a" /* default */] {
  constructor(type, arcId, id, reference, key) {
    super(type, arcId, undefined, id, key.toString());
    this.firebaseKey = key;
    this.reference = reference;
  }

  static newProvider(type, arcId, id, reference, key) {
    if (type.isSetView)
      return new FirebaseCollection(type, arcId, id, reference, key);
    return new FirebaseVariable(type, arcId, id, reference, key);
  }

  static encodeKey(key) {
    key = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__platform_btoa_web_js__["a" /* default */])(key);
    return key.replace(/\//g, '*');
  }
  static decodeKey(key) {
    key = key.replace(/\*/g, '/');
    return atob(key);
  }
}

class FirebaseVariable extends FirebaseStorageProvider {
  constructor(type, arcId, id, reference, firebaseKey) {
    super(type, arcId, id, reference, firebaseKey);
    this.dataSnapshot = undefined;
    this._pendingGets = [];
    this._version = 0;
    this.reference.on('value', dataSnapshot => {
      this.dataSnapshot = dataSnapshot;
      let data = dataSnapshot.val();
      this._pendingGets.forEach(_get => _get(data));
      this._pendingGets = [];
      this._version = data.version;
      this._fire('change', {data: data.data, version: data.version});
    });
  }

  async cloneFrom(store) {
    let {data, version} = await store._getWithVersion();
    await this._setWithVersion(data, version);
  }

  async get() {
    return this.dataSnapshot.val().data;
  }

  async _getWithVersion() {
    if (this.dataSnapshot == undefined) {
      return new Promise((resolve, reject) => {
        this._pendingGets.push(resolve);
      });
    }
    return this.dataSnapshot.val();
  }

  async _setWithVersion(data, version) {
    await realTransaction(this.reference, _ => ({data, version}));
  }

  async set(value) {
    return realTransaction(this.reference, data => {
      if (JSON.stringify(data.data) == JSON.stringify(value))
        return data;
      return {data: value, version: data.version + 1};
    });
  }

  async clear() {
    return this.set(null);
  }
}

class FirebaseCollection extends FirebaseStorageProvider {
  constructor(type, arcId, id, reference, firebaseKey) {
    super(type, arcId, id, reference, firebaseKey);
    this.dataSnapshot = undefined;
    this._pendingGets = [];
    this.reference.on('value', dataSnapshot => {
      this.dataSnapshot = dataSnapshot;
      let data = dataSnapshot.val();
      this._pendingGets.forEach(_get => _get(data));
      this._pendingGets = [];
      this._fire('change', {data: this._setToList(data.data), version: data.version});
    });
  }

  async get(id) {
    let set = this.dataSnapshot.val().data;
    let encId = FirebaseStorageProvider.encodeKey(id);
    if (set)
      return set[encId];
    return undefined;
  }

  async remove(id) {
    return realTransaction(this.reference, data => {
      if (!data.data)
        data.data = {};
      let encId = FirebaseStorageProvider.encodeKey(id);
      data.data[encId] = null;
      data.version += 1;
      return data;
    });
  }

  async store(entity) {
    return realTransaction(this.reference, data => {
      if (!data.data)
        data.data = {};
      let encId = FirebaseStorageProvider.encodeKey(entity.id);
      if (data.data[encId] && JSON.stringify(data.data[encId]) == JSON.stringify(entity))
        return data;
      data.data[encId] = entity;
      data.version += 1;
      return data;
    });
  }

  async cloneFrom(store) {
    let {list, version} = await store._toListWithVersion();
    await this._fromListWithVersion(list, version);
  }

  async _fromListWithVersion(list, version) {
    return realTransaction(this.reference, data => {
      if (!data.data)
        data.data = {};
      list.forEach(item => {
        let encId = FirebaseStorageProvider.encodeKey(item.id);
        data.data[encId] = item;
      });
      data.version = version;
      return data;
    });
  }

  async toList() {
    if (this.dataSnapshot == undefined) {
      return new Promise((resolve, reject) => {
        this._pendingGets.push(resolve);
      }).then(data => this._setToList(data.data));
    }
    return this._setToList(this.dataSnapshot.val().data);
  }

  async _toListWithVersion() {
    if (this.dataSnapshot == undefined) {
      return new Promise((resolve, reject) => {
        this._pendingGets.push(resolve);
      }).then(data => ({list: this._setToList(data.data), version: data.version}));
    }
    let data = this.dataSnapshot.val();
    return {list: this._setToList(data.data), version: data.version};
  }

  _setToList(set) {
    let list = [];
    if (set) {
      for (let key in set) {
        list.push(set[key]);
      }
    }
    return list;
  }
}


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_util_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storage_provider_base_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__key_base_js__ = __webpack_require__(37);
// @
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt








class InMemoryKey extends __WEBPACK_IMPORTED_MODULE_4__key_base_js__["a" /* default */] {
  constructor(key) {
    super();
    let parts = key.split('://');
    this.protocol = parts[0];
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.protocol == 'in-memory');
    parts = parts[1] ? parts.slice(1).join('://').split('^^') : [];
    this.arcId = parts[0];
    this.location = parts[1];
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this.toString() == key);
  }

  childKeyForHandle(id) {
    return new InMemoryKey('in-memory://');
  }

  toString() {
    if (this.location !== undefined && this.arcId !== undefined)
      return `${this.protocol}://${this.arcId}^^${this.location}`;
    if (this.arcId !== undefined)
      return `${this.protocol}://${this.arcId}`;
    return `${this.protocol}`;
  }
}

let __storageCache = {};

class InMemoryStorage {
  constructor(arcId) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(arcId !== undefined, 'Arcs with storage must have ids');
      this._arcId = arcId;
      this._memoryMap = {};
      this.localIDBase = 0;
      // TODO(shans): re-add this assert once we have a runtime object to put it on.
      // assert(__storageCache[this._arc.id] == undefined, `${this._arc.id} already exists in local storage cache`);
      __storageCache[this._arcId] = this;
  }

  async construct(id, type, keyFragment) {
    let key = new InMemoryKey(keyFragment);
    if (key.arcId == undefined)
      key.arcId = this._arcId;
    if (key.location == undefined)
      key.location = 'in-memory-' + this.localIDBase++;
    let provider = InMemoryStorageProvider.newProvider(type, this._arcId, undefined, id, key.toString());
    if (this._memoryMap[key.toString()] !== undefined)
      return null;
    this._memoryMap[key.toString()] = provider;
    return provider;
  }

  async connect(id, type, keyString) {
    let key = new InMemoryKey(keyString);
    if (key.arcId !== this._arcId.toString()) {
      if (__storageCache[key.arcId] == undefined)
        return null;
      return __storageCache[key.arcId].connect(id, type, keyString);
    }
    if (this._memoryMap[keyString] == undefined)
      return null;
    // TODO assert types match?
    return this._memoryMap[keyString];
  }

  parseStringAsKey(string) {
    return new InMemoryKey(string);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InMemoryStorage;


class InMemoryStorageProvider extends __WEBPACK_IMPORTED_MODULE_3__storage_provider_base_js__["a" /* default */] {
  static newProvider(type, arcId, name, id, key) {
    if (type.isSetView)
      return new InMemoryCollection(type, arcId, name, id, key);
    return new InMemoryVariable(type, arcId, name, id, key);
  }
}

class InMemoryCollection extends InMemoryStorageProvider {
  constructor(type, arcId, name, id, key) {
    super(type, arcId, name, id, key);
    this._items = new Map();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._version !== null);
  }

  clone() {
    let view = new InMemoryCollection(this._type, this._arcId, this.name, this.id);
    view.cloneFrom(this);
    return view;
  }

  async cloneFrom(handle) {
    let {list, version} = await handle._toListWithVersion();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(version !== null);
    await this._fromListWithVersion(list, version);
  }

  async _fromListWithVersion(list, version) {
    this._version = version;
    list.forEach(item => this._items.set(item.id, item));
  }

  async get(id) {
    return this._items.get(id);
  }
  traceInfo() {
    return {items: this._items.size};
  }
  // HACK: replace this with some kind of iterator thing?
  async toList() {
    return [...this._items.values()];
  }

  async _toListWithVersion() {
    return {list: [...this._items.values()], version: this._version};
  }

  async store(entity) {
    let trace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: 'view', name: 'InMemoryCollection::store', args: {name: this.name}});
    let entityWasPresent = this._items.has(entity.id);
    if (entityWasPresent && (JSON.stringify(this._items.get(entity.id)) == JSON.stringify(entity))) {
      trace.end({args: {entity}});    
      return;
    }
    this._items.set(entity.id, entity);
    this._version++;
    if (!entityWasPresent)
      this._fire('change', {add: [entity], version: this._version});
    trace.end({args: {entity}});
  }

  async remove(id) {
    let trace = __WEBPACK_IMPORTED_MODULE_1__tracelib_trace_js__["a" /* default */].start({cat: 'view', name: 'InMemoryCollection::remove', args: {name: this.name}});
    if (!this._items.has(id)) {
      return;
    }
    let entity = this._items.get(id);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._items.delete(id));
    this._version++;
    this._fire('change', {remove: [entity], version: this._version});
    trace.end({args: {entity}});
  }

  // TODO: Something about iterators??
  // TODO: Something about changing order?

  serializedData() {
    return this.toList();
  }
}

class InMemoryVariable extends InMemoryStorageProvider {
  constructor(type, arcId, name, id, key) {
    super(type, arcId, name, id, key);
    this._stored = null;
  }

  clone() {
    let variable = new InMemoryVariable(this._type, this._arcId, this.name, this.id);
    variable.cloneFrom(this);
    return variable;
  }

  async cloneFrom(handle) {
    let {data, version} = await handle._getWithVersion();
    await this._setWithVersion(data, version);
  }

  async _setWithVersion(data, version) {
    this._stored = data;
    this._version = version;
  }

  traceInfo() {
    return {stored: this._stored !== null};
  }

  async get() {
    return this._stored;
  }

  async _getWithVersion() {
    return {data: this._stored, version: this._version};
  }

  async set(entity) {
    if (JSON.stringify(this._stored) == JSON.stringify(entity))
      return;
    this._stored = entity;
    this._version++;
    this._fire('change', {data: this._stored, version: this._version});
  }

  async clear() {
    this.set(undefined);
  }

  serializedData() {
    return [this._stored];
  }
}


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__recipe_walker_js__ = __webpack_require__(3);
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class CombinedStrategy extends __WEBPACK_IMPORTED_MODULE_1__strategizer_strategizer_js__["c" /* Strategy */] {
  constructor(strategies) {
    super();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(strategies.length > 1, 'Strategies must contain at least 2 elements.');
    this._strategies = strategies;
    this._strategies.forEach(strategy => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(strategy.walker));
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* default */])(this._strategies[0].getResults);
  }
  _getLeaves(results) {
    // Only use leaf recipes.
    let recipeByParent = new Map();
    let resultsList = [...results.values()];
    resultsList.forEach(r => {
      r.derivation.forEach(d => {
        if (d.parent) {
          recipeByParent.set(d.parent, r);
        }
      });
    });
    return resultsList.filter(r => !recipeByParent.has(r));
  }
  async generate(inputParams) {
    let results = this._strategies[0].getResults(inputParams);
    let totalResults = new Map();
    for (let strategy of this._strategies) {
      results = __WEBPACK_IMPORTED_MODULE_2__recipe_recipe_js__["a" /* default */].over(results, strategy.walker, strategy);
      results = await Promise.all(results.map(async result => {
        if (result.hash) {
          result.hash = await result.hash;
        }
        if (!totalResults.has(result.hash)) {
          // TODO: deduping of results is already done in strategizer.
          // It should dedup the intermeditate derivations as well.
          totalResults.set(result.hash, result);
        }
        return result;
      }));
      results = this._getLeaves(totalResults);
    }

    return results;
  }
}
/* unused harmony export default */



/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__convert_constraints_to_connections_js__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assign_remote_views_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__copy_remote_views_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assign_views_by_tag_and_type_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__init_population_js__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__map_slots_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__match_particle_by_verb_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__match_recipe_by_verb_js__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__name_unnamed_connections_js__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__add_use_views_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__create_description_handle_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__init_search_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__search_tokens_to_particles_js__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__fallback_fate_js__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__group_handle_connections_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__combined_strategy_js__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__match_free_handles_to_connections_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__create_views_js__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__resolve_recipe_js__ = __webpack_require__(55);
// Copyright (c) 2018 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






















const Empty = new __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["b" /* Ruleset */].Builder().build();
/* harmony export (immutable) */ __webpack_exports__["a"] = Empty;


const ExperimentalPhased = new __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["b" /* Ruleset */].Builder().order(
  [
    __WEBPACK_IMPORTED_MODULE_5__init_population_js__["a" /* default */],
    __WEBPACK_IMPORTED_MODULE_12__init_search_js__["a" /* default */]
  ],
  __WEBPACK_IMPORTED_MODULE_13__search_tokens_to_particles_js__["a" /* default */],
  [
    __WEBPACK_IMPORTED_MODULE_8__match_recipe_by_verb_js__["a" /* default */],
    __WEBPACK_IMPORTED_MODULE_7__match_particle_by_verb_js__["a" /* default */]
  ],
  __WEBPACK_IMPORTED_MODULE_1__convert_constraints_to_connections_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_15__group_handle_connections_js__["a" /* default */],
  [
    __WEBPACK_IMPORTED_MODULE_18__create_views_js__["a" /* default */],
    __WEBPACK_IMPORTED_MODULE_10__add_use_views_js__["a" /* default */],
    __WEBPACK_IMPORTED_MODULE_2__assign_remote_views_js__["a" /* default */],
    __WEBPACK_IMPORTED_MODULE_3__copy_remote_views_js__["a" /* default */],
    __WEBPACK_IMPORTED_MODULE_4__assign_views_by_tag_and_type_js__["a" /* default */],
    __WEBPACK_IMPORTED_MODULE_17__match_free_handles_to_connections_js__["a" /* default */],
    __WEBPACK_IMPORTED_MODULE_14__fallback_fate_js__["a" /* default */],
  ],
  __WEBPACK_IMPORTED_MODULE_6__map_slots_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_11__create_description_handle_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_19__resolve_recipe_js__["a" /* default */]
).build();
/* unused harmony export ExperimentalPhased */


const ExperimentalLinear = new __WEBPACK_IMPORTED_MODULE_0__strategizer_strategizer_js__["b" /* Ruleset */].Builder().order(
  __WEBPACK_IMPORTED_MODULE_5__init_population_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_12__init_search_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_13__search_tokens_to_particles_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_8__match_recipe_by_verb_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_7__match_particle_by_verb_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__convert_constraints_to_connections_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_15__group_handle_connections_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_17__match_free_handles_to_connections_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_18__create_views_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_10__add_use_views_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_14__fallback_fate_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_2__assign_remote_views_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_3__copy_remote_views_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_4__assign_views_by_tag_and_type_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_6__map_slots_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_11__create_description_handle_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_19__resolve_recipe_js__["a" /* default */]
).build();
/* unused harmony export ExperimentalLinear */



/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(4);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




class TupleFields {
  constructor(fieldList) {
    this.fieldList = fieldList;
  }

  static fromLiteral(literal) {
    return new TupleFields(literal.map(a => __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* default */].fromLiteral(a)));
  }

  toLiteral() {
    return this.fieldList.map(a => a.toLiteral());
  }

  clone() {
    return new TupleFields(this.fieldList.map(a => a.clone()));
  }

  equals(other) {
    if (this.fieldList.length !== other.fieldList.length)
      return false;
    for (let i = 0; i < this.fieldList.length; i++) {
      if (!this.fieldList[i].equals(other.fieldList[i]))
        return false;
    }
    return true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TupleFields;


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Base => class extends Base {
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
  // TODO(sjmiles): deprecated
  _setIfDirty(object) {
    return this._setState(object);
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
});


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// HTMLImports compatibility stuff, delete soonish
if (typeof document !== 'undefined' && !('currentImport' in document)) {
  Object.defineProperty(document, 'currentImport', {
    get() {
      const script = this.currentScript;
      let doc = script.ownerDocument || this;
      // this code for CEv1 compatible HTMLImports polyfill (aka modern)
      if (window['HTMLImports']) {
        doc = window.HTMLImports.importForElement(script);
        doc.URL = script.parentElement.href;
      }
      return doc;
    }
  });
}

/* Annotator */
// tree walker that generates arbitrary data using visitor function `cb`
// `cb` is called as `cb(node, key, notes)`
// where
//   `node` is a visited node.
//   `key` is a handle which identifies the node in a map generated by `Annotator.locateNodes`.
class Annotator {
  constructor(cb) {
    this.cb = cb;
  }
  // For subtree at `node`, produce annotation object `notes`.
  // the content of `notes` is completely determined by the behavior of the
  // annotator callback function supplied at the constructor.
  annotate(node, notes, opts) {
    this.notes = notes;
    this.opts = opts || 0;
    this.key = this.opts.key || 0;
    notes.locator = this._annotateSubtree(node);
    return notes;
  }
  // walking subtree at `node`
  _annotateSubtree(node) {
    let childLocators;
    for (let i = 0, child = node.firstChild, previous = null, neo; child; i++) {
      // returns a locator only if a node in the subtree requires one
      let childLocator = this._annotateNode(child);
      // only when necessary, maintain a sparse array of locators
      if (childLocator) {
        (childLocators = childLocators || {})[i] = childLocator;
      }
      // `child` may have been evacipated by visitor
      neo = previous ? previous.nextSibling : node.firstChild;
      if (neo === child) {
        previous = child;
        child = child.nextSibling;
      } else {
        child = neo;
        i--;
      }
    }
    // is falsey unless there was at least one childLocator
    return childLocators;
  }
  _annotateNode(node) {
    // visit node
    let key = this.key++;
    let shouldLocate = this.cb(node, key, this.notes, this.opts);
    // recurse
    let locators = this._annotateSubtree(node);
    if (shouldLocate || locators) {
      let cl = Object.create(null);
      cl.key = key;
      if (locators) {
        cl.sub = locators;
      }
      return cl;
    }
  }
}

const locateNodes = function(root, locator, map) {
  map = map || [];
  for (let n in locator) {
    const loc = locator[n];
    if (loc) {
      const node = root.childNodes[n];
      // TODO(sjmiles): text-nodes sometimes evacipate when stamped, so map to the parentElement instead
      map[loc.key] = (node.nodeType === Node.TEXT_NODE) ? node.parentElement : node;
      if (loc.sub) {
        // recurse
        locateNodes(node, loc.sub, map);
      }
    }
  }
  return map;
};

/* Annotation Producer */
// must return `true` for any node whose key we wish to track
const annotatorImpl = function(node, key, notes, opts) {
  // hook
  if (opts.annotator && opts.annotator(node, key, notes, opts)) {
    return true;
  }
  // default
  switch (node.nodeType) {
    case Node.DOCUMENT_FRAGMENT_NODE:
      return;
    case Node.ELEMENT_NODE:
      return annotateElementNode(node, key, notes);
    case Node.TEXT_NODE:
      return annotateTextNode(node, key, notes);
  }
};

const annotateTextNode = function(node, key, notes) {
  if (annotateMustache(node, key, notes, 'textContent', node.textContent)) {
    node.textContent = '';
    return true;
  }
};

const annotateElementNode = function(node, key, notes) {
  if (node.hasAttributes()) {
    let noted = false;
    for (let a$ = node.attributes, i = a$.length - 1, a; i >= 0 && (a = a$[i]); i--) {
      if (
        annotateEvent(node, key, notes, a.name, a.value) ||
        annotateMustache(node, key, notes, a.name, a.value)
      ) {
        node.removeAttribute(a.name);
        noted = true;
      }
    }
    return noted;
  }
};

const annotateMustache = function(node, key, notes, property, mustache) {
  if (mustache.slice(0, 2) === '{{') {
    if (property === 'class') {
      property = 'className';
    }
    let value = mustache.slice(2, -2);
    let override = value.split(':');
    if (override.length === 2) {
      property = override[0];
      value = override[1];
    }
    takeNote(notes, key, 'mustaches', property, value);
    if (value[0] === '$') {
      takeNote(notes, 'xlate', value, true);
    }
    return true;
  }
};

const annotateEvent = function(node, key, notes, name, value) {
  if (name.slice(0, 3) === 'on-') {
    if (value.slice(0, 2) === '{{') {
      value = value.slice(2, -2);
      console.warn(
        `Xen: event handler for '${name}' expressed as a mustache, which is not supported. Using literal value '${value}' instead.`
      );
    }
    takeNote(notes, key, 'events', name.slice(3), value);
    return true;
  }
};

const takeNote = function(notes, key, group, name, note) {
  let n$ = notes[key] || (notes[key] = Object.create(null));
  (n$[group] || (n$[group] = {}))[name] = note;
};

const annotator = new Annotator(annotatorImpl);

const annotate = function(root, key, opts) {
  return (root._notes ||
    (root._notes = annotator.annotate(root.content, {/*ids:{}*/}, key, opts))
  );
};

/* Annotation Consumer */
const mapEvents = function(notes, map, mapper) {
  // add event listeners
  for (let key in notes) {
    let node = map[key];
    let events = notes[key] && notes[key].events;
    if (node && events) {
      for (let name in events) {
        mapper(node, name, events[name]);
      }
    }
  }
};

const listen = function(controller, node, eventName, handlerName) {
  node.addEventListener(eventName, function(e) {
    if (controller[handlerName]) {
      return controller[handlerName](e, e.detail);
    }
  });
};

const set = function(notes, map, scope, controller) {
  if (scope) {
    for (let key in notes) {
      let node = map[key];
      if (node) {
        // everybody gets a scope
        node.scope = scope;
        // now get your regularly scheduled bindings
        let mustaches = notes[key].mustaches;
        for (let name in mustaches) {
          let property = mustaches[name];
          if (property in scope) {
            _set(node, name, scope[property], controller);
          }
        }
      }
    }
  }
};

const _set = function(node, property, value, controller) {
  // TODO(sjmiles): the property conditionals here could be precompiled
  let modifier = property.slice(-1);
  if (property === 'style%' || property === 'style') {
    if (typeof value === 'string') {
      node.style.cssText = value;
    } else {
      Object.assign(node.style, value);
    }
  } else if (modifier == '$') {
    let n = property.slice(0, -1);
    if (typeof value === 'boolean') {
      setBoolAttribute(node, n, value);
    } else {
      node.setAttribute(n, value);
    }
  } else if (property === 'textContent') {
    if (value && (value.$template || value.template)) {
      _setSubTemplate(node, value, controller);
    } else {
      node.textContent = (value || '');
    }
  } else if (property === 'unsafe-html') {
    node.innerHTML = value || '';
  } else if (property === 'value') {
    // TODO(sjmiles): specifically dirty-check `value` to avoid resetting input elements
    if (node.value !== value) {
      node.value = value;
    }
  } else {
    node[property] = value;
  }
};

const setBoolAttribute = function(node, attr, state) {
  node[
    (state === undefined ? !node.hasAttribute(attr) : state)
      ? 'setAttribute'
      : 'removeAttribute'
  ](attr, '');
};

const _setSubTemplate = function(node, value, controller) {
  // TODO(sjmiles): sub-template iteration ability
  // specially implemented to support arcs (serialization boundary)
  // Aim to re-implement as a plugin.
  let template = value.template;
  if (!template) {
    let container = node.getRootNode();
    template = container.querySelector(`template[${value.$template}]`);
  } else {
    template = maybeStringToTemplate(template);
  }
  // TODO(sjmiles): reuse nodes instead of punting them
  node.textContent = '';
  if (template && value.models) {
    for (let m of value.models) {
      stamp(template).events(controller).set(m).appendTo(node);
    }
  }
};

const stamp = function(template, opts) {
  template = maybeStringToTemplate(template);
  // construct (or use memoized) notes
  let notes = annotate(template, opts);
  // CRITICAL TIMING ISSUE #1:
  // importNode can have side-effects, like CustomElement callbacks (before we
  // can do any work on the imported subtree, before we can mapEvents, e.g.).
  // we could clone into an inert document (say a new template) and process the nodes
  // before importing if necessary.
  let root = document.importNode(template.content, true);
  // map DOM to keys
  let map = locateNodes(root, notes.locator);
  // return dom manager
  let dom = {
    root,
    notes,
    map,
    $(slctr) {
      return this.root.querySelector(slctr);
    },
    set: function(scope) {
      scope && set(notes, map, scope, this.controller);
      return this;
    },
    events: function(controller) {
      // TODO(sjmiles): originally `controller` was expected to be an Object with event handler
      // methods on it (typically a custom-element stamping a template).
      // In Arcs, we want to attach a generic handler (Function) for any event on this node.
      // Subtemplate stamping gets involved because they need to reuse whichever controller.
      // I suspect this can be simplified, but right now I'm just making it go.
      if (controller && typeof controller !== 'function') {
        controller = listen.bind(this, controller);
      }
      this.controller = controller;
      if (controller) {
        mapEvents(notes, map, controller);
      }
      return this;
    },
    appendTo: function(node) {
      if (this.root) {
        // TODO(sjmiles): assumes this.root is a fragment
        node.appendChild(this.root);
      } else {
        console.warn('Xen: cannot appendTo, template stamped no DOM');
      }
      // TODO(sjmiles): this.root is no longer a fragment
      this.root = node;
      return this;
    }
  };
  return dom;
};

const maybeStringToTemplate = template => {
  // TODO(sjmiles): need to memoize this somehow
  return (typeof template === 'string') ? createTemplate(template) : template;
};

const createTemplate = innerHTML => {
  return Object.assign(document.createElement('template'), {innerHTML});
};

/* harmony default export */ __webpack_exports__["a"] = ({
  createTemplate,
  setBoolAttribute,
  stamp
});


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_arc_js__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__runtime_description_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runtime_manifest_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__runtime_planner_js__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__runtime_slot_composer_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__runtime_dom_slot_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__runtime_type_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__browser_loader_js__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tracelib_trace_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__runtime_scheduler_js__ = __webpack_require__(15);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */












//Tracing.enable();

const Arcs = {
  version: '0.3',
  Arc: __WEBPACK_IMPORTED_MODULE_0__runtime_arc_js__["a" /* default */],
  Description: __WEBPACK_IMPORTED_MODULE_1__runtime_description_js__["a" /* default */],
  Manifest: __WEBPACK_IMPORTED_MODULE_2__runtime_manifest_js__["a" /* default */],
  Planner: __WEBPACK_IMPORTED_MODULE_3__runtime_planner_js__["a" /* default */],
  SlotComposer: __WEBPACK_IMPORTED_MODULE_4__runtime_slot_composer_js__["a" /* default */],
  DomSlot: __WEBPACK_IMPORTED_MODULE_5__runtime_dom_slot_js__["a" /* default */],
  Type: __WEBPACK_IMPORTED_MODULE_6__runtime_type_js__["a" /* default */],
  BrowserLoader: __WEBPACK_IMPORTED_MODULE_7__browser_loader_js__["a" /* default */],
  Tracing: __WEBPACK_IMPORTED_MODULE_8__tracelib_trace_js__["a" /* default */],
  scheduler: __WEBPACK_IMPORTED_MODULE_9__runtime_scheduler_js__["a" /* default */]
};

// TODO(sjmiles): can't export because WebPack won't make a built version with a module export
// Instead we fall back to populating a global (possibly already created in app-shell/lib/arcs.js).
// export default Arcs;

window.Arcs = window.Arcs ? Object.assign(window.Arcs, Arcs) : Arcs;



/***/ })
/******/ ]);
//# sourceMappingURL=ArcsLib.js.map