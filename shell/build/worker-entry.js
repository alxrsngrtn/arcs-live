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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shape_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schema_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__type_variable_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tuple_fields_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__recipe_type_checker_js__ = __webpack_require__(8);
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(this[`is${name}`], `{${this.tag}, ${this.data}} is not of type ${name}`);
      return this.data;
    }});
  Object.defineProperty(Type.prototype, `is${name}`, {
    get: function() {
      return this.tag == name;
    }});
}

class Type {
  constructor(tag, data) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(typeof tag == 'string');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(data);
    if (tag == 'Entity') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(data instanceof __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* Schema */]);
    }
    if (tag == 'Collection') {
      if (!(data instanceof Type) && data.tag && data.data) {
        data = new Type(data.tag, data.data);
      }
    }
    if (tag == 'Variable') {
      if (!(data instanceof __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* TypeVariable */])) {
        data = new __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* TypeVariable */](data.name, data.constraint);
      }
    }
    this.tag = tag;
    this.data = data;
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
          let mergedConstraint = __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* TypeVariable */].maybeMergeConstraints(variable.variable, this.variable);
          if (!mergedConstraint) {
            throw new Error('could not merge type variables');
          }
          variable.variable.constraint = mergedConstraint;
        }
      }
      return variable;
    }

    if (this.isCollection) {
      let primitiveType = this.primitiveType();
      let result = primitiveType.mergeTypeVariablesByName(variableMap);
      if (result === primitiveType) {
        return this;
      }
      return result.collectionOf();
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(type1 instanceof Type);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(type2 instanceof Type);
    if (type1.isCollection && type2.isCollection)
      return Type.unwrapPair(type1.primitiveType(), type2.primitiveType());
    return [type1, type2];
  }


  // TODO: update call sites to use the type checker instead (since they will
  // have additional information about direction etc.)
  equals(type) {
    return __WEBPACK_IMPORTED_MODULE_5__recipe_type_checker_js__["a" /* TypeChecker */].compareTypes({type: this}, {type});
  }

  _applyExistenceTypeTest(test) {
    if (this.isCollection)
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

  // TODO: remove this in favor of a renamed collectionType
  primitiveType() {
    return this.collectionType;
  }

  collectionOf() {
    return Type.newCollection(this);
  }

  resolvedType() {
    if (this.isCollection) {
      let primitiveType = this.primitiveType();
      let resolvedPrimitiveType = primitiveType.resolvedType();
      return primitiveType !== resolvedPrimitiveType ? resolvedPrimitiveType.collectionOf() : this;
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
      return this.interfaceShape.canEnsureResolved();
    if (this.isVariable)
      return this.variable.canEnsureResolved();
    if (this.isCollection)
      return this.primitiveType().canEnsureResolved();
    return true;
  }

  maybeEnsureResolved() {
    if (this.isInterface)
      return this.interfaceShape.maybeEnsureResolved();
    if (this.isVariable)
      return this.variable.maybeEnsureResolved();
    if (this.isCollection)
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(false, `canWriteSuperset not implemented for ${this}`);
  }

  get canReadSubset() {
    if (this.isVariable)
      return this.variable.canReadSubset;
    if (this.isEntity)
      return this;
    if (this.isInterface)
      return Type.newInterface(this.interfaceShape.canReadSubset);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(false, `canReadSubset not implemented for ${this}`);
  }

  isMoreSpecificThan(type) {
    if (this.tag !== type.tag)
      return false;
    if (this.isEntity)
      return this.entitySchema.isMoreSpecificThan(type.entitySchema);
    if (this.isInterface)
      return this.interfaceShape.isMoreSpecificThan(type.interfaceShape);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(false, `contains not implemented for ${this}`);
  }

  static _canMergeCanReadSubset(type1, type2) {
    if (type1.canReadSubset && type2.canReadSubset) {
      if (type1.canReadSubset.tag !== type2.canReadSubset.tag)
        return false;
      if (type1.canReadSubset.isEntity)
        return __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* Schema */].intersect(type1.canReadSubset.entitySchema, type2.canReadSubset.entitySchema) !== null;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(false, `_canMergeCanReadSubset not implemented for types tagged with ${type1.canReadSubset.tag}`);
    }
    return true;
  }

  static _canMergeCanWriteSuperset(type1, type2) {
    if (type1.canWriteSuperset && type2.canWriteSuperset) {
      if (type1.canWriteSuperset.tag !== type2.canWriteSuperset.tag)
        return false;
      if (type1.canWriteSuperset.isEntity)
        return __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* Schema */].union(type1.canWriteSuperset.entitySchema, type2.canWriteSuperset.entitySchema) !== null;

    }
    return true;
  }

  // Tests whether two types' constraints are compatible with each other
  static canMergeConstraints(type1, type2) {
    return Type._canMergeCanReadSubset(type1, type2) && Type._canMergeCanWriteSuperset(type1, type2);
  }

  clone(variableMap) {
    let type = this.resolvedType();
    if (type.isVariable) {
      if (variableMap.has(type.variable)) {
        return new Type('Variable', variableMap.get(type.variable));
      } else {
        let newTypeVariable = __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* TypeVariable */].fromLiteral(type.variable.toLiteral());
        variableMap.set(type.variable, newTypeVariable);
        return new Type('Variable', newTypeVariable);
      }
    }
    if (type.data.clone) {
      return new Type(type.tag, type.data.clone(variableMap));
    }
    return Type.fromLiteral(type.toLiteral());
  }

  toLiteral() {
    if (this.isVariable && this.variable.resolution) {
      return this.variable.resolution.toLiteral();
    }
    if (this.data.toLiteral)
      return {tag: this.tag, data: this.data.toLiteral()};
    return this;
  }

  static _deliteralizer(tag) {
    switch (tag) {
      case 'Interface':
        return __WEBPACK_IMPORTED_MODULE_1__shape_js__["a" /* Shape */].fromLiteral;
      case 'Entity':
        return __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* Schema */].fromLiteral;
      case 'Collection':
        return Type.fromLiteral;
      case 'Tuple':
        return __WEBPACK_IMPORTED_MODULE_4__tuple_fields_js__["a" /* TupleFields */].fromLiteral;
      case 'Variable':
        return __WEBPACK_IMPORTED_MODULE_3__type_variable_js__["a" /* TypeVariable */].fromLiteral;
      default:
        return a => a;
    }
  }

  static fromLiteral(literal) {
    if (literal.tag == 'SetView') {
      // TODO: SetView is deprecated, remove when possible.
      literal.tag = 'Collection';
    }
    return new Type(literal.tag, Type._deliteralizer(literal.tag)(literal.data));
  }

  // TODO: is this the same as _applyExistenceTypeTest
  hasProperty(property) {
    if (property(this))
      return true;
    if (this.isCollection)
      return this.collectionType.hasProperty(property);
    return false;
  }

  toString() {
    if (this.isCollection)
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(false, `Add support to serializing type: ${JSON.stringify(this)}`);
  }

  getEntitySchema() {
    if (this.isCollection) {
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
      if (this.isCollection && entitySchema.description.plural) {
        return entitySchema.description.plural;
      }
      if (this.isEntity && entitySchema.description.pattern) {
        return entitySchema.description.pattern;
      }
    }

    if (this.isRelation) {
      return JSON.stringify(this.data);
    }
    if (this.isCollection) {
      return `${this.primitiveType().toPrettyString()} List`;
    }
    if (this.isVariable)
      return this.variable.isResolved() ? this.resolvedType().toPrettyString() : `[~${this.name}]`;
    if (this.isEntity) {
      // Spit MyTypeFOO to My Type FOO
      if (this.entitySchema.name) {
        return this.entitySchema.name.replace(/([^A-Z])([A-Z])/g, '$1 $2').replace(/([A-Z][^A-Z])/g, ' $1').replace(/[\s]+/g, ' ').trim();
      }
      return JSON.stringify(this.entitySchema._model);
    }
    if (this.isTuple)
      return this.tupleFields.toString();
    if (this.isInterface)
      return this.interfaceShape.toPrettyString();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Type;


addType('Entity', 'schema');
addType('Variable');
addType('Collection', 'type');
addType('Relation', 'entities');
addType('Interface', 'shape');
addType('Tuple', 'fields');








/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shell_components_xen_xen_state_js__ = __webpack_require__(31);
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
class DomParticle extends __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shell_components_xen_xen_state_js__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__particle_js__["a" /* Particle */]) {
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
  /** @method getTemplateName(slotName)
   * Override to return a String defining the name of the template for the given slot name.
   */
  getTemplateName(slotName) {
    // TODO: only supports a single template for now. add multiple templates support.
    return `default`;
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
      handles: this.spec.inputs.map(i => i.name),
      // TODO(mmandlis): this.spec needs to be replaced with a particle-spec loaded from
      // .manifest files, instead of .ptcl ones.
      slotNames: [...this.spec.slots.values()].map(s => s.name)
    };
  }
  _info() {
    return `---------- DomParticle::[${this.spec.name}]`;
  }
  get _views() {
    console.warn(`Particle ${this.spec.name} uses deprecated _views getter.`);
    return this.handles;
  }
  async setViews(views) {
    console.warn(`Particle ${this.spec.name} uses deprecated setViews method.`);
    return this.setHandles(views);
  }
  async setHandles(handles) {
    this.handles = handles;
    let config = this.config;
    this.when([new __WEBPACK_IMPORTED_MODULE_1__particle_js__["b" /* HandleChanges */](handles, config.handles, 'change')], async () => {
      await this._handlesToProps(handles, config);
    });
    // make sure we invalidate once, even if there are no incoming handles
    this._invalidate();
  }
  async _handlesToProps(handles, config) {
    // acquire (async) list data from handles
    let data = await Promise.all(
      config.handles
      .map(name => handles.get(name))
      .map(handle => handle.toList ? handle.toList() : handle.get())
    );
    // convert handle data (array) into props (dictionary)
    let props = Object.create(null);
    config.handles.forEach((name, i) => {
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
    // TODO(sjmiles): redundant, same answer for every slot
    if (this.shouldRender(...stateArgs)) {
      let content = {};
      if (slot._requestedContentTypes.has('template')) {
        content.template = this.getTemplate(slot.slotName);
      }
      if (slot._requestedContentTypes.has('model')) {
        content.model = this.render(...stateArgs);
      }
      content.templateName = this.getTemplateName(slot.slotName);

      slot.render(content);
    } else if (slot.isRendered) {
      // Send empty object, to clear rendered slot contents.
      slot.render({});
    }

    this.currentSlotName = undefined;
  }
  forceRenderTemplate(slotName) {
    this._slotByName.forEach((slot, name) => {
      if (!slotName || (name == slotName)) {
        slot._requestedContentTypes.add('template');
      }
    });
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(!!pattern.template && !!pattern.model, 'Description pattern must either be string or have template and model');
    super.setDescriptionPattern('_template_', pattern.template);
    super.setDescriptionPattern('_model_', JSON.stringify(pattern.model));
  }
  updateVariable(handleName, record) {
    const handle = this.handles.get(handleName);
    const newRecord = new (handle.entityClass)(record);
    handle.set(newRecord);
    return newRecord;
  }
  updateSet(handleName, record) {
    // Set the record into the right place in the set. If we find it
    // already present replace it, otherwise, add it.
    // TODO(dstockwell): Replace this with happy entity mutation approach.
    const handle = this.handles.get(handleName);
    const records = this._props[handleName];
    const target = records.find(r => r.id === record.id);
    if (target) {
      handle.remove(target);
    }
    handle.store(record);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DomParticle;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__recipe_type_checker_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shape_js__ = __webpack_require__(10);
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
    this.tags = rawData.tags || [];
    this.dependentConnections = [];
  }

  instantiateDependentConnections(particle, typeVarMap) {
    for (let dependentArg of this.rawData.dependentConnections) {
      let dependentConnection = particle.createConnection(dependentArg, typeVarMap);
      dependentConnection.parentConnection = this;
      this.dependentConnections.push(dependentConnection);
    }

  }

  get isInput() {
    // TODO: we probably don't really want host to be here.
    return this.direction == 'in' || this.direction == 'inout' || this.direction == 'host';
  }

  get isOutput() {
    return this.direction == 'out' || this.direction == 'inout';
  }

  isCompatibleType(type) {
    return __WEBPACK_IMPORTED_MODULE_1__recipe_type_checker_js__["a" /* TypeChecker */].compareTypes({type}, {type: this.type, direction: this.direction});
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
      this.providedSlots.push(new ProvidedSlotSpec(ps));
    });
  }

  getProvidedSlotSpec(name) {
    return this.providedSlots.find(ps => ps.name == name);
  }
}

class ProvidedSlotSpec {
  constructor(slotModel) {
    this.name = slotModel.name;
    this.isRequired = slotModel.isRequired;
    this.isSet = slotModel.isSet;
    this.tags = slotModel.tags || [];
    this.formFactor = slotModel.formFactor; // TODO: deprecate form factors?
    this.handles = slotModel.handles || [];
  }
}

class ParticleSpec {
  constructor(model) {
    this._model = model;
    this.name = model.name;
    this.verbs = model.verbs;
    let typeVarMap = new Map();
    this.connections = [];
    model.args.forEach(arg => this.createConnection(arg, typeVarMap));
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
    // Verify provided slots use valid handle connection names.
    this.slots.forEach(slot => {
      slot.providedSlots.forEach(ps => {
        ps.handles.forEach(v => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* assert */])(this.connectionMap.has(v), 'Cannot provide slot for nonexistent handle constraint ', v));
      });
    });
  }

  createConnection(arg, typeVarMap) {
    let connection = new ConnectionSpec(arg, typeVarMap);
    this.connections.push(connection);
    connection.instantiateDependentConnections(this, typeVarMap);
    return connection;
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
    let connectionToLiteral = ({type, direction, name, isOptional, dependentConnections}) => ({type: type.toLiteral(), direction, name, isOptional, dependentConnections: dependentConnections.map(connectionToLiteral)});
    args = args.map(a => connectionToLiteral(a));
    return {args, name, verbs, description, implFile, affordance, slots};
  }

  static fromLiteral(literal) {
    let {args, name, verbs, description, implFile, affordance, slots} = literal;
    let connectionFromLiteral = ({type, direction, name, isOptional, dependentConnections}) => ({type: __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].fromLiteral(type), direction, name, isOptional, dependentConnections: dependentConnections.map(connectionFromLiteral)}); 
    args = args.map(connectionFromLiteral);
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* assert */])(['kind', 'location', 'pattern'].includes(d) || this.connectionMap.has(d), `Unexpected description for ${d}`);
    });
  }

  toInterface() {
    return __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].newInterface(this._toShape());
  }

  _toShape() {
    const handles = this._model.args;
    // TODO: wat do?
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* assert */])(!this.slots.length, 'please implement slots toShape');
    const slots = [];
    return new __WEBPACK_IMPORTED_MODULE_2__shape_js__["a" /* Shape */](handles, slots);
  }

  toString() {
    let results = [];
    let verbs = '';
    if (this.verbs.length > 0)
      verbs = ' ' + this.verbs.map(verb => `&${verb}`).join(' ');
    results.push(`particle ${this.name}${verbs} in '${this.implFile}'`.trim());
    let indent = '  ';
    let writeConnection = (connection, indent) => {
      results.push(`${indent}${connection.direction} ${connection.type.toString()}${connection.isOptional ? '?' : ''} ${connection.name}`);
      for (let dependent of connection.dependentConnections) {
        writeConnection(dependent, indent + '  ');
      }
    };

    for (let connection of this.connections) {
      if (connection.parentConnection)
        continue;
      writeConnection(connection, indent);
    }

    this.affordance.filter(a => a != 'mock').forEach(a => results.push(`  affordance ${a}`));
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
        consume.push(s.tags.map(a => `#${a}`).join(' '));
      }
      results.push(`  ${consume.join(' ')}`);
      if (s.formFactor) {
        results.push(`    formFactor ${s.formFactor}`);
      }
      // Provided slots.
      s.providedSlots.forEach(ps => {
        let provide = [];
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
/* harmony export (immutable) */ __webpack_exports__["a"] = ParticleSpec;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tracelib_trace_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
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

  /** @method setHandles(handles)
   * This method is invoked with a handle for each store this particle
   * is registered to interact with, once those handles are ready for
   * interaction. Override the method to register for events from
   * the handles.
   *
   * Handles is a map from handle names to store handles.
   */
  setHandles(handles) {
  }
  
  /** @method setViews(views)
   * This method is deprecated. Use setHandles instead.
   */
  setViews(views) {
  }

  /** @method onHandleSync(handle, model)
   * Called for handles that are configured with both keepSynced and notifySync, when they are
   * updated with the full model of their data. This will occur once after setHandles() and any time
   * thereafter if the handle is resynchronized.
   *
   * handle: The Handle instance that was updated.
   * model: For Variable-backed Handles, the Entity data or null if the Variable is not set.
   *        For Collection-backed Handles, the Array of Entities, which may be empty.
   */
  onHandleSync(handle, model) {
  }

  /** @method onHandleUpdate(handle, update)
   * Called for handles that are configued with notifyUpdate, when change events are received from
   * the backing store. For handles also configured with keepSynced these events will be correctly
   * ordered, with some potential skips if a desync occurs. For handles not configured with
   * keepSynced, all change events will be passed through as they are received.
   *
   * handle: The Handle instance that was updated.
   * update: An object containing one of the following fields:
   *    data: The full Entity for a Variable-backed Handle.
   *    added: An Array of Entities added to a Collection-backed Handle.
   *    removed: An Array of Entities removed from a Collection-backed Handle.
   */
  onHandleUpdate(handle, update) {
  }

  /** @method onHandleDesync(handle)
   * Called for handles that are configured with both keepSynced and notifyDesync, when they are
   * detected as being out-of-date against the backing store. For Variables, the event that triggers
   * this will also resync the data and thus this call may usually be ignored. For Collections, the
   * underlying proxy will automatically request a full copy of the stored data to resynchronize.
   * onHandleSync will be invoked when that is received.
   *
   * handle: The Handle instance that was desynchronized.
   */
  onHandleDesync(handle) {
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

  /** @method on(handles, names, kind, f)
   * Convenience method for registering a callback on multiple handles at once.
   *
   * handles is a map from names to store handles
   * names indicates the handles which should have a callback installed on them
   * kind is the kind of event that should be registered for
   * f is the callback function
   */
  on(handles, names, kind, f) {
    if (typeof names == 'string')
      names = [names];
    let trace = __WEBPACK_IMPORTED_MODULE_0__tracelib_trace_js__["a" /* Tracing */].start({cat: 'particle', names: this.constructor.name + '::on', args: {handle: names, event: kind}});
    names.forEach(name => handles.get(name).on(kind, __WEBPACK_IMPORTED_MODULE_0__tracelib_trace_js__["a" /* Tracing */].wrap({cat: 'particle', name: this.constructor.name, args: {handle: name, event: kind}}, f), this));
    trace.end();
  }

  when(changes, f) {
    changes.forEach(change => change.register(this, f));
  }

  fireEvent(slotName, event) {
    // TODO(sjmiles): tests can get here without a `this.slot`, maybe this needs to be fixed in MockSlotManager?
    let slot = this.getSlot(slotName);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(slot, `Particle::fireEvent: slot ${slotName} is falsey`);
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
    let descriptions = this.handles.get('descriptions');
    if (descriptions) {
      descriptions.store(new descriptions.entityClass({key: connectionName, value: pattern}, connectionName));
      return true;
    }
    return false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Particle;


class HandleChanges {
  constructor(handles, names, type) {
    if (typeof names == 'string')
      names = [names];
    this.names = names;
    this.handles = handles;
    this.type = type;
  }
  register(particle, f) {
    let modelCount = 0;
    let afterAllModels = () => { if (++modelCount == this.names.length) { f(); } };

    for (let name of this.names) {
      let handle = this.handles.get(name);
      handle.synchronize(this.type, afterAllModels, f, particle);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = HandleChanges;


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




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_particle_js__ = __webpack_require__(2);
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
class TransformationDomParticle extends __WEBPACK_IMPORTED_MODULE_0__dom_particle_js__["a" /* DomParticle */] {
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
  combineHostedTemplate(slotName, hostedSlotId, content) {}
  combineHostedModel(slotName, hostedSlotId, content) {}

  // Helper methods that may be reused in transformation particles to combine hosted content.
  static propsToItems(propsValues) {
    return propsValues ? propsValues.map(({rawData, id}) => Object.assign({}, rawData, {subId: id})) : [];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TransformationDomParticle;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbols_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_js__ = __webpack_require__(1);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class Entity {
  constructor(userIDComponent) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(!userIDComponent || userIDComponent.indexOf(':') == -1, 'user IDs must not contain the \':\' character');
    this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* Symbols */].identifier] = undefined;
    this._userIDComponent = userIDComponent;
  }
  get data() {
    return undefined;
  }

  getUserID() {
    return this._userIDComponent;
  }

  isIdentified() {
    return this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* Symbols */].identifier] !== undefined;
  }
  // TODO: entity should not be exposing its IDs.
  get id() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(!!this.isIdentified());
    return this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* Symbols */].identifier];
  }
  identify(identifier) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(!this.isIdentified());
    this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* Symbols */].identifier] = identifier;
    let components = identifier.split(':');
    if (components[components.length - 2] == 'uid')
      this._userIDComponent = components[components.length - 1];
  }
  createIdentity(components) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(!this.isIdentified());
    let id;
    if (this._userIDComponent)
      id = `${components.base}:uid:${this._userIDComponent}`;
    else
      id = `${components.base}:${components.component()}`;
    this[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* Symbols */].identifier] = id;
  }
  toLiteral() {
    return this.rawData;
  }

  static get type() {
    // TODO: should the entity's key just be its type?
    // Should it just be called type in that case?
    return __WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* Type */].newEntity(this.key.schema);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_spec_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transformation_dom_particle_js__ = __webpack_require__(5);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */






class MultiplexerDomParticle extends __WEBPACK_IMPORTED_MODULE_2__transformation_dom_particle_js__["a" /* TransformationDomParticle */] {
  constructor() {
    super();
    this._itemSubIdByHostedSlotId = new Map();
    this._connByHostedConn = new Map();
  }

  async _mapParticleConnections(
      listHandleName,
      particleHandleName,
      hostedParticle,
      handles,
      arc) {
    let otherMappedHandles = [];
    let otherConnections = [];
    let index = 2;
    const skipConnectionNames = [listHandleName, particleHandleName];
    for (let [connectionName, otherHandle] of handles) {
      if (skipConnectionNames.includes(connectionName)) {
        continue;
      }
      // TODO(wkorman): For items with embedded recipes we may need a map
      // (perhaps id to index) to make sure we don't map a handle into the inner
      // arc multiple times unnecessarily.
      otherMappedHandles.push(
          `map '${await arc.mapHandle(otherHandle._proxy)}' as v${index}`);
      let hostedOtherConnection = hostedParticle.connections.find(
          conn => conn.isCompatibleType(otherHandle.type));
      if (hostedOtherConnection) {
        otherConnections.push(`${hostedOtherConnection.name} <- v${index++}`);
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
    let arc = await this.constructInnerArc();
    const listHandleName = 'list';
    const particleHandleName = 'hostedParticle';
    let particleHandle = handles.get(particleHandleName);
    let hostedParticle = null;
    let otherMappedHandles = [];
    let otherConnections = [];
    if (particleHandle) {
      hostedParticle = await particleHandle.get();
      if (hostedParticle) {
        [otherMappedHandles, otherConnections] =
            await this._mapParticleConnections(
                listHandleName, particleHandleName, hostedParticle, handles, arc);
      }
    }
    this.setState({
      arc,
      type: handles.get(listHandleName).type,
      hostedParticle,
      otherMappedHandles,
      otherConnections
    });

    super.setHandles(handles);
  }

  async willReceiveProps(
      {list},
      {arc, type, hostedParticle, otherMappedHandles, otherConnections}) {
    if (list.length > 0) {
      this.relevance = 0.1;
    }

    for (let [index, item] of this.getListEntries(list)) {
      let resolvedHostedParticle = hostedParticle;
      if (this.handleIds[item.id]) {
        let itemHandle = await this.handleIds[item.id];
        itemHandle.set(item);
        continue;
      }

      let itemHandlePromise =
          arc.createHandle(type.primitiveType(), 'item' + index);
      this.handleIds[item.id] = itemHandlePromise;

      let itemHandle = await itemHandlePromise;

      if (!resolvedHostedParticle) {
        // If we're muxing on behalf of an item with an embedded recipe, the
        // hosted particle should be retrievable from the item itself. Else we
        // just skip this item.
        if (!item.renderParticleSpec) {
          continue;
        }
        resolvedHostedParticle =
            __WEBPACK_IMPORTED_MODULE_1__particle_spec_js__["a" /* ParticleSpec */].fromLiteral(JSON.parse(item.renderParticleSpec));
        // Re-map compatible handles and compute the connections specific
        // to this item's render particle.
        const listHandleName = 'list';
        const particleHandleName = 'renderParticle';
        [otherMappedHandles, otherConnections] =
            await this._mapParticleConnections(
                listHandleName,
                particleHandleName,
                resolvedHostedParticle,
                this.handles,
                arc);
      }
      let hostedSlotName = [...resolvedHostedParticle.slots.keys()][0];
      let slotName = [...this.spec.slots.values()][0].name;
      let slotId = await arc.createSlot(
          this, slotName, resolvedHostedParticle.name, hostedSlotName);

      if (!slotId) {
        continue;
      }

      this._itemSubIdByHostedSlotId.set(slotId, item.id);

      try {
        await arc.loadRecipe(
            this.constructInnerRecipe(
                resolvedHostedParticle,
                item,
                itemHandle,
                {name: hostedSlotName, id: slotId},
                {connections: otherConnections, handles: otherMappedHandles}),
            this);
        itemHandle.set(item);
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
    let subId = this._itemSubIdByHostedSlotId.get(hostedSlotId);
    if (!subId) {
      return;
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(content.templateName, `Template name is missing for slot '${slotName}' (hosted slot ID: '${hostedSlotId}')`);
    this._setState({templateName: Object.assign(this._state.templateName || {}, {[subId]: `${content.templateName}`})});

    if (content.template) {
      let template = content.template;
      // Replace hosted particle connection in template with the corresponding particle connection names.
      // TODO: make this generic!
      this._connByHostedConn.forEach((conn, hostedConn) => {
        template = template.replace(
            new RegExp(`{{${hostedConn}.description}}`, 'g'),
            `{{${conn}.description}}`);
      });
      this._setState({template: Object.assign(this._state.template || {}, {[content.templateName]: template})});

      this.forceRenderTemplate();
    }
  }

  // Abstract methods below.

  // Called to produce a full interpolated recipe for loading into an inner
  // arc for each item. Subclasses should override this method as by default
  // it does nothing and so no recipe will be returned and content will not
  // be loaded successfully into the inner arc.
  constructInnerRecipe(hostedParticle, item, itemHandle, slot, other) {}

  // Called with the list of items and by default returns the direct result of
  // `Array.entries()`. Subclasses can override this method to alter the item
  // order or otherwise permute the items as desired before their slots are
  // created and contents are rendered.
  getListEntries(list) {
    return list.entries();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MultiplexerDomParticle;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_variable_js__ = __webpack_require__(12);
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
    baseType = baseType == undefined
        ? __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].newVariable(new __WEBPACK_IMPORTED_MODULE_1__type_variable_js__["a" /* TypeVariable */]('a'))
        : __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].fromLiteral(baseType.toLiteral()); // Copy for mutating.
    
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

    if (candidate.isCollection) {
      candidate = candidate.primitiveType();
      let resolution = getResolution(candidate);
      if (resolution == null)
        return null;
      return resolution.collectionOf();
    }

    return getResolution(candidate);
  }

  static _tryMergeTypeVariable(base, onto) {
    let [primitiveBase, primitiveOnto] = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].unwrapPair(base.resolvedType(), onto.resolvedType());

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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(false, 'tryMergeTypeVariable shouldn\'t be called on two types without any type variables');
    }

    return base;
  }

  static _tryMergeConstraints(handleType, {type, direction}) {
    let [primitiveHandleType, primitiveConnectionType] = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].unwrapPair(handleType.resolvedType(), type.resolvedType());
    if (primitiveHandleType.isVariable) {
      while (primitiveConnectionType.isCollection) {
        if (primitiveHandleType.variable.resolution != null
            || primitiveHandleType.variable.canReadSubset != null
            || primitiveHandleType.variable.canWriteSuperset != null) {
          // Resolved and/or constrained variables can only represent Entities, not sets.
          return false;
        }
        // If this is an undifferentiated variable then we need to create structure to match against. That's
        // allowed because this variable could represent anything, and it needs to represent this structure
        // in order for type resolution to succeed.
        primitiveHandleType.variable.resolution = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].newCollection(__WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].newVariable(new __WEBPACK_IMPORTED_MODULE_1__type_variable_js__["a" /* TypeVariable */]('a')));
        let unwrap = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].unwrapPair(primitiveHandleType.resolvedType(), primitiveConnectionType);
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
      if (primitiveConnectionType.tag !== primitiveHandleType.tag) return false;

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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(type.isInterface, `restrictType not implemented for ${type}`);

    let shape = type.interfaceShape.restrictType(instance);
    if (shape == false)
      return false;
    return __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].newInterface(shape);
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
    let [leftType, rightType] = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].unwrapPair(resolvedLeft, resolvedRight);

    // a variable is compatible with a set only if it is unconstrained.
    if (leftType.isVariable && rightType.isCollection)
      return !(leftType.variable.canReadSubset || leftType.variable.canWriteSuperset);
    if (rightType.isVariable && leftType.isCollection)
      return !(rightType.variable.canReadSubset || rightType.variable.canWriteSuperset);

    if (leftType.isVariable || rightType.isVariable) {
      // TODO: everything should use this, eventually. Need to implement the
      // right functionality in Shapes first, though.
      return __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].canMergeConstraints(leftType, rightType);
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

    // treat handle types as if they were 'inout' connections. Note that this
    // guarantees that the handle's type will be preserved, and that the fact
    // that the type comes from a handle rather than a connection will also
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
/* harmony export (immutable) */ __webpack_exports__["a"] = TypeChecker;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entity_js__ = __webpack_require__(6);
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(!model.fields);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(model.fields);
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(typeof type == 'string');
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
    let names = [...schema1.names].filter(name => schema2.names.includes(name));
    let fields = {};

    for (let [field, type] of Object.entries(schema1.fields)) {
      let otherType = schema2.fields[field];
      if (otherType && Schema.typesEqual(type, otherType)) {
        fields[field] = type;
      }
    }

    return new Schema({
      names,
      fields,
    });
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
    return __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* Type */].newEntity(this);
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

    let clazz = class extends __WEBPACK_IMPORTED_MODULE_2__entity_js__["a" /* Entity */] {
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(data, `can't construct entity with null data`);
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__type_js__ = __webpack_require__(1);
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
    return __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* Type */].fromLiteral(member);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(name);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(handles !== undefined);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(slots !== undefined);
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
        return `  ${handle.direction ? handle.direction + ' ': ''}${type.toString()} ${handle.name ? handle.name : '*'}`;
      }).join('\n');
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
${this._handlesToManifestString()}
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

  canEnsureResolved() {
    for (let typeVar of this._typeVars)
      if (!typeVar.object[typeVar.field].canEnsureResolved()) return false;
    return true;
  }

  maybeEnsureResolved() {
    for (let typeVar of this._typeVars) {
      let variable = typeVar.object[typeVar.field];
      variable = variable.clone(new Map());
      if (!variable.maybeEnsureResolved()) return false;
    }
    for (let typeVar of this._typeVars)
      typeVar.object[typeVar.field].maybeEnsureResolved();
    return true;
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
    return (reference instanceof __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* Type */]) && reference.hasProperty(r => r.isVariable);
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
    let [left, right] = __WEBPACK_IMPORTED_MODULE_1__type_js__["a" /* Type */].unwrapPair(shapeHandle.type, particleHandle.type);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Shape;





/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt


const Symbols = {identifier: Symbol('id')};
/* harmony export (immutable) */ __webpack_exports__["a"] = Symbols;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schema_js__ = __webpack_require__(9);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt






class TypeVariable {
  constructor(name, canWriteSuperset, canReadSubset) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(typeof name == 'string');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(canWriteSuperset == null || canWriteSuperset instanceof __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */]);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(canReadSubset == null || canReadSubset instanceof __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */]);
    this.name = name;
    this._canWriteSuperset = canWriteSuperset;
    this._canReadSubset = canReadSubset;
    this._resolution = null;
  }

  // Merge both the read subset (upper bound) and write superset (lower bound) constraints
  // of two variables together. Use this when two separate type variables need to resolve
  // to the same value.
  maybeMergeConstraints(variable) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(variable instanceof TypeVariable);

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

    let mergedSchema = __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* Schema */].intersect(this.canReadSubset.entitySchema, constraint.entitySchema);
    if (!mergedSchema)
      return false;
    
    this.canReadSubset = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].newEntity(mergedSchema);
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

    let mergedSchema = __WEBPACK_IMPORTED_MODULE_2__schema_js__["a" /* Schema */].union(this.canWriteSuperset.entitySchema, constraint.entitySchema);
    if (!mergedSchema)
      return false;

    this.canWriteSuperset = __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].newEntity(mergedSchema);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(value instanceof __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */]);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(!this._resolution);
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(!this._canWriteSuperset);
      if (this._resolution.isVariable) {
        return this._resolution.variable.canWriteSuperset;
      }
      return null;
    }
    return this._canWriteSuperset;
  }

  set canWriteSuperset(value) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(!this._resolution);
    this._canWriteSuperset = value;
  }

  get canReadSubset() {
    if (this._resolution) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(!this._canReadSubset);
      if (this._resolution.isVariable) {
        return this._resolution.variable.canReadSubset;
      }
      return null;
    }
    return this._canReadSubset;
  }

  set canReadSubset(value) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(!this._resolution);
    this._canReadSubset = value;
  }

  canEnsureResolved() {
    if (this._resolution)
      return this._resolution.canEnsureResolved();
    if (this._canWriteSuperset || this._canReadSubset)
      return true;
    return false;
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(this.resolution == null);
    return {
      name: this.name,
      canWriteSuperset: this._canWriteSuperset && this._canWriteSuperset.toLiteral(),
      canReadSubset: this._canReadSubset && this._canReadSubset.toLiteral()
    };
  }

  static fromLiteral(data) {
    return new TypeVariable(
        data.name,
        data.canWriteSuperset ? __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].fromLiteral(data.canWriteSuperset) : null,
        data.canReadSubset ? __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].fromLiteral(data.canReadSubset) : null);
  }

  isResolved() {
    return (this._resolution && this._resolution.isResolved());
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TypeVariable;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__handle_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_channel_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storage_proxy_js__ = __webpack_require__(29);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







class InnerPEC {
  constructor(port, idBase, loader) {
    this._apiPort = new __WEBPACK_IMPORTED_MODULE_2__api_channel_js__["a" /* PECInnerPort */](port);
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
    this._apiPort.onDefineHandle = ({type, identifier, name}) => {
      return new __WEBPACK_IMPORTED_MODULE_3__storage_proxy_js__["a" /* StorageProxy */](identifier, type, this._apiPort, this, name);
    };

    this._apiPort.onCreateHandleCallback = ({type, id, name, callback}) => {
      let proxy = new __WEBPACK_IMPORTED_MODULE_3__storage_proxy_js__["a" /* StorageProxy */](id, type, this._apiPort, this, name);
      return [proxy, () => callback(proxy)];
    };

    this._apiPort.onMapHandleCallback = ({id, callback}) => {
      return [id, () => callback(id)];
    };

    this._apiPort.onCreateSlotCallback = ({hostedSlotId, callback}) => {
      return [hostedSlotId, () => callback(hostedSlotId)];
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__platform_assert_web_js__["a" /* assert */])(particle._slotByName.has(slotName),
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
            let h = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__handle_js__["a" /* handleFor */])(proxy, proxy.type.isCollection, name, particleId);
            h.entityClass = (proxy.type.isCollection ? proxy.type.primitiveType() : proxy.type).entitySchema.entityClass();
            resolve(h);
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
    let registerList = [];
    proxies.forEach((proxy, name) => {
      let connSpec = spec.connectionMap.get(name);
      let handle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__handle_js__["a" /* handleFor */])(proxy, proxy.type.isCollection, name, id, connSpec.isInput, connSpec.isOutput);
      let type = proxy.type.isCollection ? proxy.type.primitiveType() : proxy.type;
      if (type.isEntity) {
        handle.entityClass = type.entitySchema.entityClass();
      }
      handleMap.set(name, handle);

      // Defer registration of handles with proxies until after particles have a chance to
      // configure them in setHandles.
      registerList.push({proxy, particle, handle});
    });

    return [particle, async () => {
      resolve();
      let idx = this._pendingLoads.indexOf(p);
      this._pendingLoads.splice(idx, 1);
      await particle.setHandles(handleMap);
      registerList.forEach(({proxy, particle, handle}) => proxy.register(particle, handle));
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
    return false;
  }

  get idle() {
    if (!this.busy) {
      return Promise.resolve();
    }
    return Promise.all(this._pendingLoads.concat(this._particles.map(particle => particle.idle))).then(() => this.idle);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InnerPEC;


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(16)))

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_loader_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__runtime_particle_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runtime_dom_particle_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__runtime_multiplexer_dom_particle_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__runtime_transformation_dom_particle_js__ = __webpack_require__(5);
/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */







const logFactory = (preamble, color, log='log') => console[log].bind(console, `%c${preamble} [Particle]`, `background: ${color}; color: white; padding: 1px 6px 2px 7px; border-radius: 4px;`);
const html = (strings, ...values) => (strings[0] + values.map((v, i) => v + strings[i + 1]).join('')).trim();

const dumbCache = {};

class BrowserLoader extends __WEBPACK_IMPORTED_MODULE_0__runtime_loader_js__["a" /* Loader */] {
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
    const logger = logFactory(fileName.split('/').pop(), '#1faa00');
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
      Particle: __WEBPACK_IMPORTED_MODULE_1__runtime_particle_js__["a" /* Particle */],
      DomParticle: __WEBPACK_IMPORTED_MODULE_2__runtime_dom_particle_js__["a" /* DomParticle */],
      MultiplexerDomParticle: __WEBPACK_IMPORTED_MODULE_3__runtime_multiplexer_dom_particle_js__["a" /* MultiplexerDomParticle */],
      SimpleParticle: __WEBPACK_IMPORTED_MODULE_2__runtime_dom_particle_js__["a" /* DomParticle */],
      TransformationDomParticle: __WEBPACK_IMPORTED_MODULE_4__runtime_transformation_dom_particle_js__["a" /* TransformationDomParticle */],
      resolver,
      log,
      html
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BrowserLoader;



/***/ }),
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_debug_abstract_devtools_channel_js__ = __webpack_require__(22);
/**
 * @license
 * Copyright (c) 2018 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */




class DevtoolsChannel extends __WEBPACK_IMPORTED_MODULE_0__runtime_debug_abstract_devtools_channel_js__["a" /* AbstractDevtoolsChannel */] {
  constructor() {
    super();
    document.addEventListener('arcs-debug-in', e => this._handleMessage(e.detail));
    this._makeReady(); // TODO: Consider readiness if connecting via extension.
  }

  _flush(messages) {
    document.dispatchEvent(new CustomEvent('arcs-debug-out', {detail: messages}));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DevtoolsChannel;



/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

const fs = {};
/* harmony export (immutable) */ __webpack_exports__["a"] = fs;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

const vm = {};
/* harmony export (immutable) */ __webpack_exports__["a"] = vm;



/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__particle_spec_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__type_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__debug_outer_port_attachment_js__ = __webpack_require__(24);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(!this._reverseIdMap.has(thing));
    let id;
    if (requestedId) {
      id = requestedId;
    } else if (thing.apiChannelMappingId) {
      id = thing.apiChannelMappingId;
    } else {
      id = this._newIdentifier();
    }
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(!this._idMap.has(id), `${requestedId ? 'requestedId' : (thing.apiChannelMappingId ? 'apiChannelMappingId' : 'newIdentifier()')} ${id} already in use`);
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(continuation == null);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(this._reverseIdMap.has(thing), `Missing thing ${thing}`);
    return this._reverseIdMap.get(thing);
  }

  thingForIdentifier(id) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(this._idMap.has(id), `Missing id: ${id}`);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(this._messageMap.has(e.data.messageType));

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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(args.identifier);
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
    if (!this._debugAttachment) this._debugAttachment = new __WEBPACK_IMPORTED_MODULE_3__debug_outer_port_attachment_js__["a" /* OuterPortAttachment */](arc);
  }
}

class PECOuterPort extends APIPort {
  constructor(messagePort) {
    super(messagePort, 'o');

    this.registerCall('Stop', {});
    this.registerRedundantInitializer('DefineHandle', {type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* Type */]), name: this.Direct});
    this.registerInitializer('InstantiateParticle',
      {id: this.Direct, spec: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_1__particle_spec_js__["a" /* ParticleSpec */]), handles: this.Map(this.Direct, this.Mapped)}, 'id');

    this.registerCall('UIEvent', {particle: this.Mapped, slotName: this.Direct, event: this.Direct});
    this.registerCall('SimpleCallback', {callback: this.Direct, data: this.Direct});
    this.registerCall('AwaitIdle', {version: this.Direct});
    this.registerCall('StartRender', {particle: this.Mapped, slotName: this.Direct, contentTypes: this.List(this.Direct)});
    this.registerCall('StopRender', {particle: this.Mapped, slotName: this.Direct});

    this.registerHandler('Render', {particle: this.Mapped, slotName: this.Direct, content: this.Direct});
    this.registerHandler('InitializeProxy', {handle: this.Mapped, callback: this.Direct});
    this.registerHandler('SynchronizeProxy', {handle: this.Mapped, callback: this.Direct});
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

    this.registerHandler('ArcCreateHandle', {callback: this.Direct, arc: this.LocalMapped, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* Type */]), name: this.Direct});
    this.registerInitializer('CreateHandleCallback', {callback: this.Direct, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* Type */]), name: this.Direct, id: this.Direct});

    this.registerHandler('ArcMapHandle', {callback: this.Direct, arc: this.LocalMapped, handle: this.Mapped});
    this.registerInitializer('MapHandleCallback', {callback: this.Direct, id: this.Direct});

    this.registerHandler('ArcCreateSlot',
      {callback: this.Direct, arc: this.LocalMapped, transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedParticleName: this.Direct, hostedSlotName: this.Direct});
    this.registerInitializer('CreateSlotCallback', {callback: this.Direct, hostedSlotId: this.Direct});
    this.registerCall('InnerArcRender', {transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedSlotId: this.Direct, content: this.Direct});

    this.registerHandler('ArcLoadRecipe', {arc: this.LocalMapped, recipe: this.Direct, callback: this.Direct});

    this.registerHandler('RaiseSystemException', {exception: this.Direct, methodName: this.Direct, particleId: this.Direct});
  }
}
/* unused harmony export PECOuterPort */


class PECInnerPort extends APIPort {
  constructor(messagePort) {
    super(messagePort, 'i');

    this.registerHandler('Stop', {});
    this.registerInitializerHandler('DefineHandle', {type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* Type */]), name: this.Direct});
    this.registerInitializerHandler('InstantiateParticle',
      {id: this.Direct, spec: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_1__particle_spec_js__["a" /* ParticleSpec */]), handles: this.Map(this.Direct, this.Mapped)});

    this.registerHandler('UIEvent', {particle: this.Mapped, slotName: this.Direct, event: this.Direct});
    this.registerHandler('SimpleCallback', {callback: this.LocalMapped, data: this.Direct});
    this.registerHandler('AwaitIdle', {version: this.Direct});
    this.registerHandler('StartRender', {particle: this.Mapped, slotName: this.Direct, contentTypes: this.Direct});
    this.registerHandler('StopRender', {particle: this.Mapped, slotName: this.Direct});

    this.registerCall('Render', {particle: this.Mapped, slotName: this.Direct, content: this.Direct});
    this.registerCall('InitializeProxy', {handle: this.Mapped, callback: this.LocalMapped});
    this.registerCall('SynchronizeProxy', {handle: this.Mapped, callback: this.LocalMapped});
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

    this.registerCall('ArcCreateHandle', {callback: this.LocalMapped, arc: this.Direct, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* Type */]), name: this.Direct});
    this.registerInitializerHandler('CreateHandleCallback', {callback: this.LocalMapped, type: this.ByLiteral(__WEBPACK_IMPORTED_MODULE_2__type_js__["a" /* Type */]), name: this.Direct, id: this.Direct});
    this.registerCall('ArcMapHandle', {callback: this.LocalMapped, arc: this.Direct, handle: this.Mapped});
    this.registerInitializerHandler('MapHandleCallback', {callback: this.LocalMapped, id: this.Direct});
    this.registerCall('ArcCreateSlot',
      {callback: this.LocalMapped, arc: this.Direct, transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedParticleName: this.Direct, hostedSlotName: this.Direct});
    this.registerInitializerHandler('CreateSlotCallback', {callback: this.LocalMapped, hostedSlotId: this.Direct});
    this.registerHandler('InnerArcRender', {transformationParticle: this.Mapped, transformationSlotName: this.Direct, hostedSlotId: this.Direct, content: this.Direct});

    this.registerCall('ArcLoadRecipe', {arc: this.Direct, recipe: this.Direct, callback: this.LocalMapped});

    this.registerCall('RaiseSystemException', {exception: this.Direct, methodName: this.Direct, particleId: this.Direct});

  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PECInnerPort;



/***/ }),
/* 21 */
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
/* harmony export (immutable) */ __webpack_exports__["a"] = JsonldToManifest;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__ = __webpack_require__(0);
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
    this.messageListeners = new Map();
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

  listen(arcOrId, messageType, callback) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(messageType);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(arcOrId);
    const arcId = typeof arcOrId === 'string' ? arcOrId : arcOrId.id.toString();
    const key = `${arcId}/${messageType}`;
    let listeners = this.messageListeners.get(key);
    if (!listeners) this.messageListeners.set(key, listeners = []);
    listeners.push(callback);
  }

  _handleMessage(msg) {
    let listeners = this.messageListeners.get(`${msg.targetArcId}/${msg.messageType}`);
    if (!listeners) {
      console.warn(`No one is listening to ${msg.messageType} message`);
    } else {
      for (let listener of listeners) listener(msg);
    }
  }

  _flush(messages) {
    throw 'Not implemented in an abstract class';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AbstractDevtoolsChannel;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getDevtoolsChannel;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_devtools_channel_web_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__testing_devtools_channel_stub_js__ = __webpack_require__(25);
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

function getDevtoolsChannel({useStub} = {}) {
  if (!instance) {
    instance = useStub ? new __WEBPACK_IMPORTED_MODULE_1__testing_devtools_channel_stub_js__["a" /* DevtoolsChannelStub */]() : new __WEBPACK_IMPORTED_MODULE_0__platform_devtools_channel_web_js__["a" /* DevtoolsChannel */]();
  }
  return instance;
}


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__devtools_channel_provider_js__ = __webpack_require__(23);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__devtools_channel_provider_js__["a" /* getDevtoolsChannel */])().send({
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__devtools_channel_provider_js__["a" /* getDevtoolsChannel */])().send({messageType: 'dataflow', messageBody});
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
          case 'Collection': return `[${this._describeHandleType(handleType.data)}]`;
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
/* 25 */
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

class DevtoolsChannelStub {
  constructor() {
    this._ready = Promise.resolve();
    this._messages = [];
  }

  get ready() {
    return this._ready;
  }

  get messages() {
    return this._messages;
  }

  send(message) {
    this._messages.push(JSON.parse(JSON.stringify(message)));
  }

  listen(arcOrId, messageType, callback) { /* No-op */ }

  clear() {
    this._messages.length = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DevtoolsChannelStub;



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return local_fetch; });
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

const local_fetch = fetch;



/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleFor;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbols_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__particle_spec_js__ = __webpack_require__(3);
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
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(entityClass, 'Handles need entity classes for deserialization');
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
  constructor(proxy, name, particleId, canRead, canWrite) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(!(proxy instanceof Handle));
    this._proxy = proxy;
    this.name = name || this._proxy.name;
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

  raiseSystemException(exception, method) {
    this._proxy.raiseSystemException(exception, method, this._particleId);
  }

  // `options` may contain any of:
  // - keepSynced (bool): load full data on startup, maintain data in proxy and resync as required
  // - notifySync (bool): if keepSynced is true, call onHandleSync when the full data is received
  // - notifyUpdate (bool): call onHandleUpdate for every change event received
  // - notifyDesync (bool): if keepSynced is true, call onHandleDesync when desync is detected
  configure(options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(this.canRead, 'configure can only be called on readable Handles');
    try {
      let keys = Object.keys(this.options);
      let badKeys = Object.keys(options).filter(o => !keys.includes(o));
      if (badKeys.length > 0) {
        throw new Error(`Invalid option in Handle.configure(): ${badKeys}`);
      }
      Object.assign(this.options, options);
    } catch (e) {
      this.raiseSystemException(e, 'Handle::configure');
      throw e;
    }
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(this._proxy.generateID);
    return this._proxy.generateID();
  }

  generateIDComponents() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(this._proxy.generateIDComponents);
    return this._proxy.generateIDComponents();
  }

  _serialize(entity) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(entity, 'can\'t serialize a null entity');
    if (!entity.isIdentified())
      entity.createIdentity(this.generateIDComponents());
    let id = entity[__WEBPACK_IMPORTED_MODULE_1__symbols_js__["a" /* Symbols */].identifier];
    let rawData = entity.dataClone();
    return {
      id,
      rawData
    };
  }

  get type() {
    return this._proxy._type;
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
  constructor(proxy, name, particleId, canRead, canWrite) {
    // TODO: this should talk to an API inside the PEC.
    super(proxy, name, particleId, canRead, canWrite);
  }
  query() {
    // TODO: things
  }

  // Called by StorageProxy.
  _notify(forSync, particle, details) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(this.canRead, '_notify should not be called for non-readable handles');
    if (forSync) {
      particle.onHandleSync(this, this._restore(details));
    } else {
      let update = {};
      if ('add' in details)
        update.added = this._restore(details.add);
      if ('remove' in details)
        update.removed = this._restore(details.remove);
      particle.onHandleUpdate(this, update);
    }
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
    return this._restore(await this._proxy.toList(this._particleId));
  }

  _restore(list) {
    return (list !== null) ? list.map(a => restore(a, this.entityClass)) : null;
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
      throw new Error('Handle not writeable');
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
  constructor(proxy, name, particleId, canRead, canWrite) {
    super(proxy, name, particleId, canRead, canWrite);
  }

  // Called by StorageProxy.
  _notify(forSync, particle, details) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__platform_assert_web_js__["a" /* assert */])(this.canRead, '_notify should not be called for non-readable handles');
    if (forSync) {
      particle.onHandleSync(this, this._restore(details));
    } else {
      particle.onHandleUpdate(this, {data: this._restore(details.data)});
    }
  }

  /** @method async get()
  * Returns the Entity contained by the Variable, or undefined if the Variable
  * is cleared.
  * throws: Error if this variable is not configured as a readable handle (i.e. 'in' or 'inout')
    in the particle's manifest.
   */
  async get() {
    if (!this.canRead)
      throw new Error('Handle not readable');
    let model = await this._proxy.get(this._particleId);
    return this._restore(model);
  }

  _restore(model) {
    if (model === null)
      return null;
    if (this.type.isEntity) {
      return restore(model, this.entityClass);
    }
    return this.type.isInterface ? __WEBPACK_IMPORTED_MODULE_3__particle_spec_js__["a" /* ParticleSpec */].fromLiteral(model) : model;
  }

  /** @method set(entity)
   * Stores a new entity into the Variable, replacing any existing entity.
   * throws: Error if this variable is not configured as a writeable handle (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async set(entity) {
    try {
      if (!this.canWrite)
        throw new Error('Handle not writeable');
      return this._proxy.set(this._serialize(entity), this._particleId);
    } catch (e) {
      this.raiseSystemException(e, 'Handle::set');
      throw e;
    }
  }

  /** @method clear()
   * Clears any entity currently in the Variable.
   * throws: Error if this variable is not configured as a writeable handle (i.e. 'out' or 'inout')
     in the particle's manifest.
   */
  async clear() {
    if (!this.canWrite)
      throw new Error('Handle not writeable');
    await this._proxy.clear(this._particleId);
  }
}

function handleFor(proxy, isSet, name, particleId, canRead = true, canWrite = true) {
  return (isSet || (isSet == undefined && proxy.type.isCollection))
      ? new Collection(proxy, name, particleId, canRead, canWrite)
      : new Variable(proxy, name, particleId, canRead, canWrite);
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__platform_fs_web_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform_vm_web_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fetch_web_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__particle_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dom_particle_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__multiplexer_dom_particle_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__transformation_dom_particle_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__converters_jsonldToManifest_js__ = __webpack_require__(21);
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
    let path = fileName.replace(/[/][^/]+$/, '/');
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
      __WEBPACK_IMPORTED_MODULE_0__platform_fs_web_js__["a" /* fs */].readFile(file, (err, data) => {
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
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fetch_web_js__["a" /* fetch */])('https://schema.org/Product.jsonld').then(res => res.text()).then(data => __WEBPACK_IMPORTED_MODULE_8__converters_jsonldToManifest_js__["a" /* JsonldToManifest */].convert(data, {'@id': 'schema:Thing'}));
      }
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fetch_web_js__["a" /* fetch */])(url + '.jsonld').then(res => res.text()).then(data => __WEBPACK_IMPORTED_MODULE_8__converters_jsonldToManifest_js__["a" /* JsonldToManifest */].convert(data));
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__fetch_web_js__["a" /* fetch */])(url).then(res => res.text());
  }

  async loadParticleClass(spec) {
    let clazz = await this.requireParticle(spec.implFile);
    clazz.spec = spec;
    return clazz;
  }

  async requireParticle(fileName) {
    if (fileName === null) fileName = '';
    let src = await this.loadResource(fileName);
    // Note. This is not real isolation.
    let script = new __WEBPACK_IMPORTED_MODULE_1__platform_vm_web_js__["a" /* vm */].Script(src, {filename: fileName, displayErrors: true});
    let result = [];
    let self = {
      defineParticle(particleWrapper) {
        result.push(particleWrapper);
      },
      console,
      importScripts: s => null //console.log(`(skipping browser-space import for [${s}])`)
    };
    script.runInNewContext(self, {filename: fileName, displayErrors: true});
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__platform_assert_web_js__["a" /* assert */])(result.length > 0 && typeof result[0] == 'function', `Error while instantiating particle implementation from ${fileName}`);
    return this.unwrapParticle(result[0]);
  }

  unwrapParticle(particleWrapper) {
    return particleWrapper({Particle: __WEBPACK_IMPORTED_MODULE_4__particle_js__["a" /* Particle */], DomParticle: __WEBPACK_IMPORTED_MODULE_5__dom_particle_js__["a" /* DomParticle */], TransformationDomParticle: __WEBPACK_IMPORTED_MODULE_7__transformation_dom_particle_js__["a" /* TransformationDomParticle */], MultiplexerDomParticle: __WEBPACK_IMPORTED_MODULE_6__multiplexer_dom_particle_js__["a" /* MultiplexerDomParticle */], html});
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Loader;



/***/ }),
/* 29 */
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




/** @class StorageProxy
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
  constructor(id, type, port, pec, name) {
    this._id = id;
    this._type = type;
    this._port = port;
    this._pec = pec;
    this.name = name;

    // _model is an Entity for Variables or [Entity] for Collections.
    this._model = undefined;
    this._version = undefined;
    this._listenerAttached = false;
    this._keepSynced = false;
    this._synchronized = false;
    this._observers = [];
    this._updates = [];
  }

  raiseSystemException(exception, methodName, particleId) {
    this._port.RaiseSystemException({exception: {message: exception.message, stack: exception.stack, name: exception.name}, methodName, particleId});
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  // Called by InnerPEC to associate (potentially multiple) particle/handle pairs with this proxy.
  register(particle, handle) {
    if (!handle.canRead)
      return;
    this._observers.push({particle, handle});

    // Attach an event listener to the backing store when the first readable handle is registered.
    if (!this._listenerAttached) {
      this._port.InitializeProxy({handle: this, callback: x => this._onUpdate(x)});
      this._listenerAttached = true;
    }

    // Change to synchronized mode as soon as we get any handle configured with keepSynced and send
    // a request to get the full model (once).
    // TODO: drop back to non-sync mode if all handles re-configure to !keepSynced
    if (handle.options.keepSynced) {
      if (!this._keepSynced) {
        this._port.SynchronizeProxy({handle: this, callback: x => this._onSynchronize(x)});
        this._keepSynced = true;
      }

      // If a handle configured for sync notifications registers after we've received the full
      // model, notify it immediately.
      // TODO: add a unit test to cover this case
      if (handle.options.notifySync && this._synchronized) {
        handle._notify(true, particle, this._model);
      }
    }
  }

  // `model` contains 'version' and one of 'data' or 'list'.
  _onSynchronize(model) {
    if (this._version !== undefined && model.version <= this._version) {
      console.warn(`StorageProxy '${this._id}' received stale model version ${model.version}; ` +
                   `current is ${this._version}`);
      return;
    }

    // We may have queued updates that were received after a desync; discard any that are stale
    // with respect to the received model.
    this._synchronized = true;
    while (this._updates.length > 0 && this._updates[0].version <= model.version) {
      this._updates.shift();
    }

    // Replace the stored data with the new one and notify handles that are configured for it.
    this._version = model.version;
    if ('data' in model) {
      this._model = model.data;
    } else if ('list' in model) {
      this._model = model.list;
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(false, `StorageProxy received invalid synchronize event: ${JSON.stringify(received)}`);
    }
    for (let {handle, particle} of this._observers) {
      if (handle.options.keepSynced && handle.options.notifySync) {
        handle._notify(true, particle, this._model, null);
      }
    }
    this._processUpdates();
  }

  // `update` contains 'version' and one of 'data', 'add' or 'remove'.
  _onUpdate(update) {
    // Immediately notify any handles that are not configured with keepSynced but do want updates.
    for (let {handle, particle} of this._observers) {
      if (!handle.options.keepSynced && handle.options.notifyUpdate) {
        handle._notify(false, particle, update);
      }
    }

    // Bail if we're not in synchronized mode or this is a stale event.
    if (!this._keepSynced)
      return;
    if (update.version <= this._version) {
      console.warn(`StorageProxy '${this._id}' received stale update version ${update.version}; ` +
                   `current is ${this._version}`);
      return;
    }

    // Add the update to the queue and process. Most of the time the queue should be empty and
    // _processUpdates will consume this event immediately.
    this._updates.push(update);
    this._updates.sort((a, b) => a.version - b.version);
    this._processUpdates();
  }

  _processUpdates() {
    // Consume all queued updates whose versions are monotonically increasing from our stored one.
    while (this._updates.length > 0 && this._updates[0].version === this._version + 1) {
      let update = this._updates.shift();

      // Fold the update into our stored model.
      this._version = update.version;
      if ('data' in update) {
        this._model = update.data;
      } else if ('add' in update) {
        this._model.push(...update.add);
      } else if ('remove' in update) {
        let keep = [];
        for (let held of this._model) {
          keep.push(held);
          // TODO: avoid revisiting removed items? (eg. use a set of ids, prune as they are matched)
          for (let item of update.remove) {
            if (held.id === item.id) {
              keep.pop();
              break;
            }
          }
        }
        this._model = keep;
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__platform_assert_web_js__["a" /* assert */])(false, `StorageProxy received invalid update event: ${JSON.stringify(update)}`);
      }

      // Notify handles configured with keepSynced and notifyUpdates (non-keepSynced handles are
      // notified as updates are received).
      for (let {handle, particle} of this._observers) {
        if (handle.options.keepSynced && handle.options.notifyUpdate) {
          handle._notify(false, particle, update);
        }
      }
    }

    // If we still have update events queued, we must have received a future version are are now
    // desynchronized. Send a request for the full model and notify handles configured for it.
    if (this._updates.length > 0) {
      if (this._synchronized) {
        this._synchronized = false;
        this._port.SynchronizeProxy({handle: this, callback: x => this._onSynchronize(x)});
        for (let {handle, particle} of this._observers) {
          if (handle.options.notifyDesync) {
            particle.onHandleDesync(handle, this._updates[0].version);
          }
        }
      }
    } else if (!this._synchronized) {
      // If we were desynced but have now consumed all update events, we've caught up.
      this._synchronized = true;
    }
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

  // Read ops: if we're synchronized we can just return the local copy of the data.
  // Otherwise, send a request to the backing store.
  // TODO: in synchronized mode, these should integrate with SynchronizeProxy rather than
  //       sending a parallel request
  get(particleId) {
    if (this._synchronized) {
      return new Promise((resolve, reject) => resolve(this._model));
    } else {
      return new Promise((resolve, reject) =>
        this._port.HandleGet({callback: r => resolve(r), handle: this, particleId}));
    }
  }

  toList(particleId) {
    if (this._synchronized) {
      return new Promise((resolve, reject) => resolve(this._model));
    } else {
      return new Promise((resolve, reject) =>
        this._port.HandleToList({callback: r => resolve(r), handle: this, particleId}));
    }
  }

  // Write ops: in synchronized mode, any write operation will desynchronize the proxy, so
  // subsequent reads will call to the backing store until resync is established via the update
  // event triggered by the write.
  // TODO: handle concurrent writes from other parties to the backing store
  set(entity, particleId) {
    this._port.HandleSet({data: entity, handle: this, particleId});
    this._synchronized = false;
  }

  store(entity, particleId) {
    this._port.HandleStore({data: entity, handle: this, particleId});
    this._synchronized = false;
  }

  remove(entityId, particleId) {
    this._port.HandleRemove({data: entityId, handle: this, particleId});
    this._synchronized = false;
  }

  clear(particleId) {
    this._port.HandleClear({handle: this, particleId});
    this._synchronized = false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StorageProxy;



/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type_js__ = __webpack_require__(1);
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
    return new TupleFields(literal.map(a => __WEBPACK_IMPORTED_MODULE_0__type_js__["a" /* Type */].fromLiteral(a)));
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
/* 31 */
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runtime_inner_PEC_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser_loader_js__ = __webpack_require__(14);
// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt




const log = console.log.bind(console, `%cworker-entry`, `background: #12005e; color: white; padding: 1px 6px 2px 7px; border-radius: 6px;`);

self.onmessage = function(e) {
  self.onmessage = null;
  let {id, base} = e.data;
  //log('starting worker', id);
  new __WEBPACK_IMPORTED_MODULE_0__runtime_inner_PEC_js__["a" /* InnerPEC */](e.ports[0], id, new __WEBPACK_IMPORTED_MODULE_1__browser_loader_js__["a" /* BrowserLoader */](base));
};


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/*
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
    return performance.now() * 1000;
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

let streamingCallbacks = [];
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
    events.push(event);
    Promise.resolve().then(() => {
      for (let {callback, predicate} of streamingCallbacks) {
          if (!predicate || predicate(event)) callback(event);
      }
    });
}

let module = {exports: {}};
const Tracing = module.exports;
/* harmony export (immutable) */ __webpack_exports__["a"] = Tracing;

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
      let t = module.exports.start(info);
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
    let begin = now();
    return {
      addArgs: function(extraArgs) {
        args = Object.assign(args || {}, extraArgs);
      },
      end: function(endInfo) {
        if (endInfo && endInfo.args) {
          args = Object.assign(args || {}, endInfo.args);
        }
        this.endTs = now();
        pushEvent({
          ph: 'X',
          ts: begin,
          dur: this.endTs - begin,
          cat: info.cat,
          name: info.name,
          ov: info.overview,
          args: args,
        });
      },
      beginTs: begin
    };
  }
  module.exports.start = function(info) {
    let trace = startSyncTrace(info);
    let flow;
    let baseInfo = {cat: info.cat, name: info.name + ' (async)', overview: info.overview};
    return {
      async wait(v, info) {
        trace.end(info);
        if (!flow) {
          flow = module.exports.flow(Object.assign({ts: trace.endTs}, baseInfo)).start();
        } else {
          flow.step(Object.assign({ts: trace.beginTs}, baseInfo));
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
        trace.end(endInfo);
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
    let id = flowId++;
    let started = false;
    return {
      start: function() {
        let begin = (info && info.ts) || now();
        started = true;
        pushEvent({
          ph: 's',
          ts: begin,
          cat: info.cat,
          name: info.name,
          ov: info.overview,
          args: info.args,
          id: id,
        });
        return this;
      },
      end: function(endInfo) {
        if (!started) return;
        let ts = (endInfo && endInfo.ts) || now();
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
        });
        return this;
      },
      step: function(stepInfo) {
        if (!started) return;
        let ts = (stepInfo && stepInfo.ts) || now();
        stepInfo = parseInfo(stepInfo);
        pushEvent({
          ph: 't',
          ts,
          cat: info.cat,
          name: info.name,
          ov: info.overview,
          args: stepInfo && stepInfo.args,
          id: id,
        });
        return this;
      },
    };
  };
  module.exports.save = function() {
    return {traceEvents: events};
  };
  module.exports.download = function() {
    let a = document.createElement('a');
    a.download = 'trace.json';
    a.href = 'data:text/plain;base64,' + btoa(JSON.stringify(module.exports.save()));
    a.click();
  };
  module.exports.now = now;
  module.exports.stream = function(callback, predicate) {
    streamingCallbacks.push({callback, predicate});
  };
  module.exports.__clearForTests = function() {
    events.length = 0;
    streamingCallbacks.length = 0;
  };
}

init();

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(15)))

/***/ })
/******/ ]);
//# sourceMappingURL=worker-entry.js.map